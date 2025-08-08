'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, TrendingUp, Shield, Users, Star, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <Badge
              variant="secondary"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium"
            >
              <TrendingUp className="w-4 h-4" />
              Trusted by 10,000+ Traders
            </Badge>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Compare the Best
                <span className="block text-primary">Prop Trading Firms</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Find your perfect prop trading partner. Compare fees, features, and reviews from
                real traders. Start your journey to professional trading today.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="px-8 py-4 text-lg font-semibold">
                <Link href="/firms">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="px-8 py-4 text-lg font-semibold"
              >
                <Link href="/testimonials">View Reviews</Link>
              </Button>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Real-time comparisons and live data</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Verified reviews from actual traders</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Expert analysis and recommendations</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">50+</div>
                <div className="text-sm text-muted-foreground">Prop Firms</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">10K+</div>
                <div className="text-sm text-muted-foreground">Active Traders</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">4.8</div>
                <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  Rating
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Card */}
            <Card className="relative overflow-hidden shadow-2xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Top Prop Firms</CardTitle>
                      <p className="text-sm text-muted-foreground">Real-time comparison</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Live
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Firm Cards */}
                <div className="space-y-4">
                  {/* Firm 1 */}
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Shield className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">FTMO</h4>
                        <p className="text-sm text-muted-foreground">Forex & Stocks</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-foreground">$400K</div>
                      <div className="text-sm text-green-600">Max Allocation</div>
                    </div>
                  </div>

                  {/* Firm 2 */}
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">Apex Trader</h4>
                        <p className="text-sm text-muted-foreground">Futures Focused</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-foreground">$300K</div>
                      <div className="text-sm text-green-600">Max Allocation</div>
                    </div>
                  </div>

                  {/* Firm 3 */}
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <Star className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">FundedNext</h4>
                        <p className="text-sm text-muted-foreground">Multi-Asset</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-foreground">$500K</div>
                      <div className="text-sm text-green-600">Max Allocation</div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* CTA */}
                <Button asChild className="w-full">
                  <Link href="/firms">
                    Compare All Firms
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full opacity-20" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-100 rounded-full opacity-20" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
