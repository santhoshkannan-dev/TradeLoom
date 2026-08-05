import { Activity, Radio, BarChart2, Bot, Send } from 'lucide-react';

export default function Screenshots() {
  return (
    <section id="intelligence" className="py-24 border-t border-white/10 bg-[#070714] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Institutional Intelligence</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Advanced analytics, neural sentiment collection, and conversational AI built directly into your portfolio.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Card 1: Institutional Analysis */}
          <div className="p-8 rounded-3xl glass-card space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Institutional Analysis</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Access professional metrics like Sharpe Ratio, Value at Risk (VaR), and Beta correlations usually reserved for hedge fund managers.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#121028]/80 border border-white/10 rounded-2xl">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1">Sharpe Ratio</span>
                <span className="text-2xl font-extrabold text-white">2.41</span>
              </div>
              <div className="p-4 bg-[#121028]/80 border border-white/10 rounded-2xl">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1">VaR (95%)</span>
                <span className="text-2xl font-extrabold text-rose-400">-$1,240</span>
              </div>
            </div>

            {/* Sparkline Graph Graphic */}
            <div className="w-full h-12 pt-2 flex items-end gap-1">
              <div className="w-full bg-purple-500/20 h-4 rounded-t" />
              <div className="w-full bg-purple-500/30 h-6 rounded-t" />
              <div className="w-full bg-purple-500/50 h-8 rounded-t" />
              <div className="w-full bg-purple-500/40 h-5 rounded-t" />
              <div className="w-full bg-purple-500/70 h-10 rounded-t" />
              <div className="w-full bg-purple-500/90 h-12 rounded-t shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
            </div>
          </div>

          {/* Card 2: Sentiment Radar */}
          <div className="p-8 rounded-3xl glass-card space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20">
                  <Radio className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Sentiment Radar</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Harnessing FinBERT neural networks to process global news into real-time sentiment posture of market asset classes.
              </p>
            </div>

            {/* Sentiment Meter Bar */}
            <div className="space-y-3 pt-4">
              <div className="flex justify-between text-xs text-gray-400 uppercase font-semibold text-[10px] tracking-wider">
                <span className="text-emerald-400">Positive 65%</span>
                <span className="text-gray-400">Neutral 25%</span>
                <span className="text-rose-400">Negative 10%</span>
              </div>
              <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden flex">
                <div className="bg-emerald-500 h-full w-[65%]" />
                <div className="bg-indigo-500 h-full w-[25%]" />
                <div className="bg-rose-500 h-full w-[10%]" />
              </div>
            </div>

            <div className="p-3 bg-[#121028]/60 border border-white/10 rounded-2xl text-xs text-gray-400 flex items-center justify-between">
              <span>Latest FinBERT scan:</span>
              <span className="text-emerald-400 font-semibold">Strong Bullish Posture</span>
            </div>
          </div>

          {/* Card 3: Predictive Outlook */}
          <div className="p-8 rounded-3xl glass-card space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
                  <BarChart2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Predictive Outlook</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                AI-driven 14-day directional forecasts with dynamic confidence gauges based on historical volatility patterns.
              </p>
            </div>

            {/* Bar Chart Graphic */}
            <div className="flex items-end justify-between h-32 px-4 gap-2 pt-2">
              <div className="w-full bg-emerald-500/20 h-12 rounded-t" />
              <div className="w-full bg-emerald-500/30 h-16 rounded-t" />
              <div className="w-full bg-emerald-500/40 h-20 rounded-t" />
              <div className="w-full bg-emerald-500/90 h-28 rounded-t relative flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                <span className="text-[9px] font-bold text-black bg-emerald-300 px-1 rounded absolute -top-4">88%</span>
              </div>
              <div className="w-full bg-emerald-500/30 h-14 rounded-t" />
            </div>
          </div>

          {/* Card 4: TradeLoom AI */}
          <div className="p-8 rounded-3xl glass-card space-y-6 flex flex-col justify-between relative">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">TradeLoom AI</h3>
            </div>

            {/* Chat Bubble Mockup */}
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-purple-500/10 border border-purple-500/20 text-purple-200 rounded-2xl rounded-tr-none text-right ml-8">
                Why did my portfolio drop today compared to the NIFTY 50?
              </div>

              <div className="p-3 bg-[#121028]/90 border border-white/10 text-gray-300 rounded-2xl rounded-tl-none mr-4 leading-relaxed">
                Your drop was driven by high exposure to mid-cap IT stocks which saw a sector-wide correction. Specifically, your 12% overweight position in...
              </div>
            </div>

            {/* Input Box Mockup */}
            <div className="relative flex items-center">
              <input
                type="text"
                readOnly
                value="Ask about your risk exposure..."
                className="w-full bg-[#121028] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-gray-400 focus:outline-none"
              />
              <button className="absolute right-2 p-1.5 bg-purple-600 rounded-lg text-white">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
