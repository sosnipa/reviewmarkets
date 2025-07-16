import axios from 'axios';

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

export interface AlphaVantageQuote {
  symbol: string;
  price: number | null;
  change: number | null;
  percent_change: number | null;
}

export class AlphaVantageService {
  private static instance: AlphaVantageService;
  private constructor() {}

  public static getInstance(): AlphaVantageService {
    if (!AlphaVantageService.instance) {
      AlphaVantageService.instance = new AlphaVantageService();
    }
    return AlphaVantageService.instance;
  }

  async getForex(symbol: string = 'EURUSD'): Promise<AlphaVantageQuote[]> {
    // Alpha Vantage forex symbols are like 'EURUSD'
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          function: 'CURRENCY_EXCHANGE_RATE',
          from_currency: symbol.slice(0, 3),
          to_currency: symbol.slice(3, 6),
          apikey: API_KEY,
        },
      });
      const data = response.data['Realtime Currency Exchange Rate'];
      if (!data) return [{ symbol, price: null, change: null, percent_change: null }];
      return [
        {
          symbol: `${data['1. From_Currency Code']}/${data['3. To_Currency Code']}`,
          price: parseFloat(data['5. Exchange Rate']),
          change: null, // Not available in this endpoint
          percent_change: null, // Not available in this endpoint
        },
      ];
    } catch (error) {
      console.error('Alpha Vantage forex error:', error);
      return [{ symbol, price: null, change: null, percent_change: null }];
    }
  }

  async getCrypto(symbol: string = 'BTCUSD'): Promise<AlphaVantageQuote[]> {
    // Alpha Vantage crypto symbols are like 'BTCUSD'
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          function: 'CURRENCY_EXCHANGE_RATE',
          from_currency: symbol.slice(0, 3),
          to_currency: symbol.slice(3, 6),
          apikey: API_KEY,
        },
      });
      const data = response.data['Realtime Currency Exchange Rate'];
      if (!data) return [{ symbol, price: null, change: null, percent_change: null }];
      return [
        {
          symbol: `${data['1. From_Currency Code']}/${data['3. To_Currency Code']}`,
          price: parseFloat(data['5. Exchange Rate']),
          change: null, // Not available in this endpoint
          percent_change: null, // Not available in this endpoint
        },
      ];
    } catch (error) {
      console.error('Alpha Vantage crypto error:', error);
      return [{ symbol, price: null, change: null, percent_change: null }];
    }
  }

  async getStock(symbol: string = 'SPY'): Promise<AlphaVantageQuote[]> {
    // Alpha Vantage stock/ETF symbols like 'SPY', 'QQQ', 'DIA'
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol,
          apikey: API_KEY,
        },
      });
      const data = response.data['Global Quote'];
      if (!data) return [{ symbol, price: null, change: null, percent_change: null }];
      return [
        {
          symbol: data['01. symbol'],
          price: parseFloat(data['05. price']),
          change: parseFloat(data['09. change']),
          percent_change: parseFloat(data['10. change percent']?.replace('%', '')),
        },
      ];
    } catch (error) {
      console.error('Alpha Vantage stock error:', error);
      return [{ symbol, price: null, change: null, percent_change: null }];
    }
  }

  async getMarketOverview() {
    // You can expand these lists as needed
    const forexSymbols = ['EURUSD', 'GBPUSD', 'USDJPY'];
    const cryptoSymbols = ['BTCUSD', 'ETHUSD'];
    const stockSymbols = ['SPY', 'QQQ', 'DIA'];

    const [forex, crypto, indices] = await Promise.all([
      Promise.all(forexSymbols.map((s) => this.getForex(s))).then((arr) => arr.flat()),
      Promise.all(cryptoSymbols.map((s) => this.getCrypto(s))).then((arr) => arr.flat()),
      Promise.all(stockSymbols.map((s) => this.getStock(s))).then((arr) => arr.flat()),
    ]);
    return {
      forex,
      crypto,
      indices,
      timestamp: new Date().toISOString(),
    };
  }
}

export default AlphaVantageService.getInstance();
