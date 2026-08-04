import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Cpu, 
  LayoutDashboard, 
  Briefcase, 
  BarChart3, 
  BrainCircuit, 
  Newspaper, 
  Bell, 
  Settings, 
  LogOut 
} from 'lucide-react';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Portfolio', path: '/portfolio', icon: Briefcase },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'AI Advisor', path: '/advisor', icon: BrainCircuit },
    { name: 'News', path: '/news', icon: Newspaper },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-[#080710] text-[#9ca3af] font-sans overflow-hidden">
      <aside className="w-64 bg-[#0d0c18] border-r border-white/5 flex flex-col z-20">
        <div className="p-6 flex items-center gap-3 border-b border-white/5">
          <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-white tracking-tight">TradeLoom</span>
            <span className="block text-[10px] text-gray-500 uppercase font-semibold">Console Console</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.05)]' 
                    : 'hover:bg-white/[0.02] hover:text-white border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-gray-500'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/5 transition-all duration-200 border border-transparent hover:border-rose-500/10"
          >
            <LogOut className="w-4 h-4 text-rose-500" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#0d0c18]/50 backdrop-blur-md z-10">
          <div>
            <h2 className="text-sm font-semibold text-white capitalize">
              {location.pathname.substring(1) || 'Console'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/5 rounded-lg border border-white/5 text-gray-400 hover:text-white transition-all">
              <Bell className="w-4 h-4" />
            </button>
            <Link to="/settings" className="p-2 hover:bg-white/5 rounded-lg border border-white/5 text-gray-400 hover:text-white transition-all">
              <Settings className="w-4 h-4" />
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#0a0914] p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
