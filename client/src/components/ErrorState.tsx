import { motion } from 'framer-motion';
import { AlertCircle, RefreshCcw, Home, CreditCard, Clock } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
  onReset: () => void;
  onCheckPricing?: () => void;
}

export const ErrorState = ({ message, onRetry, onReset, onCheckPricing }: ErrorStateProps) => {
  const isLimitError = message.toLowerCase().includes('limit');
  const isHighDemandError = message.toLowerCase().includes('503') || 
                            message.toLowerCase().includes('429') || 
                            message.toLowerCase().includes('high demand') || 
                            message.toLowerCase().includes('breath') || 
                            message.toLowerCase().includes('occupied');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="relative mb-8">
        {isHighDemandError ? (
          <>
            <div className="absolute inset-0 blur-3xl bg-amber-500/20 rounded-full animate-pulse" />
            <div className="relative rounded-[2rem] bg-amber-500/5 p-8 ring-1 ring-amber-500/20 shadow-[0_0_50px_rgba(245,158,11,0.08)]">
              <Clock className="h-12 w-12 text-amber-400 animate-pulse" />
            </div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 blur-3xl bg-red-500/20 rounded-full" />
            <div className="relative rounded-[2rem] bg-red-500/5 p-8 ring-1 ring-red-500/20">
              <AlertCircle className="h-12 w-12 text-red-400" />
            </div>
          </>
        )}
      </div>

      <h2 className="text-2xl font-black tracking-tight text-white mb-4">
        {isHighDemandError ? "AI is Catching Its Breath" : "Analysis Failed"}
      </h2>
      <p className="text-white/40 max-w-md mx-auto leading-relaxed mb-10">
        {message || "We encountered an unexpected error while analyzing your resume. This could be due to a network issue or a temporarily unavailable AI model."}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        {isLimitError && onCheckPricing ? (
          <button
            onClick={onCheckPricing}
            className="group flex items-center gap-2 rounded-full bg-indigo-500 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-400 hover:scale-105 shadow-[0_0_20px_rgba(99,102,241,0.4)]"
          >
            <CreditCard className="h-4 w-4" />
            Check Pricing
          </button>
        ) : isHighDemandError ? (
          <button
            onClick={onRetry}
            className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-3 text-sm font-semibold text-white transition-all hover:scale-105 shadow-[0_0_20px_rgba(245,158,11,0.2)] border border-amber-400/20 cursor-pointer"
          >
            <RefreshCcw className="h-4 w-4 transition-transform group-hover:rotate-180 duration-500" />
            Try Again
          </button>
        ) : (
          <button
            onClick={onRetry}
            className="group flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition-all hover:scale-105 cursor-pointer"
          >
            <RefreshCcw className="h-4 w-4 transition-transform group-hover:rotate-180 duration-500" />
            Try Again
          </button>
        )}
        <button
          onClick={onReset}
          className="flex items-center gap-2 rounded-full bg-white/5 px-8 py-3 text-sm font-semibold text-white/60 transition-all hover:bg-white/10 hover:text-white cursor-pointer"
        >
          <Home className="h-4 w-4" />
          Go Home
        </button>
      </div>
    </motion.div>
  );
};
