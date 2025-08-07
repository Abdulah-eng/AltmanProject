"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, User, ArrowLeft, Share2, Clock, Tag } from "lucide-react"
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const estimatedReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(' ').length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  return (
    <main className="bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="ghost" 
              asChild 
              className="mb-8 text-[#D4AF37] hover:text-white hover:bg-[#D4AF37]/10 transition-all duration-300"
            >
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>

            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight tracking-wide">
                {blog.title}
              </h1>

              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
                <div className="flex items-center text-gray-300 space-x-6">
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-2 text-[#D4AF37]" />
                    <span className="font-medium">{blog.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-[#D4AF37]" />
                    <span>{formatDate(blog.created_at)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-[#D4AF37]" />
                    <span>{estimatedReadingTime(blog.content)} min read</span>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Article
                </Button>
              </div>

              <div className="w-16 h-1 bg-[#D4AF37] mb-8"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="animate-fade-in-up animate-stagger-1">
              {/* Excerpt */}
              <div className="bg-gray-900 border-l-4 border-[#D4AF37] p-8 mb-12 rounded-r-lg">
                <p className="text-xl text-gray-300 leading-relaxed font-light italic">
                  "{blog.excerpt}"
                </p>
              </div>

              {/* Main Content */}
              <div className="prose prose-lg max-w-none prose-invert">
                <div 
                  className="text-gray-300 leading-relaxed text-lg space-y-6"
                  style={{
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    hyphens: 'auto'
                  }}
                >
                  {blog.content.split('\n').map((paragraph, index) => {
                    if (paragraph.trim() === '') {
                      return <div key={index} className="h-6"></div>
                    }
                    
                    // Handle different content types
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      // Bold headers
                      return (
                        <h2 key={index} className="text-2xl font-bold text-[#D4AF37] mt-12 mb-6 tracking-wide">
                          {paragraph.replace(/\*\*/g, '')}
                        </h2>
                      )
                    } else if (paragraph.match(/^\d+\.\s/)) {
                      // Numbered lists
                      return (
                        <div key={index} className="flex items-start space-x-4">
                          <span className="text-[#D4AF37] font-bold text-lg flex-shrink-0">
                            {paragraph.match(/^\d+/)?.[0]}.
                          </span>
                          <p className="text-gray-300 leading-relaxed">
                            {paragraph.replace(/^\d+\.\s/, '')}
                          </p>
                        </div>
                      )
                    } else if (paragraph.startsWith('- ')) {
                      // Bullet points
                      return (
                        <div key={index} className="flex items-start space-x-4">
                          <span className="text-[#D4AF37] text-lg flex-shrink-0">•</span>
                          <p className="text-gray-300 leading-relaxed">
                            {paragraph.replace(/^-\s/, '')}
                          </p>
                        </div>
                      )
                    } else {
                      // Regular paragraphs
                      return (
                        <p key={index} className="text-gray-300 leading-relaxed">
                          {paragraph}
                        </p>
                      )
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedBlogs && relatedBlogs.length > 0 && (
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 animate-fade-in-up">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-wide">RELATED ARTICLES</h2>
                <div className="w-16 h-1 bg-[#D4AF37] mx-auto"></div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {relatedBlogs.map((relatedBlog, index) => (
                  <Card 
                    key={relatedBlog.id} 
                    className="bg-gray-800 border-gray-700 hover:border-[#D4AF37] transition-all duration-300 hover-lift animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-8">
                      <div className="flex items-center text-sm text-gray-400 mb-4">
                        <User className="w-4 h-4 mr-2 text-[#D4AF37]" />
                        <span className="mr-4 font-medium">{relatedBlog.author}</span>
                        <Calendar className="w-4 h-4 mr-2 text-[#D4AF37]" />
                        <span>{formatDate(relatedBlog.created_at)}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 leading-tight">
                        {relatedBlog.title}
                      </h3>
                      
                      <div className="text-gray-300 mb-6 leading-relaxed">
                        <p className="line-clamp-3 text-sm">
                          {relatedBlog.excerpt}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Tag className="w-4 h-4 mr-2 text-[#D4AF37]" />
                          <span className="text-xs text-[#D4AF37] font-medium tracking-wide">RELATED</span>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          asChild 
                          size="sm" 
                          className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
                        >
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