"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClientClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { toast } from "sonner"
import { Calendar, Clock, MessageSquare, Plus, User, LogOut } from "lucide-react"

interface Appointment {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  service_type: string
  appointment_date: string
  appointment_time: string
  message?: string
  status: "pending" | "approved" | "rejected"
  admin_notes?: string
  suggested_date?: string
  suggested_time?: string
  created_at: string
}

interface ClientRequirement {
  id: string
  user_id: string
  user_email: string
  user_name: string
  requirement_type: string
  title: string
  description: string
  budget?: string
  timeline?: string
  status: "pending" | "reviewed" | "in_progress" | "completed"
  admin_notes?: string
  created_at: string
}

export default function ClientDashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [requirements, setRequirements] = useState<ClientRequirement[]>([])
  const [isRequirementDialogOpen, setIsRequirementDialogOpen] = useState(false)
  const [requirementForm, setRequirementForm] = useState({
    requirement_type: "",
    title: "",
    description: "",
    budget: "",
    timeline: "",
  })
  const router = useRouter()
  const supabase = createClientClient()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      router.push("/auth/login")
      return
    }

    setUser(session.user)
    await Promise.all([fetchAppointments(session.user.id), fetchRequirements(session.user.id)])
    setLoading(false)
  }

  const fetchAppointments = async (userId: string) => {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (data) {
      setAppointments(data)
    }
  }

  const fetchRequirements = async (userId: string) => {
    const { data, error } = await supabase
      .from("client_requirements")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (data) {
      setRequirements(data)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const handleSubmitRequirement = async () => {
    if (!user) return

    const requirementData = {
      user_id: user.id,
      user_email: user.email,
      user_name: user.user_metadata?.full_name || `${user.user_metadata?.first_name} ${user.user_metadata?.last_name}`,
      ...requirementForm,
    }

    const { error } = await supabase.from("client_requirements").insert(requirementData)

    if (error) {
      toast.error("Failed to submit requirement")
    } else {
      toast.success("Requirement submitted successfully")
      setIsRequirementDialogOpen(false)
      setRequirementForm({
        requirement_type: "",
        title: "",
        description: "",
        budget: "",
        timeline: "",
      })
      fetchRequirements(user.id)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      case "reviewed":
        return <Badge className="bg-yellow-100 text-yellow-800">Reviewed</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
              <p className="text-gray-600">
                {user?.user_metadata?.full_name || `${user?.user_metadata?.first_name} ${user?.user_metadata?.last_name}`}
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{appointments.length}</div>
              <p className="text-xs text-muted-foreground">Your scheduled appointments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Pending Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {appointments.filter(a => a.status === "pending").length}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Requirements Submitted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{requirements.length}</div>
              <p className="text-xs text-muted-foreground">Your property requirements</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Active Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {requirements.filter(r => r.status === "in_progress" || r.status === "reviewed").length}
              </div>
              <p className="text-xs text-muted-foreground">Being processed</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Appointments */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Your Appointments</CardTitle>
                <Button onClick={() => router.push("/book-appointment")}>
                  <Plus className="w-4 h-4 mr-2" />
                  Book New
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {appointments.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No appointments yet</p>
              ) : (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{appointment.service_type}</h3>
                        {getStatusBadge(appointment.status)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {appointment.appointment_date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {appointment.appointment_time}
                        </div>
                      </div>
                      {appointment.admin_notes && (
                        <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                          <strong>Admin Notes:</strong> {appointment.admin_notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Your Requirements</CardTitle>
                <Dialog open={isRequirementDialogOpen} onOpenChange={setIsRequirementDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Submit New
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Submit New Requirement</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="requirement_type">Requirement Type</Label>
                        <Select
                          value={requirementForm.requirement_type}
                          onValueChange={(value) =>
                            setRequirementForm({ ...requirementForm, requirement_type: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="property_search">Property Search</SelectItem>
                            <SelectItem value="investment">Investment Consultation</SelectItem>
                            <SelectItem value="consultation">General Consultation</SelectItem>
                            <SelectItem value="valuation">Property Valuation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={requirementForm.title}
                          onChange={(e) => setRequirementForm({ ...requirementForm, title: e.target.value })}
                          placeholder="Brief title for your requirement"
                        />
                      </div>

                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={requirementForm.description}
                          onChange={(e) => setRequirementForm({ ...requirementForm, description: e.target.value })}
                          placeholder="Detailed description of your requirement..."
                          className="min-h-[100px]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="budget">Budget (Optional)</Label>
                          <Input
                            id="budget"
                            value={requirementForm.budget}
                            onChange={(e) => setRequirementForm({ ...requirementForm, budget: e.target.value })}
                            placeholder="e.g., $500,000 - $750,000"
                          />
                        </div>
                        <div>
                          <Label htmlFor="timeline">Timeline (Optional)</Label>
                          <Input
                            id="timeline"
                            value={requirementForm.timeline}
                            onChange={(e) => setRequirementForm({ ...requirementForm, timeline: e.target.value })}
                            placeholder="e.g., 3-6 months"
                          />
                        </div>
                      </div>

                      <Button onClick={handleSubmitRequirement} className="w-full">
                        Submit Requirement
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {requirements.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No requirements submitted yet</p>
              ) : (
                <div className="space-y-4">
                  {requirements.map((requirement) => (
                    <div key={requirement.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{requirement.title}</h3>
                        {getStatusBadge(requirement.status)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{requirement.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="capitalize">{requirement.requirement_type.replace('_', ' ')}</span>
                        {requirement.budget && <span>Budget: {requirement.budget}</span>}
                        {requirement.timeline && <span>Timeline: {requirement.timeline}</span>}
                      </div>
                      {requirement.admin_notes && (
                        <div className="mt-2 p-2 bg-blue-50 rounded text-sm">
                          <strong>Admin Response:</strong> {requirement.admin_notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
} 