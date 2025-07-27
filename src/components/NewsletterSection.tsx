'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const subscribeToNewsletter = async (email: string, name?: string) => {
  try {
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name }),
    });

    const data = await response.json();
    return data;
  } catch {
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-popup after 90 seconds
  useEffect(() => {
    if (!subscribed) {
      timerRef.current = setTimeout(() => setShowModal(true), 90000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [subscribed]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    const res = await subscribeToNewsletter(email, name);
    if (res.success) {
      setStatus('success');
      setMessage(res.message);
      setSubscribed(true);
      setShowModal(false);
    } else {
      setStatus('error');
      setMessage(res.message);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <section
      id="newsletter"
      className="relative w-full py-20 flex justify-center items-center bg-transparent overflow-hidden"
    >
      {/* Section Radial Gradient Glow */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
        <div className="w-[180vw] h-[120vh] max-w-none rounded-full bg-gradient-radial from-brand-primary/50 via-brand-secondary/30 to-transparent blur-[120px] opacity-100"></div>
      </div>
      {/* Card */}
      <div className="relative z-10 w-full max-w-2xl mx-auto bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl px-8 py-14 flex flex-col items-center border border-brand-border">
        <div className="text-xs font-semibold tracking-widest text-brand-accent mb-3 uppercase">
          Stay Connected
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-text mb-6 text-center leading-tight">
          Subscribe For The Latest In Prop Trading News And Deals
        </h2>
        <form className="flex flex-col w-full max-w-md mx-auto gap-3" onSubmit={handleSubmit}>
          <div className="flex gap-2 bg-brand-card/80 rounded-full p-1 border border-brand-border">
            <input
              type="text"
              placeholder="Your name (optional)"
              className="flex-1 px-5 py-3 bg-transparent text-brand-text placeholder:text-brand-text/60 rounded-full outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={status === 'loading' || status === 'success'}
            />
          </div>
          <div className="flex gap-2 bg-brand-card/80 rounded-full p-1 border border-brand-border">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-5 py-3 bg-transparent text-brand-text placeholder:text-brand-text/60 rounded-full outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading' || status === 'success'}
            />
            <motion.button
              type="submit"
              whileHover={{
                boxShadow: '0 0 6px 1px var(--brand-accent), 0 0 16px 4px var(--brand-primary)',
                scale: 1.04,
              }}
              whileTap={{ scale: 0.98 }}
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
            </motion.button>
          </div>
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
      {/* Modal Popup */}
      <AnimatePresence>
        {showModal && !subscribed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/90 backdrop-blur-md text-brand-text rounded-xl shadow-2xl p-8 max-w-md w-full relative border border-brand-border"
            >
              <button
                aria-label="Close newsletter popup"
                onClick={handleModalClose}
                className="absolute top-3 right-3 text-xl text-brand-text/40 hover:text-brand-text/80"
              >
                &times;
              </button>
              <h3 className="text-xl font-bold mb-2 text-brand-primary">Join Our Newsletter</h3>
              <p className="mb-4 text-sm text-brand-text/70">
                Get the latest prop firm news, reviews, and exclusive offers.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  className="px-4 py-2 rounded-full border border-brand-border bg-brand-bg text-brand-text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={status === 'loading' || status === 'success'}
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-full border border-brand-border bg-brand-bg text-brand-text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === 'loading' || status === 'success'}
                />
                <motion.button
                  type="submit"
                  whileHover={{
                    boxShadow: '0 0 6px 1px var(--brand-accent), 0 0 16px 4px var(--brand-primary)',
                    scale: 1.04,
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-full shadow hover:from-brand-primary hover:to-brand-secondary/80 transition min-w-[110px]"
                  disabled={status === 'loading' || status === 'success'}
                >
                  {status === 'loading' ? (
                    <span className="animate-spin inline-block w-5 h-5 border-2 border-brand-primary border-t-transparent rounded-full"></span>
                  ) : status === 'success' ? (
                    'Subscribed!'
                  ) : (
                    'Subscribe'
                  )}
                </motion.button>
              </form>
              <AnimatePresence>
                {status === 'error' && message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="text-pink-400 mt-3"
                  >
                    {message}
                  </motion.div>
                )}
                {status === 'success' && message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="text-green-400 mt-3"
                  >
                    {message}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default NewsletterSection;
