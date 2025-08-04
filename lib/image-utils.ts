import { createClientClient } from "@/lib/supabase/client"

export interface ImageData {
  id: string
  name: string
  url: string
  alt_text: string
  category: string
  section: string
  image_key: string
  created_at: string
}

// Predefined image keys for main pages
export const IMAGE_KEYS = {
  home: {
    hero_image: "Home Page Hero Image",
    about_section_image: "Home About Section Image",
    services_section_image: "Home Services Section Image",
    team_section_image: "Home Team Section Image",
    stats_section_image: "Home Stats Section Image",
    contact_section_image: "Home Contact Section Image",
  },
  about: {
    hero_image: "About Page Hero Image",
    team_image: "About Team Image",
    office_image: "About Office Image",
    process_image: "About Process Image",
  },
  contact: {
    hero_image: "Contact Page Hero Image",
    background_image: "Contact Background Image",
    office_image: "Contact Office Image",
  },
  properties: {
    hero_image: "Properties Page Hero Image",
    listing_image: "Properties Listing Image",
    search_image: "Properties Search Image",
    map_image: "Properties Map Image",
  },
  services: {
    hero_image: "Services Page Hero Image",
    buying_image: "Services Buying Image",
    selling_image: "Services Selling Image",
    investment_image: "Services Investment Image",
  },
  blog: {
    hero_image: "Blog Page Hero Image",
    default_image: "Blog Default Image",
  },
  media: {
    hero_image: "Media Page Hero Image",
    youtube_image: "Media YouTube Image",
    press_image: "Media Press Image",
  },
  training: {
    hero_image: "Training Page Hero Image",
    speaking_image: "Training Speaking Image",
  }
} as const

/**
 * Fetch a single image by its key
 */
export async function getImageByKey(imageKey: string): Promise<ImageData | null> {
  if (!imageKey) {
    console.warn('Image key is required')
    return null
  }

  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .eq('image_key', imageKey)
      .single()

    if (error || !data) {
      console.warn(`Image not found for key: ${imageKey}`)
      return null
    }

    // Validate that the image has a valid URL
    if (!data.url || typeof data.url !== 'string') {
      console.warn(`Invalid URL for image key: ${imageKey}`)
      return null
    }

    return data
  } catch (error) {
    console.error(`Error fetching image for key ${imageKey}:`, error)
    return null
  }
}

/**
 * Fetch multiple images by their keys
 */
export async function getImagesByKeys(imageKeys: string[]): Promise<Record<string, ImageData | null>> {
  if (!imageKeys || imageKeys.length === 0) {
    return {}
  }

  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .in('image_key', imageKeys)

    if (error || !data) {
      console.warn('Failed to fetch images by keys:', error)
      return {}
    }

    // Create a map of key to image data
    const imageMap: Record<string, ImageData | null> = {}
    imageKeys.forEach(key => {
      const image = data.find((img: any) => img.image_key === key)
      // Only include images with valid URLs
      if (image && image.url && typeof image.url === 'string') {
        imageMap[key] = image
      } else {
        imageMap[key] = null
      }
    })

    return imageMap
  } catch (error) {
    console.error('Error fetching images by keys:', error)
    return {}
  }
}

/**
 * Fetch all images for a specific page section
 */
export async function getImagesBySection(section: string): Promise<ImageData[]> {
  if (!section) {
    return []
  }

  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .eq('section', section)
      .order('created_at', { ascending: false })

    if (error || !data) {
      console.warn(`Failed to fetch images for section: ${section}`, error)
      return []
    }

    // Filter out images without valid URLs
    return data.filter((img: any) => img.url && typeof img.url === 'string')
  } catch (error) {
    console.error(`Error fetching images for section ${section}:`, error)
    return []
  }
}

/**
 * Get the URL for a specific image key with fallback
 */
export async function getImageUrl(imageKey: string, fallbackUrl?: string): Promise<string> {
  if (!imageKey) {
    return fallbackUrl || '/placeholder.jpg'
  }

  try {
    const image = await getImageByKey(imageKey)
    return image?.url || fallbackUrl || '/placeholder.jpg'
  } catch (error) {
    console.error(`Error getting image URL for key ${imageKey}:`, error)
    return fallbackUrl || '/placeholder.jpg'
  }
}

/**
 * Get all available image keys for a section
 */
export function getImageKeysForSection(section: keyof typeof IMAGE_KEYS): string[] {
  return Object.keys(IMAGE_KEYS[section] || {})
}

/**
 * Get the display name for an image key
 */
export function getImageKeyDisplayName(section: keyof typeof IMAGE_KEYS, key: string): string {
  return IMAGE_KEYS[section]?.[key as keyof typeof IMAGE_KEYS[typeof section]] || key
}

/**
 * Validate if an image URL is valid
 */
export function isValidImageUrl(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false
  }
  
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
} 