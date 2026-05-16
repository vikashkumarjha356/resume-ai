import { Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Command, ChevronDown } from 'lucide-react';
import { UserButton } from './components/UserButton';
import { Toaster } from 'sonner';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { AnalysisDetail } from './pages/AnalysisDetail';
import { Globe, Sparkles, Layout } from 'lucide-react';

function App() {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-indigo-500/30 selection:text-white font-sans antialiased flex flex-col">
      <Toaster position="bottom-right" theme="dark" richColors />
      
      {/* Premium Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-[#020617]/80 backdrop-blur-2xl border-b border-white/5 px-6 py-4 shadow-2xl flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" onClick={scrollToTop} className="flex items-center gap-4 cursor-pointer group pl-2">
            <div className="h-10 w-10 rounded-xl bg-slate-950/80 border border-white/10 flex items-center justify-center shadow-inner">
              <Command className="h-4 w-4 text-indigo-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-widest leading-none text-white uppercase">RESUMEAI</span>
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40 mt-1">Enterprise AI</span>
            </div>
          </Link>

          {/* Center Links */}
          <div className="hidden lg:flex items-center gap-14">
            <a href="#" className="text-sm font-medium text-white/90 hover:text-white transition-colors">Platform</a>
            <a href="#" className="text-sm font-medium text-white/90 hover:text-white transition-colors flex items-center gap-1">
              Solutions <ChevronDown className="h-3 w-3 opacity-50" />
            </a>
            <a href="#" className="text-sm font-medium text-white/90 hover:text-white transition-colors">Enterprise</a>
            <a href="#" className="text-sm font-medium text-white/90 hover:text-white transition-colors">Changelog</a>
            <a href="#" className="text-sm font-medium text-white/90 hover:text-white transition-colors">Pricing</a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6 pr-2">
            <div className="pl-2 border-l border-white/10">
              <UserButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Atmospheric Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none bg-[#020617] z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.03)_0%,transparent_100%)]" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] bg-indigo-500/15 rounded-full blur-[160px] mix-blend-screen"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], x: [0, -80, 0], y: [0, -40, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[10%] -right-[20%] w-[70%] h-[70%] bg-violet-500/15 rounded-full blur-[180px] mix-blend-screen"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], y: [0, 100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute bottom-[-20%] left-[10%] w-[60%] h-[60%] bg-cyan-500/10 rounded-full blur-[140px] mix-blend-screen"
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analysis/:id" element={<AnalysisDetail />} />
        </Routes>
      </div>

      <footer className="relative z-10 border-t border-white/5 bg-slate-950/40 backdrop-blur-3xl py-24 mt-auto">
        <div className="mx-auto max-w-7xl px-8 grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <Command className="h-6 w-6 text-indigo-400" />
              <span className="text-xl font-black tracking-tight">RESUMEAI</span>
            </div>
            <p className="text-sm text-white/30 max-w-sm leading-relaxed font-medium">
              The world's most advanced AI-powered resume optimization engine. Purpose-built for elite career progression.
            </p>
            <div className="flex gap-6">
               {[Globe, Sparkles, Layout].map((Icon, i) => (
                 <Icon key={i} className="h-5 w-5 text-white/20 hover:text-indigo-400 transition-colors cursor-pointer" />
               ))}
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Product</h4>
            <ul className="space-y-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
              <li className="hover:text-white cursor-pointer transition-colors">Analyzer</li>
              <li className="hover:text-white cursor-pointer transition-colors">Optimizer</li>
              <li className="hover:text-white cursor-pointer transition-colors">Integrations</li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Company</h4>
            <ul className="space-y-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
              <li className="hover:text-white cursor-pointer transition-colors">About</li>
              <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-white cursor-pointer transition-colors">Security</li>
            </ul>
          </div>
        </div>
        <div className="text-center px-8 border-t border-white/5 pt-16">
          <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/10">
            © 2026 ResumeAI Engineering
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
