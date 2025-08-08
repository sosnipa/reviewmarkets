'use client';
import NewsletterForm from '../forms/NewsletterForm';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Bell, Gift } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const NewsletterSection: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Only show popup if not already shown this session
    if (!sessionStorage.getItem('newsletter_popup_shown')) {
      const timer = setTimeout(() => {
        setShowModal(true);
        sessionStorage.setItem('newsletter_popup_shown', 'true');
      }, 60000); // Changed to 60000 (60s)
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section
      id="newsletter"
      className="relative w-full py-20 flex justify-center items-center bg-muted/20 overflow-hidden"
    >
      {/* Section Radial Gradient Glow */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
        <div className="w-[180vw] h-[120vh] max-w-none rounded-full bg-gradient-radial from-primary/20 via-primary/10 to-transparent blur-[120px] opacity-100"></div>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <Card className="bg-background/80 backdrop-blur-xl border-primary/20 shadow-2xl">
          <CardContent className="p-8 text-center">
            <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/20">
              Stay Connected
            </Badge>
            <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              Subscribe For The Latest In Prop Trading News And Deals
            </CardTitle>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Get exclusive insights, prop firm reviews, and special offers delivered to your inbox.
            </p>
            <NewsletterForm variant="section" />

            {/* Benefits */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Bell className="w-4 h-4 text-primary" />
                <span>Weekly updates</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Gift className="w-4 h-4 text-primary" />
                <span>Exclusive offers</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>No spam, unsubscribe anytime</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal Popup (auto, once per session) */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              Join Our Newsletter
            </DialogTitle>
            <DialogDescription>
              Get the latest prop firm news, reviews, and exclusive offers.
            </DialogDescription>
          </DialogHeader>
          <NewsletterForm variant="modal" onSubscribed={() => setShowModal(false)} />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default NewsletterSection;
