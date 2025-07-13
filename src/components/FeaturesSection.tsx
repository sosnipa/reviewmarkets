"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  {
    title: "Verified Top Firms",
    desc: "Only the best, most trusted prop firms make our list.",
  },
  {
    title: "Real Traders Reviews",
    desc: "Read honest reviews from real traders worldwide.",
  },
  {
    title: "Monthly Views",
    desc: "See which firms are trending and most popular each month.",
  },
  {
    title: "Global Coverage",
    desc: "Firms from all over the world, all in one place.",
  },
  {
    title: "Asset Diversity",
    desc: "Compare firms by supported assets: FX, Crypto, Indices, and more.",
  },
  {
    title: "Platform Variety",
    desc: "Find firms supporting MT4, MT5, cTrader, and more.",
  },
  {
    title: "Exclusive Discounts",
    desc: "Get access to special offers and promo codes.",
  },
  {
    title: "Favorites & Filters",
    desc: "Save your favorite firms and filter by what matters to you.",
  },
];

const FeaturesSection: React.FC = () => {
  const [index, setIndex] = useState(0);
  const maxIndex = features.length - 2;

  const next = () => setIndex((i) => (i < maxIndex ? i + 2 : 0));
  const prev = () => setIndex((i) => (i === 0 ? maxIndex : i - 2));

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 12000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <section id="features" className="w-full py-16 bg-light text-dark">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us?</h2>
        <div className="relative w-full flex items-center justify-center">
          <button
            onClick={prev}
            className="absolute left-0 z-10 px-3 py-2 bg-dark text-light rounded-full shadow hover:bg-primary/80 transition"
            aria-label="Previous"
          >
            &#8592;
          </button>
          <div className="w-full max-w-2xl overflow-hidden">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={index}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex gap-6 justify-center"
              >
                {[features[index], features[index + 1]].map((feature) => (
                  <div
                    key={feature.title}
                    className="flex-1 min-w-[220px] max-w-xs bg-white rounded-lg shadow p-6 text-center"
                  >
                    <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          <button
            onClick={next}
            className="absolute right-0 z-10 px-3 py-2 bg-dark text-light rounded-full shadow hover:bg-primary/80 transition"
            aria-label="Next"
          >
            &#8594;
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
