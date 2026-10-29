import React, { useState, useEffect, Component } from 'react';
import Navbar from './components/Navbar';
import YouTubeInput from './components/YouTubeInput';
import NotebookNotesView from './components/NotebookNotesView';
import MultilingualChatbot from './components/MultilingualChatbot';
import PYQFormulaHub from './components/PYQFormulaHub';
import SavedNotesList from './components/SavedNotesList';
import AuthPage from './components/AuthPage';
import { useAuth } from './context/useAuth';
import { processYouTubeVideo, translateNoteApi } from './services/api';
import { SAMPLE_NOTES, SAMPLE_NOTES_MAP, getSampleNote } from './services/sampleNotes';
import { Sparkles, RefreshCw, AlertTriangle, X, Shield, Info, Mail, ExternalLink } from 'lucide-react';
import HomepageSections from './components/HomepageSections';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('OmniStudy UI ErrorBoundary caught error:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#0B0F17] text-white">
          <div className="max-w-md p-8 rounded-3xl bg-[#131B2E] border border-red-500/30 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold">Something went wrong</h2>
            <p className="text-sm text-slate-400">
              {this.state.error?.message || 'A temporary display issue occurred. Refreshing will restore your notes.'}
            </p>
            <button
              onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload(); }}
              className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reload App</span>
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const { user, loading, logout, showAuthModal, setShowAuthModal } = useAuth();
  const [activeTab,    setActiveTab]    = useState('generator');
  const [selectedLang, setSelectedLang] = useState(() =>
    typeof window !== 'undefined' ? localStorage.getItem('omnistudy_selected_lang') || 'Hinglish' : 'Hinglish'
  );
  const [theme,        setTheme]        = useState(() => localStorage.getItem('omni_theme') || 'system');
  const [systemIsDark, setSystemIsDark] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)').matches : false
  );
  
  // Default null so the rich homepage sections & sample cards are visible on landing
  const [currentNote,  setCurrentNote]  = useState(null);
  const [isLoading,    setIsLoading]    = useState(false);
  const [error,        setError]        = useState(null);
  const [timestampTutorPrefill, setTimestampTutorPrefill] = useState(null);
  const [footerModal, setFooterModal] = useState(null); // 'about' | 'privacy' | 'contact' | null

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (footerModal) setFooterModal(null);
        if (showAuthModal) setShowAuthModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [footerModal, showAuthModal, setShowAuthModal]);

  const handleOpenGeneralDoubt = () => {
    setTimestampTutorPrefill(null);
    setActiveTab('chatbot');
  };

  const handleOpenTimestampTutor = (prefillData) => {
    setTimestampTutorPrefill(prefillData || { timestamp: '00:00', videoTitle: currentNote?.title || '' });
    setActiveTab('chatbot');
  };

  // Listen to OS prefers-color-scheme changes
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => setSystemIsDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const isDark = theme === 'system' ? systemIsDark : theme === 'dark';

  // Apply dark class to documentElement and body
  useEffect(() => {
    localStorage.setItem('omni_theme', theme);
    document.documentElement.classList.toggle('dark', isDark);
    document.body.className = isDark ? 'dark dark-mode' : 'light';
  }, [theme, isDark]);

  // Language switching helper
  const handleChangeLanguage = async (newLang) => {
    setSelectedLang(newLang);
    try {
      localStorage.setItem('omnistudy_selected_lang', newLang);
    } catch (e) {}

    // Only attempt note re-translation if actively on the notes generator tab
    if (activeTab !== 'generator' || !currentNote) return;

    // Check sample presets (presets and demos)
    const sampleIds = ['dstl-full-playlist-ebook', 'coa-unit-1', 'kKKM8Y-u7ds', 'RBSGKlAoi3w'];
    const matchedId = sampleIds.find(id => currentNote.videoId && currentNote.videoId.includes(id));

    if (matchedId) {
      const updatedSample = getSampleNote(matchedId, newLang);
      setCurrentNote(updatedSample);
      return;
    }

    // For custom notes, translate via backend API
    try {
      setIsLoading(true);
      const res = await translateNoteApi(currentNote, newLang);
      if (res && res.success && res.note) {
        setCurrentNote(res.note);
      }
    } catch (err) {
      console.warn('Note translation fallback:', err.message);
      setCurrentNote(prev => ({ ...prev, language: newLang }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleProcessVideo = async (videoUrl, selectedExam = 'Auto-detect', noteStyle = 'detailed', maxMinutes = null) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await processYouTubeVideo(videoUrl, selectedLang, selectedExam, maxMinutes);
      if (result.success && result.note) {
        setCurrentNote(result.note);
        return;
      }
      throw new Error(result.error || 'Failed to process YouTube video.');
    } catch (err) {
      // Check preset fallbacks
      const sampleIds = ['dstl-full-playlist-ebook', 'coa-unit-1', 'kKKM8Y-u7ds', 'RBSGKlAoi3w'];
      const matchedId = sampleIds.find(id => videoUrl.includes(id));
      if (matchedId) {
        setCurrentNote(getSampleNote(matchedId, selectedLang));
        setError(null);
      } else {
        const errMsg = err.response?.data?.error || err.message || 'Something went wrong while generating notes.';
        setError(errMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle URL query parameter from Chrome Extension or external link
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlParam = params.get('url');
      if (urlParam) {
        handleProcessVideo(urlParam);
      }
    }
  }, []);

  const bg   = isDark ? 'bg-[#0B0F17]' : 'bg-[#F8FAFC]';
  const text = isDark ? 'text-[#F8FAFC]' : 'text-[#0F172A]';

  return (
    <ErrorBoundary>
      <div className={`min-h-screen flex flex-col font-sans w-full max-w-full overflow-x-hidden ${bg} ${text}`}
           style={{ transition: 'background 0.2s, color 0.2s' }}>

      {/* Navbar with Sun/Moon/System and Language Toggle (No API Key button/modal) */}
      <Navbar
        activeTab={activeTab}        setActiveTab={setActiveTab}
        selectedLang={selectedLang}  setSelectedLang={handleChangeLanguage}
        theme={theme}                setTheme={setTheme}
        isDark={isDark}
        user={user}
        onLogout={logout}
        onOpenAuth={() => setShowAuthModal(true)}
      />

      <main className="flex-1 w-full max-w-full overflow-x-hidden pb-16 md:pb-0">
        {/* Tab 1: Notes Generator & Classroom Copy (Persistent, Never Unmounts) */}
        <div className={activeTab === 'generator' ? 'block animate-fade-slide-up w-full max-w-full overflow-x-hidden' : 'hidden'}>
          {currentNote ? (
            <div id="student-notes-section" className="relative animate-fade-slide-up">
              {/* Clean Top Workspace Navigation Bar */}
              <div className="max-w-6xl mx-auto px-4 my-4 flex items-center justify-between flex-wrap gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentNote(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#131B2E] text-slate-700 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                  title="Return to Lecture Input and Sample Lectures"
                >
                  <span>← Back to Video Input / New Lecture</span>
                </button>

                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Active Study Notes: <strong className="text-slate-900 dark:text-white font-bold">{currentNote.chapter || currentNote.title}</strong>
                  </span>
                </div>
              </div>

              <NotebookNotesView
                note={currentNote}
                selectedLang={selectedLang}
                onChangeLanguage={handleChangeLanguage}
                onAskDoubtAboutTopic={handleOpenGeneralDoubt}
                onAskTimestampTutor={handleOpenTimestampTutor}
                theme={theme}
                isDark={isDark}
                isLoading={isLoading}
              />
            </div>
          ) : (
            <>
              <YouTubeInput
                onProcessVideo={handleProcessVideo}
                isLoading={isLoading}
                error={error}
                theme={theme}
                isDark={isDark}
                selectedLang={selectedLang}
                onChangeLanguage={handleChangeLanguage}
              />
              <HomepageSections />
            </>
          )}
        </div>

        {/* Tab 2: Multilingual Doubt Solver & Timestamp AI Tutor (Persistent) */}
        <div className={activeTab === 'chatbot' ? 'block animate-fade-slide-up' : 'hidden'}>
          <MultilingualChatbot
            currentNote={currentNote}
            selectedLang={selectedLang}
            onChangeLanguage={handleChangeLanguage}
            theme={theme}
            isDark={isDark}
            timestampTutorPrefill={timestampTutorPrefill}
            onClearTimestampPrefill={() => setTimestampTutorPrefill(null)}
          />
        </div>

        {/* Tab 3: PYQ Formula Hub (Persistent) */}
        <div className={activeTab === 'pyq' ? 'block animate-fade-slide-up' : 'hidden'}>
          <PYQFormulaHub
            selectedLang={selectedLang}
            onChangeLanguage={handleChangeLanguage}
            theme={theme}
            isDark={isDark}
          />
        </div>

        {/* Tab 4: Saved Notes (Persistent) */}
        <div className={activeTab === 'saved' ? 'block animate-fade-slide-up' : 'hidden'}>
          <SavedNotesList
            onSelectNote={(note) => { setCurrentNote(note); setActiveTab('generator'); }}
            onGoToGenerator={() => setActiveTab('generator')}
            theme={theme}
            isDark={isDark}
          />
        </div>
      </main>

      {/* Footer with High-Contrast Readable Text and Accessible About / Privacy / Contact Links */}
      <footer className={`border-t py-8 mt-10 mb-16 md:mb-0 transition-colors w-full overflow-hidden ${
        isDark ? 'border-[#23314F] bg-[#131B2E] text-[#E2E8F0]' : 'border-[#E2E8F0] bg-white text-[#1E293B]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#2563EB] text-white flex items-center justify-center shadow-xs shrink-0">
              <Sparkles className="w-4 h-4 fill-white" aria-hidden="true" />
            </div>
            <div className="flex flex-col text-center sm:text-left">
              <span className={`font-extrabold text-sm sm:text-base font-sans ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>
                OmniStudy AI
              </span>
              <span className="text-xs sm:text-[13px] text-slate-900 dark:text-slate-100 font-semibold font-sans break-words">
                YouTube Lecture to Student Copy Notes
              </span>
            </div>
          </div>

          {/* Right: Accessible Links + Exam badges (Wraps gracefully on 360px mobile) */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 w-full sm:w-auto">
            <nav className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center font-sans" aria-label="Footer navigation">
              <button
                type="button"
                onClick={() => setFooterModal('about')}
                aria-label="About OmniStudy AI"
                className="text-slate-900 dark:text-slate-100 hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors font-bold text-xs sm:text-[13px] min-h-[44px] px-2.5 py-2 rounded-lg font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] cursor-pointer"
              >
                About
              </button>
              <span className="text-slate-400 select-none font-bold" aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => setFooterModal('privacy')}
                aria-label="Privacy Policy"
                className="text-slate-900 dark:text-slate-100 hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors font-bold text-xs sm:text-[13px] min-h-[44px] px-2.5 py-2 rounded-lg font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] cursor-pointer"
              >
                Privacy
              </button>
              <span className="text-slate-400 select-none font-bold" aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => setFooterModal('contact')}
                aria-label="Contact and Support"
                className="text-slate-900 dark:text-slate-100 hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors font-bold text-xs sm:text-[13px] min-h-[44px] px-2.5 py-2 rounded-lg font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] cursor-pointer"
              >
                Contact
              </button>
            </nav>

            {/* Exam and Students Badges: flex-wrap so it never cuts off on mobile */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs sm:text-[13px] text-slate-900 dark:text-slate-100 font-semibold font-sans max-w-full">
              <span className="bg-slate-100 dark:bg-slate-800/90 px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700">JEE</span>
              <span className="text-slate-400 select-none">•</span>
              <span className="bg-slate-100 dark:bg-slate-800/90 px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700">NEET</span>
              <span className="text-slate-400 select-none">•</span>
              <span className="bg-slate-100 dark:bg-slate-800/90 px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700">CBSE</span>
              <span className="text-slate-400 select-none">•</span>
              <span className="bg-slate-100 dark:bg-slate-800/90 px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700">GATE</span>
              <span className="text-slate-400 select-none">•</span>
              <span className="bg-slate-100 dark:bg-slate-800/90 px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700">College</span>
              <span className="text-slate-400 select-none">•</span>
              <span className="text-[#2563EB] dark:text-[#60A5FA] font-bold px-1">Made for Students</span>
            </div>
          </div>
        </div>

        <p className="text-center text-xs sm:text-[13px] text-slate-800 dark:text-slate-200 mt-4 font-semibold font-sans break-words px-4">
          Made with ❤️ for students · Developed by <strong className="text-slate-950 dark:text-white font-extrabold">Akanksha Maurya</strong>
        </p>
      </footer>

      {/* Accessible Footer Info Modal (About / Privacy / Contact) */}
      {footerModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="footer-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={() => setFooterModal(null)}
        >
          <div
            className="relative w-full max-w-lg p-5 sm:p-7 rounded-3xl bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-700 shadow-2xl text-slate-800 dark:text-slate-200 animate-fade-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                {footerModal === 'about' && (
                  <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-[#2563EB] dark:text-[#60A5FA] flex items-center justify-center">
                    <Info className="w-4 h-4" aria-hidden="true" />
                  </div>
                )}
                {footerModal === 'privacy' && (
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <Shield className="w-4 h-4" aria-hidden="true" />
                  </div>
                )}
                {footerModal === 'contact' && (
                  <div className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                    <Mail className="w-4 h-4" aria-hidden="true" />
                  </div>
                )}
                <h3 id="footer-modal-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
                  {footerModal === 'about' && 'About OmniStudy AI'}
                  {footerModal === 'privacy' && 'Privacy Policy'}
                  {footerModal === 'contact' && 'Contact & Support'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setFooterModal(null)}
                aria-label="Close modal"
                className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="py-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
              {footerModal === 'about' && (
                <>
                  <p>
                    <strong>OmniStudy AI</strong> transforms any YouTube educational lecture or full playlist into comprehensive student-copy notes with blackboard SVG diagrams, mathematical equations, teacher tips, and top previous year exam questions (PYQs).
                  </p>
                  <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="font-semibold text-slate-900 dark:text-white text-xs">Key Highlights:</div>
                    <ul className="list-disc pl-4 space-y-1 text-xs">
                      <li>Automated blackboard text &amp; diagram extraction</li>
                      <li>KaTeX-formatted mathematical derivations</li>
                      <li>Multilingual toggle: English, हिंदी &amp; Hinglish</li>
                      <li>Integrated Telegram Bot for mobile revision</li>
                    </ul>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                    Developed with dedication by <strong>Akanksha Maurya</strong> for students preparing for JEE, NEET, GATE, CBSE, and University Engineering exams.
                  </p>
                </>
              )}

              {footerModal === 'privacy' && (
                <>
                  <p>
                    Your privacy and academic integrity are our utmost priority. Here is how OmniStudy AI handles your data:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold shrink-0">✓</span>
                      <span><strong>Zero Data Selling:</strong> We never sell, rent, or monetize your study materials or search history.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold shrink-0">✓</span>
                      <span><strong>Local-First Storage:</strong> Generated notes, bookmarks, and theme preferences are stored locally in your browser.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold shrink-0">✓</span>
                      <span><strong>Public URLs Only:</strong> OmniStudy only processes public educational YouTube video URLs submitted by you.</span>
                    </li>
                  </ul>
                  <p className="text-xs text-slate-500 dark:text-slate-400 pt-2">
                    For privacy queries or data removal requests, contact us anytime at <span className="font-mono text-slate-700 dark:text-slate-300">privacy@omnistudy.ai</span>.
                  </p>
                </>
              )}

              {footerModal === 'contact' && (
                <>
                  <p>
                    Need assistance, want to suggest an exam syllabus, or report an issue? Reach out through any of our channels:
                  </p>
                  <div className="space-y-2.5 pt-1">
                    <a
                      href="mailto:contact@omnistudy.ai"
                      className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 bg-slate-50 dark:bg-slate-900/60 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all font-semibold text-xs sm:text-sm text-slate-900 dark:text-white"
                    >
                      <div className="flex items-center gap-2.5">
                        <Mail className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
                        <span>Email: contact@omnistudy.ai</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-400" aria-hidden="true" />
                    </a>

                    <a
                      href="https://t.me/omnistudy_notes_bot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl border border-sky-200 dark:border-sky-800 hover:border-sky-400 bg-sky-50/50 dark:bg-sky-950/30 hover:bg-sky-50 dark:hover:bg-sky-950/50 transition-all font-semibold text-xs sm:text-sm text-[#0088cc] dark:text-sky-300"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold">✈</span>
                        <span>Telegram Bot: @omnistudy_notes_bot</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-sky-400" aria-hidden="true" />
                    </a>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 pt-2">
                    Lead Developer: <strong>Akanksha Maurya</strong>
                  </p>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setFooterModal(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs cursor-pointer min-h-[44px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Auth Modal Overlay when user clicks Login / Sign Up */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl shadow-2xl border border-slate-700/50">
            <AuthPage isDark={isDark} onClose={() => setShowAuthModal(false)} />
          </div>
        </div>
      )}
    </div>
    </ErrorBoundary>
  );
}
