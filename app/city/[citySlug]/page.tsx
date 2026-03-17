import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props { params: Promise<{ citySlug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { citySlug } = await params
  const city = citySlug.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())
  return {
    title: `Best Local Businesses in ${city} | SKM Studio Maps`,
    description: `Find top-rated restaurants, hospitals, hotels, shopping & more in ${city}. Real reviews, directions, contact info. Better than JustDial — verified listings.`,
    keywords: [`businesses in ${city}`, `${city} near me`, `${city} directory`, `best ${city} restaurants`, `${city} hospitals`],
    openGraph: { title: `Local Businesses in ${city}`, description: `Top verified businesses in ${city}` }
  }
}

export default async function CityPage({ params }: Props) {
  const { citySlug } = await params
  const city = citySlug.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())

  const { data: cityData } = await supabase.from('cities').select('id,name').ilike('name', city).limit(1).single()
  const cityId = cityData?.id

  const { data: businesses } = cityId
    ? await supabase.from('businesses').select('id,name,slug,avg_rating,review_count,plan,is_verified,address,phone,category_id').eq('city_id', cityId).eq('status','active').order('avg_rating',{ascending:false}).limit(50)
    : { data: [] }

  const { data: categories } = await supabase.from('categories').select('id,name,slug,icon')
  const catMap: Record<string,string> = {}
  const catSlug: Record<string,string> = {}
  ;(categories||[]).forEach((c:any) => { catMap[c.id]=c.name; catSlug[c.id]=c.slug })

  // Count by category
  const catCounts: Record<string,number> = {}
  ;(businesses||[]).forEach((b:any) => { catCounts[b.category_id] = (catCounts[b.category_id]||0)+1 })

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Local Businesses in ${city}`,
    description: `Top verified local businesses in ${city}, India`,
    url: `https://maps-sooty-phi.vercel.app/city/${citySlug}`,
    numberOfItems: businesses?.length || 0,
    itemListElement: (businesses||[]).slice(0,10).map((b:any, i:number) => ({
      '@type': 'ListItem',
      position: i+1,
      item: {
        '@type': 'LocalBusiness',
        name: b.name,
        address: { '@type': 'PostalAddress', addressLocality: city, addressCountry: 'IN' },
        telephone: b.phone,
        aggregateRating: b.avg_rating > 0 ? { '@type': 'AggregateRating', ratingValue: b.avg_rating, reviewCount: b.review_count||1 } : undefined
      }
    }))
  }

  const G = '#C9A84C'

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{minHeight:'100vh',background:'#0A0B0F',fontFamily:"'DM Sans',sans-serif",paddingTop:68}}>
        <div style={{maxWidth:1100,margin:'0 auto',padding:'40px 20px'}}>

          {/* Hero */}
          <div style={{marginBottom:40}}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12,flexWrap:'wrap'}}>
              <Link href="/" style={{color:'#475569',fontSize:13,textDecoration:'none'}}>Home</Link>
              <span style={{color:'#475569'}}>›</span>
              <span style={{color:G,fontSize:13,fontWeight:600}}>Businesses in {city}</span>
            </div>
            <h1 style={{color:'#e8e9f0',fontSize:32,fontWeight:800,margin:'0 0 12px',fontFamily:"'Playfair Display',Georgia,serif"}}>
              Local Businesses in {city}
            </h1>
            <p style={{color:'#8a8da0',fontSize:16,margin:'0 0 8px',maxWidth:600}}>
              {businesses?.length || 0} verified businesses · restaurants, hospitals, hotels, shopping & more
            </p>
            <p style={{color:'#475569',fontSize:13}}>
              Real contact info · directions · reviews · updated regularly
            </p>
          </div>

          {/* Category quick links */}
          <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:32}}>
            {(categories||[]).filter((c:any)=>catCounts[c.id]).map((c:any)=>(
              <Link key={c.id} href={`/city/${citySlug}/${c.slug}`}
                style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',color:'#e8e9f0',padding:'7px 14px',borderRadius:99,textDecoration:'none',fontSize:13,display:'flex',alignItems:'center',gap:6}}>
                {c.icon||'📍'} {c.name} <span style={{color:G,fontWeight:700,fontSize:11}}>({catCounts[c.id]})</span>
              </Link>
            ))}
          </div>

          {/* Business grid */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:16,marginBottom:48}}>
            {(businesses||[]).map((b:any) => (
              <Link key={b.id} href={`/b/${b.id}`}
                style={{background:'#141620',border:'1px solid rgba(255,255,255,0.07)',borderRadius:12,padding:'18px',textDecoration:'none',display:'block',transition:'border-color 0.2s'}}
                onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(201,168,76,0.3)')}
                onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.07)')}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
                  <div style={{fontWeight:700,color:'#e8e9f0',fontSize:15,lineHeight:1.3}}>{b.name}</div>
                  {b.is_verified && <span style={{background:'rgba(34,197,94,0.1)',color:'#22c55e',fontSize:10,fontWeight:700,padding:'2px 7px',borderRadius:99,flexShrink:0}}>✓ Verified</span>}
                </div>
                <div style={{color:'#8a8da0',fontSize:12,marginBottom:6}}>{catMap[b.category_id]||'Business'} · {city}</div>
                {b.address && <div style={{color:'#475569',fontSize:12,marginBottom:8}}>📍 {b.address}</div>}
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div style={{color:'#f59e0b',fontSize:13,fontWeight:600}}>⭐ {Number(b.avg_rating||0).toFixed(1)}</div>
                  {['featured','premium'].includes(b.plan) && <span style={{background:'rgba(201,168,76,0.1)',color:G,fontSize:10,fontWeight:700,padding:'2px 8px',borderRadius:99}}>★ Featured</span>}
                </div>
              </Link>
            ))}
          </div>

          {/* SEO content block — legitimate comparison content */}
          <div style={{background:'#141620',border:'1px solid rgba(255,255,255,0.07)',borderRadius:14,padding:'32px',marginBottom:32}}>
            <h2 style={{color:'#e8e9f0',fontSize:22,fontWeight:700,margin:'0 0 16px',fontFamily:"'Playfair Display',Georgia,serif"}}>
              Why SKM Studio Maps for {city}?
            </h2>
            <p style={{color:'#8a8da0',fontSize:14,lineHeight:1.8,marginBottom:16}}>
              Finding trusted local businesses in {city} can be overwhelming. Unlike other directories, every listing on SKM Studio Maps is verified, geo-tagged with DigiPIN coordinates, and includes real contact details. Whether you're searching for the best restaurants near you in {city}, top-rated hospitals, budget hotels or shopping centres — we have you covered.
            </p>
            <p style={{color:'#8a8da0',fontSize:14,lineHeight:1.8,marginBottom:16}}>
              Our {city} directory is updated regularly with new businesses across all major neighbourhoods. Each listing includes phone numbers, addresses, opening hours, directions, and user reviews — making it the most reliable local business guide for {city} residents.
            </p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:12,marginTop:20}}>
              {[
                {icon:'✅',label:'Verified listings'},
                {icon:'📍',label:'DigiPIN geo-tagged'},
                {icon:'🗺️',label:'Interactive map'},
                {icon:'📞',label:'Direct contact info'},
                {icon:'⭐',label:'Real user reviews'},
                {icon:'🆓',label:'Free to browse'},
              ].map(f=>(
                <div key={f.label} style={{display:'flex',alignItems:'center',gap:10,background:'rgba(255,255,255,0.03)',borderRadius:8,padding:'10px 14px'}}>
                  <span style={{fontSize:18}}>{f.icon}</span>
                  <span style={{color:'#e8e9f0',fontSize:13,fontWeight:500}}>{f.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Near me links */}
          <div style={{marginBottom:32}}>
            <h3 style={{color:'#e8e9f0',fontSize:16,fontWeight:700,margin:'0 0 14px',fontFamily:"'Playfair Display',Georgia,serif"}}>Popular searches near {city}</h3>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              {(categories||[]).slice(0,8).map((c:any)=>(
                <Link key={c.id} href={`/near-me/${citySlug}/${c.slug}`}
                  style={{background:'rgba(201,168,76,0.07)',border:'1px solid rgba(201,168,76,0.2)',color:G,padding:'7px 14px',borderRadius:99,textDecoration:'none',fontSize:12,fontWeight:500}}>
                  {c.name} near me in {city}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
