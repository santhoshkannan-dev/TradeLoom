import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, ShieldAlert, ArrowRight, ArrowLeft, Building2, TrendingUp, CheckCircle2 } from 'lucide-react';
import { ProgressStepper } from './ProgressStepper';
import { PasswordField } from './PasswordField';
import { Button } from '../../../components/ui/Button';

export function RegisterForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Form State
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('Investor');
  const [connectedBroker, setConnectedBroker] = useState<string | null>(null);
  const [acceptTerms, setAcceptTerms] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const roles = [
    { id: 'Investor', title: 'Retail Investor', desc: 'Individual portfolio management & AI analysis.' },
    { id: 'Advisor', title: 'Financial Advisor', desc: 'Multi-client portfolio intelligence & reports.' },
    { id: 'Manager', title: 'Portfolio Manager', desc: 'Institutional analytics, VaR & custom models.' },
  ];

  const handleNextStep = (e: FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!fullName || !email || !password) {
        setError('Please complete all personal details.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      setError('');
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate('/dashboard');
      }, 1000);
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header & Stepper */}
      <div className="space-y-3">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Create Account</h2>
          <p className="text-xs text-gray-400">Join the next generation of unified portfolio management.</p>
        </div>
        <ProgressStepper currentStep={step} />
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleNextStep} className="space-y-4">
        {/* STEP 1: Personal Details */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block">
                  FULL NAME
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Alex Mercer"
                  className="w-full bg-[#090d1c] border border-white/10 focus:border-purple-500 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block">
                  USERNAME
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="alexmercer"
                  className="w-full bg-[#090d1c] border border-white/10 focus:border-purple-500 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none transition-all font-mono"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@institution.com"
                className="w-full bg-[#090d1c] border border-white/10 focus:border-purple-500 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none transition-all font-mono"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <PasswordField
                label="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <PasswordField
                label="CONFIRM PASSWORD"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="w-4 h-4 rounded bg-[#090d1c] border-white/10 text-purple-600 focus:ring-purple-500/30"
              />
              I agree to the <a href="#" className="text-purple-400 underline">Terms of Service</a> & <a href="#" className="text-purple-400 underline">Privacy Policy</a>
            </label>
          </div>
        )}

        {/* STEP 2: Choose Role */}
        {step === 2 && (
          <div className="space-y-3 animate-in fade-in duration-300">
            <span className="text-xs font-bold text-gray-300 block mb-2">Select your trading account posture:</span>
            {roles.map((r) => {
              const isSelected = selectedRole === r.id;
              return (
                <div
                  key={r.id}
                  onClick={() => setSelectedRole(r.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-purple-500/10 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                      : 'bg-[#090d1c] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-white">{r.title}</h4>
                    <p className="text-xs text-gray-400">{r.desc}</p>
                  </div>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-purple-400" />}
                </div>
              );
            })}
          </div>
        )}

        {/* STEP 3: Broker Integration */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-300 text-center py-2">
            <span className="text-xs font-semibold text-gray-300 block">Connect your primary broker API to sync live holdings:</span>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setConnectedBroker('Zerodha')}
                className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                  connectedBroker === 'Zerodha'
                    ? 'bg-purple-500/20 border-purple-500 text-white'
                    : 'bg-[#090d1c] border-white/10 text-gray-300 hover:text-white'
                }`}
              >
                <Building2 className="w-6 h-6 text-blue-400" />
                <span className="text-xs font-bold">Zerodha Kite</span>
              </button>

              <button
                type="button"
                onClick={() => setConnectedBroker('Groww')}
                className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                  connectedBroker === 'Groww'
                    ? 'bg-purple-500/20 border-purple-500 text-white'
                    : 'bg-[#090d1c] border-white/10 text-gray-300 hover:text-white'
                }`}
              >
                <TrendingUp className="w-6 h-6 text-emerald-400" />
                <span className="text-xs font-bold">Groww</span>
              </button>
            </div>

            <p className="text-[11px] text-gray-500">
              Read-only API access. Your credentials are never stored.
            </p>
          </div>
        )}

        {/* Navigation Actions */}
        <div className="flex items-center gap-3 pt-4">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          <Button
            type="submit"
            disabled={isLoading || (step === 1 && !acceptTerms)}
            className="flex-1 py-3.5 text-sm font-bold tracking-wide flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(168,85,247,0.35)]"
          >
            {isLoading
              ? 'Launching Console...'
              : step === 3
              ? connectedBroker
                ? `Complete Onboarding (${connectedBroker})`
                : 'Skip & Open Dashboard'
              : 'Continue'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </form>

      {/* Bottom Switcher */}
      <div className="pt-2 text-center text-xs text-gray-400">
        Already have an account?{' '}
        <Link to="/login" className="text-white hover:text-purple-300 font-bold transition-colors">
          Sign In
        </Link>
      </div>
    </div>
  );
}
