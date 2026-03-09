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

export interface Business {
  id: string;
  name: string;
  slug: string;
  category_id: string;
  city_id: string;
  address: string | null;
  lat: number | null;
  lng: number | null;
  phone: string | null;
  whatsapp: string | null;
  website: string | null;
  email: string | null;
  description: string | null;
  tags: string[];
  is_featured: boolean;
  is_verified: boolean;
  status: "draft" | "published";
  created_at?: string;
  updated_at?: string;
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
