// Data references
const assessment = diagnosticData.assessment;
const dimensions = assessment.dimensions;
const scale = assessment.scale;

// Flatten questions for easier navigation
let allQuestions = [];
dimensions.forEach(dim => {
    dim.questions.forEach(q => {
        allQuestions.push({
            ...q,
            dimensionId: dim.id,
            dimensionName: dim.name
        });
    });
});

const profiles = {
    driving_force: {
        title: "Driving Force",
        color: "#e63946",
        description: "You are a leader who takes strong ownership and drives results with high standards and commitment.\n\nAt times, this strength may lead you to stay closely involved rather than enabling others to take full ownership.",
        development: "Shift from control to clarity and empowerment.",
        action: "In every key interaction, ask at least two questions before offering your own solution.",
        reflection: "Where might my involvement be limiting someone else’s ownership?"
    },
    trust_builder: {
        title: "Trust Builder",
        color: "#f4a261",
        description: "You create strong relationships and a sense of trust within your team.\n\nAt times, you may delay difficult conversations or decisions in order to maintain harmony.",
        development: "Balance care with accountability.",
        action: "Initiate one direct and constructive conversation each week.",
        reflection: "What conversation am I currently avoiding?"
    },
    execution_expert: {
        title: "Execution Expert",
        color: "#4cc9f0",
        description: "You are highly reliable and focused on delivering results.\n\nAt times, you may prioritize execution over direction.",
        development: "Strengthen strategic clarity.",
        action: "Define the 1–2 priorities that matter most each week.",
        reflection: "Am I busy—or effective?"
    },
    quiet_influencer: {
        title: "Quiet Influencer",
        color: "#9d4edd",
        description: "You are a thoughtful and capable leader who delivers value consistently.\n\nAt times, your influence may not fully reflect your capability.",
        development: "Expand influence and visibility.",
        action: "Initiate two stakeholder conversations per week.",
        reflection: "Where do I need to be more visible?"
    },
    agile_responder: {
        title: "Agile Responder",
        color: "#e9c46a",
        description: "You are flexible and responsive in dynamic environments.\n\nAt times, you may find yourself reacting rather than shaping direction.",
        development: "Introduce structure and learning loops.",
        action: "Run a weekly 15-minute “What did we learn?” session.",
        reflection: "Where am I reacting instead of leading?"
    },
    adaptive_integrator: {
        title: "Adaptive Integrator",
        color: "#2a9d8f",
        description: "You demonstrate a balanced and adaptive leadership approach.\n\nYou are able to adjust your style based on context and manage your strengths and limitations effectively.",
        development: "Scale your impact.",
        action: "Mentor or coach one leader using your approach.",
        reflection: "How can I multiply my impact through others?"
    }
};

// State
let currentQuestionIndex = 0;
let userAnswers = {}; // key: questionId, value: selected score (1-5)
let assignedProfile = null;
let lastScores = {};

// DOM Elements
const landingView = document.getElementById('landing-view');
const questionView = document.getElementById('question-view');
const resultsView = document.getElementById('results-view');

const appTitle = document.getElementById('app-title');
const appDesc = document.getElementById('app-desc');
const startBtn = document.getElementById('start-btn');
const userNameInput = document.getElementById('user-name');
const userEmailInput = document.getElementById('user-email');
const formError = document.getElementById('form-error');

const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const dimensionNameEl = document.getElementById('dimension-name');
const questionTextEl = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const prevBtn = document.getElementById('prev-btn');

const chartContainer = document.getElementById('chart-container');
const restartBtn = document.getElementById('restart-btn');

// Initialization
function init() {
    appTitle.textContent = assessment.title;
    appDesc.textContent = assessment.description;
    
    startBtn.addEventListener('click', startAssessment);
    prevBtn.addEventListener('click', goPrevious);
    if(restartBtn) restartBtn.addEventListener('click', restartAssessment);
    
    const downloadPdfBtn = document.getElementById('download-pdf-btn');
    if (downloadPdfBtn) downloadPdfBtn.addEventListener('click', downloadPDF);
}

function switchView(viewElement) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    viewElement.classList.add('active');
}

function startAssessment() {
    const name = userNameInput.value.trim();
    const email = userEmailInput.value.trim();
    
    if (!name || !email || !email.includes('@')) {
        formError.style.display = 'block';
        return;
    }
    
    formError.style.display = 'none';
    currentQuestionIndex = 0;
    userAnswers = {};
    switchView(questionView);
    renderQuestion();
}

function renderQuestion() {
    const q = allQuestions[currentQuestionIndex];
    
    dimensionNameEl.textContent = q.dimensionName;
    questionTextEl.textContent = q.text;
    
    const progressPercent = ((currentQuestionIndex) / allQuestions.length) * 100;
    progressFill.style.width = `${progressPercent}%`;
    progressText.textContent = `Question ${currentQuestionIndex + 1} of ${allQuestions.length}`;
    
    optionsContainer.innerHTML = '';
    const currentAnswer = userAnswers[q.id];
    
    for (let i = scale.min; i <= scale.max; i++) {
        const btn = document.createElement('button');
        btn.className = `option-btn ${currentAnswer === i ? 'selected' : ''}`;
        btn.innerHTML = `<span class="option-num">${i}</span><span class="option-label">${scale.labels[i]}</span>`;
        btn.onclick = () => selectOption(q.id, i);
        optionsContainer.appendChild(btn);
    }
    
    prevBtn.disabled = currentQuestionIndex === 0;
}

function selectOption(questionId, value) {
    const animContainer = document.getElementById('quiz-anim-container');
    if (animContainer && animContainer.classList.contains('fade-out')) return;

    userAnswers[questionId] = value;
    renderQuestion();
    
    setTimeout(() => {
        if (animContainer) {
            animContainer.classList.add('fade-out');
            setTimeout(() => {
                goNext();
                animContainer.classList.remove('fade-out');
            }, 300);
        } else {
            goNext();
        }
    }, 600);
}

function goPrevious() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
}

function goNext() {
    const q = allQuestions[currentQuestionIndex];
    if (!userAnswers[q.id]) return;

    if (currentQuestionIndex < allQuestions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        calculateAndShowResults();
    }
}

function calculateAndShowResults() {
    const dimensionScores = {};
    const maxPossScore = 5;
    
    dimensions.forEach(dim => {
        let sum = 0;
        dim.questions.forEach(q => {
            let answer = userAnswers[q.id];
            if (q.reverse_scored) answer = 6 - answer;
            sum += answer;
        });
        const avg = sum / dim.questions.length;
        dimensionScores[dim.id] = {
            id: dim.id,
            name: dim.name,
            avg: avg,
            max: maxPossScore,
            percentage: (avg / maxPossScore) * 100
        };
    });
    
    lastScores = dimensionScores;
    
    // Profile calculation
    const getAvgRaw = (ids) => {
        let sum = 0;
        ids.forEach(id => sum += userAnswers[id]);
        return sum / ids.length;
    };
    const getRaw = (id) => userAnswers[id];
    const getC = (id) => dimensionScores[id].avg;

    const raw14_16_18 = getAvgRaw(['Q14', 'Q16', 'Q18']);
    if (raw14_16_18 > 3.8) {
        assignedProfile = profiles.driving_force;
    } else if (getC('C2') > 4.0 && getC('C3') < 3.2) {
        assignedProfile = profiles.trust_builder;
    } else if (getC('C5') < 3.2 && getC('C3') > 3.5) {
        assignedProfile = profiles.execution_expert;
    } else if (getRaw('Q25') > 3.5 && getRaw('Q27') > 3.5) {
        assignedProfile = profiles.quiet_influencer;
    } else if (getC('C4') < 3.2 && getC('C6') < 3.2) {
        assignedProfile = profiles.agile_responder;
    } else {
        assignedProfile = profiles.adaptive_integrator;
    }
    
    // Render profile UI
    document.getElementById('profile-title').textContent = assignedProfile.title;
    document.getElementById('profile-title').style.color = assignedProfile.color;
    document.getElementById('profile-container').style.borderTopColor = assignedProfile.color;
    document.getElementById('profile-desc').textContent = assignedProfile.description;
    document.getElementById('profile-dev').textContent = assignedProfile.development;
    document.getElementById('profile-action').textContent = assignedProfile.action;
    document.getElementById('profile-refl').textContent = assignedProfile.reflection;
    
    renderScores(dimensionScores);
    switchView(resultsView);
    progressFill.style.width = '100%';
    
    sendResultsToNetlify(dimensionScores);
}

function renderScores(scores) {
    chartContainer.innerHTML = '';
    
    Object.values(scores).forEach(dim => {
        const card = document.createElement('div');
        card.className = 'result-card';
        
        let color = '#4cc9f0';
        if (dim.percentage < 60) color = '#f72585';
        else if (dim.percentage < 80) color = '#fca311';
        
        card.innerHTML = `
            <div class="result-header">
                <span class="result-title">${dim.name}</span>
                <span class="result-score">${dim.avg.toFixed(1)} / ${dim.max}</span>
            </div>
            <div class="result-bar-bg">
                <div class="result-bar-fill" style="width: 0%; background-color: ${color};" data-width="${dim.percentage}%"></div>
            </div>
        `;
        chartContainer.appendChild(card);
    });
    
    setTimeout(() => {
        document.querySelectorAll('.result-bar-fill').forEach(bar => {
            bar.style.width = bar.getAttribute('data-width');
        });
    }, 100);
}

function sendResultsToNetlify(scores) {
    const name = userNameInput.value.trim();
    const email = userEmailInput.value.trim();
    
    let resultsLog = `Participant: ${name} (${email})\nProfile: ${assignedProfile.title}\n\nSCORES (Averages):\n`;
    Object.values(scores).forEach(dim => {
        resultsLog += `- ${dim.name}: ${dim.avg.toFixed(1)}/5\n`;
    });
    
    const formData = new URLSearchParams();
    formData.append('form-name', 'leadership-results');
    formData.append('name', name);
    formData.append('email', email);
    formData.append('results', resultsLog);
    
    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString()
    }).catch(error => console.error('Error submitting form', error));
}

function restartAssessment() {
    currentQuestionIndex = 0;
    userAnswers = {};
    switchView(landingView);
}

function downloadPDF() {
    const userName = userNameInput.value.trim() || 'Participant';
    const pdfContainer = document.createElement('div');
    pdfContainer.style.width = '800px'; 
    pdfContainer.style.position = 'absolute';
    pdfContainer.style.left = '-9999px';
    pdfContainer.style.top = '0';
    pdfContainer.style.padding = '30px';
    pdfContainer.style.fontFamily = 'Helvetica, Arial, sans-serif';
    pdfContainer.style.color = '#2b2d42';
    
    let html = `
        <h1 style="color: #4361ee; margin-bottom: 10px;">Imperfectly Great Leadership Diagnostic</h1>
        <h2 style="margin-bottom: 30px; font-weight: normal; color: #8d99ae;">Assessment Report for: <strong>${userName}</strong></h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 5px solid ${assignedProfile.color}; margin-bottom: 30px;">
            <h2 style="margin-top: 0; color: ${assignedProfile.color};">${assignedProfile.title}</h2>
            <p style="white-space: pre-wrap; font-size: 1.05rem; line-height: 1.5;">${assignedProfile.description}</p>
            <div style="margin-top: 15px; margin-bottom: 15px; height: 1px; background: #ddd;"></div>
            <p style="margin-bottom: 8px;"><strong>Development Focus:</strong> ${assignedProfile.development}</p>
            <p style="margin-bottom: 8px;"><strong>30-Day Action:</strong> ${assignedProfile.action}</p>
            <p style="margin: 0;"><strong>Reflection:</strong> ${assignedProfile.reflection}</p>
        </div>

        <h3 style="border-bottom: 2px solid #edf2f4; padding-bottom: 10px; margin-bottom: 20px;">Category Breakdown (Averages out of 5)</h3>
    `;
    
    Object.values(lastScores).forEach(dim => {
        let color = '#4cc9f0';
        if (dim.percentage < 60) color = '#f72585';
        else if (dim.percentage < 80) color = '#fca311';
        
        html += `
            <div style="margin-bottom: 15px; page-break-inside: avoid;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                    <strong style="font-size: 1rem;">${dim.name}</strong>
                    <span style="font-weight: bold; color: ${color};">${dim.avg.toFixed(1)} / ${dim.max}</span>
                </div>
                <div style="width: 100%; height: 6px; background: #edf2f4; border-radius: 3px; overflow: hidden;">
                    <div style="height: 100%; background: ${color}; width: ${dim.percentage}%;"></div>
                </div>
            </div>
        `;
    });
    
    pdfContainer.innerHTML = html;
    document.body.appendChild(pdfContainer);
    
    const opt = {
      margin:       0.4,
      filename:     `Leadership_Report_${userName.split(' ').join('_')}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, windowWidth: 800 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
      pagebreak:    { mode: ['css', 'legacy'] }
    };
    
    html2pdf().set(opt).from(pdfContainer).save().then(() => {
        document.body.removeChild(pdfContainer);
    });
}

init();
