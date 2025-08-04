# Social Images Management

This document explains how to manage social media images for the social section of the website.

## Overview

The social images management system allows administrators to:
- Upload and manage social media images
- Set social handles and platforms
- Control publishing and featuring
- Order images for display
- Delete images when needed

## Database Setup

### 1. Create the social_images table

Run the SQL script to create the required table:

```sql
-- Run this in your Supabase SQL editor
\i scripts/create-social-images-table.sql
```

### 2. Table Structure

The `social_images` table contains the following fields:

- `id` (UUID): Primary key
- `title` (VARCHAR): Image title/name
- `description` (TEXT): Optional description
- `image_url` (TEXT): URL to the uploaded image
- `social_handle` (VARCHAR): Social media handle (e.g., @thejoshaltman)
- `platform` (VARCHAR): Social platform (instagram, facebook, twitter, tiktok)
- `published` (BOOLEAN): Whether the image is published
- `featured` (BOOLEAN): Whether the image is featured
- `order_index` (INTEGER): Display order
- `created_at` (TIMESTAMP): Creation timestamp
- `updated_at` (TIMESTAMP): Last update timestamp

## Storage Setup

### 1. Create Storage Bucket

In your Supabase dashboard:
1. Go to Storage
2. Create a new bucket called `website-images`
3. Set it to public
4. Add the following storage policy:

```sql
-- Allow public read access to website-images bucket
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'website-images');

-- Allow authenticated users to upload to website-images bucket
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'website-images' AND auth.role() = 'authenticated');

-- Allow authenticated users to update files in website-images bucket
CREATE POLICY "Authenticated users can update" ON storage.objects FOR UPDATE USING (bucket_id = 'website-images' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete files in website-images bucket
CREATE POLICY "Authenticated users can delete" ON storage.objects FOR DELETE USING (bucket_id = 'website-images' AND auth.role() = 'authenticated');
```

## Admin Panel Usage

### 1. Access Social Images Manager

1. Log in to the admin panel
2. Navigate to the "Social Images" tab
3. You'll see the social images management interface

### 2. Adding New Social Images

1. Click "Add Social Image" button
2. Fill in the required fields:
   - **Image File**: Select an image file to upload
   - **Image Title**: Enter a descriptive title
   - **Description**: Optional description
   - **Social Handle**: Enter the social media handle (e.g., @thejoshaltman)
   - **Platform**: Select the social platform
   - **Display Order**: Set the order for display
   - **Published**: Toggle to publish the image
   - **Featured**: Toggle to feature the image
3. Click "Add Image" to save

### 3. Managing Existing Images

- **Edit**: Click the edit button to modify image details
- **Delete**: Click the delete button to remove images
- **View**: Images are displayed in a grid with platform badges and handles

### 4. Image Display

Images are displayed on the main page social section with:
- Platform-specific icons (Instagram, Facebook, Twitter)
- Social handles on hover
- Responsive grid layout
- Loading states and empty states

## Frontend Integration

### 1. Social Section Component

The social section automatically fetches published images from the database:

```typescript
import { getPublishedSocialImages } from "@/lib/social-images-utils"

// Fetch published social images
const images = await getPublishedSocialImages()
```

### 2. Utility Functions

The `lib/social-images-utils.ts` file provides utility functions:

- `getPublishedSocialImages()`: Get all published images
- `getFeaturedSocialImages()`: Get featured images only
- `getAllSocialImages()`: Get all images (admin use)
- `getSocialImageById(id)`: Get specific image by ID
- `getSocialImagesWithFilters(filters)`: Get images with filters

## Testing

### 1. Sample Data

To add sample data for testing, run:

```sql
-- Run this in your Supabase SQL editor
\i scripts/test-social-images.sql
```

### 2. Testing Checklist

- [ ] Upload new social images
- [ ] Edit existing images
- [ ] Delete images
- [ ] Toggle published/featured status
- [ ] Change display order
- [ ] Verify images appear on main page
- [ ] Test responsive design
- [ ] Check loading states

## Best Practices

### 1. Image Guidelines

- Use square images (1:1 aspect ratio) for best display
- Recommended size: 800x800 pixels
- File formats: JPG, PNG, WebP
- Keep file sizes under 2MB

### 2. Content Guidelines

- Use descriptive titles
- Include relevant social handles
- Set appropriate platforms
- Use featured flag for important images
- Maintain consistent order

### 3. Performance

- Images are stored in Supabase storage
- Automatic optimization and CDN delivery
- Lazy loading on frontend
- Responsive images with Next.js Image component

## Troubleshooting

### Common Issues

1. **Images not uploading**: Check storage bucket permissions
2. **Images not displaying**: Verify published status
3. **Order not working**: Check order_index values
4. **Platform icons missing**: Verify platform values match expected values

### Debug Steps

1. Check browser console for errors
2. Verify database records exist
3. Check storage bucket access
4. Test with sample data
5. Verify admin authentication

## Security

- Only authenticated users can manage images
- Public read access for published images
- Row Level Security enabled
- File upload restrictions in place 