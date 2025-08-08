'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileSearchTerm, setMobileSearchTerm] = useState('');
  const router = useRouter();

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

  const handleSearch = (term: string, isMobile = false) => {
    if (term.trim()) {
      const searchParams = new URLSearchParams({ search: term.trim() });
      router.push(`/firms?${searchParams.toString()}`);
      if (isMobile) {
        setMenuOpen(false);
        setMobileSearchTerm('');
      } else {
        setSearchTerm('');
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, term: string, isMobile = false) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(term, isMobile);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${
        scrolled ? 'shadow-lg bg-background/90' : ''
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Title */}
          <Link
            href="/"
            className="flex items-center space-x-3 min-w-0 flex-shrink-0 hover:opacity-80 transition-opacity"
          >
            <Image src="/Logo.png" alt="Logo" width={32} height={32} className="flex-shrink-0" />
            <h1 className="text-xl font-bold text-foreground truncate">ReviewMarket</h1>
          </Link>

          {/* Desktop Search + Nav */}
          <div className="hidden md:flex items-center space-x-6 flex-1 justify-center max-w-4xl">
            <div className="relative flex-shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search prop firms..."
                className="w-64 pl-10 pr-4 py-2 rounded-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, searchTerm)}
              />
              {searchTerm && (
                <Button
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => handleSearch(searchTerm)}
                >
                  <Search className="h-3 w-3" />
                </Button>
              )}
            </div>

            <nav className="flex items-center space-x-6">
              <a
                href="#features"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </a>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    Firms
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  <DropdownMenuItem>
                    <a href="/firms">All Firms</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="/firms?rating=5">Top Rated</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="/firms?sort=newest">New Firms</a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <a
                href="/testimonials"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#newsletter"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Newsletter
              </a>
              <a
                href="#contact"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Get Started Button */}
          <div className="hidden md:flex items-center flex-shrink-0 space-x-2">
            <Button asChild size="sm">
              <Link href="/firms">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <nav className="md:hidden bg-background border-t border-border shadow-lg px-6 py-4 flex flex-col gap-4 z-50">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search prop firms..."
              className="pl-10 pr-12"
              value={mobileSearchTerm}
              onChange={(e) => setMobileSearchTerm(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, mobileSearchTerm, true)}
            />
            {mobileSearchTerm && (
              <Button
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                onClick={() => handleSearch(mobileSearchTerm, true)}
              >
                <Search className="h-3 w-3" />
              </Button>
            )}
          </div>

          <a
            href="#features"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Features
          </a>
          <a
            href="/firms"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Firms
          </a>
          <a
            href="/testimonials"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Testimonials
          </a>
          <a
            href="#newsletter"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Newsletter
          </a>
          <a
            href="#contact"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </a>

          <div className="flex gap-2 pt-4 border-t border-border">
            <Button asChild size="sm" className="flex-1">
              <Link href="/firms">Get Started</Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
