import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, TrendingUp, TrendingDown, Activity, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Container } from '../../../components/ui/Container';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { fadeUp, staggerContainer } from '../../../lib/animations';

interface StockTicker {
  symbol: string;
  name: string;
  price: number;
  change: number;
  isUp: boolean;
  history: number[];
}

export default function Hero() {
  // Live stock state simulator
  const [stocks, setStocks] = useState<StockTicker[]>([
    { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3892.40, change: 1.45, isUp: true, history: [3850, 3865, 3860, 3880, 3892] },
    { symbol: 'INFY', name: 'Infosys Limited', price: 1689.15, change: -0.38, isUp: false, history: [1700, 1695, 1698, 1690, 1689] },
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2748.90, change: 2.12, isUp: true, history: [2690, 2710, 2725, 2738, 2748] },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1562.30, change: 0.84, isUp: true, history: [1545, 1550, 1555, 1558, 1562] },
  ]);

  const [activeTab, setActiveTab] = useState<'holdings' | 'trades' | 'allocations'>('holdings');
  const [portfolioVal, setPortfolioVal] = useState(1243200);
  const [recentFlash, setRecentFlash] = useState<string | null>(null);

  // Live price tick simulation every 2.5s
  useEffect(() => {
    const interval = setInterval(() => {
      const targetIndex = Math.floor(Math.random() * stocks.length);
      const deltaPercent = (Math.random() * 0.8 - 0.35); // -0.35% to +0.45%
      
      setStocks((prev) =>
        prev.map((stock, i) => {
          if (i !== targetIndex) return stock;
          const newPrice = Number((stock.price * (1 + deltaPercent / 100)).toFixed(2));
          const isUp = newPrice >= stock.price;
          const newChange = Number((stock.change + deltaPercent).toFixed(2));
          return {
            ...stock,
            price: newPrice,
            change: newChange,
            isUp,
            history: [...stock.history.slice(1), newPrice],
          };
        })
      );

      setPortfolioVal((prev) => Math.round(prev * (1 + (Math.random() * 0.2 - 0.08) / 100)));
      setRecentFlash(stocks[targetIndex].symbol);

      setTimeout(() => setRecentFlash(null), 1200);
    }, 2500);

    return () => clearInterval(interval);
  }, [stocks]);

  return (
    <section className="relative pt-12 pb-24 md:pt-24 md:pb-36 overflow-hidden">
      <Container className="text-center relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8 max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="inline-block">
            <Badge variant="green" dot>
              Live Data Normalization Active
            </Badge>
          </motion.div>

          {/* Title */}
          <motion.h1 
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[1.08]"
          >
            Master Your <span className="text-gradient-purple">Market.</span> All of it.
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={fadeUp}
            className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-normal leading-relaxed"
          >
            Unify Zerodha, Groww, Angel One, and manual alternative assets into one AI-powered source of truth. Advanced institutional analytics for the modern retail sovereign.
          </motion.p>

          {/* Actions */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link to="/register">
              <Button size="lg" className="px-8 py-4">Connect Your Brokers</Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="lg" className="flex items-center gap-2 px-7 py-4">
                <Play className="w-4 h-4 fill-purple-400 text-purple-400" />
                View Demo
              </Button>
            </Link>
          </motion.div>

          {/* Computer System Mockup with Animated Stocks */}
          <motion.div variants={fadeUp} className="pt-10 max-w-5xl mx-auto">
            <div className="relative p-3 md:p-4 rounded-3xl bg-[#0e0d22]/90 border border-white/15 shadow-[0_30px_100px_rgba(168,85,247,0.18)] backdrop-blur-2xl transition-all">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />

              {/* Monitor Screen Frame */}
              <div className="bg-[#080718] rounded-2xl border border-white/10 p-4 md:p-6 overflow-hidden relative text-left">
                
                {/* Screen Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-white font-bold tracking-tight text-sm ml-2">TradeLoom Workstation</span>
                  </div>

                  {/* Live Marquee Ticker */}
                  <div className="hidden lg:flex items-center gap-4 bg-[#12102b] border border-white/10 px-3 py-1.5 rounded-xl text-[11px]">
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      NIFTY 50 <span className="font-mono">24,380.20 (+0.72%)</span>
                    </span>
                    <span className="text-gray-600">|</span>
                    <span className="text-purple-300 font-bold flex items-center gap-1">
                      SENSEX <span className="font-mono">79,940.50 (+0.64%)</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-emerald-400 font-semibold text-[11px] uppercase tracking-wider">Engine Online</span>
                  </div>
                </div>

                {/* Main Screen Layout Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  
                  {/* Left Sidebar Console Menu */}
                  <div className="hidden md:flex flex-col gap-2 p-3 bg-[#110f2c]/60 border border-white/5 rounded-2xl text-xs text-gray-400">
                    <div className="text-white font-semibold pb-2 border-b border-white/5 flex items-center justify-between">
                      <span>Console</span>
                      <Activity className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                    </div>
                    <button 
                      onClick={() => setActiveTab('holdings')}
                      className={`px-3 py-2 rounded-xl text-left font-medium transition-all ${activeTab === 'holdings' ? 'text-purple-300 bg-purple-500/20 border border-purple-500/30' : 'hover:text-white hover:bg-white/5'}`}
                    >
                      Holdings Feed
                    </button>
                    <button 
                      onClick={() => setActiveTab('trades')}
                      className={`px-3 py-2 rounded-xl text-left font-medium transition-all ${activeTab === 'trades' ? 'text-purple-300 bg-purple-500/20 border border-purple-500/30' : 'hover:text-white hover:bg-white/5'}`}
                    >
                      Live Orders
                    </button>
                    <button 
                      onClick={() => setActiveTab('allocations')}
                      className={`px-3 py-2 rounded-xl text-left font-medium transition-all ${activeTab === 'allocations' ? 'text-purple-300 bg-purple-500/20 border border-purple-500/30' : 'hover:text-white hover:bg-white/5'}`}
                    >
                      Allocations
                    </button>

                    <div className="mt-auto pt-4 border-t border-white/5 text-[10px] space-y-1 text-gray-500">
                      <div>Broker API: <span className="text-emerald-400 font-mono">Connected</span></div>
                      <div>Latency: <span className="text-white font-mono">14ms</span></div>
                    </div>
                  </div>

                  {/* Main Workstation Screen */}
                  <div className="md:col-span-3 space-y-4">
                    
                    {/* Valuation Banner + TradeLoom Orb */}
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-[#17143c] via-[#12102e] to-[#0d0c24] border border-purple-500/25 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-semibold text-purple-300/80 tracking-wider">Live Portfolio Valuation</span>
                        <div className="text-3xl md:text-4xl font-extrabold text-white font-mono flex items-center gap-3">
                          ₹{portfolioVal.toLocaleString('en-IN')}
                          <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full flex items-center gap-1 font-sans">
                            <TrendingUp className="w-3.5 h-3.5" /> +4.12%
                          </span>
                        </div>
                      </div>

                      {/* TradeLoom Data Pulse Orb */}
                      <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                        <div className="absolute inset-0 bg-purple-500/40 rounded-full blur-xl animate-pulse" />
                        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 p-[1px] shadow-[0_0_25px_rgba(168,85,247,0.7)]">
                          <div className="w-full h-full bg-[#080718] rounded-full flex flex-col items-center justify-center text-center">
                            <span className="text-[8px] font-extrabold text-white tracking-widest uppercase">TradeLoom</span>
                            <span className="text-[7px] text-cyan-400 font-mono">LIVE SYNC</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Animated Stocks Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Holdings & Real-Time Prices */}
                      <div className="p-4 bg-[#110f2c]/70 border border-white/10 rounded-2xl space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b border-white/10">
                          <span className="text-xs font-bold text-white uppercase tracking-wider">Live Stock Feed</span>
                          <span className="text-[10px] text-gray-400">Updates: <span className="text-purple-400 font-mono">Realtime</span></span>
                        </div>

                        <div className="space-y-2">
                          {stocks.map((stock) => {
                            const isFlashing = recentFlash === stock.symbol;
                            return (
                              <motion.div
                                key={stock.symbol}
                                animate={{
                                  backgroundColor: isFlashing 
                                    ? (stock.isUp ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)')
                                    : 'rgba(255, 255, 255, 0.02)'
                                }}
                                transition={{ duration: 0.4 }}
                                className="p-2.5 rounded-xl border border-white/5 flex items-center justify-between text-xs"
                              >
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-white">{stock.symbol}</span>
                                    {stock.isUp ? (
                                      <TrendingUp className="w-3 h-3 text-emerald-400" />
                                    ) : (
                                      <TrendingDown className="w-3 h-3 text-rose-400" />
                                    )}
                                  </div>
                                  <span className="text-[10px] text-gray-400">{stock.name}</span>
                                </div>

                                <div className="text-right">
                                  <div className="font-mono font-bold text-white">₹{stock.price.toFixed(2)}</div>
                                  <div className={`text-[10px] font-semibold ${stock.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {stock.isUp ? '+' : ''}{stock.change}%
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Live Market Performance Graph */}
                      <div className="p-4 bg-[#110f2c]/70 border border-white/10 rounded-2xl space-y-3 flex flex-col justify-between">
                        <div className="flex justify-between items-center pb-2 border-b border-white/10">
                          <span className="text-xs font-bold text-white uppercase tracking-wider">Performance Wave</span>
                          <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                            +12.4% YTD
                          </span>
                        </div>

                        {/* Animated SVG Sparkline Chart */}
                        <div className="relative h-28 w-full flex items-end pt-2">
                          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="gradientWave" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                              </linearGradient>
                            </defs>
                            <path
                              d="M0 30 Q 20 10, 40 22 T 80 8 T 100 15 L 100 40 L 0 40 Z"
                              fill="url(#gradientWave)"
                            />
                            <motion.path
                              d="M0 30 Q 20 10, 40 22 T 80 8 T 100 15"
                              fill="none"
                              stroke="#c084fc"
                              strokeWidth="2"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 2, ease: "easeInOut" }}
                            />
                          </svg>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                          <div className="p-2 bg-white/5 rounded-xl border border-white/5">
                            <span className="text-gray-400 block text-[10px]">Sharpe Ratio</span>
                            <span className="font-bold text-white font-mono">2.41</span>
                          </div>
                          <div className="p-2 bg-white/5 rounded-xl border border-white/5">
                            <span className="text-gray-400 block text-[10px]">Max Drawdown</span>
                            <span className="font-bold text-emerald-400 font-mono">-4.2%</span>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </div>
          </motion.div>

        </motion.div>
      </Container>
    </section>
  );
}
