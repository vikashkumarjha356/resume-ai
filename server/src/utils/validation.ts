import { z } from 'zod';

export const ResumeAnalysisSchema = z.object({
    ats_score: z.number().min(0).max(100),
    missing_keywords: z.array(z.string()),
    improved_bullet_points: z.array(z.string()),
    better_professional_summary: z.string(),
    resume_weaknesses: z.array(z.string()),
    ats_optimization_tips: z.array(z.string()),
    recruiter_impression: z.string(),
    impact_improvements: z.array(z.string()),
    keyword_density_analysis: z.array(z.string()),
    formatting_issues: z.array(z.string()),
    skills_to_add: z.array(z.string())
});

export type ResumeAnalysis = z.infer<typeof ResumeAnalysisSchema>;

/**
 * Validates the parsed JSON against the ResumeAnalysis schema.
 * Throws an error if validation fails.
 */
export const validateAIResponse = (data: unknown): ResumeAnalysis => {
    return ResumeAnalysisSchema.parse(data);
};
