'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const GOLD = "#D4AF37";
const DARK_BG = "#0f172a";
const DARK_CARD = "#1e293b";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    console.log('Attempting magic link for:', email);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
      
      setMessage({ 
        type: 'success', 
        text: 'Magic link sent! Please check your email inbox (and spam folder) to complete your login.' 
      });
    } catch (err: any) {
      console.error('Magic link error:', err);
      setMessage({ type: 'error', text: err.message || 'Failed to send magic link. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: DARK_BG,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    fontFamily: "'DM Sans', sans-serif",
    color: '#ffffff'
  };

  const cardStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: DARK_CARD,
    borderRadius: '24px',
    padding: '48px 40px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    border: '1px solid rgba(255,255,255,0.1)',
    textAlign: 'center'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: '#0f172a',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: '16px',
    color: '#ffffff',
    fontSize: '16px',
    outline: 'none',
    marginTop: '8px',
    boxSizing: 'border-box',
    textAlign: 'center'
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: GOLD,
    color: '#000000',
    border: 'none',
    borderRadius: '12px',
    padding: '16px',
    fontSize: '16px',
    fontWeight: '800',
    cursor: 'pointer',
    marginTop: '24px',
    transition: 'all 0.2s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            background: GOLD, 
            borderRadius: '12px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '24px',
            margin: '0 auto 20px'
          }}>⚡</div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px', color: '#ffffff' }}>
            Instant <span style={{ color: GOLD }}>Access</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.5' }}>
            Enter your email to receive a secure login link. No password required.
          </p>
        </div>

        {message && (
          <div style={{
            padding: '16px',
            borderRadius: '12px',
            backgroundColor: message.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
            color: message.type === 'error' ? '#ef4444' : '#10b981',
            fontSize: '14px',
            marginBottom: '24px',
            border: `1px solid ${message.type === 'error' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`,
            fontWeight: '500'
          }}>
            {message.type === 'error' ? 'Oops! ' : 'Success! '} {message.text}
          </div>
        )}

        <form onSubmit={handleMagicLink}>
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.1em', marginLeft: '4px' }}>
              Email Address
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              style={inputStyle}
              required
              autoFocus
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            style={{
              ...buttonStyle,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
              transform: loading ? 'scale(0.98)' : 'scale(1)'
            }}
          >
            {loading ? 'Sending link...' : 'Send Magic Link'}
          </button>
        </form>

        <p style={{ marginTop: '32px', fontSize: '12px', color: '#475569' }}>
          By continuing, you agree to our terms of service and secure access protocols.
        </p>
      </div>
      
      {/* Decorative background element */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, rgba(15,23,42,0) 70%)',
        zIndex: -1,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none'
      }} />
    </div>
  );
}
