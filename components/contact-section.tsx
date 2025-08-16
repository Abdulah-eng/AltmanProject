import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock, Calendar, MessageCircle, ArrowRight, Star } from "lucide-react"
import Image from "next/image"

export function ContactSection() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Animated Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#D4AF37] rounded-full animate-ping opacity-60" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#D4AF37] rounded-full animate-ping opacity-60" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-[#D4AF37] rounded-full animate-ping opacity-60" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        {/* Hero Header - Compact */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center space-x-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-4 py-2 rounded-full mb-4">
            <Star className="w-3 h-3 text-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] font-medium">PREMIUM SERVICE</span>
            <Star className="w-3 h-3 text-[#D4AF37]" />
          </div>
          <h2 className="text-white text-4xl md:text-6xl font-bold tracking-wider mb-4 leading-tight">
            LET'S CREATE
            <br />
            <span className="text-[#D4AF37]">SOMETHING</span>
            <br />
            EXTRAORDINARY
          </h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                          Ready to start your luxury real estate journey? I'm here to guide you through every step.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Contact Form - Compact */}
          <div className="lg:col-span-7">
            <Card className="bg-gray-900/50 backdrop-blur-sm border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-500 p-8 rounded-2xl shadow-2xl">
              <CardHeader className="text-center pb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#D4AF37]/10 rounded-full mb-4">
                  <MessageCircle className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <CardTitle className="text-white text-2xl font-light tracking-wider mb-2">SEND US A MESSAGE</CardTitle>
                <div className="w-12 h-px bg-[#D4AF37] mx-auto"></div>
                <p className="text-gray-400 mt-2 text-sm">We'll get back to you within 2 hours</p>
              </CardHeader>
              
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <Input
                        placeholder="FIRST NAME"
                        className="h-14 bg-transparent border-2 border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:border-[#D4AF37] focus:ring-0 text-base tracking-wide transition-all duration-300 group-hover:border-gray-600"
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#D4AF37]/0 to-[#D4AF37]/0 group-hover:from-[#D4AF37]/5 group-hover:to-[#D4AF37]/5 transition-all duration-300 pointer-events-none"></div>
                    </div>
                    <div className="relative group">
                      <Input
                        placeholder="LAST NAME"
                        className="h-14 bg-transparent border-2 border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:border-[#D4AF37] focus:ring-0 text-base tracking-wide transition-all duration-300 group-hover:border-gray-600"
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#D4AF37]/0 to-[#D4AF37]/0 group-hover:from-[#D4AF37]/5 group-hover:to-[#D4AF37]/5 transition-all duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <Input
                        placeholder="PHONE NUMBER"
                        className="h-14 bg-transparent border-2 border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:border-[#D4AF37] focus:ring-0 text-base tracking-wide transition-all duration-300 group-hover:border-gray-600"
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#D4AF37]/0 to-[#D4AF37]/0 group-hover:from-[#D4AF37]/5 group-hover:to-[#D4AF37]/5 transition-all duration-300 pointer-events-none"></div>
                    </div>
                    <div className="relative group">
                      <Input
                        placeholder="EMAIL ADDRESS"
                        type="email"
                        className="h-14 bg-transparent border-2 border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:border-[#D4AF37] focus:ring-0 text-base tracking-wide transition-all duration-300 group-hover:border-gray-600"
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#D4AF37]/0 to-[#D4AF37]/0 group-hover:from-[#D4AF37]/5 group-hover:to-[#D4AF37]/5 transition-all duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  <div className="relative group">
                    <Textarea
                      placeholder="TELL US ABOUT YOUR REAL ESTATE GOALS..."
                      className="min-h-[120px] bg-transparent border-2 border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:border-[#D4AF37] focus:ring-0 resize-none text-base tracking-wide transition-all duration-300 group-hover:border-gray-600"
                      required
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#D4AF37]/0 to-[#D4AF37]/0 group-hover:from-[#D4AF37]/5 group-hover:to-[#D4AF37]/5 transition-all duration-300 pointer-events-none"></div>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full h-14 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-black font-bold text-base tracking-[0.2em] transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      SEND MESSAGE
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information - Compact Grid */}
          <div className="lg:col-span-5">
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center lg:text-left mb-8">
                <h3 className="text-white text-2xl font-light tracking-wider mb-4">GET IN TOUCH</h3>
                <div className="w-12 h-px bg-[#D4AF37] lg:mx-0 mx-auto mb-4"></div>
                <p className="text-gray-400 text-base leading-relaxed">
                  Experience the difference of working with luxury real estate professionals.
                </p>
              </div>

              {/* Contact Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                {/* Phone Card */}
                <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-[#D4AF37]/40 transition-all duration-300 p-4 rounded-xl group hover:transform hover:-translate-y-1">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-full flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-all duration-300 flex-shrink-0">
                      <Phone className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white mb-2 text-sm tracking-wide">PHONE</h4>
                      <div className="space-y-1">
                        <p className="text-gray-300 text-sm font-medium">(555) 123-4567</p>
                        <p className="text-gray-300 text-sm font-medium">(555) 987-6543</p>
                        <p className="text-xs text-gray-500 tracking-wide">7 days, 8 AM - 8 PM PST</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Email Card */}
                <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-[#D4AF37]/40 transition-all duration-300 p-4 rounded-xl group hover:transform hover:-translate-y-1">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-full flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-all duration-300 flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white mb-2 text-sm tracking-wide">EMAIL</h4>
                      <div className="space-y-1">
                        <p className="text-gray-300 text-sm font-medium truncate">info@homesofhollywood.com</p>
                        <p className="text-gray-300 text-sm font-medium truncate">listings@homesofhollywood.com</p>
                        <p className="text-xs text-gray-500 tracking-wide">Response within 2 hours</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Office Card */}
                <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-[#D4AF37]/40 transition-all duration-300 p-4 rounded-xl group hover:transform hover:-translate-y-1">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-full flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-all duration-300 flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white mb-2 text-sm tracking-wide">OFFICE</h4>
                      <div className="space-y-1">
                        <p className="text-gray-300 text-sm">
                          123 Real Estate Blvd
                          <br />
                          Beverly Hills, CA 90210
                        </p>
                        <p className="text-xs text-gray-500 tracking-wide">By appointment only</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Hours Card */}
                <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-[#D4AF37]/40 transition-all duration-300 p-4 rounded-xl group hover:transform hover:-translate-y-1">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-full flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-all duration-300 flex-shrink-0">
                      <Clock className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white mb-2 text-sm tracking-wide">HOURS</h4>
                      <div className="text-gray-300 text-sm space-y-1">
                        <p>Mon-Fri: 9 AM - 7 PM</p>
                        <p>Sat: 10 AM - 5 PM</p>
                        <p>Sun: By Appointment</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Quick Actions - Compact */}
              <div className="space-y-3 pt-6">
                <h3 className="text-white text-lg font-semibold tracking-wide text-center lg:text-left">QUICK ACTIONS</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3">
                  <Button 
                    asChild
                    className="w-full justify-start bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-black h-12 text-sm tracking-wide rounded-xl font-bold transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl" 
                  >
                    <a href="/book-appointment">
                      <Calendar className="w-4 h-4 mr-2" />
                      SCHEDULE APPOINTMENT
                    </a>
                  </Button>

                  <Button 
                    asChild 
                    className="w-full justify-start bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black h-12 text-sm tracking-wide rounded-xl font-bold transition-all duration-300 transform hover:-translate-y-1" 
                    variant="outline"
                  >
                    <a href="tel:+15551234567">
                      <Phone className="w-4 h-4 mr-2" />
                      CALL NOW
                    </a>
                  </Button>

                  <Button 
                    asChild 
                    className="w-full justify-start bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black h-12 text-sm tracking-wide rounded-xl font-bold transition-all duration-300 transform hover:-translate-y-1 md:col-span-2 lg:col-span-1" 
                    variant="outline"
                  >
                    <a href="sms:+15551234567">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      SEND TEXT
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA - Compact */}
        <div className="mt-12 text-center animate-fade-in-up">
          <div className="inline-flex items-center justify-center bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-6 py-3 rounded-full">
            <div className="w-8 h-8 relative">
              <Image
                src="/logo.png.png"
                alt="Homes of Hollywood Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <p className="text-gray-400 mt-4 text-base">Where luxury meets exceptional service</p>
        </div>
      </div>
    </section>
  )
}
