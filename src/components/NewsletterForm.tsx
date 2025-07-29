import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsletterFormProps {
  variant?: 'hero' | 'section' | 'modal';
  onSubscribed?: () => void;
}

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

const validateEmail = (email: string) => {
  // Must have @ and . after @, and at least 2 chars after .
  const re = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
  return re.test(email);
};

const NewsletterForm: React.FC<NewsletterFormProps> = ({ variant = 'section', onSubscribed }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const popupTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (popupTimeout.current) clearTimeout(popupTimeout.current);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      setShowPopup(true);
      autoHidePopup();
      return;
    }
    setStatus('loading');
    setMessage('');
    const res = await subscribeToNewsletter(email, name);
    if (res.success) {
      setStatus('success');
      setMessage('Subscribed! Welcome to our newsletter.');
      setShowPopup(true);
      setEmail('');
      setName('');
      if (onSubscribed) onSubscribed();
    } else {
      setStatus('error');
      setMessage(res.message || 'Something went wrong.');
      setShowPopup(true);
    }
    autoHidePopup();
    // Reset status after a short delay to allow form to be used again
    setTimeout(() => setStatus('idle'), 1000);
  };

  const autoHidePopup = () => {
    if (popupTimeout.current) clearTimeout(popupTimeout.current);
    popupTimeout.current = setTimeout(() => setShowPopup(false), 4000);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    if (popupTimeout.current) clearTimeout(popupTimeout.current);
  };

  // Style variants
  const inputClass =
    'px-5 py-3 bg-white/80 text-brand-text placeholder:text-brand-text/60 rounded-full outline-none border border-brand-border focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition';
  const buttonClass =
    'px-8 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-full shadow hover:from-brand-primary hover:to-brand-secondary/80 transition min-w-[110px]';
  const formClass =
    variant === 'modal'
      ? 'w-full flex flex-col gap-3'
      : 'w-full max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-3 sm:gap-2 bg-brand-card/80 rounded-full p-2 border border-brand-border';

  return (
    <>
      <form className={formClass} onSubmit={handleSubmit} autoComplete="off">
        <input
          type="text"
          placeholder="Your name (optional)"
          className={inputClass + ' flex-1'}
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={status === 'loading' || status === 'success'}
        />
        <input
          type="email"
          placeholder="Your email"
          className={inputClass + ' flex-1'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === 'loading' || status === 'success'}
          autoComplete="off"
        />
        <motion.button
          type="submit"
          whileHover={{
            boxShadow: '0 0 6px 1px var(--brand-accent), 0 0 16px 4px var(--brand-primary)',
            scale: 1.04,
          }}
          whileTap={{ scale: 0.98 }}
          className={buttonClass + ' flex-shrink-0'}
          disabled={status === 'loading' || status === 'success' || !validateEmail(email)}
        >
          {status === 'loading' ? (
            <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
          ) : status === 'success' ? (
            'Subscribed!'
          ) : (
            'Subscribe'
          )}
        </motion.button>
      </form>
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={handlePopupClose}
            style={{ cursor: 'pointer' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`bg-white/90 backdrop-blur-md text-brand-text rounded-xl shadow-2xl p-8 max-w-md w-full relative border border-brand-border flex flex-col items-center ${status === 'success' ? 'border-green-400' : 'border-pink-400'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <h3
                className={`text-xl font-bold mb-2 ${status === 'success' ? 'text-green-600' : 'text-pink-600'}`}
              >
                {status === 'success' ? 'Subscribed!' : 'Oops!'}
              </h3>
              <p className="mb-2 text-base text-brand-text/80 text-center">{message}</p>
              <p className="text-xs text-brand-text/50">Tap anywhere to close</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NewsletterForm;
