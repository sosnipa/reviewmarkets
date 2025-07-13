'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const mockSubscribe = (email: string) =>
  new Promise<{ success: boolean; message: string }>((resolve) => {
    setTimeout(() => {
      if (email.includes('@')) {
        resolve({ success: true, message: "You're subscribed!" });
      } else {
        resolve({ success: false, message: 'Please enter a valid email.' });
      }
    }, 1200);
  });

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    const res = await mockSubscribe(email);
    if (res.success) {
      setStatus('success');
      setMessage(res.message);
    } else {
      setStatus('error');
      setMessage(res.message);
    }
  };

  return (
    <section
      id="newsletter"
      className="relative w-full py-20 flex justify-center items-center bg-transparent"
    >
      {/* Gradient Glow */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="w-[90vw] max-w-4xl h-[420px] rounded-3xl bg-gradient-radial from-brand-primary/60 via-brand-secondary/40 to-transparent blur-2xl opacity-80"></div>
      </div>
      <div className="relative z-10 w-full max-w-2xl mx-auto bg-brand-bg/90 rounded-3xl shadow-2xl px-8 py-14 flex flex-col items-center border border-brand-border">
        <div className="text-xs font-semibold tracking-widest text-brand-accent mb-3 uppercase">
          Stay Connected
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-text mb-6 text-center leading-tight">
          Subscribe For The Latest In Prop Trading News And Deals
        </h2>
        <form
          className="flex w-full max-w-md mx-auto gap-2 bg-brand-card rounded-full p-1 border border-brand-border"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 px-5 py-3 bg-transparent text-brand-text placeholder:text-brand-text/60 rounded-full outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === 'loading' || status === 'success'}
          />
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-full shadow hover:from-brand-primary hover:to-brand-secondary/80 transition min-w-[110px]"
            disabled={status === 'loading' || status === 'success'}
          >
            {status === 'loading' ? (
              <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
            ) : status === 'success' ? (
              'Subscribed!'
            ) : (
              'Subscribe'
            )}
          </button>
        </form>
        <AnimatePresence>
          {status === 'error' && message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-pink-400 mt-4"
            >
              {message}
            </motion.div>
          )}
          {status === 'success' && message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-green-400 mt-4"
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default NewsletterSection;
