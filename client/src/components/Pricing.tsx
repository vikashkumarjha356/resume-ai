import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Zap, Shield } from 'lucide-react';

const plans = [
  {
    name: "Beta Free",
    price: "0",
    description: "Perfect for candidates starting their job hunt.",
    features: [
      "Deep ATS Score Analysis",
      "Gap & Weakness Detection",
      "Optimization Suggestions",
      "3 Analyses per 24 hours",
      "Standard PDF Export"
    ],
    cta: "Get Started for Free",
    popular: false,
    active: true
  },
  {
    name: "Premium",
    price: "19",
    description: "The ultimate optimization engine for elite roles.",
    features: [
      "Full AI Resume Rewrite",
      "DOCX Formatting-Preserved Export",
      "Recruiter Impression Engine",
      "Unlimited Daily Analyses",
      "Advanced ATS Targeting"
    ],
    cta: "Coming Soon",
    popular: true,
    active: false
  }
];

export const Pricing = ({ onGetStarted }: { onGetStarted: () => void }) => {
  return (
    <section id="pricing" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            Simple <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Pricing</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            ResumeAI is currently in free beta. Secure your spot and optimize your career today.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative p-10 rounded-[2.5rem] border ${plan.popular ? 'border-blue-500/30 bg-blue-500/5' : 'border-white/5 bg-slate-900/30'} backdrop-blur-xl flex flex-col group h-full`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-500 text-[10px] font-bold uppercase tracking-widest text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                  Most Powerful
                </div>
              )}

              <div className="mb-10">
                <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">{plan.name}</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-white">${plan.price}</span>
                  <span className="text-slate-500 font-medium">/month</span>
                </div>
                <p className="mt-4 text-slate-400 text-sm leading-relaxed">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-12 flex-grow">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.active ? 'bg-blue-500/10 text-blue-400' : 'bg-slate-800 text-slate-500'}`}>
                      <Check className="h-3 w-3" />
                    </div>
                    <span className={`text-sm ${plan.active ? 'text-slate-300' : 'text-slate-500'}`}>{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={plan.active ? onGetStarted : undefined}
                className={`
                  w-full py-4 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all
                  ${plan.active 
                    ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]' 
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'}
                `}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Beta Notice */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-slate-900/50 border border-white/5 backdrop-blur-sm">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white">
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500 font-medium">
              Join <span className="text-white">200+ candidates</span> currently in beta.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
