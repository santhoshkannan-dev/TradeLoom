import { useState, InputHTMLAttributes } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

interface PasswordFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function PasswordField({ label = 'PASSWORD', error, className = '', ...props }: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1.5 text-left">
      <div className="flex justify-between items-center text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
        <label>{label}</label>
      </div>

      <div className="relative flex items-center">
        <div className="absolute left-3.5 text-gray-500 pointer-events-none">
          <Lock className="w-4 h-4" />
        </div>

        <input
          type={showPassword ? 'text' : 'password'}
          className={`w-full bg-[#090d1c] border border-white/10 focus:border-purple-500 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-gray-600 focus:outline-none transition-all ${
            error ? 'border-rose-500' : ''
          } ${className}`}
          {...props}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3.5 text-gray-400 hover:text-white transition-colors"
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {error && <span className="text-[11px] text-rose-400 font-medium">{error}</span>}
    </div>
  );
}
