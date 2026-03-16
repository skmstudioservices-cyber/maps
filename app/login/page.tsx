'use client'
import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

type Mode = 'password' | 'magic'

export default function LoginPage() {
  const [mode, setMode]         = useState<Mode>('password')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [msg, setMsg]           = useState<{type:'success'|'error', text:string}|null>(null)

  const handlePassword = async () => {
    if (!email || !password) return setMsg({ type:'error', text:'Please enter email and password.' })
    setLoading(true); setMsg(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) return setMsg({ type:'error', text: error.message })
    setMsg({ type:'success', text:'Login successful! Redirecting...' })
    setTimeout(() => { window.location.href = '/dashboard' }, 1000)
  }

  const handleMagicLink = async () => {
    if (!email) return setMsg({ type:'error', text:'Please enter your email.' })
    setLoading(true); setMsg(null)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
    })
    setLoading(false)
    if (error) return setMsg({ type:'error', text: error.message })
    setMsg({ type:'success', text:`✅ Magic link sent to ${email}! Check your inbox (and spam folder).` })
  }

  const handleSignUp = async () => {
    if (!email || !password) return setMsg({ type:'error', text:'Please enter email and password.' })
    if (password.length < 6) return setMsg({ type:'error', text:'Password must be at least 6 characters.' })
    setLoading(true); setMsg(null)
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
    })
    setLoading(false)
    if (error) return setMsg({ type:'error', text: error.message })
    setMsg({ type:'success', text:'✅ Account created! Check your email to confirm, then sign in.' })
  }

  const inp: React.CSSProperties = {
    width:'100%', background:'#0A0B0F', border:'1px solid rgba(255,255,255,0.1)',
    borderRadius:10, padding:'13px 16px', color:'#e8e9f0', fontSize:15,
    outline:'none', boxSizing:'border-box', fontFamily:"'DM Sans',sans-serif"
  }

  return (
    <div style={{ minHeight:'100vh', background:'#0A0B0F', display:'flex', alignItems:'center', justifyContent:'center', padding:24, fontFamily:"'DM Sans',sans-serif" }}>
      <div style={{ background:'#141620', border:'1px solid rgba(201,168,76,0.15)', borderRadius:24, padding:'40px 36px', width:'100%', maxWidth:420, boxShadow:'0 25px 60px rgba(0,0,0,0.6)', position:'relative', zIndex:1 }}>
        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <Link href="/" style={{ display:'inline-flex', alignItems:'center', gap:8, textDecoration:'none', marginBottom:16 }}>
            <div style={{ width:40, height:40, background:'linear-gradient(135deg,#C9A84C,#E8C97A)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>📍</div>
            <span style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:20, fontWeight:700, color:'#e8e9f0' }}>
              SKM Studio <span style={{ color:'#C9A84C' }}>Maps</span>
            </span>
          </Link>
          <h1 style={{ color:'#e8e9f0', fontSize:24, fontWeight:800, margin:'0 0 6px', fontFamily:"'Playfair Display',Georgia,serif" }}>Welcome Back</h1>
          <p style={{ color:'#8a8da0', fontSize:14, margin:0 }}>Sign in to manage your listings</p>
        </div>

        {/* Mode toggle */}
        <div style={{ display:'flex', background:'#0A0B0F', borderRadius:10, padding:4, marginBottom:24, gap:4 }}>
          {(['password','magic'] as Mode[]).map(m => (
            <button key={m} onClick={() => { setMode(m); setMsg(null) }} style={{
              flex:1, padding:'9px 0', borderRadius:8, border:'none',
              background: mode===m ? 'linear-gradient(135deg,#C9A84C,#E8C97A)' : 'transparent',
              color: mode===m ? '#0A0B0F' : '#8a8da0',
              fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:"'DM Sans',sans-serif"
            }}>
              {m === 'password' ? '🔑 Password' : '✨ Magic Link'}
            </button>
          ))}
        </div>

        {/* Email */}
        <div style={{ marginBottom:14 }}>
          <label style={{ display:'block', color:'#8a8da0', fontSize:12, fontWeight:600, textTransform:'uppercase', letterSpacing:1, marginBottom:6 }}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            onKeyDown={e => e.key==='Enter' && (mode==='password' ? handlePassword() : handleMagicLink())}
            style={inp} />
        </div>

        {/* Password */}
        {mode === 'password' && (
          <div style={{ marginBottom:20 }}>
            <label style={{ display:'block', color:'#8a8da0', fontSize:12, fontWeight:600, textTransform:'uppercase', letterSpacing:1, marginBottom:6 }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              onKeyDown={e => e.key==='Enter' && handlePassword()}
              style={inp} />
          </div>
        )}

        {mode === 'magic' && (
          <p style={{ color:'#8a8da0', fontSize:13, marginBottom:20, lineHeight:1.6 }}>
            We'll send a one-click login link. No password needed. Check spam if it doesn't arrive in 2 minutes.
          </p>
        )}

        {/* Message */}
        {msg && (
          <div style={{
            background: msg.type==='success' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
            border: `1px solid ${msg.type==='success' ? '#22c55e' : '#ef4444'}`,
            borderRadius:8, padding:'10px 14px', marginBottom:16,
            color: msg.type==='success' ? '#22c55e' : '#ef4444', fontSize:13
          }}>{msg.text}</div>
        )}

        {/* Primary button */}
        <button onClick={mode==='password' ? handlePassword : handleMagicLink}
          disabled={loading} style={{
            width:'100%',
            background: loading ? '#1e293b' : 'linear-gradient(135deg,#C9A84C,#E8C97A)',
            color: loading ? '#8a8da0' : '#0A0B0F',
            border:'none', borderRadius:10, padding:'14px 0',
            fontSize:15, fontWeight:700, cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily:"'DM Sans',sans-serif"
          }}>
          {loading ? 'Please wait...' : mode==='password' ? '🔑 Sign In' : '✨ Send Magic Link'}
        </button>

        {/* Sign up */}
        {mode === 'password' && (
          <button onClick={handleSignUp} disabled={loading} style={{
            width:'100%', background:'transparent',
            border:'1px solid rgba(201,168,76,0.25)', color:'#C9A84C',
            borderRadius:10, padding:'12px 0', fontSize:14, fontWeight:600,
            cursor:'pointer', marginTop:10, fontFamily:"'DM Sans',sans-serif"
          }}>
            Create New Account
          </button>
        )}

        <p style={{ textAlign:'center', color:'#475569', fontSize:12, marginTop:20, lineHeight:1.5 }}>
          By signing in you agree to our{' '}
          <Link href="/privacy" style={{ color:'#C9A84C', textDecoration:'none' }}>Privacy Policy</Link>
          {' & '}
          <Link href="/terms" style={{ color:'#C9A84C', textDecoration:'none' }}>Terms</Link>
        </p>

        <div style={{ borderTop:'1px solid rgba(255,255,255,0.07)', marginTop:20, paddingTop:16, textAlign:'center' }}>
          <p style={{ color:'#475569', fontSize:12, margin:0 }}>
            Google Sign-In coming soon — use email login for now
          </p>
        </div>
      </div>
    </div>
  )
}
