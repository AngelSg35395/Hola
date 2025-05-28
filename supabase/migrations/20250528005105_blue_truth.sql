/*
  # Initial schema for waste management system

  1. New Tables
    - `waste_data`
      - `id` (uuid, primary key)
      - `date` (date)
      - `pet_amount` (numeric)
      - `cardboard_amount` (numeric)
      - `cans_amount` (numeric)
      - `glass_amount` (numeric)
      - `other_amount` (numeric)
      - `participation_rate` (numeric)
      - `misclassification_rate` (numeric)
      - `campaign_reach` (integer)
      - `costs` (numeric)
      - `notes` (text)
      - `created_at` (timestamptz)
      - `created_by` (uuid, references auth.users)

    - `survey_responses`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `participation_level` (text)
      - `satisfaction_level` (integer)
      - `suggestions` (text)
      - `is_subscribed` (boolean)
      - `created_at` (timestamptz)

    - `pdf_interactions`
      - `id` (uuid, primary key)
      - `action_type` (text)
      - `created_at` (timestamptz)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage waste data
    - Add policies for public access to survey responses
    - Add policies for tracking PDF interactions
*/

-- Create waste_data table
CREATE TABLE IF NOT EXISTS waste_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  pet_amount numeric NOT NULL DEFAULT 0,
  cardboard_amount numeric NOT NULL DEFAULT 0,
  cans_amount numeric NOT NULL DEFAULT 0,
  glass_amount numeric NOT NULL DEFAULT 0,
  other_amount numeric NOT NULL DEFAULT 0,
  participation_rate numeric NOT NULL DEFAULT 0,
  misclassification_rate numeric NOT NULL DEFAULT 0,
  campaign_reach integer NOT NULL DEFAULT 0,
  costs numeric NOT NULL DEFAULT 0,
  notes text,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Create survey_responses table
CREATE TABLE IF NOT EXISTS survey_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  participation_level text NOT NULL,
  satisfaction_level integer NOT NULL,
  suggestions text,
  is_subscribed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create pdf_interactions table
CREATE TABLE IF NOT EXISTS pdf_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action_type text NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE waste_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE pdf_interactions ENABLE ROW LEVEL SECURITY;

-- Policies for waste_data
CREATE POLICY "Authenticated users can view all waste data"
  ON waste_data
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert their own waste data"
  ON waste_data
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Authenticated users can update their own waste data"
  ON waste_data
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Authenticated users can delete their own waste data"
  ON waste_data
  FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- Policies for survey_responses
CREATE POLICY "Anyone can submit survey responses"
  ON survey_responses
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view survey responses"
  ON survey_responses
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for pdf_interactions
CREATE POLICY "Anyone can record PDF interactions"
  ON pdf_interactions
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view PDF interactions"
  ON pdf_interactions
  FOR SELECT
  TO authenticated
  USING (true);