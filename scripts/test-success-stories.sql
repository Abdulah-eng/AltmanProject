-- Test script to check success_stories table
-- Run this in your Supabase SQL editor to verify the setup

-- Check if table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public'
   AND table_name = 'success_stories'
);

-- Check table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'success_stories'
ORDER BY ordinal_position;

-- Check if there are any success stories
SELECT COUNT(*) as total_success_stories FROM success_stories;

-- Show all success stories
SELECT id, name, title, featured, order_index, created_at
FROM success_stories
ORDER BY order_index ASC, created_at DESC;

-- Show featured success stories
SELECT name, title, featured, order_index
FROM success_stories
WHERE featured = true
ORDER BY order_index ASC, created_at DESC;

-- Show sample quotes
SELECT name, title, quote
FROM success_stories
LIMIT 3; 