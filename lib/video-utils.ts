import { createClientClient } from "@/lib/supabase/client"

export interface Video {
  id: string
  title: string
  description: string
  youtube_url: string
  thumbnail_url?: string
  published: boolean
  featured: boolean
  order_index: number
  created_at: string
  updated_at: string
}

/**
 * Extract YouTube video ID from URL
 */
export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
    /youtube\.com\/watch\?.*&v=([^&\n?#]+)/
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  
  return null
}

/**
 * Get YouTube thumbnail URL
 */
export function getYouTubeThumbnail(videoId: string, quality: 'default' | 'mqdefault' | 'hqdefault' | 'sddefault' | 'maxresdefault' = 'mqdefault'): string {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`
}

/**
 * Get YouTube embed URL
 */
export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`
}

/**
 * Fetch all published videos ordered by display order
 */
export async function getPublishedVideos(): Promise<Video[]> {
  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('published', true)
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      console.warn('Failed to fetch published videos:', error)
      return []
    }

    console.log('Published videos found:', data?.length || 0)
    return data || []
  } catch (error) {
    console.error('Error fetching published videos:', error)
    return []
  }
}

/**
 * Fetch featured videos only
 */
export async function getFeaturedVideos(): Promise<Video[]> {
  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('published', true)
      .eq('featured', true)
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      console.warn('Failed to fetch featured videos:', error)
      return []
    }

    console.log('Featured videos found:', data?.length || 0)
    return data || []
  } catch (error) {
    console.error('Error fetching featured videos:', error)
    return []
  }
}

/**
 * Fetch all videos (for admin use)
 */
export async function getAllVideos(): Promise<Video[]> {
  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      console.warn('Failed to fetch all videos:', error)
      return []
    }

    console.log('All videos found:', data?.length || 0)
    return data || []
  } catch (error) {
    console.error('Error fetching all videos:', error)
    return []
  }
}

/**
 * Fetch a single video by ID
 */
export async function getVideoById(id: string): Promise<Video | null> {
  if (!id) {
    return null
  }

  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      console.warn(`Video not found for ID: ${id}`)
      return null
    }

    return data
  } catch (error) {
    console.error(`Error fetching video with ID ${id}:`, error)
    return null
  }
}

/**
 * Get videos with optional filters
 */
export async function getVideosWithFilters(filters?: {
  published?: boolean
  featured?: boolean
  limit?: number
}): Promise<Video[]> {
  try {
    const supabase = createClientClient()
    
    let query = supabase.from('videos').select('*')

    if (filters?.published !== undefined) {
      query = query.eq('published', filters.published)
    }

    if (filters?.featured !== undefined) {
      query = query.eq('featured', filters.featured)
    }

    query = query.order('order_index', { ascending: true })
    query = query.order('created_at', { ascending: false })

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query

    if (error) {
      console.warn('Failed to fetch videos with filters:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching videos with filters:', error)
    return []
  }
} 