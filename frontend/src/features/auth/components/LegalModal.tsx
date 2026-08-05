import { useState, UIEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ShieldAlert, ArrowDown, FileText } from 'lucide-react';
import { LEGAL_TERMS_OF_SERVICE, LEGAL_PRIVACY_POLICY, LEGAL_FINANCIAL_DISCLAIMER } from '../../legal/content/legalContent';
import { Button } from '../../../components/ui/Button';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
}

export function LegalModal({ isOpen, onClose, onAgree }: LegalModalProps) {
  const [hasScrolledBottom, setHasScrolledBottom] = useState(false);
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy' | 'disclaimer'>('terms');

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    // Allow a 15px threshold for scroll calculations
    if (Math.abs(scrollHeight - scrollTop - clientHeight) <= 20) {
      setHasScrolledBottom(true);
    }
  };

  const handleAgreeClick = () => {
    onAgree();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-2xl bg-[#0b0f24] border border-white/15 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col text-left relative"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0e132e]/80">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Legal Agreements & Disclaimers</h3>
                <p className="text-xs text-gray-400">TradeLoom Terms of Service & Privacy Framework</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Document Tab Switcher */}
          <div className="flex border-b border-white/10 bg-[#080b1b] text-xs">
            <button
              onClick={() => setActiveTab('terms')}
              className={`flex-1 py-3 font-semibold transition-all ${
                activeTab === 'terms' ? 'text-purple-300 border-b-2 border-purple-500 bg-purple-500/10' : 'text-gray-400 hover:text-white'
              }`}
            >
              Terms of Service
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`flex-1 py-3 font-semibold transition-all ${
                activeTab === 'privacy' ? 'text-purple-300 border-b-2 border-purple-500 bg-purple-500/10' : 'text-gray-400 hover:text-white'
              }`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveTab('disclaimer')}
              className={`flex-1 py-3 font-semibold transition-all ${
                activeTab === 'disclaimer' ? 'text-purple-300 border-b-2 border-purple-500 bg-purple-500/10' : 'text-gray-400 hover:text-white'
              }`}
            >
              AI Disclaimer
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div
            onScroll={handleScroll}
            className="p-6 overflow-y-auto max-h-[50vh] space-y-6 text-xs text-gray-300 custom-scrollbar leading-relaxed"
          >
            {activeTab === 'terms' && (
              <div className="space-y-4">
                <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-200 text-[11px]">
                  Effective Date: {LEGAL_TERMS_OF_SERVICE.effectiveDate}
                </div>
                {LEGAL_TERMS_OF_SERVICE.sections.map((sec) => (
                  <div key={sec.heading} className="space-y-1">
                    <h4 className="font-bold text-white text-sm">{sec.heading}</h4>
                    <p className="text-gray-400">{sec.content}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-4">
                <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-200 text-[11px]">
                  Effective Date: {LEGAL_PRIVACY_POLICY.effectiveDate}
                </div>
                {LEGAL_PRIVACY_POLICY.sections.map((sec) => (
                  <div key={sec.heading} className="space-y-1">
                    <h4 className="font-bold text-white text-sm">{sec.heading}</h4>
                    <p className="text-gray-400">{sec.content}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'disclaimer' && (
              <div className="space-y-4">
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-200 text-[11px] flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>Important Financial Advisory & AI Analytical Notice</span>
                </div>
                {LEGAL_FINANCIAL_DISCLAIMER.sections.map((sec) => (
                  <div key={sec.heading} className="space-y-1">
                    <h4 className="font-bold text-white text-sm">{sec.heading}</h4>
                    <p className="text-gray-400">{sec.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Action Bar */}
          <div className="p-5 border-t border-white/10 bg-[#080b1b] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-gray-400 flex items-center gap-2">
              {hasScrolledBottom ? (
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Document read in full
                </span>
              ) : (
                <span className="text-amber-400 flex items-center gap-1.5 animate-pulse">
                  <ArrowDown className="w-4 h-4" /> Scroll to the bottom of the text to agree
                </span>
              )}
            </div>

            <Button
              onClick={handleAgreeClick}
              disabled={!hasScrolledBottom}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold shadow-lg"
            >
              I Have Read & Agree
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
