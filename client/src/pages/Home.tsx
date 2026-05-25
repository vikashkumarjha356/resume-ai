import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadForm } from '../components/UploadForm';
import { ResultCard } from '../components/ResultCard';
import { Loader } from '../components/Loader';
import { useResumeAnalysis } from '../hooks/useResumeAnalysis';
import { ArrowLeft } from 'lucide-react';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';
import { Hero } from '../components/Hero';
import { WhyResumeAI } from '../components/WhyResumeAI';
import { HowItWorks } from '../components/HowItWorks';
import { BeforeAfter } from '../components/BeforeAfter';
import { SocialProof } from '../components/SocialProof';
import { Pricing } from '../components/Pricing';
import { Security } from '../components/Security';

export const Home = () => {
  const { analyze, loading, error, result, reset } = useResumeAnalysis();
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const analyzeRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = async (file: File, jobDescription: string) => {
    setOriginalFile(file);
    await analyze(file, jobDescription);
  };

  const handleReset = () => {
    setOriginalFile(null);
    reset();
  };

  const scrollToAnalyze = () => {
    analyzeRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (result || error) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (window.location.hash === '#analyze-section') {
      setTimeout(() => {
        scrollToAnalyze();
      }, 100);
    }
  }, [result, error]);

  return (
    <>
      <AnimatePresence mode="wait">
        {!result && !error && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -60, transition: { duration: 0.5 } }}
          >
            <Hero onGetStarted={scrollToAnalyze} />
            <WhyResumeAI />
            <HowItWorks />
            <BeforeAfter />
            <SocialProof />
            <Pricing onGetStarted={scrollToAnalyze} />
            <Security />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="mx-auto max-w-5xl px-8 pb-40">
        <AnimatePresence mode="wait">
          {error ? (
            <motion.div key="error-container" className="pt-32" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ErrorState 
                key="error"
                message={error} 
                onRetry={reset} 
                onReset={() => {
                  window.history.pushState('', document.title, window.location.pathname + window.location.search);
                  handleReset();
                  setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 10);
                }}
                onCheckPricing={() => {
                  window.history.pushState('', document.title, window.location.pathname + window.location.search);
                  handleReset();
                  setTimeout(() => {
                    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              />
            </motion.div>
          ) : loading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20"
            >
              <Loader />
            </motion.div>
          ) : result ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="pt-32"
            >
              <div className="mb-16 flex items-center justify-between">
                <button
                  onClick={handleReset}
                  className="group flex items-center gap-4 text-sm font-semibold text-white/90 transition-all hover:text-white cursor-pointer"
                >
                  <div className="h-12 w-12 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center transition-all group-hover:bg-indigo-500 group-hover:border-indigo-400 group-hover:text-white shadow-xl">
                    <ArrowLeft className="h-5 w-5" />
                  </div>
                  New assessment
                </button>
              </div>
              <ResultCard data={result} originalFile={originalFile} />
            </motion.div>
          ) : (
            <motion.div
              key="form"
              id="analyze-section"
              ref={analyzeRef}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -60 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="pt-0 scroll-mt-32"
            >
              <div className="flex flex-col items-center w-full max-w-6xl mx-auto">
                <div className="w-full mt-4">
                  <UploadForm onAnalyze={handleAnalyze} isLoading={loading} />
                </div>
              </div>
              <EmptyState />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};
