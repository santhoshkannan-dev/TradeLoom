import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden bg-[#070714]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center space-y-8 relative z-10">
        
        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.15)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="tracking-wide uppercase text-[11px]">Live Data Normalization Active</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-5xl mx-auto">
          Master Your <span className="text-gradient-purple">Market.</span> All of it.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto font-normal leading-relaxed">
          Unify Zerodha, Groww, Angel One, and manual alternative assets into one AI-powered source of truth. Advanced institutional analytics for the modern retail sovereign.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            to="/register"
            className="px-8 py-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_30px_rgba(168,85,247,0.4)] border border-purple-400/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Connect Your Brokers
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm text-gray-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Play className="w-4 h-4 fill-purple-400 text-purple-400" />
            View Demo
          </Link>
        </div>

        {/* Desktop Display Monitor Mockup */}
        <div className="pt-12 max-w-5xl mx-auto">
          <div className="relative p-3 md:p-4 rounded-3xl bg-[#111026]/80 border border-white/15 shadow-[0_30px_100px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
            {/* Top Gloss Reflection */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />
            
            {/* Interior Screen Display */}
            <div className="bg-[#0b0a1a] rounded-2xl border border-white/10 p-4 md:p-6 overflow-hidden relative text-left">
              
              {/* Screen Top Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-white font-bold tracking-tight text-sm ml-2">TradeLoom</span>
                </div>
                <div className="bg-[#14122d] border border-white/10 px-3 py-1 rounded-lg text-gray-400 text-[11px] w-64 hidden sm:block">
                  Search tickers, portfolios, analytics...
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-gray-400 text-[11px]">System Online</span>
                </div>
              </div>

              {/* Grid Content inside Mock Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                
                {/* Left Mini Sidebar */}
                <div className="hidden md:flex flex-col gap-2 p-3 bg-[#121028]/60 border border-white/5 rounded-xl text-xs text-gray-400">
                  <div className="text-white font-semibold pb-2 border-b border-white/5">Console</div>
                  <div className="text-purple-300 bg-purple-500/10 px-2 py-1.5 rounded-lg border border-purple-500/20 font-medium">Dashboard</div>
                  <div className="hover:text-white px-2 py-1">Portfolio</div>
                  <div className="hover:text-white px-2 py-1">Holdings</div>
                  <div className="hover:text-white px-2 py-1">Analytics</div>
                  <div className="hover:text-white px-2 py-1">AI Advisor</div>
                  <div className="hover:text-white px-2 py-1">News Radar</div>
                </div>

                {/* Main Dashboard Area */}
                <div className="md:col-span-3 space-y-4">
                  
                  {/* Top Stats Banner with Glowing Orb */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-[#171436] to-[#121029] border border-purple-500/20 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">Total Portfolio Valuation</span>
                      <div className="text-2xl md:text-3xl font-extrabold text-white">
                        ₹18,023.45 <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full ml-2">+3.84%</span>
                      </div>
                    </div>

                    {/* Central Glowing TradeLoom Orb Graphic */}
                    <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                      <div className="absolute inset-0 bg-purple-600/30 rounded-full blur-xl animate-pulse" />
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-400 p-[1px] shadow-[0_0_20px_rgba(168,85,247,0.6)]">
                        <div className="w-full h-full bg-[#0b0a1a] rounded-full flex flex-col items-center justify-center text-center">
                          <span className="text-[9px] font-extrabold text-white tracking-widest uppercase">TradeLoom</span>
                          <span className="text-[7px] text-cyan-400 font-mono">72% AI Synced</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Performance & Allocation Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Top Holdings Widget */}
                    <div className="p-3 bg-[#121028]/60 border border-white/5 rounded-xl space-y-2 text-xs">
                      <div className="text-gray-400 font-semibold text-[11px] uppercase tracking-wider pb-1 border-b border-white/5">Top Holdings</div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-white font-medium">INFY</span>
                        <span className="text-emerald-400 font-mono">₹1,687 (+1.4%)</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-white font-medium">TCS</span>
                        <span className="text-rose-400 font-mono">₹3,842 (-0.5%)</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-white font-medium">HDFCBANK</span>
                        <span className="text-emerald-400 font-mono">₹1,540 (+0.8%)</span>
                      </div>
                    </div>

                    {/* Sector Allocation Widget */}
                    <div className="p-3 bg-[#121028]/60 border border-white/5 rounded-xl space-y-2 text-xs">
                      <div className="text-gray-400 font-semibold text-[11px] uppercase tracking-wider pb-1 border-b border-white/5">Asset Allocation</div>
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-gray-400">Equity</span>
                          <span className="text-white font-semibold">55%</span>
                        </div>
                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-purple-500 h-full rounded-full" style={{ width: '55%' }} />
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span className="text-gray-400">Mutual Funds</span>
                          <span className="text-white font-semibold">25%</span>
                        </div>
                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-indigo-500 h-full rounded-full" style={{ width: '25%' }} />
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
