"use client";
import { useState } from "react";
import Link from "next/link";

const GOLD = "#C9A84C";
const GOLD_DARK = "#A07830";

export default function LoginPage() {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [form, setForm] = useState({ email: "", password: "", name: "", phone: "" });
  const s = { bg: "var(--bg)", bgCard: "var(--bg-card)", text: "var(--text-primary)", textSec: "var(--text-secondary)", textMuted: "var(--text-muted)", border: "var(--border)" };
  const input = { background: s.bgCard, border: `1px solid ${s.border}`, borderRadius: 8, padding: "12px 14px", fontSize: 14, color: s.text, width: "100%", outline: "none", fontFamily: "'DM Sans', sans-serif", marginBottom: 14, display: "block" };
  const label = { fontSize: 13, fontWeight: 600, color: s.textSec, marginBottom: 6, display: "block" };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 440 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 24 }}>
            <div style={{ width: 40, height: 40, background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>📍</div>
            <div>
              <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 18, color: s.text }}>SKM Studio</span>
              <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: 18, color: GOLD }}> Maps</span>
            </div>
          </Link>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 26, fontWeight: 800, color: s.text, margin: "0 0 8px" }}>
            {tab === "login" ? "Welcome back" : "Create account"}
          </h1>
          <p style={{ color: s.textMuted, fontSize: 14, margin: 0 }}>
            {tab === "login" ? "Sign in to manage your listings" : "Join and start listing your business"}
          </p>
        </div>

        <div style={{ background: s.bgCard, border: `1px solid ${s.border}`, borderRadius: 16, padding: "32px 28px" }}>
          {/* Google SSO */}
          <button style={{ width: "100%", background: "transparent", border: `1px solid ${s.border}`, borderRadius: 10, padding: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, cursor: "pointer", fontSize: 15, fontWeight: 600, color: s.text, marginBottom: 20 }}>
            <span style={{ fontSize: 20 }}>G</span> Continue with Google
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: s.border }} />
            <span style={{ color: s.textMuted, fontSize: 13 }}>or</span>
            <div style={{ flex: 1, height: 1, background: s.border }} />
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", background: "var(--bg-secondary)", borderRadius: 10, padding: 4, marginBottom: 24 }}>
            {(["login", "signup"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "8px", borderRadius: 7, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14, background: tab === t ? `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})` : "transparent", color: tab === t ? "#000" : s.textMuted }}>
                {t === "login" ? "Login" : "Sign Up"}
              </button>
            ))}
          </div>

          {tab === "signup" && (
            <>
              <label style={label}>Full Name</label>
              <input style={input as React.CSSProperties} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Your full name" />
              <label style={label}>Phone Number</label>
              <input style={input as React.CSSProperties} value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+91 XXXXX XXXXX" />
            </>
          )}
          <label style={label}>Email</label>
          <input style={input as React.CSSProperties} type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="your@email.com" />
          <label style={label}>Password</label>
          <input style={input as React.CSSProperties} type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} placeholder="••••••••" />

          <button style={{ width: "100%", background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`, color: "#000", border: "none", padding: "13px", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: "pointer", marginTop: 4 }}>
            {tab === "login" ? "Sign In" : "Create Account"}
          </button>

          <p style={{ textAlign: "center", color: s.textMuted, fontSize: 13, marginTop: 16, marginBottom: 0 }}>
            {tab === "login" ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setTab(tab === "login" ? "signup" : "login")} style={{ background: "none", border: "none", color: GOLD, fontWeight: 600, cursor: "pointer", fontSize: 13 }}>
              {tab === "login" ? "Sign up" : "Login"}
            </button>
          </p>
        </div>

        <div style={{ textAlign: "center", marginTop: 20, padding: "14px 20px", background: "rgba(201,168,76,0.1)", border: `1px solid ${GOLD}30`, borderRadius: 10 }}>
          <p style={{ margin: 0, fontSize: 13, color: GOLD }}>🚀 <strong>Pre-launch:</strong> Featured listing ₹999/year — ends March 31!</p>
        </div>
      </div>
    </div>
  );
}
