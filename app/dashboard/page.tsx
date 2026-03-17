'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function DashboardPage() {
  const [loading, setLoading]   = useState(true)
  const [profile, setProfile]   = useState<any>(null)
  const [email, setEmail]       = useState<string>('')

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { window.location.href = '/login'; return }
      setEmail(session.user.email || '')
      const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
      setProfile(data)
      setLoading(false)
    }
    init()
  }, [])

  const handleSignOut = async () => { await supabase.auth.signOut(); window.location.href = '/' }

  if (loading) return (
    <div style={{ minHeight:'100vh', background:'#0A0B0F', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <p style={{ color:'#C9A84C', fontFamily:"'DM Sans',sans-serif" }}>Loading...</p>
    </div>
  )

  const isAdmin = ['super_admin','moderator'].includes(profile?.role)

  return (
    <div style={{ minHeight:'100vh', background:'#0A0B0F', fontFamily:"'DM Sans',sans-serif", padding:'80px 24px 32px' }}>
      <div style={{ maxWidth:700, margin:'0 auto' }}>
        <h1 style={{ color:'#e8e9f0', fontSize:28, fontWeight:800, margin:'0 0 4px', fontFamily:"'Playfair Display',Georgia,serif" }}>My Dashboard</h1>
        <p style={{ color:'#8a8da0', fontSize:14, margin:'0 0 32px' }}>{email}</p>

        <div style={{ background:'#141620', border:'1px solid rgba(201,168,76,0.15)', borderRadius:16, padding:'24px', marginBottom:20 }}>
          <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:20 }}>
            <div style={{ width:56, height:56, borderRadius:'50%', background:'linear-gradient(135deg,#C9A84C,#E8C97A)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, fontWeight:800, color:'#0A0B0F' }}>
              {(profile?.full_name || email)?.[0]?.toUpperCase()}
            </div>
            <div>
              <div style={{ color:'#e8e9f0', fontWeight:700, fontSize:17 }}>{profile?.full_name || email.split('@')[0]}</div>
              <div style={{ color:'#C9A84C', fontSize:13, fontWeight:600, textTransform:'uppercase', letterSpacing:1 }}>{profile?.role?.replace('_',' ')}</div>
            </div>
          </div>

          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            <Link href="/listings" style={{ background:'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.2)', color:'#C9A84C', padding:'8px 16px', borderRadius:8, textDecoration:'none', fontSize:13, fontWeight:600 }}>Browse Listings</Link>
            <Link href="/add-business" style={{ background:'linear-gradient(135deg,#C9A84C,#E8C97A)', color:'#0A0B0F', padding:'8px 16px', borderRadius:8, textDecoration:'none', fontSize:13, fontWeight:700 }}>+ Add Business</Link>
            {isAdmin && <Link href="/admin" style={{ background:'rgba(167,139,250,0.1)', border:'1px solid rgba(167,139,250,0.3)', color:'#a78bfa', padding:'8px 16px', borderRadius:8, textDecoration:'none', fontSize:13, fontWeight:600 }}>Admin Panel →</Link>}
            <button onClick={handleSignOut} style={{ background:'transparent', border:'1px solid rgba(239,68,68,0.3)', color:'#ef4444', padding:'8px 16px', borderRadius:8, fontSize:13, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>Sign Out</button>
          </div>
        </div>
      </div>
    </div>
  )
}
