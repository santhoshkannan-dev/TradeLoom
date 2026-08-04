import { Link } from 'react-router-dom';
import { ArrowRight, Play, Briefcase, TrendingUp, ShieldAlert, Cpu } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-32">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center space-y-8 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
          MULTI-BROKER NORMALIZATION ENGINE
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
          Master Your Market. <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">All of it.</span>
        </h1>

        <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto font-medium">
          Unify Zerodha, Groww, Angel One, and manual alternative assets into one AI-powered source of truth, advanced risk, and analytics for the retail sovereign.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to="/register"
            className="flex items-center gap-2 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 px-6 py-3.5 rounded-xl transition-all shadow-[0_0_25px_rgba(168,85,247,0.2)] border border-purple-500/30"
          >
            Connect Your Brokers <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 px-6 py-3.5 rounded-xl transition-all"
          >
            <Play className="w-4 h-4 text-purple-400 fill-purple-400/20" /> View Demo
          </Link>
        </div>

        <div className="pt-16 max-w-5xl mx-auto">
          <div className="relative bg-[#100e20]/60 border border-white/5 rounded-2xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
            
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/5">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-gray-600 uppercase">TradeLoom Console</span>
              <div className="w-10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl">
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest block mb-1">Portfolio Valuation</span>
                <span className="text-2xl font-bold text-white">₹12,45,000.00</span>
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs mt-2">
                  <TrendingUp className="w-3.5 h-3.5" /> +14.2% Return
                </div>
              </div>
              <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl">
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest block mb-1">Diversification Score</span>
                <span className="text-2xl font-bold text-white">82 <span className="text-xs text-gray-500">/ 100</span></span>
                <div className="flex items-center gap-1.5 text-purple-300 text-xs mt-2">
                  <Briefcase className="w-3.5 h-3.5" /> High Diversification
                </div>
              </div>
              <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl">
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest block mb-1">Risk Assessment</span>
                <span className="text-2xl font-bold text-white">Conservative</span>
                <div className="flex items-center gap-1.5 text-rose-400 text-xs mt-2">
                  <ShieldAlert className="w-3.5 h-3.5" /> Volatility Vol 12.8%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
