import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Container } from '../../../components/ui/Container';
import { GlassCard } from '../../../components/ui/GlassCard';
import { Button } from '../../../components/ui/Button';
import { fadeUp, staggerContainer } from '../../../lib/animations';

export default function Pricing() {
  const plans = [
    {
      name: 'FREE',
      price: '$0',
      period: '/mo',
      features: [
        '2 Broker Connections',
        'Standard Analytics',
        'AI Insights',
      ],
      cta: 'Start Free',
      popular: false,
    },
    {
      name: 'PRO',
      price: '$29',
      period: '/mo',
      features: [
        'Unlimited Connections',
        'Sentiment heatmaps',
        'Predictive Outlooks',
        'AI Chat Access',
      ],
      cta: 'Go Pro',
      popular: true,
    },
    {
      name: 'INSTITUTIONAL',
      price: '$149',
      period: '/mo',
      features: [
        'Everything in Pro',
        'VaR Risk Modeling',
        'White-Label Reports',
        'API Data Access',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 border-t border-white/10 relative">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-16"
        >
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Precision-Tiered Plans</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Institutional intelligence, scaled for every level of trader.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <GlassCard 
                key={plan.name}
                glow={plan.popular}
                className={plan.popular ? 'scale-[1.03] border-purple-500/40 bg-gradient-to-b from-[#181438] to-[#0f0e26]' : ''}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-[10px] font-extrabold text-white rounded-full uppercase tracking-wider shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    Most Popular
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-extrabold tracking-widest uppercase text-gray-400 block">{plan.name}</span>
                    <div className="flex items-baseline gap-1 mt-3">
                      <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{plan.price}</span>
                      <span className="text-xs text-gray-500 font-semibold">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-4 pt-6 border-t border-white/10">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-3 text-xs text-gray-300 font-medium">
                        <div className="w-4 h-4 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-purple-400" />
                        </div>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <Link to="/register">
                    <Button 
                      variant={plan.popular ? 'primary' : 'secondary'} 
                      className="w-full text-xs font-extrabold py-3.5"
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              </GlassCard>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
