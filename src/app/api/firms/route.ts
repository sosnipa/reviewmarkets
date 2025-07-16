import { NextResponse } from 'next/server';
import DataAggregatorService from '@/lib/services/dataAggregator';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.toLowerCase();
  const country = searchParams.get('country');
  const asset = searchParams.get('asset');

  try {
    // Get aggregated firm data from multiple sources
    const firms = await DataAggregatorService.getAggregatedFirmData();

    let filteredFirms = firms;

    // Apply filters
    if (search) {
      filteredFirms = filteredFirms.filter((firm) => firm.name.toLowerCase().includes(search));
    }

    if (country) {
      filteredFirms = filteredFirms.filter((firm) => firm.country === country);
    }

    if (asset) {
      filteredFirms = filteredFirms.filter((firm) => firm.assets.includes(asset));
    }

    return NextResponse.json({
      firms: filteredFirms,
      total: filteredFirms.length,
      filters: {
        search,
        country,
        asset,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching firms data:', error);

    // Return fallback data if APIs fail
    const fallbackFirms = [
      {
        id: '1',
        name: 'Alpha Capital',
        logo: '/Logo.png',
        country: 'GB',
        rating: 4.4,
        reviews: 893,
        years: 3,
        assets: ['FX', 'Indices', 'Metals', 'Other Commodities'],
        platforms: ['MT4', 'MT5'],
        maxAllocation: '$400K',
        promo: '15% OFF',
        description: 'Leading prop firm with excellent track record',
        website: 'https://example.com',
        lastUpdated: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'The5ers',
        logo: '/Logo.png',
        country: 'IL',
        rating: 4.8,
        reviews: 986,
        years: 9,
        assets: ['Crypto', 'Energy', 'FX', 'Other Commodities'],
        platforms: ['MT4', 'cTrader'],
        maxAllocation: '$615K',
        promo: '5% OFF',
        description: 'Established firm with strong community',
        website: 'https://example.com',
        lastUpdated: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'E8 Markets',
        logo: '/Logo.png',
        country: 'US',
        rating: 4.7,
        reviews: 134,
        years: 2,
        assets: ['FX', 'Indices', 'Metals'],
        platforms: ['MT5'],
        maxAllocation: '$900K',
        promo: '5% OFF',
        description: 'US-based firm with high allocation limits',
        website: 'https://example.com',
        lastUpdated: new Date().toISOString(),
      },
      {
        id: '4',
        name: 'FTMO',
        logo: '/Logo.png',
        country: 'CZ',
        rating: 4.6,
        reviews: 1247,
        years: 8,
        assets: ['FX', 'Indices', 'Metals', 'Crypto'],
        platforms: ['MT4', 'MT5'],
        maxAllocation: '$2M',
        promo: '10% OFF',
        description: 'One of the largest prop trading firms',
        website: 'https://example.com',
        lastUpdated: new Date().toISOString(),
      },
      {
        id: '5',
        name: 'MyForexFunds',
        logo: '/Logo.png',
        country: 'CA',
        rating: 4.3,
        reviews: 567,
        years: 4,
        assets: ['FX', 'Indices', 'Metals'],
        platforms: ['MT4', 'MT5'],
        maxAllocation: '$600K',
        promo: '20% OFF',
        description: 'Canadian firm with competitive pricing',
        website: 'https://example.com',
        lastUpdated: new Date().toISOString(),
      },
    ];

    let filteredFallbackFirms = fallbackFirms;

    if (search) {
      filteredFallbackFirms = filteredFallbackFirms.filter((firm) =>
        firm.name.toLowerCase().includes(search)
      );
    }

    if (country) {
      filteredFallbackFirms = filteredFallbackFirms.filter((firm) => firm.country === country);
    }

    if (asset) {
      filteredFallbackFirms = filteredFallbackFirms.filter((firm) => firm.assets.includes(asset));
    }

    return NextResponse.json({
      firms: filteredFallbackFirms,
      total: filteredFallbackFirms.length,
      filters: {
        search,
        country,
        asset,
      },
      timestamp: new Date().toISOString(),
      note: 'Using fallback data due to API issues',
    });
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
