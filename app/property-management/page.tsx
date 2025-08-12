"use client"

import { ArrowLeft, Building2, Briefcase, Users, Wrench, Shield, DollarSign, FileText, Home, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PropertyManagementPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Button variant="ghost" asChild className="mb-8 text-[#D4AF37] hover:text-white hover:bg-[#D4AF37]/10 transition-all duration-300">
              <Link href="/"><ArrowLeft className="w-4 h-4 mr-2" />Back to Home</Link>
            </Button>
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-wide">PROPERTY MANAGEMENT</h1>
              <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
              <p className="text-lg text-[#D4AF37] max-w-2xl mx-auto leading-relaxed">
                Professional management solutions for residential and commercial properties in Los Angeles
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Potential Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-left">
                Maximize Your Investment Property's Potential
              </h2>
              <div className="w-16 h-1 bg-[#D4AF37] mb-12"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="animate-fade-in-up animate-stagger-1">
              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p>
                  With hands-on experience in property management gained through years of working with investment properties, 
                  Don Adams offers comprehensive management services that protect your investment while maximizing returns.
                </p>
                <p>
                  Our property management approach combines practical experience with personalized service, ensuring your 
                  property receives the attention it deserves. From tenant screening to maintenance coordination, we handle 
                  every aspect of property management so you don't have to.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Management Fee Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="animate-fade-in-up animate-stagger-2">
              <Card className="bg-gray-900 border-gray-800 shadow-2xl">
                <CardContent className="p-12 text-center">
                  <h3 className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-6">
                    Property Management Fee: 7%
                  </h3>
                  <p className="text-lg text-white leading-relaxed">
                    Our straightforward fee structure is 7% of monthly rent collected, with no hidden costs or surprise charges.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Residential Properties */}
              <div className="animate-fade-in-up animate-stagger-1">
                <Card className="bg-gray-800 border-gray-700 shadow-2xl h-full">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6">
                      <Building2 className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-xl font-bold text-[#D4AF37] mb-4">Residential Properties</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Single-family homes, condos, and multi-unit buildings
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Commercial Properties */}
              <div className="animate-fade-in-up animate-stagger-2">
                <Card className="bg-gray-800 border-gray-700 shadow-2xl h-full">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6">
                      <Briefcase className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-xl font-bold text-[#D4AF37] mb-4">Commercial Properties</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Retail spaces, offices, and mixed-use buildings
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Investor Services */}
              <div className="animate-fade-in-up animate-stagger-3">
                <Card className="bg-gray-800 border-gray-700 shadow-2xl h-full">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6">
                      <Users className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-xl font-bold text-[#D4AF37] mb-4">Investor Services</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Portfolio management and investment consulting
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Our Property Management Services</h2>
              <div className="w-16 h-1 bg-[#D4AF37] mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                {/* Tenant Screening & Placement */}
                <div className="animate-fade-in-up animate-stagger-1">
                  <Card className="bg-gray-900 border-gray-800 shadow-2xl">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0">
                          <Users className="w-6 h-6 text-black" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-3">Tenant Screening & Placement</h3>
                          <p className="text-gray-300 leading-relaxed">
                            We find qualified tenants through comprehensive screening including credit checks, background checks, 
                            employment verification, and rental history. Our thorough process ensures reliable tenants who pay on 
                            time and take care of your property.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Maintenance & Repairs */}
                <div className="animate-fade-in-up animate-stagger-2">
                  <Card className="bg-gray-900 border-gray-800 shadow-2xl">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0">
                          <Wrench className="w-6 h-6 text-black" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-3">Maintenance & Repairs</h3>
                          <p className="text-gray-300 leading-relaxed">
                            We coordinate all maintenance and repairs with trusted contractors at competitive rates. Our proactive 
                            maintenance approach prevents small issues from becoming costly problems, protecting your property's value.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Lease Enforcement & Legal Issues */}
                <div className="animate-fade-in-up animate-stagger-3">
                  <Card className="bg-gray-900 border-gray-800 shadow-2xl">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0">
                          <Shield className="w-6 h-6 text-black" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-3">Lease Enforcement & Legal Issues</h3>
                          <p className="text-gray-300 leading-relaxed">
                            We enforce all lease terms and handle tenant issues promptly. When necessary, we manage the eviction 
                            process in full compliance with state and local laws, protecting your interests throughout.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Rent Collection & Financial Reporting */}
                <div className="animate-fade-in-up animate-stagger-1">
                  <Card className="bg-gray-900 border-gray-800 shadow-2xl">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0">
                          <DollarSign className="w-6 h-6 text-black" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-3">Rent Collection & Financial Reporting</h3>
                          <p className="text-gray-300 leading-relaxed">
                            Our streamlined rent collection process ensures on-time payments. We provide detailed monthly financial 
                            statements, annual reports for tax purposes, and handle security deposits in compliance with state laws.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Inspections & Compliance */}
                <div className="animate-fade-in-up animate-stagger-2">
                  <Card className="bg-gray-900 border-gray-800 shadow-2xl">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0">
                          <FileText className="w-6 h-6 text-black" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-3">Inspections & Compliance</h3>
                          <p className="text-gray-300 leading-relaxed">
                            Regular property inspections ensure your property is being properly maintained. We handle all compliance 
                            issues with local regulations, building codes, and housing laws to keep your property legally compliant.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Investment Consulting */}
                <div className="animate-fade-in-up animate-stagger-3">
                  <Card className="bg-gray-900 border-gray-800 shadow-2xl">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0">
                          <Home className="w-6 h-6 text-black" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-3">Investment Consulting</h3>
                          <p className="text-gray-300 leading-relaxed">
                            Leverage our experience to make informed decisions about property improvements, market trends, and 
                            investment strategies. We provide guidance on maximizing returns and building your real estate portfolio.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Why Choose Don Adams for Property Management</h2>
              <div className="w-16 h-1 bg-[#D4AF37] mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Panel */}
              <div className="animate-fade-in-up animate-stagger-1">
                <Card className="bg-gray-800 border-gray-700 shadow-2xl h-full">
                  <CardContent className="p-8">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#D4AF37] mt-1 flex-shrink-0" />
                        <p className="text-gray-300">Hands-on experience with property rehabilitation and maintenance</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#D4AF37] mt-1 flex-shrink-0" />
                        <p className="text-gray-300">Practical knowledge of working with contractors and city inspectors</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#D4AF37] mt-1 flex-shrink-0" />
                        <p className="text-gray-300">Experience in tenant relations and conflict resolution</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#D4AF37] mt-1 flex-shrink-0" />
                        <p className="text-gray-300">Transparent fee structure with no hidden costs</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Panel */}
              <div className="animate-fade-in-up animate-stagger-2">
                <Card className="bg-gray-800 border-gray-700 shadow-2xl h-full">
                  <CardContent className="p-8">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#D4AF37] mt-1 flex-shrink-0" />
                        <p className="text-gray-300">Personalized service tailored to your specific property needs</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#D4AF37] mt-1 flex-shrink-0" />
                        <p className="text-gray-300">Detailed knowledge of Los Angeles neighborhoods and market trends</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#D4AF37] mt-1 flex-shrink-0" />
                        <p className="text-gray-300">Regular communication and responsive service</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#D4AF37] mt-1 flex-shrink-0" />
                        <p className="text-gray-300">Commitment to maximizing your property's potential and ROI</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="animate-fade-in-up">
              <Card className="bg-gray-900 border-gray-800 shadow-2xl">
                <CardContent className="p-12">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="text-center lg:text-left">
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to simplify your property management?
                      </h3>
                      <p className="text-lg text-gray-300">
                        Contact Don Adams today for a free property management consultation.
                      </p>
                    </div>
                    <Button className="bg-[#D4AF37] text-black hover:bg-[#B8941F] transition-all duration-300 font-bold px-8 py-4 text-lg">
                      GET STARTED
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
