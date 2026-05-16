import { motion } from 'framer-motion';
import { AlertCircle, RefreshCcw, Home } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
  onReset: () => void;
}

export const ErrorState = ({ message, onRetry, onReset }: ErrorStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="relative mb-8">
        <div className="absolute inset-0 blur-3xl bg-red-500/20 rounded-full" />
        <div className="relative rounded-[2rem] bg-red-500/5 p-8 ring-1 ring-red-500/20">
          <AlertCircle className="h-12 w-12 text-red-400" />
        </div>
      </div>

      <h2 className="text-2xl font-black tracking-tight text-white mb-4">Analysis Failed</h2>
      <p className="text-white/40 max-w-md mx-auto leading-relaxed mb-10">
        {message || "We encountered an unexpected error while analyzing your resume. This could be due to a network issue or a temporarily unavailable AI model."}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <button
          onClick={onRetry}
          className="group flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition-all hover:scale-105"
        >
          <RefreshCcw className="h-4 w-4 transition-transform group-hover:rotate-180 duration-500" />
          Try Again
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-2 rounded-full bg-white/5 px-8 py-3 text-sm font-semibold text-white/60 transition-all hover:bg-white/10 hover:text-white"
        >
          <Home className="h-4 w-4" />
          Go Home
        </button>
      </div>
    </motion.div>
  );
};
