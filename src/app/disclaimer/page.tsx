'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Shield, Info, FileText, Users, Scale, Mail } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/Footer';

export default function DisclaimerPage() {
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
                Legal Disclaimer
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">Disclaimer</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Important legal information about the use of our platform and services.
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
              {/* General Disclaimer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="border-0 shadow-sm bg-background/60 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-primary" />
                      General Disclaimer
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      The information provided on ReviewMarket is for general informational purposes
                      only. While we strive to keep the information up to date and correct, we make
                      no representations or warranties of any kind, express or implied, about the
                      completeness, accuracy, reliability, suitability, or availability of the
                      information, products, services, or related graphics contained on our
                      platform.
                    </p>
                    <p className="text-muted-foreground">
                      Any reliance you place on such information is therefore strictly at your own
                      risk. In no event will we be liable for any loss or damage including without
                      limitation, indirect or consequential loss or damage, arising from loss of
                      data or profits arising out of, or in connection with, the use of our
                      platform.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* No Financial Advice */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="border-0 shadow-sm bg-background/60 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      No Financial Advice
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      <strong>Important:</strong> ReviewMarket is not a financial advisor, broker,
                      or investment advisor. The information provided on our platform is for
                      informational purposes only and should not be considered as financial advice,
                      investment recommendations, or trading advice.
                    </p>
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">Key Points:</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                        <li>We do not provide investment, financial, or trading advice</li>
                        <li>All information is for educational and informational purposes only</li>
                        <li>Past performance does not guarantee future results</li>
                        <li>
                          Always consult with qualified financial professionals before making
                          investment decisions
                        </li>
                        <li>
                          Trading involves substantial risk of loss and is not suitable for all
                          investors
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Risk Disclosure */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="border-0 shadow-sm bg-background/60 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-primary" />
                      Risk Disclosure
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Trading in financial markets, including prop trading, involves substantial
                      risk of loss and is not suitable for all investors. You should carefully
                      consider whether trading is appropriate for you in light of your financial
                      condition, investment objectives, and risk tolerance.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Trading Risks</h4>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                          <li>You can lose more than your initial investment</li>
                          <li>Market volatility can result in significant losses</li>
                          <li>Leverage can work against you</li>
                          <li>Past performance is not indicative of future results</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">
                          Prop Trading Specific Risks
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                          <li>Evaluation challenges and requirements</li>
                          <li>Account restrictions and limitations</li>
                          <li>Profit sharing arrangements</li>
                          <li>Firm-specific rules and policies</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Information Accuracy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card className="border-0 shadow-sm bg-background/60 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="w-5 h-5 text-primary" />
                      Information Accuracy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      While we strive to provide accurate and up-to-date information about prop
                      trading firms, we cannot guarantee the accuracy, completeness, or timeliness
                      of any information on our platform.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Information Sources</h4>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                          <li>
                            Information is gathered from various sources including firm websites,
                            user reviews, and public records
                          </li>
                          <li>
                            We do not independently verify all information provided by third parties
                          </li>
                          <li>Firm information may change without notice</li>
                          <li>User reviews represent individual opinions and experiences</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Recommendations</h4>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                          <li>Always verify information directly with the prop trading firm</li>
                          <li>Read and understand all terms and conditions</li>
                          <li>Conduct your own due diligence</li>
                          <li>Consider multiple sources of information</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Third-Party Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Card className="border-0 shadow-sm bg-background/60 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Third-Party Content
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Our platform may contain content from third parties, including user reviews,
                      testimonials, and links to external websites. We do not endorse, guarantee, or
                      take responsibility for any third-party content.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">
                          User-Generated Content
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                          <li>Reviews and testimonials represent individual user experiences</li>
                          <li>We do not verify the accuracy of user-generated content</li>
                          <li>User opinions may not reflect our views</li>
                          <li>Content is moderated but not pre-screened</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">External Links</h4>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                          <li>We are not responsible for external website content</li>
                          <li>External sites have their own privacy policies and terms</li>
                          <li>We do not endorse external products or services</li>
                          <li>Use external links at your own risk</li>
                        </ul>
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
                      <Scale className="w-5 h-5 text-primary" />
                      Limitation of Liability
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      To the maximum extent permitted by applicable law, ReviewMarket and its
                      affiliates, officers, employees, agents, and licensors shall not be liable for
                      any direct, indirect, incidental, special, consequential, or punitive damages,
                      including but not limited to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                      <li>Loss of profits, revenue, or business opportunities</li>
                      <li>Loss of data or information</li>
                      <li>Interruption of business or services</li>
                      <li>Damages resulting from the use or inability to use our platform</li>
                      <li>Any errors or omissions in our content</li>
                      <li>Damages resulting from third-party content or links</li>
                    </ul>
                    <p className="text-muted-foreground">
                      This limitation of liability applies whether the alleged liability is based on
                      contract, tort, negligence, strict liability, or any other basis, even if we
                      have been advised of the possibility of such damage.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Jurisdiction */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <Card className="border-0 shadow-sm bg-background/60 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Jurisdiction and Governing Law
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      This disclaimer and the use of our platform are governed by and construed in
                      accordance with the laws of [Your Jurisdiction]. Any disputes arising from the
                      use of our platform shall be subject to the exclusive jurisdiction of the
                      courts in [Your Jurisdiction].
                    </p>
                    <p className="text-muted-foreground">
                      If any provision of this disclaimer is found to be unenforceable or invalid,
                      that provision will be limited or eliminated to the minimum extent necessary
                      so that this disclaimer will otherwise remain in full force and effect.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <Card className="border-0 shadow-sm bg-background/60 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="w-5 h-5 text-primary" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      If you have any questions about this disclaimer or our platform, please
                      contact us:
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
