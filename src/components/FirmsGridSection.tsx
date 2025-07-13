'use client';

import React, { useState } from 'react';

const mockFirms = [
  {
    name: 'Alpha Capital',
    logo: '/Logo.png',
    country: 'GB',
    rating: 4.4,
    reviews: 893,
    years: 3,
    assets: ['FX', 'Indices', 'Metals', 'Other Commodities'],
    platforms: ['MT4', 'MT5'],
    maxAllocation: '$400K',
    promo: '15% OFF',
  },
  {
    name: 'The5ers',
    logo: '/Logo.png',
    country: 'IL',
    rating: 4.8,
    reviews: 986,
    years: 9,
    assets: ['Crypto', 'Energy', 'FX', 'Other Commodities'],
    platforms: ['MT4', 'cTrader'],
    maxAllocation: '$615K',
    promo: '5% OFF',
  },
  {
    name: 'E8 Markets',
    logo: '/Logo.png',
    country: 'US',
    rating: 4.7,
    reviews: 134,
    years: 2,
    assets: ['FX', 'Indices', 'Metals'],
    platforms: ['MT5'],
    maxAllocation: '$900K',
    promo: '5% OFF',
  },
  // ...add more mock firms as needed
];

const allCountries = Array.from(new Set(mockFirms.map((f) => f.country)));
const allAssets = Array.from(new Set(mockFirms.flatMap((f) => f.assets)));

const FirmsGridSection: React.FC = () => {
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('');
  const [asset, setAsset] = useState('');

  const filteredFirms = mockFirms.filter((firm) => {
    const matchesName = firm.name.toLowerCase().includes(search.toLowerCase());
    const matchesCountry = country ? firm.country === country : true;
    const matchesAsset = asset ? firm.assets.includes(asset) : true;
    return matchesName && matchesCountry && matchesAsset;
  });

  return (
    <section id="firms" className="w-full py-12 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Compare Prop Firms</h2>
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between px-2">
          <input
            type="text"
            placeholder="Search by firm name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded border border-input bg-light dark:bg-dark/60 text-dark dark:text-light w-full md:w-1/3"
          />
          <select
            title="Filter by country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="px-4 py-2 rounded border border-input bg-light dark:bg-dark/60 text-dark dark:text-light w-full md:w-1/4"
          >
            <option value="">All Countries</option>
            {allCountries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            title="Filter by asset"
            value={asset}
            onChange={(e) => setAsset(e.target.value)}
            className="px-4 py-2 rounded border border-input bg-light dark:bg-dark/60 text-dark dark:text-light w-full md:w-1/4"
          >
            <option value="">All Assets</option>
            {allAssets.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white dark:bg-dark/80">
            <thead>
              <tr className="text-left text-xs uppercase text-muted-foreground bg-light dark:bg-dark/60">
                <th className="p-3">Firm</th>
                <th className="p-3">Country</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Years</th>
                <th className="p-3">Assets</th>
                <th className="p-3">Platforms</th>
                <th className="p-3">Max Allocation</th>
                <th className="p-3">Promo</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredFirms.map((firm) => (
                <tr
                  key={firm.name}
                  className="border-b last:border-0 hover:bg-light/50 dark:hover:bg-dark/40 transition"
                >
                  <td className="p-3 flex items-center gap-2">
                    <img src={firm.logo} alt={firm.name} className="w-8 h-8 rounded-full" />
                    <span className="font-semibold">{firm.name}</span>
                  </td>
                  <td className="p-3">{firm.country}</td>
                  <td className="p-3">
                    <span className="font-bold text-primary">{firm.rating}</span>
                    <span className="ml-1 text-xs text-muted-foreground">
                      ({firm.reviews} reviews)
                    </span>
                  </td>
                  <td className="p-3">{firm.years}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {firm.assets.map((asset) => (
                        <span
                          key={asset}
                          className="px-2 py-0.5 bg-light dark:bg-dark/60 rounded text-xs"
                        >
                          {asset}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      {firm.platforms.map((platform) => (
                        <span
                          key={platform}
                          className="px-2 py-0.5 bg-light dark:bg-dark/60 rounded text-xs"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3 font-semibold">{firm.maxAllocation}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-primary text-white rounded text-xs font-bold">
                      {firm.promo}
                    </span>
                  </td>
                  <td className="p-3">
                    <button className="px-4 py-1 bg-secondary text-dark rounded hover:bg-secondary/80 transition text-xs font-semibold">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default FirmsGridSection;
