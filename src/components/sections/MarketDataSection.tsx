'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SymbolSearch from '../widgets/SymbolSearch';
import TradingViewWidget from '../widgets/TradingViewWidget';
import TradingViewChart from '../widgets/TradingViewChart';
import TradingViewNews from '../widgets/TradingViewNews';

// Simple fallback market data
const fallbackMarketData = {
  indices: [
    { symbol: 'S&P 500', price: '4,850.43', change: '+0.52%', color: 'text-green-600' },
    { symbol: 'NASDAQ', price: '15,628.95', change: '+0.75%', color: 'text-green-600' },
    { symbol: 'DOW', price: '37,466.11', change: '+0.07%', color: 'text-green-600' },
  ],
  forex: [
    { symbol: 'EUR/USD', price: '1.0856', change: '-0.12%', color: 'text-red-600' },
    { symbol: 'GBP/USD', price: '1.2654', change: '+0.08%', color: 'text-green-600' },
    { symbol: 'USD/JPY', price: '148.23', change: '+0.15%', color: 'text-green-600' },
  ],
  crypto: [
    { symbol: 'BTC/USD', price: '43,250.00', change: '+2.45%', color: 'text-green-600' },
    { symbol: 'ETH/USD', price: '2,650.00', change: '+1.73%', color: 'text-green-600' },
  ],
};

interface MarketItem {
  symbol: string;
  price: string;
  change: string;
  color: string;
}

const SimpleMarketCard = ({
  title,
  data,
  icon,
}: {
  title: string;
  data: MarketItem[];
  icon: string;
}) => (
  <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">{title}</h3>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
    <div className="p-4">
      <div className="space-y-3">
        {data.map((item) => (
          <div
            key={item.symbol}
            className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
          >
            <span className="font-semibold text-gray-900">{item.symbol}</span>
            <div className="text-right">
              <div className="font-bold text-gray-900">{item.price}</div>
              <div className={`text-sm font-medium ${item.color}`}>{item.change}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function MarketDataSection() {
  const [selectedSymbol] = useState('NASDAQ:AAPL');
  const [activeTab, setActiveTab] = useState<'quotes' | 'chart' | 'news'>('quotes');
  const [useFallback, setUseFallback] = useState(false);

  const TabButton = ({
    id,
    label,
    icon,
  }: {
    id: 'quotes' | 'chart' | 'news';
    label: string;
    icon: string;
  }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
        activeTab === id
          ? 'bg-green-600 text-white shadow-lg'
          : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </button>
  );

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Market Data</h2>
          <p className="text-gray-600 mb-6 text-lg max-w-2xl mx-auto">
            Professional trading tools and market information
          </p>

          <div className="my-8">
            <SymbolSearch />
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-gray-100 p-2 rounded-xl">
            <TabButton id="quotes" label="Market Quotes" icon="📊" />
            <TabButton id="chart" label="Trading Chart" icon="📈" />
            <TabButton id="news" label="Market News" icon="📰" />
          </div>
        </div>

        {/* Fallback Toggle */}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setUseFallback(!useFallback)}
            className="text-sm text-gray-600 hover:text-gray-800 underline"
          >
            {useFallback ? 'Use TradingView Widgets' : 'Use Simple Display'}
          </button>
        </div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl mx-auto"
        >
          {activeTab === 'quotes' && (
            <>
              {useFallback ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <SimpleMarketCard title="Indices" data={fallbackMarketData.indices} icon="📈" />
                  <SimpleMarketCard title="Forex" data={fallbackMarketData.forex} icon="💱" />
                  <SimpleMarketCard title="Crypto" data={fallbackMarketData.crypto} icon="₿" />
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900">Market Quotes</h3>
                    <p className="text-gray-600 mt-1">
                      Prices for indices, forex, futures, and bonds
                    </p>
                  </div>
                  <TradingViewWidget />
                </div>
              )}
            </>
          )}

          {activeTab === 'chart' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <TradingViewChart symbol={selectedSymbol} height={500} />
            </div>
          )}

          {activeTab === 'news' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Market News</h3>
                <p className="text-gray-600 mt-1">Financial news and market updates</p>
              </div>
              <TradingViewNews height={500} />
            </div>
          )}
        </motion.div>

        {/* Removed disclaimer section */}
      </div>
    </section>
  );
}
