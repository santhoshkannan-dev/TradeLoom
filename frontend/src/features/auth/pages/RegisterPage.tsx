import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Cpu, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('token', 'mock_token_12345');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#080710] text-[#9ca3af]">
      <div className="w-full max-w-md bg-gradient-to-b from-[#151324] to-[#0f0e1c] border border-white/5 rounded-2xl p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-400 mb-3">
            <Cpu className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">Create Account</h1>
          <p className="text-xs text-gray-500 mt-1">Start tracking your multi-broker holdings with AI</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.15)] border border-purple-500/30"
          >
            Create Account <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/5 text-center text-xs">
          <span className="text-gray-500">Already have an account? </span>
          <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
