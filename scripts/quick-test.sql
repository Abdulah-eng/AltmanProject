-- Quick test script for neighborhoods and new developments
-- Run this in your Supabase SQL editor to verify setup

-- 1. Check if tables exist
SELECT 
  table_name,
  column_name,
  data_type
FROM information_schema.columns 
WHERE table_name IN ('neighborhoods', 'new_developments')
ORDER BY table_name, ordinal_position;

-- 2. Check if storage bucket exists
SELECT id, name, public FROM storage.buckets WHERE id = 'images';

-- 3. Try to create a test neighborhood (without image first)
INSERT INTO neighborhoods (name, description, featured, display_order) 
VALUES ('Test Neighborhood', 'This is a test neighborhood', false, 0)
ON CONFLICT (name) DO NOTHING;

-- 4. Try to create a test development (without image first)
INSERT INTO new_developments (name, description, location, price_range, featured, display_order)
VALUES ('Test Development', 'This is a test development', 'Test Location', '$1M - $2M', false, 0)
ON CONFLICT (name) DO NOTHING;

-- 5. Check if test data was created
SELECT * FROM neighborhoods WHERE name = 'Test Neighborhood';
SELECT * FROM new_developments WHERE name = 'Test Development';

-- 6. Clean up test data
DELETE FROM neighborhoods WHERE name = 'Test Neighborhood';
DELETE FROM new_developments WHERE name = 'Test Development';

-- 7. Show final status
SELECT 'Setup completed successfully!' as status;
