'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, BarChart3, Activity, Globe } from 'lucide-react';
import TradingViewWidget from '@/components/widgets/TradingViewWidget';
import TradingViewNews from '@/components/widgets/TradingViewNews';

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
  icon: React.ReactNode;
}) => (
  <Card className="overflow-hidden">
    <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg">{title}</CardTitle>
        <div className="text-2xl">{icon}</div>
      </div>
    </CardHeader>
    <CardContent className="p-4">
      <div className="space-y-3">
        {data.map((item) => (
          <div
            key={item.symbol}
            className="flex justify-between items-center py-2 border-b border-border last:border-b-0"
          >
            <span className="font-semibold text-foreground">{item.symbol}</span>
            <div className="text-right">
              <div className="font-bold text-foreground">{item.price}</div>
              <div className={`text-sm font-medium ${item.color}`}>{item.change}</div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default function MarketDataSection() {
  const [activeTab, setActiveTab] = React.useState<'quotes' | 'chart' | 'news'>('quotes');
  const [useFallback, setUseFallback] = React.useState(false);

  const TabButton = ({
    id,
    label,
    icon,
  }: {
    id: 'quotes' | 'chart' | 'news';
    label: string;
    icon: React.ReactNode;
  }) => (
    <Button
      variant={activeTab === id ? 'default' : 'outline'}
      onClick={() => setActiveTab(id)}
      className="flex items-center space-x-2"
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </Button>
  );

  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/20">
            Live Market Data
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">Market Data</h2>
          <p className="text-muted-foreground mb-6 text-lg max-w-2xl mx-auto">
            Professional trading tools and market information
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-muted p-2 rounded-xl">
            <TabButton id="quotes" label="Market Quotes" icon={<BarChart3 className="w-4 h-4" />} />
            <TabButton id="chart" label="Trading Chart" icon={<TrendingUp className="w-4 h-4" />} />
            <TabButton id="news" label="Market News" icon={<Activity className="w-4 h-4" />} />
          </div>
        </div>

        {/* Fallback Toggle */}
        <div className="flex justify-center mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setUseFallback(!useFallback)}
            className="text-sm"
          >
            {useFallback ? 'Use TradingView Widgets' : 'Use Simple Display'}
          </Button>
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
                  <SimpleMarketCard
                    title="Indices"
                    data={fallbackMarketData.indices}
                    icon={<TrendingUp className="w-6 h-6" />}
                  />
                  <SimpleMarketCard
                    title="Forex"
                    data={fallbackMarketData.forex}
                    icon={<Globe className="w-6 h-6" />}
                  />
                  <SimpleMarketCard
                    title="Crypto"
                    data={fallbackMarketData.crypto}
                    icon={<Activity className="w-6 h-6" />}
                  />
                </div>
              ) : (
                <Card className="overflow-hidden">
                  <CardHeader className="border-b">
                    <CardTitle className="text-xl">Market Quotes</CardTitle>
                    <p className="text-muted-foreground">
                      Prices for indices, forex, futures, and bonds
                    </p>
                  </CardHeader>
                  <CardContent className="p-0">
                    <TradingViewWidget />
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {activeTab === 'chart' && (
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Live Chart
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <TradingViewWidget />
              </CardContent>
            </Card>
          )}

          {activeTab === 'news' && (
            <Card className="overflow-hidden">
              <CardHeader className="border-b">
                <CardTitle className="text-xl">Market News</CardTitle>
                <p className="text-muted-foreground">Financial news and market updates</p>
              </CardHeader>
              <CardContent className="p-0">
                <TradingViewNews height={500} />
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </section>
  );
}
