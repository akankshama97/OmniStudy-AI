import React, { useState } from 'react';
import {
  FileText, Network, Headphones, FileSpreadsheet,
  ArrowRight, Loader2, Clipboard, AlertCircle, Sparkles, Clock
} from 'lucide-react';

const FEATURE_ICONS = [
  { icon: FileText,        label: 'Copy Notes' },
  { icon: Network,         label: 'Mind Map' },
  { icon: Headphones,      label: 'Audio Podcast' },
  { icon: FileSpreadsheet, label: 'Top 5 PYQs' },
];

const PRESET_VIDEOS = [
  {
    id: 'coa-unit-1',
    title: "COA Unit 1: Computer Organization & Architecture",
    subject: "Computer Science / B.Tech",
    exam: "AKTU B.Tech / GATE CS",
    duration: "1 hr 27 mins",
    channel: "Gate Smashers / Knowledge Gate",
    url: 'https://www.youtube.com/watch?v=coa-unit-1',
  },
  {
    id: 'kKKM8Y-u7ds',
    title: "Newton's Laws of Motion & Friction",
    subject: "Physics",
    exam: "JEE Main & Class 11",
    duration: "45 mins",
    channel: "Physics Galaxy / Alakh Sir",
    url: 'https://www.youtube.com/watch?v=kKKM8Y-u7ds',
  },
  {
    id: 'RBSGKlAoi3w',
    title: "Binary Trees, BST & Tree Traversals",
    subject: "Computer Science",
    exam: "GATE & University Semester",
    duration: "52 mins",
    channel: "Striver / Gate Smashers",
    url: 'https://www.youtube.com/watch?v=RBSGKlAoi3w',
  }
];

// All requested exam selector options
const EXAM_OPTIONS = [
  "Auto-detect",
  "AKTU B.Tech (Semester Exams)",
  "JEE",
  "NEET",
  "CBSE 9-12",
  "UPSC",
  "SSC",
  "Banking",
  "GATE",
  "CUET",
  "State boards",
  "College",
  "Other"
];

const NOTE_FORMATS = [
  { id: 'detailed', label: 'Detailed Copy (Default)' },
  { id: 'rapid',    label: 'Rapid' },
  { id: 'pyq',      label: 'PYQ Focus' },
  { id: 'cornell',  label: 'Cornell' }
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
  isDark = false,
  selectedLang = 'English',
  onChangeLanguage
}) {
  const [url, setUrl] = useState('');
  const [inputMode, setInputMode] = useState('lecture'); // 'lecture' | 'playlist'
  const [selectedExam, setSelectedExam] = useState('Auto-detect');
  const [otherExamText, setOtherExamText] = useState('');
  const [noteFormat, setNoteFormat] = useState('detailed');
  const [maxMinutes, setMaxMinutes] = useState('full'); // 'full', '60', '90', '120'
  const [stepIdx, setStepIdx] = useState(0);

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

    onProcessVideo(url.trim(), finalExam, noteFormat, maxMinutes === 'full' ? null : parseInt(maxMinutes, 10));
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setUrl(text.trim());
    } catch (err) {}
  };

  const handlePresetSelect = (preset) => {
    setUrl(preset.url);
    const finalExam = selectedExam === 'Other' ? (otherExamText.trim() || 'Other Exam') : selectedExam;
    onProcessVideo(preset.url, finalExam, noteFormat, null);
  };

  return (
    <div className="max-w-4xl mx-auto my-10 px-4 w-full">

      {/* ── High Contrast Hero Section (No Muddy Gradient) ── */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-[46px] font-bold text-[#0F172A] dark:text-[#F8FAFC] font-['Plus_Jakarta_Sans'] tracking-tight leading-[1.18]">
          YouTube Lecture to Student Copy Notes
        </h1>

        <p className="text-base md:text-[18px] text-[#334155] dark:text-[#CBD5E1] font-normal leading-relaxed mt-3 max-w-2xl mx-auto">
          Paste any lecture URL (JEE, NEET, UPSC, College, Shorts, or 3+ hr video). Auto-detects subject, blackboard handwriting, diagrams, and formulas.
        </p>

        {/* ── Feature Cards (High-Contrast WCAG AA) ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto mt-6">
          {FEATURE_ICONS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="bg-white dark:bg-[#131B2E] border border-[#E2E8F0] dark:border-[#23314F] hover:border-[#2563EB] dark:hover:border-[#3B82F6] hover:shadow-sm p-3.5 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F1F5F9] dark:bg-[#1B2640] group-hover:bg-[#EFF6FF] dark:group-hover:bg-[#3B82F6]/20 flex items-center justify-center text-[#0F172A] dark:text-[#F8FAFC] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors">
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main Input Command Card ── */}
      <div className="bg-white dark:bg-[#131B2E] p-5 sm:p-6 rounded-2xl border border-[#E2E8F0] dark:border-[#23314F] shadow-sm relative transition-all">

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Mode Switcher: Single Lecture vs Full Subject Playlist */}
          <div className="flex items-center gap-2 pb-1">
            <button
              type="button"
              onClick={() => setInputMode('lecture')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
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
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                inputMode === 'playlist' || url.includes('list=')
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-[#F1F5F9] dark:bg-[#1B2640] text-[#475569] dark:text-[#CBD5E1] hover:text-[#0F172A] dark:hover:text-white border border-[#E2E8F0] dark:border-[#23314F]'
              }`}
            >
              <span>📑 YouTube Playlist / Full Subject E-Book</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 font-black">NEW</span>
            </button>
          </div>

          {/* URL Input Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-xl border border-[#E2E8F0] dark:border-[#23314F] bg-[#F8FAFC] dark:bg-[#0B0F17] focus-within:bg-white dark:focus-within:bg-[#0B0F17] focus-within:border-[#2563EB] focus-within:ring-4 focus-within:ring-[#2563EB]/15 transition-all">
            
            <div className="flex items-center gap-2.5 w-full px-3 py-1.5">
              <span className="text-slate-400 dark:text-slate-500 font-medium text-sm">
                {(inputMode === 'playlist' || url.includes('list=')) ? '📑' : '🔗'}
              </span>
              <input
                type="text"
                placeholder={
                  (inputMode === 'playlist' || url.includes('list='))
                    ? "Paste YouTube playlist link (e.g. https://www.youtube.com/playlist?list=PL...)"
                    : "Paste any YouTube video or playlist link (e.g. https://www.youtube.com/watch?v=...)"
                }
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-transparent text-sm text-[#0F172A] dark:text-[#F8FAFC] placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none font-['Inter']"
                disabled={isLoading}
              />

              {/* Paste button */}
              <button
                type="button"
                onClick={handlePaste}
                className="px-2.5 py-1 rounded-lg text-xs font-medium text-[#475569] dark:text-[#CBD5E1] hover:text-[#0F172A] dark:hover:text-white hover:bg-white dark:hover:bg-[#1B2640] border border-transparent hover:border-[#E2E8F0] dark:hover:border-[#23314F] transition-all shrink-0 flex items-center gap-1"
                title="Paste from clipboard"
              >
                <Clipboard className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Paste</span>
              </button>
            </div>

            {/* Generate Button */}
            <button
              type="submit"
              disabled={isLoading || !url.trim()}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl ${
                (inputMode === 'playlist' || url.includes('list='))
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB] text-white'
              } font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all whitespace-nowrap`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>{(inputMode === 'playlist' || url.includes('list=')) ? 'Compiling Full Subject E-Book...' : 'Synthesizing Notes...'}</span>
                </>
              ) : (
                <>
                  <span>{(inputMode === 'playlist' || url.includes('list=')) ? 'Generate Subject E-Book' : 'Create Copy Notes'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Playlist / Multi-video notification badge */}
          {(url.includes('list=') || inputMode === 'playlist') && (
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-800 dark:text-purple-200 text-xs font-semibold animate-fade-slide-up">
              <span className="text-base shrink-0">📑</span>
              <div className="leading-snug">
                <strong>YouTube Playlist Mode Active:</strong> OmniStudy will analyze this entire lecture series across all Units and compile a cohesive <strong>Subject Master Handwritten E-Booklet</strong> with Unit Bookmarks &amp; Master Index.
              </div>
            </div>
          )}

          {/* ── Exam Selector Chips (All 12 options) ── */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#334155] dark:text-[#CBD5E1] font-mono">
                Select Exam / Target:
              </span>
              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                Auto-detects subject & style
              </span>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {EXAM_OPTIONS.map(exam => (
                <button
                  key={exam}
                  type="button"
                  onClick={() => setSelectedExam(exam)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    selectedExam === exam
                      ? 'bg-[#2563EB] text-white shadow-sm border border-[#2563EB]'
                      : 'bg-[#F1F5F9] dark:bg-[#1B2640] text-[#334155] dark:text-[#CBD5E1] hover:text-[#0F172A] dark:hover:text-white border border-[#E2E8F0] dark:border-[#23314F]'
                  }`}
                >
                  {exam}
                </button>
              ))}
            </div>

            {/* Free text input if 'Other' is chosen */}
            {selectedExam === 'Other' && (
              <div className="mt-2.5 animate-fade-slide-up">
                <input
                  type="text"
                  placeholder="Type your exam / university (e.g. WBJEE, MHT-CET, CA Foundation, CAT, State PSC...)"
                  value={otherExamText}
                  onChange={(e) => setOtherExamText(e.target.value)}
                  className="w-full border border-[#E2E8F0] dark:border-[#23314F] rounded-xl px-3.5 py-2 text-xs text-[#0F172A] dark:text-[#F8FAFC] bg-[#F8FAFC] dark:bg-[#0B0F17] focus:bg-white dark:focus:bg-[#0B0F17] focus:border-[#2563EB] focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* ── Sub Options: Format, Language & Duration Handling ── */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-[#E2E8F0] dark:border-[#23314F] text-xs flex-wrap">
            
            {/* Note Format Selector */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[#334155] dark:text-[#CBD5E1] font-semibold text-[11px] mr-1">Format:</span>
              {NOTE_FORMATS.map(f => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setNoteFormat(f.id)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                    noteFormat === f.id
                      ? 'bg-[#EFF6FF] dark:bg-[#3B82F6]/20 text-[#2563EB] dark:text-[#60A5FA] border border-[#2563EB]/40'
                      : 'bg-[#F1F5F9] dark:bg-[#1B2640] text-[#475569] dark:text-[#CBD5E1] hover:text-[#0F172A] dark:hover:text-white border border-transparent'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Language Selection */}
            <div className="flex items-center gap-1.5">
              <span className="text-[#334155] dark:text-[#CBD5E1] font-semibold text-[11px] mr-1">Language:</span>
              {[
                { id: 'English',  label: 'English' },
                { id: 'Hindi',    label: 'हिंदी' },
                { id: 'Hinglish', label: 'Hinglish (Mix)' }
              ].map(lang => {
                const cur = (selectedLang || 'English').toLowerCase();
                const isSelected = lang.id === 'Hinglish'
                  ? cur === 'hinglish'
                  : lang.id === 'Hindi'
                  ? cur === 'hindi'
                  : cur === 'english' || cur === 'en';

                return (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => onChangeLanguage && onChangeLanguage(lang.id)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                      isSelected
                        ? 'bg-[#EFF6FF] dark:bg-[#3B82F6]/20 text-[#2563EB] dark:text-[#60A5FA] border border-[#2563EB]/40'
                        : 'bg-[#F1F5F9] dark:bg-[#1B2640] text-[#475569] dark:text-[#CBD5E1] hover:text-[#0F172A] dark:hover:text-white border border-transparent'
                    }`}
                  >
                    {lang.label}
                  </button>
                );
              })}
            </div>

            {/* Very Long Video Option */}
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[#334155] dark:text-[#CBD5E1] font-semibold text-[11px]">3+ Hr Mode:</span>
              <select
                value={maxMinutes}
                onChange={(e) => setMaxMinutes(e.target.value)}
                className="bg-[#F1F5F9] dark:bg-[#1B2640] text-[#334155] dark:text-[#CBD5E1] border border-[#E2E8F0] dark:border-[#23314F] text-[11px] font-semibold rounded-lg px-2 py-1 outline-none cursor-pointer"
              >
                <option value="full">Full Lecture</option>
                <option value="60">First 60 mins</option>
                <option value="90">First 90 mins</option>
                <option value="120">First 120 mins</option>
              </select>
            </div>

          </div>

        </form>

        {/* ── Stepper Progress Notification ("Part 3 of 8") ── */}
        {isLoading && (
          <div className="mt-5 p-5 rounded-xl border border-[#E2E8F0] dark:border-[#23314F] bg-[#F8FAFC] dark:bg-[#0B0F17] animate-fade-slide-up space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB] dark:bg-[#3B82F6] animate-ping" />
                <span className="font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                  Lecture-to-Copy Engine in Progress
                </span>
              </div>
              <span className="text-[#2563EB] dark:text-[#60A5FA] font-mono text-xs font-bold">
                Part {stepIdx + 1} of {PROGRESS_STEPS.length}
              </span>
            </div>

            {/* Shimmer Loading Bar */}
            <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden relative">
              <div
                className="h-full shimmer-bar transition-all duration-500 rounded-full"
                style={{ width: `${((stepIdx + 1) / PROGRESS_STEPS.length) * 100}%` }}
              />
            </div>

            <p className="text-xs text-[#334155] dark:text-[#CBD5E1] font-medium flex items-center gap-2 pt-1 font-mono">
              <span className="text-[#2563EB] dark:text-[#60A5FA] font-bold">→</span>
              <span>{PROGRESS_STEPS[stepIdx]}</span>
            </p>
          </div>
        )}

        {/* ── Error Display with Actionable Guidance ── */}
        {error && (
          <div className="mt-5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-xl p-4 text-red-700 dark:text-red-300 text-xs flex items-start gap-3 animate-fade-slide-up">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold block mb-1">Lecture Processing Notice:</span>
              <p className="leading-relaxed mb-2 font-mono text-xs">{error}</p>
              <p className="text-[#334155] dark:text-[#CBD5E1]">
                Tip: Click any instant demo lecture below to immediately explore the full handwritten copy experience!
              </p>
            </div>
          </div>
        )}

      </div>

      {/* ── Instant Demo Lectures (High-Contrast, WCAG AA) ── */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-bold text-[#334155] dark:text-[#CBD5E1] uppercase tracking-wider font-mono">
            Instant Demo Lectures (1-Click Test)
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">Different channels & subjects</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PRESET_VIDEOS.map((preset) => (
            <div
              key={preset.id}
              onClick={() => handlePresetSelect(preset)}
              className="bg-white dark:bg-[#131B2E] border border-[#E2E8F0] dark:border-[#23314F] hover:border-[#2563EB] dark:hover:border-[#3B82F6] hover:shadow-sm p-4 rounded-xl cursor-pointer transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#EFF6FF] dark:bg-[#3B82F6]/20 text-[#2563EB] dark:text-[#60A5FA]">
                    {preset.subject}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                    {preset.duration}
                  </span>
                </div>

                <h4 className="font-bold text-xs sm:text-sm text-[#0F172A] dark:text-[#F8FAFC] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors line-clamp-2 leading-snug">
                  {preset.title}
                </h4>

                <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8] mt-1 truncate">
                  ⚡ OmniStudy AI Classroom Topper Copy
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#64748B] dark:text-[#94A3B8] mt-3 pt-2.5 border-t border-[#F1F5F9] dark:border-[#23314F]">
                <span className="truncate">{preset.exam}</span>
                <span className="text-[#2563EB] dark:text-[#60A5FA] font-bold group-hover:translate-x-0.5 transition-transform shrink-0 flex items-center gap-1">
                  View Notes →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
