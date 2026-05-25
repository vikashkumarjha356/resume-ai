import { motion, AnimatePresence } from 'framer-motion';
import { AnalysisSkeleton } from './Skeleton';
import { Sparkles, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const LOADING_STEPS = [
  "Reading your career story...",
  "Comparing experience against job description...",
  "Checking ATS keyword alignment...",
  "Evaluating bullet point impact and metrics...",
  "Formulating custom resume suggestions...",
  "Polishing final recruiter recommendation..."
];

export const Loader = ({ 
  message = "Analyzing your resume with AI...", 
  isRetrying = false 
}: { 
  message?: string;
  isRetrying?: boolean;
}) => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % LOADING_STEPS.length);
    }, 3000);

    return () => {
      clearInterval(stepInterval);
    };
  }, []);

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
        
        <div className="text-center space-y-3 flex flex-col items-center">
          <h2 className="text-xl font-semibold tracking-tight text-white">{message}</h2>
          <div className="flex items-center justify-center gap-3">
             <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.3s]" />
             <div className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:-0.15s]" />
             <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" />
          </div>
          <p className="text-sm font-medium text-white/50 mt-2 min-h-[20px]">
            {LOADING_STEPS[stepIndex]}
          </p>

          <AnimatePresence>
            {isRetrying && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.95 }}
                className="mt-8 inline-flex max-w-md items-center gap-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 px-5 py-4 text-xs text-amber-300/90 shadow-[0_0_50px_rgba(245,158,11,0.05)] text-left leading-relaxed backdrop-blur-md"
              >
                <div className="flex-shrink-0 h-8 w-8 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                  <Loader2 className="h-4 w-4 text-amber-400 animate-spin" />
                </div>
                <div>
                  <span className="font-semibold block text-white mb-0.5">High Demand Detected</span>
                  The AI is processing a high volume of requests. We are holding your spot in line and retrying automatically...
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="opacity-40">
        <AnalysisSkeleton />
      </div>
    </div>
  );
};
