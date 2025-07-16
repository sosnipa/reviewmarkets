'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, easeOut } from 'framer-motion';

interface Testimonial {
  id: number;
  name: string;
  title: string;
  review: string;
  avatar: string;
  rating: number;
  approved: boolean;
  createdAt: string;
}

interface TestimonialsResponse {
  testimonials: Testimonial[];
  total: number;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    position: 'absolute' as const,
  }),
  center: {
    x: 0,
    opacity: 1,
    position: 'relative' as const,
    transition: { duration: 0.6, ease: easeOut },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    position: 'absolute' as const,
    transition: { duration: 0.6, ease: easeOut },
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);

  // Fetch testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/testimonials');
        if (!response.ok) throw new Error('Failed to fetch testimonials');

        const data: TestimonialsResponse = await response.json();
        setTestimonials(data.testimonials);
        setError(null);
      } catch (err) {
        setError('Failed to load testimonials');
        console.error('Error fetching testimonials:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const testimonialIndex =
    ((page % testimonials.length) + testimonials.length) % testimonials.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  if (loading) {
    return (
      <section id="testimonials" className="w-full py-16 bg-brand-bg text-center">
        <h2 className="text-3xl font-bold mb-8 text-brand-primary">What Our Users Say</h2>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
        </div>
      </section>
    );
  }

  if (error || testimonials.length === 0) {
    return (
      <section id="testimonials" className="w-full py-16 bg-brand-bg text-center">
        <h2 className="text-3xl font-bold mb-8 text-brand-primary">What Our Users Say</h2>
        <div className="text-center py-12 text-red-500">{error || 'No testimonials available'}</div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="w-full py-16 bg-brand-bg text-center">
      <h2 className="text-3xl font-bold mb-8 text-brand-primary">What Our Users Say</h2>
      <div className="max-w-xl mx-auto relative">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 400, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="bg-brand-card rounded-xl shadow-lg px-8 py-10 min-h-[260px] flex flex-col items-center border border-brand-border"
            whileHover={{
              scale: 1.01,
              boxShadow: '0 0 6px 1px var(--brand-accent), 0 0 12px 3px var(--brand-primary)',
            }}
          >
            <img
              src={testimonials[testimonialIndex].avatar}
              alt={testimonials[testimonialIndex].name}
              className="w-16 h-16 rounded-full mb-4 object-cover border-2 border-brand-primary"
            />
            <p className="text-lg mb-4 font-medium text-brand-text/90">
              &quot;{testimonials[testimonialIndex].review}&quot;
            </p>
            <div className="font-semibold text-brand-primary mb-1">
              {testimonials[testimonialIndex].name}
            </div>
            <div className="text-sm text-brand-text/60">{testimonials[testimonialIndex].title}</div>
          </motion.div>
        </AnimatePresence>
        {/* Navigation Arrows */}
        <motion.button
          aria-label="Previous testimonial"
          onClick={() => paginate(-1)}
          whileHover={{ scale: 1.05, boxShadow: '0 0 4px 1px var(--brand-primary)' }}
          whileTap={{ scale: 0.95 }}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-brand-card border border-brand-border rounded-full p-2 shadow hover:bg-brand-primary/10 transition"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
        <motion.button
          aria-label="Next testimonial"
          onClick={() => paginate(1)}
          whileHover={{ scale: 1.05, boxShadow: '0 0 4px 1px var(--brand-primary)' }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-brand-card border border-brand-border rounded-full p-2 shadow hover:bg-brand-primary/10 transition"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to testimonial ${idx + 1}`}
              className={`w-3 h-3 rounded-full ${idx === testimonialIndex ? 'bg-brand-primary' : 'bg-brand-border'}`}
              onClick={() => setPage([idx, idx > testimonialIndex ? 1 : -1])}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
