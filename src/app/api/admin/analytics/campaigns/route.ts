import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30d';

    // Calculate date range based on period
    const now = new Date();
    const startDate = new Date();

    switch (period) {
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(now.getDate() - 90);
        break;
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 30);
    }

    // Fetch campaigns with their events
    const campaigns = await prisma.emailCampaign.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: now,
        },
      },
      include: {
        emailEvents: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calculate statistics for each campaign
    const campaignStats = campaigns.map((campaign) => {
      const events = campaign.emailEvents || [];
      const opened = events.filter((e: any) => e.eventType === 'opened').length;
      const clicked = events.filter((e: any) => e.eventType === 'clicked').length;
      const bounced = events.filter((e: any) => e.eventType === 'bounced').length;

      const openRate = campaign.sentTo > 0 ? (opened / campaign.sentTo) * 100 : 0;
      const clickRate = campaign.sentTo > 0 ? (clicked / campaign.sentTo) * 100 : 0;

      return {
        id: campaign.id,
        name: campaign.subject,
        type: campaign.type,
        sent: campaign.sentTo,
        opened,
        clicked,
        bounced,
        openRate,
        clickRate,
        sentAt: campaign.sentAt || campaign.createdAt.toISOString(),
      };
    });

    return NextResponse.json({ campaigns: campaignStats });
  } catch (error) {
    console.error('Error fetching campaign analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch campaign analytics' }, { status: 500 });
  }
}
