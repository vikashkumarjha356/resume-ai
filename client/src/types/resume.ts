export interface ResumeAnalysis {
  ats_score: number;
  missing_keywords: string[];
  improved_bullet_points: { original: string; improved: string }[];
  better_professional_summary: { original: string; improved: string };
  resume_weaknesses: string[];
  ats_optimization_tips: string[];
  recruiter_impression: string;
  impact_improvements: string[];
  keyword_density_analysis: string[];
  formatting_issues: string[];
  skills_to_add: string[];
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface APIError {
  success: false;
  message: string;
  code?: string;
}
