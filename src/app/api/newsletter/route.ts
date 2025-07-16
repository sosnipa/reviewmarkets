import { NextResponse } from 'next/server';

// This will eventually come from a database
const subscribers: string[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    if (subscribers.includes(email)) {
      return NextResponse.json(
        { success: false, message: 'You are already subscribed to our newsletter!' },
        { status: 400 }
      );
    }

    // Add to subscribers list
    subscribers.push(email);

    // In a real app, you would:
    // 1. Save to database
    // 2. Send welcome email
    // 3. Add to email service (Mailchimp, SendGrid, etc.)

    // Simulate some processing time
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
      success: true,
      message: "You're subscribed! Welcome to our newsletter.",
      totalSubscribers: subscribers.length,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // In a real app, this would require admin authentication
  return NextResponse.json({
    subscribers: subscribers.length,
    // Don't return actual emails for privacy
  });
}
