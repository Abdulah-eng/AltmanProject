-- Test script to check courses table
-- Run this in your Supabase SQL editor to verify the setup

-- Check if table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public'
   AND table_name = 'courses'
);

-- Check table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'courses'
ORDER BY ordinal_position;

-- Check if there are any courses
SELECT COUNT(*) as total_courses FROM courses;

-- Show all courses
SELECT id, title, price, duration, level, featured, order_index, created_at
FROM courses
ORDER BY order_index ASC, created_at DESC;

-- Show featured courses
SELECT title, price, duration, level, order_index
FROM courses
WHERE featured = true
ORDER BY order_index ASC, created_at DESC;

-- Show learning outcomes for first course
SELECT title, learning_outcomes
FROM courses
LIMIT 1; 