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
          role="button"
          tabIndex={0}
          aria-label="OmniStudy AI Homepage"
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTab('generator'); } }}
          className="flex items-center gap-2 sm:gap-2.5 cursor-pointer select-none group shrink-0 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-lg px-1 -ml-1"
          onClick={() => setActiveTab('generator')}
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" aria-hidden="true" />
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
        <nav
          role="tablist"
          aria-label="Desktop navigation tabs"
          className="hidden md:flex items-center gap-1 bg-[#F1F5F9] dark:bg-[#0B0F17] p-1 rounded-full border border-[#E2E8F0] dark:border-[#23314F]"
        >
          {NAV_TABS.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                type="button"
                role="tab"
                id={`desktop-tab-${id}`}
                aria-selected={isActive}
                aria-controls={`tab-content-${id}`}
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer min-h-[38px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#131B2E] ${
                  isActive
                    ? 'bg-white dark:bg-[#1B2640] text-[#0F172A] dark:text-[#F8FAFC] shadow-sm border border-slate-200/80 dark:border-slate-700'
                    : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#2563EB] dark:text-[#60A5FA]' : 'text-slate-400 dark:text-slate-500'}`} aria-hidden="true" />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>

        {/* ── 3. Right: Theme Toggle + Language Toggle + User/Login ── */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">

          {/* Mobile Single-Button Smart Theme Toggle (< sm) — min 44px tap target */}
          <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="sm:hidden p-2.5 rounded-full bg-[#F1F5F9] dark:bg-[#0B0F17] border border-[#E2E8F0] dark:border-[#23314F] text-[#64748B] dark:text-[#94A3B8] hover:text-[#2563EB] transition-all min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
            aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" /> : <Moon className="w-4 h-4 text-indigo-600" aria-hidden="true" />}
          </button>

          {/* Desktop 3-Option Segmented Pill (Light / Dark / System) (>= sm) */}
          <div
            className="hidden sm:flex bg-[#F1F5F9] dark:bg-[#0B0F17] p-1 rounded-full border border-[#E2E8F0] dark:border-[#23314F] items-center shadow-inner"
            role="group"
            aria-label="Theme selector"
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
                aria-pressed={theme === id}
                aria-label={`Theme: ${label}`}
                className={`p-2 rounded-full text-xs transition-all duration-150 min-h-[36px] min-w-[36px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                  theme === id
                    ? 'bg-white dark:bg-[#1B2640] text-[#2563EB] dark:text-[#60A5FA] shadow-sm'
                    : 'text-[#64748B] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
                }`}
                title={`Theme: ${label}`}
              >
                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            ))}
          </div>

          {/* 3-Language 1-Click Pill Switch: English, Hindi, Hinglish */}
          <div
            className="bg-[#F1F5F9] dark:bg-[#0B0F17] p-0.5 sm:p-1 rounded-full border border-[#E2E8F0] dark:border-[#23314F] flex items-center shadow-inner"
            role="group"
            aria-label="Language options"
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
                  aria-pressed={isSelected}
                  aria-label={title}
                  className={`px-2 sm:px-3 py-1.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-150 cursor-pointer min-h-[36px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
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

          {/* User Status: Prominent Login Button (Guest) OR Avatar + Logout (Logged In) */}
          {user && user.isGuest ? (
            <button
              type="button"
              onClick={onOpenAuth}
              aria-label="Login or create a free account"
              className="flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB] text-white text-xs sm:text-sm font-bold transition-all shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#131B2E] min-h-[44px] cursor-pointer"
              title="Login or Create Account — Free to start"
            >
              <LogIn className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="font-bold">Login</span>
            </button>
          ) : user ? (
            <div className="flex items-center gap-1.5 sm:gap-2 ml-0.5 sm:ml-1">
              <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-1.5 rounded-full bg-[#F1F5F9] dark:bg-[#0B0F17] border border-[#E2E8F0] dark:border-[#23314F] min-h-[44px]">
                <div className="w-6 h-6 rounded-full bg-[#2563EB] flex items-center justify-center text-white font-bold text-[10px] shrink-0" aria-hidden="true">
                  {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                </div>
                <span className="text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC] hidden sm:inline max-w-[80px] truncate">
                  {user.name}
                </span>
              </div>
              <button
                type="button"
                onClick={onLogout}
                aria-label="Logout"
                title="Logout"
                className="p-2 sm:p-2.5 rounded-full bg-[#F1F5F9] dark:bg-[#0B0F17] border border-[#E2E8F0] dark:border-[#23314F] text-[#64748B] hover:text-red-500 dark:hover:text-red-400 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              >
                <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          ) : null}

        </div>

      </div>

      {/* ── 2b. Mobile (360px) Header Compact Tabs with Horizontal Scroll ── */}
      <div className="md:hidden w-full border-t border-[#E2E8F0] dark:border-[#23314F] bg-white/95 dark:bg-[#131B2E]/95 px-2.5 py-1.5 overflow-x-auto no-scrollbar scroll-smooth">
        <div className="flex items-center gap-1.5 min-w-max" role="tablist" aria-label="Mobile header tabs">
          {NAV_TABS.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                id={`mobile-head-tab-${id}`}
                aria-selected={isActive}
                aria-controls={`tab-content-${id}`}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap min-h-[44px] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                  isActive
                    ? 'bg-[#2563EB] text-white shadow-xs font-bold'
                    : 'bg-[#F1F5F9] dark:bg-[#0B0F17] text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white border border-[#E2E8F0] dark:border-[#23314F]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} aria-hidden="true" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>

    {/* ── 4. Mobile Phone Bottom Navigation Bar (Fixed, Accessible) ── */}
    <nav
      role="tablist"
      aria-label="Mobile bottom navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#131B2E]/95 backdrop-blur-lg border-t border-[#E2E8F0] dark:border-[#23314F] px-1 py-1.5 flex items-center justify-around shadow-2xl"
    >
      {NAV_TABS.map(({ id, label, icon: Icon }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={label}
            onClick={() => setActiveTab(id)}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all cursor-pointer min-w-[64px] min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
              isActive
                ? 'text-[#2563EB] dark:text-[#60A5FA] bg-blue-50/90 dark:bg-blue-500/15 font-bold'
                : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white font-medium'
            }`}
          >
            <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-[#2563EB] dark:text-[#60A5FA] scale-110' : 'text-slate-400 dark:text-slate-500'} transition-transform`} aria-hidden="true" />
            <span className="text-[10px] leading-tight font-medium">{label}</span>
          </button>
        );
      })}
    </nav>
    </>
  );
}
