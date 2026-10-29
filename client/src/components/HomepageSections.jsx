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
  Sparkles,
  BookOpen,
  CheckCircle2
} from 'lucide-react';

/* ─────────────────────────────────────────────
   1. HOW IT WORKS – Clean, 3-Step Workflow
───────────────────────────────────────────── */
export function HowItWorks() {
  const steps = [
    {
      step: '01',
      icon: LinkIcon,
      title: 'Paste YouTube Lecture Link',
      desc: 'Paste any single YouTube lecture, long one-shot video, or entire playlist link in the input above.',
    },
    {
      step: '02',
      icon: Zap,
      title: 'AI Synthesizes Topper Notes',
      desc: 'Blackboard writing, vector diagrams, derivations, math formulas, and exam PYQs are cleanly organized.',
    },
    {
      step: '03',
      icon: Download,
      title: 'Study, Revise or Download PDF',
      desc: 'Read structured notes, practice MCQs, ask doubt questions in Hindi/Hinglish, or export clean PDFs.',
    },
  ];

  return (
    <section aria-labelledby="how-it-works-heading" className="w-full max-w-4xl mx-auto px-3 sm:px-4 my-10">
      <div className="flex items-center gap-2 mb-2 justify-center">
        <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
          Simple 3-Step Process
        </span>
      </div>
      <div className="text-center mb-8">
        <h2
          id="how-it-works-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']"
        >
          How OmniStudy AI Works
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-lg mx-auto">
          Turn hours of unorganized lecture backlogs into concise, high-yield classroom revision notes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {steps.map(({ step, icon: Icon, title, desc }) => (
          <div
            key={step}
            className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col items-start text-left shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200"
          >
            <div className="flex items-center justify-between w-full mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                <Icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
                {step}
              </span>
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2 font-['Plus_Jakarta_Sans']">
              {title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   2. FEATURES GRID – 4 Focused Cards
───────────────────────────────────────────── */
export function FeaturesGrid() {
  const features = [
    {
      title: 'Vector Blackboard Diagrams',
      desc: 'Automatic extraction of board drawings, circuits, and flowcharts into crisp SVGs that stay sharp at any zoom level.',
      icon: FileText,
    },
    {
      title: 'Exam PYQs & Step-by-Step Solutions',
      desc: 'Curated previous year questions matching exam weightage with detailed derivations and elimination shortcuts.',
      icon: Award,
    },
    {
      title: 'Multilingual Study & Explanations',
      desc: 'Read notes and resolve doubts in English, Hindi, or conversational Hinglish for deeper conceptual clarity.',
      icon: Globe2,
    },
    {
      title: 'Export to PDF & Markdown',
      desc: 'Clean, print-friendly A4 PDF notes without conversion artifacts, plus clean Markdown export for personal knowledge bases.',
      icon: Download,
    },
  ];

  return (
    <section aria-labelledby="features-heading" className="w-full max-w-4xl mx-auto px-3 sm:px-4 my-10">
      <div className="flex items-center gap-2 mb-2 justify-center">
        <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
          Academic Toolkit
        </span>
      </div>
      <div className="text-center mb-8">
        <h2
          id="features-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']"
        >
          Built for Serious Exam Preparation
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-lg mx-auto">
          Every tool designed to maximize retention, formula accuracy, and exam recall speed.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map(({ title, desc, icon: Icon }) => (
          <div
            key={title}
            className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex gap-4 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
              <Icon className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5 font-['Plus_Jakarta_Sans']">
                {title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
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
   3. TELEGRAM BOT REVISION CALLOUT
───────────────────────────────────────────── */
export function TelegramBanner() {
  return (
    <section aria-labelledby="telegram-banner-heading" className="w-full max-w-4xl mx-auto px-3 sm:px-4 my-10">
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131B2E] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700" aria-hidden="true">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 id="telegram-banner-heading" className="font-bold text-sm sm:text-base text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
                Revise on Your Phone with Telegram Bot
              </h3>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                @omnistudy_notes_bot
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md font-sans leading-relaxed">
              Forward any YouTube lecture link directly to the bot on Telegram to receive study PDFs and ask doubts on mobile.
            </p>
          </div>
        </div>

        <a
          href="https://t.me/omnistudy_notes_bot"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open OmniStudy Telegram Bot (opens in new tab)"
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer shadow-xs min-h-[44px] font-sans"
        >
          <span>Open Telegram Bot</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   COMBINED EXPORT
───────────────────────────────────────────── */
export default function HomepageSections() {
  return (
    <div className="space-y-4">
      {/* 1. How it works */}
      <HowItWorks />
      {/* 2. Core Features */}
      <FeaturesGrid />
      {/* 3. Telegram Revision Bot */}
      <TelegramBanner />
      {/* Bottom spacer */}
      <div className="h-6 sm:h-8" aria-hidden="true" />
    </div>
  );
}
