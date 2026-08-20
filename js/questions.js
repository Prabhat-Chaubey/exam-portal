// ============================================================
// QUESTION BANK — 30 Questions (25 MCQ + 5 Short Answer)
// Replace with your actual questions before going live
// ============================================================

const EXAM_CONFIG = {
  name:          "General Aptitude Test — 2024",
  totalQuestions: 30,
  durationMins:  30,
  passingScore:  60
};

const questions = [
  // ── MCQ QUESTIONS (1–25) ──────────────────────────────
  {
    id: 1, type: "mcq",
    text: "Lorem ipsum: If a train travels 120 km in 2 hours, what is its average speed?",
    options: ["A. 40 km/h", "B. 60 km/h", "C. 80 km/h", "D. 100 km/h"],
    correct: 1
  },
  {
    id: 2, type: "mcq",
    text: "Lorem ipsum: Which of the following is NOT a primary color in light?",
    options: ["A. Red", "B. Green", "C. Yellow", "D. Blue"],
    correct: 2
  },
  {
    id: 3, type: "mcq",
    text: "Lorem ipsum: What is the value of 2⁸?",
    options: ["A. 128", "B. 256", "C. 512", "D. 64"],
    correct: 1
  },
  {
    id: 4, type: "mcq",
    text: "Lorem ipsum: A rectangle has length 12 cm and width 8 cm. What is its perimeter?",
    options: ["A. 40 cm", "B. 48 cm", "C. 96 cm", "D. 20 cm"],
    correct: 0
  },
  {
    id: 5, type: "mcq",
    text: "Lorem ipsum: Which planet is known as the Red Planet?",
    options: ["A. Venus", "B. Jupiter", "C. Mars", "D. Saturn"],
    correct: 2
  },
  {
    id: 6, type: "mcq",
    text: "Lorem ipsum: What does HTML stand for?",
    options: [
      "A. Hyper Text Markup Language",
      "B. High Tech Modern Language",
      "C. Hyper Transfer Markup Language",
      "D. None of the above"
    ],
    correct: 0
  },
  {
    id: 7, type: "mcq",
    text: "Lorem ipsum: The square root of 144 is:",
    options: ["A. 10", "B. 11", "C. 12", "D. 14"],
    correct: 2
  },
  {
    id: 8, type: "mcq",
    text: "Lorem ipsum: Who wrote 'Romeo and Juliet'?",
    options: ["A. Charles Dickens", "B. William Shakespeare", "C. Mark Twain", "D. Jane Austen"],
    correct: 1
  },
  {
    id: 9, type: "mcq",
    text: "Lorem ipsum: Which data structure works on the LIFO principle?",
    options: ["A. Queue", "B. Array", "C. Stack", "D. Tree"],
    correct: 2
  },
  {
    id: 10, type: "mcq",
    text: "Lorem ipsum: What is the chemical symbol for Gold?",
    options: ["A. Gd", "B. Go", "C. Au", "D. Ag"],
    correct: 2
  },
  {
    id: 11, type: "mcq",
    text: "Lorem ipsum: 15% of 200 is equal to:",
    options: ["A. 20", "B. 25", "C. 30", "D. 35"],
    correct: 2
  },
  {
    id: 12, type: "mcq",
    text: "Lorem ipsum: Which of the following is an operating system?",
    options: ["A. Python", "B. Linux", "C. HTML", "D. MySQL"],
    correct: 1
  },
  {
    id: 13, type: "mcq",
    text: "Lorem ipsum: The speed of light is approximately:",
    options: ["A. 3×10⁵ km/s", "B. 3×10⁶ km/s", "C. 3×10⁴ km/s", "D. 3×10⁸ m/s only"],
    correct: 0
  },
  {
    id: 14, type: "mcq",
    text: "Lorem ipsum: Which of the following is a renewable energy source?",
    options: ["A. Coal", "B. Natural Gas", "C. Solar Energy", "D. Petroleum"],
    correct: 2
  },
  {
    id: 15, type: "mcq",
    text: "Lorem ipsum: A man walks 4 km East, then 3 km North. How far is he from the start?",
    options: ["A. 5 km", "B. 6 km", "C. 7 km", "D. 4 km"],
    correct: 0
  },
  {
    id: 16, type: "mcq",
    text: "Lorem ipsum: Which sorting algorithm has the best average-case time complexity?",
    options: ["A. Bubble Sort", "B. Selection Sort", "C. Merge Sort", "D. Insertion Sort"],
    correct: 2
  },
  {
    id: 17, type: "mcq",
    text: "Lorem ipsum: The powerhouse of the cell is the:",
    options: ["A. Nucleus", "B. Ribosome", "C. Mitochondria", "D. Endoplasmic Reticulum"],
    correct: 2
  },
  {
    id: 18, type: "mcq",
    text: "Lorem ipsum: What is the binary representation of decimal 10?",
    options: ["A. 1010", "B. 1100", "C. 1001", "D. 0110"],
    correct: 0
  },
  {
    id: 19, type: "mcq",
    text: "Lorem ipsum: Which protocol is used to send email?",
    options: ["A. FTP", "B. HTTP", "C. SMTP", "D. SSH"],
    correct: 2
  },
  {
    id: 20, type: "mcq",
    text: "Lorem ipsum: If 5x + 10 = 35, what is x?",
    options: ["A. 3", "B. 4", "C. 5", "D. 6"],
    correct: 2
  },
  {
    id: 21, type: "mcq",
    text: "Lorem ipsum: The full form of CPU is:",
    options: [
      "A. Central Processing Unit",
      "B. Core Programming Unit",
      "C. Central Program Utility",
      "D. Computer Processing Unit"
    ],
    correct: 0
  },
  {
    id: 22, type: "mcq",
    text: "Lorem ipsum: In a class of 40 students, 60% are girls. How many are boys?",
    options: ["A. 14", "B. 16", "C. 18", "D. 20"],
    correct: 1
  },
  {
    id: 23, type: "mcq",
    text: "Lorem ipsum: Which gas is most abundant in Earth's atmosphere?",
    options: ["A. Oxygen", "B. Carbon Dioxide", "C. Nitrogen", "D. Hydrogen"],
    correct: 2
  },
  {
    id: 24, type: "mcq",
    text: "Lorem ipsum: Which of these is NOT an OOP concept?",
    options: ["A. Encapsulation", "B. Polymorphism", "C. Compilation", "D. Inheritance"],
    correct: 2
  },
  {
    id: 25, type: "mcq",
    text: "Lorem ipsum: The average of 10, 20, 30, 40, and 50 is:",
    options: ["A. 25", "B. 30", "C. 35", "D. 40"],
    correct: 1
  },

  // ── SHORT ANSWER QUESTIONS (26–30) ────────────────────
  {
    id: 26, type: "short",
    text: "Lorem ipsum: Briefly explain what is meant by 'Object-Oriented Programming' and name any two of its principles.",
    placeholder: "Write your answer here (2–3 sentences)..."
  },
  {
    id: 27, type: "short",
    text: "Lorem ipsum: Define 'Cloud Computing' and mention any two advantages it offers to businesses.",
    placeholder: "Write your answer here (2–3 sentences)..."
  },
  {
    id: 28, type: "short",
    text: "Lorem ipsum: What is the difference between RAM and ROM? Give one example of each.",
    placeholder: "Write your answer here (2–3 sentences)..."
  },
  {
    id: 29, type: "short",
    text: "Lorem ipsum: Explain the concept of 'Artificial Intelligence' and provide one real-world application of it.",
    placeholder: "Write your answer here (2–3 sentences)..."
  },
  {
    id: 30, type: "short",
    text: "Lorem ipsum: What is a 'Database Management System (DBMS)'? Name any two popular DBMS software.",
    placeholder: "Write your answer here (2–3 sentences)..."
  }
];