"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Clock, MessageSquare, Calendar, FileText, Clock as ClockIcon } from "lucide-react"
import { toast } from "sonner"
import { format } from "date-fns"
import { getTeamMembers, TeamMember } from "@/lib/team-utils"
import Image from "next/image"

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<'requirements' | 'appointment'>('requirements')
  const [loading, setLoading] = useState(false)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [teamLoading, setTeamLoading] = useState(true)
  
  // Requirements form state
  const [requirementsForm, setRequirementsForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    requirementType: "",
    title: "",
    description: "",
    budget: "",
    timeline: "",
  })

  // Appointment form state
  const [appointmentForm, setAppointmentForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    serviceType: "",
    date: "",
    time: "",
    message: "",
  })

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ]

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      console.log("Fetching team members for contact page...")
      const members = await getTeamMembers()
      console.log("Team members found:", members)
      setTeamMembers(members)
    } catch (error) {
      console.error('Error fetching team members:', error)
    } finally {
      setTeamLoading(false)
    }
  }

  const handleRequirementsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/requirements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_name: `${requirementsForm.firstName} ${requirementsForm.lastName}`,
          user_email: requirementsForm.email,
          requirement_type: requirementsForm.requirementType,
          title: requirementsForm.title,
          description: requirementsForm.description,
          budget: requirementsForm.budget,
          timeline: requirementsForm.timeline,
        }),
      })

      if (response.ok) {
        toast.success("Requirements submitted successfully! We'll get back to you soon.")
        setRequirementsForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          requirementType: "",
          title: "",
          description: "",
          budget: "",
          timeline: "",
        })
      } else {
        toast.error("Failed to submit requirements. Please try again.")
      }
    } catch (error) {
      toast.error("Failed to submit requirements. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: appointmentForm.firstName,
          last_name: appointmentForm.lastName,
          email: appointmentForm.email,
          phone: appointmentForm.phone,
          service_type: appointmentForm.serviceType,
          appointment_date: appointmentForm.date,
          appointment_time: appointmentForm.time,
          message: appointmentForm.message,
          status: "pending",
        }),
      })

      if (response.ok) {
        toast.success("Appointment booked successfully! You'll receive a confirmation email.")
        setAppointmentForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          serviceType: "",
          date: "",
          time: "",
          message: "",
        })
      } else {
        toast.error("Failed to book appointment. Please try again.")
      }
    } catch (error) {
      toast.error("Failed to book appointment. Please try again.")
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="text-[#D4AF37] text-sm tracking-[0.3em] mb-4">CONTACT US</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-wider">Contact Us</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-300">
              Ready to start your real estate journey? Get in touch with our expert team today.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Forms */}
              <Card className="bg-black/80 border border-gray-800 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Get In Touch</CardTitle>
                  <p className="text-gray-400">Submit your requirements or book an appointment with our team.</p>
                  
                  {/* Tab Navigation */}
                  <div className="flex space-x-1 bg-gray-900 p-1 rounded-lg mt-4">
                    <button
                      onClick={() => setActiveTab('requirements')}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                        activeTab === 'requirements'
                          ? 'bg-[#D4AF37] text-black shadow-sm'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <FileText className="w-4 h-4 inline mr-2" />
                      Submit Requirements
                    </button>
                    <button
                      onClick={() => setActiveTab('appointment')}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                        activeTab === 'appointment'
                          ? 'bg-[#D4AF37] text-black shadow-sm'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Book Appointment
                    </button>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Requirements Form */}
                  {activeTab === 'requirements' && (
                    <form onSubmit={handleRequirementsSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">First Name *</label>
                          <Input 
                            placeholder="John" 
                            value={requirementsForm.firstName}
                            onChange={(e) => setRequirementsForm({...requirementsForm, firstName: e.target.value})}
                            className="bg-transparent border-gray-600 text-white placeholder:text-gray-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                            required 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Last Name *</label>
                          <Input 
                            placeholder="Doe" 
                            value={requirementsForm.lastName}
                            onChange={(e) => setRequirementsForm({...requirementsForm, lastName: e.target.value})}
                            className="bg-transparent border-gray-600 text-white placeholder:text-gray-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                            required 
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                        <Input 
                          type="email" 
                          placeholder="john@example.com" 
                          value={requirementsForm.email}
                          onChange={(e) => setRequirementsForm({...requirementsForm, email: e.target.value})}
                          className="bg-transparent border-gray-600 text-white placeholder:text-gray-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                          required 
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                        <Input 
                          placeholder="(555) 123-4567" 
                          value={requirementsForm.phone}
                          onChange={(e) => setRequirementsForm({...requirementsForm, phone: e.target.value})}
                          className="bg-transparent border-gray-600 text-white placeholder:text-gray-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                          required 
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Requirement Type *</label>
                        <Select 
                          onValueChange={(value) => setRequirementsForm({...requirementsForm, requirementType: value})}
                        >
                          <SelectTrigger className="bg-transparent border-gray-600 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]">
                            <SelectValue placeholder="Select requirement type" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-700">
                            <SelectItem value="property_search">Property Search</SelectItem>
                            <SelectItem value="investment">Investment Consultation</SelectItem>
                            <SelectItem value="consultation">General Consultation</SelectItem>
                            <SelectItem value="valuation">Property Valuation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
                        <Input 
                          placeholder="Brief title for your requirement" 
                          value={requirementsForm.title}
                          onChange={(e) => setRequirementsForm({...requirementsForm, title: e.target.value})}
                          className="bg-transparent border-gray-600 text-white placeholder:text-gray-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                          required 
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                        <Textarea
                          placeholder="Detailed description of your requirement..."
                          className="min-h-[100px] bg-transparent border-gray-600 text-white placeholder:text-gray-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                          value={requirementsForm.description}
                          onChange={(e) => setRequirementsForm({...requirementsForm, description: e.target.value})}
                          required
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Budget (Optional)</label>
                          <Input 
                            placeholder="e.g., $500,000 - $750,000" 
                            value={requirementsForm.budget}
                            onChange={(e) => setRequirementsForm({...requirementsForm, budget: e.target.value})}
                            className="bg-transparent border-gray-600 text-white placeholder:text-gray-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Timeline (Optional)</label>
                          <Input 
                            placeholder="e.g., 3-6 months" 
                            value={requirementsForm.timeline}
                            onChange={(e) => setRequirementsForm({...requirementsForm, timeline: e.target.value})}
                            className="bg-transparent border-gray-600 text-white placeholder:text-gray-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                          />
                        </div>
                      </div>

                      <Button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black" size="lg" disabled={loading}>
                        {loading ? "Submitting..." : "Submit Requirements"}
                      </Button>
                    </form>
                  )}

                  {/* Appointment Form */}
                  {activeTab === 'appointment' && (
                    <form onSubmit={handleAppointmentSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">First Name *</label>
                          <Input 
                            placeholder="John" 
                            value={appointmentForm.firstName}
                            onChange={(e) => setAppointmentForm({...appointmentForm, firstName: e.target.value})}
                            className="bg-transparent border-gray-600 text-white placeholder:text-gray-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                            required 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Last Name *</label>
                          <Input 
                            placeholder="Doe" 
                            value={appointmentForm.lastName}
                            onChange={(e) => setAppointmentForm({...appointmentForm, lastName: e.target.value})}
                            className="bg-transparent border-gray-600 text-white placeholder:text-gray-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                            required 
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                        <Input 
                          type="email" 
                          placeholder="john@example.com" 
                          value={appointmentForm.email}
                          onChange={(e) => setAppointmentForm({...appointmentForm, email: e.target.value})}
                          className="bg-transparent border-gray-600 text-white placeholder:text-gray-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                          required 
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                        <Input 
                          placeholder="(555) 123-4567" 
                          value={appointmentForm.phone}
                          onChange={(e) => setAppointmentForm({...appointmentForm, phone: e.target.value})}
                          className="bg-transparent border-gray-600 text-white placeholder:text-gray-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                          required 
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Service Type *</label>
                        <Select 
                          onValueChange={(value) => setAppointmentForm({...appointmentForm, serviceType: value})}
                        >
                          <SelectTrigger className="bg-transparent border-gray-600 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]">
                            <SelectValue placeholder="Select service type" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-700">
                            <SelectItem value="buying">Home Buying</SelectItem>
                            <SelectItem value="selling">Home Selling</SelectItem>
                            <SelectItem value="investment">Investment Consulting</SelectItem>
                            <SelectItem value="valuation">Property Valuation</SelectItem>
                            <SelectItem value="consultation">General Consultation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Date *</label>
                          <Input 
                            type="date" 
                            value={appointmentForm.date}
                            onChange={(e) => setAppointmentForm({...appointmentForm, date: e.target.value})}
                            min={new Date().toISOString().split('T')[0]}
                            className="bg-transparent border-gray-600 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                            required 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Time *</label>
                          <Select 
                            onValueChange={(value) => setAppointmentForm({...appointmentForm, time: value})}
                          >
                            <SelectTrigger className="bg-transparent border-gray-600 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]">
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-900 border-gray-700">
                              {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Additional Message (Optional)</label>
                        <Textarea
                          placeholder="Any additional information or specific requirements..."
                          className="min-h-[100px] bg-transparent border-gray-600 text-white placeholder:text-gray-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                          value={appointmentForm.message}
                          onChange={(e) => setAppointmentForm({...appointmentForm, message: e.target.value})}
                        />
                      </div>

                      <Button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black" size="lg" disabled={loading}>
                        {loading ? "Booking..." : "Book Appointment"}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Get In Touch</h2>
                  <p className="text-gray-400 mb-8">
                    We're here to help you with all your real estate needs. Contact us today to schedule a consultation.
                  </p>
                </div>

                <Card className="bg-black/80 border border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Phone className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-white mb-2">Phone</h3>
                        <p className="text-gray-300 mb-1">(555) 123-4567</p>
                        <p className="text-gray-300">(555) 987-6543</p>
                        <p className="text-sm text-gray-500 mt-2">Available 7 days a week, 8 AM - 8 PM</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/80 border border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Mail className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-white mb-2">Email</h3>
                        <p className="text-gray-300 mb-1">info@altmanbrothers.com</p>
                        <p className="text-gray-300">listings@altmanbrothers.com</p>
                        <p className="text-sm text-gray-500 mt-2">We respond within 2 hours during business hours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/80 border border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-white mb-2">Office Location</h3>
                        <p className="text-gray-300">
                          123 Real Estate Blvd
                          <br />
                          Beverly Hills, CA 90210
                        </p>
                        <p className="text-sm text-gray-500 mt-2">By appointment only</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/80 border border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Clock className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-white mb-2">Business Hours</h3>
                        <div className="text-gray-300 space-y-1">
                          <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                          <p>Saturday: 10:00 AM - 5:00 PM</p>
                          <p>Sunday: By Appointment</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Quick Actions</h3>

                  <Button 
                    onClick={() => setActiveTab('appointment')}
                    className="w-full justify-start bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black" 
                    variant="outline"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Appointment
                  </Button>

                  <Button asChild className="w-full justify-start bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black" variant="outline">
                    <a href="tel:+15551234567">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </a>
                  </Button>

                  <Button asChild className="w-full justify-start bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black" variant="outline">
                    <a href="sms:+15551234567">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Send Text
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Visit Our Office</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Located in the heart of Beverly Hills, our office is easily accessible and equipped with everything
                needed for your real estate consultation.
              </p>
            </div>

            <Card className="overflow-hidden bg-black/80 border border-gray-800">
              <div className="h-96 bg-gray-800 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <MapPin className="w-12 h-12 mx-auto mb-4" />
                  <p>Interactive Map</p>
                  <p className="text-sm">123 Real Estate Blvd, Beverly Hills, CA 90210</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet the Team</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Get to know the experts who will be helping you with your real estate needs.
              </p>
            </div>

            {teamLoading ? (
              <div className="text-center py-12">
                <div className="text-white text-xl">Loading team members...</div>
              </div>
            ) : teamMembers.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-white text-xl">No team members available</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {teamMembers.map((member, index) => (
                  <Card key={member.id} className="bg-gray-900 border-gray-800 hover:border-[#D4AF37] transition-all group">
                    <CardContent className="p-0">
                      <div className="aspect-[3/4] relative overflow-hidden">
                        <Image
                          src={member.image_url || `/placeholder.svg?height=400&width=300&text=${member.name}`}
                          alt={member.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <h3 className="text-2xl font-bold mb-2 group-hover:text-[#D4AF37] transition-colors">
                            {member.name.toUpperCase()}
                          </h3>
                          <p className="text-[#D4AF37] text-sm font-medium tracking-wide mb-2">{member.title.toUpperCase()}</p>
                          {member.bio && (
                            <p className="text-gray-300 text-sm line-clamp-3">{member.bio}</p>
                          )}
                          <div className="flex items-center space-x-4 mt-4">
                            {member.email && (
                              <a 
                                href={`mailto:${member.email}`}
                                className="text-[#D4AF37] hover:text-white transition-colors"
                              >
                                <Mail className="w-4 h-4" />
                              </a>
                            )}
                            {member.phone && (
                              <a 
                                href={`tel:${member.phone}`}
                                className="text-[#D4AF37] hover:text-white transition-colors"
                              >
                                <Phone className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Quick answers to common questions about our services and process.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="bg-black/80 border border-gray-800">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-white mb-3">How quickly can you respond to inquiries?</h3>
                  <p className="text-gray-300">
                    We typically respond to all inquiries within 2 hours during business hours and within 24 hours on
                    weekends.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/80 border border-gray-800">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-white mb-3">Do you offer virtual consultations?</h3>
                  <p className="text-gray-300">
                    Yes, we offer virtual consultations via video call for your convenience, especially for initial
                    discussions and follow-ups.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/80 border border-gray-800">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-white mb-3">What areas do you serve?</h3>
                  <p className="text-gray-300">
                    We primarily serve Beverly Hills, West Hollywood, Malibu, and surrounding luxury markets in Los
                    Angeles County.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/80 border border-gray-800">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-white mb-3">Is there a consultation fee?</h3>
                  <p className="text-gray-300">
                    Initial consultations are complimentary. We believe in providing value upfront and earning your
                    business through our expertise.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
