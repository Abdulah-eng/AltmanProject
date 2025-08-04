"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"

interface Blog {
  id: string
  title: string
  excerpt: string
  content: string
  image_url: string
  author: string
  created_at: string
  slug: string
}

interface BlogPostContentProps {
  blog: Blog
  relatedBlogs?: Blog[]
}

export function BlogPostContent({ blog, relatedBlogs }: BlogPostContentProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    target.src = "/placeholder.svg?height=400&width=800&text=Blog Image"
  }

  return (
    <main>
      {/* Article Header */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button variant="ghost" asChild className="mb-6">
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>

            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">{blog.title}</h1>

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center text-gray-600">
                <User className="w-5 h-5 mr-2" />
                <span className="mr-6">{blog.author}</span>
                <Calendar className="w-5 h-5 mr-2" />
                <span>{new Date(blog.created_at).toLocaleDateString()}</span>
              </div>

              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </section>

      

      {/* Article Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 mb-8 font-medium">{blog.excerpt}</p>

              <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">{blog.content}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedBlogs && relatedBlogs.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Related Articles</h2>

                             <div className="grid md:grid-cols-3 gap-8">
                 {relatedBlogs.map((relatedBlog) => (
                   <Card key={relatedBlog.id} className="hover:shadow-lg transition-shadow">
                     <CardContent className="p-6">
                       <div className="flex items-center text-sm text-gray-500 mb-3">
                         <User className="w-4 h-4 mr-1" />
                         <span className="mr-4">{relatedBlog.author}</span>
                         <Calendar className="w-4 h-4 mr-1" />
                         <span>{new Date(relatedBlog.created_at).toLocaleDateString()}</span>
                       </div>
                       
                       <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">{relatedBlog.title}</h3>
                       
                       <div className="text-gray-600 mb-4 leading-relaxed">
                         <p className="line-clamp-3 text-sm">{relatedBlog.excerpt}</p>
                       </div>
                       
                       <div className="flex items-center justify-between">
                         <div className="flex items-center text-xs text-gray-500">
                           <span className="bg-gray-100 px-2 py-1 rounded">Related</span>
                         </div>
                         
                         <Button variant="outline" asChild size="sm" className="bg-transparent">
                           <Link href={`/blog/${relatedBlog.slug}`}>Read More</Link>
                         </Button>
                       </div>
                     </CardContent>
                   </Card>
                 ))}
               </div>
            </div>
          </div>
        </section>
      )}
    </main>
  )
} 