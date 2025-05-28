import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export type Metric = Database['public']['Tables']['metrics']['Row'];
export type DataPoint = Database['public']['Tables']['data_points']['Row'];
export type ChartConfig = Database['public']['Tables']['chart_configs']['Row'];
export type WasteData = Database['public']['Tables']['waste_data']['Row'];
export type SurveyResponse = Database['public']['Tables']['survey_responses']['Row'];
export type PdfInteraction = Database['public']['Tables']['pdf_interactions']['Row'];