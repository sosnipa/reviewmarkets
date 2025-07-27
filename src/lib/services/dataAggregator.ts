import TrustpilotService from './trustpilot';
import ScrapingService from './scraping';

interface AggregatedFirmData {
  id: string;
  name: string;
  logo: string;
  country: string;
  rating: number;
  reviews: number;
  years: number;
  assets: string[];
  platforms: string[];
  maxAllocation: string;
  promo: string;
  description?: string;
  website?: string;

  // Enhanced data from APIs
  trustpilotData?: {
    rating: number;
    reviewCount: number;
    recentReviews: Array<{
      title: string;
      text: string;
      rating: number;
      author: string;
      date: string;
    }>;
  };

  scrapedData?: {
    accountTypes: string[];
    profitSplit: string;
    evaluationCriteria: string[];
    minimumDeposit: string;
    fees: string[];
    rules: string[];
    lastUpdated: string;
  };

  marketData?: {
    supportedMarkets: string[];
    currentTrends: string[];
  };

  lastUpdated: string;
}

interface MarketOverview {
  forex: Array<{
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
  }>;
  crypto: Array<{
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
  }>;
  indices: Array<{
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
  }>;
  timestamp: string;
}

export class DataAggregatorService {
  private static instance: DataAggregatorService;

  private constructor() {}

  public static getInstance(): DataAggregatorService {
    if (!DataAggregatorService.instance) {
      DataAggregatorService.instance = new DataAggregatorService();
    }
    return DataAggregatorService.instance;
  }

  /**
   * Get comprehensive data for all prop firms
   */
  async getAggregatedFirmData(): Promise<AggregatedFirmData[]> {
    try {
      // Base firm data (from our current mock data)
      const baseFirms = [
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
        },
      ];

      // Fetch additional data from APIs
      const firmNames = baseFirms.map((firm) => firm.name);

      const [trustpilotData, scrapedData] = await Promise.all([
        TrustpilotService.getMultiplePropFirmReviews(firmNames),
        ScrapingService.scrapeMultiplePropFirms(
          baseFirms.map((firm) => ({ name: firm.name, website: firm.website }))
        ),
      ]);

      // Combine all data
      const aggregatedFirms: AggregatedFirmData[] = baseFirms.map((firm) => {
        const trustpilot = trustpilotData[firm.name];
        const scraped = scrapedData[firm.name];

        return {
          ...firm,
          trustpilotData: trustpilot
            ? {
                rating: trustpilot.business.rating,
                reviewCount: trustpilot.business.reviewCount,
                recentReviews: trustpilot.reviews.slice(0, 3).map((review) => ({
                  title: review.title,
                  text: review.text,
                  rating: review.rating,
                  author: review.author.name,
                  date: review.createdAt,
                })),
              }
            : undefined,

          scrapedData: scraped
            ? {
                accountTypes: scraped.accountTypes,
                profitSplit: scraped.profitSplit,
                evaluationCriteria: scraped.evaluationCriteria,
                minimumDeposit: scraped.minimumDeposit,
                fees: scraped.fees,
                rules: scraped.rules,
                lastUpdated: scraped.lastUpdated,
              }
            : undefined,

          marketData: {
            supportedMarkets: scraped?.supportedMarkets || firm.assets,
            currentTrends: this.getCurrentTrends(),
          },

          lastUpdated: new Date().toISOString(),
        };
      });

      return aggregatedFirms;
    } catch (error) {
      console.error('Error aggregating firm data:', error);
      return [];
    }
  }

  /**
   * Get market overview with current trends
   */
  async getMarketOverview(): Promise<MarketOverview> {
    try {
      // Removed TradingViewService.getMarketOverview()
      return {
        forex: [],
        crypto: [],
        indices: [],
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error getting market overview:', error);
      return {
        forex: [],
        crypto: [],
        indices: [],
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Get current trends for specific assets
   */
  private getCurrentTrends(marketData?: {
    forex: Array<{ change_percent: number }>;
    crypto: Array<{ change_percent: number }>;
    indices: Array<{ change_percent: number }>;
  }): string[] {
    const trends: string[] = [];

    // Check if marketData exists before analyzing
    if (!marketData) {
      return trends;
    }

    // Analyze market data to determine trends
    if (marketData.forex && marketData.forex.length > 0) {
      const forexTrend = marketData.forex[0].change_percent > 0 ? 'Bullish' : 'Bearish';
      trends.push(`Forex: ${forexTrend}`);
    }

    if (marketData.crypto && marketData.crypto.length > 0) {
      const cryptoTrend = marketData.crypto[0].change_percent > 0 ? 'Bullish' : 'Bearish';
      trends.push(`Crypto: ${cryptoTrend}`);
    }

    if (marketData.indices && marketData.indices.length > 0) {
      const indicesTrend = marketData.indices[0].change_percent > 0 ? 'Bullish' : 'Bearish';
      trends.push(`Indices: ${indicesTrend}`);
    }

    return trends;
  }

  /**
   * Get enhanced testimonials with Trustpilot data
   */
  async getEnhancedTestimonials(): Promise<
    Array<{
      id: string;
      name: string;
      title: string;
      review: string;
      avatar: string;
      rating: number;
      source: 'trustpilot' | 'local';
      firmName?: string;
      createdAt: string;
    }>
  > {
    try {
      // Get local testimonials
      const localTestimonials = [
        {
          id: '1',
          name: 'Alice Johnson',
          title: 'Day Trader',
          review:
            'This platform made it so easy to compare prop firms. I found the perfect fit for my trading style!',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          rating: 5,
          source: 'local' as const,
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
          source: 'local' as const,
          createdAt: '2024-01-14T00:00:00Z',
        },
      ];

      // Get Trustpilot reviews for major firms
      const firmNames = ['FTMO', 'The5ers', 'Alpha Capital'];
      const trustpilotData = await TrustpilotService.getMultiplePropFirmReviews(firmNames);

      const trustpilotTestimonials: Array<{
        id: string;
        name: string;
        title: string;
        review: string;
        avatar: string;
        rating: number;
        source: 'trustpilot';
        firmName: string;
        createdAt: string;
      }> = [];

      Object.entries(trustpilotData).forEach(([firmName, data]) => {
        if (data && data.reviews.length > 0) {
          data.reviews.slice(0, 2).forEach((review, index) => {
            trustpilotTestimonials.push({
              id: `tp-${firmName}-${index}`,
              name: review.author.name,
              title: `${firmName} User`,
              review: review.text,
              avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`,
              rating: review.rating,
              source: 'trustpilot',
              firmName,
              createdAt: review.createdAt,
            });
          });
        }
      });

      // Combine and sort by date
      const allTestimonials = [...localTestimonials, ...trustpilotTestimonials];
      return allTestimonials.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } catch (error) {
      console.error('Error getting enhanced testimonials:', error);
      return [];
    }
  }
}

export default DataAggregatorService.getInstance();
