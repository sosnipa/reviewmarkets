import React from 'react';

const navColumns = [
  {
    title: 'PROP FIRMS',
    links: [
      { label: 'All Prop Firms', href: '#' },
      { label: 'Compare Challenges', href: '#' },
      { label: 'Best Sellers', href: '#' },
      { label: 'Favorite Firms', href: '#' },
      { label: 'Announcements', href: '#' },
      { label: 'Prop Firm Rules', href: '#' },
      { label: 'Reviews', href: '#' },
      { label: 'Payouts', href: '#' },
      { label: 'Demo Accounts', href: '#' },
      { label: 'Unlisted Firms', href: '#' },
    ],
  },
  {
    title: 'OFFERS',
    links: [
      { label: 'Exclusive Offers', href: '#' },
      { label: 'Extra Account Promo', href: '#' },
      { label: 'All Current Offers', href: '#' },
    ],
  },
  {
    title: 'PROGRAMS',
    links: [
      { label: 'Loyalty Program', href: '#' },
      { label: 'Affiliate Program', href: '#' },
    ],
  },
  {
    title: 'GET HELP',
    links: [
      { label: 'Contact Us', href: '#' },
      { label: 'How it Works', href: '#' },
    ],
  },
  {
    title: 'RESOURCES',
    links: [
      { label: 'High Impact News', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Prop Firm Features', href: '#' },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Prop Firm Business', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Sitemap', href: '#' },
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
    label: 'YouTube',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M23.5 6.2s-.2-1.7-.8-2.4c-.7-.8-1.5-.8-1.9-.9C17.2 2.5 12 2.5 12 2.5h-.1s-5.2 0-8.8.4c-.4 0-1.2.1-1.9.9C.6 4.5.5 6.2.5 6.2S.2 8 .2 9.7v1.6c0 1.7.3 3.5.3 3.5s.2 1.7.8 2.4c.7.8 1.6.8 2 .9 1.5.1 6.7.4 6.7.4s5.2 0 8.8-.4c.4 0 1.2-.1 1.9-.9.6-.7.8-2.4.8-2.4s.3-1.7.3-3.5v-1.6c0-1.7-.3-3.5-.3-3.5ZM9.8 15.3V7.7l6.4 3.8-6.4 3.8Z"
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
    <footer className="w-full bg-brand-bg text-brand-text pt-12 pb-6 px-4 border-t border-brand-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-10">
        {/* Logo and Brand */}
        <div className="flex flex-col items-center md:items-start gap-3 min-w-[180px]">
          <img src="/Logo.png" alt="Prop Firm Match Logo" className="w-10 h-10 mb-1" />
          <span className="font-bold text-lg tracking-wide">Prop Firm Match</span>
        </div>
        {/* Navigation Columns */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {navColumns.map((col) => (
            <div key={col.title}>
              <div className="text-xs font-semibold text-brand-accent mb-2 uppercase tracking-widest">
                {col.title}
              </div>
              <ul className="space-y-1">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-brand-text/80 hover:text-brand-accent transition"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Socials */}
        <div className="flex flex-col items-center md:items-end gap-4 min-w-[120px]">
          <div className="flex gap-3 mt-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="text-brand-text/80 hover:text-brand-accent transition"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      {/* Bottom Row */}
      <div className="max-w-7xl mx-auto mt-10 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-brand-border pt-6 text-xs text-brand-text/50">
        <div>&copy; {new Date().getFullYear()} Prop Firm Match. All rights reserved.</div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-brand-accent">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-brand-accent">
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
