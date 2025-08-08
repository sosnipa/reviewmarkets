import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'Testimonial ID is required' }, { status: 400 });
    }

    // Update the testimonial to approved
    const updatedTestimonial = await prisma.testimonial.update({
      where: { id },
      data: { isApproved: true },
    });

    return NextResponse.json({
      success: true,
      testimonial: updatedTestimonial,
    });
  } catch (error) {
    console.error('Error approving testimonial:', error);
    return NextResponse.json({ error: 'Failed to approve testimonial' }, { status: 500 });
  }
}
