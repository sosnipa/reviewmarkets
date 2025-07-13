'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    name: 'Alice Johnson',
    title: 'Day Trader',
    review:
      'This platform made it so easy to compare prop firms. I found the perfect fit for my trading style!',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Brian Lee',
    title: 'Forex Trader',
    review: 'The reviews and filters are top-notch. I saved hours of research. Highly recommended!',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Carla Mendes',
    title: 'Futures Trader',
    review:
      'I love the clean design and the detailed firm breakdowns. Helped me avoid some bad choices!',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'David Kim',
    title: 'Swing Trader',
    review: 'The testimonials and user feedback gave me confidence in my decision. Great resource!',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
  },
];

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
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    position: 'absolute' as const,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const TestimonialsSection: React.FC = () => {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const testimonialIndex =
    ((page % testimonials.length) + testimonials.length) % testimonials.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <section id="testimonials" className="w-full py-16 bg-background text-center">
      <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
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
            className="bg-muted rounded-xl shadow-lg px-8 py-10 min-h-[260px] flex flex-col items-center"
          >
            <img
              src={testimonials[testimonialIndex].avatar}
              alt={testimonials[testimonialIndex].name}
              className="w-16 h-16 rounded-full mb-4 object-cover border-2 border-primary"
            />
            <p className="text-lg mb-4 font-medium">
              &quot;{testimonials[testimonialIndex].review}&quot;
            </p>
            <div className="font-semibold text-primary mb-1">
              {testimonials[testimonialIndex].name}
            </div>
            <div className="text-sm text-muted-foreground">
              {testimonials[testimonialIndex].title}
            </div>
          </motion.div>
        </AnimatePresence>
        {/* Navigation Arrows */}
        <button
          aria-label="Previous testimonial"
          onClick={() => paginate(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-background border border-border rounded-full p-2 shadow hover:bg-muted transition"
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
        </button>
        <button
          aria-label="Next testimonial"
          onClick={() => paginate(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-background border border-border rounded-full p-2 shadow hover:bg-muted transition"
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
        </button>
        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to testimonial ${idx + 1}`}
              className={`w-3 h-3 rounded-full ${idx === testimonialIndex ? 'bg-primary' : 'bg-border'}`}
              onClick={() => setPage([idx, idx > testimonialIndex ? 1 : -1])}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
