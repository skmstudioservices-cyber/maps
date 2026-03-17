import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SKM Studio Maps vs JustDial vs Google Maps — Best Local Directory India 2026',
  description: 'Compare SKM Studio Maps with JustDial and Google Maps. Find out which local business directory gives better results for Indian cities — verified listings, DigiPIN, and real reviews.',
  keywords: ['justdial alternative india','google maps alternative india','best local directory india','local business search india 2026','skm studio maps vs justdial'],
}

export default function ComparePage() {
  const G = '#C9A84C'
  const rows = [
    { feature:'Free to browse',     skm:'✅ Yes',    jd:'✅ Yes',   gm:'✅ Yes'   },
    { feature:'India-specific data', skm:'✅ Yes',    jd:'✅ Yes',   gm:'⚠️ Partial'},
    { feature:'DigiPIN coordinates', skm:'✅ Yes',    jd:'❌ No',    gm:'❌ No'    },
    { feature:'Verified listings',   skm:'✅ Yes',    jd:'⚠️ Some',  gm:'⚠️ Some'  },
    { feature:'Open source reviews', skm:'✅ Yes',    jd:'✅ Yes',   gm:'✅ Yes'   },
    { feature:'No spam calls',       skm:'✅ Yes',    jd:'❌ Often', gm:'✅ Yes'   },
    { feature:'Free business listing',skm:'✅ Yes',   jd:'⚠️ Paid',  gm:'✅ Yes'   },
    { feature:'Business claim flow',  skm:'✅ Yes',   jd:'✅ Yes',   gm:'✅ Yes'   },
    { feature:'Interactive map',     skm:'✅ Yes',    jd:'⚠️ Basic', gm:'✅ Yes'   },
    { feature:'"Near me" search',    skm:'✅ Yes',    jd:'✅ Yes',   gm:'✅ Yes'   },
    { feature:'No paid ranking spam',skm:'✅ Yes',    jd:'❌ Paid ads first', gm:'⚠️ Paid ads'},
    { feature:'India-first focus',   skm:'✅ Yes',    jd:'✅ Yes',   gm:'❌ Global' },
  ]

  return (
    <div style={{minHeight:'100vh',background:'#0A0B0F',fontFamily:"'DM Sans',sans-serif",paddingTop:68}}>
      <div style={{maxWidth:900,margin:'0 auto',padding:'40px 20px'}}>

        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:20}}>
          <Link href="/" style={{color:'#475569',fontSize:13,textDecoration:'none'}}>Home</Link>
          <span style={{color:'#475569'}}>›</span>
          <span style={{color:G,fontSize:13,fontWeight:600}}>Compare directories</span>
        </div>

        <h1 style={{color:'#e8e9f0',fontSize:30,fontWeight:800,margin:'0 0 14px',fontFamily:"'Playfair Display',Georgia,serif"}}>
          SKM Studio Maps vs JustDial vs Google Maps
        </h1>
        <p style={{color:'#8a8da0',fontSize:15,margin:'0 0 36px',lineHeight:1.7,maxWidth:700}}>
          Looking for the best local business directory in India? Here's an honest comparison of SKM Studio Maps, JustDial, and Google Maps across the features that matter most to Indian users.
        </p>

        {/* Comparison table */}
        <div style={{background:'#141620',border:'1px solid rgba(255,255,255,0.07)',borderRadius:14,overflow:'hidden',marginBottom:40}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:14}}>
            <thead>
              <tr style={{background:'rgba(255,255,255,0.04)'}}>
                <th style={{padding:'14px 20px',textAlign:'left',color:'#8a8da0',fontWeight:600,fontSize:12,textTransform:'uppercase',letterSpacing:0.5}}>Feature</th>
                <th style={{padding:'14px 20px',textAlign:'center',color:G,fontWeight:700,fontSize:13}}>SKM Maps</th>
                <th style={{padding:'14px 20px',textAlign:'center',color:'#8a8da0',fontWeight:600,fontSize:13}}>JustDial</th>
                <th style={{padding:'14px 20px',textAlign:'center',color:'#8a8da0',fontWeight:600,fontSize:13}}>Google Maps</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r,i)=>(
                <tr key={r.feature} style={{borderTop:'1px solid rgba(255,255,255,0.05)',background:i%2===0?'transparent':'rgba(255,255,255,0.01)'}}>
                  <td style={{padding:'12px 20px',color:'#e8e9f0',fontWeight:500}}>{r.feature}</td>
                  <td style={{padding:'12px 20px',textAlign:'center',color:r.skm.startsWith('✅')?'#22c55e':r.skm.startsWith('❌')?'#ef4444':'#f59e0b',fontWeight:600,fontSize:13}}>{r.skm}</td>
                  <td style={{padding:'12px 20px',textAlign:'center',color:r.jd.startsWith('✅')?'#22c55e':r.jd.startsWith('❌')?'#ef4444':'#f59e0b',fontSize:13}}>{r.jd}</td>
                  <td style={{padding:'12px 20px',textAlign:'center',color:r.gm.startsWith('✅')?'#22c55e':r.gm.startsWith('❌')?'#ef4444':'#f59e0b',fontSize:13}}>{r.gm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Editorial content */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:16,marginBottom:40}}>
          {[
            {title:'Why not JustDial?',color:'#ef4444',body:'JustDial is India\'s largest directory but has a well-known problem: paid listings appear first regardless of quality, and businesses complain of unsolicited sales calls after listing. Their "verified" tag requires payment.'},
            {title:'Why not Google Maps?',color:'#4285F4',body:'Google Maps is excellent for navigation but not built for discovery-first browsing. It\'s a global product — SKM Studio Maps is built specifically for Indian cities, with DigiPIN, local categories, and India-first UX.'},
            {title:'Why SKM Studio Maps?',color:G,body:'No paid ranking manipulation. Every listing is treated equally — featured businesses pay only for prominence, not for appearing at all. DigiPIN integration means every business is precisely located on India Post\'s new geocode grid.'},
          ].map(c=>(
            <div key={c.title} style={{background:'#141620',border:`1px solid ${c.color}20`,borderRadius:12,padding:'20px'}}>
              <h3 style={{color:c.color,fontSize:16,fontWeight:700,margin:'0 0 10px'}}>{c.title}</h3>
              <p style={{color:'#8a8da0',fontSize:13,lineHeight:1.7,margin:0}}>{c.body}</p>
            </div>
          ))}
        </div>

        <div style={{textAlign:'center'}}>
          <Link href="/listings" style={{background:`linear-gradient(135deg,${G},#E8C97A)`,color:'#0A0B0F',padding:'14px 32px',borderRadius:10,textDecoration:'none',fontSize:15,fontWeight:700,display:'inline-block'}}>
            Browse SKM Maps Directory →
          </Link>
        </div>
      </div>
    </div>
  )
}
