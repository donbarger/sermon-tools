# Sermon Tools

AI-assisted sermon preparation for evangelical pastors. Bilingual (English / Spanish), grounded in real biblical scholarship via the Study Bible MCP, and designed to support the full arc from passage to pulpit.

**Live:** [https://sermon.donbarger.com](https://sermon.donbarger.com) (en) / [Spanish](https://sermon.donbarger.com/?lang=es) — same URL, language picker in the header

---

## What it is

A workshop, not a sermon machine. The tool is built around the conviction that the pastor remains the preacher; AI sharpens what the pastor already brings.

**The pastor's journey** (visible in-app as a workflow guide):

1. **Research** — enter a passage, walk through 6 streamed steps (Read → Historical & Cultural Context → Text Exegesis → Cross-References → Theological Themes → Application). Each step has Continue · ↻ Regenerate · Edit · ⬇ Download (with side-by-side preview + Word/PDF). Steps 1–4 are MCP-grounded with LSJ Greek lexicon, Abbott-Smith, Tyndale Bible Dictionary, and Aquifer scholarly notes.
2. **Shape** — paste study notes, pick a passage, optionally pick a preaching style. The AI suggests three structural outlines as visual cards. Pick one → edit → click *Help Develop This Sermon*. The polished draft renders as section cards, each with refinement chips: ✨ More pastoral · ✏️ Shorter · 📖 Add story · 🎯 Tighten · 💡 More application · ➕ Expand · ↻ Regenerate.
3. **Evaluate** — paste or upload a draft (or click *Evaluate this draft* directly from the Shaper). Get a 5-dimension theological evaluation with scores. Click ✨ *Revise sermon from evaluation* to get a revised version that addresses the critique. Re-evaluate to score the new draft.
4. **Preach** — from My Sermons, tap 🎤 *Preach* to enter a mobile-first delivery view: dark theme, XL adjustable type, on-screen timer, scripture popups (click any verse reference to see it), wake-lock to keep the screen on, auto-hide chrome.

**My Sermons** is the library — searchable, organizable into series, taggable, with per-sermon actions: Preach · Print Research · Print Outline · Print Sermon · Print Eval · Create Images · Edit metadata. Print is a modal where pastors choose phases (checkboxes) + format (PDF or Word). Image gen produces per-type aspect ratios (3:4 coloring book page · 1:1 sermon illustration · 4:5 verse art · 1:1 social graphic) at ~$0.06 per image.

**Admin panel** — for designated admin emails (set via `ADMIN_EMAILS` env), a per-user view: block/unblock, assign per-user model (Sonnet, Haiku, Gemini Flash, Gemini Pro, GPT-5 mini), see usage + cost estimate per user, drill into anyone's sermon library.

---

## Stack

- **Backend:** FastAPI + httpx (async), SQLite (mounted volume in Docker), Caddy reverse proxy for TLS
- **Frontend:** vanilla JS + custom CSS, marked.js for markdown, Google Fonts (Nunito Sans, Source Sans 3, Noto Sans for Greek/Hebrew)
- **AI:** OpenRouter (default model: `anthropic/claude-haiku-4-5`, per-user override via admin)
- **Image gen:** `google/gemini-2.5-flash-image` via OpenRouter chat/completions with `modalities: ["image","text"]`
- **MCP grounding:** [`studybible-mcp.fly.dev`](https://github.com/djayatillake/studybible-mcp) — async client in `mcp_refs.py`, sequential tool calls (the server doesn't tolerate concurrent requests on the same session), 30-day SQLite cache
- **Auth:** Google OAuth 2.0 (Authlib), session cookies signed with itsdangerous
- **Bible APIs:** ESV (English), API.Bible NVI (Spanish), bible-api.com (RVR1995)

---

## Local setup

```bash
git clone https://github.com/donbarger/sermon.git sermon-tools
cd sermon-tools
cp .env.example .env  # then fill in credentials
docker compose up -d
open http://localhost:8000
```

### Required `.env` keys

- `OPENROUTER_API_KEY` — required for any AI feature
- `MODEL` — default model (recommend `anthropic/claude-haiku-4-5`)
- `ADMIN_EMAILS` — comma-separated; these users auto-promote to admin on login
- `ESV_API_KEY`, `APIBIBLE_API_KEY` — Scripture lookup
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `BACKEND_URL`, `SESSION_SECRET` — OAuth
- `MCP_ENABLED=true`, `MCP_BASE_URL=https://studybible-mcp.fly.dev/mcp/` — Study Bible MCP

---

## Deploy

```bash
./deploy.sh
```

This script:
1. Commits + pushes to GitHub (`donbarger/sermon`)
2. rsyncs to the Digital Ocean droplet at `/opt/sermon-tools/`, `docker compose build --no-cache && up -d`
3. rsyncs to the Mac Studio mirror at `~/ai/sermon-tools/`

The droplet's `.env` lives in place (excluded from rsync) so secrets persist across deploys.

---

## Architecture quick map

| File | Purpose |
|---|---|
| `main.py` | FastAPI routes — research / write / evaluate / refine / images / admin / sermon CRUD; system prompts |
| `auth.py` | Google OAuth flow, session cookies, admin checks, blocked-user enforcement |
| `db.py` | SQLite schema + helpers; idempotent migrations on every boot |
| `mcp_refs.py` | Study Bible MCP client (HTTP+SSE), per-step tool dispatch, response filter, cache |
| `static/index.html` | All DOM, including modals (print, images, metadata, step-download, eval) |
| `static/js/app.js` | All client behavior — i18n, tab routing, streaming, autosave, image gen, preach mode, refinement |
| `static/css/styles.css` | Visual system, including a `@media (max-width: 768px)` block for mobile |

---

## Documentation

- [CHANGELOG.md](CHANGELOG.md) — release notes per shipped feature
- [User flow diagram](https://sermon.donbarger.com) — also rendered as a FigJam diagram (link below)
