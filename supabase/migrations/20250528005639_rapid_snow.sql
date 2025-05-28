/*
  # Data Visualization Schema

  1. New Tables
    - `metrics`
      - `id` (uuid, primary key)
      - `name` (text)
      - `type` (text)
      - `description` (text)
      - `created_at` (timestamp)
    
    - `data_points`
      - `id` (uuid, primary key)
      - `metric_id` (uuid, foreign key)
      - `value` (numeric)
      - `timestamp` (timestamp)
      - `category` (text)
    
    - `chart_configs`
      - `id` (uuid, primary key)
      - `title` (text)
      - `chart_type` (text)
      - `metrics_included` (jsonb)
      - `display_options` (jsonb)
      - `refresh_interval` (integer)
      - `created_by` (uuid, foreign key)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create metrics table
CREATE TABLE IF NOT EXISTS metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create data_points table
CREATE TABLE IF NOT EXISTS data_points (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_id uuid REFERENCES metrics(id) ON DELETE CASCADE,
  value numeric NOT NULL,
  timestamp timestamptz DEFAULT now(),
  category text
);

-- Create chart_configs table
CREATE TABLE IF NOT EXISTS chart_configs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  chart_type text NOT NULL,
  metrics_included jsonb NOT NULL,
  display_options jsonb DEFAULT '{}',
  refresh_interval integer DEFAULT 60,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE chart_configs ENABLE ROW LEVEL SECURITY;

-- Policies for metrics
CREATE POLICY "Authenticated users can view all metrics"
  ON metrics
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert metrics"
  ON metrics
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policies for data_points
CREATE POLICY "Authenticated users can view all data points"
  ON data_points
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert data points"
  ON data_points
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policies for chart_configs
CREATE POLICY "Users can view their own chart configs"
  ON chart_configs
  FOR SELECT
  TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Users can insert their own chart configs"
  ON chart_configs
  FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update their own chart configs"
  ON chart_configs
  FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can delete their own chart configs"
  ON chart_configs
  FOR DELETE
  TO authenticated
  USING (created_by = auth.uid());