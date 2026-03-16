'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/listings', label: 'Listings' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/roadmap', label: 'Roadmap' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const isActive = (href: string) => pathname === href

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        height: 68,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        background: scrolled ? 'rgba(10,11,15,0.97)' : 'rgba(10,11,15,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(201,168,76,0.15)',
        fontFamily: "'DM Sans', sans-serif",
        transition: 'all 0.3s ease',
        boxSizing: 'border-box',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 36, height: 36,
            background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18,
          }}>📍</div>
          <span style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 22, fontWeight: 700,
            color: '#e8e9f0', letterSpacing: '-0.3px'
          }}>
            SKM Studio <span style={{ color: '#C9A84C' }}>Maps</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul id="desktop-nav" style={{
          display: 'flex', alignItems: 'center',
          gap: 28, listStyle: 'none', margin: 0, padding: 0
        }}>
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} style={{
                color: isActive(href) ? '#C9A84C' : '#8a8da0',
                textDecoration: 'none',
                fontSize: 14, fontWeight: 500,
                transition: 'color 0.2s',
                borderBottom: isActive(href) ? '2px solid #C9A84C' : '2px solid transparent',
                paddingBottom: 2,
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#e8e9f0')}
                onMouseLeave={e => (e.currentTarget.style.color = isActive(href) ? '#C9A84C' : '#8a8da0')}
              >
                {label}
              </Link>
            </li>
          ))}

          {/* Add Business CTA */}
          <li>
            <Link href="/add-business" style={{
              background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
              color: '#0A0B0F',
              padding: '8px 18px',
              borderRadius: 8,
              fontSize: 13, fontWeight: 700,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'opacity 0.2s, transform 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.9'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = 'none' }}
            >
              + List Business
            </Link>
          </li>

          {/* Auth */}
          <li>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Link href="/dashboard" style={{
                  color: '#C9A84C', textDecoration: 'none',
                  fontSize: 13, fontWeight: 500,
                }}>
                  👤 {user.email?.split('@')[0]}
                </Link>
                <button onClick={handleSignOut} style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#8a8da0',
                  padding: '6px 12px', borderRadius: 6,
                  fontSize: 12, cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/login" style={{
                background: 'transparent',
                border: '1px solid rgba(201,168,76,0.4)',
                color: '#C9A84C',
                padding: '7px 16px', borderRadius: 8,
                fontSize: 13, fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.1)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
              >
                Login
              </Link>
            )}
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button id="mobile-btn" onClick={() => setOpen(!open)} style={{
          display: 'none',
          background: 'none',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 8, padding: '6px 12px',
          color: '#e8e9f0', fontSize: 22,
          cursor: 'pointer', lineHeight: 1,
        }}>
          {open ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div style={{
          position: 'fixed',
          top: 68, left: 0, right: 0,
          background: '#141620',
          borderBottom: '1px solid rgba(201,168,76,0.2)',
          padding: '16px 24px 24px',
          zIndex: 999,
          display: 'flex', flexDirection: 'column', gap: 0,
        }}>
          {[...navLinks, { href: '/add-business', label: '+ List Business' }].map(({ href, label }) => (
            <Link key={href} href={href} style={{
              color: isActive(href) ? '#C9A84C' : '#8a8da0',
              textDecoration: 'none',
              fontSize: 16, fontWeight: 500,
              padding: '14px 0',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              display: 'block',
            }}>
              {label}
            </Link>
          ))}
          {user ? (
            <>
              <Link href="/dashboard" style={{ color: '#C9A84C', textDecoration: 'none', fontSize: 16, padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'block' }}>
                👤 Dashboard
              </Link>
              <button onClick={handleSignOut} style={{ background: 'none', border: 'none', color: '#8a8da0', fontSize: 16, padding: '14px 0', textAlign: 'left', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/login" style={{
              background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
              color: '#0A0B0F', padding: '13px 16px',
              borderRadius: 8, fontSize: 15, fontWeight: 700,
              textDecoration: 'none', textAlign: 'center',
              display: 'block', marginTop: 12,
            }}>
              Login / Sign Up
            </Link>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          #desktop-nav { display: none !important; }
          #mobile-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
