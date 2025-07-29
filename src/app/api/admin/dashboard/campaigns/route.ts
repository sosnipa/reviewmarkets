import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const campaigns = await prisma.emailCampaign.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 10, // Get last 10 campaigns
      select: {
        id: true,
        subject: true,
        type: true,
        sentTo: true,
        status: true,
        createdAt: true,
        openedCount: true,
        clickedCount: true,
      },
    });

    return NextResponse.json({
      campaigns,
    });
  } catch (error) {
    console.error('Error fetching recent campaigns:', error);
    return NextResponse.json({ error: 'Failed to fetch recent campaigns' }, { status: 500 });
  }
}
