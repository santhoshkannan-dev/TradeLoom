import { ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ButtonProps extends HTMLMotionProps<'button'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_0_25px_rgba(168,85,247,0.35)] border border-purple-400/30',
    secondary: 'bg-white/[0.04] hover:bg-white/[0.08] text-gray-200 hover:text-white border border-white/10 backdrop-blur-md',
    outline: 'bg-transparent border border-purple-500/30 text-purple-300 hover:bg-purple-500/10',
    ghost: 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5',
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-2',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-sm px-7 py-3.5',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}
