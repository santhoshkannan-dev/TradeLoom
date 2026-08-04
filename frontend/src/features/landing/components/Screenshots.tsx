import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, TrendingDown, BarChart3, Shield, Activity, Zap } from 'lucide-react';

function MiniBarChart({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(...values);
  return (
    <div className="flex items-end gap-1 h-16">
      {values.map((v, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${(v / max) * 100}%` }}
          transition={{ delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 rounded-sm"
          style={{ background: color, opacity: 0.3 + (v / max) * 0.7 }}
        />
      ))}
    </div>
  );
}

function SentimentBar({ label, positive, neutral, negative }: { label: string; positive: number; neutral: number; negative: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs">
        <span className="font-semibold text-white">{label}</span>
        <div className="flex gap-3">
          <span className="text-emerald-400 font-bold">{positive}%</span>
          <span className="text-gray-500">{neutral}%</span>
          <span className="text-rose-400 font-bold">{negative}%</span>
        </div>
      </div>
      <div className="flex h-1.5 rounded-full overflow-hidden gap-0.5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${positive}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-emerald-500 rounded-full"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${neutral}%` }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-gray-600 rounded-full"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${negative}%` }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-rose-500 rounded-full"
        />
      </div>
    </div>
  );
}

export default function Screenshots() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const metrics = [
    { label: 'Sharpe Ratio', value: '1.82', sub: 'Excellent', color: 'emerald', up: true },
    { label: 'Max Drawdown', value: '-8.4%', sub: 'Controlled', color: 'amber', up: false },
    { label: 'Beta (Nifty50)', value: '0.76', sub: 'Low Beta', color: 'purple', up: true },
    { label: 'VaR (95%)', value: '₹1,760', sub: 'Daily Risk', color: 'rose', up: false },
  ];

  return (
    <section id="analytics" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-purple-900/8 rounded-full blur-[100px]" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-5">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-[11px] font-bold text-violet-300 uppercase tracking-wider"
          >
            <Activity className="w-3 h-3" />
            Advanced Risk Analytics
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Institutional-Grade
            <br />
            <span className="gradient-text">Risk Intelligence</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-gray-400 leading-relaxed"
          >
            From Sharpe Ratio to Maximum Drawdown, TradeLoom calculates the metrics that hedge funds use — on your portfolio.
          </motion.p>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="p-5 rounded-2xl glass-card-hover text-center"
            >
              <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">{m.label}</p>
              <p className={`text-2xl font-extrabold mt-2 text-${m.color}-400`}>{m.value}</p>
              <p className="text-[10px] text-gray-500 mt-1">{m.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Two panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Institutional Analysis */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="p-6 rounded-2xl glass-card space-y-5"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <BarChart3 className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Predictive Outlook</h3>
                <p className="text-[11px] text-gray-500">Portfolio performance projections</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Gini Index</p>
                <p className="text-xl font-extrabold text-white mt-1">2.41</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  <span className="text-[10px] text-emerald-400 font-semibold">Excellent diversification</span>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Daily VaR</p>
                <p className="text-xl font-extrabold text-rose-400 mt-1">-₹1,240</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="w-3 h-3 text-rose-400" />
                  <span className="text-[10px] text-rose-400 font-semibold">At 95% confidence</span>
                </div>
              </div>
            </div>

            <MiniBarChart values={[40, 65, 55, 80, 60, 90, 72, 85, 70, 95, 78, 100]} color="#a78bfa" />
          </motion.div>

          {/* Sentiment Radar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="p-6 rounded-2xl glass-card space-y-5"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <Shield className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Sentiment Radar</h3>
                <p className="text-[11px] text-gray-500">FinBERT NLP · real-time news scoring</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3 text-[10px] font-bold uppercase tracking-widest">
                <span className="text-emerald-400">● Positive</span>
                <span className="text-gray-500">● Neutral</span>
                <span className="text-rose-400">● Negative</span>
              </div>

              {[
                { label: 'INFY', positive: 72, neutral: 18, negative: 10 },
                { label: 'TCS', positive: 34, neutral: 26, negative: 40 },
                { label: 'RELIANCE', positive: 61, neutral: 24, negative: 15 },
                { label: 'HDFCBANK', positive: 55, neutral: 30, negative: 15 },
              ].map((s) => (
                <SentimentBar key={s.label} {...s} />
              ))}
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] text-gray-500">Portfolio Sentiment Score</span>
              <span className="text-sm font-extrabold text-emerald-400">+63% Positive</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
