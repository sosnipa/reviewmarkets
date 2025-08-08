'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, easeOut } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Star, MessageCircle } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  title: string;
  review: string;
  avatar: string;
  rating: number;
  source: string;
  firmName?: string;
  createdAt: string;
}

interface TestimonialsResponse {
  testimonials: Testimonial[];
  total: number;
  source: string;
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

interface TestimonialsSectionProps {
  preview?: boolean;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ preview = false }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const [autoPlay, setAutoPlay] = useState(true);

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

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setPage(([currentPage]) => [currentPage + 1, 1]);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, testimonials.length]);

  const testimonialIndex =
    ((page % testimonials.length) + testimonials.length) % testimonials.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
    setAutoPlay(false); // Pause auto-play when user interacts
  };

  const goToTestimonial = (index: number) => {
    setPage([index, index > testimonialIndex ? 1 : -1]);
    setAutoPlay(false);
  };

  const toggleAutoPlay = () => {
    setAutoPlay(!autoPlay);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error || testimonials.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageCircle className="mx-auto h-12 w-12 text-green-400 mb-4" />
        <p className="text-green-600">{error || 'No testimonials available yet'}</p>
      </div>
    );
  }

  // If preview mode, render a simpler version
  if (preview) {
    return (
      <div className="space-y-4">
        {testimonials.slice(0, 3).map((testimonial) => (
          <div
            key={testimonial.id}
            className="flex items-start space-x-4 p-4 bg-white/50 rounded-lg"
          >
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-green-200"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold text-green-800">{testimonial.name}</h4>
                <span className="text-sm text-green-600">{testimonial.title}</span>
                {testimonial.source === 'trustpilot' && (
                  <Badge className="text-xs bg-blue-500 text-white">Trustpilot</Badge>
                )}
              </div>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-700 italic">
                &ldquo;
                {testimonial.review.length > 100
                  ? testimonial.review.substring(0, 100) + '...'
                  : testimonial.review}
                &rdquo;
              </p>
            </div>
          </div>
        ))}
        <div className="text-center pt-4">
          <p className="text-sm text-green-600">
            Showing {Math.min(3, testimonials.length)} of {testimonials.length} testimonials
          </p>
        </div>
      </div>
    );
  }

  return (
    <section
      id="testimonials"
      className="w-full py-16 bg-gradient-to-br from-green-50 to-emerald-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-green-800">What Our Users Say</h2>
          <p className="text-lg text-green-600">Real experiences from real traders</p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Auto-play toggle */}
          <div className="flex justify-center mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleAutoPlay}
              className="text-green-700 border-green-300 hover:bg-green-50"
            >
              {autoPlay ? 'Pause' : 'Play'} Auto-Play
            </Button>
          </div>

          <div className="relative overflow-hidden">
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
                className="w-full"
              >
                <Card className="bg-white/80 backdrop-blur-sm border-green-200 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center">
                      {/* Avatar */}
                      <div className="relative mb-6">
                        <img
                          src={testimonials[testimonialIndex].avatar}
                          alt={testimonials[testimonialIndex].name}
                          className="w-20 h-20 rounded-full object-cover border-4 border-green-200 shadow-lg"
                        />
                        {testimonials[testimonialIndex].source === 'trustpilot' && (
                          <Badge className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs">
                            Trustpilot
                          </Badge>
                        )}
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < testimonials[testimonialIndex].rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Review */}
                      <blockquote className="text-lg mb-6 text-gray-700 italic leading-relaxed">
                        &ldquo;{testimonials[testimonialIndex].review}&rdquo;
                      </blockquote>

                      {/* User Info */}
                      <div className="space-y-1">
                        <h4 className="font-semibold text-green-800 text-lg">
                          {testimonials[testimonialIndex].name}
                        </h4>
                        <p className="text-green-600">{testimonials[testimonialIndex].title}</p>
                        {testimonials[testimonialIndex].firmName && (
                          <Badge
                            variant="outline"
                            className="text-xs text-green-600 border-green-300"
                          >
                            {testimonials[testimonialIndex].firmName}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            {testimonials.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => paginate(-1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm border-green-300 hover:bg-green-50 text-green-700 shadow-lg"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => paginate(1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm border-green-300 hover:bg-green-50 text-green-700 shadow-lg"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>

          {/* Pagination Dots */}
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToTestimonial(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === testimonialIndex
                      ? 'bg-green-600 scale-125'
                      : 'bg-green-300 hover:bg-green-400'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {/* Testimonial Counter */}
          <div className="text-center mt-4">
            <span className="text-sm text-green-600">
              {testimonialIndex + 1} of {testimonials.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
