import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import crypto from 'crypto';

// Generate preferences token
function generatePreferencesToken(email: string): string {
  const secret = process.env.PREFERENCES_SECRET;
  if (!secret || secret === 'default-preferences-secret') {
    throw new Error('Preferences secret not properly configured');
  }
  return crypto.createHmac('sha256', secret).update(email).digest('hex');
}

// Validate preferences token
function validatePreferencesToken(email: string, token: string): boolean {
  const expectedToken = generatePreferencesToken(email);
  return crypto.timingSafeEqual(Buffer.from(token, 'hex'), Buffer.from(expectedToken, 'hex'));
}

// GET - Fetch user preferences
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Check if subscriber exists
    const subscriber = await prisma.newsletterSubscription.findUnique({
      where: { email },
    });

    if (!subscriber) {
      return NextResponse.json({ error: 'Email address not found' }, { status: 404 });
    }

    // If token is provided, validate it
    if (token && !validatePreferencesToken(email, token)) {
      return NextResponse.json({ error: 'Invalid preferences token' }, { status: 400 });
    }

    // Return preferences (for now, using default values)
    // In a real app, you'd store these in the database
    const preferences = {
      email: subscriber.email,
      isActive: subscriber.isActive,
      subscribedAt: subscriber.subscribedAt.toISOString(),
      source: subscriber.source || 'website',
      emailFrequency: 'weekly' as const,
      categories: {
        newsletter: true,
        promotional: true,
        updates: true,
        deals: true,
      },
    };

    return NextResponse.json({
      preferences,
    });
  } catch (error) {
    console.error('Error fetching preferences:', error);
    return NextResponse.json({ error: 'Failed to fetch preferences' }, { status: 500 });
  }
}

// PUT - Update user preferences
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { email, emailFrequency, categories } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Check if subscriber exists
    const subscriber = await prisma.newsletterSubscription.findUnique({
      where: { email },
    });

    if (!subscriber) {
      return NextResponse.json({ error: 'Email address not found' }, { status: 404 });
    }

    // Update subscriber with new preferences
    // Note: In a real app, you'd have a separate preferences table
    // For now, we'll just update the basic subscription info
    await prisma.newsletterSubscription.update({
      where: { email },
      data: {
        isActive: true, // Keep them active when they update preferences
      },
    });

    // Log the preference update
    console.log('Preferences updated for:', email, { emailFrequency, categories });

    return NextResponse.json({
      success: true,
      message: 'Preferences updated successfully',
    });
  } catch (error) {
    console.error('Error updating preferences:', error);
    return NextResponse.json({ error: 'Failed to update preferences' }, { status: 500 });
  }
}
