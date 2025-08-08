'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TestimonialFormProps {
  onSuccess?: () => void;
  className?: string;
}

const TestimonialForm: React.FC<TestimonialFormProps> = ({ onSuccess, className = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    review: '',
    rating: 5,
    email: '',
    firmName: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: 'success',
          text: 'Thank you! Your testimonial has been submitted and is pending approval.',
        });
        setFormData({
          name: '',
          title: '',
          review: '',
          rating: 5,
          email: '',
          firmName: '',
        });
        onSuccess?.();
      } else {
        setMessage({
          type: 'error',
          text: data.error || 'Failed to submit testimonial. Please try again.',
        });
      }
    } catch {
      setMessage({
        type: 'error',
        text: 'An error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Share Your Experience</CardTitle>
          <CardDescription className="text-center">
            Help other traders by sharing your experience with prop firms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Your Name *
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Your Title/Role *
                </label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="e.g., Day Trader, Forex Trader"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="firmName" className="text-sm font-medium">
                  Prop Firm (Optional)
                </label>
                <Input
                  id="firmName"
                  value={formData.firmName}
                  onChange={(e) => handleChange('firmName', e.target.value)}
                  placeholder="e.g., FTMO, The5ers"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="rating" className="text-sm font-medium">
                Rating *
              </label>
              <Select
                value={formData.rating.toString()}
                onValueChange={(value) => handleChange('rating', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <SelectItem key={rating} value={rating.toString()}>
                      <div className="flex items-center gap-2">
                        <span>{rating}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${
                                i < rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="review" className="text-sm font-medium">
                Your Review *
              </label>
              <Textarea
                id="review"
                value={formData.review}
                onChange={(e) => handleChange('review', e.target.value)}
                placeholder="Share your experience with prop firms, trading platforms, or our comparison service..."
                rows={4}
                required
                className="resize-none"
              />
              <p className="text-xs text-gray-500">
                Minimum 50 characters. Your review will be reviewed before publication.
              </p>
            </div>

            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-md ${
                  message.type === 'success'
                    ? 'bg-green-50 border border-green-200 text-green-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}
              >
                {message.text}
              </motion.div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting || formData.review.length < 50}
              className="w-full"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TestimonialForm;
