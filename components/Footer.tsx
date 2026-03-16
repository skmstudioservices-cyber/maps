'use client';

import React from 'react';
import Link from 'next/link';

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E8C97A";
const BORDER = "rgba(255,255,255,0.07)";

export default function Footer() {
  return (
    <>
      <style>{`
        footer {
          background: #0A0B0F;
          border-top: 1px solid ${BORDER};
          padding: 80px 40px 40px;
          font-family: 'DM Sans', sans-serif;
          color: #e8e9f0;
          position: relative;
          z-index: 1;
        }

        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 60px;
          margin-bottom: 60px;
        }

        .footer-brand p {
          color: #8a8da0;
          font-size: 14px;
          line-height: 1.6;
          margin-top: 20px;
          max-width: 320px;
        }

        .footer-col h4 {
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 24px;
          color: #ffffff;
        }

        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-col a {
          color: #8a8da0;
          text-decoration: none;
          font-size: 14px;
          transition: color 0.2s;
        }

        .footer-col a:hover {
          color: ${GOLD};
        }

        .footer-bottom {
          border-top: 1px solid ${BORDER};
          padding-top: 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .footer-bottom p {
          font-size: 13px;
          color: #8a8da0;
        }

        .footer-bottom span {
          color: #ff6b6b;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .footer-logo-icon {
          width: 32px; height: 32px;
          background: linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT});
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          color: #0A0B0F;
        }

        .footer-logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
        }

        .footer-logo-text span { color: ${GOLD}; }

        @media (max-width: 900px) {
          .footer-top { grid-template-columns: 1fr 1fr; gap: 40px; }
          footer { padding-left: 20px; padding-right: 20px; }
        }

        @media (max-width: 600px) {
          .footer-top { grid-template-columns: 1fr; }
          .footer-bottom { flex-direction: column; text-align: center; }
        }
      `}</style>

      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <Link href="/" className="footer-logo">
                <div className="footer-logo-icon">📍</div>
                <span className="footer-logo-text">SKM Studio <span>Maps</span></span>
              </Link>
              <p>India&apos;s most trusted local business directory. Find verified businesses, read reviews, and connect in one click.</p>
            </div>
            
            <div className="footer-col">
              <h4>Explore</h4>
              <Link href="/listings">All Listings</Link>
              <Link href="/pricing">Pricing Plans</Link>
              <Link href="/roadmap">Product Roadmap</Link>
            </div>

            <div className="footer-col">
              <h4>Business</h4>
              <Link href="/add-business">List Your Business</Link>
              <Link href="/login">Dashboard Login</Link>
              <Link href="/pricing">Advertise with Us</Link>
            </div>

            <div className="footer-col">
              <h4>Support</h4>
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact Support</Link>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2025 SKM Studio Maps. All rights reserved. Made with <span>♥</span> in India.</p>
            <p style={{ color: '#8a8da0' }}>🇮🇳 Serving 200+ cities across India</p>
          </div>
        </div>
      </footer>
    </>
  );
}
