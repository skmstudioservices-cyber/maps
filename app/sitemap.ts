import { supabase } from '@/lib/supabase'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE = 'https://maps-sooty-phi.vercel.app'

  const [{ data: cities }, { data: categories }, { data: businesses }] = await Promise.all([
    supabase.from('cities').select('slug,updated_at'),
    supabase.from('categories').select('slug'),
    supabase.from('businesses').select('id,updated_at').eq('status','active').limit(500),
  ])

  const static_pages: MetadataRoute.Sitemap = [
    { url: BASE,                  lastModified: new Date(), changeFrequency:'daily',   priority:1.0 },
    { url:`${BASE}/listings`,     lastModified: new Date(), changeFrequency:'daily',   priority:0.9 },
    { url:`${BASE}/compare`,      lastModified: new Date(), changeFrequency:'monthly', priority:0.8 },
    { url:`${BASE}/add-business`, lastModified: new Date(), changeFrequency:'monthly', priority:0.7 },
    { url:`${BASE}/pricing`,      lastModified: new Date(), changeFrequency:'monthly', priority:0.7 },
    { url:`${BASE}/roadmap`,      lastModified: new Date(), changeFrequency:'weekly',  priority:0.5 },
  ]

  const city_pages = (cities||[]).map(c => ({
    url: `${BASE}/city/${c.slug}`,
    lastModified: new Date(c.updated_at||Date.now()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const cat_pages = (categories||[]).map(c => ({
    url: `${BASE}/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // City × Category combos
  const combo_pages = (cities||[]).flatMap(city =>
    (categories||[]).map(cat => ({
      url: `${BASE}/city/${city.slug}/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    }))
  )

  const biz_pages = (businesses||[]).map(b => ({
    url: `${BASE}/b/${b.id}`,
    lastModified: new Date(b.updated_at||Date.now()),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...static_pages, ...city_pages, ...cat_pages, ...combo_pages, ...biz_pages]
}
