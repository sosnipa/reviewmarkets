import axios from 'axios';

interface ScrapingResult {
  success: boolean;
  data?: string;
  error?: string;
}

interface PropFirmDetails {
  name: string;
  website: string;
  accountTypes: string[];
  profitSplit: string;
  evaluationCriteria: string[];
  minimumDeposit: string;
  maximumAllocation: string;
  supportedPlatforms: string[];
  supportedMarkets: string[];
  fees: string[];
  rules: string[];
  lastUpdated: string;
}

export class ScrapingService {
  private static instance: ScrapingService;
  private apiKey: string;

  private constructor() {
    this.apiKey = process.env.SCRAPINGBEE_API_KEY || '';
  }

  public static getInstance(): ScrapingService {
    if (!ScrapingService.instance) {
      ScrapingService.instance = new ScrapingService();
    }
    return ScrapingService.instance;
  }

  /**
   * Scrape a website using ScrapingBee
   */
  async scrapeWebsite(url: string, options: Record<string, unknown> = {}): Promise<ScrapingResult> {
    try {
      const response = await axios.get('https://app.scrapingbee.com/api/v1/', {
        params: {
          api_key: this.apiKey,
          url: url,
          render_js: 'false',
          premium_proxy: 'true',
          country_code: 'us',
          ...options,
        },
        timeout: 30000,
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error scraping website:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Scrape prop firm details from their website
   */
  async scrapePropFirmDetails(firmName: string, website: string): Promise<PropFirmDetails | null> {
    try {
      const result = await this.scrapeWebsite(website);

      if (!result.success || !result.data) {
        return null;
      }

      // Parse the HTML content to extract relevant information
      // This is a simplified version - in production you'd use more sophisticated parsing
      const html = result.data;

      // Extract basic information using regex patterns
      const details: PropFirmDetails = {
        name: firmName,
        website: website,
        accountTypes: this.extractAccountTypes(html),
        profitSplit: this.extractProfitSplit(html),
        evaluationCriteria: this.extractEvaluationCriteria(html),
        minimumDeposit: this.extractMinimumDeposit(html),
        maximumAllocation: this.extractMaximumAllocation(html),
        supportedPlatforms: this.extractSupportedPlatforms(html),
        supportedMarkets: this.extractSupportedMarkets(html),
        fees: this.extractFees(html),
        rules: this.extractRules(html),
        lastUpdated: new Date().toISOString(),
      };

      return details;
    } catch (error) {
      console.error(`Error scraping details for ${firmName}:`, error);
      return null;
    }
  }

  /**
   * Extract account types from HTML
   */
  private extractAccountTypes(html: string): string[] {
    const patterns = [
      /account\s*types?[:\s]*([^<]+)/gi,
      /funding\s*programs?[:\s]*([^<]+)/gi,
      /challenge[:\s]*([^<]+)/gi,
    ];

    const types: string[] = [];
    patterns.forEach((pattern) => {
      const matches = html.match(pattern);
      if (matches) {
        types.push(...matches.map((match) => match.replace(/account\s*types?[:\s]*/gi, '').trim()));
      }
    });

    return [...new Set(types)].slice(0, 5); // Remove duplicates and limit to 5
  }

  /**
   * Extract profit split information
   */
  private extractProfitSplit(html: string): string {
    const patterns = [
      /profit\s*split[:\s]*([^<]+)/gi,
      /profit\s*share[:\s]*([^<]+)/gi,
      /(\d+%)\s*profit/gi,
    ];

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match) {
        return match[1] || match[0];
      }
    }

    return 'Not specified';
  }

  /**
   * Extract evaluation criteria
   */
  private extractEvaluationCriteria(html: string): string[] {
    const patterns = [
      /evaluation[:\s]*([^<]+)/gi,
      /requirements[:\s]*([^<]+)/gi,
      /criteria[:\s]*([^<]+)/gi,
    ];

    const criteria: string[] = [];
    patterns.forEach((pattern) => {
      const matches = html.match(pattern);
      if (matches) {
        criteria.push(...matches.map((match) => match.replace(/evaluation[:\s]*/gi, '').trim()));
      }
    });

    return [...new Set(criteria)].slice(0, 10);
  }

  /**
   * Extract minimum deposit
   */
  private extractMinimumDeposit(html: string): string {
    const patterns = [
      /minimum\s*deposit[:\s]*([^<]+)/gi,
      /starting\s*from[:\s]*([^<]+)/gi,
      /(\$\d+[,\d]*)\s*minimum/gi,
    ];

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match) {
        return match[1] || match[0];
      }
    }

    return 'Not specified';
  }

  /**
   * Extract maximum allocation
   */
  private extractMaximumAllocation(html: string): string {
    const patterns = [
      /maximum\s*allocation[:\s]*([^<]+)/gi,
      /up\s*to[:\s]*([^<]+)/gi,
      /(\$\d+[,\d]*)\s*maximum/gi,
    ];

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match) {
        return match[1] || match[0];
      }
    }

    return 'Not specified';
  }

  /**
   * Extract supported platforms
   */
  private extractSupportedPlatforms(html: string): string[] {
    const platforms = ['MT4', 'MT5', 'cTrader', 'NinjaTrader'];
    const found: string[] = [];

    platforms.forEach((platform) => {
      if (html.toLowerCase().includes(platform.toLowerCase())) {
        found.push(platform);
      }
    });

    return found;
  }

  /**
   * Extract supported markets
   */
  private extractSupportedMarkets(html: string): string[] {
    const markets = ['Forex', 'Crypto', 'Indices', 'Stocks', 'Commodities', 'Futures'];
    const found: string[] = [];

    markets.forEach((market) => {
      if (html.toLowerCase().includes(market.toLowerCase())) {
        found.push(market);
      }
    });

    return found;
  }

  /**
   * Extract fees information
   */
  private extractFees(html: string): string[] {
    const patterns = [
      /fees?[:\s]*([^<]+)/gi,
      /commission[:\s]*([^<]+)/gi,
      /charges?[:\s]*([^<]+)/gi,
    ];

    const fees: string[] = [];
    patterns.forEach((pattern) => {
      const matches = html.match(pattern);
      if (matches) {
        fees.push(...matches.map((match) => match.replace(/fees?[:\s]*/gi, '').trim()));
      }
    });

    return [...new Set(fees)].slice(0, 5);
  }

  /**
   * Extract trading rules
   */
  private extractRules(html: string): string[] {
    const patterns = [
      /rules?[:\s]*([^<]+)/gi,
      /restrictions?[:\s]*([^<]+)/gi,
      /limitations?[:\s]*([^<]+)/gi,
    ];

    const rules: string[] = [];
    patterns.forEach((pattern) => {
      const matches = html.match(pattern);
      if (matches) {
        rules.push(...matches.map((match) => match.replace(/rules?[:\s]*/gi, '').trim()));
      }
    });

    return [...new Set(rules)].slice(0, 10);
  }

  /**
   * Scrape multiple prop firms
   */
  async scrapeMultiplePropFirms(
    firms: Array<{ name: string; website: string }>
  ): Promise<Record<string, PropFirmDetails | null>> {
    try {
      const results: Record<string, PropFirmDetails | null> = {};

      // Scrape each firm in parallel (with rate limiting)
      const promises = firms.map(async (firm, index) => {
        // Add delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, index * 1000));
        const details = await this.scrapePropFirmDetails(firm.name, firm.website);
        return { name: firm.name, details };
      });

      const responses = await Promise.all(promises);

      responses.forEach(({ name, details }) => {
        results[name] = details;
      });

      return results;
    } catch (error) {
      console.error('Error scraping multiple prop firms:', error);
      return {};
    }
  }
}

export default ScrapingService.getInstance();
