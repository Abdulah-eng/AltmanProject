import { createClientClient } from "@/lib/supabase/client"
import { uploadImage, deleteImage } from "@/lib/image-upload-utils"

export interface RealEstateInsight {
  id: string
  title: string
  content: string
  summary?: string
  category: string
  author?: string
  image_file?: string
  featured: boolean
  published: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export interface CreateInsightData {
  title: string
  content: string
  summary?: string
  category: string
  author?: string
  image_file?: string
  featured: boolean
  published: boolean
  display_order: number
}

export interface UpdateInsightData extends Partial<CreateInsightData> {
  id: string
}

/**
 * Fetch all real estate insights
 */
export async function getAllInsights(): Promise<RealEstateInsight[]> {
  try {
    const supabase = await createClientClient()
    
    const { data, error } = await supabase
      .from('real_estate_insights')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Failed to fetch insights:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching insights:', error)
    return []
  }
}

/**
 * Fetch featured insights for home page
 */
export async function getFeaturedInsights(limit: number = 3): Promise<RealEstateInsight[]> {
  try {
    const supabase = await createClientClient()
    
    const { data, error } = await supabase
      .from('real_estate_insights')
      .select('*')
      .eq('featured', true)
      .eq('published', true)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Failed to fetch featured insights:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching featured insights:', error)
    return []
  }
}

/**
 * Fetch insights by category
 */
export async function getInsightsByCategory(category: string): Promise<RealEstateInsight[]> {
  try {
    const supabase = await createClientClient()
    
    const { data, error } = await supabase
      .from('real_estate_insights')
      .select('*')
      .eq('category', category)
      .eq('published', true)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Failed to fetch insights by category:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching insights by category:', error)
    return []
  }
}

/**
 * Fetch a single insight by ID
 */
export async function getInsightById(id: string): Promise<RealEstateInsight | null> {
  try {
    const supabase = await createClientClient()
    
    const { data, error } = await supabase
      .from('real_estate_insights')
      .select('*')
      .eq('id', id)
      .eq('published', true)
      .single()

    if (error) {
      console.error('Failed to fetch insight:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error fetching insight:', error)
    return null
  }
}

/**
 * Create a new insight
 */
export async function createInsight(data: CreateInsightData): Promise<RealEstateInsight | null> {
  try {
    const supabase = await createClientClient()
    
    const { data: insight, error } = await supabase
      .from('real_estate_insights')
      .insert([data])
      .select()
      .single()

    if (error) {
      console.error('Failed to create insight:', error)
      return null
    }

    return insight
  } catch (error) {
    console.error('Error creating insight:', error)
    return null
  }
}

/**
 * Update an existing insight
 */
export async function updateInsight(data: UpdateInsightData): Promise<RealEstateInsight | null> {
  try {
    const supabase = await createClientClient()
    
    const { id, ...updateData } = data
    
    const { data: insight, error } = await supabase
      .from('real_estate_insights')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Failed to update insight:', error)
      return null
    }

    return insight
  } catch (error) {
    console.error('Error updating insight:', error)
    return null
  }
}

/**
 * Delete an insight
 */
export async function deleteInsight(id: string): Promise<boolean> {
  try {
    const supabase = await createClientClient()
    
    // First get the insight to check if it has an image
    const { data: insight } = await supabase
      .from('real_estate_insights')
      .select('image_file')
      .eq('id', id)
      .single()

    // Delete the image file if it exists
    if (insight?.image_file) {
      await deleteImage(insight.image_file)
    }
    
    const { error } = await supabase
      .from('real_estate_insights')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Failed to delete insight:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error deleting insight:', error)
    return false
  }
}

/**
 * Get all available categories
 */
export async function getInsightCategories(): Promise<string[]> {
  try {
    const supabase = await createClientClient()
    
    const { data, error } = await supabase
      .from('real_estate_insights')
      .select('category')
      .eq('published', true)

    if (error) {
      console.error('Failed to fetch categories:', error)
      return []
    }

    const categories = [...new Set(data?.map(item => item.category) || [])]
    return categories.sort()
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}
