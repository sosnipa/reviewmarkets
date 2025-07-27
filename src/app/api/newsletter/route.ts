import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import EmailService from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name } = body;

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const existingSubscription = await prisma.newsletterSubscription.findUnique({
      where: { email },
    });

    if (existingSubscription) {
      if (existingSubscription.isActive) {
        return NextResponse.json(
          { success: false, message: 'You are already subscribed to our newsletter!' },
          { status: 400 }
        );
      } else {
        // Reactivate subscription
        await prisma.newsletterSubscription.update({
          where: { email },
          data: { isActive: true },
        });
      }
    } else {
      // Create new subscription
      await prisma.newsletterSubscription.create({
        data: {
          email,
          source: 'landing_page',
        },
      });
    }

    // Send welcome email to subscriber
    await EmailService.sendWelcomeEmail({
      email,
      name,
      source: 'landing_page',
    });

    // Send admin notification
    await EmailService.sendAdminNotification({
      email,
      name,
      source: 'landing_page',
    });

    // Get total active subscribers
    const totalSubscribers = await prisma.newsletterSubscription.count({
      where: { isActive: true },
    });

    return NextResponse.json({
      success: true,
      message: "You're subscribed! Welcome to our newsletter.",
      totalSubscribers,
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const totalSubscribers = await prisma.newsletterSubscription.count({
      where: { isActive: true },
    });

    return NextResponse.json({
      subscribers: totalSubscribers,
      success: true,
    });
  } catch (error) {
    console.error('Error fetching newsletter stats:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching newsletter statistics.' },
      { status: 500 }
    );
  }
}
