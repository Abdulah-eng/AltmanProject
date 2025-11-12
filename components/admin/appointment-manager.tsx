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
import { Calendar, Clock, Eye, Check, X } from "lucide-react"

interface Appointment {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  service_type: string
  appointment_date: string
  appointment_time: string
  message?: string
  status: "pending" | "approved" | "rejected"
  admin_notes?: string
  suggested_date?: string
  suggested_time?: string
  created_at: string
}

export function AppointmentManager() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [adminNotes, setAdminNotes] = useState("")
  const [suggestedDate, setSuggestedDate] = useState("")
  const [suggestedTime, setSuggestedTime] = useState("")
  const [loading, setLoading] = useState(false)
  const supabase = createClientClient()

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    const { data, error } = await supabase.from("appointments").select("*").order("created_at", { ascending: false })

    if (data) {
      setAppointments(data)
    }
  }

  const updateAppointmentStatus = async (id: string, status: "approved" | "rejected") => {
    setLoading(true)

    const updateData: any = {
      status,
      admin_notes: adminNotes,
    }

    if (status === "rejected" && suggestedDate && suggestedTime) {
      updateData.suggested_date = suggestedDate
      updateData.suggested_time = suggestedTime
    }

    const { error } = await supabase.from("appointments").update(updateData).eq("id", id)

    if (error) {
      toast.error("Failed to update appointment")
    } else {
      toast.success(`Appointment ${status} successfully`)

      // Send email notification here
      await sendEmailNotification(selectedAppointment!, status, adminNotes, suggestedDate, suggestedTime)

      setIsDialogOpen(false)
      resetForm()
      fetchAppointments()
    }

    setLoading(false)
  }

  const updateAppointmentDateTime = async (id: string) => {
    if (!suggestedDate || !suggestedTime) {
      toast.error("Please provide both date and time")
      return
    }

    setLoading(true)

    const updateData = {
      appointment_date: suggestedDate,
      appointment_time: suggestedTime,
      admin_notes: adminNotes,
      status: "approved",
    }

    const { error } = await supabase.from("appointments").update(updateData).eq("id", id)

    if (error) {
      toast.error("Failed to update appointment")
    } else {
      toast.success("Appointment date/time updated successfully")

      // Send email notification for date/time change
      await sendDateTimeChangeNotification(selectedAppointment!, suggestedDate, suggestedTime, adminNotes)

      setIsDialogOpen(false)
      resetForm()
      fetchAppointments()
    }

    setLoading(false)
  }

  const sendEmailNotification = async (
    appointment: Appointment,
    status: string,
    notes: string,
    suggestedDate?: string,
    suggestedTime?: string,
  ) => {
    try {
      await fetch("/api/send-appointment-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointment,
          status,
          notes,
          suggestedDate,
          suggestedTime,
        }),
      })
    } catch (error) {
      console.error("Failed to send email:", error)
    }
  }

  const sendDateTimeChangeNotification = async (
    appointment: Appointment,
    newDate: string,
    newTime: string,
    notes: string,
  ) => {
    try {
      await fetch("/api/send-appointment-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointment,
          status: "date_changed",
          notes,
          newDate,
          newTime,
        }),
      })
    } catch (error) {
      console.error("Failed to send email:", error)
    }
  }

  const resetForm = () => {
    setAdminNotes("")
    setSuggestedDate("")
    setSuggestedTime("")
    setSelectedAppointment(null)
  }

  const openAppointmentDialog = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setAdminNotes(appointment.admin_notes || "")
    setSuggestedDate(appointment.suggested_date || "")
    setSuggestedTime(appointment.suggested_time || "")
    setIsDialogOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Appointment Management</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {appointment.first_name} {appointment.last_name}
                      </div>
                      <div className="text-sm text-gray-500">{appointment.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{appointment.service_type}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{appointment.appointment_date}</span>
                      <Clock className="w-4 h-4" />
                      <span>{appointment.appointment_time}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                  <TableCell>{new Date(appointment.created_at).toLocaleDateString("en-US")}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => openAppointmentDialog(appointment)}>
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
            <DialogTitle>Appointment Details</DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Client Name</Label>
                  <p className="font-medium">
                    {selectedAppointment.first_name} {selectedAppointment.last_name}
                  </p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p>{selectedAppointment.email}</p>
                </div>
                <div>
                  <Label>Phone</Label>
                  <p>{selectedAppointment.phone}</p>
                </div>
                <div>
                  <Label>Service Type</Label>
                  <p>{selectedAppointment.service_type}</p>
                </div>
                <div>
                  <Label>Requested Date</Label>
                  <p>{selectedAppointment.appointment_date}</p>
                </div>
                <div>
                  <Label>Requested Time</Label>
                  <p>{selectedAppointment.appointment_time}</p>
                </div>
              </div>

              {selectedAppointment.message && (
                <div>
                  <Label>Message</Label>
                  <p className="mt-1 p-3 bg-gray-50 rounded-md">{selectedAppointment.message}</p>
                </div>
              )}

              <div>
                <Label htmlFor="admin_notes">Admin Notes</Label>
                <Textarea
                  id="admin_notes"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add notes for the client..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="suggested_date">Suggested Date (if rejecting)</Label>
                  <Input
                    id="suggested_date"
                    type="date"
                    value={suggestedDate}
                    onChange={(e) => setSuggestedDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="suggested_time">Suggested Time (if rejecting)</Label>
                  <Select onValueChange={setSuggestedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder={suggestedTime || "Select time"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                      <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                      <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                      <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                      <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                      <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                      <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                      <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                      <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedAppointment.status === "pending" && (
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <Button
                      onClick={() => updateAppointmentStatus(selectedAppointment.id, "approved")}
                      disabled={loading}
                      className="flex-1"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => updateAppointmentStatus(selectedAppointment.id, "rejected")}
                      disabled={loading}
                      className="flex-1"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Or Change Date/Time:</h4>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor="suggested_date">New Date</Label>
                        <Input
                          id="suggested_date"
                          type="date"
                          value={suggestedDate}
                          onChange={(e) => setSuggestedDate(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="suggested_time">New Time</Label>
                        <Select onValueChange={setSuggestedTime}>
                          <SelectTrigger>
                            <SelectValue placeholder={suggestedTime || "Select time"} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                            <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                            <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                            <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                            <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                            <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                            <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                            <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                            <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button
                      onClick={() => updateAppointmentDateTime(selectedAppointment.id)}
                      disabled={loading || !suggestedDate || !suggestedTime}
                      className="w-full"
                    >
                      Update Date/Time
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
