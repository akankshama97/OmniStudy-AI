import React from 'react';
import {
  BookOpen, FileSpreadsheet, Library, Sparkles, Sun, Moon, Monitor, MessageSquare, LogOut, LogIn, User
} from 'lucide-react';

export const NAV_TABS = [
  { id: 'generator', path: '/notes',        label: 'Notes',        icon: BookOpen },
  { id: 'pyq',       path: '/pyq',          label: 'PYQ',          icon: FileSpreadsheet },
  { id: 'chatbot',   path: '/doubt-solver', label: 'Doubt Solver', icon: MessageSquare },
  { id: 'saved',     path: '/saved',        label: 'Saved',        icon: Library },
];

export default function Navbar({
  activeTab,
  setActiveTab,
  onNavigate,
  onResetNotes,
  selectedLang,
  setSelectedLang,
  theme,
  setTheme,
  isDark,
  user,
  onLogout,
  onOpenAuth
}) {
  const handleNav = (id, path) => {
    if (id === 'generator' && activeTab === 'generator' && onResetNotes) {
      onResetNotes();
      return;
    }
    if (onNavigate) {
      onNavigate(path);
    } else if (setActiveTab) {
      setActiveTab(id);
    }
  };

  const isGuest = !user || user.isGuest;

  return (
    <>
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[#131B2E]/90 backdrop-blur-xl border-b border-[#E2E8F0]/80 dark:border-[#23314F]/80 transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">

        {/* ── 1. Logo (Left) ── */}
        <a
          href="/notes"
          aria-label="OmniStudy AI Homepage"
          onClick={(e) => {
            e.preventDefault();
            if (onResetNotes) {
              onResetNotes();
            } else {
              handleNav('generator', '/notes');
            }
          }}
          className="flex items-center gap-2 sm:gap-2.5 cursor-pointer select-none group shrink-0 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg px-1 -ml-1 text-decoration-none"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 dark:from-indigo-500 dark:to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/30 transition-transform duration-200 group-hover:scale-105">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm sm:text-base tracking-tight text-[#0F172A] dark:text-[#F8FAFC] font-['Plus_Jakarta_Sans'] leading-tight">
              OmniStudy AI
            </span>
            <span className="text-[9px] sm:text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold leading-none hidden xs:inline">
              by Akanksha Maurya
            </span>
          </div>
        </a>

        {/* ── 2. Center: Notes | PYQ | Doubt Solver | Saved (Desktop) ── */}
        <nav
          role="tablist"
          aria-label="Desktop navigation tabs"
          className="hidden md:flex items-center gap-1 bg-[#F1F5F9] dark:bg-[#0B0F17] p-1 rounded-full border border-[#E2E8F0] dark:border-[#23314F]"
        >
          {NAV_TABS.map(({ id, path, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <a
                href={path}
                key={id}
                id={`desktop-tab-${id}`}
                role="tab"
                aria-selected={isActive}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(id, path);
                }}
                className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer min-h-[38px] text-decoration-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#131B2E] ${
                  isActive
                    ? 'bg-white dark:bg-[#1B2640] text-[#0F172A] dark:text-[#F8FAFC] shadow-sm border border-slate-200/80 dark:border-slate-700 font-bold'
                    : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`} aria-hidden="true" />
                <span>{label}</span>
              </a>
            );
          })}
        </nav>

        {/* ── 3. Right: Theme Toggle + Language Toggle + User / Login / Logout ── */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">

          {/* Mobile Single-Button Smart Theme Toggle (< sm) */}
          <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="sm:hidden p-2.5 rounded-full bg-[#F1F5F9] dark:bg-[#0B0F17] border border-[#E2E8F0] dark:border-[#23314F] text-[#64748B] dark:text-[#94A3B8] hover:text-indigo-600 transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
            aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" /> : <Moon className="w-4 h-4 text-indigo-600" aria-hidden="true" />}
          </button>

          {/* Desktop 3-Option Segmented Pill (Light / Dark / System) (>= sm) */}
          <div
            className="hidden sm:flex bg-[#F1F5F9] dark:bg-[#0B0F17] p-1 rounded-full border border-[#E2E8F0] dark:border-[#23314F] items-center"
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
                className={`p-2 rounded-full text-xs transition-all duration-200 min-h-[34px] min-w-[34px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer ${
                  theme === id
                    ? 'bg-white dark:bg-[#1B2640] text-indigo-600 dark:text-indigo-400 shadow-sm'
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
            className="bg-[#F1F5F9] dark:bg-[#0B0F17] p-1 rounded-full border border-[#E2E8F0] dark:border-[#23314F] flex items-center"
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
                  className={`px-2 sm:px-2.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-200 cursor-pointer min-h-[34px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    isSelected
                      ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-sm font-extrabold'
                      : 'text-[#64748B] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] hover:bg-white/60 dark:hover:bg-slate-800/50'
                  }`}
                  title={title}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* ── Auth Action: Clear LOGIN button (Guest) OR User Badge + Clear LOGOUT button (Logged In) ── */}
          {isGuest ? (
            <a
              href="/login"
              onClick={(e) => {
                e.preventDefault();
                handleNav('login', '/login');
              }}
              aria-label="Login or create a free account"
              className={`flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 shadow-md shadow-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 min-h-[38px] cursor-pointer text-decoration-none ${
                activeTab === 'login'
                  ? 'bg-indigo-700 dark:bg-indigo-600 text-white ring-2 ring-indigo-400'
                  : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white'
              }`}
              title="Login or Create Account — Free to start"
            >
              <LogIn className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="font-bold">Login</span>
            </a>
          ) : (
            <div className="flex items-center gap-1 sm:gap-2 ml-0.5 sm:ml-1">
              {/* User profile pill */}
              <a
                href="/login"
                onClick={(e) => {
                  e.preventDefault();
                  handleNav('login', '/login');
                }}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#F1F5F9] dark:bg-[#0B0F17] border border-[#E2E8F0] dark:border-[#23314F] hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors min-h-[38px] cursor-pointer text-decoration-none"
                title={`Logged in as ${user.name} - View Account`}
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-[10px] shrink-0" aria-hidden="true">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC] hidden sm:inline max-w-[80px] md:max-w-[100px] truncate">
                  {user.name}
                </span>
              </a>

              {/* Explicit Clear Logout Button */}
              <button
                type="button"
                onClick={onLogout}
                aria-label="Logout"
                title="Logout from your account"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-all duration-200 min-h-[38px] cursor-pointer shadow-sm hover:shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
              >
                <LogOut className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span className="font-bold">Logout</span>
              </button>
            </div>
          )}

        </div>

      </div>

      {/* ── 2b. Mobile Header Compact Tabs with Horizontal Scroll ── */}
      <div className="md:hidden w-full border-t border-[#E2E8F0] dark:border-[#23314F] bg-white/90 dark:bg-[#131B2E]/90 px-2.5 py-1.5 overflow-x-auto no-scrollbar scroll-smooth">
        <div className="flex items-center gap-1.5 min-w-max" role="tablist" aria-label="Mobile header tabs">
          {NAV_TABS.map(({ id, path, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <a
                key={id}
                href={path}
                role="tab"
                id={`mobile-head-tab-${id}`}
                aria-selected={isActive}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(id, path);
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap min-h-[44px] transition-all duration-200 cursor-pointer text-decoration-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  isActive
                    ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-sm font-bold'
                    : 'bg-[#F1F5F9] dark:bg-[#0B0F17] text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white border border-[#E2E8F0] dark:border-[#23314F]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} aria-hidden="true" />
                <span>{label}</span>
              </a>
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
      {NAV_TABS.map(({ id, path, label, icon: Icon }) => {
        const isActive = activeTab === id;
        return (
          <a
            key={id}
            href={path}
            role="tab"
            aria-selected={isActive}
            aria-label={label}
            onClick={(e) => {
              e.preventDefault();
              handleNav(id, path);
            }}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 cursor-pointer min-w-[56px] min-h-[48px] text-decoration-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              isActive
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/90 dark:bg-indigo-500/15 font-bold'
                : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white font-medium'
            }`}
          >
            <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-indigo-600 dark:text-indigo-400 scale-110' : 'text-slate-400 dark:text-slate-500'} transition-transform duration-200`} aria-hidden="true" />
            <span className="text-[10px] leading-tight font-medium">{label}</span>
          </a>
        );
      })}

      {/* Mobile 5th tab: Login or Account/Logout */}
      {isGuest ? (
        <a
          href="/login"
          role="tab"
          aria-selected={activeTab === 'login'}
          aria-label="Login"
          onClick={(e) => {
            e.preventDefault();
            handleNav('login', '/login');
          }}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 cursor-pointer min-w-[56px] min-h-[48px] text-decoration-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
            activeTab === 'login'
              ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/90 dark:bg-indigo-500/15 font-bold'
              : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white font-medium'
          }`}
        >
          <LogIn className={`w-4 h-4 mb-0.5 ${activeTab === 'login' ? 'text-indigo-600 dark:text-indigo-400 scale-110' : 'text-slate-400 dark:text-slate-500'} transition-transform duration-200`} aria-hidden="true" />
          <span className="text-[10px] leading-tight font-medium">Login</span>
        </a>
      ) : (
        <button
          type="button"
          onClick={onLogout}
          aria-label="Logout"
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 cursor-pointer min-w-[56px] min-h-[48px] text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
          title="Logout"
        >
          <LogOut className="w-4 h-4 mb-0.5 text-rose-500" aria-hidden="true" />
          <span className="text-[10px] leading-tight font-semibold">Logout</span>
        </button>
      )}
    </nav>
    </>
  );
}
