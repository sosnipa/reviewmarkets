'use client';

import React, { useState, useEffect } from 'react';
import { motion, easeOut } from 'framer-motion';

interface Firm {
  id: number;
  name: string;
  logo: string;
  country: string;
  rating: number;
  reviews: number;
  years: number;
  assets: string[];
  platforms: string[];
  maxAllocation: string;
  promo: string;
  description?: string;
  website?: string;
}

interface FirmsResponse {
  firms: Firm[];
  total: number;
  filters: {
    search?: string;
    country?: string;
    asset?: string;
  };
}

const rowVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

const FirmsGridSection: React.FC = () => {
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('');
  const [asset, setAsset] = useState('');
  const [firms, setFirms] = useState<Firm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allCountries, setAllCountries] = useState<string[]>([]);
  const [allAssets, setAllAssets] = useState<string[]>([]);

  // Fetch firms data
  useEffect(() => {
    const fetchFirms = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (country) params.append('country', country);
        if (asset) params.append('asset', asset);

        const response = await fetch(`/api/firms?${params}`);
        if (!response.ok) throw new Error('Failed to fetch firms');

        const data: FirmsResponse = await response.json();
        setFirms(data.firms);
        setError(null);
      } catch (err) {
        setError('Failed to load firms data');
        console.error('Error fetching firms:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFirms();
  }, [search, country, asset]);

  // Extract unique countries and assets from firms data
  useEffect(() => {
    const countries = Array.from(new Set(firms.map((f) => f.country)));
    const assets = Array.from(new Set(firms.flatMap((f) => f.assets)));
    setAllCountries(countries);
    setAllAssets(assets);
  }, [firms]);

  return (
    <section id="firms" className="w-full py-12 bg-brand-bg">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-brand-primary">
          Compare Prop Firms
        </h2>
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between px-2">
          <input
            type="text"
            placeholder="Search by firm name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded border border-brand-border bg-brand-card text-brand-text w-full md:w-1/3"
          />
          <select
            title="Filter by country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="px-4 py-2 rounded border border-brand-border bg-brand-card text-brand-text w-full md:w-1/4"
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
            className="px-4 py-2 rounded border border-brand-border bg-brand-card text-brand-text w-full md:w-1/4"
          >
            <option value="">All Assets</option>
            {allAssets.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow border border-brand-border bg-brand-card">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-xs uppercase text-brand-accent bg-brand-bg/80">
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
                {firms.map((firm: Firm) => (
                  <motion.tr
                    key={firm.name}
                    variants={rowVariants}
                    initial="initial"
                    animate="animate"
                    whileHover={{
                      scale: 1.01,
                      boxShadow:
                        '0 0 6px 1px var(--brand-accent), 0 0 12px 3px var(--brand-primary)',
                      backgroundColor: 'var(--brand-bg)',
                    }}
                    transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                    className="border-b last:border-0 hover:bg-brand-bg/80 transition"
                  >
                    <td className="p-3 flex items-center gap-2">
                      <img src={firm.logo} alt={firm.name} className="w-8 h-8 rounded-full" />
                      <span className="font-semibold text-brand-primary">{firm.name}</span>
                    </td>
                    <td className="p-3">{firm.country}</td>
                    <td className="p-3">
                      <span className="font-bold text-brand-primary">{firm.rating}</span>
                      <span className="ml-1 text-xs text-brand-text/60">
                        ({firm.reviews} reviews)
                      </span>
                    </td>
                    <td className="p-3">{firm.years}</td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {firm.assets.map((asset: string) => (
                          <span
                            key={asset}
                            className="px-2 py-0.5 bg-brand-bg/80 rounded text-xs text-brand-text border border-brand-border"
                          >
                            {asset}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        {firm.platforms.map((platform: string) => (
                          <span
                            key={platform}
                            className="px-2 py-0.5 bg-brand-bg/80 rounded text-xs text-brand-text border border-brand-border"
                          >
                            {platform}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3 font-semibold">{firm.maxAllocation}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded text-xs font-bold shadow">
                        {firm.promo}
                      </span>
                    </td>
                    <td className="p-3">
                      <motion.button
                        whileHover={{
                          scale: 1.04,
                          boxShadow:
                            '0 0 6px 1px var(--brand-accent), 0 0 12px 3px var(--brand-primary)',
                        }}
                        whileTap={{ scale: 0.97 }}
                        className="px-4 py-1 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-full hover:from-brand-primary hover:to-brand-secondary/80 transition text-xs font-semibold shadow"
                      >
                        View
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default FirmsGridSection;
