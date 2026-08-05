import { Building2, FileSpreadsheet, SlidersHorizontal, Cpu, CheckCircle2 } from 'lucide-react';

export default function Architecture() {
  return (
    <section id="architecture" className="py-24 border-t border-white/10 bg-[#070714] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-20">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">The Normalization Engine</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            We ingest fragmented data streams and weave them into a standardized, high-integrity analytical fabric.
          </p>
        </div>

        {/* 3D Flow Diagram Card */}
        <div className="relative max-w-5xl mx-auto p-8 md:p-12 glass-card rounded-3xl border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.6)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            
            {/* Left Inputs Column */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#0e0c24]/80 border border-white/10 flex items-center gap-4 hover:border-purple-500/30 transition-all">
                <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Broker API</h4>
                  <p className="text-xs text-gray-500">Zerodha, Angel, Groww, etc.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0e0c24]/80 border border-white/10 flex items-center gap-4 hover:border-purple-500/30 transition-all">
                <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Flat Files</h4>
                  <p className="text-xs text-gray-500">CSV / Excel Statements</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0e0c24]/80 border border-white/10 flex items-center gap-4 hover:border-purple-500/30 transition-all">
                <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Manual Entry</h4>
                  <p className="text-xs text-gray-500">Alternative Assets</p>
                </div>
              </div>
            </div>

            {/* Center 3D Isometric Cube Node */}
            <div className="flex flex-col items-center justify-center p-6 relative my-6 md:my-0">
              <div className="absolute inset-0 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
              
              {/* Cube Container */}
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 p-[1px] shadow-[0_0_40px_rgba(168,85,247,0.4)] relative z-10">
                <div className="w-full h-full bg-[#0b0a1a] rounded-[15px] flex flex-col items-center justify-center">
                  <Cpu className="w-10 h-10 text-purple-400 animate-spin [animation-duration:12s]" />
                </div>
              </div>

              <span className="block text-xs font-bold text-white tracking-widest uppercase mt-4 relative z-10">
                Normalization Engine
              </span>
            </div>

            {/* Right Output Box */}
            <div className="p-6 rounded-2xl bg-[#0e0c24]/80 border border-white/10 space-y-4 flex flex-col justify-between h-full">
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider">Normalized Data Stream</span>
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> 99.8% Synced
                </span>
              </div>

              <div className="space-y-3 py-2">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Portfolio Schema</span>
                  <span className="text-white font-mono">Unified Holdings</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-400 h-full rounded-full w-full" />
                </div>

                <div className="flex justify-between text-xs text-gray-400">
                  <span>Transaction Log</span>
                  <span className="text-white font-mono">Cost Basis Recalc</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-400 h-full rounded-full w-5/6" />
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 text-xs text-gray-500">
                Data ready for Analytics & AI Engine.
              </div>
            </div>

          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto pt-8 border-t border-white/10 text-center">
          <div className="space-y-1">
            <div className="text-4xl font-extrabold text-white tracking-tight">1M+</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Assets Normalized</div>
          </div>
          <div className="space-y-1">
            <div className="text-4xl font-extrabold text-white tracking-tight">$2B+</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Under Analysis</div>
          </div>
          <div className="space-y-1">
            <div className="text-4xl font-extrabold text-white tracking-tight">4.8/5</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Analyst Rating</div>
          </div>
        </div>

      </div>
    </section>
  );
}
