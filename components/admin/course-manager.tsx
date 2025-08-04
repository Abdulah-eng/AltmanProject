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
import { Plus, Edit, Trash2, BookOpen, Star, Check } from "lucide-react"

interface Course {
  id: string
  title: string
  description: string
  price: number
  duration: string
  level: string
  learning_outcomes: string[]
  image_url: string
  featured: boolean
  order_index: number
  created_at: string
}

export function CourseManager() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    duration: "",
    level: "",
    learning_outcomes: [""],
    featured: false,
    order_index: 0,
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClientClient()

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("order_index", { ascending: true })

      if (error) {
        console.error("Error fetching courses:", error)
        toast.error("Failed to load courses")
        return
      }

      setCourses(data || [])
    } catch (error) {
      console.error("Error fetching courses:", error)
      toast.error("Failed to load courses")
    }
  }

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
  }

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.title.trim()) {
      toast.error("Course title is required")
      return
    }
    if (!formData.description.trim()) {
      toast.error("Course description is required")
      return
    }
    if (formData.price <= 0) {
      toast.error("Course price must be greater than 0")
      return
    }
    if (!formData.duration.trim()) {
      toast.error("Course duration is required")
      return
    }
    if (!formData.level.trim()) {
      toast.error("Course level is required")
      return
    }

    if (!editingCourse && !selectedFile) {
      toast.error("Please select a course image")
      return
    }

    setUploading(true)

    try {
      let imageUrl = editingCourse?.image_url || ""

      // Upload new image if provided
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random()}.${fileExt}`
        const filePath = `courses/${fileName}`

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

      const courseData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: formData.price,
        duration: formData.duration.trim(),
        level: formData.level.trim(),
        learning_outcomes: formData.learning_outcomes.filter(outcome => outcome.trim() !== ""),
        image_url: imageUrl,
        featured: formData.featured,
        order_index: formData.order_index,
      }

      if (editingCourse) {
        // Update existing course
        const { error: updateError } = await supabase
          .from("courses")
          .update(courseData)
          .eq("id", editingCourse.id)

        if (updateError) {
          console.error("Update error:", updateError)
          toast.error("Failed to update course")
        } else {
          toast.success("Course updated successfully")
          setIsDialogOpen(false)
          resetForm()
          fetchCourses()
        }
      } else {
        // Add new course
        const { error: insertError } = await supabase.from("courses").insert(courseData)

        if (insertError) {
          console.error("Insert error:", insertError)
          toast.error("Failed to save course")
        } else {
          toast.success("Course added successfully")
          setIsDialogOpen(false)
          resetForm()
          fetchCourses()
        }
      }
    } catch (error) {
      console.error("Submit error:", error)
      toast.error("An error occurred")
    }

    setUploading(false)
  }

  const handleDelete = async (id: string, imageUrl?: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return

    try {
      // Delete from database first
      const { error: deleteError } = await supabase.from("courses").delete().eq("id", id)

      if (deleteError) {
        console.error("Delete error:", deleteError)
        toast.error("Failed to delete course")
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

      toast.success("Course deleted successfully")
      fetchCourses()
    } catch (error) {
      console.error("Delete error:", error)
      toast.error("Failed to delete course")
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: 0,
      duration: "",
      level: "",
      learning_outcomes: [""],
      featured: false,
      order_index: 0,
    })
    setSelectedFile(null)
    setEditingCourse(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const openEditDialog = (course: Course) => {
    setEditingCourse(course)
    setFormData({
      title: course.title,
      description: course.description,
      price: course.price,
      duration: course.duration,
      level: course.level,
      learning_outcomes: course.learning_outcomes.length > 0 ? course.learning_outcomes : [""],
      featured: course.featured,
      order_index: course.order_index,
    })
    setSelectedFile(null)
    setIsDialogOpen(true)
  }

  const addLearningOutcome = () => {
    setFormData({
      ...formData,
      learning_outcomes: [...formData.learning_outcomes, ""]
    })
  }

  const removeLearningOutcome = (index: number) => {
    const newOutcomes = formData.learning_outcomes.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      learning_outcomes: newOutcomes.length > 0 ? newOutcomes : [""]
    })
  }

  const updateLearningOutcome = (index: number, value: string) => {
    const newOutcomes = [...formData.learning_outcomes]
    newOutcomes[index] = value
    setFormData({
      ...formData,
      learning_outcomes: newOutcomes
    })
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
          <h2 className="text-2xl font-bold">Course Management</h2>
          <p className="text-gray-600">Manage training courses for the training page</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingCourse ? "Edit Course" : "Add New Course"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {!editingCourse && (
                <div>
                  <Label htmlFor="image">Course Image *</Label>
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
                  <p className="text-sm text-gray-500 mt-1">Required for new courses</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Course Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Real Estate Mastery Course"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price (USD) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                    placeholder="2997"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter course description..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duration *</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g., 8 Weeks"
                  />
                </div>
                <div>
                  <Label htmlFor="level">Skill Level *</Label>
                  <Input
                    id="level"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    placeholder="e.g., Beginner to Advanced"
                  />
                </div>
              </div>

              <div>
                <Label>Learning Outcomes</Label>
                <div className="space-y-2">
                  {formData.learning_outcomes.map((outcome, index) => (
                    <div key={index} className="flex space-x-2">
                      <Input
                        value={outcome}
                        onChange={(e) => updateLearningOutcome(index, e.target.value)}
                        placeholder={`Learning outcome ${index + 1}`}
                      />
                      {formData.learning_outcomes.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeLearningOutcome(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addLearningOutcome}
                    className="mt-2"
                  >
                    Add Learning Outcome
                  </Button>
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
                  <Label htmlFor="featured">Featured Course</Label>
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
                      {editingCourse ? "Updating..." : "Adding..."}
                    </>
                  ) : (
                    <>
                      {editingCourse ? "Update Course" : "Add Course"}
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
          <CardTitle>All Courses ({courses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {courses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
              <p className="text-gray-500 mb-4">Get started by adding your first course.</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Course
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="border rounded-lg overflow-hidden">
                  <div className="relative">
                    {course.image_url ? (
                      <img
                        src={course.image_url}
                        alt={course.title}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                    
                    <div className="absolute top-2 left-2 flex space-x-2">
                      {course.featured && (
                        <Badge variant="secondary" className="bg-[#D4AF37] text-black">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        Order: {course.order_index}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{course.title}</h3>
                    
                    <div className="text-sm text-gray-600 mb-3">
                      <div className="font-medium text-[#D4AF37] text-lg">{formatPrice(course.price)}</div>
                      <div className="flex items-center justify-between text-gray-500">
                        <span>{course.duration}</span>
                        <span>{course.level}</span>
                      </div>
                    </div>

                    {course.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>
                    )}

                    {course.learning_outcomes.length > 0 && (
                      <div className="mb-3">
                        <div className="text-sm font-medium text-gray-700 mb-1">Learning Outcomes:</div>
                        <div className="space-y-1">
                          {course.learning_outcomes.slice(0, 3).map((outcome, index) => (
                            <div key={index} className="flex items-center text-xs text-gray-600">
                              <Check className="w-3 h-3 text-[#D4AF37] mr-1" />
                              <span className="line-clamp-1">{outcome}</span>
                            </div>
                          ))}
                          {course.learning_outcomes.length > 3 && (
                            <div className="text-xs text-gray-500">
                              +{course.learning_outcomes.length - 3} more...
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(course)}
                        className="flex-1"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(course.id, course.image_url)}
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