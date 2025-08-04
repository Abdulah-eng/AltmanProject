-- Test script to check videos table
-- Run this in your Supabase SQL editor to verify the setup

-- Check if table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public'
   AND table_name = 'videos'
);

-- Check table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'videos'
ORDER BY ordinal_position;

-- Check if there are any videos
SELECT COUNT(*) as total_videos FROM videos;

-- Show all videos
SELECT id, title, published, featured, order_index, created_at
FROM videos
ORDER BY order_index ASC, created_at DESC;

-- Show published videos
SELECT title, published, featured, order_index
FROM videos
WHERE published = true
ORDER BY order_index ASC, created_at DESC;

-- Show featured videos
SELECT title, published, featured, order_index
FROM videos
WHERE featured = true
ORDER BY order_index ASC, created_at DESC; 