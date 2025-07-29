'use client';
import NewsletterForm from './NewsletterForm';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
      className="relative w-full py-20 flex justify-center items-center bg-transparent overflow-hidden"
    >
      {/* Section Radial Gradient Glow */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
        <div className="w-[180vw] h-[120vh] max-w-none rounded-full bg-gradient-radial from-brand-primary/50 via-brand-secondary/30 to-transparent blur-[120px] opacity-100"></div>
      </div>
      {/* Card */}
      <div className="relative z-10 w-full max-w-2xl mx-auto bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl px-8 py-14 flex flex-col items-center border border-brand-border">
        <div className="text-xs font-semibold tracking-widest text-brand-accent mb-3 uppercase">
          Stay Connected
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-text mb-6 text-center leading-tight">
          Subscribe For The Latest In Prop Trading News And Deals
        </h2>
        <NewsletterForm variant="section" />
      </div>
      {/* Modal Popup (auto, once per session) */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/90 backdrop-blur-md text-brand-text rounded-xl shadow-2xl p-8 max-w-md w-full relative border border-brand-border"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-2 text-brand-primary">Join Our Newsletter</h3>
              <p className="mb-4 text-sm text-brand-text/70">
                Get the latest prop firm news, reviews, and exclusive offers.
              </p>
              <NewsletterForm variant="modal" onSubscribed={() => setShowModal(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default NewsletterSection;
