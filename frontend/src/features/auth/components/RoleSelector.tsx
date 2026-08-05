import { motion } from 'framer-motion';

export type UserRole = 'User' | 'Broker' | 'Admin';

interface RoleSelectorProps {
  selectedRole: UserRole;
  onSelectRole: (role: UserRole) => void;
}

export function RoleSelector({ selectedRole, onSelectRole }: RoleSelectorProps) {
  const roles: UserRole[] = ['User', 'Broker', 'Admin'];

  return (
    <div className="relative flex items-center justify-between p-1 bg-[#0b1022] border border-white/10 rounded-2xl">
      {roles.map((role) => {
        const isSelected = selectedRole === role;
        return (
          <button
            key={role}
            type="button"
            onClick={() => onSelectRole(role)}
            className={`relative flex-1 py-2 text-xs font-semibold rounded-xl transition-all duration-200 z-10 ${
              isSelected ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            {isSelected && (
              <motion.div
                layoutId="roleSelectorPill"
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.4)] z-[-1]"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            {role}
          </button>
        );
      })}
    </div>
  );
}
