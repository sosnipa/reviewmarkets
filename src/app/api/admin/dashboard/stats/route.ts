import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Get subscriber statistics
    const [totalSubscribers, activeSubscribers, totalCampaigns, totalTemplates] = await Promise.all(
      [
        prisma.newsletterSubscription.count(),
        prisma.newsletterSubscription.count({ where: { isActive: true } }),
        prisma.emailCampaign.count(),
        prisma.emailTemplate.count(),
      ]
    );

    // Calculate recent subscriptions (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentSubscriptions = await prisma.newsletterSubscription.count({
      where: {
        subscribedAt: {
          gte: thirtyDaysAgo,
        },
      },
    });

    // Calculate average open and click rates from recent campaigns
    const recentCampaigns = await prisma.emailCampaign.findMany({
      where: {
        status: 'sent',
        sentAt: {
          gte: thirtyDaysAgo,
        },
      },
      select: {
        sentTo: true,
        openedCount: true,
        clickedCount: true,
      },
    });

    let totalSent = 0;
    let totalOpened = 0;
    let totalClicked = 0;

    recentCampaigns.forEach(
      (campaign: { sentTo: number; openedCount: number; clickedCount: number }) => {
        totalSent += campaign.sentTo;
        totalOpened += campaign.openedCount;
        totalClicked += campaign.clickedCount;
      }
    );

    const openRate = totalSent > 0 ? Math.round((totalOpened / totalSent) * 100) : 0;
    const clickRate = totalSent > 0 ? Math.round((totalClicked / totalSent) * 100) : 0;

    return NextResponse.json({
      totalSubscribers,
      activeSubscribers,
      totalCampaigns,
      totalTemplates,
      recentSubscriptions,
      openRate,
      clickRate,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard statistics' }, { status: 500 });
  }
}
