"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { createClientClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Plus, Edit, Trash2, Star, User, Quote } from "lucide-react"

interface SuccessStory {
  id: string
  name: string
  title: string
  quote: string
  image_url: string
  featured: boolean
  order_index: number
  created_at: string
}

export function SuccessStoriesManager() {
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingStory, setEditingStory] = useState<SuccessStory | null>(null)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    quote: "",
    featured: false,
    order_index: 0,
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClientClient()

  useEffect(() => {
    fetchSuccessStories()
  }, [])

  const fetchSuccessStories = async () => {
    try {
      const { data, error } = await supabase
        .from("success_stories")
        .select("*")
        .order("order_index", { ascending: true })

      if (error) {
        console.error("Error fetching success stories:", error)
        toast.error("Failed to load success stories")
        return
      }

      setSuccessStories(data || [])
    } catch (error) {
      console.error("Error fetching success stories:", error)
      toast.error("Failed to load success stories")
    }
  }

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
  }

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.name.trim()) {
      toast.error("Name is required")
      return
    }
    if (!formData.title.trim()) {
      toast.error("Title is required")
      return
    }
    if (!formData.quote.trim()) {
      toast.error("Quote is required")
      return
    }

    if (!editingStory && !selectedFile) {
      toast.error("Please select a profile image")
      return
    }

    setUploading(true)

    try {
      let imageUrl = editingStory?.image_url || ""

      // Upload new image if provided
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random()}.${fileExt}`
        const filePath = `success-stories/${fileName}`

        const { error: uploadError } = await supabase.storage.from('website-images').upload(filePath, selectedFile)

        if (uploadError) {
          console.error("Upload error:", uploadError)
          toast.error("Failed to upload image")
          setUploading(false)
          return
        }

        const { data: { publicUrl } } = supabase.storage.from('website-images').getPublicUrl(filePath)
        imageUrl = publicUrl
      }

      const storyData = {
        name: formData.name.trim(),
        title: formData.title.trim(),
        quote: formData.quote.trim(),
        image_url: imageUrl,
        featured: formData.featured,
        order_index: formData.order_index,
      }

      if (editingStory) {
        // Update existing story
        const { error: updateError } = await supabase
          .from("success_stories")
          .update(storyData)
          .eq("id", editingStory.id)

        if (updateError) {
          console.error("Update error:", updateError)
          toast.error("Failed to update success story")
        } else {
          toast.success("Success story updated successfully")
          setIsDialogOpen(false)
          resetForm()
          fetchSuccessStories()
        }
      } else {
        // Add new story
        const { error: insertError } = await supabase.from("success_stories").insert(storyData)

        if (insertError) {
          console.error("Insert error:", insertError)
          toast.error("Failed to save success story")
        } else {
          toast.success("Success story added successfully")
          setIsDialogOpen(false)
          resetForm()
          fetchSuccessStories()
        }
      }
    } catch (error) {
      console.error("Submit error:", error)
      toast.error("An error occurred")
    }

    setUploading(false)
  }

  const handleDelete = async (id: string, imageUrl?: string) => {
    if (!confirm("Are you sure you want to delete this success story?")) return

    try {
      // Delete from database first
      const { error: deleteError } = await supabase.from("success_stories").delete().eq("id", id)

      if (deleteError) {
        console.error("Delete error:", deleteError)
        toast.error("Failed to delete success story")
        return
      }

      // If there's an image URL, try to delete from storage
      if (imageUrl && imageUrl.includes('/')) {
        try {
          const urlParts = imageUrl.split('/')
          const filePath = urlParts.slice(-2).join('/')
          
          const { error: storageError } = await supabase.storage.from('website-images').remove([filePath])
          
          if (storageError) {
            console.warn("Failed to delete image from storage:", storageError)
          }
        } catch (storageError) {
          console.warn("Error deleting image:", storageError)
        }
      }

      toast.success("Success story deleted successfully")
      fetchSuccessStories()
    } catch (error) {
      console.error("Delete error:", error)
      toast.error("Failed to delete success story")
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      title: "",
      quote: "",
      featured: false,
      order_index: 0,
    })
    setSelectedFile(null)
    setEditingStory(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const openEditDialog = (story: SuccessStory) => {
    setEditingStory(story)
    setFormData({
      name: story.name,
      title: story.title,
      quote: story.quote,
      featured: story.featured,
      order_index: story.order_index,
    })
    setSelectedFile(null)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Success Stories Management</h2>
          <p className="text-gray-600">Manage testimonials and success stories for the training page</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Success Story
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingStory ? "Edit Success Story" : "Add New Success Story"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {!editingStory && (
                <div>
                  <Label htmlFor="image">Profile Image *</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileSelect(file)
                    }}
                  />
                  <p className="text-sm text-gray-500 mt-1">Required for new success stories</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Sarah Johnson"
                  />
                </div>
                <div>
                  <Label htmlFor="title">Title/Position *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Beverly Hills Agent"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="quote">Quote/Testimonial *</Label>
                <Textarea
                  id="quote"
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  placeholder="Enter the success story quote..."
                  rows={4}
                />
                <p className="text-sm text-gray-500 mt-1">Share their experience and results</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="order_index">Display Order</Label>
                  <Input
                    id="order_index"
                    type="number"
                    value={formData.order_index}
                    onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                    placeholder="1"
                  />
                  <p className="text-sm text-gray-500 mt-1">Lower numbers appear first</p>
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="featured">Featured Story</Label>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button 
                  onClick={handleSubmit} 
                  disabled={uploading}
                  className="flex-1"
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {editingStory ? "Updating..." : "Adding..."}
                    </>
                  ) : (
                    <>
                      {editingStory ? "Update Story" : "Add Story"}
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  disabled={uploading}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Success Stories ({successStories.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {successStories.length === 0 ? (
            <div className="text-center py-12">
              <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No success stories yet</h3>
              <p className="text-gray-500 mb-4">Get started by adding your first success story.</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Story
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {successStories.map((story) => (
                <div key={story.id} className="border rounded-lg overflow-hidden">
                  <div className="relative">
                    {story.image_url ? (
                      <img
                        src={story.image_url}
                        alt={story.name}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <User className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                    
                    <div className="absolute top-2 left-2 flex space-x-2">
                      {story.featured && (
                        <Badge variant="secondary" className="bg-[#D4AF37] text-black">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        Order: {story.order_index}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{story.name}</h3>
                    <p className="text-[#D4AF37] text-sm font-medium mb-3">{story.title}</p>
                    
                    <div className="mb-3">
                      <div className="flex items-start">
                        <Quote className="w-4 h-4 text-gray-400 mr-2 mt-1 flex-shrink-0" />
                        <p className="text-gray-600 text-sm italic line-clamp-3">
                          "{story.quote}"
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(story)}
                        className="flex-1"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(story.id, story.image_url)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 