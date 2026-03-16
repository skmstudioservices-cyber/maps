'use client'
import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

type Mode = 'password' | 'magic' | 'google'

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>('password')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handlePassword = async () => {
    if (!email || !password) return setMessage({ type: 'error', text: 'Please enter email and password.' })
    setLoading(true); setMessage(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) return setMessage({ type: 'error', text: error.message })
    setMessage({ type: 'success', text: 'Login successful! Redirecting...' })
    setTimeout(() => { window.location.href = '/dashboard' }, 1000)
  }

  const handleMagicLink = async () => {
    if (!email) return setMessage({ type: 'error', text: 'Please enter your email.' })
    setLoading(true); setMessage(null)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
    })
    setLoading(false)
    if (error) return setMessage({ type: 'error', text: error.message })
    setMessage({ type: 'success', text: `✅ Magic link sent to ${email}! Check your inbox.` })
  }

  const handleGoogle = async () => {
    setLoading(true); setMessage(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` }
    })
    if (error) { setLoading(false); setMessage({ type: 'error', text: error.message }) }
  }

  const handleSignUp = async () => {
    if (!email || !password) return setMessage({ type: 'error', text: 'Please enter email and password.' })
    setLoading(true); setMessage(null)
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
    })
    setLoading(false)
    if (error) return setMessage({ type: 'error', text: error.message })
    setMessage({ type: 'success', text: '✅ Account created! Check your email to confirm.' })
  }

  const s = {
    page: { minHeight: '100vh', background: '#0A0B0F', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: "'DM Sans', sans-serif" } as React.CSSProperties,
    card: { background: '#141620', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 24, padding: '40px 36px', width: '100%', maxWidth: 420, boxShadow: '0 25px 60px rgba(0,0,0,0.6)' } as React.CSSProperties,
    input: { width: '100%', background: '#0A0B0F', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '13px 16px', color: '#e8e9f0', fontSize: 15, outline: 'none', boxSizing: 'border-box' as const, fontFamily: "'DM Sans', sans-serif" },
    btn: (active: boolean) => ({ flex: 1, padding: '9px 0', borderRadius: 8, border: 'none', background: active ? 'linear-gradient(135deg, #C9A84C, #E8C97A)' : 'transparent', color: active ? '#0A0B0F' : '#8a8da0', fontSize: 13, fontWeight: 600 as const, cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'DM Sans', sans-serif" }),
  }

  return (
    <div style={s.page}>
      {/* Background glow */}
      <div style={{ position: 'fixed', top: '50%', left: '50%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)', transform: 'translate(-50%,-50%)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ ...s.card, position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 20 }}>
            <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #C9A84C, #E8C97A)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>📍</div>
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: '#e8e9f0' }}>
              SKM Studio <span style={{ color: '#C9A84C' }}>Maps</span>
            </span>
          </Link>
          <h1 style={{ color: '#e8e9f0', fontSize: 26, fontWeight: 800, margin: '0 0 6px', fontFamily: "'Playfair Display', Georgia, serif" }}>
            Welcome Back
          </h1>
          <p style={{ color: '#8a8da0', fontSize: 14, margin: 0 }}>Sign in to manage your business listings</p>
        </div>

        {/* Google Sign In — always on top */}
        <button onClick={handleGoogle} disabled={loading} style={{
          width: '100%', background: '#fff', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 10, padding: '12px 0', marginBottom: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#333',
          fontFamily: "'DM Sans', sans-serif", transition: 'opacity 0.2s',
        }}>
          <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.3 1.2 8.4 3.2l6.3-6.3C34.6 2.9 29.7 1 24 1 14.8 1 7 6.7 3.7 14.5l7.4 5.7C13 14.1 18 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.4 5.7C43.8 37.4 46.5 31.3 46.5 24.5z"/><path fill="#FBBC05" d="M11.1 28.8c-.6-1.7-.9-3.5-.9-5.3s.3-3.6.9-5.3l-7.4-5.7C1.3 15.7 0 19.7 0 24s1.3 8.3 3.7 11.5l7.4-5.7z"/><path fill="#34A853" d="M24 47c5.7 0 10.5-1.9 14-5.1l-7.4-5.7c-1.9 1.3-4.3 2.1-6.6 2.1-5.9 0-10.9-4-12.7-9.5l-7.4 5.7C7 41.3 14.8 47 24 47z"/></svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
          <span style={{ color: '#8a8da0', fontSize: 12 }}>or</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
        </div>

        {/* Mode Toggle */}
        <div style={{ display: 'flex', background: '#0A0B0F', borderRadius: 10, padding: 4, marginBottom: 24, gap: 4 }}>
          <button style={s.btn(mode === 'password')} onClick={() => { setMode('password'); setMessage(null) }}>🔑 Password</button>
          <button style={s.btn(mode === 'magic')} onClick={() => { setMode('magic'); setMessage(null) }}>✨ Magic Link</button>
        </div>

        {/* Email */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', color: '#8a8da0', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            onKeyDown={e => e.key === 'Enter' && (mode === 'password' ? handlePassword() : handleMagicLink())}
            style={s.input} />
        </div>

        {/* Password field */}
        {mode === 'password' && (
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#8a8da0', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Your password"
              onKeyDown={e => e.key === 'Enter' && handlePassword()}
              style={s.input} />
          </div>
        )}

        {mode === 'magic' && (
          <p style={{ color: '#8a8da0', fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>
            We'll send a one-click login link to your email. No password needed.
          </p>
        )}

        {/* Message */}
        {message && (
          <div style={{
            background: message.type === 'success' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
            border: `1px solid ${message.type === 'success' ? '#22c55e' : '#ef4444'}`,
            borderRadius: 8, padding: '10px 14px', marginBottom: 16,
            color: message.type === 'success' ? '#22c55e' : '#ef4444', fontSize: 13
          }}>
            {message.text}
          </div>
        )}

        {/* Primary Button */}
        <button onClick={mode === 'password' ? handlePassword : handleMagicLink}
          disabled={loading} style={{
            width: '100%',
            background: loading ? '#1e293b' : 'linear-gradient(135deg, #C9A84C, #E8C97A)',
            color: loading ? '#8a8da0' : '#0A0B0F',
            border: 'none', borderRadius: 10, padding: '14px 0',
            fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s',
          }}>
          {loading ? 'Please wait...' : mode === 'password' ? '🔑 Sign In' : '✨ Send Magic Link'}
        </button>

        {/* Sign Up link for password mode */}
        {mode === 'password' && (
          <button onClick={handleSignUp} disabled={loading} style={{
            width: '100%', background: 'transparent',
            border: '1px solid rgba(201,168,76,0.25)',
            color: '#C9A84C', borderRadius: 10, padding: '12px 0',
            fontSize: 14, fontWeight: 600, cursor: 'pointer',
            marginTop: 10, fontFamily: "'DM Sans', sans-serif",
          }}>
            Create New Account
          </button>
        )}

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 12, marginTop: 24, lineHeight: 1.5 }}>
          By signing in you agree to our{' '}
          <Link href="/privacy" style={{ color: '#C9A84C', textDecoration: 'none' }}>Privacy Policy</Link>
          {' & '}
          <Link href="/terms" style={{ color: '#C9A84C', textDecoration: 'none' }}>Terms</Link>
        </p>
      </div>
    </div>
  )
}
