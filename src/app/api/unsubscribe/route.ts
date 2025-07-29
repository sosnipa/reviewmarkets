import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import crypto from 'crypto';

// Generate unsubscribe token
function generateUnsubscribeToken(email: string): string {
  const secret = process.env.UNSUBSCRIBE_SECRET;
  if (!secret || secret === 'default-secret') {
    throw new Error('Unsubscribe secret not properly configured');
  }
  return crypto.createHmac('sha256', secret).update(email).digest('hex');
}

// Validate unsubscribe token
function validateUnsubscribeToken(email: string, token: string): boolean {
  const expectedToken = generateUnsubscribeToken(email);
  return crypto.timingSafeEqual(Buffer.from(token, 'hex'), Buffer.from(expectedToken, 'hex'));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, token } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Check if subscriber exists
    const subscriber = await prisma.newsletterSubscription.findUnique({
      where: { email },
    });

    if (!subscriber) {
      return NextResponse.json(
        { error: 'Email address not found in our subscriber list' },
        { status: 404 }
      );
    }

    // If token is provided, validate it
    if (token && !validateUnsubscribeToken(email, token)) {
      return NextResponse.json({ error: 'Invalid unsubscribe token' }, { status: 400 });
    }

    // Deactivate the subscription
    await prisma.newsletterSubscription.update({
      where: { email },
      data: { isActive: false },
    });

    // Create email event for tracking (only if we have a valid campaign ID)
    try {
      await prisma.emailEvent.create({
        data: {
          campaignId: 'unsubscribe', // Special campaign ID for unsubscribe events
          subscriberEmail: email,
          eventType: 'unsubscribed',
          timestamp: new Date(),
        },
      });
    } catch {
      // If campaign doesn't exist, just log the unsubscribe without creating event
      console.log('Unsubscribe event logged for:', email);
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed from our newsletter.',
    });
  } catch (error) {
    console.error('Error processing unsubscribe:', error);
    return NextResponse.json({ error: 'Failed to process unsubscribe request' }, { status: 500 });
  }
}
