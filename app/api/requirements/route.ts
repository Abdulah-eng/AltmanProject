import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const body = await request.json()

    const requirementData = {
      user_id: null, // No user authentication required
      user_email: body.user_email,
      user_name: body.user_name,
      requirement_type: body.requirement_type,
      title: body.title,
      description: body.description,
      budget: body.budget,
      timeline: body.timeline,
      status: "pending",
    }

    const { data, error } = await supabase.from("client_requirements").insert(requirementData)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Send email to admin
    try {
      await sendAdminNotification(body)
    } catch (emailError) {
      console.error("Failed to send admin notification:", emailError)
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function sendAdminNotification(requirementData: any) {
  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: Number.parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1e40af;">New Client Requirement Submitted</h2>
      <p>A new client requirement has been submitted:</p>
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Client Name:</strong> ${requirementData.user_name}</p>
        <p><strong>Email:</strong> ${requirementData.user_email}</p>
        <p><strong>Requirement Type:</strong> ${requirementData.requirement_type}</p>
        <p><strong>Title:</strong> ${requirementData.title}</p>
        <p><strong>Description:</strong> ${requirementData.description}</p>
        ${requirementData.budget ? `<p><strong>Budget:</strong> ${requirementData.budget}</p>` : ""}
        ${requirementData.timeline ? `<p><strong>Timeline:</strong> ${requirementData.timeline}</p>` : ""}
      </div>
      <p>Please review and respond to this requirement.</p>
      <p>Best regards,<br>The Altman Brothers System</p>
    </div>
  `

  await transporter.sendMail({
    from: process.env.SMTP_FROM || "noreply@altmanbrothers.com",
    to: "mabdulaharshad@gmail.com",
    subject: "New Client Requirement - The Altman Brothers",
    html: htmlContent,
  })
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { searchParams } = new URL(request.url)
    const user_id = searchParams.get("user_id")

    let query = supabase.from("client_requirements").select("*").order("created_at", { ascending: false })

    if (user_id) {
      query = query.eq("user_id", user_id)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 