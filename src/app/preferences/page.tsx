'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, Settings, CheckCircle, XCircle, Bell, Calendar, Shield } from 'lucide-react';

interface SubscriptionPreferences {
  email: string;
  isActive: boolean;
  subscribedAt: string;
  source: string;
  emailFrequency: 'weekly' | 'monthly' | 'promotional-only';
  categories: {
    newsletter: boolean;
    promotional: boolean;
    updates: boolean;
    deals: boolean;
  };
}

const PreferencesContent: React.FC = () => {
  const searchParams = useSearchParams();
  const [preferences, setPreferences] = useState<SubscriptionPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    if (email) {
      fetchPreferences(email, token || undefined);
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  const fetchPreferences = async (email: string, token?: string) => {
    try {
      const response = await fetch(
        `/api/preferences?email=${encodeURIComponent(email)}${token ? `&token=${token}` : ''}`
      );

      if (response.ok) {
        const data = await response.json();
        setPreferences(data.preferences);
      } else {
        setMessage('Unable to load preferences. Please check your email link.');
      }
    } catch {
      setMessage('An error occurred while loading preferences.');
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (updates: Partial<SubscriptionPreferences>) => {
    if (!preferences) return;

    setStatus('loading');

    try {
      const response = await fetch('/api/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: preferences.email,
          ...updates,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setPreferences((prev) => (prev ? { ...prev, ...updates } : null));
        setStatus('success');
        setMessage('Preferences updated successfully!');

        // Clear success message after 3 seconds
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 3000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to update preferences.');
      }
    } catch {
      setStatus('error');
      setMessage('An error occurred while updating preferences.');
    }
  };

  const handleUnsubscribe = async () => {
    if (!preferences) return;

    setStatus('loading');

    try {
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: preferences.email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setPreferences((prev) => (prev ? { ...prev, isActive: false } : null));
        setStatus('success');
        setMessage('Successfully unsubscribed from our newsletter.');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to unsubscribe.');
      }
    } catch {
      setStatus('error');
      setMessage('An error occurred while unsubscribing.');
    }
  };

  const handleResubscribe = async () => {
    if (!preferences) return;

    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: preferences.email,
          name: '',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setPreferences((prev) => (prev ? { ...prev, isActive: true } : null));
        setStatus('success');
        setMessage('Successfully resubscribed to our newsletter!');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to resubscribe.');
      }
    } catch {
      setStatus('error');
      setMessage('An error occurred while resubscribing.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!preferences) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Link</h1>
          <p className="text-gray-600 mb-6">{message}</p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Settings className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Preferences</h1>
          <p className="text-gray-600">
            Manage your subscription preferences for {preferences.email}
          </p>
        </motion.div>

        {/* Status Message */}
        {status !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
              status === 'success'
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}
          >
            {status === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <XCircle className="w-5 h-5" />
            )}
            <span>{message}</span>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
        >
          {/* Subscription Status */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Subscription Status
            </h2>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">
                  {preferences.isActive ? 'Active' : 'Inactive'}
                </p>
                <p className="text-sm text-gray-600">
                  Subscribed since {new Date(preferences.subscribedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {preferences.isActive ? (
                  <button
                    onClick={handleUnsubscribe}
                    disabled={status === 'loading'}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    Unsubscribe
                  </button>
                ) : (
                  <button
                    onClick={handleResubscribe}
                    disabled={status === 'loading'}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    Resubscribe
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Email Frequency */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Email Frequency
            </h2>
            <div className="space-y-3">
              {[
                {
                  value: 'weekly',
                  label: 'Weekly Newsletter',
                  description: 'Get our latest updates every week',
                },
                {
                  value: 'monthly',
                  label: 'Monthly Digest',
                  description: 'Monthly summary of the best content',
                },
                {
                  value: 'promotional-only',
                  label: 'Promotional Only',
                  description: 'Only receive special offers and deals',
                },
              ].map((option) => (
                <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="frequency"
                    value={option.value}
                    checked={preferences.emailFrequency === option.value}
                    onChange={() =>
                      updatePreferences({
                        emailFrequency: option.value as 'weekly' | 'monthly' | 'promotional-only',
                      })
                    }
                    className="mt-1"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{option.label}</p>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Email Categories */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Email Categories
            </h2>
            <div className="space-y-4">
              {Object.entries(preferences.categories).map(([category, enabled]) => (
                <div
                  key={category}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 capitalize">
                      {category.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-sm text-gray-600">
                      {category === 'newsletter' && 'Weekly newsletter with prop firm updates'}
                      {category === 'promotional' && 'Special offers and promotional content'}
                      {category === 'updates' && 'Important updates about our service'}
                      {category === 'deals' && 'Exclusive deals and discounts'}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      updatePreferences({
                        categories: {
                          ...preferences.categories,
                          [category]: !enabled,
                        },
                      })
                    }
                    disabled={status === 'loading'}
                    title={`${enabled ? 'Disable' : 'Enable'} ${category} emails`}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      enabled ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Privacy & Security
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Your privacy is important to us.</strong> We never share your email address
                with third parties. You can unsubscribe at any time, and we&apos;ll immediately stop
                sending you emails.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <Link href="/" className="text-blue-600 hover:text-blue-500 font-medium">
              ← Back to Home
            </Link>
            <div className="text-sm text-gray-500">
              Need help? Contact{' '}
              <a
                href="mailto:support@reviewmarket.org"
                className="text-blue-600 hover:text-blue-500"
              >
                support@reviewmarket.org
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const PreferencesPage: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <PreferencesContent />
    </Suspense>
  );
};

export default PreferencesPage;
