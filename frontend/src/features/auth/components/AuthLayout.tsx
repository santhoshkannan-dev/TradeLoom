import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AuthSidebar } from './AuthSidebar';
import { GlassCard } from '../../../components/ui/GlassCard';

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Centered Glass Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 rounded-3xl bg-[#090d1f]/80 border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-2xl"
      >
        {/* Left Panel Sidebar */}
        <div className="lg:col-span-5 hidden lg:block">
          <AuthSidebar />
        </div>

        {/* Right Form Card Panel */}
        <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 flex flex-col justify-center bg-[#0e0d22]/90 relative">
          <div className="max-w-md mx-auto w-full">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
