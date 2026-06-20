# Sermon Tools

AI-assisted sermon preparation for evangelical pastors. **Bilingual (English / Spanish)** — the whole
interface *and* the AI's output — grounded in real biblical scholarship via the Study Bible MCP and in
**verbatim Scripture** from the pastor's chosen translation, designed to support the full arc from
passage to pulpit.

**Live:** [https://sermon.donbarger.com](https://sermon.donbarger.com) — sign-in required.
Switch languages with the **EN | ES** toggle in the header (or share `?lang=es`).

> A workshop, not a sermon machine. The tool is built on the conviction that the pastor remains the
> preacher; AI sharpens what the pastor already brings.

---

## What it is

Sign in with Google to reach three tools plus a saved library:

1. **Research** — pick a passage (book / chapter / optional verses), a translation, optional topic and
   context, and a brief depth (Concise or Expanded). Five steps stream in sequence: Historical &
   Cultural Context → Text Exegesis → Cross-References → Theological Themes → Application. Steps 1–4
   are **MCP-grounded** (LSJ Greek lexicon, Abbott-Smith, Tyndale Bible Dictionary, Aquifer notes); if
   the MCP server is unavailable the step still runs, ungrounded. When a verbatim provider covers the
   chosen translation, the exact passage text is shown in a **Scripture panel** and fed into the
   prompts so quotations are accurate. Export to Word/PDF, or save to My Sermons.
2. **Craft** — a pastor-driven workbench ("a workshop, not a machine"). The research sits in a
   collapsible left rail (passage + verbatim Scripture + the 5 steps) beside a canvas where *you*
   write the **big idea** and add/reorder **movements** in your own words. Three kinds of help, all
   **suggest-then-approve** (Insert / Replace / Discard — nothing auto-applies): per-movement editor
   help (draft from notes · illustration · find a verse · tighten · faithful-to-the-text), **coaching**
   that asks good questions (globally and per-movement) and turns *your* answers into a structure or
   prose, and the movement outline itself. Auto-pulls your latest research; save/reopen via My Sermons.
3. **Evaluate** — paste a draft or upload a file (`.txt` / `.docx` / `.pdf`). Get a five-dimension
   theological evaluation (biblical groundedness, doctrinal soundness, Gospel clarity, application,
   overall). Export to Word/PDF.

**Sermon Draft** (admin-only) — the legacy one-shot auto-generator (outline → section-by-section),
kept as a power tool for designated admins; hidden from regular users in favor of Craft.

**My Sermons** — your saved research sessions and Craft drafts; click any entry to reopen it.

**Settings** (⚙, per account) — preferred language, preferred translation, and default sermon
length/style. Applied automatically on sign-in.

**Admin panel** — for emails in `ADMIN_EMAILS`: a per-user view to block/unblock, assign a per-user
model (Sonnet 4.5, Haiku 4.5, GPT-5 mini, Gemini 2.5 Flash/Pro), see token usage + estimated cost, and
drill into a user's saved sermons. Blocked users are denied generation.

---

## Stack

- **Backend:** FastAPI + httpx (async), SQLite (mounted volume in Docker), Caddy reverse proxy for TLS
- **Frontend:** vanilla JS + custom CSS, marked.js for markdown. A `data-i18n` dictionary in `app.js`
  drives the bilingual UI; the `lang` flag sent to each endpoint drives the language of AI output.
- **Auth:** Google OAuth 2.0 (Authlib), session cookies signed with itsdangerous. **Sign-in is
  required** — generating endpoints reject anonymous callers; signed-out visitors see a landing page.
- **AI:** OpenRouter (default model `anthropic/claude-haiku-4-5`; per-user override via Admin). Each
  call requests token/cost accounting, logged to `usage_log`.
- **Verbatim Scripture:** `verses.py` provider registry — **ESV API, NLT API (Tyndale), API.Bible,
  Biblia API**. The chosen translation's exact text is fetched, shown to the pastor, and injected into
  the prompts. Env-gated + fail-soft (no key for a translation → it falls back to AI-quoted). Copyrighted
  verse text is fetched live and not persisted. Verbatim today: ESV, NLT, KJV, NVI, RVR1960, NTV, LBLA,
  RVA, RVR1909, LEB, LSB, ASV. (No free API: NIV, CSB, NASB, NKJV, RVC, TLA → AI-quoted.)
- **MCP grounding:** [`studybible-mcp.fly.dev`](https://github.com/djayatillake/studybible-mcp) — async
  client in `mcp_refs.py`, sequential tool calls, 30-day SQLite cache.

---

## Local setup

```bash
git clone https://github.com/donbarger/sermon-tools.git
cd sermon-tools
cp .env.example .env   # then fill in credentials
docker compose up -d
open http://localhost:8000
```

### `.env` keys

- `OPENROUTER_API_KEY` — required for any AI feature
- `MODEL` — default model (recommend `anthropic/claude-haiku-4-5`)
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `BACKEND_URL`, `SESSION_SECRET` — Google OAuth (required;
  the app is sign-in-only)
- `ADMIN_EMAILS` — comma-separated emails that get the Admin tab (default `dbarger@imb.org`)
- `ESV_API_KEY`, `NLT_API_KEY`, `APIBIBLE_API_KEY`, `BIBLIA_API_KEY` — verbatim Scripture providers
  (each optional; a translation is fetched verbatim only if its provider's key is set — see `verses.py`)
- `MCP_ENABLED=true`, `MCP_BASE_URL=https://studybible-mcp.fly.dev/mcp/` — Study Bible MCP

---

## Deploy

The repo's `deploy.sh` runs **on the Digital Ocean droplet** (`/opt/sermon-tools`):

```bash
# on the droplet
cd /opt/sermon-tools && ./deploy.sh      # git pull origin main → docker compose build --no-cache → up -d
```

Full flow from a workstation:
1. Commit + push to GitHub (`donbarger/sermon-tools`).
2. On the droplet: add any new keys to `/opt/sermon-tools/.env` (it's excluded from version control, so
   secrets persist across deploys), then run `./deploy.sh`.

DB migrations (new columns, `usage_log`) run idempotently on container boot — existing data is preserved.

---

## Architecture quick map

| File | Purpose |
|---|---|
| `main.py` | FastAPI routes — research / craft assist / write (admin) / evaluate / passage / settings / admin / sermon CRUD / export; system prompts; OpenRouter streaming + usage logging |
| `auth.py` | Google OAuth flow, signed session cookies |
| `db.py` | SQLite schema + helpers; idempotent migrations (`pref_*`, `blocked`, `assigned_model`, `usage_log`) on every boot |
| `mcp_refs.py` | Study Bible MCP client (HTTP+SSE), per-step tool dispatch, response filter, 30-day cache |
| `verses.py` | Verbatim Scripture provider registry (ESV / NLT / API.Bible / Biblia), USFM ref parsing, fail-soft fetch |
| `static/index.html` | All DOM — landing page, three tool tabs, My Sermons, Admin, Settings modal, Scripture panel |
| `static/js/app.js` | All client behavior — i18n dictionary + language toggle, sign-in gate, tab routing, streaming, verbatim fetch, settings, admin |
| `static/css/styles.css` | Visual system, including a mobile `@media` block |

---

## Documentation

- [CHANGELOG.md](CHANGELOG.md) — release notes per shipped feature
- Legal: `static/terms-of-use.html` and `static/privacy-policy.html` (linked from the footer; no-warranty)
