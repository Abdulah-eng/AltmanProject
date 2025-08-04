"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Star, Upload, User } from "lucide-react"
import { toast } from "sonner"
import { 
  getAllClientExperiences, 
  createClientExperience, 
  updateClientExperience, 
  deleteClientExperience,
  type ClientExperience 
} from "@/lib/client-experiences-utils"
import { createClientClient } from "@/lib/supabase/client"

export function ClientExperiencesManager() {
  const [clientExperiences, setClientExperiences] = useState<ClientExperience[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingExperience, setEditingExperience] = useState<ClientExperience | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  const [formData, setFormData] = useState({
    client_name: "",
    client_role: "",
    client_location: "",
    testimonial: "",
    rating: 5,
    image_url: "",
    featured: false,
    order_index: 0,
    published: true
  })

  useEffect(() => {
    fetchClientExperiences()
  }, [])

  const fetchClientExperiences = async () => {
    try {
      setLoading(true)
      const experiences = await getAllClientExperiences()
      setClientExperiences(experiences)
    } catch (error) {
      console.error('Error fetching client experiences:', error)
      toast.error('Failed to fetch client experiences')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (file: File) => {
    try {
      setUploadingImage(true)
      const supabase = createClientClient()
      
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `client-experiences/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('website-images')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data: { publicUrl } } = supabase.storage
        .from('website-images')
        .getPublicUrl(filePath)

      setFormData(prev => ({ ...prev, image_url: publicUrl }))
      toast.success('Image uploaded successfully')
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error('Failed to upload image')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingExperience) {
        await updateClientExperience(editingExperience.id, formData)
        toast.success('Client experience updated successfully')
      } else {
        await createClientExperience(formData)
        toast.success('Client experience created successfully')
      }
      
      setIsDialogOpen(false)
      resetForm()
      fetchClientExperiences()
    } catch (error) {
      console.error('Error saving client experience:', error)
      toast.error('Failed to save client experience')
    }
  }

  const handleEdit = (experience: ClientExperience) => {
    setEditingExperience(experience)
    setFormData({
      client_name: experience.client_name,
      client_role: experience.client_role,
      client_location: experience.client_location || "",
      testimonial: experience.testimonial,
      rating: experience.rating,
      image_url: experience.image_url || "",
      featured: experience.featured,
      order_index: experience.order_index,
      published: experience.published
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this client experience?')) {
      return
    }

    try {
      await deleteClientExperience(id)
      toast.success('Client experience deleted successfully')
      fetchClientExperiences()
    } catch (error) {
      console.error('Error deleting client experience:', error)
      toast.error('Failed to delete client experience')
    }
  }

  const resetForm = () => {
    setFormData({
      client_name: "",
      client_role: "",
      client_location: "",
      testimonial: "",
      rating: 5,
      image_url: "",
      featured: false,
      order_index: 0,
      published: true
    })
    setEditingExperience(null)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Client Experiences</h2>
          <div className="h-10 w-32 bg-gray-200 animate-pulse rounded"></div>
        </div>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-200 animate-pulse rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Client Experiences</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingExperience ? 'Edit Client Experience' : 'Add New Client Experience'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client_name">Client Name *</Label>
                  <Input
                    id="client_name"
                    value={formData.client_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="client_role">Client Role *</Label>
                  <Input
                    id="client_role"
                    value={formData.client_role}
                    onChange={(e) => setFormData(prev => ({ ...prev, client_role: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="client_location">Location</Label>
                <Input
                  id="client_location"
                  value={formData.client_location}
                  onChange={(e) => setFormData(prev => ({ ...prev, client_location: e.target.value }))}
                  placeholder="e.g., Beverly Hills, CA"
                />
              </div>

              <div>
                <Label htmlFor="testimonial">Testimonial *</Label>
                <Textarea
                  id="testimonial"
                  value={formData.testimonial}
                  onChange={(e) => setFormData(prev => ({ ...prev, testimonial: e.target.value }))}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Button
                        key={rating}
                        type="button"
                        variant={formData.rating >= rating ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFormData(prev => ({ ...prev, rating }))}
                      >
                        {rating}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="order_index">Display Order</Label>
                  <Input
                    id="order_index"
                    type="number"
                    value={formData.order_index}
                    onChange={(e) => setFormData(prev => ({ ...prev, order_index: parseInt(e.target.value) || 0 }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="image">Client Photo</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleImageUpload(file)
                    }}
                    disabled={uploadingImage}
                  />
                  {uploadingImage && <div className="text-sm text-gray-500">Uploading...</div>}
                </div>
                {formData.image_url && (
                  <div className="mt-2">
                    <img src={formData.image_url} alt="Preview" className="w-20 h-20 object-cover rounded" />
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                  />
                  <Label htmlFor="featured">Featured</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
                  />
                  <Label htmlFor="published">Published</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingExperience ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Client Experiences ({clientExperiences.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientExperiences.map((experience) => (
                <TableRow key={experience.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {experience.image_url ? (
                        <img 
                          src={experience.image_url} 
                          alt={experience.client_name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 text-gray-400" />
                      )}
                      <div>
                        <div className="font-medium">{experience.client_name}</div>
                        <div className="text-sm text-gray-500">{experience.client_location}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{experience.client_role}</TableCell>
                  <TableCell>
                    <div className="flex">
                      {renderStars(experience.rating)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      {experience.featured && <Badge variant="default">Featured</Badge>}
                      {experience.published ? (
                        <Badge variant="secondary">Published</Badge>
                      ) : (
                        <Badge variant="outline">Draft</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{experience.order_index}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(experience)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(experience.id)}
                      >
                        <Trash2 className="w-4 h-4" />
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