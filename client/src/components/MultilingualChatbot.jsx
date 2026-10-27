import React, { useState, useRef, useEffect } from 'react';
import {
  Send, Bot, User, Sparkles, Image as ImageIcon, X, Trash2,
  Volume2, VolumeX, Copy, Check, RefreshCw, Clock, BookOpen,
  HelpCircle, Lightbulb, CheckCircle2, ChevronRight, AlertCircle, FileText,
  Mic, MicOff
} from 'lucide-react';
import { solveDoubt, solveTimestampTutorApi, fetchTranscriptSnippetApi } from '../services/api';

const MULTILINGUAL_QUICK_PROMPTS = {
  English: [
    { label: "Explain simply with an analogy", prompt: "Explain this topic in super simple terms using an intuitive everyday analogy!" },
    { label: "Exam Memory Trick / Mnemonic", prompt: "Give me a high-yield memory trick or mnemonic to remember this concept for exams." },
    { label: "Step-by-step Numerical Problem", prompt: "Walk me step-by-step through a standard exam numerical problem on this concept." },
    { label: "Common Traps & Mistakes", prompt: "What are the common student traps and pitfalls to avoid when answering exam questions on this?" }
  ],
  Hindi: [
    { label: "सरल हिंदी में समझाइए", prompt: "कृपया इस विषय को दैनिक जीवन के एक सरल उदाहरण के साथ विस्तार से समझाइए।" },
    { label: "परीक्षा याद रखने की ट्रिक", prompt: "परीक्षा के लिए इस टॉपिक को याद रखने की कोई आसान शॉर्टकट ट्रिक या सूत्र बताइए।" },
    { label: "स्टेप-बाय-स्टेप न्यूमेरिकल हल", prompt: "इस सिद्धांत पर आधारित एक महत्वपूर्ण परीक्षा न्यूमेरिकल प्रश्न चरणबद्ध तरीके से हल करें।" },
    { label: "सामान्य गलतियाँ जो न करें", prompt: "परीक्षा में छात्र इस टॉपिक में क्या सामान्य गलतियाँ करते हैं और उनसे कैसे बचें?" }
  ],
  Hinglish: [
    { label: "Bhai simple Hinglish me samjha do", prompt: "Mujhe ye topic super simple bhasha me real life example ke saath samjha do bhai!" },
    { label: "Exam Memory Trick / Mnemonic do", prompt: "Is topic ko exam tak yaad rakhne ke liye koi solid shortcut trick ya mnemonic batao!" },
    { label: "Step-by-step Numerical Example", prompt: "Is concept par ek standard exam numerical question step-by-step formula explain karte hue solve karo." },
    { label: "Common Mistakes to Avoid in Exam", prompt: "Students is concept ke questions me sabse zyada kya silly mistake karte hain? Exam alert points batao." }
  ]
};

const QUICK_PROMPTS = MULTILINGUAL_QUICK_PROMPTS.Hinglish;

/**
 * Rich Text & KaTeX Renderer for Mathematical Expressions & Code
 */
function RichMessageContent({ text }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;

    if (window.katex) {
      try {
        const mathBlocks = containerRef.current.querySelectorAll('.latex-render');
        mathBlocks.forEach(elem => {
          const formula = elem.getAttribute('data-formula');
          const isDisplay = elem.getAttribute('data-display') === 'true';
          if (formula) {
            window.katex.render(formula, elem, {
              throwOnError: false,
              displayMode: isDisplay
            });
          }
        });
      } catch (e) {
        console.warn('KaTeX render warning:', e);
      }
    }
  }, [text]);

  if (!text) return null;

  // Process text to identify inline and display LaTeX math: \(...\) and \[...\] or $$...$$
  const parts = [];
  let remaining = text;
  let keyIdx = 0;

  // Regex to match display math \[...\] or $$...$$, and inline math \(...\) or $...$
  const mathRegex = /(\\\[[\s\S]*?\\\]|\$\$[\s\S]*?\$\$|\\\([\s\S]*?\\\)|\$[^$\n]+\$)/g;
  let lastIndex = 0;
  let match;

  while ((match = mathRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: text.substring(lastIndex, match.index),
        key: `txt-${keyIdx++}`
      });
    }

    const rawMath = match[0];
    const isDisplay = rawMath.startsWith('\\[') || rawMath.startsWith('$$');
    let formula = rawMath;
    if (rawMath.startsWith('\\[')) formula = rawMath.slice(2, -2);
    else if (rawMath.startsWith('$$')) formula = rawMath.slice(2, -2);
    else if (rawMath.startsWith('\\(')) formula = rawMath.slice(2, -2);
    else if (rawMath.startsWith('$')) formula = rawMath.slice(1, -1);

    parts.push({
      type: 'math',
      formula: formula.trim(),
      isDisplay,
      key: `math-${keyIdx++}`
    });

    lastIndex = match.index + rawMath.length;
  }

  if (lastIndex < text.length) {
    parts.push({
      type: 'text',
      content: text.substring(lastIndex),
      key: `txt-${keyIdx++}`
    });
  }

  return (
    <div ref={containerRef} className="font-sans leading-relaxed whitespace-pre-wrap">
      {parts.map(part => {
        if (part.type === 'math') {
          return (
            <span
              key={part.key}
              data-formula={part.formula}
              data-display={part.isDisplay ? 'true' : 'false'}
              className={`latex-render ${part.isDisplay ? 'block my-2 overflow-x-auto text-center' : 'inline px-1 font-mono font-bold'}`}
            >
              {part.formula}
            </span>
          );
        }
        return <span key={part.key}>{part.content}</span>;
      })}
    </div>
  );
}

export default function MultilingualChatbot({
  currentNote,
  selectedLang = 'English',
  onChangeLanguage,
  theme = 'system',
  isDark = false,
  timestampTutorPrefill = null,
  onClearTimestampPrefill
}) {
  const getGreeting = (lang) => {
    const l = (lang || 'Hinglish').toLowerCase();
    if (l.includes('hindi')) {
      return `नमस्ते! मैं आपका OmniStudy AI पर्सनल डाउट सॉल्वर और टाइमस्टैम्प ट्यूटर हूँ। 🎓\n\n- यदि आप वीडियो लेक्चर देख रहे हैं और किसी खास टाइमस्टैम्प (जैसे [12:35]) पर कुछ समझ नहीं आया, तो "⏱️ Timestamp AI Tutor" टैब चुनें।\n- किसी भी सामान्य प्रश्न या न्यूमेरिकल की फोटो अपलोड करके समाधान पूछने के लिए "💬 General Doubt" में पूछें!\n\nआज आपकी क्या सहायता करूँ?`;
    }
    if (l.includes('eng')) {
      return `Hello! I am your OmniStudy AI Personal Doubt Solver & Timestamp Tutor. 🎓\n\n- Watching a YouTube lecture and stuck at a particular timestamp (e.g. [12:35])? Switch to the "⏱️ Timestamp AI Tutor" tab for focused breakdown!\n- Or ask any academic question, derivation, or upload a photo in "💬 General Doubt".\n\nHow can I help you today?`;
    }
    return `Namaste! Main aapka OmniStudy AI Personal Doubt Solver & Timestamp Tutor hoon. 🎓\n\n- Agar aap lecture dekh rahe the aur kisi specific timestamp (jaise [12:35]) par samajh nahi aaya, toh "⏱️ Timestamp AI Tutor" tab select karke us hisse ka step-by-step breakdown paayein!\n- Normal doubts ya question photos ke liye "💬 General Doubt" use karein.\n\nKaise help karoon aaj?`;
  };

  // Chat Mode: 'general' | 'timestamp'
  const [activeMode, setActiveMode] = useState('general');

  // Timestamp Tutor form state
  const [tutorVideoTitle, setTutorVideoTitle] = useState(currentNote?.title || '');
  const [tutorTimestamp, setTutorTimestamp] = useState('00:00');
  const [tutorTranscript, setTutorTranscript] = useState('');
  const [tutorDoubt, setTutorDoubt] = useState('');

  // Handle immediate chat greeting update on language toggle
  const prevLangRef = useRef(selectedLang);
  useEffect(() => {
    if (prevLangRef.current !== selectedLang) {
      prevLangRef.current = selectedLang;
      const langNotice = selectedLang === 'Hindi'
        ? '🌐 भाषा बदलकर "हिंदी (Devanagari)" कर दी गई है। अब आप प्रश्न हिंदी में पूछ सकते हैं!'
        : selectedLang === 'English'
        ? '🌐 Language switched to "English". AI Tutor will now reply in English!'
        : '🌐 Language switched to "Hinglish". Ab AI tutor aapse natural Hinglish me baat karega!';
      
      setMessages(prev => {
        if (prev.length <= 1 && prev[0]?.sender === 'ai') {
          return [{
            sender: 'ai',
            text: getGreeting(selectedLang),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isTimestampTutor: false
          }];
        }
        return [
          ...prev,
          {
            sender: 'ai',
            text: langNotice,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isSystemNotice: true
          }
        ];
      });
    }
  }, [selectedLang]);
  const [isFetchingSnippet, setIsFetchingSnippet] = useState(false);

  // General Chat state
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: getGreeting(selectedLang),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isTimestampTutor: false
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('AI Tutor is thinking...');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [speakingIdx, setSpeakingIdx] = useState(null);
  const [isListening, setIsListening] = useState(false);

  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Voice Doubt (Speech Recognition)
  const handleToggleListening = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = (selectedLang || '').toLowerCase().includes('hindi') ? 'hi-IN' : 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.warn('Speech recognition start failed:', err);
      setIsListening(false);
    }
  };

  // Sync title when currentNote changes
  useEffect(() => {
    if (currentNote?.title && (!tutorVideoTitle || tutorVideoTitle === 'YouTube Lecture')) {
      setTutorVideoTitle(currentNote.title);
    }
  }, [currentNote]);

  // Handle incoming prefill from NotebookNotesView
  useEffect(() => {
    if (timestampTutorPrefill) {
      setActiveMode('timestamp');
      if (timestampTutorPrefill.timestamp) {
        setTutorTimestamp(timestampTutorPrefill.timestamp);
      }
      if (timestampTutorPrefill.videoTitle) {
        setTutorVideoTitle(timestampTutorPrefill.videoTitle);
      } else if (currentNote?.title) {
        setTutorVideoTitle(currentNote.title);
      }
      if (timestampTutorPrefill.context) {
        setTutorTranscript(timestampTutorPrefill.context);
      }
      if (timestampTutorPrefill.topic) {
        setTutorDoubt(`Mujhe is topic "${timestampTutorPrefill.topic}" me confusion hai. Please step-by-step samjhao.`);
      }
      if (onClearTimestampPrefill) {
        onClearTimestampPrefill();
      }
    }
  }, [timestampTutorPrefill]);

  const isInitialChat = useRef(true);
  useEffect(() => {
    if (isInitialChat.current) {
      isInitialChat.current = false;
      return;
    }
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Handle image file selection
  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, JPEG, WebP).');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      alert('Image size exceeds 15MB. Please choose a smaller photo.');
      return;
    }

    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Auto-fetch transcript snippet from current video
  const handleAutoFetchTranscript = async () => {
    const targetId = currentNote?.videoId || currentNote?.videoUrl;
    if (!targetId) {
      alert('Please load a YouTube video first, or paste the transcript snippet manually.');
      return;
    }

    setIsFetchingSnippet(true);
    try {
      const data = await fetchTranscriptSnippetApi(targetId, tutorTimestamp || '00:00');
      if (data.snippet) {
        setTutorTranscript(data.snippet);
      } else {
        alert('Could not find transcript snippet for this timestamp. You can paste the transcript text directly in the box below.');
      }
    } catch (err) {
      console.warn('Transcript snippet fetch error:', err.message);
      alert('Could not fetch automatic transcript. Please paste the transcript text manually.');
    } finally {
      setIsFetchingSnippet(false);
    }
  };

  // Submit Timestamp Tutor Query
  const handleSendTimestampTutor = async (e) => {
    if (e) e.preventDefault();
    if (loading) return;

    const ts = tutorTimestamp.trim() || '00:00';
    const title = tutorVideoTitle.trim() || currentNote?.title || 'YouTube Lecture';
    const transcript = tutorTranscript.trim();
    const doubt = tutorDoubt.trim();

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userText = `⏱️ [Timestamp: ${ts}]\nVideo: "${title}"\n${doubt ? `Doubt: ${doubt}\n` : ''}${transcript ? `Transcript context:\n"${transcript.slice(0, 160)}..."` : ''}`;

    setMessages(prev => [
      ...prev,
      {
        sender: 'user',
        text: userText,
        time,
        timestamp: ts
      }
    ]);

    setLoading(true);
    setLoadingText(`AI Tutor is breaking down timestamp [${ts}] step-by-step with why-reasoning & analogies...`);

    try {
      const res = await solveTimestampTutorApi({
        videoTitle: title,
        timestamp: ts,
        transcriptSnippet: transcript,
        studentDoubt: doubt,
        language: selectedLang,
        videoId: currentNote?.videoId,
        videoUrl: currentNote?.videoUrl
      });

      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: res.answer,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isTimestampTutor: true,
          timestamp: ts
        }
      ]);

      // Clear student doubt box after sending
      setTutorDoubt('');
    } catch (err) {
      console.warn('Timestamp tutor query error:', err.message);
      const fallbackMsg = `[Timestamp ${ts}]:\nTeacher is explaining the key derivation step at this moment.\n- Why this step: We maintain dimensional consistency and boundary conditions.\n- Real-life Analogy: Think of it like balancing a seesaw — whatever weight you add on one side must be counterbalanced.\n- Check Question: Can you tell what happens to the result if the initial parameter becomes zero?`;
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: fallbackMsg,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isTimestampTutor: true,
          timestamp: ts
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Send general question or photo
  const handleSendGeneral = async (customPrompt) => {
    const query = customPrompt || input;
    if ((!query.trim() && !imagePreview) || loading) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      sender: 'user',
      text: query,
      image: imagePreview,
      time
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customPrompt) setInput('');
    const currentImgData = imagePreview;
    const currentMime = selectedImage?.type || 'image/jpeg';
    handleRemoveImage();
    setLoading(true);
    setLoadingText('AI Tutor is formulating step-by-step solution with formulas & diagrams...');

    try {
      const context = currentNote ? {
        title: currentNote.title,
        overview: currentNote.overview,
        chapter: currentNote.chapter,
        subject: currentNote.subject,
        targetExam: currentNote.targetExam,
        videoId: currentNote.videoId
      } : null;

      const res = await solveDoubt(query, context, selectedLang, currentImgData, currentMime);
      setMessages(prev => [...prev, {
        sender: 'ai',
        text: res.answer,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (err) {
      console.warn('Doubt solver error:', err.message);
      const errorDetail = err.response?.data?.error || err.message;
      let displayMsg = '';
      if (/quota|429/i.test(errorDetail)) {
        displayMsg = '⚠️ Gemini API Quota Limit reach ho gaya hai. Please 30 seconds wait karein aur fir se doubt poochhein.';
      } else if (/network|offline|failed to fetch/i.test(errorDetail)) {
        displayMsg = '🌐 Server connection issue: Please check internet connection or backend server status.';
      } else {
        displayMsg = `[OmniStudy AI Tutor]:\n- Core intuition: Pehle given parameters aur physical boundary conditions check karein.\n- Step-by-Step: Given values ko standard SI units me convert karke governing equation apply karein.\n- Exam Tip: Option elimination aur dimensional analysis se answer verify karein!\n\n(AI Tutor Notice: ${errorDetail || 'Response generated'})`;
      }
      setMessages(prev => [...prev, {
        sender: 'ai',
        text: displayMsg,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(index);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleSpeak = (text, index) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingIdx === index) {
      window.speechSynthesis.cancel();
      setSpeakingIdx(null);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.replace(/\\\[|\\\]|\\\(|\\\)/g, ''));
      utterance.rate = 1.0;
      const l = (selectedLang || 'Hinglish').toLowerCase();
      const voices = window.speechSynthesis.getVoices();
      if (l.includes('hindi')) {
        utterance.lang = 'hi-IN';
        const hiVoice = voices.find(v => v.lang.includes('hi') || /hindi/i.test(v.name));
        if (hiVoice) utterance.voice = hiVoice;
      } else if (l.includes('hinglish')) {
        utterance.lang = 'en-IN';
        const inVoice = voices.find(v => v.lang === 'en-IN' || /india|heera|neerja|swara|ravi/i.test(v.name)) ||
                        voices.find(v => v.lang.includes('hi') || /hindi/i.test(v.name));
        if (inVoice) utterance.voice = inVoice;
      } else {
        utterance.lang = 'en-US';
        const enVoice = voices.find(v => v.lang === 'en-US' || v.lang.startsWith('en'));
        if (enVoice) utterance.voice = enVoice;
      }
      utterance.onend = () => setSpeakingIdx(null);
      utterance.onerror = () => setSpeakingIdx(null);
      window.speechSynthesis.speak(utterance);
      setSpeakingIdx(index);
    }
  };

  const handleClearChat = () => {
    if (confirm('Clear chat history?')) {
      setMessages([
        {
          sender: 'ai',
          text: getGreeting(selectedLang),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  // Quick timestamp suggestion chips from note concepts
  const availableTimestamps = (currentNote?.keyConcepts || [])
    .map(c => c.timestamp_start)
    .filter(Boolean)
    .slice(0, 6);

  return (
    <div className="max-w-5xl mx-auto my-6 sm:my-8 px-3 sm:px-4">

      {/* ── Chatbot Header & Mode Switcher ── */}
      <div className="p-4 sm:p-5 rounded-2xl border shadow-sm mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-[#131B2E] border-[#E2E8F0] dark:border-[#23314F] transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#2563EB] dark:bg-[#3B82F6] flex items-center justify-center text-white font-bold shadow-sm shrink-0">
            {activeMode === 'timestamp' ? <Clock className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-sm sm:text-base text-[#0F172A] dark:text-[#F8FAFC] font-['Plus_Jakarta_Sans']">
                {activeMode === 'timestamp' ? 'YouTube Timestamp AI Tutor' : 'AI Multimodal Doubt Solver'}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#EFF6FF] dark:bg-[#3B82F6]/20 text-[#2563EB] dark:text-[#60A5FA] font-bold border border-[#2563EB]/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] dark:bg-[#3B82F6]" />
                {activeMode === 'timestamp' ? 'Timestamp Focused Why-Solver' : 'Text + Image Question Solver'}
              </span>
            </div>

            <div className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1 flex items-center gap-2 flex-wrap">
              <span>Context: <strong className="text-[#0F172A] dark:text-[#F8FAFC] truncate max-w-xs inline-block align-bottom">{currentNote ? currentNote.title : 'General Academic Doubt'}</strong></span>
            </div>
          </div>
        </div>

        {/* Mode Switch Pills & Clear */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end">
          <div className="flex items-center gap-1.5 p-1 rounded-full border border-[#E2E8F0] dark:border-[#23314F] bg-[#F1F5F9] dark:bg-[#0B0F17] shadow-inner">
            <button
              type="button"
              onClick={() => setActiveMode('general')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeMode === 'general'
                  ? 'bg-white dark:bg-[#1B2640] text-[#2563EB] dark:text-[#60A5FA] shadow-xs'
                  : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>💬 General Doubt</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMode('timestamp')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeMode === 'timestamp'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs'
                  : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>⏱️ Timestamp Tutor</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleClearChat}
            className="p-2 rounded-xl border border-[#E2E8F0] dark:border-[#23314F] text-slate-400 hover:text-red-500 hover:bg-slate-50 dark:hover:bg-[#1B2640] transition-all cursor-pointer"
            title="Clear Conversation"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Timestamp Tutor Dedicated Interactive Panel ── */}
      {activeMode === 'timestamp' && (
        <div className="mb-4 p-4 sm:p-5 rounded-2xl border bg-gradient-to-b from-amber-500/5 to-transparent border-amber-500/20 dark:border-amber-500/30 shadow-sm animate-fade-slide-up">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
              <h4 className="font-bold text-sm text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-1.5">
                <span>YouTube Specific Timestamp Doubt Resolver</span>
              </h4>
            </div>
            <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
              Rule-Guided AI Tutor
            </span>
          </div>

          <form onSubmit={handleSendTimestampTutor} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Video Title */}
              <div className="md:col-span-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 font-mono">
                  1. Video Title / Topic:
                </label>
                <input
                  type="text"
                  value={tutorVideoTitle}
                  onChange={(e) => setTutorVideoTitle(e.target.value)}
                  placeholder="e.g. Physics Work Power Energy Lecture 3"
                  className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B0F17] text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Timestamp */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 font-mono">
                  2. Timestamp (e.g. 12:35):
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={tutorTimestamp}
                    onChange={(e) => setTutorTimestamp(e.target.value)}
                    placeholder="12:35"
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl font-mono font-bold border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B0F17] text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-amber-500 text-center"
                  />
                  {currentNote?.videoId && (
                    <button
                      type="button"
                      onClick={handleAutoFetchTranscript}
                      disabled={isFetchingSnippet}
                      className="px-2.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-[11px] font-bold flex items-center gap-1 shrink-0 transition-all"
                      title="Fetch transcript from video around this timestamp"
                    >
                      {isFetchingSnippet ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                      <span className="hidden sm:inline">Fetch</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Timestamp Chips from current video */}
            {availableTimestamps.length > 0 && (
              <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0 font-mono">Suggested Timestamps:</span>
                {availableTimestamps.map((ts, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setTutorTimestamp(ts);
                      handleAutoFetchTranscript();
                    }}
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold transition-all shrink-0"
                  >
                    [{ts}]
                  </button>
                ))}
              </div>
            )}

            {/* Transcript Snippet */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                  3. Transcript Around Timestamp (auto-generated / speech text):
                </label>
                <span className="text-[10px] text-slate-400 italic">Typos are handled automatically</span>
              </div>
              <textarea
                rows={2}
                value={tutorTranscript}
                onChange={(e) => setTutorTranscript(e.target.value)}
                placeholder="[12:20] teacher: ab hum dekhte hain ki agar mass m ho toh... [12:35] humne formula apply kiya F = ma..."
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B0F17] text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            {/* Student Doubt Input & Action */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
              <input
                type="text"
                value={tutorDoubt}
                onChange={(e) => setTutorDoubt(e.target.value)}
                placeholder="Aapka doubt? (optional: e.g. Teacher ne step 2 me minus sign kyu liya?)"
                className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B0F17] text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-amber-500"
              />

              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Clock className="w-4 h-4" />}
                <span>Samjhao AI Tutor</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Main Chat Stream ── */}
      <div className="rounded-2xl border shadow-sm h-[580px] flex flex-col p-4 md:p-6 overflow-hidden bg-white dark:bg-[#131B2E] border-[#E2E8F0] dark:border-[#23314F]">

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-[#0F172A] dark:bg-slate-700 text-white font-bold'
                    : msg.isTimestampTutor
                    ? 'bg-amber-500 text-white font-bold'
                    : 'bg-[#EFF6FF] dark:bg-[#3B82F6]/20 text-[#2563EB] dark:text-[#60A5FA]'
                }`}
              >
                {msg.sender === 'user' ? (
                  <User className="w-4 h-4" />
                ) : msg.isTimestampTutor ? (
                  <Clock className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] md:max-w-[80%] rounded-2xl p-4 text-xs md:text-sm leading-relaxed relative group shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-[#2563EB] dark:bg-[#3B82F6] text-white font-medium rounded-tr-none'
                    : 'bg-[#F8FAFC] dark:bg-[#0B0F17] border border-[#E2E8F0] dark:border-[#23314F] text-[#0F172A] dark:text-[#F8FAFC] rounded-tl-none'
                }`}
              >
                {/* Header Badge if from Timestamp AI Tutor */}
                {msg.sender === 'ai' && msg.isTimestampTutor && (
                  <div className="mb-2 pb-1.5 border-b border-amber-500/20 flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Timestamp Tutor [{msg.timestamp || 'Focus'}]
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Step-by-step why & analogy</span>
                  </div>
                )}

                {/* Attached Image if user sent photo */}
                {msg.image && (
                  <div className="mb-2.5 rounded-xl overflow-hidden border border-white/20 max-w-xs">
                    <img src={msg.image} alt="User question" className="w-full max-h-48 object-cover" />
                  </div>
                )}

                {/* Rich LaTeX & Formatted Text */}
                <RichMessageContent text={msg.text} />

                {/* Footer bar with time & audio/copy */}
                <div className="flex items-center justify-between gap-3 mt-2.5 pt-2 border-t border-black/5 dark:border-white/10 text-[10px] opacity-75 font-mono">
                  <span>{msg.time || 'Just now'}</span>

                  {msg.sender === 'ai' && (
                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleSpeak(msg.text, idx)}
                        className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-[#64748B] dark:text-[#CBD5E1] transition-colors"
                        title="Listen to explanation"
                      >
                        {speakingIdx === idx ? <VolumeX className="w-3.5 h-3.5 text-[#2563EB]" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => handleCopy(msg.text, idx)}
                        className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-[#64748B] dark:text-[#CBD5E1] transition-colors"
                        title="Copy text"
                      >
                        {copiedIdx === idx ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] dark:bg-[#3B82F6]/20 flex items-center justify-center text-[#2563EB] shrink-0">
                <RefreshCw className="w-4 h-4 animate-spin text-[#2563EB] dark:text-[#60A5FA]" />
              </div>
              <div className="rounded-2xl rounded-tl-none p-3.5 text-xs flex items-center gap-2 border border-[#E2E8F0] dark:border-[#23314F] bg-[#F8FAFC] dark:bg-[#0B0F17] text-[#475569] dark:text-[#CBD5E1]">
                <Clock className="w-3.5 h-3.5 animate-pulse text-amber-500" />
                <span>{loadingText}</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* ── Image Upload Preview Tray ── */}
        {imagePreview && (
          <div className="p-2.5 mb-2 rounded-xl border border-[#2563EB]/40 bg-[#EFF6FF] dark:bg-[#1B2640] flex items-center justify-between gap-3 animate-fade-slide-up">
            <div className="flex items-center gap-2.5">
              <img src={imagePreview} alt="Question preview" className="w-12 h-12 rounded-lg object-cover border border-[#2563EB]/30" />
              <div className="text-xs">
                <span className="font-bold text-[#0F172A] dark:text-[#F8FAFC] block">Question Photo Attached</span>
                <span className="text-[10px] text-[#64748B] dark:text-[#94A3B8]">Ready to solve with lecture context</span>
              </div>
            </div>
            <button
              onClick={handleRemoveImage}
              className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-white dark:hover:bg-slate-800 transition-colors"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── Quick Prompt Chips (General Mode) ── */}
        {activeMode === 'general' && (
          <div className="pt-2 border-t border-[#E2E8F0] dark:border-[#23314F] my-2">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0 font-mono flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#2563EB]" />
                <span>Suggested:</span>
              </span>
              {(MULTILINGUAL_QUICK_PROMPTS[selectedLang] || QUICK_PROMPTS).map((item, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleSendGeneral(item.prompt)}
                  disabled={loading}
                  className="text-[11px] font-semibold px-3 py-1.5 rounded-xl border border-[#E2E8F0] dark:border-[#23314F] bg-white dark:bg-[#1B2640] hover:bg-[#EFF6FF] dark:hover:bg-[#2563EB]/20 text-[#334155] dark:text-[#CBD5E1] hover:text-[#2563EB] dark:hover:text-[#60A5FA] hover:border-[#2563EB]/40 transition-all whitespace-nowrap shrink-0 shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Input Bar with Photo Upload ── */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (activeMode === 'timestamp') {
              setTutorDoubt(input);
              handleSendTimestampTutor();
              setInput('');
            } else {
              handleSendGeneral();
            }
          }}
          className="flex items-center gap-2 p-1.5 rounded-xl border border-[#E2E8F0] dark:border-[#23314F] bg-[#F8FAFC] dark:bg-[#0B0F17] focus-within:bg-white dark:focus-within:bg-[#0B0F17] focus-within:border-[#2563EB] focus-within:ring-4 focus-within:ring-[#2563EB]/15 transition-all mt-2"
        >
          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            accept="image/*"
            className="hidden"
          />

          {/* Photo Upload Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-lg text-slate-500 hover:text-[#2563EB] dark:hover:text-[#60A5FA] hover:bg-slate-100 dark:hover:bg-[#1B2640] transition-colors shrink-0"
            title="Upload photo of question from notebook/book"
          >
            <ImageIcon className="w-4 h-4" />
          </button>

          {/* Voice Doubt (Microphone) Button */}
          <button
            type="button"
            onClick={handleToggleListening}
            className={`p-2 rounded-lg transition-all shrink-0 ${
              isListening
                ? 'bg-red-500 text-white animate-pulse shadow-md shadow-red-500/30'
                : 'text-slate-500 hover:text-emerald-500 hover:bg-slate-100 dark:hover:bg-[#1B2640]'
            }`}
            title={isListening ? "Listening... Click to stop speaking" : "Voice Doubt: Speak in Hindi or English"}
          >
            {isListening ? <MicOff className="w-4 h-4 animate-spin" /> : <Mic className="w-4 h-4" />}
          </button>

          <input
            type="text"
            placeholder={
              activeMode === 'timestamp'
                ? `Is timestamp [${tutorTimestamp || '00:00'}] pe kya doubt hai? Ask in ${selectedLang}...`
                : imagePreview
                ? "Add specific instructions for this photo... (optional)"
                : `Ask any doubt in ${selectedLang}... (e.g. solve step by step)`
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="w-full bg-transparent text-xs md:text-sm px-2 text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none placeholder-slate-400 dark:placeholder-slate-500 font-['Inter']"
          />

          <button
            type="submit"
            disabled={loading || (!input.trim() && !imagePreview && activeMode !== 'timestamp')}
            className={`p-2.5 rounded-lg text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] shadow-sm shrink-0 ${
              activeMode === 'timestamp'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'
                : 'bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB]'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

    </div>
  );
}