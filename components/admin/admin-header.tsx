"use client"

import { Button } from "@/components/ui/button"
import { createClientClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { LogOut, User } from "lucide-react"
import { SettingsDialog } from "./settings-dialog"

interface AdminHeaderProps {
  user: any
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const router = useRouter()
  const supabase = createClientClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  return (
    <header className="bg-black border-b border-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-2xl font-bold text-[#D4AF37] tracking-wider">
                <span className="text-3xl">HH</span>
                <div className="text-sm leading-tight">
                  HOMES OF
                  <br />
                  <span className="text-xs tracking-widest">HOLLYWOOD</span>
                </div>
              </div>
            </div>
            
            {/* Divider */}
            <div className="w-px h-8 bg-gray-700"></div>
            
            {/* Admin Title */}
            <div>
              <h1 className="text-xl font-bold text-white tracking-wide">ADMIN PANEL</h1>
              <p className="text-xs text-gray-400 tracking-wider">Content Management System</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* User Info */}
            <div className="flex items-center space-x-3 bg-gray-900 px-4 py-2 rounded-lg border border-gray-800">
              <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-black" />
              </div>
              <div className="text-sm">
                <p className="text-white font-medium">{user.email}</p>
                <p className="text-gray-400 text-xs">Administrator</p>
              </div>
            </div>

            {/* Settings Button */}
            <SettingsDialog user={user} />

            {/* Logout Button */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white transition-all duration-300"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
