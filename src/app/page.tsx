import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import FirmsGridSection from '@/components/sections/FirmsGridSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import MarketDataSection from '@/components/sections/MarketDataSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import NewsletterSection from '@/components/sections/NewsletterSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen text-foreground flex flex-col">
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
