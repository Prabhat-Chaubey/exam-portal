// ============================================================
// WELCOME PAGE LOGIC
// ============================================================

const studentData = JSON.parse(sessionStorage.getItem('studentData') || 'null');

// Guard: redirect if not registered
if (!studentData) {
  window.location.href = 'index.html';
}

// Populate greeting
document.getElementById('welcomeHeading').textContent =
  `Welcome, ${studentData.firstName} ${studentData.lastName}! 👋`;
document.getElementById('welcomeSubtext').textContent =
  `You're registered for the exam. Please read all instructions before proceeding.`;

document.getElementById('studentInfoBar').innerHTML =
  `📋 <strong>${studentData.firstName} ${studentData.lastName}</strong> &nbsp;|&nbsp; 
   Roll No: <strong>${studentData.rollNumber}</strong> &nbsp;|&nbsp; 
   Stream: <strong>${studentData.stream}</strong> &nbsp;|&nbsp; 
   Email: <strong>${studentData.email}</strong>`;

// Agreement checkbox enables Start button
const agreeCheck  = document.getElementById('agreeCheck');
const startTestBtn = document.getElementById('startTestBtn');

agreeCheck.addEventListener('change', () => {
  startTestBtn.disabled = !agreeCheck.checked;
});

startTestBtn.addEventListener('click', () => {
  if (!agreeCheck.checked) return;
  sessionStorage.setItem('examStarted', 'true');
  window.location.href = 'exam.html';
});