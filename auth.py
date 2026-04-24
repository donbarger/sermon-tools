"""Google OAuth 2.0 flow for Sermon Tools. Session-cookie based."""
import os
import secrets
from itsdangerous import URLSafeSerializer, BadSignature
from fastapi import Request, HTTPException, status as http_status
from authlib.integrations.httpx_client import AsyncOAuth2Client

SESSION_COOKIE = "sermon_session"
OAUTH_STATE_COOKIE = "sermon_oauth_state"
COOKIE_MAX_AGE = 60 * 60 * 24 * 30  # 30 days

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET", "")
SESSION_SECRET = os.getenv("SESSION_SECRET", "dev-secret-change-me")
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8000")

COOKIE_SECURE = BACKEND_URL.lower().startswith("https://")

_serializer = URLSafeSerializer(SESSION_SECRET, salt="sermon-session")

GOOGLE_AUTHZ_URL = "https://accounts.google.com/o/oauth2/v2/auth"
GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_USERINFO = "https://openidconnect.googleapis.com/v1/userinfo"


def redirect_uri() -> str:
    return f"{BACKEND_URL}/api/auth/google/callback"


def build_authorize_url() -> tuple[str, str]:
    if not GOOGLE_CLIENT_ID or not GOOGLE_CLIENT_SECRET:
        raise HTTPException(500, "Google OAuth not configured")
    state = secrets.token_urlsafe(24)
    client = AsyncOAuth2Client(
        client_id=GOOGLE_CLIENT_ID,
        client_secret=GOOGLE_CLIENT_SECRET,
        scope="openid email profile",
        redirect_uri=redirect_uri(),
    )
    url, _ = client.create_authorization_url(GOOGLE_AUTHZ_URL, state=state)
    return url, state


async def exchange_code_for_userinfo(code: str) -> dict:
    client = AsyncOAuth2Client(
        client_id=GOOGLE_CLIENT_ID,
        client_secret=GOOGLE_CLIENT_SECRET,
        redirect_uri=redirect_uri(),
    )
    await client.fetch_token(GOOGLE_TOKEN_URL, code=code, grant_type="authorization_code")
    resp = await client.get(GOOGLE_USERINFO)
    resp.raise_for_status()
    return resp.json()


def issue_session(user_id: int) -> str:
    return _serializer.dumps({"uid": user_id})


def read_session(request: Request) -> int | None:
    raw = request.cookies.get(SESSION_COOKIE)
    if not raw:
        return None
    try:
        data = _serializer.loads(raw)
        uid = data.get("uid")
        return int(uid) if uid else None
    except (BadSignature, ValueError, TypeError):
        return None


def get_optional_user_id(request: Request) -> int | None:
    return read_session(request)


def require_user_id(request: Request) -> int:
    uid = read_session(request)
    if uid is None:
        raise HTTPException(http_status.HTTP_401_UNAUTHORIZED, "Not authenticated")
    return uid
