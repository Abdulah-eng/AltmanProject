import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Search, DollarSign, FileText, Key, TrendingUp } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      icon: Search,
      title: "Property Search",
      description: "Find your perfect luxury home with our comprehensive search and personalized recommendations.",
    },
    {
      icon: DollarSign,
      title: "Property Valuation",
      description: "Get accurate market valuations and pricing strategies for your luxury property.",
    },
    {
      icon: FileText,
      title: "Contract Negotiation",
      description: "Expert negotiation to ensure you get the best deal possible in luxury markets.",
    },
    {
      icon: Key,
      title: "Property Management",
      description: "Full-service luxury property management for investors and high-net-worth clients.",
    },
    {
      icon: TrendingUp,
      title: "Investment Consulting",
      description: "Strategic advice for luxury real estate investments and portfolio growth.",
    },
    {
      icon: Home,
      title: "Luxury Homes",
      description: "Specialized service for ultra-luxury and high-end property transactions.",
    },
  ]

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="text-[#D4AF37] text-sm tracking-[0.3em] mb-4">OUR SERVICES</div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-wide">LUXURY REAL ESTATE SERVICES</h2>
          <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive luxury real estate services tailored to meet the unique needs of our discerning clientele.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-black border-gray-800 hover:border-[#D4AF37] transition-all duration-300 group"
            >
              <CardHeader className="pb-4">
                <service.icon className="w-12 h-12 text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="text-xl text-white group-hover:text-[#D4AF37] transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
