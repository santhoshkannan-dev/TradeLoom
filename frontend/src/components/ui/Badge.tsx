import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  children: ReactNode;
  variant?: 'purple' | 'green' | 'blue' | 'rose';
  className?: string;
  dot?: boolean;
}

export function Badge({ children, variant = 'purple', className, dot = true }: BadgeProps) {
  const variants = {
    purple: 'bg-purple-500/10 border-purple-500/30 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.15)]',
    green: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]',
    blue: 'bg-blue-500/10 border-blue-500/30 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]',
    rose: 'bg-rose-500/10 border-rose-500/30 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.15)]',
  };

  const dots = {
    purple: 'bg-purple-400',
    green: 'bg-emerald-400',
    blue: 'bg-blue-400',
    rose: 'bg-rose-400',
  };

  return (
    <div className={cn(
      'inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-semibold backdrop-blur-md',
      variants[variant],
      className
    )}>
      {dot && <span className={cn('w-2 h-2 rounded-full animate-pulse', dots[variant])} />}
      <span className="tracking-wide uppercase text-[10px]">{children}</span>
    </div>
  );
}
