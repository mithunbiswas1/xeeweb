import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const YOUR_EMAIL = "mithunbiswas.me@gmail.com"; // Replace with your email
    const APP_PASSWORD = "wpwbiyerlwzkfpns"; // App password without spaces

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: YOUR_EMAIL,
        pass: APP_PASSWORD,
      },
    });

    // Send notification to owner
    const ownerNotify = {
      from: YOUR_EMAIL,
      to: YOUR_EMAIL,
      subject: `📢 New Subscriber: ${email}`,
      text: `New email subscription for updates: ${email}`,
      html: `<p>New subscription: <strong>${email}</strong> signed up for launch updates on xeeweb.com.</p>`,
    };

    // Send confirmation to subscriber
    const confirmSub = {
      from: YOUR_EMAIL,
      to: email,
      subject: "✅ You are subscribed to xeeweb.com updates",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #facc15;">Thanks for subscribing!</h2>
          <p>We'll notify you when xeeweb.com launches or when major updates happen. Stay tuned!</p>
          <p>If you have any questions about the domain, simply reply to this email.</p>
          <hr />
          <small>xeeweb.com — premium digital frontier.</small>
        </div>
      `,
    };

    await transporter.sendMail(ownerNotify);
    await transporter.sendMail(confirmSub);

    return NextResponse.json(
      { success: true, message: "Subscription recorded" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Subscription email error:", error);
    return NextResponse.json(
      { error: "Could not subscribe, please try again" },
      { status: 500 },
    );
  }
}
