"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { X, Mail, Lock, User, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, login, signup, loginWithGoogle } = useAuth();
  const [view, setView] = useState('login'); // login, signup, forgot, otp, success, google_selector
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  // Custom Google login fields
  const [googleNameInput, setGoogleNameInput] = useState('');
  const [googleEmailInput, setGoogleEmailInput] = useState('');
  const [isCustomGoogleMode, setIsCustomGoogleMode] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setTimeout(() => {
      setView('login');
      setError('');
      setIsCustomGoogleMode(false);
    }, 300);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: err } = await login(email, password);
    setLoading(false);
    if (err) {
      setError(err.message || 'Failed to login.');
    } else {
      handleSuccess();
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: err } = await signup(email, password, name);
    setLoading(false);
    if (err) {
      setError(err.message || 'Failed to sign up.');
    } else {
      // Trigger WhatsApp API mock
      try {
        await fetch('/api/whatsapp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'signup', name, email, phone })
        });
      } catch (e) {}
      handleSuccess();
    }
  };

  const handleGoogleSelect = async (selectedUser) => {
    setLoading(true);
    await loginWithGoogle(selectedUser);
    setLoading(false);
    handleSuccess();
  };

  const handleCustomGoogleSubmit = async (e) => {
    e.preventDefault();
    if (!googleNameInput.trim() || !googleEmailInput.trim()) return;
    const selectedUser = {
      id: 'google-' + Date.now(),
      email: googleEmailInput.trim(),
      full_name: googleNameInput.trim(),
      avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(googleNameInput.trim())}`
    };
    await handleGoogleSelect(selectedUser);
  };

  const handleSuccess = () => {
    setView('success');
    setTimeout(() => {
      handleClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[#110722]/80 backdrop-blur-md"
          onClick={handleClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(212,165,76,0.15)] rounded-3xl overflow-hidden flex flex-col"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4a54c] to-transparent opacity-50"></div>
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#d4a54c]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#d4a54c]/10 rounded-full blur-3xl pointer-events-none"></div>

          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="p-8 sm:p-10 relative z-10">
            <div className="text-center mb-8">
              <h2 className="font-serif text-3xl text-[#eebf63] tracking-wide mb-2">Argun</h2>
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] font-bold">Client Portal</p>
            </div>

            {error && (
              <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center">
                {error}
              </div>
            )}

            <AnimatePresence mode="wait">
              {view === 'login' && (
                <motion.form 
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleLogin}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input type="email" required value={email} onChange={e => setEmail(e.target.value)} autoComplete="username" className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-[#d4a54c] transition-colors" placeholder="email" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1.5 ml-1 mr-1">
                      <label className="block text-[10px] text-gray-400 uppercase tracking-widest">Password</label>
                      <button type="button" onClick={() => setView('forgot')} className="text-[10px] text-[#d4a54c] hover:text-white transition-colors">Forgot?</button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input type="password" required value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-[#d4a54c] transition-colors" placeholder="password" />
                    </div>
                  </div>
                  
                  <button type="submit" disabled={loading} className="w-full mt-6 bg-gradient-to-r from-[#d4a54c] to-[#eebf63] hover:from-[#eebf63] hover:to-[#d4a54c] text-[#110722] py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(212,165,76,0.3)] hover:shadow-[0_0_30px_rgba(212,165,76,0.5)] flex items-center justify-center gap-2 disabled:opacity-70">
                    {loading ? <span className="w-4 h-4 border-2 border-[#110722]/30 border-t-[#110722] rounded-full animate-spin"></span> : 'Sign In'} <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="mt-6 text-center space-y-4">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">Or continue with</p>
                    <div className="grid grid-cols-2 gap-3">
                      <button type="button" onClick={() => setView('otp')} className="py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors flex justify-center items-center gap-2">
                        <Phone className="w-3.5 h-3.5" /> OTP
                      </button>
                      <button type="button" onClick={() => setView('google_selector')} className="py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors flex justify-center items-center gap-2">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg> Google
                      </button>
                    </div>
                  </div>

                  <p className="mt-8 text-center text-xs text-gray-400">
                    New to Argun? <button type="button" onClick={() => setView('signup')} className="text-[#d4a54c] hover:text-white transition-colors ml-1">Create an account</button>
                  </p>
                </motion.form>
              )}

              {view === 'signup' && (
                <motion.form 
                  key="signup"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSignup}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-[#d4a54c] transition-colors" placeholder="Full name" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-[#d4a54c] transition-colors" placeholder="email" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Phone (Optional)</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-[#d4a54c] transition-colors" placeholder="Mobile number" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-[#d4a54c] transition-colors" placeholder="password" />
                    </div>
                  </div>
                  
                  <button type="submit" disabled={loading} className="w-full mt-6 bg-gradient-to-r from-[#d4a54c] to-[#eebf63] hover:from-[#eebf63] hover:to-[#d4a54c] text-[#110722] py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(212,165,76,0.3)] hover:shadow-[0_0_30px_rgba(212,165,76,0.5)] flex items-center justify-center gap-2 disabled:opacity-70">
                    {loading ? <span className="w-4 h-4 border-2 border-[#110722]/30 border-t-[#110722] rounded-full animate-spin"></span> : 'Create Account'}
                  </button>

                  <p className="mt-6 text-center text-xs text-gray-400">
                    Already have an account? <button type="button" onClick={() => setView('login')} className="text-[#d4a54c] hover:text-white transition-colors ml-1">Sign in</button>
                  </p>
                </motion.form>
              )}

              {view === 'otp' && (
                <motion.div 
                  key="otp"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-6 text-center"
                >
                  <p className="text-gray-300 text-sm">Enter your mobile number to receive a secure OTP.</p>
                  <div>
                    <div className="relative text-left">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-[#d4a54c] transition-colors" placeholder="Mobile Number" />
                    </div>
                  </div>
                  <button type="button" onClick={() => handleSuccess()} className="w-full bg-[#1f163b] text-white border border-[#eebf63]/50 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#d4a54c] hover:text-[#110722] transition-colors">
                    Send OTP
                  </button>
                  <button type="button" onClick={() => setView('login')} className="text-xs text-gray-500 hover:text-white">Back to Email Login</button>
                </motion.div>
              )}

              {view === 'forgot' && (
                <motion.div 
                  key="forgot"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-6 text-center"
                >
                  <p className="text-gray-300 text-sm">Enter your email to receive a password reset link.</p>
                  <div>
                    <div className="relative text-left">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-[#d4a54c] transition-colors" placeholder="Email Address" />
                    </div>
                  </div>
                  <button type="button" onClick={() => setView('login')} className="w-full bg-[#1f163b] text-white border border-[#eebf63]/50 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#d4a54c] hover:text-[#110722] transition-colors">
                    Send Reset Link
                  </button>
                  <button type="button" onClick={() => setView('login')} className="text-xs text-gray-500 hover:text-white">Back to Login</button>
                </motion.div>
              )}

              {view === 'google_selector' && (
                <motion.div 
                  key="google_selector"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-5"
                >
                  <div className="text-center">
                    <svg className="w-8 h-8 mx-auto mb-2 text-[#eebf63]" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <p className="text-gray-300 text-xs tracking-wider">Choose a Google Account to sign in</p>
                  </div>

                  {!isCustomGoogleMode ? (
                    <div className="space-y-2.5">
                      {/* Account 1 */}
                      <button 
                        onClick={() => handleGoogleSelect({
                          id: 'google-1',
                          email: 'govind.soni@gmail.com',
                          full_name: 'Govind Soni',
                          avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'
                        })}
                        className="w-full p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#d4a54c]/30 text-left flex items-center gap-3.5 transition-all"
                      >
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
                          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white leading-none mb-1">Govind Soni</p>
                          <p className="text-[10px] text-gray-400">govind.soni@gmail.com</p>
                        </div>
                      </button>

                      {/* Account 2 */}
                      <button 
                        onClick={() => handleGoogleSelect({
                          id: 'google-2',
                          email: 'royal.client@argun.com',
                          full_name: 'Argun Royal Client',
                          avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
                        })}
                        className="w-full p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#d4a54c]/30 text-left flex items-center gap-3.5 transition-all"
                      >
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
                          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white leading-none mb-1">Argun Royal Client</p>
                          <p className="text-[10px] text-gray-400">royal.client@argun.com</p>
                        </div>
                      </button>

                      <button 
                        onClick={() => setIsCustomGoogleMode(true)}
                        className="w-full py-3 text-center border border-dashed border-white/10 hover:border-[#d4a54c]/50 rounded-xl text-xs font-bold uppercase tracking-widest text-[#d4a54c] hover:text-white transition-colors mt-2"
                      >
                        Use another Google Account
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleCustomGoogleSubmit} className="space-y-3.5">
                      <div>
                        <label className="block text-[9px] text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Your Full Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                          <input 
                            type="text" 
                            required 
                            value={googleNameInput} 
                            onChange={e => setGoogleNameInput(e.target.value)} 
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-[#d4a54c] transition-colors" 
                            placeholder="Enter Google profile name" 
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[9px] text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Your Google Email</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                          <input 
                            type="email" 
                            required 
                            value={googleEmailInput} 
                            onChange={e => setGoogleEmailInput(e.target.value)} 
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-[#d4a54c] transition-colors" 
                            placeholder="username@gmail.com" 
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button 
                          type="button" 
                          onClick={() => setIsCustomGoogleMode(false)} 
                          className="flex-1 py-3 border border-white/10 hover:bg-white/5 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
                        >
                          Back
                        </button>
                        <button 
                          type="submit" 
                          className="flex-1 py-3 bg-[#d4a54c] hover:bg-[#eebf63] text-[#110722] text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-[0_0_15px_rgba(212,165,76,0.2)]"
                        >
                          Sign In
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="text-center pt-2">
                    <button type="button" onClick={() => setView('login')} className="text-[10px] text-gray-500 hover:text-white uppercase tracking-widest font-bold transition-all">Back to Email Sign In</button>
                  </div>
                </motion.div>
              )}

              {view === 'success' && (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-10 text-center flex flex-col items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    <CheckCircle2 className="w-16 h-16 text-[#eebf63] mb-6 drop-shadow-[0_0_15px_rgba(238,191,99,0.5)]" />
                  </motion.div>
                  <h3 className="text-xl font-serif text-white mb-2">Welcome to Argun</h3>
                  <p className="text-gray-400 text-sm">Securely logging you in...</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
