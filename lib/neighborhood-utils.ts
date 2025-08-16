import { createServerClient } from "@/lib/supabase/server"
import { createClientClient } from "@/lib/supabase/client"

export interface Neighborhood {
  id: string
  name: string
  description: string | null
  image_url: string | null
  featured: boolean
  display_order: number
  created_at: string
  updated_at: string
}

/**
 * Fetch all neighborhoods ordered by display order
 */
export async function getNeighborhoods(): Promise<Neighborhood[]> {
  try {
    const supabase = await createServerClient()
    
    const { data, error } = await supabase
      .from('neighborhoods')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      console.warn('Failed to fetch neighborhoods:', error)
      return []
    }

    console.log('Neighborhoods found:', data?.length || 0)
    return data || []
  } catch (error) {
    console.error('Error fetching neighborhoods:', error)
    return []
  }
}

/**
 * Fetch featured neighborhoods for home page
 */
export async function getFeaturedNeighborhoods(limit: number = 4): Promise<Neighborhood[]> {
  try {
    const supabase = await createServerClient()
    
    const { data, error } = await supabase
      .from('neighborhoods')
      .select('*')
      .eq('featured', true)
      .order('display_order', { ascending: true })
      .limit(limit)

    if (error) {
      console.warn('Failed to fetch featured neighborhoods:', error)
      return []
    }

    console.log('Featured neighborhoods found:', data?.length || 0)
    return data || []
  } catch (error) {
    console.error('Error fetching featured neighborhoods:', error)
    return []
  }
}

/**
 * Fetch a single neighborhood by ID
 */
export async function getNeighborhoodById(id: string): Promise<Neighborhood | null> {
  try {
    const supabase = await createServerClient()
    
    const { data, error } = await supabase
      .from('neighborhoods')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.warn(`Neighborhood not found for ID: ${id}`)
      return null
    }

    return data
  } catch (error) {
    console.error(`Error fetching neighborhood with ID ${id}:`, error)
    return null
  }
} 
