import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import hybridEmailService from '@/lib/email-hybrid';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name } = body;

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required.' }, { status: 400 });
    }

    // Check if email already exists
    const existingSubscription = await prisma.newsletterSubscription.findUnique({
      where: { email },
    });

    if (existingSubscription) {
      if (existingSubscription.isActive) {
        return NextResponse.json(
          { success: false, message: 'Email already subscribed to newsletter.' },
          { status: 400 }
        );
      } else {
        // Reactivate inactive subscription
        await prisma.newsletterSubscription.update({
          where: { email },
          data: { isActive: true },
        });

        // Send welcome email
        await hybridEmailService.sendWelcomeEmail(email, name);

        // Send admin notification
        await hybridEmailService.sendAdminNotification(email, name);

        return NextResponse.json({
          success: true,
          message: 'Subscription reactivated successfully!',
        });
      }
    }

    // Create new subscription
    const subscription = await prisma.newsletterSubscription.create({
      data: {
        email,
        source: 'website',
        isActive: true,
      },
    });

    // Send welcome email using Resend (better deliverability)
    await hybridEmailService.sendWelcomeEmail(email, name);

    // Send admin notification using SMTP (support communication)
    await hybridEmailService.sendAdminNotification(email, name);

    return NextResponse.json({
      success: true,
      message: 'Subscribed successfully!',
      subscription,
    });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return NextResponse.json(
      { success: false, message: 'Error subscribing to newsletter.' },
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
