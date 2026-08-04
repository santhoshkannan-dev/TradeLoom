import { ArrowUpRight, TrendingUp, ShieldAlert } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Main Console Dashboard</h1>
        <p className="text-xs text-gray-500 mt-1">Real-time status overview of active connected resources</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4">
          <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest block">Total Portfolio Value</span>
          <span className="text-3xl font-bold text-white">₹12,45,000.00</span>
          <div className="flex items-center gap-1.5 text-emerald-400 text-xs">
            <TrendingUp className="w-3.5 h-3.5" /> +14.2% overall
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4">
          <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest block">Today's P/L</span>
          <span className="text-3xl font-bold text-emerald-400">+₹14,520.00</span>
          <div className="flex items-center gap-1.5 text-emerald-400 text-xs">
            <ArrowUpRight className="w-3.5 h-3.5" /> +1.18% today
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4">
          <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest block">Risk Score</span>
          <span className="text-3xl font-bold text-white">Moderate</span>
          <div className="flex items-center gap-1.5 text-purple-400 text-xs">
            <ShieldAlert className="w-3.5 h-3.5" /> Volatility index 14.8%
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-white">Asset Allocation</h3>
          <p className="text-[10px] text-gray-500 mt-0.5">Current distribution of capital across sectors</p>
        </div>

        <div className="space-y-4 max-w-xl">
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Technology</span>
              <span className="font-semibold text-white">45%</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full rounded-full" style={{ width: '45%' }} />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Financial Services</span>
              <span className="font-semibold text-white">30%</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full rounded-full" style={{ width: '30%' }} />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Energy</span>
              <span className="font-semibold text-white">15%</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full rounded-full" style={{ width: '15%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
