'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import TopNav from '@/components/layout/TopNav';

/**
 * PAGE: Login
 * UTILITY: Allows users to access their accounts.
 * USE CASE: Essential for Contributors and Owners to manage data.
 * 
 * DESIGN: High-contrast, secure look using the Dark/Gold accents 
 * from the 'admin-v2' mockup to indicate a 'Private/Secure' area.
 */
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Logic for Supabase Auth will be added here in the next incremental step
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
      <TopNav />
      
      <main className="max-w-md mx-auto pt-20 px-6">
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-8 shadow-xl">
          <header className="text-center mb-10">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
              <ShieldCheck size={24} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome Back</h1>
            <p className="text-sm text-slate-500 mt-2">Login to manage your business and maps</p>
          </header>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-blue-500 transition-all text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-blue-500 transition-all text-sm"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2"
            >
              {loading ? 'Please wait...' : 'Login to Account'}
              <ArrowRight size={18} />
            </button>
          </form>

          <footer className="mt-8 pt-6 border-t border-slate-100 dark:border-zinc-800 text-center">
            <p className="text-xs text-slate-500">
              Don't have an account? <br />
              <Link href="/add" className="text-blue-600 font-bold hover:underline mt-1 inline-block">
                Register Your Business for Free
              </Link>
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
