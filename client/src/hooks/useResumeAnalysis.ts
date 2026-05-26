import { useState, useCallback } from 'react';
import { analyzeResumeStream } from '../services/api';
import type { ResumeAnalysis } from '../types/resume';

/**
 * Custom hook for managing resume analysis state and API calls
 */
export const useResumeAnalysis = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResumeAnalysis | null>(null);
  const [streamText, setStreamText] = useState<string>('');

  /**
   * Triggers the resume analysis API call
   */
  const analyze = useCallback(async (file: File, jobDescription: string) => {
    if (loading) return;

    setLoading(true);
    setError(null);
    setIsRetrying(false);
    setStreamText('');

    const maxRetries = 3;
    let attempt = 0;

    const executeAnalysis = (): Promise<ResumeAnalysis> => {
      return new Promise((resolve, reject) => {
        analyzeResumeStream(
          file,
          jobDescription,
          (chunk) => {
            setStreamText(prev => prev + chunk);
          },
          (analysis) => {
            resolve(analysis);
          },
          (errorMsg) => {
            reject(new Error(errorMsg));
          }
        ).catch(reject);
      });
    };

    const tryAnalysis = async (): Promise<void> => {
      try {
        const data = await executeAnalysis();
        setResult(data);
      } catch (err: any) {
        const errMsg = err instanceof Error ? err.message : String(err);
        const isHighDemand = errMsg.includes('503') || 
                             errMsg.includes('429') || 
                             errMsg.toLowerCase().includes('high demand') || 
                             errMsg.toLowerCase().includes('occupied') ||
                             errMsg.toLowerCase().includes('service unavailable') ||
                             errMsg.toLowerCase().includes('breath');

        if (isHighDemand && attempt < maxRetries) {
          attempt++;
          setIsRetrying(true);
          // Exponential backoff: 1.5s, 3s, 6s + jitter
          const waitTime = Math.pow(2, attempt - 1) * 1500 + Math.random() * 500;
          console.log(`Client-side retry attempt ${attempt} of ${maxRetries} in ${Math.round(waitTime)}ms...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          setStreamText(''); // reset stream text on retry
          return tryAnalysis();
        }

        const errorMessage = err instanceof Error ? err.message : 'Analysis failed. Please try again.';
        setError(errorMessage);
        setResult(null);
      }
    };

    await tryAnalysis();
    setLoading(false);
    setIsRetrying(false);
  }, [loading]);

  /**
   * Resets the analysis state to initial values
   */
  const reset = useCallback(() => {
    setLoading(false);
    setIsRetrying(false);
    setError(null);
    setResult(null);
    setStreamText('');
  }, []);

  return {
    analyze,
    loading,
    isRetrying,
    error,
    result,
    reset,
    streamText
  };
};
