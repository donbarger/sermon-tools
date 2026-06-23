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
    'tab.write': 'Sermon Draft',
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
    'btn.useInWriter': 'Use in Sermon Draft →',
    'research.placeholder': 'Research results will appear here.',
    'research.placeholderHint': 'Select a passage above and click <strong>Generate Research</strong> to begin.',
    'research.completeTitle': 'Research complete — 5 steps done',
    'research.completeDesc': 'Your research has been compiled below. Export it or save it to your account.',
    'btn.downloadPdf': 'Download PDF',
    'btn.downloadWord': 'Download Word',
    'btn.save': 'Save to My Sermons',

    'write.heading': 'Sermon Draft',
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
    'footer.text': 'Sermon Tools · IMB Innovation Team',
    'footer.terms': 'Terms',
    'footer.privacy': 'Privacy',

    'scripture.label': 'Passage text',
    'translation.verbatimTag': 'verbatim',

    'auth.signIn': 'Sign in with Google',
    'auth.signOut': 'Sign out',

    'landing.title': 'Sermon Tools',
    'landing.intro': 'An AI-assisted workspace for biblical preaching. Research a passage with real scholarly grounding, shape a complete sermon draft, and evaluate it for biblical faithfulness — in English or Spanish, with Scripture quoted verbatim in your preferred translation.',
    'landing.f1t': 'Research',
    'landing.f1': 'Historical context, exegesis, cross-references, themes, and application — grounded in real scholarship.',
    'landing.f2t': 'Craft',
    'landing.f2': 'Build the sermon yourself on a workbench — your big idea, your movements — with AI as a mentor that asks good questions and an editor that helps where you point.',
    'landing.f3t': 'Evaluate',
    'landing.f3': 'A pastoral, five-dimension review of any sermon’s biblical groundedness.',
    'landing.note': 'Sign in with your Google account to begin.',

    'tab.craft': 'Craft',
    'craft.researchRail': 'Research',
    'craft.addResearch': '✦ Add research',
    'craft.addResearchPh': 'Research a question or another passage…',
    'craft.addResearchEmpty': 'Type a question or passage to research.',
    'craft.noResearch': 'Run Research first, add research here, or start from a blank canvas.',
    'craft.showResearch': 'Research ›',
    'craft.titlePh': 'Sermon title (optional)',
    'craft.bigIdea': 'Big Idea',
    'craft.bigIdeaPh': 'The one thing they should walk away with…',
    'craft.helpThink': '✦ Help me think',
    'craft.addPoint': '+ Add a point',
    'craft.introTitle': 'Introduction',
    'craft.conclusionTitle': 'Conclusion',
    'craft.save': 'Save to My Sermons',
    'craft.empty': 'No points yet. Add one, or use “Help me think” to draft a structure from your ideas.',
    'craft.pointTitlePh': 'Point / heading…',
    'craft.movementTextPh': 'Write in your words…',
    'craft.aDraft': '✦ Draft from my notes',
    'craft.aIllustrate': 'Illustration',
    'craft.aCrossRef': 'Find a verse',
    'craft.aTighten': 'Tighten',
    'craft.aFaithful': 'Faithful to the text?',
    'craft.qG1': 'What is the one thing they must walk away with?',
    'craft.qG2': 'Where is the tension or question in the text?',
    'craft.qG3': 'Who is in the room — and what are they carrying?',
    'craft.qG4': 'What response are you hoping for?',
    'craft.qM1': 'Is there a story or image you want to tell here?',
    'craft.qM2': 'What objection might a listener raise?',
    'craft.qM3': 'Where is the Gospel in this movement?',
    'craft.coachStructure': 'Draft a big idea & movements from my answers',
    'craft.coachWeave': 'Weave my answer in',
    'craft.coachPh': 'Jot your thoughts here…',
    'craft.coachEmpty': 'Write a few thoughts first.',
    'craft.suggestion': '✦ Suggestion',
    'craft.applyStructure': 'Use this structure',
    'craft.insert': 'Insert',
    'craft.replace': 'Replace selection',
    'craft.discard': 'Discard',
    'craft.structureApplied': 'Structure added — edit freely',
    'craft.untitled': 'Untitled sermon',
    'craft.saved': 'Saved to My Sermons',
    'craft.loaded': 'Draft loaded',

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
    'tab.write': 'Borrador del sermón',
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
    'btn.useInWriter': 'Usar en Borrador del sermón →',
    'research.placeholder': 'Los resultados de la investigación aparecerán aquí.',
    'research.placeholderHint': 'Seleccione un pasaje arriba y haga clic en <strong>Generar investigación</strong> para comenzar.',
    'research.completeTitle': 'Investigación completa — 5 pasos terminados',
    'research.completeDesc': 'Su investigación se ha compilado abajo. Expórtela o guárdela en su cuenta.',
    'btn.downloadPdf': 'Descargar PDF',
    'btn.downloadWord': 'Descargar Word',
    'btn.save': 'Guardar en Mis sermones',

    'write.heading': 'Borrador del sermón',
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
    'footer.text': 'Sermon Tools · Equipo de Innovación de la IMB',
    'footer.terms': 'Términos',
    'footer.privacy': 'Privacidad',

    'scripture.label': 'Texto del pasaje',
    'translation.verbatimTag': 'texto literal',

    'auth.signIn': 'Iniciar sesión con Google',
    'auth.signOut': 'Cerrar sesión',

    'landing.title': 'Sermon Tools',
    'landing.intro': 'Un espacio de trabajo asistido por IA para la predicación bíblica. Investigue un pasaje con fundamento académico real, redacte un borrador completo del sermón y evalúe su fidelidad bíblica — en inglés o español, con la Escritura citada textualmente en su traducción preferida.',
    'landing.f1t': 'Investigar',
    'landing.f1': 'Contexto histórico, exégesis, referencias cruzadas, temas y aplicación — con fundamento académico real.',
    'landing.f2t': 'Taller',
    'landing.f2': 'Usted construye el sermón en un taller — su idea central, sus movimientos — con la IA como un mentor que hace buenas preguntas y un editor que ayuda donde usted lo indique.',
    'landing.f3t': 'Evaluar',
    'landing.f3': 'Una evaluación pastoral de cinco dimensiones del fundamento bíblico de un sermón.',
    'landing.note': 'Inicie sesión con su cuenta de Google para comenzar.',

    'tab.craft': 'Taller',
    'craft.researchRail': 'Investigación',
    'craft.addResearch': '✦ Agregar investigación',
    'craft.addResearchPh': 'Investigue una pregunta u otro pasaje…',
    'craft.addResearchEmpty': 'Escriba una pregunta o un pasaje para investigar.',
    'craft.noResearch': 'Haga primero la Investigación, agregue investigación aquí, o comience con un lienzo en blanco.',
    'craft.showResearch': 'Investigación ›',
    'craft.titlePh': 'Título del sermón (opcional)',
    'craft.bigIdea': 'Idea central',
    'craft.bigIdeaPh': 'Lo único que deben recordar al salir…',
    'craft.helpThink': '✦ Ayúdame a pensar',
    'craft.addPoint': '+ Agregar un punto',
    'craft.introTitle': 'Introducción',
    'craft.conclusionTitle': 'Conclusión',
    'craft.save': 'Guardar en Mis sermones',
    'craft.empty': 'Aún no hay puntos. Agregue uno o use «Ayúdame a pensar» para bosquejar una estructura a partir de sus ideas.',
    'craft.pointTitlePh': 'Punto / encabezado…',
    'craft.movementTextPh': 'Escriba con sus palabras…',
    'craft.aDraft': '✦ Redactar desde mis notas',
    'craft.aIllustrate': 'Ilustración',
    'craft.aCrossRef': 'Buscar un versículo',
    'craft.aTighten': 'Condensar',
    'craft.aFaithful': '¿Fiel al texto?',
    'craft.qG1': '¿Cuál es la única cosa que deben recordar al salir?',
    'craft.qG2': '¿Dónde está la tensión o la pregunta en el texto?',
    'craft.qG3': '¿Quiénes están presentes y qué cargan?',
    'craft.qG4': '¿Qué respuesta espera provocar?',
    'craft.qM1': '¿Hay una historia o imagen que quiera contar aquí?',
    'craft.qM2': '¿Qué objeción podría plantear un oyente?',
    'craft.qM3': '¿Dónde está el evangelio en este movimiento?',
    'craft.coachStructure': 'Bosquejar idea central y movimientos a partir de mis respuestas',
    'craft.coachWeave': 'Integrar mi respuesta',
    'craft.coachPh': 'Anote sus pensamientos aquí…',
    'craft.coachEmpty': 'Escriba algunas ideas primero.',
    'craft.suggestion': '✦ Sugerencia',
    'craft.applyStructure': 'Usar esta estructura',
    'craft.insert': 'Insertar',
    'craft.replace': 'Reemplazar selección',
    'craft.discard': 'Descartar',
    'craft.structureApplied': 'Estructura agregada — edite con libertad',
    'craft.untitled': 'Sermón sin título',
    'craft.saved': 'Guardado en Mis sermones',
    'craft.loaded': 'Borrador cargado',

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
  rebuildBookOptions(currentLang);

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
  if (tab === 'craft') loadCraft();
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

  const showAdmin = !!(currentUser && currentUser.is_admin);
  if (adminTabBtn) adminTabBtn.style.display = showAdmin ? '' : 'none';
  // Admin-only UI (the auto-generate "Sermon Draft" tab + its entry points).
  document.querySelectorAll('.admin-only').forEach(el => { el.style.display = showAdmin ? '' : 'none'; });

  applyAuthGate();

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

// Sign-in gate: signed-out visitors see only the landing page; the tool
// (nav + panels) is hidden until they sign in. Backend also enforces this.
function applyAuthGate() {
  const signedIn = !!currentUser;
  const landing = document.getElementById('landing');
  const nav = document.querySelector('.tab-nav');
  const main = document.querySelector('.main-content');
  if (landing) landing.style.display = signedIn ? 'none' : '';
  if (nav) nav.style.display = signedIn ? '' : 'none';
  if (main) main.style.display = signedIn ? '' : 'none';
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

// Spanish display names for the 66 books. The <option> VALUE stays English (the
// verse APIs + USFM mapping need canonical English names); only the label and the
// reference shown to the pastor are localized.
const BOOK_ES = {
  'Genesis': 'Génesis', 'Exodus': 'Éxodo', 'Leviticus': 'Levítico', 'Numbers': 'Números',
  'Deuteronomy': 'Deuteronomio', 'Joshua': 'Josué', 'Judges': 'Jueces', 'Ruth': 'Rut',
  '1 Samuel': '1 Samuel', '2 Samuel': '2 Samuel', '1 Kings': '1 Reyes', '2 Kings': '2 Reyes',
  '1 Chronicles': '1 Crónicas', '2 Chronicles': '2 Crónicas', 'Ezra': 'Esdras', 'Nehemiah': 'Nehemías',
  'Esther': 'Ester', 'Job': 'Job', 'Psalms': 'Salmos', 'Proverbs': 'Proverbios',
  'Ecclesiastes': 'Eclesiastés', 'Song of Solomon': 'Cantares', 'Isaiah': 'Isaías', 'Jeremiah': 'Jeremías',
  'Lamentations': 'Lamentaciones', 'Ezekiel': 'Ezequiel', 'Daniel': 'Daniel', 'Hosea': 'Oseas',
  'Joel': 'Joel', 'Amos': 'Amós', 'Obadiah': 'Abdías', 'Jonah': 'Jonás', 'Micah': 'Miqueas',
  'Nahum': 'Nahúm', 'Habakkuk': 'Habacuc', 'Zephaniah': 'Sofonías', 'Haggai': 'Hageo',
  'Zechariah': 'Zacarías', 'Malachi': 'Malaquías',
  'Matthew': 'Mateo', 'Mark': 'Marcos', 'Luke': 'Lucas', 'John': 'Juan', 'Acts': 'Hechos',
  'Romans': 'Romanos', '1 Corinthians': '1 Corintios', '2 Corinthians': '2 Corintios',
  'Galatians': 'Gálatas', 'Ephesians': 'Efesios', 'Philippians': 'Filipenses', 'Colossians': 'Colosenses',
  '1 Thessalonians': '1 Tesalonicenses', '2 Thessalonians': '2 Tesalonicenses', '1 Timothy': '1 Timoteo',
  '2 Timothy': '2 Timoteo', 'Titus': 'Tito', 'Philemon': 'Filemón', 'Hebrews': 'Hebreos',
  'James': 'Santiago', '1 Peter': '1 Pedro', '2 Peter': '2 Pedro', '1 John': '1 Juan',
  '2 John': '2 Juan', '3 John': '3 Juan', 'Jude': 'Judas', 'Revelation': 'Apocalipsis',
};

// English book names, longest first — so "1 John" matches before "John" in a ref.
const _BOOK_NAMES_BY_LEN = [...BIBLE_BOOKS.OT, ...BIBLE_BOOKS.NT]
  .map(([n]) => n).sort((a, b) => b.length - a.length);

// Localize a passage reference for DISPLAY only (keeps the English value the API uses).
// "Numbers 3:16" -> "Números 3:16" when the UI is Spanish.
function localizePassage(ref) {
  if (currentLang !== 'es' || !ref) return ref;
  for (const en of _BOOK_NAMES_BY_LEN) {
    if (ref === en || ref.startsWith(en + ' ')) {
      return (BOOK_ES[en] || en) + ref.slice(en.length);
    }
  }
  return ref;
}

// Rebuild the book <select> with language-appropriate labels (English values).
function rebuildBookOptions(lang) {
  const sel = document.getElementById('research-book');
  if (!sel) return;
  const prev = sel.value;
  const label = (en) => (lang === 'es' && BOOK_ES[en]) ? BOOK_ES[en] : en;
  const opts = (arr) => arr.map(([en]) => `<option value="${esc(en)}">${esc(label(en))}</option>`).join('');
  sel.innerHTML =
    `<option value="">${esc(t('select.book'))}</option>` +
    `<optgroup label="${esc(t('bible.ot'))}">${opts(BIBLE_BOOKS.OT)}</optgroup>` +
    `<optgroup label="${esc(t('bible.nt'))}">${opts(BIBLE_BOOKS.NT)}</optgroup>`;
  sel.value = prev;  // preserve the selected book (value is the English name)
}

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

  document.getElementById('loading-ref').textContent = localizePassage(passage);
  showLoadingOverlay(true);

  // Fetch verbatim passage text (if a provider serves this translation) so the
  // research is grounded in exact wording and the pastor sees the passage.
  researchState.passageData = await fetchPassage(passage, researchState.translation);
  renderScripturePanel('research-scripture', localizePassage(passage), researchState.passageData);
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
    completeTitle.textContent = t('label.researchCompletePassage').replace('{passage}', localizePassage(researchState.passage));
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

    // A Craft draft reopens in the Craft workbench.
    if (sermon.draft) {
      let d = {};
      try { d = JSON.parse(sermon.draft); } catch {}
      craftState.id = sermon.id;
      craftState.title = d.title || sermon.title || '';
      craftState.passage = sermon.passage || '';
      craftState.bigIdea = d.big_idea || '';
      craftState.intro = d.intro || '';
      craftState.points = Array.isArray(d.points) ? d.points : (Array.isArray(d.movements) ? d.movements : []);
      craftState.conclusion = d.conclusion || '';
      craftState.research = sermon.research || '';
      craftState.researchSteps = JSON.parse(sermon.steps || '[]');
      craftState.passageData = null;
      switchTab('craft');
      showToast(t('craft.loaded'), 'success');
      return;
    }

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
  renderScripturePanel('write-scripture', localizePassage(passage), passageData);

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

// ── Craft: collaborative sermon workbench ────────────────────────────────────

const craftState = {
  id: null, title: '', passage: '', passageData: null,
  research: '', researchSteps: [], bigIdea: '',
  intro: '', points: [], conclusion: '',
};
const craftSugg = {};  // target -> { raw, action }

function loadCraft() {
  // On first open of an empty canvas, pull the most recent research.
  if (!craftState.passage && !craftState.points.length && !craftState.intro && !craftState.conclusion
      && typeof researchState !== 'undefined' && researchState.passage) {
    craftState.passage = researchState.passage;
    craftState.passageData = researchState.passageData || null;
    craftState.research = researchState.compiled || '';
    craftState.researchSteps = researchState.stepResults || [];
  }
  renderCraftRail();
  document.getElementById('craft-title').value = craftState.title || '';
  document.getElementById('craft-bigidea-input').value = craftState.bigIdea || '';
  document.getElementById('craft-passage-ref').textContent = craftState.passage ? localizePassage(craftState.passage) : '';
  renderCanvasBlocks();
}

// Per-block accessors — a block key is 'intro', 'conclusion', or a point index (as a string).
function _blockTitle(key) {
  if (key === 'intro') return t('craft.introTitle');
  if (key === 'conclusion') return t('craft.conclusionTitle');
  return (craftState.points[Number(key)] || {}).title || '';
}
function _blockText(key) {
  if (key === 'intro') return craftState.intro;
  if (key === 'conclusion') return craftState.conclusion;
  return (craftState.points[Number(key)] || {}).text || '';
}
function _setBlockText(key, val) {
  if (key === 'intro') craftState.intro = val;
  else if (key === 'conclusion') craftState.conclusion = val;
  else if (craftState.points[Number(key)]) craftState.points[Number(key)].text = val;
}

function renderCraftRail() {
  const body = document.getElementById('craft-rail-body');
  // "Add research" form — always available so the pastor can research more in place.
  let html = `<div class="rail-add">
    <input type="text" id="craft-add-research-input" data-i18n-ph="craft.addResearchPh"
           placeholder="Research a question or another passage…"
           onkeydown="if(event.key==='Enter')craftAddResearch()" />
    <button class="btn-coach" onclick="craftAddResearch()" data-i18n="craft.addResearch">✦ Add research</button>
  </div>`;

  let items = '';
  if (craftState.passage) {
    items += `<div class="rail-passage"><div class="rail-ref">${esc(localizePassage(craftState.passage))}</div>`;
    if (craftState.passageData && craftState.passageData.text) {
      items += `<div class="rail-scripture">${esc(craftState.passageData.text)}</div>
               <div class="rail-attr">${esc(craftState.passageData.attribution || '')}</div>`;
    }
    items += `</div>`;
  }
  const steps = craftState.researchSteps || [];
  if (steps.length) {
    items += steps.map(s => `
      <details class="rail-step">
        <summary>${esc(s.title || '')}</summary>
        <div class="prose">${renderMarkdown(s.content || '')}</div>
      </details>`).join('');
  } else if (craftState.research) {
    items += `<details class="rail-step" open><summary>${esc(t('craft.researchRail'))}</summary><div class="prose">${renderMarkdown(craftState.research)}</div></details>`;
  }
  if (!items) items = `<div class="output-placeholder">${esc(t('craft.noResearch'))}</div>`;

  html += `<div id="craft-rail-items">${items}</div>`;
  body.innerHTML = html;
  body.querySelectorAll('[data-i18n-ph]').forEach(el => el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph'))));
}

let _addResCount = 0;
async function craftAddResearch() {
  const inp = document.getElementById('craft-add-research-input');
  const q = (inp && inp.value || '').trim();
  if (!q) { showToast(t('craft.addResearchEmpty'), 'error'); return; }
  if (inp) inp.value = '';
  const id = 'addres-' + (_addResCount++);
  const list = document.getElementById('craft-rail-items');
  const det = document.createElement('details');
  det.className = 'rail-step';
  det.open = true;
  det.innerHTML = `<summary>${esc(q)}</summary><div class="prose" id="${id}"><div class="streaming-dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div>`;
  // drop the "no research yet" placeholder if present
  const ph = list.querySelector('.output-placeholder');
  if (ph) ph.remove();
  list.insertBefore(det, list.firstChild);
  const bodyEl = document.getElementById(id);

  let full = '';
  try {
    const res = await fetch('/api/craft/assist', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'research', lang: currentLang,
        passage: craftState.passage || null,
        big_idea: (document.getElementById('craft-bigidea-input') || {}).value || null,
        query: q,
      }),
    });
    if (!res.ok) { let d = {}; try { d = await res.json(); } catch {} throw new Error(d.detail || t('err.requestFailed')); }
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let buf = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const lines = buf.split('\n'); buf = lines.pop();
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6).trim();
        if (data === '[DONE]') continue;
        try {
          const p = JSON.parse(data);
          if (p.error) { bodyEl.innerHTML = `<div class="error-msg">${esc(p.error)}</div>`; return; }
          if (p.text) { full += p.text; bodyEl.innerHTML = renderMarkdown(full); }
        } catch {}
      }
    }
  } catch (err) {
    bodyEl.innerHTML = `<div class="error-msg">${esc(err.message)}</div>`;
    return;
  }
  // Persist with the draft so it's there on reopen.
  if (full) craftState.researchSteps.unshift({ title: q, content: full });
}

// A canvas block: 'intro'/'conclusion' (fixed title) or a point (editable title + controls).
function _blockHtml(key, { point = false, index = 0 } = {}) {
  const head = point
    ? `<span class="movement-num">${index + 1}</span>
       <input class="movement-title" id="mv-title-${key}" value="${esc(craftState.points[index].title || '')}"
              data-i18n-ph="craft.pointTitlePh" placeholder="Point / heading…"
              oninput="craftState.points[${index}].title = this.value" />
       <div class="movement-controls">
         <button onclick="movePoint(${index}, -1)" title="Up" aria-label="Up">↑</button>
         <button onclick="movePoint(${index}, 1)" title="Down" aria-label="Down">↓</button>
         <button onclick="deletePoint(${index})" title="Delete" aria-label="Delete">✕</button>
       </div>`
    : `<span class="movement-fixed-title">${esc(_blockTitle(key))}</span>`;
  return `<div class="movement" id="mv-${key}">
      <div class="movement-head">${head}</div>
      <textarea class="movement-text" id="mv-text-${key}" rows="5"
                data-i18n-ph="craft.movementTextPh" placeholder="Write in your words…"
                oninput="_setBlockText('${key}', this.value)"></textarea>
      <div class="movement-tools">
        <button class="btn-coach" onclick="openCoach('${key}')">${esc(t('craft.helpThink'))}</button>
        <button onclick="blockAssist('${key}', 'draft')">${esc(t('craft.aDraft'))}</button>
        <button onclick="blockAssist('${key}', 'illustrate')">${esc(t('craft.aIllustrate'))}</button>
        <button onclick="blockAssist('${key}', 'cross_ref')">${esc(t('craft.aCrossRef'))}</button>
        <button onclick="blockAssist('${key}', 'tighten')">${esc(t('craft.aTighten'))}</button>
        <button onclick="blockAssist('${key}', 'faithful')">${esc(t('craft.aFaithful'))}</button>
      </div>
      <div class="craft-coach" id="coach-${key}" style="display:none"></div>
      <div class="craft-suggestion" id="sugg-${key}" style="display:none"></div>
    </div>`;
}

function _syncBlockTextareas() {
  const set = (key, val) => { const ta = document.getElementById('mv-text-' + key); if (ta) ta.value = val || ''; };
  set('intro', craftState.intro);
  craftState.points.forEach((p, i) => set(String(i), p.text));
  set('conclusion', craftState.conclusion);
  document.querySelectorAll('#tab-craft [data-i18n-ph]').forEach(el => el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph'))));
}

function renderCanvasBlocks() {
  document.getElementById('craft-intro').innerHTML = _blockHtml('intro');
  renderPoints();
  document.getElementById('craft-conclusion').innerHTML = _blockHtml('conclusion');
  _syncBlockTextareas();
}

function renderPoints() {
  const wrap = document.getElementById('craft-points');
  wrap.innerHTML = craftState.points.length
    ? craftState.points.map((p, i) => _blockHtml(String(i), { point: true, index: i })).join('')
    : `<div class="craft-empty">${esc(t('craft.empty'))}</div>`;
  _syncBlockTextareas();
}

function addPoint() {
  craftState.points.push({ title: '', text: '' });
  renderPoints();
}
function deletePoint(i) {
  craftState.points.splice(i, 1);
  renderPoints();
}
function movePoint(i, dir) {
  const j = i + dir;
  if (j < 0 || j >= craftState.points.length) return;
  const a = craftState.points;
  [a[i], a[j]] = [a[j], a[i]];
  renderPoints();
}

function toggleCraftRail() {
  const rail = document.getElementById('craft-rail');
  const show = document.getElementById('craft-rail-show');
  const hidden = rail.style.display === 'none';
  rail.style.display = hidden ? '' : 'none';
  show.style.display = hidden ? 'none' : '';
}

// ── Coaching (static questions; the pastor's answers feed the AI) ──────────────

function openCoach(target) {
  const el = document.getElementById(target === 'global' ? 'craft-coach-global' : `coach-${target}`);
  if (!el) return;
  if (el.style.display !== 'none' && el.innerHTML) { el.style.display = 'none'; el.innerHTML = ''; return; }
  const qKeys = target === 'global'
    ? ['craft.qG1', 'craft.qG2', 'craft.qG3', 'craft.qG4']
    : ['craft.qM1', 'craft.qM2', 'craft.qM3'];
  const btnLabel = target === 'global' ? t('craft.coachStructure') : t('craft.coachWeave');
  el.innerHTML = `
    <div class="coach-qs">${qKeys.map(k => `<div class="coach-q">${esc(t(k))}</div>`).join('')}</div>
    <textarea class="coach-answer" id="coach-ans-${target}" rows="3" placeholder="${esc(t('craft.coachPh'))}"></textarea>
    <div class="coach-actions">
      <button class="btn-primary" onclick="submitCoach('${target}')">${esc(btnLabel)}</button>
      <button class="btn-ghost" onclick="closeCoach('${target}')">${esc(t('settings.cancel'))}</button>
    </div>`;
  el.style.display = '';
}
function closeCoach(target) {
  const el = document.getElementById(target === 'global' ? 'craft-coach-global' : `coach-${target}`);
  if (el) { el.style.display = 'none'; el.innerHTML = ''; }
}
function submitCoach(target) {
  const ans = (document.getElementById(`coach-ans-${target}`) || {}).value || '';
  if (!ans.trim()) { showToast(t('craft.coachEmpty'), 'error'); return; }
  if (target === 'global') craftAssist('global', 'structure', { answers: ans });
  else craftAssist(target, 'weave', { answers: ans, movement_title: _blockTitle(target), movement_text: _blockText(target) });
}

// ── Block assists + suggestion box (suggest → approve) ─────────────────────────

function blockAssist(key, action) {
  const ta = document.getElementById(`mv-text-${key}`);
  let selection = '';
  if (ta && ta.selectionStart != null && ta.selectionEnd > ta.selectionStart) {
    selection = ta.value.slice(ta.selectionStart, ta.selectionEnd);
  }
  craftAssist(key, action, { movement_title: _blockTitle(key), movement_text: _blockText(key), selection });
}

async function craftAssist(target, action, extra) {
  const suggEl = document.getElementById(target === 'global' ? 'craft-sugg-global' : `sugg-${target}`);
  if (!suggEl) return;
  suggEl.style.display = '';
  suggEl.innerHTML = `<div class="sugg-head">${esc(t('craft.suggestion'))}</div>
    <div class="sugg-body prose" id="sugg-body-${target}"><div class="streaming-dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div>`;
  const bodyEl = document.getElementById(`sugg-body-${target}`);

  const payload = {
    action, lang: currentLang,
    passage: craftState.passage || null,
    passage_text: craftState.passageData ? craftState.passageData.text : null,
    passage_attribution: craftState.passageData ? craftState.passageData.attribution : null,
    research: craftState.research || null,
    big_idea: (document.getElementById('craft-bigidea-input') || {}).value || null,
    ...extra,
  };

  let full = '';
  try {
    const res = await fetch('/api/craft/assist', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
    });
    if (!res.ok) {
      let d = {}; try { d = await res.json(); } catch {}
      throw new Error(d.detail || t('err.requestFailed'));
    }
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let buf = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const lines = buf.split('\n'); buf = lines.pop();
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6).trim();
        if (data === '[DONE]') continue;
        try {
          const p = JSON.parse(data);
          if (p.error) { bodyEl.innerHTML = `<div class="error-msg">${esc(p.error)}</div>`; return; }
          if (p.text) { full += p.text; bodyEl.innerHTML = renderMarkdown(full); }
        } catch {}
      }
    }
  } catch (err) {
    bodyEl.innerHTML = `<div class="error-msg">${esc(err.message)}</div>`;
    return;
  }

  craftSugg[target] = { raw: full, action };
  let actions;
  if (target === 'global' && action === 'structure') {
    actions = `<button class="btn-accent" onclick="applyStructure('global')">${esc(t('craft.applyStructure'))}</button>
               <button class="btn-ghost" onclick="discardSugg('global')">${esc(t('craft.discard'))}</button>`;
  } else {
    actions = `<button class="btn-accent" onclick="applySugg(${JSON.stringify(target)}, 'insert')">${esc(t('craft.insert'))}</button>
               <button class="btn-ghost" onclick="applySugg(${JSON.stringify(target)}, 'replace')">${esc(t('craft.replace'))}</button>
               <button class="btn-ghost" onclick="discardSugg(${JSON.stringify(target)})">${esc(t('craft.discard'))}</button>`;
  }
  suggEl.insertAdjacentHTML('beforeend', `<div class="sugg-actions">${actions}</div>`);
}

function discardSugg(target) {
  const el = document.getElementById(target === 'global' ? 'craft-sugg-global' : `sugg-${target}`);
  if (el) { el.style.display = 'none'; el.innerHTML = ''; }
  delete craftSugg[target];
}

function applySugg(target, mode) {
  const s = craftSugg[target];
  if (!s) return;
  const ta = document.getElementById(`mv-text-${target}`);
  if (!ta) return;
  if (mode === 'replace' && ta.selectionEnd > ta.selectionStart) {
    ta.value = ta.value.slice(0, ta.selectionStart) + s.raw + ta.value.slice(ta.selectionEnd);
  } else if (mode === 'replace') {
    ta.value = s.raw;
  } else {  // insert / append
    ta.value = (ta.value ? ta.value.trimEnd() + '\n\n' : '') + s.raw;
  }
  _setBlockText(target, ta.value);
  discardSugg(target);
}

function applyStructure(target) {
  const s = craftSugg[target];
  if (!s) return;
  const lines = s.raw.split('\n').map(l => l.trim()).filter(Boolean);
  for (const line of lines) {
    const big = line.match(/^(?:\*\*)?big idea(?:\*\*)?\s*[:\-]\s*(.+)/i);
    if (big) {
      craftState.bigIdea = big[1].replace(/\*\*/g, '').trim();
      const inp = document.getElementById('craft-bigidea-input');
      if (inp) inp.value = craftState.bigIdea;
      continue;
    }
    const item = line.match(/^\d+[.)]\s*(.+)/);
    if (item) craftState.points.push({ title: item[1].replace(/\*\*/g, '').trim(), text: '' });
  }
  renderPoints();
  discardSugg(target);
  closeCoach('global');
  showToast(t('craft.structureApplied'), 'success');
}

// ── Save / export ──────────────────────────────────────────────────────────────

function _craftDraft() {
  return {
    title: (document.getElementById('craft-title') || {}).value || '',
    big_idea: (document.getElementById('craft-bigidea-input') || {}).value || '',
    intro: craftState.intro || '',
    points: craftState.points.map(p => ({ title: p.title || '', text: p.text || '' })),
    conclusion: craftState.conclusion || '',
  };
}

async function saveCraft() {
  if (!currentUser) { showToast(t('toast.signInToSave'), 'error'); return; }
  const draft = _craftDraft();
  const title = draft.title || (craftState.passage ? localizePassage(craftState.passage) : t('craft.untitled'));
  try {
    const res = await fetch('/api/sermons', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: craftState.id, title, passage: craftState.passage || '',
        // Persist the research alongside the draft so reopening restores the rail.
        research: craftState.research || '',
        steps: craftState.researchSteps || [],
        draft,
      }),
    });
    if (!res.ok) throw new Error();
    const data = await res.json();
    craftState.id = data.id;
    showToast(t('craft.saved'), 'success');
  } catch { showToast(t('toast.saveFailed'), 'error'); }
}

function _craftMarkdown() {
  const d = _craftDraft();
  let md = `# ${d.title || localizePassage(craftState.passage) || ''}\n\n`;
  if (craftState.passage) md += `_${localizePassage(craftState.passage)}_\n\n`;
  if (d.big_idea) md += `**${t('craft.bigIdea')}:** ${d.big_idea}\n\n`;
  if (d.intro) md += `## ${t('craft.introTitle')}\n\n${d.intro}\n\n`;
  d.points.forEach(p => { md += `## ${p.title || ''}\n\n${p.text || ''}\n\n`; });
  if (d.conclusion) md += `## ${t('craft.conclusionTitle')}\n\n${d.conclusion}\n\n`;
  return md;
}

async function exportCraft(format) {
  const md = _craftMarkdown();
  const title = (document.getElementById('craft-title') || {}).value || (craftState.passage ? localizePassage(craftState.passage) : 'Sermon');
  await _exportDoc(md, format, title);
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
  applyAuthGate();   // default to the landing page until auth resolves
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
