'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Shield, Users, Clock, AlertTriangle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
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
                Terms & Conditions
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Terms & Conditions
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Please read these terms and conditions carefully before using our services.
              </p>
            </motion.div>

            {/* Last Updated */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-full">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Last updated: December 15, 2024
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto max-w-4xl">
            <div className="space-y-8">
              {/* Introduction */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="border-0 shadow-sm bg-background/60 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Agreement to Terms
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      ReviewMarket (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) provides a
                      platform for comparing and reviewing prop trading firms. By using our website
                      and services, you agree to be bound by these Terms and Conditions.
                    </p>
                    <p className="text-muted-foreground">
                      If you disagree with any part of these terms, then you may not access our
                      services. These Terms apply to all visitors, users, and others who access or
                      use our services.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Services Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="border-0 shadow-sm bg-background/60 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Description of Services
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      ReviewMarket provides a platform for comparing and reviewing prop trading
                      firms. Our services include:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                      <li>Comprehensive reviews and ratings of prop trading firms</li>
                      <li>Comparison tools and analysis</li>
                      <li>User-generated testimonials and feedback</li>
                      <li>Newsletter and educational content</li>
                      <li>Market data and insights</li>
                    </ul>
                    <p className="text-muted-foreground">
                      We do not provide trading services, financial advice, or investment
                      recommendations. All information provided is for informational purposes only.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* User Responsibilities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="border-0 shadow-sm bg-background/60 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      User Responsibilities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">By using our services, you agree to:</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Proper Use</h4>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                          <li>Use services for lawful purposes only</li>
                          <li>Provide accurate and truthful information</li>
                          <li>Respect intellectual property rights</li>
                          <li>Maintain account security</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Prohibited Activities</h4>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                          <li>Spam or unsolicited communications</li>
                          <li>Harassment or abusive behavior</li>
                          <li>Attempting to gain unauthorized access</li>
                          <li>Interfering with service operation</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Intellectual Property */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card className="border-0 shadow-sm bg-background/60 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Intellectual Property
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      The content on ReviewMarket, including but not limited to text, graphics,
                      images, logos, and software, is owned by us or our licensors and is protected
                      by copyright, trademark, and other intellectual property laws.
                    </p>
                    <p className="text-muted-foreground">
                      You may not reproduce, distribute, modify, or create derivative works of our
                      content without our express written consent.
                    </p>
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">User-Generated Content</h4>
                      <p className="text-muted-foreground text-sm">
                        By submitting content to our platform, you grant us a non-exclusive,
                        royalty-free license to use, display, and distribute your content in
                        connection with our services.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Disclaimers */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Card className="border-0 shadow-sm bg-background/60 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-primary" />
                      Disclaimers and Limitations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">No Financial Advice</h4>
                        <p className="text-muted-foreground">
                          The information provided on our platform is for informational purposes
                          only and should not be considered as financial advice. We are not licensed
                          financial advisors.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">
                          Accuracy of Information
                        </h4>
                        <p className="text-muted-foreground">
                          While we strive to provide accurate and up-to-date information, we cannot
                          guarantee the accuracy, completeness, or timeliness of any information on
                          our platform.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Third-Party Content</h4>
                        <p className="text-muted-foreground">
                          Our platform may contain links to third-party websites or content. We are
                          not responsible for the content, privacy policies, or practices of any
                          third-party sites.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Limitation of Liability */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Card className="border-0 shadow-sm bg-background/60 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Limitation of Liability
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      To the maximum extent permitted by law, ReviewMarket shall not be liable for
                      any indirect, incidental, special, consequential, or punitive damages,
                      including but not limited to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                      <li>Loss of profits, data, or business opportunities</li>
                      <li>Damages resulting from the use or inability to use our services</li>
                      <li>Any errors or omissions in our content</li>
                      <li>Interruptions or delays in service</li>
                    </ul>
                    <p className="text-muted-foreground">
                      Our total liability to you for any claims arising from the use of our services
                      shall not exceed the amount you paid us, if any, in the twelve months
                      preceding the claim.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Termination */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <Card className="border-0 shadow-sm bg-background/60 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-primary" />
                      Termination
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      We may terminate or suspend your access to our services immediately, without
                      prior notice or liability, for any reason whatsoever, including without
                      limitation if you breach the Terms.
                    </p>
                    <p className="text-muted-foreground">
                      Upon termination, your right to use the services will cease immediately. If
                      you wish to terminate your account, you may simply discontinue using our
                      services.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Changes to Terms */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <Card className="border-0 shadow-sm bg-background/60 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Changes to Terms
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      We reserve the right to modify or replace these Terms at any time. If a
                      revision is material, we will try to provide at least 30 days notice prior to
                      any new terms taking effect.
                    </p>
                    <p className="text-muted-foreground">
                      What constitutes a material change will be determined at our sole discretion.
                      By continuing to access or use our services after any revisions become
                      effective, you agree to be bound by the revised terms.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                <Card className="border-0 shadow-sm bg-background/60 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      If you have any questions about these Terms & Conditions, please contact us:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Email</h4>
                        <p className="text-muted-foreground">legal@reviewmarket.com</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Address</h4>
                        <p className="text-muted-foreground">
                          ReviewMarket
                          <br />
                          Legal Team
                          <br />
                          [Your Business Address]
                        </p>
                      </div>
                    </div>
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
