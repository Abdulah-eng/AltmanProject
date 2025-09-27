/**
 * MLS API Service for fetching real property data
 * This service provides methods to fetch property listings from various MLS APIs
 */

export interface MLSProperty {
  id: string
  mlsNumber: string
  address: string
  city: string
  state: string
  zipCode: string
  price: number
  bedrooms: number
  bathrooms: number
  squareFeet: number
  propertyType: string
  status: string
  description?: string
  imageUrl?: string
  images?: string[]
  yearBuilt?: number
  lotSize?: string
  features?: string[]
  agentName?: string
  agentPhone?: string
  agentEmail?: string
  listingDate?: string
  lastUpdated?: string
}

export interface MLSFilters {
  city?: string
  state?: string
  zipCode?: string
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  bathrooms?: number
  propertyType?: string
  status?: string
  limit?: number
  offset?: number
}

export interface MLSResponse {
  properties: MLSProperty[]
  totalCount: number
  hasMore: boolean
  page: number
  limit: number
}

/**
 * Generic MLS API client that can be configured for different MLS providers
 */
class MLSAPIClient {
  private baseUrl: string
  private apiKey: string
  private provider: string

  constructor(provider: string = 'default') {
    this.provider = provider
    this.baseUrl = process.env.NEXT_PUBLIC_MLS_API_URL || ''
    this.apiKey = process.env.MLS_API_KEY || ''
  }

  /**
   * Fetch properties with filters
   */
  async getProperties(filters: MLSFilters = {}): Promise<MLSResponse> {
    try {
      const params = new URLSearchParams()
      
      // Add filters to query parameters
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString())
        }
      })

      const response = await fetch(`${this.baseUrl}/properties?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`MLS API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      return this.transformResponse(data)
    } catch (error) {
      console.error('Error fetching properties from MLS API:', error)
      // Return mock data for development/fallback
      return this.getMockData(filters)
    }
  }

  /**
   * Fetch a single property by ID
   */
  async getPropertyById(id: string): Promise<MLSProperty | null> {
    try {
      const response = await fetch(`${this.baseUrl}/properties/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`MLS API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      return this.transformProperty(data)
    } catch (error) {
      console.error('Error fetching property from MLS API:', error)
      // Return mock data for development/fallback
      return this.getMockProperty(id)
    }
  }

  /**
   * Search properties by city
   */
  async getPropertiesByCity(city: string, limit: number = 6): Promise<MLSProperty[]> {
    const response = await this.getProperties({ city, limit })
    return response.properties
  }

  /**
   * Get featured properties
   */
  async getFeaturedProperties(limit: number = 6): Promise<MLSProperty[]> {
    const response = await this.getProperties({ 
      status: 'active',
      limit 
    })
    return response.properties
  }

  /**
   * Transform API response to our standard format
   */
  private transformResponse(data: any): MLSResponse {
    return {
      properties: data.properties?.map((p: any) => this.transformProperty(p)) || [],
      totalCount: data.totalCount || 0,
      hasMore: data.hasMore || false,
      page: data.page || 1,
      limit: data.limit || 10
    }
  }

  /**
   * Transform individual property to our standard format
   */
  private transformProperty(data: any): MLSProperty {
    return {
      id: data.id || data.mlsNumber || data.listingId,
      mlsNumber: data.mlsNumber || data.listingId || data.id,
      address: data.address || data.streetAddress || '',
      city: data.city || '',
      state: data.state || '',
      zipCode: data.zipCode || data.zip || '',
      price: parseFloat(data.price || data.listPrice || 0),
      bedrooms: parseInt(data.bedrooms || data.beds || 0),
      bathrooms: parseFloat(data.bathrooms || data.baths || 0),
      squareFeet: parseInt(data.squareFeet || data.sqft || 0),
      propertyType: data.propertyType || data.type || 'Single Family',
      status: data.status || data.listingStatus || 'active',
      description: data.description || data.remarks || '',
      imageUrl: data.imageUrl || data.primaryPhoto || data.photos?.[0],
      images: data.images || data.photos || [],
      yearBuilt: parseInt(data.yearBuilt || 0),
      lotSize: data.lotSize || data.acres,
      features: data.features || data.amenities || [],
      agentName: data.agentName || data.listingAgent?.name,
      agentPhone: data.agentPhone || data.listingAgent?.phone,
      agentEmail: data.agentEmail || data.listingAgent?.email,
      listingDate: data.listingDate || data.dateListed,
      lastUpdated: data.lastUpdated || data.updatedAt
    }
  }

  /**
   * Mock data for development/fallback
   */
  private getMockData(filters: MLSFilters): MLSResponse {
    const mockProperties: MLSProperty[] = [
      {
        id: '1',
        mlsNumber: 'MLS001',
        address: '123 Beverly Hills Dr',
        city: 'Beverly Hills',
        state: 'CA',
        zipCode: '90210',
        price: 12500000,
        bedrooms: 6,
        bathrooms: 8,
        squareFeet: 8500,
        propertyType: 'Single Family',
        status: 'active',
        description: 'Stunning luxury estate with panoramic city views and resort-style amenities.',
        imageUrl: '/api/placeholder/400/300',
        yearBuilt: 2018,
        lotSize: '1.2 acres',
        features: ['Pool', 'Spa', 'City Views', 'Gourmet Kitchen'],
        agentName: 'Don Adams',
        agentPhone: '(555) 123-4567',
        agentEmail: 'don@altmanrealestate.com'
      },
      {
        id: '2',
        mlsNumber: 'MLS002',
        address: '456 Pacific Coast Hwy',
        city: 'Malibu',
        state: 'CA',
        zipCode: '90265',
        price: 18500000,
        bedrooms: 5,
        bathrooms: 7,
        squareFeet: 6200,
        propertyType: 'Single Family',
        status: 'active',
        description: 'Exclusive beachfront property with private beach access and infinity pool.',
        imageUrl: '/api/placeholder/400/300',
        yearBuilt: 2020,
        lotSize: '0.8 acres',
        features: ['Oceanfront', 'Private Beach', 'Infinity Pool', 'Modern Design'],
        agentName: 'Don Adams',
        agentPhone: '(555) 123-4567',
        agentEmail: 'don@altmanrealestate.com'
      },
      {
        id: '3',
        mlsNumber: 'MLS003',
        address: '789 Hollywood Hills Dr',
        city: 'Hollywood Hills',
        state: 'CA',
        zipCode: '90069',
        price: 8500000,
        bedrooms: 4,
        bathrooms: 5,
        squareFeet: 4800,
        propertyType: 'Single Family',
        status: 'active',
        description: 'Contemporary hillside home with smart home technology and city views.',
        imageUrl: '/api/placeholder/400/300',
        yearBuilt: 2019,
        lotSize: '0.6 acres',
        features: ['City Views', 'Smart Home', 'Modern Design', 'Hillside Location'],
        agentName: 'Don Adams',
        agentPhone: '(555) 123-4567',
        agentEmail: 'don@altmanrealestate.com'
      }
    ]

    // Filter mock data based on filters
    let filteredProperties = mockProperties

    if (filters.city) {
      filteredProperties = filteredProperties.filter(p => 
        p.city.toLowerCase().includes(filters.city!.toLowerCase())
      )
    }

    if (filters.minPrice) {
      filteredProperties = filteredProperties.filter(p => p.price >= filters.minPrice!)
    }

    if (filters.maxPrice) {
      filteredProperties = filteredProperties.filter(p => p.price <= filters.maxPrice!)
    }

    if (filters.bedrooms) {
      filteredProperties = filteredProperties.filter(p => p.bedrooms >= filters.bedrooms!)
    }

    if (filters.propertyType) {
      filteredProperties = filteredProperties.filter(p => 
        p.propertyType.toLowerCase() === filters.propertyType!.toLowerCase()
      )
    }

    const limit = filters.limit || 6
    const offset = filters.offset || 0

    return {
      properties: filteredProperties.slice(offset, offset + limit),
      totalCount: filteredProperties.length,
      hasMore: offset + limit < filteredProperties.length,
      page: Math.floor(offset / limit) + 1,
      limit
    }
  }

  /**
   * Get mock property by ID
   */
  private getMockProperty(id: string): MLSProperty | null {
    const mockData = this.getMockData({})
    return mockData.properties.find(p => p.id === id) || null
  }
}

// Create and export the MLS API client instance
export const mlsApi = new MLSAPIClient()

// Export utility functions
export async function getMLSProperties(filters: MLSFilters = {}): Promise<MLSProperty[]> {
  const response = await mlsApi.getProperties(filters)
  return response.properties
}

export async function getMLSPropertyById(id: string): Promise<MLSProperty | null> {
  return await mlsApi.getPropertyById(id)
}

export async function getMLSPropertiesByCity(city: string, limit: number = 6): Promise<MLSProperty[]> {
  return await mlsApi.getPropertiesByCity(city, limit)
}

export async function getMLSFeaturedProperties(limit: number = 6): Promise<MLSProperty[]> {
  return await mlsApi.getFeaturedProperties(limit)
}

/**
 * Format price for display
 */
export function formatMLSPrice(price: number): string {
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(1)}M`
  } else if (price >= 1000) {
    return `$${(price / 1000).toFixed(0)}K`
  }
  return `$${price.toLocaleString()}`
}
