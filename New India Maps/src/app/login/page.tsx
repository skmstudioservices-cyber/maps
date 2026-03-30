'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { LogIn, Mail, Lock, Sparkles, ArrowRight } from 'lucide-react';

const GOLD = "#D4AF37";
const DARK_BG = "#0f172a";
const DARK_CARD = "#1e293b";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);
  const [mode, setMode] = useState<'password' | 'magic'>('password');

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/dashboard');
      } else {
        setCheckingSession(false);
      }
    };
    checkUser();
  }, [router, supabase.auth]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (mode === 'password') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push('/dashboard');
        router.refresh();
      } else {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (error) throw error;
        setMessage({ type: 'success', text: 'Magic link sent! Check your email.' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Authentication failed' });
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: DARK_BG, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: GOLD, fontSize: '18px', fontWeight: '600' }}>Checking session...</div>
      </div>
    );
  }

  const inputContainerStyle: React.CSSProperties = {
    position: 'relative',
    marginBottom: '20px'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: '#0f172a',
    border: '1.5px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: '14px 16px 14px 44px',
    color: '#ffffff',
    fontSize: '15px',
    outline: 'none',
    transition: 'all 0.2s ease',
  };

  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#64748b'
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 72px)',
      backgroundColor: DARK_BG,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: `radial-gradient(circle at top left, #1e293b 0%, ${DARK_BG} 70%)`
    }}>
      <div style={{
        width: '100%',
        maxWidth: '440px',
        backgroundColor: DARK_CARD,
        borderRadius: '24px',
        padding: '48px',
        boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.7)',
        border: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Aesthetic highlight */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(to right, ${GOLD}, #B8860B)`
        }} />

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: GOLD,
            margin: '0 auto 20px'
          }}>
            <LogIn size={32} />
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px', color: '#ffffff', letterSpacing: '-0.5px' }}>
            SKM Studio <span style={{ color: GOLD }}>Maps</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '15px', fontWeight: '500' }}>
            Enter your credentials to manage your listings
          </p>
        </div>

        {message && (
          <div style={{
            padding: '14px 18px',
            borderRadius: '12px',
            backgroundColor: message.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
            color: message.type === 'error' ? '#f87171' : '#34d399',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '24px',
            border: `1px solid ${message.type === 'error' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ fontSize: '18px' }}>{message.type === 'error' ? '⚠️' : '✅'}</span>
            {message.text}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={inputContainerStyle}>
            <Mail size={18} style={iconStyle} />
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              style={inputStyle}
              required
            />
          </div>

          {mode === 'password' && (
            <div style={inputContainerStyle}>
              <Lock size={18} style={iconStyle} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                style={inputStyle}
                required
              />
            </div>
          )}

          <button type="submit" disabled={loading} style={{
            width: '100%',
            background: `linear-gradient(135deg, ${GOLD}, #B8860B)`,
            color: '#000000',
            border: 'none',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '16px',
            fontWeight: '800',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '12px',
            opacity: loading ? 0.8 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            boxShadow: `0 8px 20px ${GOLD}33`,
            transition: 'all 0.2s ease'
          }}>
            {loading ? 'Authenticating...' : (
              <>
                {mode === 'password' ? 'Sign In' : 'Send Magic Link'}
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: '32px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px' }}>
          <button 
            onClick={() => { setMode(mode === 'password' ? 'magic' : 'password'); setMessage(null); }}
            style={{
              background: 'none',
              border: 'none',
              color: GOLD,
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              margin: '0 auto',
              padding: '8px 16px',
              borderRadius: '8px',
              transition: 'all 0.2s ease'
            }}
          >
            <Sparkles size={16} />
            {mode === 'password' ? 'Prefer passwordless? Get Magic Link' : 'Secure Login with Password'}
          </button>
        </div>
      </div>
    </div>
  );
}
