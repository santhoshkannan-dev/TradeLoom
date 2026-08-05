import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layers, Bot, ShieldCheck, TrendingUp, CheckCircle2 } from 'lucide-react';

export function AuthSidebar() {
  const highlights = [
    {
      title: 'Unified Portfolio',
      desc: 'Seamlessly normalize Zerodha, Groww, Angel One, and manual assets.',
      icon: Layers,
    },
    {
      title: 'AI Portfolio Insights',
      desc: 'FinBERT neural sentiment processing and predictive risk analytics.',
      icon: Bot,
    },
    {
      title: 'Enterprise Security',
      desc: 'Institutional-grade encryption with read-only OAuth API permissions.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="hidden lg:flex flex-col justify-between p-10 bg-[#070b19]/80 border-r border-white/10 relative overflow-hidden backdrop-blur-2xl">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Brand Header */}
      <div className="relative z-10 space-y-6">
        <Link to="/" className="inline-flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 p-[1px] shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            <div className="w-full h-full bg-[#070b19] rounded-[11px] flex items-center justify-center">
              <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight text-white font-sans">TradeLoom</span>
        </Link>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
            Institutional <span className="text-gradient-purple">Modern Intelligence.</span>
          </h1>
          <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
            One intelligent source of truth for your entire wealth portfolio.
          </p>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="relative z-10 space-y-4 my-8">
        {highlights.map((h, i) => {
          const IconComp = h.icon;
          return (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i + 0.2 }}
              className="p-4 rounded-2xl bg-[#0f152d]/60 border border-white/5 backdrop-blur-md flex items-start gap-3.5 hover:border-purple-500/30 transition-all"
            >
              <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20 shrink-0">
                <IconComp className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  {h.title} <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                </h4>
                <p className="text-[11px] text-gray-400 leading-normal">{h.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Testimonial / System Status Badge */}
      <div className="relative z-10 p-4 rounded-2xl bg-gradient-to-r from-purple-950/30 to-indigo-950/30 border border-purple-500/20 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-gray-300 font-medium text-[11px]">Normalizing 1M+ Holdings</span>
        </div>
        <span className="text-[10px] font-mono text-purple-300 font-semibold bg-purple-500/20 px-2 py-0.5 rounded-full">
          256-bit SSL
        </span>
      </div>
    </div>
  );
}
