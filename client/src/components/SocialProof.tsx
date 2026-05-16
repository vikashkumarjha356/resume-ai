import { motion } from 'framer-motion';
import { Star, TrendingUp, Users, CheckCircle2 } from 'lucide-react';

const stats = [
  { label: "Resumes Analyzed", value: "500+", icon: CheckCircle2, color: "text-blue-400" },
  { label: "Average ATS Jump", value: "32%", icon: TrendingUp, color: "text-emerald-400" },
  { label: "Core Roles Optimized", value: "15+", icon: Users, color: "text-purple-400" }
];

const testimonials = [
  {
    quote: "Landed an interview at Meta just 4 days after using ResumeAI to optimize my bullets.",
    author: "Sarah K.",
    role: "Senior Frontend Engineer",
    avatar: "S"
  },
  {
    quote: "The precision is incredible. It caught ATS gaps that three other 'checkers' completely missed.",
    author: "David L.",
    role: "Product Manager",
    avatar: "D"
  },
  {
    quote: "Finally a tool that actually understands engineering impact. My callback rate has doubled.",
    author: "Elena R.",
    role: "Data Architect",
    avatar: "E"
  }
];

export const SocialProof = () => {
  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-10 rounded-[2.5rem] border border-white/5 bg-slate-900/30 backdrop-blur-md text-center group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]" />
              <div className={`mx-auto w-12 h-12 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-center mb-6 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-4xl font-bold text-white mb-2 tracking-tight">{stat.value}</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Roles & Trusted Section */}
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-slate-500 uppercase tracking-[0.3em] mb-12"
          >
            Optimized for Modern Tech Roles
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 opacity-40">
            {['Developers', 'Designers', 'Product Managers', 'Engineers', 'Architects', 'Analysts'].map((role, i) => (
              <span key={i} className="text-xl md:text-2xl font-bold text-white whitespace-nowrap">{role}</span>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[2rem] border border-white/5 bg-slate-900/20 flex flex-col h-full relative group"
            >
              <div className="flex gap-1 mb-6 text-yellow-500/50">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
              </div>
              <p className="text-slate-300 leading-relaxed mb-8 flex-grow">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-xs font-bold text-white border border-white/10">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{t.author}</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
