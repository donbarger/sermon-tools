"""
Sermon Tools — AI-powered sermon research, writing, and evaluation
FastAPI backend using OpenRouter (Claude Sonnet)
"""

import os
import io
import re
import json
import logging
from pathlib import Path
from typing import Optional
from datetime import datetime

import httpx
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.staticfiles import StaticFiles
from fastapi.responses import StreamingResponse, HTMLResponse, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

app = FastAPI(title="Sermon Tools")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

static_path = Path(__file__).parent / "static"
app.mount("/static", StaticFiles(directory=static_path), name="static")

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
MODEL = os.getenv("MODEL", "anthropic/claude-sonnet-4-5")
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"

# ─── System Prompts ───────────────────────────────────────────────────────────

RESEARCH_SYSTEM_PROMPT = """You are a biblical research assistant for evangelical Christian pastors. You provide thorough, theologically sound research grounded in Scripture.

You hold to core evangelical convictions:
- Biblical inerrancy and the full authority of Scripture
- Salvation by grace alone, through faith alone, in Christ alone
- The Trinity — Father, Son, Holy Spirit
- The deity, virgin birth, bodily resurrection, and return of Jesus Christ
- The necessity of personal repentance and faith for salvation

When researching passages or topics, provide:
1. Exegetical context — original language insights, key terms, grammatical observations
2. Historical and cultural background — what the original audience would have understood
3. Cross-references and thematic connections across Scripture
4. Main theological themes and doctrinal implications
5. Application angles for a contemporary congregation
6. Common misinterpretations or pitfalls to address
7. A suggested sermon outline structure

Be thorough, scholarly but accessible. Format your response with clear headings using markdown."""

WRITE_SYSTEM_PROMPT = """You are a sermon writing assistant for evangelical Christian pastors. Help pastors craft biblically faithful, clear, and engaging sermons.

You hold to core evangelical convictions:
- Biblical inerrancy and the full authority of Scripture
- Salvation by grace alone, through faith alone, in Christ alone
- The Trinity — Father, Son, Holy Spirit
- The deity, virgin birth, bodily resurrection, and return of Jesus Christ
- The necessity of personal repentance and faith for salvation

When writing a sermon outline and draft:
- Ground every point clearly in Scripture with specific references
- Build toward a single, clear big idea (the sermon's main point)
- Structure: compelling introduction, 2-4 main points, conclusion with a clear call to response
- Include illustration suggestions where helpful (mark as [ILLUSTRATION SUGGESTION])
- Ensure the Gospel is clearly present — who Jesus is, what he did, why it matters
- Write in a pastoral, accessible voice
- Application should be specific, actionable, and drawn from the text
- Format with clear markdown headings for easy reference

Produce a complete outline first, then expand into a full draft."""

EVALUATE_SYSTEM_PROMPT = """You are an evangelical Christian theological reviewer evaluating sermons for biblical groundedness and doctrinal soundness.

Evaluate from an evangelical perspective that holds to:
- Biblical inerrancy and the full authority of Scripture
- Salvation by grace alone, through faith alone, in Christ alone
- The Trinity — Father, Son, Holy Spirit
- The deity, virgin birth, bodily resurrection, and return of Jesus Christ
- The necessity of personal repentance and faith for salvation

Evaluate the sermon across five dimensions. For each, give a score (1–10) and specific observations:

## 1. Biblical Groundedness (1–10)
Are claims supported by Scripture? Are passages used in context, not proof-texted? Is interpretation hermeneutically sound?

## 2. Doctrinal Soundness (1–10)
Is the theology orthodox and evangelical? Are there any errors — explicit or by omission? Is the nature of salvation accurately represented?

## 3. Gospel Clarity (1–10)
Is the Gospel — Christ's death and resurrection for sin — clearly present? Is the call to repentance and faith explicit? Would an unbeliever understand how to respond?

## 4. Application Quality (1–10)
Are applications drawn from the text? Are they specific and actionable? Do they connect Scripture to real life?

## 5. Overall Assessment
- **Strengths**: What is working well and worth keeping
- **Improvements**: Specific, actionable suggestions
- **Theological concerns**: Any doctrinal issues that require correction (be direct but pastoral)
- **Overall Score**: Average of the four dimensions with brief summary

Be honest, constructive, and pastoral. Your goal is to help the pastor grow."""


# ─── File Parsers ─────────────────────────────────────────────────────────────

def extract_text_from_docx(file_bytes: bytes) -> str:
    try:
        import docx
        doc = docx.Document(io.BytesIO(file_bytes))
        return "\n".join(para.text for para in doc.paragraphs if para.text.strip())
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Could not read DOCX file: {e}")


def extract_text_from_pdf(file_bytes: bytes) -> str:
    try:
        import fitz
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        return "".join(page.get_text() for page in doc)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Could not read PDF file: {e}")


# ─── Streaming Helper ─────────────────────────────────────────────────────────

async def stream_openrouter(system_prompt: str, user_message: str) -> StreamingResponse:
    if not OPENROUTER_API_KEY:
        raise HTTPException(status_code=500, detail="OPENROUTER_API_KEY is not configured")

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://sermon-tools.app",
        "X-Title": "Sermon Tools",
    }

    payload = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message},
        ],
        "stream": True,
        "max_tokens": 4096,
    }

    async def generate():
        try:
            async with httpx.AsyncClient(timeout=120.0) as client:
                async with client.stream(
                    "POST",
                    f"{OPENROUTER_BASE_URL}/chat/completions",
                    headers=headers,
                    json=payload,
                ) as response:
                    if response.status_code != 200:
                        error_body = await response.aread()
                        logger.error(f"OpenRouter error {response.status_code}: {error_body}")
                        yield f"data: {json.dumps({'error': f'AI service error: {response.status_code}'})}\n\n"
                        return

                    async for line in response.aiter_lines():
                        if not line.startswith("data: "):
                            continue
                        data = line[6:].strip()
                        if data == "[DONE]":
                            yield "data: [DONE]\n\n"
                            break
                        try:
                            chunk = json.loads(data)
                            delta = chunk["choices"][0]["delta"].get("content", "")
                            if delta:
                                yield f"data: {json.dumps({'text': delta})}\n\n"
                        except (json.JSONDecodeError, KeyError):
                            continue
        except Exception as e:
            logger.error(f"Streaming error: {e}")
            yield f"data: {json.dumps({'error': str(e)})}\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")


# ─── Routes ───────────────────────────────────────────────────────────────────

@app.get("/", response_class=HTMLResponse)
async def serve_index():
    return (static_path / "index.html").read_text()


class ResearchRequest(BaseModel):
    passage: str
    topic: Optional[str] = None
    notes: Optional[str] = None


class WriteRequest(BaseModel):
    passage: str
    title: Optional[str] = None
    audience: Optional[str] = None
    research_notes: Optional[str] = None
    sermon_length: str = "30-40 minutes"
    style: Optional[str] = None


@app.post("/api/research")
async def research(request: ResearchRequest):
    if not request.passage.strip():
        raise HTTPException(status_code=400, detail="Scripture passage is required")

    user_message = f"Please research the following for a sermon:\n\nPassage: {request.passage}"
    if request.topic:
        user_message += f"\nTopic focus: {request.topic}"
    if request.notes:
        user_message += f"\nAdditional context: {request.notes}"

    return await stream_openrouter(RESEARCH_SYSTEM_PROMPT, user_message)


@app.post("/api/write")
async def write_sermon(request: WriteRequest):
    if not request.passage.strip():
        raise HTTPException(status_code=400, detail="Scripture passage is required")

    user_message = f"Help me write a sermon outline and draft.\n\nMain Passage: {request.passage}"
    if request.title:
        user_message += f"\nSermon Title: {request.title}"
    if request.audience:
        user_message += f"\nCongregation context: {request.audience}"
    if request.research_notes:
        user_message += f"\nResearch notes to incorporate:\n\n{request.research_notes}"
    user_message += f"\nTarget length: {request.sermon_length}"

    if request.style and request.style in SERMON_STYLES:
        s = SERMON_STYLES[request.style]
        user_message += f"""

---
PREACHING STYLE SELECTED: {s['name']}

STRUCTURE:
{s['structure']}

STYLE & VOICE:
{s['style']}

DELIVERY GOAL:
{s['delivery']}

Build this sermon strictly according to these structural and stylistic guidelines. Let the selected approach shape everything — the outline, the pacing, the language, and how truth is revealed."""

    return await stream_openrouter(WRITE_SYSTEM_PROMPT, user_message)


@app.post("/api/evaluate")
async def evaluate_sermon(
    sermon_text: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
):
    text = ""

    if file and file.filename:
        file_bytes = await file.read()
        fname = file.filename.lower()
        if fname.endswith(".docx"):
            text = extract_text_from_docx(file_bytes)
        elif fname.endswith(".pdf"):
            text = extract_text_from_pdf(file_bytes)
        elif fname.endswith(".txt"):
            text = file_bytes.decode("utf-8", errors="replace")
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type. Use .txt, .docx, or .pdf")
    elif sermon_text:
        text = sermon_text
    else:
        raise HTTPException(status_code=400, detail="Provide sermon text or upload a file")

    if len(text.strip()) < 100:
        raise HTTPException(status_code=400, detail="Sermon text is too short to evaluate meaningfully")

    return await stream_openrouter(EVALUATE_SYSTEM_PROMPT, f"Please evaluate this sermon:\n\n{text}")


# ─── Sermon Styles Config ─────────────────────────────────────────────────────

SERMON_STYLES = {
    "expository-hb-charles": {
        "name": "Expository (Structured & Text-Driven) — H.B. Charles Jr.",
        "structure": "Text-driven, verse-by-verse. Each main point emerges directly from the passage. The text sets the agenda — not the preacher.",
        "style": "Structured and disciplined with crisp, clear transitions. Concise phrasing. Precision in handling the text. No excess — every word serves the passage.",
        "delivery": "The congregation should leave with a clear, ordered understanding of what the text says, what it means, and what it requires of them.",
    },
    "big-idea-tony-evans": {
        "name": "Big Idea (Clear & Authoritative) — Tony Evans",
        "structure": "A single dominant idea governs everything. Every point, illustration, and application flows from and returns to that one big idea.",
        "style": "Authoritative and theologically grounded. Culturally engaged — connects biblical truth directly to contemporary life. Confident, declarative tone.",
        "delivery": "The congregation should leave able to state the sermon's one big idea in a single sentence — and feel the weight of it.",
    },
    "narrative-terry-anderson": {
        "name": "Narrative (Story-Driven & Dynamic) — Terry Anderson",
        "structure": "A full narrative arc: setup → rising tension → climax → resolution. Let the story unfold progressively. Delay the full meaning.",
        "style": "Dynamic pacing with rhythmic phrasing. Build emotional intensity across the sermon. Vivid language and strong sensory detail. Celebratory climax.",
        "delivery": "The congregation should feel like they lived inside the story — not just heard it explained.",
    },
    "inductive-robert-smith": {
        "name": "Inductive (Experiential Discovery) — Robert Smith Jr.",
        "structure": "Open with tension or a probing question. Withhold resolution. Let the text lead the congregation to discover truth rather than announcing it upfront.",
        "style": "Experiential and imaginative. Embodied storytelling — the preacher inhabits the text. Rich with metaphor, imagery, and incarnational language.",
        "delivery": "The congregation should feel like they discovered the truth themselves — which makes it impossible to forget.",
    },
    "expository-ralph-west": {
        "name": "Expository (Deep & Pastoral) — Ralph West",
        "structure": "Text-driven with layered theological insight. Points unfold with pastoral patience. Depth without rushing. Space for the congregation to sit in the text.",
        "style": "Pastoral, rich, and reflective. Shepherding tone — the preacher cares deeply for the people as they preach. Warm and substantive.",
        "delivery": "The congregation should feel spiritually fed, pastorally cared for, and theologically enriched.",
    },
    "problem-solution-tony-evans": {
        "name": "Problem–Solution (Practical & Direct) — Tony Evans",
        "structure": "Clearly name the problem the congregation faces. Then unfold the biblical solution with precision. Move from diagnosis to prescription.",
        "style": "Direct and culturally aware. No hedging. Authoritative confidence that Scripture has the answer. Practical, actionable application.",
        "delivery": "The congregation should leave with a clear understanding of both their problem and God's specific solution — and know what to do about it.",
    },
    "homiletical-plot-terry-anderson": {
        "name": "Homiletical Plot (Journey to Celebration) — Terry Anderson",
        "structure": "Eugene Lowry's plot: Conflict → Complication → Clue → Gospel Turn → Resolution. Build toward a climactic Gospel moment.",
        "style": "Narrative movement with emotional escalation. Strong suspense through the middle. The Gospel turn arrives like a resolution the congregation has been aching for.",
        "delivery": "The congregation should experience a journey — conflict, tension, Gospel relief, and joyful celebration at the finish.",
    },
    "topical-hb-charles": {
        "name": "Topical (Organized & Focused) — H.B. Charles Jr.",
        "structure": "Multiple texts organized around a central topic or theme. Each point is anchored in Scripture. The topic shapes the structure; Scripture shapes each point.",
        "style": "Methodical and clearly organized. Disciplined movement between texts. No rambling. Clean outline with logical flow.",
        "delivery": "The congregation should leave with a comprehensive, biblically grounded understanding of the topic — organized well enough to teach others.",
    },
    "narrative-ralph-west": {
        "name": "Narrative (Reflective & Pastoral) — Ralph West",
        "structure": "Story-centered with pastoral pacing. The narrative arc is present but unhurried. Space for reflection within the story.",
        "style": "Pastoral warmth with reflective depth. Slower pacing to let truth settle. Relational tone — the preacher walks alongside the congregation through the story.",
        "delivery": "The congregation should feel the pastoral care embedded in the storytelling — moved emotionally, nourished spiritually.",
    },
    "big-idea-robert-smith": {
        "name": "Big Idea (Experiential & Imaginative) — Robert Smith Jr.",
        "structure": "A single governing idea explored with depth and imagination. Uses the whole canon to illuminate the central truth.",
        "style": "Experiential and imaginative. Incarnational — the truth takes on flesh in language and story. Rich imagery. The idea is felt as much as understood.",
        "delivery": "The congregation should not only understand the big idea — they should have experienced it. It should live in them, not just in their notes.",
    },
}


@app.get("/api/sermon-styles")
async def get_sermon_styles():
    return [{"key": k, **{f: v[f] for f in ("name", "structure", "style", "delivery")}}
            for k, v in SERMON_STYLES.items()]


# ─── Export Helpers ───────────────────────────────────────────────────────────

def _inline_runs(text: str):
    """Split a markdown inline string into (content, style) tuples."""
    parts = re.split(r'(\*\*[^*\n]+\*\*|\*[^*\n]+\*|`[^`\n]+`)', text)
    result = []
    for part in parts:
        if part.startswith('**') and part.endswith('**') and len(part) > 4:
            result.append((part[2:-2], 'bold'))
        elif part.startswith('*') and part.endswith('*') and len(part) > 2:
            result.append((part[1:-1], 'italic'))
        elif part.startswith('`') and part.endswith('`') and len(part) > 2:
            result.append((part[1:-1], 'code'))
        elif part:
            result.append((part, 'normal'))
    return result


def markdown_to_docx(content: str, title: str) -> bytes:
    from docx import Document
    from docx.shared import Pt, RGBColor, Inches

    INK    = RGBColor(0x1B, 0x36, 0x5D)
    ACCENT = RGBColor(0x48, 0x7A, 0x7B)
    MUTED  = RGBColor(0x70, 0x73, 0x72)

    doc = Document()
    for section in doc.sections:
        section.top_margin    = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin   = Inches(1.2)
        section.right_margin  = Inches(1.2)

    def add_heading(text: str, level: int):
        p = doc.add_heading('', level=level)
        p.clear()
        run = p.add_run(text.strip())
        run.font.bold = True
        run.font.color.rgb = INK if level <= 2 else ACCENT
        sizes = {1: 17, 2: 14, 3: 12, 4: 11}
        run.font.size = Pt(sizes.get(level, 11))
        return p

    def add_inline(text: str, style: str = 'Normal', indent: float = 0):
        p = doc.add_paragraph(style=style)
        if indent:
            p.paragraph_format.left_indent = Inches(indent)
        for chunk, kind in _inline_runs(text):
            run = p.add_run(chunk)
            run.font.color.rgb = INK
            if kind == 'bold':
                run.font.bold = True
            elif kind == 'italic':
                run.font.italic = True
            elif kind == 'code':
                run.font.name = 'Courier New'
                run.font.size = Pt(9.5)
        return p

    # Title block
    tp = doc.add_paragraph()
    tr = tp.add_run(title)
    tr.font.size = Pt(22)
    tr.font.bold = True
    tr.font.color.rgb = INK

    dp = doc.add_paragraph()
    dr = dp.add_run(f"Generated {datetime.now().strftime('%B %d, %Y')}  ·  Sermon Tools — IMB Innovation")
    dr.font.size = Pt(9)
    dr.font.color.rgb = MUTED

    doc.add_paragraph()

    for line in content.split('\n'):
        s = line.strip()
        if not s:
            doc.add_paragraph()
        elif s in ('---', '***', '___'):
            doc.add_paragraph('─' * 55)
        elif s.startswith('#### '):
            add_heading(s[5:], 4)
        elif s.startswith('### '):
            add_heading(s[4:], 3)
        elif s.startswith('## '):
            add_heading(s[3:], 2)
        elif s.startswith('# '):
            add_heading(s[2:], 1)
        elif s.startswith('- ') or s.startswith('* '):
            try:
                add_inline(s[2:], 'List Bullet')
            except Exception:
                add_inline(f'• {s[2:]}', indent=0.25)
        elif re.match(r'^\d+\.\s', s):
            try:
                add_inline(re.sub(r'^\d+\.\s', '', s), 'List Number')
            except Exception:
                add_inline(s, indent=0.25)
        elif s.startswith('> '):
            add_inline(s[2:], indent=0.3)
        else:
            add_inline(s)

    buf = io.BytesIO()
    doc.save(buf)
    return buf.getvalue()


def markdown_to_pdf(content: str, title: str) -> bytes:
    from reportlab.lib.pagesizes import letter
    from reportlab.lib.styles import ParagraphStyle
    from reportlab.lib.colors import HexColor
    from reportlab.lib.units import inch
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable

    INK    = HexColor('#1B365D')
    ACCENT = HexColor('#487A7B')
    MUTED  = HexColor('#9a9c9a')
    BORDER = HexColor('#dde1e7')

    def S(name, **kw):
        return ParagraphStyle(name, **kw)

    title_s = S('T',  fontName='Helvetica-Bold',    fontSize=22, textColor=INK,    spaceAfter=4,  leading=26)
    meta_s  = S('Me', fontName='Helvetica',          fontSize=9,  textColor=MUTED,  spaceAfter=16)
    h1_s    = S('H1', fontName='Helvetica-Bold',    fontSize=17, textColor=INK,    spaceBefore=14, spaceAfter=6,  leading=22)
    h2_s    = S('H2', fontName='Helvetica-Bold',    fontSize=14, textColor=INK,    spaceBefore=12, spaceAfter=5,  leading=18)
    h3_s    = S('H3', fontName='Helvetica-Bold',    fontSize=12, textColor=ACCENT, spaceBefore=10, spaceAfter=4)
    h4_s    = S('H4', fontName='Helvetica-Bold',    fontSize=11, textColor=ACCENT, spaceBefore=8,  spaceAfter=3)
    body_s  = S('Bo', fontName='Helvetica',          fontSize=10.5, textColor=INK,  spaceAfter=5,  leading=16)
    bull_s  = S('Bu', fontName='Helvetica',          fontSize=10.5, textColor=INK,  spaceAfter=4,  leading=16, leftIndent=18)
    quot_s  = S('Qu', fontName='Helvetica-Oblique', fontSize=10,  textColor=HexColor('#444'),      spaceAfter=6,  leading=15, leftIndent=24, rightIndent=12)

    def fix(text: str) -> str:
        text = text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
        text = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', text)
        text = re.sub(r'\*(.+?)\*',     r'<i>\1</i>', text)
        text = re.sub(r'`(.+?)`', r'<font face="Courier" size="9">\1</font>', text)
        return text

    story = [
        Paragraph(fix(title), title_s),
        Paragraph(f"Generated {datetime.now().strftime('%B %d, %Y')}  ·  Sermon Tools — IMB Innovation", meta_s),
        HRFlowable(width='100%', thickness=1, color=BORDER, spaceAfter=10),
    ]

    for line in content.split('\n'):
        s = line.strip()
        if not s:
            story.append(Spacer(1, 0.07 * inch))
        elif s in ('---', '***', '___'):
            story.append(HRFlowable(width='100%', thickness=0.5, color=BORDER, spaceBefore=4, spaceAfter=4))
        elif s.startswith('#### '):
            story.append(Paragraph(fix(s[5:]), h4_s))
        elif s.startswith('### '):
            story.append(Paragraph(fix(s[4:]), h3_s))
        elif s.startswith('## '):
            story.append(Paragraph(fix(s[3:]), h2_s))
        elif s.startswith('# '):
            story.append(Paragraph(fix(s[2:]), h1_s))
        elif s.startswith('- ') or s.startswith('* '):
            story.append(Paragraph(f'• {fix(s[2:])}', bull_s))
        elif re.match(r'^\d+\.\s', s):
            num, _, rest = s.partition('. ')
            story.append(Paragraph(f'{num}. {fix(rest)}', bull_s))
        elif s.startswith('> '):
            story.append(Paragraph(fix(s[2:]), quot_s))
        else:
            story.append(Paragraph(fix(s), body_s))

    buf = io.BytesIO()
    doc = SimpleDocTemplate(buf, pagesize=letter,
        leftMargin=inch * 1.1, rightMargin=inch * 1.1,
        topMargin=inch * 1.0, bottomMargin=inch * 1.0)
    doc.build(story)
    return buf.getvalue()


# ─── Export Endpoint ──────────────────────────────────────────────────────────

class ExportRequest(BaseModel):
    content: str
    format: str
    title: str = "Sermon Tools"


@app.post("/api/export")
async def export_document(request: ExportRequest):
    if request.format not in ("docx", "pdf"):
        raise HTTPException(status_code=400, detail="Format must be 'docx' or 'pdf'")
    if not request.content.strip():
        raise HTTPException(status_code=400, detail="No content to export")

    safe_title = re.sub(r'[^\w\s-]', '', request.title)[:80].strip() or "Sermon Tools"

    if request.format == "docx":
        data = markdown_to_docx(request.content, request.title)
        media_type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        filename = f"{safe_title}.docx"
    else:
        data = markdown_to_pdf(request.content, request.title)
        media_type = "application/pdf"
        filename = f"{safe_title}.pdf"

    return Response(
        content=data,
        media_type=media_type,
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
