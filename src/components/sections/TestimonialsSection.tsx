'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Star,
  Quote,
  User,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  title: string;
  review: string;
  avatar: string;
  rating: number;
  isApproved: boolean;
  source: string;
  firmName?: string;
  createdAt: string;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials');
        const data = await response.json();
        // The API returns an object with a testimonials property
        const testimonialsArray = data.testimonials || data;
        const approvedTestimonials = testimonialsArray.filter((t: Testimonial) => t.isApproved);
        setTestimonials(approvedTestimonials);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setTestimonials([]);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length > 1 && !isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [testimonials.length, isPaused]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const togglePlayPause = () => {
    setIsPaused(!isPaused);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="w-full py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/20">
            Testimonials
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">What Traders Say</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real reviews from traders who&apos;ve used our platform to find their perfect prop
            trading firm.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-xl">
            <CardContent className="p-8">
              {testimonials[currentIndex] && (
                <div className="text-center">
                  {/* Quote */}
                  <div className="mb-8">
                    <Quote className="w-8 h-8 text-primary mx-auto mb-4 opacity-50" />
                    <blockquote className="text-lg text-muted-foreground italic leading-relaxed">
                      &quot;{testimonials[currentIndex]?.review}&quot;
                    </blockquote>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                      {testimonials[currentIndex]?.avatar ? (
                        <img
                          src={testimonials[currentIndex]?.avatar}
                          alt={testimonials[currentIndex]?.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-6 h-6 text-primary" />
                      )}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-foreground">
                        {testimonials[currentIndex]?.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonials[currentIndex]?.title}
                      </div>
                      {testimonials[currentIndex]?.firmName && (
                        <div className="text-xs text-muted-foreground">
                          {testimonials[currentIndex]?.firmName}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="flex gap-1">
                      {renderStars(testimonials[currentIndex]?.rating || 0)}
                    </div>
                    {testimonials[currentIndex]?.source === 'trustpilot' && (
                      <Badge variant="outline" className="ml-2 border-orange-200 text-orange-700">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        Trustpilot
                      </Badge>
                    )}
                  </div>

                  {/* Navigation */}
                  {testimonials.length > 1 && (
                    <div className="flex items-center justify-center gap-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={prevTestimonial}
                        className="rounded-full"
                        aria-label="Previous testimonial"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={togglePlayPause}
                        className="rounded-full"
                        aria-label={isPaused ? 'Play' : 'Pause'}
                      >
                        {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={nextTestimonial}
                        className="rounded-full"
                        aria-label="Next testimonial"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  )}

                  {/* Dots */}
                  {testimonials.length > 1 && (
                    <div className="flex justify-center gap-2 mt-6">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                          }`}
                          aria-label={`Go to testimonial ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button asChild>
            <a href="/testimonials" className="gap-2">
              View All Reviews
              <MessageSquare className="w-4 h-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
