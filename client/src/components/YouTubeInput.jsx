import React, { useState } from 'react';
import {
  ArrowRight, Loader2, Clipboard, AlertCircle, Sparkles, Youtube, Check
} from 'lucide-react';

const PRESET_VIDEOS = [
  {
    id: 'coa-unit-1',
    title: "COA Unit 1: Computer Organization & Architecture",
    subject: "Computer Science",
    icon: "💻",
    exam: "AKTU B.Tech / GATE CS",
    duration: "1 hr 27m",
    channel: "Gate Smashers",
    highlights: ["Blackboard SVGs", "Solved PYQs"],
    url: 'https://www.youtube.com/watch?v=coa-unit-1',
  },
  {
    id: 'kKKM8Y-u7ds',
    title: "Newton's Laws of Motion & Friction",
    subject: "Physics",
    icon: "⚛️",
    exam: "JEE Main & Class 11",
    duration: "45 mins",
    channel: "Physics Galaxy",
    highlights: ["Free Body Diagrams", "Core Formulas"],
    url: 'https://www.youtube.com/watch?v=kKKM8Y-u7ds',
  },
  {
    id: 'RBSGKlAoi3w',
    title: "Binary Trees, BST & Tree Traversals",
    subject: "Data Structures",
    icon: "🌳",
    exam: "GATE & University",
    duration: "52 mins",
    channel: "Striver",
    highlights: ["Visual Tree Nodes", "Top 20 MCQs"],
    url: 'https://www.youtube.com/watch?v=RBSGKlAoi3w',
  },
  {
    id: 'dstl-full-playlist-ebook',
    title: "DSTL Discrete Mathematics Master E-Book",
    subject: "Mathematics",
    icon: "📑",
    exam: "AKTU All 5 Units",
    duration: "Full Playlist",
    channel: "Full Subject Series",
    highlights: ["All 5 Units", "Formula Hub"],
    url: 'https://www.youtube.com/playlist?list=PLdstl-units-1-to-5-full-subject-ebook',
  }
];

const EXAM_OPTIONS = [
  "Auto-detect",
  "AKTU B.Tech (Semester Exams)",
  "JEE Main / Adv",
  "NEET",
  "GATE",
  "CBSE 9-12",
  "SSC",
  "State boards",
  "College",
  "Other"
];

const PROGRESS_STEPS = [
  "Part 1 of 8: Fetching lecture metadata, board frames & audio track...",
  "Part 2 of 8: Splitting into 10-15 min overlapping thematic segments...",
  "Part 3 of 8: Extracting blackboard text, equations, derivations & teacher tips...",
  "Part 4 of 8: Generating clean labelled SVGs and standard textbook diagrams...",
  "Part 5 of 8: Formatting KaTeX mathematical equations & comparison tables...",
  "Part 6 of 8: Running verification pass against transcript to ensure zero missed topics...",
  "Part 7 of 8: Curating TOP 5 exam PYQs with step-by-step solutions & elimination tricks...",
  "Part 8 of 8: Finalizing student copy notebook, interactive mind map & audio summary..."
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

  return (
    <div className="max-w-4xl mx-auto my-4 sm:my-8 px-3 sm:px-4 w-full">

      {/* ── Clean, Compact Hero ── */}
      <div className="text-center mb-5 sm:mb-7">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] font-['Plus_Jakarta_Sans'] tracking-tight leading-tight">
          YouTube Lecture to Student Copy Notes
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-[#475569] dark:text-[#CBD5E1] font-normal leading-relaxed mt-2 max-w-xl mx-auto">
          Paste any YouTube lecture or playlist to auto-extract blackboard notes, diagrams, formulas &amp; solved PYQs.
        </p>
      </div>

      {/* ── Main Input Command Card ── */}
      <div className="bg-white dark:bg-[#131B2E] p-4 sm:p-5 rounded-2xl border border-[#E2E8F0] dark:border-[#23314F] shadow-sm relative transition-all">

        <form onSubmit={handleSubmit} className="space-y-3.5">

          {/* Mode Switcher: Single Lecture vs Full Subject Playlist */}
          <div className="flex items-center gap-2 pb-0.5">
            <button
              type="button"
              onClick={() => setInputMode('lecture')}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                inputMode === 'lecture' && !url.includes('list=')
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'bg-[#F1F5F9] dark:bg-[#1B2640] text-[#475569] dark:text-[#CBD5E1] hover:text-[#0F172A] dark:hover:text-white border border-[#E2E8F0] dark:border-[#23314F]'
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
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                inputMode === 'playlist' || url.includes('list=')
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-[#F1F5F9] dark:bg-[#1B2640] text-[#475569] dark:text-[#CBD5E1] hover:text-[#0F172A] dark:hover:text-white border border-[#E2E8F0] dark:border-[#23314F]'
              }`}
            >
              <span>📑 Full Playlist / E-Book</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 font-black">NEW</span>
            </button>
          </div>

          {/* URL Input Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-2 p-1 rounded-xl border border-[#CBD5E1] dark:border-[#23314F] bg-[#F8FAFC] dark:bg-[#0B0F17] focus-within:bg-white dark:focus-within:bg-[#0B0F17] focus-within:border-[#2563EB] focus-within:ring-3 focus-within:ring-[#2563EB]/15 transition-all">
            
            <div className="flex items-center gap-2 w-full px-3 py-1.5">
              <Youtube className="w-4 h-4 text-red-500 shrink-0" />
              <input
                type="text"
                placeholder={
                  (inputMode === 'playlist' || url.includes('list='))
                    ? "Paste YouTube playlist link (e.g. https://www.youtube.com/playlist?list=...)"
                    : "Paste YouTube video link (e.g. https://www.youtube.com/watch?v=...)"
                }
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-[#0F172A] dark:text-[#F8FAFC] placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
                disabled={isLoading}
              />

              {/* Paste button */}
              <button
                type="button"
                onClick={handlePaste}
                className="px-2 py-1 rounded-lg text-xs font-medium text-[#475569] dark:text-[#CBD5E1] hover:text-[#0F172A] dark:hover:text-white hover:bg-white dark:hover:bg-[#1B2640] border border-slate-200 dark:border-slate-700 transition-all shrink-0 flex items-center gap-1 cursor-pointer"
                title="Paste from clipboard"
              >
                {copiedPaste ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Clipboard className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{copiedPaste ? 'Pasted!' : 'Paste'}</span>
              </button>
            </div>

            {/* Generate Button */}
            <button
              type="submit"
              disabled={isLoading || !url.trim()}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl ${
                (inputMode === 'playlist' || url.includes('list='))
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB] text-white'
              } font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all whitespace-nowrap cursor-pointer`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>{(inputMode === 'playlist' || url.includes('list=')) ? 'Compiling E-Book...' : 'Creating Notes...'}</span>
                </>
              ) : (
                <>
                  <span>{(inputMode === 'playlist' || url.includes('list=')) ? 'Compile E-Book' : 'Create Copy Notes'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Exam Selector Chips (All Target Exams Visible) */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mr-1">Target Exam:</span>
            {EXAM_OPTIONS.map(exam => (
              <button
                key={exam}
                type="button"
                onClick={() => setSelectedExam(exam)}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                  selectedExam === exam
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'bg-[#F1F5F9] dark:bg-[#1B2640] text-[#475569] dark:text-[#CBD5E1] hover:text-[#0F172A] dark:hover:text-white border border-[#E2E8F0] dark:border-[#23314F]'
                }`}
              >
                {exam}
              </button>
            ))}
          </div>

          {/* Free text input if 'Other' is chosen */}
          {selectedExam === 'Other' && (
            <div className="pt-1 animate-fade-slide-up">
              <input
                type="text"
                placeholder="Type your exam / university (e.g. WBJEE, MHT-CET, CAT, State PSC...)"
                value={otherExamText}
                onChange={(e) => setOtherExamText(e.target.value)}
                className="w-full border border-[#E2E8F0] dark:border-[#23314F] rounded-xl px-3 py-1.5 text-xs text-[#0F172A] dark:text-[#F8FAFC] bg-[#F8FAFC] dark:bg-[#0B0F17] focus:outline-none focus:border-[#2563EB]"
              />
            </div>
          )}

        </form>

        {/* ── Stepper Progress Notification ── */}
        {isLoading && (
          <div className="mt-4 p-4 rounded-xl border border-[#E2E8F0] dark:border-[#23314F] bg-[#F8FAFC] dark:bg-[#0B0F17] animate-fade-slide-up space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#2563EB] dark:bg-[#3B82F6] animate-ping" />
                <span className="font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                  Synthesizing Classroom Notes
                </span>
              </div>
              <span className="text-[#2563EB] dark:text-[#60A5FA] font-mono text-xs font-bold">
                Part {stepIdx + 1} of {PROGRESS_STEPS.length}
              </span>
            </div>

            <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-[#2563EB] dark:bg-[#3B82F6] transition-all duration-500 rounded-full"
                style={{ width: `${((stepIdx + 1) / PROGRESS_STEPS.length) * 100}%` }}
              />
            </div>

            <p className="text-[11px] text-[#475569] dark:text-[#CBD5E1] font-mono">
              → {PROGRESS_STEPS[stepIdx]}
            </p>
          </div>
        )}

        {/* ── Error Display ── */}
        {error && (
          <div className="mt-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-xl p-3 text-red-700 dark:text-red-300 text-xs flex items-start gap-2.5 animate-fade-slide-up">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold block">Notice:</span>
              <p className="leading-relaxed font-mono">{error}</p>
            </div>
          </div>
        )}

      </div>

      {/* ── Quick Start Examples (Clean Modern Cards Design) ── */}
      <div className="mt-6 sm:mt-8">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#2563EB] dark:text-[#60A5FA] uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Try Sample Lectures (1-Click Preview)</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            Click any card to view notes
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESET_VIDEOS.map((preset) => (
            <div
              key={preset.id}
              onClick={() => handlePresetSelect(preset)}
              className="bg-white dark:bg-[#131B2E] border border-[#E2E8F0] dark:border-[#23314F] hover:border-[#2563EB] dark:hover:border-[#3B82F6] hover:shadow-md p-3.5 rounded-2xl cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 group flex flex-col justify-between"
            >
              <div>
                {/* Subject Badge & Duration */}
                <div className="flex items-center justify-between gap-1.5 mb-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EFF6FF] dark:bg-[#3B82F6]/20 text-[#2563EB] dark:text-[#60A5FA] border border-[#2563EB]/20 flex items-center gap-1">
                    <span>{preset.icon || '📚'}</span>
                    <span className="truncate max-w-[90px]">{preset.subject}</span>
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                    ⏱ {preset.duration}
                  </span>
                </div>

                {/* Card Title */}
                <h4 className="font-bold text-xs sm:text-sm text-[#0F172A] dark:text-[#F8FAFC] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors line-clamp-2 leading-snug mb-1 font-['Plus_Jakarta_Sans']">
                  {preset.title}
                </h4>

                {/* Target Exam Tag */}
                <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8] font-medium truncate mb-2">
                  🎯 {preset.exam}
                </p>

                {/* Highlights */}
                <div className="flex items-center gap-1 flex-wrap mb-2.5">
                  {(preset.highlights || []).map((h, i) => (
                    <span
                      key={i}
                      className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#1B2640] text-slate-600 dark:text-slate-300 font-medium"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-400 font-mono">Ready to view</span>
                <span className="text-[#2563EB] dark:text-[#60A5FA] font-bold text-xs group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  <span>Open</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
