import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Get total subscribers
    const totalSubscribers = await prisma.newsletterSubscription.count();

    // Get active subscribers
    const activeSubscribers = await prisma.newsletterSubscription.count({
      where: { isActive: true },
    });

    // Get inactive subscribers
    const inactiveSubscribers = totalSubscribers - activeSubscribers;

    // Calculate growth (subscribers added in last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentSubscribers = await prisma.newsletterSubscription.count({
      where: {
        subscribedAt: {
          gte: thirtyDaysAgo,
        },
      },
    });

    const previousPeriod = new Date();
    previousPeriod.setDate(previousPeriod.getDate() - 60);
    const previousSubscribers = await prisma.newsletterSubscription.count({
      where: {
        subscribedAt: {
          gte: previousPeriod,
          lt: thirtyDaysAgo,
        },
      },
    });

    const growth =
      previousSubscribers > 0
        ? Math.round(((recentSubscribers - previousSubscribers) / previousSubscribers) * 100)
        : recentSubscribers > 0
          ? 100
          : 0;

    // Get subscriber sources
    const sources = await prisma.newsletterSubscription.groupBy({
      by: ['source'],
      _count: {
        source: true,
      },
      orderBy: {
        _count: {
          source: 'desc',
        },
      },
    });

    const topSources = sources.map((source) => ({
      source: source.source || 'unknown',
      count: source._count.source,
    }));

    return NextResponse.json({
      total: totalSubscribers,
      active: activeSubscribers,
      inactive: inactiveSubscribers,
      growth,
      topSources,
    });
  } catch (error) {
    console.error('Error fetching subscriber analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch subscriber analytics' }, { status: 500 });
  }
}
