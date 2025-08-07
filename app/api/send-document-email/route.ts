import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const { to, subject, message, documentUrl, documentName } = await request.json()

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number.parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Download the document file
    const documentResponse = await fetch(documentUrl)
    const documentBuffer = await documentResponse.arrayBuffer()

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af;">Document from Homes of Hollywood</h2>
        <p>Hello,</p>
        <p>${message || 'Please find the attached document as requested.'}</p>
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Document:</strong> ${documentName}</p>
          <p><strong>Sent by:</strong> Homes of Hollywood Team</p>
        </div>
        <p>If you have any questions, please don't hesitate to contact us.</p>
        <p>Best regards,<br>Homes of Hollywood Team</p>
      </div>
    `

    await transporter.sendMail({
      from: process.env.SMTP_FROM || "noreply@homesofhollywood.com",
      to: to,
      subject: subject || `Document: ${documentName}`,
      html: htmlContent,
      attachments: [
        {
          filename: documentName,
          content: Buffer.from(documentBuffer),
        },
      ],
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Document email sending failed:", error)
    return NextResponse.json({ error: "Failed to send document email" }, { status: 500 })
  }
} 