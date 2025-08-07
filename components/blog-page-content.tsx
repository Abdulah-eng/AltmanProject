"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, User, Search } from "lucide-react"
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

interface BlogPageContentProps {
  blogs: Blog[]
}

export function BlogPageContent({ blogs }: BlogPageContentProps) {
  const featuredBlog = blogs?.[0]
  const otherBlogs = blogs?.slice(1) || []

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    target.src = "/placeholder.svg?height=400&width=800&text=Blog Image"
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Real Estate Insights</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Stay informed with the latest market trends, tips, and expert advice from the Homes of Hollywood team.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input placeholder="Search articles..." className="pl-10 bg-white text-gray-900" />
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredBlog && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Article</h2>
            </div>

            <BlogCard blog={featuredBlog} variant="featured" />
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest Articles</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover insights, tips, and market analysis from our real estate experts.
            </p>
          </div>

                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {otherBlogs.map((blog) => (
               <Card key={blog.id} className="hover:shadow-lg transition-shadow">
                 <CardContent className="p-6">
                   <div className="flex items-center text-sm text-gray-500 mb-4">
                     <User className="w-4 h-4 mr-1" />
                     <span className="mr-4">{blog.author}</span>
                     <Calendar className="w-4 h-4 mr-1" />
                     <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                   </div>
                   
                   <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">{blog.title}</h3>
                   
                   <div className="text-gray-600 mb-4 leading-relaxed">
                     <p className="line-clamp-4 text-sm">{blog.excerpt}</p>
                   </div>
                   
                   <div className="flex items-center justify-between">
                     <div className="flex items-center text-xs text-gray-500">
                       <span className="bg-gray-100 px-2 py-1 rounded">Blog Post</span>
                     </div>
                     
                     <Button variant="outline" asChild size="sm" className="bg-transparent">
                       <Link href={`/blog/${blog.slug}`}>Read More</Link>
                     </Button>
                   </div>
                 </CardContent>
               </Card>
             ))}
           </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest market insights, property updates, and real estate tips
            delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <Input placeholder="Enter your email" className="bg-white text-gray-900" />
            <Button variant="secondary">Subscribe</Button>
          </div>
        </div>
      </section>
    </main>
  )
} 