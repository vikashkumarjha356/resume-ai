import { motion } from 'framer-motion';
import { UploadCloud, Cpu, LineChart, FileText } from 'lucide-react';

const steps = [
  {
    title: "Upload Resume",
    description: "Securely upload your current resume in PDF format. We extract the content instantly.",
    icon: UploadCloud,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20"
  },
  {
    title: "AI Analysis",
    description: "Our neural engine scans for ATS compatibility, keywords, and recruiter signals.",
    icon: Cpu,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20"
  },
  {
    title: "Get Insights",
    description: "Receive a detailed breakdown of weaknesses, formatting issues, and impact gaps.",
    icon: LineChart,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20"
  },
  {
    title: "Generate Resume",
    description: "Export a rewritten, recruiter-ready resume optimized for your target role.",
    icon: FileText,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20"
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-[10px] uppercase tracking-wider font-bold text-indigo-400 mb-8"
          >
            Seamless Workflow
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            How it <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Works</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-purple-500/20" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center group"
            >
              <div className={`w-24 h-24 rounded-3xl ${step.bg} ${step.border} border backdrop-blur-xl flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform duration-500`}>
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                <step.icon className={`w-10 h-10 ${step.color}`} />
                
                {/* Step Number Badge */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-xs font-bold text-white shadow-xl">
                  {i + 1}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed px-2">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
