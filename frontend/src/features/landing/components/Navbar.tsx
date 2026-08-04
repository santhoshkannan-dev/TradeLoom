import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Menu, X, GitFork, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Features', href: '#features' },
    { label: 'AI Intelligence', href: '#ai' },
    { label: 'Analytics', href: '#analytics' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#05040f]/80 backdrop-blur-xl border-b border-white/5 shadow-[0_0_40px_rgba(0,0,0,0.5)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative p-2 rounded-xl bg-purple-600/10 border border-purple-500/20 group-hover:bg-purple-600/20 transition-all">
            <Cpu className="w-5 h-5 text-purple-400" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full border border-[#05040f] animate-pulse" />
          </div>
          <span className="font-bold text-white text-lg tracking-tight">TradeLoom</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/santhoshkannan-dev/TradeLoom"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-400 hover:text-white transition-all"
          >
            <GitFork className="w-4 h-4" />
            GitHub
          </a>
          <Link
            to="/register"
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] border border-purple-500/30"
          >
            Get Started <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-gray-400 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#05040f]/95 backdrop-blur-xl border-b border-white/5 px-6 pb-6 space-y-1"
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 space-y-3">
              <Link
                to="/login"
                className="block text-center px-4 py-2.5 text-sm font-medium text-gray-300 border border-white/10 rounded-xl hover:bg-white/5 transition-all"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="block text-center px-4 py-2.5 text-sm font-semibold text-white bg-purple-600 rounded-xl hover:bg-purple-500 transition-all"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
