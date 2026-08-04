import { Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#080710] py-16 text-gray-500">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-12">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="font-bold text-white tracking-tight text-lg">TradeLoom</span>
          </div>
          <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
            TradeLoom. Institutional intelligence and normalized trackers built for the sophisticated individual investor.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Product</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="#intelligence" className="hover:text-white transition-colors">AI Intelligence</a></li>
            <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Company</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Legal</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <span>© 2026 TradeLoom. All rights reserved.</span>
        <span>Built with React, Tailwind and Django.</span>
      </div>
    </footer>
  );
}
