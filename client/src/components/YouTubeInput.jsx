import React, { useState, useRef } from 'react';
import {
  ArrowRight, Loader2, Clipboard, AlertCircle, Sparkles, Youtube, Check, ChevronDown, Clock,
  Cpu, Atom, Network, BookOpen, Play, Target, CheckCircle2
} from 'lucide-react';

const PRESET_ICONS = {
  Cpu,
  Atom,
  Network,
  BookOpen,
};

const PRESET_VIDEOS = [
  {
    id: 'coa-unit-1',
    title: "COA Unit 1: Computer Organization & Architecture",
    subject: "CS",
    subjectFull: "Computer Science",
    iconName: "Cpu",
    exam: "AKTU B.Tech / GATE CS",
    duration: "1 hr 27m",
    channel: "Gate Smashers",
    badgeText: "Architecture",
    highlights: ["Blackboard SVGs", "Solved PYQs"],
    url: 'https://www.youtube.com/watch?v=coa-unit-1',
    headerBg: 'from-slate-900 via-[#0F1E3D] to-slate-900',
    iconColor: 'text-sky-400',
    glowColor: 'bg-sky-500/20',
    badgeBg: 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border-sky-200/60 dark:border-sky-800/60',
  },
  {
    id: 'kKKM8Y-u7ds',
    title: "Newton's Laws of Motion & Friction — Complete Derivations",
    subject: "Physics",
    subjectFull: "Physics",
    iconName: "Atom",
    exam: "JEE Main & Class 11",
    duration: "45 mins",
    channel: "Physics Galaxy",
    badgeText: "Derivations",
    highlights: ["Free Body Diagrams", "Core Formulas"],
    url: 'https://www.youtube.com/watch?v=kKKM8Y-u7ds',
    headerBg: 'from-slate-900 via-[#1E1238] to-slate-900',
    iconColor: 'text-purple-400',
    glowColor: 'bg-purple-500/20',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200/60 dark:border-purple-800/60',
  },
  {
    id: 'RBSGKlAoi3w',
    title: "Binary Trees, BST & Tree Traversals Masterclass",
    subject: "DSA",
    subjectFull: "Data Structures",
    iconName: "Network",
    exam: "GATE & University",
    duration: "52 mins",
    channel: "Striver",
    badgeText: "Algorithms",
    highlights: ["Visual Tree Nodes", "Top 20 MCQs"],
    url: 'https://www.youtube.com/watch?v=RBSGKlAoi3w',
    headerBg: 'from-slate-900 via-[#0C2424] to-slate-900',
    iconColor: 'text-emerald-400',
    glowColor: 'bg-emerald-500/20',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/60',
  },
  {
    id: 'dstl-full-playlist-ebook',
    title: "DSTL Discrete Mathematics Master E-Book",
    subject: "Maths",
    subjectFull: "Mathematics",
    iconName: "BookOpen",
    exam: "AKTU — All 5 Units",
    duration: "Full Playlist",
    channel: "Full Subject Series",
    badgeText: "Master E-Book",
    highlights: ["All 5 Units", "Formula Hub"],
    url: 'https://www.youtube.com/playlist?list=PLdstl-units-1-to-5-full-subject-ebook',
    headerBg: 'from-slate-900 via-[#26152B] to-slate-900',
    iconColor: 'text-rose-400',
    glowColor: 'bg-rose-500/20',
    badgeBg: 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200/60 dark:border-rose-800/60',
  }
];

// First 5 visible chips; rest go in "More" dropdown
const EXAM_OPTIONS_PRIMARY = [
  "Auto-detect",
  "AKTU B.Tech",
  "JEE Main / Adv",
  "NEET",
  "GATE",
];
const EXAM_OPTIONS_MORE = [
  "CBSE 9-12",
  "SSC",
  "State boards",
  "College",
  "Other",
];
const ALL_EXAM_OPTIONS = [...EXAM_OPTIONS_PRIMARY, ...EXAM_OPTIONS_MORE];

const PROGRESS_STEPS = [
  "Part 1 of 8: Fetching lecture metadata, board frames & audio track...",
  "Part 2 of 8: Splitting into 10-15 min overlapping thematic segments...",
  "Part 3 of 8: Extracting blackboard text, equations, derivations & teacher tips...",
  "Part 4 of 8: Generating clean labelled SVGs and standard textbook diagrams...",
  "Part 5 of 8: Formatting KaTeX mathematical equations & comparison tables...",
  "Part 6 of 8: Running verification pass against transcript to ensure zero missed topics...",
  "Part 7 of 8: Curating TOP 5 exam PYQs with step-by-step solutions & elimination tricks...",
  "Part 8 of 8: Finalizing student copy notebook, interactive mind map & audio summary...",
];

export default function YouTubeInput({
  onProcessVideo,
  isLoading,
  error,
  theme = 'system',
  isDark = false
}) {
  const [url, setUrl] = useState('');
  const [inputMode, setInputMode] = useState('lecture'); // 'lecture' | 'playlist'
  const [selectedExam, setSelectedExam] = useState('Auto-detect');
  const [otherExamText, setOtherExamText] = useState('');
  const [stepIdx, setStepIdx] = useState(0);
  const [copiedPaste, setCopiedPaste] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [moreCoords, setMoreCoords] = useState(null);
  const moreRef = useRef(null);
  const inputRef = useRef(null);

  const toggleMore = () => {
    if (!moreOpen && moreRef.current) {
      const rect = moreRef.current.getBoundingClientRect();
      setMoreCoords({
        top: rect.bottom + 6,
        left: Math.max(16, Math.min(rect.left, window.innerWidth - 170))
      });
    }
    setMoreOpen(prev => !prev);
  };

  // Close "More" dropdown on outside click or scroll on mobile
  React.useEffect(() => {
    if (!moreOpen) return;
    const handler = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };
    const closeOnScroll = () => {
      if (window.innerWidth < 768) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    window.addEventListener('scroll', closeOnScroll, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handler);
      window.removeEventListener('scroll', closeOnScroll);
    };
  }, [moreOpen]);

  // Cycle progress steps during generation
  React.useEffect(() => {
    if (!isLoading) {
      setStepIdx(0);
      return;
    }
    const interval = setInterval(() => {
      setStepIdx(prev => (prev + 1) % PROGRESS_STEPS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) {
      if (inputRef.current) inputRef.current.focus();
      return;
    }
    const finalExam = selectedExam === 'Other'
      ? (otherExamText.trim() || 'Other Exam')
      : selectedExam;
    onProcessVideo(url.trim(), finalExam, 'detailed', null);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text.trim());
        setCopiedPaste(true);
        setTimeout(() => setCopiedPaste(false), 1500);
      }
    } catch (err) {}
  };

  const handlePresetSelect = (preset) => {
    setUrl(preset.url);
    const finalExam = selectedExam === 'Other' ? (otherExamText.trim() || 'Other Exam') : selectedExam;
    onProcessVideo(preset.url, finalExam, 'detailed', null);
    setTimeout(() => {
      const el = document.getElementById('student-notes-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 120);
  };

  const isPlaylist = inputMode === 'playlist' || url.includes('list=');

  return (
    <div className="max-w-4xl mx-auto my-4 sm:my-10 px-3 sm:px-4 w-full">

      {/* ── Hero ── */}
      <div className="text-center mb-8 sm:mb-10 relative">
        {/* Soft radial glow behind hero */}
        <div className="absolute inset-0 -top-8 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <div className="w-[600px] h-[200px] bg-indigo-400/10 dark:bg-indigo-500/8 rounded-full blur-3xl" />
        </div>
        <h1 className="relative text-[28px] md:text-[3.5rem] font-extrabold text-[#0F172A] dark:text-[#F8FAFC] font-['Plus_Jakarta_Sans'] tracking-tight leading-[1.2] md:leading-[1.1] text-center mb-4">
          YouTube Lecture to{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-blue-500 to-violet-600 bg-clip-text text-transparent">
            Student Copy Notes
          </span>
        </h1>
        <p className="relative text-sm sm:text-base text-[#475569] dark:text-[#94A3B8] font-normal leading-relaxed max-w-xl mx-auto">
          Paste any YouTube lecture or playlist to auto-extract blackboard notes, diagrams, formulas &amp; solved PYQs.
        </p>
      </div>

      {/* ── Main Input Command Card ── */}
      <div className="bg-white dark:bg-[#131B2E] p-4 sm:p-5 md:p-7 rounded-[20px] border border-[#E5E7EB] dark:border-[#23314F] shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative transition-all">

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Mode Switcher — segmented control */}
          <div className="flex items-center flex-nowrap w-full md:w-fit bg-slate-100 dark:bg-slate-900/80 rounded-xl p-1 gap-1 border border-slate-200 dark:border-slate-800" role="group" aria-label="Input mode">
            <button
              type="button"
              onClick={() => setInputMode('lecture')}
              aria-pressed={inputMode === 'lecture' && !url.includes('list=')}
              className={`flex-1 md:flex-initial px-2 py-1.5 md:px-4 md:py-2 rounded-lg text-[13px] md:text-xs transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer min-h-[38px] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                inputMode === 'lecture' && !url.includes('list=')
                  ? 'bg-white dark:bg-[#1B2640] text-slate-900 dark:text-white shadow-sm font-bold border border-slate-200/80 dark:border-slate-700'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
              }`}
            >
              <span className="whitespace-nowrap">🎬 Single Lecture</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setInputMode('playlist');
                if (!url.includes('list=')) {
                  setUrl('https://www.youtube.com/playlist?list=PLdstl-units-1-to-5-full-subject-ebook');
                }
              }}
              aria-pressed={inputMode === 'playlist' || url.includes('list=')}
              className={`flex-1 md:flex-initial px-2 py-1.5 md:px-4 md:py-2 rounded-lg text-[13px] md:text-xs transition-all duration-200 flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer min-h-[38px] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                inputMode === 'playlist' || url.includes('list=')
                  ? 'bg-white dark:bg-[#1B2640] text-slate-900 dark:text-white shadow-sm font-bold border border-slate-200/80 dark:border-slate-700'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
              }`}
            >
              <span className="whitespace-nowrap">📑 Full Playlist / E-Book</span>
              <span className="shrink-0 text-[9px] px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 font-bold leading-none border border-amber-200 dark:border-amber-800 whitespace-nowrap">NEW</span>
            </button>
          </div>

          {/* URL Input Bar — stacks vertically on mobile, row on md+ */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 p-1.5 rounded-[14px] border border-[#CBD5E1] dark:border-[#23314F] bg-[#F8FAFC] dark:bg-[#0B0F17] focus-within:bg-white dark:focus-within:bg-[#0B0F17] focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/25 transition-all duration-200">

            <div className="flex items-center gap-2 w-full flex-1 px-3 py-1.5 min-h-[48px] md:min-h-[52px] min-w-0">
              <Youtube className="w-5 h-5 text-red-500 shrink-0" aria-hidden="true" />
              <input
                ref={inputRef}
                type="url"
                placeholder={
                  isPlaylist
                    ? "Paste YouTube playlist link (e.g. https://www.youtube.com/playlist?list=...)"
                    : "Paste YouTube video link (e.g. https://www.youtube.com/watch?v=...)"
                }
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                aria-label={isPlaylist ? "YouTube playlist URL" : "YouTube video URL"}
                className="w-full flex-1 min-w-0 truncate placeholder:truncate bg-transparent text-xs sm:text-sm text-[#0F172A] dark:text-[#F8FAFC] placeholder-[#94A3B8] dark:placeholder-slate-500 focus:outline-none min-h-[40px]"
                disabled={isLoading}
              />

              {/* Paste button — min 44px tap target */}
              <button
                type="button"
                onClick={handlePaste}
                aria-label="Paste URL from clipboard"
                className="px-3 py-2 rounded-lg text-xs font-semibold text-[#334155] dark:text-[#CBD5E1] hover:text-[#0F172A] dark:hover:text-white hover:bg-white dark:hover:bg-[#1B2640] border border-slate-200 dark:border-slate-700 transition-all duration-200 shrink-0 flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                title="Paste from clipboard"
              >
                {copiedPaste ? <Check className="w-4 h-4 text-emerald-500" aria-hidden="true" /> : <Clipboard className="w-4 h-4 text-slate-500 dark:text-slate-400" aria-hidden="true" />}
                <span className="hidden xs:inline">{copiedPaste ? 'Pasted!' : 'Paste'}</span>
              </button>
            </div>

            {/* Primary CTA: Create Copy Notes — Blue gradient (#2563EB) on mobile, solid dark blue on desktop */}
            <button
              type="submit"
              disabled={isLoading}
              aria-label={isLoading ? 'Generating notes, please wait' : isPlaylist ? 'Compile E-Book' : 'Create Copy Notes'}
              className="group w-full md:w-auto h-[48px] min-h-[48px] px-6 py-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] md:bg-none md:bg-slate-900 md:hover:bg-slate-800 md:dark:bg-indigo-600 md:dark:hover:bg-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 md:shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] disabled:opacity-70 transition-all duration-200 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#131B2E] font-sans"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  <span>{isPlaylist ? 'Compiling E-Book...' : 'Creating Notes...'}</span>
                </>
              ) : (
                <>
                  <span>{isPlaylist ? 'Compile E-Book' : 'Create Copy Notes'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
                </>
              )}
            </button>
          </div>

          {/* ── Exam Selector: 5 visible chips + "More" dropdown — Horizontally scrollable on mobile in one line ── */}
          <div className="flex items-center gap-2 overflow-x-auto md:overflow-x-visible no-scrollbar whitespace-nowrap md:whitespace-normal md:flex-wrap pt-1 w-full pb-1" role="group" aria-label="Select target exam">
            <span className="text-xs sm:text-[13px] font-bold text-slate-700 dark:text-slate-300 mr-0.5 shrink-0 font-sans whitespace-nowrap">
              Target Exam:
            </span>

            {/* Primary chips */}
            {EXAM_OPTIONS_PRIMARY.map(exam => {
              const isSelected = selectedExam === exam;
              return (
                <button
                  key={exam}
                  type="button"
                  onClick={() => { setSelectedExam(exam); setMoreOpen(false); }}
                  aria-pressed={isSelected}
                  className={`shrink-0 whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer min-h-[36px] inline-flex items-center justify-center font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 font-bold ring-2 ring-indigo-500/20'
                      : 'bg-white dark:bg-[#1B2640] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30'
                  }`}
                >
                  {exam}
                </button>
              );
            })}

            {/* "More" dropdown for remaining chips */}
            <div className="relative shrink-0 whitespace-nowrap" ref={moreRef}>
              <button
                type="button"
                onClick={toggleMore}
                onKeyDown={(e) => { if (e.key === 'Escape') setMoreOpen(false); }}
                aria-haspopup="listbox"
                aria-expanded={moreOpen}
                aria-label="More exam options"
                className={`shrink-0 whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5 min-h-[36px] font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  EXAM_OPTIONS_MORE.includes(selectedExam)
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 font-bold ring-2 ring-indigo-500/20'
                    : 'bg-white dark:bg-[#1B2640] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30'
                }`}
              >
                <span>{EXAM_OPTIONS_MORE.includes(selectedExam) ? selectedExam : 'More'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>

              {moreOpen && (
                <div
                  role="listbox"
                  aria-label="More exam options"
                  style={moreCoords ? { top: moreCoords.top, left: moreCoords.left } : undefined}
                  className="fixed md:absolute md:!top-full md:!left-0 md:mt-1.5 z-50 md:z-20 bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl py-1 min-w-[150px] animate-fade-slide-up"
                >
                  {EXAM_OPTIONS_MORE.map(exam => {
                    const isSelected = selectedExam === exam;
                    return (
                      <button
                        key={exam}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => { setSelectedExam(exam); setMoreOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-sans transition-colors duration-150 min-h-[40px] flex items-center focus-visible:outline-none focus-visible:bg-indigo-50 dark:focus-visible:bg-indigo-900/30 ${
                          isSelected
                            ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold'
                            : 'text-slate-700 dark:text-slate-200 hover:bg-[#F1F5F9] dark:hover:bg-[#1B2640] font-medium'
                        }`}
                      >
                        {exam}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Free text input if 'Other' is chosen */}
          {selectedExam === 'Other' && (
            <div className="pt-1 animate-fade-slide-up">
              <label htmlFor="other-exam-input" className="sr-only">Type your exam or university</label>
              <input
                id="other-exam-input"
                type="text"
                placeholder="Type your exam / university (e.g. WBJEE, MHT-CET, CAT, State PSC...)"
                value={otherExamText}
                onChange={(e) => setOtherExamText(e.target.value)}
                className="w-full border border-[#E2E8F0] dark:border-[#23314F] rounded-xl px-3.5 py-2.5 text-xs text-[#0F172A] dark:text-[#F8FAFC] bg-[#F8FAFC] dark:bg-[#0B0F17] focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 min-h-[44px]"
              />
            </div>
          )}

        </form>

        {/* ── Stepper Progress Notification ── */}
        {isLoading && (
          <div className="mt-5 p-4 rounded-xl border border-[#E2E8F0] dark:border-[#23314F] bg-[#F8FAFC] dark:bg-[#0B0F17] animate-fade-slide-up space-y-2.5" role="status" aria-live="polite">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-ping" aria-hidden="true" />
                <span className="font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                  Synthesizing Classroom Notes
                </span>
              </div>
              <span className="text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                Part {stepIdx + 1} of {PROGRESS_STEPS.length}
              </span>
            </div>

            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-600 to-violet-500 transition-all duration-500 rounded-full"
                style={{ width: `${((stepIdx + 1) / PROGRESS_STEPS.length) * 100}%` }}
                role="progressbar"
                aria-valuenow={stepIdx + 1}
                aria-valuemin={1}
                aria-valuemax={PROGRESS_STEPS.length}
              />
            </div>

            <p className="text-xs text-[#475569] dark:text-[#94A3B8]">
              → {PROGRESS_STEPS[stepIdx]}
            </p>
          </div>
        )}

        {/* ── Error Display ── */}
        {error && (
          <div className="mt-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-xl p-3 text-red-700 dark:text-red-300 text-xs flex items-start gap-2.5 animate-fade-slide-up" role="alert">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="flex-1">
              <span className="font-bold block">Notice:</span>
              <p className="leading-relaxed">{error}</p>
            </div>
          </div>
        )}

      </div>

      {/* ── Quick Start Sample Cards Section ── */}
      <div className="mt-10 pt-8 border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="flex items-center justify-between mb-5 px-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500 dark:text-indigo-400" aria-hidden="true" />
            <h2 className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-sans">
              Try Sample Lectures — 1-Click Preview
            </h2>
          </div>
          <span className="text-xs text-slate-400 dark:text-slate-500 font-medium font-sans hidden sm:inline">
            Click any card to view notes
          </span>
        </div>

        {/* 4 Cards Grid — consistent equal height, premium cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {PRESET_VIDEOS.map((preset) => {
            const IconComponent = PRESET_ICONS[preset.iconName] || BookOpen;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handlePresetSelect(preset)}
                aria-label={`Load sample notes for: ${preset.title}`}
                className="bg-white dark:bg-[#131B2E] border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 p-0 rounded-2xl cursor-pointer transition-all duration-200 hover:-translate-y-1 active:translate-y-0 active:scale-[0.99] group flex flex-col text-left h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 overflow-hidden"
              >
                {/* Professional Dark Tech Thumbnail Banner */}
                <div className={`w-full h-24 bg-gradient-to-br ${preset.headerBg} flex items-center justify-center relative overflow-hidden shrink-0 border-b border-slate-100 dark:border-slate-800`} aria-hidden="true">
                  {/* Soft ambient glow */}
                  <div className={`absolute w-28 h-28 rounded-full ${preset.glowColor} blur-xl pointer-events-none`} />

                  {/* Top Left: Category tag */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/10 dark:bg-black/30 backdrop-blur-md border border-white/15 text-[9px] text-white/90 font-mono uppercase tracking-wider font-bold">
                    <span>{preset.badgeText}</span>
                  </div>

                  {/* Top Right: Channel tag with play indicator */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] text-white/90 font-medium">
                    <Play className="w-2.5 h-2.5 fill-red-500 text-red-500 shrink-0" />
                    <span className="truncate max-w-[90px]">{preset.channel}</span>
                  </div>

                  {/* Center: Frosted Glass Icon Badge with Micro-interaction */}
                  <div className="relative w-11 h-11 rounded-xl bg-white/10 dark:bg-slate-800/80 backdrop-blur-md border border-white/20 dark:border-white/15 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className={`w-5 h-5 ${preset.iconColor}`} />
                  </div>
                </div>

                <div className="flex flex-col flex-1 p-4 justify-between">
                  <div className="flex flex-col flex-1">
                    {/* Subject Tag & Duration */}
                    <div className="flex items-center justify-between gap-1.5 mb-2.5">
                      <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold ${preset.badgeBg} border flex items-center gap-1 shrink-0 whitespace-nowrap font-sans`}>
                        <span>{preset.subject}</span>
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-200/50 dark:border-slate-700/50 shrink-0 whitespace-nowrap">
                        <Clock className="w-3 h-3 shrink-0" aria-hidden="true" />
                        <span>{preset.duration}</span>
                      </span>
                    </div>

                    {/* Card Title — max 2 lines with line-clamp-2 */}
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200 line-clamp-2 leading-snug mb-2 font-sans min-h-[2.75rem]">
                      {preset.title}
                    </h3>

                    {/* Target Exam Tag with clean Target icon */}
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium mb-2.5 truncate">
                      <Target className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 shrink-0" aria-hidden="true" />
                      <span className="truncate">{preset.exam}</span>
                    </div>

                    {/* Highlights */}
                    <div className="flex items-center gap-1 flex-wrap mb-3 min-h-[1.5rem]">
                      {(preset.highlights || []).map((h, i) => (
                        <span
                          key={i}
                          className="text-[9px] px-1.5 py-0.5 rounded bg-slate-50 dark:bg-[#1B2640] text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800 font-medium"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer — pinned to bottom across all cards */}
                  <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs mt-auto shrink-0">
                    <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Instant Notes</span>
                    </span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs group-hover:translate-x-0.5 transition-transform duration-200 flex items-center gap-1 font-sans">
                      <span>Open Notes</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Mobile hint */}
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium font-sans text-center mt-3 sm:hidden">
          Tap any card to view notes
        </p>
      </div>

    </div>
  );
}
