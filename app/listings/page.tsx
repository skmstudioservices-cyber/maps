"use client";
import { useState } from "react";
import Link from "next/link";

const GOLD = "#C9A84C";
const GOLD_DARK = "#A07830";

const BUSINESSES = [
  { id: 1, name: "The Grand Kitchen", cat: "Restaurants", city: "Delhi", area: "Connaught Place", rating: 4.8, reviews: 234, price: "$$$", initials: "GK", color: "#DC2626", bg: "#2D0A0A", desc: "Award-winning multi-cuisine restaurant with a global menu", verified: true, featured: true, open: true },
  { id: 2, name: "Apollo Hospital", cat: "Hospitals", city: "Delhi", area: "Sarita Vihar", rating: 4.9, reviews: 890, price: "$$$$", initials: "AH", color: "#059669", bg: "#0A2D1A", desc: "Leading multi-specialty hospital with 500+ specialists", verified: true, featured: true, open: true },
  { id: 3, name: "Hotel Leela Palace", cat: "Hotels", city: "New Delhi", area: "Chanakyapuri", rating: 4.7, reviews: 567, price: "$$$$", initials: "LP", color: "#C9A84C", bg: "#1A1200", desc: "5-star luxury palace hotel with world-class amenities", verified: true, featured: true, open: true },
  { id: 4, name: "PhoenixMarketCity", cat: "Shopping", city: "Delhi", area: "Navi Mumbai Road", rating: 4.5, reviews: 1203, price: "$$$", initials: "PM", color: "#7C3AED", bg: "#180A2D", desc: "Premier shopping mall with 300+ retail brands", verified: true, featured: true, open: true },
  { id: 5, name: "Gold's Gym", cat: "Fitness", city: "Gurgaon", area: "Sector 14", rating: 4.6, reviews: 345, price: "$$", initials: "GG", color: "#0891B2", bg: "#0A1A2D", desc: "World-class gym with certified personal trainers", verified: true, featured: false, open: true },
  { id: 6, name: "Luxe Salon & Spa", cat: "Beauty & Spa", city: "Delhi", area: "Lajpat Nagar", rating: 4.4, reviews: 178, price: "$$$", initials: "LS", color: "#9333EA", bg: "#180A2D", desc: "Premium unisex salon with luxury spa treatments", verified: true, featured: false, open: true },
  { id: 7, name: "AutoZone Service", cat: "Auto Services", city: "Noida", area: "Sector 62", rating: 4.1, reviews: 73, price: "$$", initials: "AU", color: "#DB2777", bg: "#2D0A1A", desc: "Complete auto repair for all major car brands", verified: true, featured: false, open: false },
  { id: 8, name: "DLF Cyber City", cat: "Real Estate", city: "Gurgaon", area: "DLF Phase 2", rating: 4.3, reviews: 289, price: "$$$$", initials: "DC", color: "#4F46E5", bg: "#0A0A2D", desc: "Premium office and residential spaces", verified: true, featured: false, open: true },
  { id: 9, name: "Spice Route", cat: "Restaurants", city: "Gorakhpur", area: "Main Market", rating: 4.3, reviews: 95, price: "$$", initials: "SR", color: "#EA580C", bg: "#2D1200", desc: "Authentic North Indian cuisine with heritage recipes", verified: false, featured: false, open: true },
  { id: 10, name: "City Hospital", cat: "Hospitals", city: "Gorakhpur", area: "Civil Lines", rating: 4.2, reviews: 156, price: "$$$", initials: "CH", color: "#059669", bg: "#0A2D1A", desc: "Multi-specialty hospital serving Gorakhpur since 1992", verified: true, featured: false, open: true },
  { id: 11, name: "QuickFix Home Services", cat: "Home Services", city: "Noida", area: "Sector 18", rating: 4.0, reviews: 215, price: "$", initials: "QF", color: "#D97706", bg: "#2D1A0A", desc: "One-stop home repair and maintenance services", verified: true, featured: false, open: true },
  { id: 12, name: "IIM Delhi", cat: "Education", city: "Delhi", area: "Vasant Kunj", rating: 4.9, reviews: 445, price: "$$$$", initials: "ID", color: "#0EA5E9", bg: "#0A1A2D", desc: "Top-ranked management institute with MBA programs", verified: true, featured: false, open: true },
];

const CATEGORIES = ["All", "Restaurants", "Hotels", "Hospitals", "Beauty & Spa", "Auto Services", "Education", "Finance", "Fitness", "Home Services", "Legal", "Real Estate", "Shopping"];
const CITIES = ["All Cities", "Delhi", "New Delhi", "Noida", "Gurgaon", "Gorakhpur", "Faridabad", "Ghaziabad"];

export default function ListingsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [city, setCity] = useState("All Cities");
  const [sort, setSort] = useState("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const s = { bg: "var(--bg)", bgSec: "var(--bg-secondary)", bgCard: "var(--bg-card)", text: "var(--text-primary)", textSec: "var(--text-secondary)", textMuted: "var(--text-muted)", border: "var(--border)" };

  const filtered = BUSINESSES.filter(b => {
    const mSearch = !search || b.name.toLowerCase().includes(search.toLowerCase()) || b.desc.toLowerCase().includes(search.toLowerCase());
    const mCat = category === "All" || b.cat === category;
    const mCity = city === "All Cities" || b.city === city;
    return mSearch && mCat && mCity;
  }).sort((a, b) => sort === "rating" ? b.rating - a.rating : sort === "reviews" ? b.reviews - a.reviews : (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  return (
    <div style={{ background: s.bg, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <nav style={{ background: s.bgCard, borderBottom: `1px solid ${s.border}`, padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>📍</div>
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 15, color: s.text }}>SKM Studio <span style={{ color: GOLD }}>Maps</span></span>
        </Link>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Link href="/add-business" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, color: "#000", fontSize: 13, fontWeight: 700, padding: "8px 14px", borderRadius: 8, textDecoration: "none" }}>+ List Business</Link>
        </div>
      </nav>

      {/* Search bar */}
      <div style={{ background: s.bgCard, borderBottom: `1px solid ${s.border}`, padding: "16px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 200, display: "flex", alignItems: "center", background: s.bgSec, borderRadius: 8, padding: "0 14px", gap: 8, border: `1px solid ${s.border}` }}>
              <span style={{ color: s.textMuted }}>🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search businesses..." style={{ flex: 1, border: "none", background: "none", padding: "10px 0", fontSize: 14, outline: "none", color: s.text }} />
            </div>
            <select value={city} onChange={e => setCity(e.target.value)} style={{ padding: "10px 14px", border: `1px solid ${s.border}`, borderRadius: 8, fontSize: 14, background: s.bgCard, color: s.text, cursor: "pointer" }}>
              {CITIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: "10px 14px", border: `1px solid ${s.border}`, borderRadius: 8, fontSize: 14, background: s.bgCard, color: s.text, cursor: "pointer" }}>
              <option value="relevance">Relevance</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviews</option>
            </select>
            <div style={{ display: "flex", gap: 4 }}>
              {(["grid", "list"] as const).map(v => (
                <button key={v} onClick={() => setViewMode(v)} style={{ padding: "10px 12px", border: `1px solid ${viewMode === v ? GOLD : s.border}`, borderRadius: 8, cursor: "pointer", background: viewMode === v ? `rgba(201,168,76,0.1)` : s.bgCard, color: viewMode === v ? GOLD : s.textMuted, fontSize: 16 }}>
                  {v === "grid" ? "⊞" : "☰"}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)} style={{ background: c === category ? `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})` : s.bgSec, color: c === category ? "#000" : s.textMuted, border: `1px solid ${c === category ? GOLD : s.border}`, padding: "5px 14px", borderRadius: 99, fontSize: 13, cursor: "pointer", fontWeight: c === category ? 700 : 400 }}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <span style={{ color: s.textMuted, fontSize: 14 }}>Showing {filtered.length} of {BUSINESSES.length} businesses</span>
          <Link href="/add-business" style={{ color: GOLD, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>Can't find your business? Add it →</Link>
        </div>

        {viewMode === "grid" ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
            {filtered.map(biz => (
              <Link key={biz.id} href={`/b/${biz.id}`} style={{ textDecoration: "none" }}>
                <div style={{ background: s.bgCard, border: `1px solid ${s.border}`, borderRadius: 14, overflow: "hidden", cursor: "pointer" }}>
                  <div style={{ background: biz.bg, height: 100, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    <div style={{ position: "absolute", top: 8, left: 8, display: "flex", gap: 6 }}>
                      {biz.verified && <span style={{ background: "#0D2B1F", border: "1px solid #10B98140", color: "#10B981", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 99 }}>✓ Verified</span>}
                    </div>
                    {biz.featured && <div style={{ position: "absolute", top: 8, right: 8 }}><span style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, color: "#000", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99 }}>⭐ Featured</span></div>}
                    <div style={{ width: 56, height: 56, borderRadius: 14, background: biz.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 16 }}>{biz.initials}</div>
                  </div>
                  <div style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontWeight: 700, fontSize: 15, color: s.text }}>{biz.name}</span>
                      <span style={{ color: GOLD, fontSize: 13 }}>{biz.price}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                      <span style={{ color: "#F59E0B", fontSize: 13 }}>{"★".repeat(Math.floor(biz.rating))}{"☆".repeat(5 - Math.floor(biz.rating))}</span>
                      <span style={{ fontWeight: 700, fontSize: 13, color: s.text }}>{biz.rating}</span>
                      <span style={{ color: s.textMuted, fontSize: 12 }}>({biz.reviews})</span>
                    </div>
                    <p style={{ color: s.textMuted, fontSize: 13, margin: "0 0 10px", lineHeight: 1.4 }}>{biz.desc}</p>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      <span style={{ background: "rgba(201,168,76,0.1)", border: `1px solid ${GOLD}30`, color: GOLD, fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 99 }}>{biz.cat}</span>
                      <span style={{ background: biz.open ? "#0D2B1F" : "#2D0A0A", border: `1px solid ${biz.open ? "#10B98130" : "#EF444430"}`, color: biz.open ? "#10B981" : "#EF4444", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 99 }}>
                        {biz.open ? "● Open" : "● Closed"}
                      </span>
                      <span style={{ color: s.textMuted, fontSize: 11, padding: "2px 4px" }}>📍 {biz.city}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtered.map(biz => (
              <Link key={biz.id} href={`/b/${biz.id}`} style={{ textDecoration: "none" }}>
                <div style={{ background: s.bgCard, border: `1px solid ${s.border}`, borderRadius: 12, padding: "16px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: biz.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{biz.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontWeight: 700, fontSize: 15, color: s.text }}>{biz.name}</span>
                      <span style={{ color: GOLD, fontSize: 13 }}>{biz.price}</span>
                    </div>
                    <div style={{ display: "flex", gap: 6, alignItems: "center", margin: "4px 0" }}>
                      <span style={{ color: "#F59E0B", fontSize: 12 }}>{"★".repeat(Math.floor(biz.rating))}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: s.text }}>{biz.rating}</span>
                      <span style={{ fontSize: 12, color: s.textMuted }}>({biz.reviews})</span>
                      <span style={{ color: s.textMuted, fontSize: 12 }}>· 📍 {biz.area}, {biz.city}</span>
                    </div>
                    <p style={{ margin: "4px 0 0", color: s.textMuted, fontSize: 13 }}>{biz.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
