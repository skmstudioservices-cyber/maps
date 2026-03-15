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
  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-zinc-950 border-b border-slate-200 dark:border-zinc-800 px-3 py-2 flex items-center justify-between shadow-sm">
      
      {/* 
         LOGO SECTION: Split Brand Title 
         UTILITY: Allows different styling for Brand Name vs. Product Category.
      */}
      <Link href="/" className="flex items-center gap-2 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
          <MapPin size={18} fill="currentColor" />
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-extrabold text-[15px] text-slate-900 dark:text-white leading-none">
            {SITE_CONFIG.brandPart1}
          </span>
          <span className="font-medium text-[15px] text-brand-gold leading-none">
            {SITE_CONFIG.brandPart2}
          </span>
        </div>
      </Link>

      {/* 
         NAVIGATION LINKS: Desktop
         UTILITY: Standardized links for core site functions.
      */}
      <div className="hidden lg:flex items-center gap-6 text-[13px] font-bold text-slate-600 dark:text-slate-400">
        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <Link href="/listings" className="hover:text-blue-600 transition-colors">Listings</Link>
        <Link href="/near-me" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
          <Navigation size={14} /> Near Me
        </Link>
        <Link href="/pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
        <Link href="/roadmap" className="hover:text-blue-600 transition-colors">Roadmap</Link>
        <Link href="/map" className="hover:text-blue-600 transition-colors">Maps</Link>
      </div>

      {/* 
         PRIMARY ACTIONS: Optimized for Interaction 
      */}
      <div className="flex items-center gap-2">
        {/* + List Business: Primary conversion point */}
        <Link href="/add" className="bg-green-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-green-700 transition-all shadow-sm active:scale-95">
          <Plus size={16} strokeWidth={3} />
          <span className="hidden sm:inline font-bold text-[11px] uppercase tracking-wider">List Business</span> 
        </Link>
        
        <Link href="/login" className="hidden md:block text-[11px] font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 px-2 uppercase tracking-widest">Login</Link>
        
        {/* Extracted Theme Toggle (Utility-First Separation) */}
        <ThemeToggle />

        {/* Mobile/Watch menu trigger */}
        <button className="lg:hidden p-1.5 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-md">
          <Menu size={20} />
        </button>
      </div>
    </nav>
  );
}
