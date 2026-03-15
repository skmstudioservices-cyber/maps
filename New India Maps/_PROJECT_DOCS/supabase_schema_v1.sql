-- NEW INDIA MAPS - SUPABASE SCHEMA V1
-- Target: MVP Launch (Programmatic SEO + Gamification)

-- 1. ENUMS & CONSTANTS
CREATE TYPE user_role AS ENUM ('profile', 'owner', 'moderator', 'admin', 'superadmin');
CREATE TYPE listing_status AS ENUM ('pending', 'active', 'rejected', 'archived');
CREATE TYPE interaction_type AS ENUM ('phone', 'directions', 'website', 'whatsapp');
CREATE TYPE verification_tier AS ENUM ('unverified', 'email_verified', 'phone_verified');

-- 2. CORE PROFILES & GAMIFICATION
CREATE TABLE profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    role user_role DEFAULT 'profile',
    points INTEGER DEFAULT 0,
    level TEXT DEFAULT 'Explorer', -- Explorer, Contributor, Trusted Guide, Legend
    verification_tier verification_tier DEFAULT 'unverified',
    daily_points_cap INTEGER DEFAULT 50, -- Caps: 50/150/500 based on tier
    current_day_points INTEGER DEFAULT 0,
    last_points_reset TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. CITIES & CATEGORIES (For Programmatic SEO)
CREATE TABLE regions (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL, -- e.g., 'rajasthan'
    type TEXT DEFAULT 'state',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE cities (
    id BIGSERIAL PRIMARY KEY,
    region_id BIGINT REFERENCES regions(id),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL, -- e.g., 'jaipur'
    listing_count INTEGER DEFAULT 0,
    is_sparse BOOLEAN DEFAULT TRUE, -- Sparse if < 50 listings (+0.5x rewards)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL, -- e.g., 'dentists'
    icon_name TEXT, -- Lucide Icon name
    schema_json JSONB, -- For dynamic fields (specialization, hours, etc.)
    is_trending BOOLEAN DEFAULT FALSE, -- (+0.3x rewards)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. BUSINESS LISTINGS
CREATE TABLE businesses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    owner_id UUID REFERENCES profiles(id),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    phone TEXT,
    whatsapp TEXT,
    website TEXT,
    address TEXT,
    city_id BIGINT REFERENCES cities(id),
    category_id BIGINT REFERENCES categories(id),
    status listing_status DEFAULT 'pending',
    plan_type TEXT DEFAULT 'free', -- free, featured, premium, seo
    social_urls JSONB DEFAULT '{}',
    hours_json JSONB DEFAULT '{}',
    images_json JSONB DEFAULT '[]', -- Storage bucket URLs
    verified_by_mod BOOLEAN DEFAULT FALSE,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. LEAD TRACKING (Discover Plasma Logic)
CREATE TABLE lead_interactions (
    id BIGSERIAL PRIMARY KEY,
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users, -- NULL if anonymous
    interaction_type interaction_type NOT NULL,
    metadata JSONB, -- UTM source, device, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. POINTS LOG & MULTIPLIERS
CREATE TABLE points_log (
    id BIGSERIAL PRIMARY KEY,
    profile_id UUID REFERENCES profiles(id),
    action_type TEXT NOT NULL, -- 'listing_submit', 'verification_vote', 'referral'
    points_awarded INTEGER NOT NULL,
    multiplier_used NUMERIC DEFAULT 1.0, -- Sparse area, Trending, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. REVIEWS & TRUST
CREATE TABLE reviews (
    id BIGSERIAL PRIMARY KEY,
    business_id UUID REFERENCES businesses(id),
    author_id UUID REFERENCES profiles(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    is_verified_visit BOOLEAN DEFAULT FALSE, -- If bill/receipt uploaded
    owner_reply TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. INDEXING FOR SEO PERFORMANCE
CREATE INDEX idx_businesses_city ON businesses(city_id);
CREATE INDEX idx_businesses_category ON businesses(category_id);
CREATE INDEX idx_businesses_status ON businesses(status);
CREATE INDEX idx_cities_slug ON cities(slug);
CREATE INDEX idx_categories_slug ON categories(slug);
