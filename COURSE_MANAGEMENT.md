# Course Management System

This document explains how to use the course management system for displaying training courses on the training page.

## Overview

The course management system allows you to add, edit, and manage training courses through the admin dashboard. Courses are displayed on the training page (`/training`) in beautiful card layouts with images, pricing, and learning outcomes.

## Database Schema

The `courses` table includes the following fields:
- `id`: Unique identifier (UUID)
- `title`: Course title
- `description`: Course description
- `price`: Course price (decimal)
- `duration`: Course duration (e.g., "8 Weeks", "2 Days")
- `level`: Skill level (e.g., "Beginner to Advanced")
- `learning_outcomes`: Array of learning outcomes
- `image_url`: Course image URL (optional)
- `featured`: Boolean flag for featured courses
- `order_index`: Display order (lower numbers appear first)
- `created_at`: Timestamp
- `updated_at`: Timestamp

## Using the Admin Dashboard

### Accessing Course Management
1. Go to `/admin`
2. Click on the "Courses" tab
3. You'll see all courses and an "Add Course" button

### Adding a New Course
1. Click "Add Course" button
2. Fill in the required fields:
   - **Course Image**: Upload an image for the course (required for new courses)
   - **Course Title**: Name of the course
   - **Price**: Course price in USD
   - **Description**: Course description
   - **Duration**: How long the course takes (e.g., "8 Weeks")
   - **Skill Level**: Target audience level (e.g., "Beginner to Advanced")
   - **Learning Outcomes**: List of what students will learn
   - **Display Order**: Number for ordering (lower = first)
   - **Featured Course**: Check to mark as featured
3. Click "Add Course" to save

### Managing Courses
- **View**: See all courses in a grid layout with images and details
- **Edit**: Click the edit button to modify course details
- **Delete**: Click the delete button to remove courses
- **Featured Badge**: Featured courses show a star icon
- **Order Display**: Shows the display order for each course

## Learning Outcomes Management

The system supports dynamic learning outcomes:
- **Add**: Click "Add Learning Outcome" to add new items
- **Remove**: Click "Remove" next to any outcome (minimum 1 required)
- **Edit**: Type directly in the input fields to modify outcomes
- **Array Storage**: Outcomes are stored as a PostgreSQL array

## Display Locations

### Training Page (`/training`)
- Shows all courses in the "TRAINING PROGRAMS" section
- Each course displays:
  - Course image (if available)
  - Title and description
  - Price in USD format
  - Duration and skill level
  - Learning outcomes with checkmarks
  - "ENROLL NOW" button

## Database Setup

Run the following SQL to create the courses table:

```sql
-- Run the script: scripts/create-courses-table.sql
```

This will:
- Create the `courses` table with all required fields
- Add indexes for better performance
- Create an `updated_at` trigger
- Insert three sample courses

## Using Courses in Components

### Fetching All Courses

```typescript
import { getCourses } from "@/lib/course-utils"

// In your component
const [courses, setCourses] = useState([])

useEffect(() => {
  const fetchCourses = async () => {
    const allCourses = await getCourses()
    setCourses(allCourses)
  }
  fetchCourses()
}, [])
```

### Fetching Featured Courses

```typescript
import { getFeaturedCourses } from "@/lib/course-utils"

// Get only featured courses
const featuredCourses = await getFeaturedCourses()
```

### Formatting Prices

```typescript
import { formatPrice } from "@/lib/course-utils"

// Format price for display
const displayPrice = formatPrice(2997) // Returns "$2,997"
```

## File Structure

```
components/admin/
  course-manager.tsx       # Admin dashboard course manager
lib/
  course-utils.ts          # Utility functions for course management
scripts/
  create-courses-table.sql # Database creation script
  test-courses.sql         # Test script for verification
app/
  training/page.tsx        # Training page with course display
```

## Example Course Data

Here's an example of the course data structure:

```typescript
{
  id: "uuid-here",
  title: "Real Estate Mastery Course",
  description: "Comprehensive training program covering all aspects of luxury real estate sales and marketing.",
  price: 2997.00,
  duration: "8 Weeks",
  level: "Beginner to Advanced",
  learning_outcomes: [
    "Lead Generation Strategies",
    "Luxury Market Analysis",
    "Negotiation Techniques",
    "Digital Marketing",
    "Client Relationship Management",
    "Closing Strategies"
  ],
  image_url: "https://example.com/course-image.jpg",
  featured: true,
  order_index: 1,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z"
}
```

## Best Practices

1. **Course Images**: Use high-quality images that represent the course content
2. **Titles**: Write clear, descriptive course titles
3. **Descriptions**: Provide comprehensive course descriptions
4. **Learning Outcomes**: List specific, actionable learning objectives
5. **Display Order**: Use order_index to control course sequence
6. **Featured Courses**: Mark important courses as featured
7. **Pricing**: Set competitive, realistic pricing

## Features

- **Image Management**: Upload and manage course images
- **Learning Outcomes**: Dynamic list of course objectives
- **Display Ordering**: Control the order courses appear
- **Featured Status**: Highlight important courses
- **Responsive Design**: Works on all device sizes
- **Real-time Updates**: Changes appear immediately
- **Admin Management**: Full CRUD operations through dashboard

## Troubleshooting

### Courses Not Showing
1. Check that courses exist in the database
2. Verify database connection is working
3. Check browser console for errors
4. Ensure the training page is loading correctly

### Images Not Loading
1. Verify image URLs are valid
2. Check Supabase storage permissions
3. Ensure images are uploaded correctly

### Admin Dashboard Issues
1. Check Supabase configuration
2. Verify table structure with test script
3. Check browser console for errors

This system provides a complete solution for managing training courses that will automatically appear on the training page with a professional, modern design. 