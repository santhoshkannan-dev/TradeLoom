import { Cpu, TrendingUp, ShieldAlert, Sparkles } from 'lucide-react';

export default function Screenshots() {
  return (
    <section id="intelligence" className="py-20 border-t border-white/5 bg-[#0a0914]/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold text-purple-300 uppercase rounded-full">
            <Sparkles className="w-3 h-3 text-purple-400" /> Advanced Intelligence Modules
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Unified Portfolio Analytics</h2>
          <p className="text-gray-400 text-sm">
            Observe risk indices, scan market sentiment news, and explore AI recommendations in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Institutional Analysis</h3>
                <p className="text-[10px] text-gray-500">Gini-Diversity & correlation metrics</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl">
                <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-widest block mb-1">Gini Index</span>
                <span className="text-xl font-bold text-white">2.41</span>
                <span className="text-[10px] text-emerald-400 block mt-1">Excellent Diversification</span>
              </div>
              <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl">
                <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-widest block mb-1">Value-at-Risk</span>
                <span className="text-xl font-bold text-white">₹1,760</span>
                <span className="text-[10px] text-gray-500 block mt-1">95% Conf / Daily</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Sentiment Radar</h3>
                <p className="text-[10px] text-gray-500">FinBERT sentiment collections</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white">INFY</span>
                  <p className="text-[10px] text-gray-500 mt-0.5">Strong quarterly earnings</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Positive 91%</span>
              </div>

              <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white">TCS</span>
                  <p className="text-[10px] text-gray-500 mt-0.5">Sector margins contracted</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">Negative 74%</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Predictive Outlook</h3>
                <p className="text-[10px] text-gray-500">Historical volatility metrics</p>
              </div>
            </div>

            <div className="flex items-end justify-between h-28 px-4">
              <div className="w-8 bg-purple-500/20 h-12 rounded" />
              <div className="w-8 bg-purple-500/40 h-20 rounded" />
              <div className="w-8 bg-purple-500/80 h-28 rounded shadow-[0_0_15px_rgba(168,85,247,0.3)]" />
              <div className="w-8 bg-purple-500/50 h-16 rounded" />
              <div className="w-8 bg-purple-500/30 h-10 rounded" />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0f0d1e]/80 border border-white/5 space-y-6 relative">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                <span className="text-xs font-semibold text-white">TradeLoom AI</span>
              </div>
              <span className="text-[9px] font-mono text-purple-400 uppercase tracking-widest">Active</span>
            </div>

            <div className="space-y-4">
              <div className="text-right">
                <div className="inline-block p-3 rounded-2xl bg-purple-600 text-white text-xs max-w-[80%] rounded-tr-none">
                  Why did my portfolio drop today compared to the Nifty 50?
                </div>
              </div>

              <div className="text-left">
                <div className="inline-block p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-gray-300 text-xs max-w-[85%] rounded-tl-none leading-relaxed">
                  Today's decline is mainly due to **Infosys (-2.8%)** and **TCS (-1.5%)** dragging down your 34% IT sector weight, following a negative IT earnings outlook report.
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
