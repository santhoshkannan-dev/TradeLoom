import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Database, UploadCloud, CheckCircle, ArrowRight, Cpu, Layers } from 'lucide-react';

const brokers = [
  { name: 'Zerodha', abbr: 'ZR', color: '#387ed1' },
  { name: 'Groww', abbr: 'GW', color: '#5367ff' },
  { name: 'Angel One', abbr: 'AO', color: '#f04e31' },
  { name: 'Upstox', abbr: 'UX', color: '#6c0ad6' },
  { name: 'ICICI Direct', abbr: 'ID', color: '#f7941d' },
  { name: 'Manual Entry', abbr: 'ME', color: '#34d399' },
];

export default function Architecture() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="architecture" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-900/5 rounded-full blur-[120px]" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-5">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-bold text-indigo-300 uppercase tracking-wider"
          >
            <Layers className="w-3 h-3" />
            Normalization Engine
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            One Engine.
            <br />
            <span className="gradient-text">Every Broker.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-gray-400 leading-relaxed"
          >
            TradeLoom's normalization layer ingests fragmented transaction CSV formats
            and API data streams — turning broker chaos into a single, high-fidelity analytical fabric.
          </motion.p>
        </div>

        {/* Architecture diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative"
        >
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

              {/* Inputs */}
              <div className="space-y-4">
                <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-4">Data Sources</p>
                {[
                  { icon: Database, label: 'Broker APIs', sub: 'Zerodha, Groww, Angel', color: 'purple' },
                  { icon: UploadCloud, label: 'CSV Imports', sub: 'Transaction history files', color: 'indigo' },
                  { icon: CheckCircle, label: 'Manual Entry', sub: 'Alternative assets', color: 'violet' },
                ].map(({ icon: Icon, label, sub, color }) => (
                  <motion.div
                    key={label}
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-${color}-500/20 transition-all cursor-default group`}
                  >
                    <div className={`p-2 rounded-lg bg-${color}-500/10 border border-${color}-500/20`}>
                      <Icon className={`w-4 h-4 text-${color}-400`} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">{label}</p>
                      <p className="text-[10px] text-gray-500">{sub}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-600 ml-auto opacity-0 group-hover:opacity-100 transition-all" />
                  </motion.div>
                ))}
              </div>

              {/* Central engine */}
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-2xl animate-pulse" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center border border-purple-400/30 glow-purple"
                  >
                    <Cpu className="w-10 h-10 text-white" />
                  </motion.div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-white">Loom Normalizer</p>
                  <div className="flex items-center justify-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">Engine Active</span>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-[10px] font-bold text-emerald-400">99.8% Accuracy</span>
                </div>
              </div>

              {/* Output */}
              <div className="space-y-4">
                <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-4">Unified Output</p>
                {[
                  { label: 'Normalized Holdings', value: 'Real-time', color: 'emerald' },
                  { label: 'Transaction History', value: 'Deduplicated', color: 'purple' },
                  { label: 'P&L Calculations', value: 'FIFO/LIFO', color: 'indigo' },
                  { label: 'Analytics Engine', value: 'Live feed', color: 'violet' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-xs text-gray-300 font-medium">{label}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-${color}-500/10 text-${color}-400 border border-${color}-500/20`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Broker tiles */}
        <div className="space-y-4">
          <p className="text-center text-[10px] uppercase tracking-widest font-bold text-gray-600">Supported Brokers & Platforms</p>
          <div className="flex flex-wrap justify-center gap-3">
            {brokers.map((b, i) => (
              <motion.div
                key={b.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.06 }}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl glass-card border border-white/5 hover:border-white/10 transition-all"
              >
                <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[9px] font-bold text-white" style={{ background: b.color }}>
                  {b.abbr}
                </div>
                <span className="text-sm font-medium text-gray-300">{b.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
