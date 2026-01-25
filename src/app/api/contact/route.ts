import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 5; // Max requests
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in ms

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (record.count >= RATE_LIMIT) {
    return true;
  }

  record.count++;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: "Message too short" },
        { status: 400 }
      );
    }

    // TODO: Send email via SMTP (nodemailer)
    // For now, just log the message
    console.log("📬 New contact form submission:");
    console.log(`   Name: ${name}`);
    console.log(`   Email: ${email}`);
    console.log(`   Message: ${message}`);

    // In production, you would:
    // 1. Send an email using nodemailer
    // 2. Store in database (optional)
    // 3. Send notification via Telegram/Discord (optional)

    return NextResponse.json(
      { success: true, message: "Message received" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
