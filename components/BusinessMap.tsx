'use client'
import { useEffect, useRef } from 'react'

type Business = {
  id: string
  name: string
  latitude: number | null
  longitude: number | null
  category?: string
  city?: string
  plan?: string
  avg_rating?: number
  address?: string
  phone?: string
}

interface Props {
  businesses: Business[]
  center?: [number, number]
  zoom?: number
  height?: string
}

export default function BusinessMap({ businesses, center = [22.5, 80.0], zoom = 5, height = '450px' }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return

    // Load Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link')
      link.id = 'leaflet-css'
      link.rel = 'stylesheet'
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css'
      document.head.appendChild(link)
    }

    const loadMap = () => {
      const L = (window as any).L
      if (!L) return

      // Dark tile layer (CartoDB Dark)
      const map = L.map(mapRef.current!, { zoomControl: true, scrollWheelZoom: true })
      mapInstance.current = map

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd', maxZoom: 19
      }).addTo(map)

      // Filter businesses with valid coords
      const valid = businesses.filter(b => b.latitude && b.longitude)

      if (valid.length > 0) {
        const bounds: [number,number][] = []
        valid.forEach(b => {
          const isPremium = b.plan === 'featured' || b.plan === 'premium'
          const color = isPremium ? '#C9A84C' : '#22c55e'
          const icon = L.divIcon({
            className: '',
            html: `<div style="width:${isPremium?'14':'10'}px;height:${isPremium?'14':'10'}px;background:${color};border-radius:50%;border:2px solid ${isPremium?'#E8C97A':'#16a34a'};box-shadow:0 0 ${isPremium?'8':'4'}px ${color}80;"></div>`,
            iconSize: [isPremium?14:10, isPremium?14:10],
            iconAnchor: [isPremium?7:5, isPremium?7:5]
          })
          const marker = L.marker([b.latitude!, b.longitude!], { icon })
          marker.bindPopup(`
            <div style="font-family:'DM Sans',sans-serif;min-width:160px;padding:4px">
              <div style="font-weight:700;font-size:13px;margin-bottom:4px;color:#111">${b.name}</div>
              ${b.category ? `<div style="font-size:11px;color:#666;margin-bottom:2px">🏷️ ${b.category}</div>` : ''}
              ${b.city ? `<div style="font-size:11px;color:#666;margin-bottom:2px">📍 ${b.city}</div>` : ''}
              ${b.avg_rating ? `<div style="font-size:11px;color:#f59e0b;margin-bottom:2px">⭐ ${Number(b.avg_rating).toFixed(1)}</div>` : ''}
              ${b.phone ? `<div style="font-size:11px;color:#444">${b.phone}</div>` : ''}
              ${isPremium ? `<div style="margin-top:6px"><span style="background:#C9A84C;color:#000;font-size:10px;font-weight:700;padding:2px 6px;border-radius:99px">★ FEATURED</span></div>` : ''}
            </div>
          `)
          marker.addTo(map)
          bounds.push([b.latitude!, b.longitude!])
        })
        if (bounds.length > 1) map.fitBounds(bounds, { padding: [40, 40] })
        else map.setView(bounds[0], 13)
      } else {
        map.setView(center, zoom)
      }
    }

    if ((window as any).L) {
      loadMap()
    } else {
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'
      script.onload = loadMap
      document.head.appendChild(script)
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
      }
    }
  }, [])

  const withCoords = businesses.filter(b => b.latitude && b.longitude).length
  const featured = businesses.filter(b => b.plan === 'featured' || b.plan === 'premium').length

  return (
    <div style={{ position:'relative', borderRadius:12, overflow:'hidden', border:'1px solid rgba(255,255,255,0.08)' }}>
      <div ref={mapRef} style={{ height, width:'100%' }} />
      {/* Legend */}
      <div style={{ position:'absolute', bottom:12, left:12, background:'rgba(10,11,15,0.85)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, padding:'8px 12px', zIndex:1000, fontFamily:"'DM Sans',sans-serif" }}>
        <div style={{ display:'flex', gap:12, alignItems:'center', flexWrap:'wrap' }}>
          <div style={{ display:'flex', alignItems:'center', gap:5 }}>
            <div style={{ width:10,height:10,background:'#C9A84C',borderRadius:'50%',boxShadow:'0 0 6px #C9A84C80' }}/>
            <span style={{ color:'#C9A84C', fontSize:11, fontWeight:600 }}>Featured</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:5 }}>
            <div style={{ width:8,height:8,background:'#22c55e',borderRadius:'50%' }}/>
            <span style={{ color:'#22c55e', fontSize:11 }}>Active</span>
          </div>
          <span style={{ color:'#475569', fontSize:11 }}>{withCoords} mapped · {featured} featured</span>
        </div>
      </div>
    </div>
  )
}
