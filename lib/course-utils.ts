import { createClientClient } from "@/lib/supabase/client"

export interface Course {
  id: string
  title: string
  description: string
  price: number
  duration: string
  level: string
  learning_outcomes: string[]
  image_url: string
  featured: boolean
  order_index: number
  created_at: string
}

/**
 * Fetch all courses ordered by display order
 */
export async function getCourses(): Promise<Course[]> {
  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) {
      console.warn('Failed to fetch courses:', error)
      return []
    }

    console.log('Courses found:', data?.length || 0)
    return data || []
  } catch (error) {
    console.error('Error fetching courses:', error)
    return []
  }
}

/**
 * Fetch featured courses only
 */
export async function getFeaturedCourses(): Promise<Course[]> {
  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('featured', true)
      .order('order_index', { ascending: true })

    if (error) {
      console.warn('Failed to fetch featured courses:', error)
      return []
    }

    console.log('Featured courses found:', data?.length || 0)
    return data || []
  } catch (error) {
    console.error('Error fetching featured courses:', error)
    return []
  }
}

/**
 * Fetch a single course by ID
 */
export async function getCourseById(id: string): Promise<Course | null> {
  if (!id) {
    return null
  }

  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      console.warn(`Course not found for ID: ${id}`)
      return null
    }

    return data
  } catch (error) {
    console.error(`Error fetching course with ID ${id}:`, error)
    return null
  }
}

/**
 * Get courses with optional filters
 */
export async function getCoursesWithFilters(filters?: {
  featured?: boolean
  limit?: number
}): Promise<Course[]> {
  try {
    const supabase = createClientClient()
    
    let query = supabase.from('courses').select('*')

    if (filters?.featured !== undefined) {
      query = query.eq('featured', filters.featured)
    }

    query = query.order('order_index', { ascending: true })

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query

    if (error) {
      console.warn('Failed to fetch courses with filters:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching courses with filters:', error)
    return []
  }
}

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
} 