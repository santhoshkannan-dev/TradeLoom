import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-800/10 rounded-full blur-[100px]" />
      </div>

      <div ref={ref} className="max-w-4xl mx-auto px-6 text-center space-y-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[11px] font-bold text-purple-300 uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            Ready to see the full picture?
          </div>

          <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Stop managing tabs.
            <br />
            <span className="gradient-text">Start managing wealth.</span>
          </h2>

          <p className="text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
            Join investors who unified their portfolios, understood their risk, and made smarter decisions with TradeLoom AI.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/register"
            className="flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-purple-600 hover:bg-purple-500 transition-all shadow-[0_0_40px_rgba(139,92,246,0.4)] border border-purple-500/30 group"
          >
            Enter the Loom
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-sm text-gray-500">Free forever plan · No credit card</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-8 pt-4"
        >
          {[
            { label: 'Portfolios Managed', value: '1,200+' },
            { label: 'Brokers Supported', value: '6+' },
            { label: 'Uptime', value: '99.9%' },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="text-xl font-extrabold text-white">{value}</p>
              <p className="text-[10px] uppercase tracking-widest font-semibold text-gray-600 mt-0.5">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
