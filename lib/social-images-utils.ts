import { createClientClient } from "@/lib/supabase/client"

export interface SocialImage {
  id: string
  title: string
  description?: string
  image_url: string
  social_handle: string
  platform: 'instagram' | 'facebook' | 'twitter' | 'tiktok'
  published: boolean
  featured: boolean
  order_index: number
  created_at: string
  updated_at: string
}

/**
 * Fetch all published social images ordered by display order
 */
export async function getPublishedSocialImages(): Promise<SocialImage[]> {
  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('social_images')
      .select('*')
      .eq('published', true)
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      console.warn('Failed to fetch published social images:', error)
      return []
    }

    console.log('Published social images found:', data?.length || 0)
    return data || []
  } catch (error) {
    console.error('Error fetching published social images:', error)
    return []
  }
}

/**
 * Fetch featured social images only
 */
export async function getFeaturedSocialImages(): Promise<SocialImage[]> {
  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('social_images')
      .select('*')
      .eq('published', true)
      .eq('featured', true)
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      console.warn('Failed to fetch featured social images:', error)
      return []
    }

    console.log('Featured social images found:', data?.length || 0)
    return data || []
  } catch (error) {
    console.error('Error fetching featured social images:', error)
    return []
  }
}

/**
 * Fetch all social images (admin use)
 */
export async function getAllSocialImages(): Promise<SocialImage[]> {
  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('social_images')
      .select('*')
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      console.warn('Failed to fetch all social images:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching all social images:', error)
    return []
  }
}

/**
 * Fetch social image by ID
 */
export async function getSocialImageById(id: string): Promise<SocialImage | null> {
  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('social_images')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.warn('Failed to fetch social image by ID:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error fetching social image by ID:', error)
    return null
  }
}

/**
 * Fetch social images with filters
 */
export async function getSocialImagesWithFilters(filters?: {
  published?: boolean
  featured?: boolean
  platform?: string
  limit?: number
}): Promise<SocialImage[]> {
  try {
    const supabase = createClientClient()
    
    let query = supabase
      .from('social_images')
      .select('*')
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: false })

    if (filters?.published !== undefined) {
      query = query.eq('published', filters.published)
    }

    if (filters?.featured !== undefined) {
      query = query.eq('featured', filters.featured)
    }

    if (filters?.platform) {
      query = query.eq('platform', filters.platform)
    }

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query

    if (error) {
      console.warn('Failed to fetch social images with filters:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching social images with filters:', error)
    return []
  }
}

/**
 * Get platform display name
 */
export function getPlatformDisplayName(platform: string): string {
  switch (platform) {
    case 'instagram':
      return 'Instagram'
    case 'facebook':
      return 'Facebook'
    case 'twitter':
      return 'Twitter'
    case 'tiktok':
      return 'TikTok'
    default:
      return platform
  }
}

/**
 * Get platform color class
 */
export function getPlatformColorClass(platform: string): string {
  switch (platform) {
    case 'instagram':
      return 'bg-gradient-to-r from-purple-500 to-pink-500'
    case 'facebook':
      return 'bg-blue-600'
    case 'twitter':
      return 'bg-blue-400'
    case 'tiktok':
      return 'bg-black'
    default:
      return 'bg-gray-500'
  }
} 