import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Single shared client — safe once env vars are set
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Backwards-compatible helper used by lib/data.ts
export function getSupabase() {
  return supabase;
}
