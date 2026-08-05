import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { AuthLayout } from '../components/AuthLayout';
import { Button } from '../../../components/ui/Button';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 800);
  };

  return (
    <AuthLayout>
      <div className="space-y-6 text-left">
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Reset Password</h2>
          <p className="text-xs text-gray-400">
            Enter your institutional email address to receive reset instructions.
          </p>
        </div>

        {isSent ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">Reset Link Transmitted</h4>
            <p className="text-xs text-gray-300">
              Check <span className="font-mono text-emerald-300">{email}</span> for your password recovery link.
            </p>
            <Link to="/login">
              <Button variant="secondary" className="w-full mt-2 text-xs">
                Back to Sign In
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block">
                EMAIL ADDRESS
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-gray-500 pointer-events-none">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="investor@institution.com"
                  className="w-full bg-[#090d1c] border border-white/10 focus:border-purple-500 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none transition-all font-mono"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 text-sm font-bold tracking-wide shadow-[0_0_25px_rgba(168,85,247,0.35)]"
            >
              {isLoading ? 'Transmitting...' : 'Send Recovery Link'}
            </Button>
          </form>
        )}

        <div className="pt-2 text-center text-xs text-gray-400">
          <Link to="/login" className="inline-flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
