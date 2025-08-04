"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, BookOpen, Award, Target, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getCourses, Course, formatPrice } from "@/lib/course-utils"
import { getSuccessStories, SuccessStory } from "@/lib/success-stories-utils"
import { getImageByKey, ImageData } from "@/lib/image-utils"

export default function TrainingPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([])
  const [heroImage, setHeroImage] = useState<ImageData | null>(null)
  const [speakingImage, setSpeakingImage] = useState<ImageData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCourses()
    fetchSuccessStories()
  }, [])

  const fetchCourses = async () => {
    try {
      console.log("Fetching courses for training page...")
      const allCourses = await getCourses()
      console.log("Courses found:", allCourses)
      setCourses(allCourses)

      // Fetch training page images
      const hero = await getImageByKey('hero_image')
      if (hero) setHeroImage(hero)

      const speaking = await getImageByKey('speaking_image')
      if (speaking) setSpeakingImage(speaking)
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }

  const fetchSuccessStories = async () => {
    try {
      console.log("Fetching success stories for training page...")
      const allSuccessStories = await getSuccessStories()
      console.log("Success stories found:", allSuccessStories)
      setSuccessStories(allSuccessStories)
    } catch (error) {
      console.error('Error fetching success stories:', error)
    } finally {
      setLoading(false)
    }
  }

  const getHeroImageUrl = () => {
    return heroImage?.url || "/placeholder.svg?height=800&width=1600&text=Training Conference Room"
  }

  const getSpeakingImageUrl = () => {
    return speakingImage?.url || "/placeholder.svg?height=400&width=600&text=Speaking Event"
  }

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
            alt={heroImage?.alt_text || "Training Background"}
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
          <span>TRAINING</span>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <div className="text-[#D4AF37] text-lg tracking-[0.3em] mb-4">REAL ESTATE TRAINING</div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-wider mb-8">
              <span className="border-l-4 border-[#D4AF37] pl-8">ELEVATE</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Transform your real estate career with proven strategies from industry leaders who have sold over $7.5
              billion in luxury properties.
            </p>
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-wide">TRAINING PROGRAMS</h2>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Learn from the best with our comprehensive training programs designed to accelerate your success in luxury
              real estate.
            </p>
          </div>

          {courses.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-white text-2xl mb-4">No training programs available</div>
              <div className="text-gray-400 text-lg">
                Check back soon for new training programs
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <Card
                  key={course.id}
                  className="bg-gray-900 border-gray-800 hover:border-[#D4AF37] transition-all duration-300 group"
                >
                  <div className="relative">
                    {course.image_url && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={course.image_url}
                          alt={course.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-gray-300 mb-4 leading-relaxed">{course.description}</p>
                      <div className="text-4xl font-bold text-[#D4AF37] mb-4">{formatPrice(course.price)}</div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Duration:</span>
                        <span className="text-white font-semibold">{course.duration}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Level:</span>
                        <span className="text-white font-semibold">{course.level}</span>
                      </div>
                    </div>

                    {course.learning_outcomes && course.learning_outcomes.length > 0 && (
                      <div className="mb-8">
                        <h4 className="text-white font-semibold mb-4">What You'll Learn:</h4>
                        <ul className="space-y-2">
                          {course.learning_outcomes.map((outcome, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-300">
                              <CheckCircle className="w-4 h-4 text-[#D4AF37] mr-2 flex-shrink-0" />
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Button className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold tracking-wide">
                      ENROLL NOW
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Our Training */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-wide">WHY CHOOSE OUR TRAINING</h2>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-black border-gray-800 text-center hover:border-[#D4AF37] transition-all">
              <CardContent className="p-8">
                <Award className="w-12 h-12 text-[#D4AF37] mx-auto mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">PROVEN RESULTS</h3>
                <p className="text-gray-300 text-sm">
                  Learn from agents who have sold over $7.5 billion in luxury real estate.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black border-gray-800 text-center hover:border-[#D4AF37] transition-all">
              <CardContent className="p-8">
                <Users className="w-12 h-12 text-[#D4AF37] mx-auto mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">EXPERT INSTRUCTORS</h3>
                <p className="text-gray-300 text-sm">
                  Direct access to Josh and Matt Altman's proven strategies and techniques.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black border-gray-800 text-center hover:border-[#D4AF37] transition-all">
              <CardContent className="p-8">
                <Target className="w-12 h-12 text-[#D4AF37] mx-auto mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">PRACTICAL STRATEGIES</h3>
                <p className="text-gray-300 text-sm">
                  Real-world tactics you can implement immediately in your business.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black border-gray-800 text-center hover:border-[#D4AF37] transition-all">
              <CardContent className="p-8">
                <BookOpen className="w-12 h-12 text-[#D4AF37] mx-auto mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">ONGOING SUPPORT</h3>
                <p className="text-gray-300 text-sm">
                  Continued mentorship and resources to ensure your long-term success.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-wide">SUCCESS STORIES</h2>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
          </div>

          {successStories.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-white text-2xl mb-4">No success stories available</div>
              <div className="text-gray-400 text-lg">
                Check back soon for inspiring success stories
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {successStories.map((story) => (
                <Card key={story.id} className="bg-gray-900 border-gray-800 hover:border-[#D4AF37] transition-all">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      {story.image_url ? (
                        <Image
                          src={story.image_url}
                          alt={story.name}
                          width={80}
                          height={80}
                          className="rounded-full mx-auto mb-4 object-cover"
                        />
                      ) : (
                        <Image
                          src="/placeholder.svg?height=80&width=80&text=Success Story"
                          alt={story.name}
                          width={80}
                          height={80}
                          className="rounded-full mx-auto mb-4"
                        />
                      )}
                      <h3 className="text-xl font-bold text-white">{story.name}</h3>
                      <p className="text-[#D4AF37] text-sm">{story.title}</p>
                    </div>
                    <p className="text-gray-300 text-center italic">
                      "{story.quote}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-wide">
            READY TO ELEVATE YOUR CAREER?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300 leading-relaxed">
            Join thousands of successful agents who have transformed their careers with our proven training programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold px-8 py-4 tracking-wide"
            >
              VIEW ALL PROGRAMS
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black bg-transparent font-semibold px-8 py-4 tracking-wide"
            >
              SCHEDULE CONSULTATION
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
