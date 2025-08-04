-- Create success_stories table for testimonials
-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS success_stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  quote TEXT NOT NULL,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_success_stories_featured ON success_stories(featured);
CREATE INDEX IF NOT EXISTS idx_success_stories_order ON success_stories(order_index);
CREATE INDEX IF NOT EXISTS idx_success_stories_created_at ON success_stories(created_at);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_success_stories_updated_at 
    BEFORE UPDATE ON success_stories 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample success stories
INSERT INTO success_stories (name, title, quote, featured, order_index) VALUES
(
  'Sarah Johnson',
  'Beverly Hills Agent',
  'The training program transformed my approach to luxury real estate. I''ve tripled my sales volume in just 6 months.',
  true,
  1
),
(
  'Michael Chen',
  'Malibu Specialist',
  'The negotiation techniques I learned helped me close a $15M deal that seemed impossible before the training.',
  true,
  2
),
(
  'Emily Rodriguez',
  'Orange County Agent',
  'The digital marketing strategies revolutionized my lead generation. I now have a consistent pipeline of qualified buyers.',
  true,
  3
); 