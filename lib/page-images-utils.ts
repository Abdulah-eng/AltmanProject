import { createClientClient } from "@/lib/supabase/client"

export interface PageImage {
  id: string
  name: string
  url: string
  alt_text: string
  category: string
  section: string
  image_key: string
  created_at: string
}

/**
 * Get image by section and key
 */
export async function getPageImage(section: string, key: string): Promise<PageImage | null> {
  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .eq('section', section)
      .eq('image_key', key)
      .single()

    if (error) {
      console.warn(`Failed to fetch ${section} ${key} image:`, error)
      return null
    }

    return data
  } catch (error) {
    console.error(`Error fetching ${section} ${key} image:`, error)
    return null
  }
}

/**
 * Get all images for a specific page section
 */
export async function getPageImages(section: string): Promise<PageImage[]> {
  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .eq('section', section)
      .order('created_at', { ascending: false })

    if (error) {
      console.warn(`Failed to fetch ${section} images:`, error)
      return []
    }

    return data || []
  } catch (error) {
    console.error(`Error fetching ${section} images:`, error)
    return []
  }
}

/**
 * Get multiple specific images for a page
 */
export async function getPageImagesByKeys(section: string, keys: string[]): Promise<Record<string, PageImage | null>> {
  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .eq('section', section)
      .in('image_key', keys)

    if (error) {
      console.warn(`Failed to fetch ${section} images by keys:`, error)
      return {}
    }

    const result: Record<string, PageImage | null> = {}
    keys.forEach(key => {
      result[key] = data?.find(img => img.image_key === key) || null
    })

    return result
  } catch (error) {
    console.error(`Error fetching ${section} images by keys:`, error)
    return {}
  }
}

// Home page specific functions
export async function getHomePageImages() {
  return getPageImagesByKeys('home', [
    'hero_image',
    'about_section_image',
    'services_section_image',
    'team_section_image',
    'stats_section_image',
    'contact_section_image'
  ])
}

// About page specific functions
export async function getAboutPageImages() {
  return getPageImagesByKeys('about', [
    'hero_image',
    'team_image',
    'office_image',
    'process_image'
  ])
}

// Contact page specific functions
export async function getContactPageImages() {
  return getPageImagesByKeys('contact', [
    'hero_image',
    'background_image',
    'office_image'
  ])
}

// Properties page specific functions
export async function getPropertiesPageImages() {
  return getPageImagesByKeys('properties', [
    'hero_image',
    'listing_image',
    'search_image',
    'map_image'
  ])
}

// Services page specific functions
export async function getServicesPageImages() {
  return getPageImagesByKeys('services', [
    'hero_image',
    'buying_image',
    'selling_image',
    'investment_image'
  ])
}

// Blog page specific functions
export async function getBlogPageImages() {
  return getPageImagesByKeys('blog', [
    'hero_image',
    'default_image'
  ])
}

// Media page specific functions
export async function getMediaPageImages() {
  return getPageImagesByKeys('media', [
    'hero_image',
    'youtube_image',
    'press_image'
  ])
}

// Training page specific functions
export async function getTrainingPageImages() {
  return getPageImagesByKeys('training', [
    'hero_image',
    'speaking_image'
  ])
}

/**
 * Get image URL with fallback
 */
export function getImageUrl(image: PageImage | null, fallbackUrl: string = '/placeholder.jpg'): string {
  return image?.url || fallbackUrl
}

/**
 * Get image alt text with fallback
 */
export function getImageAlt(image: PageImage | null, fallbackAlt: string = 'Image'): string {
  return image?.alt_text || fallbackAlt
} 