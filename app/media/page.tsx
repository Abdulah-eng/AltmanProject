"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, ExternalLink, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getPublishedVideos, extractYouTubeVideoId, getYouTubeThumbnail, Video } from "@/lib/video-utils"
import { getImageByKey, ImageData } from "@/lib/image-utils"

export default function MediaPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [heroImage, setHeroImage] = useState<ImageData | null>(null)
  const [youtubeImage, setYoutubeImage] = useState<ImageData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      console.log("Fetching published videos for media page...")
      const publishedVideos = await getPublishedVideos()
      console.log("Published videos found:", publishedVideos)
      setVideos(publishedVideos)

      // Fetch media page images
      const hero = await getImageByKey('hero_image')
      if (hero) setHeroImage(hero)

      const youtube = await getImageByKey('youtube_image')
      if (youtube) setYoutubeImage(youtube)


    } catch (error) {
      console.error('Error fetching videos:', error)
    } finally {
      setLoading(false)
    }
  }



  const getHeroImageUrl = () => {
    return heroImage?.url || "/placeholder.svg?height=800&width=1600&text=Media Studio Background"
  }

  const getYoutubeImageUrl = () => {
    return youtubeImage?.url || "/placeholder.svg?height=400&width=600&text=YouTube Channel"
  }



  const mediaFeatures = [
    {
      title: "Million Dollar Listing Los Angeles",
      description: "Follow Homes of Hollywood on Bravo's hit reality series showcasing luxury real estate.",
      image: "/placeholder.svg?height=400&width=600&text=Million Dollar Listing LA",
      type: "TV SHOW",
      network: "BRAVO",
    },
    {
      title: "Homes of Hollywood YouTube Channel",
      description: "Real estate tips, market insights, and behind-the-scenes content from Homes of Hollywood.",
      image: getYoutubeImageUrl(),
      type: "YOUTUBE",
      subscribers: "165K",
    },
  ]



  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={getHeroImageUrl()}
            alt={heroImage?.alt_text || "Media Background"}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="absolute top-32 left-8 z-10 text-white text-sm tracking-wide">
          <Link href="/" className="hover:text-[#D4AF37]">
            HOME
          </Link>
          <span className="mx-2">{">"}</span>
          <span>IN THE MEDIA</span>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <div className="text-[#D4AF37] text-lg tracking-[0.3em] mb-4">IN THE MEDIA</div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-wider mb-8">
              <span className="border-l-4 border-[#D4AF37] pl-8">FEATURED</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              From television to digital media, follow our journey in luxury real estate across all platforms.
            </p>
          </div>
        </div>
      </section>

      {/* YouTube Videos Section */}
      {videos.length > 0 && (
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-white text-4xl md:text-6xl font-bold tracking-wider mb-8">LATEST VIDEOS</h2>
              <div className="w-16 h-px bg-[#D4AF37] mx-auto mb-8"></div>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Watch the latest real estate insights, market trends, and behind-the-scenes content.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {videos.map((video) => {
                const videoId = extractYouTubeVideoId(video.youtube_url)
                const thumbnailUrl = video.thumbnail_url || (videoId ? getYouTubeThumbnail(videoId) : "")
                
                return (
                  <Card
                    key={video.id}
                    className="bg-gray-900 border-gray-800 hover:border-[#D4AF37] transition-all duration-300 group overflow-hidden"
                  >
                    <div className="relative">
                      {thumbnailUrl ? (
                        <img
                          src={thumbnailUrl}
                          alt={video.title}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-64 bg-gray-800 flex items-center justify-center">
                          <Play className="w-16 h-16 text-gray-600" />
                        </div>
                      )}
                      
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300" />
                      
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#D4AF37] text-black px-3 py-1 text-sm font-bold tracking-wide">
                          YOUTUBE
                        </span>
                      </div>
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button
                          variant="ghost"
                          size="lg"
                          onClick={() => window.open(video.youtube_url, "_blank")}
                          className="text-white hover:text-[#D4AF37] hover:bg-black/20 w-16 h-16 rounded-full"
                        >
                          <Play className="w-8 h-8" />
                        </Button>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                        {video.title}
                      </h3>
                      
                      {video.description && (
                        <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3">
                          {video.description}
                        </p>
                      )}
                      
                      <div className="text-[#D4AF37] text-sm font-semibold mb-4">
                        {video.featured ? "FEATURED VIDEO" : "LATEST CONTENT"}
                      </div>
                      
                      <Button
                        className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold tracking-wide"
                        onClick={() => window.open(video.youtube_url, "_blank")}
                      >
                        WATCH NOW
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Main Media Features */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl md:text-6xl font-bold tracking-wider mb-8">MEDIA PLATFORMS</h2>
            <div className="w-16 h-px bg-[#D4AF37] mx-auto mb-8"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {mediaFeatures.map((feature, index) => (
              <Card
                key={index}
                className="bg-gray-900 border-gray-800 hover:border-[#D4AF37] transition-all duration-300 group overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#D4AF37] text-black px-3 py-1 text-sm font-bold tracking-wide">
                      {feature.type}
                    </span>
                  </div>
                  {feature.type === "YOUTUBE" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">{feature.description}</p>
                  {feature.network && (
                    <div className="text-[#D4AF37] text-sm font-semibold mb-4">ON {feature.network}</div>
                  )}
                  {feature.subscribers && (
                    <div className="text-[#D4AF37] text-sm font-semibold mb-4">{feature.subscribers} SUBSCRIBERS</div>
                  )}
                  {feature.outlets && (
                    <div className="text-[#D4AF37] text-sm font-semibold mb-4">{feature.outlets} MEDIA OUTLETS</div>
                  )}
                  <Button
                    className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold tracking-wide"
                    asChild
                  >
                    <Link href={`/media/${feature.type.toLowerCase().replace(" ", "-")}`}>
                      LEARN MORE
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>



      {/* Latest Updates */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-wide">LATEST UPDATES</h2>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gray-900 border-gray-800 hover:border-[#D4AF37] transition-all">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="w-5 h-5 text-[#D4AF37] mr-2" />
                  <span className="text-sm text-gray-400">JANUARY 2024</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">New Season of Million Dollar Listing LA</h3>
                <p className="text-gray-300 mb-4">
                  Catch Homes of Hollywood in the latest season featuring exclusive luxury properties.
                </p>
                <Button
                  variant="outline"
                  className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black bg-transparent"
                >
                  WATCH NOW
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 hover:border-[#D4AF37] transition-all">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="w-5 h-5 text-[#D4AF37] mr-2" />
                  <span className="text-sm text-gray-400">DECEMBER 2023</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Forbes Feature Article</h3>
                <p className="text-gray-300 mb-4">
                  Featured in Forbes for breaking luxury real estate sales records in Beverly Hills.
                </p>
                <Button
                  variant="outline"
                  className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black bg-transparent"
                >
                  READ ARTICLE
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 hover:border-[#D4AF37] transition-all">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="w-5 h-5 text-[#D4AF37] mr-2" />
                  <span className="text-sm text-gray-400">NOVEMBER 2023</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">YouTube Milestone</h3>
                <p className="text-gray-300 mb-4">Homes of Hollywood's YouTube channel reaches 165K subscribers milestone.</p>
                <Button
                  variant="outline"
                  className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black bg-transparent"
                >
                  SUBSCRIBE
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
