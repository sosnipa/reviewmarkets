import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Get all testimonials from database (no authentication required for admin panel)
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Transform to match expected format
    const transformedTestimonials = testimonials.map((testimonial) => ({
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

    return NextResponse.json({
      testimonials: transformedTestimonials,
      total: transformedTestimonials.length,
    });
  } catch (error) {
    console.error('Error fetching all testimonials:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}
