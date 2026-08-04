import { useState, useEffect } from 'react';
import { ShieldCheck, ServerCrash, Cpu, Activity, Globe, Database } from 'lucide-react';
import { apiClient } from './api/client';

function App() {
  const [status, setStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');
  const [routes, setRoutes] = useState<Record<string, string>>({});
  const [latency, setLatency] = useState<number | null>(null);

  useEffect(() => {
    const start = Date.now();
    apiClient.get('/')
      .then((res) => {
        setRoutes(res.data);
        setLatency(Date.now() - start);
        setStatus('connected');
      })
      .catch(() => {
        setStatus('error');
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#080710] text-[#9ca3af] flex flex-col items-center justify-center p-6 selection:bg-[#c084fc] selection:text-black">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-xl bg-gradient-to-b from-[#151324] to-[#0f0e1c] border border-white/5 rounded-2xl p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-400">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">TradeLoom</h1>
              <p className="text-xs text-gray-500">Portfolio Analytics Suite</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${
              status === 'connected' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 
              status === 'error' ? 'bg-rose-500 shadow-[0_0_8px_#f43f5e]' : 'bg-amber-500 animate-ping'
            }`} />
            <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
              {status === 'connected' ? 'System Online' : status === 'error' ? 'Connection Error' : 'Connecting'}
            </span>
          </div>
        </div>

        {status === 'connecting' && (
          <div className="space-y-4 py-8">
            <div className="flex items-center justify-center gap-3">
              <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium text-purple-400">Pinging backend engines...</p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-6 text-center py-6">
            <div className="inline-flex p-4 bg-rose-500/10 rounded-2xl border border-rose-500/20 text-rose-400 mb-2">
              <ServerCrash className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Backend Offline</h3>
              <p className="text-sm text-gray-400 mt-2 max-w-sm mx-auto">
                Could not connect to Django API. Verify your Docker compose stack is running.
              </p>
            </div>
          </div>
        )}

        {status === 'connected' && (
          <div className="space-y-6">
            <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">Handshake Successful</h4>
                <p className="text-xs text-gray-400 mt-1">
                  Established secure REST connection to the main TradeLoom API service.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Activity className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Latency</span>
                </div>
                <div className="text-xl font-bold text-white">{latency} <span className="text-xs font-normal text-gray-500">ms</span></div>
              </div>

              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Database className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Routes</span>
                </div>
                <div className="text-xl font-bold text-white">{Object.keys(routes).length} <span className="text-xs font-normal text-gray-500">endpoints</span></div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-4">
              <p className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider mb-2 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" /> Discovery Registry Map
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {Object.entries(routes).map(([name, url]) => (
                  <div key={name} className="flex justify-between p-2 bg-white/[0.01] rounded border border-white/5">
                    <span className="text-purple-400">{name}</span>
                    <span className="text-gray-600 truncate max-w-[120px]">{url.replace('http://localhost:8000', '')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <p className="text-[11px] text-gray-600 mt-6 tracking-wide uppercase font-semibold">TradeLoom v0.5 • Phase 2 React Frontend</p>
    </div>
  );
}

export default App;
