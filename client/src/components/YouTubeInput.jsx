import React, { useState, useRef } from 'react';
import {
  ArrowRight, Loader2, Clipboard, AlertCircle, Sparkles, Youtube, Check, ChevronDown, Clock
} from 'lucide-react';

const PRESET_VIDEOS = [
  {
    id: 'coa-unit-1',
    title: "COA Unit 1: Computer Organization & Architecture",
    subject: "CS",
    subjectFull: "Computer Science",
    icon: "💻",
    exam: "AKTU B.Tech / GATE CS",
    duration: "1 hr 27m",
    channel: "Gate Smashers",
    highlights: ["Blackboard SVGs", "Solved PYQs"],
    url: 'https://www.youtube.com/watch?v=coa-unit-1',
    color: 'from-blue-500 to-indigo-600',
    bgLight: 'bg-blue-50',
    textAccent: 'text-blue-700',
  },
  {
    id: 'kKKM8Y-u7ds',
    title: "Newton's Laws of Motion & Friction — Complete Derivations",
    subject: "Physics",
    subjectFull: "Physics",
    icon: "⚛️",
    exam: "JEE Main & Class 11",
    duration: "45 mins",
    channel: "Physics Galaxy",
    highlights: ["Free Body Diagrams", "Core Formulas"],
    url: 'https://www.youtube.com/watch?v=kKKM8Y-u7ds',
    color: 'from-purple-500 to-violet-600',
    bgLight: 'bg-purple-50',
    textAccent: 'text-purple-700',
  },
  {
    id: 'RBSGKlAoi3w',
    title: "Binary Trees, BST & Tree Traversals Masterclass",
    subject: "DSA",
    subjectFull: "Data Structures",
    icon: "🌳",
    exam: "GATE & University",
    duration: "52 mins",
    channel: "Striver",
    highlights: ["Visual Tree Nodes", "Top 20 MCQs"],
    url: 'https://www.youtube.com/watch?v=RBSGKlAoi3w',
    color: 'from-emerald-500 to-teal-600',
    bgLight: 'bg-emerald-50',
    textAccent: 'text-emerald-700',
  },
  {
    id: 'dstl-full-playlist-ebook',
    title: "DSTL Discrete Mathematics Master E-Book",
    subject: "Maths",
    subjectFull: "Mathematics",
    icon: "📑",
    exam: "AKTU — All 5 Units",
    duration: "Full Playlist",
    channel: "Full Subject Series",
    highlights: ["All 5 Units", "Formula Hub"],
    url: 'https://www.youtube.com/playlist?list=PLdstl-units-1-to-5-full-subject-ebook',
    color: 'from-pink-500 to-rose-600',
    bgLight: 'bg-pink-50',
    textAccent: 'text-pink-700',
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
  const moreRef = useRef(null);

  // Close "More" dropdown on outside click
  React.useEffect(() => {
    if (!moreOpen) return;
    const handler = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
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
    if (!url.trim()) return;
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
        <h1 className="relative text-3xl sm:text-5xl md:text-[3.5rem] font-extrabold text-[#0F172A] dark:text-[#F8FAFC] font-['Plus_Jakarta_Sans'] tracking-tight leading-[1.1] mb-4">
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
      <div className="bg-white dark:bg-[#131B2E] p-5 sm:p-7 rounded-[20px] border border-[#E5E7EB] dark:border-[#23314F] shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative transition-all">

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Mode Switcher — segmented control */}
          <div className="flex items-center bg-[#F1F5F9] dark:bg-[#0B0F17] rounded-xl p-1 gap-1 border border-[#E2E8F0] dark:border-[#23314F] w-fit" role="group" aria-label="Input mode">
            <button
              type="button"
              onClick={() => setInputMode('lecture')}
              aria-pressed={inputMode === 'lecture' && !url.includes('list=')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                inputMode === 'lecture' && !url.includes('list=')
                  ? 'bg-white dark:bg-[#1B2640] text-[#0F172A] dark:text-[#F8FAFC] shadow-sm border border-slate-200/80 dark:border-slate-700'
                  : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white'
              }`}
            >
              <span>🎬 Single Lecture</span>
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
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                inputMode === 'playlist' || url.includes('list=')
                  ? 'bg-white dark:bg-[#1B2640] text-[#0F172A] dark:text-[#F8FAFC] shadow-sm border border-slate-200/80 dark:border-slate-700'
                  : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white'
              }`}
            >
              <span>📑 Full Playlist / E-Book</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 font-bold leading-none border border-amber-200 dark:border-amber-800">NEW</span>
            </button>
          </div>

          {/* URL Input Bar — stacks vertically on mobile, row on sm+ */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-1.5 rounded-[14px] border border-[#CBD5E1] dark:border-[#23314F] bg-[#F8FAFC] dark:bg-[#0B0F17] focus-within:bg-white dark:focus-within:bg-[#0B0F17] focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/25 transition-all duration-200">

            <div className="flex items-center gap-2 flex-1 px-3 py-1.5 min-h-[52px]">
              <Youtube className="w-5 h-5 text-red-500 shrink-0" aria-hidden="true" />
              <input
                type="url"
                placeholder={
                  isPlaylist
                    ? "Paste YouTube playlist link (e.g. https://www.youtube.com/playlist?list=...)"
                    : "Paste YouTube video link (e.g. https://www.youtube.com/watch?v=...)"
                }
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                aria-label={isPlaylist ? "YouTube playlist URL" : "YouTube video URL"}
                className="w-full bg-transparent text-xs sm:text-sm text-[#0F172A] dark:text-[#F8FAFC] placeholder-[#94A3B8] dark:placeholder-slate-500 focus:outline-none min-h-[40px]"
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

            {/* Primary CTA: Create Copy Notes */}
            <button
              type="submit"
              disabled={isLoading || !url.trim()}
              aria-label={isLoading ? 'Generating notes, please wait' : isPlaylist ? 'Compile E-Book' : 'Create Copy Notes'}
              className="group w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-violet-600 dark:from-indigo-500 dark:to-indigo-600 dark:hover:from-indigo-400 dark:hover:to-violet-500 focus-visible:ring-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-md transition-all duration-200 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#131B2E] min-h-[48px]"
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

          {/* ── Exam Selector: 5 visible chips + "More" dropdown ── */}
          <div className="flex items-center gap-2 flex-wrap pt-1" role="group" aria-label="Select target exam">
            <span className="text-xs sm:text-[13px] font-bold text-slate-700 dark:text-slate-300 mr-0.5 shrink-0 font-sans">
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
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer min-h-[36px] inline-flex items-center justify-center font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
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
            <div className="relative" ref={moreRef}>
              <button
                type="button"
                onClick={() => setMoreOpen(prev => !prev)}
                onKeyDown={(e) => { if (e.key === 'Escape') setMoreOpen(false); }}
                aria-haspopup="listbox"
                aria-expanded={moreOpen}
                aria-label="More exam options"
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5 min-h-[36px] font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
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
                  className="absolute top-full left-0 mt-1.5 z-20 bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl py-1 min-w-[150px] animate-fade-slide-up"
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

        {/* 4 Cards Grid — consistent height, premium cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {PRESET_VIDEOS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handlePresetSelect(preset)}
              title={preset.title}
              aria-label={`Load sample notes for: ${preset.title}`}
              className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 shadow-sm hover:shadow-lg hover:shadow-indigo-500/10 p-0 rounded-2xl cursor-pointer transition-all duration-200 hover:-translate-y-1 active:translate-y-0 active:scale-[0.99] group flex flex-col text-left h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 overflow-hidden"
            >
              {/* Gradient thumbnail strip */}
              <div className={`w-full h-20 bg-gradient-to-br ${preset.color} flex items-center justify-center relative overflow-hidden shrink-0`} aria-hidden="true">
                <span className="text-4xl filter drop-shadow-sm">{preset.icon}</span>
                <div className="absolute inset-0 bg-black/10" />
              </div>

              <div className="flex flex-col flex-1 p-4">
                {/* Subject Tag & Duration */}
                <div className="flex items-center justify-between gap-1.5 mb-2.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${preset.bgLight} dark:bg-slate-800 ${preset.textAccent} dark:text-slate-300 border border-slate-200/50 dark:border-slate-700 flex items-center gap-1 shrink-0 whitespace-nowrap font-sans`}>
                    <span>{preset.subject}</span>
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-200/50 dark:border-slate-700/50 shrink-0 whitespace-nowrap">
                    <Clock className="w-3 h-3 shrink-0" aria-hidden="true" />
                    <span>{preset.duration}</span>
                  </span>
                </div>

                {/* Card Title — max 2 lines */}
                <h3
                  className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200 line-clamp-2 leading-snug mb-2 font-sans min-h-[2.5rem]"
                  title={preset.title}
                >
                  {preset.title}
                </h3>

                {/* Target Exam Tag */}
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate mb-2.5">
                  🎯 {preset.exam}
                </p>

                {/* Highlights */}
                <div className="flex items-center gap-1 flex-wrap mb-3">
                  {(preset.highlights || []).map((h, i) => (
                    <span
                      key={i}
                      className="text-[9px] px-1.5 py-0.5 rounded bg-slate-50 dark:bg-[#1B2640] text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800 font-medium"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* Card Footer */}
                <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs mt-auto">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium font-sans">
                    Ready to view
                  </span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs group-hover:translate-x-0.5 transition-transform duration-200 flex items-center gap-1 font-sans">
                    <span>Open Notes</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Mobile hint */}
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium font-sans text-center mt-3 sm:hidden">
          Tap any card to view notes
        </p>
      </div>

    </div>
  );
}
