"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Plus, Edit, Trash2, Eye, EyeOff, ArrowUp, ArrowDown, Upload, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Neighborhood, fetchNeighborhoods, createNeighborhood, updateNeighborhood, deleteNeighborhood } from "@/lib/neighborhood-utils"
import { uploadImage, deleteImage, validateImageFile } from "@/lib/image-upload-utils"

export function NeighborhoodManager() {
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingNeighborhood, setEditingNeighborhood] = useState<Neighborhood | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image_file: "",
    featured: false,
    display_order: 0
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadNeighborhoods()
  }, [])

  const loadNeighborhoods = async () => {
    try {
      setLoading(true)
      const data = await fetchNeighborhoods()
      setNeighborhoods(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load neighborhoods",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setIsUploading(true)
      
      // Upload image if selected
      let imageUrl = formData.image_file
      if (selectedFile) {
        const uploadedUrl = await uploadImage(selectedFile, 'neighborhoods')
        if (uploadedUrl) {
          imageUrl = uploadedUrl
        } else {
          throw new Error('Failed to upload image')
        }
      }
      
      const submitData = { ...formData, image_file: imageUrl }
      
      if (editingNeighborhood) {
        // Delete old image if new one is uploaded
        if (selectedFile && editingNeighborhood.image_file) {
          await deleteImage(editingNeighborhood.image_file)
        }
        
        await updateNeighborhood(editingNeighborhood.id, submitData)
        toast({
          title: "Success",
          description: "Neighborhood updated successfully"
        })
      } else {
        await createNeighborhood(submitData)
        toast({
          title: "Success",
          description: "Neighborhood created successfully"
        })
      }
      
      setIsDialogOpen(false)
      resetForm()
      loadNeighborhoods()
    } catch (error) {
      console.error('Error saving neighborhood:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save neighborhood",
        variant: "destructive"
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleEdit = (neighborhood: Neighborhood) => {
    setEditingNeighborhood(neighborhood)
    setFormData({
      name: neighborhood.name,
      description: neighborhood.description || "",
      image_file: neighborhood.image_file || "",
      featured: neighborhood.featured,
      display_order: neighborhood.display_order
    })
    setImagePreview(neighborhood.image_file || null)
    setSelectedFile(null)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteNeighborhood(id)
      toast({
        title: "Success",
        description: "Neighborhood deleted successfully"
      })
      loadNeighborhoods()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete neighborhood",
        variant: "destructive"
      })
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      image_file: "",
      featured: false,
      display_order: 0
    })
    setEditingNeighborhood(null)
    setSelectedFile(null)
    setImagePreview(null)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    resetForm()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-[#D4AF37]">Loading neighborhoods...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#D4AF37]">Neighborhoods</h2>
          <p className="text-gray-400">Manage premier neighborhoods</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="bg-[#D4AF37] hover:bg-[#B8941F] text-black"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Neighborhood
            </Button>
          </DialogTrigger>
                     <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
             <DialogHeader>
               <DialogTitle className="text-[#D4AF37]">
                 {editingNeighborhood ? "Edit Neighborhood" : "Add New Neighborhood"}
               </DialogTitle>
               <DialogDescription className="text-gray-400">
                 {editingNeighborhood ? "Update the neighborhood information below." : "Fill in the details to create a new neighborhood."}
               </DialogDescription>
             </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-white">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="display_order" className="text-white">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description" className="text-white">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white min-h-[100px]"
                  placeholder="Describe the neighborhood..."
                />
              </div>
              
              <div>
                <Label htmlFor="image" className="text-white">Image</Label>
                <div className="space-y-3">
                  {/* Image Preview */}
                  {(imagePreview || selectedFile) && (
                    <div className="relative">
                      <img
                        src={selectedFile ? URL.createObjectURL(selectedFile) : imagePreview!}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded border border-gray-600"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFile(null)
                          setImagePreview(null)
                          setFormData({ ...formData, image_file: "" })
                        }}
                        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  
                  {/* File Input */}
                  <div className="flex items-center gap-3">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const validation = validateImageFile(file)
                          if (validation.isValid) {
                            setSelectedFile(file)
                            setImagePreview(null)
                          } else {
                            toast({
                              title: "Invalid Image",
                              description: validation.error,
                              variant: "destructive"
                            })
                          }
                        }
                      }}
                      className="bg-gray-800 border-gray-600 text-white file:bg-[#D4AF37] file:text-black file:border-0 file:rounded file:px-3 file:py-1 file:cursor-pointer"
                    />
                    <div className="text-xs text-gray-400">
                      Max 5MB, JPEG, PNG, WebP
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
                <Label htmlFor="featured" className="text-white">Featured Neighborhood</Label>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDialogClose}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isUploading}
                  className="bg-[#D4AF37] hover:bg-[#B8941F] text-black disabled:opacity-50"
                >
                  {isUploading ? "Saving..." : (editingNeighborhood ? "Update" : "Create")}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Neighborhoods Grid */}
      <div className="grid gap-4">
        {neighborhoods.map((neighborhood) => (
          <Card key={neighborhood.id} className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-white">{neighborhood.name}</h3>
                    {neighborhood.featured && (
                      <Badge className="bg-[#D4AF37] text-black">Featured</Badge>
                    )}
                    <Badge variant="outline" className="text-gray-300">
                      Order: {neighborhood.display_order}
                    </Badge>
                  </div>
                  
                  {neighborhood.description && (
                    <p className="text-gray-300 mb-3 line-clamp-2">{neighborhood.description}</p>
                  )}
                  
                                     {neighborhood.image_file && (
                     <div className="flex items-center gap-2 text-sm text-gray-400">
                       <Eye className="w-4 h-4" />
                       <span>Image uploaded</span>
                     </div>
                   )}
                  
                  <div className="text-sm text-gray-500 mt-2">
                    Created: {new Date(neighborhood.created_at).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(neighborhood)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-600 text-red-400 hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-gray-900 border-gray-700">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">Delete Neighborhood</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-300">
                          Are you sure you want to delete "{neighborhood.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="border-gray-600 text-gray-300 hover:bg-gray-800">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(neighborhood.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {neighborhoods.length === 0 && (
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-8 text-center">
              <p className="text-gray-400">No neighborhoods found. Create your first neighborhood to get started.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
