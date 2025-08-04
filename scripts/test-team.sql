-- Test script to check team_members table
-- Run this in your Supabase SQL editor to verify the setup

-- Check if table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public'
   AND table_name = 'team_members'
);

-- Check table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'team_members'
ORDER BY ordinal_position;

-- Check if there are any team members
SELECT COUNT(*) as total_team_members FROM team_members;

-- Show all team members
SELECT id, name, title, featured, order_index, created_at
FROM team_members
ORDER BY order_index ASC;

-- Show featured team members
SELECT name, title, featured, order_index
FROM team_members
WHERE featured = true
ORDER BY order_index ASC; 