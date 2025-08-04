import { createClientClient } from "@/lib/supabase/client"

export interface SuccessStory {
  id: string
  name: string
  title: string
  quote: string
  image_url: string
  featured: boolean
  order_index: number
  created_at: string
}

/**
 * Fetch all success stories ordered by display order
 */
export async function getSuccessStories(): Promise<SuccessStory[]> {
  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('success_stories')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) {
      console.warn('Failed to fetch success stories:', error)
      return []
    }

    console.log('Success stories found:', data?.length || 0)
    return data || []
  } catch (error) {
    console.error('Error fetching success stories:', error)
    return []
  }
}

/**
 * Fetch featured success stories only
 */
export async function getFeaturedSuccessStories(): Promise<SuccessStory[]> {
  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('success_stories')
      .select('*')
      .eq('featured', true)
      .order('order_index', { ascending: true })

    if (error) {
      console.warn('Failed to fetch featured success stories:', error)
      return []
    }

    console.log('Featured success stories found:', data?.length || 0)
    return data || []
  } catch (error) {
    console.error('Error fetching featured success stories:', error)
    return []
  }
}

/**
 * Fetch a single success story by ID
 */
export async function getSuccessStoryById(id: string): Promise<SuccessStory | null> {
  if (!id) {
    return null
  }

  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('success_stories')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      console.warn(`Success story not found for ID: ${id}`)
      return null
    }

    return data
  } catch (error) {
    console.error(`Error fetching success story with ID ${id}:`, error)
    return null
  }
}

/**
 * Get success stories with optional filters
 */
export async function getSuccessStoriesWithFilters(filters?: {
  featured?: boolean
  limit?: number
}): Promise<SuccessStory[]> {
  try {
    const supabase = createClientClient()
    
    let query = supabase.from('success_stories').select('*')

    if (filters?.featured !== undefined) {
      query = query.eq('featured', filters.featured)
    }

    query = query.order('order_index', { ascending: true })

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query

    if (error) {
      console.warn('Failed to fetch success stories with filters:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching success stories with filters:', error)
    return []
  }
} 