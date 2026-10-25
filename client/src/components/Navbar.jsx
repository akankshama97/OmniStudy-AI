import React from 'react';
import {
  BookOpen, FileSpreadsheet, Library, Sparkles, Sun, Moon, Monitor, MessageSquare, LogOut, LogIn
} from 'lucide-react';

const NAV_TABS = [
  { id: 'generator', label: 'Notes', icon: BookOpen },
  { id: 'pyq',       label: 'PYQ',   icon: FileSpreadsheet },
  { id: 'chatbot',   label: 'Doubt Solver', icon: MessageSquare },
  { id: 'saved',     label: 'Saved', icon: Library },
];

export default function Navbar({
  activeTab,
  setActiveTab,
  selectedLang,
  setSelectedLang,
  theme,
  setTheme,
  isDark,
  user,
  onLogout,
  onOpenAuth
}) {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-[#131B2E]/95 backdrop-blur-md border-b border-[#E2E8F0] dark:border-[#23314F] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3 sm:gap-4">

        {/* ── 1. Logo (Left) ── */}
        <div
          className="flex items-center gap-2.5 cursor-pointer select-none group shrink-0"
          onClick={() => setActiveTab('generator')}
        >
          <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
            <Sparkles className="w-4 h-4 fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight text-[#0F172A] dark:text-[#F8FAFC] font-['Plus_Jakarta_Sans'] leading-tight">
              OmniStudy AI
            </span>
            <span className="text-[10px] text-[#2563EB] dark:text-[#60A5FA] font-semibold leading-none">
              by Akanksha Maurya
            </span>
          </div>
        </div>

        {/* ── 2. Center: Notes | PYQ | Doubt Solver | Saved ── */}
        <nav className="flex items-center gap-1 bg-[#F1F5F9] dark:bg-[#0B0F17] p-1 rounded-full border border-[#E2E8F0] dark:border-[#23314F]">
          {NAV_TABS.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-white dark:bg-[#1B2640] text-[#0F172A] dark:text-[#F8FAFC] shadow-sm border border-slate-200/80 dark:border-slate-700'
                    : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#2563EB] dark:text-[#60A5FA]' : 'text-slate-400 dark:text-slate-500'}`} />
                <span className="hidden sm:inline">{label}</span>
              </button>
            );
          })}
        </nav>

        {/* ── 3. Right: Theme Toggle (Sun/Moon/System) + Language Toggle (EN | HI | HING) ── */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">

          {/* Theme Toggle (Light / Dark / System) */}
          <div
            className="bg-[#F1F5F9] dark:bg-[#0B0F17] p-1 rounded-full border border-[#E2E8F0] dark:border-[#23314F] flex items-center shadow-inner"
            title="Theme: Light / Dark / System"
          >
            {[
              { id: 'light', icon: Sun, label: 'Light' },
              { id: 'dark', icon: Moon, label: 'Dark' },
              { id: 'system', icon: Monitor, label: 'System' },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTheme(id)}
                className={`p-1.5 rounded-full text-xs transition-all duration-150 ${
                  theme === id
                    ? 'bg-white dark:bg-[#1B2640] text-[#2563EB] dark:text-[#60A5FA] shadow-sm'
                    : 'text-[#64748B] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
                }`}
                title={`Theme: ${label}`}
              >
                <Icon className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>

          {/* 3-Language 1-Click Pill Switch: English, Hindi, Hinglish */}
          <div
            className="bg-[#F1F5F9] dark:bg-[#0B0F17] p-1 rounded-full border border-[#E2E8F0] dark:border-[#23314F] flex items-center shadow-inner"
            title="Toggle Language: English | हिंदी | Hinglish"
          >
            {[
              { id: 'English',  label: 'EN',   title: 'English' },
              { id: 'Hindi',    label: 'HI',   title: 'हिंदी (Hindi)' },
              { id: 'Hinglish', label: 'HING', title: 'Hinglish (Mix)' },
            ].map(({ id, label, title }) => {
              const cur = (selectedLang || 'English').toLowerCase();
              const isSelected = id === 'Hinglish'
                ? cur === 'hinglish'
                : id === 'Hindi'
                ? cur === 'hindi'
                : cur === 'english' || cur === 'en';

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSelectedLang(id)}
                  className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-[#2563EB] text-white shadow-xs font-extrabold'
                      : 'text-[#64748B] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                  }`}
                  title={title}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* User Status: Login Button (Guest) OR Avatar + Logout (Logged In) */}
          {user && user.isGuest ? (
            <button
              type="button"
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-sm"
              title="Login or Create Account"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>
          ) : user ? (
            <div className="flex items-center gap-2 ml-1">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F1F5F9] dark:bg-[#0B0F17] border border-[#E2E8F0] dark:border-[#23314F]">
                <div className="w-6 h-6 rounded-full bg-[#2563EB] flex items-center justify-center text-white font-bold text-[10px] shrink-0">
                  {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                </div>
                <span className="text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC] hidden sm:inline max-w-[80px] truncate">
                  {user.name}
                </span>
              </div>
              <button
                type="button"
                onClick={onLogout}
                title="Logout"
                className="p-2 rounded-full bg-[#F1F5F9] dark:bg-[#0B0F17] border border-[#E2E8F0] dark:border-[#23314F] text-[#64748B] hover:text-red-500 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-500/40 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : null}

        </div>

      </div>
    </header>
  );
}
