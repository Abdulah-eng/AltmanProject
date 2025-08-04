import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogPostContent } from "@/components/blog-post-content"
import { createServerClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let blog = null
  let relatedBlogs = null

  try {
    const supabase = await createServerClient()

    const blogResult = await supabase.from("blogs").select("*").eq("slug", params.slug).eq("published", true).single()
    blog = blogResult.data

    if (blog) {
      const relatedResult = await supabase.from("blogs").select("*").eq("published", true).neq("id", blog.id).limit(3)
      relatedBlogs = relatedResult.data
    }
  } catch (error) {
    console.log("Database not configured or blog not found")
  }

  // If no blog found, create a default one based on slug
  if (!blog) {
    const defaultBlogs = {
      "first-time-home-buyers-tips": {
        id: "1",
        title: "Top 10 Tips for First-Time Home Buyers",
        excerpt: "Essential advice for navigating your first home purchase successfully.",
        content: `Buying your first home is an exciting milestone, but it can also be overwhelming. Here are our top 10 tips to help you navigate the process successfully:

1. **Get Pre-Approved for a Mortgage**: Before you start house hunting, get pre-approved for a mortgage to understand your budget and show sellers you're serious.

2. **Research Neighborhoods**: Take time to research different neighborhoods, considering factors like schools, commute times, and future development plans.

3. **Work with a Qualified Agent**: A good real estate agent can guide you through the process and help you avoid common pitfalls.

4. **Don't Skip the Home Inspection**: A professional home inspection can reveal potential issues that could cost you thousands later.

5. **Budget for Closing Costs**: Remember to budget for closing costs, which typically range from 2-5% of the home's purchase price.

6. **Consider Future Needs**: Think about your future needs, not just your current situation. Will this home work for you in 5-10 years?

7. **Don't Rush**: Take your time to find the right home. It's better to wait for the right property than to settle for something that doesn't meet your needs.

8. **Understand the Market**: Learn about current market conditions in your area to make informed decisions about timing and pricing.

9. **Save for Unexpected Expenses**: Keep some money in reserve for unexpected expenses that may arise after closing.

10. **Stay Within Your Budget**: It's easy to get caught up in the excitement, but stick to your predetermined budget to avoid financial strain.

Remember, buying a home is one of the biggest financial decisions you'll make. Take your time, do your research, and don't hesitate to ask questions throughout the process.`,
        image_url: "/placeholder.svg?height=400&width=800&text=First Time Home Buyers",
        author: "Josh Altman",
        created_at: "2024-01-15",
        slug: "first-time-home-buyers-tips",
      },
      "market-trends-2024": {
        id: "2",
        title: "Market Trends: What to Expect in 2024",
        excerpt: "Our analysis of the current real estate market and predictions for the year ahead.",
        content: `The real estate market continues to evolve, and 2024 brings new opportunities and challenges. Here's our comprehensive analysis of what to expect:

**Interest Rate Outlook**
After significant increases in 2022 and 2023, interest rates are expected to stabilize in 2024. This could provide some relief for both buyers and sellers who have been waiting on the sidelines.

**Inventory Levels**
We anticipate a gradual increase in inventory as more sellers become comfortable with current market conditions. This should provide buyers with more options while maintaining healthy competition.

**Price Predictions**
While dramatic price increases are unlikely, we expect continued appreciation in desirable markets, particularly in areas with strong job growth and limited supply.

**Buyer Behavior**
Buyers are becoming more selective and taking longer to make decisions. This trend toward careful consideration is likely to continue throughout 2024.

**Technology Impact**
Virtual tours, AI-powered valuations, and digital transaction management will continue to reshape how real estate business is conducted.

**Regional Variations**
Different markets will experience varying conditions. Urban areas may see different trends compared to suburban and rural markets.

**Investment Opportunities**
For investors, 2024 may present opportunities in markets that have been overlooked during the recent volatility.

Stay informed and work with experienced professionals to navigate these changing conditions successfully.`,
        image_url: "/placeholder.svg?height=400&width=800&text=Market Trends 2024",
        author: "Matt Altman",
        created_at: "2024-01-10",
        slug: "market-trends-2024",
      },
      "home-staging-tips": {
        id: "3",
        title: "Staging Your Home for Maximum Appeal",
        excerpt: "Professional staging tips to help your home sell faster and for more money.",
        content: `Staging your home is one of the most effective ways to increase its appeal to potential buyers. Here are our professional staging tips:

**Declutter and Depersonalize**
Remove personal items, excess furniture, and clutter. Buyers need to envision themselves living in the space, not you.

**Focus on Curb Appeal**
First impressions matter. Ensure your home's exterior is well-maintained with fresh paint, trimmed landscaping, and a welcoming entrance.

**Highlight Key Features**
Draw attention to your home's best features, whether it's a fireplace, hardwood floors, or architectural details.

**Use Neutral Colors**
Neutral colors appeal to a broader range of buyers and create a clean, modern look.

**Maximize Natural Light**
Open curtains and blinds to let in natural light. Consider adding mirrors to reflect light and make spaces feel larger.

**Create Functional Spaces**
Show how each room can be used effectively. A spare bedroom could be staged as a home office or guest room.

**Invest in Professional Photography**
High-quality photos are essential for online listings and can significantly impact buyer interest.

**Consider Professional Staging**
For high-value properties, professional staging can provide a significant return on investment.

**Keep It Clean**
A spotless home shows pride of ownership and attention to detail.

**Add Finishing Touches**
Fresh flowers, scented candles, and tasteful accessories can make your home feel warm and inviting.

Remember, the goal of staging is to help buyers fall in love with your home and see its full potential.`,
        image_url: "/placeholder.svg?height=400&width=800&text=Home Staging",
        author: "Josh Altman",
        created_at: "2024-01-05",
        slug: "home-staging-tips",
      },
    }

    blog = defaultBlogs[params.slug as keyof typeof defaultBlogs]
  }

  if (!blog) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Header />
      <BlogPostContent blog={blog} relatedBlogs={relatedBlogs} />
      <Footer />
    </div>
  )
} 