import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Mail, Users, TrendingUp, MessageSquare } from 'lucide-react';

const navColumns = [
  {
    title: 'NAVIGATION',
    links: [{ label: 'Home', href: '/' }],
  },
  {
    title: 'PROP FIRMS',
    links: [
      { label: 'All Prop Firms', href: '/firms' },
      { label: 'Best Sellers', href: '/firms?rating=5' },
    ],
  },
  {
    title: 'COMMUNITY',
    links: [
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'Share Your Experience', href: '/testimonials' },
    ],
  },
  {
    title: 'ACCOUNT',
    links: [
      { label: 'Email Preferences', href: '/preferences' },
      { label: 'Unsubscribe', href: '/unsubscribe' },
    ],
  },
  {
    title: 'GET HELP',
    links: [{ label: 'Contact Us', href: '/#contact' }],
  },
  {
    title: 'COMPANY',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Sitemap', href: '/sitemap' },
    ],
  },
];

const socials = [
  {
    label: 'X',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M17.53 3.75h3.72l-8.16 9.3 9.6 11.2h-7.56l-6-7.1-6.87 7.1H1.03l8.7-9.9L.6 3.75h7.74l5.4 6.4 6.06-6.4Zm-1.32 16.5h2.07L6.09 5.13H3.87l12.34 15.12Z"
        />
      </svg>
    ),
    href: '#',
  },
  {
    label: 'Telegram',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
        />
      </svg>
    ),
    href: '#',
  },
  {
    label: 'Instagram',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.2 2.3.4.6.2 1 .5 1.5 1 .5.5.8.9 1 1.5.2.4.3 1.1.4 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.9-.4 2.3-.2.6-.5 1-1 1.5-.5.5-.9.8-1.5 1-.4.2-1.1.3-2.3.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.2-2.3-.4-.6-.2-1-.5-1.5-1-.5-.5-.8-.9-1-1.5-.2-.4-.3-1.1-.4-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.9.4-2.3.2-.6.5-1 1-1.5.5-.5.9-.8 1.5-1 .4-.2 1.1-.3 2.3-.4C8.4 2.2 8.8 2.2 12 2.2Zm0-2.2C8.7 0 8.3 0 7 .1 5.7.2 4.7.4 3.9.7c-.9.3-1.6.7-2.3 1.4C.7 3.7.3 4.4 0 5.3c-.3.8-.5 1.8-.6 3.1C-.1 8.7-.1 9.1 0 12c.1 2.9.1 3.3.6 4.6.1 1.3.3 2.3.6 3.1.3.9.7 1.6 1.4 2.3.7.7 1.4 1.1 2.3 1.4.8.3 1.8.5 3.1.6 1.3.1 1.7.1 4.6.1s3.3 0 4.6-.1c1.3-.1 2.3-.3 3.1-.6.9-.3 1.6-.7 2.3-1.4.7-.7 1.1-1.4 1.4-2.3.3-.8.5-1.8.6-3.1.1-1.3.1-1.7.1-4.6s0-3.3-.1-4.6c-.1-1.3-.3-2.3-.6-3.1-.3-.9-.7-1.6-1.4-2.3C20.3.7 19.6.3 18.7 0c-.8-.3-1.8-.5-3.1-.6C15.3-.1 14.9-.1 12 0Zm0 5.8A6.2 6.2 0 1 0 12 18.2 6.2 6.2 0 0 0 12 5.8Zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-11.6a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Z"
        />
      </svg>
    ),
    href: '#',
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8">
          {/* Logo and Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center space-x-3 mb-4 hover:opacity-80 transition-opacity"
            >
              <Image src="/Logo.png" alt="ReviewMarket Logo" width={40} height={40} />
              <span className="font-bold text-xl">ReviewMarket</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              The ultimate platform for comparing prop trading firms. Find your perfect trading
              partner with real reviews and comprehensive comparisons.
            </p>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Stay Updated</h4>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Button size="sm">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {navColumns.map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold text-sm mb-4 text-foreground">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Socials and Stats */}
          <div className="lg:col-span-1">
            <h4 className="font-semibold text-sm mb-4 text-foreground">Connect</h4>
            <div className="flex space-x-3 mb-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">10K+ Traders</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">50+ Firms</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">1K+ Reviews</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>&copy; {new Date().getFullYear()} ReviewMarket. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-foreground transition-colors">
              Terms & Conditions
            </a>
            <a href="/cookies" className="hover:text-foreground transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
