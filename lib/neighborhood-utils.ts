import { createClientClient } from './supabase/client'

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

export interface CreateNeighborhoodData {
  name: string
  description?: string
  image_file?: string
  featured?: boolean
  display_order?: number
}

export interface UpdateNeighborhoodData {
  name?: string
  description?: string
  image_file?: string
  featured?: boolean
  display_order?: number
}

export async function fetchNeighborhoods(): Promise<Neighborhood[]> {
  try {
    const supabase = createClientClient()
    const { data, error } = await supabase
      .from('neighborhoods')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching neighborhoods:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching neighborhoods:', error)
    return []
  }
}

export async function fetchFeaturedNeighborhoods(): Promise<Neighborhood[]> {
  try {
    const supabase = createClientClient()
    const { data, error } = await supabase
      .from('neighborhoods')
      .select('*')
      .eq('featured', true)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching featured neighborhoods:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching featured neighborhoods:', error)
    return []
  }
}

export async function createNeighborhood(data: CreateNeighborhoodData): Promise<Neighborhood | null> {
  try {
    const supabase = createClientClient()
    const { data: newNeighborhood, error } = await supabase
      .from('neighborhoods')
      .insert([data])
      .select()
      .single()

    if (error) {
      console.error('Error creating neighborhood:', error)
      return null
    }

    return newNeighborhood
  } catch (error) {
    console.error('Error creating neighborhood:', error)
    return null
  }
}

export async function updateNeighborhood(id: string, data: UpdateNeighborhoodData): Promise<Neighborhood | null> {
  try {
    const supabase = createClientClient()
    const { data: updatedNeighborhood, error } = await supabase
      .from('neighborhoods')
      .update(data)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating neighborhood:', error)
      return null
    }

    return updatedNeighborhood
  } catch (error) {
    console.error('Error updating neighborhood:', error)
    return null
  }
}

export async function deleteNeighborhood(id: string): Promise<boolean> {
  try {
    const supabase = createClientClient()
    const { error } = await supabase
      .from('neighborhoods')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting neighborhood:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error deleting neighborhood:', error)
    return false
  }
}

export async function getNeighborhoodById(id: string): Promise<Neighborhood | null> {
  try {
    const supabase = createClientClient()
    const { data, error } = await supabase
      .from('neighborhoods')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching neighborhood:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error fetching neighborhood:', error)
    return null
  }
} 
