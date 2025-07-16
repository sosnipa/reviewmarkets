'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Twitter, Send, MessageCircle } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage(data.message);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setMessage(data.message);
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="w-full py-16 bg-brand-bg text-brand-text">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-brand-card rounded-2xl shadow-lg p-8 flex flex-col gap-4 border border-brand-border"
        >
          <h2 className="text-2xl font-bold mb-2 text-brand-primary">Contact Us</h2>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="px-4 py-2 rounded-full border border-brand-border bg-brand-bg text-brand-text focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition"
            required
            disabled={status === 'loading'}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="px-4 py-2 rounded-full border border-brand-border bg-brand-bg text-brand-text focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition"
            required
            disabled={status === 'loading'}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="px-4 py-2 rounded-2xl border border-brand-border bg-brand-bg text-brand-text focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition"
            required
            disabled={status === 'loading'}
          />
          {message && (
            <div className={`text-sm ${status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </div>
          )}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="mt-2 px-6 py-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-full font-semibold shadow hover:from-brand-primary hover:to-brand-secondary/80 transition focus:ring-2 focus:ring-brand-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
        {/* Contact Info & Map */}
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <h3 className="font-bold text-lg mb-1 text-brand-primary">Contact Information</h3>
            <div className="flex items-center gap-2 text-brand-text/70">
              <Mail className="h-5 w-5 text-brand-accent" /> support@reviewmarkets.com
            </div>
            <div className="flex items-center gap-2 text-brand-text/70">
              <Phone className="h-5 w-5 text-brand-accent" /> +1 (555) 123-4567
            </div>
            <div className="flex items-center gap-2 text-brand-text/70">
              <MapPin className="h-5 w-5 text-brand-accent" /> 123 Market St, New York, NY
            </div>
          </div>
          <div className="flex gap-4 mt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-brand-text/80 hover:text-brand-accent transition"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="text-brand-text/80 hover:text-brand-accent transition"
            >
              <Send className="h-6 w-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-brand-text/80 hover:text-brand-accent transition"
            >
              <Twitter className="h-6 w-6" />
            </a>
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-brand-text/80 hover:text-brand-accent transition"
            >
              <MessageCircle className="h-6 w-6" />
            </a>
          </div>
          <div className="mt-6">
            <div className="w-full h-40 rounded-2xl bg-brand-bg flex items-center justify-center text-brand-text/50 text-sm border border-brand-border">
              [Map Placeholder]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
