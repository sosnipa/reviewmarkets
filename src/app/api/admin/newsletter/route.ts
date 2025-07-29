import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import hybridEmailService from '@/lib/email-hybrid';

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
    const { subject, content, type = 'custom', individualEmail } = body;

    if (!subject || !content) {
      return NextResponse.json(
        { success: false, message: 'Subject and content are required.' },
        { status: 400 }
      );
    }

    // Handle individual email sending
    if (individualEmail) {
      // Verify the email exists in our subscribers
      const subscriber = await prisma.newsletterSubscription.findFirst({
        where: { email: individualEmail },
      });

      if (!subscriber) {
        return NextResponse.json(
          { success: false, message: 'Subscriber not found.' },
          { status: 404 }
        );
      }

      let emailResult;
      const emailType = body.emailType || 'newsletter';

      if (type === 'promotional') {
        // Use promotional email template
        emailResult = await hybridEmailService.sendPromotionalEmail(
          [individualEmail],
          subject,
          content
        );
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
              <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
                <h1 style="color: white; margin: 0; font-size: 28px;">ReviewMarkets</h1>
              </div>
              
              <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
                ${content}
              </div>
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
                <p>© 2024 ReviewMarkets. All rights reserved.</p>
                <p><a href="#" style="color: #10b981;">Unsubscribe</a> | <a href="#" style="color: #10b981;">Manage Preferences</a></p>
              </div>
            </body>
          </html>
        `;

        emailResult = await hybridEmailService.sendIndividualEmail(
          individualEmail,
          subject,
          html,
          emailType
        );
      }

      if (emailResult.success) {
        // Log the email campaign
        await prisma.emailCampaign.create({
          data: {
            subject,
            content,
            type,
            sentTo: 1,
            status: 'sent',
          },
        });

        return NextResponse.json({
          success: true,
          message: `Email sent successfully to ${individualEmail}.`,
          totalSent: 1,
          data: emailResult.data,
        });
      } else {
        return NextResponse.json(
          { success: false, message: 'Failed to send email.', error: emailResult.error },
          { status: 500 }
        );
      }
    }

    // Handle bulk email sending (existing logic)
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
      emailResult = await hybridEmailService.sendPromotionalEmail(
        subscriberEmails,
        subject,
        content
      );
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
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
              <h1 style="color: white; margin: 0; font-size: 28px;">ReviewMarkets</h1>
            </div>
            
            <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
              ${content}
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
              <p>© 2024 ReviewMarkets. All rights reserved.</p>
              <p><a href="#" style="color: #10b981;">Unsubscribe</a> | <a href="#" style="color: #10b981;">Manage Preferences</a></p>
            </div>
          </body>
        </html>
      `;

      emailResult = await hybridEmailService.sendBulkNewsletter({
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
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, message: 'Error sending email.' }, { status: 500 });
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
