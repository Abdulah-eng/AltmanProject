# Page Images Setup Guide

This guide explains how to set up and use the page images system for all website pages.

## Overview

The page images system allows you to manage images for different sections of your website through the admin panel. Images are stored in the database and automatically fetched by the frontend components.

## Database Setup

### 1. Create the images table

The `images` table should already exist from the image manager. If not, run this SQL:

```sql
-- Create images table
CREATE TABLE IF NOT EXISTS images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  alt_text TEXT,
  category VARCHAR(100),
  section VARCHAR(50) NOT NULL,
  image_key VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_images_section ON images(section);
CREATE INDEX IF NOT EXISTS idx_images_key ON images(image_key);
CREATE INDEX IF NOT EXISTS idx_images_section_key ON images(section, image_key);

-- Enable RLS
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can view images" ON images FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage images" ON images FOR ALL USING (auth.role() = 'authenticated');
```

## Storage Setup

### 1. Create Storage Bucket

In your Supabase dashboard:
1. Go to Storage
2. Create a new bucket called `website-images`
3. Set it to public
4. Add storage policies:

```sql
-- Allow public read access
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'website-images');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'website-images' AND auth.role() = 'authenticated');

-- Allow authenticated users to update
CREATE POLICY "Authenticated users can update" ON storage.objects FOR UPDATE USING (bucket_id = 'website-images' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete
CREATE POLICY "Authenticated users can delete" ON storage.objects FOR DELETE USING (bucket_id = 'website-images' AND auth.role() = 'authenticated');
```

## Image Keys for Each Page

### Home Page Images
- `hero_image` - Main hero background image
- `about_section_image` - About section image
- `services_section_image` - Services section image
- `team_section_image` - Team section image
- `stats_section_image` - Stats section background
- `contact_section_image` - Contact section image

### About Page Images
- `hero_image` - About page hero image
- `team_image` - Team image
- `office_image` - Office image
- `process_image` - Process image

### Contact Page Images
- `hero_image` - Contact page hero image
- `background_image` - Contact background image
- `office_image` - Office image

### Properties Page Images
- `hero_image` - Properties page hero image
- `listing_image` - Listing image
- `search_image` - Search image
- `map_image` - Map image

### Services Page Images
- `hero_image` - Services page hero image
- `buying_image` - Buying service image
- `selling_image` - Selling service image
- `investment_image` - Investment service image

### Blog Page Images
- `hero_image` - Blog page hero image
- `default_image` - Default blog image

### Training Page Images
- `hero_image` - Training page hero image

## Admin Panel Usage

### 1. Access Image Manager

1. Log in to the admin panel (`/admin`)
2. Navigate to the "Images" tab
3. You'll see the image management interface

### 2. Adding Page Images

1. Click "Upload Image" button
2. Fill in the required fields:
   - **Page Section**: Select the page (home, about, contact, etc.)
   - **Image Key**: Select the specific image key for that page
   - **Image File**: Upload the image file
   - **Image Name**: Enter a descriptive name
   - **Alt Text**: Enter accessibility description
   - **Category**: Optional category
3. Click "Upload Image" to save

### 3. Managing Images

- **Edit**: Click edit to modify image details
- **Delete**: Click delete to remove images
- **Copy URL**: Copy image URL for external use

## Frontend Integration

### 1. Updated Components

The following components have been updated to fetch images from the database:

- **Hero Section** (`components/hero-section.tsx`)
  - Fetches `hero_image` for home page
  - Falls back to placeholder if no image found

- **About Section** (`components/about-section.tsx`)
  - Fetches `about_section_image` for home page
  - Falls back to placeholder if no image found

- **Stats Section** (`components/stats-section.tsx`)
  - Fetches `stats_section_image` for background
  - Falls back to placeholder if no image found

### 2. Utility Functions

The system uses two utility files:

- `lib/image-utils.ts` - Original image utilities
- `lib/page-images-utils.ts` - New page-specific utilities

### 3. Image Fetching Pattern

```typescript
import { getImageByKey, ImageData } from "@/lib/image-utils"

// In your component
const [image, setImage] = useState<ImageData | null>(null)

useEffect(() => {
  const fetchImage = async () => {
    try {
      const img = await getImageByKey('hero_image')
      if (img && img.url) {
        setImage(img)
      }
    } catch (error) {
      console.warn('Failed to fetch image:', error)
    }
  }
  
  fetchImage()
}, [])

// Use image with fallback
const imageUrl = image?.url || '/placeholder.jpg'
const imageAlt = image?.alt_text || 'Image description'
```

## Testing

### 1. Test Page

Visit `/test-images` to see a test page that shows:
- All home page images
- Database information
- Image URLs and metadata

### 2. Testing Checklist

- [ ] Upload images through admin panel
- [ ] Verify images appear on test page
- [ ] Check images display on main page sections
- [ ] Test fallback to placeholder images
- [ ] Verify responsive design
- [ ] Check image loading states

## Troubleshooting

### Common Issues

1. **Images not uploading**
   - Check storage bucket permissions
   - Verify admin authentication
   - Check file size limits

2. **Images not displaying**
   - Verify image keys match exactly
   - Check database records exist
   - Verify image URLs are valid

3. **Fallback images showing**
   - Check if images are uploaded for correct keys
   - Verify section and key combinations
   - Check browser console for errors

### Debug Steps

1. **Check Database**
   ```sql
   SELECT * FROM images WHERE section = 'home';
   ```

2. **Check Storage**
   - Go to Supabase Storage
   - Verify files exist in `website-images` bucket

3. **Check Browser Console**
   - Look for fetch errors
   - Check image loading errors

4. **Use Test Page**
   - Visit `/test-images` to see all images
   - Check which images are missing

## Best Practices

### 1. Image Guidelines

- **Hero Images**: 1920x1080 or larger, landscape
- **Section Images**: 800x600 or similar aspect ratios
- **Team Images**: Square aspect ratio (1:1)
- **File Formats**: JPG, PNG, WebP
- **File Size**: Keep under 2MB for performance

### 2. Naming Conventions

- Use descriptive image names
- Include page and section in alt text
- Use consistent key naming

### 3. Performance

- Images are served via CDN
- Automatic optimization by Supabase
- Lazy loading on frontend
- Fallback images for missing content

## Migration from Static Images

If you have existing static images:

1. Upload them through the admin panel
2. Use the correct image keys
3. Update components to use database images
4. Remove static image files
5. Test all pages

## Security

- Only authenticated users can manage images
- Public read access for all images
- Row Level Security enabled
- File upload restrictions in place 