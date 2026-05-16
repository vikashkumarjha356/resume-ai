import { Upload, FileText, X, AlertCircle, CheckCircle2, Sparkles, Layout, ArrowRight, Lock } from 'lucide-react';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { cn } from '../utils/cn';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

interface UploadFormProps {
  onAnalyze: (file: File, jobDescription: string) => void;
  isLoading: boolean;
}

export const UploadForm = ({ onAnalyze, isLoading }: UploadFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showValidation, setShowValidation] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileShake = useAnimation();
  const descShake = useAnimation();
  
  const { user, signInWithGoogle } = useAuth();

  const requireAuth = () => {
    if (!user) {
      toast.error('Authentication Required', {
        description: 'Please sign in to upload and analyze your resume.',
        action: {
          label: 'Sign In',
          onClick: () => signInWithGoogle()
        }
      });
      return false;
    }
    return true;
  };

  const validateFile = (file: File) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a PDF or DOCX file.');
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!requireAuth()) {
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (user) setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!requireAuth()) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requireAuth()) return;
    
    if (!file || !jobDescription.trim()) {
      setShowValidation(true);
      if (!file) {
        fileShake.start({ x: [-8, 8, -8, 8, 0], transition: { duration: 0.4 } });
      }
      if (!jobDescription.trim()) {
        descShake.start({ x: [-8, 8, -8, 8, 0], transition: { duration: 0.4 } });
      }
      return;
    }
    
    setShowValidation(false);
    onAnalyze(file, jobDescription);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Left Column: File Upload */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
                <FileText className="h-4 w-4 text-indigo-400" />
              </div>
              <label className="text-sm font-semibold text-white/90">
                Resume document
              </label>
            </div>
            <AnimatePresence>
              {file && (
                <motion.span 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-1.5 text-xs font-medium text-cyan-400"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" /> Ready
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          
          <motion.div
            animate={fileShake}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => {
              if (requireAuth()) fileInputRef.current?.click();
            }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={cn(
              "group relative flex h-72 cursor-pointer flex-col items-center justify-center rounded-[2rem] border border-dashed backdrop-blur-xl transition-all duration-500",
              isDragging 
                ? "border-indigo-500/50 bg-indigo-500/10 shadow-[0_0_60px_rgba(99,102,241,0.2)]" 
                : "border-white/20 bg-transparent hover:border-indigo-500/40 hover:bg-white/[0.02]",
              (error || (showValidation && !file)) && "border-rose-500/50 bg-rose-500/5"
            )}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.docx"
              className="hidden"
            />
            
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            
            {/* Subtle Top Light */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <AnimatePresence mode="wait">
              {file ? (
                <motion.div
                  key="file-active"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative z-10 flex flex-col items-center p-6 text-center"
                >
                  <div className="relative mb-6">
                    <div className="absolute inset-0 blur-3xl bg-indigo-500/30 rounded-full animate-pulse" />
                    <div className="relative rounded-2xl bg-slate-900 border border-white/10 p-5 shadow-2xl">
                      <FileText className="h-10 w-10 text-indigo-400" />
                    </div>
                  </div>
                  <h4 className="text-base font-medium text-white tracking-tight">{file.name}</h4>
                  <p className="mt-2 text-xs font-medium text-white/40">
                    {(file.size / 1024).toFixed(1)} KB • {file.name.split('.').pop()?.toUpperCase()}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                    className="mt-8 flex items-center gap-2 rounded-full bg-white/5 border border-white/5 px-6 py-2.5 text-xs font-medium text-white/60 transition-all hover:bg-rose-500/20 hover:border-rose-500/30 hover:text-rose-400 hover:shadow-[0_0_20px_rgba(244,63,94,0.2)] cursor-pointer"
                  >
                    <X className="h-4 w-4" /> Remove
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="upload-idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative z-10 flex flex-col items-center"
                >
                  <div className="mb-6 h-14 w-14 rounded-2xl border-2 border-indigo-500/30 bg-gradient-to-b from-indigo-500/20 to-transparent flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                    <Upload className="h-6 w-6 text-white transition-colors group-hover:scale-110" />
                  </div>
                  <p className="text-sm font-semibold text-white/90 transition-colors">
                    Drag & drop your resume here
                  </p>
                  <p className="mt-2 text-xs font-medium text-white/40 transition-colors">
                    PDF, DOCX • Max 5MB
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-6 flex items-center gap-2 rounded-full bg-rose-500/10 border border-rose-500/20 px-4 py-2 text-xs font-medium text-rose-400"
                >
                  <AlertCircle className="h-4 w-4" /> {error}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Right Column: Job Description */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
                <Layout className="h-4 w-4 text-indigo-400" />
              </div>
              <label className="text-sm font-semibold text-white/90">
                Target job description
              </label>
            </div>
            <span className={cn(
              "text-xs font-medium transition-colors",
              jobDescription.length > 0 ? "text-cyan-400" : "text-white/20"
            )}>
              {jobDescription.length} chars
            </span>
          </div>
          <motion.div animate={descShake} className="relative group h-72">
            <textarea
              value={jobDescription}
              onChange={(e) => {
                setJobDescription(e.target.value);
                if (showValidation && e.target.value.trim()) {
                  setShowValidation(false);
                }
              }}
              placeholder="Paste the job requirements, responsibilities,&#10;and qualifications here...&#10;&#10;The more context you provide, the better&#10;the AI can tailor your resume analysis."
              className={cn(
                "absolute inset-0 h-full w-full resize-none rounded-[2rem] border bg-transparent p-8 text-sm leading-relaxed text-white placeholder:text-white/40 focus:outline-none focus:ring-1 transition-all",
                showValidation && !jobDescription.trim() 
                  ? "border-rose-500/50 bg-rose-500/5 focus:border-rose-500/50 focus:ring-rose-500/30"
                  : "border-white/10 hover:border-white/20 hover:bg-white/[0.01] focus:border-indigo-500/50 focus:bg-white/[0.02] focus:ring-indigo-500/30"
              )}
            />
          </motion.div>
        </div>
      </div>

      {/* Action Button & Trust Strip */}
      <div className="flex flex-col items-center space-y-6 pt-12">
        <div className="relative group w-full max-w-md">
          {/* Outer glow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-[2rem] blur-xl opacity-40 group-hover:opacity-70 transition duration-1000 group-hover:duration-300" />
          
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative h-14 w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_auto] text-white transition-all shadow-[0_10px_30px_rgba(99,102,241,0.3)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer overflow-hidden animate-gradient"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 flex items-center justify-center gap-3">
              <Sparkles className="h-4 w-4" />
              <span className="text-[15px] font-bold text-white tracking-wide uppercase">
                {isLoading ? 'Processing...' : 'Optimize My Resume'}
              </span>
              <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </motion.button>
        </div>
        
        <div className="flex items-center gap-2 text-white/50 text-xs font-medium">
          <Lock className="h-3 w-3 text-indigo-400" />
          <span className="text-indigo-400">Secure AI processing</span>
          <span className="opacity-50">•</span>
          <span>End-to-end encrypted</span>
        </div>
      </div>
    </form>
  );
};
