'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Comprehensive list of countries
const COUNTRIES = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Democratic Republic of the Congo',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Ivory Coast',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Korea',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
].sort();

// Comprehensive list of trading assets
const ASSETS = [
  'Forex (FX)',
  'Stocks',
  'Indices',
  'Commodities',
  'Cryptocurrency',
  'Bonds',
  'Options',
  'Futures',
  'CFDs',
  'EUR/USD',
  'GBP/USD',
  'USD/JPY',
  'USD/CHF',
  'AUD/USD',
  'USD/CAD',
  'NZD/USD',
  'EUR/GBP',
  'EUR/JPY',
  'GBP/JPY',
  'AUD/JPY',
  'CAD/JPY',
  'NZD/JPY',
  'EUR/AUD',
  'GBP/AUD',
  'AUD/CAD',
  'NZD/CAD',
  'AUD/NZD',
  'Gold (XAU/USD)',
  'Silver (XAG/USD)',
  'Platinum',
  'Palladium',
  'Copper',
  'Oil (WTI)',
  'Oil (Brent)',
  'Natural Gas',
  'S&P 500',
  'NASDAQ',
  'Dow Jones',
  'FTSE 100',
  'DAX',
  'CAC 40',
  'Nikkei 225',
  'Bitcoin (BTC)',
  'Ethereum (ETH)',
  'Litecoin (LTC)',
  'Ripple (XRP)',
  'Cardano (ADA)',
  'Polkadot (DOT)',
  'Apple (AAPL)',
  'Microsoft (MSFT)',
  'Google (GOOGL)',
  'Amazon (AMZN)',
  'Tesla (TSLA)',
  'Meta (META)',
  'US Treasury Bonds',
  'Corporate Bonds',
  'Municipal Bonds',
  'Agricultural Commodities',
  'Energy Commodities',
  'Metals',
  'Soft Commodities',
  'Volatility Index (VIX)',
  'Real Estate',
  'REITs',
].sort();

// Comprehensive list of trading platforms
const PLATFORMS = [
  'MetaTrader 4 (MT4)',
  'MetaTrader 5 (MT5)',
  'cTrader',
  'NinjaTrader',
  'TradingView',
  'ThinkorSwim',
  'Interactive Brokers',
  'eToro',
  'Plus500',
  'IG Trading',
  'AvaTrade',
  'FXCM',
  'OANDA',
  'Pepperstone',
  'IC Markets',
  'Saxo Bank',
  'Swissquote',
  'Dukascopy',
  'FXPro',
  'XM',
  'FBS',
  'Exness',
  'HotForex',
  'OctaFX',
  'RoboForex',
  'Alpari',
  'InstaForex',
  'ForexTime',
  'FXOpen',
  'Tickmill',
  'Vantage FX',
  'AxiTrader',
  'Vantage Markets',
  'FP Markets',
  'ICM Capital',
  'Darwinex',
  'TradersWay',
  'LiteForex',
  'NordFX',
  'Forex4you',
  'MultiCharts',
  'Sierra Chart',
  'TradeStation',
  'MetaStock',
  'Amibroker',
  'ProRealTime',
  'TradingView Pro',
  'CQG',
  'Bloomberg Terminal',
  'Reuters Eikon',
  'WebTrader',
  'Mobile Trading',
  'Desktop Platform',
  'Web Platform',
  'API Trading',
].sort();

interface Firm {
  id?: number;
  name: string;
  logo?: string;
  country: string;
  rating: number;
  reviews: number;
  years: number;
  assets: string[];
  platforms: string[];
  maxAllocation: string;
  promo?: string;
  description?: string;
  website?: string;
}

interface Testimonial {
  id: string;
  name: string;
  title: string;
  review: string;
  avatar: string;
  rating: number;
  isApproved: boolean;
  createdAt: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  isReplied: boolean;
  reply?: string;
  repliedAt?: string;
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
  const [testimonialStats, setTestimonialStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
  });
  const [testimonialFilter, setTestimonialFilter] = useState<'all' | 'approved' | 'pending'>('all');
  const [testimonialSearch, setTestimonialSearch] = useState('');
  const [replyModal, setReplyModal] = useState<{ isOpen: boolean; contact: ContactMessage | null }>(
    {
      isOpen: false,
      contact: null,
    }
  );
  const [replyMessage, setReplyMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddFirm, setShowAddFirm] = useState(false);
  const [editingFirm, setEditingFirm] = useState<Firm | null>(null);
  const [formData, setFormData] = useState<Firm>({
    name: '',
    logo: '',
    country: '',
    rating: 0,
    reviews: 0,
    years: 0,
    assets: [],
    platforms: [],
    maxAllocation: '',
    promo: '',
    description: '',
    website: '',
  });

  // Searchable dropdown state
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(COUNTRIES);

  // Assets dropdown state
  const [showAssetsDropdown, setShowAssetsDropdown] = useState(false);
  const [assetsSearch, setAssetsSearch] = useState('');
  const [filteredAssets, setFilteredAssets] = useState(ASSETS);

  // Platforms dropdown state
  const [showPlatformsDropdown, setShowPlatformsDropdown] = useState(false);
  const [platformsSearch, setPlatformsSearch] = useState('');
  const [filteredPlatforms, setFilteredPlatforms] = useState(PLATFORMS);

  // Filter countries based on search
  useEffect(() => {
    const filtered = COUNTRIES.filter((country) =>
      country.toLowerCase().includes(countrySearch.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [countrySearch]);

  // Filter assets based on search
  useEffect(() => {
    const filtered = ASSETS.filter((asset) =>
      asset.toLowerCase().includes(assetsSearch.toLowerCase())
    );
    setFilteredAssets(filtered);
  }, [assetsSearch]);

  // Filter platforms based on search
  useEffect(() => {
    const filtered = PLATFORMS.filter((platform) =>
      platform.toLowerCase().includes(platformsSearch.toLowerCase())
    );
    setFilteredPlatforms(filtered);
  }, [platformsSearch]);

  const handleCountrySelect = (country: string) => {
    if (country === 'None') {
      setFormData((prev) => ({ ...prev, country: '' }));
      setCountrySearch('');
    } else {
      setFormData((prev) => ({ ...prev, country }));
      setCountrySearch(country);
    }
    setShowCountryDropdown(false);
  };

  const handleAssetSelect = (asset: string) => {
    if (asset === 'None') {
      setFormData((prev) => ({ ...prev, assets: [] }));
      setAssetsSearch('');
    } else if (!formData.assets.includes(asset)) {
      setFormData((prev) => ({ ...prev, assets: [...prev.assets, asset] }));
      setAssetsSearch('');
    }
    setShowAssetsDropdown(false);
  };

  const handlePlatformSelect = (platform: string) => {
    if (platform === 'None') {
      setFormData((prev) => ({ ...prev, platforms: [] }));
      setPlatformsSearch('');
    } else if (!formData.platforms.includes(platform)) {
      setFormData((prev) => ({ ...prev, platforms: [...prev.platforms, platform] }));
      setPlatformsSearch('');
    }
    setShowPlatformsDropdown(false);
  };

  const removeAsset = (assetToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      assets: prev.assets.filter((asset) => asset !== assetToRemove),
    }));
  };

  const removePlatform = (platformToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.filter((platform) => platform !== platformToRemove),
    }));
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.country-dropdown')) {
        setShowCountryDropdown(false);
      }
      if (!target.closest('.assets-dropdown')) {
        setShowAssetsDropdown(false);
      }
      if (!target.closest('.platforms-dropdown')) {
        setShowPlatformsDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch all data in parallel
      const [firmsRes, contactsRes, newsletterRes] = await Promise.all([
        fetch('/api/firms'),
        fetch('/api/contact'),
        fetch('/api/newsletter'),
      ]);

      const firmsData = await firmsRes.json();
      const contactsData = await contactsRes.json();
      const newsletterData = await newsletterRes.json();

      setFirms(firmsData.firms);
      setContacts(contactsData.messages);
      setNewsletterStats(newsletterData);

      // Fetch all testimonials directly from database for admin panel
      try {
        const allTestimonialsRes = await fetch('/api/admin/testimonials/all');
        if (allTestimonialsRes.ok) {
          const allTestimonialsData = await allTestimonialsRes.json();
          setTestimonials(allTestimonialsData.testimonials || []);

          // Calculate testimonial stats
          const total = allTestimonialsData.testimonials?.length || 0;
          const approved =
            allTestimonialsData.testimonials?.filter((t: { isApproved: boolean }) => t.isApproved)
              .length || 0;
          const pending = total - approved;
          setTestimonialStats({ total, approved, pending });
        } else {
          // Fallback to public API if admin API fails
          const testimonialsRes = await fetch('/api/testimonials');
          const testimonialsData = await testimonialsRes.json();
          setTestimonials(testimonialsData.testimonials || []);

          const total = testimonialsData.testimonials?.length || 0;
          const approved =
            testimonialsData.testimonials?.filter((t: { isApproved: boolean }) => t.isApproved)
              .length || 0;
          const pending = total - approved;
          setTestimonialStats({ total, approved, pending });
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setTestimonials([]);
        setTestimonialStats({ total: 0, approved: 0, pending: 0 });
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveTestimonial = async (id: string) => {
    try {
      // Update the database directly
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isApproved: true }),
      });

      if (response.ok) {
        // Update the local state
        setTestimonials(
          testimonials.map((testimonial) =>
            testimonial.id === id ? { ...testimonial, isApproved: true } : testimonial
          )
        );

        // Update stats
        setTestimonialStats((prev) => ({
          ...prev,
          approved: prev.approved + 1,
          pending: prev.pending - 1,
        }));

        alert('Testimonial approved successfully!');
      } else {
        // If the API fails, update the database directly
        const updateResponse = await fetch('/api/admin/testimonials/approve', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });

        if (updateResponse.ok) {
          // Update the local state
          setTestimonials(
            testimonials.map((testimonial) =>
              testimonial.id === id ? { ...testimonial, isApproved: true } : testimonial
            )
          );

          // Update stats
          setTestimonialStats((prev) => ({
            ...prev,
            approved: prev.approved + 1,
            pending: prev.pending - 1,
          }));

          alert('Testimonial approved successfully!');
        } else {
          alert('Failed to approve testimonial.');
        }
      }
    } catch (error) {
      console.error('Error approving testimonial:', error);
      alert('Failed to approve testimonial.');
    }
  };

  const handleMarkContactRead = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/contact/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isRead: true }),
      });

      if (response.ok) {
        // Update the local state
        setContacts(
          contacts.map((contact) => (contact.id === id ? { ...contact, isRead: true } : contact))
        );
        alert('Contact message marked as read!');
      } else {
        alert('Failed to mark contact as read.');
      }
    } catch (error) {
      console.error('Error marking contact as read:', error);
      alert('Failed to mark contact as read.');
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact message?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/contact/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove from local state
        setContacts(contacts.filter((contact) => contact.id !== id));
        alert('Contact message deleted successfully!');
      } else {
        alert('Failed to delete contact message.');
      }
    } catch (error) {
      console.error('Error deleting contact message:', error);
      alert('Failed to delete contact message.');
    }
  };

  const handleOpenReply = (contact: ContactMessage) => {
    setReplyModal({ isOpen: true, contact });
    setReplyMessage('');
  };

  const handleCloseReply = () => {
    setReplyModal({ isOpen: false, contact: null });
    setReplyMessage('');
  };

  const handleSendReply = async () => {
    if (!replyModal.contact || !replyMessage.trim()) {
      alert('Please enter a reply message.');
      return;
    }

    try {
      const response = await fetch(`/api/admin/contact/${replyModal.contact.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isRead: true,
          isReplied: true,
          reply: replyMessage.trim(),
          repliedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        // Update local state
        setContacts(
          contacts.map((contact) =>
            contact.id === replyModal.contact!.id
              ? {
                  ...contact,
                  isRead: true,
                  isReplied: true,
                  reply: replyMessage.trim(),
                  repliedAt: new Date().toISOString(),
                }
              : contact
          )
        );

        // Send email to user
        await fetch('/api/admin/contact/send-reply', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contactId: replyModal.contact.id,
            reply: replyMessage.trim(),
          }),
        });

        handleCloseReply();
        alert('Reply sent successfully!');
      } else {
        alert('Failed to send reply.');
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Failed to send reply.');
    }
  };

  const handleEditFirm = (firm: Firm) => {
    setEditingFirm(firm);
    setFormData({
      id: firm.id,
      name: firm.name,
      logo: firm.logo || '',
      country: firm.country,
      rating: firm.rating,
      reviews: firm.reviews,
      years: firm.years,
      assets: firm.assets || [],
      platforms: firm.platforms || [],
      maxAllocation: firm.maxAllocation,
      promo: firm.promo,
      description: firm.description || '',
      website: firm.website || '',
    });
    setShowAddFirm(true);
  };

  const handleDeleteFirm = async (id: number) => {
    if (!id) {
      alert('Cannot delete firm without ID');
      return;
    }

    if (window.confirm('Are you sure you want to delete this firm?')) {
      try {
        const response = await fetch(`/api/firms/${id}`, { method: 'DELETE' });
        if (response.ok) {
          setFirms(firms.filter((firm) => firm.id !== id));
          alert('Firm deleted successfully!');
        } else {
          alert('Failed to delete firm.');
        }
      } catch (error) {
        console.error('Error deleting firm:', error);
        alert('Failed to delete firm.');
      }
    }
  };

  const handleSubmitFirm = async (e: React.FormEvent) => {
    e.preventDefault();
    const firmData = {
      ...formData,
      assets: formData.assets.map((s) => s.trim()),
      platforms: formData.platforms.map((s) => s.trim()),
    };

    try {
      if (editingFirm) {
        const response = await fetch(`/api/firms/${editingFirm.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(firmData),
        });
        if (response.ok) {
          const updatedFirm = await response.json();
          setFirms(firms.map((firm) => (firm.id === editingFirm.id ? updatedFirm : firm)));
          setEditingFirm(null);
          setShowAddFirm(false);
          alert('Firm updated successfully!');
        } else {
          alert('Failed to update firm.');
        }
      } else {
        const response = await fetch('/api/firms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(firmData),
        });
        if (response.ok) {
          const newFirm = await response.json();
          setFirms([...firms, newFirm]);
          setShowAddFirm(false);
          alert('Firm added successfully!');
        } else {
          alert('Failed to add firm.');
        }
      }
    } catch (error) {
      console.error('Error submitting firm:', error);
      alert('Failed to submit firm.');
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
            { key: 'testimonials', label: 'Testimonials', count: testimonialStats.total },
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
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-brand-primary">Prop Firms Management</h2>
                <button
                  onClick={() => setShowAddFirm(true)}
                  className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition"
                >
                  + Add New Firm
                </button>
              </div>

              {/* Add/Edit Firm Modal */}
              {showAddFirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-brand-primary">
                        {editingFirm ? 'Edit Firm' : 'Add New Firm'}
                      </h3>
                      <button
                        onClick={() => {
                          setShowAddFirm(false);
                          setEditingFirm(null);
                          setFormData({
                            name: '',
                            logo: '',
                            country: '',
                            rating: 0,
                            reviews: 0,
                            years: 0,
                            assets: [],
                            platforms: [],
                            maxAllocation: '',
                            promo: '',
                            description: '',
                            website: '',
                          });
                        }}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ✕
                      </button>
                    </div>

                    <form onSubmit={handleSubmitFirm} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Firm Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleFormChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Logo URL
                          </label>
                          <input
                            type="url"
                            name="logo"
                            value={formData.logo}
                            onChange={handleFormChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Country *
                          </label>
                          <div className="relative country-dropdown">
                            <input
                              type="text"
                              name="country"
                              value={countrySearch}
                              onChange={(e) => setCountrySearch(e.target.value)}
                              onClick={() => setShowCountryDropdown(true)}
                              onFocus={() => setShowCountryDropdown(true)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent pr-10"
                              placeholder="Search or select country..."
                              required
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                              <svg
                                className="w-4 h-4 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </div>
                            {showCountryDropdown && (
                              <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                <div
                                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 border-b border-gray-200 font-medium text-gray-500"
                                  onClick={() => handleCountrySelect('None')}
                                >
                                  None
                                </div>
                                {filteredCountries.length > 0 ? (
                                  filteredCountries.map((country) => (
                                    <div
                                      key={country}
                                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                                      onClick={() => handleCountrySelect(country)}
                                    >
                                      {country}
                                    </div>
                                  ))
                                ) : (
                                  <div className="px-4 py-2 text-gray-500">No countries found</div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Rating (0-5) *
                          </label>
                          <input
                            type="number"
                            name="rating"
                            min="0"
                            max="5"
                            step="0.1"
                            value={formData.rating}
                            onChange={handleFormChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Number of Reviews
                          </label>
                          <input
                            type="number"
                            name="reviews"
                            min="0"
                            value={formData.reviews}
                            onChange={handleFormChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Years in Business
                          </label>
                          <input
                            type="number"
                            name="years"
                            min="0"
                            value={formData.years}
                            onChange={handleFormChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Max Allocation *
                          </label>
                          <input
                            type="text"
                            name="maxAllocation"
                            value={formData.maxAllocation}
                            onChange={handleFormChange}
                            required
                            placeholder="e.g., $2M"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Promo Code
                          </label>
                          <input
                            type="text"
                            name="promo"
                            value={formData.promo}
                            onChange={handleFormChange}
                            placeholder="e.g., 10% OFF"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Supported Assets (comma-separated)
                        </label>
                        <div className="relative assets-dropdown">
                          <input
                            type="text"
                            name="assets"
                            value={assetsSearch}
                            onChange={(e) => setAssetsSearch(e.target.value)}
                            onClick={() => setShowAssetsDropdown(true)}
                            onFocus={() => setShowAssetsDropdown(true)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent pr-10"
                            placeholder="Search or select assets..."
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg
                              className="w-4 h-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                          {showAssetsDropdown && (
                            <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                              <div
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100 border-b border-gray-200 font-medium text-gray-500"
                                onClick={() => handleAssetSelect('None')}
                              >
                                None (Clear All)
                              </div>
                              {filteredAssets.length > 0 ? (
                                filteredAssets.map((asset) => (
                                  <div
                                    key={asset}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                                    onClick={() => handleAssetSelect(asset)}
                                  >
                                    {asset}
                                  </div>
                                ))
                              ) : (
                                <div className="px-4 py-2 text-gray-500">No assets found</div>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {formData.assets.map((asset) => (
                            <span
                              key={asset}
                              className="px-2 py-0.5 bg-brand-bg/80 rounded text-xs flex items-center"
                            >
                              {asset}
                              <button
                                onClick={() => removeAsset(asset)}
                                className="ml-1 text-red-500 hover:text-red-700 text-xs"
                              >
                                ✕
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Supported Platforms (comma-separated)
                        </label>
                        <div className="relative platforms-dropdown">
                          <input
                            type="text"
                            name="platforms"
                            value={platformsSearch}
                            onChange={(e) => setPlatformsSearch(e.target.value)}
                            onClick={() => setShowPlatformsDropdown(true)}
                            onFocus={() => setShowPlatformsDropdown(true)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent pr-10"
                            placeholder="Search or select platforms..."
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg
                              className="w-4 h-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                          {showPlatformsDropdown && (
                            <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                              <div
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100 border-b border-gray-200 font-medium text-gray-500"
                                onClick={() => handlePlatformSelect('None')}
                              >
                                None (Clear All)
                              </div>
                              {filteredPlatforms.length > 0 ? (
                                filteredPlatforms.map((platform) => (
                                  <div
                                    key={platform}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                                    onClick={() => handlePlatformSelect(platform)}
                                  >
                                    {platform}
                                  </div>
                                ))
                              ) : (
                                <div className="px-4 py-2 text-gray-500">No platforms found</div>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {formData.platforms.map((platform) => (
                            <span
                              key={platform}
                              className="px-2 py-0.5 bg-brand-bg/80 rounded text-xs flex items-center"
                            >
                              {platform}
                              <button
                                onClick={() => removePlatform(platform)}
                                className="ml-1 text-red-500 hover:text-red-700 text-xs"
                              >
                                ✕
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Website URL
                        </label>
                        <input
                          type="url"
                          name="website"
                          value={formData.website}
                          onChange={handleFormChange}
                          placeholder="https://example.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleFormChange}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        />
                      </div>

                      <div className="flex gap-3 pt-4">
                        <button
                          type="submit"
                          className="px-6 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition"
                        >
                          {editingFirm ? 'Update Firm' : 'Add Firm'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddFirm(false);
                            setEditingFirm(null);
                            setFormData({
                              name: '',
                              logo: '',
                              country: '',
                              rating: 0,
                              reviews: 0,
                              years: 0,
                              assets: [],
                              platforms: [],
                              maxAllocation: '',
                              promo: '',
                              description: '',
                              website: '',
                            });
                          }}
                          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-brand-border">
                      <th className="p-3">Logo</th>
                      <th className="p-3">Name</th>
                      <th className="p-3">Country</th>
                      <th className="p-3">Rating</th>
                      <th className="p-3">Max Allocation</th>
                      <th className="p-3">Assets</th>
                      <th className="p-3">Platforms</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {firms.map((firm, index) => (
                      <tr
                        key={firm.id || `firm-${index}`}
                        className="border-b border-brand-border/50"
                      >
                        <td className="p-3">
                          {firm.logo && (
                            <img src={firm.logo} alt={firm.name} className="w-8 h-8 rounded-full" />
                          )}
                        </td>
                        <td className="p-3 font-medium">{firm.name}</td>
                        <td className="p-3">{firm.country}</td>
                        <td className="p-3">
                          {firm.rating}/5 ({firm.reviews} reviews)
                        </td>
                        <td className="p-3">{firm.maxAllocation}</td>
                        <td className="p-3">
                          <div className="flex flex-wrap gap-1">
                            {firm.assets?.slice(0, 2).map((asset) => (
                              <span
                                key={asset}
                                className="px-2 py-0.5 bg-brand-bg/80 rounded text-xs"
                              >
                                {asset}
                              </span>
                            ))}
                            {firm.assets?.length > 2 && (
                              <span className="px-2 py-0.5 bg-brand-bg/80 rounded text-xs">
                                +{firm.assets.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex flex-wrap gap-1">
                            {firm.platforms?.slice(0, 2).map((platform) => (
                              <span
                                key={platform}
                                className="px-2 py-0.5 bg-brand-bg/80 rounded text-xs"
                              >
                                {platform}
                              </span>
                            ))}
                            {firm.platforms?.length > 2 && (
                              <span className="px-2 py-0.5 bg-brand-bg/80 rounded text-xs">
                                +{firm.platforms.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditFirm(firm)}
                              className="text-brand-primary hover:text-brand-accent text-sm"
                              disabled={!firm.id}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteFirm(firm.id || 0)}
                              className="text-red-500 hover:text-red-700 text-sm"
                              disabled={!firm.id}
                            >
                              Delete
                            </button>
                          </div>
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
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-brand-primary">Testimonials Management</h2>
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {testimonialStats.approved}
                    </div>
                    <div className="text-sm text-gray-600">Approved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {testimonialStats.pending}
                    </div>
                    <div className="text-sm text-gray-600">Pending</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{testimonialStats.total}</div>
                    <div className="text-sm text-gray-600">Total</div>
                  </div>
                </div>
              </div>

              {/* Filter and Search */}
              <div className="flex gap-4 mb-6">
                <select
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                  aria-label="Filter testimonials"
                  value={testimonialFilter}
                  onChange={(e) =>
                    setTestimonialFilter(e.target.value as 'all' | 'approved' | 'pending')
                  }
                >
                  <option value="all">All Testimonials</option>
                  <option value="approved">Approved Only</option>
                  <option value="pending">Pending Only</option>
                </select>
                <input
                  type="text"
                  placeholder="Search testimonials..."
                  className="px-3 py-2 border border-gray-300 rounded-lg flex-1"
                  value={testimonialSearch}
                  onChange={(e) => setTestimonialSearch(e.target.value)}
                />
              </div>

              <div className="space-y-4">
                {testimonials
                  .filter((testimonial) => {
                    // Apply status filter
                    if (testimonialFilter === 'approved' && !testimonial.isApproved) return false;
                    if (testimonialFilter === 'pending' && testimonial.isApproved) return false;

                    // Apply search filter
                    if (testimonialSearch) {
                      const searchLower = testimonialSearch.toLowerCase();
                      return (
                        testimonial.name.toLowerCase().includes(searchLower) ||
                        testimonial.title.toLowerCase().includes(searchLower) ||
                        testimonial.review.toLowerCase().includes(searchLower)
                      );
                    }

                    return true;
                  })
                  .map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                            <p className="text-sm text-gray-600">{testimonial.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={`text-sm ${
                                    i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                              <span className="text-xs text-gray-500">
                                ({testimonial.rating}/5)
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {!testimonial.isApproved && (
                            <button
                              onClick={() => handleApproveTestimonial(testimonial.id)}
                              className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                            >
                              Approve
                            </button>
                          )}
                          <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                            Edit
                          </button>
                          <button className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">
                            Delete
                          </button>
                        </div>
                      </div>
                      <blockquote className="text-gray-700 italic border-l-4 border-green-500 pl-4 mb-4">
                        &ldquo;{testimonial.review}&rdquo;
                      </blockquote>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{new Date(testimonial.createdAt).toLocaleDateString()}</span>
                        <span
                          className={`px-2 py-1 rounded ${
                            testimonial.isApproved
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {testimonial.isApproved ? 'Approved' : 'Pending'}
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

              {/* Contact Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-brand-bg/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-brand-primary">{contacts.length}</div>
                  <div className="text-sm text-brand-text/60">Total Messages</div>
                </div>
                <div className="bg-brand-bg/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-red-500">
                    {contacts.filter((c) => !c.isRead).length}
                  </div>
                  <div className="text-sm text-brand-text/60">Unread Messages</div>
                </div>
                <div className="bg-brand-bg/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-yellow-500">
                    {contacts.filter((c) => c.isRead && !c.isReplied).length}
                  </div>
                  <div className="text-sm text-brand-text/60">Read (No Reply)</div>
                </div>
                <div className="bg-brand-bg/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-500">
                    {contacts.filter((c) => c.isReplied).length}
                  </div>
                  <div className="text-sm text-brand-text/60">Replied Messages</div>
                </div>
              </div>

              {/* Filter and Search */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <select
                  className="px-3 py-2 border border-brand-border rounded-lg bg-brand-bg text-brand-text"
                  aria-label="Filter contact messages"
                  onChange={(e) => {
                    const filter = e.target.value;
                    if (filter === 'all') {
                      setContacts(contacts);
                    } else if (filter === 'unread') {
                      setContacts(contacts.filter((c) => !c.isRead));
                    } else if (filter === 'read') {
                      setContacts(contacts.filter((c) => c.isRead && !c.isReplied));
                    } else if (filter === 'replied') {
                      setContacts(contacts.filter((c) => c.isReplied));
                    }
                  }}
                >
                  <option value="all">All Messages</option>
                  <option value="unread">Unread Only</option>
                  <option value="read">Read (No Reply)</option>
                  <option value="replied">Replied</option>
                </select>
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  className="px-3 py-2 border border-brand-border rounded-lg bg-brand-bg text-brand-text flex-1"
                  onChange={(e) => {
                    const search = e.target.value.toLowerCase();
                    const filtered = contacts.filter(
                      (contact) =>
                        contact.name.toLowerCase().includes(search) ||
                        contact.email.toLowerCase().includes(search) ||
                        contact.message.toLowerCase().includes(search)
                    );
                    setContacts(filtered);
                  }}
                />
              </div>

              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div key={contact.id} className="border border-brand-border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-brand-primary">{contact.name}</h3>
                        <p className="text-sm text-brand-text/60">{contact.email}</p>
                        {contact.subject && (
                          <p className="text-sm text-brand-text/70 mt-1">
                            Subject: {contact.subject}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {!contact.isRead && (
                          <button
                            onClick={() => handleMarkContactRead(contact.id)}
                            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                          >
                            Mark Read
                          </button>
                        )}
                        <button
                          onClick={() => handleOpenReply(contact)}
                          className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                        >
                          {contact.isReplied ? 'View Reply' : 'Reply'}
                        </button>
                        <button
                          onClick={() => handleDeleteContact(contact.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                        >
                          Delete
                        </button>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            !contact.isRead
                              ? 'bg-red-100 text-red-700'
                              : contact.isReplied
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {contact.isReplied ? 'Replied' : contact.isRead ? 'Read' : 'New'}
                        </span>
                      </div>
                    </div>
                    <p className="text-brand-text/80 mt-2">{contact.message}</p>
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

          {/* Reply Modal */}
          {replyModal.isOpen && replyModal.contact && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-brand-primary">
                    Reply to {replyModal.contact.name}
                  </h3>
                  <button onClick={handleCloseReply} className="text-gray-500 hover:text-gray-700">
                    ✕
                  </button>
                </div>

                <div className="mb-4">
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-brand-primary mb-2">Original Message:</h4>
                    <p className="text-sm text-gray-700">{replyModal.contact.message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      From: {replyModal.contact.email} •{' '}
                      {new Date(replyModal.contact.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {replyModal.contact.isReplied && replyModal.contact.reply && (
                    <div className="bg-green-50 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-green-700 mb-2">Previous Reply:</h4>
                      <p className="text-sm text-green-700">{replyModal.contact.reply}</p>
                      <p className="text-xs text-green-600 mt-2">
                        Replied on: {new Date(replyModal.contact.repliedAt!).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Reply:
                    </label>
                    <textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      placeholder="Type your reply here..."
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleCloseReply}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendReply}
                    className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-accent"
                  >
                    Send Reply
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel;
