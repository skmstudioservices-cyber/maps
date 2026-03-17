'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function AdminPage() {
  const [loading, setLoading] = useState(true)
  const [role, setRole]       = useState<string | null>(null)
  const [stats, setStats]     = useState({ businesses: 0, reviews: 0, users: 0 })
  const [error, setError]     = useState<string | null>(null)

  useEffect(() => {
    const init = async () => {
      // Step 1: get session
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { window.location.href = '/login'; return }

      // Step 2: fetch profile using service-compatible query
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role, full_name')
        .eq('id', session.user.id)
        .single()

      if (profileError || !profile) {
        setError(`Profile error: ${profileError?.message}`)
        setLoading(false)
        return
      }

      setRole(profile.role)

      if (!['super_admin', 'moderator'].includes(profile.role)) {
        setError(`Access denied. Your role is: ${profile.role}`)
        setLoading(false)
        return
      }

      // Step 3: fetch stats
      const [{ count: bCount }, { count: rCount }] = await Promise.all([
        supabase.from('businesses').select('id', { count: 'exact', head: true }),
        supabase.from('reviews').select('id', { count: 'exact', head: true }),
      ])

      setStats({ businesses: bCount || 0, reviews: rCount || 0, users: 1 })
      setLoading(false)
    }
    init()
  }, [])

  if (loading) return (
    <div style={{ minHeight:'100vh', background:'#0A0B0F', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <p style={{ color:'#C9A84C', fontFamily:"'DM Sans',sans-serif" }}>Loading admin panel...</p>
    </div>
  )

  if (error) return (
    <div style={{ minHeight:'100vh', background:'#0A0B0F', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16, fontFamily:"'DM Sans',sans-serif" }}>
      <p style={{ color:'#ef4444', fontSize:16 }}>{error}</p>
      <p style={{ color:'#8a8da0', fontSize:13 }}>Role in DB: {role}</p>
      <Link href="/" style={{ color:'#C9A84C' }}>← Back to Home</Link>
    </div>
  )

  const cards = [
    { label:'Total Businesses', value: stats.businesses, icon:'🏢', color:'#C9A84C' },
    { label:'Total Reviews',    value: stats.reviews,    icon:'⭐', color:'#22c55e' },
    { label:'Your Role',        value: role?.replace('_',' ').toUpperCase(), icon:'🔐', color:'#a78bfa' },
  ]

  return (
    <div style={{ minHeight:'100vh', background:'#0A0B0F', fontFamily:"'DM Sans',sans-serif", padding:'80px 24px 32px' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:32 }}>
          <div>
            <h1 style={{ color:'#e8e9f0', fontSize:28, fontWeight:800, margin:'0 0 4px', fontFamily:"'Playfair Display',Georgia,serif" }}>Admin Dashboard</h1>
            <p style={{ color:'#8a8da0', fontSize:14, margin:0 }}>Role: <span style={{ color:'#C9A84C', fontWeight:700 }}>{role}</span></p>
          </div>
          <Link href="/" style={{ background:'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.3)', color:'#C9A84C', padding:'8px 16px', borderRadius:8, textDecoration:'none', fontSize:13 }}>← Back to Site</Link>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:16, marginBottom:32 }}>
          {cards.map(c => (
            <div key={c.label} style={{ background:'#141620', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:'24px 20px' }}>
              <div style={{ fontSize:28, marginBottom:10 }}>{c.icon}</div>
              <div style={{ color:c.color, fontSize:28, fontWeight:800, marginBottom:4 }}>{c.value}</div>
              <div style={{ color:'#8a8da0', fontSize:13 }}>{c.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background:'#141620', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:'24px 20px' }}>
          <h2 style={{ color:'#e8e9f0', fontSize:18, fontWeight:700, margin:'0 0 20px', fontFamily:"'Playfair Display',Georgia,serif" }}>Quick Actions</h2>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            {[
              { label:'+ Add Business', href:'/add-business', bg:'linear-gradient(135deg,#C9A84C,#E8C97A)', color:'#0A0B0F' },
              { label:'📋 View Listings', href:'/listings', bg:'transparent', color:'#C9A84C', border:'1px solid rgba(201,168,76,0.3)' },
              { label:'📍 Roadmap', href:'/roadmap', bg:'transparent', color:'#8a8da0', border:'1px solid rgba(255,255,255,0.1)' },
            ].map(a => (
              <Link key={a.label} href={a.href} style={{ background:a.bg, color:a.color, border:(a as any).border||'none', padding:'10px 20px', borderRadius:8, fontSize:14, fontWeight:600, textDecoration:'none' }}>{a.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
