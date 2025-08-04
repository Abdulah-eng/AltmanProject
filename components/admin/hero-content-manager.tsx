"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { createClientClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import Image from "next/image"
import { Upload, X } from "lucide-react"

export function HeroContentManager() {
  const [heroData, setHeroData] = useState({
    title: "",
    subtitle: "",
    description: "",
    image_url: "",
    cta_text: "",
    cta_link: "",
  })
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [uploading, setUploading] = useState(false)
  const supabase = createClientClient()

  useEffect(() => {
    fetchHeroContent()
  }, [])

  const fetchHeroContent = async () => {
    const { data, error } = await supabase.from("hero_content").select("*").single()

    if (data) {
      setHeroData(data)
      if (data.image_url) {
        setImagePreview(data.image_url)
      }
    }
  }

  const handleImageUpload = async (file: File) => {
    setUploading(true)
    
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `hero/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('website-images')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data: { publicUrl } } = supabase.storage
        .from('website-images')
        .getPublicUrl(filePath)

      setHeroData({ ...heroData, image_url: publicUrl })
      setImagePreview(publicUrl)
      setImageFile(null)
      toast.success("Image uploaded successfully")
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error("Failed to upload image")
    } finally {
      setUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview("")
    setHeroData({ ...heroData, image_url: "" })
  }

  const handleSave = async () => {
    setLoading(true)

    try {
      // Upload image if there's a new file
      if (imageFile) {
        await handleImageUpload(imageFile)
      }

      const { error } = await supabase.from("hero_content").upsert(heroData)

      if (error) {
        toast.error("Failed to save hero content")
      } else {
        toast.success("Hero content saved successfully")
      }
    } catch (error) {
      toast.error("Failed to save hero content")
    }

    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hero Section Content</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={heroData.title}
            onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input
            id="subtitle"
            value={heroData.subtitle}
            onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={heroData.description}
            onChange={(e) => setHeroData({ ...heroData, description: e.target.value })}
            className="min-h-[100px]"
          />
        </div>

        <div>
          <Label htmlFor="image">Hero Image</Label>
          <div className="space-y-4">
            {imagePreview && (
              <div className="relative w-full max-w-md">
                <Image
                  src={imagePreview}
                  alt="Hero preview"
                  width={400}
                  height={300}
                  className="rounded-lg object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={removeImage}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
            
            <div className="flex items-center gap-4">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="flex-1"
              />
              {imageFile && (
                <Button
                  type="button"
                  onClick={() => handleImageUpload(imageFile)}
                  disabled={uploading}
                  size="sm"
                >
                  {uploading ? "Uploading..." : <Upload className="w-4 h-4" />}
                </Button>
              )}
            </div>
            
            {heroData.image_url && (
              <div className="text-sm text-gray-500">
                Current image URL: {heroData.image_url}
              </div>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="cta_text">CTA Button Text</Label>
          <Input
            id="cta_text"
            value={heroData.cta_text}
            onChange={(e) => setHeroData({ ...heroData, cta_text: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="cta_link">CTA Button Link</Label>
          <Input
            id="cta_link"
            value={heroData.cta_link}
            onChange={(e) => setHeroData({ ...heroData, cta_link: e.target.value })}
          />
        </div>

        <Button onClick={handleSave} disabled={loading || uploading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </CardContent>
    </Card>
  )
}
