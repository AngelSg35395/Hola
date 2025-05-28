export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      metrics: {
        Row: {
          id: string
          name: string
          type: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          type: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string
          description?: string | null
          created_at?: string
        }
      }
      data_points: {
        Row: {
          id: string
          metric_id: string
          value: number
          timestamp: string
          category: string | null
        }
        Insert: {
          id?: string
          metric_id: string
          value: number
          timestamp?: string
          category?: string | null
        }
        Update: {
          id?: string
          metric_id?: string
          value?: number
          timestamp?: string
          category?: string | null
        }
      }
      chart_configs: {
        Row: {
          id: string
          title: string
          chart_type: string
          metrics_included: Json
          display_options: Json
          refresh_interval: number
          created_by: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          chart_type: string
          metrics_included: Json
          display_options?: Json
          refresh_interval?: number
          created_by: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          chart_type?: string
          metrics_included?: Json
          display_options?: Json
          refresh_interval?: number
          created_by?: string
          created_at?: string
        }
      }
      waste_data: {
        Row: {
          id: string
          date: string
          pet_amount: number
          cardboard_amount: number
          cans_amount: number
          glass_amount: number
          other_amount: number
          participation_rate: number
          misclassification_rate: number
          campaign_reach: number
          costs: number
          notes: string | null
          created_at: string
          created_by: string
        }
        Insert: {
          id?: string
          date: string
          pet_amount: number
          cardboard_amount: number
          cans_amount: number
          glass_amount: number
          other_amount: number
          participation_rate: number
          misclassification_rate: number
          campaign_reach: number
          costs: number
          notes?: string | null
          created_at?: string
          created_by: string
        }
        Update: {
          id?: string
          date?: string
          pet_amount?: number
          cardboard_amount?: number
          cans_amount?: number
          glass_amount?: number
          other_amount?: number
          participation_rate?: number
          misclassification_rate?: number
          campaign_reach?: number
          costs?: number
          notes?: string | null
          created_at?: string
          created_by?: string
        }
      }
      survey_responses: {
        Row: {
          id: string
          name: string
          email: string
          participation_level: string
          satisfaction_level: number
          suggestions: string | null
          is_subscribed: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          participation_level: string
          satisfaction_level: number
          suggestions?: string | null
          is_subscribed?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          participation_level?: string
          satisfaction_level?: number
          suggestions?: string | null
          is_subscribed?: boolean
          created_at?: string
        }
      }
      pdf_interactions: {
        Row: {
          id: string
          action_type: string
          created_at: string
          user_id: string | null
        }
        Insert: {
          id?: string
          action_type: string
          created_at?: string
          user_id?: string | null
        }
        Update: {
          id?: string
          action_type?: string
          created_at?: string
          user_id?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}