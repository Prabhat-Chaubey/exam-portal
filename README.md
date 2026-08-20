# 📘 ExamPortal — Proctored Online Exam System

A fully proctored, minimalistic online exam portal built with 
HTML5, CSS3, Vanilla JavaScript, and Firebase Firestore.

---

## ✨ Features
- Student registration with validation
- Fullscreen-locked proctored exam
- Tab switch = instant exam termination
- 30-minute countdown timer
- MCQ + Short Answer support
- Question palette with status tracking
- Firebase Firestore backend
- Violation logging

---

## 🛠️ Setup Instructions

### Step 1 — Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/exam-portal.git
cd exam-portal
```

### Step 2 — Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **Add Project** → name it `exam-portal`
3. Go to **Firestore Database** → Create database → Start in **test mode**
4. Go to **Project Settings** → Add a **Web App**
5. Copy the `firebaseConfig` object
6. Open `js/firebase-config.js` and replace the placeholder values

### Step 3 — Firestore Rules (Production)
In Firebase Console → Firestore → Rules, set:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /students/{doc} {
      allow read, create: if true;
      allow update: if true;
    }
    match /responses/{doc} {
      allow create: if true;
    }
    match /violations/{doc} {
      allow create: if true;
    }
  }
}
```

### Step 4 — Customize Questions
Edit `js/questions.js` — replace the lorem ipsum questions 
with your actual exam questions.

### Step 5 — Deploy to GitHub Pages
```bash
git add .
git commit -m "Initial exam portal setup"
git push origin main
```
Then:
- Go to your GitHub repository
- Settings → Pages
- Source: **Deploy from branch** → `main` → `/ (root)`
- Save → Your site will be live at:
  `https://YOUR_USERNAME.github.io/exam-portal/`

---

## 📁 Project Structure
```
exam-portal/
├── index.html         ← Registration page
├── welcome.html       ← Instructions + Start Test
├── exam.html          ← Proctored exam page
├── submitted.html     ← Success page
├── terminated.html    ← Violation termination page
├── css/
│   ├── style.css
│   ├── welcome.css
│   └── exam.css
├── js/
│   ├── firebase-config.js
│   ├── register.js
│   ├── welcome.js
│   ├── questions.js
│   ├── proctor.js
│   └── exam.js
└── README.md
```

---

## 🔒 Proctoring Rules
| Action | Result |
|--------|--------|
| Switch tab | Instant termination |
| Minimize window | Instant termination |
| Exit fullscreen | Instant termination |
| Press Escape | Re-triggers fullscreen |
| Right click | Disabled |
| Ctrl+C / Ctrl+V | Disabled |
| F12 (DevTools) | Blocked |
| Alt+Tab | Blocked |

---

## 📊 Firebase Collections
| Collection | Data Stored |
|------------|-------------|
| `students` | Registration info + exam status |
| `responses` | All student answers |
| `violations` | Tab switch / fullscreen violations |

---

## 📬 Contact
For questions, contact your exam administrator.