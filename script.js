document.addEventListener('DOMContentLoaded', () => {
    const verbInput = document.getElementById('verbInput');
    const conjugateBtn = document.getElementById('conjugateBtn');
    const baseFormEl = document.getElementById('baseForm');
    const pastTenseEl = document.getElementById('pastTense');
    const pastParticipleEl = document.getElementById('pastParticiple');
    const inputTenseEl = document.getElementById('inputTense');
    const errorEl = document.getElementById('error');
    const langBtns = document.querySelectorAll('.lang-btn');

    conjugateBtn.addEventListener('click', conjugateVerb);
    verbInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            conjugateVerb();
        }
    });

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateLanguage(btn.dataset.lang);
        });
    });

    const irregularVerbs = {
        /* 'be': ['am/is/are', 'was/were', 'been'],
        'go': ['go', 'went', 'gone'],
        'do': ['do', 'did', 'done'],
        'have': ['have', 'had', 'had'],
        'say': ['say', 'said', 'said'],
        'make': ['make', 'made', 'made'],
        'get': ['get', 'got', 'gotten'],
        'know': ['know', 'knew', 'known'],
        'take': ['take', 'took', 'taken'],
        'see': ['see', 'saw', 'seen'],
        'come': ['come', 'came', 'come'],
        'think': ['think', 'thought', 'thought'],
        'look': ['look', 'looked', 'looked'],
        'want': ['want', 'wanted', 'wanted'],
        'give': ['give', 'gave', 'given'],
        'use': ['use', 'used', 'used'],
        'find': ['find', 'found', 'found'],
        'tell': ['tell', 'told', 'told'],
        'ask': ['ask', 'asked', 'asked'],
        'work': ['work', 'worked', 'worked'],
        'seem': ['seem', 'seemed', 'seemed'],
        'feel': ['feel', 'felt', 'felt'],
        'try': ['try', 'tried', 'tried'],
        'leave': ['leave', 'left', 'left'],
        'call': ['call', 'called', 'called'] */
        
        'be': ['am/is/are', 'was/were', 'been'],
        'go': ['go', 'went', 'gone'],
        'do': ['do', 'did', 'done'],
        'have': ['have', 'had', 'had'],
        'say': ['say', 'said', 'said'],
        'make': ['make', 'made', 'made'],
        'get': ['get', 'got', 'gotten'],
        'know': ['know', 'knew', 'known'],
        'take': ['take', 'took', 'taken'],
        'see': ['see', 'saw', 'seen'],
        'come': ['come', 'came', 'come'],
        'think': ['think', 'thought', 'thought'],
        'give': ['give', 'gave', 'given'],
        'find': ['find', 'found', 'found'],
        'tell': ['tell', 'told', 'told'],
        'become': ['become', 'became', 'become'],
        'show': ['show', 'showed', 'shown'],
        'leave': ['leave', 'left', 'left'],
        'feel': ['feel', 'felt', 'felt'],
        'put': ['put', 'put', 'put'],
        'bring': ['bring', 'brought', 'brought'],
        'begin': ['begin', 'began', 'begun'],
        'keep': ['keep', 'kept', 'kept'],
        'hold': ['hold', 'held', 'held'],
        'write': ['write', 'wrote', 'written'],
        'stand': ['stand', 'stood', 'stood'],
        'hear': ['hear', 'heard', 'heard'],
        'let': ['let', 'let', 'let'],
        'mean': ['mean', 'meant', 'meant'],
        'set': ['set', 'set', 'set'],
        'meet': ['meet', 'met', 'met'],
        'run': ['run', 'ran', 'run'],
        'pay': ['pay', 'paid', 'paid'],
        'sit': ['sit', 'sat', 'sat'],
        'speak': ['speak', 'spoke', 'spoken'],
        'lie': ['lie', 'lay', 'lain'],
        'lead': ['lead', 'led', 'led'],
        'read': ['read', 'read', 'read'],
        'grow': ['grow', 'grew', 'grown'],
        'lose': ['lose', 'lost', 'lost'],
        'fall': ['fall', 'fell', 'fallen'],
        'send': ['send', 'sent', 'sent'],
        'build': ['build', 'built', 'built'],
        'understand': ['understand', 'understood', 'understood'],
        'draw': ['draw', 'drew', 'drawn'],
        'break': ['break', 'broke', 'broken'],
        'spend': ['spend', 'spent', 'spent'],
        'cut': ['cut', 'cut', 'cut'],
        'rise': ['rise', 'rose', 'risen'],
        'drive': ['drive', 'drove', 'driven'],
        'buy': ['buy', 'bought', 'bought'],
        'wear': ['wear', 'wore', 'worn'],
        'choose': ['choose', 'chose', 'chosen']
    };

    const regularVerbs = [
        /* 'walk', 'talk', 'play', 'study', 'live', 'love', 'hate', 'like', 'need', 'use',
        'try', 'call', 'ask', 'answer', 'appear', 'happen', 'change', 'follow', 'stop', 'create',
        'destroy', 'increase', 'decrease', 'produce', 'decide', 'continue', 'add', 'develop', 'receive',
        'agree', 'support', 'explain', 'identify', 'remember', 'consider', 'expect', 'suggest',
        'accept', 'reject', 'encourage', 'introduce', 'mention', 'offer', 'examine', 'depend',
        'relate', 'base', 'reduce', 'indicate', 'imagine', 'recognize', 'join', 'carry',
        'contain', 'reflect', 'achieve', 'supply', 'argue', 'arise', 'avoid', 'consist',
        'constitute', 'establish', 'obtain', 'occur', 'participate', 'predict', 'prevent',
        'respond', 'specify', 'vary', 'behave', 'eliminate', 'emerge', 'focus', 'illustrate',
        'imply', 'improve', 'maintain', 'observe', 'perform', 'permit', 'react', 'remove',
        'replace', 'reveal', 'shape', 'spread', 'survive', 'undertake', 'engage', 'enhance',
        'evolve', 'exclude', 'facilitate', 'generate', 'ignore', 'link', 'locate', 'modify',
        'monitor', 'neglect', 'possess', 'preserve', 'recover', 'rely', 'resist', 'retain' */
        
        'walk', 'talk', 'play', 'work', 'study', 'live', 'love', 'hate', 'like', 'want',
        'need', 'use', 'try', 'call', 'ask', 'answer', 'look', 'seem', 'feel', 'become',
        'remain', 'appear', 'happen', 'change', 'follow', 'stop', 'create', 'destroy',
        'increase', 'decrease', 'produce', 'decide', 'continue', 'add', 'develop', 'receive',
        'agree', 'support', 'explain', 'identify', 'remember', 'consider', 'expect', 'suggest',
        'accept', 'reject', 'encourage', 'introduce', 'mention', 'offer', 'examine', 'depend',
        'relate', 'base', 'reduce', 'indicate', 'imagine', 'recognize', 'join', 'carry',
        'contain', 'reflect', 'achieve', 'supply', 'argue', 'arise', 'avoid', 'consist',
        'constitute', 'establish', 'obtain', 'occur', 'participate', 'predict', 'prevent',
        'respond', 'specify', 'vary', 'behave', 'eliminate', 'emerge', 'focus', 'illustrate',
        'imply', 'improve', 'maintain', 'observe', 'perform', 'permit', 'react', 'remove',
        'replace', 'reveal', 'shape', 'spread', 'survive', 'undertake', 'engage', 'enhance',
        'evolve', 'exclude', 'facilitate', 'generate', 'ignore', 'link', 'locate', 'modify',
        'monitor', 'neglect', 'possess', 'preserve', 'recover', 'rely', 'resist', 'retain',
        'suffer', 'transform', 'treat', 'utilize', 'view', 'abandon', 'accompany', 'accumulate',
        'adapt', 'adjust', 'allocate', 'alter', 'anticipate', 'appreciate', 'approach',
        'approve', 'arrange', 'assemble', 'assess', 'assign', 'assist', 'assume', 'attach',
        'attempt', 'attend', 'attribute', 'benefit', 'calculate', 'capture', 'challenge',
        'circulate', 'clarify', 'classify', 'combine', 'communicate', 'compare', 'compete',
        'compile', 'comply', 'compose', 'compute', 'conclude', 'conduct', 'confirm', 'connect',
        'conserve', 'construct', 'consult', 'consume', 'contribute', 'convert', 'cooperate',
        'coordinate', 'correspond', 'criticize', 'damage', 'decline', 'define', 'demonstrate',
        'derive', 'describe', 'design', 'detect', 'determine', 'differentiate', 'diminish',
        'distribute', 'divide', 'dominate', 'edit', 'educate', 'elaborate', 'emphasize',
        'enable', 'encounter', 'ensure', 'enumerate', 'equate', 'evaluate', 'exceed', 'exclude',
        'exhibit', 'expand', 'experience', 'experiment', 'export', 'extend', 'extract',
        'facilitate', 'fail', 'favor', 'finance', 'formulate', 'function', 'govern', 'grant',
        'guarantee', 'guide', 'hire', 'host', 'hypothesize', 'identify', 'implement', 'import',
        'impose', 'improve', 'incorporate', 'increase', 'induce', 'influence', 'inform',
        'initiate', 'injure', 'innovate', 'insert', 'inspect', 'inspire', 'install', 'institute',
        'instruct', 'integrate', 'interpret', 'interview', 'investigate', 'invoke', 'involve',
        'isolate', 'justify', 'launch', 'learn', 'limit', 'manipulate', 'manufacture', 'market',
        'measure', 'mediate', 'minimize', 'motivate', 'negotiate', 'note', 'obtain', 'operate',
        'order', 'organize', 'outline', 'overcome', 'participate', 'perceive', 'persuade',
        'plan', 'portray', 'postpone', 'predict', 'prepare', 'prescribe', 'present', 'preserve',
        'process', 'produce', 'program', 'promote', 'propose', 'protect', 'prove', 'provide',
        'publish', 'purchase', 'pursue', 'qualify', 'quote', 'receive', 'recognize', 'recommend',
        'record', 'recruit', 'reduce', 'refer', 'reflect', 'refuse', 'regulate', 'reinforce',
        'reject', 'relate', 'release', 'rely', 'remain', 'remember', 'remind', 'remove',
        'render', 'reorganize', 'repair', 'repeat', 'replace', 'reply', 'report', 'represent',
        'reproduce', 'request', 'require', 'research', 'resolve', 'respond', 'restore',
        'restrict', 'result', 'retain', 'retrieve', 'return', 'reveal', 'review', 'revise',
        'satisfy', 'schedule', 'search', 'select', 'separate', 'serve', 'share', 'shift',
        'signal', 'simplify', 'solve', 'sort', 'specify', 'stimulate', 'strengthen', 'stress',
        'structure', 'study', 'submit', 'substitute', 'succeed', 'suggest', 'summarize',
        'supply', 'support', 'suppose', 'surprise', 'suspend', 'sustain', 'symbolize',
        'synthesize', 'target', 'terminate', 'test', 'tolerate', 'transfer', 'transform',
        'translate', 'transport', 'unify', 'update', 'verify', 'violate', 'visit', 'withdraw'
    ];

    function conjugateVerb() {
        const verb = verbInput.value.toLowerCase().trim();
        
        if (!verb) {
            showError('Please enter a verb.');
            return;
        }

        if (!isValidVerb(verb)) {
            showError('This doesn\'t appear to be a valid English verb. Please try again.');
            return;
        }

        let baseForm, pastTense, pastParticiple, inputTense;

        if (irregularVerbs[verb]) {
            [baseForm, pastTense, pastParticiple] = irregularVerbs[verb];
            inputTense = 'Base form';
        } else {
            for (const [base, forms] of Object.entries(irregularVerbs)) {
                if (forms.includes(verb)) {
                    [baseForm, pastTense, pastParticiple] = forms;
                    inputTense = verb === pastTense ? 'Past tense' : 'Past participle';
                    break;
                }
            }
        }

        if (!baseForm) {
            // Handle regular verbs
            if (regularVerbs.includes(verb) || regularVerbs.includes(verb.replace(/e?d$/, '').replace(/ing$/, ''))) {
                if (verb.endsWith('ed')) {
                    baseForm = verb.replace(/ed$/, '');
                    if (baseForm.endsWith('i')) {
                        baseForm = baseForm.slice(0, -1) + 'y';
                    }
                    pastTense = verb;
                    pastParticiple = verb;
                    inputTense = 'Past tense/participle';
                } else if (verb.endsWith('ing')) {
                    baseForm = 

 verb.replace(/ing$/, '');
                    if (baseForm.endsWith('i')) {
                        baseForm = baseForm.slice(0, -1) + 'y';
                    }
                    pastTense = getRegularPastTense(baseForm);
                    pastParticiple = pastTense;
                    inputTense = 'Present participle';
                } else {
                    baseForm = verb;
                    pastTense = getRegularPastTense(verb);
                    pastParticiple = pastTense;
                    inputTense = 'Base form';
                }
            } else {
                showError('This verb is not in our database. It may be very uncommon or not a valid English verb.');
                return;
            }
        }

        displayResults(baseForm, pastTense, pastParticiple, inputTense);
    }

    function isValidVerb(word) {
        if (word.length > 20) {
            return false;
        }

        if (!/^[a-z]+(-[a-z]+)?$/.test(word)) {
            return false;
        }

        if (irregularVerbs[word] || 
            Object.values(irregularVerbs).some(forms => forms.includes(word)) ||
            regularVerbs.includes(word) ||
            regularVerbs.includes(word.replace(/e?d$/, '').replace(/ing$/, ''))) {
            return true;
        }

        const commonEndings = ['e', 'es', 'ed', 'ing', 'ize', 'ise', 'ate', 'fy', 'en'];
        if (commonEndings.some(ending => word.endsWith(ending))) {
            return true;
        }

        return false;
    }

    function getRegularPastTense(verb) {
        if (verb.endsWith('e')) {
            return verb + 'd';
        } else if (verb.endsWith('y') && !['a', 'e', 'i', 'o', 'u'].includes(verb[verb.length - 2])) {
            return verb.slice(0, -1) + 'ied';
        } else if (verb.length > 2 && 
                   !['a', 'e', 'i', 'o', 'u'].includes(verb[verb.length - 1]) && 
                   ['a', 'e', 'i', 'o', 'u'].includes(verb[verb.length - 2]) && 
                   !['a', 'e', 'i', 'o', 'u'].includes(verb[verb.length - 3])) {
            return verb + verb[verb.length - 1] + 'ed';
        } else {
            return verb + 'ed';
        }
    }

    function displayResults(baseForm, pastTense, pastParticiple, inputTense) {
        baseFormEl.textContent = baseForm;
        pastTenseEl.textContent = pastTense;
        pastParticipleEl.textContent = pastParticiple;
        
        inputTenseEl.textContent = `Input tense: ${inputTense}`;
        errorEl.textContent = '';
    }

    function showError(message) {
        baseFormEl.textContent = '';
        pastTenseEl.textContent = '';
        pastParticipleEl.textContent = '';
        inputTenseEl.textContent = '';
        errorEl.textContent = message;
    }

    function updateLanguage(lang) {
        const translations = {
            en: {
                title: 'ADVANCED VERB CONJUGATOR',//ADVANCED VERB CONJUGATOR
                conjugate: 'Conjugate',
                baseForm: 'Base Form',
                pastTense: 'Past Tense',
                pastParticiple: 'Past Participle',
                inputTense: 'Input tense',
                enterVerb: 'Enter a verb'
            },
            es: {
                title: 'CONJUGADOR DE VERBOS AVANZADO',
                conjugate: 'Conjugar',
                baseForm: 'Base Form',// (Forma Base)
                pastTense: 'Past Tense',// (Pretérito)
                pastParticiple: 'Past Participle',// (Participio Pasado)
                inputTense: 'Tiempo de entrada',
                enterVerb: 'Ingrese un verbo'
            },
            pt: {
                title: 'CONJUGADOR DE VERBOS AVANÇADO',//CONJUGADOR DE VERBOS AVANÇADO
                conjugate: 'Conjugar',
                baseForm: 'Base Form',// (Forma Base)
                pastTense: 'Past Tense',// (Pretérito)
                pastParticiple: 'Past Participle',// (Particípio Passado)
                inputTense: 'Tempo de entrada',
                enterVerb: 'Digite um verbo'
            },
            it: {
                title: 'CONIUGATORE DI VERBI AVANZATO',//CONIUGATORE DI VERBI AVANZATO
                conjugate: 'Coniugare',
                baseForm: 'Base Form',// (Forma Base)
                pastTense: 'Past Tense',// (Passato Remoto)
                pastParticiple: 'Past Participle',// (Participio Passato)
                inputTense: 'Tempo di input',
                enterVerb: 'Inserisci un verbo'
            }
        };

        const t = translations[lang];
        document.getElementById('title').textContent = t.title;
        document.getElementById('conjugateBtn').textContent = t.conjugate;
        document.getElementById('baseFormLabel').textContent = t.baseForm;
        document.getElementById('pastTenseLabel').textContent = t.pastTense;
        document.getElementById('pastParticipleLabel').textContent = t.pastParticiple;
        verbInput.placeholder = t.enterVerb;
        
        if (inputTenseEl.textContent) {
            const currentTense = inputTenseEl.textContent.split(': ')[1];
            inputTenseEl.textContent = `${t.inputTense}: ${currentTense}`;
        }
    }
});