/*
 * ============================================================
 * FILE: app/admin/page.tsx
 * BRANCH: feature/admin-control
 * PURPOSE: The full Admin Panel for the site OWNER (you).
 *
 * WHAT THIS FILE DOES:
 * - Shows you all submitted businesses and lets you Approve or Reject them.
 * - Shows key stats (total, pending, featured).
 * - Has tabs for Businesses, Categories, Reviews, and Feedback.
 *
 * HOW TO ACCESS:
 * - Go to your site URL + /admin
 * - Example: https://maps.skmstudio.com/admin
 *
 * ADMIN EMAIL (skmstudio.services@gmail.com):
 * - Only this email should be able to reach this page.
 * - Full auth-guard to be added once Supabase auth is connected.
 *
 * WHEN TO MERGE TO MAIN:
 * - Once you are happy approving/rejecting businesses from here.
 * ============================================================
 */

"use client";

import { useState } from "react";
import Link from "next/link";

// --- BRAND COLORS ---
const GOLD = "#C9A84C";
const GOLD_DARK = "#A07830";

// -----------------------------------------------
// ADMIN EMAIL — future auth check will use this.
// Only skmstudio.services@gmail.com gets access.
// -----------------------------------------------
const ADMIN_EMAIL = "skmstudio.services@gmail.com";

// -----------------------------------------------
// DEMO DATA — Replace with real Supabase queries
// when database is connected.
// -----------------------------------------------
const DEMO_BUSINESSES = [
  {
    id: 1,
    name: "The Grand Kitchen",
    cat: "Restaurants",
    city: "Delhi",
    rating: 4.8,
    status: "published",
    plan: "featured",
    verified: true,
    submitter: "Owner",
    email: "grand@kitchen.com",
    phone: "+91 98765 43210",
    submittedAt: "2026-03-01",
  },
  {
    id: 2,
    name: "Apollo Hospital",
    cat: "Hospitals",
    city: "Delhi",
    rating: 4.9,
    status: "published",
    plan: "featured",
    verified: true,
    submitter: "Owner",
    email: "info@apollo.in",
    phone: "+91 11 2600 1066",
    submittedAt: "2026-03-02",
  },
  {
    id: 3,
    name: "Spice Route",
    cat: "Restaurants",
    city: "Gorakhpur",
    rating: 4.3,
    status: "pending",
    plan: "free",
    verified: false,
    submitter: "Community",
    email: "",
    phone: "",
    submittedAt: "2026-03-09",
  },
  {
    id: 4,
    name: "New Business – Awaiting Review",
    cat: "Retail",
    city: "Noida",
    rating: 0,
    status: "pending",
    plan: "featured",
    verified: false,
    submitter: "Owner",
    email: "new@biz.com",
    phone: "+91 90000 00000",
    submittedAt: "2026-03-10",
  },
];

// -----------------------------------------------
// TABS AVAILABLE IN THE ADMIN PANEL
// -----------------------------------------------
const TABS = [
  { id: "businesses", label: "🏢 Businesses" },
  { id: "leads", label: "📋 Leads" },
  { id: "settings", label: "⚙️ Settings" },
  { id: "feedback", label: "💬 Feedback" },
];

// -----------------------------------------------
// MAIN ADMIN PAGE COMPONENT
// -----------------------------------------------
export default function AdminPage() {
  const [tab, setTab] = useState("businesses");
  const [businesses, setBusinesses] = useState(DEMO_BUSINESSES);
  const [selectedBiz, setSelectedBiz] = useState<typeof DEMO_BUSINESSES[0] | null>(null);

  // Style tokens (reads from globals.css CSS variables)
  const s = {
    bg: "var(--bg)",
    bgSec: "var(--bg-secondary)",
    bgCard: "var(--bg-card)",
    text: "var(--text-primary)",
    textSec: "var(--text-secondary)",
    textMuted: "var(--text-muted)",
    border: "var(--border)",
  };

  // --- APPROVE a business (changes status to "published") ---
  const approve = (id: number) =>
    setBusinesses((p) =>
      p.map((b) => (b.id === id ? { ...b, status: "published", verified: true } : b))
    );

  // --- REJECT a business (removes it from the list) ---
  const reject = (id: number) => {
    setBusinesses((p) => p.filter((b) => b.id !== id));
    if (selectedBiz?.id === id) setSelectedBiz(null);
  };

  // --- STATS SUMMARY ---
  const stats = {
    total: businesses.length,
    published: businesses.filter((b) => b.status === "published").length,
    pending: businesses.filter((b) => b.status === "pending").length,
    featured: businesses.filter((b) => b.plan === "featured").length,
  };

  return (
    <div style={{ background: s.bg, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>

      {/* ─── TOP NAVIGATION BAR ─── */}
      <nav style={{ background: "#0A0A0A", borderBottom: "1px solid #1A1A1A", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>📍</div>
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 15, color: "#F5F0E8" }}>
            SKM Studio <span style={{ color: GOLD }}>Maps</span>
          </span>
          <span style={{ background: "#1A1A1A", color: GOLD, fontSize: 11, padding: "2px 10px", borderRadius: 4, fontWeight: 700, border: `1px solid ${GOLD}30` }}>
            ADMIN
          </span>
        </div>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <span style={{ color: "#555", fontSize: 12 }}>{ADMIN_EMAIL}</span>
          <Link href="/" style={{ color: "#666", fontSize: 13, textDecoration: "none" }}>🔗 View Site</Link>
          <Link href="/login" style={{ color: "#666", fontSize: 13, textDecoration: "none" }}>→ Logout</Link>
        </div>
      </nav>

      {/* ─── STATS ROW ─── */}
      <div style={{ background: "#111", borderBottom: "1px solid #1A1A1A", padding: "20px 32px", display: "flex", gap: 16, flexWrap: "wrap" }}>
        {[
          ["🏢", "Total Listings", stats.total, GOLD],
          ["✅", "Live & Active", stats.published, "#10B981"],
          ["⏳", "Pending Review", stats.pending, "#F59E0B"],
          ["⭐", "Featured (Paid)", stats.featured, GOLD],
        ].map(([icon, label, val, color]) => (
          <div key={label as string} style={{ background: "#1A1A1A", borderRadius: 12, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", minWidth: 160, flex: 1, border: "1px solid #2A2A2A" }}>
            <div>
              <div style={{ fontSize: 11, color: "#555", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: color as string, fontFamily: "'Sora', sans-serif" }}>{val}</div>
            </div>
            <span style={{ fontSize: 28 }}>{icon}</span>
          </div>
        ))}
      </div>

      {/* ─── TABS ─── */}
      <div style={{ padding: "24px 32px 0" }}>
        <div style={{ display: "flex", gap: 4, background: s.bgCard, borderRadius: 10, padding: 4, width: "fit-content", border: `1px solid ${s.border}`, marginBottom: 24 }}>
          {TABS.map(({ id, label }) => (
            <button key={id} onClick={() => setTab(id)} style={{ padding: "7px 18px", borderRadius: 7, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, background: tab === id ? `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})` : "none", color: tab === id ? "#000" : s.textMuted }}>
              {label}
            </button>
          ))}
        </div>

        {/* ─── BUSINESSES TAB ─── */}
        {tab === "businesses" && (
          <div style={{ display: "grid", gridTemplateColumns: selectedBiz ? "1fr 380px" : "1fr", gap: 20 }}>

            {/* Business Table */}
            <div style={{ background: s.bgCard, border: `1px solid ${s.border}`, borderRadius: 14, overflow: "hidden" }}>
              <div style={{ padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${s.border}` }}>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: s.text }}>
                  All Businesses ({businesses.length})
                </h3>
                <Link href="/add-business" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, color: "#000", padding: "8px 16px", borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: "none" }}>
                  + Add Business
                </Link>
              </div>

              {/* Pending alert */}
              {stats.pending > 0 && (
                <div style={{ padding: "12px 24px", background: "rgba(245,158,11,0.06)", borderBottom: `1px solid ${s.border}`, display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ background: "#F59E0B", color: "#000", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 99 }}>
                    ⏳ {stats.pending} Pending
                  </span>
                  <span style={{ color: s.textMuted, fontSize: 13 }}>Review and approve new submissions below.</span>
                </div>
              )}

              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: s.bgSec }}>
                    {["Business", "City", "Plan", "Status", "Actions"].map((h) => (
                      <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: s.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: `1px solid ${s.border}` }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {businesses.map((biz) => (
                    <tr key={biz.id} style={{ borderBottom: `1px solid ${s.border}`, cursor: "pointer", background: selectedBiz?.id === biz.id ? `${GOLD}08` : "transparent" }} onClick={() => setSelectedBiz(biz)}>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ fontWeight: 600, fontSize: 14, color: s.text }}>{biz.name}</div>
                        <div style={{ fontSize: 12, color: s.textMuted }}>{biz.cat} · {biz.submitter}</div>
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: s.textMuted }}>{biz.city}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{ background: biz.plan === "featured" ? `${GOLD}20` : s.bgSec, color: biz.plan === "featured" ? GOLD : s.textMuted, fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 99 }}>
                          {biz.plan === "featured" ? "⭐ Featured" : "Free"}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{ background: biz.status === "published" ? "#0D2B1F" : "#2D1A00", color: biz.status === "published" ? "#10B981" : "#F59E0B", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 99 }}>
                          {biz.status === "published" ? "● Live" : "⏳ Pending"}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", gap: 6 }}>
                          {biz.status === "pending" && (
                            <button onClick={(e) => { e.stopPropagation(); approve(biz.id); }} style={{ background: "#0D2B1F", color: "#10B981", border: "1px solid #10B98130", padding: "5px 12px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 700 }}>
                              ✓ Approve
                            </button>
                          )}
                          <button onClick={(e) => { e.stopPropagation(); reject(biz.id); }} style={{ background: "#2D0A0A", color: "#EF4444", border: "1px solid #EF444430", padding: "6px 8px", borderRadius: 6, cursor: "pointer", fontSize: 13 }}>
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ─── DETAIL PANEL (shows when you click a row) ─── */}
            {selectedBiz && (
              <div style={{ background: s.bgCard, border: `1px solid ${s.border}`, borderRadius: 14, padding: 24, height: "fit-content" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: s.text }}>Business Details</h3>
                  <button onClick={() => setSelectedBiz(null)} style={{ background: "none", border: "none", color: s.textMuted, fontSize: 18, cursor: "pointer" }}>✕</button>
                </div>
                {[
                  ["Business Name", selectedBiz.name],
                  ["Category", selectedBiz.cat],
                  ["City", selectedBiz.city],
                  ["Submitted By", selectedBiz.submitter],
                  ["Submitted On", selectedBiz.submittedAt],
                  ["Email", selectedBiz.email || "—"],
                  ["Phone", selectedBiz.phone || "—"],
                  ["Plan", selectedBiz.plan],
                  ["Status", selectedBiz.status],
                ].map(([label, value]) => (
                  <div key={label} style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 11, color: s.textMuted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: 14, color: s.text, fontWeight: 500 }}>{value}</div>
                  </div>
                ))}
                <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                  {selectedBiz.status === "pending" && (
                    <button onClick={() => approve(selectedBiz.id)} style={{ flex: 1, background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, color: "#000", border: "none", padding: "11px", borderRadius: 8, fontWeight: 700, cursor: "pointer" }}>
                      ✓ Approve Listing
                    </button>
                  )}
                  <button onClick={() => reject(selectedBiz.id)} style={{ background: "#2D0A0A", color: "#EF4444", border: "1px solid #EF444430", padding: "11px 14px", borderRadius: 8, cursor: "pointer" }}>
                    🗑️ Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── OTHER TABS (placeholder content) ─── */}
        {tab !== "businesses" && (
          <div style={{ background: s.bgCard, border: `1px solid ${s.border}`, borderRadius: 14, padding: "60px 40px", textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🚧</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: s.text, marginBottom: 8 }}>Coming Soon</div>
            <div style={{ fontSize: 14, color: s.textMuted }}>This section will be ready in the next update.</div>
          </div>
        )}
      </div>
    </div>
  );
}
