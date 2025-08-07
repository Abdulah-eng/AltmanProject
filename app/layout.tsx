import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import { createServerClient } from "@/lib/supabase/server"
import { AuthProvider } from "@/components/auth-provider"
import { LoadingProvider } from "@/components/loading-provider"

const inter = Inter({ subsets: ["latin"] })
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Homes of Hollywood - Real Estate Excellence",
  description: "Premier real estate services with Homes of Hollywood",
    generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.className} bg-black text-white`} suppressHydrationWarning>
        <LoadingProvider>
          <AuthProvider session={session}>{children}</AuthProvider>
        </LoadingProvider>
      </body>
    </html>
  )
}
