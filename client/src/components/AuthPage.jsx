import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { Sparkles, Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle, BookOpen, Brain, Zap, Shield, X, ArrowRight } from 'lucide-react';

export default function AuthPage({ isDark, onClose }) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (mode === 'signup') {
      if (!form.name.trim()) return setError('Please enter your full name.');
      if (!form.email.trim()) return setError('Please enter your email address.');
      if (form.password.length < 6) return setError('Password must be at least 6 characters.');
      if (form.password !== form.confirmPassword) return setError('Passwords do not match!');
    } else {
      if (!form.email.trim()) return setError('Please enter your email address.');
      if (!form.password) return setError('Please enter your password.');
    }

    setLoading(true);
    try {
      if (mode === 'signup') {
        await register(form.name.trim(), form.email.trim().toLowerCase(), form.password);
        setSuccess('Account created! Welcome to OmniStudy AI ðŸŽ‰');
      } else {
        await login(form.email.trim().toLowerCase(), form.password);
        setSuccess('Welcome back! Logging you in...');
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: BookOpen, label: 'YouTube â†’ Notes', desc: 'Kisi bhi lecture se instant notes' },
    { icon: Brain, label: 'AI Mind Maps', desc: 'Visual concept maps automatically' },
    { icon: Zap, label: 'PYQ Solver', desc: 'Top 5 exam questions + solutions' },
    { icon: Shield, label: 'Multilingual', desc: 'Hindi, English, Hinglish support' },
  ];

  return (
    <div className={`min-h-0 flex flex-col lg:flex-row font-sans w-full ${isDark ? 'bg-[#0B0F17] text-[#F8FAFC]' : 'bg-[#F0F4FF] text-[#0F172A]'}`}>

      {/* Left Panel - Branding */}
      <div className={`lg:w-[45%] flex flex-col justify-between p-6 sm:p-8 lg:p-14 relative overflow-hidden ${isDark ? 'bg-gradient-to-br from-[#0F1626] via-[#131B2E] to-[#1a2440]' : 'bg-gradient-to-br from-[#1E3A8A] via-[#1e40af] to-[#2563EB]'}`}>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-blue-400/10 blur-2xl" />
        </div>

        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/30">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-black text-white tracking-tight">OmniStudy AI</span>
              <div className="text-xs text-blue-200 font-medium">Smart Study Platform</div>
            </div>
          </div>

          {/* Hero Text */}
          <div className="mb-10">
            <h1 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-4">
              YouTube lectures ko<br />
              <span className="text-blue-200">perfect notes</span> mein badlo! ðŸŽ¯
            </h1>
            <p className="text-blue-100 text-base leading-relaxed">
              AI-powered study platform jo teacher ki exact content capture karta hai â€” bilkul copy-paste jaisi notes, mind maps aur PYQs.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3">
            {features.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-white font-bold text-xs">{label}</span>
                </div>
                <p className="text-blue-200 text-[11px] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="relative z-10 mt-8 lg:mt-0">
          <div className="flex items-center gap-2 text-blue-200 text-xs">
            <div className="flex -space-x-2">
              {['S', 'R', 'A', 'M'].map((l, i) => (
                <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-blue-800 flex items-center justify-center text-white font-bold text-[10px]">{l}</div>
              ))}
            </div>
            <span>10,000+ students already using OmniStudy AI</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white bg-slate-200/50 dark:bg-slate-800/50 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        <div className={`w-full max-w-md rounded-3xl p-8 shadow-2xl border ${isDark ? 'bg-[#0F1626] border-[#23314F]' : 'bg-white border-[#E2E8F0]'}`}>

          {/* Tab Switch */}
          <div className={`flex items-center p-1 rounded-2xl mb-8 ${isDark ? 'bg-[#1B2640]' : 'bg-[#F1F5F9]'}`}>
            {[
              { id: 'login', label: 'ðŸ”‘ Login' },
              { id: 'signup', label: 'âœ¨ Sign Up' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { setMode(tab.id); setError(''); setSuccess(''); setForm({ name: '', email: '', password: '', confirmPassword: '' }); }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  mode === tab.id
                    ? 'bg-[#2563EB] text-white shadow-md'
                    : isDark ? 'text-[#94A3B8] hover:text-white' : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Header */}
          <div className="mb-7">
            <h2 className="text-2xl font-black mb-1">
              {mode === 'login' ? 'Welcome Back! ðŸ‘‹' : 'Join OmniStudy AI! ðŸš€'}
            </h2>
            <p className={`text-sm ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              {mode === 'login'
                ? 'Apne account mein login karo aur padhai shuru karo.'
                : 'Free account banao aur smarter study karo.'}
            </p>
          </div>

          {/* Alerts */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-sm text-red-600 dark:text-red-400">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-2.5 text-sm text-emerald-600 dark:text-emerald-400">
              <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {mode === 'signup' && (
              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Apna poora naam likho"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium transition-all outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB] ${
                      isDark
                        ? 'bg-[#1B2640] border-[#23314F] text-[#F8FAFC] placeholder-[#475569]'
                        : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] placeholder-[#94A3B8]'
                    }`}
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium transition-all outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB] ${
                    isDark
                      ? 'bg-[#1B2640] border-[#23314F] text-[#F8FAFC] placeholder-[#475569]'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] placeholder-[#94A3B8]'
                  }`}
                  required
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder={mode === 'signup' ? 'Min. 6 characters' : 'Apna password likho'}
                  className={`w-full pl-10 pr-11 py-3 rounded-xl border text-sm font-medium transition-all outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB] ${
                    isDark
                      ? 'bg-[#1B2640] border-[#23314F] text-[#F8FAFC] placeholder-[#475569]'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] placeholder-[#94A3B8]'
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#2563EB] transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                  <input
                    type={showConfirmPass ? 'text' : 'password'}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Password dobara likho"
                    className={`w-full pl-10 pr-11 py-3 rounded-xl border text-sm font-medium transition-all outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB] ${
                      isDark
                        ? 'bg-[#1B2640] border-[#23314F] text-[#F8FAFC] placeholder-[#475569]'
                        : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] placeholder-[#94A3B8]'
                    } ${form.confirmPassword && form.confirmPassword !== form.password ? 'border-red-500 focus:ring-red-500/40' : ''}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#2563EB] transition-colors"
                  >
                    {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {form.confirmPassword && form.confirmPassword !== form.password && (
                  <p className="text-xs text-red-500 mt-1.5">âŒ Passwords match nahi kar rahe!</p>
                )}
                {form.confirmPassword && form.confirmPassword === form.password && form.confirmPassword.length >= 6 && (
                  <p className="text-xs text-emerald-500 mt-1.5">âœ… Passwords match kar rahe hain!</p>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all shadow-lg mt-2 ${
                loading
                  ? 'bg-[#94A3B8] cursor-not-allowed'
                  : 'bg-[#2563EB] hover:bg-[#1D4ED8] hover:shadow-blue-500/30 hover:shadow-xl active:scale-[0.98]'
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {mode === 'login' ? 'Logging in...' : 'Creating account...'}
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  {mode === 'login' ? 'Login & Start Studying' : 'Create Free Account'}
                </>
              )}
            </button>
          </form>

          {/* Switch mode */}
          <div className={`mt-6 text-center text-sm ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
            {mode === 'login' ? (
              <>Account nahi hai?{' '}
                <button onClick={() => { setMode('signup'); setError(''); setForm({ name: '', email: '', password: '', confirmPassword: '' }); }} className="text-[#2563EB] font-bold hover:underline">
                  Free mein Sign Up karo
                </button>
              </>
            ) : (
              <>Already account hai?{' '}
                <button onClick={() => { setMode('login'); setError(''); setForm({ name: '', email: '', password: '', confirmPassword: '' }); }} className="text-[#2563EB] font-bold hover:underline">
                  Login karo
                </button>
              </>
            )}
          </div>

          {/* Guest Direct Access Option */}
          {onClose && (
            <div className="mt-5 pt-5 border-t border-slate-200 dark:border-slate-800 text-center">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold border border-[#2563EB]/30 bg-blue-50/50 dark:bg-blue-500/10 text-[#2563EB] dark:text-[#60A5FA] hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Demo Notes &amp; Generator Explore Karo (No Login Needed)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Footer note */}
          <div className={`mt-4 text-center text-[11px] ${isDark ? 'text-[#475569]' : 'text-[#94A3B8]'}`}>
            ðŸ”’ Your data is secure. We never share your information.
          </div>
        </div>
      </div>
    </div>
  );
}
