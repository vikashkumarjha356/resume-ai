import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export const KeywordTags = ({ keywords }: { keywords: string[] }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAll = () => {
    navigator.clipboard.writeText(keywords.join(', '));
    setCopied(true);
    toast.success('Keywords copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const colors = [
    'bg-gradient-to-br from-indigo-500/10 to-indigo-500/5 text-indigo-400 border-indigo-500/20 hover:border-indigo-400/50 hover:bg-indigo-500/20 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]',
    'bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 text-cyan-400 border-cyan-500/20 hover:border-cyan-400/50 hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]',
    'bg-gradient-to-br from-violet-500/10 to-violet-500/5 text-violet-400 border-violet-500/20 hover:border-violet-400/50 hover:bg-violet-500/20 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]',
    'bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 text-emerald-400 border-emerald-500/20 hover:border-emerald-400/50 hover:bg-emerald-500/20 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]',
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <button
          onClick={handleCopyAll}
          className="group flex items-center gap-2 rounded-full bg-white/5 px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-white/40 transition-all hover:bg-white hover:text-slate-950 shadow-xl"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy All Keywords'}
        </button>
      </div>
      <div className="flex flex-wrap gap-4">
      {keywords.map((keyword, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.05, y: -2 }}
          className={`
            px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest border backdrop-blur-md
            transition-all duration-300 cursor-default shadow-lg
            ${colors[index % colors.length]}
          `}
        >
          {keyword}
        </motion.span>
      ))}
      </div>
    </div>
  );
};
