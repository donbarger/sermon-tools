"""SQLite persistence for Sermon Tools — users and saved sermons."""
import sqlite3
import json
import os
from pathlib import Path
from contextlib import contextmanager

DB_PATH = Path(os.getenv("DB_PATH", "/app/data/sermons.db"))


def init_db():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    with _conn() as conn:
        conn.executescript("""
            CREATE TABLE IF NOT EXISTS users (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                google_id   TEXT UNIQUE NOT NULL,
                email       TEXT UNIQUE NOT NULL,
                name        TEXT,
                picture     TEXT,
                created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
            );
            CREATE TABLE IF NOT EXISTS sermons (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                title       TEXT,
                passage     TEXT,
                topic       TEXT,
                research    TEXT,
                steps       TEXT,
                created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP
            );
            CREATE INDEX IF NOT EXISTS idx_sermons_user ON sermons(user_id);
            CREATE TABLE IF NOT EXISTS mcp_cache (
                key         TEXT PRIMARY KEY,
                value       TEXT NOT NULL,
                created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        """)


@contextmanager
def _conn():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()


def get_or_create_user(google_id: str, email: str, name: str, picture: str) -> dict:
    with _conn() as conn:
        row = conn.execute("SELECT * FROM users WHERE google_id = ?", (google_id,)).fetchone()
        if row:
            conn.execute(
                "UPDATE users SET name=?, picture=? WHERE google_id=?",
                (name, picture, google_id)
            )
            return {**dict(row), "name": name, "picture": picture}
        conn.execute(
            "INSERT INTO users (google_id, email, name, picture) VALUES (?, ?, ?, ?)",
            (google_id, email, name, picture)
        )
        row = conn.execute("SELECT * FROM users WHERE google_id = ?", (google_id,)).fetchone()
        return dict(row)


def get_user(user_id: int) -> dict | None:
    with _conn() as conn:
        row = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
        return dict(row) if row else None


def list_sermons(user_id: int) -> list[dict]:
    with _conn() as conn:
        rows = conn.execute(
            "SELECT id, title, passage, topic, created_at, updated_at FROM sermons "
            "WHERE user_id = ? ORDER BY updated_at DESC",
            (user_id,)
        ).fetchall()
        return [dict(r) for r in rows]


def get_sermon(sermon_id: int, user_id: int) -> dict | None:
    with _conn() as conn:
        row = conn.execute(
            "SELECT * FROM sermons WHERE id = ? AND user_id = ?",
            (sermon_id, user_id)
        ).fetchone()
        return dict(row) if row else None


def save_sermon(user_id: int, title: str, passage: str, topic: str,
                research: str, steps: list) -> int:
    with _conn() as conn:
        conn.execute(
            "INSERT INTO sermons (user_id, title, passage, topic, research, steps) "
            "VALUES (?, ?, ?, ?, ?, ?)",
            (user_id, title, passage, topic, research, json.dumps(steps))
        )
        row = conn.execute("SELECT last_insert_rowid()").fetchone()
        return row[0]


def update_sermon(sermon_id: int, user_id: int, **kwargs) -> None:
    allowed = {"title", "passage", "topic", "research", "steps"}
    updates = {k: (json.dumps(v) if k == "steps" else v)
               for k, v in kwargs.items() if k in allowed}
    if not updates:
        return
    set_clause = ", ".join(f"{k}=?" for k in updates)
    values = list(updates.values()) + [sermon_id, user_id]
    with _conn() as conn:
        conn.execute(
            f"UPDATE sermons SET {set_clause}, updated_at=CURRENT_TIMESTAMP "
            f"WHERE id=? AND user_id=?",
            values
        )
