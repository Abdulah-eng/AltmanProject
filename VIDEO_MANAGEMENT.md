# Video Management System

This document explains how to use the video management system for displaying YouTube videos on the home page.

## Overview

The video management system allows you to upload, manage, and display YouTube videos through the admin dashboard. Videos are displayed on the home page in beautiful card layouts with thumbnails and play buttons.

## Database Schema

The `videos` table includes the following fields:
- `id`: Unique identifier (UUID)
- `title`: Video title
- `description`: Video description
- `youtube_url`: YouTube video URL
- `thumbnail_url`: Custom thumbnail URL (optional)
- `published`: Boolean flag for published videos
- `featured`: Boolean flag for featured videos
- `order_index`: Display order (lower numbers appear first)
- `created_at`: Timestamp
- `updated_at`: Timestamp

## Using the Admin Dashboard

### Accessing Video Management
1. Go to `/admin`
2. Click on the "Videos" tab
3. You'll see all videos and an "Add Video" button

### Adding a New Video
1. Click "Add Video" button
2. Fill in the required fields:
   - **Title**: Video title
   - **Description**: Video description (optional)
   - **YouTube URL**: YouTube video URL (required)
   - **Custom Thumbnail URL**: Custom thumbnail (optional)
   - **Display Order**: Number for ordering (lower = first)
   - **Published**: Check to make video visible
   - **Featured**: Check for featured videos
3. Click "Add Video" to save

### Managing Videos
- **View**: See all videos in a grid layout with thumbnails
- **Edit**: Click the edit button to modify video details
- **Delete**: Click the delete button to remove videos
- **Featured Badge**: Featured videos show a star icon
- **Published Status**: Published videos show a green badge

## YouTube URL Support

The system supports various YouTube URL formats:
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://youtube.com/embed/VIDEO_ID`
- `https://youtube.com/v/VIDEO_ID`

## Display Locations

### Home Page (`/`)
- Shows only featured videos in a "WATCH THE LATEST" section
- Appears between team section and other content sections
- Videos are displayed in a grid layout with thumbnails and play buttons

## Database Setup

Run the following SQL to update the videos table:

```sql
-- Run the script: scripts/update-videos-table.sql
```

This will:
- Add `featured` and `order_index` columns to existing videos table
- Create indexes for better performance
- Set default values for existing videos

## Using Videos in Components

### Fetching All Published Videos

```typescript
import { getPublishedVideos } from "@/lib/video-utils"

// In your component
const [videos, setVideos] = useState([])

useEffect(() => {
  const fetchVideos = async () => {
    const publishedVideos = await getPublishedVideos()
    setVideos(publishedVideos)
  }
  fetchVideos()
}, [])
```

### Fetching Featured Videos

```typescript
import { getFeaturedVideos } from "@/lib/video-utils"

// Get only featured videos
const featuredVideos = await getFeaturedVideos()
```

### YouTube Utilities

```typescript
import { 
  extractYouTubeVideoId, 
  getYouTubeThumbnail, 
  getYouTubeEmbedUrl 
} from "@/lib/video-utils"

// Extract video ID from URL
const videoId = extractYouTubeVideoId("https://youtube.com/watch?v=abc123")

// Get thumbnail URL
const thumbnailUrl = getYouTubeThumbnail(videoId, "mqdefault")

// Get embed URL
const embedUrl = getYouTubeEmbedUrl(videoId)
```

## File Structure

```
components/admin/
  video-manager.tsx       # Admin dashboard video manager
components/
  video-section.tsx       # Video section component for home page
```

## Admin Dashboard Features

### Video Management
- **Add Videos**: Upload new YouTube videos with titles, descriptions, and custom thumbnails
- **Edit Videos**: Update video details, URLs, and settings
- **Publish/Unpublish**: Control which videos are visible on the site
- **Featured Videos**: Mark videos as featured to appear on home page
- **Order Management**: Control the display order of videos
- **Real-time Updates**: Changes appear immediately on the home page

## Example Video Data

Here's an example of the video data structure:

```typescript
{
  id: "uuid-here",
  title: "Luxury Real Estate Market Update 2024",
  description: "Get the latest insights on the luxury real estate market...",
  youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  thumbnail_url: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
  published: true,
  featured: true,
  order_index: 1,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z"
}
```

## Best Practices

1. **Video Quality**: Use high-quality YouTube videos
2. **Titles**: Write engaging, descriptive titles
3. **Descriptions**: Add informative descriptions
4. **Thumbnails**: Use custom thumbnails for better branding
5. **Display Order**: Use order_index to control video sequence
6. **Featured Videos**: Mark important videos as featured
7. **Published Status**: Only publish videos when ready

## Features

- **YouTube Integration**: Automatic thumbnail extraction
- **URL Validation**: Supports multiple YouTube URL formats
- **Display Ordering**: Control the order videos appear
- **Featured Status**: Highlight important videos
- **Responsive Design**: Works on all device sizes
- **Real-time Updates**: Changes appear immediately
- **Admin Management**: Full CRUD operations through dashboard

## Troubleshooting

### Videos Not Showing
1. Check that videos are marked as "Published"
2. Verify YouTube URLs are valid
3. Check browser console for errors
4. Ensure database connection is working

### Thumbnails Not Loading
1. Verify YouTube video ID extraction
2. Check if video is public on YouTube
3. Try using custom thumbnail URLs

### Admin Dashboard Issues
1. Check Supabase configuration
2. Verify table structure with test script
3. Check browser console for errors

This system provides a complete solution for managing YouTube videos that will automatically appear on the home page with a professional, modern design. 