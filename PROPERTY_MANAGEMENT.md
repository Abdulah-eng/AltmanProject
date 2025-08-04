# Property Management System

This document explains how to use the property management system for managing property listings that appear in the carousel on the website.

## Overview

The property management system allows you to add, edit, and manage property listings through the admin dashboard. Properties can be marked as "featured" to appear in the main carousel on the website.

## Database Schema

The `properties` table includes the following fields:
- `id`: Unique identifier (UUID)
- `title`: Property title/name
- `address`: Street address
- `city`: City name
- `state`: State abbreviation
- `zip_code`: ZIP code
- `price`: Property price (decimal)
- `bedrooms`: Number of bedrooms
- `bathrooms`: Number of bathrooms
- `square_feet`: Square footage
- `property_type`: Type of property (single_family, condo, townhouse, luxury, investment)
- `status`: Property status (for_sale, sold, pending, coming_soon)
- `description`: Property description
- `image_url`: URL of the property image
- `featured`: Boolean flag for carousel display
- `created_at`: Timestamp
- `updated_at`: Timestamp

## Using the Admin Dashboard

### Accessing Property Management
1. Go to `/admin`
2. Click on the "Properties" tab
3. You'll see all properties and an "Add Property" button

### Adding a New Property
1. Click "Add Property" button
2. Upload a property image
3. Fill in all the required fields:
   - **Property Title**: Descriptive name for the property
   - **Price**: Property price (numbers only)
   - **Address**: Street address
   - **City, State, ZIP**: Location details
   - **Bedrooms, Bathrooms, Square Feet**: Property specifications
   - **Property Type**: Select from dropdown
   - **Status**: Select from dropdown
   - **Description**: Detailed property description
   - **Featured**: Check this to show in carousel
4. Click upload to save the property

### Managing Properties
- **View**: See all properties in a grid layout with images and details
- **Edit**: Click the edit button to modify property details
- **Delete**: Click the delete button to remove properties (also deletes image from storage)
- **Featured Badge**: Featured properties show a "Featured" badge

## Property Types

Available property types:
- **Single Family**: Traditional single-family homes
- **Condo**: Condominiums
- **Townhouse**: Townhouses
- **Luxury Estate**: High-end luxury properties
- **Investment Property**: Investment opportunities

## Property Status

Available statuses:
- **For Sale**: Currently available for purchase
- **Sold**: Property has been sold
- **Pending**: Sale is pending
- **Coming Soon**: Property will be available soon

## Carousel Display

Only properties with:
- `featured = true`
- `status = 'for_sale'`

Will appear in the main property carousel on the website.

## Database Setup

Run the following SQL to create the properties table:

```sql
-- Run the script: scripts/create-properties-table.sql
```

This will:
- Create the properties table with all necessary fields
- Add indexes for better performance
- Create triggers for automatic timestamp updates
- Insert sample properties

## Using Properties in Components

### Fetching Featured Properties

```typescript
import { getFeaturedProperties } from "@/lib/property-utils"

// In your component
const [properties, setProperties] = useState([])

useEffect(() => {
  const fetchProperties = async () => {
    const featuredProperties = await getFeaturedProperties()
    setProperties(featuredProperties)
  }
  fetchProperties()
}, [])
```

### Fetching All Properties with Filters

```typescript
import { getProperties } from "@/lib/property-utils"

// Get all properties
const allProperties = await getProperties()

// Get properties with filters
const filteredProperties = await getProperties({
  status: 'for_sale',
  property_type: 'luxury',
  city: 'BEVERLY HILLS',
  min_price: 1000000,
  max_price: 5000000,
  featured: true
})
```

### Utility Functions

```typescript
import { formatPrice, getStatusDisplay, getPropertyTypeDisplay } from "@/lib/property-utils"

// Format price for display
const formattedPrice = formatPrice(16495000) // "$16,495,000"

// Get status display text
const statusText = getStatusDisplay('for_sale') // "FOR SALE"

// Get property type display text
const typeText = getPropertyTypeDisplay('luxury') // "Luxury Estate"
```

## File Structure

```
components/admin/
  property-manager.tsx       # Admin dashboard property manager
lib/
  property-utils.ts          # Utility functions for property management
scripts/
  create-properties-table.sql # Database setup script
components/
  property-carousel.tsx      # Property carousel component
```

## Example Property Data

Here's an example of the property data structure:

```typescript
{
  id: "uuid-here",
  title: "Luxury Estate in Hidden Hills",
  address: "24341 ROLLING VIEW RD",
  city: "HIDDEN HILLS",
  state: "CA",
  zip_code: "91302",
  price: 16495000,
  bedrooms: 5,
  bathrooms: 7,
  square_feet: 5980,
  property_type: "luxury",
  status: "for_sale",
  description: "Stunning luxury estate featuring panoramic views...",
  image_url: "https://storage.supabase.co/...",
  featured: true,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z"
}
```

## Best Practices

1. **Image Quality**: Upload high-quality images (recommended: 1200x800px minimum)
2. **Descriptions**: Write detailed, compelling property descriptions
3. **Pricing**: Keep prices accurate and up-to-date
4. **Featured Properties**: Only mark truly exceptional properties as featured
5. **Status Updates**: Regularly update property status as sales progress

This system provides a complete solution for managing property listings that will automatically appear in the website's property carousel. 