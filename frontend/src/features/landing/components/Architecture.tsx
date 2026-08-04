import { Database, UploadCloud, Cpu, CheckCircle } from 'lucide-react';

export default function Architecture() {
  return (
    <section id="architecture" className="py-20 border-t border-white/5 bg-[#080710] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-white tracking-tight">The Normalization Engine</h2>
          <p className="text-gray-400 text-sm">
            Tear down broker silos. TradeLoom automatically normalizes fragmented transaction CSV formats and API data streams.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto p-8 bg-white/[0.01] border border-white/5 rounded-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
                <Database className="w-5 h-5 text-purple-400" />
                <div>
                  <span className="block text-xs font-semibold text-white">Broker API</span>
                  <span className="text-[10px] text-gray-500">Zerodha, Groww, Angel</span>
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
                <UploadCloud className="w-5 h-5 text-purple-400" />
                <div>
                  <span className="block text-xs font-semibold text-white">Flat Files</span>
                  <span className="text-[10px] text-gray-500">CSV Reports, XML</span>
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-purple-400" />
                <div>
                  <span className="block text-xs font-semibold text-white">Manual Entry</span>
                  <span className="text-[10px] text-gray-500">Alternative Assets</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-6 relative">
              <div className="absolute inset-0 bg-purple-500/5 rounded-full blur-2xl animate-pulse" />
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white border border-purple-400/30 relative z-10 shadow-[0_0_30px_rgba(168,85,247,0.3)] animate-spin [animation-duration:10s]">
                <Cpu className="w-8 h-8" />
              </div>
              <span className="block text-xs font-bold text-white tracking-wider uppercase mt-4 relative z-10">Loom Normalizer</span>
              <span className="text-[9px] font-semibold text-purple-400 mt-1 uppercase relative z-10">Engine Active</span>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between h-full relative">
              <div className="flex justify-between items-center pb-3 border-b border-white/5 mb-4">
                <span className="text-[10px] font-semibold uppercase text-purple-300 tracking-wider">Normalized Output</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              
              <div className="space-y-2">
                <div className="w-full h-2 bg-purple-500/20 rounded" />
                <div className="w-3/4 h-2 bg-purple-500/10 rounded" />
                <div className="w-5/6 h-2 bg-purple-500/20 rounded" />
              </div>
              
              <div className="mt-8 pt-3 border-t border-white/5 flex justify-between items-center text-left">
                <div>
                  <span className="block text-[10px] text-gray-500">Status</span>
                  <span className="text-xs font-semibold text-white">Unified Asset Pool</span>
                </div>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">99.8% Acc</span>
              </div>
            </div>

          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto pt-8 border-t border-white/5 text-center">
          <div>
            <span className="block text-3xl font-extrabold text-white">1M+</span>
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mt-1 block">Assets Normalized</span>
          </div>
          <div>
            <span className="block text-3xl font-extrabold text-white">10k+</span>
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mt-1 block">Under Analysis</span>
          </div>
          <div>
            <span className="block text-3xl font-extrabold text-white">4.8/5</span>
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mt-1 block">Analyst Rating</span>
          </div>
        </div>

      </div>
    </section>
  );
}
