import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogPageContent } from "@/components/blog-page-content"
import { createServerClient } from "@/lib/supabase/server"

export default async function BlogPage() {
  let blogs = null

  try {
    const supabase = await createServerClient()
    const result = await supabase
      .from("blogs")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
    blogs = result.data
  } catch (error) {
    console.log("Database not configured, using default data")
  }

  // If no blogs from database, use default data
  if (!blogs || blogs.length === 0) {
    const defaultBlogs = [
      {
        id: "1",
        title: "Top 10 Tips for First-Time Home Buyers",
        excerpt: "Essential advice for navigating your first home purchase successfully.",
        image_url: "/placeholder.svg?height=400&width=600&text=Home Buying Tips",
        author: "Josh Altman",
        created_at: "2024-01-15",
        slug: "first-time-home-buyers-tips",
      },
      {
        id: "2",
        title: "Market Trends: What to Expect in 2024",
        excerpt: "Our analysis of the current real estate market and predictions for the year ahead.",
        image_url: "/placeholder.svg?height=400&width=600&text=Market Trends",
        author: "Matt Altman",
        created_at: "2024-01-10",
        slug: "market-trends-2024",
      },
      {
        id: "3",
        title: "Staging Your Home for Maximum Appeal",
        excerpt: "Professional staging tips to help your home sell faster and for more money.",
        image_url: "/placeholder.svg?height=400&width=600&text=Home Staging",
        author: "Josh Altman",
        created_at: "2024-01-05",
        slug: "home-staging-tips",
      },
    ]
    blogs = defaultBlogs
  }

  const featuredBlog = blogs?.[0]
  const otherBlogs = blogs?.slice(1) || []

  return (
    <div className="min-h-screen">
      <Header />
      <BlogPageContent blogs={blogs} />
      <Footer />
    </div>
  )
}
