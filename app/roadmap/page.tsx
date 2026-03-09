"use client";
import Link from "next/link";

const GOLD = "#C9A84C";
const GOLD_DARK = "#A07830";
const GOLD_LIGHT = "#E8C96A";

const ROADMAP = [
  {
    phase: "Phase 1 — Foundation",
    status: "live",
    quarter: "Q1 2026",
    features: [
      { name: "Business listings with basic info", status: "done" },
      { name: "Search by city and category", status: "done" },
      { name: "Featured listing (₹999/year pre-launch)", status: "done" },
      { name: "Community submissions", status: "done" },
      { name: "Claim your listing", status: "done" },
      { name: "Google Sign-In", status: "done" },
      { name: "Dark/Light theme", status: "done" },
      { name: "Mobile-responsive design", status: "done" },
      { name: "Delhi, NCR & Gorakhpur coverage", status: "done" },
      { name: "Admin dashboard", status: "done" },
    ]
  },
  {
    phase: "Phase 2 — Growth",
    status: "upcoming",
    quarter: "Q2 2026",
    features: [
      { name: "Photo gallery for businesses", status: "upcoming" },
      { name: "Review & rating system", status: "upcoming" },
      { name: "WhatsApp direct contact", status: "upcoming" },
      { name: "Analytics dashboard (Premium)", status: "upcoming" },
      { name: "Business hours with live open/closed", status: "upcoming" },
      { name: "Map view with directions", status: "upcoming" },
      { name: "Leaderboard & points system", status: "upcoming" },
      { name: "Email notifications", status: "upcoming" },
      { name: "Expand to 10 cities", status: "upcoming" },
    ]
  },
  {
    phase: "Phase 3 — Scale",
    status: "planned",
    quarter: "Q3 2026",
    features: [
      { name: "SEO optimization per business", status: "planned" },
      { name: "Google Maps API integration", status: "planned" },
      { name: "Payment gateway (Razorpay)", status: "planned" },
      { name: "Business owner mobile app", status: "planned" },
      { name: "Customer mobile app", status: "planned" },
      { name: "AI-powered search recommendations", status: "planned" },
      { name: "Multi-language support (Hindi, etc.)", status: "planned" },
      { name: "Verified reviews (Aadhaar-based)", status: "planned" },
      { name: "100 cities across India", status: "planned" },
    ]
  },
  {
    phase: "Phase 4 — Enterprise",
    status: "planned",
    quarter: "Q4 2026+",
    features: [
      { name: "SEO packages (₹15K–₹75K/month)", status: "planned" },
      { name: "Business analytics API", status: "planned" },
      { name: "Franchise directory listings", status: "planned" },
      { name: "B2B lead generation tools", status: "planned" },
      { name: "Bulk business import tools", status: "planned" },
      { name: "White-label directory for cities", status: "planned" },
      { name: "Pan-India coverage (all districts)", status: "planned" },
      { name: "AI business insights & benchmarking", status: "planned" },
    ]
  },
];

export default function RoadmapPage() {
  const s = { bg: "var(--bg)", bgSec: "var(--bg-secondary)", bgCard: "var(--bg-card)", text: "var(--text-primary)", textSec: "var(--text-secondary)", textMuted: "var(--text-muted)", border: "var(--border)" };

  return (
    <div style={{ background: s.bg, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <nav style={{ background: s.bgCard, borderBottom: `1px solid ${s.border}`, padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>📍</div>
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 15, color: s.text }}>SKM Studio <span style={{ color: GOLD }}>Maps</span></span>
        </Link>
      </nav>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, color: s.text, margin: "0 0 16px" }}>
            Product Roadmap
          </h1>
          <p style={{ color: s.textMuted, fontSize: 16 }}>Our vision for building India's most trusted local business directory</p>
        </div>

        <div style={{ position: "relative" }}>
          {/* Timeline line */}
          <div style={{ position: "absolute", left: 20, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom, ${GOLD}, ${GOLD_DARK}, #333)` }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {ROADMAP.map((phase) => (
              <div key={phase.phase} style={{ paddingLeft: 56, position: "relative" }}>
                {/* Dot */}
                <div style={{ position: "absolute", left: 10, top: 16, width: 22, height: 22, borderRadius: "50%", background: phase.status === "live" ? `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})` : phase.status === "upcoming" ? "#1A1200" : "#1A1A1A", border: `2px solid ${phase.status === "live" ? GOLD : phase.status === "upcoming" ? GOLD_DARK : "#333"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {phase.status === "live" && <span style={{ fontSize: 10 }}>✓</span>}
                </div>

                <div style={{ background: s.bgCard, border: `1px solid ${phase.status === "live" ? GOLD_DARK : s.border}`, borderRadius: 16, padding: "24px 28px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
                    <div>
                      <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: s.text, margin: "0 0 4px" }}>{phase.phase}</h2>
                      <span style={{ color: s.textMuted, fontSize: 13 }}>{phase.quarter}</span>
                    </div>
                    <span style={{
                      fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 99,
                      background: phase.status === "live" ? `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})` : phase.status === "upcoming" ? "#1A2D0A" : "#1A1A1A",
                      color: phase.status === "live" ? "#000" : phase.status === "upcoming" ? "#6BD672" : "#888"
                    }}>
                      {phase.status === "live" ? "🚀 Live Now" : phase.status === "upcoming" ? "🔨 In Progress" : "📋 Planned"}
                    </span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 8 }}>
                    {phase.features.map(f => (
                      <div key={f.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: s.bgSec, borderRadius: 8, fontSize: 13 }}>
                        <span style={{ color: f.status === "done" ? GOLD : f.status === "upcoming" ? "#6BD672" : "#555", flexShrink: 0 }}>
                          {f.status === "done" ? "✓" : f.status === "upcoming" ? "○" : "·"}
                        </span>
                        <span style={{ color: f.status === "done" ? s.text : f.status === "upcoming" ? s.textSec : s.textMuted }}>{f.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 60, background: "linear-gradient(135deg, #0A0800, #1A1200)", border: `1px solid ${GOLD_DARK}`, borderRadius: 16, padding: "32px", textAlign: "center" }}>
          <h2 style={{ color: "#F5F0E8", fontFamily: "'Sora', sans-serif", margin: "0 0 12px" }}>Have a Feature Request?</h2>
          <p style={{ color: "#888", fontSize: 14, margin: "0 0 20px" }}>We build based on what our users need. Tell us what you want!</p>
          <button style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, color: "#000", border: "none", padding: "12px 28px", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
            💬 Request a Feature
          </button>
        </div>
      </div>
    </div>
  );
}
