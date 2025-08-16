-- Test script to verify database connection and table structure
-- Run this in your Supabase SQL editor to check if everything is set up correctly

-- Check if tables exist
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name IN ('neighborhoods', 'new_developments')
ORDER BY table_name, ordinal_position;

-- Check if storage bucket exists
SELECT * FROM storage.buckets WHERE id = 'images';

-- Check storage policies (using the correct method)
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'objects' AND schemaname = 'storage';

-- Test insert (this should work if tables are set up correctly)
-- Uncomment the lines below to test:

-- INSERT INTO neighborhoods (name, description, featured, display_order) 
-- VALUES ('Test Neighborhood', 'This is a test neighborhood', false, 0)
-- ON CONFLICT (name) DO NOTHING;

-- INSERT INTO new_developments (name, description, location, price_range, featured, display_order)
-- VALUES ('Test Development', 'This is a test development', 'Test Location', '$1M - $2M', false, 0)
-- ON CONFLICT (name) DO NOTHING;

-- Check current data
SELECT * FROM neighborhoods LIMIT 5;
SELECT * FROM new_developments LIMIT 5;
