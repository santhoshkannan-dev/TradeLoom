import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cpu, GitFork, ExternalLink } from 'lucide-react';

// Inline SVG social icons
function TwitterIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}


const cols = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Analytics', href: '#analytics' },
      { label: 'AI Advisor', href: '#ai' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'Broker Guides', href: '#' },
      { label: 'Community', href: '#' },
      { label: 'Blog', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Intelligence Hub', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Security', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Use', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Disclosures', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          {/* Brand column */}
          <div className="col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-600/10 border border-purple-500/20">
                <Cpu className="w-5 h-5 text-purple-400" />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">TradeLoom</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              AI-powered unified portfolio intelligence for the modern retail sovereign.
              Institutional analytics at retail prices.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/santhoshkannan-dev/TradeLoom"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 text-gray-500 hover:text-white transition-all"
              >
                <GitFork className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 text-gray-500 hover:text-white transition-all"
              >
                <TwitterIcon />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 text-gray-500 hover:text-white transition-all"
              >
                <LinkedinIcon />
              </a>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-gray-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              All systems operational · 99.9% uptime
            </div>
          </div>

          {/* Nav columns */}
          {cols.map((col) => (
            <div key={col.title} className="space-y-4">
              <p className="text-[11px] uppercase font-bold text-gray-500 tracking-widest">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-gray-200 transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      {link.href === '#' && (
                        <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-50 transition-opacity" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © 2025 TradeLoom. Built with precision and intelligence. Not SEBI registered.
          </p>
          <p className="text-xs text-gray-600">
            <span className="text-gray-500">Market data via</span>{' '}
            <span className="text-purple-400/60">Yahoo Finance · NSE · BSE</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
