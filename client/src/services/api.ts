import axios from 'axios';
import { ENV } from '../config/env';
import { supabase } from '../config/supabase';
import type { ResumeAnalysis, APIResponse } from '../types/resume';

/**
 * Reusable Axios instance with base configuration
 */
const api = axios.create({
  baseURL: ENV.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  return config;
});

/**
 * Analyzes a resume against a job description
 * @param file - The resume file (PDF/DOCX)
 * @param jobDescription - The target job description
 * @returns Promise with the analysis data
 */
export const analyzeResume = async (
  file: File,
  jobDescription: string
): Promise<ResumeAnalysis> => {
  const formData = new FormData();
  formData.append('resume', file);
  formData.append('jobDescription', jobDescription);

  try {
    const response = await api.post<APIResponse<ResumeAnalysis>>(
      '/resume/analyze',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Analysis failed');
    }
  } catch (error: any) {
    console.error('API Error:', error);
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    throw new Error(message);
  }
};

/**
 * Analyzes a resume using real-time streaming (SSE)
 */
export const analyzeResumeStream = async (
  file: File,
  jobDescription: string,
  onChunk: (chunk: string) => void,
  onComplete: (analysis: ResumeAnalysis) => void,
  onError: (error: string) => void
) => {
  try {
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDescription', jobDescription);

    const { data: { session } } = await supabase.auth.getSession();
    const headers: Record<string, string> = {};
    if (session?.access_token) {
      headers['Authorization'] = `Bearer ${session.access_token}`;
    }

    const response = await fetch(`${ENV.API_BASE_URL}/resume/analyze?stream=true`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Streaming failed to start');
    }

    if (!response.body) {
      throw new Error('Response body is null');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      
      // Keep the last incomplete line in the buffer
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const dataStr = line.slice(6);
          if (dataStr === '[DONE]') continue; // Standard SSE completion, if used
          
          try {
            const parsed = JSON.parse(dataStr);
            if (parsed.chunk) {
              onChunk(parsed.chunk);
            } else if (parsed.done && parsed.analysis) {
              onComplete(parsed.analysis);
            }
          } catch (e) {
            console.warn('Failed to parse SSE line:', line);
          }
        } else if (line.startsWith('event: error')) {
          // The next line should be the error data
        } else if (line.startsWith('data: ') && buffer.includes('event: error')) {
            try {
              const parsed = JSON.parse(line.slice(6));
              onError(parsed.message || 'An error occurred during streaming');
            } catch (e) {
               onError('An error occurred during streaming');
            }
        }
      }
    }
  } catch (error: any) {
    console.error('Streaming Error:', error);
    onError(error.message || 'Something went wrong during streaming');
  }
};

export const getHistory = async () => {
  try {
    const response = await api.get('/resume/history');
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to fetch history');
    }
  } catch (error: any) {
    console.error('API Error:', error);
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    throw new Error(message);
  }
};

export const getAnalysisById = async (id: string) => {
  try {
    const response = await api.get(`/resume/analysis/${id}`);
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to fetch analysis');
    }
  } catch (error: any) {
    console.error('API Error:', error);
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    throw new Error(message);
  }
};

/**
 * Edits a resume file (.docx) by applying selected changes on the server.
 * Returns the modified file as a Blob.
 */
export const editResume = async (
  file: File,
  changes: { original: string; improved: string }[],
  format: 'docx' | 'pdf' = 'docx'
): Promise<any> => {
  const formData = new FormData();
  formData.append('resume', file);
  formData.append('changes', JSON.stringify(changes));
  formData.append('format', format);

  try {
    const response = await api.post('/resume/edit', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: format === 'pdf' ? 'json' : 'blob',
    });
    return response.data;
  } catch (error: any) {
    console.error('API Error:', error);
    if (error.response?.data instanceof Blob) {
      const text = await error.response.data.text();
      try {
        const parsed = JSON.parse(text);
        throw new Error(parsed.message || 'Editing resume failed');
      } catch {
        throw new Error(text || 'Editing resume failed');
      }
    }
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    throw new Error(message);
  }
};

export default api;
