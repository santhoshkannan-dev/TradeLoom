import { ReactNode } from 'react';

interface AnimatedBackgroundProps {
  children: ReactNode;
}

export function AnimatedBackground({ children }: AnimatedBackgroundProps) {
  return (
    <div className="relative min-h-screen bg-[#040814] text-gray-300 overflow-x-hidden selection:bg-purple-500 selection:text-white font-sans">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-purple-600/15 via-indigo-600/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed top-2/3 right-1/4 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div 
        className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" 
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
