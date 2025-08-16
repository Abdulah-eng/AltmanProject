"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClientClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminHeader } from "@/components/admin/admin-header"
import { HeroContentManager } from "@/components/admin/hero-content-manager"
import { BlogManager } from "@/components/admin/blog-manager"
import { TestimonialManager } from "@/components/admin/testimonial-manager"
import { AppointmentManager } from "@/components/admin/appointment-manager"
import { ImageManager } from "@/components/admin/image-manager"
import { PropertyManager } from "@/components/admin/property-manager"
import { CourseManager } from "@/components/admin/course-manager"
import { SuccessStoriesManager } from "@/components/admin/success-stories-manager"
import { ClientRequirementsManager } from "@/components/admin/client-requirements-manager"
import { ChatbotLeadsManager } from "@/components/admin/chatbot-leads-manager"
import { DocumentManager } from "@/components/admin/document-manager"
import { ClientExperiencesManager } from "@/components/admin/client-experiences-manager"
import { NeighborhoodManager } from "@/components/admin/neighborhood-manager"
import { NewDevelopmentsManager } from "@/components/admin/new-developments-manager"
import { RealEstateInsightsManager } from "@/components/admin/real-estate-insights-manager"
import { Home, FileText, MessageSquare, Calendar, BarChart3, Image, Users, Building, BookOpen, Star, Bot, FolderOpen, Heart, MapPin, Building2 } from "lucide-react"
import LuxuryLoadingScreen from "@/components/luxury-loading-screen"

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    appointments: 0,
    blogs: 0,
    testimonials: 0,
    properties: 0,
    courses: 0,
    successStories: 0,
    chatbotLeads: 0
  })
  const router = useRouter()
  const supabase = createClientClient()

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session || session.user.email !== "mabdulaharshad@gmail.com") {
        router.push("/admin/login")
        return
      }

      setUser(session.user)
      await fetchStats()
      setLoading(false)
    }

    checkAuth()
  }, [router, supabase])

  const fetchStats = async () => {
    try {
      // Fetch appointments count
      const { count: appointmentsCount } = await supabase
        .from('appointments')
        .select('*', { count: 'exact', head: true })

      // Fetch published blogs count
      const { count: blogsCount } = await supabase
        .from('blogs')
        .select('*', { count: 'exact', head: true })
        .eq('published', true)

      // Fetch published testimonials count
      const { count: testimonialsCount } = await supabase
        .from('testimonials')
        .select('*', { count: 'exact', head: true })
        .eq('published', true)

      // Fetch properties count
      const { count: propertiesCount } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true })

      // Fetch courses count
      const { count: coursesCount } = await supabase
        .from('courses')
        .select('*', { count: 'exact', head: true })

      // Fetch success stories count
      const { count: successStoriesCount } = await supabase
        .from('success_stories')
        .select('*', { count: 'exact', head: true })

      // Fetch chatbot leads count
      const { count: chatbotLeadsCount } = await supabase
        .from('chatbot_leads')
        .select('*', { count: 'exact', head: true })

      setStats({
        appointments: appointmentsCount || 0,
        blogs: blogsCount || 0,
        testimonials: testimonialsCount || 0,
        properties: propertiesCount || 0,
        courses: coursesCount || 0,
        successStories: successStoriesCount || 0,
        chatbotLeads: chatbotLeadsCount || 0
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  if (loading) {
    return <LuxuryLoadingScreen isLoading={true} message="Loading admin dashboard..." />
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminHeader user={user} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-[#D4AF37] tracking-wider mb-4">ADMIN DASHBOARD</h1>
          <div className="w-16 h-1 bg-[#D4AF37] mb-4"></div>
          <p className="text-gray-300 text-lg">Manage your luxury real estate website content and appointments</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-14 bg-gray-900 border border-gray-800 rounded-lg p-1">
            <TabsTrigger 
              value="overview" 
              className="flex items-center gap-2 data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black data-[state=inactive]:text-gray-300 hover:text-[#D4AF37] transition-all duration-300 rounded-md"
            >
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="hero" 
              className="flex items-center gap-2 data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black data-[state=inactive]:text-gray-300 hover:text-[#D4AF37] transition-all duration-300 rounded-md"
            >
              <Home className="w-4 h-4" />
              Hero
            </TabsTrigger>
            <TabsTrigger 
              value="properties" 
              className="flex items-center gap-2 data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black data-[state=inactive]:text-gray-300 hover:text-[#D4AF37] transition-all duration-300 rounded-md"
            >
              <Building className="w-4 h-4" />
              Properties
            </TabsTrigger>
            <TabsTrigger 
              value="neighborhoods" 
              className="flex items-center gap-2 data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black data-[state=inactive]:text-gray-300 hover:text-[#D4AF37] transition-all duration-300 rounded-md"
            >
              <MapPin className="w-4 h-4" />
              Neighborhoods
            </TabsTrigger>
            <TabsTrigger 
              value="new-developments" 
              className="flex items-center gap-2 data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black data-[state=inactive]:text-gray-300 hover:text-[#D4AF37] transition-all duration-300 rounded-md"
            >
              <Building2 className="w-4 h-4" />
              New Developments
            </TabsTrigger>
            <TabsTrigger 
              value="insights" 
              className="flex items-center gap-2 data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black data-[state=inactive]:text-gray-300 hover:text-[#D4AF37] transition-all duration-300 rounded-md"
            >
              <BarChart3 className="w-4 h-4" />
              Real Estate Insights
            </TabsTrigger>
            <TabsTrigger 
              value="images" 
              className="flex items-center gap-2 data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black data-[state=inactive]:text-gray-300 hover:text-[#D4AF37] transition-all duration-300 rounded-md"
            >
              <Image className="w-4 h-4" />
              Images
            </TabsTrigger>
            <TabsTrigger 
              value="blogs" 
              className="flex items-center gap-2 data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black data-[state=inactive]:text-gray-300 hover:text-[#D4AF37] transition-all duration-300 rounded-md"
            >
              <FileText className="w-4 h-4" />
              Blogs
            </TabsTrigger>
            <TabsTrigger 
              value="testimonials" 
              className="flex items-center gap-2 data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black data-[state=inactive]:text-gray-300 hover:text-[#D4AF37] transition-all duration-300 rounded-md"
            >
              <MessageSquare className="w-4 h-4" />
              Reviews
            </TabsTrigger>
            <TabsTrigger 
              value="client-experiences" 
              className="flex items-center gap-2 data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black data-[state=inactive]:text-gray-300 hover:text-[#D4AF37] transition-all duration-300 rounded-md"
            >
              <Heart className="w-4 h-4" />
              Client Experiences
            </TabsTrigger>
            <TabsTrigger 
              value="appointments" 
              className="flex items-center gap-2 data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black data-[state=inactive]:text-gray-300 hover:text-[#D4AF37] transition-all duration-300 rounded-md"
            >
              <Calendar className="w-4 h-4" />
              Appointments
            </TabsTrigger>
            <TabsTrigger 
              value="requirements" 
              className="flex items-center gap-2 data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black data-[state=inactive]:text-gray-300 hover:text-[#D4AF37] transition-all duration-300 rounded-md"
            >
              <Users className="w-4 h-4" />
              Requirements
            </TabsTrigger>
            <TabsTrigger 
              value="courses" 
              className="flex items-center gap-2 data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black data-[state=inactive]:text-gray-300 hover:text-[#D4AF37] transition-all duration-300 rounded-md"
            >
              <BookOpen className="w-4 h-4" />
              Courses
            </TabsTrigger>
            <TabsTrigger 
              value="success-stories" 
              className="flex items-center gap-2 data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black data-[state=inactive]:text-gray-300 hover:text-[#D4AF37] transition-all duration-300 rounded-md"
            >
              <Star className="w-4 h-4" />
              Success Stories
            </TabsTrigger>
            <TabsTrigger 
              value="chatbot-leads" 
              className="flex items-center gap-2 data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black data-[state=inactive]:text-gray-300 hover:text-[#D4AF37] transition-all duration-300 rounded-md"
            >
              <Bot className="w-4 h-4" />
              Chatbot Leads
            </TabsTrigger>
            <TabsTrigger 
              value="documents" 
              className="flex items-center gap-2 data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black data-[state=inactive]:text-gray-300 hover:text-[#D4AF37] transition-all duration-300 rounded-md"
            >
              <FolderOpen className="w-4 h-4" />
              Documents
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="animate-fade-in-up">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <Card className="bg-gray-900 border-gray-800 hover:border-[#D4AF37] transition-all duration-300 hover-lift">
                <CardHeader className="border-b border-gray-800">
                  <CardTitle className="text-sm font-medium text-[#D4AF37] tracking-wide">TOTAL APPOINTMENTS</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-white mb-2">{stats.appointments}</div>
                  <p className="text-xs text-gray-400 tracking-wide">Total appointments</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800 hover:border-[#D4AF37] transition-all duration-300 hover-lift">
                <CardHeader className="border-b border-gray-800">
                  <CardTitle className="text-sm font-medium text-[#D4AF37] tracking-wide">PROPERTIES</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-white mb-2">{stats.properties}</div>
                  <p className="text-xs text-gray-400 tracking-wide">Total properties</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800 hover:border-[#D4AF37] transition-all duration-300 hover-lift">
                <CardHeader className="border-b border-gray-800">
                  <CardTitle className="text-sm font-medium text-[#D4AF37] tracking-wide">PUBLISHED BLOGS</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-white mb-2">{stats.blogs}</div>
                  <p className="text-xs text-gray-400 tracking-wide">Published blogs</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800 hover:border-[#D4AF37] transition-all duration-300 hover-lift">
                <CardHeader className="border-b border-gray-800">
                  <CardTitle className="text-sm font-medium text-[#D4AF37] tracking-wide">TESTIMONIALS</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-white mb-2">{stats.testimonials}</div>
                  <p className="text-xs text-gray-400 tracking-wide">Published testimonials</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800 hover:border-[#D4AF37] transition-all duration-300 hover-lift">
                <CardHeader className="border-b border-gray-800">
                  <CardTitle className="text-sm font-medium text-[#D4AF37] tracking-wide">COURSES</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-white mb-2">{stats.courses}</div>
                  <p className="text-xs text-gray-400 tracking-wide">Total courses</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800 hover:border-[#D4AF37] transition-all duration-300 hover-lift">
                <CardHeader className="border-b border-gray-800">
                  <CardTitle className="text-sm font-medium text-[#D4AF37] tracking-wide">SUCCESS STORIES</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-white mb-2">{stats.successStories}</div>
                  <p className="text-xs text-gray-400 tracking-wide">Total success stories</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800 hover:border-[#D4AF37] transition-all duration-300 hover-lift">
                <CardHeader className="border-b border-gray-800">
                  <CardTitle className="text-sm font-medium text-[#D4AF37] tracking-wide">CHATBOT LEADS</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-[#D4AF37] mb-2">{stats.chatbotLeads}</div>
                  <p className="text-xs text-gray-400 tracking-wide">AI-generated leads</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="hero" className="animate-fade-in-up">
            <HeroContentManager />
          </TabsContent>

          <TabsContent value="properties" className="animate-fade-in-up">
            <PropertyManager />
          </TabsContent>

          <TabsContent value="neighborhoods" className="animate-fade-in-up">
            <NeighborhoodManager />
          </TabsContent>

          <TabsContent value="new-developments" className="animate-fade-in-up">
            <NewDevelopmentsManager />
          </TabsContent>

          <TabsContent value="insights" className="animate-fade-in-up">
            <RealEstateInsightsManager />
          </TabsContent>

          <TabsContent value="images" className="animate-fade-in-up">
            <ImageManager />
          </TabsContent>

          <TabsContent value="blogs" className="animate-fade-in-up">
            <BlogManager />
          </TabsContent>

          <TabsContent value="testimonials" className="animate-fade-in-up">
            <TestimonialManager />
          </TabsContent>

          <TabsContent value="client-experiences" className="animate-fade-in-up">
            <ClientExperiencesManager />
          </TabsContent>

          <TabsContent value="appointments" className="animate-fade-in-up">
            <AppointmentManager />
          </TabsContent>

          <TabsContent value="requirements" className="animate-fade-in-up">
            <ClientRequirementsManager />
          </TabsContent>
          <TabsContent value="courses" className="animate-fade-in-up">
            <CourseManager />
          </TabsContent>
          <TabsContent value="success-stories" className="animate-fade-in-up">
            <SuccessStoriesManager />
          </TabsContent>
          <TabsContent value="chatbot-leads" className="animate-fade-in-up">
            <ChatbotLeadsManager />
          </TabsContent>
          <TabsContent value="documents" className="animate-fade-in-up">
            <DocumentManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
