"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
// import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change or scroll
  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener("scroll", close);
    return () => window.removeEventListener("scroll", close);
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${
        scrolled ? "shadow-lg bg-background/90" : ""
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Title */}
          <div className="flex items-center space-x-3">
            <Image src="/Logo.png" alt="Logo" width={32} height={32} />
            <h1 className="text-xl font-bold text-foreground">ReviewMarkets</h1>
          </div>

          {/* Desktop Search + Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search prop firms..."
                className="w-64 pl-10 pr-4 py-2 rounded-full bg-muted text-sm text-foreground placeholder-muted-foreground border border-input focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>

            <nav className="flex items-center space-x-8">
              <a
                href="#features"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Features
              </a>
              <a
                href="#firms"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Firms
              </a>
              <a
                href="#testimonials"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Testimonials
              </a>
              <a
                href="#newsletter"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Newsletter
              </a>
              <a
                href="#footer"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <nav className="md:hidden bg-background border-t border-border shadow-lg px-6 py-4 flex flex-col gap-4 z-50">
          <a
            href="#features"
            className="text-foreground hover:text-primary font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Features
          </a>
          <a
            href="#firms"
            className="text-foreground hover:text-primary font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Firms
          </a>
          <a
            href="#testimonials"
            className="text-foreground hover:text-primary font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Testimonials
          </a>
          <a
            href="#newsletter"
            className="text-foreground hover:text-primary font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Newsletter
          </a>
          <a
            href="#footer"
            className="text-foreground hover:text-primary font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </a>
        </nav>
      )}
    </header>
  );
}
