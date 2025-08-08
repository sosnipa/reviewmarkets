'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Target, Award, Clock, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
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
                About Us
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Empowering Traders Worldwide
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                We&apos;re on a mission to democratize access to professional trading opportunities
                by connecting talented traders with the best prop trading firms worldwide.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-xl">
                <CardContent className="p-8">
                  <Target className="w-12 h-12 text-primary mx-auto mb-6" />
                  <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To create the world&apos;s most comprehensive and trusted platform for prop
                    trading firm comparisons, helping traders make informed decisions and achieve
                    their financial goals through professional trading opportunities.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These core values guide everything we do and shape our relationship with traders and
                prop firms alike.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Users,
                  title: 'Transparency',
                  description:
                    'We believe in complete transparency. All reviews, ratings, and comparisons are based on real data and verified user experiences.',
                },
                {
                  icon: Award,
                  title: 'Excellence',
                  description:
                    'We strive for excellence in everything we do, from the quality of our data to the user experience we provide.',
                },
                {
                  icon: Clock,
                  title: 'Innovation',
                  description:
                    'We continuously innovate to provide traders with the most advanced tools and insights for making informed decisions.',
                },
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-xl h-full">
                    <CardContent className="p-6 text-center">
                      <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-xl">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Our Story</h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground">
                    <p className="mb-4">
                      Founded by a team of experienced traders and technology enthusiasts,
                      ReviewMarket was born from a simple observation: the prop trading industry was
                      fragmented, opaque, and difficult to navigate for aspiring traders.
                    </p>
                    <p className="mb-4">
                      We saw traders struggling to find reliable information about prop firms,
                      spending countless hours researching and often making decisions based on
                      incomplete or biased information. This inspired us to create a comprehensive
                      platform that would bring transparency and clarity to the industry.
                    </p>
                    <p>
                      Today, we&apos;re proud to serve thousands of traders worldwide, helping them
                      make informed decisions and connect with the best prop trading opportunities
                      available.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Key Milestones */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">Key Milestones</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our journey from startup to industry leader.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-8">
              {[
                {
                  year: '2023',
                  title: 'Platform Launch',
                  description:
                    'Launched ReviewMarket with comprehensive prop firm database and comparison tools.',
                },
                {
                  year: '2024',
                  title: 'Community Growth',
                  description:
                    'Reached 10,000+ active traders and expanded to cover 50+ prop firms worldwide.',
                },
                {
                  year: '2024',
                  title: 'Advanced Features',
                  description:
                    'Introduced real-time data, advanced filtering, and AI-powered recommendations.',
                },
              ].map((milestone, index) => (
                <motion.div
                  key={milestone.year + milestone.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-6 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
                >
                  <div className="flex-shrink-0">
                    <Badge
                      variant="outline"
                      className="text-lg px-4 py-2 bg-primary/10 text-primary border-primary/20"
                    >
                      {milestone.year}
                    </Badge>
                  </div>
                  <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-xl flex-1">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
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
                  <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Join thousands of traders who are already using ReviewMarket to find their
                    perfect prop trading opportunity.
                  </p>
                  <Button size="lg" className="gap-2">
                    Explore Prop Firms
                    <ArrowRight className="w-4 h-4" />
                  </Button>
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
