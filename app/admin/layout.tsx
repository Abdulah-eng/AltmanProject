import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard - Homes of Hollywood",
  description: "Administrative dashboard for Homes of Hollywood real estate website",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      {children}
    </div>
  )
} 