import { useState, useEffect, ReactNode, MouseEvent } from 'react';
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
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-purple-600/20 via-indigo-600/10 to-transparent rounded-full blur-[160px] pointer-events-none"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          y: [-30, 30, -30],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="fixed top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[140px] pointer-events-none"
      />

      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.1, 0.18, 0.1],
          x: [30, -30, 30],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="fixed top-2/3 right-1/4 w-[600px] h-[600px] bg-indigo-900/15 rounded-full blur-[160px] pointer-events-none"
      />

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
