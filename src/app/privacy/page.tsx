'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Eye, Users, Clock, Mail } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
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
                Privacy Policy
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Privacy Policy
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Learn how we collect, use, and protect your personal information when you use
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
              {/* Introduction */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Introduction
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-lg max-w-none text-muted-foreground">
                    <p>
                      At ReviewMarket, we are committed to protecting your privacy and ensuring the
                      security of your personal information. This Privacy Policy explains how we
                      collect, use, disclose, and safeguard your information when you visit our
                      website and use our services.
                    </p>
                    <p>
                      By using our website, you consent to the data practices described in this
                      policy. If you do not agree with our policies and practices, please do not use
                      our website.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Information We Collect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="w-5 h-5 text-primary" />
                      Information We Collect
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-lg max-w-none text-muted-foreground">
                    <p>
                      We collect several types of information from and about users of our website:
                    </p>
                    <ul>
                      <li>
                        <strong>Personal Information:</strong> Name, email address, phone number,
                        and other contact information when you register, subscribe to our
                        newsletter, or contact us
                      </li>
                      <li>
                        <strong>Usage Information:</strong> Information about how you use our
                        website, including pages visited, time spent on pages, and interactions with
                        features
                      </li>
                      <li>
                        <strong>Technical Information:</strong> IP address, browser type, operating
                        system, device information, and other technical data
                      </li>
                      <li>
                        <strong>User Content:</strong> Reviews, comments, testimonials, and other
                        content you submit to our website
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* How We Use Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="w-5 h-5 text-primary" />
                      How We Use Your Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-lg max-w-none text-muted-foreground">
                    <p>We use the information we collect for various purposes:</p>
                    <ul>
                      <li>
                        <strong>Provide Services:</strong> To provide and maintain our website and
                        services
                      </li>
                      <li>
                        <strong>Communication:</strong> To communicate with you about our services,
                        updates, and promotions
                      </li>
                      <li>
                        <strong>Improve Services:</strong> To analyze usage patterns and improve our
                        website and services
                      </li>
                      <li>
                        <strong>Security:</strong> To protect against fraud, abuse, and security
                        threats
                      </li>
                      <li>
                        <strong>Legal Compliance:</strong> To comply with legal obligations and
                        enforce our terms
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Information Sharing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Information Sharing and Disclosure
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-lg max-w-none text-muted-foreground">
                    <p>
                      We do not sell, trade, or otherwise transfer your personal information to
                      third parties without your consent, except in the following circumstances:
                    </p>
                    <ul>
                      <li>
                        <strong>Service Providers:</strong> We may share information with trusted
                        third-party service providers who assist us in operating our website and
                        providing services
                      </li>
                      <li>
                        <strong>Legal Requirements:</strong> We may disclose information if required
                        by law or to protect our rights and safety
                      </li>
                      <li>
                        <strong>Business Transfers:</strong> In the event of a merger, acquisition,
                        or sale of assets, your information may be transferred as part of the
                        transaction
                      </li>
                      <li>
                        <strong>Consent:</strong> We may share information with your explicit
                        consent
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Data Security */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Data Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-lg max-w-none text-muted-foreground">
                    <p>
                      We implement appropriate technical and organizational security measures to
                      protect your personal information against unauthorized access, alteration,
                      disclosure, or destruction. These measures include:
                    </p>
                    <ul>
                      <li>Encryption of data in transit and at rest</li>
                      <li>Regular security assessments and updates</li>
                      <li>Access controls and authentication</li>
                      <li>Secure data storage and backup procedures</li>
                      <li>Employee training on data protection</li>
                    </ul>
                    <p>
                      However, no method of transmission over the internet or electronic storage is
                      100% secure. While we strive to protect your information, we cannot guarantee
                      absolute security.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Your Rights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Your Rights and Choices
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-lg max-w-none text-muted-foreground">
                    <p>You have certain rights regarding your personal information:</p>
                    <ul>
                      <li>
                        <strong>Access:</strong> You can request access to the personal information
                        we hold about you
                      </li>
                      <li>
                        <strong>Correction:</strong> You can request correction of inaccurate or
                        incomplete information
                      </li>
                      <li>
                        <strong>Deletion:</strong> You can request deletion of your personal
                        information
                      </li>
                      <li>
                        <strong>Portability:</strong> You can request a copy of your data in a
                        portable format
                      </li>
                      <li>
                        <strong>Objection:</strong> You can object to certain processing of your
                        information
                      </li>
                      <li>
                        <strong>Withdrawal:</strong> You can withdraw consent for processing based
                        on consent
                      </li>
                    </ul>
                    <p>
                      To exercise these rights, please contact us using the information provided
                      below.
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
                      <Mail className="w-5 h-5 text-primary" />
                      Contact Us
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-lg max-w-none text-muted-foreground">
                    <p>
                      If you have any questions about this Privacy Policy or our data practices,
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
