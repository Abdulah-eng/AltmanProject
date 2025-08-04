import { createClientClient } from "@/lib/supabase/client"

export interface TeamMember {
  id: string
  name: string
  title: string
  bio: string
  image_url: string
  email: string
  phone: string
  linkedin_url: string
  instagram_url: string
  twitter_url: string
  featured: boolean
  order_index: number
  created_at: string
}

/**
 * Fetch all team members ordered by display order
 */
export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const supabase = createClientClient()
    
    console.log('Supabase client created, fetching team members...')
    console.log('Environment check - SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not set')
    console.log('Environment check - SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set')
    
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) {
      console.warn('Failed to fetch team members:', error)
      console.error('Supabase error details:', error)
      return []
    }

    console.log('Team members found:', data?.length || 0)
    console.log('Team members data:', data)
    
    // Log each team member for debugging
    if (data && data.length > 0) {
      data.forEach((member, index) => {
        console.log(`Team member ${index + 1}:`, {
          id: member.id,
          name: member.name,
          title: member.title,
          featured: member.featured,
          order_index: member.order_index
        })
      })
    }
    
    return data || []
  } catch (error) {
    console.error('Error fetching team members:', error)
    return []
  }
}

/**
 * Fetch featured team members only
 */
export async function getFeaturedTeamMembers(): Promise<TeamMember[]> {
  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('featured', true)
      .order('order_index', { ascending: true })

    if (error) {
      console.warn('Failed to fetch featured team members:', error)
      return []
    }

    console.log('Featured team members found:', data?.length || 0)
    return data || []
  } catch (error) {
    console.error('Error fetching featured team members:', error)
    return []
  }
}

/**
 * Fetch a single team member by ID
 */
export async function getTeamMemberById(id: string): Promise<TeamMember | null> {
  if (!id) {
    return null
  }

  try {
    const supabase = createClientClient()
    
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      console.warn(`Team member not found for ID: ${id}`)
      return null
    }

    return data
  } catch (error) {
    console.error(`Error fetching team member with ID ${id}:`, error)
    return null
  }
}

/**
 * Get team members with optional filters
 */
export async function getTeamMembersWithFilters(filters?: {
  featured?: boolean
  limit?: number
}): Promise<TeamMember[]> {
  try {
    const supabase = createClientClient()
    
    let query = supabase.from('team_members').select('*')

    if (filters?.featured !== undefined) {
      query = query.eq('featured', filters.featured)
    }

    query = query.order('order_index', { ascending: true })

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query

    if (error) {
      console.warn('Failed to fetch team members with filters:', error)
      return []
    }

         return data || []
   } catch (error) {
     console.error('Error fetching team members with filters:', error)
     return []
   }
}

/**
 * Test function to verify database connection
 */
export async function testDatabaseConnection(): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    const supabase = createClientClient()
    
    console.log('Testing database connection...')
    
    // Test a simple query
    const { data, error } = await supabase
      .from('team_members')
      .select('count')
      .limit(1)

    if (error) {
      console.error('Database connection test failed:', error)
      return {
        success: false,
        message: `Database connection failed: ${error.message}`,
        data: error
      }
    }

    console.log('Database connection test successful')
    return {
      success: true,
      message: 'Database connection successful',
      data: data
    }
  } catch (error) {
    console.error('Database connection test error:', error)
    return {
      success: false,
      message: `Database connection error: ${error}`,
      data: error
    }
  }
} 