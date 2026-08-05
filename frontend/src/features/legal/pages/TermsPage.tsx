import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, FileText } from 'lucide-react';
import { Container } from '../../../components/ui/Container';
import { GlassCard } from '../../../components/ui/GlassCard';
import { LEGAL_TERMS_OF_SERVICE } from '../content/legalContent';

export default function TermsPage() {
  return (
    <div className="py-16 md:py-24 relative z-10 text-left">
      <Container className="max-w-4xl space-y-8">
        
        {/* Navigation Back */}
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Title */}
        <div className="space-y-3 border-b border-white/10 pb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-semibold text-purple-300">
            <FileText className="w-3.5 h-3.5" /> Effective Date: {LEGAL_TERMS_OF_SERVICE.effectiveDate}
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">{LEGAL_TERMS_OF_SERVICE.title}</h1>
          <p className="text-sm text-gray-400">TradeLoom Platform Usage Terms & Governance</p>
        </div>

        {/* Sections */}
        <GlassCard className="p-8 md:p-12 space-y-8">
          {LEGAL_TERMS_OF_SERVICE.sections.map((sec) => (
            <div key={sec.heading} className="space-y-2 border-b border-white/5 pb-6 last:border-0 last:pb-0">
              <h3 className="text-lg font-bold text-white tracking-tight">{sec.heading}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{sec.content}</p>
            </div>
          ))}
        </GlassCard>

      </Container>
    </div>
  );
}
