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
    <>
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-[#131B2E]/95 backdrop-blur-md border-b border-[#E2E8F0] dark:border-[#23314F] transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">

        {/* ── 1. Logo (Left) ── */}
        <div
          className="flex items-center gap-2 sm:gap-2.5 cursor-pointer select-none group shrink-0"
          onClick={() => setActiveTab('generator')}
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm sm:text-base tracking-tight text-[#0F172A] dark:text-[#F8FAFC] font-['Plus_Jakarta_Sans'] leading-tight">
              OmniStudy AI
            </span>
            <span className="text-[9px] sm:text-[10px] text-[#2563EB] dark:text-[#60A5FA] font-semibold leading-none hidden xs:inline">
              by Akanksha Maurya
            </span>
          </div>
        </div>

        {/* ── 2. Center: Notes | PYQ | Doubt Solver | Saved (Desktop / Laptop View) ── */}
        <nav className="hidden md:flex items-center gap-1 bg-[#F1F5F9] dark:bg-[#0B0F17] p-1 rounded-full border border-[#E2E8F0] dark:border-[#23314F]">
          {NAV_TABS.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                type="button"
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-[#1B2640] text-[#0F172A] dark:text-[#F8FAFC] shadow-sm border border-slate-200/80 dark:border-slate-700'
                    : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#2563EB] dark:text-[#60A5FA]' : 'text-slate-400 dark:text-slate-500'}`} />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>

        {/* ── 3. Right: Theme Toggle + Language Toggle + User/Login ── */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">

          {/* Mobile Single-Button Smart Theme Toggle (< sm) */}
          <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="sm:hidden p-1.5 rounded-full bg-[#F1F5F9] dark:bg-[#0B0F17] border border-[#E2E8F0] dark:border-[#23314F] text-[#64748B] dark:text-[#94A3B8] hover:text-[#2563EB] transition-all"
            title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
          >
            {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-600" />}
          </button>

          {/* Desktop 3-Option Segmented Pill (Light / Dark / System) (>= sm) */}
          <div
            className="hidden sm:flex bg-[#F1F5F9] dark:bg-[#0B0F17] p-1 rounded-full border border-[#E2E8F0] dark:border-[#23314F] items-center shadow-inner"
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
            className="bg-[#F1F5F9] dark:bg-[#0B0F17] p-0.5 sm:p-1 rounded-full border border-[#E2E8F0] dark:border-[#23314F] flex items-center shadow-inner"
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
                  className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-150 cursor-pointer ${
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
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[11px] sm:text-xs font-bold transition-all shadow-sm shrink-0"
              title="Login or Create Account"
            >
              <LogIn className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden xs:inline sm:inline">Login</span>
            </button>
          ) : user ? (
            <div className="flex items-center gap-1.5 sm:gap-2 ml-0.5 sm:ml-1">
              <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#F1F5F9] dark:bg-[#0B0F17] border border-[#E2E8F0] dark:border-[#23314F]">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#2563EB] flex items-center justify-center text-white font-bold text-[9px] sm:text-[10px] shrink-0">
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
                className="p-1.5 sm:p-2 rounded-full bg-[#F1F5F9] dark:bg-[#0B0F17] border border-[#E2E8F0] dark:border-[#23314F] text-[#64748B] hover:text-red-500 dark:hover:text-red-400 transition-all"
              >
                <LogOut className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
          ) : null}

        </div>

      </div>
    </header>

    {/* ── 4. Mobile Phone Bottom Navigation Bar (Fixed, Accessible) ── */}
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#131B2E]/95 backdrop-blur-lg border-t border-[#E2E8F0] dark:border-[#23314F] px-1 py-1.5 flex items-center justify-around shadow-2xl">
      {NAV_TABS.map(({ id, label, icon: Icon }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer min-w-[60px] ${
              isActive
                ? 'text-[#2563EB] dark:text-[#60A5FA] bg-blue-50/90 dark:bg-blue-500/15 font-bold'
                : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white font-medium'
            }`}
          >
            <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-[#2563EB] dark:text-[#60A5FA] scale-110' : 'text-slate-400 dark:text-slate-500'} transition-transform`} />
            <span className="text-[10px] leading-tight">{label}</span>
          </button>
        );
      })}
    </nav>
    </>
  );
}
