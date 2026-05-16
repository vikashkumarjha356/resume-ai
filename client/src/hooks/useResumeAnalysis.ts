import { useState, useCallback } from 'react';
import { analyzeResume } from '../services/api';
import type { ResumeAnalysis } from '../types/resume';

/**
 * Custom hook for managing resume analysis state and API calls
 */
export const useResumeAnalysis = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResumeAnalysis | null>(null);

  /**
   * Triggers the resume analysis API call
   */
  const analyze = useCallback(async (file: File, jobDescription: string) => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const data = await analyzeResume(file, jobDescription);
      setResult(data);
    } catch (err: any) {
      const errorMessage = err instanceof Error ? err.message : 'Analysis failed. Please try again.';
      setError(errorMessage);
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  /**
   * Resets the analysis state to initial values
   */
  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setResult(null);
  }, []);

  return {
    analyze,
    loading,
    error,
    result,
    reset
  };
};
