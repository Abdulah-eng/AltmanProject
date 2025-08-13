# Image Management System

This document explains how to use the new image management system for managing all main images across the website through the admin dashboard.

## Overview

The image management system allows you to upload and manage all main images for each page using predefined keys. Images are stored as key-value pairs in the database, making it easy to reference them in components.

## Database Schema

The `images` table includes the following fields:
- `id`: Unique identifier
- `name`: Display name for the image
- `url`: Public URL of the uploaded image
- `alt_text`: Alt text for accessibility
- `category`: Optional category (e.g., hero, background, content)
- `section`: Page section (e.g., home, about, contact)
- `image_key`: Predefined key for easy reference
- `created_at`: Timestamp

## Predefined Image Keys

### Home Page (`home`)
- `hero_image`: Home Page Hero Image
- `about_section_image`: Home About Section Image
- `services_section_image`: Home Services Section Image
- `team_section_image`: Home Team Section Image
- `stats_section_image`: Home Stats Section Image
- `contact_section_image`: Home Contact Section Image

### About Page (`about`)
- `hero_image`: About Page Hero Image
- `team_image`: About Team Image
- `office_image`: About Office Image
- `process_image`: About Process Image

### Contact Page (`contact`)
- `hero_image`: Contact Page Hero Image
- `background_image`: Contact Background Image
- `office_image`: Contact Office Image

### Properties Page (`properties`)
- `hero_image`: Properties Page Hero Image
- `listing_image`: Properties Listing Image
- `search_image`: Properties Search Image
- `map_image`: Properties Map Image

### Services Page (`services`)
- `hero_image`: Services Page Hero Image
- `buying_image`: Services Buying Image
- `selling_image`: Services Selling Image
- `investment_image`: Services Investment Image

### Blog Page (`blog`)
- `hero_image`: Blog Page Hero Image
- `default_image`: Blog Default Image

### Training Page (`training`)
- `hero_image`: Training Page Hero Image

## Using the Admin Dashboard

### Accessing Image Management
1. Go to `/admin`
2. Click on the "Images" tab
3. You'll see tabs for each page section

### Uploading Images
1. Click "Upload Image" button
2. Select the page section (e.g., Home, About, Contact)
3. Choose the image key (e.g., Hero Image, Background Image)
4. Enter a descriptive name and alt text
5. Select an image file
6. Click upload

### Managing Images
- **View**: See all images organized by page section
- **Edit**: Update image details (name, alt text, category)
- **Copy URL**: Copy the image URL to clipboard
- **Delete**: Remove images (also deletes from storage)

## Using Images in Components

### Basic Usage

```typescript
import { getImageByKey } from "@/lib/image-utils"

// In your component
const [heroImage, setHeroImage] = useState(null)

useEffect(() => {
  const fetchImage = async () => {
    const image = await getImageByKey('hero_image')
    if (image) {
      setHeroImage(image)
    }
  }
  fetchImage()
}, [])

// Use the image
<Image 
  src={heroImage?.url || '/fallback.jpg'} 
  alt={heroImage?.alt_text || 'Hero image'} 
/>
```

### Multiple Images

```typescript
import { getImagesByKeys } from "@/lib/image-utils"

// Fetch multiple images at once
const imageKeys = ['hero_image', 'about_section_image', 'team_image']
const images = await getImagesByKeys(imageKeys)

// Access specific images
const heroImage = images['hero_image']
const aboutImage = images['about_section_image']
```

### Section Images

```typescript
import { getImagesBySection } from "@/lib/image-utils"

// Get all images for a section
const homeImages = await getImagesBySection('home')
```

### Utility Functions

```typescript
import { getImageUrl, getImageKeysForSection } from "@/lib/image-utils"

// Get URL with fallback
const imageUrl = await getImageUrl('hero_image', '/default-hero.jpg')

// Get available keys for a section
const homeImageKeys = getImageKeysForSection('home')
```

## Database Setup

Run the following SQL to update your database:

```sql
-- Update images table to include image_key field
ALTER TABLE images ADD COLUMN IF NOT EXISTS image_key VARCHAR(255);

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_images_image_key ON images(image_key);

-- Update existing images (if any)
UPDATE images SET image_key = CONCAT(section, '_', LOWER(REPLACE(name, ' ', '_'))) WHERE image_key IS NULL;
```

## Best Practices

1. **Consistent Naming**: Use descriptive names for images
2. **Alt Text**: Always provide meaningful alt text for accessibility
3. **Image Optimization**: Upload optimized images (recommended: WebP format)
4. **Fallbacks**: Always provide fallback images in components
5. **Error Handling**: Handle cases where images might not exist

## File Structure

```
lib/
  image-utils.ts          # Utility functions for image management
components/admin/
  image-manager.tsx       # Admin dashboard image manager
scripts/
  update-images-table.sql # Database migration script
```

## Example Component Integration

Here's how the Hero Section component uses the image management system:

```typescript
// components/hero-section.tsx
import { getImageByKey, ImageData } from "@/lib/image-utils"

export function HeroSection({ data }: HeroSectionProps) {
  const [heroImage, setHeroImage] = useState<ImageData | null>(null)

  useEffect(() => {
    const fetchHeroImage = async () => {
      const image = await getImageByKey('hero_image')
      if (image) {
        setHeroImage(image)
      }
    }
    fetchHeroImage()
  }, [])

  const imageUrl = heroImage?.url || data?.image_url || '/placeholder.jpg'

  return (
    <Image 
      src={imageUrl} 
      alt={heroImage?.alt_text || "Hero background"} 
    />
  )
}
```

This system provides a centralized way to manage all website images through the admin dashboard while maintaining easy access in components through predefined keys. 