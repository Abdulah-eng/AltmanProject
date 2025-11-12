"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClientClient } from "@/lib/supabase/client"
import { Settings, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SettingsDialogProps {
  user: any
}

export function SettingsDialog({ user }: SettingsDialogProps) {
  // Custom scrollbar styles
  const scrollbarStyles = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 8px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #1F2937;
      border-radius: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #4B5563;
      border-radius: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #6B7280;
    }
  `
  const [open, setOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  
  // Password strength calculation
  const getPasswordStrength = (password: string) => {
    if (!password) return { score: 0, label: '', color: '' }
    
    let score = 0
    if (password.length >= 6) score++
    if (password.length >= 8) score++
    if (/[a-z]/.test(password)) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    
    if (score <= 2) return { score, label: 'Weak', color: 'text-red-400' }
    if (score <= 4) return { score, label: 'Fair', color: 'text-yellow-400' }
    if (score <= 5) return { score, label: 'Good', color: 'text-blue-400' }
    return { score, label: 'Strong', color: 'text-green-400' }
  }
  
  const passwordStrength = getPasswordStrength(newPassword)
  
  const { toast } = useToast()
  const supabase = createClientClient()

  const handlePasswordChange = async () => {
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage({ type: 'error', text: 'All fields are required' })
      return
    }

    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: 'New password must be at least 6 characters long' })
      return
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' })
      return
    }

    if (newPassword === currentPassword) {
      setMessage({ type: 'error', text: 'New password must be different from current password' })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      // First, verify the current password by attempting to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      })

      if (signInError) {
        setMessage({ type: 'error', text: 'Current password is incorrect' })
        setLoading(false)
        return
      }

      // Update the password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (updateError) {
        setMessage({ type: 'error', text: `Failed to update password: ${updateError.message}` })
      } else {
        setMessage({ type: 'success', text: 'Password updated successfully!' })
        toast({
          title: "Success",
          description: "Your password has been updated successfully.",
        })
        
        // Clear form
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
        
        // Close dialog after a short delay
        setTimeout(() => {
          setOpen(false)
          setMessage(null)
        }, 2000)
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' })
      console.error('Password change error:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setMessage(null)
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />
      <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-gray-700 text-gray-300 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
        >
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </DialogTrigger>
             <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md max-h-[85vh] md:max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#D4AF37]">Settings</DialogTitle>
          <DialogDescription className="text-gray-400">
            Manage your account settings and change your password.
          </DialogDescription>
        </DialogHeader>

                 <div 
           className="space-y-6 py-4 pb-6 flex-1 overflow-y-auto pr-2 custom-scrollbar"
           style={{
             scrollbarWidth: 'thin',
             scrollbarColor: '#4B5563 #1F2937'
           }}
         >
           {/* Scrollable content starts here */}
          {/* User Info */}
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h3 className="text-sm font-medium text-[#D4AF37] mb-2">Account Information</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-400">Email:</span>
                <span className="text-white ml-2">{user.email}</span>
              </div>
              <div>
                <span className="text-gray-400">Role:</span>
                <span className="text-white ml-2">Administrator</span>
              </div>
            </div>
          </div>

          {/* Password Change Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Change Password</h3>
              <div className="text-xs text-gray-400">
                Last changed: {user.updated_at ? new Date(user.updated_at).toLocaleDateString("en-US") : 'Unknown'}
              </div>
            </div>
            
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="current-password" className="text-sm font-medium text-gray-300">
                Current Password
              </Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37] pr-10"
                  placeholder="Enter current password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-gray-700 text-gray-400"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-sm font-medium text-gray-300">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37] pr-10"
                  placeholder="Enter new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-gray-700 text-gray-400"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
              
              {/* Password Strength Indicator */}
              {newPassword && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-400">Password Strength:</span>
                    <span className={passwordStrength.color}>{passwordStrength.label}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        passwordStrength.score <= 2 ? 'bg-red-400' :
                        passwordStrength.score <= 4 ? 'bg-yellow-400' :
                        passwordStrength.score <= 5 ? 'bg-blue-400' : 'bg-green-400'
                      }`}
                      style={{ width: `${(passwordStrength.score / 6) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm New Password */}
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-300">
                Confirm New Password
              </Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37] pr-10"
                  placeholder="Confirm new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-gray-700 text-gray-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
              <h4 className="text-xs font-medium text-[#D4AF37] mb-2">Password Requirements:</h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• At least 6 characters long</li>
                <li>• Different from current password</li>
                <li>• Both new passwords must match</li>
                <li>• Include uppercase and lowercase letters</li>
                <li>• Include numbers and special characters</li>
              </ul>
            </div>
          </div>

          {/* Message Display */}
          {message && (
            <Alert className={message.type === 'success' ? 'border-green-600 bg-green-900/20' : 'border-red-600 bg-red-900/20'}>
              {message.type === 'success' ? (
                <CheckCircle className="h-4 w-4 text-green-400" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-400" />
              )}
              <AlertDescription className={message.type === 'success' ? 'text-green-400' : 'text-red-400'}>
                {message.text}
              </AlertDescription>
            </Alert>
          )}

          {/* Session Information */}
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h3 className="text-sm font-medium text-[#D4AF37] mb-2">Session Information</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-400">Login Time:</span>
                <span className="text-white ml-2">
                  {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'Unknown'}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Account Created:</span>
                <span className="text-white ml-2">
                  {user.created_at ? new Date(user.created_at).toLocaleDateString("en-US") : 'Unknown'}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Session Status:</span>
                <span className="text-green-400 ml-2">Active</span>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-blue-900/20 border border-blue-600 p-3 rounded-lg">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-xs text-blue-300">
                <strong>Security Notice:</strong> Your password change will be logged for security purposes. 
                For your safety, please ensure you're on a secure connection.
              </div>
            </div>
          </div>
          
          {/* Bottom spacing indicator */}
          <div className="h-4"></div>
        </div>

        <DialogFooter className="flex gap-3 flex-shrink-0 border-t border-gray-800 pt-4">
          <Button
            variant="outline"
            onClick={resetForm}
            className="border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white"
            disabled={loading}
          >
            Reset
          </Button>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handlePasswordChange}
            disabled={loading}
            className="bg-[#D4AF37] text-black hover:bg-[#B8941F] disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  )
}
