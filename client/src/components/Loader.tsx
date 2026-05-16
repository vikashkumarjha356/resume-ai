import { motion } from 'framer-motion';
import { AnalysisSkeleton } from './Skeleton';
import { Sparkles } from 'lucide-react';

export const Loader = ({ message = "Analyzing your resume with AI..." }: { message?: string }) => {
  return (
    <div className="space-y-16">
      <div className="flex flex-col items-center justify-center space-y-8 py-16">
        <div className="relative">
          <motion.div
            className="absolute inset-0 blur-3xl bg-indigo-500/30 rounded-full"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div className="relative rounded-[2.5rem] bg-slate-900/80 p-8 ring-1 ring-white/10 shadow-2xl">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-12 w-12 text-cyan-400" />
            </motion.div>
          </div>
        </div>
        
        <div className="text-center space-y-3">
          <h2 className="text-xl font-semibold tracking-tight text-white">{message}</h2>
          <div className="flex items-center justify-center gap-3">
             <div className="h-1 w-1 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.3s]" />
             <div className="h-1 w-1 rounded-full bg-violet-400 animate-bounce [animation-delay:-0.15s]" />
             <div className="h-1 w-1 rounded-full bg-cyan-400 animate-bounce" />
          </div>
          <p className="text-sm font-medium text-white/50 mt-2">
            Optimizing Neural Weights
          </p>
        </div>
      </div>

      <div className="opacity-40">
        <AnalysisSkeleton />
      </div>
    </div>
  );
};
