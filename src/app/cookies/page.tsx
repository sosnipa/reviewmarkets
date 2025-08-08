'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, Settings, Clock } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/Footer';

export default function CookiesPage() {
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
                Cookie Policy
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">Cookie Policy</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Learn how we use cookies and similar technologies to enhance your experience on
                ReviewMarket.
              </p>
              <div className="inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-full">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Last updated: December 15, 2024
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* What Are Cookies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="w-5 h-5 text-primary" />
                      What Are Cookies?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-lg max-w-none text-muted-foreground">
                    <p>
                      Cookies are small text files that are stored on your device when you visit our
                      website. They help us provide you with a better experience by remembering your
                      preferences, analyzing how you use our site, and personalizing content.
                    </p>
                    <p>
                      We use both session cookies (which expire when you close your browser) and
                      persistent cookies (which remain on your device for a set period) to enhance
                      your browsing experience.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* How We Use Cookies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="w-5 h-5 text-primary" />
                      How We Use Cookies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-lg max-w-none text-muted-foreground">
                    <p>We use cookies for the following purposes:</p>
                    <ul>
                      <li>
                        <strong>Essential Cookies:</strong> These are necessary for the website to
                        function properly. They enable basic functions like page navigation and
                        access to secure areas.
                      </li>
                      <li>
                        <strong>Analytics Cookies:</strong> These help us understand how visitors
                        interact with our website by collecting and reporting information
                        anonymously.
                      </li>
                      <li>
                        <strong>Functional Cookies:</strong> These allow the website to remember
                        choices you make and provide enhanced, more personal features.
                      </li>
                      <li>
                        <strong>Marketing Cookies:</strong> These are used to track visitors across
                        websites to display relevant and engaging advertisements.
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Third-Party Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-primary" />
                      Third-Party Services
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-lg max-w-none text-muted-foreground">
                    <p>
                      We may use third-party services that also use cookies. These services include:
                    </p>
                    <ul>
                      <li>
                        <strong>Google Analytics:</strong> To analyze website traffic and user
                        behavior
                      </li>
                      <li>
                        <strong>Google Ads:</strong> To display relevant advertisements
                      </li>
                      <li>
                        <strong>Social Media Platforms:</strong> To enable social sharing and
                        integration
                      </li>
                      <li>
                        <strong>Payment Processors:</strong> To process secure payments
                      </li>
                    </ul>
                    <p>
                      These third-party services have their own privacy policies and cookie
                      practices. We encourage you to review their policies for more information.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Cookie Control */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-primary" />
                      Managing Your Cookie Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-lg max-w-none text-muted-foreground">
                    <p>You have several options for managing cookies:</p>
                    <ul>
                      <li>
                        <strong>Browser Settings:</strong> Most browsers allow you to control
                        cookies through their settings. You can usually find these settings in the
                        &quot;Privacy&quot; or &quot;Security&quot; section of your browser.
                      </li>
                      <li>
                        <strong>Cookie Consent:</strong> When you first visit our site, you&apos;ll
                        see a cookie consent banner that allows you to accept or decline
                        non-essential cookies.
                      </li>
                      <li>
                        <strong>Opt-Out Tools:</strong> You can use opt-out tools provided by
                        third-party services to manage their cookies independently.
                      </li>
                    </ul>
                    <p>
                      Please note that disabling certain cookies may affect the functionality of our
                      website.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Cookie Duration */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Cookie Duration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-lg max-w-none text-muted-foreground">
                    <p>The duration for which cookies are stored on your device varies:</p>
                    <ul>
                      <li>
                        <strong>Session Cookies:</strong> These are temporary and are deleted when
                        you close your browser
                      </li>
                      <li>
                        <strong>Persistent Cookies:</strong> These remain on your device for a set
                        period, typically:
                        <ul>
                          <li>Analytics cookies: 2 years</li>
                          <li>Functional cookies: 1 year</li>
                          <li>Marketing cookies: 90 days</li>
                        </ul>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Updates */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="w-5 h-5 text-primary" />
                      Updates to This Policy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-lg max-w-none text-muted-foreground">
                    <p>
                      We may update this Cookie Policy from time to time to reflect changes in our
                      practices or for other operational, legal, or regulatory reasons. We will
                      notify you of any material changes by posting the updated policy on our
                      website.
                    </p>
                    <p>
                      Your continued use of our website after any changes indicates your acceptance
                      of the updated policy.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="w-5 h-5 text-primary" />
                      Contact Us
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-lg max-w-none text-muted-foreground">
                    <p>
                      If you have any questions about our use of cookies or this Cookie Policy,
                      please contact us at:
                    </p>
                    <ul>
                      <li>Email: privacy@reviewmarket.com</li>
                      <li>Address: [Your Business Address]</li>
                      <li>Phone: [Your Business Phone]</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
