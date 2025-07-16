import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/Hero';
import FirmsGridSection from '@/components/FirmsGridSection';
import FeaturesSection from '@/components/FeaturesSection';
import MarketDataSection from '@/components/MarketDataSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import NewsletterSection from '@/components/NewsletterSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col gap-0 px-4 sm:px-6">
        <Hero />
        <FeaturesSection />
        <FirmsGridSection />
        <MarketDataSection />
        <TestimonialsSection />
        <NewsletterSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
