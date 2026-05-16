import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ArrowRight, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const examples = [
  {
    before: "Worked on React apps",
    after: "Architected scalable React.js applications using reusable component patterns, resulting in a 30% reduction in codebase complexity and significantly improved frontend performance."
  },
  {
    before: "Managed a team of 5",
    after: "Spearheaded a high-performing engineering squad of 5, delivering 3 consecutive project releases 15% ahead of schedule while maintaining 99.9% system uptime."
  },
  {
    before: "Helped with SEO",
    after: "Orchestrated a data-driven SEO overhaul that increased organic search traffic by 45% and boosted conversion rates through technical site audits and keyword optimization."
  }
];

export const BeforeAfter = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success('Optimized bullet copied!');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="how-it-works" className="py-32 relative overflow-hidden bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Transformation</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            See how ResumeAI turns simple task descriptions into professional, data-backed achievements that recruiters love.
          </motion.p>
        </div>

        <div className="space-y-8">
          {examples.map((example, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-8 group"
            >
              {/* Before Card */}
              <div className="relative p-8 rounded-[2rem] border border-white/10 bg-slate-900/40 group-hover:bg-slate-900/60 transition-all duration-500">
                <span className="absolute -top-3 left-8 px-3 py-1 rounded-full bg-slate-800 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Before
                </span>
                <p className="text-slate-300 italic">"{example.before}"</p>
              </div>

              {/* Connector */}
              <div className="flex justify-center relative py-4 md:py-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-full md:h-px md:w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent hidden md:block" />
                <motion.div 
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="relative z-10 w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center"
                >
                  <ArrowRight className="h-5 w-5 text-blue-400" />
                </motion.div>
              </div>

              {/* After Card */}
              <div className="relative p-8 rounded-[2rem] border border-blue-500/20 bg-blue-500/5 backdrop-blur-xl group-hover:bg-blue-500/10 transition-all duration-500 shadow-[0_0_40px_rgba(59,130,246,0.05)]">
                <div className="absolute -top-3 left-8 px-3 py-1 rounded-full bg-blue-500 text-[10px] font-bold uppercase tracking-widest text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3" />
                  Optimized
                </div>
                
                <p className="text-white font-medium leading-relaxed mb-6">
                  {example.after}
                </p>

                <button
                  onClick={() => handleCopy(example.after, i)}
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <AnimatePresence mode="wait">
                    {copiedIndex === i ? (
                      <motion.span 
                        key="check" 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }} 
                        exit={{ scale: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="h-3 w-3" /> Copied
                      </motion.span>
                    ) : (
                      <motion.span 
                        key="copy" 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }} 
                        exit={{ scale: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Copy className="h-3 w-3" /> Copy Bullet
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
