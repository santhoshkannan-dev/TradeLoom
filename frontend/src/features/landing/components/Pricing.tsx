import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '0',
      description: 'Standard portfolio tracking',
      features: [
        '2 Broker Connections',
        'Standard Analytics',
        'Basic AI Insights',
        'Daily updates',
      ],
      cta: 'Join Free',
      popular: false,
    },
    {
      name: 'Pro',
      price: '2,400',
      description: 'Complete intelligence toolkit',
      features: [
        'Unlimited Connections',
        'Sentiment Heatmaps',
        'Predictive Outlooks',
        'AI Chat Advisor',
        'Intraday calculations',
      ],
      cta: 'Go Pro',
      popular: true,
    },
    {
      name: 'Institutional',
      price: '12,500',
      description: 'Advanced custom solutions',
      features: [
        'Everything in Pro',
        'Daily Risk Reports',
        'White-glove CSV imports',
        'API Access token keys',
        'Priority support channel',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 border-t border-white/5 bg-[#080710] relative">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-white tracking-tight">Precision-Tiered Plans</h2>
          <p className="text-gray-400 text-sm">
            Portfolio intelligence scaled for every level of investor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`p-8 rounded-2xl border flex flex-col justify-between relative transition-all duration-300 ${
                plan.popular 
                  ? 'bg-[#100e20]/60 border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.1)]' 
                  : 'bg-white/[0.01] border-white/5 hover:border-white/10'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple-600 text-[10px] font-bold text-white rounded-full uppercase tracking-wider">
                  Most Popular
                </span>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                  <p className="text-[11px] text-gray-500 mt-1">{plan.description}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white">₹{plan.price}</span>
                  <span className="text-xs text-gray-500">/ month</span>
                </div>

                <ul className="space-y-3 pt-6 border-t border-white/5">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-3 text-xs text-gray-400">
                      <Check className="w-4 h-4 text-purple-400 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  to="/register"
                  className={`block w-full text-center text-xs font-semibold py-3 rounded-xl transition-all ${
                    plan.popular
                      ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                      : 'bg-white/[0.03] hover:bg-white/[0.06] text-gray-300 hover:text-white border border-white/5'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
