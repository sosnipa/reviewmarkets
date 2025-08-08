import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

interface WhereClause {
  email?: {
    contains: string;
    mode: 'insensitive';
  };
  isActive?: boolean;
}

// Get all subscribers with pagination and filtering
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'all';

    const skip = (page - 1) * limit;

    // Build where clause
    const where: WhereClause = {};

    if (search) {
      where.email = {
        contains: search,
        mode: 'insensitive',
      };
    }

    if (status !== 'all') {
      where.isActive = status === 'active';
    }

    // Get subscribers with pagination
    const [subscribers, total] = await Promise.all([
      prisma.newsletterSubscription.findMany({
        where,
        skip,
        take: limit,
        orderBy: { subscribedAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.newsletterSubscription.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: {
        subscribers,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching subscribers.' },
      { status: 500 }
    );
  }
}

// Create new subscriber (admin can add subscribers manually)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, source = 'admin' } = body;

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required.' }, { status: 400 });
    }

    // Check if subscriber already exists
    const existingSubscriber = await prisma.newsletterSubscription.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingSubscriber) {
      return NextResponse.json(
        { success: false, message: 'Subscriber already exists.' },
        { status: 400 }
      );
    }

    // Create new subscriber
    const subscriber = await prisma.newsletterSubscription.create({
      data: {
        email: email.toLowerCase(),
        source,
        isActive: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Subscriber added successfully.',
      data: subscriber,
    });
  } catch (error) {
    console.error('Error creating subscriber:', error);
    return NextResponse.json(
      { success: false, message: 'Error creating subscriber.' },
      { status: 500 }
    );
  }
}

// Bulk operations (activate/deactivate multiple subscribers)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { ids, action } = body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Subscriber IDs are required.' },
        { status: 400 }
      );
    }

    if (!['activate', 'deactivate'].includes(action)) {
      return NextResponse.json(
        { success: false, message: 'Invalid action. Use "activate" or "deactivate".' },
        { status: 400 }
      );
    }

    const isActive = action === 'activate';

    // Update multiple subscribers
    const result = await prisma.newsletterSubscription.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        isActive,
      },
    });

    return NextResponse.json({
      success: true,
      message: `${action === 'activate' ? 'Activated' : 'Deactivated'} ${result.count} subscribers.`,
      data: { updatedCount: result.count },
    });
  } catch (error) {
    console.error('Error updating subscribers:', error);
    return NextResponse.json(
      { success: false, message: 'Error updating subscribers.' },
      { status: 500 }
    );
  }
}

// Delete multiple subscribers
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get('ids');

    if (!ids) {
      return NextResponse.json(
        { success: false, message: 'Subscriber IDs are required.' },
        { status: 400 }
      );
    }

    const idArray = ids.split(',');

    // Delete multiple subscribers
    const result = await prisma.newsletterSubscription.deleteMany({
      where: {
        id: {
          in: idArray,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: `Deleted ${result.count} subscribers.`,
      data: { deletedCount: result.count },
    });
  } catch (error) {
    console.error('Error deleting subscribers:', error);
    return NextResponse.json(
      { success: false, message: 'Error deleting subscribers.' },
      { status: 500 }
    );
  }
}
