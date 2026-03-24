# SKM Studio Maps - File Index

This file tracks the project structure and helps find features quickly.

## 📁 Root Configuration
- `package.json` - Project metadata and dependencies (New India Maps root)
- `database.sql` - Full Supabase database schema and seeding
- `.env.local` - Environment variables (Local development)
- `tsconfig.json` - TypeScript configuration
- `FILE_INDEX.md` - (This file) Master directory of the project
- `Pharmacy Stores Data.csv` - 1,360+ listings (Live from Desktop)
- `Website Traffic Plan.xlsx` - Marketing and SEO strategy (Live from Desktop)

## 🏗️ Core Application (src/app)
- `src/app/layout.tsx` - Root layout (Sidebar, Header, Main wrapper)
- `src/app/page.tsx` - Homepage (Featured listings, Hero section)
- `src/app/login/page.tsx` - Authentication page (Handled by Supabase)
- `src/app/dashboard/page.tsx` - User dashboard (Points, Listings overview)
- `src/app/add/page.tsx` - Add Business form (Public/User submission)

## 🧩 Components (src/components)
- `src/components/Navbar.tsx` - Primary navigation (Auth-aware)
- `src/components/Footer.tsx` - Global footer
- `src/components/BusinessCard.tsx` - Professional business display card

## ⚙️ Logic & Types
- `src/lib/supabase.ts` - Supabase client initialization
- `src/lib/analytics.ts` - Lead tracking and business analytics
- `src/types/database.ts` - TypeScript interfaces for DB tables

## 📂 Project Data (Reorganized)
- `_Project_Context/` - Deep strategy and planning documents

---
*Last Updated: 2026-03-24*
