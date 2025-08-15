'use client';

import React, { useEffect, useRef, memo } from 'react';

interface TradingViewNewsProps {
  height?: number;
}

function TradingViewNews({ height = 500 }: TradingViewNewsProps) {
  const container = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (container.current && !scriptRef.current) {
      // Remove any existing widgets
      const existingWidgets = container.current.querySelectorAll(
        '.tradingview-widget-container__widget'
      );
      existingWidgets.forEach((widget) => widget.remove());

      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = `
        {
          "displayMode": "regular",
          "feedMode": "all_symbols",
          "colorTheme": "light",
          "isTransparent": false,
          "locale": "en",
          "width": "100%",
          "height": "${height}"
        }`;

      scriptRef.current = script;
      container.current.appendChild(script);
    }

    return () => {
      // Cleanup script when component unmounts
      if (scriptRef.current) {
        scriptRef.current.remove();
        scriptRef.current = null;
      }
    };
  }, [height]);

  return (
    <div className="relative">
      {/* Scroll indicator */}
      <div className="absolute top-2 right-2 z-10 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg">
        📜 Scroll for more news
      </div>

      <div
        className="tradingview-widget-container overflow-y-auto scrollbar-hide"
        ref={container}
        style={{ height: `${height}px` }}
      >
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
}

export default memo(TradingViewNews);
