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
            CREATE TABLE IF NOT EXISTS usage_log (
                id                INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id           INTEGER,
                feature           TEXT,
                model             TEXT,
                prompt_tokens     INTEGER DEFAULT 0,
                completion_tokens INTEGER DEFAULT 0,
                total_tokens      INTEGER DEFAULT 0,
                cost              REAL DEFAULT 0,
                created_at        DATETIME DEFAULT CURRENT_TIMESTAMP
            );
            CREATE INDEX IF NOT EXISTS idx_usage_user ON usage_log(user_id);
        """)
        _migrate(conn)


# Columns added idempotently on every boot (ALTER TABLE can't be in executescript
# with IF NOT EXISTS, so we check PRAGMA and add what's missing).
PREF_COLUMNS = ("pref_lang", "pref_translation", "pref_length", "pref_style")
# (column, SQL type/default) for admin fields.
ADMIN_COLUMNS = (("blocked", "INTEGER DEFAULT 0"), ("assigned_model", "TEXT"))


def _migrate(conn):
    existing = {row["name"] for row in conn.execute("PRAGMA table_info(users)")}
    for col in PREF_COLUMNS:
        if col not in existing:
            conn.execute(f"ALTER TABLE users ADD COLUMN {col} TEXT")
    for col, decl in ADMIN_COLUMNS:
        if col not in existing:
            conn.execute(f"ALTER TABLE users ADD COLUMN {col} {decl}")


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


def update_user_prefs(user_id: int, **prefs) -> None:
    updates = {k: v for k, v in prefs.items() if k in PREF_COLUMNS}
    if not updates:
        return
    set_clause = ", ".join(f"{k}=?" for k in updates)
    values = list(updates.values()) + [user_id]
    with _conn() as conn:
        conn.execute(f"UPDATE users SET {set_clause} WHERE id=?", values)


# ── Admin / usage ───────────────────────────────────────────────────────────

def set_blocked(user_id: int, blocked: bool) -> None:
    with _conn() as conn:
        conn.execute("UPDATE users SET blocked=? WHERE id=?", (1 if blocked else 0, user_id))


def set_assigned_model(user_id: int, model: str | None) -> None:
    with _conn() as conn:
        conn.execute("UPDATE users SET assigned_model=? WHERE id=?", (model or None, user_id))


def log_usage(user_id, feature, model, prompt_tokens, completion_tokens, total_tokens, cost) -> None:
    with _conn() as conn:
        conn.execute(
            "INSERT INTO usage_log (user_id, feature, model, prompt_tokens, completion_tokens, total_tokens, cost) "
            "VALUES (?, ?, ?, ?, ?, ?, ?)",
            (user_id, feature, model, prompt_tokens or 0, completion_tokens or 0, total_tokens or 0, cost or 0),
        )


def list_users_admin() -> list[dict]:
    """All users with sermon counts and aggregate usage — for the admin panel."""
    with _conn() as conn:
        rows = conn.execute("""
            SELECT u.id, u.email, u.name, u.picture, u.created_at,
                   u.blocked, u.assigned_model,
                   (SELECT COUNT(*) FROM sermons s WHERE s.user_id = u.id)            AS sermon_count,
                   COALESCE((SELECT SUM(total_tokens) FROM usage_log l WHERE l.user_id = u.id), 0) AS total_tokens,
                   COALESCE((SELECT SUM(cost)         FROM usage_log l WHERE l.user_id = u.id), 0) AS total_cost,
                   (SELECT MAX(created_at) FROM usage_log l WHERE l.user_id = u.id)   AS last_activity
            FROM users u
            ORDER BY u.created_at DESC
        """).fetchall()
        return [dict(r) for r in rows]


def user_usage(user_id: int) -> dict:
    with _conn() as conn:
        row = conn.execute(
            "SELECT COUNT(*) AS calls, COALESCE(SUM(total_tokens),0) AS total_tokens, "
            "COALESCE(SUM(cost),0) AS total_cost FROM usage_log WHERE user_id=?",
            (user_id,),
        ).fetchone()
        return dict(row)


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
