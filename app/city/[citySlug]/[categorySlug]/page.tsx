import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props { params: Promise<{ citySlug: string; categorySlug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { citySlug, categorySlug } = await params
  const city = citySlug.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())
  const cat  = categorySlug.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())
  return {
    title: `Best ${cat} in ${city} | Near Me | SKM Studio Maps`,
    description: `Top-rated ${cat.toLowerCase()} in ${city}. Find verified ${cat.toLowerCase()} near you with contact details, directions, opening hours and reviews.`,
    keywords: [`${cat.toLowerCase()} in ${city}`, `best ${cat.toLowerCase()} ${city}`, `${cat.toLowerCase()} near me ${city}`, `${city} ${cat.toLowerCase()} list`],
  }
}

export default async function CityCategoryPage({ params }: Props) {
  const { citySlug, categorySlug } = await params
  const city = citySlug.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())
  const cat  = categorySlug.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())

  const [{ data: cityData }, { data: catData }] = await Promise.all([
    supabase.from('cities').select('id,name').ilike('name',city).limit(1).single(),
    supabase.from('categories').select('id,name,slug,icon,description').ilike('name',cat).limit(1).single(),
  ])

  const { data: businesses } = (cityData && catData)
    ? await supabase.from('businesses').select('id,name,avg_rating,review_count,plan,is_verified,address,phone,latitude,longitude').eq('city_id',cityData.id).eq('category_id',catData.id).eq('status','active').order('avg_rating',{ascending:false}).limit(50)
    : { data: [] }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Best ${cat} in ${city}`,
    url: `https://maps-sooty-phi.vercel.app/city/${citySlug}/${categorySlug}`,
    numberOfItems: businesses?.length||0,
    itemListElement: (businesses||[]).slice(0,10).map((b:any,i:number)=>({
      '@type': 'ListItem', position: i+1,
      item: {
        '@type': 'LocalBusiness',
        name: b.name,
        telephone: b.phone,
        address: { '@type': 'PostalAddress', addressLocality: city, addressCountry:'IN' },
        ...(b.latitude && { geo: { '@type':'GeoCoordinates', latitude: b.latitude, longitude: b.longitude } }),
        aggregateRating: b.avg_rating>0 ? { '@type':'AggregateRating', ratingValue:b.avg_rating, reviewCount:b.review_count||1 } : undefined
      }
    }))
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
            <Link href={`/city/${citySlug}`} style={{color:'#475569',fontSize:13,textDecoration:'none'}}>{city}</Link>
            <span style={{color:'#475569'}}>›</span>
            <span style={{color:G,fontSize:13,fontWeight:600}}>{cat}</span>
          </div>
          <h1 style={{color:'#e8e9f0',fontSize:30,fontWeight:800,margin:'0 0 10px',fontFamily:"'Playfair Display',Georgia,serif"}}>
            Best {cat} in {city}
          </h1>
          <p style={{color:'#8a8da0',fontSize:15,margin:'0 0 32px'}}>
            {businesses?.length||0} verified {cat.toLowerCase()} · contact info · directions · reviews
          </p>

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:16,marginBottom:40}}>
            {(businesses||[]).map((b:any)=>(
              <Link key={b.id} href={`/b/${b.id}`}
                style={{background:'#141620',border:'1px solid rgba(255,255,255,0.07)',borderRadius:12,padding:'18px',textDecoration:'none',display:'block',transition:'border-color 0.2s'}}
                onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(201,168,76,0.3)')}
                onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.07)')}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
                  <div style={{fontWeight:700,color:'#e8e9f0',fontSize:15}}>{b.name}</div>
                  {b.is_verified && <span style={{background:'rgba(34,197,94,0.1)',color:'#22c55e',fontSize:10,fontWeight:700,padding:'2px 7px',borderRadius:99,flexShrink:0}}>✓ Verified</span>}
                </div>
                {b.address && <div style={{color:'#475569',fontSize:12,marginBottom:8}}>📍 {b.address}</div>}
                {b.phone && <div style={{color:'#60a5fa',fontSize:12,marginBottom:8}}>📞 {b.phone}</div>}
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span style={{color:'#f59e0b',fontSize:13,fontWeight:600}}>⭐ {Number(b.avg_rating||0).toFixed(1)}</span>
                  {['featured','premium'].includes(b.plan) && <span style={{background:'rgba(201,168,76,0.1)',color:G,fontSize:10,fontWeight:700,padding:'2px 8px',borderRadius:99}}>★ Featured</span>}
                </div>
              </Link>
            ))}
          </div>

          {/* SEO content — clean, editorial */}
          <div style={{background:'#141620',border:'1px solid rgba(255,255,255,0.07)',borderRadius:14,padding:'28px'}}>
            <h2 style={{color:'#e8e9f0',fontSize:20,fontWeight:700,margin:'0 0 14px',fontFamily:"'Playfair Display',Georgia,serif"}}>
              Find the Best {cat} Near You in {city}
            </h2>
            <p style={{color:'#8a8da0',fontSize:14,lineHeight:1.8}}>
              Looking for trusted {cat.toLowerCase()} in {city}? Our verified directory lists {businesses?.length||0} {cat.toLowerCase()} with real contact details, addresses, opening hours and user ratings. Each listing includes directions so you can navigate directly from your phone. Browse by rating, location or plan type to find exactly what you need.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
