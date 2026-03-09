"use client";
import { useState } from "react";
import Link from "next/link";

const GOLD = "#C9A84C";
const GOLD_DARK = "#A07830";

const CATEGORIES = ["Restaurants", "Hotels", "Hospitals", "Beauty & Spa", "Auto Services", "Education", "Finance", "Fitness", "Home Services", "Legal", "Real Estate", "Shopping", "Pharmacy", "Grocery", "Electronics", "Clothing", "Bakery", "Cafe", "Gym", "Salon", "Spa", "Clinic", "Dental", "Veterinary", "Petrol Station", "Bank", "Insurance", "Travel", "Events", "Photography"];
const CITIES = ["Delhi", "New Delhi", "Noida", "Greater Noida", "Gurgaon", "Gurugram", "Faridabad", "Ghaziabad", "Gorakhpur", "NOIDA Extension", "Dwarka", "Rohini", "Laxmi Nagar", "Janakpuri"];

export default function AddBusinessPage() {
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState("free");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", category: "", city: "", area: "", pincode: "", address: "",
    phone: "", whatsapp: "", email: "", website: "",
    description: "", tags: "", hours: "",
    openingTime: "", closingTime: "", closedDays: "",
    priceRange: "$", amenities: "",
    facebook: "", instagram: "", twitter: "",
    submitterName: "", submitterPhone: "",
    isOwner: "no",
  });

  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const s = {
    bg: "var(--bg)", bgSec: "var(--bg-secondary)", bgCard: "var(--bg-card)",
    text: "var(--text-primary)", textSec: "var(--text-secondary)", textMuted: "var(--text-muted)", border: "var(--border)"
  };

  const dark = false;
  const inputStyle = { background: s.bgCard, border: `1px solid ${s.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 14, color: s.text, width: "100%", outline: "none", fontFamily: "'DM Sans', sans-serif" };
  const labelStyle = { fontSize: 13, fontWeight: 600, color: s.textSec, marginBottom: 6, display: "block" };

  if (submitted) {
    return (
      <div style={{ background: s.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ textAlign: "center", maxWidth: 480, padding: 40 }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 28, fontWeight: 800, color: s.text, margin: "0 0 12px" }}>Listing Submitted!</h1>
          <p style={{ color: s.textMuted, fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
            {form.isOwner === "yes"
              ? "Thank you! Our team will review and activate your listing within 24 hours. For the Featured plan, our representative will contact you to complete the payment."
              : "Thank you for contributing! The business owner can claim and update this listing anytime. Our team will verify and publish it soon."}
          </p>
          {plan === "featured" && (
            <div style={{ background: dark ? "#1A1200" : "#FFF8E8", border: `1px solid ${GOLD_DARK}`, borderRadius: 12, padding: "16px 20px", marginBottom: 24 }}>
              <p style={{ color: GOLD, fontWeight: 700, margin: 0, fontSize: 14 }}>
                🌟 Featured Plan Selected — ₹999/year (Pre-launch Price)<br />
                <span style={{ color: s.textMuted, fontWeight: 400, fontSize: 13 }}>Our team will call you to collect payment and activate your featured listing.</span>
              </p>
            </div>
          )}
          <Link href="/" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, color: "#000", padding: "12px 28px", borderRadius: 10, fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: s.bg, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <nav style={{ background: s.bgCard, borderBottom: `1px solid ${s.border}`, padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>📍</div>
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 15, color: s.text }}>SKM Studio <span style={{ color: GOLD }}>Maps</span></span>
        </Link>
        <Link href="/pricing" style={{ color: GOLD, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>⚡ Pre-launch: ₹999/year →</Link>
      </nav>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px" }}>
        {/* Progress */}
        <div style={{ display: "flex", gap: 0, marginBottom: 40 }}>
          {[1, 2, 3].map(n => (
            <div key={n} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: step >= n ? `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})` : s.bgSec, border: `2px solid ${step >= n ? GOLD : s.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: step >= n ? "#000" : s.textMuted }}>
                {step > n ? "✓" : n}
              </div>
              <span style={{ fontSize: 12, color: step >= n ? GOLD : s.textMuted, fontWeight: 500 }}>
                {n === 1 ? "Basic Info" : n === 2 ? "Details" : "Plan & Submit"}
              </span>
            </div>
          ))}
        </div>

        <div style={{ background: s.bgCard, border: `1px solid ${s.border}`, borderRadius: 16, padding: "32px 28px" }}>
          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 700, color: s.text, margin: "0 0 24px" }}>Basic Business Information</h2>

              <div style={{ background: "#FF440010", border: "1px solid #FF444030", borderRadius: 10, padding: "12px 16px", marginBottom: 24 }}>
                <p style={{ margin: 0, fontSize: 13, color: "#FF6666" }}>⚡ <strong>Pre-launch ends March 31!</strong> Get featured for ₹999/year (regular ₹3,999/month). Only business name, category & location required to submit.</p>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Business Name <span style={{ color: "#FF4444" }}>*</span></label>
                <input style={inputStyle} value={form.name} onChange={e => update("name", e.target.value)} placeholder="e.g. Sharma Restaurant" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                <div>
                  <label style={labelStyle}>Category <span style={{ color: "#FF4444" }}>*</span></label>
                  <select style={{ ...inputStyle, cursor: "pointer" }} value={form.category} onChange={e => update("category", e.target.value)}>
                    <option value="">Select category...</option>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>City <span style={{ color: "#FF4444" }}>*</span></label>
                  <select style={{ ...inputStyle, cursor: "pointer" }} value={form.city} onChange={e => update("city", e.target.value)}>
                    <option value="">Select city...</option>
                    {CITIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                <div>
                  <label style={labelStyle}>Area / Locality</label>
                  <input style={inputStyle} value={form.area} onChange={e => update("area", e.target.value)} placeholder="e.g. Connaught Place" />
                </div>
                <div>
                  <label style={labelStyle}>PIN Code</label>
                  <input style={inputStyle} value={form.pincode} onChange={e => update("pincode", e.target.value)} placeholder="e.g. 110001" maxLength={6} />
                </div>
              </div>
              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle}>Full Address</label>
                <textarea style={{ ...inputStyle, minHeight: 70, resize: "vertical" }} value={form.address} onChange={e => update("address", e.target.value)} placeholder="Street address, landmark..." />
              </div>

              <div style={{ marginBottom: 24, padding: "16px", background: s.bgSec, borderRadius: 10 }}>
                <label style={labelStyle}>Are you the business owner?</label>
                <div style={{ display: "flex", gap: 12 }}>
                  {["yes", "no"].map(v => (
                    <button key={v} onClick={() => update("isOwner", v)} style={{ padding: "8px 20px", borderRadius: 8, border: `1px solid ${form.isOwner === v ? GOLD : s.border}`, background: form.isOwner === v ? `${GOLD}20` : s.bgCard, color: form.isOwner === v ? GOLD : s.textSec, fontWeight: form.isOwner === v ? 700 : 400, cursor: "pointer", textTransform: "capitalize", fontSize: 14 }}>
                      {v === "yes" ? "✅ Yes, I own it" : "📝 No, submitting for them"}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={() => { if (form.name && form.category && form.city) setStep(2); }} style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, color: "#000", border: "none", padding: "12px 32px", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: "pointer", width: "100%" }}>
                Continue →
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 700, color: s.text, margin: "0 0 24px" }}>Additional Details <span style={{ color: s.textMuted, fontWeight: 400, fontSize: 14 }}>(optional)</span></h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                <div>
                  <label style={labelStyle}>📞 Phone Number</label>
                  <input style={inputStyle} value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="+91 XXXXX XXXXX" />
                </div>
                <div>
                  <label style={labelStyle}>💬 WhatsApp</label>
                  <input style={inputStyle} value={form.whatsapp} onChange={e => update("whatsapp", e.target.value)} placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                <div>
                  <label style={labelStyle}>📧 Email</label>
                  <input style={inputStyle} type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="business@email.com" />
                </div>
                <div>
                  <label style={labelStyle}>🌐 Website</label>
                  <input style={inputStyle} value={form.website} onChange={e => update("website", e.target.value)} placeholder="https://..." />
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>📝 Description</label>
                <textarea style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} value={form.description} onChange={e => update("description", e.target.value)} placeholder="Brief description of your business..." />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 20 }}>
                <div>
                  <label style={labelStyle}>Opening Time</label>
                  <input style={inputStyle} type="time" value={form.openingTime} onChange={e => update("openingTime", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Closing Time</label>
                  <input style={inputStyle} type="time" value={form.closingTime} onChange={e => update("closingTime", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>💲 Price Range</label>
                  <select style={{ ...inputStyle, cursor: "pointer" }} value={form.priceRange} onChange={e => update("priceRange", e.target.value)}>
                    <option value="$">$ Budget</option>
                    <option value="$$">$$ Mid-range</option>
                    <option value="$$$">$$$ Premium</option>
                    <option value="$$$$">$$$$ Luxury</option>
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>🏷️ Tags / Services (comma separated)</label>
                <input style={inputStyle} value={form.tags} onChange={e => update("tags", e.target.value)} placeholder="e.g. AC repair, Home delivery, Parking available" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 28 }}>
                <div>
                  <label style={labelStyle}>Facebook</label>
                  <input style={inputStyle} value={form.facebook} onChange={e => update("facebook", e.target.value)} placeholder="Profile URL" />
                </div>
                <div>
                  <label style={labelStyle}>Instagram</label>
                  <input style={inputStyle} value={form.instagram} onChange={e => update("instagram", e.target.value)} placeholder="@username" />
                </div>
                <div>
                  <label style={labelStyle}>Twitter/X</label>
                  <input style={inputStyle} value={form.twitter} onChange={e => update("twitter", e.target.value)} placeholder="@username" />
                </div>
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={() => setStep(1)} style={{ flex: 1, background: "transparent", color: s.textSec, border: `1px solid ${s.border}`, padding: "12px", borderRadius: 10, fontWeight: 600, cursor: "pointer", fontSize: 14 }}>← Back</button>
                <button onClick={() => setStep(3)} style={{ flex: 2, background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, color: "#000", border: "none", padding: "12px", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Choose Plan →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 700, color: s.text, margin: "0 0 8px" }}>Choose Your Plan</h2>
              <p style={{ color: "#FF4444", fontSize: 13, fontWeight: 600, margin: "0 0 24px" }}>⚡ Pre-launch offer ends March 31, 2026 — Featured at ₹999/year!</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>
                {[
                  { id: "free", name: "Free Listing", price: "₹0", desc: "Basic listing — name, category, location", note: "" },
                  { id: "featured", name: "⭐ Featured — Pre-launch Special", price: "₹999/year", desc: "Top placement, verified badge, photos, WhatsApp button", note: "Regular: ₹3,999/month — Save 97%!" },
                ].map(p => (
                  <div key={p.id} onClick={() => setPlan(p.id)} style={{ border: `2px solid ${plan === p.id ? GOLD : s.border}`, borderRadius: 12, padding: "16px 20px", cursor: "pointer", background: plan === p.id ? `rgba(201,168,76,0.05)` : s.bgCard, transition: "all 0.15s" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15, color: s.text, marginBottom: 4 }}>{p.name}</div>
                        <div style={{ fontSize: 13, color: s.textMuted }}>{p.desc}</div>
                        {p.note && <div style={{ fontSize: 12, color: "#FF4444", fontWeight: 600, marginTop: 4 }}>{p.note}</div>}
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 20, fontWeight: 800, color: p.id === "featured" ? GOLD : s.text, fontFamily: "'Sora', sans-serif" }}>{p.price}</div>
                        <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${plan === p.id ? GOLD : s.border}`, background: plan === p.id ? GOLD : "transparent", marginLeft: "auto", marginTop: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {plan === p.id && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#000" }} />}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {plan === "featured" && (
                <div style={{ background: "#0D2B1F", border: "1px solid #10B98130", borderRadius: 10, padding: "14px 16px", marginBottom: 20 }}>
                  <p style={{ margin: 0, fontSize: 13, color: "#10B981" }}>✅ Payment collected manually — our representative will contact you within 24 hours to confirm and collect ₹999.</p>
                </div>
              )}

              {form.isOwner === "no" && (
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Your Name (submitter)</label>
                  <input style={inputStyle} value={form.submitterName} onChange={e => update("submitterName", e.target.value)} placeholder="Your name" />
                </div>
              )}

              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={() => setStep(2)} style={{ flex: 1, background: "transparent", color: s.textSec, border: `1px solid ${s.border}`, padding: "12px", borderRadius: 10, fontWeight: 600, cursor: "pointer", fontSize: 14 }}>← Back</button>
                <button onClick={() => { if (form.name && form.category && form.city) setSubmitted(true); }} style={{ flex: 2, background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, color: "#000", border: "none", padding: "12px", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
                  🚀 Submit Listing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
