// ── Tab Navigation ──────────────────────────────────────────────────────────

function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.style.display = panel.id === `tab-${tab}` ? '' : 'none';
    panel.classList.toggle('active', panel.id === `tab-${tab}`);
  });
  if (tab === 'sermons') loadSermonsList();
}

// ── Markdown Rendering ───────────────────────────────────────────────────────

if (typeof marked !== 'undefined') {
  marked.setOptions({ breaks: true, gfm: true });
}

function renderMarkdown(text) {
  if (typeof marked !== 'undefined') {
    return marked.parse(text);
  }
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
}

// ── Sermon Style Hints ───────────────────────────────────────────────────────

const STYLE_HINTS = {
  'expository-hb-charles':           { label: 'Structure', text: 'Verse-by-verse — the passage sets the agenda. Crisp, disciplined outline. Every point emerges from the text.' },
  'big-idea-tony-evans':             { label: 'Structure', text: 'One governing idea drives everything. Authoritative, theologically grounded, culturally engaged.' },
  'narrative-terry-anderson':        { label: 'Structure', text: 'Setup → tension → climax → resolution. Dynamic, rhythmic pacing. Truth revealed through the story.' },
  'inductive-robert-smith':          { label: 'Structure', text: 'Open with tension. Withhold the answer. Lead the congregation to discover truth themselves.' },
  'expository-ralph-west':           { label: 'Structure', text: 'Text-driven with pastoral depth. Unhurried layering of theological insight. Warm, shepherding tone.' },
  'problem-solution-tony-evans':     { label: 'Structure', text: 'Name the problem clearly. Present the biblical solution directly. Practical, actionable, no hedging.' },
  'homiletical-plot-terry-anderson': { label: 'Structure', text: 'Conflict → complication → clue → Gospel turn → resolution. Builds toward a climactic Gospel moment.' },
  'topical-hb-charles':              { label: 'Structure', text: 'Multiple texts organized around one topic. Disciplined movement between passages. Clean, logical flow.' },
  'narrative-ralph-west':            { label: 'Structure', text: 'Story-centered with pastoral pacing. Slower, reflective rhythm. The preacher walks alongside the people.' },
  'big-idea-robert-smith':           { label: 'Structure', text: 'One idea explored deeply with imagination. Incarnational language — truth is felt as much as understood.' },
};

function showStyleHint() {
  const key = document.getElementById('write-style').value;
  const hintEl = document.getElementById('style-hint');
  if (!key || !STYLE_HINTS[key]) {
    hintEl.classList.remove('visible');
    return;
  }
  const { label, text } = STYLE_HINTS[key];
  hintEl.innerHTML = `<strong>${label}:</strong> ${text}`;
  hintEl.classList.add('visible');
}

// ── Auth ─────────────────────────────────────────────────────────────────────

let currentUser = null;

async function checkAuth() {
  try {
    const res = await fetch('/api/auth/me');
    if (res.ok) {
      const data = await res.json();
      currentUser = data.user;
    }
  } catch {}
  updateAuthUI();

  // Show/hide URL auth feedback
  const params = new URLSearchParams(location.search);
  if (params.get('auth') === 'ok') {
    showToast('Signed in successfully!', 'success');
    history.replaceState({}, '', '/');
  } else if (params.get('auth') === 'error') {
    showToast('Sign-in failed. Please try again.', 'error');
    history.replaceState({}, '', '/');
  }
}

function updateAuthUI() {
  const area = document.getElementById('auth-area');
  const sermonsTabBtn = document.getElementById('tab-btn-sermons');
  const saveBtn = document.getElementById('save-sermon-btn');

  if (currentUser) {
    area.innerHTML = `
      <div class="auth-user">
        ${currentUser.picture ? `<img src="${esc(currentUser.picture)}" class="user-avatar" alt="">` : ''}
        <span class="user-name">${esc(currentUser.name || currentUser.email)}</span>
        <button class="btn-auth-out" onclick="logout()">Sign out</button>
      </div>`;
    if (sermonsTabBtn) sermonsTabBtn.style.display = '';
    if (saveBtn) saveBtn.style.display = '';
  } else {
    area.innerHTML = `<button class="btn-auth-in" onclick="loginWithGoogle()">Sign in with Google</button>`;
    if (sermonsTabBtn) sermonsTabBtn.style.display = 'none';
    if (saveBtn) saveBtn.style.display = 'none';
  }
}

function loginWithGoogle() {
  window.location.href = '/api/auth/google';
}

async function logout() {
  await fetch('/api/auth/logout', { method: 'POST' });
  currentUser = null;
  updateAuthUI();
  showToast('Signed out', 'success');
}

// ── Bible Book / Chapter Data ──────────────────────────────────────────────────

const BIBLE_BOOKS = {
  OT: [
    ['Genesis',50],['Exodus',40],['Leviticus',27],['Numbers',36],['Deuteronomy',34],
    ['Joshua',24],['Judges',21],['Ruth',4],['1 Samuel',31],['2 Samuel',24],
    ['1 Kings',22],['2 Kings',25],['1 Chronicles',29],['2 Chronicles',36],
    ['Ezra',10],['Nehemiah',13],['Esther',10],['Job',42],['Psalms',150],
    ['Proverbs',31],['Ecclesiastes',12],['Song of Solomon',8],['Isaiah',66],
    ['Jeremiah',52],['Lamentations',5],['Ezekiel',48],['Daniel',12],
    ['Hosea',14],['Joel',3],['Amos',9],['Obadiah',1],['Jonah',4],
    ['Micah',7],['Nahum',3],['Habakkuk',3],['Zephaniah',3],['Haggai',2],
    ['Zechariah',14],['Malachi',4],
  ],
  NT: [
    ['Matthew',28],['Mark',16],['Luke',24],['John',21],['Acts',28],
    ['Romans',16],['1 Corinthians',16],['2 Corinthians',13],['Galatians',6],
    ['Ephesians',6],['Philippians',4],['Colossians',4],['1 Thessalonians',5],
    ['2 Thessalonians',3],['1 Timothy',6],['2 Timothy',4],['Titus',3],
    ['Philemon',1],['Hebrews',13],['James',5],['1 Peter',5],['2 Peter',3],
    ['1 John',5],['2 John',1],['3 John',1],['Jude',1],['Revelation',22],
  ],
};

const CHAPTER_COUNTS = {};
[...BIBLE_BOOKS.OT, ...BIBLE_BOOKS.NT].forEach(([name, count]) => {
  CHAPTER_COUNTS[name] = count;
});

function onBookChange() {
  const book = document.getElementById('research-book').value;
  const chapterSel = document.getElementById('research-chapter');
  document.getElementById('research-verse-start').value = '';
  document.getElementById('research-verse-end').value = '';
  if (!book) {
    chapterSel.innerHTML = '<option value="">Ch.</option>';
    chapterSel.disabled = true;
    return;
  }
  const count = CHAPTER_COUNTS[book] || 1;
  let opts = '<option value="">Ch.</option>';
  for (let i = 1; i <= count; i++) opts += `<option value="${i}">${i}</option>`;
  chapterSel.innerHTML = opts;
  chapterSel.disabled = false;
}

function buildPassageString() {
  const book    = (document.getElementById('research-book').value || '').trim();
  const chapter = (document.getElementById('research-chapter').value || '').trim();
  const vStart  = (document.getElementById('research-verse-start').value || '').trim();
  const vEnd    = (document.getElementById('research-verse-end').value || '').trim();
  if (!book) return '';
  if (!chapter) return book;
  let ref = `${book} ${chapter}`;
  if (vStart) {
    ref += `:${vStart}`;
    if (vEnd && vEnd !== vStart) ref += `–${vEnd}`;
  }
  return ref;
}

let currentBriefType = 'concise';

function setBriefType(type) {
  currentBriefType = type;
  document.getElementById('brief-concise').classList.toggle('active', type === 'concise');
  document.getElementById('brief-expanded').classList.toggle('active', type === 'expanded');
}

function showLoadingOverlay(visible) {
  document.getElementById('research-loading').style.display = visible ? '' : 'none';
}

function setLoadingStep(stepNum, state) {
  const el = document.getElementById(`loading-step-${stepNum}`);
  if (!el) return;
  el.classList.remove('step-active', 'step-done');
  if (state === 'active') el.classList.add('step-active');
  if (state === 'done')   el.classList.add('step-done');
}

// ── Research Steps ────────────────────────────────────────────────────────────

const STEP_DEFS = [
  { number: 1, title: 'Historical & Cultural Context' },
  { number: 2, title: 'Text Exegesis' },
  { number: 3, title: 'Cross-References & Biblical Connections' },
  { number: 4, title: 'Theological Themes' },
  { number: 5, title: 'Application & Sermon Angles' },
];

const researchState = {
  passage: '',
  topic: '',
  notes: '',
  translation: 'ESV',
  briefType: 'concise',
  currentStep: 0,
  stepResults: [],
  compiled: '',
};

function renderStepDots() {
  const dotsEl = document.getElementById('step-dots');
  const labelEl = document.getElementById('step-label');
  if (!dotsEl) return;
  dotsEl.innerHTML = STEP_DEFS.map(s => {
    const done = s.number < researchState.currentStep;
    const active = s.number === researchState.currentStep;
    return `<span class="step-dot ${done ? 'done' : active ? 'active' : ''}" title="${s.title}"></span>`;
  }).join('');
  const current = STEP_DEFS[researchState.currentStep - 1];
  if (current) {
    labelEl.textContent = `Step ${researchState.currentStep} of 5 — ${current.title}`;
  }
}

async function doResearch() {
  const passage = buildPassageString();
  if (!passage) {
    showToast('Please select a book to begin.', 'error');
    document.getElementById('research-book').focus();
    return;
  }

  researchState.passage   = passage;
  researchState.topic     = document.getElementById('research-topic').value.trim();
  researchState.notes     = document.getElementById('research-notes').value.trim();
  researchState.translation = document.getElementById('research-translation').value;
  researchState.briefType = currentBriefType;
  researchState.currentStep = 1;
  researchState.stepResults = [];
  researchState.compiled  = '';

  document.getElementById('loading-ref').textContent = passage;
  showLoadingOverlay(true);
  document.getElementById('step-progress').style.display = 'none';
  document.getElementById('research-complete').style.display = 'none';
  document.getElementById('research-actions').style.display = 'none';

  for (let i = 1; i <= 5; i++) setLoadingStep(i, 'pending');

  setLoading('research-btn', true);
  await runAllSteps();
  setLoading('research-btn', false);
}

async function runAllSteps() {
  document.getElementById('research-output').innerHTML = '';

  for (let stepNum = 1; stepNum <= 5; stepNum++) {
    researchState.currentStep = stepNum;
    setLoadingStep(stepNum, 'active');

    const prior = researchState.stepResults
      .map(s => `### ${s.title}\n${s.content}`)
      .join('\n\n');

    try {
      const text = await streamToOutput(
        '/api/research/step',
        {
          step:        stepNum,
          passage:     researchState.passage,
          topic:       researchState.topic      || null,
          notes:       researchState.notes       || null,
          prior_steps: prior                     || null,
          translation: researchState.translation || null,
          brief_type:  researchState.briefType   || null,
        },
        'research-output'
      );

      if (text) {
        researchState.stepResults.push({ title: STEP_DEFS[stepNum - 1].title, content: text });
        rawContent['step-current'] = text;
      }

      setLoadingStep(stepNum, 'done');
    } catch (err) {
      showLoadingOverlay(false);
      document.getElementById('research-output').innerHTML =
        `<div class="error-msg">${esc(err.message)}</div>`;
      showToast(err.message, 'error');
      return;
    }
  }

  showLoadingOverlay(false);
  finishResearch();
}

function finishResearch() {
  // Compile all accepted steps into one document
  const compiled = researchState.stepResults
    .map(s => `## ${s.title}\n\n${s.content}`)
    .join('\n\n---\n\n');

  researchState.compiled = compiled;
  rawContent['research-output'] = compiled;

  document.getElementById('research-output').innerHTML = renderMarkdown(compiled);
  document.getElementById('research-output-label').textContent = 'Complete Research';
  const completeTitle = document.querySelector('.complete-title');
  if (completeTitle) completeTitle.textContent = `Research complete — ${researchState.passage}`;

  document.getElementById('step-progress').style.display = 'none';
  document.getElementById('research-complete').style.display = '';
  document.getElementById('research-actions').style.display = 'flex';

  // Show save button only if logged in
  const saveBtn = document.getElementById('save-sermon-btn');
  if (saveBtn) saveBtn.style.display = currentUser ? '' : 'none';

  showToast('Research complete!', 'success');
}

// ── Save Sermon ───────────────────────────────────────────────────────────────

async function saveSermon() {
  if (!currentUser) {
    showToast('Sign in to save your research.', 'error');
    return;
  }
  const passage = researchState.passage;
  const topic = researchState.topic;
  const title = passage ? `${passage} Research` : 'Sermon Research';

  try {
    const res = await fetch('/api/sermons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        passage,
        topic,
        research: researchState.compiled,
        steps: researchState.stepResults,
      }),
    });
    if (!res.ok) throw new Error('Save failed');
    showToast('Saved to My Sermons!', 'success');
    const saveBtn = document.getElementById('save-sermon-btn');
    if (saveBtn) {
      saveBtn.textContent = 'Saved ✓';
      saveBtn.disabled = true;
    }
  } catch (err) {
    showToast('Could not save. Please try again.', 'error');
  }
}

// ── Load Sermons List ─────────────────────────────────────────────────────────

async function loadSermonsList() {
  const listEl = document.getElementById('sermons-list');
  if (!currentUser) {
    listEl.innerHTML = '<div class="output-placeholder">Sign in to see your saved sermons.</div>';
    return;
  }
  listEl.innerHTML = '<div class="output-placeholder">Loading…</div>';
  try {
    const res = await fetch('/api/sermons');
    if (!res.ok) throw new Error();
    const sermons = await res.json();
    if (!sermons.length) {
      listEl.innerHTML = '<div class="output-placeholder">No saved sermons yet. Complete a research session and click "Save to My Sermons."</div>';
      return;
    }
    listEl.innerHTML = sermons.map(s => `
      <div class="sermon-card" onclick="loadSavedSermon(${s.id})">
        <div class="sermon-card-title">${esc(s.title || 'Untitled')}</div>
        <div class="sermon-card-meta">
          ${s.passage ? `<span>${esc(s.passage)}</span>` : ''}
          ${s.topic ? `<span>${esc(s.topic)}</span>` : ''}
          <span>${new Date(s.updated_at).toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'})}</span>
        </div>
      </div>
    `).join('');
  } catch {
    listEl.innerHTML = '<div class="output-placeholder">Could not load sermons.</div>';
  }
}

async function loadSavedSermon(id) {
  try {
    const res = await fetch(`/api/sermons/${id}`);
    if (!res.ok) throw new Error();
    const sermon = await res.json();

    // Restore research state
    researchState.passage = sermon.passage || '';
    researchState.topic = sermon.topic || '';
    researchState.compiled = sermon.research || '';
    researchState.stepResults = JSON.parse(sermon.steps || '[]');
    rawContent['research-output'] = sermon.research || '';

    // Pre-fill form
    if (sermon.topic) document.getElementById('research-topic').value = sermon.topic;

    // Show compiled research
    document.getElementById('research-output').innerHTML = renderMarkdown(sermon.research || '');
    document.getElementById('research-output-label').textContent = 'Saved Research';
    document.getElementById('step-progress').style.display = 'none';
    document.getElementById('research-complete').style.display = '';
    document.getElementById('research-actions').style.display = 'flex';

    switchTab('research');
    showToast('Research loaded', 'success');
  } catch {
    showToast('Could not load sermon.', 'error');
  }
}

// ── Streaming Handler ────────────────────────────────────────────────────────

const rawContent = {};

async function streamToOutput(url, body, outputId) {
  const outputEl = document.getElementById(outputId);
  outputEl.innerHTML = `
    <div class="streaming-dots">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>`;

  let fullText = '';

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    let errMsg = 'Request failed';
    try { const d = await response.json(); errMsg = d.detail || errMsg; } catch {}
    throw new Error(errMsg);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop();
    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      const data = line.slice(6).trim();
      if (data === '[DONE]') continue;
      try {
        const parsed = JSON.parse(data);
        if (parsed.error) { outputEl.innerHTML = `<div class="error-msg">${parsed.error}</div>`; return ''; }
        if (parsed.text) {
          fullText += parsed.text;
          outputEl.innerHTML = renderMarkdown(fullText);
          outputEl.scrollTop = outputEl.scrollHeight;
        }
      } catch {}
    }
  }
  rawContent[outputId] = fullText;
  return fullText;
}

// Legacy streaming used by Write and Evaluate tabs
async function streamResponse(url, body, outputId, isFormData = false) {
  const outputEl = document.getElementById(outputId);
  outputEl.innerHTML = `
    <div class="streaming-dots">
      <div class="dot"></div><div class="dot"></div><div class="dot"></div>
    </div>`;
  let fullText = '';
  const response = await fetch(url, {
    method: 'POST',
    headers: isFormData ? {} : { 'Content-Type': 'application/json' },
    body: isFormData ? body : JSON.stringify(body),
  });
  if (!response.ok) {
    let errMsg = 'Request failed';
    try { const d = await response.json(); errMsg = d.detail || errMsg; } catch {}
    throw new Error(errMsg);
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop();
    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      const data = line.slice(6).trim();
      if (data === '[DONE]') continue;
      try {
        const parsed = JSON.parse(data);
        if (parsed.error) { outputEl.innerHTML = `<div class="error-msg">${parsed.error}</div>`; return ''; }
        if (parsed.text) {
          fullText += parsed.text;
          outputEl.innerHTML = renderMarkdown(fullText);
          outputEl.scrollTop = outputEl.scrollHeight;
        }
      } catch {}
    }
  }
  rawContent[outputId] = fullText;
  return fullText;
}

// ── Button Loading State ─────────────────────────────────────────────────────

function setLoading(btnId, loading) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  if (loading) {
    btn.disabled = true;
    btn._orig = btn.innerHTML;
    btn.innerHTML = '<span class="spinner"></span>&nbsp; Processing...';
  } else {
    btn.disabled = false;
    if (btn._orig) btn.innerHTML = btn._orig;
  }
}

// ── Copy / Export (Research) ──────────────────────────────────────────────────

function copyResearch() {
  const el = document.getElementById('research-output');
  const text = el.innerText || el.textContent;
  navigator.clipboard.writeText(text).then(() => {
    document.getElementById('research-actions-copy').textContent = 'Copied!';
    setTimeout(() => { document.getElementById('research-actions-copy').textContent = 'Copy'; }, 2000);
    showToast('Copied to clipboard', 'success');
  }).catch(() => showToast('Copy failed', 'error'));
}

async function exportResearch(format) {
  const text = rawContent['research-output'] || researchState.compiled;
  if (!text) { showToast('No research to export yet.', 'error'); return; }
  const passage = researchState.passage;
  const title = passage ? `${passage} — Sermon Research` : 'Sermon Research';
  await _exportDoc(text, format, title);
}

// ── Copy / Export (Generic) ───────────────────────────────────────────────────

function copyOutput(outputId, labelId) {
  const el = document.getElementById(outputId);
  const text = el.innerText || el.textContent;
  navigator.clipboard.writeText(text).then(() => {
    const label = document.getElementById(labelId);
    if (label) {
      const orig = label.textContent;
      label.textContent = 'Copied!';
      setTimeout(() => { label.textContent = orig; }, 2000);
    }
    showToast('Copied to clipboard', 'success');
  }).catch(() => showToast('Copy failed', 'error'));
}

async function exportContent(outputId, format) {
  const text = rawContent[outputId];
  if (!text) { showToast('No content to export yet.', 'error'); return; }
  let title = 'Sermon Tools';
  if (outputId === 'write-output') {
    const t = document.getElementById('write-title').value.trim();
    const p = document.getElementById('write-passage').value.trim();
    title = t || (p ? `${p} — Sermon Draft` : 'Sermon Draft');
  } else if (outputId === 'eval-output') {
    title = 'Sermon Evaluation';
  }
  await _exportDoc(text, format, title);
}

async function _exportDoc(text, format, title) {
  showToast(`Preparing ${format === 'docx' ? 'Word document' : 'PDF'}…`);
  try {
    const response = await fetch('/api/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: text, format, title }),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({ detail: 'Export failed' }));
      throw new Error(err.detail || 'Export failed');
    }
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').toLowerCase()}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Downloaded!', 'success');
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// ── Use in Writer ─────────────────────────────────────────────────────────────

function useInWriter() {
  const passage = researchState.passage;
  if (passage) document.getElementById('write-passage').value = passage;
  const text = researchState.compiled ||
    (document.getElementById('research-output').innerText || '');
  document.getElementById('write-research').value = text.trim();
  switchTab('write');
  document.getElementById('write-passage').focus();
  showToast('Research loaded into Sermon Writer', 'success');
}

// ── Write ─────────────────────────────────────────────────────────────────────

async function doWrite() {
  const passage = document.getElementById('write-passage').value.trim();
  if (!passage) {
    showToast('Please enter the main Scripture passage.', 'error');
    document.getElementById('write-passage').focus();
    return;
  }
  const title = document.getElementById('write-title').value.trim();
  const audience = document.getElementById('write-audience').value.trim();
  const research_notes = document.getElementById('write-research').value.trim();
  const sermon_length = document.getElementById('write-length').value;
  const style = document.getElementById('write-style').value;

  setLoading('write-btn', true);
  document.getElementById('write-actions').style.display = 'none';
  try {
    const result = await streamResponse('/api/write', { passage, title, audience, research_notes, sermon_length, style }, 'write-output');
    if (result) document.getElementById('write-actions').style.display = 'flex';
  } catch (err) {
    document.getElementById('write-output').innerHTML = `<div class="error-msg">${err.message}</div>`;
    showToast(err.message, 'error');
  } finally {
    setLoading('write-btn', false);
  }
}

// ── Evaluate ──────────────────────────────────────────────────────────────────

function handleFileSelect(event) {
  const file = event.target.files[0];
  document.getElementById('selected-filename').textContent = file ? file.name : '';
}

async function doEvaluate() {
  const text = document.getElementById('eval-text').value.trim();
  const fileInput = document.getElementById('eval-file');
  const file = fileInput.files[0];
  if (!text && !file) { showToast('Please paste sermon text or upload a file.', 'error'); return; }

  const formData = new FormData();
  if (file) { formData.append('file', file); } else { formData.append('sermon_text', text); }

  setLoading('eval-btn', true);
  document.getElementById('eval-actions').style.display = 'none';
  try {
    const result = await streamResponse('/api/evaluate', formData, 'eval-output', true);
    if (result) document.getElementById('eval-actions').style.display = 'flex';
  } catch (err) {
    document.getElementById('eval-output').innerHTML = `<div class="error-msg">${err.message}</div>`;
    showToast(err.message, 'error');
  } finally {
    setLoading('eval-btn', false);
  }
}

// ── Toast ─────────────────────────────────────────────────────────────────────

let toastTimer = null;
function showToast(message, type = '') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast${type ? ' ' + type : ''} show`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.className = 'toast'; }, 3000);
}

// ── Escape ────────────────────────────────────────────────────────────────────

function esc(s) {
  return (s ?? '').toString().replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
  );
}

// ── Init ──────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  checkAuth();

  // Populate book dropdown from BIBLE_BOOKS data
  const bookSel = document.getElementById('research-book');
  ['OT', 'NT'].forEach(group => {
    const og = document.createElement('optgroup');
    og.label = group === 'OT' ? 'Old Testament' : 'New Testament';
    BIBLE_BOOKS[group].forEach(([name]) => {
      const opt = document.createElement('option');
      opt.value = name;
      opt.textContent = name;
      og.appendChild(opt);
    });
    bookSel.appendChild(og);
  });

  // Enter on verse-end triggers research
  document.getElementById('research-verse-end').addEventListener('keydown', e => {
    if (e.key === 'Enter') doResearch();
  });

  document.getElementById('write-passage').addEventListener('keydown', e => {
    if (e.key === 'Enter') doWrite();
  });
});
