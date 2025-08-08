'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  BarChart3,
  TrendingUp,
  Shield,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  Zap,
  Target,
  Globe,
  Clock,
} from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Real-time Comparisons',
    description:
      'Compare prop firms side-by-side with live data on fees, features, and performance metrics.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Verified Reviews',
    description: 'Read authentic reviews from real traders who have used these prop firms.',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Community Driven',
    description: 'Join thousands of traders sharing insights and experiences.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: 'Expert Analysis',
    description: 'Get detailed analysis and recommendations from trading experts.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Quick Setup',
    description: 'Start comparing and applying to prop firms in minutes, not hours.',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Personalized Matches',
    description: 'Find the perfect prop firm based on your trading style and goals.',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  },
];

const stats = [
  { label: 'Prop Firms', value: '50+', icon: <Globe className="w-5 h-5" /> },
  { label: 'Active Users', value: '10K+', icon: <Users className="w-5 h-5" /> },
  { label: 'Success Rate', value: '95%', icon: <CheckCircle className="w-5 h-5" /> },
  { label: 'Response Time', value: '<24h', icon: <Clock className="w-5 h-5" /> },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/20">
            Why Choose ReviewMarket
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Everything You Need to
            <span className="block text-primary">Succeed in Prop Trading</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We&apos;ve partnered with leading prop trading firms to bring you exclusive deals and
            offers.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-0 shadow-sm bg-muted/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-3 text-primary">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div
                    className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4 ${feature.color}`}
                  >
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Separator className="mb-8" />
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                <BarChart3 className="w-8 h-8 text-primary mr-3" />
                <h3 className="text-2xl font-bold text-foreground">Ready to Start?</h3>
              </div>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join thousands of traders who have already found their perfect prop trading partner.
                Start comparing firms today and take your trading to the next level.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="px-6 py-3 text-base font-semibold">
                  <Link href="/firms">
                    Compare Prop Firms
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="px-6 py-3 text-base font-semibold">
                  <Link href="/testimonials">Read Reviews</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
