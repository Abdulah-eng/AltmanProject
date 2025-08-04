-- Test script to check properties table
-- Run this in your Supabase SQL editor to verify the setup

-- Check if table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public'
   AND table_name = 'properties'
);

-- Check table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'properties'
ORDER BY ordinal_position;

-- Check if there are any properties
SELECT COUNT(*) as total_properties FROM properties;

-- Show all properties
SELECT id, title, address, price, featured, status, created_at
FROM properties
ORDER BY created_at DESC; 