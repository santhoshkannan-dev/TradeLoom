import { ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export function GlassCard({ children, className, glow = false, ...props }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'relative rounded-3xl bg-[#0f0e20]/60 backdrop-blur-2xl border border-white/10 p-6 md:p-8 overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.5)]',
        glow && 'border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.15)]',
        className
      )}
      {...props}
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      {children}
    </motion.div>
  );
}
