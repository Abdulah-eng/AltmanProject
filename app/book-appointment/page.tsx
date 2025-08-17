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
    <div className="min-h-screen bg-black">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-black text-white relative">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="text-[#D4AF37] text-lg md:text-xl font-light tracking-[0.2em] mb-4">
              SCHEDULE YOUR CONSULTATION
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Book Your Appointment
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-300">
              Schedule a consultation with our expert real estate team and take the first step towards your property goals.
            </p>
          </div>
        </section>

        {/* Appointment Form */}
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Form */}
                <div className="lg:col-span-2">
                  <Card className="shadow-xl border-0 bg-gray-800 border-gray-700">
                    <CardHeader className="text-center pb-8 border-b border-gray-700">
                      <CardTitle className="text-3xl text-white">Schedule Your Consultation</CardTitle>
                      <p className="text-gray-300">Fill out the form below and we'll get back to you within 24 hours</p>
                    </CardHeader>
                    <CardContent className="p-8">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Information */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Personal Information</h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">First Name *</label>
                              <Input 
                                placeholder="John" 
                                value={formData.firstName}
                                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                required 
                                className="h-12 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Last Name *</label>
                              <Input 
                                placeholder="Doe" 
                                value={formData.lastName}
                                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                required 
                                className="h-12 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                              />
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                              <Input 
                                type="email" 
                                placeholder="john@example.com" 
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                required 
                                className="h-12 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                              <Input 
                                placeholder="(555) 123-4567" 
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                required 
                                className="h-12 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Service & Schedule */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Service & Schedule</h3>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Service Type *</label>
                            <Select 
                              onValueChange={(value) => setFormData({...formData, serviceType: value})}
                            >
                              <SelectTrigger className="h-12 bg-gray-700 border-gray-600 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]">
                                <SelectValue placeholder="Select service type" />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-gray-700">
                                {serviceTypes.map((service) => (
                                  <SelectItem key={service.value} value={service.value} className="text-white hover:bg-gray-700 focus:bg-gray-700">
                                    <div>
                                      <div className="font-medium">{service.label}</div>
                                      <div className="text-sm text-gray-400">{service.description}</div>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Date *</label>
                              <Input 
                                type="date" 
                                value={formData.date}
                                onChange={(e) => setFormData({...formData, date: e.target.value})}
                                min={new Date().toISOString().split('T')[0]}
                                required 
                                className="h-12 bg-gray-700 border-gray-600 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Time *</label>
                              <Select 
                                onValueChange={(value) => setFormData({...formData, time: value})}
                              >
                                <SelectTrigger className="h-12 bg-gray-700 border-gray-600 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]">
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-700">
                                  {timeSlots.map((time) => (
                                    <SelectItem key={time} value={time} className="text-white hover:bg-gray-700 focus:bg-gray-700">
                                      {time}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Meeting Location</label>
                            <Select 
                              onValueChange={(value) => setFormData({...formData, location: value})}
                            >
                              <SelectTrigger className="h-12 bg-gray-700 border-gray-600 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]">
                                <SelectValue placeholder="Select meeting location" />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-gray-700">
                                <SelectItem value="office" className="text-white hover:bg-gray-700 focus:bg-gray-700">Our Office (Beverly Hills)</SelectItem>
                                <SelectItem value="virtual" className="text-white hover:bg-gray-700 focus:bg-gray-700">Virtual Meeting (Video Call)</SelectItem>
                                <SelectItem value="property" className="text-white hover:bg-gray-700 focus:bg-gray-700">At Property Location</SelectItem>
                                <SelectItem value="coffee" className="text-white hover:bg-gray-700 focus:bg-gray-700">Coffee Shop Meeting</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Additional Information */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Additional Information</h3>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Message (Optional)</label>
                            <Textarea
                              placeholder="Tell us about your specific needs, questions, or any additional information..."
                              className="min-h-[120px] bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                              value={formData.message}
                              onChange={(e) => setFormData({...formData, message: e.target.value})}
                            />
                          </div>
                        </div>

                        <Button type="submit" className="w-full h-14 text-lg font-semibold bg-[#D4AF37] hover:bg-[#B8941F] text-black border-0" disabled={loading}>
                          {loading ? "Booking Appointment..." : "Book Appointment"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                  {/* Why Choose Us */}
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="border-b border-gray-700">
                      <CardTitle className="text-xl text-white">Why Choose Homes of Hollywood?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-white">Expert Consultation</h4>
                          <p className="text-sm text-gray-300">Get personalized advice from experienced real estate professionals</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-white">Flexible Scheduling</h4>
                          <p className="text-sm text-gray-300">Book appointments that fit your schedule, including evenings and weekends</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-white">Multiple Meeting Options</h4>
                          <p className="text-sm text-gray-300">Meet in person, virtually, or at your property location</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-white">No Obligation</h4>
                          <p className="text-sm text-gray-300">Initial consultations are complimentary with no pressure to commit</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contact Info */}
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="border-b border-gray-700">
                      <CardTitle className="text-xl text-white">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-[#D4AF37]" />
                        <div>
                          <p className="font-medium text-white">(555) 123-4567</p>
                          <p className="text-sm text-gray-300">Available 7 days a week</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-[#D4AF37]" />
                        <div>
                          <p className="font-medium text-white">info@homesofhollywood.com</p>
                          <p className="text-sm text-gray-300">Response within 2 hours</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-[#D4AF37]" />
                        <div>
                          <p className="font-medium text-white">123 Real Estate Blvd</p>
                          <p className="text-sm text-gray-300">Beverly Hills, CA 90210</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Business Hours */}
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="border-b border-gray-700">
                      <CardTitle className="text-xl text-white">Business Hours</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Monday - Friday</span>
                          <span className="font-medium text-white">9:00 AM - 7:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Saturday</span>
                          <span className="font-medium text-white">10:00 AM - 5:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Sunday</span>
                          <span className="font-medium text-white">By Appointment</span>
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
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Common questions about booking appointments with me.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-white mb-3">How long does a consultation typically last?</h3>
                  <p className="text-gray-300">
                    Initial consultations usually last 30-45 minutes, depending on the complexity of your needs and questions.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-white mb-3">What should I prepare for my appointment?</h3>
                  <p className="text-gray-300">
                    Bring any relevant documents, questions, and be ready to discuss your goals, timeline, and budget.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-white mb-3">Can I reschedule my appointment?</h3>
                  <p className="text-gray-300">
                    Yes, you can reschedule up to 24 hours before your appointment. Contact us to make changes.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-white mb-3">Is there a cancellation fee?</h3>
                  <p className="text-gray-300">
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