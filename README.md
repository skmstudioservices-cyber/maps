# SKM Studio Maps

India's premium local business directory — covering Delhi, NCR, Gorakhpur and beyond.

## 🚀 Quick Start

```bash
npm install
cp .env.example .env.local
# Fill in your Supabase credentials in .env.local
npm run dev
```

## 📦 Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel
- **Fonts**: Sora + DM Sans (Google Fonts)

## 🗺️ Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, categories, featured businesses |
| `/listings` | Browse & search all businesses |
| `/b/[id]` | Individual business detail page |
| `/add-business` | 3-step listing submission form |
| `/pricing` | Plans with pre-launch countdown |
| `/login` | Google Sign-In + email auth |
| `/dashboard` | Business owner dashboard |
| `/roadmap` | Product roadmap |
| `/admin` | Admin panel |

## 💰 Pricing Plans

| Plan | Pre-launch Price | Regular Price |
|------|-----------------|---------------|
| Free | ₹0 | ₹0 |
| Featured | ₹999/year (until March 31) | ₹3,999/month |
| Premium | ₹4,999/month | ₹4,999/month |
| SEO Plans | ₹15K–₹75K/month | Coming soon |

## 🗄️ Supabase Setup

Run the SQL in `database.sql` to create:
- `cities` table
- `categories` table  
- `businesses` table
- `leads` table
- `reviews` table
- `users` table
- `leaderboard_scores` table

## 🌐 Deploy to Vercel

1. Push to GitHub
2. Connect repo to Vercel
3. Add env variables in Vercel dashboard
4. Deploy!

## 📍 Coverage

- Delhi
- New Delhi
- Noida / Greater Noida
- Gurgaon / Gurugram
- Faridabad
- Ghaziabad
- Gorakhpur
- (More cities coming in Phase 2)
