import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Eye, EyeOff, ArrowRight, GitFork, Check } from 'lucide-react';

const perks = [
  'Free forever plan included',
  'Connect unlimited brokers',
  'AI-powered insights on day 1',
  'No credit card required',
];

export default function RegisterPage() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-[#05040f] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-800/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-800/6 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(167,139,250,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md space-y-8"
      >
        {/* Logo */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="p-2 rounded-xl bg-purple-600/10 border border-purple-500/20">
              <Cpu className="w-5 h-5 text-purple-400" />
            </div>
            <span className="font-bold text-white text-lg tracking-tight">TradeLoom</span>
          </Link>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Create your account</h1>
          <p className="text-gray-400 text-sm">Start managing your investments intelligently</p>
        </div>

        {/* Perks */}
        <div className="flex flex-wrap justify-center gap-3">
          {perks.map((p) => (
            <div key={p} className="flex items-center gap-1.5 text-[11px] text-gray-400">
              <Check className="w-3 h-3 text-emerald-400 shrink-0" />
              {p}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl p-8 space-y-6">
          {/* Social */}
          <button className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white/[0.04] border border-white/8 text-sm font-medium text-gray-300 hover:bg-white/[0.07] hover:text-white transition-all">
            <GitFork className="w-4 h-4" />
            Continue with GitHub
          </button>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-[11px] text-gray-600 font-medium uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Full Name</label>
              <input
                id="register-name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/8 text-white placeholder-gray-600 text-sm outline-none focus:border-purple-500/40 focus:bg-white/[0.06] transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</label>
              <input
                id="register-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/8 text-white placeholder-gray-600 text-sm outline-none focus:border-purple-500/40 focus:bg-white/[0.06] transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
              <div className="relative">
                <input
                  id="register-password"
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-white/[0.04] border border-white/8 text-white placeholder-gray-600 text-sm outline-none focus:border-purple-500/40 focus:bg-white/[0.06] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <button
            id="register-submit"
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white bg-purple-600 hover:bg-purple-500 transition-all shadow-[0_0_25px_rgba(139,92,246,0.3)] group"
          >
            Create Free Account
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <p className="text-center text-[11px] text-gray-600">
            By creating an account you agree to our{' '}
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>.
          </p>
        </div>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
