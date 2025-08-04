# Complete Setup Guide - Images & Team Members

This comprehensive guide covers the setup and usage of all dynamic content systems in your website.

## 🎯 **What's Been Implemented**

### 1. **Social Media Images System**
- Admin panel for managing social media images
- Database storage with social handles and platforms
- Frontend display in social section

### 2. **Page Images System**
- Admin panel for managing page-specific images
- Database storage with section and key identifiers
- Frontend components fetch images dynamically

### 3. **Team Members System**
- Admin panel for managing team members
- Database storage with member details and images
- Frontend displays team members dynamically

## 📊 **Database Tables**

### 1. **social_images** Table
```sql
CREATE TABLE social_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  social_handle VARCHAR(100) NOT NULL,
  platform VARCHAR(20) NOT NULL DEFAULT 'instagram',
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. **images** Table
```sql
CREATE TABLE images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  alt_text TEXT,
  category VARCHAR(100),
  section VARCHAR(50) NOT NULL,
  image_key VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. **team_members** Table
```sql
CREATE TABLE team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  bio TEXT,
  image_url TEXT,
  email VARCHAR(255),
  phone VARCHAR(50),
  linkedin_url TEXT,
  instagram_url TEXT,
  twitter_url TEXT,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🗂️ **Storage Setup**

### 1. **Create Storage Bucket**
In your Supabase dashboard:
1. Go to Storage
2. Create a new bucket called `website-images`
3. Set it to public

### 2. **Storage Policies**
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

## 🎨 **Image Keys for Each Page**

### **Home Page Images**
- `hero_image` - Main hero background image
- `about_section_image` - About section image
- `services_section_image` - Services section image
- `team_section_image` - Team section image
- `stats_section_image` - Stats section background
- `contact_section_image` - Contact section image

### **About Page Images**
- `hero_image` - About page hero image
- `team_image` - Team image
- `office_image` - Office image
- `process_image` - Process image

### **Services Page Images**
- `hero_image` - Services page hero image
- `process_image` - Process image
- `buying_image` - Buying service image
- `selling_image` - Selling service image
- `investment_image` - Investment service image

### **Properties/Listings Page Images**
- `hero_image` - Properties page hero image
- `listing_image` - Listing image
- `search_image` - Search image
- `map_image` - Map image

## 🔧 **Admin Panel Usage**

### 1. **Access Admin Panel**
- Go to `/admin`
- Log in with your credentials
- Navigate between different tabs

### 2. **Social Images Management**
- Go to "Social Images" tab
- Click "Add Social Image"
- Fill in:
  - Image file
  - Title and description
  - Social handle (e.g., @thejoshaltman)
  - Platform (Instagram, Facebook, Twitter, TikTok)
  - Published/Featured status
  - Display order

### 3. **Page Images Management**
- Go to "Images" tab
- Click "Upload Image"
- Fill in:
  - Page Section (home, about, services, etc.)
  - Image Key (hero_image, about_section_image, etc.)
  - Image file
  - Name and alt text
  - Category (optional)

### 4. **Team Members Management**
- Go to "Team" tab
- Click "Add Team Member"
- Fill in:
  - Name and title
  - Bio and image
  - Contact information
  - Social media links
  - Featured status and order

## 🎯 **Frontend Integration**

### 1. **Updated Components**

#### **Home Page Components**
- **Hero Section**: Fetches `hero_image`
- **About Section**: Fetches `about_section_image`
- **Stats Section**: Fetches `stats_section_image`
- **Team Section**: Fetches team members from database
- **Social Section**: Fetches social images from database

#### **Other Pages**
- **About Page**: Fetches `hero_image`, `team_image`, and team members
- **Services Page**: Fetches `process_image`
- **Listings Page**: Fetches `hero_image`

### 2. **Utility Functions**

#### **Image Utilities**
- `lib/image-utils.ts` - Original image utilities
- `lib/page-images-utils.ts` - Page-specific utilities
- `lib/social-images-utils.ts` - Social image utilities

#### **Team Utilities**
- `lib/team-utils.ts` - Team member utilities

### 3. **Image Fetching Pattern**
```typescript
import { getImageByKey, ImageData } from "@/lib/image-utils"

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

// Use with fallback
const imageUrl = image?.url || '/placeholder.jpg'
const imageAlt = image?.alt_text || 'Image description'
```

## 🧪 **Testing**

### 1. **Test Pages**
- `/test-images` - Test home page images
- `/test-all` - Comprehensive test of all systems

### 2. **Testing Checklist**
- [ ] Upload images through admin panel
- [ ] Add team members through admin panel
- [ ] Add social images through admin panel
- [ ] Verify images appear on test pages
- [ ] Check images display on actual pages
- [ ] Test team members on home and about pages
- [ ] Test social images on social section
- [ ] Verify fallback images work
- [ ] Test responsive design
- [ ] Check loading states

## 🔍 **Troubleshooting**

### **Common Issues**

1. **Images not uploading**
   - Check storage bucket permissions
   - Verify admin authentication
   - Check file size limits

2. **Images not displaying**
   - Verify image keys match exactly
   - Check database records exist
   - Verify image URLs are valid

3. **Team members not showing**
   - Check if team members are added
   - Verify featured status
   - Check order_index values

4. **Social images not appearing**
   - Verify published status
   - Check social handles
   - Verify platform selection

### **Debug Steps**

1. **Check Database**
   ```sql
   SELECT * FROM images WHERE section = 'home';
   SELECT * FROM team_members ORDER BY order_index;
   SELECT * FROM social_images WHERE published = true;
   ```

2. **Check Storage**
   - Go to Supabase Storage
   - Verify files exist in `website-images` bucket

3. **Use Test Pages**
   - Visit `/test-images` for page images
   - Visit `/test-all` for comprehensive testing

4. **Check Browser Console**
   - Look for fetch errors
   - Check image loading errors

## 📋 **Setup Checklist**

### **Database Setup**
- [ ] Run social_images table creation script
- [ ] Run images table creation script (if not exists)
- [ ] Run team_members table creation script (if not exists)
- [ ] Enable Row Level Security
- [ ] Create storage policies

### **Admin Panel Setup**
- [ ] Verify admin authentication works
- [ ] Test image upload functionality
- [ ] Test team member creation
- [ ] Test social image creation

### **Frontend Setup**
- [ ] Verify components fetch data correctly
- [ ] Test fallback images
- [ ] Check responsive design
- [ ] Verify loading states

### **Content Setup**
- [ ] Upload home page images
- [ ] Add team members
- [ ] Upload social images
- [ ] Upload page-specific images
- [ ] Test all pages

## 🚀 **Performance Tips**

1. **Image Optimization**
   - Use appropriate image sizes
   - Compress images before upload
   - Use WebP format when possible

2. **Loading Strategy**
   - Use priority loading for hero images
   - Implement lazy loading for other images
   - Use proper fallback images

3. **Caching**
   - Images are served via CDN
   - Database queries are optimized
   - Use proper cache headers

## 🔒 **Security**

- Only authenticated users can manage content
- Public read access for published content
- Row Level Security enabled
- File upload restrictions in place
- Input validation on all forms

## 📞 **Support**

If you encounter issues:
1. Check the troubleshooting section
2. Use the test pages to verify functionality
3. Check browser console for errors
4. Verify database and storage setup
5. Test with sample data first

This system provides a complete content management solution for your website with dynamic images, team members, and social media content that can be managed through the admin panel. 