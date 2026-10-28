import React from 'react';
import {
  Link as LinkIcon,
  Zap,
  Download,
  FileText,
  Award,
  Globe2,
  Send,
  ArrowRight,
  ArrowUp,
  Sparkles
} from 'lucide-react';

/* ─────────────────────────────────────────────
   0. TELEGRAM BOT CONNECT BANNER
───────────────────────────────────────────── */
export function TelegramBanner() {
  return (
    <section aria-labelledby="telegram-banner-heading" className="w-full max-w-4xl mx-auto px-3 sm:px-4 my-6 sm:my-8">
      <div className="p-4 sm:p-5 rounded-2xl border border-sky-200/90 dark:border-sky-800/60 bg-gradient-to-r from-sky-50/80 via-blue-50/50 to-indigo-50/40 dark:from-[#0c1424] dark:via-[#111c33] dark:to-[#0f172a] shadow-xs hover:shadow-sm transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#229ED9] text-white flex items-center justify-center shadow-xs shrink-0" aria-hidden="true">
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z"/>
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 id="telegram-banner-heading" className="font-bold text-sm text-[#0F172A] dark:text-[#F8FAFC] font-['Plus_Jakarta_Sans']">
                Study Directly on Telegram Bot
              </h4>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#229ED9]/15 text-[#0088cc] dark:text-sky-400 border border-sky-400/30">
                @omnistudy_notes_bot
              </span>
            </div>
            <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-0.5 font-sans">
              Send any YouTube link on Telegram to get Topper PDF notes &amp; ask doubts anytime on your phone.
            </p>
          </div>
        </div>

        <a
          href="https://t.me/omnistudy_notes_bot"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open OmniStudy Telegram Bot (opens in new tab)"
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl border-2 border-[#0284C7] dark:border-sky-500 text-[#0284C7] dark:text-sky-300 bg-white/90 dark:bg-[#131B2E] hover:bg-sky-50 dark:hover:bg-sky-950/50 hover:border-[#0369A1] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer shadow-xs active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 min-h-[44px] font-sans"
        >
          <span>Open Telegram Bot</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   1. HOW IT WORKS – 3 Step Cards with Icons
───────────────────────────────────────────── */
export function HowItWorks() {
  const steps = [
    {
      step: '1',
      icon: LinkIcon,
      color: 'bg-blue-100 dark:bg-blue-900/40 text-[#2563EB] dark:text-[#60A5FA]',
      title: '1. YouTube Link Paste Karo',
      desc: 'Kisi bhi YouTube video, lecture ya playlist ka link copy karke upar input box me paste karo.',
    },
    {
      step: '2',
      icon: Zap,
      color: 'bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400',
      title: '2. AI Blackboard Notes Banata Hai',
      desc: 'AI blackboard notes, clear vector diagrams, formulas aur solved PYQs kuch hi seconds me taiyyar karta hai.',
    },
    {
      step: '3',
      icon: Download,
      color: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400',
      title: '3. PDF Download Karo ya Doubt Pucho',
      desc: 'PDF download karo, Hindi/Hinglish me concept doubts pucho, ya direct Telegram par revise karo.',
    },
  ];

  return (
    <section aria-labelledby="how-it-works-heading" className="w-full max-w-4xl mx-auto px-3 sm:px-4 my-6 sm:my-8">
      <div className="text-center mb-6">
        <h2
          id="how-it-works-heading"
          className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC] font-['Plus_Jakarta_Sans']"
        >
          How It Works
        </h2>
        <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-1 font-sans">
          3 simple steps me lecture backlog ko Topper Notes me badlo
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {steps.map(({ step, icon: Icon, color, title, desc }) => (
          <div
            key={step}
            className="relative bg-white dark:bg-[#131B2E] border border-[#E2E8F0] dark:border-[#23314F] rounded-2xl p-5 flex flex-col items-center text-center shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#2563EB] text-white text-[11px] font-black flex items-center justify-center shadow">
              {step}
            </span>
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 mt-2 ${color}`}>
              <Icon className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-sm text-[#0F172A] dark:text-[#F8FAFC] mb-1.5 font-['Plus_Jakarta_Sans']">
              {title}
            </h3>
            <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed font-sans">
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   2. OUTPUT PREVIEW – Sample Notes Mockup
   Caption: "Aisa dikhenge tumhare notes"
───────────────────────────────────────────── */
export function OutputPreview() {
  return (
    <section aria-labelledby="output-preview-heading" className="w-full max-w-4xl mx-auto px-3 sm:px-4 my-6 sm:my-8">
      <div className="text-center mb-4">
        <h2
          id="output-preview-heading"
          className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC] font-['Plus_Jakarta_Sans']"
        >
          Output Preview
        </h2>
        <p className="text-xs sm:text-sm font-semibold text-[#2563EB] dark:text-[#60A5FA] mt-1 font-sans">
          Aisa dikhenge tumhare notes
        </p>
      </div>

      {/* Mini Notes Mockup Card */}
      <div
        className="bg-white dark:bg-[#0D1526] border border-[#E2E8F0] dark:border-[#23314F] rounded-2xl overflow-hidden shadow-sm"
        role="region"
        aria-label="Sample notes preview mockup"
      >
        {/* Fake toolbar */}
        <div className="bg-[#F1F5F9] dark:bg-[#131B2E] border-b border-[#E2E8F0] dark:border-[#23314F] px-4 py-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <span className="text-[11px] font-semibold text-[#475569] dark:text-[#94A3B8] ml-1">
              📖 COA Unit 1 — Computer Organization &amp; Architecture
            </span>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#EFF6FF] dark:bg-[#3B82F6]/20 text-[#2563EB] dark:text-[#60A5FA] border border-[#2563EB]/20">
            Topper Copy
          </span>
        </div>

        <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Left Column: Heading + Blackboard Diagram Placeholder */}
          <div className="rounded-xl border border-[#E2E8F0] dark:border-[#23314F] bg-[#F8FAFC] dark:bg-[#090E1A] p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-[#2563EB] dark:text-[#60A5FA] uppercase tracking-wider">
                  📐 Blackboard Diagram
                </span>
                <span className="text-[10px] text-slate-500 font-sans">SVG Vector</span>
              </div>
              <h4 className="font-bold text-xs text-[#0F172A] dark:text-white mb-2 font-sans">
                Basic Computer System &amp; CPU Architecture
              </h4>
              
              {/* CPU block diagram SVG */}
              <svg viewBox="0 0 200 100" className="w-full h-24 sm:h-28 my-1" aria-hidden="true">
                <rect x="8" y="32" width="46" height="36" rx="4" fill="none" stroke="#2563EB" strokeWidth="1.5"/>
                <text x="31" y="48" textAnchor="middle" fontSize="7" fill="#2563EB" fontWeight="bold">Input</text>
                <text x="31" y="58" textAnchor="middle" fontSize="6.5" fill="#2563EB">Unit</text>

                <rect x="74" y="16" width="52" height="68" rx="4" fill="none" stroke="#7C3AED" strokeWidth="1.5"/>
                <text x="100" y="44" textAnchor="middle" fontSize="7" fill="#7C3AED" fontWeight="bold">CPU</text>
                <text x="100" y="54" textAnchor="middle" fontSize="6" fill="#7C3AED">(ALU + CU)</text>

                <rect x="146" y="32" width="46" height="36" rx="4" fill="none" stroke="#059669" strokeWidth="1.5"/>
                <text x="169" y="48" textAnchor="middle" fontSize="7" fill="#059669" fontWeight="bold">Output</text>
                <text x="169" y="58" textAnchor="middle" fontSize="6.5" fill="#059669">Unit</text>

                <rect x="74" y="88" width="52" height="10" rx="2" fill="none" stroke="#D97706" strokeWidth="1.2"/>
                <text x="100" y="96" textAnchor="middle" fontSize="6" fill="#D97706" fontWeight="bold">Memory Bus</text>

                <line x1="54" y1="50" x2="74" y2="50" stroke="#94A3B8" strokeWidth="1"/>
                <line x1="126" y1="50" x2="146" y2="50" stroke="#94A3B8" strokeWidth="1"/>
              </svg>
            </div>

            <p className="text-[10px] text-[#64748B] dark:text-[#94A3B8] text-center mt-2 font-sans">
              Auto-generated clean vector diagram from lecture blackboard
            </p>
          </div>

          {/* Right Column: Formula + Solved PYQ Snippet + Teacher Tip */}
          <div className="space-y-3">
            {/* 1. Formula Box */}
            <div className="rounded-xl border border-teal-300 dark:border-teal-700/60 bg-teal-50/70 dark:bg-teal-950/25 p-3">
              <span className="text-[10px] font-bold text-teal-800 dark:text-teal-400 uppercase tracking-wider block mb-1">
                📐 Formula Snippet
              </span>
              <p className="text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC] font-sans">
                CPI = (Total Clock Cycles) / (Total Instructions)
              </p>
              <p className="text-[10px] text-teal-900 dark:text-teal-300 mt-1 font-sans">
                MIPS = Clock Rate / (CPI × 10⁶)
              </p>
            </div>

            {/* 2. Solved PYQ Snippet */}
            <div className="rounded-xl border border-amber-300 dark:border-amber-700/60 bg-amber-50/70 dark:bg-amber-950/25 p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
                  🎯 Solved PYQ Snippet · GATE
                </span>
                <span className="text-[9px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/50 px-1.5 py-0.5 rounded">
                  2 Marks
                </span>
              </div>
              <p className="text-[11px] font-semibold text-[#0F172A] dark:text-[#F8FAFC] leading-snug font-sans">
                Q: A processor has 8 general purpose registers. How many bits are needed to address all registers?
              </p>
              <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold mt-1.5 font-sans">
                ✅ Solution: 3 bits (because 2³ = 8 registers)
              </p>
            </div>

            {/* 3. Teacher Tip */}
            <div className="rounded-xl border border-indigo-200 dark:border-indigo-800/60 bg-indigo-50/50 dark:bg-indigo-950/20 p-2.5">
              <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider block mb-0.5">
                💡 Teacher Exam Tip
              </span>
              <p className="text-[10px] text-[#475569] dark:text-[#CBD5E1] font-sans">
                "Register addressing fastest hota hai — speed hierarchy me Registers &gt; Cache &gt; RAM yaad rakhein."
              </p>
            </div>
          </div>
        </div>

        {/* Footer Caption */}
        <div className="bg-[#F8FAFC] dark:bg-[#131B2E] border-t border-[#E2E8F0] dark:border-[#23314F] px-4 py-2.5 text-center">
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 font-sans">
            Aisa dikhenge tumhare notes — complete with formulas, diagrams, PYQs &amp; explanations
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   3. FEATURES GRID – 4 Cards
───────────────────────────────────────────── */
export function FeaturesGrid() {
  const features = [
    {
      title: 'Blackboard SVG Diagrams',
      desc: 'Lecture video ke board writing aur circuits se clean, scalable vector diagrams jo zoom karne par bhi blur nahi hote.',
      icon: FileText,
      color: 'text-[#2563EB] dark:text-[#60A5FA]',
      bg: 'bg-blue-50 dark:bg-blue-900/30',
    },
    {
      title: 'Solved PYQs Included',
      desc: 'Har topic ke top previous year questions with step-by-step solutions, elimination tricks aur exam weightage.',
      icon: Award,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-900/30',
    },
    {
      title: 'Hinglish / Hindi Support',
      desc: 'English, हिंदी ya Hinglish me notes padho aur doubts pucho. Conceptual clarity apni bhasha me paayein.',
      icon: Globe2,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-900/30',
    },
    {
      title: 'Telegram Bot — Study on Phone',
      desc: '@omnistudy_notes_bot par direct link send karke instant PDF download karo aur phone par revision karo.',
      icon: Send,
      color: 'text-sky-600 dark:text-sky-400',
      bg: 'bg-sky-50 dark:bg-sky-900/30',
    },
  ];

  return (
    <section aria-labelledby="features-heading" className="w-full max-w-4xl mx-auto px-3 sm:px-4 my-6 sm:my-8">
      <div className="text-center mb-6">
        <h2
          id="features-heading"
          className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC] font-['Plus_Jakarta_Sans']"
        >
          Features
        </h2>
        <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-1 font-sans">
          Har serious student ke liye purpose-built learning tools
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map(({ title, desc, icon: Icon, color, bg }) => (
          <div
            key={title}
            className="bg-white dark:bg-[#131B2E] border border-[#E2E8F0] dark:border-[#23314F] rounded-2xl p-4 sm:p-5 flex gap-3.5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${bg}`}>
              <Icon className={`w-5 h-5 ${color}`} aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#0F172A] dark:text-[#F8FAFC] mb-1 font-['Plus_Jakarta_Sans']">
                {title}
              </h3>
              <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed font-sans">
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   4. STATS LINE – Placeholder (e.g. 10,000+ notes generated)
───────────────────────────────────────────── */
export function StatsLine() {
  const stats = [
    { value: '10,000+', label: 'Notes Generated' },
    { value: '500+', label: 'Lectures Processed' },
    { value: '4', label: 'Major Exams Covered' },
    { value: '3', label: 'Languages Supported' },
  ];

  return (
    <section aria-labelledby="stats-heading" className="w-full max-w-4xl mx-auto px-3 sm:px-4 my-6 sm:my-8">
      <div className="bg-[#EFF6FF] dark:bg-[#131B2E] border border-[#BFDBFE] dark:border-[#23314F] rounded-2xl p-4 sm:p-5 shadow-xs">
        <h3 id="stats-heading" className="sr-only">Community Statistics</h3>
        
        {/* Main Stats Line */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          {stats.map(({ value, label }) => (
            <div key={label} className="p-2">
              <span className="text-xl sm:text-2xl font-black text-[#2563EB] dark:text-[#60A5FA] font-['Plus_Jakarta_Sans'] block">
                {value}
              </span>
              <span className="text-xs text-[#475569] dark:text-[#94A3B8] font-semibold mt-0.5 font-sans block">
                {label}
              </span>
            </div>
          ))}
        </div>

        <p className="text-center text-xs sm:text-[13px] text-slate-800 dark:text-slate-200 mt-2.5 font-bold font-sans">
          🔥 10,000+ notes generated by students across India
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   5. FINAL CTA STRIP – "Apna pehla lecture paste karo" + Smooth Scroll
───────────────────────────────────────────── */
export function FinalCTAStrip({ onScrollToInput }) {
  return (
    <section aria-labelledby="final-cta-heading" className="w-full max-w-4xl mx-auto px-3 sm:px-4 my-6 sm:my-8">
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#1E3A8A] text-white shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
        
        {/* Glow effects */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 max-w-xl space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/15 text-white text-[11px] font-bold border border-white/20 font-sans">
            <Sparkles className="w-3.5 h-3.5 fill-white" aria-hidden="true" />
            <span>100% Free · Instant Topper Notes</span>
          </div>
          <h2 id="final-cta-heading" className="text-xl sm:text-2xl font-extrabold font-['Plus_Jakarta_Sans'] tracking-tight leading-tight">
            Apna pehla lecture paste karo
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 font-sans leading-relaxed">
            Kisi bhi educational YouTube video ka URL daalo aur instant handwritten style notes pao.
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto shrink-0">
          <button
            type="button"
            onClick={onScrollToInput}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-[#1D4ED8] hover:bg-blue-50 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95 min-h-[46px] font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>⬆️ Apna Pehla Lecture Paste Karo</span>
            <ArrowUp className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   COMBINED EXPORT (In exact requested order)
───────────────────────────────────────────── */
export default function HomepageSections({ onScrollToInput }) {
  return (
    <div className="space-y-1">
      {/* 0. Telegram Banner directly below sample cards */}
      <TelegramBanner />
      {/* 1. "How it works" */}
      <HowItWorks />
      {/* 2. Output Preview ("Aisa dikhenge tumhare notes") */}
      <OutputPreview />
      {/* 3. Features Grid (4 cards) */}
      <FeaturesGrid />
      {/* 4. Stats Line (Placeholder) */}
      <StatsLine />
      {/* 5. Final CTA Strip ("Apna pehla lecture paste karo") */}
      <FinalCTAStrip onScrollToInput={onScrollToInput} />
      {/* Bottom spacer for mobile navbar */}
      <div className="h-6 sm:h-8" aria-hidden="true" />
    </div>
  );
}
