# Neighborhoods and New Developments Setup Guide

This guide explains how to set up and use the new neighborhoods and new developments functionality in your luxury real estate website.

## Overview

The system now allows administrators to:
- Add, edit, and delete neighborhoods
- Add, edit, and delete new developments
- Mark items as featured for display on the main page
- Control display order of items
- Upload images for each item

## Database Setup

### 1. Run the SQL Scripts

**IMPORTANT: Run these scripts in the correct order!**

**First, run the storage setup:**
```sql
-- Copy and paste the contents of scripts/setup-storage.sql
-- This creates the storage bucket and policies for image uploads
```

**Then, run the tables setup:**
```sql
-- Copy and paste the contents of scripts/setup-neighborhoods-new-developments.sql
-- This creates the necessary tables, indexes, and triggers
```

**Finally, test the connection:**
```sql
-- Copy and paste the contents of scripts/quick-test.sql
-- This verifies everything is working correctly
```

### 2. Verify Tables Created

After running the scripts, you should see:
- `neighborhoods` table with columns: id, name, description, image_file, featured, display_order, created_at, updated_at
- `new_developments` table with columns: id, name, description, image_file, location, price_range, featured, display_order, created_at, updated_at
- `images` storage bucket with proper policies

### 3. Check for Errors

If you see any errors:
1. Make sure you're running the scripts in the correct order
2. Check that you have admin access to your Supabase project
3. Verify your Supabase project is active and not paused
4. Run the test script to identify specific issues

## Admin Panel Usage

### Accessing the New Sections

1. Navigate to `/admin` in your browser
2. Log in with your admin credentials
3. You'll see two new tabs:
   - **Neighborhoods** - Manage premier neighborhoods
   - **New Developments** - Manage luxury new developments

### Adding a New Neighborhood

1. Click on the "Neighborhoods" tab
2. Click "Add Neighborhood" button
3. Fill in the form:
   - **Name** (required): The neighborhood name
   - **Description**: Detailed description of the area
   - **Image**: Upload an image file directly (JPEG, PNG, WebP, max 5MB)
   - **Featured**: Check to display on the main page
   - **Display Order**: Number to control sorting order
4. Click "Create"

### Adding a New Development

1. Click on the "New Developments" tab
2. Click "Add Development" button
3. Fill in the form:
   - **Name** (required): The development name
   - **Description**: Detailed description of the project
   - **Location**: Where the development is located
   - **Price Range**: Price range (e.g., "$2.5M - $5M")
   - **Image**: Upload an image file directly (JPEG, PNG, WebP, max 5MB)
   - **Featured**: Check to display on the main page
   - **Display Order**: Number to control sorting order
4. Click "Create"

### Managing Existing Items

- **Edit**: Click the edit button (pencil icon) to modify an item
- **Delete**: Click the delete button (trash icon) to remove an item
- **Featured Status**: Toggle the featured checkbox to show/hide items on the main page
- **Display Order**: Adjust the order number to control how items appear

## Main Page Display

### How It Works

1. The main page (`/`) automatically fetches featured neighborhoods and new developments
2. Items marked as "featured" will appear on the main page
3. Items are sorted by display order, then by creation date
4. **No hardcoded data is displayed** - only real database content is shown
5. If no database items exist, the sections are completely hidden

### Customization

- **Images**: Upload high-quality images directly through the admin panel
- **Descriptions**: Write compelling descriptions to engage visitors
- **Featured Items**: Control which items appear on the main page
- **Display Order**: Arrange items in your preferred sequence

## Image Upload Guidelines

### Supported Formats

- **JPEG** (.jpg, .jpeg)
- **PNG** (.png)
- **WebP** (.webp)

### Image Requirements

- **File Size**: Maximum 5MB
- **Aspect Ratio**: 16:9 or 4:3 works best for consistent display
- **Resolution**: Minimum 800x600 pixels recommended
- **Content**: Show luxury real estate, cityscapes, or architectural elements

### Upload Process

1. Click the file input in the admin form
2. Select your image file
3. Preview the image before saving
4. Remove and replace images as needed
5. Images are automatically stored in Supabase storage

## Troubleshooting

### Common Issues

1. **Items Not Appearing on Main Page**
   - Check if items are marked as "featured"
   - Verify display order is set correctly
   - Check browser console for errors

2. **Images Not Loading**
   - Check if images were uploaded successfully
   - Verify Supabase storage bucket exists
   - Check storage policies and permissions
   - Ensure images are in supported formats

3. **Admin Panel Not Working**
   - Verify you're logged in as admin
   - Check browser console for errors
   - Ensure database tables exist

### Database Connection Issues

If you see "Database not configured" messages:
1. Check your Supabase environment variables
2. Verify database tables exist
3. Check database permissions
4. Ensure RLS policies are configured correctly

## Security Considerations

### Row Level Security (RLS)

The setup script includes commented RLS policies. To enable:

1. Uncomment the RLS enable lines
2. Uncomment the policy creation lines
3. Adjust policies based on your security requirements

### Admin Access

- Only users with admin privileges can access the management panels
- Ensure proper authentication is in place
- Consider implementing role-based access control

## Performance Optimization

### Database Indexes

The setup script creates indexes for:
- Featured items (for quick filtering)
- Display order (for efficient sorting)

### Caching

Consider implementing caching for:
- Featured neighborhoods and developments
- Image URLs
- Database queries

## Future Enhancements

Potential improvements to consider:
- Bulk import/export functionality
- Image upload to cloud storage
- Advanced filtering and search
- Analytics and reporting
- Multi-language support
- SEO optimization features

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify database connectivity
3. Review the setup steps above
4. Check Supabase logs for database errors

## Files Modified

The following files were created or modified:
- `lib/neighborhood-utils.ts` - Neighborhood utility functions
- `lib/new-developments-utils.ts` - New developments utility functions
- `lib/image-upload-utils.ts` - Image upload and storage utilities
- `components/admin/neighborhood-manager.tsx` - Neighborhood admin component with image upload
- `components/admin/new-developments-manager.tsx` - New developments admin component with image upload
- `app/admin/page.tsx` - Admin dashboard (added new tabs)
- `app/page.tsx` - Main page (added data fetching)
- `components/premier-neighborhoods-section.tsx` - Updated to use database data only
- `components/new-developments-section.tsx` - Updated to use database data only
- `scripts/setup-neighborhoods-new-developments.sql` - Database setup script
- `scripts/setup-storage.sql` - Storage bucket setup script
