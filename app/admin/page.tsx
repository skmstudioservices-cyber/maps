'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function AdminPage() {
  const [loading, setLoading]   = useState(true)
  const [profile, setProfile]   = useState<any>(null)
  const [tab, setTab]           = useState('overview')
  const [businesses, setBusinesses] = useState<any[]>([])
  const [settings, setSettings] = useState<Record<string,string>>({})
  const [saving, setSaving]     = useState(false)
  const [saved, setSaved]       = useState(false)
  const [stats, setStats]       = useState<any>(null)

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { window.location.href = '/login'; return }
      const { data: prof } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
      if (!prof || !['super_admin','moderator'].includes(prof.role)) { window.location.href = '/dashboard'; return }
      setProfile(prof)

      const [
        { count: total }, { count: pending }, { count: active },
        { count: reviews }, { count: claims }, { count: users }
      ] = await Promise.all([
        supabase.from('businesses').select('id',{count:'exact',head:true}),
        supabase.from('businesses').select('id',{count:'exact',head:true}).eq('status','pending'),
        supabase.from('businesses').select('id',{count:'exact',head:true}).eq('status','active'),
        supabase.from('reviews').select('id',{count:'exact',head:true}),
        supabase.from('claim_requests').select('id',{count:'exact',head:true}).eq('status','pending'),
        supabase.from('profiles').select('id',{count:'exact',head:true}),
      ])
      setStats({ total, pending, active, reviews, claims, users })

      // Load businesses
      const { data: biz } = await supabase.from('businesses')
        .select('id,name,status,plan,is_verified,is_featured,avg_rating,city_id,created_at')
        .order('created_at',{ascending:false}).limit(50)
      setBusinesses(biz || [])

      // Load settings
      const { data: setts } = await supabase.from('site_settings').select('key,value')
      if (setts) {
        const obj: Record<string,string> = {}
        setts.forEach((s: any) => obj[s.key] = s.value)
        setSettings(obj)
      }
      setLoading(false)
    }
    init()
  }, [])

  const saveSetting = async (key: string, value: string) => {
    setSaving(true)
    await supabase.from('site_settings').upsert({ key, value, updated_at: new Date().toISOString() })
    setSettings(prev => ({ ...prev, [key]: value }))
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const updateBizStatus = async (id: string, status: string) => {
    await supabase.from('businesses').update({ status }).eq('id', id)
    setBusinesses(prev => prev.map(b => b.id === id ? { ...b, status } : b))
  }

  const toggleVerified = async (id: string, current: boolean) => {
    await supabase.from('businesses').update({ is_verified: !current }).eq('id', id)
    setBusinesses(prev => prev.map(b => b.id === id ? { ...b, is_verified: !current } : b))
  }

  const toggleFeatured = async (id: string, current: boolean) => {
    await supabase.from('businesses').update({ is_featured: !current, plan: !current ? 'featured' : 'free' }).eq('id', id)
    setBusinesses(prev => prev.map(b => b.id === id ? { ...b, is_featured: !current } : b))
  }

  if (loading) return (
    <div style={{minHeight:'100vh',background:'#0A0B0F',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{textAlign:'center'}}>
        <div style={{width:40,height:40,border:'3px solid rgba(201,168,76,0.3)',borderTopColor:'#C9A84C',borderRadius:'50%',animation:'spin 0.8s linear infinite',margin:'0 auto 14px'}}/>
        <p style={{color:'#C9A84C',fontFamily:"'DM Sans',sans-serif"}}>Loading admin...</p>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  const G = '#C9A84C'
  const tabs = [
    {id:'overview',label:'📊 Overview'},
    {id:'businesses',label:'🏢 Businesses'},
    {id:'map_settings',label:'🗺️ Map Settings'},
    {id:'site_settings',label:'⚙️ Site Settings'},
  ]
  const sc = (s:string) => s==='active'?'#22c55e':s==='pending'?'#f59e0b':'#ef4444'

  return (
    <div style={{minHeight:'100vh',background:'#0A0B0F',fontFamily:"'DM Sans',sans-serif",paddingTop:68}}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'28px 20px'}}>

        {/* Header */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:28,flexWrap:'wrap',gap:12}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:4}}>
              <span style={{background:'rgba(167,139,250,0.15)',border:'1px solid rgba(167,139,250,0.3)',color:'#a78bfa',fontSize:11,fontWeight:700,padding:'3px 10px',borderRadius:99,textTransform:'uppercase',letterSpacing:1}}>Admin Panel</span>
              <span style={{color:G,fontSize:12,fontWeight:600}}>{profile?.role?.replace('_',' ')}</span>
            </div>
            <h1 style={{color:'#e8e9f0',fontSize:24,fontWeight:800,margin:0,fontFamily:"'Playfair Display',Georgia,serif"}}>SKM Studio Maps — Control Centre</h1>
          </div>
          <div style={{display:'flex',gap:10}}>
            <Link href="/dashboard" style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',color:'#8a8da0',padding:'8px 16px',borderRadius:8,textDecoration:'none',fontSize:13}}>← Dashboard</Link>
            <Link href="/listings" style={{background:`linear-gradient(135deg,${G},#E8C97A)`,color:'#0A0B0F',padding:'8px 16px',borderRadius:8,textDecoration:'none',fontSize:13,fontWeight:700}}>View Site</Link>
          </div>
        </div>

        {/* Tabs */}
        <div style={{display:'flex',gap:4,marginBottom:24,flexWrap:'wrap'}}>
          {tabs.map(t => (
            <button key={t.id} onClick={()=>setTab(t.id)}
              style={{padding:'9px 18px',borderRadius:8,border:'none',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:600,background:tab===t.id?G:'rgba(255,255,255,0.05)',color:tab===t.id?'#0A0B0F':'#8a8da0',transition:'all 0.15s'}}>
              {t.label}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {tab==='overview' && (
          <div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:14,marginBottom:28}}>
              {[
                {label:'Total Businesses',value:stats?.total,icon:'🏢',color:G},
                {label:'Active',value:stats?.active,icon:'✅',color:'#22c55e'},
                {label:'Pending Approval',value:stats?.pending,icon:'⏳',color:'#f59e0b'},
                {label:'Reviews',value:stats?.reviews,icon:'💬',color:'#a78bfa'},
                {label:'Claim Requests',value:stats?.claims,icon:'📋',color:'#fb923c'},
                {label:'Admin Users',value:stats?.users,icon:'👤',color:'#60a5fa'},
              ].map(c=>(
                <div key={c.label} style={{background:'#141620',border:'1px solid rgba(255,255,255,0.07)',borderRadius:12,padding:'18px 16px'}}>
                  <div style={{fontSize:22,marginBottom:8}}>{c.icon}</div>
                  <div style={{color:c.color,fontSize:26,fontWeight:800,marginBottom:2}}>{c.value??'—'}</div>
                  <div style={{color:'#8a8da0',fontSize:12}}>{c.label}</div>
                </div>
              ))}
            </div>
            <div style={{background:'#141620',border:'1px solid rgba(255,255,255,0.07)',borderRadius:12,padding:20}}>
              <h3 style={{color:'#e8e9f0',margin:'0 0 16px',fontFamily:"'Playfair Display',Georgia,serif"}}>Quick Actions</h3>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:10}}>
                {[
                  {label:'Manage Businesses',action:()=>setTab('businesses'),color:G},
                  {label:'Map Settings',action:()=>setTab('map_settings'),color:'#60a5fa'},
                  {label:'Site Settings',action:()=>setTab('site_settings'),color:'#a78bfa'},
                ].map(a=>(
                  <button key={a.label} onClick={a.action} style={{background:`${a.color}15`,border:`1px solid ${a.color}30`,color:a.color,padding:'12px 16px',borderRadius:8,cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:600,textAlign:'left' as const}}>
                    {a.label} →
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* BUSINESSES */}
        {tab==='businesses' && (
          <div style={{background:'#141620',border:'1px solid rgba(255,255,255,0.07)',borderRadius:12,overflow:'hidden'}}>
            <div style={{padding:'18px 20px 14px',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
              <h3 style={{color:'#e8e9f0',margin:0,fontFamily:"'Playfair Display',Georgia,serif"}}>All Businesses ({businesses.length})</h3>
            </div>
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
                <thead>
                  <tr style={{background:'rgba(255,255,255,0.02)'}}>
                    {['Name','Status','Plan','Verified','Featured','Actions'].map(h=>(
                      <th key={h} style={{padding:'10px 16px',textAlign:'left',color:'#475569',fontWeight:600,fontSize:11,textTransform:'uppercase',letterSpacing:0.5,whiteSpace:'nowrap'}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {businesses.map(b=>(
                    <tr key={b.id} style={{borderTop:'1px solid rgba(255,255,255,0.04)'}}>
                      <td style={{padding:'12px 16px',color:'#e8e9f0',fontWeight:600,maxWidth:200}}>{b.name}</td>
                      <td style={{padding:'12px 16px'}}>
                        <select value={b.status} onChange={e=>updateBizStatus(b.id,e.target.value)}
                          style={{background:'#0A0B0F',border:`1px solid ${sc(b.status)}40`,color:sc(b.status),padding:'4px 8px',borderRadius:6,fontSize:12,cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}}>
                          <option value="active">active</option>
                          <option value="pending">pending</option>
                          <option value="inactive">inactive</option>
                          <option value="rejected">rejected</option>
                        </select>
                      </td>
                      <td style={{padding:'12px 16px',color:['featured','premium'].includes(b.plan)?G:'#475569',fontWeight:600,fontSize:12}}>{b.plan}</td>
                      <td style={{padding:'12px 16px'}}>
                        <button onClick={()=>toggleVerified(b.id,b.is_verified)}
                          style={{background:b.is_verified?'rgba(34,197,94,0.1)':'rgba(255,255,255,0.05)',border:`1px solid ${b.is_verified?'rgba(34,197,94,0.3)':'rgba(255,255,255,0.1)'}`,color:b.is_verified?'#22c55e':'#475569',padding:'4px 10px',borderRadius:6,cursor:'pointer',fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>
                          {b.is_verified?'✓ Verified':'Unverified'}
                        </button>
                      </td>
                      <td style={{padding:'12px 16px'}}>
                        <button onClick={()=>toggleFeatured(b.id,b.is_featured)}
                          style={{background:b.is_featured?`rgba(201,168,76,0.1)`:'rgba(255,255,255,0.05)',border:`1px solid ${b.is_featured?'rgba(201,168,76,0.3)':'rgba(255,255,255,0.1)'}`,color:b.is_featured?G:'#475569',padding:'4px 10px',borderRadius:6,cursor:'pointer',fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>
                          {b.is_featured?'★ Featured':'Set Featured'}
                        </button>
                      </td>
                      <td style={{padding:'12px 16px'}}>
                        <Link href={`/b/${b.id}`} style={{color:'#60a5fa',fontSize:12,textDecoration:'none'}}>View →</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MAP SETTINGS */}
        {tab==='map_settings' && (
          <div style={{maxWidth:600}}>
            <div style={{background:'#141620',border:'1px solid rgba(255,255,255,0.07)',borderRadius:12,padding:24,marginBottom:16}}>
              <h3 style={{color:'#e8e9f0',margin:'0 0 8px',fontFamily:"'Playfair Display',Georgia,serif"}}>🗺️ Map Provider</h3>
              <p style={{color:'#475569',fontSize:13,margin:'0 0 20px'}}>Choose the map tile provider displayed to all users. Changes apply immediately.</p>

              {[
                {value:'leaflet',label:'Leaflet + CartoDB Dark',desc:'Free · No API key needed · Dark theme · Best for your site aesthetic',badge:'Recommended'},
                {value:'osm',label:'OpenStreetMap (Light)',desc:'Free · No API key needed · Standard light map · Good detail',badge:'Free'},
                {value:'google',label:'Google Maps',desc:'Requires API key · Most familiar to users · Paid after free tier',badge:'Paid'},
              ].map(opt=>(
                <div key={opt.value} onClick={()=>saveSetting('map_provider',opt.value)}
                  style={{display:'flex',alignItems:'flex-start',gap:14,padding:16,borderRadius:10,border:`2px solid ${settings.map_provider===opt.value?G:'rgba(255,255,255,0.07)'}`,background:settings.map_provider===opt.value?'rgba(201,168,76,0.06)':'rgba(255,255,255,0.02)',cursor:'pointer',marginBottom:10,transition:'all 0.2s'}}>
                  <div style={{width:20,height:20,borderRadius:'50%',border:`2px solid ${settings.map_provider===opt.value?G:'#475569'}`,background:settings.map_provider===opt.value?G:'transparent',flexShrink:0,marginTop:2}}/>
                  <div style={{flex:1}}>
                    <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
                      <span style={{color:'#e8e9f0',fontWeight:600,fontSize:14}}>{opt.label}</span>
                      <span style={{background:opt.badge==='Recommended'?'rgba(201,168,76,0.15)':opt.badge==='Free'?'rgba(34,197,94,0.15)':'rgba(239,68,68,0.15)',color:opt.badge==='Recommended'?G:opt.badge==='Free'?'#22c55e':'#ef4444',fontSize:10,fontWeight:700,padding:'2px 8px',borderRadius:99}}>{opt.badge}</span>
                    </div>
                    <div style={{color:'#475569',fontSize:12}}>{opt.desc}</div>
                  </div>
                </div>
              ))}

              {settings.map_provider === 'google' && (
                <div style={{marginTop:16}}>
                  <label style={{color:'#8a8da0',fontSize:13,display:'block',marginBottom:6}}>Google Maps API Key</label>
                  <div style={{display:'flex',gap:8}}>
                    <input type="text" value={settings.google_maps_key||''} placeholder="AIzaSy..."
                      onChange={e=>setSettings(prev=>({...prev,google_maps_key:e.target.value}))}
                      style={{flex:1,background:'#0A0B0F',border:'1px solid rgba(255,255,255,0.12)',color:'#e8e9f0',padding:'10px 14px',borderRadius:8,fontSize:13,fontFamily:"'DM Sans',sans-serif",outline:'none'}}/>
                    <button onClick={()=>saveSetting('google_maps_key',settings.google_maps_key||'')}
                      style={{background:`linear-gradient(135deg,${G},#E8C97A)`,color:'#0A0B0F',padding:'10px 18px',borderRadius:8,border:'none',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13}}>
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
            {saved && <div style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',color:'#22c55e',padding:'10px 16px',borderRadius:8,fontSize:13,fontWeight:500}}>✓ Settings saved</div>}
          </div>
        )}

        {/* SITE SETTINGS */}
        {tab==='site_settings' && (
          <div style={{maxWidth:600}}>
            <div style={{background:'#141620',border:'1px solid rgba(255,255,255,0.07)',borderRadius:12,padding:24}}>
              <h3 style={{color:'#e8e9f0',margin:'0 0 20px',fontFamily:"'Playfair Display',Georgia,serif"}}>⚙️ Site Settings</h3>
              {[
                {key:'site_name',label:'Site Name',type:'text'},
                {key:'contact_email',label:'Contact Email',type:'email'},
              ].map(field=>(
                <div key={field.key} style={{marginBottom:18}}>
                  <label style={{color:'#8a8da0',fontSize:13,display:'block',marginBottom:6}}>{field.label}</label>
                  <div style={{display:'flex',gap:8}}>
                    <input type={field.type} value={settings[field.key]||''} onChange={e=>setSettings(prev=>({...prev,[field.key]:e.target.value}))}
                      style={{flex:1,background:'#0A0B0F',border:'1px solid rgba(255,255,255,0.12)',color:'#e8e9f0',padding:'10px 14px',borderRadius:8,fontSize:13,fontFamily:"'DM Sans',sans-serif",outline:'none'}}/>
                    <button onClick={()=>saveSetting(field.key,settings[field.key]||'')}
                      style={{background:`linear-gradient(135deg,${G},#E8C97A)`,color:'#0A0B0F',padding:'10px 16px',borderRadius:8,border:'none',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13}}>
                      {saving?'...':'Save'}
                    </button>
                  </div>
                </div>
              ))}
              {saved && <div style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',color:'#22c55e',padding:'10px 16px',borderRadius:8,fontSize:13}}>✓ Settings saved</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
