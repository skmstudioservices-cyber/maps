'use client'

export default function BusinessMap({ businesses }: { businesses: any[] }) {
  return (
    <div style={{
      background: '#1e293b',
      border: '1px solid #334155',
      borderRadius: 12,
      height: 300,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 12,
      color: '#64748b'
    }}>
      <div style={{ fontSize: 40 }}>🗺️</div>
      <div style={{ fontSize: 14 }}>Interactive map coming soon</div>
      <div style={{ fontSize: 12, color: '#475569' }}>{businesses.length} businesses in this area</div>
    </div>
  )
}
