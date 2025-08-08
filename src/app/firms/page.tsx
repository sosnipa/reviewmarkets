'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Star, Globe, TrendingUp, Filter, Search, Building2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/Footer';

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

export default function FirmsPage() {
  const searchParams = useSearchParams();
  const [firms, setFirms] = useState<PropFirm[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAsset, setSelectedAsset] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  // Initialize search term from URL parameters
  useEffect(() => {
    const searchFromUrl = searchParams.get('search');
    const ratingFromUrl = searchParams.get('rating');
    const sortFromUrl = searchParams.get('sort');

    if (searchFromUrl) {
      setSearchTerm(searchFromUrl);
    }
    if (ratingFromUrl) {
      setSelectedRating(ratingFromUrl);
    }
    if (sortFromUrl) {
      setSortBy(sortFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchFirms = async () => {
      try {
        const response = await fetch('/api/firms');
        const data = await response.json();
        const firmsArray = data.firms || [];
        setFirms(firmsArray);
      } catch (error) {
        console.error('Error fetching firms:', error);
        setFirms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFirms();
  }, []);

  const filteredFirms = Array.isArray(firms)
    ? firms.filter((firm) => {
        if (!firm || !firm.name || !firm.description) {
          return false;
        }

        const matchesSearch =
          firm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          firm.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesAsset =
          selectedAsset === 'all' || (firm.assets && firm.assets.includes(selectedAsset));
        const matchesCountry = selectedCountry === 'all' || firm.country === selectedCountry;
        const matchesRating =
          selectedRating === 'all' ||
          (selectedRating === '5' && firm.rating === 5) ||
          (selectedRating === '4' && firm.rating >= 4) ||
          (selectedRating === '3' && firm.rating >= 3);

        return matchesSearch && matchesAsset && matchesCountry && matchesRating;
      })
    : [];

  const sortedFirms = [...filteredFirms].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'reviews':
        return b.reviews - a.reviews;
      case 'allocation':
        return (
          parseInt(b.maxAllocation.replace(/[^0-9]/g, '')) -
          parseInt(a.maxAllocation.replace(/[^0-9]/g, ''))
        );
      default:
        return b.rating - a.rating;
    }
  });

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
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading prop firms...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="flex-1 flex flex-col gap-0 px-4 sm:px-6">
        {/* Header */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <Badge
                variant="outline"
                className="mb-4 bg-primary/10 text-primary border-primary/20"
              >
                Prop Trading Firms
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                All Prop Trading Firms
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Discover and compare the complete list of prop trading firms worldwide. Find the
                perfect match for your trading style and goals.
              </p>
            </motion.div>

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <Card className="border-0 shadow-sm bg-background/60 backdrop-blur-xl">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
                    {/* Search */}
                    <div className="relative">
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
                        <SelectTrigger className="w-full">
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
                        <SelectTrigger className="w-full">
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

                    {/* Rating Filter */}
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-muted-foreground" />
                      <Select value={selectedRating} onValueChange={setSelectedRating}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="All Ratings" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Ratings</SelectItem>
                          <SelectItem value="5">5 Stars Only</SelectItem>
                          <SelectItem value="4">4+ Stars</SelectItem>
                          <SelectItem value="3">3+ Stars</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Sort By */}
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-muted-foreground" />
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rating">Sort by Rating</SelectItem>
                          <SelectItem value="name">Sort by Name</SelectItem>
                          <SelectItem value="reviews">Sort by Reviews</SelectItem>
                          <SelectItem value="allocation">Sort by Max Allocation</SelectItem>
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
                Showing <span className="font-semibold text-foreground">{sortedFirms.length}</span>{' '}
                of {firms.length} firms
              </p>
            </div>

            {/* Firms Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedFirms.map((firm, index) => (
                <motion.div
                  key={firm.id || `firm-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-background/60 backdrop-blur-xl">
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
                        <span className="text-sm text-muted-foreground">
                          ({firm.reviews} reviews)
                        </span>
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

                      <Separator className="mb-4" />

                      {/* Key Info */}
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Max Allocation:</span>
                          <span className="font-semibold text-foreground">
                            {firm.maxAllocation}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Platforms:</span>
                          <span className="text-sm text-foreground">
                            {firm.platforms && firm.platforms.slice(0, 2).join(', ')}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {sortedFirms.length === 0 && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
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
                    setSelectedRating('all');
                  }}
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
