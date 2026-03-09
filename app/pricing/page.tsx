"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E8C96A";
const GOLD_DARK = "#A07830";
const PRELAUNCH_END = new Date("2026-03-31T23:59:59");

function useCountdown(endDate: Date) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const update = () => {
      const diff = endDate.getTime() - Date.now();
      if (diff <= 0) return;
      setT({ days: Math.floor(diff/86400000), hours: Math.floor((diff%86400000)/3600000), minutes: Math.floor((diff%3600000)/60000), seconds: Math.floor((diff%60000)/1000) });
    };
    update(); const id = setInterval(update, 1000); return () => clearInterval(id);
  }, [endDate]);
  return t;
}

function useDark() {
  const [dark, setDark] = useState(false);
  useEffect(() => { setDark(document.documentElement.getAttribute("data-theme") === "dark"); }, []);
  return dark;
}

export default function PricingPage() {
  const countdown = useCountdown(PRELAUNCH_END);
  const dark = useDark();
  const s = { bg: "var(--bg)", bgSec: "var(--bg-secondary)", bgCard: "var(--bg-card)", text: "var(--text-primary)", textSec: "var(--text-secondary)", textMuted: "var(--text-muted)", border: "var(--border)" };

  const plans = [
    {
      name: "Free",
      prelaunchPrice: "₹0",
      regularPrice: "₹0",
      period: "forever",
      desc: "Get your business listed",
      color: "#888",
      features: ["Basic listing", "Business name & category", "Location & contact", "Community submissions", "Claim & edit anytime"],
      cta: "List for Free",
      href: "/add-business",
      featured: false,
    },
    {
      name: "Featured",
      prelaunchPrice: "₹999",
      regularPrice: "₹3,999",
      prelaunchNote: "/year (pre-launch price)",
      regularNote: "/month (after March 31)",
      desc: "Get discovered faster",
      color: GOLD,
      features: ["Everything in Free", "⭐ Featured badge", "Top placement in search", "Verified badge", "Priority indexing", "WhatsApp & call button", "Photo gallery (5 photos)", "Business hours display"],
      cta: "Get Featured — ₹999/year",
      href: "/add-business?plan=featured",
      featured: true,
    },
    {
      name: "Premium",
      prelaunchPrice: "₹4,999",
      regularPrice: "₹4,999",
      period: "/month",
      desc: "Grow with analytics",
      color: "#7C3AED",
      features: ["Everything in Featured", "📊 Analytics dashboard", "Customer insights", "Review management", "Multiple photos (20)", "Social media links", "Custom description", "Priority support"],
      cta: "Coming Soon",
      href: "#",
      featured: false,
      comingSoon: true,
    },
    {
      name: "SEO Starter",
      prelaunchPrice: "₹15,000",
      regularPrice: "₹15,000",
      period: "/month",
      desc: "Rank on Google",
      color: "#059669",
      features: ["Everything in Premium", "Google SEO optimization", "5 target keywords", "Monthly SEO report", "Backlink building", "Local citations"],
      cta: "Coming Soon",
      href: "#",
      featured: false,
      comingSoon: true,
    },
  ];

  return (
    <div style={{ background: s.bg, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Nav */}
      <nav style={{ background: dark ? "#0F0F0F" : "#fff", borderBottom: `1px solid var(--border)`, padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 34, height: 34, background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>📍</div>
          <div>
            <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 16, color: s.text }}>SKM Studio</span>
            <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: 16, color: GOLD }}> Maps</span>
          </div>
        </Link>
        <div style={{ display: "flex", gap: 20 }}>
          {[["Home", "/"], ["Listings", "/listings"], ["Pricing", "/pricing"]].map(([l, h]) => (
            <Link key={l} href={h} style={{ color: s.textSec, fontSize: 14, textDecoration: "none" }}>{l}</Link>
          ))}
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,68,68,0.1)", border: "1px solid rgba(255,68,68,0.3)", borderRadius: 99, padding: "5px 14px", marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#FF4444", display: "inline-block" }} />
            <span style={{ color: "#FF8888", fontSize: 12, fontWeight: 600 }}>Pre-Launch Offer Ends 31 March 2026</span>
          </div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, color: s.text, margin: "0 0 16px" }}>
            Simple, Transparent Pricing
          </h1>
          <p style={{ color: s.textMuted, fontSize: 16, margin: "0 0 32px" }}>
            Lock in pre-launch pricing before March 31. Monthly prices shown — pre-launch yearly deal below.
          </p>

          {/* Countdown */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 16 }}>
            {[["days", countdown.days], ["hours", countdown.hours], ["mins", countdown.minutes], ["secs", countdown.seconds]].map(([label, val]) => (
              <div key={label as string} style={{ background: dark ? "#1A1200" : "#FFF8E8", border: `1px solid ${GOLD_DARK}`, borderRadius: 10, padding: "10px 16px", textAlign: "center", minWidth: 64 }}>
                <div style={{ color: GOLD, fontSize: 28, fontWeight: 800, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{String(val).padStart(2, "0")}</div>
                <div style={{ color: s.textMuted, fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
          <p style={{ color: "#FF4444", fontSize: 13, fontWeight: 600 }}>⚡ After March 31, Featured plan reverts to ₹3,999/month</p>
        </div>

        {/* Plans grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20, marginBottom: 60 }}>
          {plans.map(plan => (
            <div key={plan.name} style={{
              background: s.bgCard,
              border: `${plan.featured ? "2px" : "1px"} solid ${plan.featured ? GOLD : "var(--border)"}`,
              borderRadius: 16, padding: "28px 24px", position: "relative",
              boxShadow: plan.featured ? `0 0 40px rgba(201,168,76,0.15)` : "none"
            }}>
              {plan.featured && (
                <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, color: "#000", fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 99, whiteSpace: "nowrap" }}>
                  🔥 BEST VALUE — PRE-LAUNCH
                </div>
              )}
              {plan.comingSoon && (
                <div style={{ position: "absolute", top: 12, right: 12, background: "#1A1A1A", color: "#888", fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 99 }}>
                  Coming Soon
                </div>
              )}
              <div style={{ color: plan.color, fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{plan.name}</div>
              <div style={{ marginBottom: 6 }}>
                <span style={{ fontSize: 36, fontWeight: 800, color: plan.featured ? GOLD : s.text, fontFamily: "'Sora', sans-serif" }}>{plan.prelaunchPrice}</span>
                {plan.featured ? (
                  <span style={{ color: s.textMuted, fontSize: 12, marginLeft: 4 }}>{plan.prelaunchNote}</span>
                ) : plan.period ? (
                  <span style={{ color: s.textMuted, fontSize: 13, marginLeft: 4 }}>{plan.period}</span>
                ) : null}
              </div>
              {plan.featured && (
                <div style={{ marginBottom: 12 }}>
                  <span style={{ color: "#FF4444", fontSize: 12, fontWeight: 600 }}>After March 31: </span>
                  <s style={{ color: s.textMuted, fontSize: 12 }}>{plan.regularPrice}{plan.regularNote}</s>
                </div>
              )}
              <p style={{ color: s.textMuted, fontSize: 13, margin: "0 0 20px" }}>{plan.desc}</p>
              <Link href={plan.href} style={{
                display: "block", textAlign: "center", padding: "11px 20px", borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: "none",
                background: plan.featured ? `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})` : "transparent",
                color: plan.featured ? "#000" : plan.comingSoon ? s.textMuted : s.text,
                border: plan.featured ? "none" : `1px solid var(--border)`,
                cursor: plan.comingSoon ? "default" : "pointer",
                marginBottom: 20,
                opacity: plan.comingSoon ? 0.6 : 1,
              }}>
                {plan.cta}
              </Link>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: "flex", gap: 8, fontSize: 13, color: s.textSec }}>
                    <span style={{ color: plan.featured ? GOLD : "#10B981", flexShrink: 0 }}>✓</span>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* SEO plans teaser */}
        <div style={{ background: s.bgCard, border: `1px solid var(--border)`, borderRadius: 16, padding: "28px 24px", marginBottom: 40, textAlign: "center" }}>
          <h3 style={{ color: s.text, fontFamily: "'Sora', sans-serif", margin: "0 0 8px" }}>🚀 SEO Growth Plans — Coming Soon</h3>
          <p style={{ color: s.textMuted, fontSize: 14, margin: "0 0 16px" }}>Advanced SEO packages to rank your business on Google</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
            {[["SEO Starter", "₹15,000/mo"], ["SEO Pro", "₹30,000/mo"], ["SEO Enterprise", "₹75,000/mo"]].map(([name, price]) => (
              <div key={name} style={{ background: s.bgSec, borderRadius: 10, padding: "12px 24px", border: `1px solid var(--border)` }}>
                <div style={{ fontWeight: 600, color: s.text, fontSize: 14 }}>{name}</div>
                <div style={{ color: GOLD, fontSize: 13, fontWeight: 700 }}>{price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 24, fontWeight: 700, color: s.text, marginBottom: 24, textAlign: "center" }}>Frequently Asked Questions</h2>
          {[
            ["What is the pre-launch price?", "During pre-launch (before March 31, 2026), the Featured plan is available at ₹999/year instead of the regular ₹3,999/month. That's paying once for the entire year at less than the cost of a single month."],
            ["Do I need to pay upfront?", "Yes — our sales team will collect payment and manually activate your Featured listing. No online payment gateway required right now."],
            ["Can someone else list my business?", "Yes! Anyone can submit a business listing. Only Business Name, Category, and Location are required. As the owner, you can claim and update it anytime."],
            ["When will analytics be available?", "Analytics dashboard is coming soon in the Premium plan. Pre-launch Featured customers will get early access at no extra charge."],
          ].map(([q, a]) => (
            <div key={q as string} style={{ borderBottom: `1px solid var(--border)`, padding: "16px 0" }}>
              <div style={{ fontWeight: 600, color: s.text, marginBottom: 8 }}>{q}</div>
              <div style={{ color: s.textMuted, fontSize: 14, lineHeight: 1.6 }}>{a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
