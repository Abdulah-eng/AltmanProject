import { createClientClient } from "@/lib/supabase/client"

export interface ClientExperience {
  id: string
  client_name: string
  client_role: string
  client_location: string | null
  testimonial: string
  rating: number
  image_url: string | null
  featured: boolean
  order_index: number
  published: boolean
  created_at: string
  updated_at: string
}

/**
 * Fetch all published client experiences ordered by display order
 */
export async function getPublishedClientExperiences(): Promise<ClientExperience[]> {
  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('client_experiences')
      .select('*')
      .eq('published', true)
      .order('order_index', { ascending: true })

    if (error) {
      console.warn('Failed to fetch published client experiences:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching published client experiences:', error)
    return []
  }
}

/**
 * Fetch featured client experiences only
 */
export async function getFeaturedClientExperiences(): Promise<ClientExperience[]> {
  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('client_experiences')
      .select('*')
      .eq('published', true)
      .eq('featured', true)
      .order('order_index', { ascending: true })

    if (error) {
      console.warn('Failed to fetch featured client experiences:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching featured client experiences:', error)
    return []
  }
}

/**
 * Fetch all client experiences (for admin)
 */
export async function getAllClientExperiences(): Promise<ClientExperience[]> {
  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('client_experiences')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) {
      console.warn('Failed to fetch all client experiences:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching all client experiences:', error)
    return []
  }
}

/**
 * Fetch a single client experience by ID
 */
export async function getClientExperienceById(id: string): Promise<ClientExperience | null> {
  if (!id) {
    return null
  }

  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('client_experiences')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      console.warn(`Client experience not found for ID: ${id}`)
      return null
    }

    return data
  } catch (error) {
    console.error(`Error fetching client experience with ID ${id}:`, error)
    return null
  }
}

/**
 * Create a new client experience
 */
export async function createClientExperience(experience: Omit<ClientExperience, 'id' | 'created_at' | 'updated_at'>): Promise<ClientExperience | null> {
  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('client_experiences')
      .insert([experience])
      .select()
      .single()

    if (error) {
      console.error('Failed to create client experience:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error creating client experience:', error)
    return null
  }
}

/**
 * Update a client experience
 */
export async function updateClientExperience(id: string, updates: Partial<ClientExperience>): Promise<ClientExperience | null> {
  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('client_experiences')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Failed to update client experience:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error updating client experience:', error)
    return null
  }
}

/**
 * Delete a client experience
 */
export async function deleteClientExperience(id: string): Promise<boolean> {
  try {
    const supabase = createClientClient()
    
    const { error } = await supabase
      .from('client_experiences')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Failed to delete client experience:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error deleting client experience:', error)
    return false
  }
}

/**
 * Get client experiences with optional filters
 */
export async function getClientExperiencesWithFilters(filters?: {
  featured?: boolean
  published?: boolean
  limit?: number
}): Promise<ClientExperience[]> {
  try {
    const supabase = createClientClient()
    
    let query = supabase.from('client_experiences').select('*')

    if (filters?.featured !== undefined) {
      query = query.eq('featured', filters.featured)
    }

    if (filters?.published !== undefined) {
      query = query.eq('published', filters.published)
    }

    query = query.order('order_index', { ascending: true })

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query

    if (error) {
      console.warn('Failed to fetch client experiences with filters:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching client experiences with filters:', error)
    return []
  }
} 