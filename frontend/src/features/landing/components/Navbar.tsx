import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#070714]/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-tr from-purple-600 via-indigo-500 to-purple-400 p-[1px] shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            <div className="w-full h-full bg-[#070714] rounded-[7px] flex items-center justify-center group-hover:bg-purple-950/40 transition-colors">
              <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight text-white font-sans">TradeLoom</span>
        </Link>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#intelligence" className="hover:text-white transition-colors">AI Intelligence</a>
          <a href="#architecture" className="hover:text-white transition-colors">Security</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="hidden sm:inline-block text-sm font-semibold text-gray-300 hover:text-white transition-colors px-3 py-2"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-5 py-2.5 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.3)] border border-purple-400/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
