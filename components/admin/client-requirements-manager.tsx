"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { createClientClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Eye, MessageSquare, Check, Clock, User } from "lucide-react"

interface ClientRequirement {
  id: string
  user_id: string
  user_email: string
  user_name: string
  requirement_type: string
  title: string
  description: string
  budget?: string
  timeline?: string
  status: "pending" | "reviewed" | "in_progress" | "completed"
  admin_notes?: string
  created_at: string
}

export function ClientRequirementsManager() {
  const [requirements, setRequirements] = useState<ClientRequirement[]>([])
  const [selectedRequirement, setSelectedRequirement] = useState<ClientRequirement | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [adminNotes, setAdminNotes] = useState("")
  const [status, setStatus] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const supabase = createClientClient()

  useEffect(() => {
    fetchRequirements()
  }, [])

  const fetchRequirements = async () => {
    const { data, error } = await supabase
      .from("client_requirements")
      .select("*")
      .order("created_at", { ascending: false })

    if (data) {
      setRequirements(data)
    }
  }

  const updateRequirementStatus = async (id: string, newStatus: string, notes: string) => {
    setLoading(true)

    const { error } = await supabase
      .from("client_requirements")
      .update({
        status: newStatus,
        admin_notes: notes,
      })
      .eq("id", id)

    if (error) {
      toast.error("Failed to update requirement")
    } else {
      toast.success("Requirement updated successfully")
      setIsDialogOpen(false)
      resetForm()
      fetchRequirements()
    }

    setLoading(false)
  }

  const resetForm = () => {
    setAdminNotes("")
    setStatus("")
    setSelectedRequirement(null)
  }

  const openRequirementDialog = (requirement: ClientRequirement) => {
    setSelectedRequirement(requirement)
    setAdminNotes(requirement.admin_notes || "")
    setStatus(requirement.status)
    setIsDialogOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      case "reviewed":
        return <Badge className="bg-yellow-100 text-yellow-800">Reviewed</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>
    }
  }

  const getRequirementTypeIcon = (type: string) => {
    switch (type) {
      case "property_search":
        return "🏠"
      case "investment":
        return "💰"
      case "consultation":
        return "💬"
      case "valuation":
        return "📊"
      default:
        return "📋"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Client Requirements</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Client Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requirements.map((requirement) => (
                <TableRow key={requirement.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{requirement.user_name}</div>
                      <div className="text-sm text-gray-500">{requirement.user_email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span>{getRequirementTypeIcon(requirement.requirement_type)}</span>
                      <span className="capitalize">{requirement.requirement_type.replace('_', ' ')}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{requirement.title}</TableCell>
                  <TableCell>{getStatusBadge(requirement.status)}</TableCell>
                  <TableCell>{new Date(requirement.created_at).toLocaleDateString("en-US")}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => openRequirementDialog(requirement)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Client Requirement Details</DialogTitle>
          </DialogHeader>
          {selectedRequirement && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Client Name</Label>
                  <p className="font-medium">{selectedRequirement.user_name}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p>{selectedRequirement.user_email}</p>
                </div>
                <div>
                  <Label>Requirement Type</Label>
                  <p className="capitalize">{selectedRequirement.requirement_type.replace('_', ' ')}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <p>{getStatusBadge(selectedRequirement.status)}</p>
                </div>
                {selectedRequirement.budget && (
                  <div>
                    <Label>Budget</Label>
                    <p>{selectedRequirement.budget}</p>
                  </div>
                )}
                {selectedRequirement.timeline && (
                  <div>
                    <Label>Timeline</Label>
                    <p>{selectedRequirement.timeline}</p>
                  </div>
                )}
              </div>

              <div>
                <Label>Title</Label>
                <p className="font-medium">{selectedRequirement.title}</p>
              </div>

              <div>
                <Label>Description</Label>
                <p className="mt-1 p-3 bg-gray-50 rounded-md">{selectedRequirement.description}</p>
              </div>

              <div>
                <Label htmlFor="status">Update Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="admin_notes">Admin Notes</Label>
                <Textarea
                  id="admin_notes"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add notes about this requirement..."
                  className="min-h-[100px]"
                />
              </div>

              <Button
                onClick={() => updateRequirementStatus(selectedRequirement.id, status, adminNotes)}
                disabled={loading}
                className="w-full"
              >
                <Check className="w-4 h-4 mr-2" />
                Update Requirement
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 