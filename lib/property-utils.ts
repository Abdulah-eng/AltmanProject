import { createClientClient } from "@/lib/supabase/client"

export interface Property {
  id: string
  title: string
  address: string
  city: string
  state: string
  zip_code: string
  price: number
  bedrooms: number
  bathrooms: number
  square_feet: number
  property_type: string
  status: string
  description: string
  image_url: string
  featured: boolean
  created_at: string
  updated_at: string
}

/**
 * Fetch featured properties for home page
 */
export async function getFeaturedProperties(limit: number = 6): Promise<Property[]> {
  try {
    const supabase = await createClientClient()
    
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('featured', true)
      .eq('status', 'for_sale')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.warn('Failed to fetch featured properties:', error)
      return []
    }

    console.log('Featured properties found:', data?.length || 0)
    return data || []
  } catch (error) {
    console.error('Error fetching featured properties:', error)
    return []
  }
}

/**
 * Fetch all properties (for debugging)
 */
export async function getAllProperties(): Promise<Property[]> {
  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.warn('Failed to fetch all properties:', error)
      return []
    }

    console.log('All properties found:', data?.length || 0)
    return data || []
  } catch (error) {
    console.error('Error fetching all properties:', error)
    return []
  }
}

/**
 * Fetch all properties with optional filters
 */
export async function getProperties(filters?: {
  status?: string
  property_type?: string
  city?: string
  min_price?: number
  max_price?: number
  featured?: boolean
}): Promise<Property[]> {
  try {
    const supabase = createClientClient()
    
    let query = supabase.from('properties').select('*')

    if (filters?.status) {
      query = query.eq('status', filters.status)
    }
    if (filters?.property_type) {
      query = query.eq('property_type', filters.property_type)
    }
    if (filters?.city) {
      query = query.eq('city', filters.city)
    }
    if (filters?.min_price) {
      query = query.gte('price', filters.min_price)
    }
    if (filters?.max_price) {
      query = query.lte('price', filters.max_price)
    }
    if (filters?.featured !== undefined) {
      query = query.eq('featured', filters.featured)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.warn('Failed to fetch properties:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching properties:', error)
    return []
  }
}

/**
 * Fetch a single property by ID
 */
export async function getPropertyById(id: string): Promise<Property | null> {
  if (!id) {
    return null
  }

  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      console.warn(`Property not found for ID: ${id}`)
      return null
    }

    return data
  } catch (error) {
    console.error(`Error fetching property with ID ${id}:`, error)
    return null
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

/**
 * Get property status display text
 */
export function getStatusDisplay(status: string): string {
  const statusMap: Record<string, string> = {
    'for_sale': 'FOR SALE',
    'sold': 'SOLD',
    'pending': 'PENDING',
    'coming_soon': 'COMING SOON'
  }
  return statusMap[status] || status.toUpperCase()
}

/**
 * Get property type display text
 */
export function getPropertyTypeDisplay(type: string): string {
  const typeMap: Record<string, string> = {
    'single_family': 'Single Family',
    'condo': 'Condo',
    'townhouse': 'Townhouse',
    'luxury': 'Luxury Estate',
    'investment': 'Investment Property'
  }
  return typeMap[type] || type.replace('_', ' ').toUpperCase()
}

/**
 * Get unique cities from properties
 */
export async function getUniqueCities(): Promise<string[]> {
  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('properties')
      .select('city')
      .not('city', 'is', null)
      .order('city')

    if (error) {
      console.warn('Failed to fetch unique cities:', error)
      return []
    }

    const cities = [...new Set(data?.map(item => item.city) || [])]
    return cities
  } catch (error) {
    console.error('Error fetching unique cities:', error)
    return []
  }
}

/**
 * Get unique property types from properties
 */
export async function getUniquePropertyTypes(): Promise<string[]> {
  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('properties')
      .select('property_type')
      .not('property_type', 'is', null)
      .order('property_type')

    if (error) {
      console.warn('Failed to fetch unique property types:', error)
      return []
    }

    const types = [...new Set(data?.map(item => item.property_type) || [])]
    return types
  } catch (error) {
    console.error('Error fetching unique property types:', error)
    return []
  }
}

/**
 * Get price ranges for filters based on actual data
 */
export async function getPriceRanges(): Promise<{ min: number; max: number }> {
  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('properties')
      .select('price')
      .not('price', 'is', null)

    if (error) {
      console.warn('Failed to fetch price ranges:', error)
      return { min: 0, max: 10000000 }
    }

    const prices = data?.map(item => item.price) || []
    const min = Math.min(...prices, 0)
    const max = Math.max(...prices, 10000000)
    
    return { min, max }
  } catch (error) {
    console.error('Error fetching price ranges:', error)
    return { min: 0, max: 10000000 }
  }
}

/**
 * Get unique bedroom counts from properties
 */
export async function getUniqueBedroomCounts(): Promise<number[]> {
  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('properties')
      .select('bedrooms')
      .not('bedrooms', 'is', null)
      .order('bedrooms')

    if (error) {
      console.warn('Failed to fetch bedroom counts:', error)
      return [1, 2, 3, 4, 5]
    }

    const counts = [...new Set(data?.map(item => item.bedrooms) || [])]
    return counts.sort((a, b) => a - b)
  } catch (error) {
    console.error('Error fetching bedroom counts:', error)
    return [1, 2, 3, 4, 5]
  }
}

/**
 * Get unique bathroom counts from properties
 */
export async function getUniqueBathroomCounts(): Promise<number[]> {
  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('properties')
      .select('bathrooms')
      .not('bathrooms', 'is', null)
      .order('bathrooms')

    if (error) {
      console.warn('Failed to fetch bathroom counts:', error)
      return [1, 1.5, 2, 2.5, 3]
    }

    const counts = [...new Set(data?.map(item => item.bathrooms) || [])]
    return counts.sort((a, b) => a - b)
  } catch (error) {
    console.error('Error fetching bathroom counts:', error)
    return [1, 1.5, 2, 2.5, 3]
  }
} 