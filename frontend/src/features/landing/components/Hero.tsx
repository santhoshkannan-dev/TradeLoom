import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Container } from '../../../components/ui/Container';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { fadeUp, staggerContainer } from '../../../lib/animations';

export default function Hero() {
  return (
    <section className="relative pt-12 pb-24 md:pt-24 md:pb-32 overflow-hidden">
      <Container className="text-center relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8 max-w-5xl mx-auto"
        >
          <motion.div variants={fadeUp} className="inline-block">
            <Badge variant="green" dot>
              Live Data Normalization Active
            </Badge>
          </motion.div>

          <motion.h1 
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[1.08]"
          >
            Master Your <span className="text-gradient-purple">Market.</span> All of it.
          </motion.h1>

          <motion.p 
            variants={fadeUp}
            className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-normal leading-relaxed"
          >
            Unify Zerodha, Groww, Angel One, and manual alternative assets into one AI-powered source of truth. Advanced institutional analytics for the modern retail sovereign.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link to="/register">
              <Button size="lg">Connect Your Brokers</Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="lg" className="flex items-center gap-2">
                <Play className="w-4 h-4 fill-purple-400 text-purple-400" />
                View Demo
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="pt-12 max-w-5xl mx-auto">
            <div className="relative p-3 md:p-4 rounded-3xl bg-[#0f0e20]/80 border border-white/15 shadow-[0_30px_100px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />
              
              <div className="bg-[#0b0a1a] rounded-2xl border border-white/10 p-4 md:p-6 overflow-hidden relative text-left">
                
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-white font-bold tracking-tight text-sm ml-2">TradeLoom Console</span>
                  </div>
                  <div className="bg-[#14122d] border border-white/10 px-3 py-1 rounded-lg text-gray-400 text-[11px] w-64 hidden sm:block">
                    Search tickers, portfolios, analytics...
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-gray-400 text-[11px]">System Online</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="hidden md:flex flex-col gap-2 p-3 bg-[#121028]/60 border border-white/5 rounded-xl text-xs text-gray-400">
                    <div className="text-white font-semibold pb-2 border-b border-white/5">Console</div>
                    <div className="text-purple-300 bg-purple-500/10 px-2 py-1.5 rounded-lg border border-purple-500/20 font-medium">Dashboard</div>
                    <div className="hover:text-white px-2 py-1">Portfolio</div>
                    <div className="hover:text-white px-2 py-1">Holdings</div>
                    <div className="hover:text-white px-2 py-1">Analytics</div>
                    <div className="hover:text-white px-2 py-1">AI Advisor</div>
                  </div>

                  <div className="md:col-span-3 space-y-4">
                    <div className="p-4 rounded-xl bg-gradient-to-r from-[#171436] to-[#121029] border border-purple-500/20 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">Total Portfolio Valuation</span>
                        <div className="text-2xl md:text-3xl font-extrabold text-white">
                          ₹18,023.45 <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full ml-2">+3.84%</span>
                        </div>
                      </div>

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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          </motion.div>

        </motion.div>
      </Container>
    </section>
  );
}
