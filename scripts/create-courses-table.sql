-- Create courses table for training courses
-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration VARCHAR(100) NOT NULL,
  level VARCHAR(100) NOT NULL,
  learning_outcomes TEXT[] DEFAULT '{}',
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_courses_featured ON courses(featured);
CREATE INDEX IF NOT EXISTS idx_courses_order ON courses(order_index);
CREATE INDEX IF NOT EXISTS idx_courses_created_at ON courses(created_at);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_courses_updated_at 
    BEFORE UPDATE ON courses 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample courses
INSERT INTO courses (title, description, price, duration, level, learning_outcomes, featured, order_index) VALUES
(
  'Real Estate Mastery Course',
  'Comprehensive training program covering all aspects of luxury real estate sales and marketing.',
  2997.00,
  '8 Weeks',
  'Beginner to Advanced',
  ARRAY[
    'Lead Generation Strategies',
    'Luxury Market Analysis',
    'Negotiation Techniques',
    'Digital Marketing',
    'Client Relationship Management',
    'Closing Strategies'
  ],
  true,
  1
),
(
  'Advanced Negotiation Workshop',
  'Master the art of negotiation in high-stakes luxury real estate transactions.',
  997.00,
  '2 Days',
  'Intermediate to Advanced',
  ARRAY[
    'Psychology of Negotiation',
    'Multi-Million Dollar Deals',
    'Handling Difficult Clients',
    'Win-Win Strategies',
    'Contract Negotiations',
    'Closing Techniques'
  ],
  true,
  2
),
(
  'Digital Marketing Bootcamp',
  'Learn cutting-edge digital marketing strategies for real estate professionals.',
  1497.00,
  '4 Weeks',
  'All Levels',
  ARRAY[
    'Social Media Marketing',
    'Content Creation',
    'Video Marketing',
    'SEO for Real Estate',
    'Paid Advertising',
    'Analytics & Tracking'
  ],
  true,
  3
); 