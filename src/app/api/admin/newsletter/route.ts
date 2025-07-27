import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import EmailService from '@/lib/email';

// Get all newsletter subscribers
export async function GET() {
  try {
    const subscribers = await prisma.newsletterSubscription.findMany({
      orderBy: { subscribedAt: 'desc' },
      select: {
        id: true,
        email: true,
        subscribedAt: true,
        isActive: true,
        source: true,
      },
    });

    const stats = {
      total: subscribers.length,
      active: subscribers.filter((s) => s.isActive).length,
      inactive: subscribers.filter((s) => !s.isActive).length,
    };

    return NextResponse.json({
      subscribers,
      stats,
      success: true,
    });
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching subscribers.' },
      { status: 500 }
    );
  }
}

// Send bulk email to subscribers
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { subject, content, type = 'custom' } = body;

    if (!subject || !content) {
      return NextResponse.json(
        { success: false, message: 'Subject and content are required.' },
        { status: 400 }
      );
    }

    // Get all active subscribers
    const subscribers = await prisma.newsletterSubscription.findMany({
      where: { isActive: true },
      select: { email: true },
    });

    const subscriberEmails = subscribers.map((s) => s.email);

    if (subscriberEmails.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No active subscribers found.' },
        { status: 400 }
      );
    }

    let emailResult;

    if (type === 'promotional') {
      // Use promotional email template
      emailResult = await EmailService.sendPromotionalEmail(subscriberEmails, subject, content);
    } else {
      // Use custom email
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${subject}</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
              <h1 style="color: white; margin: 0; font-size: 28px;">ReviewMarkets</h1>
            </div>
            
            <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
              ${content}
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
              <p>© 2024 ReviewMarkets. All rights reserved.</p>
              <p><a href="#" style="color: #667eea;">Unsubscribe</a> | <a href="#" style="color: #667eea;">Manage Preferences</a></p>
            </div>
          </body>
        </html>
      `;

      emailResult = await EmailService.sendBulkEmail({
        subscribers: subscriberEmails,
        subject,
        html,
      });
    }

    if (emailResult.success) {
      // Log the email campaign
      await prisma.emailCampaign.create({
        data: {
          subject,
          content,
          type,
          sentTo: subscriberEmails.length,
          status: 'sent',
        },
      });

      return NextResponse.json({
        success: true,
        message: `Email sent successfully to ${subscriberEmails.length} subscribers.`,
        totalSent: subscriberEmails.length,
        data: emailResult.data,
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Failed to send email.', error: emailResult.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error sending bulk email:', error);
    return NextResponse.json(
      { success: false, message: 'Error sending bulk email.' },
      { status: 500 }
    );
  }
}

// Update subscriber status (activate/deactivate)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, isActive } = body;

    if (typeof id !== 'string' || typeof isActive !== 'boolean') {
      return NextResponse.json(
        { success: false, message: 'Invalid request data.' },
        { status: 400 }
      );
    }

    const updatedSubscription = await prisma.newsletterSubscription.update({
      where: { id },
      data: { isActive },
    });

    return NextResponse.json({
      success: true,
      message: `Subscriber ${isActive ? 'activated' : 'deactivated'} successfully.`,
      subscription: updatedSubscription,
    });
  } catch (error) {
    console.error('Error updating subscriber:', error);
    return NextResponse.json(
      { success: false, message: 'Error updating subscriber.' },
      { status: 500 }
    );
  }
}

// Delete subscriber
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Subscriber ID is required.' },
        { status: 400 }
      );
    }

    await prisma.newsletterSubscription.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Subscriber deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting subscriber:', error);
    return NextResponse.json(
      { success: false, message: 'Error deleting subscriber.' },
      { status: 500 }
    );
  }
}
