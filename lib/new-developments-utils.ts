import { createClientClient } from './supabase/client'

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

export interface CreateNewDevelopmentData {
  name: string
  description?: string
  image_file?: string
  location?: string
  price_range?: string
  featured?: boolean
  display_order?: number
}

export interface UpdateNewDevelopmentData {
  name?: string
  description?: string
  image_file?: string
  location?: string
  price_range?: string
  featured?: boolean
  display_order?: number
}

export async function fetchNewDevelopments(): Promise<NewDevelopment[]> {
  try {
    const supabase = createClientClient()
    const { data, error } = await supabase
      .from('new_developments')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching new developments:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching new developments:', error)
    return []
  }
}

export async function fetchFeaturedNewDevelopments(): Promise<NewDevelopment[]> {
  try {
    const supabase = createClientClient()
    const { data, error } = await supabase
      .from('new_developments')
      .select('*')
      .eq('featured', true)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching featured new developments:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching featured new developments:', error)
    return []
  }
}

export async function createNewDevelopment(data: CreateNewDevelopmentData): Promise<NewDevelopment | null> {
  try {
    const supabase = createClientClient()
    const { data: newDevelopment, error } = await supabase
      .from('new_developments')
      .insert([data])
      .select()
      .single()

    if (error) {
      console.error('Error creating new development:', error)
      return null
    }

    return newDevelopment
  } catch (error) {
    console.error('Error creating new development:', error)
    return null
  }
}

export async function updateNewDevelopment(id: string, data: UpdateNewDevelopmentData): Promise<NewDevelopment | null> {
  try {
    const supabase = createClientClient()
    const { data: updatedDevelopment, error } = await supabase
      .from('new_developments')
      .update(data)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating new development:', error)
      return null
    }

    return updatedDevelopment
  } catch (error) {
    console.error('Error updating new development:', error)
    return null
  }
}

export async function deleteNewDevelopment(id: string): Promise<boolean> {
  try {
    const supabase = createClientClient()
    const { error } = await supabase
      .from('new_developments')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting new development:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error deleting new development:', error)
    return false
  }
}

export async function getNewDevelopmentById(id: string): Promise<NewDevelopment | null> {
  try {
    const supabase = createClientClient()
    const { data, error } = await supabase
      .from('new_developments')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching new development:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error fetching new development:', error)
    return null
  }
} 
