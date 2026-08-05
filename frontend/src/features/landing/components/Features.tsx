import { 
  Briefcase, 
  BrainCircuit, 
  BarChart3, 
  Newspaper, 
  Bell, 
  Shuffle 
} from 'lucide-react';

export default function Features() {
  const features = [
    {
      title: 'Unified Portfolio',
      description: 'One dashboard for every investment. Consolidate equity, mutual funds, gold, and other alternative assets.',
      icon: Briefcase,
    },
    {
      title: 'AI Advisor',
      description: 'Explain portfolio health in human terms. Get automated, clear advice on sector exposures and adjustments.',
      icon: BrainCircuit,
    },
    {
      title: 'Professional Analytics',
      description: 'Advanced risk calculations. Access Sharpe ratios, NSE Nifty 50 Beta coefficients, VaR risk levels, and Drawdown tracking.',
      icon: BarChart3,
    },
    {
      title: 'News Intelligence',
      description: 'Real-time market sentiment radar. Scan headlines with FinBERT, resolving company mappings to your holdings.',
      icon: Newspaper,
    },
    {
      title: 'Smart Alerts',
      description: 'Proactive threshold triggers. Receive automated updates when allocations swing or negative news sentiment scores spike.',
      icon: Bell,
    },
    {
      title: 'Multi Broker Imports',
      description: 'Fast, secure CSV parsing. Upload holding summaries from Groww, Zerodha, and other major platforms seamlessly.',
      icon: Shuffle,
    },
  ];

  return (
    <section id="features" className="py-20 border-t border-white/5 bg-[#0a0914]/40 relative">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-white tracking-tight">Institutional Intelligence for Everyone</h2>
          <p className="text-gray-400 text-sm">
            TradeLoom combines institutional risk models with artificial intelligence to deliver deep portfolio visibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div 
                key={feat.title} 
                className="group relative p-6 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-purple-500/20 transition-all duration-300"
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/0 group-hover:via-purple-500/30 to-transparent transition-all" />
                <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20 w-fit mb-5">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{feat.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
