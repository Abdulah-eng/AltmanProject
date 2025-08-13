"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClientClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Plus, Upload, Edit, Trash2, Copy, Eye, Home, User, Phone, Building, FileText, Video, Settings } from "lucide-react"

interface Image {
  id: string
  name: string
  url: string
  alt_text: string
  category: string
  section: string
  image_key: string
  created_at: string
}

// Predefined image keys for main pages
const IMAGE_KEYS = {
  home: {
    hero_image: "Home Page Hero Image",
    about_section_image: "Home About Section Image",
    services_section_image: "Home Services Section Image",
    team_section_image: "Home Team Section Image",
    stats_section_image: "Home Stats Section Image",
    contact_section_image: "Home Contact Section Image",
  },
  about: {
    hero_image: "About Page Hero Image",
    team_image: "About Team Image",
    office_image: "About Office Image",
    process_image: "About Process Image",
  },
  contact: {
    hero_image: "Contact Page Hero Image",
    background_image: "Contact Background Image",
    office_image: "Contact Office Image",
  },
  properties: {
    hero_image: "Properties Page Hero Image",
    listing_image: "Properties Listing Image",
    search_image: "Properties Search Image",
    map_image: "Properties Map Image",
  },
  services: {
    hero_image: "Services Page Hero Image",
    buying_image: "Services Buying Image",
    selling_image: "Services Selling Image",
    investment_image: "Services Investment Image",
  },
  blog: {
    hero_image: "Blog Page Hero Image",
    default_image: "Blog Default Image",
  },
  training: {
    hero_image: "Training Page Hero Image",
  }
}

export function ImageManager() {
  const [images, setImages] = useState<Image[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingImage, setEditingImage] = useState<Image | null>(null)
  const [uploading, setUploading] = useState(false)
  const [activeTab, setActiveTab] = useState("home")
  const [formData, setFormData] = useState({
    name: "",
    alt_text: "",
    category: "",
    section: "",
    image_key: "",
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClientClient()

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    const { data, error } = await supabase.from("images").select("*").order("created_at", { ascending: false })

    if (data) {
      setImages(data)
    }
  }

  const handleFileUpload = async (file: File) => {
    if (!file) return

    setUploading(true)
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `images/${fileName}`

    const { error: uploadError } = await supabase.storage.from('website-images').upload(filePath, file)

    if (uploadError) {
      toast.error("Failed to upload image")
      setUploading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage.from('website-images').getPublicUrl(filePath)

    const imageData = {
      name: formData.name || file.name,
      url: publicUrl,
      alt_text: formData.alt_text,
      category: formData.category,
      section: formData.section,
      image_key: formData.image_key,
    }

    const { error: insertError } = await supabase.from("images").insert(imageData)

    if (insertError) {
      toast.error("Failed to save image data")
    } else {
      toast.success("Image uploaded successfully")
      setIsDialogOpen(false)
      resetForm()
      fetchImages()
    }

    setUploading(false)
  }

  const handleDelete = async (id: string, url: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return

    // Extract file path from URL
    const urlParts = url.split('/')
    const filePath = urlParts.slice(-2).join('/')

    // Delete from storage
    const { error: storageError } = await supabase.storage.from('website-images').remove([filePath])

    if (storageError) {
      console.error("Failed to delete from storage:", storageError)
    }

    // Delete from database
    const { error } = await supabase.from("images").delete().eq("id", id)

    if (error) {
      toast.error("Failed to delete image")
    } else {
      toast.success("Image deleted successfully")
      fetchImages()
    }
  }

  const copyImageUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    toast.success("Image URL copied to clipboard")
  }

  const resetForm = () => {
    setFormData({
      name: "",
      alt_text: "",
      category: "",
      section: "",
      image_key: "",
    })
    setEditingImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const openEditDialog = (image: Image) => {
    setEditingImage(image)
    setFormData({
      name: image.name,
      alt_text: image.alt_text,
      category: image.category,
      section: image.section,
      image_key: image.image_key || "",
    })
    setIsDialogOpen(true)
  }

  const handleUpdate = async () => {
    if (!editingImage) return

    const { error } = await supabase
      .from("images")
      .update(formData)
      .eq("id", editingImage.id)

    if (error) {
      toast.error("Failed to update image")
    } else {
      toast.success("Image updated successfully")
      setIsDialogOpen(false)
      resetForm()
      fetchImages()
    }
  }

  const getImagesBySection = (section: string) => {
    return images.filter(img => img.section === section)
  }

  const getImageByKey = (key: string) => {
    return images.find(img => img.image_key === key)
  }

  const getTabIcon = (section: string) => {
    switch (section) {
      case "home": return <Home className="w-4 h-4" />
      case "about": return <User className="w-4 h-4" />
      case "contact": return <Phone className="w-4 h-4" />
      case "properties": return <Building className="w-4 h-4" />
      case "services": return <Settings className="w-4 h-4" />
      case "blog": return <FileText className="w-4 h-4" />
      case "training": return <User className="w-4 h-4" />
      default: return <Eye className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Page Image Management</h2>
          <p className="text-gray-600">Manage main images for all website pages</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Upload Image
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingImage ? "Edit Image" : "Upload New Image"}</DialogTitle>
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
                      if (file) handleFileUpload(file)
                    }}
                  />
                </div>
              )}

              <div>
                <Label htmlFor="section">Page Section</Label>
                <Select
                  value={formData.section}
                  onValueChange={(value) => setFormData({ ...formData, section: value, image_key: "" })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select page section" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(IMAGE_KEYS).map((section) => (
                      <SelectItem key={section} value={section}>
                        {section.charAt(0).toUpperCase() + section.slice(1)} Page
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {formData.section && (
                <div>
                  <Label htmlFor="image_key">Image Key</Label>
                  <Select
                    value={formData.image_key}
                    onValueChange={(value) => setFormData({ ...formData, image_key: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select image key" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(IMAGE_KEYS[formData.section as keyof typeof IMAGE_KEYS] || {}).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label htmlFor="name">Image Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Descriptive name for the image"
                />
              </div>

              <div>
                <Label htmlFor="alt_text">Alt Text</Label>
                <Input
                  id="alt_text"
                  value={formData.alt_text}
                  onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                  placeholder="Description for accessibility"
                />
              </div>

              <div>
                <Label htmlFor="category">Category (Optional)</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., hero, background, content"
                />
              </div>

              {editingImage ? (
                <Button onClick={handleUpdate} className="w-full">
                  Update Image
                </Button>
              ) : (
                <div className="text-sm text-gray-500">
                  Select a page section and image key, then choose an image file to upload.
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-8">
          {Object.keys(IMAGE_KEYS).map((section) => (
            <TabsTrigger key={section} value={section} className="flex items-center gap-2">
              {getTabIcon(section)}
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(IMAGE_KEYS).map(([section, keys]) => (
          <TabsContent key={section} value={section}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getTabIcon(section)}
                  {section.charAt(0).toUpperCase() + section.slice(1)} Page Images
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(keys).map(([key, label]) => {
                    const image = getImageByKey(key)
                    return (
                      <div key={key} className="border rounded-lg p-4 space-y-3">
                        <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                          {image ? (
                            <img
                              src={image.url}
                              alt={image.alt_text}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <Upload className="w-8 h-8" />
                              <span className="ml-2">No image</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="font-medium text-sm">{label}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {key}
                          </Badge>
                          {image && (
                            <Badge variant="outline" className="text-xs">
                              {image.category}
                            </Badge>
                          )}
                        </div>

                        <div className="flex space-x-2">
                          {image && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyImageUrl(image.url)}
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditDialog(image)}
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDelete(image.id, image.url)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </>
                          )}
                          {!image && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setFormData({
                                  name: label,
                                  alt_text: label,
                                  category: "",
                                  section: section,
                                  image_key: key,
                                })
                                setIsDialogOpen(true)
                              }}
                            >
                              <Plus className="w-3 h-3 mr-1" />
                              Add
                            </Button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* All Images Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Images</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {images.map((image) => (
                <TableRow key={image.id}>
                  <TableCell>
                    <div className="w-16 h-12 bg-gray-100 rounded overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.alt_text}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>{image.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {image.image_key || "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {image.section}
                    </Badge>
                  </TableCell>
                  <TableCell>{image.category || "N/A"}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyImageUrl(image.url)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(image)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(image.id, image.url)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 