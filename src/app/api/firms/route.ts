import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country');
    const asset = searchParams.get('asset');

    // Build where clause for filtering
    const where: {
      country?: string;
      assets?: { contains: string };
    } = {};

    if (country) {
      where.country = country;
    }

    if (asset) {
      // Search in the JSON string of assets
      where.assets = {
        contains: asset,
      };
    }

    // Fetch firms from database
    const firms = await prisma.propFirm.findMany({
      where,
      orderBy: { rating: 'desc' },
    });

    // Transform the data to match the expected format
    const transformedFirms = firms.map((firm) => ({
      id: firm.id,
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
    }));

    // Get unique countries and assets for filters
    const allFirms = await prisma.propFirm.findMany();
    const countries = [...new Set(allFirms.map((f) => f.country))];
    const allAssets = allFirms.flatMap((f) => JSON.parse(f.assets));
    const uniqueAssets = [...new Set(allAssets)];

    return NextResponse.json({
      firms: transformedFirms,
      total: transformedFirms.length,
      filters: {
        country: country || null,
        asset: asset || null,
      },
      availableFilters: {
        countries,
        assets: uniqueAssets,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching firms:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching prop firms.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.country) {
      return NextResponse.json({ error: 'Name and country are required' }, { status: 400 });
    }

    // In a real app, this would save to a database
    const newFirm = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(newFirm, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
