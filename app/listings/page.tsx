'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase, type Business } from '@/lib/supabase'

export default function ListingsPage() {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const cities = ['New Delhi', 'South Delhi', 'Civil Lines', 'Dwarka', 'Laxmi Nagar', 'Noida', 'Greater Noida', 'Gurugram', 'Faridabad', 'Gorakhpur']
  const categories = ['Restaurants', 'Hotels', 'Hospitals', 'Shopping', 'Education', 'Finance', 'Fitness', 'Legal', 'Real Estate', 'Home Services', 'Beauty & Spa', 'Auto Services']

  useEffect(() => {
    fetchBusinesses()
  }, [search, selectedCity, selectedCategory])

  const fetchBusinesses = async () => {
    setLoading(true)
    let query = supabase
      .from('businesses')
      .select(`
        id, name, slug, description, avg_rating, review_count,
        plan, status, phone, address, price_range, is_verified, is_featured,
        cities!city_id (name, slug),
        categories!category_id (name, slug)
      `)
      .eq('status', 'active')
      .order('plan', { ascending: false })
      .order('avg_rating', { ascending: false })
      .limit(40)

    if (search) query = query.ilike('name', `%${search}%`)
    if (selectedCity) query = query.eq('cities.name', selectedCity)
    if (selectedCategory) query = query.eq('categories.name', selectedCategory)

    const { data, error } = await query
    if (!error && data) {
      const mapped = data.map((b: any) => ({
        ...b,
        city_name: b.cities?.name,
        city_slug: b.cities?.slug,
        category_name: b.categories?.name,
        category_slug: b.categories?.slug,
      }))
      setBusinesses(mapped)
    }
    setLoading(false)
  }

  const stars = (rating: number) => {
    const full = Math.floor(rating)
    return '★'.repeat(full) + '☆'.repeat(5 - full)
  }

  const priceColor = (p: string | null) => p === '$$$$' ? '#f59e0b' : p === '$$$' ? '#C9A84C' : '#22c55e'

  return (
    <div style={{ minHeight: '100vh', background: '#0A0B0F', fontFamily: "'DM Sans', sans-serif", paddingTop: 68 }}>

      {/* Search Header */}
      <div style={{ background: 'linear-gradient(135deg, #0A0B0F, #141620)', padding: '40px 24px 32px', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h1 style={{ color: '#e8e9f0', fontSize: 28, fontWeight: 800, margin: '0 0 20px', fontFamily: "'Playfair Display', Georgia, serif" }}>
            Browse Businesses <span style={{ color: '#C9A84C' }}>in India</span>
          </h1>

          {/* Search Bar */}
          <div style={{ display: 'flex', background: '#fff', borderRadius: 12, overflow: 'hidden', border: '2px solid #A07830', marginBottom: 14 }}>
            <span style={{ padding: '0 16px', color: '#888', display: 'flex', alignItems: 'center', fontSize: 18 }}>🔍</span>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search businesses by name..."
              style={{ flex: 1, border: 'none', padding: '14px 0', fontSize: 15, outline: 'none', color: '#333', fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)} style={{
              background: '#141620', border: '1px solid rgba(201,168,76,0.3)', color: '#e8e9f0',
              padding: '8px 14px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif"
            }}>
              <option value="">All Cities</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} style={{
              background: '#141620', border: '1px solid rgba(201,168,76,0.3)', color: '#e8e9f0',
              padding: '8px 14px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif"
            }}>
              <option value="">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {(selectedCity || selectedCategory || search) && (
              <button onClick={() => { setSearch(''); setSelectedCity(''); setSelectedCategory('') }} style={{
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                color: '#ef4444', padding: '8px 14px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif"
              }}>
                ✕ Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#C9A84C' }}>Loading businesses...</div>
        ) : businesses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <p style={{ color: '#8a8da0', fontSize: 16 }}>No businesses found. Try different search terms.</p>
          </div>
        ) : (
          <>
            <p style={{ color: '#8a8da0', fontSize: 14, marginBottom: 20 }}>
              Showing <strong style={{ color: '#C9A84C' }}>{businesses.length}</strong> businesses
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
              {businesses.map(b => (
                <Link key={b.id} href={`/b/${b.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: '#141620', border: `1px solid ${b.is_featured ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.07)'}`,
                    borderRadius: 14, overflow: 'hidden', transition: 'all 0.2s', cursor: 'pointer',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(201,168,76,0.1)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
                  >
                    {/* Card Header */}
                    <div style={{ height: 80, background: '#1a1f2e', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                      {b.is_featured && (
                        <span style={{ position: 'absolute', top: 8, right: 8, background: 'linear-gradient(135deg, #C9A84C, #E8C97A)', color: '#000', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 99 }}>
                          ⭐ Featured
                        </span>
                      )}
                      {b.is_verified && (
                        <span style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e', fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 99 }}>
                          ✓ Verified
                        </span>
                      )}
                      <div style={{
                        width: 52, height: 52, borderRadius: 12,
                        background: `hsl(${b.name.charCodeAt(0) * 7 % 360}, 60%, 40%)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontWeight: 800, fontSize: 18,
                      }}>
                        {b.name.charAt(0)}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                        <span style={{ fontWeight: 700, fontSize: 15, color: '#e8e9f0', lineHeight: 1.3 }}>{b.name}</span>
                        {b.price_range && (
                          <span style={{ color: priceColor(b.price_range), fontSize: 12, fontWeight: 600, flexShrink: 0, marginLeft: 8 }}>{b.price_range}</span>
                        )}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                        <span style={{ color: '#f59e0b', fontSize: 12 }}>{stars(Number(b.avg_rating))}</span>
                        <span style={{ fontWeight: 700, fontSize: 13, color: '#e8e9f0' }}>{Number(b.avg_rating).toFixed(1)}</span>
                        <span style={{ color: '#8a8da0', fontSize: 12 }}>({b.review_count?.toLocaleString()})</span>
                      </div>

                      {b.description && (
                        <p style={{ color: '#8a8da0', fontSize: 12, margin: '0 0 10px', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {b.description}
                        </p>
                      )}

                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {b.category_name && (
                          <span style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', color: '#C9A84C', fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 99 }}>
                            {b.category_name}
                          </span>
                        )}
                        {b.city_name && (
                          <span style={{ color: '#8a8da0', fontSize: 11, padding: '2px 4px' }}>📍 {b.city_name}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
