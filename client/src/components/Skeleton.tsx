import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl bg-white/[0.03]", className)}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export const AnalysisSkeleton = () => {
  return (
    <div className="space-y-12 animate-pulse">
      {/* Top Grid Skeleton */}
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-4">
          <Skeleton className="h-4 w-24 opacity-50" />
          <Skeleton className="h-72 rounded-[2.5rem]" />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <Skeleton className="h-4 w-24 opacity-50" />
          <Skeleton className="h-72 rounded-[2.5rem]" />
        </div>
      </div>

      {/* Keywords Skeleton */}
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 rounded-[2.5rem]" />
      </div>

      {/* Bullets Skeleton */}
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-8 md:grid-cols-2">
          <Skeleton className="h-48 rounded-[2rem]" />
          <Skeleton className="h-48 rounded-[2rem]" />
        </div>
      </div>
    </div>
  );
};
