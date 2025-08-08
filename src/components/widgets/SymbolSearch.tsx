'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface SymbolMatch {
  symbol: string;
  name: string;
  region: string;
  currency: string;
  matchScore: string;
}

export default function SymbolSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SymbolMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (value.length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    setLoading(true);
    timeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/symbol-search?query=${encodeURIComponent(value)}`);
        const data = await res.json();
        if (data.bestMatches) {
          setResults(
            data.bestMatches.map((item: Record<string, string>) => ({
              symbol: item['1. symbol'],
              name: item['2. name'],
              region: item['4. region'],
              currency: item['8. currency'],
              matchScore: item['9. matchScore'],
            }))
          );
          setShowDropdown(true);
        } else {
          setResults([]);
          setShowDropdown(false);
        }
      } catch {
        setResults([]);
        setShowDropdown(false);
      } finally {
        setLoading(false);
      }
    }, 300);
  };

  const handleSelect = (symbol: string) => {
    setQuery(symbol);
    setSelectedSymbol(symbol);
    setShowDropdown(false);
    console.log('Selected symbol:', symbol);
  };

  const handleClear = () => {
    setQuery('');
    setSelectedSymbol(null);
    setResults([]);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg shadow-sm"
          placeholder="Search for stocks, forex, or crypto symbols..."
          value={query}
          onChange={handleChange}
          onFocus={() => {
            if (results.length > 0) setShowDropdown(true);
          }}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          autoComplete="off"
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</div>
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        )}
        {loading && (
          <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600"></div>
          </div>
        )}
      </div>

      {showDropdown && results.length > 0 && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute z-50 w-full bg-white border-2 border-gray-200 rounded-xl shadow-xl mt-2 max-h-80 overflow-y-auto"
        >
          {results.map((item, index) => (
            <motion.li
              key={item.symbol}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="px-4 py-3 cursor-pointer hover:bg-green-50 border-b border-gray-100 last:border-b-0 transition-colors duration-200"
              onMouseDown={() => handleSelect(item.symbol)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="font-bold text-gray-900 text-lg">{item.symbol}</span>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {item.currency}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{item.name}</div>
                  <div className="text-xs text-gray-400 mt-1">{item.region}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">
                    Match: {parseFloat(item.matchScore).toFixed(2)}
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      )}

      {selectedSymbol && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center"
        >
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            <span className="mr-2">✓</span>
            Selected: {selectedSymbol}
          </div>
        </motion.div>
      )}

      {showDropdown && results.length === 0 && query.length >= 2 && !loading && (
        <div className="absolute z-50 w-full bg-white border-2 border-gray-200 rounded-xl shadow-xl mt-2 p-4 text-center text-gray-500">
          No symbols found for "{query}"
        </div>
      )}
    </div>
  );
}
