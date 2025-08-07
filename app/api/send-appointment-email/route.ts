import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const { appointment, status, notes, suggestedDate, suggestedTime, newDate, newTime } = await request.json()

    // Create transporter (you'll need to add your email credentials)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number.parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    let subject = ""
    let htmlContent = ""

    if (status === "approved") {
      subject = "Appointment Confirmed - Homes of Hollywood"
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">Appointment Confirmed</h2>
          <p>Dear ${appointment.first_name} ${appointment.last_name},</p>
          <p>Great news! Your appointment has been confirmed for:</p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Date:</strong> ${appointment.appointment_date}</p>
            <p><strong>Time:</strong> ${appointment.appointment_time}</p>
            <p><strong>Service:</strong> ${appointment.service_type}</p>
          </div>
          ${notes ? `<p><strong>Additional Notes:</strong> ${notes}</p>` : ""}
          <p>We look forward to meeting with you!</p>
          <p>Best regards,<br>Homes of Hollywood Team</p>
        </div>
      `
    } else if (status === "date_changed") {
      subject = "Appointment Date/Time Updated - Homes of Hollywood"
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">Appointment Updated</h2>
          <p>Dear ${appointment.first_name} ${appointment.last_name},</p>
          <p>Your appointment has been updated with a new date and time:</p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>New Date:</strong> ${newDate}</p>
            <p><strong>New Time:</strong> ${newTime}</p>
            <p><strong>Service:</strong> ${appointment.service_type}</p>
          </div>
          ${notes ? `<p><strong>Additional Notes:</strong> ${notes}</p>` : ""}
          <p>We look forward to meeting with you at the new time!</p>
          <p>Best regards,<br>Homes of Hollywood Team</p>
        </div>
      `
    } else {
      subject = "Appointment Update - Homes of Hollywood"
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Appointment Update</h2>
          <p>Dear ${appointment.first_name} ${appointment.last_name},</p>
          <p>We need to reschedule your appointment originally requested for ${appointment.appointment_date} at ${appointment.appointment_time}.</p>
          ${
            suggestedDate && suggestedTime
              ? `
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Suggested New Date:</strong> ${suggestedDate}</p>
              <p><strong>Suggested New Time:</strong> ${suggestedTime}</p>
            </div>
          `
              : ""
          }
          ${notes ? `<p><strong>Message:</strong> ${notes}</p>` : ""}
          <p>Please contact us to confirm the new appointment time or discuss alternatives.</p>
          <p>Best regards,<br>Homes of Hollywood Team</p>
        </div>
      `
    }

    await transporter.sendMail({
      from: process.env.SMTP_FROM || "noreply@homesofhollywood.com",
      to: appointment.email,
      subject,
      html: htmlContent,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Email sending failed:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
