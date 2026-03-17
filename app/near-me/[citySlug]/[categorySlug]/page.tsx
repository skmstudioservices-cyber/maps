import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props { params: Promise<{ citySlug: string; categorySlug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { citySlug, categorySlug } = await params
  const city = citySlug.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())
  const cat  = categorySlug.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())
  return {
    title: `${cat} Near Me in ${city} — Open Now | SKM Studio Maps`,
    description: `Find ${cat.toLowerCase()} near you in ${city}. Get directions, phone numbers, ratings and opening hours. Free local directory — no sign-up needed.`,
    keywords: [`${cat.toLowerCase()} near me`, `${cat.toLowerCase()} near me ${city}`, `nearby ${cat.toLowerCase()} ${city}`, `${city} ${cat.toLowerCase()} open now`],
  }
}

export default async function NearMePage({ params }: Props) {
  const { citySlug, categorySlug } = await params
  const city = citySlug.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())
  const cat  = categorySlug.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())

  const [{ data: cityData }, { data: catData }] = await Promise.all([
    supabase.from('cities').select('id').ilike('name',city).limit(1).single(),
    supabase.from('categories').select('id').ilike('name',cat).limit(1).single(),
  ])

  const { data: businesses } = (cityData && catData)
    ? await supabase.from('businesses').select('id,name,avg_rating,plan,is_verified,address,phone,latitude,longitude').eq('city_id',cityData.id).eq('category_id',catData.id).eq('status','active').order('avg_rating',{ascending:false}).limit(40)
    : { data: [] }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${cat} Near Me in ${city}`,
    url: `https://maps-sooty-phi.vercel.app/near-me/${citySlug}/${categorySlug}`,
    numberOfItems: businesses?.length||0,
  }

  const G = '#C9A84C'

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{minHeight:'100vh',background:'#0A0B0F',fontFamily:"'DM Sans',sans-serif",paddingTop:68}}>
        <div style={{maxWidth:1100,margin:'0 auto',padding:'40px 20px'}}>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16,flexWrap:'wrap'}}>
            <Link href="/" style={{color:'#475569',fontSize:13,textDecoration:'none'}}>Home</Link>
            <span style={{color:'#475569'}}>›</span>
            <span style={{color:G,fontSize:13,fontWeight:600}}>{cat} near me in {city}</span>
          </div>
          <h1 style={{color:'#e8e9f0',fontSize:30,fontWeight:800,margin:'0 0 10px',fontFamily:"'Playfair Display',Georgia,serif"}}>
            {cat} Near Me in {city}
          </h1>
          <p style={{color:'#8a8da0',fontSize:14,margin:'0 0 8px'}}>
            {businesses?.length||0} {cat.toLowerCase()} found · tap any listing to get directions
          </p>
          <p style={{color:'#475569',fontSize:12,margin:'0 0 32px'}}>
            Showing results for {city} · <Link href={`/city/${citySlug}/${categorySlug}`} style={{color:G,textDecoration:'none'}}>View full list →</Link>
          </p>

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:14,marginBottom:40}}>
            {(businesses||[]).map((b:any)=>(
              <Link key={b.id} href={`/b/${b.id}`}
                style={{background:'#141620',border:'1px solid rgba(255,255,255,0.07)',borderRadius:12,padding:'16px',textDecoration:'none',display:'block'}}>
                <div style={{fontWeight:700,color:'#e8e9f0',fontSize:14,marginBottom:6}}>{b.name}</div>
                {b.address && <div style={{color:'#475569',fontSize:12,marginBottom:6}}>📍 {b.address}</div>}
                <div style={{display:'flex',gap:8,alignItems:'center'}}>
                  <span style={{color:'#f59e0b',fontSize:12}}>⭐ {Number(b.avg_rating||0).toFixed(1)}</span>
                  {b.phone && <span style={{color:'#60a5fa',fontSize:12}}>📞 Call</span>}
                  {b.latitude && <a href={`https://www.google.com/maps/dir/?api=1&destination=${b.latitude},${b.longitude}`} target="_blank" onClick={e=>e.stopPropagation()} style={{color:'#4285F4',fontSize:12,textDecoration:'none'}}>🗺️ Directions</a>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
