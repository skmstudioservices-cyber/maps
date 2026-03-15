'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const GOLD = "#D4AF37";
const DARK_BG = "#0f172a";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Listings', href: '/listings' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
  ];

  const linkStyle = (href: string) => ({
    color: pathname === href ? GOLD : '#ffffff',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'color 0.2s',
    padding: '8px 12px',
    borderBottom: pathname === href ? `2px solid ${GOLD}` : 'none'
  });

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .desktop-links { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
          .mobile-links { display: none !important; }
        }
      `}</style>

      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: DARK_BG,
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            backgroundColor: GOLD,
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px'
          }}>📍</div>
          <span style={{ 
            color: '#ffffff', 
            fontWeight: '800', 
            fontSize: '18px',
            letterSpacing: '-0.5px'
          }}>
            New India <span style={{ color: GOLD }}>Maps</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="desktop-links" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} style={linkStyle(link.href)}>
              {link.name}
            </Link>
          ))}
          <Link href="/login" style={{
            backgroundColor: GOLD,
            color: '#000000',
            padding: '8px 20px',
            borderRadius: '8px',
            fontWeight: '700',
            fontSize: '14px',
            textDecoration: 'none',
            marginLeft: '12px'
          }}>
            Login
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: '#ffffff',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '8px'
          }}
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Links Dropdown */}
      {isOpen && (
        <div className="mobile-links" style={{
          position: 'fixed',
          top: '64px',
          left: 0,
          width: '100%',
          backgroundColor: '#1e293b',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          padding: '16px',
          gap: '12px',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          {navLinks.map(link => (
            <Link 
              key={link.href} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              style={{
                color: pathname === link.href ? GOLD : '#ffffff',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600',
                padding: '12px 0'
              }}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/login" 
            onClick={() => setIsOpen(false)}
            style={{
              backgroundColor: GOLD,
              color: '#000000',
              padding: '12px',
              borderRadius: '8px',
              textAlign: 'center',
              fontWeight: '700',
              textDecoration: 'none',
              marginTop: '8px'
            }}
          >
            Login
          </Link>
        </div>
      )}
    </>
  );
}
