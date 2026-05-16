import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getHistory } from '../services/api';
import { FileText, Calendar, LayoutGrid, ArrowRight, ExternalLink } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;
      try {
        const data = await getHistory();
        setHistory(data);
      } catch (error) {
        console.error("Failed to fetch history", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [user]);

  if (!user) {
    return (
      <div className="pt-32 pb-40 px-8 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Authentication Required</h2>
        <p className="text-white/50">Please sign in to view your dashboard.</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-40 px-8 max-w-7xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <LayoutGrid className="h-8 w-8 text-indigo-400" />
            My Analyses
          </h1>
          <p className="text-white/50 mt-2 text-sm">
            View and manage your past resume optimization reports.
          </p>
        </div>
        
        <Link 
          to="/"
          className="flex items-center gap-2 rounded-full bg-indigo-500 hover:bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-all shadow-lg hover:shadow-indigo-500/25"
        >
          New Analysis <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 rounded-2xl bg-white/5 border border-white/5 animate-pulse" />
          ))}
        </div>
      ) : history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white/[0.02] border border-white/5 rounded-3xl border-dashed">
          <FileText className="h-12 w-12 text-white/20 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No analyses yet</h3>
          <p className="text-white/50 text-sm mb-6 max-w-sm text-center">
            You haven't analyzed any resumes yet. Click the button below to get started.
          </p>
          <Link 
            to="/"
            className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors"
          >
            Start your first analysis &rarr;
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {history.map((item, index) => {
              const score = item.analysis_data.ats_score;
              const date = new Date(item.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              });
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => navigate(`/analysis/${item.id}`)}
                  className="group relative flex flex-col rounded-3xl bg-slate-900 border border-white/10 p-6 shadow-xl hover:border-indigo-500/30 transition-all duration-300 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10 flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-white/40 text-xs font-medium">
                      <Calendar className="h-3.5 w-3.5" />
                      {date}
                    </div>
                    
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-950 border border-white/10 shadow-inner">
                      <span className={`text-sm font-bold ${
                        score >= 80 ? 'text-emerald-400' : score >= 60 ? 'text-amber-400' : 'text-rose-400'
                      }`}>
                        {score}
                      </span>
                    </div>
                  </div>
                  
                  <div className="relative z-10 flex-1">
                    <h3 className="text-base font-semibold text-white/90 mb-2 line-clamp-2">
                      {item.job_description.substring(0, 80) || "General Analysis"}...
                    </h3>
                    <p className="text-xs text-white/50 line-clamp-2 mb-4">
                      {item.analysis_data.recruiter_impression}
                    </p>
                  </div>
                  
                  <div className="relative z-10 mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-white/30 bg-white/5 px-2 py-1 rounded-md">
                        {item.analysis_data.improved_bullet_points?.length || 0} Improvements
                      </span>
                    </div>
                    {/* For now, just a visual button, next phase we could load this data back into the ResultCard */}
                    <Link 
                      to={`/analysis/${item.id}`}
                      className="text-xs font-semibold text-indigo-400 flex items-center gap-1 hover:text-indigo-300 transition-colors"
                    >
                      View Report <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
