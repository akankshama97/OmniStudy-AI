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
import { Sparkles, RefreshCw, AlertTriangle } from 'lucide-react';

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
  const [selectedLang, setSelectedLang] = useState('English');
  const [theme,        setTheme]        = useState(() => localStorage.getItem('omni_theme') || 'system');
  const [systemIsDark, setSystemIsDark] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)').matches : false
  );
  
  // Default to sample lecture in selected language
  const [currentNote,  setCurrentNote]  = useState(() => getSampleNote('coa-unit-1', 'Hinglish'));
  const [isLoading,    setIsLoading]    = useState(false);
  const [error,        setError]        = useState(null);
  const [timestampTutorPrefill, setTimestampTutorPrefill] = useState(null);

  const handleOpenTimestampTutor = (prefillData) => {
    setTimestampTutorPrefill(prefillData);
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
    if (!currentNote) return;

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

      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {activeTab === 'generator' && (
          <div className="animate-fade-slide-up w-full max-w-full overflow-x-hidden">
            <YouTubeInput
              onProcessVideo={handleProcessVideo}
              isLoading={isLoading}
              error={error}
              theme={theme}
              isDark={isDark}
              selectedLang={selectedLang}
              onChangeLanguage={handleChangeLanguage}
            />

            {currentNote && (
              <div className="relative">
                <div className="max-w-6xl mx-auto px-4 mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] dark:bg-[#3B82F6]" />
                    <span className="text-xs font-bold text-[#475569] dark:text-[#CBD5E1] font-mono uppercase tracking-wider">
                      Student Copy Notes View
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#2563EB] dark:text-[#60A5FA] bg-[#EFF6FF] dark:bg-[#3B82F6]/20 px-3 py-0.5 rounded-full border border-[#2563EB]/20 font-bold">
                    Classroom Copy Canvas
                  </span>
                </div>

                <NotebookNotesView
                  note={currentNote}
                  selectedLang={selectedLang}
                  onChangeLanguage={handleChangeLanguage}
                  onAskDoubtAboutTopic={() => setActiveTab('chatbot')}
                  onAskTimestampTutor={handleOpenTimestampTutor}
                  theme={theme}
                  isDark={isDark}
                  isLoading={isLoading}
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'chatbot' && (
          <div className="animate-fade-slide-up">
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
        )}

        {activeTab === 'pyq' && (
          <div className="animate-fade-slide-up">
            <PYQFormulaHub
              selectedLang={selectedLang}
              onChangeLanguage={handleChangeLanguage}
              theme={theme}
              isDark={isDark}
            />
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="animate-fade-slide-up">
            <SavedNotesList
              onSelectNote={(note) => { setCurrentNote(note); setActiveTab('generator'); }}
              onGoToGenerator={() => setActiveTab('generator')}
              theme={theme}
              isDark={isDark}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`border-t py-6 text-center text-xs mt-12 transition-colors ${
        isDark ? 'border-[#23314F] bg-[#131B2E] text-[#94A3B8]' : 'border-[#E2E8F0] bg-white text-[#64748B]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#EFF6FF] dark:bg-[#3B82F6]/20 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#60A5FA]" />
            </div>
            <span className={`font-bold ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>OmniStudy AI</span>
            <span className="text-slate-400">• YouTube Lecture to Student Copy Notes</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-[#64748B] dark:text-[#94A3B8]">
            <span>JEE • NEET • CBSE • UPSC • GATE • College</span>
            <span>•</span>
            <span>Made for Students</span>
          </div>
        </div>
      </footer>
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
