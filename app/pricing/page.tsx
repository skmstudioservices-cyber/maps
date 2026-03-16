'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <style>{`
        :root {
          --ink: #0a0b0f;
          --gold: #c9a84c;
          --gold-light: #e8c97a;
          --gold-glow: rgba(201,168,76,0.12);
          --card: #1a1d2e;
          --border: rgba(255,255,255,0.07);
          --text: #e8e9f0;
          --muted: #8a8da0;
          --panel: #141620;
          --green: #2ecc8a;
          --accent: #4f8ef7;
        }

        .pricing-hero {
          padding: 120px 40px 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
          background: var(--ink);
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,168,76,0.07), transparent 60%);
          pointer-events: none;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--gold-glow);
          border: 1px solid rgba(201,168,76,0.25);
          border-radius: 100px;
          padding: 6px 16px;
          font-size: 13px;
          color: var(--gold-light);
          font-weight: 500;
          margin-bottom: 24px;
        }

        .pricing-hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 900;
          line-height: 1.1;
          color: var(--text);
          margin-bottom: 18px;
        }

        .pricing-hero h1 span { color: var(--gold); }

        .billing-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-bottom: 56px;
        }

        .toggle-track {
          width: 48px;
          height: 26px;
          background: var(--gold);
          border-radius: 100px;
          cursor: pointer;
          position: relative;
        }

        .toggle-thumb {
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 3px;
          left: 3px;
          transition: transform 0.3s;
        }

        .toggle-track.annual .toggle-thumb { transform: translateX(22px); }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 20px 80px;
        }

        .plan-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 22px;
          padding: 36px 32px;
          position: relative;
          transition: transform 0.3s;
        }

        .plan-card:hover { transform: translateY(-4px); }
        .plan-card.featured { border-color: rgba(201,168,76,0.4); background: linear-gradient(160deg, #1e2138, #1a1d2e); }

        .plan-price { font-family: 'Playfair Display', serif; font-size: 52px; font-weight: 900; }
        .currency { font-size: 22px; color: var(--gold); }
        .period { font-size: 14px; color: var(--muted); }

        .plan-btn {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          margin-top: 24px;
        }

        .plan-btn.primary { background: linear-gradient(135deg, var(--gold), var(--gold-light)); color: #000; }
        .plan-btn.secondary { background: var(--panel); color: var(--text); border: 1px solid var(--border); }

        .faq-wrap { max-width: 720px; margin: 0 auto 100px; padding: 0 20px; }
        .faq-item { background: var(--card); border: 1px solid var(--border); border-radius: 14px; margin-bottom: 10px; overflow: hidden; }
        .faq-q { padding: 18px 22px; cursor: pointer; display: flex; justify-content: space-between; font-weight: 500; }
        .faq-a { padding: 0 22px 18px; color: var(--muted); font-size: 14px; line-height: 1.6; }
      `}</style>

      <div className="pricing-hero">
        <div className="hero-bg" />
        <div className="hero-badge">💰 Transparent Pricing — No Hidden Fees</div>
        <h1>Grow Your Business with<br /><span>SKM Studio Maps</span></h1>
        
        <div className="billing-toggle">
          <span style={{ color: !isAnnual ? 'var(--text)' : 'var(--muted)' }}>Monthly</span>
          <div 
            className={`toggle-track ${isAnnual ? 'annual' : ''}`} 
            onClick={() => setIsAnnual(!isAnnual)}
          >
            <div className="toggle-thumb" />
          </div>
          <span style={{ color: isAnnual ? 'var(--text)' : 'var(--muted)' }}>Annual</span>
          <span style={{ background: 'rgba(46,204,138,0.1)', color: 'var(--green)', padding: '2px 8px', borderRadius: 99, fontSize: 12 }}>Save 20%</span>
        </div>
      </div>

      <div className="pricing-grid">
        <div className="plan-card">
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 14 }}>STARTER</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, marginBottom: 8 }}>Free</h2>
          <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 24 }}>Essential visibility for every business.</p>
          <div className="plan-price">
            <span className="currency">₹</span>0<span className="period">/ month</span>
          </div>
          <div style={{ height: 1, background: 'var(--border)', margin: '24px 0' }} />
          <ul style={{ listStyle: 'none', padding: 0, fontSize: 13, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <li>✓ Business name & contact</li>
            <li>✓ Category & city listing</li>
            <li>✓ 3 business photos</li>
            <li>✓ Listing URL</li>
          </ul>
          <Link href="/add-business">
            <button className="plan-btn secondary">Get Started Free</button>
          </Link>
        </div>

        <div className="plan-card featured">
          <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: 'var(--gold)', color: '#000', fontSize: 10, fontWeight: 800, padding: '4px 12px', borderRadius: 99 }}>MOST POPULAR</div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 14, color: 'var(--gold)' }}>FEATURED</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, marginBottom: 8 }}>Featured</h2>
          <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 24 }}>Top placement & premium features.</p>
          <div className="plan-price">
            <span className="currency">₹</span>{isAnnual ? '799' : '999'}<span className="period">/ month</span>
          </div>
          <div style={{ height: 1, background: 'var(--border)', margin: '24px 0' }} />
          <ul style={{ listStyle: 'none', padding: 0, fontSize: 13, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <li>✓ Everything in Free</li>
            <li>✓ <strong>⭐ Featured badge</strong></li>
            <li>✓ Top of search results</li>
            <li>✓ WhatsApp enquiry button</li>
            <li>✓ Monthly analytics</li>
          </ul>
          <Link href="/add-business?plan=featured">
            <button className="plan-btn primary">Start Featured Listing</button>
          </Link>
        </div>

        <div className="plan-card">
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 14, color: 'var(--accent)' }}>PREMIUM + SEO</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, marginBottom: 8 }}>Premium</h2>
          <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 24 }}>Maximum Google visibility.</p>
          <div className="plan-price">
            <span className="currency">₹</span>{isAnnual ? '1,999' : '2,499'}<span className="period">/ month</span>
          </div>
          <div style={{ height: 1, background: 'var(--border)', margin: '24px 0' }} />
          <ul style={{ listStyle: 'none', padding: 0, fontSize: 13, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <li>✓ Everything in Featured</li>
            <li>✓ <strong>SEO keyword targeting</strong></li>
            <li>✓ Rank on Google Page 1</li>
            <li>✓ Specialized analytics</li>
          </ul>
          <Link href="/add-business?plan=premium">
            <button className="plan-btn secondary">Go Premium</button>
          </Link>
        </div>
      </div>

      <div className="faq-wrap">
        <h2 style={{ fontFamily: 'Playfair Display, serif', textAlign: 'center', fontSize: 36, marginBottom: 40 }}>Frequently Asked Questions</h2>
        {[
          ["What is the pre-launch price?", "During pre-launch, the Featured plan is available at ₹999/year instead of the regular ₹3,999/month. Lock it in today!"],
          ["How does lead diversion work?", "On Premium plans, we divert search traffic from competitors directly to your listing via targeted SEO."],
          ["Can I cancel anytime?", "Yes, monthly plans can be canceled anytime. Annual plans offer deep discounts for long-term commitment."]
        ].map(([q, a], i) => (
          <div key={i} className="faq-item">
            <div className="faq-q" onClick={() => toggleFaq(i)}>
              {q} <span>{openFaq === i ? '-' : '+'}</span>
            </div>
            {openFaq === i && <div className="faq-a">{a}</div>}
          </div>
        ))}
      </div>
    </>
  );
}
