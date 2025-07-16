import { NextResponse } from 'next/server';

// This will eventually come from a database
const contactMessages: Array<{
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'replied';
}> = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Create new contact message
    const newMessage = {
      id: contactMessages.length + 1,
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
      status: 'new' as const,
    };

    // Add to messages list
    contactMessages.push(newMessage);

    // In a real app, you would:
    // 1. Save to database
    // 2. Send notification email to admin
    // 3. Send confirmation email to user
    // 4. Integrate with CRM system

    // Simulate some processing time
    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      messageId: newMessage.id,
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
    messages: contactMessages,
    total: contactMessages.length,
    unread: contactMessages.filter((m) => m.status === 'new').length,
  });
}
