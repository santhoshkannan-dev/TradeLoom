import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, BrainCircuit, BarChart3, Newspaper, Bell, Shuffle, TrendingUp, Shield, Zap } from 'lucide-react';

const features = [
  {
    icon: Briefcase,
    title: 'Unified Portfolio',
    description: 'Consolidate equity, mutual funds, ETFs, gold, and crypto from every broker into a single normalized view.',
    color: 'purple',
    stat: '10+ brokers',
  },
  {
    icon: BrainCircuit,
    title: 'AI Portfolio Advisor',
    description: 'Ask natural language questions. Get intelligent answers grounded in your actual portfolio data and live market news.',
    color: 'indigo',
    stat: 'GPT-4 powered',
  },
  {
    icon: BarChart3,
    title: 'Risk Analytics',
    description: 'Sharpe ratio, Beta, VaR, Max Drawdown, and diversification scores. Institutional metrics at retail prices.',
    color: 'violet',
    stat: '12+ metrics',
  },
  {
    icon: Newspaper,
    title: 'News Intelligence',
    description: 'FinBERT-powered sentiment analysis on financial headlines mapped directly to your holdings.',
    color: 'purple',
    stat: 'Real-time',
  },
  {
    icon: Bell,
    title: 'Smart Alerts',
    description: 'Get notified when allocations drift, sentiment spikes, or risk thresholds are crossed — automatically.',
    color: 'indigo',
    stat: 'Instant',
  },
  {
    icon: Shuffle,
    title: 'Multi-Broker Sync',
    description: 'Import CSV exports from Zerodha, Groww, Angel One, and more. Auto-parsed and normalized in seconds.',
    color: 'violet',
    stat: 'Zerodha, Groww +',
  },
];

const colorMap: Record<string, string> = {
  purple: 'from-purple-600/20 to-purple-600/5 border-purple-500/20 text-purple-400 bg-purple-500/10',
  indigo: 'from-indigo-600/20 to-indigo-600/5 border-indigo-500/20 text-indigo-400 bg-indigo-500/10',
  violet: 'from-violet-600/20 to-violet-600/5 border-violet-500/20 text-violet-400 bg-violet-500/10',
};

function FeatureCard({ feat, i }: { feat: typeof features[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const Icon = feat.icon;
  const c = colorMap[feat.color];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative p-6 rounded-2xl glass-card-hover overflow-hidden"
    >
      {/* Top gradient line on hover */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/0 group-hover:via-purple-500/50 to-transparent transition-all duration-500" />

      <div className={`inline-flex p-3 rounded-xl border mb-5 ${c.split(' ').slice(2).join(' ')}`}>
        <Icon className="w-5 h-5" />
      </div>

      <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed mb-4">{feat.description}</p>

      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-600">{feat.stat}</span>
        <div className={`w-6 h-6 rounded-full border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all ${c.split(' ').slice(2).join(' ')}`}>
          <TrendingUp className="w-3 h-3" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="features" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-16">
        <div ref={ref} className="text-center max-w-2xl mx-auto space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[11px] font-bold text-purple-300 uppercase tracking-wider">
              <Zap className="w-3 h-3" />
              Everything You Need
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Institutional Intelligence
            <br />
            <span className="gradient-text">for Everyone</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-400 leading-relaxed"
          >
            TradeLoom brings enterprise-grade portfolio intelligence to individual investors.
            No spreadsheets. No tab-switching. One intelligent dashboard.
          </motion.p>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-3 gap-6 max-w-2xl mx-auto"
        >
          {[
            { label: 'Assets Normalized', value: '1M+', icon: Shield },
            { label: 'Under Analysis', value: '₹82B+', icon: BarChart3 },
            { label: 'Analyst Rating', value: '4.8/5', icon: TrendingUp },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="text-center p-5 rounded-2xl glass-card">
              <p className="text-2xl md:text-3xl font-extrabold text-white">{value}</p>
              <p className="text-[10px] uppercase tracking-widest font-semibold text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, i) => (
            <FeatureCard key={feat.title} feat={feat} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
