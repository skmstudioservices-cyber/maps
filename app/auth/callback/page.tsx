'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
  const [status, setStatus] = useState('Signing you in...')

  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        setStatus('Authentication failed. Redirecting...')
        setTimeout(() => { window.location.href = '/login' }, 2000)
      } else if (data.session) {
        setStatus('Success! Redirecting to dashboard...')
        setTimeout(() => { window.location.href = '/dashboard' }, 1000)
      } else {
        setStatus('No session found. Redirecting...')
        setTimeout(() => { window.location.href = '/login' }, 2000)
      }
    })
  }, [])

  return (
    <div style={{
      minHeight: '100vh', background: '#0A0B0F',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 20,
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <div style={{
        width: 48, height: 48,
        border: '3px solid rgba(201,168,76,0.3)',
        borderTopColor: '#C9A84C',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      <p style={{ color: '#C9A84C', fontSize: 16, fontWeight: 500 }}>{status}</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
