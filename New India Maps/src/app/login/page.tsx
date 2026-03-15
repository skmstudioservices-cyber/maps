'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import TopNav from '@/components/layout/TopNav';

/**
 * PAGE: Login
 * UTILITY: Allows users to access their accounts.
 * USE CASE: Essential for Contributors and Owners to manage data.
 */
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingMagicLink, setUsingMagicLink] = useState(false);
  const [sentMessage, setSentMessage] = useState<string | null>(null);

  const GOLD = "#C9A84C";
  const GOLD_DARK = "#A07830";

  /**
   * ACTION: handleMagicLink
   * UTILITY: Sends a Magic Link (OTP) to the user's email.
   * USE CASE: Requested for easier/secure passwordless access.
   */
  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSentMessage(null);

    try {
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin + '/dashboard',
        },
      });

      if (otpError) throw otpError;
      setSentMessage('Check your email! We sent you a secure login link.');
    } catch (err: any) {
      setError(err.message || 'Failed to send magic link.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * ACTION: handleGoogleLogin
   * UTILITY: Triggers Supabase Google OAuth flow.
   */
  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/dashboard',
      },
    });
    if (error) setError(error.message);
    setLoading(false);
  };

  /**
   * ACTION: handleLogin
   * UTILITY: Authenticates user against Supabase Auth using Password.
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;
      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col font-sans">
      <TopNav />
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#111] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
          <header className="pt-12 pb-8 px-8 text-center bg-[#161616] border-b border-zinc-900">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl"
              style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})` }}
            >
              <ShieldCheck size={32} className="text-black" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              SKM Studio <span style={{ color: GOLD }}>Maps</span>
            </h1>
            <p className="text-sm text-zinc-500 mt-2 font-medium">Access your Secure Business Dashboard</p>
          </header>

          <div className="p-8 space-y-8">
            {error && (
              <div className="p-4 bg-red-950/20 border border-red-900/50 rounded-xl text-red-400 text-xs font-bold flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            {sentMessage && (
              <div className="p-4 bg-emerald-950/20 border border-emerald-900/50 rounded-xl text-emerald-400 text-xs font-bold flex items-center gap-2 animate-pulse">
                <span>✅</span> {sentMessage}
              </div>
            )}

            <button 
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all hover:bg-zinc-100 active:scale-[0.98] shadow-lg text-xs uppercase tracking-widest border border-zinc-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-zinc-800"></div>
              <span className="flex-shrink mx-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Secure Options</span>
              <div className="flex-grow border-t border-zinc-800"></div>
            </div>

            <form onSubmit={usingMagicLink ? handleMagicLink : handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-1">Secure Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 transition-colors group-focus-within:text-[#C9A84C]" size={20} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="skmstudio.services@gmail.com"
                    className="w-full bg-[#0A0A0A] border border-zinc-800 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-[#C9A84C] transition-all text-sm font-medium"
                    required
                  />
                </div>
              </div>

              {!usingMagicLink && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Master Password</label>
                    <Link href="#" className="text-[10px] font-bold uppercase text-[#C9A84C] hover:underline">Forgot?</Link>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 transition-colors group-focus-within:text-[#C9A84C]" size={20} />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-[#0A0A0A] border border-zinc-800 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-[#C9A84C] transition-all text-sm font-medium"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full text-black font-black py-4 rounded-xl active:scale-[0.98] transition-all shadow-xl flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                  style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})` }}
                >
                  {loading ? 'Authenticating...' : (usingMagicLink ? 'Send Magic Link' : 'Sign In Now')}
                  <ArrowRight size={20} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setUsingMagicLink(!usingMagicLink);
                    setError(null);
                    setSentMessage(null);
                  }}
                  className="w-full text-[10px] font-bold uppercase text-zinc-400 hover:text-[#C9A84C] transition-colors tracking-[0.2em]"
                >
                  {usingMagicLink ? '← Back to Password Login' : 'Try Logging in with Magic Link instead'}
                </button>
              </div>
            </form>

            <footer className="text-center">
              <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider">
                New Partner? <Link href="/add" className="text-[#C9A84C] hover:underline">Register Business</Link>
              </p>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}
