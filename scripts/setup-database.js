const { createClient } = require('@supabase/supabase-js')

// Replace these with your actual Supabase credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function setupDatabase() {
  console.log('Setting up database...')

  try {
    // Insert default hero content
    const { error: heroError } = await supabase
      .from('hero_content')
      .upsert({
        title: 'Luxury Real Estate Excellence',
        subtitle: 'The Altman Brothers',
        description: 'Discover exceptional properties and unparalleled service with the leading luxury real estate team in Los Angeles.',
        image_url: '/placeholder.svg?height=800&width=1600&text=Luxury Real Estate Hero',
        cta_text: 'Explore Properties',
        cta_link: '/listings'
      })

    if (heroError) {
      console.error('Error inserting hero content:', heroError)
    } else {
      console.log('✅ Hero content inserted')
    }

    // Insert sample blogs
    const sampleBlogs = [
      {
        title: 'First Time Home Buyer Guide',
        slug: 'first-time-home-buyer-guide',
        excerpt: 'Everything you need to know about buying your first home in Los Angeles.',
        content: 'Buying your first home is an exciting milestone...',
        image_url: '/placeholder.svg?height=400&width=600&text=First Time Home Buyer',
        author: 'Josh Altman',
        published: true
      },
      {
        title: 'Market Trends 2024',
        slug: 'market-trends-2024',
        excerpt: 'Current real estate market trends and predictions for 2024.',
        content: 'The Los Angeles real estate market continues to evolve...',
        image_url: '/placeholder.svg?height=400&width=600&text=Market Trends',
        author: 'Matt Altman',
        published: true
      }
    ]

    for (const blog of sampleBlogs) {
      const { error } = await supabase.from('blogs').upsert(blog)
      if (error) {
        console.error('Error inserting blog:', error)
      } else {
        console.log(`✅ Blog "${blog.title}" inserted`)
      }
    }

    // Insert sample testimonials
    const sampleTestimonials = [
      {
        client_name: 'Sarah Johnson',
        client_title: 'Home Buyer',
        content: 'The Altman Brothers made our home buying experience seamless and enjoyable. Their expertise and dedication are unmatched.',
        rating: 5,
        image_url: '/placeholder.svg?height=80&width=80&text=SJ',
        published: true
      },
      {
        client_name: 'Michael Chen',
        client_title: 'Property Investor',
        content: 'Working with the Altman Brothers has been incredible. They helped me build a profitable real estate portfolio.',
        rating: 5,
        image_url: '/placeholder.svg?height=80&width=80&text=MC',
        published: true
      }
    ]

    for (const testimonial of sampleTestimonials) {
      const { error } = await supabase.from('testimonials').upsert(testimonial)
      if (error) {
        console.error('Error inserting testimonial:', error)
      } else {
        console.log(`✅ Testimonial from ${testimonial.client_name} inserted`)
      }
    }

    // Insert sample videos
    const sampleVideos = [
      {
        title: 'Luxury Property Tour',
        description: 'Take a virtual tour of this stunning Beverly Hills mansion.',
        youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnail_url: '/placeholder.svg?height=180&width=320',
        published: true
      }
    ]

    for (const video of sampleVideos) {
      const { error } = await supabase.from('videos').upsert(video)
      if (error) {
        console.error('Error inserting video:', error)
      } else {
        console.log(`✅ Video "${video.title}" inserted`)
      }
    }

    console.log('🎉 Database setup completed successfully!')
    console.log('\nNext steps:')
    console.log('1. Configure your Supabase environment variables')
    console.log('2. Set up email credentials for appointment notifications')
    console.log('3. Upload real images to replace placeholders')
    console.log('4. Customize content for your business')

  } catch (error) {
    console.error('Setup failed:', error)
  }
}

setupDatabase() 