import React, { useEffect, useState } from 'react';
import {
  Library, BookOpen, Clock, ChevronRight, RefreshCw,
  Search, Award, Zap, Sparkles, Trash2, AlertTriangle, FileText
} from 'lucide-react';
import { fetchSavedNotes, clearAllSavedNotes, deleteSavedNote } from '../services/api';
import { SAMPLE_NOTES } from '../services/sampleNotes';

export default function SavedNotesList({ onSelectNote, onGoToGenerator, theme = 'system', isDark = false }) {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [actionMessage, setActionMessage] = useState(null);

  const loadNotes = async () => {
    setLoading(true);
    try {
      const data = await fetchSavedNotes();
      if (data && data.success && Array.isArray(data.notes)) {
        setNotes(data.notes);
      } else {
        setNotes([]);
      }
    } catch (err) {
      console.warn('Backend notes fetch error:', err);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleClearAll = async () => {
    setClearing(true);
    setShowClearConfirm(false);
    try {
      const res = await clearAllSavedNotes();
      if (res && res.success) {
        setNotes([]);
        setActionMessage({ type: 'success', text: 'All saved lecture history has been cleared successfully.' });
      } else {
        setActionMessage({ type: 'error', text: res?.message || 'Failed to clear notes history.' });
      }
    } catch (err) {
      console.error('Error clearing notes:', err);
      setActionMessage({ type: 'error', text: 'Error connecting to server to clear history.' });
    } finally {
      setClearing(false);
      setTimeout(() => setActionMessage(null), 4000);
    }
  };

  const handleDeleteSingle = async (e, noteItem) => {
    e.stopPropagation(); // Stop opening note
    const idToDelete = noteItem._id || noteItem.id || noteItem.videoId;
    if (!idToDelete) return;

    if (!window.confirm(`Are you sure you want to delete "${noteItem.title || 'this note'}"?`)) {
      return;
    }

    setDeletingId(idToDelete);
    try {
      const res = await deleteSavedNote(idToDelete);
      if (res && res.success) {
        setNotes(prev => prev.filter(n => (n._id || n.id || n.videoId) !== idToDelete));
        setActionMessage({ type: 'success', text: `Note deleted successfully.` });
      } else {
        setActionMessage({ type: 'error', text: res?.message || 'Failed to delete note.' });
      }
    } catch (err) {
      console.error('Error deleting note:', err);
      setActionMessage({ type: 'error', text: 'Failed to delete note.' });
    } finally {
      setDeletingId(null);
      setTimeout(() => setActionMessage(null), 3000);
    }
  };

  const handleLoadSampleNotes = () => {
    setNotes(SAMPLE_NOTES);
    setActionMessage({ type: 'success', text: 'Sample lecture notes loaded for preview.' });
    setTimeout(() => setActionMessage(null), 3000);
  };

  const filteredNotes = notes.filter(n =>
    (n.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (n.channelTitle || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (n.overview || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (n.chapter || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalFormulas = notes.reduce((acc, curr) => acc + (curr.formulas?.length || 0), 0);
  const totalPYQs = notes.reduce((acc, curr) => acc + (curr.importantPYQs?.length || 0), 0);

  return (
    <div className="max-w-6xl mx-auto my-6 sm:my-8 px-3 sm:px-4 font-['Inter']">

      {/* Notification Banner */}
      {actionMessage && (
        <div className={`mb-6 p-4 rounded-xl text-xs font-semibold flex items-center justify-between shadow-sm animate-fade-slide-up ${
          actionMessage.type === 'success'
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
            : 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300'
        }`}>
          <span>{actionMessage.text}</span>
          <button onClick={() => setActionMessage(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 ml-4 font-bold">âœ•</button>
        </div>
      )}

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#131B2E] border border-rose-200 dark:border-rose-900/60 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex items-center justify-center text-rose-600 dark:text-rose-400 mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] font-['Plus_Jakarta_Sans'] mb-2">
              Clear All Saved History?
            </h3>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed mb-6">
              This will permanently delete all {notes.length} saved YouTube lecture notes, custom mind maps, formulas, and PYQs. This action cannot be reversed.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#23314F] text-xs font-semibold text-[#64748B] dark:text-[#94A3B8] hover:bg-slate-50 dark:hover:bg-[#1B2640] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                disabled={clearing}
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{clearing ? 'Clearing...' : 'Yes, Clear All History'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Library Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Library className="w-6 h-6 text-[#2563EB] dark:text-[#60A5FA]" />
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] font-['Plus_Jakarta_Sans']">
                My Digital Study Library
              </h2>
            </div>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
              Access saved YouTube copy notes, formulas, and TOP 5 PYQ collections
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {notes.length > 0 && (
              <button
                type="button"
                onClick={() => setShowClearConfirm(true)}
                disabled={clearing}
                title="Delete all saved lecture notes"
                className="px-3.5 py-2 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-950/40 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear History</span>
              </button>
            )}

            <button
              onClick={loadNotes}
              className="px-3.5 py-2 rounded-xl border border-[#E2E8F0] dark:border-[#23314F] bg-white dark:bg-[#131B2E] text-[#0F172A] dark:text-[#F8FAFC] text-xs font-semibold flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-[#1B2640] transition-all shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Productivity Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Lectures Saved", value: notes.length, icon: BookOpen },
            { label: "Formulas Mastered", value: totalFormulas, icon: Zap },
            { label: "Exam PYQs Curated", value: totalPYQs, icon: Award },
            { label: "Study Time Saved", value: `${(notes.length * 1.8).toFixed(1)} hrs`, icon: Clock }
          ].map((stat, sIdx) => {
            const Icon = stat.icon;
            return (
              <div
                key={sIdx}
                className="p-4 rounded-xl border border-[#E2E8F0] dark:border-[#23314F] bg-white dark:bg-[#131B2E] shadow-sm"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-semibold text-[#64748B] dark:text-[#94A3B8]">{stat.label}</span>
                  <Icon className="w-4 h-4 text-[#2563EB] dark:text-[#60A5FA]" />
                </div>
                <div className="text-xl md:text-2xl font-bold text-[#0F172A] dark:text-[#F8FAFC] font-['Plus_Jakarta_Sans']">{stat.value}</div>
              </div>
            );
          })}
        </div>

        {/* Search Bar (Only shown if notes exist) */}
        {notes.length > 0 && (
          <div className="p-2 rounded-xl border border-[#E2E8F0] dark:border-[#23314F] bg-[#F8FAFC] dark:bg-[#0B0F17] focus-within:bg-white dark:focus-within:bg-[#0B0F17] focus-within:border-[#2563EB] focus-within:ring-4 focus-within:ring-[#2563EB]/15 flex items-center gap-2.5 transition-all">
            <Search className="w-4 h-4 text-slate-400 ml-2 shrink-0" />
            <input
              type="text"
              placeholder="Search saved notes by topic, educator, or chapter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none placeholder-slate-400 dark:placeholder-slate-500 font-['Inter']"
            />
          </div>
        )}
      </div>

      {/* Notes Grid */}
      {loading ? (
        <div className="text-center py-20 text-[#64748B] dark:text-[#94A3B8] text-xs flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-[#2563EB]" /> Loading saved lecture library...
        </div>
      ) : notes.length === 0 ? (
        /* Empty State */
        <div className="rounded-2xl border border-dashed border-[#CBD5E1] dark:border-[#23314F] p-12 text-center bg-white/50 dark:bg-[#131B2E]/50">
          <div className="w-16 h-16 rounded-2xl bg-[#EFF6FF] dark:bg-[#3B82F6]/10 border border-[#2563EB]/20 text-[#2563EB] dark:text-[#60A5FA] flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] mb-1 font-['Plus_Jakarta_Sans']">
            No Saved Notes in Library
          </h3>
          <p className="text-xs text-[#64748B] dark:text-[#94A3B8] max-w-md mx-auto mb-6 leading-relaxed">
            Your saved lecture history is empty. Process any YouTube lecture URL to generate teacher's copy notes, formulas, interactive mind map, and TOP 5 exam PYQs.
          </p>
          <div className="flex items-center justify-center gap-3">
            {onGoToGenerator && (
              <button
                type="button"
                onClick={onGoToGenerator}
                className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs transition-all shadow-sm flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate Notes from YouTube</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleLoadSampleNotes}
              className="px-4 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#23314F] bg-white dark:bg-[#131B2E] hover:bg-slate-50 dark:hover:bg-[#1B2640] text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC] transition-all flex items-center gap-2"
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Load Sample Notes</span>
            </button>
          </div>
        </div>
      ) : filteredNotes.length === 0 ? (
        /* Filtered Search Empty State */
        <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#23314F] p-12 text-center bg-white dark:bg-[#131B2E] shadow-sm">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#0F172A] dark:text-[#F8FAFC] mb-1 font-['Plus_Jakarta_Sans']">No Matching Notes Found</h3>
          <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mb-4">No lecture matched "{searchQuery}". Try a different keyword.</p>
          <button
            onClick={() => setSearchQuery('')}
            className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs transition-all"
          >
            Clear Search
          </button>
        </div>
      ) : (
        /* Notes Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((noteItem, idx) => {
            const currentId = noteItem._id || noteItem.id || noteItem.videoId;
            const isDeleting = deletingId === currentId;

            return (
              <div
                key={currentId || idx}
                onClick={() => onSelectNote(noteItem)}
                className="relative group rounded-2xl border border-[#E2E8F0] dark:border-[#23314F] p-5 cursor-pointer transition-all duration-150 flex flex-col justify-between hover:scale-[1.01] active:scale-[0.99] hover:border-[#2563EB] dark:hover:border-[#3B82F6] hover:shadow-md bg-white dark:bg-[#131B2E]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EFF6FF] dark:bg-[#3B82F6]/20 text-[#2563EB] dark:text-[#60A5FA] border border-[#2563EB]/20">
                        {noteItem.language || 'English'}
                      </span>
                      {noteItem.subject && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[#64748B] dark:text-[#94A3B8]">
                          {noteItem.subject}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                        {new Date(noteItem.createdAt || Date.now()).toLocaleDateString()}
                      </span>
                      {/* Delete Note Button */}
                      <button
                        type="button"
                        onClick={(e) => handleDeleteSingle(e, noteItem)}
                        disabled={isDeleting}
                        title="Delete this note"
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50"
                      >
                        <Trash2 className={`w-3.5 h-3.5 ${isDeleting ? 'animate-spin' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-bold text-sm leading-snug group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors line-clamp-2 mb-2 text-[#0F172A] dark:text-[#F8FAFC] font-['Plus_Jakarta_Sans']">
                    {noteItem.title}
                  </h3>

                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8] line-clamp-3 mb-4 leading-relaxed font-['Inter']">
                    {noteItem.overview}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F1F5F9] dark:border-[#23314F] flex items-center justify-between text-xs text-[#64748B] dark:text-[#94A3B8]">
                  <span className="truncate text-[11px] font-medium max-w-[140px]">
                    {noteItem.channelTitle || 'Educator'}
                  </span>

                  <span className="text-[#2563EB] dark:text-[#60A5FA] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform shrink-0">
                    <span>Open Notes</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
