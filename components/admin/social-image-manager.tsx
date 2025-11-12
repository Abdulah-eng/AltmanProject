"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { createClientClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Plus, Edit, Trash2, Upload, Instagram, Facebook, Twitter } from "lucide-react"

interface SocialImage {
  id: string
  title: string
  description?: string
  image_url: string
  social_handle: string
  platform: 'instagram' | 'facebook' | 'twitter' | 'tiktok'
  published: boolean
  featured: boolean
  order_index: number
  created_at: string
  updated_at: string
}

export function SocialImageManager() {
  const [socialImages, setSocialImages] = useState<SocialImage[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingImage, setEditingImage] = useState<SocialImage | null>(null)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    social_handle: "",
    platform: "instagram" as const,
    published: false,
    featured: false,
    order_index: 0,
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClientClient()

  useEffect(() => {
    fetchSocialImages()
  }, [])

  const fetchSocialImages = async () => {
    try {
      const { data, error } = await supabase
        .from("social_images")
        .select("*")
        .order("order_index", { ascending: true })
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching social images:", error)
        toast.error("Failed to load social images")
        return
      }

      setSocialImages(data || [])
    } catch (error) {
      console.error("Error fetching social images:", error)
      toast.error("Failed to load social images")
    }
  }

  const handleFileUpload = async (file: File) => {
    if (!file) return

    setUploading(true)
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `social-images/${fileName}`

    const { error: uploadError } = await supabase.storage.from('website-images').upload(filePath, file)

    if (uploadError) {
      toast.error("Failed to upload image")
      setUploading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage.from('website-images').getPublicUrl(filePath)

    const imageData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      image_url: publicUrl,
      social_handle: formData.social_handle.trim(),
      platform: formData.platform,
      published: formData.published,
      featured: formData.featured,
      order_index: formData.order_index,
    }

    const { error: insertError } = await supabase.from("social_images").insert(imageData)

    if (insertError) {
      toast.error("Failed to save social image data")
    } else {
      toast.success("Social image uploaded successfully")
      setIsDialogOpen(false)
      resetForm()
      fetchSocialImages()
    }

    setUploading(false)
  }

  const handleSave = async () => {
    // Validate required fields
    if (!formData.title.trim()) {
      toast.error("Image title is required")
      return
    }
    if (!formData.social_handle.trim()) {
      toast.error("Social handle is required")
      return
    }

    if (editingImage) {
      // Update existing image
      const { error } = await supabase
        .from("social_images")
        .update({
          title: formData.title.trim(),
          description: formData.description.trim(),
          social_handle: formData.social_handle.trim(),
          platform: formData.platform,
          published: formData.published,
          featured: formData.featured,
          order_index: formData.order_index,
        })
        .eq("id", editingImage.id)

      if (error) {
        toast.error("Failed to update social image")
        return
      }

      toast.success("Social image updated successfully")
    } else {
      // Upload new image
      const file = fileInputRef.current?.files?.[0]
      if (!file) {
        toast.error("Please select an image file")
        return
      }
      await handleFileUpload(file)
      return
    }

    setIsDialogOpen(false)
    resetForm()
    fetchSocialImages()
  }

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Are you sure you want to delete this social image?")) return

    try {
      // Extract file path from URL
      const urlParts = imageUrl.split('/')
      const filePath = urlParts.slice(-2).join('/')

      // Delete from storage
      const { error: storageError } = await supabase.storage.from('website-images').remove([filePath])

      if (storageError) {
        console.error("Failed to delete from storage:", storageError)
      }

      // Delete from database
      const { error } = await supabase.from("social_images").delete().eq("id", id)

      if (error) {
        toast.error("Failed to delete social image")
        return
      }

      toast.success("Social image deleted successfully")
      fetchSocialImages()
    } catch (error) {
      console.error("Error deleting social image:", error)
      toast.error("Failed to delete social image")
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      social_handle: "",
      platform: "instagram",
      published: false,
      featured: false,
      order_index: 0,
    })
    setEditingImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const openEditDialog = (image: SocialImage) => {
    setEditingImage(image)
    setFormData({
      title: image.title,
      description: image.description || "",
      social_handle: image.social_handle,
      platform: image.platform,
      published: image.published,
      featured: image.featured,
      order_index: image.order_index,
    })
    setIsDialogOpen(true)
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="w-4 h-4" />
      case "facebook":
        return <Facebook className="w-4 h-4" />
      case "twitter":
        return <Twitter className="w-4 h-4" />
      default:
        return <Instagram className="w-4 h-4" />
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "instagram":
        return "bg-gradient-to-r from-purple-500 to-pink-500"
      case "facebook":
        return "bg-blue-600"
      case "twitter":
        return "bg-blue-400"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Social Media Image Management</h2>
          <p className="text-gray-600">Manage social media images for the social section</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Social Image
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingImage ? "Edit Social Image" : "Add New Social Image"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {!editingImage && (
                <div>
                  <Label htmlFor="file">Image File</Label>
                  <Input
                    id="file"
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        // Auto-fill title from filename if empty
                        if (!formData.title) {
                          const fileName = file.name.replace(/\.[^/.]+$/, "")
                          setFormData(prev => ({ ...prev, title: fileName }))
                        }
                      }
                    }}
                  />
                </div>
              )}

              <div>
                <Label htmlFor="title">Image Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter image title"
                />
              </div>

              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter image description"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="social_handle">Social Handle</Label>
                <Input
                  id="social_handle"
                  value={formData.social_handle}
                  onChange={(e) => setFormData({ ...formData, social_handle: e.target.value })}
                  placeholder="e.g., @thejoshaltman"
                />
              </div>

              <div>
                <Label htmlFor="platform">Platform</Label>
                <select
                  id="platform"
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value as any })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                  <option value="twitter">Twitter</option>
                  <option value="tiktok">TikTok</option>
                </select>
              </div>

              <div>
                <Label htmlFor="order_index">Display Order</Label>
                <Input
                  id="order_index"
                  type="number"
                  value={formData.order_index}
                  onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                  />
                  <Label htmlFor="published">Published</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                  <Label htmlFor="featured">Featured</Label>
                </div>
              </div>

              <Button 
                onClick={handleSave} 
                className="w-full"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : (editingImage ? "Update Image" : "Add Image")}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Social Images Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media Images ({socialImages.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {socialImages.length === 0 ? (
            <div className="text-center py-12">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No social images yet</h3>
              <p className="text-gray-500 mb-4">Get started by adding your first social media image.</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                Add Your First Image
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {socialImages.map((image) => (
                <div key={image.id} className="border rounded-lg overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src={image.image_url}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className={`${getPlatformColor(image.platform)} text-white`}>
                        {getPlatformIcon(image.platform)}
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="secondary" className="text-xs">
                        {image.social_handle}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg line-clamp-2">{image.title}</h3>
                      <div className="flex space-x-1">
                        {image.published && (
                          <Badge variant="default" className="text-xs">Published</Badge>
                        )}
                        {image.featured && (
                          <Badge variant="outline" className="text-xs">Featured</Badge>
                        )}
                      </div>
                    </div>
                    
                    {image.description && (
                      <p className="text-gray-600 text-sm line-clamp-2">{image.description}</p>
                    )}
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Order: {image.order_index}</span>
                      <span>{new Date(image.created_at).toLocaleDateString("en-US")}</span>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(image)}
                        className="flex-1"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(image.id, image.image_url)}
                        className="flex-1"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
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