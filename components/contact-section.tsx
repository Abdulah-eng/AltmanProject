import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export function ContactSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="text-[#D4AF37] text-sm tracking-[0.3em] mb-4">CONTACT US</div>
          <h2 className="text-white text-4xl md:text-6xl font-bold tracking-wider mb-8">GET IN TOUCH</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Ready to start your real estate journey? We're here to help you every step of the way.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-16">
          {/* Contact Form - Now takes 2/3 of the space */}
          <div className="lg:col-span-2 bg-black/40 backdrop-blur-sm border border-white/10 p-12 rounded-none">
            <div className="text-center mb-12">
              <h3 className="text-white text-2xl font-light tracking-wider mb-4">SEND US A MESSAGE</h3>
              <div className="w-16 h-px bg-[#D4AF37] mx-auto"></div>
            </div>
            
            <form className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative">
                  <Input
                    placeholder="FIRST NAME"
                    className="h-14 bg-transparent border-b-2 border-white/30 border-t-0 border-l-0 border-r-0 rounded-none text-white placeholder:text-gray-400 focus:border-[#D4AF37] focus:ring-0 text-lg tracking-wide"
                    required
                  />
                </div>
                <div className="relative">
                  <Input
                    placeholder="LAST NAME"
                    className="h-14 bg-transparent border-b-2 border-white/30 border-t-0 border-l-0 border-r-0 rounded-none text-white placeholder:text-gray-400 focus:border-[#D4AF37] focus:ring-0 text-lg tracking-wide"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative">
                  <Input
                    placeholder="PHONE NUMBER"
                    className="h-14 bg-transparent border-b-2 border-white/30 border-t-0 border-l-0 border-r-0 rounded-none text-white placeholder:text-gray-400 focus:border-[#D4AF37] focus:ring-0 text-lg tracking-wide"
                    required
                  />
                </div>
                <div className="relative">
                  <Input
                    placeholder="EMAIL ADDRESS"
                    type="email"
                    className="h-14 bg-transparent border-b-2 border-white/30 border-t-0 border-l-0 border-r-0 rounded-none text-white placeholder:text-gray-400 focus:border-[#D4AF37] focus:ring-0 text-lg tracking-wide"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <Textarea
                  placeholder="MESSAGE"
                  className="min-h-[140px] bg-transparent border-b-2 border-white/30 border-t-0 border-l-0 border-r-0 rounded-none text-white placeholder:text-gray-400 focus:border-[#D4AF37] focus:ring-0 resize-none text-lg tracking-wide"
                  required
                />
              </div>

              <div className="pt-8">
                <Button
                  type="submit"
                  className="w-full h-16 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-semibold text-lg tracking-[0.2em] transition-all duration-300"
                >
                  SEND MESSAGE
                </Button>
              </div>
            </form>
          </div>

          {/* Contact Information - Now takes 1/3 of the space */}
          <div className="space-y-10">
            <div>
              <h3 className="text-white text-2xl font-light tracking-wider mb-6">CONTACT INFORMATION</h3>
              <div className="w-16 h-px bg-[#D4AF37] mb-8"></div>
              <p className="text-gray-400 text-lg leading-relaxed">
                We're here to help you with all your real estate needs. Contact us today to schedule a consultation.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="w-8 h-8 text-[#D4AF37] mt-1 flex-shrink-0">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3 text-lg tracking-wide">PHONE</h4>
                  <p className="text-gray-300 mb-2 text-lg">(555) 123-4567</p>
                  <p className="text-gray-300 mb-3 text-lg">(555) 987-6543</p>
                  <p className="text-sm text-gray-500 tracking-wide">Available 7 days a week, 8 AM - 8 PM</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-8 h-8 text-[#D4AF37] mt-1 flex-shrink-0">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3 text-lg tracking-wide">EMAIL</h4>
                  <p className="text-gray-300 mb-2 text-lg">info@altmanbrothers.com</p>
                  <p className="text-gray-300 mb-3 text-lg">listings@altmanbrothers.com</p>
                  <p className="text-sm text-gray-500 tracking-wide">We respond within 2 hours during business hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-8 h-8 text-[#D4AF37] mt-1 flex-shrink-0">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3 text-lg tracking-wide">OFFICE LOCATION</h4>
                  <p className="text-gray-300 text-lg">
                    123 Real Estate Blvd
                    <br />
                    Beverly Hills, CA 90210
                  </p>
                  <p className="text-sm text-gray-500 mt-3 tracking-wide">By appointment only</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-8 h-8 text-[#D4AF37] mt-1 flex-shrink-0">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3 text-lg tracking-wide">BUSINESS HOURS</h4>
                  <div className="text-gray-300 text-lg space-y-1">
                    <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                    <p>Saturday: 10:00 AM - 5:00 PM</p>
                    <p>Sunday: By Appointment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6 pt-8">
              <h3 className="text-white text-lg font-semibold tracking-wide">QUICK ACTIONS</h3>

              <Button 
                asChild
                className="w-full justify-start bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black h-14 text-lg tracking-wide" 
                variant="outline"
              >
                <a href="/book-appointment">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  SCHEDULE APPOINTMENT
                </a>
              </Button>

              <Button asChild className="w-full justify-start bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black h-14 text-lg tracking-wide" variant="outline">
                <a href="tel:+15551234567">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  CALL NOW
                </a>
              </Button>

              <Button asChild className="w-full justify-start bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black h-14 text-lg tracking-wide" variant="outline">
                <a href="sms:+15551234567">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  SEND TEXT
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Logo at bottom */}
        <div className="mt-20 text-center">
          <div className="text-2xl font-bold text-[#D4AF37] tracking-wider">
            <span className="text-3xl">AB</span>
            <div className="text-sm leading-tight">
              THE ALTMAN
              <br />
              <span className="text-xs tracking-widest">BROTHERS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
