'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Star, User, Briefcase, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface PropFirm {
  id: number;
  name: string;
}

export default function TestimonialForm() {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    review: '',
    rating: 0,
    propFirm: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [propFirms, setPropFirms] = useState<PropFirm[]>([]);
  const [hoveredRating, setHoveredRating] = useState(0);

  // Fetch prop firms on component mount
  useEffect(() => {
    const fetchPropFirms = async () => {
      try {
        const response = await fetch('/api/firms');
        const data = await response.json();
        // Filter out firms with null IDs and ensure we have valid data
        const validFirms = (data.firms || []).filter(
          (firm: PropFirm) => firm && firm.id && firm.name
        );

        // Remove duplicates based on firm name, keeping the first occurrence
        const uniqueFirms = validFirms.filter(
          (firm: PropFirm, index: number, self: PropFirm[]) =>
            index === self.findIndex((f: PropFirm) => f.name === firm.name)
        );

        setPropFirms(uniqueFirms);
      } catch (error) {
        console.error('Error fetching prop firms:', error);
        setPropFirms([]);
      }
    };
    fetchPropFirms();
  }, []);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.title || !formData.review || formData.rating === 0) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          title: '',
          review: '',
          rating: 0,
          propFirm: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      const isFilled = starValue <= (interactive ? hoveredRating || rating : rating);

      return (
        <button
          key={i}
          type="button"
          onClick={() => interactive && handleRatingChange(starValue)}
          onMouseEnter={() => interactive && setHoveredRating(starValue)}
          onMouseLeave={() => interactive && setHoveredRating(0)}
          className={`transition-all duration-200 ${
            interactive ? 'hover:scale-110 cursor-pointer' : ''
          }`}
          disabled={!interactive}
          aria-label={`Rate ${starValue} star${starValue !== 1 ? 's' : ''}`}
          title={`Rate ${starValue} star${starValue !== 1 ? 's' : ''}`}
        >
          <Star
            className={`w-6 h-6 ${isFilled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        </button>
      );
    });
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4 bg-green-50 text-green-700 border-green-200">
              Share Your Experience
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Write a<span className="block text-green-600">Testimonial</span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Help other traders by sharing your prop trading experience. Your review will help
              others make informed decisions.
            </p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900">
                  Share Your Review
                </CardTitle>
                <p className="text-slate-600">
                  Tell us about your experience with prop trading firms
                </p>
              </CardHeader>

              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Title */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                        required
                        className="border-slate-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        Job Title *
                      </label>
                      <Input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="e.g., Forex Trader, Day Trader"
                        required
                        className="border-slate-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-700">Overall Rating *</label>
                    <div className="flex items-center gap-2">
                      {renderStars(formData.rating, true)}
                      <span className="text-sm text-slate-600 ml-2">
                        {formData.rating > 0 ? `${formData.rating}/5 stars` : 'Click to rate'}
                      </span>
                    </div>
                  </div>

                  {/* Prop Firm Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Prop Trading Firm (Optional)
                    </label>
                    <Select
                      value={formData.propFirm}
                      onValueChange={(value) => handleInputChange('propFirm', value)}
                    >
                      <SelectTrigger className="border-slate-200 focus:border-green-500 focus:ring-green-500">
                        <SelectValue placeholder="Select a prop firm (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        {propFirms.map((firm, index) => (
                          <SelectItem key={firm.id || `firm-${index}`} value={firm.name}>
                            {firm.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Review Text */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Your Review *</label>
                    <Textarea
                      value={formData.review}
                      onChange={(e) => handleInputChange('review', e.target.value)}
                      placeholder="Share your experience with prop trading. What did you like? What could be improved? (Minimum 50 characters)"
                      required
                      minLength={50}
                      rows={6}
                      className="border-slate-200 focus:border-green-500 focus:ring-green-500 resize-none"
                    />
                    <div className="flex justify-between items-center text-xs text-slate-500">
                      <span>Minimum 50 characters</span>
                      <span>{formData.review.length}/500</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Submit Button */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600">* Required fields</div>
                    <Button
                      type="submit"
                      disabled={isSubmitting || formData.rating === 0}
                      className="bg-green-600 hover:bg-green-700 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Submit Review
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-800">
                        Thank you! Your review has been submitted and will be reviewed by our team.
                      </span>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg"
                    >
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <span className="text-red-800">
                        Please fill in all required fields and ensure your review is at least 50
                        characters.
                      </span>
                    </motion.div>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <div className="bg-slate-50 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 mb-2">Review Guidelines</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-600">
                <div>
                  <Badge variant="outline" className="mb-2">
                    Be Honest
                  </Badge>
                  <p>Share your genuine experience, both positive and negative aspects.</p>
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">
                    Be Specific
                  </Badge>
                  <p>Include details about features, support, and overall experience.</p>
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">
                    Be Helpful
                  </Badge>
                  <p>Your review will help other traders make informed decisions.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
