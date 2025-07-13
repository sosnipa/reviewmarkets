import React from 'react';
import { Mail, Phone, MapPin, Instagram, Twitter, Send, MessageCircle } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="w-full py-16 bg-background text-foreground">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <form className="bg-white dark:bg-dark/80 rounded-lg shadow p-8 flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
          <input
            type="text"
            placeholder="Your Name"
            className="px-4 py-2 rounded border border-input bg-light dark:bg-dark/60 text-dark dark:text-light"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="px-4 py-2 rounded border border-input bg-light dark:bg-dark/60 text-dark dark:text-light"
            required
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            className="px-4 py-2 rounded border border-input bg-light dark:bg-dark/60 text-dark dark:text-light"
            required
          />
          <button
            type="submit"
            className="mt-2 px-6 py-2 bg-primary text-white rounded hover:bg-primary/80 transition font-semibold"
          >
            Send Message
          </button>
        </form>
        {/* Contact Info & Map */}
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <h3 className="font-bold text-lg mb-1">Contact Information</h3>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-5 w-5" /> support@reviewmarkets.com
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-5 w-5" /> +1 (555) 123-4567
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5" /> 123 Market St, New York, NY
            </div>
          </div>
          <div className="flex gap-4 mt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6 hover:text-primary" />
            </a>
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
            >
              <Send className="h-6 w-6 hover:text-primary" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <Twitter className="h-6 w-6 hover:text-primary" />
            </a>
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-6 w-6 hover:text-primary" />
            </a>
          </div>
          <div className="mt-6">
            <div className="w-full h-40 rounded-lg bg-light dark:bg-dark/60 flex items-center justify-center text-muted-foreground text-sm">
              [Map Placeholder]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
