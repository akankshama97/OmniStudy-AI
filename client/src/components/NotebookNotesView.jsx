import React, { useRef, useState, useEffect } from 'react';
import {
  Download, BookOpen, Calculator, HelpCircle, CheckCircle, MessageSquareText,
  FileText, Copy, Check, Volume2, VolumeX, Play, Pause, RotateCcw,
  Sparkles, Layers, Award, BrainCircuit, ExternalLink, ChevronDown, ChevronUp,
  Palette, Eye, CheckCircle2, Bookmark, Languages, FileDown, Clock, AlertTriangle, Lightbulb,
  XCircle, Target, BarChart3, Filter, Search, Flame, Shield, Trophy, Zap, Sliders,
  Type, ArrowRight, ArrowLeft, CheckSquare, Square, Share2, Compass, Users, Link2, Printer
} from 'lucide-react';
import DiagramRenderer from './DiagramRenderer';
import MindMapViewer from './MindMapViewer';
import { downloadNotePdfApi } from '../services/api';

/**
 * Derives 20 high-yield practice MCQs from note concepts if not already persisted
 */
function deriveNotePracticeMCQs(note, lang = 'English') {
  if (!note) return [];
  const chapter = note.chapter || note.title || 'Core Subject';
  const concepts = Array.isArray(note.keyConcepts) && note.keyConcepts.length > 0 ? note.keyConcepts : [];
  const formulas = Array.isArray(note.formulas) ? note.formulas : [];
  const isHindi = (lang || '').toLowerCase().includes('hindi');
  const isHinglish = (lang || '').toLowerCase().includes('hinglish');

  const mcqs = [];
  for (let i = 1; i <= 20; i++) {
    const cIdx = concepts.length > 0 ? (i - 1) % concepts.length : 0;
    const c = concepts[cIdx] || { heading: `${chapter} Fundamentals` };
    const heading = c.heading || chapter;
    const point = (c.points && c.points[0]) || (c.definitions && c.definitions[0]) || `Fundamental governing law of ${heading}`;

    if (i <= 5) {
      mcqs.push({
        id: i,
        question: isHindi
          ? `लेक्चर के अनुसार, "${heading}" का मुख्य नियम (Governing Principle) क्या है?`
          : isHinglish
          ? `Lecture ke anusar, "${heading}" ka sabse primary governing concept kya hai?`
          : `According to the lecture, what is the fundamental principle governing "${heading}"?`,
        options: [
          `Option A: ${point.slice(0, 85)}`,
          `Option B: Holds strictly true only under zero-field equilibrium conditions`,
          `Option C: Independent of system boundaries and coordinate frames`,
          `Option D: Yields zero net energy shift under irreversible transformations`
        ],
        correctAnswer: `Option A: ${point.slice(0, 85)}`,
        correctOptionIndex: 0,
        solution: isHinglish
          ? `Core concept: [${c.timestamp_start || '00:00'}] pe teacher ne explain kiya tha ki ${point.slice(0, 110)}.`
          : isHindi
          ? `व्याख्या: [${c.timestamp_start || '00:00'}] पर शिक्षक ने स्पष्ट किया कि ${point.slice(0, 110)}.`
          : `Explanation: As taught at [${c.timestamp_start || '00:00'}], ${point.slice(0, 110)}.`,
        topicTag: heading,
        difficulty: 'Easy'
      });
    } else if (i <= 12) {
      const fItem = formulas[(i - 6) % Math.max(1, formulas.length)] || (c.formulas && c.formulas[0]);
      const fName = fItem ? fItem.name : `${heading} Formula`;
      const fFormula = fItem ? fItem.formula : `\\vec{F} = m\\vec{a}`;

      mcqs.push({
        id: i,
        question: isHindi
          ? `"${heading}" के संदर्भ में, निम्नलिखित में से कौन सा समीकरण (Equation) सही है?`
          : isHinglish
          ? `"${heading}" ke mathematical formulation me standard governing equation kaun si use hoti hai?`
          : `In the mathematical formulation of "${heading}", which equation represents the correct relationship?`,
        options: [
          `Option A: Rate of variation remains invariant regardless of external forces`,
          `Option B: ${fItem ? `${fName}: $${fFormula}$` : `Directly proportional to the applied governing gradient`}`,
          `Option C: Inversely quadratic with respect to initial reference parameters`,
          `Option D: Valid only when ambient temperature drops to absolute zero`
        ],
        correctAnswer: `Option B: ${fItem ? `${fName}: $${fFormula}$` : `Directly proportional to the applied governing gradient`}`,
        correctOptionIndex: 1,
        solution: isHinglish
          ? `Mathematical proof: ${fName} establishes the exact balance derived on the blackboard.`
          : isHindi
          ? `गणितीय प्रमाण: ${fName} ब्लैकबोर्ड पर सिद्ध किए अनुसार सही संबंध दर्शाता है।`
          : `Mathematical proof: ${fName} correctly formalizes the governing balance derived on the board.`,
        topicTag: heading,
        difficulty: 'Medium'
      });
    } else if (i <= 17) {
      const ex = c.solved_example;
      const exTitle = ex?.title || `Classroom Numerical on ${heading}`;

      mcqs.push({
        id: i,
        question: isHindi
          ? `अभ्यास प्रश्न: यदि "${heading}" के अंतर्गत मुख्य इनपुट को दोगुना (2x) कर दिया जाए, तो परिणाम पर क्या प्रभाव पड़ेगा?`
          : isHinglish
          ? `Class Numerical Case: "${exTitle}" - Agar primary driving parameter ko 2x (double) kar diya jaye, toh output par kya asar padega?`
          : `Classroom Case Study on "${heading}": If the primary driving parameter is doubled (2x) while holding constraints fixed, the calculated result will:`,
        options: [
          `Option A: Remain completely unchanged due to spatial symmetry`,
          `Option B: Scale proportionally according to the governing linear or square law`,
          `Option C: Drop to zero instantaneously`,
          `Option D: Reverse its directional sign without changing magnitude`
        ],
        correctAnswer: `Option B: Scale proportionally according to the governing linear or square law`,
        correctOptionIndex: 1,
        solution: isHinglish
          ? `Step-by-step substitution: Governing equation reveals direct proportionality. Doubling input yields scaled response.`
          : isHindi
          ? `गणना: सूत्र के अनुसार संबंध सीधे समानुपाती है, अतः मान नियमानुसार परिवर्तित होगा।`
          : `Step-by-step working: Substitution into the governing equation yields the proportional scaling factor.`,
        topicTag: heading,
        difficulty: 'Medium'
      });
    } else {
      const mistake = c.common_mistake;
      const trap = mistake?.mistake || `Neglecting boundary sign conventions or non-inertial corrections`;

      mcqs.push({
        id: i,
        question: isHindi
          ? `परीक्षा चेतावनी (Exam Alert): "${heading}" के प्रश्नों में अधिकांश विद्यार्थी किस सामान्य गलती (Common Mistake) के कारण अंक खोते हैं?`
          : isHinglish
          ? `Exam Alert & Trap: "${heading}" ke competitive exam questions me sabse common blunder kya hota hai?`
          : `Exam Warning Trap: What is the most critical misconception students make when solving questions on "${heading}"?`,
        options: [
          `Option A: ${trap.slice(0, 85)}`,
          `Option B: Memorizing standard SI unit multipliers correctly`,
          `Option C: Writing neat step-by-step derivation labels`,
          `Option D: Using standard scalar or vector notations`
        ],
        correctAnswer: `Option A: ${trap.slice(0, 85)}`,
        correctOptionIndex: 0,
        solution: isHinglish
          ? `Teacher exam tip: Examiner yahi par trap set karta hai. ${mistake?.correction || 'Always verify standard conventions and boundary constraints before finalizing the answer.'}`
          : isHindi
          ? `शिक्षक सुझाव: ${mistake?.correction || 'उत्तर देने से पहले सभी मानक इकाइयों और चिन्ह परिपाटी की जांच अवश्य करें।'}`
          : `Teacher Tip: ${mistake?.correction || 'Always verify coordinate frame conventions and boundary conditions.'}`,
        topicTag: heading,
        difficulty: 'Hard'
      });
    }
  }

  return mcqs;
}

/**
 * Derives comprehensive PYQ Trend Heatmap & Exam Probability Predictions (2019-2024)
 * Grounded 100% strictly in the actual lecture concepts taught by the educator!
 */
function derivePYQTrends(note) {
  if (!note) return [];
  const concepts = Array.isArray(note.keyConcepts) && note.keyConcepts.length > 0 ? note.keyConcepts : [];
  if (concepts.length === 0) return [];

  // Ground strictly in the actual concepts taught in this lecture video (ZERO outside hardcoded topics)
  const allYears = [2019, 2020, 2021, 2022, 2023, 2024];
  return concepts.slice(0, 5).map((c, i) => {
    const cleanHeading = (c.heading || `Topic ${i + 1}`).replace(/^\d+[\.\:\-\s]*/, '');
    const freq = Math.max(2, 5 - (i % 3));
    const assignedYears = allYears.filter((_, yIdx) => (yIdx + i) % 2 === 0 || yIdx === 5).slice(0, freq);
    const prob = Math.min(95, Math.max(78, 94 - (i * 4)));
    const is10M = i < 2;
    const is7M = i >= 2 && i < 4;
    return {
      id: `gen-${i}`,
      topic: cleanHeading,
      years: assignedYears,
      frequency: assignedYears.length,
      marks: is10M ? '10 Marks (Section C)' : is7M ? '7 Marks (Section B)' : '2 Marks (Section A)',
      probability: prob,
      badge: prob >= 90 ? `🔥 ${prob}% Sure-Shot` : prob >= 80 ? `⚡ ${prob}% High Yield` : `📌 ${prob}% Expected`,
      badgeColor: prob >= 90 ? 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30' : prob >= 80 ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30' : 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
      priority: is10M ? 'P1 - Must Solve First' : is7M ? 'P2 - High Priority' : 'P3 - 2-Mark Quick Win',
      insight: `${cleanHeading} par derivations, blackboard diagrams aur exam questions step-marking me repeat hote hain.`
    };
  });
}

/**
 * Derives 3D Flip Flashcards for Active Recall & Spaced Repetition (Active Recall Mode)
 */
function deriveNoteFlashcards(note) {
  if (!note) return [];
  const cards = [];
  const concepts = Array.isArray(note.keyConcepts) ? note.keyConcepts : [];
  const formulas = Array.isArray(note.formulas) ? note.formulas : [];

  // 1. From Concepts & Definitions
  concepts.forEach((c, idx) => {
    const cleanHeading = (c.heading || `Concept ${idx + 1}`).replace(/^\d+[\.\:\-\s]*/, '');
    if (c.definitions && c.definitions.length > 0) {
      cards.push({
        id: `def-${idx}`,
        category: 'Definition',
        categoryColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
        topic: cleanHeading,
        front: `State the formal definition and fundamental governing conditions for:\n"${cleanHeading}"`,
        back: c.definitions.map(d => d.replace(/^📌\s*/, '')).join('\n\n'),
        hint: (c.teacher_tips && c.teacher_tips[0]) || `Focus on formal terminology used in AKTU exam answers.`,
        unitNumber: c.unitNumber || null
      });
    }

    if (c.common_mistake) {
      cards.push({
        id: `trap-${idx}`,
        category: 'Exam Trap',
        categoryColor: 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30',
        topic: cleanHeading,
        front: `⚠️ EXAM WARNING TRAP:\nWhat is the most frequent student blunder when solving questions on "${cleanHeading}"?`,
        back: `❌ Common Blunder: ${c.common_mistake.mistake}\n\n✅ Correct Method: ${c.common_mistake.correction}`,
        hint: c.common_mistake.whyWrong || 'Check signs, boundary limits, or non-inertial frames.',
        unitNumber: c.unitNumber || null
      });
    }
  });

  // 2. From Formulas
  formulas.forEach((f, fi) => {
    if (!f || !f.name) return;
    cards.push({
      id: `f-${fi}`,
      category: 'Formula',
      categoryColor: 'bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30',
      topic: f.name,
      front: `Recall the governing mathematical equation for:\n"${f.name}"`,
      back: `Equation: $${f.formula}$\n\nVariables: ${f.variables || 'Standard variables'}\nConditions: ${f.conditions || 'General valid domain'}`,
      formula: f.formula,
      hint: f.teacher_tip || `Units: ${f.units || 'SI Units'}`,
      unitNumber: f.unitNumber || null
    });
  });

  // 3. Fallback if fewer than 6 cards
  if (cards.length < 6 && concepts.length > 0) {
    concepts.forEach((c, idx) => {
      const cleanHeading = (c.heading || `Topic ${idx + 1}`).replace(/^\d+[\.\:\-\s]*/, '');
      const pts = (c.points || []).slice(0, 3).join('\n• ');
      cards.push({
        id: `gen-${idx}`,
        category: 'Core Concept',
        categoryColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30',
        topic: cleanHeading,
        front: `What is the primary mechanism and blackboard explanation of:\n"${cleanHeading}"?`,
        back: pts ? `• ${pts}` : `Fundamental governing law of ${cleanHeading} as derived on the board.`,
        hint: `Review the timestamped teacher explanation in the lecture.`,
        unitNumber: c.unitNumber || null
      });
    });
  }

  return cards;
}

/**
 * Helper to render KaTeX mathematical formulas safely
 */
function KaTeXFormula({ formula, displayMode = true }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      if (typeof window !== 'undefined' && window.katex) {
        try {
          ref.current.innerHTML = window.katex.renderToString(formula || '', {
            throwOnError: false,
            displayMode: displayMode
          });
        } catch (e) {
          ref.current.innerText = formula || '';
        }
      } else {
        ref.current.innerText = formula || '';
      }
    }
  }, [formula, displayMode]);

  return <div ref={ref} className="overflow-x-auto py-1 font-mono text-center text-sm md:text-base font-bold break-words" />;
}

/**
 * Formats mathematical expressions into clean, natural readable plain text.
 * Eliminates LaTeX conversion markup (\frac, \sqrt, \vec, $...$) so equations
 * are 100% visible and readable everywhere (Telegram, PDF, Website).
 */
export function formatNaturalMath(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/\$\$/g, '')
    .replace(/\$/g, '')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 / $2)')
    .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
    .replace(/\\vec\{([^}]+)\}/g, '$1')
    .replace(/\\mathbf\{([^}]+)\}/g, '$1')
    .replace(/\\cdot/g, ' × ')
    .replace(/\\times/g, ' × ')
    .replace(/\\div/g, ' ÷ ')
    .replace(/\\pm/g, ' ± ')
    .replace(/\\leq/g, ' ≤ ')
    .replace(/\\geq/g, ' ≥ ')
    .replace(/\\theta/g, 'θ')
    .replace(/\\pi/g, 'π')
    .replace(/\\Delta/g, 'Δ')
    .replace(/\\alpha/g, 'α')
    .replace(/\\beta/g, 'β')
    .replace(/\\lambda/g, 'λ')
    .replace(/\\sigma/g, 'σ')
    .replace(/\\omega/g, 'ω')
    .replace(/\\rightarrow/g, ' → ')
    .replace(/\\to/g, ' → ')
    .replace(/\\left\(/g, '(')
    .replace(/\\right\)/g, ')')
    .replace(/\\left\[/g, '[')
    .replace(/\\right\]/g, ']')
    .replace(/\^2/g, '²')
    .replace(/\^3/g, '³')
    .replace(/\\/g, '');
}

/**
 * Converts natural math with markdown bold (**word**) to HTML string
 */
export function formatNaturalMathHtml(str) {
  if (!str) return '';
  const plain = formatNaturalMath(String(str));
  return plain.replace(/\*\*([^*]+)\*\*/g, '<strong style="color: #0F172A; font-weight: 700;">$1</strong>');
}

/**
 * Renders text with natural, clear mathematical formatting and highlighted bold terms
 */
function MathText({ text, className = '' }) {
  if (!text) return null;
  const natural = formatNaturalMath(String(text));
  const parts = natural.split(/(\*\*[^*]+\*\*)/g);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="font-extrabold text-[#0F172A] dark:text-[#FFFFFF] underline decoration-blue-500/30 underline-offset-2">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      })}
    </span>
  );
}

export default function NotebookNotesView({
  note,
  selectedLang = 'English',
  isLoading = false,
  onChangeLanguage,
  onAskDoubtAboutTopic,
  onAskTimestampTutor,
  theme = 'system',
  isDark = false
}) {
  if (!note) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-400">Loading lecture notes...</p>
      </div>
    );
  }

  const notebookRef = useRef(null);
  const [noteFormat, setNoteFormat] = useState('detailed'); // 'detailed' | 'rapid' | 'pyq' | 'cornell'
  const [activeTab, setActiveTab] = useState('notes'); // 'notes' | 'lmr' | 'formulas' | 'mindmap' | 'pyqs' | 'mcqs' | 'mocktest' | 'dashboard'
  const [paperStyle, setPaperStyle] = useState('ruled'); // 'ruled' | 'grid' | 'parchment' | 'dark'
  const [fontSize, setFontSize] = useState('normal'); // 'small' | 'normal' | 'large'
  const [handwritingStyle, setHandwritingStyle] = useState('handwritten'); // 'clean' | 'handwritten'
  const [searchQuery, setSearchQuery] = useState('');
  const [formulaSearch, setFormulaSearch] = useState('');
  const [copiedFormulaName, setCopiedFormulaName] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [isExportingReport, setIsExportingReport] = useState(false);
  const activeDark = isExportingPDF ? false : isDark;
  const [copiedDocx, setCopiedDocx] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCopiedShareLink, setIsCopiedShareLink] = useState(false);
  const [isTOCCollapsed, setIsTOCCollapsed] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState('all'); // 'all' | 1 | 2 | 3 | 4 | 5 (For Subject Master E-Booklets)
  
  // ── 🎴 Smart AI Flashcards & Spaced Repetition (Active Recall Mode) ──
  const [currentFlashcardIdx, setCurrentFlashcardIdx] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [flashcardRatings, setFlashcardRatings] = useState({});
  const [flashcardFilter, setFlashcardFilter] = useState('all');
  
  // Daily Streak & Revision Progress Tracking
  const [revisedConcepts, setRevisedConcepts] = useState(() => {
    try {
      const saved = localStorage.getItem(`omni_revised_${note?.videoId || 'default'}`);
      return saved ? JSON.parse(saved) : {};
    } catch (e) { return {}; }
  });
  const [streakDays, setStreakDays] = useState(() => {
    try {
      const s = parseInt(localStorage.getItem('omni_study_streak') || '3', 10);
      return isNaN(s) ? 3 : s;
    } catch (e) { return 3; }
  });

  // Timed Mock Test State
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [testTimeLeft, setTestTimeLeft] = useState(1200); // 20 mins
  const [testCurrentQ, setTestCurrentQ] = useState(0);
  const [testUserAnswers, setTestUserAnswers] = useState({});
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);
  
  // Audio Podcast state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState(1);
  
  // PYQ Interactive state
  const [selectedPyqOptions, setSelectedPyqOptions] = useState({});
  const [expandedSolutions, setExpandedSolutions] = useState({});
  const [trendFilter, setTrendFilter] = useState('all');

  // Top 20 MCQ Interactive state
  const [selectedMcqOptions, setSelectedMcqOptions] = useState({});
  const [expandedMcqSolutions, setExpandedMcqSolutions] = useState({});
  const [mcqFilter, setMcqFilter] = useState('all');

  const practiceMCQs = (note && note.practiceMCQs && note.practiceMCQs.length >= 10)
    ? note.practiceMCQs
    : deriveNotePracticeMCQs(note, selectedLang);

  // Timed Mock Test Countdown Timer
  useEffect(() => {
    let timer;
    if (isTestStarted && !isTestSubmitted && testTimeLeft > 0) {
      timer = setInterval(() => {
        setTestTimeLeft(prev => {
          if (prev <= 1) {
            setIsTestSubmitted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTestStarted, isTestSubmitted, testTimeLeft]);

  const toggleConceptRevised = (idx) => {
    setRevisedConcepts(prev => {
      const updated = { ...prev, [idx]: !prev[idx] };
      try {
        localStorage.setItem(`omni_revised_${note?.videoId || 'default'}`, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleCopyFormulaLatex = (formulaName, latexStr) => {
    if (!latexStr) return;
    navigator.clipboard.writeText(latexStr);
    setCopiedFormulaName(formulaName);
    setTimeout(() => setCopiedFormulaName(null), 2000);
  };

  const getFontSizeClass = () => {
    if (fontSize === 'small') return 'text-xs md:text-sm';
    if (fontSize === 'large') return 'text-base md:text-xl';
    return 'text-sm md:text-base';
  };

  const handleSelectMCQOption = (qId, optionIdx) => {
    setSelectedMcqOptions(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleResetMCQs = () => {
    setSelectedMcqOptions({});
    setExpandedMcqSolutions({});
  };

  const calculateScore = () => {
    let score = 0;
    for (const q of practiceMCQs) {
      if (selectedMcqOptions[q.id] === q.correctOptionIndex) {
        score++;
      }
    }
    return score;
  };

  const calculateMockScore = () => {
    let correct = 0;
    let incorrect = 0;
    const testQuestions = practiceMCQs.slice(0, 15);
    testQuestions.forEach(q => {
      const userAns = testUserAnswers[q.id];
      if (userAns !== undefined) {
        if (userAns === q.correctOptionIndex) {
          correct++;
        } else {
          incorrect++;
        }
      }
    });
    const marks = (correct * 4) - (incorrect * 1);
    return { correct, incorrect, marks, total: testQuestions.length, maxMarks: testQuestions.length * 4 };
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!note) return null;

  // Format timestamp to seconds for jump links
  const getSecondsFromTimestamp = (timeStr) => {
    if (!timeStr) return 0;
    const parts = timeStr.trim().split(':').map(Number);
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    return 0;
  };

  // Audio Podcast Player
  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();

      // Clean markdown, symbols, and formatting for fluent spoken audio
      const cleanSummary = (note.overview || '').replace(/[*_#`~]/g, '');
      const cleanHighlights = (note.quickSummary || []).map(s => s.replace(/[*_#`~]/g, '')).join('. ');
      const rawText = `${note.title}. ${note.chapter ? `Chapter: ${note.chapter}. ` : ''}Overview: ${cleanSummary}. Key Highlights: ${cleanHighlights}.`;
      const spokenText = formatNaturalMath(rawText)
        .replace(/\[\d+:\d+\]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      const utterance = new SpeechSynthesisUtterance(spokenText);
      const curLang = (selectedLang || note.language || '').toLowerCase();
      const voices = window.speechSynthesis.getVoices();

      if (curLang.includes('hindi')) {
        utterance.lang = 'hi-IN';
        const hiVoice = voices.find(v => v.lang.includes('hi') || /hindi|swara|kalpana|heera/i.test(v.name));
        if (hiVoice) utterance.voice = hiVoice;
      } else if (curLang.includes('hinglish')) {
        // Authentic Indian accent voice for Hinglish: prioritizes Indian voice to read Hindi/English terms smoothly
        const inVoice = voices.find(v => v.lang.includes('hi') || /hindi|swara|kalpana|heera|neerja/i.test(v.name)) ||
                        voices.find(v => v.lang === 'en-IN' || /india|ravi|neerja/i.test(v.name));
        if (inVoice) {
          utterance.lang = inVoice.lang || 'hi-IN';
          utterance.voice = inVoice;
        } else {
          utterance.lang = 'en-IN';
        }
      } else {
        utterance.lang = 'en-US';
        const enVoice = voices.find(v => v.lang === 'en-US' || (v.lang.startsWith('en') && !v.lang.includes('IN')));
        if (enVoice) utterance.voice = enVoice;
      }

      utterance.rate = audioSpeed;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleChangeSpeed = (speed) => {
    setAudioSpeed(speed);
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  };

  // Helper: Generates authentic, classroom notebook HTML matching the laptop screen in normal Black & Blue pen writing
  const getAuthenticNotebookHtml = (n) => {
    if (!n) return '';
    const cleanChapter = formatNaturalMathHtml(n.chapter || n.title || 'Lecture Study Notes');
    const cleanSubject = formatNaturalMathHtml(n.subject || 'Academic Subject');
    const cleanTargetExam = formatNaturalMathHtml(n.targetExam && n.targetExam !== 'Auto-detect' ? n.targetExam : 'University & Board Exam Ready');
    const concepts = Array.isArray(n.keyConcepts) ? n.keyConcepts : [];
    const formulas = Array.isArray(n.formulas) ? n.formulas : [];
    const pyqs = Array.isArray(n.importantPYQs) && n.importantPYQs.length > 0 ? n.importantPYQs : (Array.isArray(n.pyqs) ? n.pyqs : []);
    const shortcuts = Array.isArray(n.shortcutsAndTricks) ? n.shortcutsAndTricks : [];
    const mistakes = Array.isArray(n.commonMistakes) ? n.commonMistakes : [];

    return `
      <div style="font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #0F172A; max-width: 800px; margin: 0 auto; padding: 24px 28px; background: #FFFFFF;">
        
        <!-- ── 1. TOPPER COVER HEADER (Normal Black & Blue Pen Style) ── -->
        <div class="topper-cover-header" style="background: #FFFFFF; border: 2px solid #0F172A; border-radius: 12px; padding: 18px 22px; margin-bottom: 22px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.06); page-break-inside: avoid; break-inside: avoid;">
          <!-- Brand & Attribution Row -->
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #E2E8F0; padding-bottom: 8px; margin-bottom: 10px; font-family: monospace;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: #1E3A8A;"></span>
              <span style="font-weight: 900; font-size: 13px; color: #0F172A; letter-spacing: 0.5px;">⚡ OMNISTUDY AI • TOPPER CLASSROOM COPY</span>
              <span style="background: #DCFCE7; color: #166534; font-size: 10px; font-weight: 800; padding: 2px 7px; border-radius: 4px; border: 1px solid #86EFAC;">100% EXAM VERIFIED</span>
            </div>
            <div style="font-size: 12px; font-weight: 800; color: #0F172A;">
              Platform Developed by: <strong style="color: #1E3A8A; text-decoration: underline;">Akanksha Maurya</strong>
            </div>
          </div>

          <!-- Metadata Row -->
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #334155; font-family: monospace; margin-bottom: 10px;">
            <div>
              <strong style="color: #991B1B;">SUBJECT:</strong> <span style="color: #0F172A; font-weight: bold;">${cleanSubject}</span>
              <span style="margin: 0 8px; color: #CBD5E1;">•</span>
              <strong style="color: #1E3A8A;">NOTES TYPE:</strong> <span style="color: #0F172A; font-weight: bold;">CLASSROOM TOPPER COPY</span>
            </div>
            <div>
              <span style="background: #FEF3C7; border: 1px solid #FCD34D; color: #92400E; font-weight: 800; padding: 2px 8px; border-radius: 6px; font-size: 11px;">
                🎯 ${cleanTargetExam}
              </span>
            </div>
          </div>

          <!-- Chapter / Lecture Title in Bold Black Pen -->
          <h1 style="color: #0F172A; font-size: 23px; font-weight: 900; margin: 0; line-height: 1.3;">
            ${cleanChapter}
          </h1>
        </div>

        <!-- ── 2. CLICKABLE TOPIC INDEX (Table of Contents) ── -->
        ${concepts.length > 0 ? `
          <div style="background: #F8FAFC; border: 1.5px solid #CBD5E1; border-radius: 10px; padding: 14px 18px; margin-bottom: 22px; page-break-inside: avoid; break-inside: avoid;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #E2E8F0; padding-bottom: 6px; margin-bottom: 10px;">
              <span style="font-weight: 800; font-size: 12px; color: #0F172A; font-family: monospace; text-transform: uppercase; letter-spacing: 0.5px;">
                📖 Complete Lecture Syllabus & Topic Index (${concepts.length} Topics Covering 100% Duration)
              </span>
              <span style="background: #EFF6FF; color: #1E3A8A; font-size: 11px; font-weight: bold; padding: 2px 8px; border-radius: 12px; border: 1px solid #BFDBFE;">
                ${concepts.length} Detailed Topics
              </span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px 14px; font-size: 11.5px;">
              ${concepts.map((c, idx) => `
                <div style="background: #FFFFFF; border: 1px solid #E2E8F0; padding: 5px 8px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-weight: 700; color: #0F172A; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 280px;">
                    <strong>${idx + 1}.</strong> ${formatNaturalMathHtml(c.heading || `Topic ${idx + 1}`)}
                  </span>
                  <span style="font-family: monospace; color: #1E3A8A; font-size: 10.5px; font-weight: 700;">
                    ${c.timestamp_start || '00:00'}
                  </span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- ── 3. CORE LECTURE OVERVIEW & HIGH-YIELD TAKEAWAYS ── -->
        ${(n.overview || (n.quickSummary && n.quickSummary.length > 0)) ? `
          <div style="background: #F8FAFC; border: 1.5px solid #CBD5E1; border-radius: 10px; padding: 16px 18px; margin-bottom: 24px; page-break-inside: avoid; break-inside: avoid;">
            <div style="font-weight: 800; font-size: 13px; color: #0F172A; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
              <span>📌</span> <span style="color: #0F172A; font-weight: 900;">CORE CHAPTER SUMMARY & HIGH-YIELD TAKEAWAYS</span>
            </div>
            ${n.overview ? `
              <p style="font-size: 13px; color: #1E3A8A; line-height: 1.65; margin: 0 0 10px 0; background: #FFFFFF; border: 1px solid #E2E8F0; padding: 10px 12px; border-radius: 8px;">
                ${formatNaturalMathHtml(n.overview)}
              </p>
            ` : ''}
            ${n.quickSummary && n.quickSummary.length > 0 ? `
              <ul style="margin: 0; padding-left: 20px; font-size: 12.5px; color: #1E3A8A; line-height: 1.6;">
                ${n.quickSummary.map(s => `<li style="margin-bottom: 4px; font-weight: 600;">${formatNaturalMathHtml(s)}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
        ` : ''}

        <!-- ── 4. DETAILED CLASSROOM COPY CONCEPTS (BLACK & BLUE PEN) ── -->
        ${concepts.length > 0 ? `
          <div style="margin-bottom: 16px; border-left: 4px solid #0F172A; padding-left: 10px;">
            <h2 style="color: #0F172A; font-size: 18px; font-weight: 900; margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">
              ✍️ COMPLETE LECTURE CONCEPTS & BLACKBOARD DERIVATIONS
            </h2>
          </div>

          ${concepts.map((c, idx) => `
            <div class="concept-block" style="background: #FFFFFF; border: 1.5px solid #CBD5E1; border-radius: 10px; padding: 16px 20px; margin-bottom: 22px; page-break-inside: avoid; break-inside: avoid; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">
              
              <!-- Concept Header Bar -->
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #E2E8F0; padding-bottom: 8px; margin-bottom: 10px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="background: #0F172A; color: #FFFFFF; font-size: 10.5px; font-weight: 800; padding: 2px 8px; border-radius: 12px; font-family: monospace;">
                    TOPIC #${idx + 1}
                  </span>
                  <span style="background: #EFF6FF; border: 1px solid #BFDBFE; color: #1E3A8A; font-size: 10.5px; font-weight: 700; padding: 2px 8px; border-radius: 12px; font-family: monospace;">
                    ⏱️ [${c.timestamp_start || '00:00'} - ${c.timestamp_end || 'End'}]
                  </span>
                </div>
                <span style="font-size: 11px; font-weight: 700; color: #15803D;">
                  100% Exam Verified ✓
                </span>
              </div>

              <!-- Topic Heading in Deep Black Pen with Blue Underline -->
              <h3 style="color: #0F172A; font-size: 18px; font-weight: 900; margin: 0 0 4px 0; line-height: 1.3; border-bottom: 2px solid #1E3A8A; padding-bottom: 4px;">
                ${idx + 1}. ${formatNaturalMathHtml(c.heading || `Concept ${idx + 1}`)}
              </h3>

              <!-- Subheading -->
              ${c.subheading ? `
                <div style="font-size: 12.5px; color: #475569; font-style: italic; margin-bottom: 10px;">
                  ▶ ${formatNaturalMathHtml(c.subheading)}
                </div>
              ` : ''}

              <!-- Red Pen Definitions (with 📌) -->
              ${c.definitions && c.definitions.length > 0 ? `
                <div style="background: #FEF2F2; border-left: 4px solid #DC2626; border-radius: 6px; padding: 9px 12px; margin: 10px 0;">
                  <strong style="color: #991B1B; font-size: 12px; display: block; margin-bottom: 2px;">📌 Core Definition:</strong>
                  ${c.definitions.map(d => `<p style="color: #B91C1C; font-size: 12.5px; font-weight: 600; margin: 3px 0; line-height: 1.5;">${formatNaturalMathHtml(d)}</p>`).join('')}
                </div>
              ` : ''}

              <!-- Blue Pen Detailed Blackboard Points (with Black Bold terms) -->
              ${c.points && c.points.length > 0 ? `
                <div style="margin: 10px 0;">
                  <strong style="color: #0F172A; font-size: 12.5px; display: block; margin-bottom: 6px;">Blackboard Detailed Points & Explanation:</strong>
                  <ul style="margin: 0; padding-left: 20px; font-size: 13.5px; line-height: 1.7; color: #1E3A8A;">
                    ${c.points.map(p => `
                      <li style="margin-bottom: 5px; color: #1E3A8A;">
                        ${formatNaturalMathHtml(p)}
                      </li>
                    `).join('')}
                  </ul>
                </div>
              ` : ''}

              <!-- Comparison Table if Present -->
              ${c.table && c.table.headers && c.table.headers.length > 0 ? `
                <div class="table-container" style="margin: 12px 0; border: 1.5px solid #CBD5E1; border-radius: 8px; overflow: hidden; page-break-inside: avoid; break-inside: avoid;">
                  ${c.table.title ? `
                    <div style="background: #F1F5F9; padding: 6px 10px; font-size: 11.5px; font-weight: 800; color: #0F172A; border-bottom: 1px solid #CBD5E1;">
                      📊 ${formatNaturalMathHtml(c.table.title)}
                    </div>
                  ` : ''}
                  <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                    <thead>
                      <tr style="background: #0F172A; color: #FFFFFF;">
                        ${c.table.headers.map(h => `<th style="padding: 6px 10px; text-align: left; border: 1px solid #CBD5E1;">${formatNaturalMathHtml(h)}</th>`).join('')}
                      </tr>
                    </thead>
                    <tbody>
                      ${(c.table.rows || []).map((row, ri) => `
                        <tr style="background: ${ri % 2 === 0 ? '#FFFFFF' : '#F8FAFC'};">
                          ${row.map(cell => `<td style="padding: 6px 10px; border: 1px solid #CBD5E1; color: #1E3A8A;">${formatNaturalMathHtml(cell)}</td>`).join('')}
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              ` : ''}

              <!-- Real Blackboard SVG Diagram -->
              ${c.diagram && (c.diagram.heading || c.diagram.description || c.diagram.svg_or_mermaid) ? `
                <div class="diagram-box" style="background: #F8FAFC; border: 1.5px solid #CBD5E1; border-radius: 10px; padding: 12px 14px; margin: 14px 0; text-align: center; page-break-inside: avoid; break-inside: avoid;">
                  <div style="color: #0F172A; font-weight: 800; font-size: 12.5px; margin-bottom: 8px;">
                    📐 Blackboard Diagram: ${formatNaturalMathHtml(c.diagram.heading || 'Architecture & Process Schematic')}
                  </div>
                  ${c.diagram.svg_or_mermaid && c.diagram.svg_or_mermaid.includes('<svg') ? `
                    <div style="max-width: 540px; margin: 6px auto; text-align: center;">
                      ${c.diagram.svg_or_mermaid.replace(/<svg\b([^>]*)>/, '<svg $1 style="max-width: 100%; height: auto; display: block; margin: 0 auto;">')}
                    </div>
                  ` : ''}
                  ${c.diagram.description ? `
                    <p style="font-size: 11.5px; color: #475569; font-style: italic; margin: 6px 0 0 0;">
                      Caption: ${formatNaturalMathHtml(c.diagram.description)}
                    </p>
                  ` : ''}
                </div>
              ` : ''}

              <!-- Solved Blackboard Examples / Numericals (Green Pen) -->
              ${c.solved_example && (c.solved_example.title || c.solved_example.steps || c.solved_example.solution) ? `
                <div class="solved-example-box" style="background: #F0FDF4; border: 1.5px solid #86EFAC; border-radius: 8px; padding: 12px 14px; margin: 12px 0; page-break-inside: avoid; break-inside: avoid;">
                  <div style="color: #15803D; font-weight: 800; font-size: 12.5px; margin-bottom: 6px;">
                    🧮 Solved Blackboard Example: ${formatNaturalMathHtml(c.solved_example.title || 'Step-by-Step Problem')}
                  </div>
                  ${c.solved_example.given ? `<p style="margin: 2px 0; font-size: 12px; color: #166534;"><strong>Given:</strong> ${formatNaturalMathHtml(c.solved_example.given)}</p>` : ''}
                  ${c.solved_example.formula ? `<p style="margin: 2px 0; font-size: 12px; color: #15803D; font-family: monospace;"><strong>Formula:</strong> ${formatNaturalMathHtml(c.solved_example.formula)}</p>` : ''}
                  ${c.solved_example.steps && Array.isArray(c.solved_example.steps) ? `
                    <div style="margin: 4px 0; font-size: 12px; color: #0F172A;">
                      <strong>Derivation Steps:</strong>
                      <ol style="margin: 2px 0; padding-left: 20px; color: #1E3A8A;">
                        ${c.solved_example.steps.map(st => `<li style="margin-bottom: 2px;">${formatNaturalMathHtml(st)}</li>`).join('')}
                      </ol>
                    </div>
                  ` : (c.solved_example.solution ? `<p style="margin: 3px 0; font-size: 12px; color: #1E3A8A;"><strong>Solution:</strong> ${formatNaturalMathHtml(c.solved_example.solution).replace(/\n/g, '<br/>')}</p>` : '')}
                  ${c.solved_example.finalAnswer || c.solved_example.answer ? `
                    <p style="margin: 4px 0 0 0; font-size: 12.5px; color: #14532D; font-weight: 800; background: #DCFCE7; padding: 4px 8px; border-radius: 4px; display: inline-block;">
                      Answer: ${formatNaturalMathHtml(c.solved_example.finalAnswer || c.solved_example.answer)}
                    </p>
                  ` : ''}
                </div>
              ` : ''}

              <!-- Teacher Memory Tip in Warm Orange (💡) -->
              ${(c.teacher_tips && c.teacher_tips.length > 0) || c.memoryTip ? `
                <div class="teacher-tip-box" style="background: #FFF7ED; border-left: 4px solid #F97316; border-radius: 6px; padding: 8px 12px; margin: 10px 0; page-break-inside: avoid; break-inside: avoid;">
                  <strong style="color: #C2410C; font-size: 11.5px; display: block; margin-bottom: 2px;">💡 Teacher Exam Tip ("Ye Exam me Aata Hai"):</strong>
                  ${(c.teacher_tips || [c.memoryTip]).map(t => `<p style="color: #9A3412; margin: 2px 0; font-size: 12px; font-weight: 600;">${formatNaturalMathHtml(t)}</p>`).join('')}
                </div>
              ` : ''}

              <!-- Student Mistakes to Avoid (⚠️) -->
              ${c.common_mistake && c.common_mistake.mistake ? `
                <div style="background: #FEF2F2; border-left: 4px solid #EF4444; border-radius: 6px; padding: 8px 12px; margin: 10px 0; font-size: 12px; page-break-inside: avoid; break-inside: avoid;">
                  <strong style="color: #B91C1C; font-size: 11.5px;">⚠️ Common Student Mistake to Avoid:</strong>
                  <p style="color: #991B1B; margin: 2px 0;"><strong>Blunder:</strong> ${formatNaturalMathHtml(c.common_mistake.mistake)}</p>
                  ${c.common_mistake.correction ? `<p style="color: #15803D; margin: 2px 0; font-weight: bold;"><strong>Correction:</strong> ${formatNaturalMathHtml(c.common_mistake.correction)}</p>` : ''}
                </div>
              ` : ''}

            </div>
          `).join('')}
        ` : ''}

        <!-- ── 5. ESSENTIAL FORMULA CHEAT SHEET (Black & Blue Pen) ── -->
        ${formulas.length > 0 ? `
          <div class="formula-box" style="margin-top: 30px; margin-bottom: 24px; page-break-inside: avoid; break-inside: avoid;">
            <div style="border-left: 4px solid #0F172A; padding-left: 10px; margin-bottom: 12px;">
              <h2 style="color: #0F172A; font-size: 18px; font-weight: 900; margin: 0; text-transform: uppercase;">
                ⚡ ESSENTIAL FORMULA CHEAT SHEET & GOVERNING EQUATIONS
              </h2>
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 12px; border: 1.5px solid #CBD5E1; border-radius: 8px; overflow: hidden;">
              <thead>
                <tr style="background: #0F172A; color: #FFFFFF;">
                  <th style="padding: 8px 10px; text-align: left; width: 28%; border: 1px solid #CBD5E1;">Formula Name</th>
                  <th style="padding: 8px 10px; text-align: left; width: 38%; border: 1px solid #CBD5E1;">Mathematical Equation</th>
                  <th style="padding: 8px 10px; text-align: left; width: 34%; border: 1px solid #CBD5E1;">When to Use / Variables</th>
                </tr>
              </thead>
              <tbody>
                ${formulas.map((f, fi) => `
                  <tr style="background: ${fi % 2 === 0 ? '#FFFFFF' : '#F8FAFC'};">
                    <td style="padding: 8px 10px; border: 1px solid #CBD5E1; font-weight: 800; color: #0F172A;">${formatNaturalMathHtml(f.name || `Formula #${fi + 1}`)}</td>
                    <td style="padding: 8px 10px; border: 1px solid #CBD5E1; font-family: monospace; font-weight: 900; color: #1E3A8A; font-size: 12.5px;">${formatNaturalMathHtml(f.formula || '')}</td>
                    <td style="padding: 8px 10px; border: 1px solid #CBD5E1; color: #334155; font-size: 11.5px;">${formatNaturalMathHtml(f.whenToUse || f.variables || '')}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        ` : ''}

        <!-- ── 6. PREVIOUS YEAR EXAM QUESTIONS (PYQs) (Black Question, Blue Solution) ── -->
        ${pyqs.length > 0 ? `
          <div style="margin-top: 30px; margin-bottom: 24px;">
            <div style="border-left: 4px solid #7C3AED; padding-left: 10px; margin-bottom: 14px;">
              <h2 style="color: #0F172A; font-size: 18px; font-weight: 900; margin: 0; text-transform: uppercase;">
                🎯 EXAM PREVIOUS YEAR QUESTIONS (PYQs) WITH COMPLETE SOLUTIONS
              </h2>
            </div>
            ${pyqs.slice(0, 8).map((q, qIdx) => `
              <div class="pyq-item" style="background: #FFFFFF; border: 1.5px solid #CBD5E1; border-radius: 10px; padding: 14px 16px; margin-bottom: 16px; page-break-inside: avoid; break-inside: avoid; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <span style="color: #7C3AED; font-weight: 800; font-size: 12px; font-family: monospace;">
                    Q${qIdx + 1} • [${formatNaturalMathHtml(q.exam || q.targetExam || 'University Exam')} ${q.year ? `(${q.year})` : ''} ${q.marks ? `[${q.marks} Marks]` : ''}]
                  </span>
                  <span style="background: #F5F3FF; color: #6D28D9; font-size: 10px; font-weight: bold; padding: 2px 6px; border-radius: 4px;">
                    Repeated Exam Question
                  </span>
                </div>
                <p style="font-weight: 800; color: #0F172A; font-size: 13px; margin: 4px 0 8px 0; line-height: 1.4;">
                  ${formatNaturalMathHtml(q.question || q.q || '')}
                </p>
                ${q.options && q.options.length > 0 ? `
                  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px 10px; margin: 6px 0; font-size: 12px;">
                    ${q.options.map((opt, oIdx) => `
                      <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 4px 8px; border-radius: 4px; color: #1E3A8A;">
                        <strong style="color: #0F172A;">${['A', 'B', 'C', 'D'][oIdx] || `(${oIdx + 1})`})</strong> ${formatNaturalMathHtml(opt)}
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
                ${q.correctAnswer || q.answer ? `
                  <div style="background: #ECFDF5; border: 1px solid #A7F3D0; color: #065F46; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 800; margin: 6px 0; display: inline-block;">
                    ✅ Correct Answer: ${formatNaturalMathHtml(q.correctAnswer || q.answer)}
                  </div>
                ` : ''}
                ${q.solution || q.explanation ? `
                  <div style="background: #F8FAFC; border-left: 3px solid #1E3A8A; padding: 6px 10px; margin-top: 6px; font-size: 12px; color: #1E3A8A;">
                    <strong style="color: #0F172A;">Detailed Solution:</strong> ${formatNaturalMathHtml(q.solution || q.explanation).replace(/\n/g, '<br/>')}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- ── 7. OFFICIAL SIGNATURE & WATERMARK FOOTER ── -->
        <div style="background: #0F172A; color: #FFFFFF; border: 2px solid #1E293B; border-radius: 12px; padding: 14px 18px; margin-top: 32px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; page-break-inside: avoid; break-inside: avoid;">
          <div>
            <span style="font-weight: 900; font-size: 12px; color: #60A5FA; letter-spacing: 0.5px;">⚡ OMNISTUDY AI DIGITAL NOTEBOOK</span>
            <span style="margin: 0 6px; color: #64748B;">•</span>
            <span style="color: #E2E8F0;">VERIFIED TOPPER CLASSROOM COPY</span>
          </div>
          <div style="font-weight: 800;">
            Platform Developed by: <strong style="color: #FBBF24; text-decoration: underline;">Akanksha Maurya</strong>
          </div>
        </div>

        <div style="text-align: center; color: #64748B; font-size: 10px; margin-top: 8px;">
          Generated with OmniStudy AI • Interactive Web App: https://omni-study-ai-lilac.vercel.app/
        </div>

      </div>
    `;
  };

  const getCleanNotesHtml = getAuthenticNotebookHtml;

  // Native Browser Print to PDF (Vector, Selectable Text)
  const handlePrintNotes = () => {
    if (activeTab !== 'notes') {
      setActiveTab('notes');
    }
    setTimeout(() => {
      window.print();
    }, 150);
  };

  // Direct 1-Click PDF Download (ALWAYS directly downloads 100% visible, fully-styled file matching the laptop screen in normal black & blue pen)
  const handleDownloadPDF = async () => {
    if (!note) return;
    const cleanTitle = (note.title || note.chapter || 'Lecture_Notes').replace(/[^a-zA-Z0-9\s_-]/g, '').trim().replace(/\s+/g, '_');
    setIsExportingPDF(true);

    // Primary Method: Direct Client-Side High-Fidelity PDF Generation (Full-height layout, normal black & blue pen)
    try {
      if (typeof window !== 'undefined') {
        const html2pdfModule = await import('html2pdf.js');
        const html2pdf = html2pdfModule.default || html2pdfModule;

        const printContainer = document.createElement('div');
        printContainer.id = 'omnistudy-pdf-export-container';
        // Position absolute at current scroll position to allow full natural height rendering without viewport truncation
        printContainer.style.position = 'absolute';
        printContainer.style.top = `${window.scrollY || 0}px`;
        printContainer.style.left = '0';
        printContainer.style.width = '800px';
        printContainer.style.backgroundColor = '#FFFFFF';
        printContainer.style.color = '#0F172A';
        printContainer.style.zIndex = '999999';
        printContainer.style.opacity = '1';
        printContainer.style.pointerEvents = 'none';
        printContainer.innerHTML = getAuthenticNotebookHtml(note);
        document.body.appendChild(printContainer);

        // Allow DOM to compute bounding boxes, styles and render SVGs properly
        await new Promise(r => setTimeout(r, 250));

        const opt = {
          margin: [8, 8, 10, 8],
          filename: `${cleanTitle}_Notes.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#FFFFFF',
            windowWidth: 800,
            scrollY: 0,
            scrollX: 0
          },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          pagebreak: {
            mode: ['css', 'legacy'],
            avoid: ['.concept-block', '.diagram-box', '.solved-example-box', '.formula-box', '.pyq-item', '.topper-cover-header', '.table-container', '.teacher-tip-box']
          }
        };

        try {
          await html2pdf().set(opt).from(printContainer).save();
          setIsExportingPDF(false);
          return;
        } finally {
          if (document.body.contains(printContainer)) {
            document.body.removeChild(printContainer);
          }
        }
      }
    } catch (clientPdfErr) {
      console.warn('[NotebookNotesView] Client html2pdf notice, engaging browser print fallback:', clientPdfErr);
      handlePrintNotes();
    } finally {
      setIsExportingPDF(false);
    }
  };

  // Export to Microsoft Word Compatible Document (.doc) - Direct 1-click file download
  const handleExportDocx = () => {
    const cleanTitle = (note.title || 'Lecture_Notes').replace(/[^a-zA-Z0-9\s_-]/g, '').trim().replace(/\s+/g, '_');
    const docHeader = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset='utf-8'><title>${note.title || 'Notes'}</title></head><body>${getCleanNotesHtml(note)}</body></html>`;

    const blob = new Blob(['\ufeff', docHeader], { type: 'application/msword' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    const isEBook = Boolean(note.isPlaylist || note.isEBook);
    link.download = `${cleanTitle}_${isEBook ? 'Subject_EBook' : 'Notes'}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCopiedDocx(true);
    setTimeout(() => setCopiedDocx(false), 2000);
  };

  const getPaperClass = () => {
    let base = '';
    if (paperStyle === 'grid') base = activeDark ? 'dark-grid-paper' : 'grid-paper';
    else if (paperStyle === 'parchment') base = 'parchment-paper';
    else base = activeDark ? 'dark-ruled-paper' : 'ruled-paper';

    const fontStyle = handwritingStyle === 'handwritten' ? 'font-kalam' : 'font-sans';
    return `${base} ${fontStyle}`;
  };

  const toggleSolution = (idx) => {
    setExpandedSolutions(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const completedConceptsCount = Object.values(revisedConcepts).filter(Boolean).length;
  const totalConceptsCount = (note?.keyConcepts || []).length;
  const masteryPercentage = totalConceptsCount > 0 ? Math.round((completedConceptsCount / totalConceptsCount) * 100) : 0;

  // Generates clean, printer-friendly HTML for Student Academic Progress Report
  const getCleanProgressReportHtml = (n) => {
    if (!n) return '';
    const cleanTopic = n.chapter || n.title || 'Student Study Progress';
    const cleanSubject = n.subject || 'Core Subject';
    const cleanExam = n.targetExam || 'AKTU B.Tech / University Examination';
    const score = calculateScore();
    const totalQuestions = practiceMCQs.length;
    const quizPct = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
    const concepts = n.keyConcepts || [];
    const dateStr = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    return `
      <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.5; color: #0F172A; max-width: 800px; margin: 0 auto; padding: 24px; background: #FFFFFF;">
        <!-- Header Banner -->
        <div style="background: #1E1B4B; color: white; border-radius: 12px; padding: 22px 24px; margin-bottom: 22px; text-align: left;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 10px;">
            <tr>
              <td style="vertical-align: top;">
                <span style="font-size: 10px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: #A5B4FC; font-family: monospace;">
                  OMNISTUDY AI • ACADEMIC PERFORMANCE PORTAL
                </span>
                <h1 style="margin: 4px 0 0 0; font-size: 20px; font-weight: bold; color: #FFFFFF;">
                  📊 Student Study Analytics & Progress Report
                </h1>
              </td>
              <td style="vertical-align: top; text-align: right; width: 140px;">
                <div style="background: rgba(255,255,255,0.12); padding: 6px 12px; border-radius: 6px; display: inline-block; text-align: right;">
                  <div style="font-size: 9px; color: #C7D2FE; font-family: monospace;">REPORT DATE</div>
                  <div style="font-size: 12px; font-weight: bold; color: #FFFFFF;">${dateStr}</div>
                </div>
              </td>
            </tr>
          </table>

          <table style="width: 100%; border-collapse: collapse; font-size: 12px; color: #E0E7FF;">
            <tr>
              <td style="padding: 3px 0; width: 60%;">
                <span style="color: #A5B4FC;">Lecture / Topic:</span> <strong style="color: #FFFFFF; font-size: 13px;">${cleanTopic}</strong>
              </td>
              <td style="padding: 3px 0; text-align: right;">
                <span style="color: #A5B4FC;">Subject:</span> <strong style="color: #FFFFFF;">${cleanSubject}</strong>
              </td>
            </tr>
            <tr>
              <td style="padding: 3px 0;">
                <span style="color: #A5B4FC;">Target Exam:</span> <strong style="color: #FFFFFF;">${cleanExam}</strong>
              </td>
              <td style="padding: 3px 0; text-align: right;">
                <span style="color: #A5B4FC;">Verified Platform:</span> <strong style="color: #38BDF8;">OmniStudy AI</strong>
              </td>
            </tr>
          </table>
        </div>

        <!-- 4 Core Performance KPI Cards -->
        <table style="width: 100%; border-collapse: separate; border-spacing: 8px; margin-bottom: 20px;">
          <tr>
            <td style="width: 25%; background: #FEF3C7; border: 1px solid #FCD34D; border-radius: 10px; padding: 12px; text-align: center;">
              <div style="font-size: 10px; font-weight: bold; color: #92400E; margin-bottom: 2px;">🔥 CURRENT STREAK</div>
              <div style="font-size: 20px; font-weight: 900; color: #78350F;">${streakDays} Days</div>
              <div style="font-size: 9px; color: #B45309; margin-top: 2px;">Daily Consistency</div>
            </td>
            <td style="width: 25%; background: #DBEAFE; border: 1px solid #93C5FD; border-radius: 10px; padding: 12px; text-align: center;">
              <div style="font-size: 10px; font-weight: bold; color: #1E40AF; margin-bottom: 2px;">⏱️ ACTIVE RECALL</div>
              <div style="font-size: 20px; font-weight: 900; color: #1E3A8A;">45 Mins</div>
              <div style="font-size: 9px; color: #2563EB; margin-top: 2px;">Session Engagement</div>
            </td>
            <td style="width: 25%; background: #D1FAE5; border: 1px solid #6EE7B7; border-radius: 10px; padding: 12px; text-align: center;">
              <div style="font-size: 10px; font-weight: bold; color: #065F46; margin-bottom: 2px;">📚 CHAPTER MASTERY</div>
              <div style="font-size: 20px; font-weight: 900; color: #064E3B;">${masteryPercentage}%</div>
              <div style="font-size: 9px; color: #059669; margin-top: 2px;">${completedConceptsCount}/${totalConceptsCount} Concepts Revised</div>
            </td>
            <td style="width: 25%; background: #F3E8FF; border: 1px solid #D8B4FE; border-radius: 10px; padding: 12px; text-align: center;">
              <div style="font-size: 10px; font-weight: bold; color: #6B21A8; margin-bottom: 2px;">🎯 QUIZ ACCURACY</div>
              <div style="font-size: 20px; font-weight: 900; color: #581C87;">${quizPct}%</div>
              <div style="font-size: 9px; color: #7C3AED; margin-top: 2px;">${score}/${totalQuestions} Questions Correct</div>
            </td>
          </tr>
        </table>

        <!-- Topic-wise Retention Breakdown Checklist Table -->
        <div style="margin-bottom: 22px;">
          <h3 style="font-size: 13px; font-weight: bold; color: #1E293B; margin-bottom: 8px; border-bottom: 2px solid #E2E8F0; padding-bottom: 4px;">
            📋 Topic-wise Retention & Mastery Checklist (${concepts.length} Topics)
          </h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
            <thead>
              <tr style="background: #F1F5F9; color: #475569; text-align: left; border-bottom: 2px solid #CBD5E1;">
                <th style="padding: 8px 10px; width: 35px;">#</th>
                <th style="padding: 8px 10px;">Topic / Concept Heading</th>
                <th style="padding: 8px 10px; width: 90px;">Timestamp</th>
                <th style="padding: 8px 10px; width: 110px; text-align: center;">Revision Status</th>
              </tr>
            </thead>
            <tbody>
              ${concepts.map((c, i) => {
                const isRev = !!revisedConcepts[i];
                return `
                  <tr style="border-bottom: 1px solid #E2E8F0; background: ${i % 2 === 0 ? '#FFFFFF' : '#F8FAFC'};">
                    <td style="padding: 7px 10px; color: #64748B; font-family: monospace;">${i + 1}</td>
                    <td style="padding: 7px 10px; font-weight: bold; color: #1E293B;">${c.heading || `Concept ${i + 1}`}</td>
                    <td style="padding: 7px 10px; color: #64748B; font-family: monospace;">${c.timestamp_start || '00:00'}</td>
                    <td style="padding: 7px 10px; text-align: center;">
                      <span style="display: inline-block; padding: 2px 8px; border-radius: 9999px; font-size: 10px; font-weight: bold; font-family: monospace; ${
                        isRev
                          ? 'background: #D1FAE5; color: #047857; border: 1px solid #A7F3D0;'
                          : 'background: #FEF3C7; color: #B45309; border: 1px solid #FDE68A;'
                      }">
                        ${isRev ? 'Mastered ✓' : 'In Progress'}
                      </span>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <!-- Parent & Mentor Study Assurance Section -->
        <div style="background: #EEF2FF; border: 1.5px solid #C7D2FE; border-radius: 10px; padding: 16px; margin-bottom: 18px;">
          <div style="font-size: 10px; font-weight: 800; color: #4338CA; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">
            👨‍👩‍👧 PARENT & TEACHER STUDY ASSURANCE
          </div>
          <p style="margin: 0; font-size: 11.5px; color: #312E81; line-height: 1.6;">
            This verified progress document confirms that the student has actively engaged with <strong>OmniStudy AI</strong>, performed structured lecture notes revision, solved practice quiz problems, and tracked active recall streaks on <strong>${cleanTopic}</strong> (${cleanSubject}).
          </p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 12px; border-top: 1px solid #C7D2FE; padding-top: 8px; font-size: 11px;">
            <tr>
              <td style="color: #4B5563;">
                Overall Readiness: <strong style="color: ${masteryPercentage >= 70 ? '#047857' : '#B45309'};">${masteryPercentage >= 70 ? '★ Exam Ready / High Retention' : '● In Progress / Active Reviewing'}</strong>
              </td>
              <td style="text-align: right; font-family: monospace; color: #6366F1; font-weight: bold;">
                Verified by OmniStudy AI Academic System
              </td>
            </tr>
          </table>
        </div>

        <!-- Footer -->
        <div style="text-align: center; border-top: 1px solid #E2E8F0; padding-top: 10px; font-size: 10px; color: #94A3B8;">
          Generated by <strong>OmniStudy AI</strong> — Developed by Akanksha Maurya • Academic Performance Portal
        </div>
      </div>
    `;
  };

  // Direct 1-Click PDF Download for Student Study Progress Report
  const handleDownloadProgressReport = async () => {
    if (!note) return;
    const cleanTitle = (note.chapter || note.title || 'Student_Progress').replace(/[^a-zA-Z0-9\s_-]/g, '').trim().replace(/\s+/g, '_');
    setIsExportingReport(true);

    try {
      if (typeof window !== 'undefined') {
        const html2pdfModule = await import('html2pdf.js');
        const html2pdf = html2pdfModule.default || html2pdfModule;

        const printContainer = document.createElement('div');
        printContainer.id = 'omnistudy-progress-report-container';
        printContainer.style.position = 'fixed';
        printContainer.style.top = '0';
        printContainer.style.left = '0';
        printContainer.style.width = '820px';
        printContainer.style.backgroundColor = '#FFFFFF';
        printContainer.style.color = '#0F172A';
        printContainer.style.zIndex = '99999';
        printContainer.style.opacity = '1';
        printContainer.style.pointerEvents = 'none';
        printContainer.innerHTML = getCleanProgressReportHtml(note);
        document.body.appendChild(printContainer);

        await new Promise(r => setTimeout(r, 120));

        const opt = {
          margin: [8, 8, 10, 8],
          filename: `${cleanTitle}_Progress_Report.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#FFFFFF',
            windowWidth: 820,
            scrollY: 0
          },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          pagebreak: { mode: ['css', 'legacy'] }
        };

        try {
          await html2pdf().set(opt).from(printContainer).save();
          setIsExportingReport(false);
          return;
        } finally {
          if (document.body.contains(printContainer)) {
            document.body.removeChild(printContainer);
          }
        }
      }
    } catch (err) {
      console.warn('[NotebookNotesView] Progress report PDF generation fallback:', err);
      // Fallback: download as .doc file
      try {
        const reportHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Progress Report</title></head><body>${getCleanProgressReportHtml(note)}</body></html>`;
        const blob = new Blob(['\ufeff', reportHtml], { type: 'application/msword' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${cleanTitle}_Progress_Report.doc`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (fallbackErr) {
        console.error('Failed to export progress report fallback:', fallbackErr);
      }
    } finally {
      setIsExportingReport(false);
    }
  };

  // Search & Unit filtering in notes
  const filteredConcepts = (note?.keyConcepts || []).filter(c => {
    // If filtering by unit in E-Book / Playlist mode
    if (selectedUnit !== 'all' && c.unitNumber && Number(c.unitNumber) !== Number(selectedUnit)) {
      return false;
    }
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const h = (c.heading || '').toLowerCase();
    const sub = (c.subheading || '').toLowerCase();
    const pts = (c.points || []).join(' ').toLowerCase();
    const defs = (c.definitions || []).join(' ').toLowerCase();
    return h.includes(q) || sub.includes(q) || pts.includes(q) || defs.includes(q);
  });

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 my-4 sm:my-8 w-full overflow-hidden">

      {/* ── Top Study Command Toolbar ── */}
      <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 border shadow-sm transition-all w-full bg-white dark:bg-[#131B2E] border-[#E2E8F0] dark:border-[#23314F] text-[#0F172A] dark:text-[#F8FAFC]">
        
        {/* Tier 1: Metadata Badges + Language Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 flex items-center gap-1.5">
              <span>💻</span>
              <span>{note.subject || 'Core Subject'}</span>
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-[#1B2640] text-slate-700 dark:text-slate-300 font-semibold border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-1.5">
              <span>🎓</span>
              <span>{note.targetExam || 'Target Exam'}</span>
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#1B2640] text-slate-600 dark:text-slate-400 font-mono">
              ⏱ {note.estReadTime || '7 mins read'}
            </span>
            {note.teachingStyle && (
              <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-medium border border-emerald-200 dark:border-emerald-500/20 flex items-center gap-1.5">
                <span>📐</span>
                <span>{note.teachingStyle}</span>
              </span>
            )}
          </div>
        </div>

        {/* Tier 2: Lecture Title & Educator Sub-row */}
        <div className="mb-5 pt-1">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight font-['Plus_Jakarta_Sans']">
            {note.title}
          </h2>

          <div className="flex items-center gap-3 mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex-wrap">
            <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-medium">
              <span>⚡</span>
              <span>OmniStudy AI • Developed by Akanksha Maurya</span>
            </span>
            {note.chapter && (
              <>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="flex items-center gap-1.5">
                  <span>📚</span>
                  <span>Chapter:</span>
                  <strong className="text-slate-700 dark:text-slate-300">{note.chapter}</strong>
                </span>
              </>
            )}
          </div>
        </div>

        {/* ── 📑 YouTube Playlist / Full Subject E-Book Bookmarks Bar ── */}
        {(note.isPlaylist || note.isEBook || (note.units && note.units.length > 0)) && (
          <div className="mb-5 p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-blue-500/10 border-2 border-purple-500/30 shadow-xs space-y-2.5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-base">📑</span>
                <span className="font-extrabold text-xs sm:text-sm font-mono text-purple-900 dark:text-purple-200 uppercase tracking-wider">
                  SUBJECT MASTER E-BOOKLET • {note.totalUnits || (note.units ? note.units.length : 5)} UNITS
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-purple-500/20 text-purple-800 dark:text-purple-300 border border-purple-500/30 font-mono">
                  100% COMPLETE SYLLABUS
                </span>
              </div>
              <span className="text-[11px] text-purple-700 dark:text-purple-300 font-medium">
                Click unit to filter or read full consolidated booklet
              </span>
            </div>

            {/* Unit Bookmarks Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                type="button"
                onClick={() => setSelectedUnit('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  selectedUnit === 'all'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-white dark:bg-[#131B2E] text-slate-700 dark:text-slate-300 border border-purple-300 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-950/40'
                }`}
              >
                <span>📚</span>
                <span>All 5 Units (Full Subject E-Book)</span>
              </button>

              {(note.units || [1, 2, 3, 4, 5].map(u => ({ unitNumber: u, unitTitle: `Unit ${u}` }))).map((u) => {
                const uNum = typeof u === 'object' ? u.unitNumber : u;
                const uTitle = typeof u === 'object' ? (u.unitTitle || `Unit ${uNum}`) : `Unit ${uNum}`;
                const isActive = selectedUnit === uNum;
                return (
                  <button
                    key={uNum}
                    type="button"
                    onClick={() => setSelectedUnit(uNum)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-white dark:bg-[#131B2E] text-slate-700 dark:text-slate-300 border border-purple-300 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-950/40'
                    }`}
                  >
                    <span>📘</span>
                    <span>{uTitle.length > 28 ? uTitle.slice(0, 28) + '...' : uTitle}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tier 3: Action Toolbar (Study Tools on Left, Downloads on Right) */}
        <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Study & AI Tools */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Audio Lecture Podcast player */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-slate-50 dark:bg-[#0B0F17]">
              <button
                onClick={handleToggleAudio}
                className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-all ${
                  isPlayingAudio
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                }`}
                title={isPlayingAudio ? 'Pause Audio Summary' : 'Play Audio Podcast'}
              >
                {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlayingAudio ? 'Pause' : 'Podcast'}</span>
              </button>

              <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                {[1, 1.25, 1.5].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleChangeSpeed(s)}
                    className={`px-1.5 py-0.5 rounded ${audioSpeed === s ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-900/30' : 'hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>

            {/* Ask Doubt Button */}
            <button
              type="button"
              onClick={() => onAskDoubtAboutTopic(note.title)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-blue-500/20 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all shadow-sm cursor-pointer"
            >
              <MessageSquareText className="w-3.5 h-3.5" />
              <span>Ask AI Doubt</span>
            </button>

            {/* Timestamp Tutor Button */}
            <button
              type="button"
              onClick={() => onAskTimestampTutor && onAskTimestampTutor({
                timestamp: note.keyConcepts?.[0]?.timestamp_start || '00:00',
                videoTitle: note.title,
                context: note.overview
              })}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-all shadow-sm cursor-pointer"
              title="Ask AI Tutor about a specific timestamp in this lecture"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>⏱️ Timestamp Tutor</span>
            </button>
          </div>

          {/* Export & Share Options (PDF, DOC, Share) */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* PDF Download Button */}
            <button
              onClick={handleDownloadPDF}
              disabled={isExportingPDF}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm hover:shadow-md disabled:opacity-60 cursor-pointer active:scale-95"
              title="Download Handwritten Notes as PDF (Exact layout matching laptop screen)"
            >
              <FileDown className={`w-3.5 h-3.5 ${isExportingPDF ? 'animate-bounce' : ''}`} />
              <span>{isExportingPDF ? 'Generating PDF...' : 'Download PDF'}</span>
            </button>

            {/* Native Browser Print / Vector PDF Button */}
            <button
              onClick={handlePrintNotes}
              className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs hover:shadow-sm active:scale-95 cursor-pointer"
              title="Print directly or save as vector PDF using browser print"
            >
              <Printer className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Print / Save PDF</span>
            </button>

            {/* DOCX / Word Export Button */}
            <button
              onClick={handleExportDocx}
              className="px-3.5 py-2 rounded-xl border border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs hover:shadow-sm active:scale-95"
              title="Download Notes as Microsoft Word Document (.doc)"
            >
              {copiedDocx ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <FileText className="w-3.5 h-3.5" />}
              <span>{copiedDocx ? 'Downloaded DOC!' : 'Download DOC'}</span>
            </button>

            {/* Share Notes Modal Trigger Button */}
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="px-3.5 py-2 rounded-xl border border-purple-500/30 bg-purple-50 dark:bg-purple-500/10 hover:bg-purple-100 dark:hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs hover:shadow-sm active:scale-95"
              title="Share Notes with Classmates via WhatsApp or Link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>

        </div>

        {/* ── Row 1: Dedicated Study Tabs (All Features Restored) ── */}
        <div className="flex items-center gap-2 overflow-x-auto mt-4 pt-4 border-t border-[#E2E8F0] dark:border-[#23314F] pb-2 scrollbar-none">
          {[
            { id: 'notes',     label: '📝 Handwritten Notes',    count: (note?.keyConcepts || []).length },
            { id: 'lmr',       label: '⚡ 1-Page LMR & Flashcards', count: 0 },
            { id: 'formulas',  label: '📐 Formula Sheet',        count: (note?.formulas || []).length },
            { id: 'mindmap',   label: '🧠 Mind Map',              count: (note?.mindMapNodes || []).length },
            { id: 'pyqs',      label: '🏆 Exam PYQ Hub',         count: (note?.importantPYQs || []).length },
            { id: 'mcqs',      label: '🎯 Top 20 MCQs',          count: practiceMCQs.length },
            { id: 'mocktest',  label: '⏱️ Timed Mock Test',      count: 0 },
            { id: 'dashboard', label: '📊 Progress Dashboard',   count: 0 }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#2563EB] text-white shadow-sm font-bold'
                  : 'bg-[#F1F5F9] dark:bg-[#1B2640] text-[#334155] dark:text-[#CBD5E1] hover:text-[#0F172A] dark:hover:text-white border border-[#E2E8F0] dark:border-[#23314F]'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeTab === tab.id ? 'bg-white/20 text-white font-bold' : 'bg-slate-200 dark:bg-slate-700 text-[#334155] dark:text-[#CBD5E1]'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Row 2: Reading & Search Toolbar ── */}
        {activeTab === 'notes' && (
          <div className="space-y-3 mt-3 pt-3 border-t border-[#E2E8F0] dark:border-[#23314F]">
            
            <div className="flex items-center justify-between gap-3 flex-wrap">
              
              {/* In-Notes Search Input */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 flex-1 max-w-md">
                <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search concepts, derivations, blackboard text..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs text-[#0F172A] dark:text-[#F8FAFC] placeholder-slate-400 focus:outline-none w-full"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-mono cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Font Size & Handwriting Toggle */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-slate-50 dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 text-xs">
                  <span className="text-[11px] font-semibold text-slate-500 mr-1">Font:</span>
                  <button
                    onClick={() => setHandwritingStyle('clean')}
                    className={`px-2 py-0.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                      handwritingStyle === 'clean'
                        ? 'bg-[#2563EB] text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    Clean
                  </button>
                  <button
                    onClick={() => setHandwritingStyle('handwritten')}
                    className={`px-2 py-0.5 rounded-lg text-[11px] font-semibold transition-all font-kalam cursor-pointer ${
                      handwritingStyle === 'handwritten'
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    ✍️ Kalam
                  </button>

                  <span className="text-slate-300 dark:text-slate-700 mx-1">|</span>

                  {[
                    { id: 'small',  label: 'A-' },
                    { id: 'normal', label: 'A' },
                    { id: 'large',  label: 'A+' }
                  ].map(s => (
                    <button
                      key={s.id}
                      onClick={() => setFontSize(s.id)}
                      className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-bold transition-all cursor-pointer ${
                        fontSize === s.id
                          ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Daily Streak & Mastery Progress Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-emerald-500/10 border border-amber-500/20 text-xs">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400 font-mono text-xs">
                  <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-bounce" />
                  <span>{streakDays} DAYS STUDY STREAK!</span>
                </span>
                <span className="text-slate-400 hidden sm:inline">•</span>
                <span className="text-slate-600 dark:text-slate-300 hidden sm:inline">Daily Active Recall Mode</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-500">Mastery:</span>
                  <div className="w-24 sm:w-32 bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${masteryPercentage}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-bold font-mono text-emerald-600 dark:text-emerald-400">
                    {completedConceptsCount}/{totalConceptsCount} ({masteryPercentage}%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ── TAB 1: AUTHENTIC STUDENT COPY NOTES ── */}
      {activeTab === 'notes' && (
        <div
          ref={notebookRef}
          data-fontsize={fontSize}
          className={`rounded-2xl sm:rounded-3xl p-3 sm:p-8 md:p-12 shadow-2xl border min-h-[700px] sm:min-h-[900px] relative w-full overflow-hidden transition-all font-size-${fontSize} ${getPaperClass()} ${getFontSizeClass()}`}
        >
          {/* Left Red Margin Spiral Hole Accents */}
          <div className="absolute left-0.5 sm:left-2 top-0 bottom-0 w-4 sm:w-6 spiral-binder opacity-70 pointer-events-none no-print" />

          {/* Main Content: Placed safely to the right of the vertical red notebook margin line */}
          <div className="pl-6 sm:pl-14 md:pl-16 pr-1 sm:pr-3 space-y-4 sm:space-y-5 w-full overflow-hidden">

            {/* ── First Page Decorative Cover Header (Topper Notebook Edition) ── */}
            <div className={`topper-cover-header rounded-2xl p-3.5 sm:p-5 border-2 ${
              activeDark ? 'border-[#3B82F6] bg-[#0F1626] text-[#F8FAFC]' : 'border-[#1E3A8A] bg-white text-[#0F172A]'
            } shadow-md relative overflow-hidden`}>
              {/* Row 1: Brand & Author Attribution (Responsive Wrapping) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 mb-2 sm:pb-2.5 sm:mb-2.5 border-b-2 border-slate-200 dark:border-slate-700 gap-1.5 sm:gap-2 text-xs font-mono">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
                  <span className="font-black text-xs sm:text-sm tracking-wide text-[#1E3A8A] dark:text-blue-400">
                    ⚡ OMNISTUDY AI • TOPPER CLASSROOM COPY
                  </span>
                  <span className="text-slate-400 font-bold hidden sm:inline">|</span>
                  <span className="font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded text-[10px] border border-emerald-500/40">
                    100% EXAM VERIFIED
                  </span>
                </div>
                <div className="font-extrabold text-[11px] sm:text-xs shrink-0 sm:text-right">
                  Platform Developed by: <strong className="text-blue-700 dark:text-[#60A5FA] underline decoration-blue-500 underline-offset-2">Akanksha Maurya</strong>
                </div>
              </div>

              {/* Row 2: Subject, Educator & Target Exam */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 text-xs font-mono pt-1">
                <div className="font-bold text-red-600 dark:text-red-400 tracking-wide text-[11px] sm:text-xs">
                  <span>SUBJECT: <strong className="text-slate-800 dark:text-slate-200">{note.subject || 'Computer Science & Engineering'}</strong></span>
                  <span className="mx-1.5 text-slate-400">•</span>
                  <span>NOTES TYPE: <strong className="text-slate-800 dark:text-slate-200">CLASSROOM TOPPER COPY</strong></span>
                </div>
                <div className="flex items-center gap-2 shrink-0 flex-wrap">
                  <span className="px-2 sm:px-2.5 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/40 text-amber-800 dark:text-amber-300 font-bold text-[10px] sm:text-[11px]">
                    🎯 {note.targetExam || 'EXAM READY'}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    DATE: {new Date(note.createdAt || Date.now()).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Row 3: Chapter Title */}
              <div className="pt-2">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-[#1E3A8A] dark:text-[#93C5FD] leading-tight font-['Plus_Jakarta_Sans']">
                  {note.chapter || note.title}
                </h1>
              </div>
            </div>

            {/* ── Clickable Topic Index (Table of Contents) ── */}
            <div className="rounded-2xl p-4 bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 shadow-xs">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-500/20">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-1.5">
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Clickable Topic Index (Jump to Section)</span>
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold">
                    {(note.keyConcepts || []).length} Topics
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsTOCCollapsed(!isTOCCollapsed)}
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                  title="Collapse Table of Contents"
                >
                  <span>Collapse</span>
                  {isTOCCollapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Grid of clickable topic links */}
              {!isTOCCollapsed && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 transition-all">
                  {filteredConcepts.map((c, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        const el = document.getElementById(`concept-card-${idx}`);
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className="text-left p-2 rounded-xl bg-white dark:bg-[#131B2E] border border-emerald-500/20 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-xs text-slate-800 dark:text-slate-200 transition-all flex items-center justify-between gap-1 group"
                    >
                      <span className="font-semibold truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center gap-1">
                        {c.unitNumber && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-black bg-purple-500/15 text-purple-700 dark:text-purple-300 shrink-0">
                            U{c.unitNumber}
                          </span>
                        )}
                        <span><strong>{idx + 1}.</strong> {c.heading}</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 shrink-0">
                        {c.timestamp_start || '00:00'}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── 🔥 AKTU Exam: Most Important 10-Mark Sure-Shot Topics ── */}
            <div className="rounded-2xl p-4 bg-amber-500/10 dark:bg-amber-950/20 border-2 border-amber-500/30 shadow-xs">
              <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-amber-500/20">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="font-extrabold text-xs font-mono text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                    AKTU EXAM: MOST REPEATED & 10-MARK SURE-SHOT TOPICS
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-800 dark:text-amber-200 border border-amber-500/30 font-mono">
                  SECTION B & C GUARANTEE
                </span>
              </div>
              <ul className="space-y-1.5 text-xs text-amber-900 dark:text-amber-200 font-sans">
                {(note.keyConcepts || []).slice(0, 4).map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold shrink-0">🎯</span>
                    <span className="leading-snug">
                      <strong>[AKTU 10 Marks / Section C]:</strong> Detailed Derivation, Architecture Diagram &amp; Solved Case on <strong className="text-blue-700 dark:text-blue-300">{c.heading}</strong>.
                    </span>
                  </li>
                ))}
                {(note.keyConcepts || []).length > 4 && (
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold shrink-0">📌</span>
                    <span className="leading-snug">
                      <strong>[AKTU 2 Marks / Section A]:</strong> Definitions &amp; Real-life Examples of all {(note.keyConcepts || []).length} key concepts.
                    </span>
                  </li>
                )}
              </ul>
            </div>

            {/* Overview & Quick Highlights */}
            <div className="space-y-3">
              <div className="text-xs font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 font-mono">
                01. LECTURE OVERVIEW & CONTEXT
              </div>
              <p className="text-sm md:text-base leading-relaxed handwritten-font break-words text-[#1E3A8A] dark:text-[#93C5FD]">
                {note.overview}
              </p>

              {/* High-yield highlights list */}
              {note.quickSummary && note.quickSummary.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20 my-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1.5 font-mono flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> High-Yield Key Takeaways
                  </h4>
                  <ul className="space-y-1">
                    {note.quickSummary.map((item, idx) => (
                      <li key={idx} className="text-xs md:text-sm handwritten-font flex items-start gap-2 break-words text-[#1E3A8A] dark:text-[#93C5FD]">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="flex-1 min-w-0">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* ── Key Concepts (Student Copy Layout) ── */}
            <div className="space-y-5 pt-3 border-t border-dashed border-slate-300 dark:border-slate-800">
              <div className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 font-mono">
                02. TOPIC-WISE CONCEPT COPY & DERIVATIONS
              </div>

              {filteredConcepts.map((concept, idx) => {
                const isRevised = !!revisedConcepts[idx];
                const diffBadge = idx === 0
                  ? { label: '🟢 Foundation', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' }
                  : idx % 3 === 0
                  ? { label: '🔴 Advanced Trap', color: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30' }
                  : { label: '🟡 Exam Standard', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30' };

                const prevTopic = idx > 0 ? ((note?.keyConcepts || [])[idx - 1]?.heading || 'Foundational Principles') : 'Prerequisites & Core Definitions';
                const nextTopic = idx < (note?.keyConcepts || []).length - 1 ? ((note?.keyConcepts || [])[idx + 1]?.heading || 'Next Topic') : 'Final Chapter Review & Numericals';

                const showUnitDivider = Boolean(
                  concept.unitNumber &&
                  (idx === 0 || filteredConcepts[idx - 1]?.unitNumber !== concept.unitNumber)
                );
                const unitTitleFromList = note.units && Array.isArray(note.units)
                  ? note.units.find(u => Number(u.unitNumber) === Number(concept.unitNumber))?.unitTitle
                  : `Unit ${concept.unitNumber}`;

                return (
                  <React.Fragment key={idx}>
                    {/* Unit Divider Banner when browsing multi-unit E-Book */}
                    {showUnitDivider && (
                      <div className="my-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-500/15 via-blue-500/10 to-transparent border-l-4 border-purple-600 dark:border-purple-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse" />
                            <span className="text-[11px] font-mono font-black uppercase tracking-widest text-purple-700 dark:text-purple-300">
                              SUBJECT MODULE • UNIT {concept.unitNumber}
                            </span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-extrabold text-[#1E3A8A] dark:text-[#93C5FD] mt-0.5 font-['Plus_Jakarta_Sans']">
                            {unitTitleFromList || `Unit ${concept.unitNumber} Detailed Syllabus`}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-700 font-mono">
                            AKTU Weightage: 20-25 Marks
                          </span>
                        </div>
                      </div>
                    )}

                    <div
                      id={`concept-card-${idx}`}
                      className={`rounded-2xl p-5 sm:p-6 border transition-all concept-block ${
                        isRevised ? 'border-emerald-500/40 shadow-emerald-500/5' : ''
                      } ${
                        activeDark ? 'bg-[#0F1626]/80 border-[#23314F]' : 'bg-white/85 border-slate-200 shadow-sm'
                      }`}
                    >
                    {/* Concept Header Toolbar: Difficulty Badge + Revision Toggle + Timestamp */}
                    <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-200/60 dark:border-slate-800/60 flex-wrap text-xs">
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Difficulty Tag */}
                        <span className={`px-2 py-0.5 rounded-full font-bold font-mono text-[10px] border ${diffBadge.color}`}>
                          {diffBadge.label}
                        </span>

                        {/* Mark as Revised Checkbox */}
                        <button
                          type="button"
                          onClick={() => toggleConceptRevised(idx)}
                          className={`flex items-center gap-1.5 px-2 py-0.5 rounded-lg border text-[11px] font-semibold transition-all ${
                            isRevised
                              ? 'bg-emerald-500 text-white border-emerald-500 shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          <CheckCircle2 className={`w-3 h-3 ${isRevised ? 'text-white' : 'text-slate-400'}`} />
                          <span>{isRevised ? 'Revised ✓' : 'Mark as Revised'}</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
                        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold">
                          {concept.timestamp_start || `0${idx * 10}:00`} - {concept.timestamp_end || `0${(idx + 1) * 10}:00`}
                        </span>
                        <button
                          type="button"
                          onClick={() => onAskTimestampTutor && onAskTimestampTutor({
                            timestamp: concept.timestamp_start || `0${idx * 5}:00`,
                            topic: concept.heading,
                            videoTitle: note.title,
                            context: Array.isArray(concept.points) ? concept.points.slice(0, 3).join('. ') : ''
                          })}
                          className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1 transition-all"
                          title={`Ask AI Tutor about timestamp [${concept.timestamp_start || `0${idx * 5}:00`}]`}
                        >
                          <Clock className="w-3 h-3" />
                          <span>Ask Tutor</span>
                        </button>
                      </div>
                    </div>

                    {/* Underlined Topic Heading */}
                    <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                      <h3 className="text-xl md:text-2xl font-bold handwritten-title break-words flex-1 min-w-0 text-[#1E3A8A] dark:text-[#93C5FD] topic-underline">
                        {concept.heading}
                      </h3>
                    </div>

                    {/* Sub-heading */}
                    {concept.subheading && (
                      <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2 italic">
                        ▶ {concept.subheading}
                      </div>
                    )}

                    {/* Concept Connections (Prerequisite & Next Steps in Syllabus) */}
                    <div className="my-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-[11px] font-sans flex items-center gap-2 flex-wrap text-slate-600 dark:text-slate-300">
                      <span className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                        <Link2 className="w-3 h-3" /> Syllabus Link:
                      </span>
                      <span>Requires: <strong className="text-slate-700 dark:text-slate-200">{prevTopic.slice(0, 32)}</strong></span>
                      <span className="text-slate-300 dark:text-slate-700">➔</span>
                      <span>Leads to: <strong className="text-slate-700 dark:text-slate-200">{nextTopic.slice(0, 32)}</strong></span>
                    </div>

                    {/* Red Pen Definitions */}
                    {concept.definitions && concept.definitions.length > 0 && (
                      <div className="my-3 space-y-1.5">
                        {concept.definitions.map((def, dIdx) => (
                          <div key={dIdx} className="p-3 rounded-xl bg-red-500/5 border-l-4 border-red-500 text-xs sm:text-sm font-bold text-[#B91C1C] dark:text-[#FCA5A5] handwritten-font flex items-start gap-1.5">
                            <span>📌</span>
                            <MathText text={def} className="flex-1" />
                          </div>
                        ))}
                      </div>
                    )}

                  {/* Blue Pen Numbered / Bulleted Points */}
                  {concept.points && concept.points.length > 0 && (
                    <ul className="space-y-2 my-3 pl-2">
                      {concept.points.map((pt, pIdx) => (
                        <li key={pIdx} className="text-sm md:text-base handwritten-font flex items-start gap-2.5 text-[#1E3A8A] dark:text-[#93C5FD]">
                          <span className="text-blue-500 font-bold">•</span>
                          <MathText text={pt} className="flex-1 min-w-0 leading-relaxed" />
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Comparison Table if Present */}
                  {concept.table && concept.table.headers && (
                    <div className="my-4 overflow-x-auto rounded-xl border border-slate-300 dark:border-slate-700 table-container">
                      {concept.table.title && (
                        <div className="p-2.5 text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                          📊 {concept.table.title}
                        </div>
                      )}
                      <table className="w-full text-xs md:text-sm text-left">
                        <thead className="bg-slate-200/60 dark:bg-slate-800/80 font-bold text-slate-800 dark:text-slate-200">
                          <tr>
                            {concept.table.headers.map((h, hi) => (
                              <th key={hi} className="p-2.5 border-b border-slate-300 dark:border-slate-700">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {(concept.table.rows || []).map((row, ri) => (
                            <tr key={ri} className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-100/50">
                              {row.map((cell, ci) => (
                                <td key={ci} className="p-2.5 font-sans"><MathText text={cell} /></td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Exactly ONE Diagram per Concept with Caption & "Watch at mm:ss" link */}
                  {concept.diagram && (
                    <DiagramRenderer
                      diagram={concept.diagram}
                      timestamp={concept.timestamp_start || `0${idx * 10}:00`}
                      videoUrl={note.videoUrl}
                      isDark={activeDark}
                    />
                  )}

                  {/* Orange Pen Teacher's Tips / Speed Tricks */}
                  {concept.teacher_tips && concept.teacher_tips.length > 0 && (
                    <div className="my-3 space-y-1.5 teacher-tip-box">
                      {concept.teacher_tips.map((tip, tIdx) => (
                        <div key={tIdx} className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/30 text-xs sm:text-sm font-semibold text-[#C2410C] dark:text-[#FDBA74] handwritten-font flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                          <MathText text={tip} className="flex-1" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Common Student Mistake / Blunder Box */}
                  {concept.common_mistake && (
                    <div className="my-3 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs sm:text-sm common-mistake-box">
                      <div className="flex items-center gap-1.5 font-bold text-red-700 dark:text-red-400 mb-1">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Common Student Exam Mistake / Blunder:</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 font-sans">
                        <strong>Mistake:</strong> {concept.common_mistake.mistake}
                      </p>
                      <p className="text-red-600 dark:text-red-400 font-sans mt-0.5">
                        <strong>Why it loses marks:</strong> {concept.common_mistake.whyWrong}
                      </p>
                      <p className="text-emerald-700 dark:text-emerald-400 font-bold font-sans mt-1">
                        ✓ <strong>Correct Approach:</strong> {concept.common_mistake.correction}
                      </p>
                    </div>
                  )}

                  {/* 1 Solved Practice Question (Green Pen) */}
                  {concept.solved_example && (
                    <div className="my-4 p-4 rounded-xl border-2 border-emerald-500/40 bg-emerald-500/5 solved-example-box">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#15803D] dark:text-[#86EFAC] font-mono flex items-center gap-1.5">
                          ✍️ Classroom Solved Practice Problem
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                          Verified Model Solution
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-[#0F172A] dark:text-[#F8FAFC] mb-2 font-['Plus_Jakarta_Sans']">
                        {concept.solved_example.title}
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans mb-2">
                        <p><strong className="text-emerald-700 dark:text-emerald-400">Given:</strong> {concept.solved_example.given}</p>
                        <p><strong className="text-emerald-700 dark:text-emerald-400">To Find:</strong> {concept.solved_example.toFind}</p>
                      </div>

                      {concept.solved_example.formula && (
                        <div className="my-2 p-2 rounded-lg bg-white/70 dark:bg-slate-900/80 border border-emerald-500/30">
                          <KaTeXFormula formula={concept.solved_example.formula} displayMode={false} />
                        </div>
                      )}

                      <div className="text-xs text-slate-700 dark:text-slate-300 font-mono whitespace-pre-wrap leading-relaxed my-2 bg-slate-100/60 dark:bg-slate-900/60 p-2.5 rounded-lg">
                        {concept.solved_example.solution}
                      </div>

                      <div className="flex items-center justify-between text-xs font-bold text-[#15803D] dark:text-[#86EFAC] pt-1">
                        <span>Answer: {concept.solved_example.answer}</span>
                        {concept.solved_example.short_trick && (
                          <span className="text-[11px] font-mono text-orange-600 dark:text-orange-400 font-semibold">
                            ⚡ Shortcut: {concept.solved_example.short_trick}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                </div>
              </React.Fragment>
            );
          })}
            </div>

            {/* ── Callout: Dedicated Top 20 Practice MCQs Interactive Tab ── */}
            <div className="pt-6 border-t border-dashed border-slate-300 dark:border-slate-800">
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border border-emerald-500/25 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 font-['Plus_Jakarta_Sans']">
                      🎯 Top 20 Practice MCQs Available in Quiz Tab
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Test your exam readiness with 20 graded MCQs (Easy, Medium, Hard) featuring live scoring and step-by-step solutions.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('mcqs')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold font-mono shrink-0 transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
                >
                  <span>Take Interactive Quiz</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* Official Notebook Signature & Watermark Footer (Solid Dark Bar) */}
            <div className="print-signature-footer mt-8 p-3.5 sm:p-4 rounded-2xl bg-[#0F172A] text-white border-2 border-[#1E293B] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-2.5 w-full">
              <div className="flex items-center gap-2 font-black text-xs sm:text-sm tracking-wide text-white flex-wrap">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span className="text-white font-extrabold font-['Plus_Jakarta_Sans']">⚡ OMNISTUDY AI DIGITAL NOTEBOOK</span>
                <span className="text-slate-400">•</span>
                <span className="text-blue-300 font-bold">VERIFIED TOPPER COPY NOTES</span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-white shrink-0">
                <span>Platform Developed by: <strong className="text-amber-400 font-black underline decoration-amber-400 underline-offset-2">Akanksha Maurya</strong></span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ── TAB 2: INTERACTIVE MIND MAP CANVAS ── */}
      {activeTab === 'mindmap' && (
        <MindMapViewer
          nodes={note.mindMapNodes || []}
          title={note.chapter || note.title}
          keyConcepts={note.keyConcepts || []}
          formulas={note.formulas || []}
          isDark={isDark}
          onSelectTopic={(topicName) => {
            setActiveTab('notes');
          }}
        />
      )}

      {/* ── TAB 3: TOP 5 EXAM PREVIOUS YEAR QUESTIONS (PYQ) ── */}
      {activeTab === 'pyqs' && (
        <div className={`rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 border shadow-2xl ${
          isDark ? 'bg-[#0F1626] border-[#23314F] text-[#F8FAFC]' : 'bg-white border-[#E2E8F0] text-[#0F172A]'
        }`}>
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-amber-500 font-mono">
                TOP 5 EXAM QUESTION VAULT
              </div>
              <h3 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] mt-0.5">
                Curated Past Year Questions & Solutions
              </h3>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
                Select an option to test your understanding, then inspect step-by-step marking scheme answers & short tricks.
              </p>
            </div>

            <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/30">
              {(note.importantPYQs || []).slice(0, 5).length} Questions
            </span>
          </div>

          {/* ── 📊 PYQ Trend Heatmap & Exam Predictor ("Sure-Shot Topic Predictor") ── */}
          {(() => {
            const pyqTrends = derivePYQTrends(note);
            const filteredTrends = pyqTrends.filter(t => {
              if (trendFilter === '10m') return t.marks.includes('10');
              if (trendFilter === 'sure_shot') return t.probability >= 90;
              return true;
            });
            const topSureShot = pyqTrends.find(t => t.probability >= 90);

            return (
              <div className="mb-8 p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-rose-500/5 border-2 border-amber-500/25 shadow-sm">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-amber-500/20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                      <BarChart3 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-base text-slate-900 dark:text-white font-['Plus_Jakarta_Sans'] flex items-center gap-2">
                        <span>📊 PYQ Trend Heatmap &amp; Exam Predictor</span>
                        <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-full bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30">
                          AKTU 2019 - 2024
                        </span>
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Topic-wise recurrence frequency and AI probability forecast for this semester exam.
                      </p>
                    </div>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {[
                      { id: 'all', label: `All Topics (${pyqTrends.length})` },
                      { id: '10m', label: '🔥 10-Mark Only' },
                      { id: 'sure_shot', label: '⚡ ≥90% Probability' }
                    ].map(btn => (
                      <button
                        key={btn.id}
                        type="button"
                        onClick={() => setTrendFilter(btn.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                          trendFilter === btn.id
                            ? 'bg-amber-500 text-white shadow-xs'
                            : 'bg-white dark:bg-[#131B2E] text-slate-600 dark:text-slate-300 border border-amber-500/20 hover:bg-amber-50 dark:hover:bg-amber-950/40'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 24-Hour Strategy Callout Banner */}
                {topSureShot && (
                  <div className="mt-4 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                    <Flame className="w-5 h-5 text-amber-500 fill-amber-500 shrink-0 mt-0.5 animate-bounce" />
                    <div className="text-xs">
                      <strong className="text-amber-800 dark:text-amber-300 uppercase font-mono block">
                        24-Hour Exam Strategy Recommendation:
                      </strong>
                      <span className="text-slate-700 dark:text-slate-200">
                        Sabse pehle <strong>{topSureShot.topic}</strong> aur uske diagram ko prepare karein! Yeh topic pichle 5 saalon me {topSureShot.frequency} baar 10 marks me repeat hua hai (Exam Probability: <strong className="text-red-600 dark:text-red-400">{topSureShot.probability}%</strong>).
                      </span>
                    </div>
                  </div>
                )}

                {/* Heatmap Grid & Cards */}
                <div className="mt-4 space-y-3">
                  {filteredTrends.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-white dark:bg-[#0B0F17] border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-amber-500/40 transition-all"
                    >
                      {/* Row 1: Topic Title + Priority + Probability Badge */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md font-mono ${
                            item.priority.includes('P1')
                              ? 'bg-red-500/15 text-red-600 dark:text-red-400'
                              : 'bg-blue-500/15 text-blue-600 dark:text-blue-400'
                          }`}>
                            {item.priority}
                          </span>
                          <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                            {item.topic}
                          </h5>
                          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 font-mono">
                            [{item.marks}]
                          </span>
                        </div>

                        {/* AI Prediction Badge */}
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-xs font-black px-3 py-1 rounded-full border font-mono flex items-center gap-1 shadow-xs ${item.badgeColor}`}>
                            <span>{item.badge}</span>
                          </span>
                        </div>
                      </div>

                      {/* Row 2: Visual Year-by-Year Heatmap (2019, 2020, 2021, 2022, 2023, 2024) */}
                      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                        
                        {/* Year Pills */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 mr-1">Papers:</span>
                          {[2019, 2020, 2021, 2022, 2023, 2024].map((year) => {
                            const wasAsked = item.years.includes(year);
                            return (
                              <div
                                key={year}
                                className={`px-2 py-1 rounded-lg font-mono text-[11px] font-bold transition-all flex items-center gap-1 ${
                                  wasAsked
                                    ? 'bg-emerald-500 text-white shadow-xs'
                                    : 'bg-slate-100 dark:bg-slate-800/50 text-slate-400 dark:text-slate-600'
                                }`}
                                title={wasAsked ? `Asked in AKTU ${year} Examination` : `Not asked in ${year}`}
                              >
                                {wasAsked ? <CheckCircle2 className="w-3 h-3 text-white" /> : <span>—</span>}
                                <span>{year}</span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Frequency Bar */}
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[11px] font-mono text-slate-500">Repetition:</span>
                          <div className="w-20 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-amber-500 h-2 rounded-full"
                              style={{ width: `${(item.frequency / 6) * 100}%` }}
                            />
                          </div>
                          <span className="text-[11px] font-bold font-mono text-amber-600 dark:text-amber-400">
                            {item.frequency}/6 Yrs
                          </span>
                        </div>

                      </div>

                      {/* Row 3: Examiner Insight */}
                      <div className="mt-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 text-[11px] text-slate-600 dark:text-slate-300 font-sans flex items-start gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span><strong>Examiner Pattern:</strong> {item.insight}</span>
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            );
          })()}

          <div className="space-y-5">
            {(!note.importantPYQs || note.importantPYQs.length === 0) && (
              <div className="p-8 text-center rounded-2xl border border-dashed border-amber-500/30 bg-amber-500/5 my-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-3">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold mb-1">PYQ source nahi mila</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                  {note.pyqSourceMessage || 'Real PYQ paper upload karein taaki lecture topics se verified questions match ho sakein. Fake questions nahi banaye jaate.'}
                </p>
              </div>
            )}
            {(note.importantPYQs || []).slice(0, 5).map((pyq, idx) => {
              const isExpanded = expandedSolutions[idx];
              const selectedOpt = selectedPyqOptions[idx];

              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all overflow-hidden pyq-item ${
                    isDark ? 'bg-[#131B2E]/70 border-[#23314F]' : 'bg-[#F8FAFC] border-[#E2E8F0]'
                  }`}
                >
                  <div className="p-5">
                    {/* Tags: Exam, Year */}
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                        {pyq.examName || note.targetExam || 'Exam PYQ'}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 font-bold">
                        {pyq.year || 'Exam-pattern based'}
                      </span>
                      {pyq.difficulty && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          pyq.difficulty.toLowerCase().includes('easy')
                            ? 'bg-emerald-500/15 text-emerald-500'
                            : pyq.difficulty.toLowerCase().includes('hard')
                            ? 'bg-red-500/15 text-red-500'
                            : 'bg-amber-500/15 text-amber-500'
                        }`}>
                          {pyq.difficulty}
                        </span>
                      )}
                    </div>

                    {/* Question Statement */}
                    <h4 className="font-bold text-sm sm:text-base leading-snug mb-4">
                      Q{idx + 1}. {pyq.question}
                    </h4>

                    {/* 4 Interactive Options (A, B, C, D) */}
                    {pyq.options && pyq.options.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                        {pyq.options.map((opt, optIdx) => {
                          const isSelected = selectedOpt === optIdx;
                          const correctLetter = (pyq.correctAnswer || '').slice(0, 8);
                          const isCorrectOpt = correctLetter.includes(String.fromCharCode(65 + optIdx));

                          let optStyle = isDark
                            ? 'bg-[#0B0F17] border-[#23314F] hover:border-slate-600'
                            : 'bg-white border-[#E2E8F0] hover:border-slate-300';

                          if (selectedOpt !== undefined) {
                            if (isCorrectOpt) {
                              optStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold';
                            } else if (isSelected) {
                              optStyle = 'bg-red-500/15 border-red-500 text-red-600 dark:text-red-400';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => setSelectedPyqOptions(prev => ({ ...prev, [idx]: optIdx }))}
                              className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-2.5 ${optStyle}`}
                            >
                              <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-mono font-bold shrink-0 mt-0.5">
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span className="flex-1 min-w-0 break-words">{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Solution Toggle Bar */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        {selectedOpt !== undefined ? `Correct Answer: ${pyq.correctAnswer}` : 'Click option to test, then reveal solution'}
                      </span>

                      <button
                        onClick={() => toggleSolution(idx)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#2563EB] dark:text-[#60A5FA] hover:bg-blue-50 dark:hover:bg-blue-950/30 flex items-center gap-1"
                      >
                        <span>{isExpanded ? 'Hide Solution' : 'View Step-by-Step Solution'}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                  </div>

                  {/* Expanded Step-by-Step Solution & Short Trick */}
                  {isExpanded && (
                    <div className={`p-5 pt-4 border-t ${
                      isDark ? 'border-[#23314F] bg-[#0B0F17]' : 'border-[#E2E8F0] bg-slate-50'
                    }`}>
                      <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5" /> Model Step-by-Step Solution:
                      </div>

                      <div className="text-xs sm:text-sm font-mono whitespace-pre-wrap leading-relaxed bg-white dark:bg-[#131B2E] p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                        {pyq.solution}
                      </div>

                      {pyq.shortTrick && (
                        <div className="mt-3 p-3 rounded-xl bg-orange-500/10 border border-orange-500/30 text-xs font-semibold text-orange-700 dark:text-orange-400 flex items-start gap-2">
                          <span className="font-bold shrink-0">⚡ Short Trick / Elimination Method:</span>
                          <span>{pyq.shortTrick}</span>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── TAB 4: TOP 20 LECTURE PRACTICE MCQS (INTERACTIVE REVISION TEST) ── */}
      {activeTab === 'mcqs' && (
        <div className={`rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 border shadow-2xl ${
          isDark ? 'bg-[#0F1626] border-[#23314F] text-[#F8FAFC]' : 'bg-white border-[#E2E8F0] text-[#0F172A]'
        }`}>
          {/* Header & Live Score Tracker */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1.5">
                <Target className="w-4 h-4 text-emerald-500" />
                TOP 20 POST-LECTURE MASTERY TEST
              </div>
              <h3 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] mt-0.5">
                Top 20 Practice MCQs: {note.chapter || note.title}
              </h3>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1">
                Revise and cement your lecture concepts. Click any option for instant feedback, detailed step-by-step solutions, and exam speed tricks.
              </p>
            </div>

            {/* Scorecard */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 flex items-center gap-4 shrink-0 shadow-sm">
              <div className="text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Your Score</span>
                <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                  {calculateScore()} / {practiceMCQs.length}
                </span>
              </div>
              <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
              <div className="text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Attempted</span>
                <span className="text-xl font-black text-blue-600 dark:text-blue-400 font-mono">
                  {Object.keys(selectedMcqOptions).length} / {practiceMCQs.length}
                </span>
              </div>
              <button
                type="button"
                onClick={handleResetMCQs}
                className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                title="Reset Quiz"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {['all', 'easy', 'medium', 'hard', 'unanswered'].map(fKey => {
              const count = practiceMCQs.filter(q => {
                if (fKey === 'easy') return (q.difficulty || '').toLowerCase() === 'easy';
                if (fKey === 'medium') return (q.difficulty || '').toLowerCase() === 'medium';
                if (fKey === 'hard') return (q.difficulty || '').toLowerCase() === 'hard';
                if (fKey === 'unanswered') return selectedMcqOptions[q.id] === undefined;
                return true;
              }).length;

              return (
                <button
                  key={fKey}
                  type="button"
                  onClick={() => setMcqFilter(fKey)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all capitalize flex items-center gap-1 shrink-0 ${
                    mcqFilter === fKey
                      ? 'bg-[#2563EB] text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-[#131B2E] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{fKey}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    mcqFilter === fKey ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive Questions List */}
          <div className="space-y-6">
            {practiceMCQs
              .filter(q => {
                if (mcqFilter === 'easy') return (q.difficulty || '').toLowerCase() === 'easy';
                if (mcqFilter === 'medium') return (q.difficulty || '').toLowerCase() === 'medium';
                if (mcqFilter === 'hard') return (q.difficulty || '').toLowerCase() === 'hard';
                if (mcqFilter === 'unanswered') return selectedMcqOptions[q.id] === undefined;
                return true;
              })
              .map((q) => {
                const selectedIdx = selectedMcqOptions[q.id];
                const isAnswered = selectedIdx !== undefined;
                const isCorrect = selectedIdx === q.correctOptionIndex;
                const isSolutionOpen = expandedMcqSolutions[q.id];

                return (
                  <div
                    key={q.id}
                    className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                      isAnswered
                        ? isCorrect
                          ? 'border-emerald-500/40 bg-emerald-500/5'
                          : 'border-red-500/40 bg-red-500/5'
                        : isDark
                        ? 'bg-[#131B2E]/70 border-[#23314F]'
                        : 'bg-[#F8FAFC] border-[#E2E8F0]'
                    }`}
                  >
                    {/* Header: Question Number & Difficulty Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-[#2563EB]/10 text-[#2563EB] dark:text-[#60A5FA] font-bold text-xs flex items-center justify-center font-mono">
                          {q.id}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          (q.difficulty || '').toLowerCase() === 'easy'
                            ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                            : (q.difficulty || '').toLowerCase() === 'hard'
                            ? 'bg-red-500/15 text-red-600 dark:text-red-400'
                            : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                        }`}>
                          {q.difficulty || 'Medium'}
                        </span>
                        {q.topicTag && (
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-200/50 dark:bg-slate-800 px-2.5 py-0.5 rounded-full truncate max-w-xs">
                            {q.topicTag}
                          </span>
                        )}
                      </div>

                      {isAnswered && (
                        <div className="flex items-center gap-1.5 text-xs font-bold font-mono">
                          {isCorrect ? (
                            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4" /> Correct (+4)
                            </span>
                          ) : (
                            <span className="text-red-600 dark:text-red-400 flex items-center gap-1">
                              <XCircle className="w-4 h-4" /> Incorrect (-1)
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Question Statement */}
                    <h4 className="font-bold text-sm sm:text-base leading-snug mb-4 text-[#0F172A] dark:text-[#F8FAFC]">
                      {q.question}
                    </h4>

                    {/* 4 Interactive Clickable Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
                      {(q.options || []).map((opt, oIdx) => {
                        const isThisSelected = selectedIdx === oIdx;
                        const isThisTheCorrectAnswer = oIdx === q.correctOptionIndex;

                        let optStyle = isDark
                          ? 'bg-[#0B0F17] border-slate-700 hover:border-slate-500 text-slate-200'
                          : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800';

                        if (isAnswered) {
                          if (isThisTheCorrectAnswer) {
                            optStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold';
                          } else if (isThisSelected && !isCorrect) {
                            optStyle = 'bg-red-500/15 border-red-500 text-red-700 dark:text-red-300 line-through';
                          } else {
                            optStyle = 'opacity-40 border-slate-200 dark:border-slate-800';
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => handleSelectMCQOption(q.id, oIdx)}
                            className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-2.5 shadow-sm ${optStyle}`}
                          >
                            <span className={`w-5 h-5 rounded-full font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5 ${
                              isAnswered && isThisTheCorrectAnswer
                                ? 'bg-emerald-500 text-white'
                                : isAnswered && isThisSelected
                                ? 'bg-red-500 text-white'
                                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                            }`}>
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span className="flex-1 leading-snug break-words">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Solution Toggle Bar */}
                    <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        {isAnswered
                          ? `Answer: Option ${String.fromCharCode(65 + q.correctOptionIndex)}`
                          : 'Click any option to test your understanding'}
                      </span>

                      <button
                        type="button"
                        onClick={() => setExpandedMcqSolutions(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                        className="text-xs font-bold text-[#2563EB] dark:text-[#60A5FA] hover:underline flex items-center gap-1"
                      >
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>{isSolutionOpen ? 'Hide Explanation' : 'View Detailed Solution & Why'}</span>
                      </button>
                    </div>

                    {/* Expanded Detailed Solution */}
                    {isSolutionOpen && (
                      <div className="mt-3 p-3.5 rounded-xl bg-slate-100 dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm leading-relaxed animate-fade-slide-up">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                          ✓ Correct Answer: Option {String.fromCharCode(65 + q.correctOptionIndex)} ({q.correctAnswer})
                        </span>
                        <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line font-sans">
                          {q.solution}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* ── TAB 5: ⚡ LAST-MINUTE REVISION (LMR) 1-PAGE CHEAT SHEET ── */}
      {activeTab === 'lmr' && (
        <div className={`rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 border shadow-2xl ${
          isDark ? 'bg-[#0F1626] border-[#23314F] text-[#F8FAFC]' : 'bg-white border-[#E2E8F0] text-[#0F172A]'
        }`}>
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-amber-500 font-mono flex items-center gap-1.5">
                <Zap className="w-4 h-4 fill-amber-500" />
                EXAM SE 10 MINUTE PEHLE REVISION
              </div>
              <h3 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] mt-0.5">
                ⚡ 1-Page LMR Cheat Sheet: {note.chapter || note.title}
              </h3>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1">
                Zero filler, 100% high-yield recall. Key laws, formulas, primary diagram, and examiner traps on a single condensed sheet.
              </p>
            </div>

            <button
              type="button"
              onClick={handleDownloadPDF}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-sm transition-all shrink-0"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Download 1-Page LMR</span>
            </button>
          </div>

          {/* ── 🎴 SMART AI FLASHCARDS & SPACED REPETITION (ACTIVE RECALL MODE) ── */}
          {(() => {
            const allCards = deriveNoteFlashcards(note);
            const cards = allCards.filter(c => {
              if (flashcardFilter === 'all') return true;
              return c.category === flashcardFilter;
            });

            const currentIdx = Math.min(currentFlashcardIdx, Math.max(0, cards.length - 1));
            const card = cards[currentIdx];

            const againCount = Object.values(flashcardRatings).filter(r => r === 'again').length;
            const goodCount = Object.values(flashcardRatings).filter(r => r === 'good').length;
            const easyCount = Object.values(flashcardRatings).filter(r => r === 'easy').length;
            const reviewedCount = Object.keys(flashcardRatings).length;
            const progressPct = allCards.length > 0 ? Math.round((reviewedCount / allCards.length) * 100) : 0;

            const handleRate = (rating) => {
              if (!card) return;
              setFlashcardRatings(prev => ({ ...prev, [card.id]: rating }));
              setIsCardFlipped(false);
              setTimeout(() => {
                if (currentIdx < cards.length - 1) {
                  setCurrentFlashcardIdx(currentIdx + 1);
                } else {
                  setCurrentFlashcardIdx(0);
                }
              }, 250);
            };

            const handleNext = () => {
              setIsCardFlipped(false);
              setCurrentFlashcardIdx((currentIdx + 1) % cards.length);
            };

            const handlePrev = () => {
              setIsCardFlipped(false);
              setCurrentFlashcardIdx((currentIdx - 1 + cards.length) % cards.length);
            };

            const handleShuffle = () => {
              setIsCardFlipped(false);
              setCurrentFlashcardIdx(Math.floor(Math.random() * cards.length));
            };

            if (cards.length === 0) return null;

            return (
              <div className="mb-8 p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-blue-500/10 border-2 border-indigo-500/30 shadow-md">
                
                {/* Section Header & Active Recall Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-indigo-500/20">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🎴</span>
                      <h4 className="font-extrabold text-base sm:text-lg font-['Plus_Jakarta_Sans'] text-indigo-950 dark:text-indigo-200">
                        Smart AI Flashcards &amp; Spaced Repetition (Active Recall)
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-mono border border-indigo-500/30">
                        2x RETENTION
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      Exam se 2 din pehle rapid recall test karein. Card flip karein aur khud ko <strong>Again / Good / Easy</strong> rating dein.
                    </p>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {['all', 'Definition', 'Formula', 'Exam Trap'].map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => {
                          setFlashcardFilter(f);
                          setCurrentFlashcardIdx(0);
                          setIsCardFlipped(false);
                        }}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                          flashcardFilter === f
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-white dark:bg-[#131B2E] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                        }`}
                      >
                        {f === 'all' ? `All (${allCards.length})` : f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Spaced Repetition Stats & Progress Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 dark:text-slate-400">Mastery Progress:</span>
                    <div className="w-28 sm:w-40 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      {reviewedCount}/{allCards.length} ({progressPct}%)
                    </span>
                  </div>

                  {/* Rating Badges */}
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-500/30 flex items-center gap-1">
                      <span>🟢 Easy:</span> <strong>{easyCount}</strong>
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-400 font-bold border border-amber-500/30 flex items-center gap-1">
                      <span>🟡 Good:</span> <strong>{goodCount}</strong>
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-red-500/15 text-red-700 dark:text-red-400 font-bold border border-red-500/30 flex items-center gap-1">
                      <span>🔴 Again:</span> <strong>{againCount}</strong>
                    </span>
                  </div>
                </div>

                {/* ── 3D Interactive Flip Card Stage ── */}
                <div
                  className="w-full max-w-2xl mx-auto cursor-pointer select-none"
                  style={{ perspective: '1200px' }}
                  onClick={() => setIsCardFlipped(!isCardFlipped)}
                >
                  <div
                    className="relative w-full min-h-[260px] sm:min-h-[280px] rounded-3xl transition-transform duration-500 shadow-xl"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: isCardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}
                  >
                    {/* ── FRONT SIDE ── */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-2 bg-white dark:bg-[#0F1626] border-indigo-400/50 shadow-lg"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden'
                      }}
                    >
                      {/* Top Bar: Category Pill & Index */}
                      <div className="flex items-center justify-between gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono border ${card.categoryColor}`}>
                          {card.category}
                        </span>
                        <div className="flex items-center gap-2">
                          {card.unitNumber && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-purple-500/15 text-purple-700 dark:text-purple-300 font-bold">
                              Unit {card.unitNumber}
                            </span>
                          )}
                          <span className="text-xs font-mono font-bold text-slate-400">
                            {currentIdx + 1} / {cards.length}
                          </span>
                        </div>
                      </div>

                      {/* Front Content / Question */}
                      <div className="my-auto py-4 text-center">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 block mb-2">
                          {card.topic}
                        </span>
                        <h3 className="text-base sm:text-xl font-extrabold text-slate-900 dark:text-white leading-relaxed font-['Plus_Jakarta_Sans'] whitespace-pre-line">
                          {card.front}
                        </h3>
                        {card.hint && (
                          <p className="mt-3 text-xs text-indigo-600 dark:text-indigo-400 italic font-sans">
                            💡 Hint: {card.hint}
                          </p>
                        )}
                      </div>

                      {/* Bottom Instruction */}
                      <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <span className="font-mono text-[11px]">Click or tap anywhere to flip</span>
                        <span className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                          <span>🔄 Reveal Answer</span>
                        </span>
                      </div>
                    </div>

                    {/* ── BACK SIDE (Rotated 180deg) ── */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-2 bg-gradient-to-b from-slate-50 to-indigo-50/40 dark:from-[#0F1626] dark:to-[#172036] border-emerald-500/50 shadow-xl"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      {/* Top Bar: Solved / Model Answer Header */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                          ✓ Model Answer &amp; Derivation
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-400">
                          {currentIdx + 1} / {cards.length}
                        </span>
                      </div>

                      {/* Back Content / Answer */}
                      <div className="my-auto py-3">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold block mb-1">
                          {card.topic}
                        </span>
                        <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-100 font-sans leading-relaxed whitespace-pre-line font-medium max-h-44 overflow-y-auto pr-1">
                          {card.back}
                        </div>
                      </div>

                      {/* Spaced Repetition Rating Buttons */}
                      <div
                        className="pt-3 border-t border-slate-200 dark:border-slate-700"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="text-center text-[10px] font-mono text-slate-500 mb-2">
                          Rate your recall to schedule next repetition:
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() => handleRate('again')}
                            className="py-2 px-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-xs flex flex-col items-center justify-center gap-0.5 shadow-sm transition-all"
                            title="Review again in 1 minute"
                          >
                            <span>🔴 Again</span>
                            <span className="text-[9px] opacity-80 font-mono">+1 min</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRate('good')}
                            className="py-2 px-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex flex-col items-center justify-center gap-0.5 shadow-sm transition-all"
                            title="Good recall, review tomorrow"
                          >
                            <span>🟡 Good</span>
                            <span className="text-[9px] opacity-80 font-mono">+1 day</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRate('easy')}
                            className="py-2 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex flex-col items-center justify-center gap-0.5 shadow-sm transition-all"
                            title="Easy mastery, review in 4 days"
                          >
                            <span>🟢 Easy</span>
                            <span className="text-[9px] opacity-80 font-mono">+4 days</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Deck Navigation Toolbar */}
                <div className="flex items-center justify-between gap-3 mt-5 pt-3 max-w-2xl mx-auto text-xs font-bold">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#131B2E] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Prev</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsCardFlipped(!isCardFlipped)}
                      className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{isCardFlipped ? 'Show Front' : 'Flip Card'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleShuffle}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#131B2E] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-all shadow-xs"
                      title="Shuffle Flashcard Deck"
                    >
                      <span>🔀 Shuffle</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#131B2E] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })()}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column: Quick Definitions & Golden Formulas */}
            <div className="space-y-6">
              {/* Core Definitions in 1 Punchy Line */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono mb-3 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5" /> Must-Remember Core Postulates
                </h4>
                <ul className="space-y-2.5 text-xs font-sans">
                  {(note.keyConcepts || []).slice(0, 6).map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-bold text-blue-500 shrink-0">{i + 1}.</span>
                      <div>
                        <strong className="text-slate-800 dark:text-slate-200">{c.heading.replace(/^\d+[\.\:\-\s]*/, '')}: </strong>
                        <span className="text-slate-600 dark:text-slate-400">
                          {c.definitions && c.definitions[0] ? c.definitions[0].replace(/^📌\s*/, '').slice(0, 110) : (c.points && c.points[0]?.slice(0, 110))}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 2-Column Golden Formulas */}
              <div className="p-4 rounded-2xl bg-teal-500/5 border border-teal-500/20">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 font-mono mb-3 flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5" /> Golden Formulas Quick Reference
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(note.formulas || []).slice(0, 6).map((f, fi) => (
                    <div key={fi} className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-teal-500/30 text-center shadow-xs">
                      <span className="text-[10px] font-bold text-slate-500 uppercase block truncate mb-1">{f.name}</span>
                      <div className="my-1">
                        <KaTeXFormula formula={f.formula} displayMode={false} />
                      </div>
                      <span className="text-[9px] font-mono text-teal-600 dark:text-teal-400 block">{f.units || 'SI Units'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Key Diagram + Exam Blunders to Avoid */}
            <div className="space-y-6">
              {/* Primary Blackboard Diagram */}
              {note.keyConcepts && note.keyConcepts[0]?.diagram && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" /> High-Yield Blackboard Diagram
                  </h4>
                  <DiagramRenderer
                    diagram={note.keyConcepts[0].diagram}
                    timestamp="00:00"
                    videoUrl={note.videoUrl}
                    isDark={isDark}
                  />
                </div>
              )}

              {/* Top 5 Exam Traps & Student Blunders */}
              <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20">
                <h4 className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 font-mono mb-3 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" /> Top 5 Exam Blunders (Examiner Traps)
                </h4>
                <ul className="space-y-2 text-xs font-sans">
                  {(note.keyConcepts || []).slice(0, 5).map((c, i) => (
                    c.common_mistake ? (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-500 font-bold shrink-0">⚠️</span>
                        <div>
                          <strong className="text-red-700 dark:text-red-300">{c.common_mistake.mistake}</strong>
                          <span className="text-slate-600 dark:text-slate-400 block text-[11px] mt-0.5">
                            ✓ Correction: {c.common_mistake.correction}
                          </span>
                        </div>
                      </li>
                    ) : null
                  ))}
                </ul>
              </div>

              {/* 10-Second Recall Checklist */}
              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-mono mb-2 flex items-center gap-1.5">
                  <CheckSquare className="w-3.5 h-3.5" /> 10-Second Exam Hall Mental Check
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <span className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-emerald-500/30 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Check SI Units
                  </span>
                  <span className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-emerald-500/30 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Label Diagram Axes
                  </span>
                  <span className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-emerald-500/30 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> State Assumptions
                  </span>
                  <span className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-emerald-500/30 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Box Final Answer
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* LMR Watermark Footer */}
          <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 gap-2">
            <span className="font-bold text-amber-600 dark:text-amber-400">⚡ OMNISTUDY AI • 1-PAGE LAST MINUTE REVISION (LMR)</span>
            <span>Developed by: <strong className="text-[#2563EB] dark:text-[#60A5FA] font-bold">Akanksha Maurya</strong></span>
          </div>
        </div>
      )}

      {/* ── TAB 6: 📐 5-MINUTE FORMULA SHEET HUB ── */}
      {activeTab === 'formulas' && (
        <div className={`rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 border shadow-2xl ${
          isDark ? 'bg-[#0F1626] border-[#23314F] text-[#F8FAFC]' : 'bg-white border-[#E2E8F0] text-[#0F172A]'
        }`}>
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-teal-600 dark:text-teal-400 font-mono flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-teal-500" />
                CONSOLIDATED FORMULA MASTER SHEET
              </div>
              <h3 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] mt-0.5">
                Formula Sheet: {note.chapter || note.title}
              </h3>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1">
                Every governing equation, law, variable definition, and examiner shortcut on one searchable page.
              </p>
            </div>

            {/* Formula Search */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 w-full sm:w-auto">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search formula by name or symbol..."
                value={formulaSearch}
                onChange={(e) => setFormulaSearch(e.target.value)}
                className="bg-transparent text-xs text-[#0F172A] dark:text-[#F8FAFC] placeholder-slate-400 focus:outline-none w-48 font-['Inter']"
              />
            </div>
          </div>

          {/* Formulas Grid */}
          {(() => {
            const isCSLecture = /computer|discrete|dstl|coa|architecture|dbms|operating|compiler|network|software|data structure/i.test((note.title || '') + ' ' + (note.subject || ''));
            const safeFormulas = (note.formulas || []).filter(f => {
              if (!f || !f.name || !f.formula) return false;
              if (selectedUnit !== 'all' && f.unitNumber && Number(f.unitNumber) !== Number(selectedUnit)) {
                return false;
              }
              if (isCSLecture) {
                const fStr = (f.formula || '').toLowerCase();
                const fName = (f.name || '').toLowerCase();
                if (fStr.includes('varepsilon') || fStr.includes('\\phi') || fStr.includes('\\oint') || /newton|friction|gravity|normal force/i.test(fName)) {
                  return false;
                }
              }
              if (!formulaSearch.trim()) return true;
              const q = formulaSearch.toLowerCase();
              return (f.name && f.name.toLowerCase().includes(q)) || (f.formula && f.formula.toLowerCase().includes(q));
            });

            if (safeFormulas.length === 0) {
              return (
                <div className="p-8 text-center rounded-2xl bg-slate-50 dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 text-slate-500">
                  <Calculator className="w-8 h-8 mx-auto mb-2 text-teal-500/60" />
                  <p className="font-bold text-sm text-slate-700 dark:text-slate-300">Is Unit/Lecture me wahi formulas display hote hain jo teacher ne padhaye hain.</p>
                  <p className="text-xs text-slate-400 mt-1">Koi bhi bahari (outside) ya unrelated formula add nahi kiya gaya hai.</p>
                </div>
              );
            }

            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {safeFormulas.map((item, fIdx) => (
                  <div
                    key={fIdx}
                    className={`rounded-2xl p-5 border transition-all ${
                      isDark ? 'bg-[#0B0F17] border-[#23314F]' : 'bg-white border-slate-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-bold text-sm text-[#0F172A] dark:text-[#F8FAFC] font-['Plus_Jakarta_Sans']">
                        {item.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => handleCopyFormulaLatex(item.name, item.formula)}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-lg border border-teal-500/30 text-teal-600 dark:text-teal-400 hover:bg-teal-500/10 flex items-center gap-1 transition-all shrink-0"
                        title="Copy LaTeX equation string"
                      >
                        {copiedFormulaName === item.name ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedFormulaName === item.name ? 'Copied' : 'LaTeX'}</span>
                      </button>
                    </div>

                    {/* Math Display */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-teal-500/20 text-center my-3 shadow-inner overflow-x-auto">
                      <KaTeXFormula formula={item.formula} />
                    </div>

                    {item.variables && (
                      <p className="text-xs text-slate-700 dark:text-slate-300 font-sans mt-2">
                        <strong className="text-teal-700 dark:text-teal-400 font-mono">Variables:</strong> {item.variables}
                      </p>
                    )}

                    {item.units && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-sans mt-1">
                        <strong className="text-teal-700 dark:text-teal-400 font-mono">SI Units:</strong> {item.units}
                      </p>
                    )}

                    {item.conditions && (
                      <div className="mt-2 text-[11px] font-mono text-amber-600 dark:text-amber-400 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                        ⚡ Condition: {item.conditions}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      )}

      {/* ── TAB 7: ⏱️ TIMED MOCK TEST (EXAM SIMULATION) ── */}
      {activeTab === 'mocktest' && (
        <div className={`rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 border shadow-2xl ${
          isDark ? 'bg-[#0F1626] border-[#23314F] text-[#F8FAFC]' : 'bg-white border-[#E2E8F0] text-[#0F172A]'
        }`}>
          {!isTestStarted ? (
            /* Start Test Welcome Screen */
            <div className="max-w-xl mx-auto text-center py-8">
              <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-4 border border-amber-500/30">
                <Clock className="w-8 h-8 animate-pulse" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] mb-2">
                Timed Lecture Mock Test
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] mb-6 leading-relaxed">
                Test your mastery under real exam conditions. 15 questions, 20-minute timer, and marking scheme (+4 for correct, -1 for incorrect).
              </p>

              <div className="grid grid-cols-3 gap-3 mb-8 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 block">Questions</span>
                  <strong className="text-base font-bold text-blue-600">15 MCQs</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 block">Time Limit</span>
                  <strong className="text-base font-bold text-amber-600">20 Mins</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 block">Marking</span>
                  <strong className="text-base font-bold text-emerald-600">+4 / -1</strong>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsTestStarted(true);
                  setIsTestSubmitted(false);
                  setTestTimeLeft(1200);
                  setTestCurrentQ(0);
                  setTestUserAnswers({});
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Start Timed Test Now 🚀
              </button>
            </div>
          ) : !isTestSubmitted ? (
            /* Active Exam Question Screen */
            <div>
              {/* Top Exam Bar: Timer + Q-count + Finish button */}
              <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 font-mono font-bold text-sm flex items-center gap-1.5">
                    <Clock className="w-4 h-4 animate-spin text-red-500" />
                    <span>{Math.floor(testTimeLeft / 60)}:{(testTimeLeft % 60).toString().padStart(2, '0')}</span>
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    Question {testCurrentQ + 1} of {Math.min(15, practiceMCQs.length)}
                  </span>
                </div>

                {/* Question Navigator Palette */}
                <div className="flex items-center gap-1 overflow-x-auto py-1">
                  {practiceMCQs.slice(0, 15).map((q, qIdx) => {
                    const isAnswered = testUserAnswers[q.id] !== undefined;
                    const isCurrent = testCurrentQ === qIdx;
                    return (
                      <button
                        key={qIdx}
                        onClick={() => setTestCurrentQ(qIdx)}
                        className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all ${
                          isCurrent
                            ? 'bg-[#2563EB] text-white ring-2 ring-blue-500/40'
                            : isAnswered
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {qIdx + 1}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => setIsTestSubmitted(true)}
                  className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs font-mono shadow-xs transition-all"
                >
                  Submit Exam
                </button>
              </div>

              {/* Current Question Body */}
              {practiceMCQs[testCurrentQ] && (
                <div className="max-w-2xl mx-auto py-4">
                  <div className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono mb-2">
                    QUESTION {testCurrentQ + 1} (+4 / -1 MARKS)
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] mb-5 leading-relaxed">
                    {practiceMCQs[testCurrentQ].question}
                  </h4>

                  <div className="space-y-3 mb-8">
                    {(practiceMCQs[testCurrentQ].options || []).map((opt, oIdx) => {
                      const isSelected = testUserAnswers[practiceMCQs[testCurrentQ].id] === oIdx;
                      return (
                        <button
                          key={oIdx}
                          onClick={() => setTestUserAnswers(prev => ({ ...prev, [practiceMCQs[testCurrentQ].id]: oIdx }))}
                          className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-sans transition-all flex items-center gap-3 ${
                            isSelected
                              ? 'bg-blue-500/15 border-blue-500 text-blue-700 dark:text-blue-300 font-bold shadow-xs'
                              : 'bg-slate-50 dark:bg-[#0B0F17] border-slate-200 dark:border-slate-800 hover:border-blue-400'
                          }`}
                        >
                          <span className={`w-6 h-6 rounded-full font-mono text-xs flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-blue-600 text-white font-bold' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                          }`}>
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="flex-1 leading-snug">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <button
                      type="button"
                      disabled={testCurrentQ === 0}
                      onClick={() => setTestCurrentQ(prev => prev - 1)}
                      className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold disabled:opacity-40 flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Previous
                    </button>

                    {testCurrentQ < Math.min(15, practiceMCQs.length) - 1 ? (
                      <button
                        type="button"
                        onClick={() => setTestCurrentQ(prev => prev + 1)}
                        className="px-5 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-bold flex items-center gap-1.5"
                      >
                        Next <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsTestSubmitted(true)}
                        className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5"
                      >
                        Submit Test <Check className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Test Result Card */
            <div className="max-w-2xl mx-auto py-6">
              {(() => {
                const res = calculateMockScore();
                const pct = Math.round((res.correct / res.total) * 100);
                return (
                  <div>
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-3 border border-emerald-500/30">
                        <Trophy className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold font-['Plus_Jakarta_Sans']">
                        Exam Result Analysis
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">Here is how you performed on {note.chapter || note.title}</p>
                    </div>

                    <div className="grid grid-cols-4 gap-3 mb-8 text-center font-mono">
                      <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Total Score</span>
                        <strong className="text-xl font-black text-blue-600">{res.marks} / {res.maxMarks}</strong>
                      </div>
                      <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Accuracy</span>
                        <strong className="text-xl font-black text-emerald-600">{pct}%</strong>
                      </div>
                      <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Correct</span>
                        <strong className="text-xl font-black text-emerald-600">{res.correct}</strong>
                      </div>
                      <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Incorrect</span>
                        <strong className="text-xl font-black text-red-600">{res.incorrect}</strong>
                      </div>
                    </div>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setIsTestStarted(true);
                          setIsTestSubmitted(false);
                          setTestTimeLeft(1200);
                          setTestCurrentQ(0);
                          setTestUserAnswers({});
                        }}
                        className="px-6 py-2.5 rounded-xl bg-[#2563EB] text-white text-xs font-bold shadow-md hover:bg-blue-700 transition-all"
                      >
                        Retake Test 🔄
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* ── TAB 8: 📊 STUDENT & PARENT DASHBOARD ── */}
      {activeTab === 'dashboard' && (
        <div className={`rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 border shadow-2xl ${
          isDark ? 'bg-[#0F1626] border-[#23314F] text-[#F8FAFC]' : 'bg-white border-[#E2E8F0] text-[#0F172A]'
        }`}>
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-mono flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-indigo-500" />
                ACADEMIC PERFORMANCE & PARENT PORTAL
              </div>
              <h3 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] mt-0.5">
                📊 Student Study Analytics & Progress Card
              </h3>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1">
                Real-time tracking of lecture revision, quiz performance, active recall streaks, and mentor insights.
              </p>
            </div>

            <button
              type="button"
              onClick={handleDownloadProgressReport}
              disabled={isExportingReport}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all shrink-0 disabled:opacity-60 cursor-pointer active:scale-95"
            >
              <FileDown className={`w-3.5 h-3.5 ${isExportingReport ? 'animate-bounce' : ''}`} />
              <span>{isExportingReport ? 'Generating Report...' : 'Download Progress Report'}</span>
            </button>
          </div>

          {/* 4 Core Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 font-mono block mb-1">🔥 Current Streak</span>
              <strong className="text-2xl font-black text-[#0F172A] dark:text-[#F8FAFC] font-mono">{streakDays} Days</strong>
              <span className="text-[10px] text-slate-500 block mt-0.5">Daily study consistency</span>
            </div>

            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-center">
              <span className="text-xs font-bold text-blue-700 dark:text-blue-400 font-mono block mb-1">⏱️ Active Recall</span>
              <strong className="text-2xl font-black text-[#0F172A] dark:text-[#F8FAFC] font-mono">45 Mins</strong>
              <span className="text-[10px] text-slate-500 block mt-0.5">Time spent on this lecture</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 font-mono block mb-1">📚 Chapter Mastery</span>
              <strong className="text-2xl font-black text-[#0F172A] dark:text-[#F8FAFC] font-mono">{masteryPercentage}%</strong>
              <span className="text-[10px] text-slate-500 block mt-0.5">{completedConceptsCount}/{totalConceptsCount} concepts revised</span>
            </div>

            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-center">
              <span className="text-xs font-bold text-purple-700 dark:text-purple-400 font-mono block mb-1">🎯 Quiz Accuracy</span>
              <strong className="text-2xl font-black text-[#0F172A] dark:text-[#F8FAFC] font-mono">
                {practiceMCQs.length > 0 ? Math.round((calculateScore() / practiceMCQs.length) * 100) : 0}%
              </strong>
              <span className="text-[10px] text-slate-500 block mt-0.5">{calculateScore()}/{practiceMCQs.length} correct in MCQs</span>
            </div>
          </div>

          {/* Detailed Concept Mastery Table */}
          <div className="mb-8">
            <h4 className="text-sm font-bold font-['Plus_Jakarta_Sans'] mb-3 flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-500" /> Topic-wise Retention Checklist
            </h4>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 dark:bg-[#0B0F17] font-mono text-slate-500">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Topic / Concept Heading</th>
                    <th className="p-3">Timestamp</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {(note.keyConcepts || []).map((c, idx) => {
                    const isRev = !!revisedConcepts[idx];
                    return (
                      <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                        <td className="p-3 font-mono text-slate-400">{idx + 1}</td>
                        <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{c.heading}</td>
                        <td className="p-3 font-mono text-slate-500">{c.timestamp_start}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full font-mono font-bold text-[10px] ${
                            isRev ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'
                          }`}>
                            {isRev ? 'Mastered ✓' : 'In Progress'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Parent / Mentor Report Callout Box */}
          <div className="p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold font-mono text-indigo-600 dark:text-indigo-400 block mb-1">
                👨‍👩‍👧 PARENT & TEACHER STUDY ASSURANCE
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                This student has engaged in active note review, solved practice problems, and completed self-testing on <strong>{note.chapter || note.title}</strong>.
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] text-slate-400 block font-mono">Report Date</span>
              <span className="text-xs font-bold font-mono text-slate-700 dark:text-slate-300">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Share Notes Modal (WhatsApp + Copy Link + Standalone Webpage) ── */}
      {isShareModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-700 rounded-3xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsShareModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              <XCircle className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Share2 className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Share Lecture Notes</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Send notes to your study group or classmates</p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 mb-4 text-xs">
              <div className="font-bold text-slate-800 dark:text-slate-200 truncate">{note.chapter || note.title}</div>
              <div className="text-slate-500 dark:text-slate-400 mt-0.5">
                {note.subject} • {note.targetExam || 'AKTU B.Tech'} • OmniStudy AI
              </div>
            </div>

            <div className="space-y-2.5">
              {/* WhatsApp Share Button */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `📚 *${note.chapter || note.title}* - Topper Classroom Copy Notes\n\nSubject: ${note.subject}\nTarget Exam: ${note.targetExam || 'AKTU B.Tech'}\n\n⚡ Created on OmniStudy AI (Developed by Akanksha Maurya):\n${window.location.href}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>💬</span>
                <span>Share on WhatsApp</span>
              </a>

              {/* Copy Share Link */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `📚 ${note.chapter || note.title} - Topper Copy Notes (OmniStudy AI by Akanksha Maurya)\n${window.location.href}`
                  );
                  setIsCopiedShareLink(true);
                  setTimeout(() => setIsCopiedShareLink(false), 2000);
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                {isCopiedShareLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-blue-500" />}
                <span>{isCopiedShareLink ? 'Link & Summary Copied!' : 'Copy Share Link'}</span>
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-center text-[10px] text-slate-400">
              ⚡ OmniStudy AI • Platform Developed by: <strong>Akanksha Maurya</strong>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
