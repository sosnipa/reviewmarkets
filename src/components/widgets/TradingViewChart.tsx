'use client';

import React, { useEffect, useRef, memo } from 'react';

interface TradingViewChartProps {
  symbol?: string;
  interval?: string;
  theme?: 'light' | 'dark';
  height?: number;
}

function TradingViewChart({
  symbol = 'NASDAQ:AAPL',
  interval = 'D',
  theme = 'light',
  height = 400,
}: TradingViewChartProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      script.onload = () => {
        if (window.TradingView && container.current) {
          new window.TradingView.widget({
            autosize: true,
            symbol: symbol,
            interval: interval,
            timezone: 'Etc/UTC',
            theme: theme,
            style: '1',
            locale: 'en',
            toolbar_bg: '#f1f3f6',
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: container.current.id,
            height: height,
            width: '100%',
            hide_top_toolbar: false,
            hide_legend: false,
            save_image: false,
            backgroundColor: theme === 'dark' ? '#131722' : '#ffffff',
            gridColor: theme === 'dark' ? '#363c4e' : '#e1e3e6',
            watermark: {
              color: theme === 'dark' ? '#363c4e' : '#e1e3e6',
              fontSize: 12,
              text: 'ReviewMarket',
              transparent: true,
            },
          });
        }
      };
      document.head.appendChild(script);
    }
  }, [symbol, interval, theme, height]);

  return (
    <div className="tradingview-chart-container">
      <div
        id={`tradingview_${symbol.replace(/[^a-zA-Z0-9]/g, '_')}`}
        ref={container}
        style={{ height: `${height}px` }}
      ></div>
    </div>
  );
}

export default memo(TradingViewChart);
