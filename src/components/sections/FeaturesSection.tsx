'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useInView, easeOut } from 'framer-motion';

const features = [
  {
    title: 'Verified Top Firms',
    desc: 'Only the best, most trusted prop firms make our list.',
  },
  {
    title: 'Real Traders Reviews',
    desc: 'Read honest reviews from real traders worldwide.',
  },
  {
    title: 'Monthly Views',
    desc: 'See which firms are trending and most popular each month.',
  },
  {
    title: 'Global Coverage',
    desc: 'Firms from all over the world, all in one place.',
  },
  {
    title: 'Asset Diversity',
    desc: 'Compare firms by supported assets: FX, Crypto, Indices, and more.',
  },
  {
    title: 'Platform Variety',
    desc: 'Find firms supporting MT4, MT5, cTrader, and more.',
  },
  {
    title: 'Exclusive Discounts',
    desc: 'Get access to special offers and promo codes.',
  },
  {
    title: 'Favorites & Filters',
    desc: 'Save your favorite firms and filter by what matters to you.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

const FeaturesSection: React.FC = () => {
  const [index, setIndex] = useState(0);
  const maxIndex = features.length - 2;

  const next = useCallback(() => setIndex((i) => (i < maxIndex ? i + 2 : 0)), [maxIndex]);
  const prev = useCallback(() => setIndex((i) => (i === 0 ? maxIndex : i - 2)), [maxIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 12000);
    return () => clearInterval(interval);
  }, [index, next]);

  // Ref for in-view animation
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="features" className="w-full py-16 bg-brand-bg text-brand-text">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-8 text-center text-brand-primary">Why Choose Us?</h2>
        <div className="relative w-full flex items-center justify-center">
          <motion.button
            onClick={prev}
            whileHover={{ scale: 1.05, boxShadow: '0 0 4px 1px var(--brand-primary)' }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-0 z-10 px-3 py-2 bg-brand-card text-brand-primary rounded-full shadow hover:bg-brand-primary/10 transition border border-brand-border"
            aria-label="Previous"
          >
            &#8592;
          </motion.button>
          <div className="w-full max-w-2xl overflow-hidden">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={index}
                initial={{ x: 100, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : {}}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="flex gap-6 justify-center"
                ref={sectionRef}
              >
                {[features[index], features[index + 1]].map((feature) => (
                  <motion.div
                    key={feature.title}
                    variants={cardVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    whileHover={{
                      scale: 1.02,
                      boxShadow:
                        '0 0 6px 1px var(--brand-accent), 0 0 12px 3px var(--brand-primary)',
                    }}
                    className="flex-1 min-w-[220px] max-w-xs bg-brand-card rounded-2xl shadow-lg p-6 text-center border border-brand-border transition"
                  >
                    <h3 className="font-bold text-xl mb-2 text-brand-primary">{feature.title}</h3>
                    <p className="text-sm text-brand-text/70">{feature.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          <motion.button
            onClick={next}
            whileHover={{ scale: 1.05, boxShadow: '0 0 4px 1px var(--brand-primary)' }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-0 z-10 px-3 py-2 bg-brand-card text-brand-primary rounded-full shadow hover:bg-brand-primary/10 transition border border-brand-border"
            aria-label="Next"
          >
            &#8594;
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
