import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import type { Metadata } from 'next'

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
type P = { params: Promise<{ pincode: string }> }

const POST_OFFICES: Record<string, { name: string; city: string; state: string; type: string; delivery: string }> = {
  '110001': { name:'Connaught Place Post Office', city:'New Delhi', state:'Delhi', type:'Head Post Office', delivery:'Delivery' },
  '110003': { name:'Khan Market Post Office', city:'New Delhi', state:'Delhi', type:'Sub Post Office', delivery:'Delivery' },
  '110007': { name:'Civil Lines Post Office', city:'Delhi', state:'Delhi', type:'Sub Post Office', delivery:'Delivery' },
  '110016': { name:'Hauz Khas Post Office', city:'New Delhi', state:'Delhi', type:'Sub Post Office', delivery:'Delivery' },
  '110017': { name:'Saket Post Office', city:'New Delhi', state:'Delhi', type:'Sub Post Office', delivery:'Delivery' },
  '110075': { name:'Dwarka Post Office', city:'New Delhi', state:'Delhi', type:'Sub Post Office', delivery:'Delivery' },
  '110092': { name:'Laxmi Nagar Post Office', city:'Delhi', state:'Delhi', type:'Sub Post Office', delivery:'Delivery' },
  '121001': { name:'Faridabad Head Post Office', city:'Faridabad', state:'Haryana', type:'Head Post Office', delivery:'Delivery' },
  '122002': { name:'Gurugram Post Office MG Road', city:'Gurugram', state:'Haryana', type:'Sub Post Office', delivery:'Delivery' },
  '201301': { name:'Noida Sector 18 Post Office', city:'Noida', state:'Uttar Pradesh', type:'Sub Post Office', delivery:'Delivery' },
  '201308': { name:'Greater Noida Post Office', city:'Greater Noida', state:'Uttar Pradesh', type:'Sub Post Office', delivery:'Delivery' },
  '273001': { name:'Gorakhpur Head Post Office', city:'Gorakhpur', state:'Uttar Pradesh', type:'Head Post Office', delivery:'Delivery' },
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { pincode } = await params
  const po = POST_OFFICES[pincode]
  return {
    title: `${pincode} Post Office${po ? ` — ${po.name}` : ''} | SKM Studio Maps`,
    description: `Post office details for pincode ${pincode}${po ? ` — ${po.name}, ${po.city}, ${po.state}` : ''}. Find nearby businesses, services and local listings.`,
  }
}

export default async function PostOfficePage({ params }: P) {
  const { pincode } = await params
  const po = POST_OFFICES[pincode]
  const { data: biz } = await sb.from('businesses').select('id,name,slug,avg_rating,review_count,address,category_id').eq('pin_code', pincode).eq('status','active').order('avg_rating',{ascending:false}).limit(12)
  const catIds = [...new Set((biz||[]).map((b:any)=>b.category_id).filter(Boolean))]
  const { data: cats } = catIds.length ? await sb.from('categories').select('id,name').in('id',catIds) : {data:[]}
  const catMap:Record<string,string>={}
  cats?.forEach((c:any)=>catMap[c.id]=c.name)

  return (
    <div style={{minHeight:'100vh',background:'#0A0B0F',fontFamily:"'DM Sans',sans-serif",paddingTop:68}}>
      <div style={{background:'linear-gradient(135deg,#0A0B0F,#141620)',padding:'40px 24px 32px',borderBottom:'1px solid rgba(201,168,76,0.1)'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{fontSize:13,color:'#8a8da0',marginBottom:8}}><Link href="/" style={{color:'#C9A84C',textDecoration:'none'}}>Home</Link> / Post Office / {pincode}</div>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
            <span style={{fontSize:32}}>🏛️</span>
            <div>
              <h1 style={{fontSize:28,fontWeight:800,color:'#e8e9f0',margin:0,fontFamily:"'Playfair Display',Georgia,serif"}}>{po?.name || `Post Office ${pincode}`}</h1>
              {po&&<p style={{color:'#8a8da0',margin:'4px 0 0',fontSize:15}}>{po.city}, {po.state} — {po.type}</p>}
            </div>
          </div>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            <span style={{background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.2)',color:'#C9A84C',fontSize:12,fontWeight:600,padding:'4px 12px',borderRadius:99}}>📮 PIN {pincode}</span>
            {po&&<span style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',color:'#22c55e',fontSize:12,fontWeight:600,padding:'4px 12px',borderRadius:99}}>{po.delivery}</span>}
            <Link href={`/pincode/${pincode}`} style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',color:'#8a8da0',fontSize:12,fontWeight:600,padding:'4px 12px',borderRadius:99,textDecoration:'none'}}>View All Businesses →</Link>
          </div>
        </div>
      </div>
      <div style={{maxWidth:1100,margin:'0 auto',padding:'32px 24px'}}>
        {po && (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:16,marginBottom:40}}>
            {[{label:'Post Office Name',value:po.name},{label:'City',value:po.city},{label:'State',value:po.state},{label:'Type',value:po.type},{label:'Delivery Status',value:po.delivery},{label:'Pincode',value:pincode}].map(item=>(
              <div key={item.label} style={{background:'#141620',border:'1px solid rgba(255,255,255,0.07)',borderRadius:12,padding:'16px'}}>
                <div style={{color:'#8a8da0',fontSize:12,fontWeight:600,textTransform:'uppercase',letterSpacing:1,marginBottom:4}}>{item.label}</div>
                <div style={{color:'#e8e9f0',fontSize:15,fontWeight:600}}>{item.value}</div>
              </div>
            ))}
          </div>
        )}
        {(biz||[]).length>0&&(
          <>
            <h2 style={{fontSize:22,fontWeight:700,color:'#e8e9f0',margin:'0 0 16px',fontFamily:"'Playfair Display',Georgia,serif"}}>Businesses in {pincode}</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:16}}>
              {(biz||[]).map((b:any)=>(
                <Link key={b.id} href={`/b/${b.slug}`} style={{background:'#141620',border:'1px solid rgba(255,255,255,0.07)',borderRadius:12,padding:'14px 16px',textDecoration:'none',display:'block'}}>
                  <div style={{fontWeight:700,fontSize:14,color:'#e8e9f0',marginBottom:4}}>{b.name}</div>
                  <div style={{fontSize:12,color:'#f59e0b',marginBottom:6}}>{'★'.repeat(Math.floor(b.avg_rating||0))}{'☆'.repeat(5-Math.floor(b.avg_rating||0))}<span style={{color:'#8a8da0',marginLeft:6}}>({b.review_count||0})</span></div>
                  {catMap[b.category_id]&&<span style={{background:'rgba(201,168,76,0.1)',color:'#C9A84C',fontSize:11,fontWeight:600,padding:'2px 8px',borderRadius:99}}>{catMap[b.category_id]}</span>}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
