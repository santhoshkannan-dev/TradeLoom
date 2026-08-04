import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Send, Cpu, Sparkles, User } from 'lucide-react';

const demoConversations = [
  {
    q: 'Why is my portfolio down today compared to Nifty 50?',
    a: "Today's decline is primarily driven by your IT sector exposure (34% of portfolio). Infosys dropped 2.8% and TCS fell 1.5% after negative earnings guidance. Recent FinBERT analysis shows 68% negative sentiment on IT headlines. Your non-IT holdings like Reliance (+1.1%) partially offset the losses.",
  },
  {
    q: 'Which of my holdings carry the highest risk right now?',
    a: "Based on 30-day volatility analysis, TCS (σ=18.2%) and Infosys (σ=16.8%) carry the highest individual risk. Your combined IT sector weight of 34% creates concentration risk. Consider rebalancing 8-10% into FMCG or Pharma to improve your Sharpe Ratio from 1.82 to an estimated 2.1+.",
  },
  {
    q: 'Should I add more Reliance to my portfolio?',
    a: "Reliance currently represents 15% of your portfolio. Adding more would increase concentration. Current sentiment is 61% positive with strong Q3 results. However, your sector allocation model suggests maximum 18% for a single large-cap. A small top-up of ₹20,000-25,000 appears safe within your risk parameters.",
  },
];

export default function AISection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeDemo, setActiveDemo] = useState(0);
  const [typing, setTyping] = useState(false);
  const [showAnswer, setShowAnswer] = useState(true);

  const switchDemo = (i: number) => {
    if (i === activeDemo) return;
    setTyping(true);
    setShowAnswer(false);
    setActiveDemo(i);
    setTimeout(() => {
      setTyping(false);
      setShowAnswer(true);
    }, 1200);
  };

  return (
    <section id="ai" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-purple-900/8 rounded-full blur-[120px]" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-5">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[11px] font-bold text-purple-300 uppercase tracking-wider"
          >
            <Sparkles className="w-3 h-3" />
            AI Portfolio Advisor
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Ask Anything.
            <br />
            <span className="gradient-text">Get Real Answers.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-gray-400 leading-relaxed"
          >
            TradeLoom AI doesn't hallucinate generic advice. Every response is grounded
            in your actual portfolio data, live prices, and real-time news sentiment.
          </motion.p>
        </div>

        {/* Demo */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Question selector */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-3"
          >
            <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest px-1">Try These Questions</p>
            {demoConversations.map((c, i) => (
              <button
                key={i}
                onClick={() => switchDemo(i)}
                className={`w-full text-left p-4 rounded-xl border text-sm transition-all ${
                  activeDemo === i
                    ? 'bg-purple-600/10 border-purple-500/30 text-white shadow-[0_0_20px_rgba(139,92,246,0.1)]'
                    : 'bg-white/[0.02] border-white/5 text-gray-400 hover:border-white/10 hover:text-gray-300'
                }`}
              >
                <div className="flex items-start gap-2">
                  <User className="w-3.5 h-3.5 mt-0.5 shrink-0 text-purple-400" />
                  {c.q}
                </div>
              </button>
            ))}
          </motion.div>

          {/* Chat window */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="lg:col-span-3 glass-card rounded-2xl overflow-hidden"
          >
            {/* Chat header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <Cpu className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">TradeLoom AI</p>
                  <p className="text-[10px] text-gray-500">Portfolio Advisor · GPT-4 powered</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <motion.span
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                />
                <span className="text-[10px] text-gray-500">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="p-5 space-y-4 min-h-[280px]">
              {/* Context badge */}
              <div className="flex justify-center">
                <span className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-[10px] text-gray-500 font-medium">
                  Using live portfolio context · 12 holdings loaded
                </span>
              </div>

              {/* User question */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDemo + '-q'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-end"
                >
                  <div className="max-w-[80%] px-4 py-3 rounded-2xl rounded-tr-sm bg-purple-600 text-white text-sm leading-relaxed">
                    {demoConversations[activeDemo].q}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* AI response */}
              <AnimatePresence mode="wait">
                {typing ? (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-end gap-2"
                  >
                    <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <BrainCircuit className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-tl-sm glass-card border border-white/5">
                      <div className="flex gap-1">
                        {[0, 1, 2].map(i => (
                          <motion.span
                            key={i}
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ delay: i * 0.2, repeat: Infinity, duration: 0.8 }}
                            className="w-1.5 h-1.5 rounded-full bg-purple-400"
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : showAnswer ? (
                  <motion.div
                    key={activeDemo + '-a'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-start gap-2"
                  >
                    <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 shrink-0 mt-1">
                      <BrainCircuit className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-tl-sm glass-card border border-white/5 text-sm text-gray-300 leading-relaxed">
                      {demoConversations[activeDemo].a}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            {/* Input bar */}
            <div className="px-5 pb-5">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5">
                <input
                  type="text"
                  placeholder="Ask about your portfolio..."
                  className="flex-1 bg-transparent text-sm text-gray-300 placeholder-gray-600 outline-none"
                  readOnly
                />
                <button className="p-2 rounded-lg bg-purple-600 hover:bg-purple-500 transition-all">
                  <Send className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
