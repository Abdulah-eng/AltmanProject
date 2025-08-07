"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, Phone, Mail, CheckCircle } from "lucide-react"
import { toast } from "sonner"

export default function BookAppointmentPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    serviceType: "",
    date: "",
    time: "",
    location: "",
    message: "",
  })

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ]

  const serviceTypes = [
    { value: "buying", label: "Home Buying", description: "Find your dream home" },
    { value: "selling", label: "Home Selling", description: "Sell your property for maximum value" },
    { value: "investment", label: "Investment Consulting", description: "Real estate investment strategies" },
    { value: "valuation", label: "Property Valuation", description: "Get accurate property assessments" },
    { value: "consultation", label: "General Consultation", description: "Expert advice on real estate matters" },
    { value: "market_analysis", label: "Market Analysis", description: "Comprehensive market insights" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          service_type: formData.serviceType,
          appointment_date: formData.date,
          appointment_time: formData.time,
          location: formData.location,
          message: formData.message,
          status: "pending",
        }),
      })

      if (response.ok) {
        toast.success("Appointment booked successfully! You'll receive a confirmation email shortly.")
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          serviceType: "",
          date: "",
          time: "",
          location: "",
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
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Book Your Appointment</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Schedule a consultation with our expert real estate team and take the first step towards your property goals.
            </p>
          </div>
        </section>

        {/* Appointment Form */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Form */}
                <div className="lg:col-span-2">
                  <Card className="shadow-xl border-0">
                    <CardHeader className="text-center pb-8">
                      <CardTitle className="text-3xl text-gray-900">Schedule Your Consultation</CardTitle>
                      <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours</p>
                    </CardHeader>
                    <CardContent className="p-8">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Information */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                              <Input 
                                placeholder="John" 
                                value={formData.firstName}
                                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                required 
                                className="h-12"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                              <Input 
                                placeholder="Doe" 
                                value={formData.lastName}
                                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                required 
                                className="h-12"
                              />
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                              <Input 
                                type="email" 
                                placeholder="john@example.com" 
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                required 
                                className="h-12"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                              <Input 
                                placeholder="(555) 123-4567" 
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                required 
                                className="h-12"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Service & Schedule */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Service & Schedule</h3>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Service Type *</label>
                            <Select 
                              onValueChange={(value) => setFormData({...formData, serviceType: value})}
                            >
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select service type" />
                              </SelectTrigger>
                              <SelectContent>
                                {serviceTypes.map((service) => (
                                  <SelectItem key={service.value} value={service.value}>
                                    <div>
                                      <div className="font-medium">{service.label}</div>
                                      <div className="text-sm text-gray-500">{service.description}</div>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date *</label>
                              <Input 
                                type="date" 
                                value={formData.date}
                                onChange={(e) => setFormData({...formData, date: e.target.value})}
                                min={new Date().toISOString().split('T')[0]}
                                required 
                                className="h-12"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time *</label>
                              <Select 
                                onValueChange={(value) => setFormData({...formData, time: value})}
                              >
                                <SelectTrigger className="h-12">
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                                <SelectContent>
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
                            <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Location</label>
                            <Select 
                              onValueChange={(value) => setFormData({...formData, location: value})}
                            >
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select meeting location" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="office">Our Office (Beverly Hills)</SelectItem>
                                <SelectItem value="virtual">Virtual Meeting (Video Call)</SelectItem>
                                <SelectItem value="property">At Property Location</SelectItem>
                                <SelectItem value="coffee">Coffee Shop Meeting</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Additional Information */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Additional Information</h3>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
                            <Textarea
                              placeholder="Tell us about your specific needs, questions, or any additional information..."
                              className="min-h-[120px]"
                              value={formData.message}
                              onChange={(e) => setFormData({...formData, message: e.target.value})}
                            />
                          </div>
                        </div>

                        <Button type="submit" className="w-full h-14 text-lg font-semibold" disabled={loading}>
                          {loading ? "Booking Appointment..." : "Book Appointment"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                  {/* Why Choose Us */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Why Choose Homes of Hollywood?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-gray-900">Expert Consultation</h4>
                          <p className="text-sm text-gray-600">Get personalized advice from experienced real estate professionals</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-gray-900">Flexible Scheduling</h4>
                          <p className="text-sm text-gray-600">Book appointments that fit your schedule, including evenings and weekends</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-gray-900">Multiple Meeting Options</h4>
                          <p className="text-sm text-gray-600">Meet in person, virtually, or at your property location</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-gray-900">No Obligation</h4>
                          <p className="text-sm text-gray-600">Initial consultations are complimentary with no pressure to commit</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contact Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">(555) 123-4567</p>
                          <p className="text-sm text-gray-600">Available 7 days a week</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">info@homesofhollywood.com</p>
                          <p className="text-sm text-gray-600">Response within 2 hours</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">123 Real Estate Blvd</p>
                          <p className="text-sm text-gray-600">Beverly Hills, CA 90210</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Business Hours */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Business Hours</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Monday - Friday</span>
                          <span className="font-medium">9:00 AM - 7:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Saturday</span>
                          <span className="font-medium">10:00 AM - 5:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Sunday</span>
                          <span className="font-medium">By Appointment</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Common questions about booking appointments with our team.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">How long does a consultation typically last?</h3>
                  <p className="text-gray-600">
                    Initial consultations usually last 30-45 minutes, depending on the complexity of your needs and questions.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">What should I prepare for my appointment?</h3>
                  <p className="text-gray-600">
                    Bring any relevant documents, questions, and be ready to discuss your goals, timeline, and budget.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Can I reschedule my appointment?</h3>
                  <p className="text-gray-600">
                    Yes, you can reschedule up to 24 hours before your appointment. Contact us to make changes.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Is there a cancellation fee?</h3>
                  <p className="text-gray-600">
                    No cancellation fees for appointments cancelled with at least 24 hours notice.
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