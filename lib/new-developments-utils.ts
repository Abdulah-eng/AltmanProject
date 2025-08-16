import { createServerClient } from "@/lib/supabase/server"
import { createClientClient } from "@/lib/supabase/client"

export interface NewDevelopment {
  id: string
  name: string
  description: string | null
  image_url: string | null
  location: string | null
  price_range: string | null
  featured: boolean
  display_order: number
  created_at: string
  updated_at: string
}

/**
 * Fetch all new developments ordered by display order
 */
export async function getNewDevelopments(): Promise<NewDevelopment[]> {
  try {
    const supabase = await createServerClient()
    
    const { data, error } = await supabase
      .from('new_developments')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      console.warn('Failed to fetch new developments:', error)
      return []
    }

    console.log('New developments found:', data?.length || 0)
    return data || []
  } catch (error) {
    console.error('Error fetching new developments:', error)
    return []
  }
}

/**
 * Fetch featured new developments for home page
 */
export async function getFeaturedNewDevelopments(limit: number = 4): Promise<NewDevelopment[]> {
  try {
    const supabase = await createServerClient()
    
    const { data, error } = await supabase
      .from('new_developments')
      .select('*')
      .eq('featured', true)
      .order('display_order', { ascending: true })
      .limit(limit)

    if (error) {
      console.warn('Failed to fetch featured new developments:', error)
      return []
    }

    console.log('Featured new developments found:', data?.length || 0)
    return data || []
  } catch (error) {
    console.error('Error fetching featured new developments:', error)
    return []
  }
}

/**
 * Fetch a single new development by ID
 */
export async function getNewDevelopmentById(id: string): Promise<NewDevelopment | null> {
  try {
    const supabase = await createServerClient()
    
    const { data, error } = await supabase
      .from('new_developments')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.warn(`New development not found for ID: ${id}`)
      return null
    }

    return data
  } catch (error) {
    console.error(`Error fetching new development with ID ${id}:`, error)
    return null
  }
} 
