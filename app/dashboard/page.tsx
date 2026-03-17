'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

type Stats = {
  businesses: number
  active_businesses: number
  pending_businesses: number
  reviews: number
  users: number
  claim_requests: number
  featured: number
  verified: number
  cities: number
  categories: number
  plans: number
  roadmap: number
  total_views: number
  total_clicks: number
}

type RecentBusiness = {
  id: string
  name: string
  status: string
  plan: string
  city_name: string
  category_name: string
  created_at: string
  is_verified: boolean
  avg_rating: number
}

export default function DashboardPage() {
  const [loading, setLoading]   = useState(true)
  const [profile, setProfile]   = useState<any>(null)
  const [email, setEmail]       = useState('')
  const [stats, setStats]       = useState<Stats | null>(null)
  const [recent, setRecent]     = useState<RecentBusiness[]>([])
  const [error, setError]       = useState<string | null>(null)

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { window.location.href = '/login'; return }
      setEmail(session.user.email || '')

      const { data: prof, error: profErr } = await supabase
        .from('profiles').select('*').eq('id', session.user.id).single()
      if (profErr || !prof) { setError('Could not load profile'); setLoading(false); return }
      setProfile(prof)

      const isAdmin = ['super_admin', 'moderator'].includes(prof.role)

      // Fetch all stats in parallel
      const [
        { count: biz },
        { count: activeBiz },
        { count: pendingBiz },
        { count: reviews },
        { count: claims },
        { count: featured },
        { count: verified },
        { count: cities },
        { count: cats },
        { count: plans },
        { count: roadmap },
      ] = await Promise.all([
        supabase.from('businesses').select('id', { count: 'exact', head: true }),
        supabase.from('businesses').select('id', { count: 'exact', head: true }).eq('status', 'active'),
        supabase.from('businesses').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('reviews').select('id', { count: 'exact', head: true }),
        supabase.from('claim_requests').select('id', { count: 'exact', head: true }),
        supabase.from('businesses').select('id', { count: 'exact', head: true }).eq('is_featured', true),
        supabase.from('businesses').select('id', { count: 'exact', head: true }).eq('is_verified', true),
        supabase.from('cities').select('id', { count: 'exact', head: true }),
        supabase.from('categories').select('id', { count: 'exact', head: true }),
        supabase.from('plans').select('id', { count: 'exact', head: true }),
        supabase.from('roadmap_items').select('id', { count: 'exact', head: true }),
      ])

      // Get total views/clicks
      const { data: viewData } = await supabase
        .from('businesses').select('view_count, click_count').eq('status', 'active')
      const totalViews  = (viewData || []).reduce((s: number, b: any) => s + (b.view_count || 0), 0)
      const totalClicks = (viewData || []).reduce((s: number, b: any) => s + (b.click_count || 0), 0)

      setStats({
        businesses: biz || 0,
        active_businesses: activeBiz || 0,
        pending_businesses: pendingBiz || 0,
        reviews: reviews || 0,
        users: 1,
        claim_requests: claims || 0,
        featured: featured || 0,
        verified: verified || 0,
        cities: cities || 0,
        categories: cats || 0,
        plans: plans || 0,
        roadmap: roadmap || 0,
        total_views: totalViews,
        total_clicks: totalClicks,
      })

      // Recent businesses
      const { data: recentBiz } = await supabase
        .from('businesses')
        .select('id, name, status, plan, created_at, is_verified, avg_rating, city_id, category_id')
        .order('created_at', { ascending: false })
        .limit(8)

      if (recentBiz && recentBiz.length > 0) {
        const cityIds = [...new Set(recentBiz.map((b: any) => b.city_id).filter(Boolean))]
        const catIds  = [...new Set(recentBiz.map((b: any) => b.category_id).filter(Boolean))]
        const [{ data: cits }, { data: catsData }] = await Promise.all([
          supabase.from('cities').select('id, name').in('id', cityIds.length ? cityIds : ['x']),
          supabase.from('categories').select('id, name').in('id', catIds.length ? catIds : ['x']),
        ])
        const cm: Record<string, string> = {}; (cits || []).forEach((c: any) => cm[c.id] = c.name)
        const ctm: Record<string, string> = {}; (catsData || []).forEach((c: any) => ctm[c.id] = c.name)
        setRecent(recentBiz.map((b: any) => ({ ...b, city_name: cm[b.city_id] || '—', category_name: ctm[b.category_id] || '—' })))
      }

      setLoading(false)
    }
    init()
  }, [])

  const handleSignOut = async () => { await supabase.auth.signOut(); window.location.href = '/' }

  if (loading) return (
    <div style={{ minHeight:'100vh', background:'#0A0B0F', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ width:40, height:40, border:'3px solid rgba(201,168,76,0.3)', borderTopColor:'#C9A84C', borderRadius:'50%', animation:'spin 0.8s linear infinite', margin:'0 auto 16px' }}/>
        <p style={{ color:'#C9A84C', fontFamily:"'DM Sans',sans-serif" }}>Loading dashboard...</p>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  if (error) return (
    <div style={{ minHeight:'100vh', background:'#0A0B0F', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'DM Sans',sans-serif" }}>
      <p style={{ color:'#ef4444' }}>{error}</p>
    </div>
  )

  const isAdmin = ['super_admin', 'moderator'].includes(profile?.role)
  const gold = '#C9A84C'

  const statCards = [
    { label:'Total Businesses', value: stats?.businesses, icon:'🏢', color: gold, link:'/listings' },
    { label:'Active',           value: stats?.active_businesses, icon:'✅', color:'#22c55e', link:'/listings' },
    { label:'Pending Review',   value: stats?.pending_businesses, icon:'⏳', color:'#f59e0b', link: isAdmin ? '/admin' : null },
    { label:'Featured',         value: stats?.featured, icon:'⭐', color: gold, link:'/listings' },
    { label:'Verified',         value: stats?.verified, icon:'🔵', color:'#60a5fa', link:'/listings' },
    { label:'Reviews',          value: stats?.reviews, icon:'💬', color:'#a78bfa', link: null },
    { label:'Claim Requests',   value: stats?.claim_requests, icon:'📋', color:'#fb923c', link: isAdmin ? '/admin' : null },
    { label:'Cities Covered',   value: stats?.cities, icon:'🌆', color:'#34d399', link: null },
    { label:'Categories',       value: stats?.categories, icon:'🗂️', color:'#f472b6', link: null },
    { label:'Total Views',      value: stats?.total_views?.toLocaleString(), icon:'👁️', color:'#94a3b8', link: null },
    { label:'Total Clicks',     value: stats?.total_clicks?.toLocaleString(), icon:'🖱️', color:'#94a3b8', link: null },
    { label:'Roadmap Items',    value: stats?.roadmap, icon:'🗺️', color: gold, link:'/roadmap' },
  ]

  const statusColor = (s: string) => s === 'active' ? '#22c55e' : s === 'pending' ? '#f59e0b' : s === 'rejected' ? '#ef4444' : '#94a3b8'
  const planColor   = (p: string) => p === 'featured' || p === 'premium' ? gold : '#94a3b8'

  return (
    <div style={{ minHeight:'100vh', background:'#0A0B0F', fontFamily:"'DM Sans',sans-serif", paddingTop:68 }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'32px 20px' }}>

        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:32, flexWrap:'wrap', gap:16 }}>
          <div style={{ display:'flex', alignItems:'center', gap:16 }}>
            <div style={{ width:56, height:56, borderRadius:'50%', background:`linear-gradient(135deg,${gold},#E8C97A)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, fontWeight:800, color:'#0A0B0F' }}>
              {(profile?.full_name || email)?.[0]?.toUpperCase()}
            </div>
            <div>
              <h1 style={{ color:'#e8e9f0', fontSize:24, fontWeight:800, margin:0, fontFamily:"'Playfair Display',Georgia,serif" }}>
                {profile?.full_name || email.split('@')[0]}
              </h1>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:4 }}>
                <span style={{ background:`rgba(201,168,76,0.15)`, border:`1px solid rgba(201,168,76,0.3)`, color:gold, fontSize:11, fontWeight:700, padding:'2px 10px', borderRadius:99, textTransform:'uppercase', letterSpacing:1 }}>
                  {profile?.role?.replace('_', ' ')}
                </span>
                <span style={{ color:'#475569', fontSize:13 }}>{email}</span>
              </div>
            </div>
          </div>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            {isAdmin && <Link href="/admin" style={{ background:`rgba(167,139,250,0.1)`, border:'1px solid rgba(167,139,250,0.3)', color:'#a78bfa', padding:'9px 18px', borderRadius:8, textDecoration:'none', fontSize:13, fontWeight:600 }}>🔐 Admin Panel</Link>}
            <Link href="/add-business" style={{ background:`linear-gradient(135deg,${gold},#E8C97A)`, color:'#0A0B0F', padding:'9px 18px', borderRadius:8, textDecoration:'none', fontSize:13, fontWeight:700 }}>+ Add Business</Link>
            <button onClick={handleSignOut} style={{ background:'transparent', border:'1px solid rgba(239,68,68,0.3)', color:'#ef4444', padding:'9px 18px', borderRadius:8, fontSize:13, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>Sign Out</button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:12, marginBottom:32 }}>
          {statCards.map(c => (
            <div key={c.label} onClick={() => c.link && (window.location.href = c.link)}
              style={{ background:'#141620', border:'1px solid rgba(255,255,255,0.07)', borderRadius:12, padding:'18px 16px', cursor: c.link ? 'pointer' : 'default', transition:'all 0.2s' }}
              onMouseEnter={e => c.link && ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.3)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)')}>
              <div style={{ fontSize:22, marginBottom:8 }}>{c.icon}</div>
              <div style={{ color: c.color, fontSize:24, fontWeight:800, marginBottom:2 }}>{c.value ?? '—'}</div>
              <div style={{ color:'#8a8da0', fontSize:12 }}>{c.label}</div>
            </div>
          ))}
        </div>

        {/* Two columns: Recent Businesses + Quick Actions */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:20, alignItems:'start' }}>

          {/* Recent Businesses */}
          <div style={{ background:'#141620', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, overflow:'hidden' }}>
            <div style={{ padding:'20px 20px 12px', borderBottom:'1px solid rgba(255,255,255,0.07)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <h2 style={{ color:'#e8e9f0', fontSize:17, fontWeight:700, margin:0, fontFamily:"'Playfair Display',Georgia,serif" }}>Recent Businesses</h2>
              <Link href="/listings" style={{ color:gold, fontSize:13, textDecoration:'none' }}>View all →</Link>
            </div>
            <div style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
                <thead>
                  <tr style={{ background:'rgba(255,255,255,0.03)' }}>
                    {['Name','Category','City','Status','Plan','Rating'].map(h => (
                      <th key={h} style={{ padding:'10px 16px', textAlign:'left', color:'#8a8da0', fontWeight:600, fontSize:11, textTransform:'uppercase', letterSpacing:0.5, whiteSpace:'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recent.map((b, i) => (
                    <tr key={b.id} style={{ borderTop:'1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding:'10px 16px', color:'#e8e9f0', fontWeight:600, maxWidth:180 }}>
                        <Link href={`/b/${b.id}`} style={{ color:'#e8e9f0', textDecoration:'none' }}>{b.name}</Link>
                        {b.is_verified && <span style={{ marginLeft:6, color:'#22c55e', fontSize:10 }}>✓</span>}
                      </td>
                      <td style={{ padding:'10px 16px', color:'#8a8da0' }}>{b.category_name}</td>
                      <td style={{ padding:'10px 16px', color:'#8a8da0' }}>{b.city_name}</td>
                      <td style={{ padding:'10px 16px' }}>
                        <span style={{ background:`rgba(${b.status==='active'?'34,197,94':b.status==='pending'?'245,158,11':'239,68,68'},0.1)`, color:statusColor(b.status), fontSize:11, fontWeight:600, padding:'2px 8px', borderRadius:99 }}>{b.status}</span>
                      </td>
                      <td style={{ padding:'10px 16px' }}>
                        <span style={{ color:planColor(b.plan), fontWeight:600, fontSize:12 }}>{b.plan}</span>
                      </td>
                      <td style={{ padding:'10px 16px', color:'#f59e0b', fontWeight:600 }}>{Number(b.avg_rating||0).toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions + Info */}
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>

            {/* Quick Actions */}
            <div style={{ background:'#141620', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:'20px' }}>
              <h2 style={{ color:'#e8e9f0', fontSize:17, fontWeight:700, margin:'0 0 16px', fontFamily:"'Playfair Display',Georgia,serif" }}>Quick Actions</h2>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {[
                  { label:'+ List a Business', href:'/add-business', bg:`linear-gradient(135deg,${gold},#E8C97A)`, color:'#0A0B0F' },
                  { label:'📋 Browse Listings', href:'/listings', border:`1px solid rgba(201,168,76,0.3)`, color:gold },
                  { label:'🔍 Search', href:'/search', border:'1px solid rgba(255,255,255,0.1)', color:'#8a8da0' },
                  { label:'💰 Pricing Plans', href:'/pricing', border:'1px solid rgba(255,255,255,0.1)', color:'#8a8da0' },
                  { label:'🗺️ Roadmap', href:'/roadmap', border:'1px solid rgba(255,255,255,0.1)', color:'#8a8da0' },
                  ...(isAdmin ? [{ label:'🔐 Admin Panel', href:'/admin', border:'1px solid rgba(167,139,250,0.3)', color:'#a78bfa' }] : []),
                ].map(a => (
                  <Link key={a.label} href={a.href} style={{ background:(a as any).bg||'transparent', border:(a as any).border||'none', color:a.color, padding:'10px 14px', borderRadius:8, textDecoration:'none', fontSize:14, fontWeight:600, display:'block', textAlign:'center' as const }}>
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Coverage */}
            <div style={{ background:'#141620', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:'20px' }}>
              <h2 style={{ color:'#e8e9f0', fontSize:17, fontWeight:700, margin:'0 0 14px', fontFamily:"'Playfair Display',Georgia,serif" }}>Coverage</h2>
              {[
                { label:'Cities', value: stats?.cities, icon:'🌆' },
                { label:'Categories', value: stats?.categories, icon:'🗂️' },
                { label:'Active Plans', value: stats?.plans, icon:'💎' },
              ].map(item => (
                <div key={item.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ color:'#8a8da0', fontSize:13 }}>{item.icon} {item.label}</span>
                  <span style={{ color:gold, fontWeight:700, fontSize:14 }}>{item.value}</span>
                </div>
              ))}
            </div>

            {/* SEO Pages */}
            <div style={{ background:'#141620', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:'20px' }}>
              <h2 style={{ color:'#e8e9f0', fontSize:17, fontWeight:700, margin:'0 0 14px', fontFamily:"'Playfair Display',Georgia,serif" }}>SEO Pages</h2>
              {[
                { label:'Pincode 110001', href:'/pincode/110001' },
                { label:'Pincode 273001', href:'/pincode/273001' },
                { label:'Post Office 110001', href:'/post-office/110001' },
                { label:'DigiPIN Page', href:'/digipin/J3G-K8M-41N6' },
              ].map(p => (
                <Link key={p.label} href={p.href} style={{ display:'block', color:gold, fontSize:13, padding:'6px 0', borderBottom:'1px solid rgba(255,255,255,0.05)', textDecoration:'none' }}>
                  → {p.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
