import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '₹0',
    period: '/month',
    description: 'Perfect for tracking your portfolio',
    features: ['2 Broker Connections', 'Basic P&L tracking', 'Standard Analytics', 'Daily market updates', 'Community support'],
    cta: 'Start Free',
    popular: false,
    ctaStyle: 'border border-white/10 text-gray-300 hover:text-white hover:bg-white/5',
  },
  {
    name: 'Pro',
    price: '₹2,400',
    period: '/month',
    description: 'Complete intelligence for serious investors',
    features: ['Unlimited Connections', 'AI Portfolio Advisor', 'FinBERT News Sentiment', 'Predictive Outlooks', 'Risk & VaR analysis', 'Real-time calculations', 'Priority support'],
    cta: 'Go Pro',
    popular: true,
    ctaStyle: 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_30px_rgba(139,92,246,0.35)]',
  },
  {
    name: 'Institutional',
    price: '₹14,900',
    period: '/month',
    description: 'Enterprise-grade for professionals',
    features: ['Everything in Pro', 'Daily Risk Reports (PDF)', 'White-label analytics', 'API Access tokens', 'Dedicated account manager', 'Custom broker adapters'],
    cta: 'Contact Sales',
    popular: false,
    ctaStyle: 'border border-white/10 text-gray-300 hover:text-white hover:bg-white/5',
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="pricing" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute inset-0 bg-[#030208]" style={{ opacity: 0.5 }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/8 rounded-full blur-[120px]" />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-5">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[11px] font-bold text-purple-300 uppercase tracking-wider"
          >
            <Zap className="w-3 h-3" />
            Precision-Tiered Plans
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Intelligence Scaled
            <br />
            <span className="gradient-text">for Every Trader</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-gray-400 leading-relaxed"
          >
            Start for free. Upgrade when you're ready for institutional intelligence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex flex-col p-7 rounded-2xl border transition-all ${
                plan.popular
                  ? 'bg-[#0f0d1e] border-purple-500/40 shadow-[0_0_60px_rgba(139,92,246,0.15)]'
                  : 'glass-card border-white/5'
              }`}
            >
              {/* Top shimmer line for popular */}
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
              )}

              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-purple-600 text-[10px] font-bold text-white uppercase tracking-wider shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="space-y-2 mb-6">
                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                <p className="text-[12px] text-gray-500">{plan.description}</p>
              </div>

              <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-white/5">
                <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                <span className="text-sm text-gray-500">{plan.period}</span>
              </div>

              <ul className="space-y-3 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-sm text-gray-400">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      plan.popular ? 'border-purple-500/40 bg-purple-500/10' : 'border-white/10 bg-white/5'
                    }`}>
                      <Check className={`w-2.5 h-2.5 ${plan.popular ? 'text-purple-400' : 'text-gray-400'}`} />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link
                  to="/register"
                  className={`block w-full text-center py-3 rounded-xl text-sm font-bold transition-all ${plan.ctaStyle}`}
                >
                  {plan.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-gray-600"
        >
          All plans include 14-day free trial. No credit card required. Cancel anytime.
        </motion.p>
      </div>
    </section>
  );
}
