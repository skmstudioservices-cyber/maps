"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E8C96A";
const GOLD_DARK = "#A07830";
const PRELAUNCH_END = new Date("2026-03-31T23:59:59");

const CATEGORIES = [
  { name: "Restaurants", icon: "🍽️", count: 87 },
  { name: "Hotels", icon: "🏨", count: 43 },
  { name: "Hospitals", icon: "🏥", count: 56 },
  { name: "Beauty & Spa", icon: "💆", count: 72 },
  { name: "Auto Services", icon: "🚗", count: 38 },
  { name: "Education", icon: "🎓", count: 64 },
  { name: "Finance", icon: "💰", count: 29 },
  { name: "Fitness", icon: "💪", count: 41 },
  { name: "Home Services", icon: "🏠", count: 95 },
  { name: "Hospitals", icon: "🏥", count: 56 },
  { name: "Legal", icon: "⚖️", count: 22 },
  { name: "Real Estate", icon: "🏢", count: 67 },
  { name: "Shopping", icon: "🛍️", count: 83 },
];

const CITIES = [
  "Delhi", "New Delhi", "Noida", "Greater Noida", "Gurgaon", 
  "Faridabad", "Ghaziabad", "Gurugram", "NOIDA Extension", "Gorakhpur"
];

const FEATURED = [
  { id: 1, name: "The Grand Kitchen", cat: "Restaurants", city: "Delhi", rating: 4.8, reviews: 234, price: "$$$", initials: "GK", color: "#DC2626", bg: "#2D0A0A", desc: "Award-winning multi-cuisine restaurant", verified: true },
  { id: 2, name: "Apollo Hospital", cat: "Hospitals", city: "Delhi", rating: 4.9, reviews: 890, price: "$$$$", initials: "AH", color: "#059669", bg: "#0A2D1A", desc: "Leading multi-specialty hospital", verified: true },
  { id: 3, name: "Hotel Leela Palace", cat: "Hotels", city: "New Delhi", rating: 4.7, reviews: 567, price: "$$$$", initials: "LP", color: "#C9A84C", bg: "#1A1200", desc: "5-star luxury palace hotel", verified: true },
  { id: 4, name: "PhoenixMarketCity", cat: "Shopping", city: "Delhi", rating: 4.5, reviews: 1203, price: "$$$", initials: "PM", color: "#7C3AED", bg: "#180A2D", desc: "Premier shopping destination", verified: true },
  { id: 5, name: "Gold's Gym", cat: "Fitness", city: "Gurgaon", rating: 4.6, reviews: 345, price: "$$", initials: "GG", color: "#0891B2", bg: "#0A1A2D", desc: "World-class fitness center", verified: true },
  { id: 6, name: "Prestige Developers", cat: "Real Estate", city: "Noida", rating: 4.4, reviews: 178, price: "$$$$", initials: "PD", color: "#DB2777", bg: "#2D0A1A", desc: "Premium real estate developer", verified: true },
];

function useCountdown(endDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const update = () => {
      const diff = endDate.getTime() - Date.now();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [endDate]);
  return timeLeft;
}

function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("skm-theme");
    const isDark = stored === "dark";
    setDark(isDark);
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("skm-theme", next ? "dark" : "light");
  };
  return { dark, toggle };
}

export default function HomePage() {
  const countdown = useCountdown(PRELAUNCH_END);
  const { dark, toggle } = useTheme();
  const [search, setSearch] = useState("");
  const [activeCity, setActiveCity] = useState("Delhi");

  const s = {
    bg: "var(--bg)", bgSec: "var(--bg-secondary)", bgCard: "var(--bg-card)",
    text: "var(--text-primary)", textSec: "var(--text-secondary)", textMuted: "var(--text-muted)",
    border: "var(--border)", borderStrong: "var(--border-strong)",
  };

  return (
    <div style={{ background: s.bg, fontFamily: "'DM Sans', sans-serif" }}>

      {/* Pre-launch Banner */}
      <div style={{ background: dark ? "#0A0800" : "#0A0A0A", borderBottom: `1px solid ${GOLD_DARK}`, padding: "9px 16px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
        <span style={{ background: "#FF4444", color: "#fff", fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 99, textTransform: "uppercase", letterSpacing: 1 }}>PRE-LAUNCH</span>
        <span style={{ color: GOLD_LIGHT, fontSize: 13, fontWeight: 500 }}>
          🎉 Pre-launch Offer: Featured listing at <strong style={{ color: GOLD }}>₹999/year</strong> (regular ₹3,999/month) — ends 31 March 2026
        </span>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {[
            ["days", countdown.days],
            ["hrs", countdown.hours],
            ["min", countdown.minutes],
            ["sec", countdown.seconds],
          ].map(([label, val]) => (
            <div key={label as string} style={{ background: "#1A1200", border: `1px solid ${GOLD_DARK}`, borderRadius: 6, padding: "3px 10px", textAlign: "center", minWidth: 42 }}>
              <div style={{ color: GOLD, fontSize: 16, fontWeight: 800, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{String(val).padStart(2, "0")}</div>
              <div style={{ color: "#666", fontSize: 9, textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
            </div>
          ))}
        </div>
        <Link href="/pricing" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, color: "#000", fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 99, textDecoration: "none" }}>
          Claim Offer →
        </Link>
      </div>

      {/* Navbar */}
      <nav style={{ background: dark ? "#0F0F0F" : "#fff", borderBottom: `1px solid ${s.border}`, padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, boxShadow: dark ? "0 1px 0 #2A2520" : "0 1px 3px rgba(0,0,0,0.08)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 34, height: 34, background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>📍</div>
          <div>
            <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 16, color: s.text }}>SKM Studio</span>
            <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: 16, color: GOLD }}> Maps</span>
          </div>
        </Link>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          {[["Home", "/"], ["Listings", "/listings"], ["Pricing", "/pricing"], ["Roadmap", "/roadmap"]].map(([label, href]) => (
            <Link key={label} href={href} style={{ color: s.textSec, fontSize: 14, fontWeight: 500, textDecoration: "none" }}>{label}</Link>
          ))}
          <Link href="/add-business" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, color: "#000", fontSize: 13, fontWeight: 700, padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>
            + List Business
          </Link>
          <Link href="/login" style={{ color: s.textSec, fontSize: 14, fontWeight: 500, textDecoration: "none" }}>Login</Link>
          <button onClick={toggle} style={{ background: "none", border: `1px solid ${s.border}`, borderRadius: 8, padding: "7px 10px", cursor: "pointer", fontSize: 16, color: s.text }}>
            {dark ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: dark ? "linear-gradient(135deg, #0A0800 0%, #1A1200 40%, #0A0A0A 100%)" : "linear-gradient(135deg, #0A0A0A 0%, #1A1200 40%, #0A0800 100%)", padding: "80px 24px 90px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(160,120,48,0.06) 0%, transparent 60%)` }} />
        <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(201,168,76,0.1)", border: `1px solid ${GOLD_DARK}`, borderRadius: 99, padding: "5px 14px", marginBottom: 24 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#FF4444", display: "inline-block", animation: "pulse-gold 2s infinite" }} />
            <span style={{ color: GOLD_LIGHT, fontSize: 12, fontWeight: 600 }}>Pre-Launch — Limited Spots Available</span>
          </div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(32px, 5vw, 58px)", fontWeight: 800, margin: "0 0 20px", lineHeight: 1.1, color: "#F5F0E8" }}>
            Discover Local Businesses<br />
            <span style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT}, ${GOLD_DARK})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Across India
            </span>
          </h1>
          <p style={{ color: "#9A8A6A", fontSize: 17, margin: "0 0 40px", lineHeight: 1.6 }}>
            Find trusted businesses, read reviews, get directions — your one-stop local directory for Delhi, NCR, Gorakhpur and all of India
          </p>

          {/* Search */}
          <div style={{ display: "flex", maxWidth: 680, margin: "0 auto 20px", background: dark ? "#1A1A1A" : "#fff", borderRadius: 14, overflow: "hidden", border: `2px solid ${GOLD_DARK}`, boxShadow: `0 8px 40px rgba(201,168,76,0.2)` }}>
            <div style={{ display: "flex", alignItems: "center", padding: "0 16px", color: "#888", fontSize: 18 }}>🔍</div>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search businesses, restaurants, services..." style={{ flex: 1, border: "none", padding: "16px 0", fontSize: 15, outline: "none", background: "transparent", color: s.text, fontFamily: "'DM Sans', sans-serif" }} />
            <div style={{ display: "flex", alignItems: "center", padding: "0 14px", borderLeft: `1px solid ${GOLD_DARK}20`, gap: 6, color: "#888", fontSize: 14, whiteSpace: "nowrap" }}>
              📍 Delhi/NCR
            </div>
            <Link href={`/listings?q=${search}`} style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, color: "#000", border: "none", padding: "0 28px", cursor: "pointer", fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", gap: 6, textDecoration: "none" }}>
              Search
            </Link>
          </div>

          {/* Quick cats */}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            <span style={{ color: "#666", fontSize: 13 }}>Popular:</span>
            {["Restaurants", "Hotels", "Hospitals", "Shopping", "Salon & Spa"].map(t => (
              <Link key={t} href={`/listings?cat=${t}`} style={{ background: "rgba(201,168,76,0.1)", border: `1px solid ${GOLD_DARK}40`, color: GOLD_LIGHT, padding: "4px 12px", borderRadius: 99, fontSize: 13, textDecoration: "none" }}>
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: dark ? "#111" : "#fff", padding: "28px 24px", display: "flex", justifyContent: "center", gap: "clamp(28px,6vw,80px)", borderBottom: `1px solid ${s.border}`, flexWrap: "wrap" }}>
        {[["1,200+", "Businesses Listed", "#C9A84C"], ["12", "Categories", "#C9A84C"], ["4,500+", "Reviews", "#C9A84C"], ["3", "Cities", "#C9A84C"]].map(([n, label, c]) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 30, fontWeight: 800, color: c, fontFamily: "'Sora', sans-serif" }}>{n}</div>
            <div style={{ fontSize: 13, color: s.textMuted, marginTop: 4 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* City selector */}
      <div style={{ background: s.bgSec, padding: "20px 24px", borderBottom: `1px solid ${s.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ color: s.textMuted, fontSize: 13, marginRight: 4, fontWeight: 600 }}>Browse by city:</span>
            {CITIES.map(city => (
              <button key={city} onClick={() => setActiveCity(city)} style={{ background: city === activeCity ? `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})` : (dark ? "#1A1A1A" : "#fff"), color: city === activeCity ? "#000" : s.textSec, border: `1px solid ${city === activeCity ? GOLD : s.border}`, padding: "5px 14px", borderRadius: 99, fontSize: 13, cursor: "pointer", fontWeight: city === activeCity ? 700 : 400 }}>
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "52px 24px" }}>

        {/* Browse Categories */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: s.text, fontFamily: "'Sora', sans-serif" }}>Browse Categories</h2>
            <p style={{ margin: "4px 0 0", fontSize: 14, color: s.textMuted }}>Explore businesses by category in {activeCity}</p>
          </div>
          <Link href="/listings" style={{ color: GOLD, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>View All →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12, marginBottom: 60 }}>
          {CATEGORIES.map(cat => (
            <Link key={cat.name} href={`/listings?cat=${cat.name}`} style={{
              background: s.bgCard, border: `1px solid ${s.border}`, borderRadius: 14,
              padding: "20px 12px", textAlign: "center", cursor: "pointer",
              textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
              transition: "all 0.15s"
            }}>
              <span style={{ fontSize: 28 }}>{cat.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: s.text }}>{cat.name}</span>
              <span style={{ fontSize: 12, color: s.textMuted }}>{cat.count} listings</span>
            </Link>
          ))}
        </div>

        {/* Featured Businesses */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: s.text, fontFamily: "'Sora', sans-serif" }}>Featured Businesses</h2>
            <p style={{ margin: "4px 0 0", fontSize: 14, color: s.textMuted }}>Top-rated and verified businesses</p>
          </div>
          <Link href="/listings" style={{ color: GOLD, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>See All →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20, marginBottom: 64 }}>
          {FEATURED.map(biz => (
            <Link key={biz.id} href={`/b/${biz.id}`} style={{ textDecoration: "none" }}>
              <div style={{ background: s.bgCard, border: `1px solid ${s.border}`, borderRadius: 14, overflow: "hidden", cursor: "pointer", transition: "all 0.2s" }}>
                <div style={{ background: biz.bg, height: 100, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <div style={{ position: "absolute", top: 8, left: 8, display: "flex", gap: 6 }}>
                    {biz.verified && <span style={{ background: "#0D2B1F", border: "1px solid #10B98140", color: "#10B981", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 99 }}>✓ Verified</span>}
                  </div>
                  <div style={{ position: "absolute", top: 8, right: 8 }}>
                    <span style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, color: "#000", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99 }}>⭐ Featured</span>
                  </div>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: biz.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 16, fontFamily: "'Sora', sans-serif" }}>
                    {biz.initials}
                  </div>
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 15, color: s.text }}>{biz.name}</span>
                    <span style={{ color: GOLD, fontSize: 13 }}>{biz.price}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                    <span style={{ color: "#F59E0B", fontSize: 13 }}>{"★".repeat(Math.floor(biz.rating))}{"☆".repeat(5 - Math.floor(biz.rating))}</span>
                    <span style={{ fontWeight: 700, fontSize: 13, color: s.text }}>{biz.rating}</span>
                    <span style={{ color: s.textMuted, fontSize: 12 }}>({biz.reviews})</span>
                  </div>
                  <p style={{ color: s.textMuted, fontSize: 13, margin: "0 0 10px", lineHeight: 1.4 }}>{biz.desc}</p>
                  <div style={{ display: "flex", gap: 6 }}>
                    <span style={{ background: "rgba(201,168,76,0.1)", border: `1px solid ${GOLD}30`, color: GOLD, fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 99 }}>{biz.cat}</span>
                    <span style={{ background: "#0D2B1F", border: "1px solid #10B98130", color: "#10B981", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 99 }}>● Open</span>
                    <span style={{ color: s.textMuted, fontSize: 11, padding: "2px 4px" }}>📍 {biz.city}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pre-launch offer CTA */}
        <div style={{ background: dark ? "linear-gradient(135deg, #0A0800, #1A1200)" : "linear-gradient(135deg, #0A0A0A, #1A1200)", border: `1px solid ${GOLD_DARK}`, borderRadius: 20, padding: "52px 32px", textAlign: "center", marginBottom: 60, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.1) 0%, transparent 60%)` }} />
          <div style={{ position: "relative" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,68,68,0.15)", border: "1px solid rgba(255,68,68,0.3)", borderRadius: 99, padding: "5px 14px", marginBottom: 20 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#FF4444", display: "inline-block" }} />
              <span style={{ color: "#FF8888", fontSize: 12, fontWeight: 600 }}>Pre-Launch Offer Ends 31 March 2026</span>
            </div>
            <h2 style={{ color: "#F5F0E8", margin: "0 0 12px", fontSize: "clamp(22px,3vw,32px)", fontFamily: "'Sora', sans-serif", fontWeight: 800 }}>
              Own a Business? Get Featured for{" "}
              <span style={{ color: GOLD }}>₹999/year</span>
            </h2>
            <p style={{ color: "#9A8A6A", margin: "0 0 12px", fontSize: 15 }}>Regular price: <s>₹3,999/month</s> — Save 97% when you join in pre-launch</p>
            <p style={{ color: "#888", margin: "0 0 32px", fontSize: 14 }}>
              Get verified badge · Top placement in search · More calls & customers · Analytics dashboard
            </p>

            {/* Countdown in CTA */}
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 32 }}>
              {[["days", countdown.days], ["hours", countdown.hours], ["mins", countdown.minutes], ["secs", countdown.seconds]].map(([label, val]) => (
                <div key={label as string} style={{ background: "#1A1200", border: `1px solid ${GOLD_DARK}`, borderRadius: 10, padding: "10px 16px", textAlign: "center", minWidth: 64 }}>
                  <div style={{ color: GOLD, fontSize: 28, fontWeight: 800, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{String(val).padStart(2, "0")}</div>
                  <div style={{ color: "#666", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/add-business" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, color: "#000", border: "none", padding: "14px 32px", borderRadius: 10, fontWeight: 700, fontSize: 16, cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
                🚀 List My Business Now
              </Link>
              <Link href="/pricing" style={{ background: "transparent", color: GOLD, border: `1px solid ${GOLD}`, padding: "13px 28px", borderRadius: 10, fontWeight: 600, fontSize: 15, cursor: "pointer", textDecoration: "none" }}>
                View All Plans
              </Link>
            </div>
          </div>
        </div>

        {/* Trust signals */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20, marginBottom: 60 }}>
          {[
            ["🏆", "Top-Ranked Directory", "Covering Delhi, NCR & Gorakhpur with verified data"],
            ["✅", "Verified Listings", "Every business manually checked for accuracy"],
            ["📱", "Mobile-Friendly", "Find businesses on any device, anywhere"],
            ["🔒", "Secure & Trusted", "Business owners control their own listings"],
          ].map(([icon, title, desc]) => (
            <div key={title as string} style={{ background: s.bgCard, border: `1px solid ${s.border}`, borderRadius: 12, padding: "20px", textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: s.text, marginBottom: 6 }}>{title}</div>
              <div style={{ fontSize: 13, color: s.textMuted, lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>

        {/* Leaderboard preview */}
        <div style={{ background: s.bgCard, border: `1px solid ${s.border}`, borderRadius: 16, padding: "28px 24px", marginBottom: 60 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: s.text, fontFamily: "'Sora', sans-serif" }}>🏅 Top Contributors</h2>
              <p style={{ margin: "4px 0 0", fontSize: 13, color: s.textMuted }}>Community members helping build the directory</p>
            </div>
            <Link href="/leaderboard" style={{ color: GOLD, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>Full Leaderboard →</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              ["🥇", "Rahul S.", 847, "Delhi", 42, 156],
              ["🥈", "Priya M.", 723, "Gorakhpur", 38, 121],
              ["🥉", "Amit K.", 612, "Noida", 31, 98],
            ].map(([medal, name, score, city, listings, reviews]) => (
              <div key={name as string} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px", background: s.bgSec, borderRadius: 10, border: `1px solid ${s.border}` }}>
                <span style={{ fontSize: 20 }}>{medal}</span>
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 600, fontSize: 14, color: s.text }}>{name}</span>
                  <span style={{ color: s.textMuted, fontSize: 12, marginLeft: 8 }}>📍 {city}</span>
                </div>
                <div style={{ display: "flex", gap: 16, fontSize: 13, color: s.textMuted }}>
                  <span>🏢 {listings} listings</span>
                  <span>⭐ {reviews} reviews</span>
                </div>
                <div style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, color: "#000", fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 99 }}>
                  {score} pts
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer style={{ background: "#0A0A0A", borderTop: `1px solid ${GOLD_DARK}30`, padding: "48px 24px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 32, marginBottom: 40 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 34, height: 34, background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>📍</div>
                <div>
                  <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 16, color: "#F5F0E8" }}>SKM Studio</span>
                  <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: 16, color: GOLD }}> Maps</span>
                </div>
              </div>
              <p style={{ color: "#666", fontSize: 13, lineHeight: 1.7, margin: "0 0 16px" }}>
                India's premium local business directory. Find verified businesses across Delhi, NCR, Gorakhpur and all of India.
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                {["Facebook", "Instagram", "Twitter", "LinkedIn"].map(s => (
                  <div key={s} style={{ width: 34, height: 34, background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 14 }}>
                    {s === "Facebook" ? "f" : s === "Instagram" ? "📸" : s === "Twitter" ? "𝕏" : "in"}
                  </div>
                ))}
              </div>
            </div>
            {[
              ["Quick Links", ["Home", "Listings", "Add Business", "Pricing", "Roadmap", "Login"]],
              ["Cities", ["Delhi", "New Delhi", "Noida", "Gurgaon", "Gorakhpur", "Faridabad"]],
              ["Support", ["Contact Us", "FAQ", "Report Issue", "Privacy Policy", "Terms of Service"]],
            ].map(([title, links]) => (
              <div key={title as string}>
                <h4 style={{ color: GOLD, fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 14px" }}>{title}</h4>
                {(links as string[]).map(link => (
                  <div key={link} style={{ color: "#666", fontSize: 13, marginBottom: 8, cursor: "pointer" }}>{link}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid #1A1A1A", paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <span style={{ color: "#444", fontSize: 12 }}>© 2026 SKM Studio Maps. All rights reserved.</span>
            <span style={{ color: "#444", fontSize: 12 }}>Made with ❤️ in India</span>
          </div>
        </div>
      </footer>

      {/* Floating Feedback Button */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 999, display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" }}>
        <button style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, color: "#000", border: "none", borderRadius: 50, padding: "12px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer", boxShadow: `0 4px 20px rgba(201,168,76,0.4)`, display: "flex", alignItems: "center", gap: 8 }}>
          💬 Feedback / Bug
        </button>
      </div>

    </div>
  );
}
