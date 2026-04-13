import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { email, message } = await request.json();

    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required" },
        { status: 400 },
      );
    }

    // Your email configuration
    const YOUR_EMAIL = "your-email@gmail.com"; // Replace with your email
    const APP_PASSWORD = "fgjotihxdwfr hxwm"; // App password without spaces

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: YOUR_EMAIL,
        pass: APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: YOUR_EMAIL,
      to: YOUR_EMAIL,
      subject: `[xeeweb.com] New Message from ${email}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #facc15; border-radius: 12px;">
          <h2 style="color: #facc15;">✨ New Inquiry from xeeweb.com</h2>
          <p><strong>From:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; color: #1f2937;">
            ${message.replace(/\n/g, "<br/>")}
          </div>
          <hr />
          <p style="font-size: 12px; color: #666;">This message was sent via the contact form on xeeweb.com.</p>
        </div>
      `,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Nodemailer error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 },
    );
  }
}
