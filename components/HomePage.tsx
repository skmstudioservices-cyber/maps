'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [search, setSearch] = useState('');

  return (
    <>
      <style>{`
        :root {
          --ink: #0a0b0f;
          --deep: #0f1117;
          --panel: #141620;
          --card: #1a1d2e;
          --border: rgba(255,255,255,0.07);
          --gold: #c9a84c;
          --gold-light: #e8c97a;
          --gold-glow: rgba(201,168,76,0.15);
          --text: #e8e9f0;
          --muted: #8a8da0;
          --accent: #4f8ef7;
          --green: #2ecc8a;
          --red: #ff6b6b;
        }

        .hero {
          position: relative;
          min-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 40px 60px;
          overflow: hidden;
          background: var(--ink);
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 20% 80%, rgba(79,142,247,0.06) 0%, transparent 50%),
            radial-gradient(ellipse 50% 50% at 80% 60%, rgba(46,204,138,0.04) 0%, transparent 50%);
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%);
        }

        .hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 900px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--gold-glow);
          border: 1px solid rgba(201,168,76,0.3);
          border-radius: 100px;
          padding: 6px 16px;
          font-size: 13px;
          color: var(--gold-light);
          font-weight: 500;
          margin-bottom: 32px;
        }

        .badge-dot {
          width: 6px; height: 6px;
          background: var(--gold);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        .hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(42px, 7vw, 82px);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -2px;
          margin-bottom: 24px;
          color: var(--text);
        }

        .hero h1 .highlight {
          background: linear-gradient(135deg, var(--gold), var(--gold-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-size: 18px;
          color: var(--muted);
          line-height: 1.7;
          max-width: 560px;
          margin: 0 auto 48px;
          font-weight: 400;
        }

        .search-container {
          margin-bottom: 20px;
        }

        .search-bar {
          display: flex;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          max-width: 720px;
          margin: 0 auto;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }

        .search-field {
          display: flex;
          align-items: center;
          flex: 1;
          padding: 0 20px;
          gap: 12px;
          border-right: 1px solid var(--border);
        }

        .search-field input {
          background: none;
          border: none;
          outline: none;
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          width: 100%;
          padding: 18px 0;
        }

        .search-btn {
          background: linear-gradient(135deg, var(--gold), var(--gold-light));
          border: none;
          padding: 0 32px;
          color: var(--ink);
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
        }

        .stats-row {
          display: flex;
          justify-content: center;
          gap: 48px;
          margin-top: 72px;
          padding-top: 48px;
          border-top: 1px solid var(--border);
        }

        .stat-number {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          font-weight: 700;
          color: var(--gold-light);
          line-height: 1;
          margin-bottom: 6px;
        }

        .stat-label {
          font-size: 13px;
          color: var(--muted);
        }

        section {
          padding: 80px 40px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header { margin-bottom: 48px; }
        .section-label { color: var(--gold); text-transform: uppercase; font-size: 12px; letter-spacing: 2px; }
        .section-title { font-family: 'Playfair Display', serif; font-size: 36px; margin-top: 10px; }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 16px;
        }

        .category-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          text-decoration: none;
          transition: all 0.3s;
          text-align: center;
        }

        .category-card:hover { transform: translateY(-4px); border-color: var(--gold); }
        .cat-icon { font-size: 32px; margin-bottom: 12px; display: block; }
        .cat-name { color: var(--text); font-weight: 600; }

        @media (max-width: 768px) {
          .stats-row { flex-direction: column; gap: 32px; }
          .hero h1 { font-size: 42px; }
          .search-bar { flex-direction: column; }
          .search-field { border-right: none; border-bottom: 1px solid var(--border); }
          .search-btn { padding: 18px; justify-content: center; }
        }
      `}</style>

      <div className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-badge">
            <div className="badge-dot" />
            <span>Pre-Launch — Exclusive Access</span>
          </div>
          <h1>Find Verified <span className="highlight">Businesses</span> Across India</h1>
          <p className="hero-sub">
            The premium directory for Delhi, NCR, Gorakhpur and beyond. Discover top-rated services with precise mapping and direct connectivity.
          </p>

          <div className="search-container">
            <div className="search-bar">
              <div className="search-field">
                <span>🔍</span>
                <input 
                  type="text" 
                  placeholder="What are you looking for?" 
                  value={search} 
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="search-field" style={{ flex: '0 0 160px' }}>
                <span>📍</span>
                <input type="text" placeholder="Delhi / NCR" readOnly />
              </div>
              <button className="search-btn">Search Now</button>
            </div>
          </div>

          <div className="stats-row">
            <div className="stat">
              <div className="stat-number">1,200+</div>
              <div className="stat-label">Verified Listings</div>
            </div>
            <div className="stat">
              <div className="stat-number">200+</div>
              <div className="stat-label">Cities Covered</div>
            </div>
            <div className="stat">
              <div className="stat-number">12</div>
              <div className="stat-label">Main Categories</div>
            </div>
            <div className="stat">
              <div className="stat-number">98%</div>
              <div className="stat-label">Satisfied Users</div>
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="section-header">
          <span className="section-label">Browse by Category</span>
          <h2 className="section-title">Explore Popular Services</h2>
        </div>
        <div className="categories-grid">
          {[
            { icon: '🍽️', name: 'Restaurants' },
            { icon: '🏨', name: 'Hotels' },
            { icon: '🏥', name: 'Hospitals' },
            { icon: '💇', name: 'Beauty & Spa' },
            { icon: '🚗', name: 'Auto Services' },
            { icon: '🎓', name: 'Education' }
          ].map(cat => (
            <Link key={cat.name} href={`/listings?cat=${cat.name}`} className="category-card">
              <span className="cat-icon">{cat.icon}</span>
              <span className="cat-name">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--panel)', maxWidth: '100%', margin: '0' }}>
         <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="section-header">
              <span className="section-label">Featured Listings</span>
              <h2 className="section-title">Verified Destinations</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
               {[1, 2, 3].map(i => (
                 <div key={i} style={{ background: 'var(--card)', borderRadius: 20, overflow: 'hidden', border: '1px solid var(--border)' }}>
                    <div style={{ height: 160, background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>🏢</div>
                    <div style={{ padding: 20 }}>
                       <span style={{ color: 'var(--gold)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>Verified Business</span>
                       <h3 style={{ margin: '8px 0', fontSize: 18 }}>Premium Business {i}</h3>
                       <p style={{ color: 'var(--muted)', fontSize: 14 }}>Award-winning service in New Delhi. Rated 4.9/5 by global community.</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </>
  );
}
