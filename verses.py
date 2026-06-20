"""
Verbatim Scripture fetching for Sermon Tools.

Fetches the exact verse text for a passage in a chosen translation from one of
several providers (API.Bible, Biblia). Used to (a) display the passage to the
pastor and (b) ground the AI prompts in the exact wording instead of relying on
the model's memory of a translation.

Design mirrors mcp_refs.py: async httpx, env-gated, fail-soft. Any miss
(missing key, unsupported translation, parse error, HTTP error, timeout) returns
None and the caller falls back to today's "model-quoted" behavior.

A translation is "verbatim-capable" only if some provider supports it AND that
provider's key is configured. Adding a new key (e.g. ESV, NLT) later activates
those translations with no other code change.

Copyrighted verse text is fetched live and is NOT persisted to disk — only a
small in-memory cache (cleared on process restart) is kept.
"""

import os
import re
import logging
from html.parser import HTMLParser
from typing import Optional

import httpx

logger = logging.getLogger(__name__)

APIBIBLE_API_KEY = os.getenv("APIBIBLE_API_KEY", "")
BIBLIA_API_KEY = os.getenv("BIBLIA_API_KEY", "")
ESV_API_KEY = os.getenv("ESV_API_KEY", "")
NLT_API_KEY = os.getenv("NLT_API_KEY", "")

APIBIBLE_BASE = "https://rest.api.bible/v1"
BIBLIA_BASE = "https://api.biblia.com/v1"
ESV_BASE = "https://api.esv.org/v3"
NLT_BASE = "https://api.nlt.to/api"

# Crossway's ESV API is a fixed endpoint (no per-Bible id); this maps the app
# code to itself so the registry treats it like any other provider.
ESV_BIBLES = {"ESV": "ESV"}

# Tyndale's NLT API. NTV is also a Tyndale text but this key isn't entitled to
# it (NTV is served via API.Bible instead). version code == app code here.
NLT_BIBLES = {"NLT": "NLT"}

# ── App translation code → provider Bible id ────────────────────────────────────

# API.Bible (header: api-key). bibleIds confirmed live 2026-06.
APIBIBLE_BIBLES = {
    "NVI":     "abc55ec4a92a291d-01",   # Nueva Versión Internacional (Latin American)
    "NTV":     "826f63861180e056-01",   # Nueva Traducción Viviente
    "LBLA":    "e3f420b9665abaeb-01",   # La Biblia de las Américas
    "RVR1909": "592420522e16049f-01",   # Reina Valera 1909 (public domain)
    "KJV":     "de4e12af7f28f599-01",   # King James Version
}

# Biblia API (key= query param).
BIBLIA_BIBLES = {
    "RVR1960": "rvr60",                 # Reina-Valera 1960 (not on API.Bible — why we keep both)
    "RVA":     "rva",                   # Reina-Valera Actualizada
    "KJV":     "kjv",
    "LEB":     "leb",
    "LSB":     "lgcystndrdbblsb",       # Legacy Standard Bible
    "ASV":     "asv",
}

# Fallback attribution when a provider doesn't return a copyright string.
ATTRIBUTION = {
    "ESV":     "The Holy Bible, English Standard Version® (ESV®) © Crossway",
    "NLT":     "Holy Bible, New Living Translation (NLT) © Tyndale House Foundation",
    "NVI":     "Nueva Versión Internacional (NVI) © Biblica, Inc.",
    "NTV":     "Nueva Traducción Viviente (NTV) © Tyndale House Foundation",
    "LBLA":    "La Biblia de las Américas (LBLA) © The Lockman Foundation",
    "RVR1909": "Reina Valera 1909 — Public Domain",
    "RVR1960": "Reina-Valera 1960 (RVR60) © Sociedades Bíblicas en América Latina",
    "RVA":     "Reina-Valera Actualizada (RVA) © Editorial Mundo Hispano",
    "KJV":     "King James Version — Public Domain",
    "LEB":     "Lexham English Bible (LEB) © Lexham Press",
    "LSB":     "Legacy Standard Bible (LSB) © The Lockman Foundation",
    "ASV":     "American Standard Version — Public Domain",
}

# ── Book name → USFM code (for API.Bible passage ids) ───────────────────────────

BOOK_USFM = {
    "Genesis": "GEN", "Exodus": "EXO", "Leviticus": "LEV", "Numbers": "NUM",
    "Deuteronomy": "DEU", "Joshua": "JOS", "Judges": "JDG", "Ruth": "RUT",
    "1 Samuel": "1SA", "2 Samuel": "2SA", "1 Kings": "1KI", "2 Kings": "2KI",
    "1 Chronicles": "1CH", "2 Chronicles": "2CH", "Ezra": "EZR", "Nehemiah": "NEH",
    "Esther": "EST", "Job": "JOB", "Psalms": "PSA", "Proverbs": "PRO",
    "Ecclesiastes": "ECC", "Song of Solomon": "SNG", "Isaiah": "ISA",
    "Jeremiah": "JER", "Lamentations": "LAM", "Ezekiel": "EZK", "Daniel": "DAN",
    "Hosea": "HOS", "Joel": "JOL", "Amos": "AMO", "Obadiah": "OBA", "Jonah": "JON",
    "Micah": "MIC", "Nahum": "NAM", "Habakkuk": "HAB", "Zephaniah": "ZEP",
    "Haggai": "HAG", "Zechariah": "ZEC", "Malachi": "MAL", "Matthew": "MAT",
    "Mark": "MRK", "Luke": "LUK", "John": "JHN", "Acts": "ACT", "Romans": "ROM",
    "1 Corinthians": "1CO", "2 Corinthians": "2CO", "Galatians": "GAL",
    "Ephesians": "EPH", "Philippians": "PHP", "Colossians": "COL",
    "1 Thessalonians": "1TH", "2 Thessalonians": "2TH", "1 Timothy": "1TI",
    "2 Timothy": "2TI", "Titus": "TIT", "Philemon": "PHM", "Hebrews": "HEB",
    "James": "JAS", "1 Peter": "1PE", "2 Peter": "2PE", "1 John": "1JN",
    "2 John": "2JN", "3 John": "3JN", "Jude": "JUD", "Revelation": "REV",
}

# Matches "John 3", "John 3:16", "John 3:16-17", "1 John 3:16–18" (hyphen or en-dash).
_REF_RE = re.compile(
    r"^\s*(?P<book>(?:[1-3]\s+)?[A-Za-z][A-Za-z ]*?)\s+(?P<chap>\d+)"
    r"(?::(?P<v1>\d+)(?:\s*[-–]\s*(?P<v2>\d+))?)?\s*$"
)


def _normalize(text: str) -> str:
    """Tidy provider text: drop pilcrows, collapse runs of spaces/tabs, trim
    blank lines — without touching verse content or numbering."""
    text = text.replace("¶", "")  # ¶ paragraph marker
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def _parse_ref(reference: str) -> Optional[dict]:
    """'John 3:16' / 'John 3:16-17' / '1 John 3' → {book, chap, v1, v2}.
    Returns None if the book isn't one of the 66 we recognize."""
    m = _REF_RE.match(reference or "")
    if not m:
        return None
    book = re.sub(r"\s+", " ", m.group("book").strip())
    if book not in BOOK_USFM:
        return None
    return {"book": book, "chap": m.group("chap"), "v1": m.group("v1"), "v2": m.group("v2")}


def _to_usfm(reference: str) -> Optional[str]:
    """'John 3:16' -> 'JHN.3.16'; 'John 3:16-17' -> 'JHN.3.16-JHN.3.17';
    'John 3' -> 'JHN.3'. For API.Bible passage ids."""
    p = _parse_ref(reference)
    if not p:
        return None
    usfm, chap, v1, v2 = BOOK_USFM[p["book"]], p["chap"], p["v1"], p["v2"]
    if not v1:
        return f"{usfm}.{chap}"
    if v2 and v2 != v1:
        return f"{usfm}.{chap}.{v1}-{usfm}.{chap}.{v2}"
    return f"{usfm}.{chap}.{v1}"


def _to_nlt_ref(reference: str) -> Optional[str]:
    """'John 3:16' -> 'John.3.16'; 'John 3:16-17' -> 'John.3.16-17';
    '1 John 3' -> '1 John.3'. NLT keeps the (spaced) book name."""
    p = _parse_ref(reference)
    if not p:
        return None
    base = f"{p['book']}.{p['chap']}"
    if not p["v1"]:
        return base
    ref = f"{base}.{p['v1']}"
    if p["v2"] and p["v2"] != p["v1"]:
        ref += f"-{p['v2']}"
    return ref


# ── Providers ───────────────────────────────────────────────────────────────────

async def _fetch_apibible(reference: str, translation: str) -> Optional[dict]:
    bible_id = APIBIBLE_BIBLES.get(translation)
    if not bible_id or not APIBIBLE_API_KEY:
        return None
    passage_id = _to_usfm(reference)
    if not passage_id:
        return None
    url = f"{APIBIBLE_BASE}/bibles/{bible_id}/passages/{passage_id}"
    params = {
        "content-type": "text",
        "include-verse-numbers": "true",
        "include-chapter-numbers": "false",
        "include-titles": "false",
        "include-notes": "false",
        "include-verse-spans": "false",
    }
    headers = {"api-key": APIBIBLE_API_KEY}
    try:
        async with httpx.AsyncClient(timeout=12) as client:
            resp = await client.get(url, params=params, headers=headers)
            if resp.status_code != 200:
                logger.info("API.Bible %s %s -> HTTP %s", translation, passage_id, resp.status_code)
                return None
            data = resp.json().get("data", {})
            text = _normalize(data.get("content") or "")
            if not text:
                return None
            # Prefer our curated attribution — API.Bible's copyright metadata is
            # occasionally mislabeled (e.g. the standard LatAm NVI returns a
            # "Simplificada" string). Fall back to the API's copyright otherwise.
            attribution = ATTRIBUTION.get(translation) or (data.get("copyright") or "").strip() or translation
            return {"text": text, "attribution": attribution, "version": translation}
    except Exception as e:
        logger.warning("API.Bible fetch failed (%s): %s", translation, e)
        return None


async def _fetch_biblia(reference: str, translation: str) -> Optional[dict]:
    bible_id = BIBLIA_BIBLES.get(translation)
    if not bible_id or not BIBLIA_API_KEY:
        return None
    url = f"{BIBLIA_BASE}/bible/content/{bible_id}.txt"
    params = {
        "passage": reference,
        "key": BIBLIA_API_KEY,
        "style": "oneVersePerLine",
    }
    try:
        async with httpx.AsyncClient(timeout=12) as client:
            resp = await client.get(url, params=params)
            if resp.status_code != 200:
                logger.info("Biblia %s %r -> HTTP %s", translation, reference, resp.status_code)
                return None
            raw = (resp.text or "").strip()
            if not raw:
                return None
            # Biblia prepends a reference header line, e.g. "John 3:16 (RVR60)".
            lines = raw.split("\n")
            if len(lines) > 1 and "(" in lines[0] and ")" in lines[0]:
                body = _normalize("\n".join(lines[1:]))
            else:
                body = _normalize(raw)
            if not body:
                return None
            return {
                "text": body,
                "attribution": ATTRIBUTION.get(translation, translation),
                "version": translation,
            }
    except Exception as e:
        logger.warning("Biblia fetch failed (%s): %s", translation, e)
        return None


async def _fetch_esv(reference: str, translation: str) -> Optional[dict]:
    if translation != "ESV" or not ESV_API_KEY:
        return None
    url = f"{ESV_BASE}/passage/text/"
    params = {
        "q": reference,
        "include-passage-references": "false",
        "include-verse-numbers": "true",
        "include-first-verse-numbers": "true",
        "include-footnotes": "false",
        "include-headings": "false",
        "include-short-copyright": "false",
        "indent-paragraphs": "0",
    }
    headers = {"Authorization": f"Token {ESV_API_KEY}"}
    try:
        async with httpx.AsyncClient(timeout=12) as client:
            resp = await client.get(url, params=params, headers=headers)
            if resp.status_code != 200:
                logger.info("ESV %r -> HTTP %s", reference, resp.status_code)
                return None
            passages = resp.json().get("passages", [])
            text = _normalize("\n".join(passages))
            if not text:
                return None
            return {"text": text, "attribution": ATTRIBUTION["ESV"], "version": "ESV"}
    except Exception as e:
        logger.warning("ESV fetch failed: %s", e)
        return None


class _NLTTextExtractor(HTMLParser):
    """Pull just the verse text out of NLT API HTML — dropping the section
    header, translation footnotes (span.tn / a.a-tn), and any sub-headings,
    while keeping verse numbers (span.vn) and red-letter text."""

    SKIP_TAGS = {"head", "title", "h2", "h3", "h4", "h5", "sup", "script", "style"}
    SKIP_CLASSES = {"tn", "tn-ref", "a-tn", "bk_ch_vs_header", "subhead", "subhead_psa"}

    def __init__(self):
        super().__init__()
        self.parts = []
        self._skip = 0

    def handle_starttag(self, tag, attrs):
        classes = set((dict(attrs).get("class") or "").split())
        if self._skip or tag in self.SKIP_TAGS or (classes & self.SKIP_CLASSES):
            self._skip += 1

    def handle_endtag(self, tag):
        if self._skip:
            self._skip -= 1

    def handle_data(self, data):
        if not self._skip:
            self.parts.append(data)

    def text(self):
        return re.sub(r"\s+", " ", "".join(self.parts)).strip()


async def _fetch_nlt(reference: str, translation: str) -> Optional[dict]:
    bible_version = NLT_BIBLES.get(translation)
    if not bible_version or not NLT_API_KEY:
        return None
    ref = _to_nlt_ref(reference)
    if not ref:
        return None
    url = f"{NLT_BASE}/passages"
    params = {"ref": ref, "version": bible_version, "key": NLT_API_KEY}
    try:
        async with httpx.AsyncClient(timeout=12) as client:
            resp = await client.get(url, params=params)
            if resp.status_code != 200 or not resp.text.strip():
                logger.info("NLT %s %r -> HTTP %s (empty=%s)", translation, ref, resp.status_code, not resp.text.strip())
                return None
            parser = _NLTTextExtractor()
            parser.feed(resp.text)
            text = _normalize(parser.text())
            if not text:
                return None
            return {"text": text, "attribution": ATTRIBUTION.get(translation, translation), "version": translation}
    except Exception as e:
        logger.warning("NLT fetch failed (%s): %s", translation, e)
        return None


# Ordered: first provider that supports a translation AND has a key wins.
PROVIDERS = [
    {"name": "esv",      "key": ESV_API_KEY,      "bibles": ESV_BIBLES,      "fetch": _fetch_esv},
    {"name": "nlt",      "key": NLT_API_KEY,      "bibles": NLT_BIBLES,      "fetch": _fetch_nlt},
    {"name": "apibible", "key": APIBIBLE_API_KEY, "bibles": APIBIBLE_BIBLES, "fetch": _fetch_apibible},
    {"name": "biblia",   "key": BIBLIA_API_KEY,   "bibles": BIBLIA_BIBLES,   "fetch": _fetch_biblia},
]


def verbatim_capable() -> set:
    """App translation codes that some configured provider can serve verbatim."""
    out = set()
    for p in PROVIDERS:
        if p["key"]:
            out.update(p["bibles"].keys())
    return out


# In-memory only (process-lifetime). Never written to disk — respects the
# no-redistribution/no-storage posture for copyrighted text.
_CACHE: dict = {}
_CACHE_MAX = 512


async def fetch_passage(reference: str, translation: str) -> Optional[dict]:
    """Return {text, attribution, version} for the passage in the given
    translation, or None if no configured provider can serve it (caller then
    falls back to model-quoted behavior)."""
    reference = (reference or "").strip()
    translation = (translation or "").strip()
    if not reference or not translation:
        return None

    cache_key = f"{translation}|{reference}"
    if cache_key in _CACHE:
        return _CACHE[cache_key]

    for p in PROVIDERS:
        if not p["key"] or translation not in p["bibles"]:
            continue
        result = await p["fetch"](reference, translation)
        if result:
            if len(_CACHE) < _CACHE_MAX:
                _CACHE[cache_key] = result
            return result
    return None
