import { NextResponse } from 'next/server';
import DataAggregatorService from '@/lib/services/dataAggregator';

export async function GET() {
  try {
    // Get enhanced testimonials with Trustpilot data
    const testimonials = await DataAggregatorService.getEnhancedTestimonials();

    // Only return approved testimonials (for now, all are approved)
    const approvedTestimonials = testimonials.filter(() => true); // In future, add approval logic

    return NextResponse.json({
      testimonials: approvedTestimonials,
      total: approvedTestimonials.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);

    // Return fallback data if APIs fail
    const fallbackTestimonials = [
      {
        id: '1',
        name: 'Alice Johnson',
        title: 'Day Trader',
        review:
          'This platform made it so easy to compare prop firms. I found the perfect fit for my trading style!',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        rating: 5,
        approved: true,
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
        approved: true,
        createdAt: '2024-01-14T00:00:00Z',
      },
      {
        id: '3',
        name: 'Carla Mendes',
        title: 'Futures Trader',
        review:
          'I love the clean design and the detailed firm breakdowns. Helped me avoid some bad choices!',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        rating: 4,
        approved: true,
        createdAt: '2024-01-13T00:00:00Z',
      },
      {
        id: '4',
        name: 'David Kim',
        title: 'Swing Trader',
        review:
          'The testimonials and user feedback gave me confidence in my decision. Great resource!',
        avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
        rating: 5,
        approved: true,
        createdAt: '2024-01-12T00:00:00Z',
      },
      {
        id: '5',
        name: 'Emma Wilson',
        title: 'Crypto Trader',
        review:
          'Found my ideal prop firm through this platform. The comparison tools are invaluable!',
        avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
        rating: 4,
        approved: true,
        createdAt: '2024-01-11T00:00:00Z',
      },
    ];

    return NextResponse.json({
      testimonials: fallbackTestimonials,
      total: fallbackTestimonials.length,
      timestamp: new Date().toISOString(),
      note: 'Using fallback data due to API issues',
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
