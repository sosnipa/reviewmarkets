import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { TrustpilotService } from '@/lib/services/trustpilot';

export async function GET() {
  try {
    // Get approved testimonials from database
    const testimonials = await prisma.testimonial.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    // Transform to match expected format
    const dbTestimonials = testimonials.map((testimonial) => ({
      id: testimonial.id,
      name: testimonial.name,
      title: testimonial.title,
      review: testimonial.review,
      avatar:
        testimonial.avatar ||
        `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`,
      rating: testimonial.rating,
      isApproved: testimonial.isApproved,
      source: testimonial.source,
      firmName: testimonial.firmName,
      createdAt: testimonial.createdAt.toISOString(),
    }));

    // Try to get Trustpilot reviews if API key is configured
    // Note: Trustpilot API requires a paid subscription
    let trustpilotTestimonials: any[] = [];
    if (process.env.TRUSTPILOT_API_KEY) {
      try {
        const firmNames = ['FTMO', 'The5ers', 'MyForexFunds', 'Earn2Trade', 'SurgeTrader'];
        const trustpilotData = await TrustpilotService.getMultiplePropFirmReviews(firmNames);

        Object.entries(trustpilotData).forEach(([firmName, data]) => {
          if (data && data.reviews.length > 0) {
            const transformed = TrustpilotService.transformToTestimonials(
              data.reviews.slice(0, 2),
              firmName
            );
            trustpilotTestimonials.push(...transformed);
          }
        });
      } catch (error) {
        console.error('Error fetching Trustpilot reviews:', error);
      }
    } else {
      console.log('Trustpilot API key not configured - API requires paid subscription');
    }

    // Combine and sort by date
    const allTestimonials = [...dbTestimonials, ...trustpilotTestimonials];
    const sortedTestimonials = allTestimonials.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // If no testimonials available, return fallback
    if (sortedTestimonials.length === 0) {
      const fallbackTestimonials = [
        {
          id: '1',
          name: 'Alice Johnson',
          title: 'Day Trader',
          review:
            'This platform made it so easy to compare prop firms. I found the perfect fit for my trading style!',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          rating: 5,
          isApproved: true,
          source: 'fallback',
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
          isApproved: true,
          source: 'fallback',
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
      testimonials: sortedTestimonials,
      total: sortedTestimonials.length,
      source: 'combined',
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
        isApproved: true,
        source: 'fallback',
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
        isApproved: true,
        source: 'fallback',
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
    const { name, title, review, rating, email, firmName } = body;

    // Basic validation
    if (!name || !title || !review) {
      return NextResponse.json({ error: 'Name, title, and review are required' }, { status: 400 });
    }

    // Get IP address for spam prevention
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';

    // Create testimonial
    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        title,
        review,
        rating: rating || 5,
        email,
        firmName,
        ipAddress: ip,
        isApproved: false, // Requires admin approval
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Testimonial submitted successfully and pending approval',
      testimonial,
    });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ error: 'Failed to submit testimonial' }, { status: 500 });
  }
}
