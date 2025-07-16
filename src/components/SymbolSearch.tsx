'use client';

import React, { useState, useRef } from 'react';

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
    setShowDropdown(false);
    console.log('Selected symbol:', symbol);
  };

  return (
    <div className="relative w-full max-w-md mx-auto mt-4">
      <input
        type="text"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search stock, forex, or crypto symbol..."
        value={query}
        onChange={handleChange}
        onFocus={() => {
          if (results.length > 0) setShowDropdown(true);
        }}
        onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
        autoComplete="off"
      />
      {showDropdown && results.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded shadow mt-1 max-h-60 overflow-y-auto">
          {results.map((item) => (
            <li
              key={item.symbol}
              className="px-4 py-2 cursor-pointer hover:bg-blue-100"
              onMouseDown={() => handleSelect(item.symbol)}
            >
              <span className="font-semibold">{item.symbol}</span>
              <span className="ml-2 text-gray-600">{item.name}</span>
              <span className="ml-2 text-xs text-gray-400">
                ({item.region}, {item.currency})
              </span>
            </li>
          ))}
        </ul>
      )}
      {loading && <div className="absolute right-3 top-2 text-gray-400 animate-spin">⏳</div>}
    </div>
  );
}
