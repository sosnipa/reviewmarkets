import axios from 'axios';

interface TrustpilotReview {
  id: string;
  title: string;
  text: string;
  rating: number;
  createdAt: string;
  author: {
    name: string;
    location?: string;
  };
  helpful: number;
  language: string;
}

interface TrustpilotBusiness {
  id: string;
  name: string;
  displayName: string;
  websiteUrl: string;
  rating: number;
  reviewCount: number;
  stars: {
    '1': number;
    '2': number;
    '3': number;
    '4': number;
    '5': number;
  };
  location?: {
    city: string;
    country: string;
  };
}

interface TrustpilotResponse {
  reviews: TrustpilotReview[];
  business: TrustpilotBusiness;
  totalReviews: number;
}

export class TrustpilotService {
  private static instance: TrustpilotService;
  private apiKey: string;

  private constructor() {
    this.apiKey = process.env.TRUSTPILOT_API_KEY || '';
  }

  public static getInstance(): TrustpilotService {
    if (!TrustpilotService.instance) {
      TrustpilotService.instance = new TrustpilotService();
    }
    return TrustpilotService.instance;
  }

  /**
   * Search for businesses by name
   */
  async searchBusinesses(query: string): Promise<TrustpilotBusiness[]> {
    try {
      // Check if API key is available
      if (!this.apiKey || this.apiKey === 'your_trustpilot_api_key_here') {
        console.log('Trustpilot API key not configured, skipping API call');
        return [];
      }

      const response = await axios.get(`https://api.trustpilot.com/v1/business-units/find`, {
        params: {
          name: query,
          country: 'US',
        },
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data.businessUnits || [];
    } catch (error) {
      console.error('Error searching Trustpilot businesses:', error);
      return [];
    }
  }

  /**
   * Get business details and reviews
   */
  async getBusinessReviews(
    businessId: string,
    page: number = 1
  ): Promise<TrustpilotResponse | null> {
    try {
      const [businessResponse, reviewsResponse] = await Promise.all([
        axios.get(`https://api.trustpilot.com/v1/business-units/${businessId}`, {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }),
        axios.get(`https://api.trustpilot.com/v1/business-units/${businessId}/reviews`, {
          params: {
            page,
            perPage: 10,
            stars: '1,2,3,4,5',
          },
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }),
      ]);

      return {
        business: businessResponse.data,
        reviews: reviewsResponse.data.reviews || [],
        totalReviews: reviewsResponse.data.totalReviews || 0,
      };
    } catch (error) {
      console.error('Error fetching Trustpilot business reviews:', error);
      return null;
    }
  }

  /**
   * Get reviews for specific prop firms
   */
  async getPropFirmReviews(firmName: string): Promise<TrustpilotResponse | null> {
    try {
      // Search for the business first
      const businesses = await this.searchBusinesses(firmName);

      if (businesses.length === 0) {
        console.log(`No Trustpilot business found for: ${firmName}`);
        return null;
      }

      // Get the first (most relevant) result
      const business = businesses[0];
      return await this.getBusinessReviews(business.id);
    } catch (error) {
      console.error(`Error fetching reviews for ${firmName}:`, error);
      return null;
    }
  }

  /**
   * Get multiple prop firm reviews
   */
  async getMultiplePropFirmReviews(
    firmNames: string[]
  ): Promise<Record<string, TrustpilotResponse | null>> {
    try {
      const results: Record<string, TrustpilotResponse | null> = {};

      // Fetch reviews for each firm in parallel
      const promises = firmNames.map(async (firmName) => {
        const reviews = await this.getPropFirmReviews(firmName);
        return { firmName, reviews };
      });

      const responses = await Promise.all(promises);

      responses.forEach(({ firmName, reviews }) => {
        results[firmName] = reviews;
      });

      return results;
    } catch (error) {
      console.error('Error fetching multiple prop firm reviews:', error);
      return {};
    }
  }

  /**
   * Get business rating summary
   */
  async getBusinessRating(
    businessId: string
  ): Promise<{ rating: number; reviewCount: number } | null> {
    try {
      const response = await axios.get(
        `https://api.trustpilot.com/v1/business-units/${businessId}`,
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        rating: response.data.rating || 0,
        reviewCount: response.data.numberOfReviews || 0,
      };
    } catch (error) {
      console.error('Error fetching business rating:', error);
      return null;
    }
  }
}

export default TrustpilotService.getInstance();
