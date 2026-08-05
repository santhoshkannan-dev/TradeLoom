import { useState, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  children: ReactNode;
}

export function AnimatedBackground({ children }: AnimatedBackgroundProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#040814] text-gray-300 overflow-x-hidden selection:bg-purple-500 selection:text-white font-sans">
      
      {/* Animated Aurora Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
          x: [-20, 20, -20],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-purple-600/20 via-indigo-600/10 to-transparent rounded-full blur-[160px] pointer-events-none z-0"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          y: [-30, 30, -30],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="fixed top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[140px] pointer-events-none z-0"
      />

      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.1, 0.18, 0.1],
          x: [30, -30, 30],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="fixed top-2/3 right-1/4 w-[600px] h-[600px] bg-indigo-900/15 rounded-full blur-[160px] pointer-events-none z-0"
      />

      {/* Colorful Animated Stock Market Chart Waveforms in Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20 overflow-hidden">
        
        {/* Glowing Emerald Bullish Chart Line */}
        <svg className="absolute top-1/4 left-0 w-full h-[300px]" viewBox="0 0 1200 300" fill="none" preserveAspectRatio="none">
          <defs>
            <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#34d399" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <motion.path
            d="M -100 200 Q 150 50, 400 180 T 800 80 T 1300 150"
            stroke="url(#emeraldGrad)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              repeatType: "reverse", 
              ease: "easeInOut" 
            }}
          />
        </svg>

        {/* Glowing Purple High-Volatility Chart Wave */}
        <svg className="absolute top-1/2 left-0 w-full h-[350px]" viewBox="0 0 1200 350" fill="none" preserveAspectRatio="none">
          <defs>
            <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <motion.path
            d="M -50 150 Q 250 280, 550 100 T 950 220 T 1350 70"
            stroke="url(#purpleGrad)"
            strokeWidth="3.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              repeatType: "reverse", 
              ease: "easeInOut",
              delay: 1
            }}
          />
        </svg>

        {/* Floating Stock Candlestick Simulation Overlay */}
        <div className="absolute top-1/3 left-10 right-10 flex justify-between items-center opacity-30">
          {[40, 70, 30, 85, 60, 95, 45, 75, 50, 80, 65, 90].map((h, idx) => (
            <motion.div
              key={idx}
              animate={{ height: [`${h}px`, `${Math.min(120, h + 25)}px`, `${h}px`] }}
              transition={{ duration: 3 + (idx % 3), repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 rounded-full flex flex-col items-center justify-center relative"
            >
              <div className={`w-1.5 rounded-sm h-full ${idx % 2 === 0 ? 'bg-emerald-400 shadow-[0_0_10px_#10b981]' : 'bg-purple-400 shadow-[0_0_10px_#a855f7]'}`} />
            </motion.div>
          ))}
        </div>

      </div>

      {/* Global Mouse Follow Spotlight */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168, 85, 247, 0.05), transparent 80%)`,
        }}
      />

      {/* Tech Grid Overlay */}
      <div 
        className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" 
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
