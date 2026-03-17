'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import dynamic from 'next/dynamic'

const BusinessMap = dynamic(() => import('@/components/BusinessMap'), {
  ssr: false,
  loading: () => (
    <div style={{height:400,background:'#0D0E12',borderRadius:12,border:'1px solid rgba(255,255,255,0.08)',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{textAlign:'center'}}>
        <div style={{width:32,height:32,border:'3px solid rgba(201,168,76,0.3)',borderTopColor:'#C9A84C',borderRadius:'50%',animation:'spin 0.8s linear infinite',margin:'0 auto 10px'}}/>
        <p style={{color:'#C9A84C',fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>Loading map...</p>
      </div>
    </div>
  )
})

export default function DashboardPage() {
  const [loading, setLoading]   = useState(true)
  const [profile, setProfile]   = useState<any>(null)
  const [email, setEmail]       = useState('')
  const [stats, setStats]       = useState<any>(null)
  const [recent, setRecent]     = useState<any[]>([])
  const [mapBiz, setMapBiz]     = useState<any[]>([])
  const [sideTab, setSideTab]   = useState('overview')
  const [mobileNav, setMobileNav] = useState(false)
  const [mapCity, setMapCity]   = useState('all')
  const [mapProvider, setMapProvider] = useState<'leaflet'|'osm'|'google'>('leaflet')
  const [googleKey, setGoogleKey] = useState('')

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { window.location.href = '/login'; return }
      setEmail(session.user.email || '')
      const { data: prof } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
      if (!prof) { window.location.href = '/login'; return }
      setProfile(prof)

      const [
        { count: total }, { count: active }, { count: pending },
        { count: featured }, { count: verified }, { count: reviews },
        { count: cities }, { count: cats }
      ] = await Promise.all([
        supabase.from('businesses').select('id',{count:'exact',head:true}),
        supabase.from('businesses').select('id',{count:'exact',head:true}).eq('status','active'),
        supabase.from('businesses').select('id',{count:'exact',head:true}).eq('status','pending'),
        supabase.from('businesses').select('id',{count:'exact',head:true}).eq('is_featured',true),
        supabase.from('businesses').select('id',{count:'exact',head:true}).eq('is_verified',true),
        supabase.from('reviews').select('id',{count:'exact',head:true}),
        supabase.from('cities').select('id',{count:'exact',head:true}),
        supabase.from('categories').select('id',{count:'exact',head:true}),
      ])
      const { data: viewData } = await supabase.from('businesses').select('view_count,click_count').eq('status','active')
      const views  = (viewData||[]).reduce((s:number,b:any)=>s+(b.view_count||0),0)
      setStats({ total,active,pending,featured,verified,reviews,cities,cats,views })

      // Recent businesses
      const { data: biz } = await supabase.from('businesses')
        .select('id,name,status,plan,is_verified,avg_rating,city_id,category_id,created_at')
        .order('created_at',{ascending:false}).limit(8)
      if (biz?.length) {
        const cIds=[...new Set(biz.map((b:any)=>b.city_id).filter(Boolean))]
        const catIds=[...new Set(biz.map((b:any)=>b.category_id).filter(Boolean))]
        const [{data:cs},{data:ct}] = await Promise.all([
          supabase.from('cities').select('id,name').in('id',cIds.length?cIds:['x']),
          supabase.from('categories').select('id,name').in('id',catIds.length?catIds:['x']),
        ])
        const cm:any={}; (cs||[]).forEach((c:any)=>cm[c.id]=c.name)
        const ctm:any={}; (ct||[]).forEach((c:any)=>ctm[c.id]=c.name)
        setRecent(biz.map((b:any)=>({...b,city:cm[b.city_id]||'—',cat:ctm[b.category_id]||'—'})))
      }

      // Map businesses
      const { data: mapData } = await supabase.from('businesses')
        .select('id,name,latitude,longitude,plan,avg_rating,phone,city_id,category_id,address')
        .eq('status','active').not('latitude','is',null).limit(300)
      if (mapData?.length) {
        const cIds2=[...new Set(mapData.map((b:any)=>b.city_id).filter(Boolean))]
        const catIds2=[...new Set(mapData.map((b:any)=>b.category_id).filter(Boolean))]
        const [{data:cs2},{data:ct2}] = await Promise.all([
          supabase.from('cities').select('id,name').in('id',cIds2.length?cIds2:['x']),
          supabase.from('categories').select('id,name').in('id',catIds2.length?catIds2:['x']),
        ])
        const cm2:any={}; (cs2||[]).forEach((c:any)=>cm2[c.id]=c.name)
        const ctm2:any={}; (ct2||[]).forEach((c:any)=>ctm2[c.id]=c.name)
        setMapBiz(mapData.map((b:any)=>({...b,city:cm2[b.city_id]||'',category:ctm2[b.category_id]||''})))
      }

      // Site settings (map provider)
      const { data: setts } = await supabase.from('site_settings').select('key,value')
      if (setts) {
        const providerSetting = setts.find((s:any) => s.key === 'map_provider')
        const keySetting      = setts.find((s:any) => s.key === 'google_maps_key')
        if (providerSetting?.value) setMapProvider(providerSetting.value as any)
        if (keySetting?.value) setGoogleKey(keySetting.value)
      }

      setLoading(false)
    }
    init()
  }, [])

  const signOut = async () => { await supabase.auth.signOut(); window.location.href = '/' }

  if (loading) return (
    <div style={{minHeight:'100vh',background:'#0A0B0F',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{textAlign:'center'}}>
        <div style={{width:44,height:44,border:'3px solid rgba(201,168,76,0.3)',borderTopColor:'#C9A84C',borderRadius:'50%',animation:'spin 0.8s linear infinite',margin:'0 auto 16px'}}/>
        <p style={{color:'#C9A84C',fontFamily:"'DM Sans',sans-serif",fontSize:14}}>Loading dashboard...</p>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  const isAdmin = ['super_admin','moderator'].includes(profile?.role)
  const G = '#C9A84C'
  const navItems = [
    {id:'overview',icon:'⚡',label:'Overview'},
    {id:'map',icon:'🗺️',label:'Live Map'},
    {id:'listings',icon:'🏢',label:'Listings',href:'/listings'},
    {id:'seo',icon:'📌',label:'SEO Pages'},
    ...(isAdmin?[{id:'admin',icon:'🔐',label:'Admin Panel',href:'/admin'}]:[]),
    {id:'settings',icon:'⚙️',label:'Settings'},
  ]
  const statGrid = [
    {label:'Total Listings',value:stats?.total,icon:'🏢',color:G},
    {label:'Active',value:stats?.active,icon:'✅',color:'#22c55e'},
    {label:'Pending',value:stats?.pending,icon:'⏳',color:'#f59e0b'},
    {label:'Featured',value:stats?.featured,icon:'⭐',color:G},
    {label:'Verified',value:stats?.verified,icon:'🔵',color:'#60a5fa'},
    {label:'Reviews',value:stats?.reviews,icon:'💬',color:'#a78bfa'},
    {label:'Cities',value:stats?.cities,icon:'🌆',color:'#34d399'},
    {label:'Views',value:(stats?.views||0).toLocaleString(),icon:'👁️',color:'#94a3b8'},
  ]
  const sc = (s:string) => s==='active'?'#22c55e':s==='pending'?'#f59e0b':'#ef4444'
  const sbg = (s:string) => s==='active'?'rgba(34,197,94,0.1)':s==='pending'?'rgba(245,158,11,0.1)':'rgba(239,68,68,0.1)'
  const pc = (p:string) => ['featured','premium'].includes(p)?G:'#475569'
  const allCities = [...new Set(mapBiz.map(b=>b.city).filter(Boolean))].sort()
  const filteredMap = mapCity === 'all' ? mapBiz : mapBiz.filter(b=>b.city===mapCity)

  return (
    <div style={{minHeight:'100vh',background:'#070809',fontFamily:"'DM Sans',sans-serif",paddingTop:68}}>
      <style>{`
        @media(max-width:900px){.dash-sidebar{display:none!important}.dash-sidebar.open{display:flex!important;position:fixed;top:68px;left:0;right:0;bottom:0;z-index:50;background:#0A0B0F;overflow-y:auto;flex-direction:column}}
        @media(max-width:700px){.stat-grid{grid-template-columns:1fr 1fr!important}}
        .nav-btn:hover{background:rgba(201,168,76,0.08)!important;color:#e8e9f0!important}
        .stat-card:hover{border-color:rgba(201,168,76,0.25)!important;transform:translateY(-1px)}
        .biz-row:hover{background:rgba(255,255,255,0.03)!important}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        .fadein{animation:fadeIn 0.35s ease forwards}
      `}</style>

      <div style={{display:'flex',maxWidth:1400,margin:'0 auto',height:'calc(100vh - 68px)'}}>
        {/* Sidebar */}
        <aside className={`dash-sidebar${mobileNav?' open':''}`} style={{width:240,minWidth:240,background:'#0D0E12',borderRight:'1px solid rgba(255,255,255,0.06)',display:'flex',flexDirection:'column',padding:'24px 16px',gap:4,overflowY:'auto'}}>
          <div style={{background:'linear-gradient(135deg,#141620,#0A0B0F)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:12,padding:'16px',marginBottom:24}}>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:10}}>
              <div style={{width:44,height:44,borderRadius:'50%',background:`linear-gradient(135deg,${G},#E8C97A)`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,fontWeight:800,color:'#0A0B0F',flexShrink:0}}>
                {(profile?.full_name||email)?.[0]?.toUpperCase()}
              </div>
              <div style={{minWidth:0}}>
                <div style={{color:'#e8e9f0',fontWeight:700,fontSize:14,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{profile?.full_name||email.split('@')[0]}</div>
                <div style={{color:G,fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:0.8}}>{profile?.role?.replace('_',' ')}</div>
              </div>
            </div>
            <div style={{color:'#475569',fontSize:11,wordBreak:'break-all'}}>{email}</div>
          </div>
          {navItems.map(n => (
            n.href
              ? <Link key={n.id} href={n.href} className="nav-btn" style={{display:'flex',alignItems:'center',gap:12,padding:'10px 12px',borderRadius:8,color:sideTab===n.id?G:'#8a8da0',background:sideTab===n.id?'rgba(201,168,76,0.08)':'transparent',textDecoration:'none',fontSize:14,fontWeight:sideTab===n.id?600:400,transition:'all 0.15s'}} onClick={()=>{setSideTab(n.id);setMobileNav(false)}}>
                <span style={{fontSize:16}}>{n.icon}</span>{n.label}
              </Link>
              : <button key={n.id} className="nav-btn" onClick={()=>{setSideTab(n.id);setMobileNav(false)}} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 12px',borderRadius:8,color:sideTab===n.id?G:'#8a8da0',background:sideTab===n.id?'rgba(201,168,76,0.08)':'transparent',border:'none',cursor:'pointer',fontSize:14,fontWeight:sideTab===n.id?600:400,fontFamily:"'DM Sans',sans-serif",textAlign:'left',transition:'all 0.15s',width:'100%'}}>
                <span style={{fontSize:16}}>{n.icon}</span>{n.label}
              </button>
          ))}
          <div style={{flex:1}}/>
          <button onClick={signOut} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 12px',borderRadius:8,color:'#ef4444',background:'transparent',border:'none',cursor:'pointer',fontSize:14,fontFamily:"'DM Sans',sans-serif",textAlign:'left'}} className="nav-btn">
            <span>🚪</span> Sign Out
          </button>
        </aside>

        {/* Main */}
        <main style={{flex:1,overflowY:'auto',padding:'28px 24px'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
            <div>
              <h1 style={{color:'#e8e9f0',fontSize:22,fontWeight:800,margin:0,fontFamily:"'Playfair Display',Georgia,serif"}}>
                {navItems.find(n=>n.id===sideTab)?.label||'Dashboard'}
              </h1>
              <p style={{color:'#475569',fontSize:13,margin:'2px 0 0'}}>{stats?.total} businesses · {stats?.cities} cities · {mapProvider} map</p>
            </div>
            <div style={{display:'flex',gap:10,alignItems:'center'}}>
              <Link href="/add-business" style={{background:`linear-gradient(135deg,${G},#E8C97A)`,color:'#0A0B0F',padding:'8px 16px',borderRadius:8,textDecoration:'none',fontSize:13,fontWeight:700,whiteSpace:'nowrap'}}>+ Add Business</Link>
              <button onClick={()=>setMobileNav(!mobileNav)} style={{background:'#141620',border:'1px solid rgba(255,255,255,0.1)',color:'#e8e9f0',width:38,height:38,borderRadius:8,cursor:'pointer',fontSize:18,display:'flex',alignItems:'center',justifyContent:'center'}}>☰</button>
            </div>
          </div>

          {sideTab==='overview' && (
            <div className="fadein">
              <div className="stat-grid" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:24}}>
                {statGrid.map(c=>(
                  <div key={c.label} className="stat-card" style={{background:'#0D0E12',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,padding:'18px 16px',transition:'all 0.2s'}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12}}>
                      <span style={{fontSize:22}}>{c.icon}</span>
                      <span style={{color:c.color,fontSize:11,fontWeight:600,background:`${c.color}15`,padding:'2px 8px',borderRadius:99}}>{c.label}</span>
                    </div>
                    <div style={{color:c.color,fontSize:28,fontWeight:800,lineHeight:1,marginBottom:4}}>{c.value??'—'}</div>
                  </div>
                ))}
              </div>
              {/* Map preview */}
              <div style={{marginBottom:20}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
                  <h3 style={{color:'#e8e9f0',fontSize:15,fontWeight:700,margin:0,fontFamily:"'Playfair Display',Georgia,serif"}}>📍 India Business Map</h3>
                  <div style={{display:'flex',gap:8,alignItems:'center'}}>
                    <span style={{color:'#475569',fontSize:12}}>{mapProvider}</span>
                    <button onClick={()=>setSideTab('map')} style={{background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.3)',color:G,padding:'6px 14px',borderRadius:8,cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:600}}>Full Map →</button>
                  </div>
                </div>
                <BusinessMap businesses={mapBiz.slice(0,100)} provider={mapProvider} googleApiKey={googleKey} height="300px" showControls={true} />
              </div>
              {/* Recent table */}
              <div style={{background:'#0D0E12',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,overflow:'hidden'}}>
                <div style={{padding:'18px 20px 12px',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <h3 style={{color:'#e8e9f0',fontSize:15,fontWeight:700,margin:0,fontFamily:"'Playfair Display',Georgia,serif"}}>Recent Businesses</h3>
                  <Link href="/listings" style={{color:G,fontSize:13,textDecoration:'none'}}>View all →</Link>
                </div>
                <div style={{overflowX:'auto'}}>
                  <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
                    <thead>
                      <tr style={{background:'rgba(255,255,255,0.02)'}}>
                        {['Business','Category','City','Status','Plan','Rating'].map(h=>(
                          <th key={h} style={{padding:'10px 16px',textAlign:'left',color:'#475569',fontWeight:600,fontSize:11,textTransform:'uppercase',letterSpacing:0.5,whiteSpace:'nowrap'}}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {recent.map(b=>(
                        <tr key={b.id} className="biz-row" style={{borderTop:'1px solid rgba(255,255,255,0.04)',transition:'background 0.15s'}}>
                          <td style={{padding:'12px 16px'}}>
                            <div style={{display:'flex',alignItems:'center',gap:8}}>
                              <div style={{width:30,height:30,borderRadius:7,background:`hsl(${b.name.charCodeAt(0)*7%360},40%,25%)`,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:13,flexShrink:0}}>{b.name[0]}</div>
                              <span style={{color:'#e8e9f0',fontWeight:600}}>{b.name}</span>
                              {b.is_verified&&<span style={{color:'#22c55e',fontSize:10}}>✓</span>}
                            </div>
                          </td>
                          <td style={{padding:'12px 16px',color:'#8a8da0'}}>{b.cat}</td>
                          <td style={{padding:'12px 16px',color:'#8a8da0'}}>{b.city}</td>
                          <td style={{padding:'12px 16px'}}><span style={{background:sbg(b.status),color:sc(b.status),fontSize:11,fontWeight:600,padding:'3px 8px',borderRadius:99}}>{b.status}</span></td>
                          <td style={{padding:'12px 16px',color:pc(b.plan),fontWeight:600,fontSize:12}}>{b.plan}</td>
                          <td style={{padding:'12px 16px',color:'#f59e0b',fontWeight:600}}>{Number(b.avg_rating||0).toFixed(1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {sideTab==='map' && (
            <div className="fadein">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14,flexWrap:'wrap',gap:8}}>
                <div style={{display:'flex',gap:6,flexWrap:'wrap',alignItems:'center'}}>
                  <span style={{color:'#8a8da0',fontSize:13}}>City:</span>
                  <button onClick={()=>setMapCity('all')} style={{background:mapCity==='all'?'rgba(201,168,76,0.15)':'rgba(255,255,255,0.04)',border:`1px solid ${mapCity==='all'?'rgba(201,168,76,0.4)':'rgba(255,255,255,0.1)'}`,color:mapCity==='all'?G:'#8a8da0',padding:'4px 12px',borderRadius:99,cursor:'pointer',fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>All</button>
                  {allCities.slice(0,12).map(c=>(
                    <button key={c} onClick={()=>setMapCity(c)} style={{background:mapCity===c?'rgba(201,168,76,0.15)':'rgba(255,255,255,0.04)',border:`1px solid ${mapCity===c?'rgba(201,168,76,0.4)':'rgba(255,255,255,0.1)'}`,color:mapCity===c?G:'#8a8da0',padding:'4px 12px',borderRadius:99,cursor:'pointer',fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>{c}</button>
                  ))}
                </div>
                <div style={{color:'#475569',fontSize:12}}>{filteredMap.length} pins · {mapProvider}</div>
              </div>
              <BusinessMap businesses={filteredMap} provider={mapProvider} googleApiKey={googleKey} height="calc(100vh - 230px)" showControls={true} />
            </div>
          )}

          {sideTab==='seo' && (
            <div className="fadein" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:14}}>
              {[
                {title:'Pincode 110001',sub:'Connaught Place, New Delhi',href:'/pincode/110001',icon:'📮',color:'#22c55e'},
                {title:'Pincode 273001',sub:'Gorakhpur Head Post Office',href:'/pincode/273001',icon:'📮',color:'#22c55e'},
                {title:'Post Office 110001',sub:'HP Post Office details',href:'/post-office/110001',icon:'🏛️',color:'#60a5fa'},
                {title:'DigiPIN Lookup',sub:'J3G-K8M-41N6 New Delhi',href:'/digipin/J3G-K8M-41N6',icon:'📍',color:G},
                {title:'Browse All Listings',sub:`${stats?.active} active businesses`,href:'/listings',icon:'🔍',color:'#a78bfa'},
                {title:'Add Business',sub:'Free listing available',href:'/add-business',icon:'➕',color:'#fb923c'},
              ].map(p=>(
                <Link key={p.title} href={p.href} style={{background:'#0D0E12',border:`1px solid ${p.color}20`,borderRadius:12,padding:'20px',textDecoration:'none',display:'block',transition:'all 0.2s'}}
                  onMouseEnter={e=>(e.currentTarget.style.borderColor=`${p.color}50`)}
                  onMouseLeave={e=>(e.currentTarget.style.borderColor=`${p.color}20`)}>
                  <div style={{fontSize:26,marginBottom:10}}>{p.icon}</div>
                  <div style={{color:'#e8e9f0',fontWeight:700,fontSize:14,marginBottom:4}}>{p.title}</div>
                  <div style={{color:'#475569',fontSize:12}}>{p.sub}</div>
                  <div style={{color:p.color,fontSize:12,fontWeight:600,marginTop:10}}>Open →</div>
                </Link>
              ))}
            </div>
          )}

          {sideTab==='settings' && (
            <div className="fadein" style={{maxWidth:480}}>
              <div style={{background:'#0D0E12',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,padding:'24px',marginBottom:14}}>
                <h3 style={{color:'#e8e9f0',margin:'0 0 20px',fontFamily:"'Playfair Display',Georgia,serif"}}>Account</h3>
                {[{label:'Full Name',value:profile?.full_name||'—'},{label:'Email',value:email},{label:'Role',value:profile?.role?.replace('_',' ')},{label:'Map Provider',value:mapProvider}].map(f=>(
                  <div key={f.label} style={{display:'flex',justifyContent:'space-between',padding:'12px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
                    <span style={{color:'#475569',fontSize:14}}>{f.label}</span>
                    <span style={{color:'#e8e9f0',fontSize:14,fontWeight:600}}>{f.value}</span>
                  </div>
                ))}
              </div>
              {isAdmin && <Link href="/admin" style={{display:'block',background:'rgba(167,139,250,0.1)',border:'1px solid rgba(167,139,250,0.3)',color:'#a78bfa',padding:'12px 20px',borderRadius:8,textDecoration:'none',fontSize:14,fontWeight:600,textAlign:'center' as const,marginBottom:10}}>🔐 Go to Admin Panel</Link>}
              <button onClick={signOut} style={{background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.3)',color:'#ef4444',padding:'12px 24px',borderRadius:8,cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:600,width:'100%'}}>Sign Out</button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
