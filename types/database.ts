export interface City {
  id: string;
  name: string;
  slug: string;
  state: string | null;
  lat: number | null;
  lng: number | null;
  created_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  created_at?: string;
}

export type BusinessBase = {
  id: string
  name: string
  slug: string
  description: string | null
  category_id: string
  city_id: string
  state_id: string
  address: string | null
  pincode: string | null
  phone: string | null
  email: string | null
  website: string | null
  whatsapp: string | null
  rating: number
  review_count: number
  price_range: string | null
  plan: 'free' | 'featured' | 'premium'
  is_verified: boolean
  is_claimed: boolean
  is_active: boolean
  opening_hours: Record<string, string> | null
  amenities: string[] | null
  tags: string[] | null
  created_at: string
}

export type Business = BusinessBase & {
  is_featured?: boolean;
  lat?: number | null;
  lng?: number | null;
  category?: Category;
  city?: City;
}

export interface Lead {
  id?: string;
  business_id?: string | null;
  name: string;
  phone: string;
  email?: string | null;
  message?: string | null;
  source_page?: string | null;
  created_at?: string;
}
