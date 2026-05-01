# Changelog

Most recent at top. Versioning is loose — this is a living app, shipped continuously.

## v0.7 — UX overhaul (the journey)

- **Workflow guide** at the top of every signed-in tab: 1. Research → 2. Shape → 3. Evaluate → 4. Preach. Active phase glows, completed phases go teal, click any phase to jump there.
- **Preach mode** for mobile delivery: dark theme, XL adjustable type, on-screen timer with localStorage persistence, wake-lock to keep the screen on, auto-hide chrome, click-any-verse-reference popup that fetches verse text live. New 🎤 button on every saved sermon. Hash-routed at `/#preach/{sermonId}` for deep-linking. Mobile responsive audit (44px touch targets, single-column panel-grid under 768px, horizontal-scroll tab nav).
- **Per-section refinement** in the Shaper: polished drafts now render as section cards (parsed by `## ` headers). Each card has 7 refinement chips (More pastoral · Shorter · Add story · Tighten · More application · Expand · Regenerate). Clicking streams a refined section in place; the compiled draft auto-PATCHes back to `sermon_text`. Inline edit toggle for hand-edits.
- **My Sermons series + tags + search**: schema added `series` and `tags` columns; sermons group into collapsible `<details>` by series, search filters by title/passage/topic/series/tag, and a ⚙ Edit modal lets pastors rename, set series, edit tags.
- **"Revise sermon from evaluation"** — after evaluating, one click sends the original sermon + the critique to AI, gets back a revised draft addressing every concern. Pastor can re-evaluate to score the new version. New `/api/evaluate/revise` endpoint.
- **Outline cards** instead of textarea-with-three-options: the three structural options now render as visual cards with "Pick this option →" buttons. Picking populates the editor; others collapse with a "Change choice" escape hatch.
- **Step download is now Word/PDF + editable preview** — replaces the raw `.md` export. Modal shows side-by-side textarea + live markdown preview, format radio (Word default), Save edits / Save & download.
- **Print modal** with phase checkboxes — Print Research / Outline / Sermon / Eval all open the same modal: select phases (with Select all / None toggles), pick PDF or Word, download.
- **Hash-based tab routing** — `/#research`, `/#write`, `/#evaluate`, `/#sermons`, `/#admin`. Each tab is bookmarkable, shareable, and reload-safe.
- **Regenerate button on every research step**. Clickable past step dots for non-linear navigation. Topic / notes inputs are now editable mid-flow and propagate into regenerated steps.
- **Step 1 (Read the Passage) auto-advances** — no more no-op "Accept" gate. The verse pins to the side panel for reference.
- **Shaper localStorage autosave** — inputs and output stream are debounced-saved (500ms) to localStorage with a 7-day TTL. Tab close no longer loses work. Cleared on Start Over.
- **"Evaluate this draft"** button on the Shaper output — auto-switches to the Evaluate tab and triggers evaluation with one click.
- **"Continue to Sermon Shaper"** as the leading action on the research-complete screen, reframed as "Research compiled — ready to draft" (less finish-line, more handoff).
- **"Continue →"** instead of "Accept & Continue →" on each step (less legalistic).

## v0.6 — Image generation

- **Per-sermon image gen via OpenRouter** (`google/gemini-2.5-flash-image`, ~$0.04/image). Four types with prompt templates: 🖍️ Coloring book page (3:4 portrait crop) · 🖼️ Sermon illustration (1:1) · 📜 Verse art (4:5 portrait) · 📱 Social graphic (1:1).
- **Server-side cropping** with Pillow to per-type aspect ratios (Gemini outputs locked at 1024×1024).
- **Cost tracking**: `image_count` column on sermons; cost estimator now adds image_count × $0.04 × 1.5 to text cost. Cost shown upfront in the modal and as a chip on each My Sermons card.
- **Print Research / Outline / Sermon** buttons per saved sermon, with empty-state disabling. Schema added `outline` + `sermon_text` columns; auto-PATCHed when the user picks an outline / completes a polished draft. Loading a saved sermon re-hydrates the Shaper inputs/outputs.

## v0.5 — Evaluate-to-library + cost transparency

- **Evaluations save to My Sermons** automatically. PATCHes onto `currentSermonId` if set; otherwise creates a new sermon record from the pasted/uploaded text with the eval attached and an "evaluated" tag. New 📊 *Eval* print button. Schema added `evaluation` column.

## v0.4 — Study Bible MCP grounding

- **MCP integration** for research steps 1–4 — fetches authoritative scholarly references (LSJ Greek lexicon, Abbott-Smith, Tyndale Bible Dictionary, Aquifer Open Study Notes) and injects into the prompt. New `mcp_refs.py` module with async HTTP+SSE client, sequential tool calls (the MCP server doesn't tolerate concurrent requests on a shared session), 30-day SQLite cache.
- **Response filtering** strips waste from MCP responses (generic genre framework, per-word Strong's tables, unfoldingWord notes) — saves ~25% of injected tokens.
- **Configurable** via `MCP_ENABLED` and `MCP_BASE_URL` env vars; degrades gracefully if MCP is down.

## v0.3 — Spanish + admin

- **Bilingual UI** (English / Spanish) — all flows translated, including pastoral framing.
- **Spanish Bible versions** via API.Bible (NVI, NTV) and bible-api.com (RVR1995).
- **Admin panel**: per-user view, block / unblock, assign per-user model from a curated dropdown (Sonnet 4.5, Haiku 4.5, Gemini Flash, Gemini Pro, GPT-5 mini), see lifetime usage + cost estimate per user, drill into anyone's sermon library, view full sermon contents. Self-block prevention.
- **Per-sermon cost estimate** — chip on each My Sermons card showing 1.5×-multiplied estimate; admins see sums per user.
- **CORS narrowed** from `*` to known origins. **Container bound to localhost only** (was 0.0.0.0:8000, bypassing UFW). **`.env` permissions tightened** to mode 600.

## v0.2 — Interactive research + Shaper

- **6-step research flow** (Read · Historical & Cultural · Text Exegesis · Cross-References · Theological Themes · Application) with streaming and per-step controls.
- **Sermon Shaper** with three-outline suggestion + polish flow.
- **Google OAuth** + Save to My Sermons.

## v0.1 — Initial deployment

- FastAPI backend, OpenRouter integration, Caddy + Docker on the shared Build-It droplet.
- ESV API, OG/iMessage previews.
