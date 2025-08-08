import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAdminFromRequest } from '@/lib/auth';

interface WhereClause {
  isApproved?: boolean;
  OR?: Array<{
    name?: { contains: string; mode: 'insensitive' };
    title?: { contains: string; mode: 'insensitive' };
    review?: { contains: string; mode: 'insensitive' };
    firmName?: { contains: string; mode: 'insensitive' };
  }>;
}

interface UpdateData {
  isApproved?: boolean;
}

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status'); // approved, pending, all
    const search = searchParams.get('search') || '';

    const skip = (page - 1) * limit;

    // Build where clause
    const where: WhereClause = {};
    if (status === 'approved') {
      where.isApproved = true;
    } else if (status === 'pending') {
      where.isApproved = false;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { title: { contains: search, mode: 'insensitive' } },
        { review: { contains: search, mode: 'insensitive' } },
        { firmName: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Get testimonials with pagination
    const [testimonials, total] = await Promise.all([
      prisma.testimonial.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.testimonial.count({ where }),
    ]);

    return NextResponse.json({
      testimonials,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, title, review, rating, avatar, firmName, source } = body;

    // Basic validation
    if (!name || !title || !review) {
      return NextResponse.json({ error: 'Name, title, and review are required' }, { status: 400 });
    }

    // Create testimonial
    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        title,
        review,
        rating: rating || 5,
        avatar,
        firmName,
        source: source || 'admin',
        isApproved: true, // Admin-created testimonials are auto-approved
      },
    });

    return NextResponse.json({
      success: true,
      testimonial,
    });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Verify admin authentication
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action, testimonialIds } = body;

    if (!action || !testimonialIds || !Array.isArray(testimonialIds)) {
      return NextResponse.json(
        { error: 'Action and testimonial IDs are required' },
        { status: 400 }
      );
    }

    const updateData: UpdateData = (() => {
      switch (action) {
        case 'approve':
          return { isApproved: true };
        case 'reject':
          return { isApproved: false };
        default:
          return {};
      }
    })();

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    // Update testimonials
    const result = await prisma.testimonial.updateMany({
      where: {
        id: { in: testimonialIds },
      },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: `Successfully ${action}d ${result.count} testimonials`,
      updatedCount: result.count,
    });
  } catch (error) {
    console.error('Error updating testimonials:', error);
    return NextResponse.json({ error: 'Failed to update testimonials' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Verify admin authentication
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const testimonialIds = searchParams.get('ids');

    if (!testimonialIds) {
      return NextResponse.json({ error: 'Testimonial IDs are required' }, { status: 400 });
    }

    const ids = testimonialIds.split(',');

    // Delete testimonials
    const result = await prisma.testimonial.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${result.count} testimonials`,
      deletedCount: result.count,
    });
  } catch (error) {
    console.error('Error deleting testimonials:', error);
    return NextResponse.json({ error: 'Failed to delete testimonials' }, { status: 500 });
  }
}
