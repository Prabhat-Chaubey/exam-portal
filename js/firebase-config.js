// ============================================================
// FIREBASE CONFIGURATION
// Replace these values with YOUR Firebase project credentials
// Steps:
// 1. Go to https://console.firebase.google.com
// 2. Create a project → Add Web App
// 3. Copy the config object below
// 4. Enable Firestore Database (Start in test mode)
// ============================================================

const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Collection names
const COLLECTIONS = {
  students:    'students',     // student registration data
  responses:   'responses',    // exam answers
  violations:  'violations'    // proctoring violations
};