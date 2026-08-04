import { Link } from 'react-router-dom';
import { Cpu } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#080710]/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20">
            <Cpu className="w-5 h-5" />
          </div>
          <span className="font-bold text-white tracking-tight text-lg">TradeLoom</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#intelligence" className="hover:text-white transition-colors">AI Intelligence</a>
          <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </nav>

        <div className="flex items-center gap-4">
          <Link 
            to="/login" 
            className="text-sm font-semibold text-gray-300 hover:text-white transition-all px-4 py-2"
          >
            Sign In
          </Link>
          <Link 
            to="/register" 
            className="text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 px-5 py-2.5 rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.15)] border border-purple-500/30"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
