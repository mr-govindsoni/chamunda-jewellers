"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        // Fallback for demo purposes if Supabase is not configured yet
        if (email === 'admin@chamunda.com' && password === 'admin123') {
          sessionStorage.setItem('adminAuth', 'true');
          router.push('/admin/dashboard');
        } else {
          setError('Invalid credentials or Supabase not configured.');
        }
      } else {
        router.push('/admin/dashboard');
      }
    } catch (err) {
      if (email === 'admin@chamunda.com' && password === 'admin123') {
        sessionStorage.setItem('adminAuth', 'true');
        router.push('/admin/dashboard');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#110722] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(238,191,99,0.05)_0%,_transparent_70%)] pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-white/5 border border-[#eebf63]/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8 text-[#eebf63]" />
          </div>
          <h1 className="text-2xl font-serif text-white tracking-widest uppercase mb-2">Chamunda Admin</h1>
          <p className="text-xs text-gray-400 font-light tracking-widest uppercase">Secure Portal Access</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-2 font-bold">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#eebf63]/50 transition-colors text-sm"
                placeholder="admin@chamunda.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-2 font-bold">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#eebf63]/50 transition-colors text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-[#eebf63] hover:bg-[#d4a54c] text-[#110722] rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(238,191,99,0.2)]"
          >
            {loading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>

        <div className="mt-8 text-center text-[10px] text-gray-500 uppercase tracking-widest">
          <p>Demo Credentials:</p>
          <p className="mt-1">admin@chamunda.com / admin123</p>
        </div>
      </motion.div>
    </div>
  );
}
