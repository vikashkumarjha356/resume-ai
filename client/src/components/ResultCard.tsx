import { motion, type Variants } from 'framer-motion';
import { ATSScoreCard } from './ATSScoreCard';
import { KeywordTags } from './KeywordTags';
import { BulletImprovementCard } from './BulletImprovementCard';
import { InsightListCard } from './InsightListCard';
import type { ResumeAnalysis } from '../types/resume';
import { Sparkles, Target, User, LayoutGrid, Copy, Check, Download, Upload, Loader2, CheckCircle2, AlertCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { ExportSection } from './ExportSection';
import { editResume } from '../services/api';

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

export const ResultCard = ({ data, originalFile }: { data: ResumeAnalysis; originalFile?: File | null }) => {
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Normalize summary and bullets for backwards compatibility with legacy analysis formats
  const normalizedSummary = typeof data.better_professional_summary === 'string'
    ? { original: '', improved: data.better_professional_summary }
    : data.better_professional_summary || { original: '', improved: '' };

  const normalizedBullets = (data.improved_bullet_points || []).map((b: any) =>
    typeof b === 'string' ? { original: '', improved: b } : b
  );

  const [selectedSummary, setSelectedSummary] = useState(!!normalizedSummary.original);
  const [customSummary, setCustomSummary] = useState(normalizedSummary.improved);

  const [selectedBullets, setSelectedBullets] = useState<Record<number, boolean>>(() => {
    const initial: Record<number, boolean> = {};
    normalizedBullets.forEach((bullet, index) => {
      initial[index] = !!bullet.original;
    });
    return initial;
  });

  const [customBullets, setCustomBullets] = useState<Record<number, string>>(() => {
    const initial: Record<number, string> = {};
    normalizedBullets.forEach((bullet, index) => {
      initial[index] = bullet.improved;
    });
    return initial;
  });

  const [localFile, setLocalFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [applyingChanges, setApplyingChanges] = useState(false);

  const fileToUse = originalFile || localFile;
  const isFileDocx = fileToUse?.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
    (fileToUse && fileToUse.name.endsWith('.docx'));

  const showSummarySection = !!normalizedSummary.original;
  const editableBullets = normalizedBullets.filter(b => !!b.original);

  const handleCopySummary = () => {
    navigator.clipboard.writeText(normalizedSummary.improved);
    setCopiedSummary(true);
    toast.success('Summary copied to clipboard');
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      const isDocx = droppedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
        droppedFile.name.endsWith('.docx');
      
      if (isDocx) {
        setLocalFile(droppedFile);
        toast.success(`Selected original resume file: ${droppedFile.name}`);
      } else {
        toast.error("Only .docx Word documents are supported for live editing.");
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const isDocx = selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
        selectedFile.name.endsWith('.docx');
      
      if (isDocx) {
        setLocalFile(selectedFile);
        toast.success(`Selected original resume file: ${selectedFile.name}`);
      } else {
        toast.error("Only .docx Word documents are supported for live editing.");
      }
    }
  };

  const handleApplyChanges = async () => {
    if (!fileToUse) {
      toast.error("Please provide your original .docx resume file first.");
      return;
    }
    if (!isFileDocx) {
      toast.error("Document editing is only supported for .docx resumes.");
      return;
    }

    setApplyingChanges(true);
    try {
      const changes: { original: string; improved: string }[] = [];
      
      if (selectedSummary && normalizedSummary.original) {
        changes.push({
          original: normalizedSummary.original,
          improved: customSummary
        });
      }

      normalizedBullets.forEach((bullet, index) => {
        if (selectedBullets[index] && bullet.original) {
          changes.push({
            original: bullet.original,
            improved: customBullets[index] || bullet.improved
          });
        }
      });

      if (changes.length === 0) {
        toast.error("No suggestions selected to apply.");
        setApplyingChanges(false);
        return;
      }

      const editedBlob = await editResume(fileToUse, changes);
      
      const downloadUrl = window.URL.createObjectURL(editedBlob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      
      const originalName = fileToUse.name;
      const dotIdx = originalName.lastIndexOf(".");
      const nameWithoutExt = dotIdx !== -1 ? originalName.substring(0, dotIdx) : originalName;
      link.download = `${nameWithoutExt}_optimized.docx`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      
      toast.success("Optimized resume generated and downloaded successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to patch resume document");
    } finally {
      setApplyingChanges(false);
    }
  };

  const renderDropZone = () => {
    return (
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleFileDrop}
        onClick={() => document.getElementById('docx-patcher-upload')?.click()}
        className={`w-full max-w-md border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center min-h-[140px] ${
          isDragOver 
            ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_30px_rgba(99,102,241,0.2)]' 
            : 'border-white/10 hover:border-white/20 bg-white/[0.01] hover:bg-white/[0.02]'
        }`}
      >
        <input
          type="file"
          id="docx-patcher-upload"
          onChange={handleFileSelect}
          accept=".docx"
          className="hidden"
        />
        <Upload className="h-6 w-6 text-white/40 mb-3" />
        <p className="text-xs font-bold text-white/80">
          Drag & drop or click to upload original .docx
        </p>
        <p className="text-[10px] text-white/30 mt-1">
          Microsoft Word format only • Max 5MB
        </p>
      </div>
    );
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
                {normalizedSummary.improved}
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
          {normalizedBullets?.map((bullet, index) => (
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

      {/* Live AI Resume Customizer Section */}
      <motion.section variants={item} className="mt-20">
        <div className="relative overflow-hidden rounded-[3.5rem] border border-indigo-500/20 bg-slate-950/40 p-12 backdrop-blur-3xl group shadow-2xl">
          {/* Subtle glowing backgrounds */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-violet-500/5 to-cyan-500/5 opacity-55" />
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-indigo-500/10 blur-[150px] pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none" />

          <div className="relative z-10 text-left">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10 mb-10">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Live AI Resume Tuner</h2>
                  <p className="text-sm font-medium text-white/40 mt-1">Review, customize, and apply AI suggestions directly to your Word document</p>
                </div>
              </div>
              
              {fileToUse && (
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                  <CheckCircle2 className="h-4 w-4 text-indigo-400" />
                  <span className="text-xs font-semibold text-white/70">Loaded: {fileToUse.name}</span>
                  {localFile && (
                    <button 
                      onClick={() => setLocalFile(null)} 
                      className="text-white/30 hover:text-rose-400 transition-colors ml-2"
                      title="Remove file"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Customizer body */}
            <div className="space-y-12">
              {/* 1. Professional Summary Patch */}
              {showSummarySection && (
                <div className="space-y-4 rounded-3xl border border-white/5 bg-white/[0.01] p-8 hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      id="patch-summary"
                      checked={selectedSummary}
                      onChange={(e) => setSelectedSummary(e.target.checked)}
                      className="mt-1.5 h-5 w-5 rounded-md border-white/15 bg-transparent text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0 transition-colors cursor-pointer"
                    />
                    <div className="flex-1 space-y-4">
                      <label htmlFor="patch-summary" className="text-base font-bold text-white cursor-pointer flex items-center gap-2 select-none">
                        Optimize Professional Summary
                      </label>
                      
                      {selectedSummary && (
                        <div className="grid gap-6 md:grid-cols-2 mt-4">
                          <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-wider text-white/30">Original (to find)</span>
                            <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 text-sm text-white/50 italic leading-relaxed">
                              "{normalizedSummary.original}"
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">AI Improved (editable)</span>
                            <textarea
                              value={customSummary}
                              onChange={(e) => setCustomSummary(e.target.value)}
                              rows={4}
                              className="w-full rounded-2xl border border-white/10 bg-[#090d1f] p-6 text-sm leading-relaxed text-white placeholder:text-white/30 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all resize-none"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Bullet Point Patches */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white/80 px-2 flex items-center gap-2">
                  Experience Bullet Point Improvements
                </h3>
                
                {editableBullets.length > 0 ? (
                  <div className="space-y-6">
                    {normalizedBullets.map((bullet, index) => {
                      if (!bullet.original) return null;
                      const isSelected = !!selectedBullets[index];

                      return (
                        <div 
                          key={index} 
                          className={`space-y-4 rounded-3xl border transition-all p-8 hover:bg-white/[0.02] ${
                            isSelected ? 'border-white/10 bg-white/[0.01]' : 'border-white/5 bg-transparent opacity-60'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <input
                              type="checkbox"
                              id={`patch-bullet-${index}`}
                              checked={isSelected}
                              onChange={(e) => setSelectedBullets(prev => ({ ...prev, [index]: e.target.checked }))}
                              className="mt-1.5 h-5 w-5 rounded-md border-white/15 bg-transparent text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0 transition-colors cursor-pointer"
                            />
                            <div className="flex-1 space-y-4">
                              <label htmlFor={`patch-bullet-${index}`} className="text-base font-bold text-white cursor-pointer select-none">
                                Optimize Bullet Point #{index + 1}
                              </label>

                              {isSelected && (
                                <div className="grid gap-6 md:grid-cols-2 mt-4">
                                  <div className="space-y-2">
                                    <span className="text-[10px] font-black uppercase tracking-wider text-white/30">Original (to find)</span>
                                    <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 text-sm text-white/50 italic leading-relaxed">
                                      "{bullet.original}"
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <span className="text-[10px] font-black uppercase tracking-wider text-violet-400">AI Improved (editable)</span>
                                    <textarea
                                      value={customBullets[index] !== undefined ? customBullets[index] : bullet.improved}
                                      onChange={(e) => setCustomBullets(prev => ({ ...prev, [index]: e.target.value }))}
                                      rows={3}
                                      className="w-full rounded-2xl border border-white/10 bg-[#090d1f] p-6 text-sm leading-relaxed text-white placeholder:text-white/30 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all resize-none"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-3xl border border-dashed border-white/10 p-8 text-center text-white/40 text-sm">
                    No matching experience bullet points found to replace automatically.
                  </div>
                )}
              </div>
            </div>

            {/* Document upload / download footer */}
            <div className="mt-12 pt-10 border-t border-white/10">
              {fileToUse ? (
                <div className="flex flex-col items-center space-y-4">
                  {isFileDocx ? (
                    <>
                      <button
                        onClick={handleApplyChanges}
                        disabled={applyingChanges}
                        className="group relative h-16 px-12 rounded-2xl bg-white text-slate-950 font-bold text-sm transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.25)] active:scale-95 flex items-center justify-center gap-3 overflow-hidden cursor-pointer"
                      >
                        {applyingChanges ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Applying AI Patches...
                          </>
                        ) : (
                          <>
                            <Download className="h-5 w-5" />
                            Apply Changes & Download DOCX
                          </>
                        )}
                      </button>
                      <p className="text-xs text-white/40">
                        Patches are applied directly in-memory. Your original document format, header, layout, and fonts are completely preserved.
                      </p>
                    </>
                  ) : (
                    <div className="w-full max-w-lg p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center space-y-4 mx-auto">
                      <div className="flex justify-center">
                        <AlertCircle className="h-8 w-8 text-amber-400" />
                      </div>
                      <p className="text-sm font-semibold text-white">
                        Live editing is only available for DOCX resumes
                      </p>
                      <p className="text-xs text-white/50 leading-relaxed">
                        The analyzed file was a PDF. Because PDFs are not editable in this manner, please select or drag & drop your original <strong className="text-amber-400">.docx</strong> file below to apply the optimizations.
                      </p>
                      <div className="flex justify-center pt-2">
                        {renderDropZone()}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-6">
                  <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-xs font-semibold">Original resume file missing (History View)</span>
                  </div>
                  <p className="text-sm text-slate-400 text-center max-w-md">
                    To apply these optimization changes, please select or drag & drop your original <strong className="text-white">.docx</strong> resume file.
                  </p>
                  
                  {renderDropZone()}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.section>

    </motion.div>
  );
};
