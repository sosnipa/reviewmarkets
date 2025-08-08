'use client';
import { Instagram, Twitter, Send, MessageCircle } from 'lucide-react';
import { motion, easeOut } from 'framer-motion';
// import NewsletterForm from './NewsletterForm';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

export default function Hero() {
  return (
    <section className="mt-0 bg-brand-bg px-6 pb-2 text-brand-text">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-3xl mx-auto text-center space-y-8 pt-28"
      >
        <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl font-bold leading-tight">
          Compare the <span className="text-brand-primary">Best Prop Firms</span>.<br />
          Get the <span className="text-brand-accent">Best Offers</span>.
        </motion.h1>

        <motion.p variants={itemVariants} className="text-lg text-brand-text/80 max-w-xl mx-auto">
          Join thousands of traders using our platform to choose the right prop firm and maximize
          their edge.
        </motion.p>

        {/* Newsletter form removed as requested */}

        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center gap-2 mt-6"
        >
          <div className="flex items-center justify-center gap-4 text-brand-primary text-2xl">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-brand-accent transition"
            >
              <Instagram />
            </a>
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="hover:text-brand-accent transition"
            >
              <Send />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-brand-accent transition"
            >
              <Twitter />
            </a>
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hover:text-brand-accent transition"
            >
              <MessageCircle />
            </a>
          </div>
          <div className="text-center">
            <p className="font-semibold text-base uppercase tracking-wide text-brand-accent">
              JOIN 12K+ TRADERS USING OUR PLATFORM WORLDWIDE
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
