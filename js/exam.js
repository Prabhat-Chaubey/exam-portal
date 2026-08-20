// ============================================================
// EXAM ENGINE
// ============================================================

// ── Guard ────────────────────────────────────────────────────
const studentData = JSON.parse(sessionStorage.getItem('studentData') || 'null');
const examStarted = sessionStorage.getItem('examStarted');

if (!studentData || examStarted !== 'true') {
  window.location.href = 'index.html';
}

// ── State ─────────────────────────────────────────────────────
let currentIndex = 0;
let timeLeft     = EXAM_CONFIG.durationMins * 60;
let timerInterval;
let answers      = new Array(questions.length).fill(null);
let marked       = new Array(questions.length).fill(false);
let examSubmitted = false;

// ── DOM References ─────────────────────────────────────────────
const questionNumber    = document.getElementById('questionNumber');
const questionTypeBadge = document.getElementById('questionTypeBadge');
const questionText      = document.getElementById('questionText');
const optionsContainer  = document.getElementById('optionsContainer');
const prevBtn           = document.getElementById('prevBtn');
const nextBtn           = document.getElementById('nextBtn');
const markBtn           = document.getElementById('markBtn');
const timerDisplay      = document.getElementById('timerDisplay');
const timerBox          = document.getElementById('timerBox');
const paletteGrid       = document.getElementById('paletteGrid');
const paletteStats      = document.getElementById('paletteStats');
const submitModal       = document.getElementById('submitModal');
const violationModal    = document.getElementById('violationModal');
const answeredCount     = document.getElementById('answeredCount');

// ── Init ──────────────────────────────────────────────────────
document.getElementById('topbarStudentName').textContent =
  `${studentData.firstName} ${studentData.lastName}`;

buildPalette();
renderQuestion(0);
startTimer();
initProctoring();

// ── Timer ─────────────────────────────────────────────────────
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      autoSubmit('Time expired');
    }
  }, 1000);
}

function updateTimerDisplay() {
  const m = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const s = String(timeLeft % 60).padStart(2, '0');
  timerDisplay.textContent = `${m}:${s}`;

  timerBox.classList.remove('timer-warning', 'timer-danger');
  if (timeLeft <= 60)  timerBox.classList.add('timer-danger');
  else if (timeLeft <= 300) timerBox.classList.add('timer-warning');
}

// ── Question Rendering ────────────────────────────────────────
function renderQuestion(index) {
  currentIndex = index;
  const q = questions[index];

  questionNumber.textContent = `Question ${index + 1} of ${questions.length}`;
  questionTypeBadge.textContent = q.type === 'mcq' ? 'MCQ' : 'Short Answer';
  questionTypeBadge.className = `question-type-badge ${q.type === 'short' ? 'short' : ''}`;
  questionText.textContent = q.text;

  optionsContainer.innerHTML = '';

  if (q.type === 'mcq') {
    q.options.forEach((opt, i) => {
      const div = document.createElement('div');
      div.className = `option-item ${answers[index] === i ? 'selected' : ''}`;
      div.innerHTML = `
        <span class="option-key">${['A','B','C','D'][i]}</span>
        <span>${opt.substring(3)}</span>
      `;
      div.addEventListener('click', () => selectOption(index, i));
      optionsContainer.appendChild(div);
    });
  } else {
    const ta = document.createElement('textarea');
    ta.className = 'short-answer-input';
    ta.placeholder = q.placeholder || 'Write your answer here...';
    ta.value = answers[index] || '';
    ta.addEventListener('input', () => {
      answers[index] = ta.value.trim() || null;
      updatePaletteBtn(index);
      updateStats();
    });
    optionsContainer.appendChild(ta);
  }

  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === questions.length - 1;
  markBtn.classList.toggle('marked', marked[index]);
  markBtn.textContent = marked[index] ? '🔖 Marked' : '🔖 Mark for Review';

  updatePaletteActive(index);
}

function selectOption(questionIdx, optionIdx) {
  answers[questionIdx] = optionIdx;
  renderQuestion(questionIdx);
  updatePaletteBtn(questionIdx);
  updateStats();
}

// ── Navigation ────────────────────────────────────────────────
prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) renderQuestion(currentIndex - 1);
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < questions.length - 1) renderQuestion(currentIndex + 1);
});

markBtn.addEventListener('click', () => {
  marked[currentIndex] = !marked[currentIndex];
  markBtn.classList.toggle('marked', marked[currentIndex]);
  markBtn.textContent = marked[currentIndex] ? '🔖 Marked' : '🔖 Mark for Review';
  updatePaletteBtn(currentIndex);
});

// ── Palette ───────────────────────────────────────────────────
function buildPalette() {
  paletteGrid.innerHTML = '';
  questions.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'palette-btn';
    btn.textContent = i + 1;
    btn.id = `pal-${i}`;
    btn.addEventListener('click', () => renderQuestion(i));
    paletteGrid.appendChild(btn);
  });
  updateStats();
}

function updatePaletteBtn(index) {
  const btn = document.getElementById(`pal-${index}`);
  if (!btn) return;
  btn.className = 'palette-btn';
  if (marked[index])          btn.classList.add('marked');
  else if (answers[index] !== null) btn.classList.add('answered');
}

function updatePaletteActive(index) {
  document.querySelectorAll('.palette-btn').forEach((b, i) => {
    b.classList.toggle('active', i === index);
  });
}

function updateStats() {
  const ans = answers.filter(a => a !== null).length;
  const unans = questions.length - ans;
  const mkd   = marked.filter(Boolean).length;
  paletteStats.innerHTML = `
    <strong>${ans}</strong> Answered &nbsp;|&nbsp;
    <strong>${unans}</strong> Not Answered &nbsp;|&nbsp;
    <strong>${mkd}</strong> Marked
  `;
}

// ── Submit Flow ───────────────────────────────────────────────
document.getElementById('topSubmitBtn').addEventListener('click', openSubmitModal);

function openSubmitModal() {
  const ans = answers.filter(a => a !== null).length;
  answeredCount.textContent = ans;
  submitModal.classList.remove('hidden');
}

document.getElementById('cancelSubmit').addEventListener('click', () => {
  submitModal.classList.add('hidden');
});

document.getElementById('confirmSubmit').addEventListener('click', () => {
  submitModal.classList.add('hidden');
  submitExam('voluntary');
});

async function submitExam(reason = 'voluntary') {
  if (examSubmitted) return;
  examSubmitted = true;
  clearInterval(timerInterval);
  Proctor.stopProctoring();

  const payload = {
    studentDocId: studentData.docId,
    rollNumber:   studentData.rollNumber,
    email:        studentData.email,
    firstName:    studentData.firstName,
    lastName:     studentData.lastName,
    stream:       studentData.stream,
    answers:      answers,
    markedForReview: marked,
    submittedAt:  new Date().toISOString(),
    timeTaken:    (EXAM_CONFIG.durationMins * 60) - timeLeft,
    submitReason: reason
  };

  try {
    await db.collection(COLLECTIONS.responses).add(payload);
    await db.collection(COLLECTIONS.students)
      .doc(studentData.docId)
      .update({ status: 'submitted', submittedAt: new Date().toISOString() });
  } catch(e) {
    console.error('Submit error:', e);
  }

  // Exit fullscreen
  try {
    if (document.exitFullscreen) document.exitFullscreen();
  } catch(e) {}

  window.location.href = 'submitted.html';
}

function autoSubmit(reason) {
  submitExam(reason);
}

// ── Proctoring Integration ────────────────────────────────────
function initProctoring() {
  Proctor.init((reason) => {
    violationModal.classList.remove('hidden');
    document.getElementById('violationOkBtn').addEventListener('click', () => {
      terminateExam(reason);
    });
    // Auto-terminate after 4 seconds even without click
    setTimeout(() => terminateExam(reason), 4000);
  });

  Proctor.startProctoring();
}

async function terminateExam(reason) {
  if (examSubmitted) return;
  examSubmitted = true;
  clearInterval(timerInterval);

  const payload = {
    studentDocId: studentData.docId,
    rollNumber:   studentData.rollNumber,
    email:        studentData.email,
    answers:      answers,
    submittedAt:  new Date().toISOString(),
    submitReason: `TERMINATED: ${reason}`
  };

  try {
    await db.collection(COLLECTIONS.responses).add(payload);
    await db.collection(COLLECTIONS.students)
      .doc(studentData.docId)
      .update({ status: 'terminated', terminatedAt: new Date().toISOString(), reason });
  } catch(e) {
    console.error('Terminate error:', e);
  }

  try {
    if (document.exitFullscreen) document.exitFullscreen();
  } catch(e) {}

  window.location.href = 'terminated.html';
}