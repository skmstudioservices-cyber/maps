'use client'
import { useEffect, useRef, useState, useCallback } from 'react'

export type MapBusiness = {
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
  businesses: MapBusiness[]
  provider?: 'leaflet' | 'osm' | 'google'
  googleApiKey?: string
  height?: string
  showControls?: boolean
}

// Haversine distance in km
function haversine(lat1:number,lon1:number,lat2:number,lon2:number): number {
  const R = 6371
  const dLat = (lat2-lat1)*Math.PI/180
  const dLon = (lon2-lon1)*Math.PI/180
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
}

function formatDist(km:number): string {
  return km < 1 ? `${Math.round(km*1000)}m` : `${km.toFixed(1)}km`
}

export default function BusinessMap({ businesses, provider = 'leaflet', googleApiKey = '', height = '450px', showControls = true }: Props) {
  const mapRef      = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)
  const markersRef  = useRef<any[]>([])
  const userMarker  = useRef<any>(null)
  const [userLoc, setUserLoc]     = useState<[number,number] | null>(null)
  const [locLoading, setLocLoading] = useState(false)
  const [locError, setLocError]   = useState('')
  const [mounted, setMounted]     = useState(false)

  const G = '#C9A84C'
  const valid = businesses.filter(b => b.latitude && b.longitude)
  const featured = valid.filter(b => ['featured','premium'].includes(b.plan||'')).length

  // Build popup HTML
  const buildPopup = useCallback((b: MapBusiness, dist?: number) => `
    <div style="font-family:'DM Sans',system-ui,sans-serif;min-width:180px;padding:4px 2px">
      <div style="font-weight:700;font-size:14px;color:#111;margin-bottom:6px;line-height:1.3">${b.name}</div>
      ${b.category ? `<div style="font-size:12px;color:#555;margin-bottom:2px">🏷️ ${b.category}</div>` : ''}
      ${b.city     ? `<div style="font-size:12px;color:#555;margin-bottom:2px">🌆 ${b.city}</div>` : ''}
      ${b.address  ? `<div style="font-size:11px;color:#666;margin-bottom:4px">📍 ${b.address}</div>` : ''}
      ${b.avg_rating ? `<div style="font-size:12px;color:#f59e0b;margin-bottom:4px">⭐ ${Number(b.avg_rating).toFixed(1)} rating</div>` : ''}
      ${dist !== undefined ? `<div style="font-size:12px;color:#2563eb;font-weight:600;margin-bottom:6px">📏 ${formatDist(dist)} from you</div>` : ''}
      ${b.phone    ? `<div style="font-size:12px;color:#444;margin-bottom:8px">📞 ${b.phone}</div>` : ''}
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:6px">
        ${b.latitude && b.longitude ? `
          <a href="https://www.google.com/maps/dir/?api=1&destination=${b.latitude},${b.longitude}" target="_blank"
            style="background:#4285F4;color:#fff;padding:5px 10px;border-radius:6px;text-decoration:none;font-size:11px;font-weight:600;display:inline-flex;align-items:center;gap:4px">
            🗺️ Directions
          </a>
          <a href="https://maps.apple.com/?daddr=${b.latitude},${b.longitude}&dirflg=d" target="_blank"
            style="background:#555;color:#fff;padding:5px 10px;border-radius:6px;text-decoration:none;font-size:11px;font-weight:600">
            🍎 Apple Maps
          </a>
        ` : ''}
        ${b.phone ? `<a href="tel:${b.phone}" style="background:#22c55e;color:#fff;padding:5px 10px;border-radius:6px;text-decoration:none;font-size:11px;font-weight:600">📞 Call</a>` : ''}
      </div>
      ${['featured','premium'].includes(b.plan||'') ? `<div style="margin-top:8px"><span style="background:#C9A84C;color:#000;font-size:10px;font-weight:700;padding:2px 8px;border-radius:99px">★ FEATURED</span></div>` : ''}
    </div>
  `, [])

  // Update all marker popups with distance when user location changes
  const updatePopupsWithDistance = useCallback((loc: [number,number]) => {
    const L = (window as any).L
    if (!L) return
    markersRef.current.forEach(({ marker, biz }) => {
      if (biz.latitude && biz.longitude) {
        const dist = haversine(loc[0], loc[1], biz.latitude, biz.longitude)
        marker.setPopupContent(buildPopup(biz, dist))
      }
    })
  }, [buildPopup])

  // Get user location
  const getUserLocation = useCallback(() => {
    if (!navigator.geolocation) { setLocError('Geolocation not supported'); return }
    setLocLoading(true); setLocError('')
    navigator.geolocation.getCurrentPosition(
      pos => {
        const loc: [number,number] = [pos.coords.latitude, pos.coords.longitude]
        setUserLoc(loc); setLocLoading(false)
        const L = (window as any).L
        const map = mapInstance.current
        if (!L || !map) return
        // Remove old user marker
        if (userMarker.current) { userMarker.current.remove(); userMarker.current = null }
        // Add pulsing user location dot
        const userIcon = L.divIcon({
          className: '',
          html: `<div style="width:16px;height:16px;background:#3b82f6;border-radius:50%;border:3px solid #fff;box-shadow:0 0 0 4px rgba(59,130,246,0.3),0 0 12px rgba(59,130,246,0.5);animation:pulse 2s infinite"></div>`,
          iconSize:[16,16], iconAnchor:[8,8]
        })
        userMarker.current = L.marker(loc, { icon: userIcon })
          .bindPopup('<div style="font-family:sans-serif;font-size:13px;font-weight:600;color:#3b82f6">📍 Your Location</div>')
          .addTo(map)
        map.setView(loc, 12)
        updatePopupsWithDistance(loc)
      },
      err => { setLocLoading(false); setLocError('Location denied') },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }, [updatePopupsWithDistance])

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted || !mapRef.current || mapInstance.current) return

    const initLeaflet = () => {
      const L = (window as any).L
      if (!L) return

      const useGoogle = provider === 'google' && googleApiKey
      const map = L.map(mapRef.current!, { zoomControl: true, scrollWheelZoom: true })
      mapInstance.current = map

      if (useGoogle) {
        // Google Maps via Leaflet.GridLayer
        const googleLayer = L.tileLayer(`https://maps.googleapis.com/maps/api/staticmap?center={lat},{lon}&zoom={z}&size=256x256&key=${googleApiKey}`, {
          attribution: '© Google Maps', maxZoom: 20
        })
        googleLayer.addTo(map)
      } else {
        // CartoDB Dark (default) or OSM light
        const tileUrl = provider === 'osm'
          ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        const attribution = provider === 'osm'
          ? '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          : '© <a href="https://www.openstreetmap.org/copyright">OSM</a> © <a href="https://carto.com/attributions">CARTO</a>'
        L.tileLayer(tileUrl, { attribution, subdomains: 'abcd', maxZoom: 19 }).addTo(map)
      }

      const bounds: [number,number][] = []
      markersRef.current = []
      valid.forEach(b => {
        const isPremium = ['featured','premium'].includes(b.plan||'')
        const color = isPremium ? '#C9A84C' : '#22c55e'
        const size  = isPremium ? 14 : 10
        const icon = L.divIcon({
          className: '',
          html: `<div style="width:${size}px;height:${size}px;background:${color};border-radius:50%;border:2px solid ${isPremium?'#E8C97A':'#16a34a'};box-shadow:0 0 ${isPremium?10:5}px ${color}80;transition:transform 0.15s" onmouseover="this.style.transform='scale(1.5)'" onmouseout="this.style.transform='scale(1)'"></div>`,
          iconSize:[size,size], iconAnchor:[size/2,size/2]
        })
        const marker = L.marker([b.latitude!, b.longitude!], { icon })
          .bindPopup(buildPopup(b), { maxWidth: 240 })
          .addTo(map)
        markersRef.current.push({ marker, biz: b })
        bounds.push([b.latitude!, b.longitude!])
      })

      if (bounds.length > 1) map.fitBounds(bounds, { padding:[40,40] })
      else if (bounds.length === 1) map.setView(bounds[0], 13)
      else map.setView([22.5, 80.0], 5)

      // Re-apply distance if location already set
      if (userLoc) updatePopupsWithDistance(userLoc)
    }

    // Load Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link')
      link.id = 'leaflet-css'
      link.rel = 'stylesheet'
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css'
      document.head.appendChild(link)
    }

    if ((window as any).L) { initLeaflet() }
    else {
      const s = document.createElement('script')
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'
      s.onload = initLeaflet
      document.head.appendChild(s)
    }

    return () => {
      if (mapInstance.current) { mapInstance.current.remove(); mapInstance.current = null }
      markersRef.current = []
    }
  }, [mounted, provider])

  if (!mounted) return (
    <div style={{height,background:'#0D0E12',borderRadius:12,border:'1px solid rgba(255,255,255,0.08)',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{textAlign:'center'}}>
        <div style={{width:32,height:32,border:'3px solid rgba(201,168,76,0.3)',borderTopColor:'#C9A84C',borderRadius:'50%',animation:'spin 0.8s linear infinite',margin:'0 auto 10px'}}/>
        <p style={{color:'#C9A84C',fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>Loading map...</p>
      </div>
    </div>
  )

  return (
    <div style={{position:'relative',borderRadius:12,overflow:'hidden',border:'1px solid rgba(255,255,255,0.08)'}}>
      <style>{`
        @keyframes pulse{0%,100%{box-shadow:0 0 0 4px rgba(59,130,246,0.3)}50%{box-shadow:0 0 0 8px rgba(59,130,246,0.1)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .leaflet-popup-content-wrapper{border-radius:10px!important;box-shadow:0 4px 24px rgba(0,0,0,0.35)!important}
        .leaflet-popup-content{margin:12px 14px!important}
      `}</style>

      <div ref={mapRef} style={{height, width:'100%'}} />

      {showControls && (
        <>
          {/* My Location button */}
          <div style={{position:'absolute',top:12,left:12,zIndex:1000,display:'flex',flexDirection:'column',gap:6}}>
            <button onClick={getUserLocation} disabled={locLoading}
              style={{background: userLoc ? 'rgba(59,130,246,0.9)' : 'rgba(13,14,18,0.88)',backdropFilter:'blur(8px)',border:`1px solid ${userLoc?'rgba(59,130,246,0.5)':'rgba(255,255,255,0.12)'}`,color: userLoc ? '#fff' : '#e8e9f0',padding:'7px 13px',borderRadius:8,cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:600,display:'flex',alignItems:'center',gap:6,transition:'all 0.2s'}}>
              {locLoading
                ? <><span style={{width:12,height:12,border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'#fff',borderRadius:'50%',animation:'spin 0.8s linear infinite',display:'inline-block'}}/>Finding...</>
                : userLoc ? <>📍 Location found</> : <>📍 My Location</>
              }
            </button>
            {locError && <div style={{background:'rgba(239,68,68,0.9)',color:'#fff',padding:'5px 10px',borderRadius:7,fontSize:11,fontWeight:500}}>{locError}</div>}
            {userLoc && <div style={{background:'rgba(34,197,94,0.15)',border:'1px solid rgba(34,197,94,0.3)',color:'#22c55e',padding:'5px 10px',borderRadius:7,fontSize:11,fontWeight:500}}>Tap any pin for distance</div>}
          </div>

          {/* Legend */}
          <div style={{position:'absolute',bottom:12,left:12,background:'rgba(10,11,15,0.85)',backdropFilter:'blur(8px)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,padding:'8px 12px',zIndex:1000,fontFamily:"'DM Sans',sans-serif"}}>
            <div style={{display:'flex',gap:12,alignItems:'center',flexWrap:'wrap'}}>
              <div style={{display:'flex',alignItems:'center',gap:5}}>
                <div style={{width:10,height:10,background:G,borderRadius:'50%',boxShadow:`0 0 6px ${G}80`}}/>
                <span style={{color:G,fontSize:11,fontWeight:600}}>Featured ({featured})</span>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:5}}>
                <div style={{width:8,height:8,background:'#22c55e',borderRadius:'50%'}}/>
                <span style={{color:'#22c55e',fontSize:11}}>Active ({valid.length - featured})</span>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:5}}>
                <div style={{width:10,height:10,background:'#3b82f6',borderRadius:'50%',boxShadow:'0 0 6px rgba(59,130,246,0.5)'}}/>
                <span style={{color:'#60a5fa',fontSize:11}}>You</span>
              </div>
            </div>
          </div>

          {/* Provider badge */}
          <div style={{position:'absolute',top:12,right:12,background:'rgba(10,11,15,0.85)',backdropFilter:'blur(8px)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:7,padding:'5px 10px',zIndex:1000,fontFamily:"'DM Sans',sans-serif"}}>
            <span style={{color:'#8a8da0',fontSize:10,fontWeight:600,textTransform:'uppercase',letterSpacing:0.5}}>
              {provider === 'google' ? '🗺️ Google Maps' : provider === 'osm' ? '🗺️ OpenStreetMap' : '🗺️ Leaflet + CARTO'}
            </span>
          </div>
        </>
      )}
    </div>
  )
}
