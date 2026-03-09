"use client";
import { useState } from "react";
import Link from "next/link";
import { use } from "react";

const GOLD = "#C9A84C";
const GOLD_DARK = "#A07830";

const BUSINESSES: Record<string, { name: string; cat: string; city: string; area: string; rating: number; reviews: number; price: string; initials: string; color: string; bg: string; desc: string; verified: boolean; featured: boolean; phone: string; email: string; website: string; address: string; amenities: string[]; tags: string[] }> = {
  "1": { name: "The Grand Kitchen", cat: "Restaurants", city: "Delhi", area: "Connaught Place", rating: 4.8, reviews: 234, price: "$$$", initials: "GK", color: "#DC2626", bg: "#2D0A0A", desc: "Award-winning multi-cuisine restaurant offering cuisines from around the world. Known for exceptional service and premium ingredients.", verified: true, featured: true, phone: "+91 98765 43210", email: "info@grandkitchen.com", website: "https://grandkitchen.com", address: "42 CP Inner Circle, Connaught Place, Delhi 110001", amenities: ["AC", "Parking", "WiFi", "Home Delivery", "Takeaway", "Outdoor Seating"], tags: ["Multi-cuisine", "Fine dining", "Family restaurant"] },
  "2": { name: "Apollo Hospital", cat: "Hospitals", city: "Delhi", area: "Sarita Vihar", rating: 4.9, reviews: 890, price: "$$$$", initials: "AH", color: "#059669", bg: "#0A2D1A", desc: "Leading multi-specialty hospital with 500+ specialists across all medical disciplines. NABH accredited.", verified: true, featured: true, phone: "+91 11 2600 1066", email: "info@apollo.in", website: "https://apollohospitals.com", address: "Sarita Vihar, New Delhi 110076", amenities: ["24/7 Emergency", "ICU", "Operation Theatre", "Pharmacy", "Lab", "Ambulance"], tags: ["Multi-specialty", "NABH accredited", "24/7 emergency"] },
  "3": { name: "Hotel Leela Palace", cat: "Hotels", city: "New Delhi", area: "Chanakyapuri", rating: 4.7, reviews: 567, price: "$$$$", initials: "LP", color: "#C9A84C", bg: "#1A1200", desc: "5-star luxury palace hotel offering world-class hospitality, exquisite dining, and unmatched comfort in the heart of New Delhi.", verified: true, featured: true, phone: "+91 11 3933 1234", email: "reservations@theleela.com", website: "https://theleela.com", address: "Diplomatic Enclave, Chanakyapuri, New Delhi 110023", amenities: ["Pool", "Spa", "Restaurant", "Bar", "Gym", "Concierge", "Valet Parking"], tags: ["Luxury hotel", "5-star", "Business travel", "Honeymoon"] },
};

export default function BusinessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const biz = BUSINESSES[id];
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const s = { bg: "var(--bg)", bgSec: "var(--bg-secondary)", bgCard: "var(--bg-card)", text: "var(--text-primary)", textSec: "var(--text-secondary)", textMuted: "var(--text-muted)", border: "var(--border)" };

  if (!biz) return (
    <div style={{ background: s.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
        <h2 style={{ color: s.text }}>Business not found</h2>
        <Link href="/listings" style={{ color: GOLD }}>← Back to listings</Link>
      </div>
    </div>
  );

  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  const today = days[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];

  return (
    <div style={{ background: s.bg, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <nav style={{ background: s.bgCard, borderBottom: `1px solid ${s.border}`, padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>📍</div>
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 15, color: s.text }}>SKM Studio <span style={{ color: GOLD }}>Maps</span></span>
        </Link>
      </nav>

      {/* Breadcrumb */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "12px 24px 0" }}>
        <div style={{ display: "flex", gap: 8, fontSize: 13, color: s.textMuted, alignItems: "center" }}>
          <Link href="/" style={{ color: s.textMuted, textDecoration: "none" }}>Home</Link>
          <span>›</span>
          <Link href="/listings" style={{ color: s.textMuted, textDecoration: "none" }}>{biz.cat}</Link>
          <span>›</span>
          <span style={{ color: s.text }}>{biz.name}</span>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "16px 24px 60px", display: "grid", gridTemplateColumns: "1fr 300px", gap: 24 }}>
        <div>
          {/* Header */}
          <div style={{ background: s.bgCard, border: `1px solid ${s.border}`, borderRadius: 14, overflow: "hidden", marginBottom: 20 }}>
            <div style={{ background: biz.bg, height: 120, position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.05) 0%, transparent 70%)` }} />
            </div>
            <div style={{ padding: "0 24px 24px" }}>
              <div style={{ display: "flex", gap: 20, marginTop: -32, flexWrap: "wrap" }}>
                <div style={{ width: 72, height: 72, borderRadius: 16, background: biz.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 20, border: `3px solid ${s.bgCard}`, flexShrink: 0 }}>{biz.initials}</div>
                <div style={{ flex: 1, paddingTop: 36 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                        <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 700, color: s.text, margin: 0 }}>{biz.name}</h1>
                        {biz.verified && <span style={{ background: "#0D2B1F", border: "1px solid #10B98140", color: "#10B981", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 99 }}>✓ Verified</span>}
                        {biz.featured && <span style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, color: "#000", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99 }}>⭐ Featured</span>}
                      </div>
                      <div style={{ display: "flex", gap: 8, marginTop: 6, alignItems: "center", flexWrap: "wrap" }}>
                        <span style={{ background: "rgba(201,168,76,0.1)", border: `1px solid ${GOLD}30`, color: GOLD, fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 99 }}>{biz.cat}</span>
                        <span style={{ color: s.textMuted, fontSize: 13 }}>{biz.price} Price Range</span>
                        <span style={{ color: s.textMuted, fontSize: 13 }}>📍 {biz.area}, {biz.city}</span>
                      </div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
                        <span style={{ background: "#22C55E", color: "#fff", fontSize: 12, fontWeight: 700, padding: "2px 8px", borderRadius: 6 }}>{biz.rating}</span>
                        <span style={{ color: "#F59E0B", fontSize: 14 }}>{"★".repeat(Math.floor(biz.rating))}{"☆".repeat(5-Math.floor(biz.rating))}</span>
                        <span style={{ color: s.textMuted, fontSize: 13 }}>({biz.reviews} reviews)</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 10, marginTop: 36 }}>
                      <a href={`tel:${biz.phone}`} style={{ background: "#059669", color: "#fff", padding: "9px 18px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>📞 Call</a>
                      <a href={biz.website} target="_blank" rel="noopener" style={{ background: s.bgSec, color: s.text, border: `1px solid ${s.border}`, padding: "9px 18px", borderRadius: 8, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>🌐 Website</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About */}
          <div style={{ background: s.bgCard, border: `1px solid ${s.border}`, borderRadius: 14, padding: "20px 24px", marginBottom: 20 }}>
            <h3 style={{ fontFamily: "'Sora', sans-serif", margin: "0 0 12px", fontSize: 16, fontWeight: 700, color: s.text, display: "flex", gap: 8 }}>ℹ️ About</h3>
            <p style={{ margin: 0, color: s.textSec, lineHeight: 1.7, fontSize: 14 }}>{biz.desc}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
              {biz.tags.map(t => <span key={t} style={{ background: s.bgSec, border: `1px solid ${s.border}`, color: s.textMuted, fontSize: 12, padding: "3px 10px", borderRadius: 99 }}>#{t}</span>)}
            </div>
          </div>

          {/* Amenities */}
          <div style={{ background: s.bgCard, border: `1px solid ${s.border}`, borderRadius: 14, padding: "20px 24px", marginBottom: 20 }}>
            <h3 style={{ fontFamily: "'Sora', sans-serif", margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: s.text }}>⚡ Amenities & Services</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {biz.amenities.map(a => <div key={a} style={{ display: "flex", gap: 8, fontSize: 14, color: s.textSec }}><span style={{ color: GOLD }}>✓</span>{a}</div>)}
            </div>
          </div>

          {/* Map placeholder */}
          <div style={{ background: s.bgCard, border: `1px solid ${s.border}`, borderRadius: 14, padding: "20px 24px", marginBottom: 20 }}>
            <h3 style={{ fontFamily: "'Sora', sans-serif", margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: s.text }}>🗺️ Location</h3>
            <div style={{ background: s.bgSec, borderRadius: 10, height: 200, display: "flex", alignItems: "center", justifyContent: "center", color: s.textMuted, fontSize: 14, marginBottom: 12, border: `1px solid ${s.border}` }}>
              🗺️ Map — {biz.address}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: s.textMuted, fontSize: 13 }}>📍 {biz.address}</span>
              <button style={{ background: "none", border: "none", color: GOLD, cursor: "pointer", fontWeight: 600, fontSize: 13 }}>Get Directions ↗</button>
            </div>
          </div>

          {/* Reviews */}
          <div style={{ background: s.bgCard, border: `1px solid ${s.border}`, borderRadius: 14, padding: "20px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontFamily: "'Sora', sans-serif", margin: 0, fontSize: 16, fontWeight: 700, color: s.text }}>⭐ Reviews ({biz.reviews})</h3>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: s.textMuted, marginBottom: 8 }}>Rate this business:</div>
              <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                {[1,2,3,4,5].map(n => <button key={n} onClick={() => setRating(n)} style={{ fontSize: 24, background: "none", border: "none", cursor: "pointer", color: n <= rating ? "#F59E0B" : s.border }}>★</button>)}
              </div>
              <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} placeholder="Share your experience..." style={{ width: "100%", border: `1px solid ${s.border}`, borderRadius: 8, padding: "12px", fontSize: 14, resize: "vertical", minHeight: 80, background: s.bgSec, color: s.text, fontFamily: "'DM Sans', sans-serif", outline: "none" }} />
              <button style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, color: "#000", border: "none", padding: "10px 20px", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: "pointer", marginTop: 8 }}>Submit Review</button>
            </div>
            <div style={{ textAlign: "center", padding: "20px", color: s.textMuted, fontSize: 14 }}>No reviews yet. Be the first!</div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: s.bgCard, border: `1px solid ${s.border}`, borderRadius: 14, padding: "20px" }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: s.text }}>Contact Information</h3>
            {[["📞", "Phone", biz.phone], ["✉️", "Email", biz.email], ["🌐", "Website", biz.website], ["📍", "Address", biz.address]].map(([icon, label, val]) => (
              <div key={label} style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(201,168,76,0.1)", border: `1px solid ${GOLD}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontSize: 11, color: s.textMuted, marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 13, color: s.text, wordBreak: "break-all" }}>{val}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: s.bgCard, border: `1px solid ${s.border}`, borderRadius: 14, padding: "20px" }}>
            <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: s.text }}>🕐 Opening Hours</h3>
            {days.map(day => (
              <div key={day} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: `1px solid ${s.border}`, fontSize: 13 }}>
                <span style={{ color: day === today ? GOLD : s.text, fontWeight: day === today ? 700 : 400 }}>{day === today ? "● " : ""}{day}</span>
                <span style={{ color: day === "Sunday" ? "#EF4444" : (day === today ? GOLD : s.textMuted), fontWeight: day === today ? 700 : 400 }}>
                  {day === "Sunday" ? "Closed" : "9:00–21:00"}
                </span>
              </div>
            ))}
          </div>

          <div style={{ background: s.bgCard, border: `1px solid ${s.border}`, borderRadius: 14, padding: "20px" }}>
            <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: s.text }}>Quick Actions</h3>
            {[["📞", "Call Business", "#059669"], ["💬", "WhatsApp", "#22C55E"], ["📍", "Get Directions", GOLD], ["✉️", "Send Email", "#7C3AED"], ["🔗", "Share", "#0891B2"]].map(([icon, label]) => (
              <button key={label as string} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: s.bgSec, border: `1px solid ${s.border}`, borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 500, color: s.text, marginBottom: 8, textAlign: "left" }}>
                <span>{icon}</span> {label}
              </button>
            ))}
          </div>

          {/* Prelaunch upsell for unclaimed */}
          {!biz.verified && (
            <div style={{ background: "linear-gradient(135deg, #0A0800, #1A1200)", border: `1px solid ${GOLD_DARK}`, borderRadius: 14, padding: "20px", textAlign: "center" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>🏢</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#F5F0E8", marginBottom: 6 }}>Is this your business?</div>
              <div style={{ fontSize: 12, color: "#888", marginBottom: 14 }}>Claim it and get featured for ₹999/year (pre-launch)</div>
              <Link href="/add-business" style={{ display: "block", background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, color: "#000", padding: "9px", borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: "none" }}>Claim This Listing</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
