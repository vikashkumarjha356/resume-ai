import { motion } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative pt-32 pb-8 overflow-hidden">
      <div className="flex flex-col items-center text-center">


        {/* Headline with enhanced gradients */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-7xl font-semibold tracking-tight mb-8 leading-[1.1] max-w-4xl"
        >
          <span className="text-white">Turn your resume into a</span> <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 animate-gradient-x">
            Recruiter Magnet
          </span>
        </motion.h1>

        {/* Subheadline with better hierarchy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-xl md:text-2xl text-white/40 max-w-3xl leading-relaxed mb-16 px-4 font-medium tracking-tight"
        >
          Stop guessing what recruiters want. Get deep ATS analysis, instant feedback, and data-backed optimization to land more interviews.
        </motion.p>

        {/* High-Performance CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-6 px-4 w-full justify-center"
        >
          <button
            onClick={onGetStarted}
            className="group relative h-14 px-8 rounded-[14px] bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-bold text-sm transition-all hover:scale-105 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_40px_rgba(79,70,229,0.6)] w-full sm:w-auto active:scale-95 cursor-pointer overflow-hidden border border-white/10"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 tracking-wide uppercase">
              Optimize My Resume <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button className="group h-14 px-8 rounded-[14px] bg-white/[0.02] border border-white/10 text-white font-medium text-sm transition-all hover:bg-white/[0.04] hover:border-white/20 backdrop-blur-md w-full sm:w-auto flex items-center justify-center gap-2 shadow-xl active:scale-95 cursor-pointer">
            <Play className="h-4 w-4 text-white/60 group-hover:text-white transition-colors" />
            Watch demo
          </button>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-12 flex flex-col items-center gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="h-px w-8 bg-white/5" />
            <p className="text-sm font-medium text-white/40">
              Trusted by elite candidates
            </p>
            <div className="h-px w-8 bg-white/5" />
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 items-center">
            {/* Google */}
            <div className="flex items-center justify-center gap-2 h-14 w-36 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors group">
              <svg viewBox="0 0 24 24" className="h-5 w-5 opacity-40 group-hover:opacity-100 transition-opacity">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="font-sans font-bold text-lg tracking-tight text-white/40 group-hover:text-white/80 transition-colors">Google</span>
            </div>

            {/* Microsoft */}
            <div className="flex items-center justify-center gap-2 h-14 w-40 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors group">
              <div className="grid grid-cols-2 gap-0.5 opacity-40 group-hover:opacity-100 transition-opacity">
                <div className="h-2 w-2 bg-[#f25022]" />
                <div className="h-2 w-2 bg-[#7fba00]" />
                <div className="h-2 w-2 bg-[#00a1f1]" />
                <div className="h-2 w-2 bg-[#ffb900]" />
              </div>
              <span className="font-semibold text-lg text-white/40 group-hover:text-white/80 transition-colors">Microsoft</span>
            </div>

            {/* Amazon */}
            <div className="flex items-center justify-center gap-2 h-14 w-36 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors group">
              <svg viewBox="0 0 448 512" className="h-5 w-5 opacity-40 group-hover:opacity-100 transition-opacity" fill="currentColor">
                <path d="M257.2 162.7c-48.7 1.8-169.5 15.5-169.5 117.5c0 109.5 138.3 114 183.5 43.2c6.5 10.2 35.4 37.5 45.3 46.8l56.8-56S341 288.9 341 261.4V114.3C341 89 316.5 32 228.7 32C140.7 32 94 87 94 136.3l73.5 6.8c16.3-49.5 54.2-49.5 54.2-49.5c40.7-.1 35.5 29.8 35.5 69.1m0 86.8c0 80-84.2 68-84.2 17.2c0-47.2 50.5-56.7 84.2-57.8zm136 163.5c-7.7 10-70 67-174.5 67S34.2 408.5 9.7 379c-6.8-7.7 1-11.3 5.5-8.3C88.5 415.2 203 488.5 387.7 401c7.5-3.7 13.3 2 5.5 12m39.8 2.2c-6.5 15.8-16 26.8-21.2 31c-5.5 4.5-9.5 2.7-6.5-3.8s19.3-46.5 12.7-55c-6.5-8.3-37-4.3-48-3.2c-10.8 1-13 2-14-.3c-2.3-5.7 21.7-15.5 37.5-17.5c15.7-1.8 41-.8 46 5.7c3.7 5.1 0 27.1-6.5 43.1"/>
              </svg>
              <span className="font-bold text-lg tracking-tighter text-white/40 group-hover:text-white/80 transition-colors">amazon</span>
            </div>

            {/* Meta */}
            <div className="flex items-center justify-center gap-2 h-14 w-36 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors group">
              <svg viewBox="0 0 24 24" className="h-6 w-6 opacity-40 group-hover:opacity-100 transition-opacity" fill="#0064e0">
                <path d="M16.48 5.45c-1.3 0-2.45.61-3.23 1.58-.78-.97-1.93-1.58-3.23-1.58-2.35 0-4.25 1.9-4.25 4.25s1.9 4.25 4.25 4.25c1.3 0 2.45-.61 3.23-1.58.78.97 1.93 1.58 3.23 1.58 2.35 0 4.25-1.9 4.25-4.25s-1.9-4.25-4.25-4.25zm-6.46 6.8c-1.41 0-2.55-1.14-2.55-2.55s1.14-2.55 2.55-2.55 2.55 1.14 2.55 2.55-1.14 2.55-2.55 2.55zm6.46 0c-1.41 0-2.55-1.14-2.55-2.55s1.14-2.55 2.55-2.55 2.55 1.14 2.55 2.55-1.14 2.55-2.55 2.55z" />
              </svg>
              <span className="font-semibold text-xl text-white/40 group-hover:text-white/80 transition-colors">Meta</span>
            </div>

            {/* Netflix */}
            <div className="flex items-center justify-center gap-2 h-14 w-36 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors group">
              <svg viewBox="0 0 24 24" className="h-5 w-5 opacity-40 group-hover:opacity-100 transition-opacity" fill="#e50914">
                <path d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.86-.004-15.913.002-22.95zM5.398 1.05V24c1.873-.225 2.81-.312 4.715-.398v-9.22z"/>
              </svg>
              <span className="font-black text-lg tracking-widest text-white/40 group-hover:text-[#e50914] transition-colors">NETFLIX</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
