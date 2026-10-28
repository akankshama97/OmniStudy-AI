import React from 'react';
import {
  Link as LinkIcon,
  Zap,
  Download,
  FileText,
  Award,
  Globe2,
  Send,
  ArrowRight
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
   2. FEATURES GRID – 4 Cards
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
   COMBINED EXPORT
───────────────────────────────────────────── */
export default function HomepageSections() {
  return (
    <div className="space-y-1">
      {/* 0. Telegram Banner directly below sample cards */}
      <TelegramBanner />
      {/* 1. "How it works" */}
      <HowItWorks />
      {/* 2. Features Grid (4 cards) */}
      <FeaturesGrid />
      {/* 3. Stats Line (Placeholder) */}
      <StatsLine />
      {/* Bottom spacer for mobile navbar */}
      <div className="h-6 sm:h-8" aria-hidden="true" />
    </div>
  );
}
