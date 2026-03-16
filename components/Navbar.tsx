'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E8C97A";
const DARK_BG = "#0A0B0F";
const BORDER = "rgba(255,255,255,0.07)";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;700&display=swap');
        
        .nav-container {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          background: rgba(10,11,15,0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid ${BORDER};
          font-family: 'DM Sans', sans-serif;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .logo-icon {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT});
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: #0A0B0F;
        }

        .logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          color: #e8e9f0;
          letter-spacing: -0.3px;
        }

        .logo-text span { color: ${GOLD}; }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
          list-style: none;
        }

        .nav-links a {
          color: #8a8da0;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.2s;
        }

        .nav-links a:hover { color: #e8e9f0; }

        .nav-cta {
          background: linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT});
          color: #0A0B0F !important;
          padding: 9px 22px;
          border-radius: 8px;
          font-weight: 600 !important;
          font-size: 14px;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s;
        }

        .nav-cta:hover { opacity: 0.9; transform: translateY(-1px); }

        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: #e8e9f0;
          font-size: 24px;
          cursor: pointer;
        }

        @media (max-width: 900px) {
          .nav-links { display: none; }
          .mobile-toggle { display: block; }
          .nav-container { padding: 0 20px; }
        }

        .mobile-menu {
          position: fixed;
          top: 68px; left: 0; right: 0;
          background: #141620;
          border-bottom: 1px solid ${BORDER};
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          z-index: 999;
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      <nav className="nav-container">
        <Link href="/" className="logo">
          <div className="logo-icon">📍</div>
          <span className="logo-text">SKM Studio <span>Maps</span></span>
        </Link>

        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/listings">Listings</Link></li>
          <li><Link href="/pricing">Pricing</Link></li>
          <li><Link href="/roadmap">Roadmap</Link></li>
          <li><Link href="/login">Login</Link></li>
          <li><Link href="/add-business" className="nav-cta">List Your Business</Link></li>
        </ul>

        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '✕' : '☰'}
        </button>
      </nav>

      {isOpen && (
        <div className="mobile-menu">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/listings" onClick={() => setIsOpen(false)}>Listings</Link>
          <Link href="/pricing" onClick={() => setIsOpen(false)}>Pricing</Link>
          <Link href="/roadmap" onClick={() => setIsOpen(false)}>Roadmap</Link>
          <Link href="/login" onClick={() => setIsOpen(false)}>Login</Link>
          <Link href="/add-business" className="nav-cta" onClick={() => setIsOpen(false)}>List Your Business</Link>
        </div>
      )}
    </>
  );
}
