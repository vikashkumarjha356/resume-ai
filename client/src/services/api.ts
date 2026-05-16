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

export default api;
