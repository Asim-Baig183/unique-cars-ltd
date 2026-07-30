import { createClient } from '@supabase/supabase-js';

// Aapko ye keys Supabase Dashboard > Project Settings > API se milengi
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);