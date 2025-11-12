"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { createClientClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Plus, Edit, Trash2, Play, Star, Video as VideoIcon } from "lucide-react"
import { extractYouTubeVideoId, getYouTubeThumbnail, Video } from "@/lib/video-utils"

export function VideoManager() {
  const [videos, setVideos] = useState<Video[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingVideo, setEditingVideo] = useState<Video | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    youtube_url: "",
    thumbnail_url: "",
    published: false,
    featured: false,
    order_index: 0,
  })
  const [loading, setLoading] = useState(false)
  const supabase = createClientClient()

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .order("order_index", { ascending: true })
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching videos:", error)
        toast.error("Failed to load videos")
        return
      }

      setVideos(data || [])
    } catch (error) {
      console.error("Error fetching videos:", error)
      toast.error("Failed to load videos")
    }
  }

  const handleSave = async () => {
    // Validate required fields
    if (!formData.title.trim()) {
      toast.error("Video title is required")
      return
    }
    if (!formData.youtube_url.trim()) {
      toast.error("YouTube URL is required")
      return
    }

    const videoId = extractYouTubeVideoId(formData.youtube_url)
    if (!videoId) {
      toast.error("Invalid YouTube URL")
      return
    }

    setLoading(true)

    try {
      const videoData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        youtube_url: formData.youtube_url.trim(),
        thumbnail_url: formData.thumbnail_url.trim() || getYouTubeThumbnail(videoId),
        published: formData.published,
        featured: formData.featured,
        order_index: formData.order_index,
      }

      let error
      if (editingVideo) {
        const { error: updateError } = await supabase
          .from("videos")
          .update(videoData)
          .eq("id", editingVideo.id)
        error = updateError
      } else {
        const { error: insertError } = await supabase.from("videos").insert(videoData)
        error = insertError
      }

      if (error) {
        console.error("Save error:", error)
        toast.error("Failed to save video")
      } else {
        toast.success(editingVideo ? "Video updated successfully" : "Video added successfully")
        setIsDialogOpen(false)
        resetForm()
        fetchVideos()
      }
    } catch (error) {
      console.error("Save error:", error)
      toast.error("An error occurred")
    }

    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video?")) return

    try {
      const { error } = await supabase.from("videos").delete().eq("id", id)

      if (error) {
        console.error("Delete error:", error)
        toast.error("Failed to delete video")
      } else {
        toast.success("Video deleted successfully")
        fetchVideos()
      }
    } catch (error) {
      console.error("Delete error:", error)
      toast.error("Failed to delete video")
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      youtube_url: "",
      thumbnail_url: "",
      published: false,
      featured: false,
      order_index: 0,
    })
    setEditingVideo(null)
  }

  const openEditDialog = (video: Video) => {
    setEditingVideo(video)
    setFormData({
      title: video.title,
      description: video.description,
      youtube_url: video.youtube_url,
      thumbnail_url: video.thumbnail_url || "",
      published: video.published,
      featured: video.featured,
      order_index: video.order_index,
    })
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Video Management</h2>
        <p className="text-gray-600">Manage YouTube videos for home page display</p>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button onClick={resetForm}>
            <Plus className="w-4 h-4 mr-2" />
            Add Video
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingVideo ? "Edit Video" : "Add New Video"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter video title"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter video description"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="youtube_url">YouTube URL *</Label>
              <Input
                id="youtube_url"
                value={formData.youtube_url}
                onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=..."
              />
              <p className="text-sm text-gray-500 mt-1">Supports YouTube watch URLs and short URLs</p>
            </div>

            <div>
              <Label htmlFor="thumbnail_url">Custom Thumbnail URL (Optional)</Label>
              <Input
                id="thumbnail_url"
                value={formData.thumbnail_url}
                onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                placeholder="Leave empty to use YouTube thumbnail"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="order_index">Display Order</Label>
                <Input
                  id="order_index"
                  type="number"
                  value={formData.order_index}
                  onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
                <p className="text-sm text-gray-500 mt-1">Lower numbers appear first</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
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

            <div className="flex space-x-4 pt-4">
              <Button 
                onClick={handleSave} 
                disabled={loading}
                className="flex-1"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {editingVideo ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>
                    {editingVideo ? "Update Video" : "Add Video"}
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>All Videos ({videos.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {videos.length === 0 ? (
            <div className="text-center py-12">
                              <VideoIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No videos yet</h3>
              <p className="text-gray-500 mb-4">Get started by adding your first video.</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Video
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => {
                const videoId = extractYouTubeVideoId(video.youtube_url)
                const thumbnailUrl = video.thumbnail_url || (videoId ? getYouTubeThumbnail(videoId) : "")
                
                return (
                  <div key={video.id} className="border rounded-lg overflow-hidden">
                    <div className="relative">
                      {thumbnailUrl ? (
                        <img
                          src={thumbnailUrl}
                          alt={video.title}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                          <VideoIcon className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                      
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(video.youtube_url, "_blank")}
                          className="text-white hover:text-[#D4AF37]"
                        >
                          <Play className="w-8 h-8" />
                        </Button>
                      </div>

                      <div className="absolute top-2 left-2 flex space-x-2">
                        {video.featured && (
                          <Badge variant="secondary" className="bg-[#D4AF37] text-black">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                        <Badge variant={video.published ? "default" : "secondary"}>
                          {video.published ? "Published" : "Draft"}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{video.title}</h3>
                      {video.description && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.description}</p>
                      )}
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <span>Order: {video.order_index}</span>
                        <span>{new Date(video.created_at).toLocaleDateString("en-US")}</span>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(video)}
                          className="flex-1"
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(video.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

