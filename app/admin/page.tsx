'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase, type Profile } from '@/lib/supabase'

export default function AdminPage() {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [stats, setStats] = useState({ businesses: 0, users: 0, reviews: 0, claims: 0 })

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/login'; return }

      const { data: prof } = await supabase
        .from('profiles').select('*').eq('id', user.id).single()

      if (!prof || !['super_admin', 'moderator'].includes(prof.role)) {
        window.location.href = '/'
        return
      }
      setProfile(prof)

      const [b, r, c] = await Promise.all([
        supabase.from('businesses').select('id', { count: 'exact', head: true }),
        supabase.from('reviews').select('id', { count: 'exact', head: true }),
        supabase.from('claim_requests').select('id', { count: 'exact', head: true }),
      ])
      setStats({
        businesses: b.count || 0,
        users: 0,
        reviews: r.count || 0,
        claims: c.count || 0,
      })
      setLoading(false)
    }
    init()
  }, [])

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0A0B0F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#C9A84C', fontSize: 16, fontFamily: "'DM Sans', sans-serif" }}>Loading admin panel...</div>
    </div>
  )

  const cards = [
    { label: 'Total Businesses', value: stats.businesses, icon: '🏢', color: '#C9A84C' },
    { label: 'Total Reviews', value: stats.reviews, icon: '⭐', color: '#22c55e' },
    { label: 'Claim Requests', value: stats.claims, icon: '📋', color: '#f59e0b' },
    { label: 'Your Role', value: profile?.role?.replace('_', ' ').toUpperCase(), icon: '🔐', color: '#a78bfa' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#0A0B0F', fontFamily: "'DM Sans', sans-serif", padding: '32px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <h1 style={{ color: '#e8e9f0', fontSize: 28, fontWeight: 800, margin: '0 0 4px', fontFamily: "'Playfair Display', Georgia, serif" }}>
              Admin Dashboard
            </h1>
            <p style={{ color: '#8a8da0', fontSize: 14, margin: 0 }}>
              Welcome, {profile?.full_name || 'Admin'} · {profile?.role?.replace('_', ' ')}
            </p>
          </div>
          <Link href="/" style={{
            background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)',
            color: '#C9A84C', padding: '8px 16px', borderRadius: 8,
            textDecoration: 'none', fontSize: 13, fontWeight: 600
          }}>
            ← Back to Site
          </Link>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          {cards.map(card => (
            <div key={card.label} style={{
              background: '#141620', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 14, padding: '24px 20px',
            }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <div style={{ color: card.color, fontSize: 28, fontWeight: 800, marginBottom: 4 }}>{card.value}</div>
              <div style={{ color: '#8a8da0', fontSize: 13 }}>{card.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ background: '#141620', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '24px 20px' }}>
          <h2 style={{ color: '#e8e9f0', fontSize: 18, fontWeight: 700, margin: '0 0 20px', fontFamily: "'Playfair Display', Georgia, serif" }}>
            Quick Actions
          </h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[
              { label: '+ Add Business', href: '/add-business', bg: 'linear-gradient(135deg, #C9A84C, #E8C97A)', color: '#0A0B0F' },
              { label: '📋 View Listings', href: '/listings', bg: 'transparent', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)' },
              { label: '📍 Roadmap', href: '/roadmap', bg: 'transparent', color: '#8a8da0', border: '1px solid rgba(255,255,255,0.1)' },
            ].map(a => (
              <Link key={a.label} href={a.href} style={{
                background: a.bg, color: a.color,
                border: (a as any).border || 'none',
                padding: '10px 20px', borderRadius: 8,
                fontSize: 14, fontWeight: 600, textDecoration: 'none',
              }}>
                {a.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
