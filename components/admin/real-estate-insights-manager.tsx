"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { RealEstateInsight, createInsight, updateInsight, deleteInsight, getAllInsights, getInsightCategories } from "@/lib/real-estate-insights-utils"
import { uploadImage, deleteImage, validateImageFile } from "@/lib/image-upload-utils"
import { Edit, Trash2, Plus, Eye, EyeOff, Upload, X } from "lucide-react"
import Image from "next/image"

export function RealEstateInsightsManager() {
  const [insights, setInsights] = useState<RealEstateInsight[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingInsight, setEditingInsight] = useState<RealEstateInsight | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    summary: "",
    category: "",
    author: "",
    featured: false,
    published: true,
    display_order: 0
  })
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchInsights()
    fetchCategories()
  }, [])

  const fetchInsights = async () => {
    try {
      setLoading(true)
      const data = await getAllInsights()
      setInsights(data)
    } catch (error) {
      console.error('Error fetching insights:', error)
      toast({
        title: "Error",
        description: "Failed to fetch insights",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const data = await getInsightCategories()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      summary: "",
      category: "",
      author: "",
      featured: false,
      published: true,
      display_order: 0
    })
    setSelectedImage(null)
    setImagePreview(null)
    setEditingInsight(null)
  }

  const handleImageSelect = (file: File) => {
    if (validateImageFile(file)) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.content || !formData.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    try {
      setUploading(true)
      let imageFile = editingInsight?.image_file || ""

      // Handle image upload if a new image is selected
      if (selectedImage) {
        // Delete old image if editing
        if (editingInsight?.image_file) {
          await deleteImage(editingInsight.image_file)
        }
        
        // Upload new image
        const uploadedPath = await uploadImage(selectedImage, "insights")
        if (uploadedPath) {
          imageFile = uploadedPath
        }
      }

      const insightData = {
        ...formData,
        image_file: imageFile
      }

      let result
      if (editingInsight) {
        result = await updateInsight({
          id: editingInsight.id,
          ...insightData
        })
      } else {
        result = await createInsight(insightData)
      }

      if (result) {
        toast({
          title: "Success",
          description: editingInsight ? "Insight updated successfully" : "Insight created successfully"
        })
        setIsDialogOpen(false)
        resetForm()
        fetchInsights()
      } else {
        throw new Error("Failed to save insight")
      }
    } catch (error) {
      console.error('Error saving insight:', error)
      toast({
        title: "Error",
        description: editingInsight ? "Failed to update insight" : "Failed to create insight",
        variant: "destructive"
      })
    } finally {
      setUploading(false)
    }
  }

  const handleEdit = (insight: RealEstateInsight) => {
    setEditingInsight(insight)
    setFormData({
      title: insight.title,
      content: insight.content,
      summary: insight.summary || "",
      category: insight.category,
      author: insight.author || "",
      featured: insight.featured,
      published: insight.published,
      display_order: insight.display_order
    })
    setImagePreview(insight.image_file ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${insight.image_file}` : null)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      const success = await deleteInsight(id)
      if (success) {
        toast({
          title: "Success",
          description: "Insight deleted successfully"
        })
        fetchInsights()
      } else {
        throw new Error("Failed to delete insight")
      }
    } catch (error) {
      console.error('Error deleting insight:', error)
      toast({
        title: "Error",
        description: "Failed to delete insight",
        variant: "destructive"
      })
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    if (editingInsight?.image_file) {
      setEditingInsight({ ...editingInsight, image_file: undefined })
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Real Estate Insights Manager</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">Loading...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Real Estate Insights Manager</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Insight
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingInsight ? "Edit Insight" : "Add New Insight"}
              </DialogTitle>
              <DialogDescription>
                {editingInsight ? "Update the insight information below." : "Fill in the insight information below."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter insight title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary">Summary</Label>
                <Textarea
                  id="summary"
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Enter a brief summary"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Enter the full content"
                  rows={8}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Enter author name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Enter new category"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Image</Label>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleImageSelect(e.target.files[0])}
                      className="cursor-pointer"
                    />
                  </div>
                  {(selectedImage || imagePreview) && (
                    <Button type="button" variant="outline" onClick={removeImage}>
                      <X className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  )}
                </div>
                {imagePreview && (
                  <div className="relative w-32 h-32 border rounded-lg overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                  <Label htmlFor="featured">Featured</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                  />
                  <Label htmlFor="published">Published</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={uploading}>
                  {uploading ? "Saving..." : editingInsight ? "Update Insight" : "Create Insight"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No insights found. Create your first insight to get started.
            </div>
          ) : (
            insights.map((insight) => (
              <div key={insight.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold">{insight.title}</h3>
                    {insight.featured && <Badge variant="secondary">Featured</Badge>}
                    {insight.published ? (
                      <Badge className="bg-green-100 text-green-800">Published</Badge>
                    ) : (
                      <Badge variant="outline">Draft</Badge>
                    )}
                    <Badge variant="outline">{insight.category}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{insight.summary || insight.content.substring(0, 150)}...</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>Order: {insight.display_order}</span>
                    {insight.author && <span>By: {insight.author}</span>}
                    <span>{new Date(insight.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(insight)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the insight.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(insight.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
