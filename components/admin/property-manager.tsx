"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { createClientClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Plus, Edit, Trash2, Building, MapPin, Home } from "lucide-react"

interface Property {
  id: string
  title: string
  address: string
  city: string
  state: string
  zip_code: string
  price: number
  bedrooms: number
  bathrooms: number
  square_feet: number
  property_type: string
  status: string
  description: string
  image_url: string
  featured: boolean
  created_at: string
}

export function PropertyManager() {
  const [properties, setProperties] = useState<Property[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    square_feet: "",
    property_type: "",
    status: "",
    description: "",
    featured: false,
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClientClient()

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching properties:", error)
        toast.error("Failed to load properties")
        return
      }

      setProperties(data || [])
    } catch (error) {
      console.error("Error fetching properties:", error)
      toast.error("Failed to load properties")
    }
  }

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
  }

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.title.trim()) {
      toast.error("Property title is required")
      return
    }
    if (!formData.address.trim()) {
      toast.error("Property address is required")
      return
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast.error("Valid price is required")
      return
    }
    if (!formData.property_type) {
      toast.error("Property type is required")
      return
    }
    if (!formData.status) {
      toast.error("Property status is required")
      return
    }

    if (!editingProperty && !selectedFile) {
      toast.error("Please select a property image")
      return
    }

    setUploading(true)

    try {
      let imageUrl = editingProperty?.image_url || ""

      // Upload new image if provided
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random()}.${fileExt}`
        const filePath = `properties/${fileName}`

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

      const propertyData = {
        title: formData.title.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        zip_code: formData.zip_code.trim(),
        price: parseFloat(formData.price),
        bedrooms: parseInt(formData.bedrooms) || 0,
        bathrooms: parseInt(formData.bathrooms) || 0,
        square_feet: parseInt(formData.square_feet) || 0,
        property_type: formData.property_type,
        status: formData.status,
        description: formData.description.trim(),
        image_url: imageUrl,
        featured: formData.featured,
      }

      if (editingProperty) {
        // Update existing property
        const { error: updateError } = await supabase
          .from("properties")
          .update(propertyData)
          .eq("id", editingProperty.id)

        if (updateError) {
          console.error("Update error:", updateError)
          toast.error("Failed to update property")
        } else {
          toast.success("Property updated successfully")
          setIsDialogOpen(false)
          resetForm()
          fetchProperties()
        }
      } else {
        // Add new property
        const { error: insertError } = await supabase.from("properties").insert(propertyData)

        if (insertError) {
          console.error("Insert error:", insertError)
          toast.error("Failed to save property")
        } else {
          toast.success("Property added successfully")
          setIsDialogOpen(false)
          resetForm()
          fetchProperties()
        }
      }
    } catch (error) {
      console.error("Submit error:", error)
      toast.error("An error occurred")
    }

    setUploading(false)
  }

  const handleDelete = async (id: string, imageUrl?: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return

    try {
      // Delete from database first
      const { error: deleteError } = await supabase.from("properties").delete().eq("id", id)

      if (deleteError) {
        console.error("Delete error:", deleteError)
        toast.error("Failed to delete property")
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
            // Don't show error to user since property was deleted successfully
          }
        } catch (storageError) {
          console.warn("Error deleting image:", storageError)
          // Don't show error to user since property was deleted successfully
        }
      }

      toast.success("Property deleted successfully")
      fetchProperties()
    } catch (error) {
      console.error("Delete error:", error)
      toast.error("Failed to delete property")
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      address: "",
      city: "",
      state: "",
      zip_code: "",
      price: "",
      bedrooms: "",
      bathrooms: "",
      square_feet: "",
      property_type: "",
      status: "",
      description: "",
      featured: false,
    })
    setSelectedFile(null)
    setEditingProperty(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const openEditDialog = (property: Property) => {
    setEditingProperty(property)
    setFormData({
      title: property.title,
      address: property.address,
      city: property.city,
      state: property.state,
      zip_code: property.zip_code,
      price: property.price.toString(),
      bedrooms: property.bedrooms.toString(),
      bathrooms: property.bathrooms.toString(),
      square_feet: property.square_feet.toString(),
      property_type: property.property_type,
      status: property.status,
      description: property.description,
      featured: property.featured,
    })
    setSelectedFile(null)
    setIsDialogOpen(true)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Property Management</h2>
          <p className="text-gray-600">Manage property listings for the carousel</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Property
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProperty ? "Edit Property" : "Add New Property"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {!editingProperty && (
                <div>
                  <Label htmlFor="image">Property Image *</Label>
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
                  <p className="text-sm text-gray-500 mt-1">Required for new properties</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Property Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Luxury Estate in Hidden Hills"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="16495000"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="24341 ROLLING VIEW RD"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="HIDDEN HILLS"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="CA"
                  />
                </div>
                <div>
                  <Label htmlFor="zip_code">ZIP Code</Label>
                  <Input
                    id="zip_code"
                    value={formData.zip_code}
                    onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })}
                    placeholder="91302"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    placeholder="5"
                  />
                </div>
                <div>
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    placeholder="7"
                  />
                </div>
                <div>
                  <Label htmlFor="square_feet">Square Feet</Label>
                  <Input
                    id="square_feet"
                    type="number"
                    value={formData.square_feet}
                    onChange={(e) => setFormData({ ...formData, square_feet: e.target.value })}
                    placeholder="5980"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="property_type">Property Type *</Label>
                  <Select
                    value={formData.property_type}
                    onValueChange={(value) => setFormData({ ...formData, property_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single_family">Single Family</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="luxury">Luxury Estate</SelectItem>
                      <SelectItem value="investment">Investment Property</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="for_sale">For Sale</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="coming_soon">Coming Soon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter property description..."
                  rows={4}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="featured">Featured Property (will appear in carousel)</Label>
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
                      {editingProperty ? "Updating..." : "Adding..."}
                    </>
                  ) : (
                    <>
                      {editingProperty ? "Update Property" : "Add Property"}
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
          <CardTitle>All Properties ({properties.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {properties.length === 0 ? (
            <div className="text-center py-12">
              <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No properties yet</h3>
              <p className="text-gray-500 mb-4">Get started by adding your first property listing.</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Property
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div key={property.id} className="border rounded-lg p-4 space-y-3">
                  <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                    {property.image_url ? (
                      <img
                        src={property.image_url}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Building className="w-8 h-8" />
                        <span className="ml-2">No image</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm">{property.title}</h3>
                      {property.featured && (
                        <Badge variant="secondary" className="text-xs">
                          Featured
                        </Badge>
                      )}
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {property.address}
                      </div>
                      <div className="text-xs text-gray-500">
                        {property.city}, {property.state} {property.zip_code}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <div className="flex items-center">
                          <Home className="w-3 h-3 mr-1" />
                          {property.bedrooms} BD | {property.bathrooms} BA | {property.square_feet.toLocaleString()} SQFT
                        </div>
                      </div>
                      <div className="text-lg font-bold text-[#D4AF37]">
                        {formatPrice(property.price)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {property.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {property.property_type.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(property)}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(property.id, property.image_url)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
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