"use client";
import { useState } from "react";
import Link from "next/link";

const GOLD = "#C9A84C";
const GOLD_DARK = "#A07830";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const s = { bg: "var(--bg)", bgSec: "var(--bg-secondary)", bgCard: "var(--bg-card)", text: "var(--text-primary)", textSec: "var(--text-secondary)", textMuted: "var(--text-muted)", border: "var(--border)" };

  const myBusinesses = [
    { name: "The Grand Kitchen", cat: "Restaurant", city: "Delhi", status: "active", plan: "featured", views: 347, calls: 28, rating: 4.5 },
    { name: "Sharma Sweets", cat: "Bakery", city: "Gorakhpur", status: "pending", plan: "free", views: 0, calls: 0, rating: 0 },
  ];

  return (
    <div style={{ background: s.bg, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Nav */}
      <nav style={{ background: s.bgCard, borderBottom: `1px solid ${s.border}`, padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>📍</div>
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 15, color: s.text }}>SKM Studio <span style={{ color: GOLD }}>Maps</span></span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/add-business" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, color: "#000", padding: "8px 16px", borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: "none" }}>+ Add Business</Link>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: 700, fontSize: 14 }}>RS</div>
        </div>
      </nav>

      <div style={{ display: "flex", height: "calc(100vh - 60px)" }}>
        {/* Sidebar */}
        <div style={{ width: 240, background: s.bgCard, borderRight: `1px solid ${s.border}`, padding: "24px 16px", flexShrink: 0 }}>
          <div style={{ marginBottom: 8, padding: "8px 12px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: s.textMuted, textTransform: "uppercase", letterSpacing: 1 }}>Menu</div>
          </div>
          {[
            ["overview", "📊 Overview"],
            ["businesses", "🏢 My Businesses"],
            ["reviews", "⭐ Reviews"],
            ["analytics", "📈 Analytics"],
            ["settings", "⚙️ Settings"],
          ].map(([id, label]) => (
            <button key={id} onClick={() => setActiveTab(id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, border: "none", background: activeTab === id ? `rgba(201,168,76,0.1)` : "transparent", color: activeTab === id ? GOLD : s.textSec, fontWeight: activeTab === id ? 700 : 400, fontSize: 14, cursor: "pointer", marginBottom: 2 }}>
              {label}
            </button>
          ))}

          <div style={{ marginTop: 24, padding: "16px", background: "rgba(201,168,76,0.08)", border: `1px solid ${GOLD}30`, borderRadius: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: GOLD, marginBottom: 6 }}>⚡ Pre-launch ends soon!</div>
            <div style={{ fontSize: 11, color: s.textMuted, marginBottom: 10 }}>Upgrade to Featured for ₹999/year</div>
            <Link href="/pricing" style={{ display: "block", textAlign: "center", background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, color: "#000", padding: "7px", borderRadius: 6, fontWeight: 700, fontSize: 12, textDecoration: "none" }}>Upgrade Now</Link>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, overflow: "auto", padding: "28px 32px" }}>
          {activeTab === "overview" && (
            <div>
              <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 700, color: s.text, margin: "0 0 24px" }}>Welcome back, Rahul 👋</h1>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
                {[["🏢", "Businesses", "2", "+1 this month"], ["👁️", "Total Views", "347", "+23% vs last week"], ["📞", "Call Clicks", "28", "+12 this week"], ["⭐", "Avg Rating", "4.5", "Based on 58 reviews"]].map(([icon, label, val, sub]) => (
                  <div key={label} style={{ background: s.bgCard, border: `1px solid ${s.border}`, borderRadius: 12, padding: "18px" }}>
                    <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
                    <div style={{ fontSize: 11, color: s.textMuted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: 28, fontWeight: 800, color: s.text, fontFamily: "'Sora', sans-serif" }}>{val}</div>
                    <div style={{ fontSize: 11, color: "#10B981", marginTop: 4 }}>{sub}</div>
                  </div>
                ))}
              </div>

              {/* My listings */}
              <h2 style={{ fontSize: 16, fontWeight: 700, color: s.text, margin: "0 0 14px" }}>My Listings</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {myBusinesses.map(biz => (
                  <div key={biz.name} style={{ background: s.bgCard, border: `1px solid ${s.border}`, borderRadius: 12, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: s.text }}>{biz.name}</div>
                      <div style={{ fontSize: 13, color: s.textMuted, marginTop: 2 }}>{biz.cat} · {biz.city}</div>
                      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                        <span style={{ background: biz.status === "active" ? "#0D2B1F" : "#2D1A0A", color: biz.status === "active" ? "#10B981" : "#F59E0B", fontSize: 11, padding: "2px 8px", borderRadius: 99, fontWeight: 600 }}>
                          {biz.status === "active" ? "● Active" : "⏳ Pending Review"}
                        </span>
                        <span style={{ background: biz.plan === "featured" ? "rgba(201,168,76,0.1)" : "var(--bg-secondary)", color: biz.plan === "featured" ? GOLD : s.textMuted, fontSize: 11, padding: "2px 8px", borderRadius: 99, fontWeight: 600 }}>
                          {biz.plan === "featured" ? "⭐ Featured" : "Free"}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 24, textAlign: "center" }}>
                      {[["Views", biz.views], ["Calls", biz.calls]].map(([l, v]) => (
                        <div key={l as string}>
                          <div style={{ fontSize: 20, fontWeight: 800, color: GOLD, fontFamily: "'Sora', sans-serif" }}>{v}</div>
                          <div style={{ fontSize: 11, color: s.textMuted }}>{l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 700, color: s.text, margin: 0 }}>Analytics Dashboard</h1>
                <span style={{ background: "rgba(201,168,76,0.1)", border: `1px solid ${GOLD}30`, color: GOLD, fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 99 }}>Coming Soon with Premium Plan</span>
              </div>
              <div style={{ background: s.bgCard, border: `1px solid ${s.border}`, borderRadius: 16, padding: "48px", textAlign: "center" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
                <h2 style={{ color: s.text, fontFamily: "'Sora', sans-serif", margin: "0 0 8px" }}>Analytics Coming Soon</h2>
                <p style={{ color: s.textMuted, fontSize: 14, marginBottom: 24 }}>Upgrade to Premium (₹4,999/month) to get detailed analytics including views, clicks, call tracking, and customer insights.</p>
                <Link href="/pricing" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, color: "#000", padding: "12px 28px", borderRadius: 10, fontWeight: 700, textDecoration: "none", display: "inline-block" }}>View Plans</Link>
              </div>
            </div>
          )}

          {(activeTab === "reviews" || activeTab === "businesses" || activeTab === "settings") && (
            <div style={{ background: s.bgCard, border: `1px solid ${s.border}`, borderRadius: 16, padding: "48px", textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🚧</div>
              <h2 style={{ color: s.text, fontFamily: "'Sora', sans-serif", margin: "0 0 8px", textTransform: "capitalize" }}>{activeTab} — Coming Soon</h2>
              <p style={{ color: s.textMuted, fontSize: 14 }}>This section is under development. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
