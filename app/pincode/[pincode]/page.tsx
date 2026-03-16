import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import type { Metadata } from 'next'

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
type P = { params: Promise<{ pincode: string }> }

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { pincode } = await params
  return {
    title: `${pincode} Pincode — Businesses, Shops & Services | SKM Studio Maps`,
    description: `Find businesses, hospitals, restaurants in pincode ${pincode}. Local directory with ratings and contact details.`,
  }
}

export default async function PincodePage({ params }: P) {
  const { pincode } = await params
  const { data: biz } = await sb.from('businesses').select('id,name,slug,avg_rating,review_count,phone,address,price_range,is_verified,is_featured,category_id').eq('pin_code', pincode).eq('status','active').order('is_featured',{ascending:false}).order('avg_rating',{ascending:false})
  const catIds = [...new Set((biz||[]).map((b:any)=>b.category_id).filter(Boolean))]
  const { data: cats } = catIds.length ? await sb.from('categories').select('id,name,slug').in('id',catIds) : {data:[]}
  const catMap:Record<string,any> = {}
  cats?.forEach((c:any)=>catMap[c.id]=c)
  const groups:Record<string,any[]> = {}
  ;(biz||[]).forEach((b:any)=>{const k=catMap[b.category_id]?.name||'Other';groups[k]=groups[k]||[];groups[k].push({...b,category_name:k,category_slug:catMap[b.category_id]?.slug})})

  return (
    <div style={{minHeight:'100vh',background:'#0A0B0F',fontFamily:"'DM Sans',sans-serif",paddingTop:68}}>
      <div style={{background:'linear-gradient(135deg,#0A0B0F,#141620)',padding:'40px 24px 32px',borderBottom:'1px solid rgba(201,168,76,0.1)'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{fontSize:13,color:'#8a8da0',marginBottom:8}}><Link href="/" style={{color:'#C9A84C',textDecoration:'none'}}>Home</Link> / Pincode {pincode}</div>
          <h1 style={{fontSize:32,fontWeight:800,color:'#e8e9f0',margin:'0 0 8px',fontFamily:"'Playfair Display',Georgia,serif"}}>Pincode <span style={{color:'#C9A84C'}}>{pincode}</span></h1>
          <p style={{color:'#8a8da0',margin:0}}>{(biz||[]).length} businesses found</p>
          <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:16}}>
            {Object.keys(groups).map(cat=><Link key={cat} href={`#${cat.toLowerCase().replace(/\s/g,'-')}`} style={{background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.2)',color:'#C9A84C',fontSize:12,fontWeight:600,padding:'4px 12px',borderRadius:99,textDecoration:'none'}}>{cat} ({groups[cat].length})</Link>)}
          </div>
        </div>
      </div>
      <div style={{maxWidth:1100,margin:'0 auto',padding:'32px 24px'}}>
        {(biz||[]).length===0 ? (
          <div style={{textAlign:'center',padding:'60px 0'}}>
            <div style={{fontSize:48,marginBottom:16}}>📍</div>
            <h2 style={{color:'#e8e9f0',marginBottom:8}}>No businesses listed yet</h2>
            <p style={{color:'#8a8da0',marginBottom:24}}>Be the first to add your business in {pincode}</p>
            <Link href="/add-business" style={{background:'linear-gradient(135deg,#C9A84C,#E8C97A)',color:'#0A0B0F',padding:'12px 24px',borderRadius:8,fontWeight:700,textDecoration:'none'}}>Add Your Business Free</Link>
          </div>
        ) : Object.entries(groups).map(([cat,items])=>(
          <div key={cat} id={cat.toLowerCase().replace(/\s/g,'-')} style={{marginBottom:40}}>
            <h2 style={{fontSize:20,fontWeight:700,color:'#e8e9f0',margin:'0 0 16px',fontFamily:"'Playfair Display',Georgia,serif"}}>{cat} <span style={{color:'#8a8da0',fontSize:15,fontWeight:400}}>({items.length})</span></h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:16}}>
              {items.map((b:any)=>(
                <Link key={b.id} href={`/b/${b.slug}`} style={{background:'#141620',border:'1px solid rgba(255,255,255,0.07)',borderRadius:12,padding:'14px 16px',textDecoration:'none',display:'block'}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}><span style={{fontWeight:700,fontSize:14,color:'#e8e9f0'}}>{b.name}</span>{b.price_range&&<span style={{color:'#C9A84C',fontSize:12}}>{b.price_range}</span>}</div>
                  <div style={{fontSize:12,color:'#f59e0b',marginBottom:6}}>{'★'.repeat(Math.floor(b.avg_rating||0))}{'☆'.repeat(5-Math.floor(b.avg_rating||0))}<span style={{color:'#8a8da0',marginLeft:6}}>({b.review_count||0})</span></div>
                  {b.address&&<p style={{color:'#8a8da0',fontSize:12,margin:'0 0 4px'}}>📍 {b.address}</p>}
                  {b.phone&&<p style={{color:'#C9A84C',fontSize:12,margin:0}}>📞 {b.phone}</p>}
                </Link>
              ))}
            </div>
          </div>
        ))}
        <div style={{background:'#141620',border:'1px solid rgba(201,168,76,0.15)',borderRadius:16,padding:'32px 24px',marginTop:40,textAlign:'center'}}>
          <h3 style={{color:'#e8e9f0',margin:'0 0 8px',fontFamily:"'Playfair Display',Georgia,serif"}}>Own a business in {pincode}?</h3>
          <p style={{color:'#8a8da0',margin:'0 0 20px',fontSize:14}}>List it free and reach local customers</p>
          <Link href="/add-business" style={{background:'linear-gradient(135deg,#C9A84C,#E8C97A)',color:'#0A0B0F',padding:'12px 28px',borderRadius:8,fontWeight:700,textDecoration:'none'}}>+ Add Free</Link>
        </div>
      </div>
    </div>
  )
}
