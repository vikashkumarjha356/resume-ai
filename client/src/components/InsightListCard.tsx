import { Check, Copy, AlertTriangle, Lightbulb, LineChart, FileText, Zap, UserCheck, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InsightListCardProps {
  title: string;
  items: string[] | string;
  type: 'weakness' | 'optimization' | 'impression' | 'impact' | 'density' | 'formatting' | 'skills';
}

const config = {
  weakness: { icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10', ring: 'ring-red-500/20' },
  optimization: { icon: Lightbulb, color: 'text-amber-400', bg: 'bg-amber-500/10', ring: 'ring-amber-500/20' },
  impression: { icon: UserCheck, color: 'text-blue-400', bg: 'bg-blue-500/10', ring: 'ring-blue-500/20' },
  impact: { icon: Zap, color: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10', ring: 'ring-fuchsia-500/20' },
  density: { icon: LineChart, color: 'text-emerald-400', bg: 'bg-emerald-500/10', ring: 'ring-emerald-500/20' },
  formatting: { icon: FileText, color: 'text-orange-400', bg: 'bg-orange-500/10', ring: 'ring-orange-500/20' },
  skills: { icon: Sparkles, color: 'text-cyan-400', bg: 'bg-cyan-500/10', ring: 'ring-cyan-500/20' },
};

export const InsightListCard = ({ title, items, type }: InsightListCardProps) => {
  const [copied, setCopied] = useState(false);
  const { icon: Icon, color, bg, ring } = config[type];

  const handleCopy = () => {
    const textToCopy = Array.isArray(items) ? items.join('\n') : items;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative flex flex-col h-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-8 backdrop-blur-2xl transition-all duration-500 hover:border-white/20 hover:bg-white/[0.04] shadow-2xl"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className={`rounded-xl ${bg} p-3 ring-1 ${ring}`}>
            <Icon className={`h-5 w-5 ${color}`} />
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-white">{title}</h3>
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
      
      <div className="flex-1">
        {Array.isArray(items) ? (
          <ul className="space-y-4">
            {items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className={`mt-2 h-1.5 w-1.5 rounded-full ${bg.replace('/10', '')}`} />
                <p className="text-sm font-medium leading-relaxed text-white/80">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm font-medium leading-relaxed text-white/80">
            {items}
          </p>
        )}
      </div>
    </motion.div>
  );
};
