// ============================================================
// REGISTRATION LOGIC
// ============================================================

const form      = document.getElementById('registerForm');
const submitBtn = document.getElementById('submitBtn');
const btnText   = document.getElementById('btnText');
const btnLoader = document.getElementById('btnLoader');

const fields = ['firstName','lastName','email','rollNumber','stream'];

function showError(fieldId, msg) {
  document.getElementById(fieldId).classList.add('input-error');
  document.getElementById(`err-${fieldId}`).textContent = msg;
}

function clearError(fieldId) {
  document.getElementById(fieldId).classList.remove('input-error');
  document.getElementById(`err-${fieldId}`).textContent = '';
}

function validateForm() {
  let valid = true;
  fields.forEach(f => clearError(f));

  const firstName  = document.getElementById('firstName').value.trim();
  const lastName   = document.getElementById('lastName').value.trim();
  const email      = document.getElementById('email').value.trim();
  const rollNumber = document.getElementById('rollNumber').value.trim();
  const stream     = document.getElementById('stream').value;

  if (!firstName)  { showError('firstName',  'First name is required.');   valid = false; }
  if (!lastName)   { showError('lastName',   'Last name is required.');    valid = false; }
  if (!email)      { showError('email',      'Email is required.');        valid = false; }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                     showError('email',      'Enter a valid email address.'); valid = false; }
  if (!rollNumber) { showError('rollNumber', 'Roll number is required.');  valid = false; }
  if (!stream)     { showError('stream',     'Please select your stream.'); valid = false; }

  return valid;
}

function setLoading(state) {
  submitBtn.disabled = state;
  btnText.classList.toggle('hidden', state);
  btnLoader.classList.toggle('hidden', !state);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  setLoading(true);

  const studentData = {
    firstName:   document.getElementById('firstName').value.trim(),
    lastName:    document.getElementById('lastName').value.trim(),
    email:       document.getElementById('email').value.trim().toLowerCase(),
    rollNumber:  document.getElementById('rollNumber').value.trim(),
    stream:      document.getElementById('stream').value,
    registeredAt: new Date().toISOString(),
    status:      'registered'
  };

  try {
    // Check if student already registered
    const existing = await db.collection(COLLECTIONS.students)
      .where('email', '==', studentData.email)
      .where('rollNumber', '==', studentData.rollNumber)
      .get();

    let docId;

    if (!existing.empty) {
      // Student already registered — check if already submitted
      const doc = existing.docs[0];
      const data = doc.data();
      docId = doc.id;

      if (data.status === 'submitted') {
        alert('⚠️ You have already submitted this exam. Contact your administrator.');
        setLoading(false);
        return;
      }
      if (data.status === 'terminated') {
        alert('🚫 Your session was terminated due to a violation. Contact your administrator.');
        setLoading(false);
        return;
      }
    } else {
      // New registration
      const docRef = await db.collection(COLLECTIONS.students).add(studentData);
      docId = docRef.id;
    }

    // Store in sessionStorage for use across pages
    sessionStorage.setItem('studentData', JSON.stringify({ ...studentData, docId }));
    sessionStorage.setItem('examStarted', 'false');

    window.location.href = 'welcome.html';

  } catch (err) {
    console.error('Registration error:', err);
    alert('❌ Could not connect to the database. Please check your connection and try again.');
    setLoading(false);
  }
});

// Real-time field validation
fields.forEach(fieldId => {
  const el = document.getElementById(fieldId);
  if (el) el.addEventListener('input', () => clearError(fieldId));
});