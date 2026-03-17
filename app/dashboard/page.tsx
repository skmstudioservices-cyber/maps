'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function DashboardPage() {
  const [loading, setLoading]   = useState(true)
  const [profile, setProfile]   = useState<any>(null)
  const [email, setEmail]       = useState('')
  const [stats, setStats]       = useState<any>(null)
  const [recent, setRecent]     = useState<any[]>([])
  const [activity, setActivity] = useState<any[]>([])
  const [sideTab, setSideTab]   = useState('overview')
  const [mobileNav, setMobileNav] = useState(false)

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { window.location.href = '/login'; return }
      setEmail(session.user.email || '')
      const { data: prof } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
      if (!prof) { window.location.href = '/login'; return }
      setProfile(prof)
      const isAdmin = ['super_admin','moderator'].includes(prof.role)

      const [
        { count: total }, { count: active }, { count: pending },
        { count: featured }, { count: verified },
        { count: reviews }, { count: claims }, { count: cities }, { count: cats }
      ] = await Promise.all([
        supabase.from('businesses').select('id',{count:'exact',head:true}),
        supabase.from('businesses').select('id',{count:'exact',head:true}).eq('status','active'),
        supabase.from('businesses').select('id',{count:'exact',head:true}).eq('status','pending'),
        supabase.from('businesses').select('id',{count:'exact',head:true}).eq('is_featured',true),
        supabase.from('businesses').select('id',{count:'exact',head:true}).eq('is_verified',true),
        supabase.from('reviews').select('id',{count:'exact',head:true}),
        supabase.from('claim_requests').select('id',{count:'exact',head:true}),
        supabase.from('cities').select('id',{count:'exact',head:true}),
        supabase.from('categories').select('id',{count:'exact',head:true}),
      ])

      const { data: viewData } = await supabase.from('businesses').select('view_count,click_count').eq('status','active')
      const views  = (viewData||[]).reduce((s:number,b:any)=>s+(b.view_count||0),0)
      const clicks = (viewData||[]).reduce((s:number,b:any)=>s+(b.click_count||0),0)

      setStats({ total,active,pending,featured,verified,reviews,claims,cities,cats,views,clicks })

      const { data: biz } = await supabase.from('businesses')
        .select('id,name,status,plan,is_verified,avg_rating,city_id,category_id,created_at')
        .order('created_at',{ascending:false}).limit(6)

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

      setActivity([
        {icon:'🏢',label:'Business directory updated',sub:'70 active listings across Delhi NCR',color:'#C9A84C'},
        {icon:'📍',label:'Phase 3 SEO pages live',sub:'/pincode, /digipin, /post-office routes',color:'#22c55e'},
        {icon:'📧',label:'Email system connected',sub:'Resend API — 3,000/month free',color:'#60a5fa'},
        {icon:'🔐',label:'Auth system secured',sub:'Magic link + password login working',color:'#a78bfa'},
        {icon:'🗺️',label:'DigiPIN integration',sub:'42 businesses with coordinates',color:'#fb923c'},
      ])

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
    {id:'listings',icon:'🏢',label:'Listings', href:'/listings'},
    {id:'saved',icon:'⭐',label:'Saved Places'},
    {id:'seo',icon:'🗺️',label:'SEO Pages'},
    {id:'activity',icon:'📋',label:'Activity'},
    ...(isAdmin?[{id:'admin',icon:'🔐',label:'Admin Panel',href:'/admin'}]:[]),
    {id:'settings',icon:'⚙️',label:'Settings'},
  ]

  const statGrid = [
    {label:'Total Listings',value:stats?.total,icon:'🏢',color:G,sub:'businesses'},
    {label:'Active',value:stats?.active,icon:'✅',color:'#22c55e',sub:'live now'},
    {label:'Pending',value:stats?.pending,icon:'⏳',color:'#f59e0b',sub:'awaiting review'},
    {label:'Featured',value:stats?.featured,icon:'⭐',color:G,sub:'premium listings'},
    {label:'Verified',value:stats?.verified,icon:'🔵',color:'#60a5fa',sub:'verified'},
    {label:'Reviews',value:stats?.reviews,icon:'💬',color:'#a78bfa',sub:'total reviews'},
    {label:'Cities',value:stats?.cities,icon:'🌆',color:'#34d399',sub:'covered'},
    {label:'Page Views',value:(stats?.views||0).toLocaleString(),icon:'👁️',color:'#94a3b8',sub:'total views'},
  ]

  const sc = (s:string) => s==='active'?'#22c55e':s==='pending'?'#f59e0b':s==='rejected'?'#ef4444':'#94a3b8'
  const sbg = (s:string) => s==='active'?'rgba(34,197,94,0.1)':s==='pending'?'rgba(245,158,11,0.1)':'rgba(239,68,68,0.1)'
  const pc = (p:string) => ['featured','premium'].includes(p)?G:'#475569'

  return (
    <div style={{minHeight:'100vh',background:'#070809',fontFamily:"'DM Sans',sans-serif",paddingTop:68}}>
      <style>{`
        @media(max-width:900px){.dash-sidebar{display:none!important}.dash-sidebar.open{display:flex!important;position:fixed;top:68px;left:0;right:0;bottom:0;z-index:50;background:#0A0B0F;overflow-y:auto}}
        @media(max-width:700px){.stat-grid{grid-template-columns:1fr 1fr!important}.recent-table th:nth-child(3),.recent-table th:nth-child(4),.recent-table td:nth-child(3),.recent-table td:nth-child(4){display:none!important}}
        .nav-btn:hover{background:rgba(201,168,76,0.08)!important;color:#e8e9f0!important}
        .stat-card:hover{border-color:rgba(201,168,76,0.25)!important;transform:translateY(-1px)}
        .biz-row:hover{background:rgba(255,255,255,0.03)!important}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        .fadein{animation:fadeIn 0.4s ease forwards}
      `}</style>

      <div style={{display:'flex',maxWidth:1400,margin:'0 auto',height:'calc(100vh - 68px)'}}>

        {/* Sidebar */}
        <aside className={`dash-sidebar${mobileNav?' open':''}`} style={{width:240,minWidth:240,background:'#0D0E12',borderRight:'1px solid rgba(255,255,255,0.06)',display:'flex',flexDirection:'column',padding:'24px 16px',gap:4,overflowY:'auto'}}>
          {/* Profile Card */}
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

          {/* Nav */}
          {navItems.map(n => (
            n.href
              ? <Link key={n.id} href={n.href} className="nav-btn" style={{display:'flex',alignItems:'center',gap:12,padding:'10px 12px',borderRadius:8,color: sideTab===n.id?G:'#8a8da0',background:sideTab===n.id?'rgba(201,168,76,0.08)':'transparent',textDecoration:'none',fontSize:14,fontWeight:sideTab===n.id?600:400,transition:'all 0.15s'}} onClick={()=>{setSideTab(n.id);setMobileNav(false)}}>
                <span style={{fontSize:16}}>{n.icon}</span>{n.label}
              </Link>
              : <button key={n.id} className="nav-btn" onClick={()=>{setSideTab(n.id);setMobileNav(false)}} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 12px',borderRadius:8,color:sideTab===n.id?G:'#8a8da0',background:sideTab===n.id?'rgba(201,168,76,0.08)':'transparent',border:'none',cursor:'pointer',fontSize:14,fontWeight:sideTab===n.id?600:400,fontFamily:"'DM Sans',sans-serif",textAlign:'left',transition:'all 0.15s',width:'100%'}}>
                <span style={{fontSize:16}}>{n.icon}</span>{n.label}
              </button>
          ))}

          <div style={{flex:1}}/>
          <button onClick={signOut} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 12px',borderRadius:8,color:'#ef4444',background:'transparent',border:'none',cursor:'pointer',fontSize:14,fontFamily:"'DM Sans',sans-serif",textAlign:'left',marginTop:8}} className="nav-btn">
            <span>🚪</span> Sign Out
          </button>
        </aside>

        {/* Main */}
        <main style={{flex:1,overflowY:'auto',padding:'28px 24px'}}>

          {/* Mobile header */}
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
            <div>
              <h1 style={{color:'#e8e9f0',fontSize:22,fontWeight:800,margin:0,fontFamily:"'Playfair Display',Georgia,serif"}}>
                {sideTab==='overview'?'Dashboard':navItems.find(n=>n.id===sideTab)?.label}
              </h1>
              <p style={{color:'#475569',fontSize:13,margin:'2px 0 0'}}>Tuesday, 17 March 2026</p>
            </div>
            <div style={{display:'flex',gap:10,alignItems:'center'}}>
              <Link href="/add-business" style={{background:`linear-gradient(135deg,${G},#E8C97A)`,color:'#0A0B0F',padding:'8px 16px',borderRadius:8,textDecoration:'none',fontSize:13,fontWeight:700,whiteSpace:'nowrap'}}>+ Add Business</Link>
              <button onClick={()=>setMobileNav(!mobileNav)} style={{background:'#141620',border:'1px solid rgba(255,255,255,0.1)',color:'#e8e9f0',width:38,height:38,borderRadius:8,cursor:'pointer',fontSize:18,display:'flex',alignItems:'center',justifyContent:'center'}}>☰</button>
            </div>
          </div>

          {/* OVERVIEW TAB */}
          {sideTab==='overview' && (
            <div className="fadein">
              {/* Stat Grid */}
              <div className="stat-grid" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:24}}>
                {statGrid.map(c=>(
                  <div key={c.label} className="stat-card" style={{background:'#0D0E12',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,padding:'18px 16px',transition:'all 0.2s',cursor:'default'}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12}}>
                      <span style={{fontSize:22}}>{c.icon}</span>
                      <span style={{color:c.color,fontSize:11,fontWeight:600,background:`${c.color}15`,padding:'2px 8px',borderRadius:99}}>{c.sub}</span>
                    </div>
                    <div style={{color:c.color,fontSize:28,fontWeight:800,lineHeight:1,marginBottom:4}}>{c.value??'—'}</div>
                    <div style={{color:'#475569',fontSize:12}}>{c.label}</div>
                  </div>
                ))}
              </div>

              {/* Map placeholder + Activity */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:20,marginBottom:24}}>
                {/* Map */}
                <div style={{background:'#0D0E12',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,overflow:'hidden',height:280,position:'relative'}}>
                  <div style={{position:'absolute',inset:0,background:'linear-gradient(135deg,#0D0E12 0%,#141620 50%,#0D0E12 100%)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:12}}>
                    <div style={{fontSize:48,opacity:0.3}}>🗺️</div>
                    <div style={{color:'#8a8da0',fontSize:14,fontWeight:500}}>Interactive Map — Coming Soon</div>
                    <div style={{color:'#475569',fontSize:12}}>DigiPIN grid & business locations</div>
                  </div>
                  <div style={{position:'absolute',top:16,left:16}}>
                    <span style={{background:'rgba(201,168,76,0.15)',border:'1px solid rgba(201,168,76,0.3)',color:G,fontSize:11,fontWeight:700,padding:'4px 10px',borderRadius:99}}>📍 Delhi NCR + Gorakhpur</span>
                  </div>
                  <div style={{position:'absolute',bottom:16,right:16,display:'flex',flexDirection:'column',gap:8}}>
                    {['🔍','📍','🗺️'].map((i,idx)=>(
                      <div key={idx} style={{width:36,height:36,background:'rgba(13,14,18,0.9)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',fontSize:16}}>{i}</div>
                    ))}
                  </div>
                </div>

                {/* Activity Feed */}
                <div style={{background:'#0D0E12',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,padding:'20px'}}>
                  <h3 style={{color:'#e8e9f0',fontSize:15,fontWeight:700,margin:'0 0 16px',fontFamily:"'Playfair Display',Georgia,serif"}}>Recent Activity</h3>
                  {activity.map((a,i)=>(
                    <div key={i} style={{display:'flex',alignItems:'flex-start',gap:12,padding:'10px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                      <div style={{width:36,height:36,borderRadius:8,background:`${a.color}15`,border:`1px solid ${a.color}30`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,flexShrink:0}}>{a.icon}</div>
                      <div style={{minWidth:0}}>
                        <div style={{color:'#e8e9f0',fontSize:13,fontWeight:600,lineHeight:1.3}}>{a.label}</div>
                        <div style={{color:'#475569',fontSize:11,marginTop:2}}>{a.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Businesses Table */}
              <div style={{background:'#0D0E12',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,overflow:'hidden'}}>
                <div style={{padding:'18px 20px 12px',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <h3 style={{color:'#e8e9f0',fontSize:15,fontWeight:700,margin:0,fontFamily:"'Playfair Display',Georgia,serif"}}>Recent Businesses</h3>
                  <Link href="/listings" style={{color:G,fontSize:13,textDecoration:'none',fontWeight:500}}>View all →</Link>
                </div>
                <div style={{overflowX:'auto'}}>
                  <table className="recent-table" style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
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
                              <div style={{width:32,height:32,borderRadius:8,background:`hsl(${b.name.charCodeAt(0)*7%360},50%,30%)`,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:13,flexShrink:0}}>{b.name[0]}</div>
                              <div>
                                <Link href={`/b/${b.id}`} style={{color:'#e8e9f0',textDecoration:'none',fontWeight:600}}>{b.name}</Link>
                                {b.is_verified&&<span style={{marginLeft:6,color:'#22c55e',fontSize:10}}>✓</span>}
                              </div>
                            </div>
                          </td>
                          <td style={{padding:'12px 16px',color:'#8a8da0'}}>{b.cat}</td>
                          <td style={{padding:'12px 16px',color:'#8a8da0'}}>{b.city}</td>
                          <td style={{padding:'12px 16px'}}>
                            <span style={{background:sbg(b.status),color:sc(b.status),fontSize:11,fontWeight:600,padding:'3px 8px',borderRadius:99}}>{b.status}</span>
                          </td>
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

          {/* SEO TAB */}
          {sideTab==='seo' && (
            <div className="fadein" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:16}}>
              {[
                {title:'Pincode 110001',sub:'Connaught Place — New Delhi',href:'/pincode/110001',icon:'📮',color:'#22c55e'},
                {title:'Pincode 273001',sub:'Gorakhpur Head Post Office',href:'/pincode/273001',icon:'📮',color:'#22c55e'},
                {title:'Post Office 110001',sub:'HP Post Office details + listings',href:'/post-office/110001',icon:'🏛️',color:'#60a5fa'},
                {title:'DigiPIN Page',sub:'J3G-K8M-41N6 — New Delhi',href:'/digipin/J3G-K8M-41N6',icon:'📍',color:G},
                {title:'Browse All Listings',sub:'70 businesses across India',href:'/listings',icon:'🔍',color:'#a78bfa'},
                {title:'Search',sub:'Find businesses by name',href:'/search',icon:'🔎',color:'#fb923c'},
              ].map(p=>(
                <Link key={p.title} href={p.href} style={{background:'#0D0E12',border:`1px solid ${p.color}20`,borderRadius:12,padding:'20px',textDecoration:'none',display:'block',transition:'all 0.2s'}}
                  onMouseEnter={e=>(e.currentTarget.style.borderColor=`${p.color}50`)}
                  onMouseLeave={e=>(e.currentTarget.style.borderColor=`${p.color}20`)}>
                  <div style={{fontSize:28,marginBottom:12}}>{p.icon}</div>
                  <div style={{color:'#e8e9f0',fontWeight:700,fontSize:15,marginBottom:4}}>{p.title}</div>
                  <div style={{color:'#475569',fontSize:13}}>{p.sub}</div>
                  <div style={{color:p.color,fontSize:12,fontWeight:600,marginTop:12}}>Open page →</div>
                </Link>
              ))}
            </div>
          )}

          {/* ACTIVITY TAB */}
          {sideTab==='activity' && (
            <div className="fadein" style={{background:'#0D0E12',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,padding:'20px'}}>
              {activity.map((a,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:16,padding:'16px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
                  <div style={{width:44,height:44,borderRadius:10,background:`${a.color}15`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>{a.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{color:'#e8e9f0',fontWeight:600,fontSize:15}}>{a.label}</div>
                    <div style={{color:'#475569',fontSize:13,marginTop:2}}>{a.sub}</div>
                  </div>
                  <span style={{color:a.color,fontSize:11,fontWeight:700,background:`${a.color}15`,padding:'3px 10px',borderRadius:99}}>Done</span>
                </div>
              ))}
            </div>
          )}

          {/* SAVED TAB */}
          {sideTab==='saved' && (
            <div className="fadein" style={{textAlign:'center',padding:'60px 0'}}>
              <div style={{fontSize:48,marginBottom:16}}>⭐</div>
              <h2 style={{color:'#e8e9f0',marginBottom:8,fontFamily:"'Playfair Display',Georgia,serif"}}>Saved Places</h2>
              <p style={{color:'#475569',marginBottom:24}}>Save businesses you love to find them quickly</p>
              <Link href="/listings" style={{background:`linear-gradient(135deg,${G},#E8C97A)`,color:'#0A0B0F',padding:'12px 28px',borderRadius:8,fontWeight:700,textDecoration:'none'}}>Browse Businesses</Link>
            </div>
          )}

          {/* SETTINGS TAB */}
          {sideTab==='settings' && (
            <div className="fadein" style={{maxWidth:500}}>
              <div style={{background:'#0D0E12',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,padding:'24px',marginBottom:16}}>
                <h3 style={{color:'#e8e9f0',margin:'0 0 20px',fontFamily:"'Playfair Display',Georgia,serif"}}>Account</h3>
                {[{label:'Full Name',value:profile?.full_name},{label:'Email',value:email},{label:'Role',value:profile?.role?.replace('_',' ')},{label:'Member Since',value:'March 2026'}].map(f=>(
                  <div key={f.label} style={{display:'flex',justifyContent:'space-between',padding:'12px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
                    <span style={{color:'#475569',fontSize:14}}>{f.label}</span>
                    <span style={{color:'#e8e9f0',fontSize:14,fontWeight:600}}>{f.value}</span>
                  </div>
                ))}
              </div>
              <button onClick={signOut} style={{background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.3)',color:'#ef4444',padding:'12px 24px',borderRadius:8,cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:600,width:'100%'}}>Sign Out</button>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}
