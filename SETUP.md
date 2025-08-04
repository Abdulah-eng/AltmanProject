# Admin Dashboard Setup Guide

## Overview

The admin dashboard has been updated to:
1. ✅ Fetch real data from the database instead of hardcoded values
2. ✅ Support image uploads for the hero section (saves to Supabase storage)
3. ✅ Display live statistics from the database
4. ✅ All admin managers now work with real data

## Database Schema

The application uses the following tables (defined in `supabase-schema.sql`):
- `hero_content` - Hero section content and images
- `blogs` - Blog posts
- `testimonials` - Client testimonials
- `videos` - Video content
- `images` - General image management
- `appointments` - Client appointments
- `client_requirements` - Client property requirements

## Setup Instructions

### 1. Configure Supabase

1. **Create a Supabase project:**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your Project URL and anon key

2. **Update environment variables:**
   ```bash
   # In your .env.local file
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here
   ```

3. **Set up the database:**
   ```bash
   # Run the SQL schema
   # Copy the contents of supabase-schema.sql and run it in your Supabase SQL editor
   
   # Or use the setup script (after configuring env vars)
   npm run setup-db
   ```

### 2. Configure Email (Optional)

For appointment notifications, add these to your `.env.local`:
```bash
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-email-password
SMTP_FROM=noreply@yourdomain.com
```

### 3. Admin Access

- **Admin Email:** `mabdulaharshad@gmail.com`
- **Login:** Use either `/auth/login` or `/admin/login`
- **Dashboard:** Automatically redirects to `/admin` for admin users

## Features

### Admin Dashboard Overview
- **Real-time Statistics:** Shows actual counts from database
- **Appointments:** Total appointments
- **Blogs:** Published blog count
- **Testimonials:** Published testimonial count
- **Videos:** Published video count

### Hero Content Manager
- **Image Upload:** Upload images directly to Supabase storage
- **Preview:** See image preview before saving
- **Storage:** Images stored in `website-images` bucket under `hero/` folder
- **URL Management:** Automatically generates and stores image URLs

### All Managers Support Real Data
- ✅ **Appointment Manager:** Manage client appointments
- ✅ **Blog Manager:** Create and manage blog posts
- ✅ **Testimonial Manager:** Manage client testimonials
- ✅ **Video Manager:** Manage video content
- ✅ **Image Manager:** Upload and manage images
- ✅ **Client Requirements Manager:** Handle client property requirements

## Storage Bucket

The application uses a Supabase storage bucket called `website-images` with the following structure:
- `hero/` - Hero section images
- `images/` - General website images

## Security

- Row Level Security (RLS) is enabled on all tables
- Admin access is restricted to `mabdulaharshad@gmail.com`
- Storage policies allow admin uploads and public reads

## Troubleshooting

### "Supabase not configured" Error
- Ensure your `.env.local` file has the correct Supabase credentials
- Restart your development server after updating environment variables

### Image Upload Issues
- Check that the `website-images` bucket exists in your Supabase project
- Verify storage policies are set up correctly
- Ensure you're logged in as the admin user

### Database Connection Issues
- Verify your Supabase URL and anon key are correct
- Check that the database schema has been applied
- Ensure RLS policies are configured properly

## Next Steps

1. **Customize Content:** Update hero content, blogs, and testimonials
2. **Upload Real Images:** Replace placeholder images with actual photos
3. **Configure Email:** Set up SMTP for appointment notifications
4. **Add Real Data:** Populate with your actual business data
5. **Test Admin Functions:** Verify all CRUD operations work correctly

## File Structure

```
app/
├── admin/
│   ├── login/page.tsx          # Admin login
│   └── page.tsx               # Admin dashboard
├── auth/
│   └── login/page.tsx         # Regular login (redirects admin)
└── api/
    └── send-appointment-email/ # Email notifications

components/admin/
├── hero-content-manager.tsx   # Hero content + image upload
├── appointment-manager.tsx    # Appointment management
├── blog-manager.tsx          # Blog management
├── testimonial-manager.tsx   # Testimonial management
├── video-manager.tsx         # Video management
├── image-manager.tsx         # Image management
└── client-requirements-manager.tsx # Requirements management
```

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify your Supabase configuration
3. Ensure all environment variables are set correctly
4. Check that the database schema has been applied 