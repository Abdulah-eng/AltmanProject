import { Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Company Info */}
            <div className="text-center md:text-left">
              <div className="text-2xl sm:text-3xl font-bold text-[#D4AF37] tracking-wider mb-6 sm:mb-8">HOMES OF HOLLYWOOD</div>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-center md:justify-start space-x-3">
                  <Phone className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-base sm:text-lg font-semibold">310.819.3250</span>
                </div>

                <div className="flex items-center justify-center md:justify-start space-x-3">
                  <Mail className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-sm sm:text-base">INFO@HOMESOFHOLLYWOOD.COM</span>
                </div>
              </div>
            </div>

            {/* Office Location */}
            <div className="text-center md:text-left">
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-3 mb-4">
                    <MapPin className="w-5 h-5 text-[#D4AF37] md:mt-1" />
                    <div>
                      <div className="font-semibold text-white mb-1 text-sm sm:text-base">WEST HOLLYWOOD OFFICE</div>
                      <div className="text-gray-300 text-xs sm:text-sm">9000 W SUNSET BLVD #1100, WEST HOLLYWOOD, CA 90069</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Areas & Partners */}
            <div className="text-center md:text-left">
              <div className="mb-6 sm:mb-8">
                <div className="grid grid-cols-2 gap-3 sm:gap-4 text-sm">
                  <div>
                    <div className="text-[#D4AF37] font-semibold mb-2 text-sm">LOS ANGELES</div>
                    <div className="text-[#D4AF37] font-semibold mb-2 text-sm">BEVERLY HILLS</div>
                    <div className="text-[#D4AF37] font-semibold mb-2 text-sm">WEST HOLLYWOOD</div>
                    <div className="text-[#D4AF37] font-semibold text-sm">MALIBU</div>
                  </div>
                </div>
              </div>

              {/* Partner Logos */}
              <div className="space-y-4 sm:space-y-6">
                <div className="text-[#D4AF37] text-sm font-semibold">
                  matterport
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="text-white text-sm">CUSTOM WEBSITE DESIGN BY</div>
                <div className="text-[#D4AF37] font-bold">AGENT IMAGE</div>
              </div>

              <div className="text-xs text-gray-400 text-center lg:text-right max-w-2xl">
                150 EL CAMINO DRIVE, BEVERLY HILLS, CA 90212. 310.595.3893 © 2025 DOUGLAS ELLIMAN REAL ESTATE ®. ALL
                MATERIAL PRESENTED HEREIN IS INTENDED FOR INFORMATION PURPOSES ONLY. WHILE, THIS INFORMATION IS BELIEVED
                TO BE CORRECT, IT IS REPRESENTED SUBJECT TO ERRORS, OMISSIONS, CHANGES OR WITHDRAWAL WITHOUT NOTICE.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
