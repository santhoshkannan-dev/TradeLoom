import { Link } from 'react-router-dom';
import { Container } from '../../../components/ui/Container';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#02050e] py-16 text-gray-500 text-xs relative z-10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10">
          
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 p-[1px]">
                <div className="w-full h-full bg-[#070714] rounded-[7px] flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">TradeLoom</span>
            </Link>
            
            <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
              Institutional intelligence and normalized market data for the sophisticated individual investor.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#architecture" className="hover:text-white transition-colors">Integrations</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Updates</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Intelligence Hub</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Analyst API</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/legal/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/legal/disclaimer" className="hover:text-white transition-colors">AI Disclaimer</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-[11px]">
          <span>© 2026 TradeLoom. Redefined Modern Intelligence.</span>
          
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Twitter / X</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://github.com/santhoshkannan-dev/TradeLoom" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
