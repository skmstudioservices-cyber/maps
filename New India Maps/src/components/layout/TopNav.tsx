'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Plus, Menu, Navigation } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

/**
 * CONFIG: Branding Configuration
 * NOTE: In the future, these will be fetched from a 'Settings' context 
 * managed by the Super Admin panel.
 */
const SITE_CONFIG = {
  brandPart1: "SKM Studio",
  brandPart2: "Maps"
};

/**
 * COMPONENT: TopNav
 * UTILITY: Main navigation for the site.
 * OPTIMIZATION: High-contrast, accessibility for all devices.
 * RECENT CHANGES: 
 * 1. Extracted ThemeToggle.
 * 2. Split Brand Title for custom styling.
 * 3. Added 'Near Me' feature link.
 */
export default function TopNav() {
  const GOLD = "#C9A84C";
  const GOLD_DARK = "#A07830";

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0A0A0A] border-b border-zinc-900 px-6 py-3 flex items-center justify-between shadow-2xl">
      
      {/* LOGO SECTION: Match Admin UI precisely */}
      <Link href="/" className="flex items-center gap-3 shrink-0 group">
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center text-black shadow-lg shadow-gold/10 group-hover:scale-105 transition-transform"
          style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})` }}
        >
          <MapPin size={22} fill="currentColor" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="font-black text-[16px] text-[#F5F0E8] tracking-tight uppercase">
            SKM Studio
          </span>
          <span className="font-bold text-[14px] tracking-widest uppercase italic" style={{ color: GOLD }}>
            Maps
          </span>
        </div>
      </Link>

      {/* NAVIGATION LINKS: Centered & Sophisticated */}
      <div className="hidden lg:flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">
        <Link href="/" className="hover:text-[#C9A84C] transition-colors">Home</Link>
        <Link href="/listings" className="hover:text-[#C9A84C] transition-colors">Listings</Link>
        <Link href="/near-me" className="flex items-center gap-1.5 hover:text-[#C9A84C] transition-colors">
          <Navigation size={14} /> Near Me
        </Link>
        <Link href="/pricing" className="hover:text-[#C9A84C] transition-colors">Pricing</Link>
        <Link href="/roadmap" className="hover:text-[#C9A84C] transition-colors">Roadmap</Link>
      </div>

      {/* PRIMARY ACTIONS */}
      <div className="flex items-center gap-4">
        {/* + List Business: Revert to Gold accent to match premium feel */}
        <Link 
          href="/add" 
          className="text-black px-5 py-2 rounded-xl flex items-center gap-2 hover:opacity-90 transition-all shadow-xl active:scale-95 text-[11px] font-black uppercase tracking-widest"
          style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})` }}
        >
          <Plus size={16} strokeWidth={4} />
          <span className="hidden sm:inline">Add Business</span> 
        </Link>
        
        <Link href="/login" className="hidden md:block text-[11px] font-black text-zinc-400 hover:text-white uppercase tracking-[0.2em]">Login</Link>
        
        <ThemeToggle />

        {/* Mobile menu trigger */}
        <button className="lg:hidden p-2 text-zinc-400 bg-[#161616] border border-zinc-800 rounded-xl">
          <Menu size={22} />
        </button>
      </div>
    </nav>
  );
}
