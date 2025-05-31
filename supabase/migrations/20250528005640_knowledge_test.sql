/*
  # Knowledge Test Schema

  1. New Tables
    - `knowledge_test_responses`
      - `id` (uuid, primary key)
      - `name` (text)
      - `age` (integer)
      - `education_level` (text)
      - `answers` (jsonb)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on the table
    - Add policies for public access to submit responses
    - Add policies for authenticated users to view responses
*/

-- Create knowledge_test_responses table
CREATE TABLE IF NOT EXISTS knowledge_test_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  age integer NOT NULL,
  education_level text NOT NULL,
  answers jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE knowledge_test_responses ENABLE ROW LEVEL SECURITY;

-- Policies for knowledge_test_responses
CREATE POLICY "Anyone can submit knowledge test responses"
  ON knowledge_test_responses
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view knowledge test responses"
  ON knowledge_test_responses
  FOR SELECT
  TO authenticated
  USING (true); 