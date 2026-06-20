// ── Internationalization (i18n) ──────────────────────────────────────────────
// English is the authored fallback; Spanish is a full parallel set. UI chrome is
// translated via data-i18n* attributes in index.html (see applyLang); dynamic
// strings below go through t(). Generated AI output language is driven separately
// by the `lang` field sent to the API.

const TRANSLATIONS = {
  en: {
    'header.tagline': 'AI-Assisted Biblical Research & Preparation',
    'header.support': 'Support This Ministry',

    'tab.research': 'Research',
    'tab.write': 'Write',
    'tab.evaluate': 'Evaluate',
    'tab.sermons': 'My Sermons',
    'tab.admin': 'Admin',

    'admin.heading': 'Admin',
    'admin.desc': 'Manage users: block access, assign a model, and review usage. Click a user to view their saved sermons.',
    'admin.colUser': 'User',
    'admin.colJoined': 'Joined',
    'admin.colSermons': 'Sermons',
    'admin.colTokens': 'Tokens',
    'admin.colCost': 'Est. cost',
    'admin.colModel': 'Model',
    'admin.colAccess': 'Access',
    'admin.block': 'Block',
    'admin.unblock': 'Unblock',
    'admin.viewSermons': 'View sermons',
    'admin.modelDefault': 'Default',
    'admin.noUsers': 'No users yet.',
    'admin.loadError': 'Could not load.',
    'admin.blockedToast': 'User blocked',
    'admin.unblockedToast': 'User unblocked',
    'admin.modelSaved': 'Model updated',
    'admin.actionFailed': 'Action failed',
    'admin.userNoSermons': 'No saved sermons.',

    'research.heading': 'Scripture Research',
    'research.desc': 'Select a passage, choose your translation, and click <strong>Generate Research</strong> to receive thorough biblical research grounded in exegesis, cross-references, theological themes, and application angles.',
    'research.passageLabel': 'Scripture Passage',
    'select.book': '— Book —',
    'bible.ot': 'Old Testament',
    'bible.nt': 'New Testament',
    'select.chapter': 'Ch.',
    'research.versesLabel': 'Verses',
    'label.optional': 'optional',
    'ph.from': 'From',
    'ph.to': 'To',
    'research.translationLabel': 'Preferred Translation',
    'research.topicLabel': 'Topic Focus',
    'ph.topic': "e.g. God's grace, spiritual warfare, anxiety",
    'research.notesLabel': 'Additional Context',
    'ph.notes': "Series theme, congregation context, specific angle you're exploring...",
    'research.briefLabel': 'Research Brief',
    'brief.concise': 'Concise Brief',
    'brief.expanded': 'Expanded Brief',
    'btn.generateResearch': 'Generate Research',
    'loading.title': 'Preparing Sermon Research',
    'loading.disclaimer': 'Our AI Team of Biblical Scholars is working on your sermon research. Give them a few minutes.',
    'loading.step1': 'Historical & Cultural Context',
    'loading.step2': 'Textual Exegesis',
    'loading.step3': 'Cross References & Connections',
    'loading.step4': 'Theological Themes',
    'loading.step5': 'Application & Sermon Angles',
    'research.outputLabel': 'Research Results',
    'btn.copy': 'Copy',
    'btn.word': 'Word',
    'btn.pdf': 'PDF',
    'btn.useInWriter': 'Use in Sermon Writer →',
    'research.placeholder': 'Research results will appear here.',
    'research.placeholderHint': 'Select a passage above and click <strong>Generate Research</strong> to begin.',
    'research.completeTitle': 'Research complete — 5 steps done',
    'research.completeDesc': 'Your research has been compiled below. Export it or save it to your account.',
    'btn.downloadPdf': 'Download PDF',
    'btn.downloadWord': 'Download Word',
    'btn.save': 'Save to My Sermons',

    'write.heading': 'Sermon Writer',
    'write.desc': 'Generate a complete sermon outline and draft. Add your research notes for a more grounded, text-driven result.',
    'write.passageLabel': 'Main Passage',
    'ph.writePassage': 'e.g. John 3:16–21',
    'write.styleLabel': 'Sermon Style & Structure',
    'select.styleDefault': '— Choose a preaching approach —',
    'style.opt.expository-hb-charles': 'Expository (Structured & Text-Driven)',
    'style.opt.big-idea-tony-evans': 'Big Idea (Clear & Authoritative)',
    'style.opt.narrative-terry-anderson': 'Narrative (Story-Driven & Dynamic)',
    'style.opt.inductive-robert-smith': 'Inductive (Experiential Discovery)',
    'style.opt.expository-ralph-west': 'Expository (Deep & Pastoral)',
    'style.opt.problem-solution-tony-evans': 'Problem–Solution (Practical & Direct)',
    'style.opt.homiletical-plot-terry-anderson': 'Homiletical Plot (Journey to Celebration)',
    'style.opt.topical-hb-charles': 'Topical (Organized & Focused)',
    'style.opt.narrative-ralph-west': 'Narrative (Reflective & Pastoral)',
    'style.opt.big-idea-robert-smith': 'Big Idea (Experiential & Imaginative)',
    'write.titleLabel': 'Sermon Title',
    'ph.writeTitle': 'e.g. The Weight of Grace',
    'write.audienceLabel': 'Congregation Context',
    'ph.writeAudience': 'e.g. Mixed congregation, evangelistic service, young adults',
    'write.lengthLabel': 'Target Length',
    'length.20': '20–25 minutes',
    'length.30': '30–40 minutes',
    'length.45': '45–60 minutes',
    'write.researchLabel': 'Research Notes',
    'ph.writeResearch': "Paste research notes here, or use 'Use in Sermon Writer →' from the Research tab...",
    'btn.writeDraft': 'Write Sermon Draft',
    'write.outputLabel': 'Sermon Draft',
    'write.placeholder': 'Your sermon outline and draft will appear here.',
    'write.placeholderHint': 'Enter a passage above and click <strong>Write Sermon Draft</strong> to begin.',

    'eval.heading': 'Sermon Evaluator',
    'eval.desc': "Receive an honest, pastoral evaluation of your sermon's biblical groundedness, doctrinal soundness, Gospel clarity, and application quality.",
    'eval.textLabel': 'Sermon Text',
    'ph.evalText': 'Paste your complete sermon here...',
    'eval.or': 'or upload a file',
    'btn.chooseFile': 'Choose File',
    'btn.evaluate': 'Evaluate Sermon',
    'eval.outputLabel': 'Evaluation',
    'eval.placeholder': 'Your evaluation will appear here.',
    'eval.placeholderHint': 'Covers biblical accuracy, doctrinal soundness, Gospel clarity, and application quality.',

    'sermons.heading': 'My Sermons',
    'sermons.desc': 'Your saved research sessions. Click any entry to reload the research.',
    'list.loading': 'Loading…',
    'footer.text': 'Sermon Tools &nbsp;·&nbsp; IMB Innovation Team',

    'scripture.label': 'Passage text',
    'translation.verbatimTag': 'verbatim',

    'auth.signIn': 'Sign in with Google',
    'auth.signOut': 'Sign out',

    'settings.button': 'Settings',
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.translation': 'Preferred translation',
    'settings.length': 'Default sermon length',
    'settings.style': 'Default preaching style',
    'settings.save': 'Save',
    'settings.cancel': 'Cancel',
    'settings.saved': 'Settings saved',
    'settings.saveFailed': 'Could not save settings.',
    'settings.stylePlaceholder': '— No default —',
    'lang.en': 'English',
    'lang.es': 'Spanish',

    'step.title1': 'Historical & Cultural Context',
    'step.title2': 'Text Exegesis',
    'step.title3': 'Cross-References & Biblical Connections',
    'step.title4': 'Theological Themes',
    'step.title5': 'Application & Sermon Angles',

    'styleHint.label': 'Structure',
    'styleHint.expository-hb-charles': 'Verse-by-verse — the passage sets the agenda. Crisp, disciplined outline. Every point emerges from the text.',
    'styleHint.big-idea-tony-evans': 'One governing idea drives everything. Authoritative, theologically grounded, culturally engaged.',
    'styleHint.narrative-terry-anderson': 'Setup → tension → climax → resolution. Dynamic, rhythmic pacing. Truth revealed through the story.',
    'styleHint.inductive-robert-smith': 'Open with tension. Withhold the answer. Lead the congregation to discover truth themselves.',
    'styleHint.expository-ralph-west': 'Text-driven with pastoral depth. Unhurried layering of theological insight. Warm, shepherding tone.',
    'styleHint.problem-solution-tony-evans': 'Name the problem clearly. Present the biblical solution directly. Practical, actionable, no hedging.',
    'styleHint.homiletical-plot-terry-anderson': 'Conflict → complication → clue → Gospel turn → resolution. Builds toward a climactic Gospel moment.',
    'styleHint.topical-hb-charles': 'Multiple texts organized around one topic. Disciplined movement between passages. Clean, logical flow.',
    'styleHint.narrative-ralph-west': 'Story-centered with pastoral pacing. Slower, reflective rhythm. The preacher walks alongside the people.',
    'styleHint.big-idea-robert-smith': 'One idea explored deeply with imagination. Incarnational language — truth is felt as much as understood.',

    'label.stepProgress': 'Step {n} of 5 — {title}',
    'label.researchCompletePassage': 'Research complete — {passage}',
    'label.completeResearch': 'Complete Research',
    'label.savedResearch': 'Saved Research',
    'label.processing': 'Processing...',
    'label.savedCheck': 'Saved ✓',
    'label.savedTitleWithPassage': '{passage} Research',
    'label.savedTitleDefault': 'Sermon Research',
    'label.researchDocTitle': '{passage} — Sermon Research',
    'label.researchDocTitleDefault': 'Sermon Research',
    'label.evalDocTitle': 'Sermon Evaluation',
    'label.writeDocTitle': '{passage} — Sermon Draft',
    'label.writeDocTitleDefault': 'Sermon Draft',

    'list.signIn': 'Sign in to see your saved sermons.',
    'list.empty': 'No saved sermons yet. Complete a research session and click "Save to My Sermons."',
    'list.error': 'Could not load sermons.',
    'list.untitled': 'Untitled',

    'toast.selectBook': 'Please select a book to begin.',
    'toast.researchComplete': 'Research complete!',
    'toast.copied': 'Copied to clipboard',
    'toast.copyFailed': 'Copy failed',
    'toast.noResearch': 'No research to export yet.',
    'toast.noContent': 'No content to export yet.',
    'toast.signedIn': 'Signed in successfully!',
    'toast.signInFailed': 'Sign-in failed. Please try again.',
    'toast.signedOut': 'Signed out',
    'toast.signInToSave': 'Sign in to save your research.',
    'toast.saved': 'Saved to My Sermons!',
    'toast.saveFailed': 'Could not save. Please try again.',
    'toast.researchLoaded': 'Research loaded',
    'toast.loadFailed': 'Could not load sermon.',
    'toast.loadedIntoWriter': 'Research loaded into Sermon Writer',
    'toast.enterPassage': 'Please enter the main Scripture passage.',
    'toast.pasteOrUpload': 'Please paste sermon text or upload a file.',
    'toast.downloaded': 'Downloaded!',
    'toast.preparingWord': 'Preparing Word document…',
    'toast.preparingPdf': 'Preparing PDF…',

    'err.requestFailed': 'Request failed',
    'err.outlineFailed': 'Could not generate the outline.',
    'err.outlineEmpty': 'The outline came back empty. Please try again.',
    'err.noSermonContent': 'No sermon content was generated. Please try again.',
  },

  es: {
    'header.tagline': 'Investigación y preparación bíblica asistida por IA',
    'header.support': 'Apoye este ministerio',

    'tab.research': 'Investigar',
    'tab.write': 'Redactar',
    'tab.evaluate': 'Evaluar',
    'tab.sermons': 'Mis sermones',
    'tab.admin': 'Admin',

    'admin.heading': 'Administración',
    'admin.desc': 'Administre usuarios: bloquee el acceso, asigne un modelo y revise el uso. Haga clic en un usuario para ver sus sermones guardados.',
    'admin.colUser': 'Usuario',
    'admin.colJoined': 'Registrado',
    'admin.colSermons': 'Sermones',
    'admin.colTokens': 'Tokens',
    'admin.colCost': 'Costo est.',
    'admin.colModel': 'Modelo',
    'admin.colAccess': 'Acceso',
    'admin.block': 'Bloquear',
    'admin.unblock': 'Desbloquear',
    'admin.viewSermons': 'Ver sermones',
    'admin.modelDefault': 'Predeterminado',
    'admin.noUsers': 'Aún no hay usuarios.',
    'admin.loadError': 'No se pudo cargar.',
    'admin.blockedToast': 'Usuario bloqueado',
    'admin.unblockedToast': 'Usuario desbloqueado',
    'admin.modelSaved': 'Modelo actualizado',
    'admin.actionFailed': 'La acción falló',
    'admin.userNoSermons': 'Sin sermones guardados.',

    'research.heading': 'Investigación bíblica',
    'research.desc': 'Seleccione un pasaje, elija su traducción y haga clic en <strong>Generar investigación</strong> para recibir una investigación bíblica exhaustiva basada en la exégesis, las referencias cruzadas, los temas teológicos y los enfoques de aplicación.',
    'research.passageLabel': 'Pasaje bíblico',
    'select.book': '— Libro —',
    'bible.ot': 'Antiguo Testamento',
    'bible.nt': 'Nuevo Testamento',
    'select.chapter': 'Cap.',
    'research.versesLabel': 'Versículos',
    'label.optional': 'opcional',
    'ph.from': 'Desde',
    'ph.to': 'Hasta',
    'research.translationLabel': 'Traducción preferida',
    'research.topicLabel': 'Enfoque temático',
    'ph.topic': 'p. ej. la gracia de Dios, la guerra espiritual, la ansiedad',
    'research.notesLabel': 'Contexto adicional',
    'ph.notes': 'Tema de la serie, contexto de la congregación, enfoque específico que está explorando...',
    'research.briefLabel': 'Tipo de informe',
    'brief.concise': 'Informe conciso',
    'brief.expanded': 'Informe ampliado',
    'btn.generateResearch': 'Generar investigación',
    'loading.title': 'Preparando la investigación del sermón',
    'loading.disclaimer': 'Nuestro equipo de IA de eruditos bíblicos está trabajando en la investigación de su sermón. Concédales unos minutos.',
    'loading.step1': 'Contexto histórico y cultural',
    'loading.step2': 'Exégesis del texto',
    'loading.step3': 'Referencias cruzadas y conexiones',
    'loading.step4': 'Temas teológicos',
    'loading.step5': 'Aplicación y enfoques del sermón',
    'research.outputLabel': 'Resultados de la investigación',
    'btn.copy': 'Copiar',
    'btn.word': 'Word',
    'btn.pdf': 'PDF',
    'btn.useInWriter': 'Usar en el redactor de sermones →',
    'research.placeholder': 'Los resultados de la investigación aparecerán aquí.',
    'research.placeholderHint': 'Seleccione un pasaje arriba y haga clic en <strong>Generar investigación</strong> para comenzar.',
    'research.completeTitle': 'Investigación completa — 5 pasos terminados',
    'research.completeDesc': 'Su investigación se ha compilado abajo. Expórtela o guárdela en su cuenta.',
    'btn.downloadPdf': 'Descargar PDF',
    'btn.downloadWord': 'Descargar Word',
    'btn.save': 'Guardar en Mis sermones',

    'write.heading': 'Redactor de sermones',
    'write.desc': 'Genere un bosquejo y un borrador completos del sermón. Agregue sus notas de investigación para un resultado más fundamentado y basado en el texto.',
    'write.passageLabel': 'Pasaje principal',
    'ph.writePassage': 'p. ej. Juan 3:16–21',
    'write.styleLabel': 'Estilo y estructura del sermón',
    'select.styleDefault': '— Elija un enfoque de predicación —',
    'style.opt.expository-hb-charles': 'Expositivo (estructurado y basado en el texto)',
    'style.opt.big-idea-tony-evans': 'Idea central (claro y con autoridad)',
    'style.opt.narrative-terry-anderson': 'Narrativo (basado en la historia y dinámico)',
    'style.opt.inductive-robert-smith': 'Inductivo (descubrimiento experiencial)',
    'style.opt.expository-ralph-west': 'Expositivo (profundo y pastoral)',
    'style.opt.problem-solution-tony-evans': 'Problema–solución (práctico y directo)',
    'style.opt.homiletical-plot-terry-anderson': 'Trama homilética (camino a la celebración)',
    'style.opt.topical-hb-charles': 'Temático (organizado y enfocado)',
    'style.opt.narrative-ralph-west': 'Narrativo (reflexivo y pastoral)',
    'style.opt.big-idea-robert-smith': 'Idea central (experiencial e imaginativo)',
    'write.titleLabel': 'Título del sermón',
    'ph.writeTitle': 'p. ej. El peso de la gracia',
    'write.audienceLabel': 'Contexto de la congregación',
    'ph.writeAudience': 'p. ej. congregación mixta, servicio evangelístico, jóvenes adultos',
    'write.lengthLabel': 'Duración deseada',
    'length.20': '20–25 minutos',
    'length.30': '30–40 minutos',
    'length.45': '45–60 minutos',
    'write.researchLabel': 'Notas de investigación',
    'ph.writeResearch': 'Pegue aquí las notas de investigación, o use «Usar en el redactor de sermones →» desde la pestaña Investigar...',
    'btn.writeDraft': 'Redactar borrador del sermón',
    'write.outputLabel': 'Borrador del sermón',
    'write.placeholder': 'Su bosquejo y borrador del sermón aparecerán aquí.',
    'write.placeholderHint': 'Ingrese un pasaje arriba y haga clic en <strong>Redactar borrador del sermón</strong> para comenzar.',

    'eval.heading': 'Evaluador de sermones',
    'eval.desc': 'Reciba una evaluación honesta y pastoral del fundamento bíblico, la solidez doctrinal, la claridad del evangelio y la calidad de la aplicación de su sermón.',
    'eval.textLabel': 'Texto del sermón',
    'ph.evalText': 'Pegue aquí su sermón completo...',
    'eval.or': 'o suba un archivo',
    'btn.chooseFile': 'Elegir archivo',
    'btn.evaluate': 'Evaluar sermón',
    'eval.outputLabel': 'Evaluación',
    'eval.placeholder': 'Su evaluación aparecerá aquí.',
    'eval.placeholderHint': 'Abarca la exactitud bíblica, la solidez doctrinal, la claridad del evangelio y la calidad de la aplicación.',

    'sermons.heading': 'Mis sermones',
    'sermons.desc': 'Sus sesiones de investigación guardadas. Haga clic en cualquier entrada para volver a cargar la investigación.',
    'list.loading': 'Cargando…',
    'footer.text': 'Sermon Tools &nbsp;·&nbsp; Equipo de Innovación de la IMB',

    'scripture.label': 'Texto del pasaje',
    'translation.verbatimTag': 'texto literal',

    'auth.signIn': 'Iniciar sesión con Google',
    'auth.signOut': 'Cerrar sesión',

    'settings.button': 'Configuración',
    'settings.title': 'Configuración',
    'settings.language': 'Idioma',
    'settings.translation': 'Traducción preferida',
    'settings.length': 'Duración predeterminada del sermón',
    'settings.style': 'Estilo de predicación predeterminado',
    'settings.save': 'Guardar',
    'settings.cancel': 'Cancelar',
    'settings.saved': 'Configuración guardada',
    'settings.saveFailed': 'No se pudo guardar la configuración.',
    'settings.stylePlaceholder': '— Sin predeterminado —',
    'lang.en': 'Inglés',
    'lang.es': 'Español',

    'step.title1': 'Contexto histórico y cultural',
    'step.title2': 'Exégesis del texto',
    'step.title3': 'Referencias cruzadas y conexiones bíblicas',
    'step.title4': 'Temas teológicos',
    'step.title5': 'Aplicación y enfoques del sermón',

    'styleHint.label': 'Estructura',
    'styleHint.expository-hb-charles': 'Versículo por versículo: el pasaje marca la agenda. Bosquejo nítido y disciplinado. Cada punto surge del texto.',
    'styleHint.big-idea-tony-evans': 'Una idea rectora lo impulsa todo. Con autoridad, fundamento teológico y conexión cultural.',
    'styleHint.narrative-terry-anderson': 'Planteamiento → tensión → clímax → resolución. Ritmo dinámico. La verdad se revela a través de la historia.',
    'styleHint.inductive-robert-smith': 'Comience con tensión. Reserve la respuesta. Guíe a la congregación a descubrir la verdad por sí misma.',
    'styleHint.expository-ralph-west': 'Basado en el texto con profundidad pastoral. Despliegue pausado de la verdad teológica. Tono cálido y pastoral.',
    'styleHint.problem-solution-tony-evans': 'Nombre el problema con claridad. Presente la solución bíblica de forma directa. Práctico, aplicable, sin rodeos.',
    'styleHint.homiletical-plot-terry-anderson': 'Conflicto → complicación → pista → giro hacia el evangelio → resolución. Avanza hacia un momento culminante del evangelio.',
    'styleHint.topical-hb-charles': 'Varios textos organizados en torno a un tema. Movimiento disciplinado entre pasajes. Flujo claro y lógico.',
    'styleHint.narrative-ralph-west': 'Centrado en la historia con ritmo pastoral. Cadencia más lenta y reflexiva. El predicador camina junto al pueblo.',
    'styleHint.big-idea-robert-smith': 'Una idea explorada a fondo con imaginación. Lenguaje encarnacional: la verdad se siente tanto como se entiende.',

    'label.stepProgress': 'Paso {n} de 5 — {title}',
    'label.researchCompletePassage': 'Investigación completa — {passage}',
    'label.completeResearch': 'Investigación completa',
    'label.savedResearch': 'Investigación guardada',
    'label.processing': 'Procesando...',
    'label.savedCheck': 'Guardado ✓',
    'label.savedTitleWithPassage': 'Investigación: {passage}',
    'label.savedTitleDefault': 'Investigación de sermón',
    'label.researchDocTitle': '{passage} — Investigación del sermón',
    'label.researchDocTitleDefault': 'Investigación del sermón',
    'label.evalDocTitle': 'Evaluación del sermón',
    'label.writeDocTitle': '{passage} — Borrador del sermón',
    'label.writeDocTitleDefault': 'Borrador del sermón',

    'list.signIn': 'Inicie sesión para ver sus sermones guardados.',
    'list.empty': 'Aún no hay sermones guardados. Complete una sesión de investigación y haga clic en «Guardar en Mis sermones».',
    'list.error': 'No se pudieron cargar los sermones.',
    'list.untitled': 'Sin título',

    'toast.selectBook': 'Seleccione un libro para comenzar.',
    'toast.researchComplete': '¡Investigación completa!',
    'toast.copied': 'Copiado al portapapeles',
    'toast.copyFailed': 'Error al copiar',
    'toast.noResearch': 'Aún no hay investigación para exportar.',
    'toast.noContent': 'Aún no hay contenido para exportar.',
    'toast.signedIn': '¡Sesión iniciada con éxito!',
    'toast.signInFailed': 'Error al iniciar sesión. Inténtelo de nuevo.',
    'toast.signedOut': 'Sesión cerrada',
    'toast.signInToSave': 'Inicie sesión para guardar su investigación.',
    'toast.saved': '¡Guardado en Mis sermones!',
    'toast.saveFailed': 'No se pudo guardar. Inténtelo de nuevo.',
    'toast.researchLoaded': 'Investigación cargada',
    'toast.loadFailed': 'No se pudo cargar el sermón.',
    'toast.loadedIntoWriter': 'Investigación cargada en el redactor de sermones',
    'toast.enterPassage': 'Ingrese el pasaje bíblico principal.',
    'toast.pasteOrUpload': 'Pegue el texto del sermón o suba un archivo.',
    'toast.downloaded': '¡Descargado!',
    'toast.preparingWord': 'Preparando documento de Word…',
    'toast.preparingPdf': 'Preparando PDF…',

    'err.requestFailed': 'La solicitud falló.',
    'err.outlineFailed': 'No se pudo generar el bosquejo.',
    'err.outlineEmpty': 'El bosquejo llegó vacío. Inténtelo de nuevo.',
    'err.noSermonContent': 'No se generó contenido del sermón. Inténtelo de nuevo.',
  },
};

// Language-dependent Bible version lists for the translation picker.
const BIBLE_VERSIONS = {
  en: {
    default: 'NLT',
    options: [
      ['NKJV', 'NKJV — New King James Version'],
      ['ESV',  'ESV — English Standard Version'],
      ['CSB',  'CSB — Christian Standard Bible'],
      ['NIV',  'NIV — New International Version'],
      ['NLT',  'NLT — New Living Translation'],
      ['KJV',  'KJV — King James Version'],
      ['NASB', 'NASB — New American Standard Bible'],
      ['LEB',  'LEB — Lexham English Bible'],
      ['LSB',  'LSB — Legacy Standard Bible'],
      ['ASV',  'ASV — American Standard Version'],
    ],
  },
  es: {
    default: 'NVI',
    options: [
      ['NVI',     'NVI — Nueva Versión Internacional'],
      ['RVR1960', 'RVR1960 — Reina-Valera 1960'],
      ['RVA',     'RVA — Reina-Valera Actualizada'],
      ['NTV',     'NTV — Nueva Traducción Viviente'],
      ['LBLA',    'LBLA — La Biblia de las Américas'],
      ['RVC',     'RVC — Reina Valera Contemporánea'],
      ['TLA',     'TLA — Traducción en Lenguaje Actual'],
    ],
  },
};

// Translation codes the backend can serve verbatim (populated from
// /api/verse-translations on load). Drives the picker's "verbatim" marker.
let verbatimSet = new Set();

let currentLang = 'en';

function resolveLang() {
  // Precedence: ?lang= URL param → localStorage → browser language → English.
  const params = new URLSearchParams(location.search);
  const q = (params.get('lang') || '').toLowerCase();
  if (q.startsWith('es')) return 'es';
  if (q.startsWith('en')) return 'en';
  let saved = null;
  try { saved = localStorage.getItem('lang'); } catch {}
  if (saved === 'es' || saved === 'en') return saved;
  const nav = (navigator.language || '').toLowerCase();
  if (nav.startsWith('es')) return 'es';
  return 'en';
}

function t(key) {
  const table = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  if (key in table) return table[key];
  if (key in TRANSLATIONS.en) return TRANSLATIONS.en[key];
  return key;
}

function stepTitle(n) {
  return t('step.title' + n);
}

function rebuildTranslationOptions(lang) {
  const sel = document.getElementById('research-translation');
  if (!sel) return;
  const set = BIBLE_VERSIONS[lang] || BIBLE_VERSIONS.en;
  const prev = sel.value;
  sel.innerHTML = set.options
    .map(([v, label]) => {
      const mark = verbatimSet.has(v) ? ` · ${t('translation.verbatimTag')}` : '';
      return `<option value="${v}">${esc(label + mark)}</option>`;
    })
    .join('');
  // Keep the prior selection if it still exists in this language, else default.
  sel.value = set.options.some(([v]) => v === prev) ? prev : set.default;
}

function applyLang(lang) {
  currentLang = lang === 'es' ? 'es' : 'en';
  document.documentElement.lang = currentLang;
  try { localStorage.setItem('lang', currentLang); } catch {}

  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = t(el.getAttribute('data-i18n-html'));
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph')));
  });
  document.querySelectorAll('[data-i18n-label]').forEach(el => {
    el.setAttribute('label', t(el.getAttribute('data-i18n-label')));
  });

  rebuildTranslationOptions(currentLang);

  const enBtn = document.getElementById('lang-en');
  const esBtn = document.getElementById('lang-es');
  if (enBtn) enBtn.classList.toggle('active', currentLang === 'en');
  if (esBtn) esBtn.classList.toggle('active', currentLang === 'es');

  // Refresh JS-driven bits that aren't plain data-i18n nodes.
  showStyleHint();
  updateAuthUI();
}

function setLang(lang) {
  applyLang(lang);
}

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
  if (tab === 'admin') loadAdminUsers();
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

function showStyleHint() {
  const styleEl = document.getElementById('write-style');
  const hintEl = document.getElementById('style-hint');
  if (!styleEl || !hintEl) return;
  const key = styleEl.value;
  const hintKey = 'styleHint.' + key;
  if (!key || !(hintKey in TRANSLATIONS.en)) {
    hintEl.classList.remove('visible');
    hintEl.innerHTML = '';
    return;
  }
  hintEl.innerHTML = `<strong>${esc(t('styleHint.label'))}:</strong> ${esc(t(hintKey))}`;
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
  if (currentUser) loadSettings();

  // Show/hide URL auth feedback
  const params = new URLSearchParams(location.search);
  if (params.get('auth') === 'ok') {
    showToast(t('toast.signedIn'), 'success');
    history.replaceState({}, '', '/');
  } else if (params.get('auth') === 'error') {
    showToast(t('toast.signInFailed'), 'error');
    history.replaceState({}, '', '/');
  }
}

function updateAuthUI() {
  const area = document.getElementById('auth-area');
  const sermonsTabBtn = document.getElementById('tab-btn-sermons');
  const adminTabBtn = document.getElementById('tab-btn-admin');
  const saveBtn = document.getElementById('save-sermon-btn');
  if (!area) return;

  if (adminTabBtn) adminTabBtn.style.display = (currentUser && currentUser.is_admin) ? '' : 'none';

  if (currentUser) {
    area.innerHTML = `
      <div class="auth-user">
        ${currentUser.picture ? `<img src="${esc(currentUser.picture)}" class="user-avatar" alt="">` : ''}
        <span class="user-name">${esc(currentUser.name || currentUser.email)}</span>
        <button class="btn-settings" onclick="openSettings()" title="${esc(t('settings.button'))}" aria-label="${esc(t('settings.button'))}">⚙</button>
        <button class="btn-auth-out" onclick="logout()">${esc(t('auth.signOut'))}</button>
      </div>`;
    if (sermonsTabBtn) sermonsTabBtn.style.display = '';
    if (saveBtn) saveBtn.style.display = '';
  } else {
    area.innerHTML = `<button class="btn-auth-in" onclick="loginWithGoogle()">${esc(t('auth.signIn'))}</button>`;
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
  userPrefs = null;
  updateAuthUI();
  showToast(t('toast.signedOut'), 'success');
}

// ── User Settings (per-account preferences) ──────────────────────────────────

let userPrefs = null;

function urlHasLang() {
  const q = (new URLSearchParams(location.search).get('lang') || '').toLowerCase();
  return q.startsWith('es') || q.startsWith('en');
}

async function loadSettings() {
  try {
    const r = await fetch('/api/settings');
    if (!r.ok) return;
    userPrefs = await r.json();
    applySettings(userPrefs);
  } catch {}
}

// Apply saved prefs to the live app. Language only overrides if the URL didn't
// pin one (a shared ?lang= link still wins). Translation/length/style become the
// picker defaults.
function applySettings(prefs) {
  if (!prefs) return;
  if (prefs.lang && !urlHasLang() && prefs.lang !== currentLang) {
    applyLang(prefs.lang);  // rebuilds translation options for the new language
  }
  if (prefs.translation) {
    const sel = document.getElementById('research-translation');
    if (sel && [...sel.options].some(o => o.value === prefs.translation)) sel.value = prefs.translation;
  }
  if (prefs.length) {
    const sel = document.getElementById('write-length');
    if (sel && [...sel.options].some(o => o.value === prefs.length)) sel.value = prefs.length;
  }
  if (prefs.style) {
    const sel = document.getElementById('write-style');
    if (sel && [...sel.options].some(o => o.value === prefs.style)) { sel.value = prefs.style; showStyleHint(); }
  }
}

function populateModalTranslations(lang, selected) {
  const sel = document.getElementById('set-translation');
  const set = BIBLE_VERSIONS[lang] || BIBLE_VERSIONS.en;
  sel.innerHTML = set.options.map(([v, label]) => {
    const mark = verbatimSet.has(v) ? ` · ${t('translation.verbatimTag')}` : '';
    return `<option value="${v}">${esc(label + mark)}</option>`;
  }).join('');
  if (selected && set.options.some(([v]) => v === selected)) sel.value = selected;
  else sel.value = set.default;
}

function onSettingsLangChange() {
  populateModalTranslations(document.getElementById('set-lang').value, null);
}

function openSettings() {
  if (!currentUser) return;
  const p = userPrefs || {};
  // Language select
  const langSel = document.getElementById('set-lang');
  langSel.innerHTML = `<option value="en">${esc(t('lang.en'))}</option><option value="es">${esc(t('lang.es'))}</option>`;
  langSel.value = p.lang || currentLang;
  // Translation (depends on chosen language)
  populateModalTranslations(langSel.value, p.translation || document.getElementById('research-translation').value);
  // Length + style: reuse the (already-translated) options from the Write form
  const lenSel = document.getElementById('set-length');
  lenSel.innerHTML = document.getElementById('write-length').innerHTML;
  lenSel.value = p.length || document.getElementById('write-length').value;
  const styleSel = document.getElementById('set-style');
  styleSel.innerHTML = document.getElementById('write-style').innerHTML;
  if (p.style) styleSel.value = p.style;
  document.getElementById('settings-overlay').style.display = 'flex';
}

function closeSettings() {
  document.getElementById('settings-overlay').style.display = 'none';
}

async function saveSettings() {
  const body = {
    lang: document.getElementById('set-lang').value,
    translation: document.getElementById('set-translation').value,
    length: document.getElementById('set-length').value,
    style: document.getElementById('set-style').value,
  };
  try {
    const r = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!r.ok) throw new Error();
    userPrefs = await r.json();
    applySettings(userPrefs);
    closeSettings();
    showToast(t('settings.saved'), 'success');
  } catch {
    showToast(t('settings.saveFailed'), 'error');
  }
}

// ── Admin ────────────────────────────────────────────────────────────────────

let adminModels = null;

async function loadAdminModels() {
  if (adminModels) return adminModels;
  try {
    const r = await fetch('/api/admin/models');
    if (r.ok) adminModels = await r.json();
  } catch {}
  return adminModels || { models: [], default: '' };
}

function _adminDate(s) {
  if (!s) return '';
  const locale = currentLang === 'es' ? 'es-ES' : 'en-US';
  return new Date(s.replace(' ', 'T') + 'Z').toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' });
}

async function loadAdminUsers() {
  const wrap = document.getElementById('admin-users');
  document.getElementById('admin-sermons').style.display = 'none';
  wrap.innerHTML = `<div class="output-placeholder">${esc(t('list.loading'))}</div>`;
  const mdl = await loadAdminModels();
  try {
    const r = await fetch('/api/admin/users');
    if (!r.ok) throw new Error();
    const users = await r.json();
    if (!users.length) { wrap.innerHTML = `<div class="output-placeholder">${esc(t('admin.noUsers'))}</div>`; return; }
    const locale = currentLang === 'es' ? 'es-ES' : 'en-US';
    const modelOpts = (sel) =>
      `<option value="">${esc(t('admin.modelDefault'))}</option>` +
      mdl.models.map(m => `<option value="${esc(m.id)}"${m.id === sel ? ' selected' : ''}>${esc(m.label)}</option>`).join('');
    const rows = users.map(u => `
      <tr>
        <td><div class="admin-name">${esc(u.name || '—')}</div><div class="admin-email">${esc(u.email)}</div></td>
        <td>${esc(_adminDate(u.created_at))}</td>
        <td class="admin-num">${u.sermon_count}</td>
        <td class="admin-num">${(u.total_tokens || 0).toLocaleString(locale)}</td>
        <td class="admin-num">$${(u.total_cost || 0).toFixed(4)}</td>
        <td><select onchange="setUserModel(${u.id}, this.value)">${modelOpts(u.assigned_model)}</select></td>
        <td><button class="btn-ghost${u.blocked ? ' is-blocked' : ''}" onclick="toggleBlock(${u.id}, ${u.blocked ? 0 : 1})">${esc(u.blocked ? t('admin.unblock') : t('admin.block'))}</button></td>
        <td><button class="btn-ghost" onclick="viewUserSermons(${u.id}, ${JSON.stringify(u.name || u.email)})">${esc(t('admin.viewSermons'))}</button></td>
      </tr>`).join('');
    wrap.innerHTML = `<div class="admin-table-scroll"><table class="admin-table">
      <thead><tr>
        <th>${esc(t('admin.colUser'))}</th><th>${esc(t('admin.colJoined'))}</th>
        <th>${esc(t('admin.colSermons'))}</th><th>${esc(t('admin.colTokens'))}</th>
        <th>${esc(t('admin.colCost'))}</th><th>${esc(t('admin.colModel'))}</th>
        <th>${esc(t('admin.colAccess'))}</th><th></th>
      </tr></thead><tbody>${rows}</tbody></table></div>`;
  } catch {
    wrap.innerHTML = `<div class="output-placeholder">${esc(t('admin.loadError'))}</div>`;
  }
}

async function toggleBlock(userId, blocked) {
  try {
    const r = await fetch(`/api/admin/users/${userId}/block`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blocked: !!blocked }),
    });
    if (!r.ok) throw new Error();
    showToast(blocked ? t('admin.blockedToast') : t('admin.unblockedToast'), 'success');
    loadAdminUsers();
  } catch { showToast(t('admin.actionFailed'), 'error'); }
}

async function setUserModel(userId, model) {
  try {
    const r = await fetch(`/api/admin/users/${userId}/model`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: model || null }),
    });
    if (!r.ok) throw new Error();
    showToast(t('admin.modelSaved'), 'success');
  } catch { showToast(t('admin.actionFailed'), 'error'); }
}

async function viewUserSermons(userId, label) {
  const box = document.getElementById('admin-sermons');
  box.style.display = '';
  box.innerHTML = `<div class="output-placeholder">${esc(t('list.loading'))}</div>`;
  try {
    const r = await fetch(`/api/admin/users/${userId}/sermons`);
    if (!r.ok) throw new Error();
    const sermons = await r.json();
    const head = `<div class="admin-sermons-head"><strong>${esc(label)}</strong> · ${sermons.length} ${esc(t('tab.sermons'))}</div>`;
    if (!sermons.length) { box.innerHTML = head + `<div class="output-placeholder">${esc(t('admin.userNoSermons'))}</div>`; return; }
    box.innerHTML = head + sermons.map(s => `
      <div class="sermon-card">
        <div class="sermon-card-title">${esc(s.title || t('list.untitled'))}</div>
        <div class="sermon-card-meta">
          ${s.passage ? `<span>${esc(s.passage)}</span>` : ''}
          <span>${esc(_adminDate(s.updated_at))}</span>
        </div>
      </div>`).join('');
  } catch { box.innerHTML = `<div class="output-placeholder">${esc(t('admin.loadError'))}</div>`; }
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
    chapterSel.innerHTML = `<option value="">${esc(t('select.chapter'))}</option>`;
    chapterSel.disabled = true;
    return;
  }
  const count = CHAPTER_COUNTS[book] || 1;
  let opts = `<option value="">${esc(t('select.chapter'))}</option>`;
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

// ── Verbatim Scripture ──────────────────────────────────────────────────────
// Fetch the exact verse text for the chosen translation (when a provider can
// serve it), show it to the pastor, and forward it to the AI prompts. Fails
// soft: a miss returns null → no panel, prompts behave as before.

async function loadVerbatimTranslations() {
  try {
    const r = await fetch('/api/verse-translations');
    if (r.ok) {
      const d = await r.json();
      verbatimSet = new Set(d.verbatim || []);
    }
  } catch {}
  rebuildTranslationOptions(currentLang);  // re-mark options now that we know
}

async function fetchPassage(ref, translation) {
  if (!ref || !translation) return null;
  try {
    const r = await fetch(`/api/passage?ref=${encodeURIComponent(ref)}&translation=${encodeURIComponent(translation)}`);
    if (!r.ok) return null;
    const d = await r.json();
    return (d && d.text) ? d : null;
  } catch {
    return null;
  }
}

function renderScripturePanel(elId, reference, data) {
  const el = document.getElementById(elId);
  if (!el) return;
  if (!data || !data.text) {
    el.style.display = 'none';
    el.innerHTML = '';
    return;
  }
  el.innerHTML = `
    <div class="scripture-label">${esc(t('scripture.label'))}</div>
    <div class="scripture-head">
      <span class="scripture-ref">${esc(reference)}</span>
      <span class="scripture-version">${esc(data.version || '')}</span>
    </div>
    <div class="scripture-body">${esc(data.text).replace(/\n/g, '<br>')}</div>
    <div class="scripture-attr">${esc(data.attribution || '')}</div>`;
  el.style.display = '';
}

// ── Research Steps ────────────────────────────────────────────────────────────

const STEP_COUNT = 5;

const researchState = {
  passage: '',
  topic: '',
  notes: '',
  translation: 'NLT',
  briefType: 'concise',
  currentStep: 0,
  stepResults: [],
  compiled: '',
  passageData: null,
};

function renderStepDots() {
  const dotsEl = document.getElementById('step-dots');
  const labelEl = document.getElementById('step-label');
  if (!dotsEl) return;
  let dots = '';
  for (let n = 1; n <= STEP_COUNT; n++) {
    const done = n < researchState.currentStep;
    const active = n === researchState.currentStep;
    dots += `<span class="step-dot ${done ? 'done' : active ? 'active' : ''}" title="${esc(stepTitle(n))}"></span>`;
  }
  dotsEl.innerHTML = dots;
  if (labelEl && researchState.currentStep >= 1 && researchState.currentStep <= STEP_COUNT) {
    labelEl.textContent = t('label.stepProgress')
      .replace('{n}', researchState.currentStep)
      .replace('{title}', stepTitle(researchState.currentStep));
  }
}

async function doResearch() {
  const passage = buildPassageString();
  if (!passage) {
    showToast(t('toast.selectBook'), 'error');
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
  researchState.passageData = null;

  document.getElementById('loading-ref').textContent = passage;
  showLoadingOverlay(true);

  // Fetch verbatim passage text (if a provider serves this translation) so the
  // research is grounded in exact wording and the pastor sees the passage.
  researchState.passageData = await fetchPassage(passage, researchState.translation);
  renderScripturePanel('research-scripture', passage, researchState.passageData);
  document.getElementById('step-progress').style.display = 'none';
  document.getElementById('research-complete').style.display = 'none';
  document.getElementById('research-actions').style.display = 'none';

  for (let i = 1; i <= STEP_COUNT; i++) setLoadingStep(i, 'pending');

  setLoading('research-btn', true);
  await runAllSteps();
  setLoading('research-btn', false);
}

async function runAllSteps() {
  document.getElementById('research-output').innerHTML = '';

  for (let stepNum = 1; stepNum <= STEP_COUNT; stepNum++) {
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
          lang:        currentLang,
          passage_text:        researchState.passageData ? researchState.passageData.text : null,
          passage_attribution: researchState.passageData ? researchState.passageData.attribution : null,
        },
        'research-output'
      );

      if (text) {
        researchState.stepResults.push({ title: stepTitle(stepNum), content: text });
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
  document.getElementById('research-output-label').textContent = t('label.completeResearch');
  const completeTitle = document.querySelector('.complete-title');
  if (completeTitle) {
    completeTitle.textContent = t('label.researchCompletePassage').replace('{passage}', researchState.passage);
  }

  document.getElementById('step-progress').style.display = 'none';
  document.getElementById('research-complete').style.display = '';
  document.getElementById('research-actions').style.display = 'flex';

  // Show save button only if logged in
  const saveBtn = document.getElementById('save-sermon-btn');
  if (saveBtn) saveBtn.style.display = currentUser ? '' : 'none';

  showToast(t('toast.researchComplete'), 'success');
}

// ── Save Sermon ───────────────────────────────────────────────────────────────

async function saveSermon() {
  if (!currentUser) {
    showToast(t('toast.signInToSave'), 'error');
    return;
  }
  const passage = researchState.passage;
  const topic = researchState.topic;
  const title = passage
    ? t('label.savedTitleWithPassage').replace('{passage}', passage)
    : t('label.savedTitleDefault');

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
    showToast(t('toast.saved'), 'success');
    const saveBtn = document.getElementById('save-sermon-btn');
    if (saveBtn) {
      saveBtn.textContent = t('label.savedCheck');
      saveBtn.disabled = true;
    }
  } catch (err) {
    showToast(t('toast.saveFailed'), 'error');
  }
}

// ── Load Sermons List ─────────────────────────────────────────────────────────

async function loadSermonsList() {
  const listEl = document.getElementById('sermons-list');
  if (!currentUser) {
    listEl.innerHTML = `<div class="output-placeholder">${esc(t('list.signIn'))}</div>`;
    return;
  }
  listEl.innerHTML = `<div class="output-placeholder">${esc(t('list.loading'))}</div>`;
  try {
    const res = await fetch('/api/sermons');
    if (!res.ok) throw new Error();
    const sermons = await res.json();
    if (!sermons.length) {
      listEl.innerHTML = `<div class="output-placeholder">${esc(t('list.empty'))}</div>`;
      return;
    }
    const locale = currentLang === 'es' ? 'es-ES' : 'en-US';
    listEl.innerHTML = sermons.map(s => `
      <div class="sermon-card" onclick="loadSavedSermon(${s.id})">
        <div class="sermon-card-title">${esc(s.title || t('list.untitled'))}</div>
        <div class="sermon-card-meta">
          ${s.passage ? `<span>${esc(s.passage)}</span>` : ''}
          ${s.topic ? `<span>${esc(s.topic)}</span>` : ''}
          <span>${new Date(s.updated_at).toLocaleDateString(locale, {month:'short', day:'numeric', year:'numeric'})}</span>
        </div>
      </div>
    `).join('');
  } catch {
    listEl.innerHTML = `<div class="output-placeholder">${esc(t('list.error'))}</div>`;
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
    document.getElementById('research-output-label').textContent = t('label.savedResearch');
    document.getElementById('step-progress').style.display = 'none';
    document.getElementById('research-complete').style.display = '';
    document.getElementById('research-actions').style.display = 'flex';

    switchTab('research');
    showToast(t('toast.researchLoaded'), 'success');
  } catch {
    showToast(t('toast.loadFailed'), 'error');
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
    let errMsg = t('err.requestFailed');
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
    let errMsg = t('err.requestFailed');
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
    btn.innerHTML = `<span class="spinner"></span>&nbsp; ${esc(t('label.processing'))}`;
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
    document.getElementById('research-actions-copy').textContent = t('toast.copied');
    setTimeout(() => { document.getElementById('research-actions-copy').textContent = t('btn.copy'); }, 2000);
    showToast(t('toast.copied'), 'success');
  }).catch(() => showToast(t('toast.copyFailed'), 'error'));
}

async function exportResearch(format) {
  const text = rawContent['research-output'] || researchState.compiled;
  if (!text) { showToast(t('toast.noResearch'), 'error'); return; }
  const passage = researchState.passage;
  const title = passage
    ? t('label.researchDocTitle').replace('{passage}', passage)
    : t('label.researchDocTitleDefault');
  await _exportDoc(text, format, title);
}

// ── Copy / Export (Generic) ───────────────────────────────────────────────────

function copyOutput(outputId, labelId) {
  const el = document.getElementById(outputId);
  const text = el.innerText || el.textContent;
  navigator.clipboard.writeText(text).then(() => {
    const label = document.getElementById(labelId);
    if (label) {
      label.textContent = t('toast.copied');
      setTimeout(() => { label.textContent = t('btn.copy'); }, 2000);
    }
    showToast(t('toast.copied'), 'success');
  }).catch(() => showToast(t('toast.copyFailed'), 'error'));
}

async function exportContent(outputId, format) {
  const text = rawContent[outputId];
  if (!text) { showToast(t('toast.noContent'), 'error'); return; }
  let title = 'Sermon Tools';
  if (outputId === 'write-output') {
    const tt = document.getElementById('write-title').value.trim();
    const p = document.getElementById('write-passage').value.trim();
    title = tt || (p ? t('label.writeDocTitle').replace('{passage}', p) : t('label.writeDocTitleDefault'));
  } else if (outputId === 'eval-output') {
    title = t('label.evalDocTitle');
  }
  await _exportDoc(text, format, title);
}

async function _exportDoc(text, format, title) {
  showToast(format === 'docx' ? t('toast.preparingWord') : t('toast.preparingPdf'));
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
    showToast(t('toast.downloaded'), 'success');
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
  showToast(t('toast.loadedIntoWriter'), 'success');
}

// ── Write ─────────────────────────────────────────────────────────────────────

async function doWrite() {
  const passage = document.getElementById('write-passage').value.trim();
  if (!passage) {
    showToast(t('toast.enterPassage'), 'error');
    document.getElementById('write-passage').focus();
    return;
  }
  const title = document.getElementById('write-title').value.trim();
  const audience = document.getElementById('write-audience').value.trim();
  const research_notes = document.getElementById('write-research').value.trim();
  const sermon_length = document.getElementById('write-length').value;
  const style = document.getElementById('write-style').value;

  // Verbatim passage text grounds the draft. The Write tab has no version
  // picker, so use the last-chosen research translation, else the language
  // default. Misses (e.g. a Spanish-typed ref) just skip the panel/injection.
  const writeTranslation = researchState.translation || (BIBLE_VERSIONS[currentLang] || BIBLE_VERSIONS.en).default;
  const passageData = await fetchPassage(passage, writeTranslation);
  renderScripturePanel('write-scripture', passage, passageData);

  const body = {
    passage, title, audience, research_notes, sermon_length, style, lang: currentLang,
    passage_text:        passageData ? passageData.text : null,
    passage_attribution: passageData ? passageData.attribution : null,
  };

  setLoading('write-btn', true);
  document.getElementById('write-actions').style.display = 'none';
  const out = document.getElementById('write-output');
  out.innerHTML = `<div class="streaming-dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>`;

  try {
    // 1. Outline first — one quick call decides the sermon's sections.
    const oRes = await fetch('/api/write/outline', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!oRes.ok) {
      let d = {}; try { d = await oRes.json(); } catch {}
      throw new Error(d.detail || t('err.outlineFailed'));
    }
    const { sections } = await oRes.json();
    if (!sections || !sections.length) throw new Error(t('err.outlineEmpty'));

    // 2. Stream each section in its own call — no single call has to fit the
    //    whole sermon, so nothing gets truncated.
    out.innerHTML = '';
    const priorParts = [];
    for (let i = 0; i < sections.length; i++) {
      const secEl = document.createElement('div');
      secEl.className = 'sermon-section';
      secEl.id = `write-sec-${i}`;
      out.appendChild(secEl);
      const text = await streamToOutput('/api/write/section', {
        ...body,
        outline: sections,
        section_title: sections[i],
        prior_sections: priorParts.join('\n\n') || null,
      }, `write-sec-${i}`);
      if (text) priorParts.push(text);
    }

    const compiled = priorParts.join('\n\n');
    rawContent['write-output'] = compiled;
    if (compiled) document.getElementById('write-actions').style.display = 'flex';
    else throw new Error(t('err.noSermonContent'));
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
  if (!text && !file) { showToast(t('toast.pasteOrUpload'), 'error'); return; }

  const formData = new FormData();
  if (file) { formData.append('file', file); } else { formData.append('sermon_text', text); }
  formData.append('lang', currentLang);

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
  applyLang(resolveLang());
  loadVerbatimTranslations();
  checkAuth();

  // Enter on verse-end triggers research
  document.getElementById('research-verse-end').addEventListener('keydown', e => {
    if (e.key === 'Enter') doResearch();
  });

  document.getElementById('write-passage').addEventListener('keydown', e => {
    if (e.key === 'Enter') doWrite();
  });
});
