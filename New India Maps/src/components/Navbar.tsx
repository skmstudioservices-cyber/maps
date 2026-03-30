'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { 
  MapPin, 
  Search, 
  Tag, 
  Info, 
  MessageSquare, 
  LogIn, 
  LayoutDashboard,
  Menu,
  X
} from 'lucide-react';

const GOLD = "#D4AF37";
const DARK_BG = "#0f172a";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const navLinks = [
    { name: 'Home', href: '/', icon: MapPin },
    { name: 'Listings', href: '/listings', icon: Search },
    { name: 'Pricing', href: '/pricing', icon: Tag },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: MessageSquare },
  ];

  const isActive = (href: string) => pathname === href;

  const linkStyle = (href: string) => ({
    color: isActive(href) ? GOLD : '#cbd5e1',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: isActive(href) ? '600' : '500',
    transition: 'all 0.2s ease',
    padding: '8px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    borderBottom: isActive(href) ? `2px solid ${GOLD}` : '2px solid transparent'
  });

  return (
    <>
      <style>{`
        @media (max-width: 1024px) {
          .desktop-links { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 1025px) {
          .mobile-menu-btn { display: none !important; }
          .mobile-links { display: none !important; }
        }
        .nav-link:hover {
          color: #ffffff !important;
          background: rgba(255,255,255,0.05);
          border-radius: 4px;
        }
      `}</style>

      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: DARK_BG,
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 5%',
        justifyContent: 'space-between',
        backdropFilter: 'blur(10px)'
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            backgroundColor: GOLD,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#000000',
            boxShadow: `0 0 15px ${GOLD}44`
          }}>
            <MapPin size={22} strokeWidth={2.5} />
          </div>
          <span style={{ 
            color: '#ffffff', 
            fontWeight: '800', 
            fontSize: '20px',
            letterSpacing: '-0.5px'
          }}>
            SKM Studio <span style={{ color: GOLD }}>Maps</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="desktop-links" style={{ display: 'flex', gap: '8px' }}>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="nav-link" style={linkStyle(link.href)}>
              <link.icon size={16} />
              {link.name}
            </Link>
          ))}
          
          <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)', margin: '0 12px' }} />

          {!loading && (
            user ? (
              <Link href="/dashboard" style={{
                background: `linear-gradient(135deg, ${GOLD}, #B8860B)`,
                color: '#000000',
                padding: '10px 22px',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '14px',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: `0 4px 15px ${GOLD}44`
              }}>
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
            ) : (
              <Link href="/login" style={{
                border: `1.5px solid ${GOLD}`,
                color: GOLD,
                padding: '10px 22px',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '14px',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}>
                <LogIn size={18} />
                Login
              </Link>
            )
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            padding: '10px',
            borderRadius: '8px',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Links Dropdown */}
      {isOpen && (
        <div className="mobile-links" style={{
          position: 'fixed',
          top: '72px',
          left: 0,
          width: '100%',
          backgroundColor: '#111827',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
          gap: '16px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          animation: 'slideDown 0.3s ease-out'
        }}>
          {navLinks.map(link => (
            <Link 
              key={link.href} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              style={{
                color: isActive(link.href) ? GOLD : '#ffffff',
                textDecoration: 'none',
                fontSize: '18px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <link.icon size={20} color={isActive(link.href) ? GOLD : '#ffffff'} />
              {link.name}
            </Link>
          ))}
          
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '8px 0' }} />

          {!loading && (
            user ? (
              <Link 
                href="/dashboard" 
                onClick={() => setIsOpen(false)}
                style={{
                  background: GOLD,
                  color: '#000000',
                  padding: '16px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  fontWeight: '700',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <LayoutDashboard size={20} />
                Go to Dashboard
              </Link>
            ) : (
              <Link 
                href="/login" 
                onClick={() => setIsOpen(false)}
                style={{
                  border: `2px solid ${GOLD}`,
                  color: GOLD,
                  padding: '16px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  fontWeight: '700',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <LogIn size={20} />
                User Login
              </Link>
            )
          )}
        </div>
      )}
    </>
  );
}
