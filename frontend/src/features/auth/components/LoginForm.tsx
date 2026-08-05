import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import { RoleSelector, UserRole } from './RoleSelector';
import { PasswordField } from './PasswordField';
import { SocialLogin } from './SocialLogin';
import { Button } from '../../../components/ui/Button';

export function LoginForm() {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>('User');
  const [email, setEmail] = useState('investor@institution.com');
  const [password, setPassword] = useState('••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  const handleDemoAccess = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-white tracking-tight">Sign In</h2>
        <p className="text-xs text-gray-400">Access your unified portfolio console.</p>
      </div>

      {/* Role Switcher */}
      <RoleSelector selectedRole={role} onSelectRole={setRole} />

      {error && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
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

        {/* Password Field */}
        <PasswordField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Remember & Forgot Password */}
        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 text-gray-400 hover:text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded bg-[#090d1c] border-white/10 text-purple-600 focus:ring-purple-500/30"
            />
            Remember me for 30 days
          </label>

          <Link to="/forgot-password" className="text-purple-400 hover:text-purple-300 font-semibold">
            Forgot Password?
          </Link>
        </div>

        {/* Authenticate Access Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 text-sm font-bold tracking-wide shadow-[0_0_25px_rgba(168,85,247,0.35)] mt-2"
        >
          {isLoading ? 'Authenticating...' : 'Authenticate Access'}
        </Button>
      </form>

      {/* Guest Demo Mode */}
      <button
        type="button"
        onClick={handleDemoAccess}
        className="w-full py-2.5 px-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-xs font-semibold text-purple-300 flex items-center justify-center gap-2 transition-all"
      >
        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
        Explore Demo Mode (Guest Access)
      </button>

      {/* Social Login */}
      <SocialLogin />

      {/* Bottom Switcher */}
      <div className="pt-2 text-center text-xs text-gray-400">
        Not a member?{' '}
        <Link to="/register" className="text-white hover:text-purple-300 font-bold transition-colors">
          Create Account / Request Access
        </Link>
      </div>
    </div>
  );
}
