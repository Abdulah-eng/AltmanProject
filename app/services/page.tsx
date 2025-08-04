"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Search,
  DollarSign,
  FileText,
  Key,
  TrendingUp,
  Users,
  Calculator,
  Camera,
  Handshake,
  Shield,
  Clock,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getImageByKey, ImageData } from "@/lib/image-utils"

export default function ServicesPage() {
  const [processImage, setProcessImage] = useState<ImageData | null>(null)
  const [loading, setLoading] = useState(true)
  const services = [
    {
      icon: Search,
      title: "Property Search & Acquisition",
      description: "Comprehensive property search services tailored to your specific needs and budget.",
      features: ["Market Analysis", "Property Tours", "Negotiation Support", "Due Diligence"],
      price: "Commission Based",
    },
    {
      icon: DollarSign,
      title: "Property Valuation & Pricing",
      description: "Accurate market valuations and strategic pricing for optimal results.",
      features: ["Comparative Market Analysis", "Property Appraisal", "Market Trends Analysis", "Pricing Strategy"],
      price: "Free Consultation",
    },
    {
      icon: FileText,
      title: "Contract Negotiation",
      description: "Expert negotiation services to ensure you get the best possible deal.",
      features: ["Contract Review", "Terms Negotiation", "Contingency Management", "Closing Coordination"],
      price: "Included in Service",
    },
    {
      icon: Key,
      title: "Property Management",
      description: "Full-service property management for investors and landlords.",
      features: ["Tenant Screening", "Rent Collection", "Maintenance Coordination", "Financial Reporting"],
      price: "8-12% of Rent",
    },
    {
      icon: TrendingUp,
      title: "Investment Consulting",
      description: "Strategic advice for real estate investments and portfolio growth.",
      features: ["Investment Analysis", "Portfolio Review", "Market Opportunities", "ROI Optimization"],
      price: "Hourly or Project",
    },
    {
      icon: Home,
      title: "Luxury Home Specialist",
      description: "Specialized service for luxury and high-end property transactions.",
      features: ["Luxury Marketing", "High-Net-Worth Clients", "Discretion & Privacy", "Global Network"],
      price: "Premium Service",
    },
  ]

  const additionalServices = [
    {
      icon: Users,
      title: "First-Time Buyer Program",
      description: "Specialized guidance for first-time homebuyers",
    },
    {
      icon: Calculator,
      title: "Mortgage Consultation",
      description: "Connect with trusted lending partners",
    },
    {
      icon: Camera,
      title: "Professional Photography",
      description: "High-quality listing photography and virtual tours",
    },
    {
      icon: Handshake,
      title: "Relocation Services",
      description: "Comprehensive support for relocating clients",
    },
    {
      icon: Shield,
      title: "Legal Support",
      description: "Access to experienced real estate attorneys",
    },
    {
      icon: Clock,
      title: "24/7 Client Support",
      description: "Round-the-clock availability for urgent matters",
    },
  ]

  useEffect(() => {
    fetchPageData()
  }, [])

  const fetchPageData = async () => {
    try {
      // Fetch process image
      const process = await getImageByKey('process_image')
      if (process) setProcessImage(process)
    } catch (error) {
      console.error('Error fetching services page data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getProcessImageUrl = () => {
    return processImage?.url || "/placeholder.svg?height=500&width=600"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Comprehensive real estate services designed to exceed your expectations and deliver exceptional results.
            </p>
          </div>
        </section>

        {/* Main Services */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Core Services</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our comprehensive suite of real estate services covers every aspect of your property journey.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <service.icon className="w-12 h-12 text-blue-600 mb-4" />
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <Badge variant="secondary" className="w-fit">
                      {service.price}
                    </Badge>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">Includes:</h4>
                      <ul className="space-y-1">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-center">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Additional Services</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Complementary services to support your complete real estate experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalServices.map((service, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <service.icon className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Process</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A streamlined approach that ensures smooth transactions and exceptional results.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Initial Consultation</h3>
                      <p className="text-gray-600">
                        We start with a comprehensive consultation to understand your needs, goals, and timeline.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Strategy Development</h3>
                      <p className="text-gray-600">
                        We create a customized strategy tailored to your specific situation and market conditions.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Execution & Support</h3>
                      <p className="text-gray-600">
                        We execute the plan with precision while providing ongoing support and communication.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Successful Closing</h3>
                      <p className="text-gray-600">
                        We ensure a smooth closing process and continue our relationship for future real estate needs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Image
                  src={getProcessImageUrl()}
                  alt={processImage?.alt_text || "Real Estate Process"}
                  width={600}
                  height={500}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let us help you achieve your real estate goals with our comprehensive services and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/book-appointment">Schedule Consultation</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white text-white hover:bg-white hover:text-blue-900 bg-transparent"
              >
                <Link href="/contact">Contact Us Today</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
