import React from 'react';
import TestimonialForm from '@/components/forms/TestimonialForm';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import TrustpilotWidget from '@/components/widgets/TrustpilotWidget';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/Footer';

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-green-800 mb-4">Share Your Experience</h1>
            <p className="text-xl text-green-600 max-w-2xl mx-auto">
              Help other traders make informed decisions by sharing your experience with prop firms,
              trading platforms, or our comparison service.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Testimonial Form */}
            <div>
              <TestimonialForm />
            </div>

            {/* Current Testimonials Preview */}
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-green-800 mb-2">What Others Are Saying</h2>
                <p className="text-green-600">See what our community has to say</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <TestimonialsSection preview={true} />
              </div>
            </div>
          </div>

          {/* Trustpilot Widget Section */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-green-800 mb-2">Review Us on Trustpilot</h2>
              <p className="text-green-600">Share your experience and help other traders</p>
            </div>
            <div className="max-w-2xl mx-auto">
              <TrustpilotWidget />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
