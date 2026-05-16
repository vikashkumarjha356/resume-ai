import { Download, FileText, Printer } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ResumeAnalysis } from '../types/resume';
import { exportToPdf } from '../utils/exportPdf';
import { exportToTxt } from '../utils/exportTxt';
import { toast } from 'sonner';

export const ExportSection = ({ data }: { data: ResumeAnalysis }) => {
  const actions = [
    {
      label: 'PDF Report',
      icon: Printer,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20',
      fn: () => {
        exportToPdf(data);
        toast.success('PDF export started');
      }
    },
    {
      label: 'Text File',
      icon: FileText,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
      fn: () => {
        exportToTxt(data);
        toast.success('Text export started');
      }
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {actions.map((action, i) => (
        <motion.button
          key={i}
          whileHover={{ y: -5, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={action.fn}
          className={`
            group flex items-center justify-between p-6 rounded-[2rem] border backdrop-blur-xl transition-all shadow-xl cursor-pointer
            ${action.bg} ${action.border}
          `}
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ring-1 ${action.bg} ${action.border} ${action.color}`}>
              <action.icon className="h-5 w-5" />
            </div>
            <div className="text-left">
              <span className="block text-xs font-medium text-white/50 mb-1">Format</span>
              <span className="text-sm font-semibold text-white">{action.label}</span>
            </div>
          </div>
          <Download className="h-5 w-5 text-white/10 group-hover:text-white transition-colors" />
        </motion.button>
      ))}
    </div>
  );
};
