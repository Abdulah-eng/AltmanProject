"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BlogCard } from "./blog-card"

interface Blog {
  id: string
  title: string
  excerpt: string
  image_url: string
  author: string
  created_at: string
  slug: string
}

interface BlogSectionProps {
  blogs: Blog[] | null
}

export function BlogSection({ blogs }: BlogSectionProps) {
  const defaultBlogs = [
    {
      id: "1",
      title: "Luxury Market Trends in Beverly Hills",
      excerpt: "Insights into the current luxury real estate market and what buyers should expect.",
      image_url: "/placeholder.svg?height=200&width=300&text=Beverly Hills Market",
      author: "Homes of Hollywood Team",
      created_at: "2024-01-15",
      slug: "luxury-market-trends-beverly-hills",
    },
    {
      id: "2",
      title: "Million Dollar Listing: Behind the Scenes",
      excerpt: "Exclusive insights from our experience on Bravo's Million Dollar Listing Los Angeles.",
      image_url: "/placeholder.svg?height=200&width=300&text=Million Dollar Listing",
      author: "Homes of Hollywood Team",
      created_at: "2024-01-10",
      slug: "million-dollar-listing-behind-scenes",
    },
    {
      id: "3",
      title: "Staging Luxury Properties for Maximum Impact",
      excerpt: "Professional staging strategies for high-end properties to achieve premium sales.",
      image_url: "/placeholder.svg?height=200&width=300&text=Luxury Staging",
      author: "Homes of Hollywood Team",
      created_at: "2024-01-05",
      slug: "staging-luxury-properties",
    },
  ]

  const displayBlogs = blogs && blogs.length > 0 ? blogs : defaultBlogs

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="text-[#D4AF37] text-sm tracking-[0.3em] mb-4">IN THE MEDIA</div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-wide">LATEST INSIGHTS</h2>
          <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Stay informed with our latest luxury market insights, media appearances, and real estate expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold px-8 py-4 tracking-wide"
          >
            <Link href="/blog">VIEW ALL ARTICLES</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
