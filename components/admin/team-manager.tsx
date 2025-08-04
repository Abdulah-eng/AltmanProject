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
import { Plus, Edit, Trash2, User, Users, Star } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  title: string
  bio: string
  image_url: string
  email: string
  phone: string
  linkedin_url: string
  instagram_url: string
  twitter_url: string
  featured: boolean
  order_index: number
  created_at: string
}

export function TeamManager() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    email: "",
    phone: "",
    linkedin_url: "",
    instagram_url: "",
    twitter_url: "",
    featured: false,
    order_index: 0,
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClientClient()

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("order_index", { ascending: true })

      if (error) {
        console.error("Error fetching team members:", error)
        toast.error("Failed to load team members")
        return
      }

      setTeamMembers(data || [])
    } catch (error) {
      console.error("Error fetching team members:", error)
      toast.error("Failed to load team members")
    }
  }

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
  }

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.name.trim()) {
      toast.error("Team member name is required")
      return
    }
    if (!formData.title.trim()) {
      toast.error("Team member title is required")
      return
    }

    if (!editingMember && !selectedFile) {
      toast.error("Please select a team member photo")
      return
    }

    setUploading(true)

    try {
      let imageUrl = editingMember?.image_url || ""

      // Upload new image if provided
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random()}.${fileExt}`
        const filePath = `team/${fileName}`

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

      const memberData = {
        name: formData.name.trim(),
        title: formData.title.trim(),
        bio: formData.bio.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        linkedin_url: formData.linkedin_url.trim(),
        instagram_url: formData.instagram_url.trim(),
        twitter_url: formData.twitter_url.trim(),
        image_url: imageUrl,
        featured: formData.featured,
        order_index: formData.order_index,
      }

      if (editingMember) {
        // Update existing team member
        const { error: updateError } = await supabase
          .from("team_members")
          .update(memberData)
          .eq("id", editingMember.id)

        if (updateError) {
          console.error("Update error:", updateError)
          toast.error("Failed to update team member")
        } else {
          toast.success("Team member updated successfully")
          setIsDialogOpen(false)
          resetForm()
          fetchTeamMembers()
        }
      } else {
        // Add new team member
        const { error: insertError } = await supabase.from("team_members").insert(memberData)

        if (insertError) {
          console.error("Insert error:", insertError)
          toast.error("Failed to save team member")
        } else {
          toast.success("Team member added successfully")
          setIsDialogOpen(false)
          resetForm()
          fetchTeamMembers()
        }
      }
    } catch (error) {
      console.error("Submit error:", error)
      toast.error("An error occurred")
    }

    setUploading(false)
  }

  const handleDelete = async (id: string, imageUrl?: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return

    try {
      // Delete from database first
      const { error: deleteError } = await supabase.from("team_members").delete().eq("id", id)

      if (deleteError) {
        console.error("Delete error:", deleteError)
        toast.error("Failed to delete team member")
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

      toast.success("Team member deleted successfully")
      fetchTeamMembers()
    } catch (error) {
      console.error("Delete error:", error)
      toast.error("Failed to delete team member")
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      title: "",
      bio: "",
      email: "",
      phone: "",
      linkedin_url: "",
      instagram_url: "",
      twitter_url: "",
      featured: false,
      order_index: 0,
    })
    setSelectedFile(null)
    setEditingMember(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const openEditDialog = (member: TeamMember) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      title: member.title,
      bio: member.bio,
      email: member.email,
      phone: member.phone,
      linkedin_url: member.linkedin_url,
      instagram_url: member.instagram_url,
      twitter_url: member.twitter_url,
      featured: member.featured,
      order_index: member.order_index,
    })
    setSelectedFile(null)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Team Management</h2>
          <p className="text-gray-600">Manage team members for the about page</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingMember ? "Edit Team Member" : "Add New Team Member"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {!editingMember && (
                <div>
                  <Label htmlFor="image">Team Member Photo *</Label>
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
                  <p className="text-sm text-gray-500 mt-1">Required for new team members</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Josh Altman"
                  />
                </div>
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Co-Founder & Senior Agent"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Enter team member bio..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="josh@altmanbrothers.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="310.819.3250"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                  <Input
                    id="linkedin_url"
                    value={formData.linkedin_url}
                    onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                    placeholder="https://linkedin.com/in/joshaltman"
                  />
                </div>
                <div>
                  <Label htmlFor="instagram_url">Instagram URL</Label>
                  <Input
                    id="instagram_url"
                    value={formData.instagram_url}
                    onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                    placeholder="https://instagram.com/joshaltman"
                  />
                </div>
                <div>
                  <Label htmlFor="twitter_url">Twitter URL</Label>
                  <Input
                    id="twitter_url"
                    value={formData.twitter_url}
                    onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
                    placeholder="https://twitter.com/joshaltman"
                  />
                </div>
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
                  <Label htmlFor="featured">Featured Team Member</Label>
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
                      {editingMember ? "Updating..." : "Adding..."}
                    </>
                  ) : (
                    <>
                      {editingMember ? "Update Team Member" : "Add Team Member"}
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
          <CardTitle>All Team Members ({teamMembers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {teamMembers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No team members yet</h3>
              <p className="text-gray-500 mb-4">Get started by adding your first team member.</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Team Member
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <div key={member.id} className="border rounded-lg p-4 space-y-3">
                  <div className="aspect-square bg-gray-100 rounded-full overflow-hidden mx-auto w-32 h-32">
                    {member.image_url ? (
                      <img
                        src={member.image_url}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <User className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center">
                      <h3 className="font-medium text-lg">{member.name}</h3>
                      {member.featured && (
                        <Star className="w-4 h-4 text-[#D4AF37] ml-2" />
                      )}
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <div className="font-medium">{member.title}</div>
                      {member.bio && (
                        <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {member.bio}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        Order: {member.order_index}
                      </Badge>
                      {member.featured && (
                        <Badge variant="secondary" className="text-xs">
                          Featured
                        </Badge>
                      )}
                    </div>

                    {(member.email || member.phone) && (
                      <div className="text-xs text-gray-500">
                        {member.email && <div>{member.email}</div>}
                        {member.phone && <div>{member.phone}</div>}
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2 justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(member)}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(member.id, member.image_url)}
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