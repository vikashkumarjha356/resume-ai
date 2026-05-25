import { Check, Copy, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const BulletImprovementCard = ({ text }: { text: string | { original: string; improved: string } }) => {
  const [copied, setCopied] = useState(false);

  const originalText = typeof text === 'string' ? '' : text.original;
  const improvedText = typeof text === 'string' ? text : text.improved;

  const handleCopy = () => {
    navigator.clipboard.writeText(improvedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative flex flex-col h-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-10 backdrop-blur-2xl transition-all duration-500 hover:border-violet-500/40 hover:bg-white/[0.04] shadow-2xl hover:shadow-[0_0_40px_rgba(139,92,246,0.1)]"
    >
      {/* Dynamic Glow */}
      <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-violet-500/5 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex flex-col h-full space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-violet-500/10 p-2.5 ring-1 ring-violet-500/20">
              <Sparkles className="h-4 w-4 text-violet-400" />
            </div>
            <span className="text-xs font-medium text-violet-400">Optimized result</span>
          </div>
          
          <button
            onClick={handleCopy}
            className="group/btn flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs font-medium text-white/60 transition-all hover:bg-white hover:text-slate-950"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div key="check" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} className="flex items-center gap-2">
                  <Check className="h-4 w-4" /> Copied
                </motion.div>
              ) : (
                <motion.div key="copy" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} className="flex items-center gap-2">
                  <Copy className="h-4 w-4" /> Copy
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
        
        <div className="flex-1 space-y-4">
          {originalText && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">Original</span>
              <p className="text-sm font-medium leading-relaxed text-white/40 line-through">
                "{originalText}"
              </p>
            </div>
          )}
          <div className="space-y-1">
            {originalText && <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400">AI Improved</span>}
            <p className="text-lg font-bold leading-relaxed text-white/90 selection:bg-violet-500/30 italic">
              "{improvedText}"
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
