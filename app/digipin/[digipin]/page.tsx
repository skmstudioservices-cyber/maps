import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import type { Metadata } from 'next'

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
type P = { params: Promise<{ digipin: string }> }

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { digipin } = await params
  return {
    title: `DigiPIN ${digipin} — Location, Businesses & Address | SKM Studio Maps`,
    description: `All businesses and services at DigiPIN location ${digipin}. India Post's digital addressing system for precise location identification.`,
  }
}

export default async function DigiPinPage({ params }: P) {
  const { digipin } = await params
  const decoded = digipin.toUpperCase()
  const { data: biz } = await sb.from('businesses').select('id,name,slug,avg_rating,review_count,phone,address,price_range,is_verified,category_id,pin_code,latitude,longitude').eq('digipin', decoded).eq('status','active')
  const catIds = [...new Set((biz||[]).map((b:any)=>b.category_id).filter(Boolean))]
  const { data: cats } = catIds.length ? await sb.from('categories').select('id,name').in('id',catIds) : {data:[]}
  const catMap:Record<string,string> = {}
  cats?.forEach((c:any)=>catMap[c.id]=c.name)

  return (
    <div style={{minHeight:'100vh',background:'#0A0B0F',fontFamily:"'DM Sans',sans-serif",paddingTop:68}}>
      <div style={{background:'linear-gradient(135deg,#0A0B0F,#141620)',padding:'40px 24px 32px',borderBottom:'1px solid rgba(201,168,76,0.1)'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{fontSize:13,color:'#8a8da0',marginBottom:8}}><Link href="/" style={{color:'#C9A84C',textDecoration:'none'}}>Home</Link> / DigiPIN</div>
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:8}}>
            <div style={{background:'linear-gradient(135deg,#C9A84C,#E8C97A)',borderRadius:8,padding:'6px 14px',fontSize:20,fontWeight:800,color:'#0A0B0F',letterSpacing:2,fontFamily:'monospace'}}>{decoded}</div>
            <span style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',color:'#22c55e',fontSize:12,fontWeight:600,padding:'4px 10px',borderRadius:99}}>India Post DigiPIN</span>
          </div>
          <h1 style={{fontSize:28,fontWeight:800,color:'#e8e9f0',margin:'0 0 8px',fontFamily:"'Playfair Display',Georgia,serif"}}>Location <span style={{color:'#C9A84C'}}>{decoded}</span></h1>
          <p style={{color:'#8a8da0',margin:0}}>{(biz||[]).length} businesses at this location</p>
        </div>
      </div>
      <div style={{maxWidth:1100,margin:'0 auto',padding:'32px 24px'}}>
        {(biz||[]).length===0 ? (
          <div style={{textAlign:'center',padding:'60px 0'}}>
            <div style={{fontSize:48,marginBottom:16}}>📍</div>
            <h2 style={{color:'#e8e9f0',marginBottom:8}}>No businesses at this DigiPIN</h2>
            <Link href="/add-business" style={{background:'linear-gradient(135deg,#C9A84C,#E8C97A)',color:'#0A0B0F',padding:'12px 24px',borderRadius:8,fontWeight:700,textDecoration:'none'}}>Add Your Business Here</Link>
          </div>
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:16}}>
            {(biz||[]).map((b:any)=>(
              <Link key={b.id} href={`/b/${b.slug}`} style={{background:'#141620',border:'1px solid rgba(201,168,76,0.2)',borderRadius:12,padding:'14px 16px',textDecoration:'none',display:'block'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}><span style={{fontWeight:700,fontSize:14,color:'#e8e9f0'}}>{b.name}</span>{b.price_range&&<span style={{color:'#C9A84C',fontSize:12}}>{b.price_range}</span>}</div>
                <div style={{fontSize:12,color:'#f59e0b',marginBottom:6}}>{'★'.repeat(Math.floor(b.avg_rating||0))}{'☆'.repeat(5-Math.floor(b.avg_rating||0))}<span style={{color:'#8a8da0',marginLeft:6}}>({b.review_count||0})</span></div>
                {catMap[b.category_id]&&<span style={{background:'rgba(201,168,76,0.1)',color:'#C9A84C',fontSize:11,fontWeight:600,padding:'2px 8px',borderRadius:99}}>{catMap[b.category_id]}</span>}
                {b.address&&<p style={{color:'#8a8da0',fontSize:12,margin:'8px 0 0'}}>📍 {b.address}</p>}
                {b.pin_code&&<p style={{color:'#8a8da0',fontSize:12,margin:'4px 0 0'}}>📮 Pincode: <Link href={`/pincode/${b.pin_code}`} style={{color:'#C9A84C',textDecoration:'none'}}>{b.pin_code}</Link></p>}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
