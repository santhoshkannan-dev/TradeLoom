import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How does TradeLoom connect to my broker?',
    a: 'TradeLoom supports two import methods: (1) CSV uploads from Zerodha Console, Groww, and Angel One — just download your transaction history and upload it. (2) Direct API integration for supported brokers, which syncs your holdings automatically.',
  },
  {
    q: 'Is my financial data secure?',
    a: 'Absolutely. TradeLoom uses bank-grade AES-256 encryption for all stored data. We never store your broker login credentials. API tokens are encrypted at rest. Your data is never sold or shared with third parties.',
  },
  {
    q: 'How accurate is the AI Portfolio Advisor?',
    a: "The AI Advisor is powered by GPT-4 and grounded exclusively in your portfolio data, live Yahoo Finance prices, and FinBERT-analyzed news. It cannot access external financial advice or speculate beyond your actual data — ensuring every response is factual and portfolio-specific.",
  },
  {
    q: 'What assets does TradeLoom support?',
    a: 'TradeLoom supports Indian equities (NSE/BSE), mutual funds, ETFs, F&O positions, and international stocks. Crypto and gold tracking are on the roadmap for Q3 2025.',
  },
  {
    q: 'Can I use TradeLoom if I have multiple brokers?',
    a: 'Yes — multi-broker support is our core strength. You can link Zerodha, Groww, Angel One, ICICI Direct, and Upstox accounts simultaneously. TradeLoom de-duplicates holdings and gives you a unified view across all accounts.',
  },
];

function FAQItem({ faq, i }: { faq: typeof faqs[0]; i: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.07 }}
      className="border border-white/5 rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/[0.02] transition-all"
      >
        <span className="text-sm font-semibold text-white">{faq.q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-4 h-4 text-gray-500 shrink-0 ml-4" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="px-6 pb-5 text-sm text-gray-400 leading-relaxed">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="faq" className="relative py-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <div ref={ref} className="max-w-3xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Frequently Asked
            <br />
            <span className="gradient-text">Questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-gray-400"
          >
            Everything you need to know about TradeLoom.
          </motion.p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
