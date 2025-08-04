# Team Management System

This document explains how to use the team management system for managing team members that appear on the about page.

## Overview

The team management system allows you to add, edit, and manage team members through the admin dashboard. Team members are displayed on the about page in a beautiful grid layout with their photos, names, titles, and social media links.

## Database Schema

The `team_members` table includes the following fields:
- `id`: Unique identifier (UUID)
- `name`: Full name of the team member
- `title`: Job title/position
- `bio`: Short biography or description
- `image_url`: URL of the team member's photo
- `email`: Email address
- `phone`: Phone number
- `linkedin_url`: LinkedIn profile URL
- `instagram_url`: Instagram profile URL
- `twitter_url`: Twitter profile URL
- `featured`: Boolean flag for featured team members
- `order_index`: Display order (lower numbers appear first)
- `created_at`: Timestamp
- `updated_at`: Timestamp

## Using the Admin Dashboard

### Accessing Team Management
1. Go to `/admin`
2. Click on the "Team" tab
3. You'll see all team members and an "Add Team Member" button

### Adding a New Team Member
1. Click "Add Team Member" button
2. Upload a team member photo
3. Fill in all the required fields:
   - **Name**: Full name of the team member
   - **Title**: Job title or position
   - **Bio**: Short biography (optional)
   - **Email**: Email address (optional)
   - **Phone**: Phone number (optional)
   - **LinkedIn URL**: LinkedIn profile link (optional)
   - **Instagram URL**: Instagram profile link (optional)
   - **Twitter URL**: Twitter profile link (optional)
   - **Display Order**: Number for ordering (lower = first)
   - **Featured**: Check this for featured team members
4. Click "Add Team Member" to save

### Managing Team Members
- **View**: See all team members in a grid layout with photos and details
- **Edit**: Click the edit button to modify team member details
- **Delete**: Click the delete button to remove team members (also deletes photo from storage)
- **Featured Badge**: Featured team members show a star icon

## About Page Display

Team members are automatically displayed on the about page (`/about`) in the "MEET THE TEAM" section. The display includes:

- **Team Member Photos**: Circular profile images
- **Names**: Displayed with last name in gold
- **Titles**: Job titles in gold text
- **Bios**: Short descriptions (if provided)
- **Social Links**: LinkedIn, Instagram, Twitter, and email icons
- **Responsive Layout**: Adapts to different screen sizes

## Database Setup

Run the following SQL to create the team members table:

```sql
-- Run the script: scripts/create-team-table.sql
```

This will:
- Create the team_members table with all necessary fields
- Add indexes for better performance
- Create triggers for automatic timestamp updates
- Insert sample team members (Josh, Matt, and Heather Altman)

## Using Team Members in Components

### Fetching All Team Members

```typescript
import { getTeamMembers } from "@/lib/team-utils"

// In your component
const [teamMembers, setTeamMembers] = useState([])

useEffect(() => {
  const fetchTeamMembers = async () => {
    const members = await getTeamMembers()
    setTeamMembers(members)
  }
  fetchTeamMembers()
}, [])
```

### Fetching Featured Team Members

```typescript
import { getFeaturedTeamMembers } from "@/lib/team-utils"

// Get only featured team members
const featuredMembers = await getFeaturedTeamMembers()
```

### Fetching with Filters

```typescript
import { getTeamMembersWithFilters } from "@/lib/team-utils"

// Get featured team members with limit
const featuredMembers = await getTeamMembersWithFilters({
  featured: true,
  limit: 3
})
```

## File Structure

```
components/admin/
  team-manager.tsx       # Admin dashboard team manager
lib/
  team-utils.ts          # Utility functions for team management
scripts/
  create-team-table.sql  # Database setup script
components/
  team-section.tsx       # Team section component for about page
```

## Example Team Member Data

Here's an example of the team member data structure:

```typescript
{
  id: "uuid-here",
  name: "JOSH ALTMAN",
  title: "CO-FOUNDER & SENIOR AGENT",
  bio: "Josh Altman is a co-founder of The Altman Brothers...",
  image_url: "https://storage.supabase.co/...",
  email: "josh@altmanbrothers.com",
  phone: "310.819.3250",
  linkedin_url: "https://linkedin.com/in/joshaltman",
  instagram_url: "https://instagram.com/joshaltman",
  twitter_url: "https://twitter.com/joshaltman",
  featured: true,
  order_index: 1,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z"
}
```

## Best Practices

1. **Photo Quality**: Upload high-quality square photos (recommended: 400x400px minimum)
2. **Names**: Use full names in uppercase for consistency
3. **Titles**: Keep titles concise and professional
4. **Bios**: Write engaging but brief biographies
5. **Social Links**: Include relevant social media profiles
6. **Display Order**: Use order_index to control the display sequence
7. **Featured Members**: Mark key team members as featured

## Features

- **Image Upload**: Direct upload to Supabase storage
- **Social Media Integration**: LinkedIn, Instagram, Twitter, and email links
- **Display Ordering**: Control the order team members appear
- **Featured Status**: Highlight important team members
- **Responsive Design**: Works on all device sizes
- **Real-time Updates**: Changes appear immediately on the about page

This system provides a complete solution for managing team members that will automatically appear on the about page with a professional, modern design. 