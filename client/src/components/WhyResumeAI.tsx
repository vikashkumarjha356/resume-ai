import { motion } from 'framer-motion';
import { Target, Zap, FileOutput } from 'lucide-react';

const features = [
  {
    title: "ATS Optimization",
    desc: "We don't just find keywords; we strategically align your resume with specific job requirements to beat the algorithm.",
    icon: Target,
    color: "from-blue-400 to-cyan-400",
    glow: "bg-blue-500/20"
  },
  {
    title: "AI Resume Rewrite",
    desc: "Our engine transforms weak task descriptions into high-impact achievement statements that catch recruiter attention.",
    icon: Zap,
    color: "from-violet-400 to-purple-400",
    glow: "bg-purple-500/20"
  },
  {
    title: "Preserved Export",
    desc: "Download professional reports that highlight your improvements while maintaining a recruiter-ready format.",
    icon: FileOutput,
    color: "from-rose-400 to-orange-400",
    glow: "bg-rose-500/20"
  }
];

export const WhyResumeAI = () => {
  return (
    <section id="features" className="py-32 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-[10px] uppercase tracking-wider font-bold text-blue-400 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            Product Excellence
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight leading-[1.1]"
          >
            More than an <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">ATS checker</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-400 leading-relaxed font-medium"
          >
            Most resume tools only score your resume. ResumeAI actually improves it by applying neural optimization to every single bullet point.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative h-full"
            >
              <div className={`absolute inset-0 rounded-[2.5rem] ${feature.glow} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              <div className="relative h-full p-10 rounded-[2.5rem] border border-white/10 bg-slate-900/40 backdrop-blur-2xl hover:bg-slate-900/60 transition-all duration-500 flex flex-col shadow-2xl">
                {/* Decorative mesh background */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-[2.5rem] overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                </div>

                <div className={`mb-10 w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${feature.color} shadow-lg relative`}>
                   <div className="absolute inset-0.5 bg-slate-950 rounded-[14px] flex items-center justify-center">
                    <feature.icon className={`h-7 w-7 text-white`} />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                  {feature.title}
                </h3>
                
                <p className="text-slate-400 leading-relaxed font-medium mb-8 flex-grow">
                  {feature.desc}
                </p>
                
                <div className="pt-6 border-t border-white/5 flex items-center text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-blue-400 transition-colors">
                  Platform Core
                  <span className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
