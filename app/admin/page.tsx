"use client";
import { useState } from "react";
import Link from "next/link";

const GOLD = "#C9A84C";
const GOLD_DARK = "#A07830";

const BUSINESSES = [
  { id: 1, name: "The Grand Kitchen", cat: "Restaurants", city: "Delhi", rating: 4.8, status: "published", plan: "featured", verified: true, submitter: "Owner" },
  { id: 2, name: "Apollo Hospital", cat: "Hospitals", city: "Delhi", rating: 4.9, status: "published", plan: "featured", verified: true, submitter: "Owner" },
  { id: 3, name: "Hotel Leela Palace", cat: "Hotels", city: "New Delhi", rating: 4.7, status: "published", plan: "featured", verified: true, submitter: "Owner" },
  { id: 4, name: "PhoenixMarketCity", cat: "Shopping", city: "Delhi", rating: 4.5, status: "published", plan: "featured", verified: true, submitter: "Owner" },
  { id: 5, name: "Gold's Gym", cat: "Fitness", city: "Gurgaon", rating: 4.6, status: "published", plan: "free", verified: true, submitter: "Community" },
  { id: 6, name: "Spice Route", cat: "Restaurants", city: "Gorakhpur", rating: 4.3, status: "pending", plan: "free", verified: false, submitter: "Community" },
  { id: 7, name: "New Business", cat: "Retail", city: "Noida", rating: 0, status: "pending", plan: "featured", verified: false, submitter: "Owner" },
];

export default function AdminPage() {
  const [tab, setTab] = useState("businesses");
  const [businesses, setBusinesses] = useState(BUSINESSES);
  const s = { bg: "var(--bg)", bgSec: "var(--bg-secondary)", bgCard: "var(--bg-card)", text: "var(--text-primary)", textSec: "var(--text-secondary)", textMuted: "var(--text-muted)", border: "var(--border)" };

  const approve = (id: number) => setBusinesses(p => p.map(b => b.id === id ? { ...b, status: "published", verified: true } : b));
  const reject = (id: number) => setBusinesses(p => p.filter(b => b.id !== id));

  const stats = {
    total: businesses.length,
    published: businesses.filter(b => b.status === "published").length,
    pending: businesses.filter(b => b.status === "pending").length,
    featured: businesses.filter(b => b.plan === "featured").length,
  };

  return (
    <div style={{ background: s.bg, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <nav style={{ background: "#0A0A0A", borderBottom: `1px solid #1A1A1A`, padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>📍</div>
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 15, color: "#F5F0E8" }}>SKM Studio <span style={{ color: GOLD }}>Maps</span></span>
          <span style={{ background: "#1A1A1A", color: "#888", fontSize: 11, padding: "2px 8px", borderRadius: 4, fontWeight: 500 }}>Admin</span>
        </div>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <Link href="/" style={{ color: "#666", fontSize: 13, textDecoration: "none" }}>🔗 View Site</Link>
          <Link href="/login" style={{ color: "#666", fontSize: 13, textDecoration: "none" }}>→ Logout</Link>
        </div>
      </nav>

      {/* Stats */}
      <div style={{ background: "#111", borderBottom: "1px solid #1A1A1A", padding: "20px 32px", display: "flex", gap: 20, flexWrap: "wrap" }}>
        {[["🏢", "Total", stats.total, "#EEF2FF"], ["✅", "Published", stats.published, "#ECFDF5"], ["⏳", "Pending", stats.pending, "#FFF8E8"], ["⭐", "Featured", stats.featured, "#1A1200"]].map(([icon, label, val, bg]) => (
          <div key={label as string} style={{ background: bg, borderRadius: 12, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", minWidth: 160, flex: 1, border: `1px solid rgba(201,168,76,0.1)` }}>
            <div>
              <div style={{ fontSize: 11, color: "#888", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: GOLD, fontFamily: "'Sora', sans-serif" }}>{val}</div>
            </div>
            <span style={{ fontSize: 28 }}>{icon}</span>
          </div>
        ))}
      </div>

      <div style={{ padding: "24px 32px" }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20, background: s.bgCard, borderRadius: 10, padding: 4, width: "fit-content", border: `1px solid ${s.border}` }}>
          {[["businesses", "🏢 Businesses"], ["categories", "📁 Categories"], ["reviews", "⭐ Reviews"], ["feedback", "💬 Feedback"]].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{ padding: "7px 16px", borderRadius: 7, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, background: tab === id ? `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})` : "none", color: tab === id ? "#000" : s.textMuted }}>
              {label}
            </button>
          ))}
        </div>

        <div style={{ background: s.bgCard, border: `1px solid ${s.border}`, borderRadius: 14, overflow: "hidden" }}>
          <div style={{ padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${s.border}` }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: s.text }}>All Businesses ({businesses.length})</h3>
            <Link href="/add-business" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, color: "#000", padding: "8px 16px", borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: "none" }}>+ Add Business</Link>
          </div>

          {/* Pending alerts */}
          {stats.pending > 0 && (
            <div style={{ padding: "12px 24px", background: "rgba(255,165,0,0.05)", borderBottom: `1px solid ${s.border}`, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ background: "#F59E0B", color: "#000", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 99 }}>⏳ {stats.pending} Pending</span>
              <span style={{ color: s.textMuted, fontSize: 13 }}>Review and approve new business submissions</span>
            </div>
          )}

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: s.bgSec }}>
                {["Business", "Category", "City", "Rating", "Plan", "Status", "Submitter", "Actions"].map(h => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: s.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: `1px solid ${s.border}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {businesses.map(biz => (
                <tr key={biz.id} style={{ borderBottom: `1px solid ${s.border}` }}>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: s.text }}>{biz.name}</div>
                    {biz.verified && <span style={{ color: "#10B981", fontSize: 11 }}>✓ Verified</span>}
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 14, color: s.textMuted }}>{biz.cat}</td>
                  <td style={{ padding: "12px 16px", fontSize: 14, color: s.textMuted }}>{biz.city}</td>
                  <td style={{ padding: "12px 16px" }}>
                    {biz.rating > 0 ? <span style={{ background: "#DCFCE7", color: "#166534", fontSize: 12, fontWeight: 700, padding: "2px 8px", borderRadius: 6 }}>{biz.rating}</span> : <span style={{ color: s.textMuted, fontSize: 12 }}>—</span>}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ background: biz.plan === "featured" ? `rgba(201,168,76,0.15)` : s.bgSec, color: biz.plan === "featured" ? GOLD : s.textMuted, fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 99 }}>
                      {biz.plan === "featured" ? "⭐ Featured" : "Free"}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ background: biz.status === "published" ? "#DCFCE7" : "#FEF3C7", color: biz.status === "published" ? "#166534" : "#92400E", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 99 }}>
                      {biz.status === "published" ? "● Active" : "⏳ Pending"}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: s.textMuted }}>{biz.submitter}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      {biz.status === "pending" && (
                        <button onClick={() => approve(biz.id)} style={{ background: "#DCFCE7", color: "#166534", border: "none", padding: "5px 10px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Approve</button>
                      )}
                      <button style={{ background: "#EFF6FF", color: "#2563EB", border: "none", padding: "6px 8px", borderRadius: 6, cursor: "pointer", fontSize: 13 }}>✏️</button>
                      <button onClick={() => reject(biz.id)} style={{ background: "#FEF2F2", color: "#EF4444", border: "none", padding: "6px 8px", borderRadius: 6, cursor: "pointer", fontSize: 13 }}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
