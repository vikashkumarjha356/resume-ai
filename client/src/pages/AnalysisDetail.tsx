import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAnalysisById } from '../services/api';
import { ResultCard } from '../components/ResultCard';
import { Loader } from '../components/Loader';
import { ArrowLeft, Calendar, FileText } from 'lucide-react';
import { toast } from 'sonner';

export const AnalysisDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!id) return;
      try {
        const data = await getAnalysisById(id);
        setAnalysis(data);
      } catch (error: any) {
        console.error("Failed to fetch analysis", error);
        toast.error(error.message || "Failed to load analysis");
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="pt-40 pb-40 px-8 flex flex-col items-center justify-center min-h-screen">
        <Loader />
        <p className="mt-8 text-white/50 animate-pulse">Loading report history...</p>
      </div>
    );
  }

  if (!analysis) return null;

  const date = new Date(analysis.created_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="pt-32 pb-40 px-8 max-w-7xl mx-auto min-h-screen">
      <div className="mb-12">
        <button
          onClick={() => navigate('/dashboard')}
          className="group flex items-center gap-3 text-sm font-semibold text-white/60 transition-all hover:text-white mb-8"
        >
          <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center transition-all group-hover:bg-indigo-500 group-hover:border-indigo-400 group-hover:text-white shadow-xl">
            <ArrowLeft className="h-5 w-5" />
          </div>
          Back to dashboard
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl"
        >
          <div className="flex items-center gap-6">
            <div className="h-16 w-16 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <FileText className="h-8 w-8 text-indigo-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Historical Analysis Report</h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2 text-white/40 text-sm">
                  <Calendar className="h-4 w-4" />
                  {date}
                </div>
                <div className="h-1 w-1 rounded-full bg-white/20" />
                <div className="text-white/40 text-sm italic line-clamp-1 max-w-[200px] md:max-w-md">
                  "{analysis.job_description.substring(0, 60)}..."
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <ResultCard data={analysis.analysis_data} />
      </motion.div>
    </div>
  );
};
