import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const firmId = `firm_${params.id}`;

    // Validate required fields
    if (!body.name || !body.country || !body.maxAllocation) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Update firm
    const firm = await prisma.propFirm.update({
      where: { id: firmId },
      data: {
        name: body.name,
        logo: body.logo || null,
        country: body.country,
        rating: parseFloat(body.rating) || 0,
        reviews: parseInt(body.reviews) || 0,
        years: parseInt(body.years) || 0,
        assets: JSON.stringify(body.assets || []),
        platforms: JSON.stringify(body.platforms || []),
        maxAllocation: body.maxAllocation,
        promo: body.promo || null,
        description: body.description || null,
        website: body.website || null,
      },
    });

    // Transform the response to match frontend expectations
    const transformedFirm = {
      id: parseInt(firm.id.replace('firm_', '')),
      name: firm.name,
      logo: firm.logo,
      country: firm.country,
      rating: firm.rating,
      reviews: firm.reviews,
      years: firm.years,
      assets: JSON.parse(firm.assets),
      platforms: JSON.parse(firm.platforms),
      maxAllocation: firm.maxAllocation,
      promo: firm.promo,
      description: firm.description,
      website: firm.website,
      lastUpdated: firm.updatedAt.toISOString(),
    };

    return NextResponse.json(transformedFirm);
  } catch (error) {
    console.error('Error updating firm:', error);
    return NextResponse.json({ error: 'Failed to update firm' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const firmId = `firm_${params.id}`;

    // Delete firm
    await prisma.propFirm.delete({
      where: { id: firmId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting firm:', error);
    return NextResponse.json({ error: 'Failed to delete firm' }, { status: 500 });
  }
}
