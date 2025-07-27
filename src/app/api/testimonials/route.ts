import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Get approved reviews from database
    const reviews = await prisma.review.findMany({
      where: { isApproved: true },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        firm: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 10, // Limit to 10 most recent
    });

    // Transform to match expected format
    const testimonials = reviews.map((review) => ({
      id: review.id,
      name: review.user.name || 'Anonymous',
      title: `${review.firm.name} User`,
      review: review.text,
      avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`,
      rating: review.rating,
      source: 'database' as const,
      firmName: review.firm.name,
      createdAt: review.createdAt.toISOString(),
    }));

    // If no reviews in database, return fallback testimonials
    if (testimonials.length === 0) {
      const fallbackTestimonials = [
        {
          id: '1',
          name: 'Alice Johnson',
          title: 'Day Trader',
          review:
            'This platform made it so easy to compare prop firms. I found the perfect fit for my trading style!',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          rating: 5,
          source: 'fallback' as const,
          createdAt: '2024-01-15T00:00:00Z',
        },
        {
          id: '2',
          name: 'Brian Lee',
          title: 'Forex Trader',
          review:
            'The reviews and filters are top-notch. I saved hours of research. Highly recommended!',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          rating: 5,
          source: 'fallback' as const,
          createdAt: '2024-01-14T00:00:00Z',
        },
      ];

      return NextResponse.json({
        testimonials: fallbackTestimonials,
        total: fallbackTestimonials.length,
        source: 'fallback',
      });
    }

    return NextResponse.json({
      testimonials,
      total: testimonials.length,
      source: 'database',
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);

    // Return fallback data on error
    const fallbackTestimonials = [
      {
        id: '1',
        name: 'Alice Johnson',
        title: 'Day Trader',
        review:
          'This platform made it so easy to compare prop firms. I found the perfect fit for my trading style!',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        rating: 5,
        source: 'fallback' as const,
        createdAt: '2024-01-15T00:00:00Z',
      },
      {
        id: '2',
        name: 'Brian Lee',
        title: 'Forex Trader',
        review:
          'The reviews and filters are top-notch. I saved hours of research. Highly recommended!',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        rating: 5,
        source: 'fallback' as const,
        createdAt: '2024-01-14T00:00:00Z',
      },
    ];

    return NextResponse.json({
      testimonials: fallbackTestimonials,
      total: fallbackTestimonials.length,
      source: 'fallback',
      error: 'Database error, using fallback data',
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.review || !body.title) {
      return NextResponse.json({ error: 'Name, title, and review are required' }, { status: 400 });
    }

    // In a real app, this would save to a database
    const newTestimonial = {
      id: Date.now().toString(),
      ...body,
      rating: body.rating || 5,
      approved: false, // New testimonials need admin approval
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(newTestimonial, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
