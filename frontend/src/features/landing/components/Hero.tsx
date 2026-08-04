import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, GitFork, TrendingUp, TrendingDown, ShieldCheck, BarChart3, Cpu } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

function MiniChart() {
  const points = [30, 50, 40, 65, 55, 80, 70, 90, 75, 95];
  const max = Math.max(...points);
  const min = Math.min(...points);
  const normalize = (v: number) => ((v - min) / (max - min)) * 50;
  const pts = points.map((v, i) => `${(i / (points.length - 1)) * 180},${55 - normalize(v)}`).join(' ');

  return (
    <svg viewBox="0 0 180 60" className="w-full h-12" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={`0,60 ${pts} 180,60`}
        fill="url(#chartGrad)"
        stroke="none"
      />
      <polyline
        points={pts}
        fill="none"
        stroke="#a78bfa"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DashboardPreviewCard() {
  const holdings = [
    { symbol: 'INFY', name: 'Infosys', value: '₹3,45,200', change: '+2.4%', up: true },
    { symbol: 'TCS', name: 'Tata Consult.', value: '₹2,18,900', change: '-0.8%', up: false },
    { symbol: 'RELIANCE', name: 'Reliance Ind.', value: '₹1,89,400', change: '+1.1%', up: true },
    { symbol: 'HDFCBANK', name: 'HDFC Bank', value: '₹1,24,800', change: '+0.5%', up: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Glow behind card */}
      <div className="absolute -inset-4 bg-purple-600/10 rounded-3xl blur-3xl" />

      <div className="relative glass-card rounded-2xl overflow-hidden border border-white/8">
        {/* Window chrome */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/5">
            <Cpu className="w-3 h-3 text-purple-400" />
            <span className="text-[10px] font-mono text-gray-400">TradeLoom Console</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-gray-500">LIVE</span>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Summary row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <p className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">Portfolio</p>
              <p className="text-lg font-bold text-white mt-1">₹12,43,200</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-emerald-400" />
                <span className="text-[10px] text-emerald-400 font-semibold">+2.45%</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <p className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">Risk Score</p>
              <p className="text-lg font-bold text-purple-300 mt-1">72/100</p>
              <p className="text-[10px] text-gray-500 mt-1">Moderate Risk</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <p className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">Today P/L</p>
              <p className="text-lg font-bold text-emerald-400 mt-1">+₹14,520</p>
              <p className="text-[10px] text-gray-500 mt-1">+1.18% today</p>
            </div>
          </div>

          {/* Mini chart */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold text-gray-400">30D Growth Curve</span>
              <span className="text-[10px] text-emerald-400 font-bold">+14.2%</span>
            </div>
            <MiniChart />
          </div>

          {/* Holdings */}
          <div className="space-y-1.5">
            <p className="text-[9px] uppercase font-bold text-gray-500 tracking-wider px-1">Top Holdings</p>
            {holdings.map((h) => (
              <div key={h.symbol} className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 transition-all">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                    <span className="text-[9px] font-bold text-purple-400">{h.symbol.slice(0, 2)}</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">{h.symbol}</p>
                    <p className="text-[9px] text-gray-500">{h.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-white">{h.value}</p>
                  <p className={`text-[10px] font-semibold ${h.up ? 'text-emerald-400' : 'text-rose-400'}`}>{h.change}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/6 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-900/5 rounded-full blur-[150px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(167,139,250,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Copy */}
        <div className="space-y-8">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
              AI-Powered Portfolio Intelligence
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight"
          >
            Master Your{' '}
            <span className="gradient-text">Market.</span>
            <br />
            All of it.
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-lg text-gray-400 leading-relaxed max-w-lg"
          >
            Unify Zerodha, Groww, Angel One, and alternative assets into one
            AI-powered source of truth. Institutional analytics for the modern retail sovereign.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/register"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-purple-600 hover:bg-purple-500 transition-all shadow-[0_0_30px_rgba(139,92,246,0.35)] border border-purple-500/30 group"
            >
              Connect Your Brokers
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://github.com/santhoshkannan-dev/TradeLoom"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-gray-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 transition-all"
            >
              <GitFork className="w-4 h-4" />
              View Demo
            </a>
          </motion.div>

          {/* Social proof pills */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center gap-6 pt-2"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {['#8b5cf6', '#6366f1', '#ec4899', '#f59e0b'].map((c, i) => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-[#05040f]" style={{ background: c }} />
                ))}
              </div>
              <span className="text-xs text-gray-400 font-medium">1,200+ portfolios managed</span>
            </div>
            <div className="flex items-center gap-1.5">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              ))}
              <span className="text-xs text-gray-400 font-medium ml-1">4.9/5 rating</span>
            </div>
          </motion.div>
        </div>

        {/* Right: Dashboard Preview */}
        <div className="relative">
          <DashboardPreviewCard />

          {/* Floating badges */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute -left-6 top-1/3 glass-card rounded-xl p-3 border border-emerald-500/20 shadow-[0_0_20px_rgba(52,211,153,0.1)]"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <div>
                <p className="text-[10px] font-bold text-white">Risk Analyzed</p>
                <p className="text-[9px] text-gray-500">Score: 72/100</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="absolute -right-4 bottom-1/4 glass-card rounded-xl p-3 border border-purple-500/20 shadow-[0_0_20px_rgba(139,92,246,0.1)]"
          >
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-purple-400" />
              <div>
                <p className="text-[10px] font-bold text-white">AI Insight Ready</p>
                <p className="text-[9px] text-gray-500">3 alerts found</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-purple-500/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
