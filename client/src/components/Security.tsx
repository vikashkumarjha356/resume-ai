import { motion } from 'framer-motion';
import { ShieldCheck, Lock, EyeOff, Server } from 'lucide-react';

const securityFeatures = [
  {
    title: "End-to-End Encryption",
    desc: "Your resumes are encrypted at rest using industry-standard AES-256 encryption.",
    icon: Lock
  },
  {
    title: "Ephemeral Processing",
    desc: "Data is processed in secure, isolated environments and wiped immediately after analysis.",
    icon: Server
  },
  {
    title: "Privacy First",
    desc: "We never sell your data or use your resumes to train third-party AI models.",
    icon: EyeOff
  }
];

export const Security = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-slate-900/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-6"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Secure Infrastructure
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight"
            >
              Your data is <span className="text-emerald-400">your own</span>.
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 text-lg mb-8 leading-relaxed"
            >
              We understand the sensitivity of your career data. ResumeAI is built with a privacy-first architecture, ensuring your information stays protected at every step.
            </motion.p>

            <div className="flex items-center gap-8 pt-4 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-500">
              {/* Subtle Trust Badges */}
              <div className="flex items-center gap-2 text-white font-bold tracking-tighter text-sm">
                <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-[10px]">AES</div>
                256-BIT
              </div>
              <div className="flex items-center gap-2 text-white font-bold tracking-tighter text-sm uppercase">
                <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-[10px]">SSL</div>
                Secure
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {securityFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-white/5 bg-slate-900/20 backdrop-blur-sm flex items-start gap-4 group hover:bg-slate-900/40 hover:border-emerald-500/20 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1">{feature.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
