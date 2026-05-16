import { motion } from 'framer-motion';
import { Target, Zap, ShieldCheck, Sparkles } from 'lucide-react';

export const EmptyState = () => {
  const features = [
    {
      icon: Target,
      label: "ATS Precision",
      desc: "Beat automated screening bots with strategic keyword placement.",
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/20"
    },
    {
      icon: Zap,
      label: "Neural Analysis",
      desc: "Instant AI feedback based on over 100,000 successful job placements.",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20"
    },
    {
      icon: ShieldCheck,
      label: "Executive Polish",
      desc: "Transform simple tasks into high-impact achievement bullets.",
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      border: "border-violet-500/20"
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid gap-8 md:grid-cols-3 mt-16"
    >
      {features.map((feature, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 + 0.3 }}
          className="group rounded-[2.5rem] border border-white/5 bg-slate-900/40 p-10 transition-all hover:border-white/10 hover:bg-slate-900/60 shadow-2xl overflow-hidden relative"
        >
          {/* Ambient Glow */}
          <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity ${feature.bg.replace('/10', '/5')}`} />

          <div className={`mb-8 rounded-2xl p-5 w-fit ring-1 shadow-lg transition-all group-hover:scale-110 ${feature.bg} ${feature.border} ${feature.color}`}>
            <feature.icon className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-semibold text-white/90 mb-3">
            {feature.label}
          </h3>
          <p className="text-sm text-white/50 leading-relaxed font-medium">
            {feature.desc}
          </p>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="md:col-span-3 flex items-center justify-center gap-4 mt-12 py-6 border-y border-white/5"
      >
        <Sparkles className="h-3 w-3 text-indigo-500/40" />
        <span className="text-xs font-medium text-white/40">
          Ready to optimize • Select your resume above
        </span>
        <Sparkles className="h-3 w-3 text-cyan-500/40" />
      </motion.div>
    </motion.div>
  );
};
