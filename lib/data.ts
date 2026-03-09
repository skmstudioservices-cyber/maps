import { getSupabase } from "./supabase";
import type { Business, Category, City } from "../types/database";

export async function getCities(): Promise<City[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("cities")
    .select("*")
    .order("name");
  if (error) return [];
  return (data as City[]) ?? [];
}

export async function getCityBySlug(slug: string): Promise<City | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("cities")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error || !data) return null;
  return data as City;
}

export async function getCategories(): Promise<Category[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");
  if (error) return [];
  return (data as Category[]) ?? [];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error || !data) return null;
  return data as Category;
}

export async function getBusinessesByCity(cityId: string): Promise<Business[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("businesses")
    .select("*, category:categories(*), city:cities(*)")
    .eq("city_id", cityId)
    .eq("status", "published")
    .order("is_featured", { ascending: false })
    .order("name");
  if (error) return [];
  return (data as Business[]) ?? [];
}

export async function getBusinessesByCityAndCategory(
  cityId: string,
  categoryId: string
): Promise<Business[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("businesses")
    .select("*, category:categories(*), city:cities(*)")
    .eq("city_id", cityId)
    .eq("category_id", categoryId)
    .eq("status", "published")
    .order("is_featured", { ascending: false })
    .order("name");
  if (error) return [];
  return (data as Business[]) ?? [];
}

export async function getBusinessBySlug(businessSlug: string): Promise<Business | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("businesses")
    .select("*, category:categories(*), city:cities(*)")
    .eq("slug", businessSlug)
    .eq("status", "published")
    .single();
  if (error || !data) return null;
  return data as Business;
}

export async function getBusinessById(id: string): Promise<Business | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("businesses")
    .select("*, category:categories(*), city:cities(*)")
    .eq("id", id)
    .eq("status", "published")
    .single();
  if (error || !data) return null;
  return data as Business;
}

export async function searchBusinesses(
  query: string,
  citySlug?: string
): Promise<Business[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  let q = supabase
    .from("businesses")
    .select("*, category:categories(*), city:cities(*)")
    .eq("status", "published")
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`);
  if (citySlug) {
    const city = await getCityBySlug(citySlug);
    if (city) q = q.eq("city_id", city.id);
  }
  const { data, error } = await q.order("is_featured", { ascending: false }).limit(50);
  if (error) return [];
  return (data as Business[]) ?? [];
}
