'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, FileText, Send } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const EmailTemplatesPage: React.FC = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [sendingTemplate, setSendingTemplate] = useState<EmailTemplate | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    content: '',
    type: 'newsletter',
    isActive: true,
  });
  const [sendData, setSendData] = useState({
    subject: '',
    content: '',
    emailType: 'newsletter' as 'newsletter' | 'support',
  });

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/admin/templates');
      if (response.ok) {
        const data = await response.json();
        setTemplates(data.templates);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingTemplate
        ? `/api/admin/templates/${editingTemplate.id}`
        : '/api/admin/templates';

      const method = editingTemplate ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowModal(false);
        setEditingTemplate(null);
        resetForm();
        fetchTemplates();
      }
    } catch (error) {
      console.error('Error saving template:', error);
    }
  };

  const handleEdit = (template: EmailTemplate) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      subject: template.subject,
      content: template.content,
      type: template.type,
      isActive: template.isActive,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this template?')) return;

    try {
      const response = await fetch(`/api/admin/templates/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchTemplates();
      }
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };

  const handleSendTemplate = (template: EmailTemplate) => {
    setSendingTemplate(template);
    setSendData({
      subject: template.subject,
      content: template.content,
      emailType: 'newsletter',
    });
    setShowSendModal(true);
  };

  const handleSendSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sendingTemplate) return;

    try {
      const response = await fetch('/api/admin/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: sendData.subject,
          content: sendData.content,
          emailType: sendData.emailType,
        }),
      });

      if (response.ok) {
        setShowSendModal(false);
        setSendingTemplate(null);
        alert('Email sent successfully!');
      } else {
        alert('Failed to send email. Please try again.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      subject: '',
      content: '',
      type: 'newsletter',
      isActive: true,
    });
  };

  const openNewTemplateModal = () => {
    setEditingTemplate(null);
    resetForm();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTemplate(null);
    resetForm();
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'welcome':
        return 'bg-blue-100 text-blue-800';
      case 'newsletter':
        return 'bg-green-100 text-green-800';
      case 'promotional':
        return 'bg-green-100 text-green-800';
      case 'support':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Email Templates</h1>
            <p className="text-gray-600 mt-2">
              Manage your email templates for newsletters and campaigns
            </p>
          </div>
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openNewTemplateModal}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>New Template</span>
            </motion.button>
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

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                </div>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(template.type)}`}
                >
                  {template.type}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-2">{template.subject}</p>

              <div className="flex items-center space-x-2 mb-4">
                <span
                  className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                    template.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {template.isActive ? 'Active' : 'Inactive'}
                </span>
                <span className="text-xs text-gray-500">
                  Updated {new Date(template.updatedAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(template)}
                  className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleSendTemplate(template)}
                  className="bg-green-100 text-green-700 px-3 py-2 rounded-md text-sm hover:bg-green-200 transition-colors flex items-center justify-center space-x-1"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
                <button
                  onClick={() => handleDelete(template.id)}
                  className="bg-red-100 text-red-700 px-3 py-2 rounded-md text-sm hover:bg-red-200 transition-colors flex items-center justify-center space-x-1"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {templates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No templates yet</h3>
            <p className="text-gray-600 mb-4">Create your first email template to get started</p>
            <button
              onClick={openNewTemplateModal}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Template
            </button>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {editingTemplate ? 'Edit Template' : 'New Template'}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600"
                    aria-label="Close modal"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Template Name
                    </label>
                    <input
                      type="text"
                      id="template-name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter template name"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="template-type"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Type
                    </label>
                    <select
                      id="template-type"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="Template type"
                    >
                      <option value="welcome">Welcome</option>
                      <option value="newsletter">Newsletter</option>
                      <option value="promotional">Promotional</option>
                      <option value="support">Support</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="template-subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject Line
                  </label>
                  <input
                    type="text"
                    id="template-subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email subject"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="template-content"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Content (HTML)
                  </label>
                  <textarea
                    id="template-content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={15}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                    placeholder="Enter HTML content for the email template"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">Active</span>
                  </label>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingTemplate ? 'Update' : 'Create'} Template</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Send Template Modal */}
        {showSendModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Send Template: {sendingTemplate?.name}
                  </h2>
                  <button
                    onClick={() => setShowSendModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                    aria-label="Close modal"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSendSubmit} className="p-6">
                <div className="mb-6">
                  <label
                    htmlFor="send-subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject Line
                  </label>
                  <input
                    type="text"
                    id="send-subject"
                    value={sendData.subject}
                    onChange={(e) => setSendData({ ...sendData, subject: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email subject"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="send-content"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Content (HTML)
                  </label>
                  <textarea
                    id="send-content"
                    value={sendData.content}
                    onChange={(e) => setSendData({ ...sendData, content: e.target.value })}
                    rows={10}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                    placeholder="Enter HTML content for the email"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="email-type"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Type
                  </label>
                  <select
                    id="email-type"
                    value={sendData.emailType}
                    onChange={(e) =>
                      setSendData({
                        ...sendData,
                        emailType: e.target.value as 'newsletter' | 'support',
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Email type"
                  >
                    <option value="newsletter">Newsletter (Resend)</option>
                    <option value="support">Support (SMTP)</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowSendModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Email</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailTemplatesPage;
