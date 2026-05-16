export interface AnalysisData {
  score: number;
  missingKeywords: string[];
  improvedBullets: {
    original: string;
    improved: string;
    reason: string;
  }[];
  professionalSummary: string;
  interviewQuestions: {
    question: string;
    answer: string;
  }[];
}

export interface ApiResponse {
  success: boolean;
  data: AnalysisData;
}
