'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Firm {
  id: number;
  name: string;
  country: string;
  rating: number;
  reviews: number;
  years: number;
  assets: string[];
  platforms: string[];
  maxAllocation: string;
  promo: string;
  description?: string;
  website?: string;
}

interface Testimonial {
  id: number;
  name: string;
  title: string;
  review: string;
  avatar: string;
  rating: number;
  approved: boolean;
  createdAt: string;
}

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'replied';
}

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'firms' | 'testimonials' | 'contacts' | 'newsletter' | 'templates'
  >('dashboard');
  const [firms, setFirms] = useState<Firm[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [newsletterStats, setNewsletterStats] = useState<{ subscribers: number }>({
    subscribers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch all data in parallel
      const [firmsRes, testimonialsRes, contactsRes, newsletterRes] = await Promise.all([
        fetch('/api/firms'),
        fetch('/api/testimonials'),
        fetch('/api/contact'),
        fetch('/api/newsletter'),
      ]);

      const firmsData = await firmsRes.json();
      const testimonialsData = await testimonialsRes.json();
      const contactsData = await contactsRes.json();
      const newsletterData = await newsletterRes.json();

      setFirms(firmsData.firms);
      setTestimonials(testimonialsData.testimonials);
      setContacts(contactsData.messages);
      setNewsletterStats(newsletterData);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveTestimonial = async (id: number) => {
    // In a real app, this would call an API to approve the testimonial
    console.log('Approving testimonial:', id);
  };

  const handleMarkContactRead = async (id: number) => {
    // In a real app, this would call an API to mark the contact as read
    console.log('Marking contact as read:', id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-brand-primary">Admin Panel</h1>
          <div className="flex space-x-3">
            <a
              href="/admin/change-password"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Change Password
            </a>
            <button
              onClick={async () => {
                await fetch('/api/admin/logout', { method: 'POST' });
                window.location.href = '/admin/login';
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { key: 'dashboard', label: 'Dashboard', count: 0 },
            { key: 'firms', label: 'Firms', count: firms.length },
            { key: 'testimonials', label: 'Testimonials', count: testimonials.length },
            { key: 'contacts', label: 'Contacts', count: contacts.length },
            { key: 'newsletter', label: 'Newsletter', count: newsletterStats.subscribers },
            { key: 'templates', label: 'Templates', count: 0 },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() =>
                setActiveTab(
                  tab.key as
                    | 'dashboard'
                    | 'firms'
                    | 'testimonials'
                    | 'contacts'
                    | 'newsletter'
                    | 'templates'
                )
              }
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === tab.key
                  ? 'bg-brand-primary text-white'
                  : 'bg-brand-card text-brand-text hover:bg-brand-primary/10'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-brand-card rounded-xl shadow-lg p-6 border border-brand-border"
        >
          {activeTab === 'firms' && (
            <div>
              <h2 className="text-2xl font-bold text-brand-primary mb-4">Prop Firms</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-brand-border">
                      <th className="p-3">Name</th>
                      <th className="p-3">Country</th>
                      <th className="p-3">Rating</th>
                      <th className="p-3">Max Allocation</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {firms.map((firm) => (
                      <tr key={firm.id} className="border-b border-brand-border/50">
                        <td className="p-3 font-medium">{firm.name}</td>
                        <td className="p-3">{firm.country}</td>
                        <td className="p-3">
                          {firm.rating}/5 ({firm.reviews} reviews)
                        </td>
                        <td className="p-3">{firm.maxAllocation}</td>
                        <td className="p-3">
                          <button className="text-brand-primary hover:text-brand-accent">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div>
              <h2 className="text-2xl font-bold text-brand-primary mb-4">Testimonials</h2>
              <div className="space-y-4">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="border border-brand-border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-brand-primary">{testimonial.name}</h3>
                        <p className="text-sm text-brand-text/60">{testimonial.title}</p>
                      </div>
                      <div className="flex gap-2">
                        {!testimonial.approved && (
                          <button
                            onClick={() => handleApproveTestimonial(testimonial.id)}
                            className="px-3 py-1 bg-green-500 text-white rounded text-sm"
                          >
                            Approve
                          </button>
                        )}
                        <button className="text-brand-primary hover:text-brand-accent text-sm">
                          Edit
                        </button>
                      </div>
                    </div>
                    <p className="text-brand-text/80">{testimonial.review}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs text-brand-text/60">
                        Rating: {testimonial.rating}/5
                      </span>
                      <span className="text-xs text-brand-text/60">
                        {new Date(testimonial.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div>
              <h2 className="text-2xl font-bold text-brand-primary mb-4">Contact Messages</h2>
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div key={contact.id} className="border border-brand-border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-brand-primary">{contact.name}</h3>
                        <p className="text-sm text-brand-text/60">{contact.email}</p>
                      </div>
                      <div className="flex gap-2">
                        {contact.status === 'new' && (
                          <button
                            onClick={() => handleMarkContactRead(contact.id)}
                            className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                          >
                            Mark Read
                          </button>
                        )}
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            contact.status === 'new'
                              ? 'bg-red-100 text-red-700'
                              : contact.status === 'read'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {contact.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-brand-text/80">{contact.message}</p>
                    <p className="text-xs text-brand-text/60 mt-2">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-2xl font-bold text-brand-primary mb-4">Admin Dashboard</h2>
              <div className="text-center py-8">
                <div className="text-4xl font-bold text-brand-primary mb-2">
                  Welcome to Admin Panel
                </div>
                <p className="text-brand-text/60">Manage your website and email campaigns</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-brand-bg/50 rounded-lg p-4">
                  <h3 className="font-semibold text-brand-primary mb-2">Enhanced Dashboard</h3>
                  <p className="text-sm text-brand-text/70 mb-4">
                    Access the full admin dashboard with advanced features:
                  </p>
                  <ul className="text-sm text-brand-text/70 space-y-1 mb-4">
                    <li>• Email campaign tracking</li>
                    <li>• Subscriber analytics</li>
                    <li>• Email templates management</li>
                    <li>• Bulk email scheduling</li>
                  </ul>
                  <a
                    href="/admin/dashboard"
                    className="inline-block bg-brand-primary text-white px-6 py-2 rounded-lg hover:bg-brand-accent transition-colors"
                  >
                    Go to Dashboard
                  </a>
                </div>
                <div className="bg-brand-bg/50 rounded-lg p-4">
                  <h3 className="font-semibold text-brand-primary mb-2">Email Templates</h3>
                  <p className="text-sm text-brand-text/70 mb-4">
                    Create and manage email templates:
                  </p>
                  <ul className="text-sm text-brand-text/70 space-y-1 mb-4">
                    <li>• Welcome emails</li>
                    <li>• Newsletter templates</li>
                    <li>• Promotional campaigns</li>
                    <li>• Support emails</li>
                  </ul>
                  <a
                    href="/admin/templates"
                    className="inline-block bg-brand-primary text-white px-6 py-2 rounded-lg hover:bg-brand-accent transition-colors"
                  >
                    Manage Templates
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'newsletter' && (
            <div>
              <h2 className="text-2xl font-bold text-brand-primary mb-4">Newsletter Subscribers</h2>
              <div className="text-center py-8">
                <div className="text-4xl font-bold text-brand-primary mb-2">
                  {newsletterStats.subscribers}
                </div>
                <p className="text-brand-text/60">Total Subscribers</p>
              </div>
              <div className="bg-brand-bg/50 rounded-lg p-4">
                <h3 className="font-semibold text-brand-primary mb-2">Newsletter Management</h3>
                <p className="text-sm text-brand-text/70 mb-4">
                  Advanced newsletter management features are now available:
                </p>
                <ul className="text-sm text-brand-text/70 space-y-1 mb-4">
                  <li>• View individual subscriber emails</li>
                  <li>• Send bulk emails to subscribers</li>
                  <li>• Manage subscriber status (active/inactive)</li>
                  <li>• Track email campaigns</li>
                </ul>
                <a
                  href="/admin/newsletter"
                  className="inline-block bg-brand-primary text-white px-6 py-2 rounded-lg hover:bg-brand-accent transition-colors"
                >
                  Go to Newsletter Management
                </a>
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div>
              <h2 className="text-2xl font-bold text-brand-primary mb-4">Email Templates</h2>
              <div className="text-center py-8">
                <div className="text-4xl font-bold text-brand-primary mb-2">
                  Template Management
                </div>
                <p className="text-brand-text/60">Create and manage email templates</p>
              </div>
              <div className="bg-brand-bg/50 rounded-lg p-4">
                <h3 className="font-semibold text-brand-primary mb-2">Template Features</h3>
                <p className="text-sm text-brand-text/70 mb-4">
                  Full template management system available:
                </p>
                <ul className="text-sm text-brand-text/70 space-y-1 mb-4">
                  <li>• Create custom email templates</li>
                  <li>• Edit existing templates</li>
                  <li>• Template categories (welcome, newsletter, promotional, support)</li>
                  <li>• HTML editor with preview</li>
                  <li>• Template activation/deactivation</li>
                </ul>
                <a
                  href="/admin/templates"
                  className="inline-block bg-brand-primary text-white px-6 py-2 rounded-lg hover:bg-brand-accent transition-colors"
                >
                  Manage Templates
                </a>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel;
