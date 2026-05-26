import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface LiveTerminalProps {
  streamText: string;
}

export const LiveTerminal = ({ streamText }: LiveTerminalProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom as text streams in
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [streamText]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-white/10 bg-slate-950 shadow-2xl relative"
    >
      {/* Terminal Header */}
      <div className="flex items-center px-4 py-3 bg-slate-900 border-b border-white/5">
        <div className="flex gap-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
        </div>
        <div className="flex items-center gap-2 text-white/40 text-xs font-mono">
          <Terminal className="h-4 w-4" />
          resume-ai-core — analyzing_resume.sh
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        ref={scrollRef}
        className="p-6 h-[500px] overflow-y-auto font-mono text-sm leading-relaxed"
      >
        <div className="text-cyan-400 mb-4 opacity-80">
          $ init_analysis --model=resume-ai-core --mode=strict_recruiter
          <br />
          <span className="text-white/40">Initializing parsing engines... OK</span>
          <br />
          <span className="text-white/40">Evaluating chronology against current date... OK</span>
          <br />
          <span className="text-emerald-400">Streaming recruiter assessment:</span>
        </div>

        <pre className="text-indigo-300 whitespace-pre-wrap break-words">
          {streamText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-2.5 h-4 ml-1 bg-indigo-400 align-middle"
          />
        </pre>
      </div>

      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-500/5 pointer-events-none" />
    </motion.div>
  );
};
