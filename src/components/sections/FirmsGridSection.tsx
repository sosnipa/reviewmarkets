'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Star, Globe, Filter, Search, Building2, Eye, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface PropFirm {
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
  description: string;
  website: string;
  lastUpdated?: string;
}

export default function FirmsGridSection() {
  const [firms, setFirms] = useState<PropFirm[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAsset, setSelectedAsset] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');

  useEffect(() => {
    const fetchFirms = async () => {
      try {
        const response = await fetch('/api/firms');
        const data = await response.json();
        // Handle the API response format - it returns an object with firms property
        const firmsArray = data.firms || [];
        setFirms(firmsArray);
      } catch (error) {
        console.error('Error fetching firms:', error);
        setFirms([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchFirms();
  }, []);

  const filteredFirms = Array.isArray(firms)
    ? firms.filter((firm) => {
        // Skip firms with missing essential data
        if (!firm || !firm.name || !firm.description) {
          return false;
        }

        const matchesSearch =
          firm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          firm.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesAsset =
          selectedAsset === 'all' || (firm.assets && firm.assets.includes(selectedAsset));
        const matchesCountry = selectedCountry === 'all' || firm.country === selectedCountry;

        return matchesSearch && matchesAsset && matchesCountry;
      })
    : [];

  const renderStars = (rating: number) => {
    const safeRating = Math.max(0, Math.min(5, rating || 0));
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < safeRating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
      />
    ));
  };

  const getAssetIcon = (asset: string) => {
    const icons: { [key: string]: string } = {
      forex: '💱',
      stocks: '📈',
      crypto: '₿',
      indices: '📊',
      commodities: '🛢️',
      futures: '📋',
    };
    return icons[asset] || '📈';
  };

  if (loading) {
    return (
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading prop firms...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/20">
            Top Prop Trading Firms
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Compare the Best
            <span className="block text-primary">Prop Trading Firms</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover and compare the top prop trading firms worldwide. Find the perfect match for
            your trading style and goals.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search firms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Asset Filter */}
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="All Assets" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Assets</SelectItem>
                      <SelectItem value="forex">Forex</SelectItem>
                      <SelectItem value="stocks">Stocks</SelectItem>
                      <SelectItem value="crypto">Crypto</SelectItem>
                      <SelectItem value="indices">Indices</SelectItem>
                      <SelectItem value="commodities">Commodities</SelectItem>
                      <SelectItem value="futures">Futures</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Country Filter */}
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="All Countries" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Countries</SelectItem>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="Czech Republic">Czech Republic</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredFirms.length}</span> of{' '}
            {firms.length} firms
          </p>
        </div>

        {/* Firms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFirms.map((firm, index) => (
            <motion.div
              key={firm.id || `firm-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {firm.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Globe className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{firm.country}</span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary border-primary/20"
                    >
                      {firm.years}+ years
                    </Badge>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">{renderStars(firm.rating)}</div>
                    <span className="text-sm text-muted-foreground">({firm.reviews} reviews)</span>
                  </div>

                  {/* Assets */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {firm.assets &&
                      firm.assets.slice(0, 3).map((asset) => (
                        <Badge key={asset} variant="secondary" className="text-xs">
                          {getAssetIcon(asset)} {asset}
                        </Badge>
                      ))}
                    {firm.assets && firm.assets.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{firm.assets.length - 3} more
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {firm.description}
                  </p>

                  {/* Key Info */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Max Allocation:</span>
                      <span className="font-semibold text-foreground">{firm.maxAllocation}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Platforms:</span>
                      <span className="text-sm text-foreground">
                        {firm.platforms && firm.platforms.slice(0, 2).join(', ')}
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex gap-2">
                    <Button asChild className="flex-1">
                      <Link href="/firms">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="icon">
                      <Link href="/firms">
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        {filteredFirms.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button asChild size="lg" variant="outline" className="px-8 py-3">
              <Link href="/firms">
                Load More Firms
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        )}

        {/* Empty State */}
        {filteredFirms.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No firms found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters.
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedAsset('all');
                setSelectedCountry('all');
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
