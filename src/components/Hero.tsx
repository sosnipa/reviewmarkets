'use client';
import { Instagram, Twitter, Send, MessageCircle } from 'lucide-react';
import { motion, easeOut } from 'framer-motion';

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

        <motion.form
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full sm:w-64 px-4 py-3 rounded-full border border-brand-border bg-brand-card text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-brand-text placeholder:text-brand-text/60"
          />
          <motion.button
            type="submit"
            whileHover={{
              boxShadow: '0 0 12px 2px var(--brand-accent), 0 0 32px 8px var(--brand-primary)',
              scale: 1.04,
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-6 py-3 rounded-full font-semibold shadow transition text-sm neon-cta"
          >
            Get Started
          </motion.button>
        </motion.form>

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
