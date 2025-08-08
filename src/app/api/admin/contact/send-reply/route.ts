import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import hybridEmailService from '@/lib/email-hybrid';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { contactId, reply } = body;

    if (!contactId || !reply) {
      return NextResponse.json(
        { error: 'Contact ID and reply message are required' },
        { status: 400 }
      );
    }

    // Get the contact message
    const contact = await prisma.contactMessage.findUnique({
      where: { id: contactId },
    });

    if (!contact) {
      return NextResponse.json({ error: 'Contact message not found' }, { status: 404 });
    }

    // Send email to the user
    const emailSubject = `Re: ${contact.subject || 'Your message to ReviewMarket'}`;
    const emailContent = `
      <p>Hello ${contact.name},</p>
      <p>Thank you for contacting us. Here is our response to your message:</p>
      
      <div style="background-color: #f3f4f6; padding: 15px; border-left: 4px solid #059669; margin: 20px 0;">
        <p style="margin: 0; font-style: italic;">"${reply}"</p>
      </div>
      
      <p>If you have any further questions, please don't hesitate to contact us again.</p>
      
      <p>Best regards,<br>The ReviewMarket Team</p>
      
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
      <p style="font-size: 12px; color: #6b7280;">
        This is an automated response to your message sent on ${new Date(contact.createdAt).toLocaleDateString()}.
      </p>
    `;

    await hybridEmailService.sendResendEmail({
      to: contact.email,
      subject: emailSubject,
      html: emailContent,
    });

    return NextResponse.json({
      success: true,
      message: 'Reply email sent successfully',
    });
  } catch (error) {
    console.error('Error sending reply email:', error);
    return NextResponse.json({ error: 'Failed to send reply email' }, { status: 500 });
  }
}
