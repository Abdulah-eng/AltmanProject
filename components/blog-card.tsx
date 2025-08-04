"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, User } from "lucide-react"
import Link from "next/link"

interface Blog {
  id: string
  title: string
  excerpt: string
  image_url: string
  author: string
  created_at: string
  slug: string
}

interface BlogCardProps {
  blog: Blog
  variant?: "default" | "featured"
}

export function BlogCard({ blog, variant = "default" }: BlogCardProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    target.src = "/placeholder.svg?height=200&width=300&text=Blog Image"
  }

     if (variant === "featured") {
     return (
       <Card className="max-w-4xl mx-auto overflow-hidden">
         <div className="p-8">
           <div className="flex items-center text-sm text-gray-500 mb-6">
             <User className="w-4 h-4 mr-1" />
             <span className="mr-4">{blog.author}</span>
             <Calendar className="w-4 h-4 mr-1" />
             <span>{new Date(blog.created_at).toLocaleDateString()}</span>
           </div>
           
           <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{blog.title}</h3>
           
           <div className="text-gray-600 mb-8 text-lg leading-relaxed">
             <p className="mb-4">{blog.excerpt}</p>
           </div>
           
           <div className="flex items-center justify-between">
             <div className="flex items-center text-xs text-gray-500">
               <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">Featured Article</span>
             </div>
             
             <Button asChild size="lg">
               <Link href={`/blog/${blog.slug}`}>Read Full Article</Link>
             </Button>
           </div>
         </div>
       </Card>
     )
   }

  return (
    <Card className="bg-black border-gray-800 hover:border-[#D4AF37] transition-all duration-300 group overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center text-sm text-gray-400 mb-4">
          <User className="w-4 h-4 mr-1" />
          <span className="mr-4">{blog.author}</span>
          <Calendar className="w-4 h-4 mr-1" />
          <span>{new Date(blog.created_at).toLocaleDateString()}</span>
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
          {blog.title}
        </h3>
        
        <div className="text-gray-300 mb-4 leading-relaxed">
          <p className="line-clamp-4 text-sm">{blog.excerpt}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500">
            <span className="bg-gray-700 px-2 py-1 rounded">Blog Post</span>
          </div>
          
          <Button
            variant="outline"
            asChild
            size="sm"
            className="bg-transparent border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
          >
            <Link href={`/blog/${blog.slug}`}>READ MORE</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 