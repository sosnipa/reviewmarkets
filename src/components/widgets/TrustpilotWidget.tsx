'use client';

import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TrustpilotWidgetProps {
  className?: string;
}

const TrustpilotWidget: React.FC<TrustpilotWidgetProps> = ({
  className = '',
}) => {
  useEffect(() => {
    // Load Trustpilot widget script
    const script = document.createElement('script');
    script.src = 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';
    script.async = true;
    script.onload = () => {
      // Trustpilot script loaded - widget will initialize automatically
      console.log('Trustpilot script loaded');
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      const existingScript = document.querySelector('script[src*="trustpilot"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <Card className={`bg-white shadow-lg ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">★</span>
          </div>
          Trustpilot Reviews
          <Badge variant="outline" className="text-xs">
            Powered by Trustpilot
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Trustpilot Review Form */}
          <div className="text-center py-8">
            <div className="mb-4">
              <div className="flex justify-center items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-2xl text-yellow-400">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600">Be the first to review us on Trustpilot</p>
            </div>
            <a
              href="https://www.trustpilot.com/review/reviewmarket.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <span className="text-lg">★</span>
              Write a Review on Trustpilot
            </a>
          </div>

          {/* Alternative: Direct link to Trustpilot */}
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-gray-600 mb-2">Can&apos;t see the widget?</p>
            <a
              href="https://www.trustpilot.com/review/reviewmarket.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <span>★</span>
              Leave a Review on Trustpilot
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrustpilotWidget;
