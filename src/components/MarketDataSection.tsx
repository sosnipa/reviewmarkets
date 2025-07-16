'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SymbolSearch from './SymbolSearch';

interface MarketData {
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
  success: boolean;
  note?: string;
}

export default function MarketDataSection() {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/market-data');
        const data = await response.json();
        setMarketData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load market data');
        console.error('Error fetching market data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();

    // Refresh data every 5 minutes
    const interval = setInterval(fetchMarketData, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number | null | undefined) => {
    if (price === null || price === undefined || isNaN(price)) {
      return 'N/A';
    }
    if (price >= 1000) {
      return price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  };

  const formatChange = (change: number | null | undefined) => {
    if (change === null || change === undefined || isNaN(change)) {
      return 'N/A';
    }
    return change >= 0 ? `+${change.toFixed(2)}` : change.toFixed(2);
  };

  const MarketCard = ({
    title,
    data,
    color,
  }: {
    title: string;
    data: Array<{ symbol: string; price: number; change: number; changePercent: number }>;
    color: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h3 className={`text-lg font-semibold mb-4 ${color}`}>{title}</h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <motion.div
            key={item.symbol}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
          >
            <div>
              <span className="font-medium text-gray-900">{item.symbol}</span>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-900">{formatPrice(item.price)}</div>
              <div className={`text-sm ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatChange(item.change)}
                {item.changePercent !== null &&
                item.changePercent !== undefined &&
                !isNaN(item.changePercent)
                  ? `${item.changePercent >= 0 ? '+' : ''}${item.changePercent.toFixed(2)}%`
                  : 'N/A'}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Live Market Data</h2>
            <p className="text-gray-600 mb-8">
              Real-time market information for informed trading decisions
            </p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  if (error || !marketData) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Live Market Data</h2>
            <p className="text-red-600 mb-4">{error || 'Unable to load market data'}</p>
            <p className="text-gray-600">Please try again later</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Live Market Data</h2>
          <p className="text-gray-600 mb-4">
            Real-time market information for informed trading decisions
          </p>
          {marketData.note && (
            <p className="text-sm text-orange-600 bg-orange-50 px-4 py-2 rounded-lg inline-block">
              {marketData.note}
            </p>
          )}
          {/* Insert SymbolSearch below the description and note, above last updated */}
          <div className="my-6">
            <SymbolSearch />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Last updated: {new Date(marketData.timestamp).toLocaleString()}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MarketCard title="Forex" data={marketData.forex} color="text-blue-600" />
          <MarketCard title="Crypto" data={marketData.crypto} color="text-purple-600" />
          <MarketCard title="Indices" data={marketData.indices} color="text-green-600" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-500">
            Data provided by Alpha Vantage • Updates every 5 minutes
          </p>
        </motion.div>
      </div>
    </section>
  );
}
