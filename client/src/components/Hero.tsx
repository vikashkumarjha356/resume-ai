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
          <span className="text-white">Optimize your</span> <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 animate-gradient-x">
            resume with AI
          </span>
        </motion.h1>

        {/* Subheadline with better hierarchy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-xl md:text-2xl text-white/40 max-w-3xl leading-relaxed mb-16 px-4 font-medium tracking-tight"
        >
          Instant ATS scores, strategic keyword optimization, and recruiter-ready bullet points. Land more interviews with data-backed precision.
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
            className="group relative h-14 px-8 rounded-[14px] bg-white text-slate-950 font-semibold text-sm transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] w-full sm:w-auto active:scale-95 cursor-pointer"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Analyze resume <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
              <svg viewBox="0 0 24 24" className="h-6 w-6 opacity-40 group-hover:opacity-100 transition-opacity" fill="currentColor">
                <path d="M15.932 9.336c-.275-.812-.746-1.486-1.457-2.064-.711-.577-1.574-.866-2.589-.866-1.321 0-2.392.483-3.213 1.45-.821.966-1.232 2.187-1.232 3.663 0 1.564.406 2.84 1.218 3.827.812.987 1.85 1.48 3.111 1.48 1.063 0 1.948-.316 2.656-.948v.73c0 .584-.149 1.03-.447 1.338-.298.308-.73.462-1.295.462-.834 0-1.457-.202-1.868-.605l-1.554 1.31c.346.407.842.735 1.488.985.646.25 1.401.375 2.264.375 1.411 0 2.518-.39 3.321-1.17.803-.78 1.205-1.954 1.205-3.521V9.335h-1.941v1.14c-.655-.77-1.402-1.14-2.241-1.14zm-1.802 6.095c-.413.435-.913.652-1.5.652-.619 0-1.103-.236-1.453-.708-.349-.472-.524-1.139-.524-1.999 0-.812.183-1.464.55-1.954.366-.49.882-.735 1.547-.735.561 0 1.025.213 1.391.64.366.427.55 1.002.55 1.724s-.187 1.353-.561 1.78zm5.176 4.902c-3.177 2.454-7.465 3.326-11.533 2.144-.938-.271-1.812-.667-2.614-1.167l-.422-.275 1.39-1.207.37.24c.732.48 1.52.85 2.37 1.1 3.52 1.01 7.23.23 9.94-1.88l.38-.29 1.25 1.37-.23.16-1.54.8zm1.025-1.613l-2.022.427-.333-2.04 1.135-.24c.328-.07.41-.353.18-.6l-1.96-2.12c-.22-.24-.59-.22-.78.04l-1.57 2.14c-.19.26-.06.53.25.56l1.13.1-.42 2.02-2.13.2c-3.26-.09-6.42-1.12-9.1-3.11-.23-.17-.18-.47.11-.53 2.15-.46 4.15-1.53 5.85-3.07.22-.2.13-.53-.15-.55-.63-.04-1.26-.11-1.88-.22-2.29-.41-4.38-1.35-6.13-2.73-.24-.19-.11-.54.19-.51 1.46.12 2.94.13 4.4.03 2.76-.18 5.43-.88 7.89-2.06.26-.13.52.12.39.37-.41.77-.92 1.48-1.52 2.12-1.25 1.33-2.77 2.41-4.48 3.18-.28.13-.24.51.08.56 1.14.16 2.29.23 3.44.18 2.05-.09 4.05-.51 5.92-1.24.31-.12.57.19.4.44-.45.67-.98 1.28-1.57 1.83-.24.23-.21.57.06.76 1.4 1 2.93 1.83 4.56 2.45.32.12.38.53.09.68-.69.34-1.4.63-2.13.88z"/></svg>
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
              <svg viewBox="0 0 24 24" className="h-4 w-4 opacity-40 group-hover:opacity-100 transition-opacity" fill="#e50914">
                <path d="M5.625 0h3.75v18.75c-1.25-1.25-2.5-2.5-3.75-3.75V0zm12.75 0h-3.75v18.75c1.25-1.25 2.5-2.5 3.75-3.75V0zM9.375 0l5.625 18.75V24l-5.625-18.75V0z" />
              </svg>
              <span className="font-black text-lg tracking-widest text-white/40 group-hover:text-[#e50914] transition-colors">NETFLIX</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
