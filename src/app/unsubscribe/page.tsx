'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const UnsubscribePage: React.FC = () => {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'not-found'>(
    'idle'
  );
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check if email is provided in URL params
    const emailParam = searchParams.get('email');
    const tokenParam = searchParams.get('token');

    if (emailParam && tokenParam) {
      // Validate token and auto-unsubscribe
      handleUnsubscribe(emailParam, tokenParam);
    } else if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleUnsubscribe = async (emailToUnsubscribe: string, token?: string) => {
    setStatus('loading');

    try {
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailToUnsubscribe,
          token,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Successfully unsubscribed from our newsletter.');
      } else {
        if (response.status === 404) {
          setStatus('not-found');
          setMessage('Email address not found in our subscriber list.');
        } else {
          setStatus('error');
          setMessage(data.error || 'Failed to unsubscribe. Please try again.');
        }
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      handleUnsubscribe(email);
    }
  };

  const handleResubscribe = async () => {
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: '',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Successfully resubscribed to our newsletter!');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to resubscribe. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('An error occurred. Please try again.');
    }
  };

  const getStatusContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Processing your request...</p>
          </div>
        );

      case 'success':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Unsubscribed Successfully</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="space-y-3">
              <p className="text-sm text-gray-500">
                You can resubscribe anytime by entering your email below.
              </p>
              <button
                onClick={handleResubscribe}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Resubscribe
              </button>
            </div>
          </motion.div>
        );

      case 'error':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <button
              onClick={() => setStatus('idle')}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        );

      case 'not-found':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Not Found</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <p className="text-sm text-gray-500">
              This email address is not in our subscriber list.
            </p>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Mail className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Unsubscribe</h1>
          <p className="text-gray-600">
            We're sorry to see you go. You can unsubscribe from our newsletter below.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
        >
          {status !== 'idle' ? (
            getStatusContent()
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <div className="flex">
                  <AlertCircle className="w-5 h-5 text-yellow-400 mr-2 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium">Before you go...</p>
                    <p className="mt-1">
                      You'll no longer receive our latest prop firm reviews, exclusive deals, and
                      market insights.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
              >
                Unsubscribe
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Changed your mind?{' '}
                  <Link href="/" className="text-blue-600 hover:text-blue-500 font-medium">
                    Stay subscribed
                  </Link>
                </p>
              </div>
            </form>
          )}
        </motion.div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            Having trouble? Contact us at{' '}
            <a href="mailto:support@reviewmarket.org" className="text-blue-600 hover:text-blue-500">
              support@reviewmarket.org
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnsubscribePage;
