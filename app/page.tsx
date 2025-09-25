import { HeroSection } from "@/components/hero-section"
import { FeaturedProperties } from "@/components/featured-properties"
import { WildfireSupport } from "@/components/wildfire-support"
import { PropertyManagementServices } from "@/components/property-management-services"
import { PremierNeighborhoodsSection } from "@/components/premier-neighborhoods-section"
import { NewDevelopmentsSection } from "@/components/new-developments-section"
import { RealEstateInsightsSection } from "@/components/real-estate-insights-section"

import { AboutDonAdamsSection } from "@/components/about-don-adams-section"
import { WhyChooseDonAdamsSection } from "@/components/why-choose-don-adams-section"
import { SpecialOffersSection } from "@/components/special-offers-section"
import { BlogSection } from "@/components/blog-section"
import { ContactSection } from "@/components/contact-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AIChatbot } from "@/components/ai-chatbot"
import { createServerClient } from "@/lib/supabase/server"

export default async function HomePage() {
  let heroData = null
  let blogs = null
  let testimonials = null
  let neighborhoods = null
  let newDevelopments = null
  let properties = null
  let insights = null

  try {
    const supabase = await createServerClient()

    // Try to fetch data, but don't fail if Supabase isn't configured
    const heroResult = await supabase.from("hero_content").select("*").single()
    heroData = heroResult.data

    const blogsResult = await supabase
      .from("blogs")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(3)
    blogs = blogsResult.data

    const testimonialsResult = await supabase
      .from("testimonials")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
    testimonials = testimonialsResult.data

    // Neighborhoods now handled by IDX widget
    neighborhoods = null

    // Fetch featured new developments
    const newDevelopmentsResult = await supabase
      .from("new_developments")
      .select("*")
      .eq("featured", true)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false })
    newDevelopments = newDevelopmentsResult.data

    // Properties now handled by IDX widget
    properties = null

    // Fetch featured insights
    const insightsResult = await supabase
      .from("real_estate_insights")
      .select("*")
      .eq("featured", true)
      .eq("published", true)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false })
      .limit(3)
    insights = insightsResult.data
  } catch (error) {
    console.log("Database not configured, using default data")
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection data={heroData} />
        <FeaturedProperties properties={properties} />
        <PremierNeighborhoodsSection neighborhoods={neighborhoods} />
        <NewDevelopmentsSection developments={newDevelopments} />
        <RealEstateInsightsSection insights={insights} />
        <WildfireSupport />
        <AboutDonAdamsSection />
        <WhyChooseDonAdamsSection />
        <SpecialOffersSection />
        <PropertyManagementServices />
        <BlogSection blogs={blogs} />
        <ContactSection />
      </main>
      <Footer />
      <AIChatbot />
    </div>
  )
}
