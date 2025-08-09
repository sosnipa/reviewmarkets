interface TrustpilotReview {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  rating: number;
  text: string;
  title?: string;
  createdAt: string;
  helpful: number;
}

interface TrustpilotResponse {
  reviews: TrustpilotReview[];
  total: number;
  averageRating: number;
}

export class TrustpilotService {
  private static readonly API_BASE = 'https://api.trustpilot.com/v1';
  private static readonly API_KEY = process.env.TRUSTPILOT_API_KEY;

  /**
   * Get reviews for a specific business
   * Note: Trustpilot API requires a paid subscription
   */
  static async getBusinessReviews(
    businessId: string,
    limit: number = 10
  ): Promise<TrustpilotResponse> {
    try {
      if (!this.API_KEY) {
        console.log('Trustpilot API key not configured - API requires paid subscription');
        return {
          reviews: [],
          total: 0,
          averageRating: 0,
        };
      }

      const response = await fetch(
        `${this.API_BASE}/businesses/${businessId}/reviews?limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${this.API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        if (response.status === 403) {
          console.log('Trustpilot API access denied - requires paid subscription');
        } else {
          console.error(`Trustpilot API error: ${response.status}`);
        }
        return {
          reviews: [],
          total: 0,
          averageRating: 0,
        };
      }

      const data = await response.json();

      return {
        reviews: data.reviews.map((review: {
          id: string;
          author: { name: string; avatar?: string };
          rating: number;
          text: string;
          title?: string;
          createdAt: string;
          helpful?: number;
        }) => ({
          id: review.id,
          author: {
            name: review.author.name,
            avatar: review.author.avatar,
          },
          rating: review.rating,
          text: review.text,
          title: review.title,
          createdAt: review.createdAt,
          helpful: review.helpful || 0,
        })),
        total: data.total,
        averageRating: data.averageRating,
      };
    } catch (error) {
      console.error('Error fetching Trustpilot reviews:', error);
      return {
        reviews: [],
        total: 0,
        averageRating: 0,
      };
    }
  }

  /**
   * Search for businesses by name
   * Note: Trustpilot API requires a paid subscription
   */
  static async searchBusinesses(query: string): Promise<Array<{ id: string; name: string }>> {
    try {
      if (!this.API_KEY) {
        console.log('Trustpilot API key not configured - API requires paid subscription');
        return [];
      }

      const response = await fetch(
        `${this.API_BASE}/businesses/search?query=${encodeURIComponent(query)}`,
        {
          headers: {
            Authorization: `Bearer ${this.API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        if (response.status === 403) {
          console.log('Trustpilot API access denied - requires paid subscription');
        } else {
          console.error(`Trustpilot API error: ${response.status}`);
        }
        return [];
      }

      const data = await response.json();
      return data.businesses || [];
    } catch (error) {
      console.error('Error searching Trustpilot businesses:', error);
      return [];
    }
  }

  /**
   * Get reviews for multiple prop firms
   */
  static async getMultiplePropFirmReviews(
    firmNames: string[]
  ): Promise<Record<string, TrustpilotResponse>> {
    const results: Record<string, TrustpilotResponse> = {};

    for (const firmName of firmNames) {
      try {
        // Search for the business first
        const businesses = await this.searchBusinesses(firmName);

        if (businesses.length > 0) {
          const businessId = businesses[0].id;
          const reviews = await this.getBusinessReviews(businessId, 5);
          results[firmName] = reviews;
        } else {
          results[firmName] = { reviews: [], total: 0, averageRating: 0 };
        }
      } catch (error) {
        console.error(`Error fetching reviews for ${firmName}:`, error);
        results[firmName] = { reviews: [], total: 0, averageRating: 0 };
      }
    }

    return results;
  }

  /**
   * Transform Trustpilot reviews to testimonial format
   */
  static transformToTestimonials(reviews: TrustpilotReview[], firmName: string) {
    return reviews.map((review, index) => ({
      id: `tp-${firmName}-${index}`,
      name: review.author.name,
      title: `${firmName} User`,
      review: review.text,
      avatar:
        review.author.avatar ||
        `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`,
      rating: review.rating,
      isApproved: true,
      source: 'trustpilot' as const,
      firmName,
      createdAt: review.createdAt,
    }));
  }
}
