import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export const ATSScoreCard = ({ score }: { score: number }) => {
  const getTheme = (s: number) => {
    if (s >= 80) return {
      text: 'text-emerald-400',
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-500/10',
      glow: 'shadow-[0_0_50px_rgba(16,185,129,0.2)]',
      accent: '#10b981'
    };
    if (s >= 60) return {
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/10',
      glow: 'shadow-[0_0_50px_rgba(245,158,11,0.2)]',
      accent: '#f59e0b'
    };
    return {
      text: 'text-rose-400',
      border: 'border-rose-500/30',
      bg: 'bg-rose-500/10',
      glow: 'shadow-[0_0_50px_rgba(244,63,94,0.2)]',
      accent: '#f43f5e'
    };
  };

  const theme = getTheme(score);

  return (
    <div className={cn(
      "relative flex flex-col items-center justify-center rounded-[3rem] border p-12 backdrop-blur-3xl transition-all duration-1000",
      theme.border,
      theme.bg,
      theme.glow
    )}>
      {/* Background Depth */}
      <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
      <div className="absolute inset-0 rounded-[3rem] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="relative h-56 w-56">
        {/* Dynamic Inner Glow */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 blur-[60px] rounded-full"
          style={{ backgroundColor: theme.accent }}
        />
        
        <svg className="relative h-full w-full rotate-[-90deg] drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]" viewBox="0 0 100 100">
          {/* Background track */}
          <circle
            className="stroke-slate-800/50"
            strokeWidth="6"
            fill="transparent"
            r="44"
            cx="50"
            cy="50"
          />
          {/* Progress track */}
          <motion.circle
            className="stroke-current drop-shadow-md"
            strokeWidth="6"
            strokeDasharray={276.46}
            initial={{ strokeDashoffset: 276.46 }}
            animate={{ strokeDashoffset: 276.46 - (276.46 * score) / 100 }}
            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
            strokeLinecap="round"
            fill="transparent"
            r="44"
            cx="50"
            cy="50"
            style={{ stroke: theme.accent }}
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <span className="text-sm font-medium text-white/40 mb-1">ATS match</span>
            <div className="flex items-baseline gap-1">
              <span className="text-7xl font-black tracking-tighter text-white tabular-nums drop-shadow-lg">
                {score}
              </span>
              <span className="text-xl font-bold text-white/20">/100</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mt-10 w-full">
        <div className={cn(
          "flex flex-col items-center justify-center rounded-2xl p-4 border backdrop-blur-xl relative overflow-hidden group",
          theme.border,
          "bg-white/[0.02]"
        )}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <div className="flex items-center gap-3 mb-1">
            <div className={cn("h-2 w-2 rounded-full shadow-[0_0_10px_currentColor]", theme.text.replace('text-', 'bg-'), theme.text)} />
            <span className={cn("text-sm font-semibold", theme.text)}>
              {score >= 80 ? 'Exceptional Match' : score >= 60 ? 'Competitive Edge' : 'Critical Optimization Required'}
            </span>
          </div>
          <p className="text-xs font-medium text-white/50 mt-2 text-center">
            {score >= 80 ? 'Profile is highly optimized for ATS systems.' : score >= 60 ? 'Good foundation, but lacks specific keywords.' : 'Significant formatting or keyword gaps detected.'}
          </p>
        </div>
      </div>
    </div>
  );
};
