import { motion, type Variants } from 'framer-motion';
import { ATSScoreCard } from './ATSScoreCard';
import { KeywordTags } from './KeywordTags';
import { BulletImprovementCard } from './BulletImprovementCard';
import { InsightListCard } from './InsightListCard';
import type { ResumeAnalysis } from '../types/resume';
import { Sparkles, Target, User, LayoutGrid, Copy, Check, Download } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { ExportSection } from './ExportSection';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export const ResultCard = ({ data }: { data: ResumeAnalysis }) => {
  const [copiedSummary, setCopiedSummary] = useState(false);

  const handleCopySummary = () => {
    navigator.clipboard.writeText(data.better_professional_summary);
    setCopiedSummary(true);
    toast.success('Summary copied to clipboard');
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-32 pb-32"
    >
      {/* Export & Utility Bar */}
      <motion.section variants={item} className="space-y-8">
        <div className="flex items-center gap-4 px-2">
          <div className="h-10 w-10 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center shadow-2xl">
            <Download className="h-5 w-5 text-white/40" />
          </div>
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-white">Export analysis</h3>
            <p className="text-sm font-medium text-white/40 mt-1">Download your results in multiple formats</p>
          </div>
        </div>
        <ExportSection data={data} />
      </motion.section>

      {/* Top Section: Hero Grid */}
      <motion.div variants={item} className="grid gap-10 lg:grid-cols-3">
        {/* ATS Score Column */}
        <div className="lg:col-span-1">
          <div className="mb-5 flex items-center gap-3 px-1">
            <div className="h-6 w-6 rounded-lg bg-indigo-500/10 flex items-center justify-center ring-1 ring-indigo-500/20">
              <LayoutGrid className="h-3.5 w-3.5 text-indigo-400" />
            </div>
            <span className="text-sm font-medium text-indigo-400">Analysis score</span>
          </div>
          <ATSScoreCard score={data.ats_score} />
        </div>
        
        {/* Professional Summary Column */}
        <div className="lg:col-span-2">
          <div className="mb-5 flex items-center gap-3 px-1">
            <div className="h-6 w-6 rounded-lg bg-cyan-500/10 flex items-center justify-center ring-1 ring-cyan-500/20">
              <User className="h-3.5 w-3.5 text-cyan-400" />
            </div>
            <span className="text-sm font-medium text-cyan-400">AI executive summary</span>
          </div>
          <div className="group relative h-full rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-12 backdrop-blur-3xl transition-all hover:border-cyan-500/30 hover:bg-white/[0.04] shadow-2xl hover:shadow-[0_0_40px_rgba(6,182,212,0.1)] overflow-hidden">
            {/* Abstract Decorative Element */}
            <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />
            
            <div className="relative">
              <span className="absolute -left-6 -top-12 text-[12rem] font-black text-white/[0.02] pointer-events-none select-none">“</span>
              <p className="text-xl font-medium leading-relaxed text-white/80 italic relative z-10 selection:bg-indigo-500/30">
                {data.better_professional_summary}
              </p>
            </div>
            <div className="mt-10 flex items-center justify-between">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/5">
                <Sparkles className="h-3 w-3 text-indigo-400" />
                <span className="text-xs font-medium text-white/50">Optimized by Gemini</span>
              </div>
              <button
                onClick={handleCopySummary}
                className="group flex items-center gap-2 rounded-full bg-white/5 px-6 py-2.5 text-xs font-medium text-white/60 transition-all hover:bg-white hover:text-slate-950 shadow-xl"
              >
                {copiedSummary ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copiedSummary ? 'Copied' : 'Copy summary'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Keywords Section */}
      <motion.section variants={item} className="space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-2">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-2xl bg-amber-500/10 flex items-center justify-center ring-1 ring-amber-500/20 shadow-lg shadow-amber-500/5">
              <Target className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-white">Missing Critical Keywords</h3>
              <p className="text-sm font-medium text-white/40 mt-1">Add these terms to your resume to increase your ATS match score</p>
            </div>
          </div>
        </div>
        <div className="rounded-[3rem] border border-white/10 bg-white/[0.02] p-12 shadow-2xl relative overflow-hidden group backdrop-blur-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] to-cyan-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
          <KeywordTags keywords={data.missing_keywords} />
          <div className="mt-12 pt-10 border-t border-white/5">
            <p className="text-sm font-medium text-white/60 leading-relaxed max-w-2xl">
              These keywords are identified in the job description but are currently <span className="text-amber-400/80">missing from your resume</span>. To improve your ATS visibility, weave these terms naturally into your professional experience and skills sections.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Bullet Improvements Section */}
      <motion.section variants={item} className="space-y-10">
        <div className="flex items-center gap-4 px-2">
          <div className="h-10 w-10 rounded-2xl bg-violet-500/10 flex items-center justify-center ring-1 ring-violet-500/20 shadow-lg shadow-violet-500/5">
            <Sparkles className="h-5 w-5 text-violet-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-white">Impact optimization</h3>
            <p className="text-sm font-medium text-white/40 mt-1">High-performance bullet point reconstruction</p>
          </div>
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          {data.improved_bullet_points?.map((bullet, index) => (
            <BulletImprovementCard key={index} text={bullet} />
          ))}
        </div>
      </motion.section>

      {/* New Optimization Sections */}
      <motion.section variants={item} className="grid gap-10 md:grid-cols-2">
        <InsightListCard 
          title="Recruiter Impression" 
          items={data.recruiter_impression} 
          type="impression" 
        />
        <InsightListCard 
          title="Resume Weaknesses" 
          items={data.resume_weaknesses} 
          type="weakness" 
        />
        <InsightListCard 
          title="Impact Improvements" 
          items={data.impact_improvements} 
          type="impact" 
        />
        <InsightListCard 
          title="Keyword Density Analysis" 
          items={data.keyword_density_analysis} 
          type="density" 
        />
        <InsightListCard 
          title="Formatting Issues" 
          items={data.formatting_issues} 
          type="formatting" 
        />
        <InsightListCard 
          title="Skills to Add" 
          items={data.skills_to_add} 
          type="skills" 
        />
        <div className="md:col-span-2">
          <InsightListCard 
            title="ATS Optimization Tips" 
            items={data.ats_optimization_tips} 
            type="optimization" 
          />
        </div>
      </motion.section>

      {/* Prepare UX for Rewrite Engine (Premium CTA) */}
      <motion.section variants={item} className="mt-20">
        <div className="relative overflow-hidden rounded-[3rem] border border-indigo-500/30 bg-slate-900/40 p-12 text-center backdrop-blur-xl group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 opacity-50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_100%)] blur-2xl" />
          
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(79,70,229,0.4)] group-hover:shadow-[0_0_50px_rgba(79,70,229,0.6)] transition-shadow">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Ready for the perfect resume?
            </h2>
            <p className="text-lg text-slate-400 mb-10 leading-relaxed">
              Let our AI completely rewrite your resume. We'll implement every optimization, improve your impact, and generate a recruiter-ready DOCX while preserving your original formatting.
            </p>
            
            <button className="group relative h-14 px-10 rounded-2xl bg-white text-slate-950 font-bold text-sm transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] active:scale-95 flex items-center gap-3 overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Generate Optimized Resume <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <p className="text-xs font-medium text-slate-500 mt-6 uppercase tracking-widest">
              Premium Feature • Coming Soon
            </p>
          </div>
        </div>
      </motion.section>

    </motion.div>
  );
};
