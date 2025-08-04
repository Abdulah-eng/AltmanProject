# Property Setup Guide

This guide will help you set up the property management system so properties appear on the home page.

## Step 1: Database Setup

### Run the Database Script
1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Run the following script:

```sql
-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  address VARCHAR(500) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(50) NOT NULL,
  zip_code VARCHAR(20) NOT NULL,
  price DECIMAL(15,2) NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  square_feet INTEGER NOT NULL,
  property_type VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'for_sale',
  description TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);

-- Insert sample properties
INSERT INTO properties (
  title, address, city, state, zip_code, price, bedrooms, bathrooms, square_feet, 
  property_type, status, description, featured
) VALUES 
(
  'Luxury Estate in Hidden Hills',
  '24341 ROLLING VIEW RD',
  'HIDDEN HILLS',
  'CA',
  '91302',
  16495000,
  5,
  7,
  5980,
  'luxury',
  'for_sale',
  'Stunning luxury estate featuring panoramic views, custom finishes, and resort-style amenities.',
  true
),
(
  'Beverly Hills Modern Villa',
  '1535 CARLA RDG',
  'BEVERLY HILLS',
  'CA',
  '90210',
  12500000,
  6,
  8,
  7200,
  'luxury',
  'for_sale',
  'Contemporary masterpiece with open floor plan, smart home technology, and private pool.',
  true
),
(
  'Los Angeles Hillside Retreat',
  '1895 RISING GLEN RD',
  'LOS ANGELES',
  'CA',
  '90046',
  8900000,
  4,
  5,
  4800,
  'luxury',
  'for_sale',
  'Architectural gem with breathtaking city views, gourmet kitchen, and outdoor entertainment area.',
  true
);
```

## Step 2: Verify Database Setup

Run this test query to verify the setup:

```sql
-- Check if properties exist
SELECT COUNT(*) as total_properties FROM properties;

-- Check featured properties
SELECT title, address, price, featured, status 
FROM properties 
WHERE featured = true AND status = 'for_sale';
```

## Step 3: Add Properties Through Admin Dashboard

1. Go to `/admin` in your browser
2. Click on the "Properties" tab
3. Click "+ Add Property" button
4. Fill in the form:
   - **Upload an image** (required)
   - **Property Title**: e.g., "Luxury Estate in Hidden Hills"
   - **Price**: e.g., 16495000
   - **Address**: e.g., "24341 ROLLING VIEW RD"
   - **City**: e.g., "HIDDEN HILLS"
   - **State**: e.g., "CA"
   - **ZIP Code**: e.g., "91302"
   - **Bedrooms**: e.g., 5
   - **Bathrooms**: e.g., 7
   - **Square Feet**: e.g., 5980
   - **Property Type**: Select "Luxury Estate"
   - **Status**: Select "For Sale"
   - **Description**: Add a description
   - **Featured**: ✅ Check this box (IMPORTANT!)
5. Click "Add Property"

## Step 4: Check Home Page

1. Go to your home page (`/`)
2. Scroll down to the property carousel section
3. You should see your properties displayed

## Troubleshooting

### Properties Not Showing on Home Page?

1. **Check Console**: Open browser dev tools (F12) and check the console for errors
2. **Verify Featured Status**: Make sure properties are marked as "Featured" in admin
3. **Check Status**: Properties must have status "For Sale" to appear
4. **Database Connection**: Ensure Supabase is properly configured

### Console Errors?

If you see errors in the browser console:
1. Check that your Supabase environment variables are set
2. Verify the database table exists
3. Check that properties have the correct `featured` and `status` values

### Test Database Connection

Add this to your browser console to test:

```javascript
// Test database connection
fetch('/api/test-db')
  .then(response => response.json())
  .then(data => console.log('Database test:', data))
  .catch(error => console.error('Database error:', error));
```

## Expected Result

After following these steps, you should see:
- Properties in the admin dashboard
- Properties appearing in the carousel on the home page
- Properties cycling through automatically
- Navigation arrows working
- Property details displayed correctly

If you're still having issues, check the browser console for any error messages and ensure all database scripts have been run successfully. 