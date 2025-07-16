import { NextResponse } from 'next/server';
import AlphaVantageService from '@/lib/services/alphavantage';

export async function GET() {
  try {
    // Get market overview with current trends from Alpha Vantage
    const marketData = await AlphaVantageService.getMarketOverview();
    return NextResponse.json({
      ...marketData,
      success: true,
    });
  } catch (error) {
    console.error('Error fetching market data:', error);
    // Return fallback market data if APIs fail
    const fallbackMarketData = {
      forex: [
        { symbol: 'EUR/USD', price: 1.085, change: 0.002, percent_change: 0.18 },
        { symbol: 'GBP/USD', price: 1.265, change: -0.0015, percent_change: -0.12 },
        { symbol: 'USD/JPY', price: 148.5, change: 0.3, percent_change: 0.2 },
      ],
      crypto: [
        { symbol: 'BTC/USD', price: 43250, change: 1250, percent_change: 2.98 },
        { symbol: 'ETH/USD', price: 2650, change: 45, percent_change: 1.73 },
      ],
      indices: [
        { symbol: 'SPY', price: 4850, change: 25, percent_change: 0.52 },
        { symbol: 'QQQ', price: 15250, change: 75, percent_change: 0.49 },
        { symbol: 'DIA', price: 440, change: -4.4, percent_change: -0.99 },
      ],
      timestamp: new Date().toISOString(),
      success: false,
      note: 'Using fallback data due to API issues',
    };
    return NextResponse.json(fallbackMarketData);
  }
}
