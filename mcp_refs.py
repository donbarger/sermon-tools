"""
Study Bible MCP client + per-step reference fetcher.

Pre-injects authoritative scholarly references (LSJ, Abbott-Smith, Tyndale,
Aquifer notes) into the prompt for AI research steps so the model cites real
sources rather than paraphrasing from training data.
"""
import asyncio
import json
import logging
import os
import re
import sqlite3
from pathlib import Path
from typing import Optional

import httpx

logger = logging.getLogger(__name__)

MCP_ENABLED = os.getenv("MCP_ENABLED", "true").lower() not in ("false", "0", "no")
MCP_BASE_URL = os.getenv("MCP_BASE_URL", "https://studybible-mcp.fly.dev/mcp/")
CACHE_DB = Path(os.getenv("DB_PATH", "/app/data/sermons.db"))
CACHE_TTL_DAYS = 30

# step number → list of (tool_name, args_template). args may contain {passage} placeholders.
# Step 5 (Application) deliberately omitted — pastoral application doesn't benefit from lookup data.
STEP_TOOLS = {
    1: [  # Historical & Cultural Context
        ("get_ane_context", {"reference": "{passage}"}),
    ],
    2: [  # Text Exegesis
        ("lookup_verse",     {"reference": "{passage}"}),
        ("get_study_notes",  {"reference": "{passage}"}),
    ],
    3: [  # Cross-References & Biblical Connections
        ("get_cross_references",  {"reference": "{passage}"}),
        ("find_similar_passages", {"reference": "{passage}", "limit": 5}),
    ],
    4: [  # Theological Themes
        ("get_theology_context", {"reference": "{passage}"}),
    ],
}


def _cache_get(key: str) -> Optional[str]:
    try:
        with sqlite3.connect(CACHE_DB) as conn:
            row = conn.execute(
                "SELECT value FROM mcp_cache WHERE key = ? "
                f"AND created_at > datetime('now', '-{CACHE_TTL_DAYS} days')",
                (key,),
            ).fetchone()
            return row[0] if row else None
    except sqlite3.OperationalError:
        return None  # table not yet created


def _cache_put(key: str, value: str) -> None:
    try:
        with sqlite3.connect(CACHE_DB) as conn:
            conn.execute(
                "INSERT INTO mcp_cache (key, value, created_at) VALUES (?, ?, CURRENT_TIMESTAMP) "
                "ON CONFLICT(key) DO UPDATE SET value=excluded.value, created_at=CURRENT_TIMESTAMP",
                (key, value),
            )
    except sqlite3.OperationalError as e:
        logger.warning(f"mcp_cache write failed: {e}")


async def _initialize(client: httpx.AsyncClient) -> Optional[str]:
    body = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "initialize",
        "params": {
            "protocolVersion": "2025-03-26",
            "capabilities": {},
            "clientInfo": {"name": "sermon-tools", "version": "1.0"},
        },
    }
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json, text/event-stream",
    }
    try:
        async with client.stream("POST", MCP_BASE_URL, json=body, headers=headers, timeout=10) as resp:
            if resp.status_code != 200:
                logger.warning(f"MCP initialize: {resp.status_code}")
                return None
            sid = resp.headers.get("mcp-session-id")
            async for _ in resp.aiter_lines():
                break  # consume the one event we expect
    except Exception as e:
        logger.warning(f"MCP initialize failed: {e}")
        return None

    if not sid:
        return None

    # Spec requires notifications/initialized before tool calls.
    try:
        await client.post(
            MCP_BASE_URL,
            json={"jsonrpc": "2.0", "method": "notifications/initialized"},
            headers={**headers, "mcp-session-id": sid},
            timeout=5,
        )
    except Exception:
        pass

    return sid


# Patterns to strip from MCP responses to save input tokens without losing
# passage-specific content. See research findings 2026-04-26.
_WASTE_PATTERNS = [
    # Generic genre-framework block (identical for every Pauline passage etc.)
    re.compile(r"\n---\n## Genre: [A-Z][^\n]+.*?(?=\n## |\n### |\Z)", re.S),
    # Per-word Strong's table — duplicates the inline annotation in the Greek text
    re.compile(r"\n### Word Analysis\n.*?(?=\n## |\n### |\Z)", re.S),
    # unfoldingWord notes — translator-focused, low value for exegesis
    re.compile(r"\n### Translation Notes \(unfoldingWord\).*?(?=\n## |\n### |\Z)", re.S),
]


_NOT_FOUND_PATTERNS = (
    "verse not found",
    "no study notes found",
    "no entry found",
    "no results",
    "no entry",
)


def _filter_response(text: str) -> Optional[str]:
    """Strip generic / duplicative content. Returns None if response is a 'not found' message."""
    if not text:
        return None
    stripped_lower = text.strip().lower()
    if len(stripped_lower) < 200:
        for needle in _NOT_FOUND_PATTERNS:
            if needle in stripped_lower:
                return None
    for pat in _WASTE_PATTERNS:
        text = pat.sub("", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip() or None


async def _call_tool(client: httpx.AsyncClient, sid: str, name: str, args: dict) -> Optional[str]:
    body = {
        "jsonrpc": "2.0",
        "id": 2,
        "method": "tools/call",
        "params": {"name": name, "arguments": args},
    }
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json, text/event-stream",
        "mcp-session-id": sid,
    }
    try:
        async with client.stream("POST", MCP_BASE_URL, json=body, headers=headers, timeout=20) as resp:
            if resp.status_code != 200:
                return None
            async for raw in resp.aiter_lines():
                line = raw.strip()
                if not line.startswith("data: "):
                    continue
                payload = json.loads(line[6:])
                if "result" not in payload:
                    return None
                parts = [
                    c["text"]
                    for c in payload["result"].get("content", [])
                    if c.get("type") == "text" and c.get("text")
                ]
                if not parts:
                    return None
                return _filter_response("\n".join(parts))
    except Exception as e:
        logger.warning(f"MCP tool {name} failed: {e}")
        return None
    return None


async def fetch_step_refs(step: int, passage: str) -> str:
    """Markdown reference block for the AI prompt, or empty string on failure / disabled."""
    if not MCP_ENABLED or step not in STEP_TOOLS:
        return ""
    passage = (passage or "").strip()
    if not passage:
        return ""

    cache_key = f"v2:{step}:{passage.lower()}"
    cached = _cache_get(cache_key)
    if cached is not None:
        return cached

    tools_for_step = STEP_TOOLS[step]
    substituted = []
    for name, args in tools_for_step:
        rendered = {
            k: v.format(passage=passage) if isinstance(v, str) else v
            for k, v in args.items()
        }
        substituted.append((name, rendered))

    async def _fetch_all() -> list:
        async with httpx.AsyncClient() as client:
            sid = await _initialize(client)
            if not sid:
                return []
            # Sequential — concurrent requests on the same MCP session deadlock the SSE stream.
            out = []
            for name, args in substituted:
                try:
                    out.append(await _call_tool(client, sid, name, args))
                except Exception as e:
                    logger.warning(f"MCP tool {name} error: {e}")
                    out.append(None)
            return out

    try:
        results = await asyncio.wait_for(_fetch_all(), timeout=30.0)
    except asyncio.TimeoutError:
        logger.warning(f"MCP fetch timed out for step={step} passage={passage!r}")
        return ""
    except Exception as e:
        logger.warning(f"MCP fetch_step_refs error step={step} passage={passage!r}: {e}")
        return ""

    if not results:
        return ""

    sections = []
    for (name, _), result in zip(substituted, results):
        if isinstance(result, str) and result.strip():
            sections.append(f"### `{name}`\n{result}")

    if not sections:
        return ""

    block = (
        "## Reference material from Study Bible MCP\n"
        "(Authoritative scholarly resources — LSJ Greek lexicon, Abbott-Smith, "
        "Tyndale Bible Dictionary, Aquifer Open Study Notes. Cite these directly "
        "in your output rather than paraphrasing from memory.)\n\n"
        + "\n\n".join(sections)
    )
    _cache_put(cache_key, block)
    return block
