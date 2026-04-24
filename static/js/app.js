// ── Tab Navigation ──────────────────────────────────────────────────────────

function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.style.display = panel.id === `tab-${tab}` ? '' : 'none';
    panel.classList.toggle('active', panel.id === `tab-${tab}`);
  });
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
  'expository-hb-charles':          { label: 'Structure', text: 'Verse-by-verse — the passage sets the agenda. Crisp, disciplined outline. Every point emerges from the text.' },
  'big-idea-tony-evans':            { label: 'Structure', text: 'One governing idea drives everything. Authoritative, theologically grounded, culturally engaged.' },
  'narrative-terry-anderson':       { label: 'Structure', text: 'Setup → tension → climax → resolution. Dynamic, rhythmic pacing. Truth revealed through the story.' },
  'inductive-robert-smith':         { label: 'Structure', text: 'Open with tension. Withhold the answer. Lead the congregation to discover truth themselves.' },
  'expository-ralph-west':          { label: 'Structure', text: 'Text-driven with pastoral depth. Unhurried layering of theological insight. Warm, shepherding tone.' },
  'problem-solution-tony-evans':    { label: 'Structure', text: 'Name the problem clearly. Present the biblical solution directly. Practical, actionable, no hedging.' },
  'homiletical-plot-terry-anderson':{ label: 'Structure', text: 'Conflict → complication → clue → Gospel turn → resolution. Builds toward a climactic Gospel moment.' },
  'topical-hb-charles':             { label: 'Structure', text: 'Multiple texts organized around one topic. Disciplined movement between passages. Clean, logical flow.' },
  'narrative-ralph-west':           { label: 'Structure', text: 'Story-centered with pastoral pacing. Slower, reflective rhythm. The preacher walks alongside the people.' },
  'big-idea-robert-smith':          { label: 'Structure', text: 'One idea explored deeply with imagination. Incarnational language — truth is felt as much as understood.' },
};

function showStyleHint() {
  const key = document.getElementById('write-style').value;
  const hintEl = document.getElementById('style-hint');
  if (!key || !STYLE_HINTS[key]) {
    hintEl.classList.remove('visible');
    return;
  }
  const { label, text } = STYLE_HINTS[key];
  hintEl.innerHTML = `<strong>${label}</strong>${text}`;
  hintEl.classList.add('visible');
}

// ── Raw Content Store (for export) ──────────────────────────────────────────
const rawContent = {};

// ── Streaming Handler ────────────────────────────────────────────────────────

async function streamResponse(url, body, outputId, isFormData = false) {
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
    headers: isFormData ? {} : { 'Content-Type': 'application/json' },
    body: isFormData ? body : JSON.stringify(body),
  });

  if (!response.ok) {
    let errMsg = 'Request failed';
    try {
      const errData = await response.json();
      errMsg = errData.detail || errMsg;
    } catch (_) {}
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
        if (parsed.error) {
          outputEl.innerHTML = `<div class="error-msg">${parsed.error}</div>`;
          return '';
        }
        if (parsed.text) {
          fullText += parsed.text;
          outputEl.innerHTML = renderMarkdown(fullText);
          outputEl.scrollTop = outputEl.scrollHeight;
        }
      } catch (_) {}
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

// ── Copy to Clipboard ────────────────────────────────────────────────────────

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

// ── Export ───────────────────────────────────────────────────────────────────

async function exportContent(outputId, format) {
  const text = rawContent[outputId];
  if (!text) {
    showToast('No content to export yet.', 'error');
    return;
  }

  let title = 'Sermon Tools';
  if (outputId === 'research-output') {
    const p = document.getElementById('research-passage').value.trim();
    title = p ? `${p} - Sermon Research` : 'Sermon Research';
  } else if (outputId === 'write-output') {
    const t = document.getElementById('write-title').value.trim();
    const p = document.getElementById('write-passage').value.trim();
    title = t || (p ? `${p} - Sermon Draft` : 'Sermon Draft');
  } else if (outputId === 'eval-output') {
    title = 'Sermon Evaluation';
  }

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

// ── Toast Notifications ──────────────────────────────────────────────────────

let toastTimer = null;
function showToast(message, type = '') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast${type ? ' ' + type : ''} show`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.className = 'toast'; }, 3000);
}

// ── Research ─────────────────────────────────────────────────────────────────

let lastResearchText = '';

async function doResearch() {
  const passage = document.getElementById('research-passage').value.trim();
  if (!passage) {
    showToast('Please enter a Scripture passage.', 'error');
    document.getElementById('research-passage').focus();
    return;
  }

  const topic = document.getElementById('research-topic').value.trim();
  const notes = document.getElementById('research-notes').value.trim();

  setLoading('research-btn', true);
  document.getElementById('research-actions').style.display = 'none';

  try {
    const result = await streamResponse('/api/research', { passage, topic, notes }, 'research-output');
    if (result) {
      lastResearchText = result;
      document.getElementById('research-actions').style.display = 'flex';
    }
  } catch (err) {
    document.getElementById('research-output').innerHTML = `<div class="error-msg">${err.message}</div>`;
    showToast(err.message, 'error');
  } finally {
    setLoading('research-btn', false);
  }
}

// ── Use in Writer ─────────────────────────────────────────────────────────────

function useInWriter() {
  const passage = document.getElementById('research-passage').value.trim();
  if (passage) document.getElementById('write-passage').value = passage;

  const outputEl = document.getElementById('research-output');
  const text = outputEl.innerText || outputEl.textContent;
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
    const result = await streamResponse(
      '/api/write',
      { passage, title, audience, research_notes, sermon_length, style },
      'write-output'
    );
    if (result) {
      document.getElementById('write-actions').style.display = 'flex';
    }
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
  const label = document.getElementById('selected-filename');
  label.textContent = file ? file.name : '';
}

async function doEvaluate() {
  const text = document.getElementById('eval-text').value.trim();
  const fileInput = document.getElementById('eval-file');
  const file = fileInput.files[0];

  if (!text && !file) {
    showToast('Please paste sermon text or upload a file.', 'error');
    return;
  }

  const formData = new FormData();
  if (file) {
    formData.append('file', file);
  } else {
    formData.append('sermon_text', text);
  }

  setLoading('eval-btn', true);
  document.getElementById('eval-actions').style.display = 'none';

  try {
    const result = await streamResponse('/api/evaluate', formData, 'eval-output', true);
    if (result) {
      document.getElementById('eval-actions').style.display = 'flex';
    }
  } catch (err) {
    document.getElementById('eval-output').innerHTML = `<div class="error-msg">${err.message}</div>`;
    showToast(err.message, 'error');
  } finally {
    setLoading('eval-btn', false);
  }
}

// ── Enter key convenience ────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('research-passage').addEventListener('keydown', e => {
    if (e.key === 'Enter') doResearch();
  });
  document.getElementById('write-passage').addEventListener('keydown', e => {
    if (e.key === 'Enter') doWrite();
  });
});
