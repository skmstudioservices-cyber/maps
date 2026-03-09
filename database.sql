-- SKM Studio Maps - Supabase Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Cities
CREATE TABLE IF NOT EXISTS cities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  state TEXT,
  district TEXT,
  pincode TEXT,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE,
  name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user', -- user, admin
  google_id TEXT UNIQUE,
  points INTEGER DEFAULT 0,
  listings_count INTEGER DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Businesses
CREATE TABLE IF NOT EXISTS businesses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category_id UUID REFERENCES categories(id),
  city_id UUID REFERENCES cities(id),
  address TEXT,
  area TEXT,
  pincode TEXT,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  phone TEXT,
  whatsapp TEXT,
  website TEXT,
  email TEXT,
  description TEXT,
  price_range TEXT DEFAULT '$', -- $, $$, $$$, $$$$
  tags TEXT[],
  amenities TEXT[],
  opening_time TEXT,
  closing_time TEXT,
  closed_days TEXT[],
  photos TEXT[],
  facebook TEXT,
  instagram TEXT,
  twitter TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'pending', -- pending, published, rejected
  plan TEXT DEFAULT 'free', -- free, featured, premium
  submitted_by UUID REFERENCES users(id),
  claimed_by UUID REFERENCES users(id),
  is_owner_submission BOOLEAN DEFAULT FALSE,
  avg_rating DECIMAL(3, 2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  call_count INTEGER DEFAULT 0,
  featured_until TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  title TEXT,
  body TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads (listing requests)
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id),
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  message TEXT,
  plan TEXT DEFAULT 'free',
  status TEXT DEFAULT 'new', -- new, contacted, converted, lost
  source_page TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leaderboard scores
CREATE TABLE IF NOT EXISTS leaderboard_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) UNIQUE,
  total_points INTEGER DEFAULT 0,
  listings_added INTEGER DEFAULT 0,
  reviews_written INTEGER DEFAULT 0,
  edits_made INTEGER DEFAULT 0,
  photos_added INTEGER DEFAULT 0,
  claims_verified INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Feedback/bug reports
CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL, -- feature, bug, complaint, other
  title TEXT,
  description TEXT NOT NULL,
  email TEXT,
  page_url TEXT,
  status TEXT DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed: Cities
INSERT INTO cities (name, slug, state, district) VALUES
  ('Delhi', 'delhi', 'Delhi', 'Central Delhi'),
  ('New Delhi', 'new-delhi', 'Delhi', 'New Delhi'),
  ('Noida', 'noida', 'Uttar Pradesh', 'Gautam Buddha Nagar'),
  ('Greater Noida', 'greater-noida', 'Uttar Pradesh', 'Gautam Buddha Nagar'),
  ('Gurgaon', 'gurgaon', 'Haryana', 'Gurugram'),
  ('Faridabad', 'faridabad', 'Haryana', 'Faridabad'),
  ('Ghaziabad', 'ghaziabad', 'Uttar Pradesh', 'Ghaziabad'),
  ('Gorakhpur', 'gorakhpur', 'Uttar Pradesh', 'Gorakhpur')
ON CONFLICT (slug) DO NOTHING;

-- Seed: Categories
INSERT INTO categories (name, slug, icon) VALUES
  ('Restaurants', 'restaurants', '🍽️'),
  ('Hotels', 'hotels', '🏨'),
  ('Hospitals', 'hospitals', '🏥'),
  ('Beauty & Spa', 'beauty-spa', '💆'),
  ('Auto Services', 'auto-services', '🚗'),
  ('Education', 'education', '🎓'),
  ('Finance', 'finance', '💰'),
  ('Fitness', 'fitness', '💪'),
  ('Home Services', 'home-services', '🏠'),
  ('Legal', 'legal', '⚖️'),
  ('Real Estate', 'real-estate', '🏢'),
  ('Shopping', 'shopping', '🛍️'),
  ('Pharmacy', 'pharmacy', '💊'),
  ('Electronics', 'electronics', '📱'),
  ('Clothing', 'clothing', '👗')
ON CONFLICT (slug) DO NOTHING;

-- RLS Policies (enable row level security)
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Public can read published businesses
CREATE POLICY "Public can view published businesses" ON businesses
  FOR SELECT USING (status = 'published');

-- Anyone can submit a business
CREATE POLICY "Anyone can submit businesses" ON businesses
  FOR INSERT WITH CHECK (true);

-- Public can read categories and cities
CREATE POLICY "Public can view categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public can view cities" ON cities FOR SELECT USING (true);
CREATE POLICY "Public can view reviews" ON reviews FOR SELECT USING (true);
