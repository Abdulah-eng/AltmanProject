import { Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Company Info */}
            <div>
              <div className="text-3xl font-bold text-[#D4AF37] tracking-wider mb-8">THE ALTMAN BROTHERS</div>

              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-lg font-semibold">310.819.3250</span>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-[#D4AF37]" />
                  <span>INFO@THEALTMANBROTHERS.COM</span>
                </div>
              </div>
            </div>

            {/* Office Locations */}
            <div>
              <div className="space-y-8">
                <div>
                  <div className="flex items-start space-x-3 mb-4">
                    <MapPin className="w-5 h-5 text-[#D4AF37] mt-1" />
                    <div>
                      <div className="font-semibold text-white mb-1">LOS ANGELES OFFICE</div>
                      <div className="text-gray-300 text-sm">103 S ROBERTSON BLVD, LOS ANGELES, CA 90048</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start space-x-3 mb-4">
                    <MapPin className="w-5 h-5 text-[#D4AF37] mt-1" />
                    <div>
                      <div className="font-semibold text-white mb-1">ORANGE COUNTY FLAGSHIP OFFICE</div>
                      <div className="text-gray-300 text-sm">3700 EAST COAST HWY, CORONA DEL MAR, CA 92625</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-[#D4AF37] mt-1" />
                    <div>
                      <div className="font-semibold text-white mb-1">ORANGE COUNTY OFFICE #2</div>
                      <div className="text-gray-300 text-sm">3500 EAST COAST HWY, CORONA DEL MAR, CA 92625</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Areas & Partners */}
            <div>
              <div className="mb-8">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-[#D4AF37] font-semibold mb-2">LA | SF | NYC</div>
                    <div className="text-[#D4AF37] font-semibold mb-2">ASPEN | LAS VEGAS</div>
                    <div className="text-[#D4AF37] font-semibold mb-2">ORANGE COUNTY</div>
                    <div className="text-[#D4AF37] font-semibold">SAN DIEGO | ARIZONA*</div>
                  </div>
                </div>
              </div>

              {/* Partner Logos */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="text-[#D4AF37] font-bold text-lg">Douglas Elliman</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-[#D4AF37] text-black px-3 py-1 text-sm font-bold">bravo</div>
                </div>
                <div className="text-[#D4AF37] text-sm font-semibold">
                  MILLION DOLLAR
                  <br />
                  LISTING LOS ANGELES
                </div>
                <div className="text-[#D4AF37] text-sm font-semibold">matterport</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 py-8">
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
