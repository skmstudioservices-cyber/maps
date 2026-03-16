import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Alias for compatibility with lib/data.ts
export const getSupabase = () => supabase

export type Business = {
  id: string
  name: string
  slug: string
  description: string | null
  tagline: string | null
  category_id: string
  city_id: string
  address: string | null
  pin_code: string | null
  phone: string | null
  email: string | null
  website: string | null
  whatsapp: string | null
  avg_rating: number
  review_count: number
  price_range: string | null
  plan: 'basic' | 'featured' | 'premium'
  status: string
  is_verified: boolean
  is_featured: boolean
  opening_hours: Record<string, string> | null
  created_at: string
  city_name?: string
  city_slug?: string
  category_name?: string
  category_slug?: string
}

export type Profile = {
  id: string
  full_name: string | null
  role: 'super_admin' | 'moderator' | 'owner' | 'contributor' | 'visitor'
  updated_at: string
}

export type Category = {
  id: string
  name: string
  slug: string
  icon?: string | null
  description?: string | null
}

export type City = {
  id: string
  name: string
  slug: string
  state_id?: string
}
