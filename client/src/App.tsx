import { Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Command } from 'lucide-react';
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
      <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-[#020617]/70 backdrop-blur-xl border-b border-white/5 px-8 h-20 flex items-center justify-center transition-all duration-300">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" onClick={scrollToTop} className="flex items-center gap-3 cursor-pointer group">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.3)] group-hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] transition-all">
              <Command className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-indigo-100 transition-colors">RESUMEAI</span>
          </Link>

          {/* Center Links */}
          <div className="hidden lg:flex items-center gap-10">
            {[
              { label: 'Features', href: '#features' },
              { label: 'How it Works', href: '#how-it-works' },
              { label: 'Pricing', href: '#pricing' }
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-sm font-medium text-slate-400 hover:text-white transition-colors group py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-8">
            <div className="hidden md:block h-6 w-px bg-white/10" />
            <UserButton />
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

      <main className="relative z-10 flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analysis/:id" element={<AnalysisDetail />} />
        </Routes>
      </main>

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
