import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase environment variables (URL/Key) are missing. Check your .env file.');
}

/**
 * The unified Supabase client for New India Maps.
 * Used for Auth, Database Queries, and Storage.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Lead Tracking Helper
 * Tracks 'High-Intent' clicks (Directions, Phone, Website) 
 * Based on the 'Discover Plasma' reference logic.
 */
export async function trackLeadInteraction(businessId: string, interactionType: 'phone' | 'directions' | 'website') {
  try {
    const { error } = await supabase
      .from('lead_interactions')
      .insert({
        business_id: businessId,
        interaction_type: interactionType,
        timestamp: new Date().toISOString()
      });
      
    if (error) throw error;
  } catch (err) {
    console.error('Lead Tracking Error:', err);
  }
}
