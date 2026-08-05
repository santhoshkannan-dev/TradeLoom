import { useState, ReactNode, MouseEvent } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export function GlassCard({ children, className, glow = false, ...props }: GlassCardProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4, transition: { duration: 0.3, ease: 'easeOut' } }}
      className={cn(
        'relative rounded-3xl bg-[#0e0d22]/70 backdrop-blur-2xl border border-white/10 p-6 md:p-8 overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.6)] transition-colors duration-300',
        glow && 'border-purple-500/40 shadow-[0_0_50px_rgba(168,85,247,0.2)]',
        className
      )}
      {...props}
    >
      {/* Top Gloss Border Highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      {/* Mouse Spotlight Radial Glow */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168, 85, 247, 0.15), transparent 80%)`,
          }}
        />
      )}

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
