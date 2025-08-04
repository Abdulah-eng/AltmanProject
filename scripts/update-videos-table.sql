-- Update videos table to add featured and order_index fields
-- Run this in your Supabase SQL editor

-- Add featured column if it doesn't exist
ALTER TABLE videos ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;

-- Add order_index column if it doesn't exist
ALTER TABLE videos ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_videos_featured ON videos(featured);
CREATE INDEX IF NOT EXISTS idx_videos_order ON videos(order_index);
CREATE INDEX IF NOT EXISTS idx_videos_published ON videos(published);

-- Update existing videos to have default values
UPDATE videos SET featured = false WHERE featured IS NULL;
UPDATE videos SET order_index = 0 WHERE order_index IS NULL;

-- Insert sample videos (optional - uncomment if you want sample data)
-- INSERT INTO videos (title, description, youtube_url, published, featured, order_index) VALUES
-- (
--   'Luxury Real Estate Market Update 2024',
--   'Get the latest insights on the luxury real estate market in Los Angeles and Beverly Hills.',
--   'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
--   true,
--   true,
--   1
-- ),
-- (
--   'Behind the Scenes: Million Dollar Listing LA',
--   'Exclusive behind-the-scenes look at the making of Million Dollar Listing Los Angeles.',
--   'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
--   true,
--   true,
--   2
-- ),
-- (
--   'Real Estate Investment Tips',
--   'Expert advice on investing in luxury real estate properties.',
--   'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
--   true,
--   false,
--   3
-- ); 