'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
// import Link from "next/link";
import { Input } from '@/components/ui/input';
import { Search, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change or scroll
  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener('scroll', close);
    return () => window.removeEventListener('scroll', close);
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-brand-border bg-brand-bg/95 dark:bg-brand-bg/90 backdrop-blur supports-[backdrop-filter]:bg-brand-bg/60 dark:supports-[backdrop-filter]:bg-brand-bg/80 transition-all duration-300 ${
        scrolled ? 'shadow-lg bg-brand-bg/90 dark:bg-brand-bg/80' : ''
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Title */}
          <div className="flex items-center space-x-3 min-w-0 flex-shrink-0">
            <Image src="/Logo.png" alt="Logo" width={32} height={32} className="flex-shrink-0" />
            <h1 className="text-xl font-bold text-brand-primary dark:text-brand-accent truncate">
              ReviewMarket
            </h1>
          </div>

          {/* Desktop Search + Nav */}
          <div className="hidden md:flex items-center space-x-6 flex-1 justify-center max-w-4xl">
            <div className="relative flex-shrink-0">
              <Input
                type="text"
                placeholder="Search prop firms..."
                className="w-64 pl-10 pr-4 py-2 rounded-full bg-brand-card dark:bg-brand-card/80 text-sm text-brand-text dark:text-brand-text placeholder:text-brand-text/60 dark:placeholder:text-brand-text/40 border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-accent/70 dark:text-brand-accent/50" />
            </div>

            <nav className="flex items-center space-x-6">
              <a
                href="#features"
                className="text-brand-text dark:text-brand-text hover:text-brand-accent dark:hover:text-brand-accent transition-colors font-medium whitespace-nowrap"
              >
                Features
              </a>
              <a
                href="#firms"
                className="text-brand-text dark:text-brand-text hover:text-brand-accent dark:hover:text-brand-accent transition-colors font-medium whitespace-nowrap"
              >
                Firms
              </a>
              <a
                href="/testimonials"
                className="text-brand-text dark:text-brand-text hover:text-brand-accent dark:hover:text-brand-accent transition-colors font-medium whitespace-nowrap"
              >
                Testimonials
              </a>
              <a
                href="#newsletter"
                className="text-brand-text dark:text-brand-text hover:text-brand-accent dark:hover:text-brand-accent transition-colors font-medium whitespace-nowrap"
              >
                Newsletter
              </a>
              <a
                href="#footer"
                className="text-brand-text dark:text-brand-text hover:text-brand-accent dark:hover:text-brand-accent transition-colors font-medium whitespace-nowrap"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Get Started Button */}
          <div className="hidden md:flex items-center flex-shrink-0">
            <a
              href="#get-started"
              className="px-6 py-2 rounded-full bg-brand-primary text-white font-semibold shadow hover:bg-brand-accent transition-colors dark:bg-brand-accent dark:hover:bg-brand-primary dark:text-brand-bg whitespace-nowrap"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-brand-accent"
            >
              {menuOpen ? (
                <X className="h-6 w-6 text-brand-primary dark:text-brand-accent" />
              ) : (
                <Menu className="h-6 w-6 text-brand-primary dark:text-brand-accent" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <nav className="md:hidden bg-brand-bg dark:bg-brand-bg/90 border-t border-brand-border shadow-lg px-6 py-4 flex flex-col gap-4 z-50">
          <a
            href="#features"
            className="text-brand-text dark:text-brand-text hover:text-brand-accent dark:hover:text-brand-accent font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Features
          </a>
          <a
            href="#firms"
            className="text-brand-text dark:text-brand-text hover:text-brand-accent dark:hover:text-brand-accent font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Firms
          </a>
          <a
            href="/testimonials"
            className="text-brand-text dark:text-brand-text hover:text-brand-accent dark:hover:text-brand-accent font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Testimonials
          </a>
          <a
            href="#newsletter"
            className="text-brand-text dark:text-brand-text hover:text-brand-accent dark:hover:text-brand-accent font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Newsletter
          </a>
          <a
            href="#footer"
            className="text-brand-text dark:text-brand-text hover:text-brand-accent dark:hover:text-brand-accent font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </a>

          <a
            href="#get-started"
            className="mt-2 px-5 py-2 rounded-full bg-brand-primary text-white font-semibold shadow hover:bg-brand-accent transition-colors dark:bg-brand-accent dark:hover:bg-brand-primary dark:text-brand-bg text-center"
            onClick={() => setMenuOpen(false)}
          >
            Get Started
          </a>
        </nav>
      )}
    </header>
  );
}
