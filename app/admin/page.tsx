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
import { VideoManager } from "@/components/admin/video-manager"
import { ImageManager } from "@/components/admin/image-manager"
import { PropertyManager } from "@/components/admin/property-manager"
import { TeamManager } from "@/components/admin/team-manager"
import { CourseManager } from "@/components/admin/course-manager"
import { SuccessStoriesManager } from "@/components/admin/success-stories-manager"
import { ClientRequirementsManager } from "@/components/admin/client-requirements-manager"
import { ChatbotLeadsManager } from "@/components/admin/chatbot-leads-manager"
import { DocumentManager } from "@/components/admin/document-manager"
import { SocialImageManager } from "@/components/admin/social-image-manager"
import { ClientExperiencesManager } from "@/components/admin/client-experiences-manager"
import { Home, FileText, MessageSquare, Calendar, Video, BarChart3, Image, Users, Building, UserCheck, BookOpen, Star, Bot, FolderOpen, Instagram, Heart } from "lucide-react"

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    appointments: 0,
    blogs: 0,
    testimonials: 0,
    videos: 0,
    properties: 0,
    teamMembers: 0,
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

      // Fetch published videos count
      const { count: videosCount } = await supabase
        .from('videos')
        .select('*', { count: 'exact', head: true })
        .eq('published', true)

      // Fetch properties count
      const { count: propertiesCount } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true })

      // Fetch team members count
      const { count: teamMembersCount } = await supabase
        .from('team_members')
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
        videos: videosCount || 0,
        properties: propertiesCount || 0,
        teamMembers: teamMembersCount || 0,
        courses: coursesCount || 0,
        successStories: successStoriesCount || 0,
        chatbotLeads: chatbotLeadsCount || 0
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader user={user} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your website content and appointments</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-14 bg-gray-100">
            <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-gray-600 hover:text-gray-900">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="hero" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-gray-600 hover:text-gray-900">
              <Home className="w-4 h-4" />
              Hero
            </TabsTrigger>
            <TabsTrigger value="properties" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-gray-600 hover:text-gray-900">
              <Building className="w-4 h-4" />
              Properties
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-gray-600 hover:text-gray-900">
              <UserCheck className="w-4 h-4" />
              Team
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-gray-600 hover:text-gray-900">
              <Image className="w-4 h-4" />
              Images
            </TabsTrigger>
            <TabsTrigger value="social-images" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-gray-600 hover:text-gray-900">
              <Instagram className="w-4 h-4" />
              Social Images
            </TabsTrigger>
            <TabsTrigger value="blogs" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-gray-600 hover:text-gray-900">
              <FileText className="w-4 h-4" />
              Blogs
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-gray-600 hover:text-gray-900">
              <MessageSquare className="w-4 h-4" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="client-experiences" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-gray-600 hover:text-gray-900">
              <Heart className="w-4 h-4" />
              Client Experiences
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-gray-600 hover:text-gray-900">
              <Calendar className="w-4 h-4" />
              Appointments
            </TabsTrigger>
            <TabsTrigger value="requirements" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-gray-600 hover:text-gray-900">
              <Users className="w-4 h-4" />
              Requirements
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-gray-600 hover:text-gray-900">
              <Video className="w-4 h-4" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-gray-600 hover:text-gray-900">
              <BookOpen className="w-4 h-4" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="success-stories" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-gray-600 hover:text-gray-900">
              <Star className="w-4 h-4" />
              Success Stories
            </TabsTrigger>
            <TabsTrigger value="chatbot-leads" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-gray-600 hover:text-gray-900">
              <Bot className="w-4 h-4" />
              Chatbot Leads
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-gray-600 hover:text-gray-900">
              <FolderOpen className="w-4 h-4" />
              Documents
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 lg:grid-cols-8 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.appointments}</div>
                  <p className="text-xs text-muted-foreground">Total appointments</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Properties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.properties}</div>
                  <p className="text-xs text-muted-foreground">Total properties</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.teamMembers}</div>
                  <p className="text-xs text-muted-foreground">Total team members</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Published Blogs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.blogs}</div>
                  <p className="text-xs text-muted-foreground">Published blogs</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.testimonials}</div>
                  <p className="text-xs text-muted-foreground">Published testimonials</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Videos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.videos}</div>
                  <p className="text-xs text-muted-foreground">Published videos</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.courses}</div>
                  <p className="text-xs text-muted-foreground">Total courses</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Success Stories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.successStories}</div>
                  <p className="text-xs text-muted-foreground">Total success stories</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Chatbot Leads</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{stats.chatbotLeads}</div>
                  <p className="text-xs text-muted-foreground">AI-generated leads</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="hero">
            <HeroContentManager />
          </TabsContent>

          <TabsContent value="properties">
            <PropertyManager />
          </TabsContent>

          <TabsContent value="team">
            <TeamManager />
          </TabsContent>

          <TabsContent value="images">
            <ImageManager />
          </TabsContent>

          <TabsContent value="social-images">
            <SocialImageManager />
          </TabsContent>

          <TabsContent value="blogs">
            <BlogManager />
          </TabsContent>

          <TabsContent value="testimonials">
            <TestimonialManager />
          </TabsContent>

          <TabsContent value="client-experiences">
            <ClientExperiencesManager />
          </TabsContent>

          <TabsContent value="appointments">
            <AppointmentManager />
          </TabsContent>

          <TabsContent value="requirements">
            <ClientRequirementsManager />
          </TabsContent>

          <TabsContent value="videos">
            <VideoManager />
          </TabsContent>
          <TabsContent value="courses">
            <CourseManager />
          </TabsContent>
          <TabsContent value="success-stories">
            <SuccessStoriesManager />
          </TabsContent>
          <TabsContent value="chatbot-leads">
            <ChatbotLeadsManager />
          </TabsContent>
          <TabsContent value="documents">
            <DocumentManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
