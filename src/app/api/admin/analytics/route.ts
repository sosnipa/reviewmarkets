import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Get analytics data for admin dashboard
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30'; // days

    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(period));

    // Get subscriber statistics
    const [
      totalSubscribers,
      activeSubscribers,
      newSubscribersThisPeriod,
      subscribersBySource,
      emailCampaigns,
      recentCampaigns,
      contactMessages,
      unreadMessages,
    ] = await Promise.all([
      // Total subscribers
      prisma.newsletterSubscription.count(),

      // Active subscribers
      prisma.newsletterSubscription.count({
        where: { isActive: true },
      }),

      // New subscribers in the period
      prisma.newsletterSubscription.count({
        where: {
          subscribedAt: {
            gte: daysAgo,
          },
        },
      }),

      // Subscribers by source
      prisma.newsletterSubscription.groupBy({
        by: ['source'],
        _count: {
          id: true,
        },
        where: { isActive: true },
      }),

      // Total email campaigns
      prisma.emailCampaign.count(),

      // Recent campaigns (last 10)
      prisma.emailCampaign.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          subject: true,
          type: true,
          sentTo: true,
          status: true,
          createdAt: true,
        },
      }),

      // Total contact messages
      prisma.contactMessage.count(),

      // Unread contact messages
      prisma.contactMessage.count({
        where: { isRead: false },
      }),
    ]);

    // Calculate growth rate
    const previousPeriodStart = new Date(daysAgo);
    previousPeriodStart.setDate(previousPeriodStart.getDate() - parseInt(period));

    const previousPeriodSubscribers = await prisma.newsletterSubscription.count({
      where: {
        subscribedAt: {
          gte: previousPeriodStart,
          lt: daysAgo,
        },
      },
    });

    const growthRate =
      previousPeriodSubscribers > 0
        ? ((newSubscribersThisPeriod - previousPeriodSubscribers) / previousPeriodSubscribers) * 100
        : newSubscribersThisPeriod > 0
          ? 100
          : 0;

    // Get daily subscriber growth for chart
    const dailyGrowth = await prisma.newsletterSubscription.groupBy({
      by: ['subscribedAt'],
      _count: {
        id: true,
      },
      where: {
        subscribedAt: {
          gte: daysAgo,
        },
      },
      orderBy: {
        subscribedAt: 'asc',
      },
    });

    // Format daily growth data
    const chartData = dailyGrowth.map((day) => ({
      date: day.subscribedAt.toISOString().split('T')[0],
      subscribers: day._count.id,
    }));

    // Get top performing campaigns
    const topCampaigns = await prisma.emailCampaign.findMany({
      take: 5,
      orderBy: { sentTo: 'desc' },
      select: {
        id: true,
        subject: true,
        type: true,
        sentTo: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalSubscribers,
          activeSubscribers,
          newSubscribersThisPeriod,
          growthRate: Math.round(growthRate * 100) / 100,
          totalCampaigns: emailCampaigns,
          totalMessages: contactMessages,
          unreadMessages,
        },
        subscribers: {
          bySource: subscribersBySource.map((source) => ({
            source: source.source || 'unknown',
            count: source._count.id,
          })),
          dailyGrowth: chartData,
        },
        campaigns: {
          recent: recentCampaigns,
          topPerforming: topCampaigns,
        },
        period: parseInt(period),
      },
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching analytics.' },
      { status: 500 }
    );
  }
}

// Get detailed analytics for specific metrics
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { metric, period = '30' } = body;

    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(period));

    let data;

    switch (metric) {
      case 'subscriber_growth':
        // Get detailed subscriber growth data
        const growthData = await prisma.newsletterSubscription.groupBy({
          by: ['subscribedAt'],
          _count: {
            id: true,
          },
          where: {
            subscribedAt: {
              gte: daysAgo,
            },
          },
          orderBy: {
            subscribedAt: 'asc',
          },
        });

        data = growthData.map((day) => ({
          date: day.subscribedAt.toISOString().split('T')[0],
          subscribers: day._count.id,
        }));
        break;

      case 'campaign_performance':
        // Get campaign performance data
        const campaignData = await prisma.emailCampaign.findMany({
          where: {
            createdAt: {
              gte: daysAgo,
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            id: true,
            subject: true,
            type: true,
            sentTo: true,
            status: true,
            createdAt: true,
          },
        });

        data = campaignData;
        break;

      case 'source_breakdown':
        // Get detailed source breakdown
        const sourceData = await prisma.newsletterSubscription.groupBy({
          by: ['source'],
          _count: {
            id: true,
          },
          where: {
            subscribedAt: {
              gte: daysAgo,
            },
          },
        });

        data = sourceData.map((source) => ({
          source: source.source || 'unknown',
          count: source._count.id,
        }));
        break;

      default:
        return NextResponse.json(
          { success: false, message: 'Invalid metric specified.' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      data: {
        metric,
        period: parseInt(period),
        data,
      },
    });
  } catch (error) {
    console.error('Error fetching detailed analytics:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching detailed analytics.' },
      { status: 500 }
    );
  }
}
