# 🎓 OmniStudy AI - YouTube to Handwritten Notes & Multilingual AI Doubt Solver (MERN Stack)

**OmniStudy AI** is a full-featured MERN Stack web application designed to help students convert any YouTube video lecture into beautiful, authentic **Handwritten PDF Notes**, formula sheets, mind maps, and exam PYQs (Previous Year Questions), along with an interactive **Multilingual AI Doubt Solver** supporting Hinglish, Hindi, and English.

---

## 🌟 Features

1. **YouTube Video to Handwritten Notes PDF Generator**:
   - Paste any YouTube Video URL (Lectures, Tutorials, Shorts).
   - Automatically extracts transcripts.
   - Generates structured handwritten-styled notebook notes (Summary, Key Concepts with Sticky Notes, Formulas, PYQs, Mindmaps).
   - Download notes directly as styled **Handwritten PDF** using Google Fonts (*Kalam*, *Caveat*).

2. **Multilingual AI Doubt Solver Chatbot**:
   - Supports **Hinglish** (Hindi + English), **Hindi (हिंदी)**, and **English**.
   - Contextually aware of the YouTube video notes.
   - Solves doubts step-by-step with real-life analogies, formulas, and memory tips.
   - Pre-loaded quick prompt chips for instant doubt resolution.

3. **University & Exam PYQ & Formula Hub**:
   - Search Previous Year Questions (PYQs) and Formula Sheets tailored for specific exams or universities:
     - **CBSE Class 10/12**
     - **JEE Main & Advanced / NEET UG**
     - **AKTU (APJ Abdul Kalam Tech Univ)**
     - **Delhi University (DU)**
     - **VTU / Mumbai University / Anna University**
     - **GATE & CS/Engineering Exams**

4. **Saved Notes Library**:
   - Access and re-open all previously processed video notes anytime.
   - MongoDB database persistence with graceful in-memory fallback.

---

## 🚀 Tech Stack

- **Frontend**: React.js (Vite), Tailwind CSS, Lucide React Icons, Google Handwritten Fonts (*Kalam*, *Caveat*), `html2pdf.js`
- **Backend**: Node.js, Express.js, `@google/generative-ai` (Gemini 1.5/2.5 Flash), `youtube-transcript`, `axios`
- **Database**: MongoDB & Mongoose (with in-memory store fallback)

---

## ⚙️ Quick Setup Guide

### 1. Install Dependencies

In the project root folder (`OmniStudy_AI`):

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Configure Gemini API Key

Open `server/.env` and add your Google Gemini API key:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/omnistudy
GEMINI_API_KEY=your_gemini_api_key_here
```

*(Note: You can also enter or update your Gemini API key directly inside the web UI top header menu!)*

### 3. Start the Application

To run both Backend & Frontend concurrently:

```bash
npm run dev
```

- **Frontend Web UI**: `http://localhost:3000`
- **Backend Express API**: `http://localhost:5000`

---

## 📖 How to Use

1. Open `http://localhost:3000` in your browser.
2. Paste any YouTube video link (e.g. Physics lecture, Math derivation, CS topic).
3. Click **Generate Notes**.
4. View your ruled notebook notes with sticky notes, formula cards, and PYQs.
5. Click **Download Handwritten PDF** to save your notes.
6. Switch to **AI Doubt Solver** tab to ask any question in **Hinglish**, **Hindi**, or **English**!
7. Use **Exam & PYQ Hub** to fetch university-specific exam questions and formula cheat sheets!

---

Developed with ❤️ for Students using **MERN Stack & Gemini AI**.
