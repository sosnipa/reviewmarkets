'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Map, ExternalLink, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/Footer';

export default function SitemapPage() {
  const sections = [
    {
      title: 'Main Pages',
      icon: <Map className="w-5 h-5" />,
      links: [
        { name: 'Home', href: '/', description: 'Landing page with overview and features' },
        { name: 'About Us', href: '/about', description: 'Learn about our mission and values' },
        { name: 'Contact', href: '/#contact', description: 'Get in touch with our team' },
      ],
    },
    {
      title: 'Prop Trading Firms',
      icon: <Map className="w-5 h-5" />,
      links: [
        {
          name: 'All Firms',
          href: '/firms',
          description: 'Complete list of prop trading firms',
        },
        {
          name: 'Top Rated Firms',
          href: '/firms?rating=5',
          description: 'Highest-rated prop trading firms',
        },
        {
          name: 'New Firms',
          href: '/firms?sort=newest',
          description: 'Recently added prop trading firms',
        },
      ],
    },
    {
      title: 'Community & Reviews',
      icon: <Map className="w-5 h-5" />,
      links: [
        { name: 'Testimonials', href: '/testimonials', description: 'Real reviews from traders' },
        { name: 'Submit Review', href: '/testimonials', description: 'Share your experience' },
        {
          name: 'Community Forum',
          href: '#',
          description: 'Connect with other traders (Coming Soon)',
        },
      ],
    },
    {
      title: 'Account & Preferences',
      icon: <Map className="w-5 h-5" />,
      links: [
        {
          name: 'Newsletter Preferences',
          href: '/preferences',
          description: 'Manage your email preferences',
        },
        {
          name: 'Unsubscribe',
          href: '/unsubscribe',
          description: 'Unsubscribe from newsletters',
        },
        { name: 'Account Settings', href: '#', description: 'Manage your account (Coming Soon)' },
      ],
    },
    {
      title: 'Help & Support',
      icon: <Map className="w-5 h-5" />,
      links: [
        { name: 'How It Works', href: '#', description: 'Learn how to use ReviewMarket' },
        { name: 'FAQ', href: '#', description: 'Frequently asked questions (Coming Soon)' },
        { name: 'Trading Guides', href: '#', description: 'Educational content (Coming Soon)' },
        { name: 'Contact Support', href: '/#contact', description: 'Get help from our team' },
      ],
    },
    {
      title: 'Legal & Information',
      icon: <Map className="w-5 h-5" />,
      links: [
        { name: 'Privacy Policy', href: '/privacy', description: 'How we protect your data' },
        { name: 'Terms & Conditions', href: '/terms', description: 'Terms of service' },
        { name: 'Cookie Policy', href: '/cookies', description: 'How we use cookies' },
        { name: 'Disclaimer', href: '/disclaimer', description: 'Legal disclaimers' },
        { name: 'Sitemap', href: '/sitemap', description: 'Complete site structure' },
      ],
    },
  ];

  const quickLinks = [
    { name: 'Compare Firms', href: '/firms', icon: <Map className="w-4 h-4" /> },
    { name: 'Read Reviews', href: '/testimonials', icon: <Map className="w-4 h-4" /> },
    { name: 'Contact Us', href: '/#contact', icon: <Map className="w-4 h-4" /> },
    { name: 'About Us', href: '/about', icon: <Map className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col gap-0 px-4 sm:px-6">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

          <div className="container mx-auto px-4">
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
                Site Navigation
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">Sitemap</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Navigate through ReviewMarket&apos;s complete structure and find everything you
                need.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-12 bg-muted/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Map className="w-5 h-5 text-primary" />
                    Quick Links
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {quickLinks.map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-muted/50 rounded-lg transition-colors"
                      >
                        {link.icon}
                        <span className="text-sm font-medium">{link.name}</span>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Main Sections */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-8">
              {sections.map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {section.icon}
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3">
                        {section.links.map((link, linkIndex) => (
                          <div key={linkIndex} className="group">
                            <Link
                              href={link.href}
                              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                            >
                              <div>
                                <div className="font-medium text-foreground">{link.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {link.description}
                                </div>
                              </div>
                              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </Link>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-xl max-w-2xl mx-auto">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Need Help?</h2>
                  <p className="text-muted-foreground mb-6">
                    Can&apos;t find what you&apos;re looking for? Our support team is here to help.
                  </p>
                  <div className="space-y-3">
                    <Link href="/#contact">
                      <Button className="flex items-center">
                        Contact Support
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                    <Link href="/about">
                      <Button variant="outline">Learn More About Us</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
