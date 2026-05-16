import { GoogleGenerativeAI } from "@google/generative-ai";
import { parseAIResponse } from "../utils/parser";
import { ResumeAnalysis } from "../utils/validation";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const analyzeResumeWithAI = async (
    resumeText: string,
    jobDescription: string,
    retryCount = 0
): Promise<ResumeAnalysis> => {
    const model = genAI.getGenerativeModel({
        model: "gemini-3-flash-preview",
        generationConfig: {
            responseMimeType: "application/json",
        }
    });

    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const prompt = `
You are a Senior Technical Recruiter, ATS Optimization Specialist, and Resume Strategist at a FAANG company with 15+ years of experience in technical talent assessment.
Today's current date is ${currentDate}. Use this date as your reference point for evaluating chronologies.

Your goal is to provide a high-fidelity, recruiter-grade analysis of the provided resume against the specific job description. Transform this output into a comprehensive AI-powered resume optimization engine.

STRICT GUIDELINES:
1. Behave like a seasoned recruiter. Avoid generic AI wording. Keep feedback realistic and actionable. Do NOT invent fake exaggerated metrics. Focus heavily on employability and ATS performance.
2. ATS SCORE: Be realistic. A perfect 100 is rare. Penalize for missing core technologies, lack of quantified metrics, and poor formatting hierarchy.
3. WEAKNESS ANALYSIS: Identify vague wording, weak action verbs, lack of measurable impact, repetitive phrasing, missing technical depth, unclear business outcomes, and poor ATS optimization.
4. ATS OPTIMIZATION TIPS: Provide practical suggestions (keyword placement, section improvements, skill ordering, formatting optimization, role-specific targeting, readability).
5. RECRUITER IMPRESSION: Give a concise recruiter-style evaluation detailing first impression, perceived seniority, strengths, weaknesses, and hireability perception.
6. IMPACT IMPROVEMENTS: Rewrite achievements incorporating measurable business outcomes, quantified impact, stronger action verbs, clearer ownership, and leadership signals.
7. BULLET POINTS: Rewrite EVERY weak, non-quantified, or poorly phrased bullet point using the Google-internal formula ("Accomplished [X] as measured by [Y], by doing [Z]").
8. KEYWORD DENSITY: Analyze overused terms, missing important keywords, keyword balance, role alignment, and ATS discoverability.
9. FORMATTING: Detect overly long bullets, inconsistent formatting, weak hierarchy, ATS-unfriendly structures, and readability problems.
10. SKILLS TO ADD: Suggest missing tools, frameworks, cloud technologies, or role-specific skills based on the JD.

Return ONLY valid JSON in this exact structure:
{
  "ats_score": number,
  "missing_keywords": ["string"],
  "improved_bullet_points": ["string"],
  "better_professional_summary": "string",
  "resume_weaknesses": ["string"],
  "ats_optimization_tips": ["string"],
  "recruiter_impression": "string",
  "impact_improvements": ["string"],
  "keyword_density_analysis": ["string"],
  "formatting_issues": ["string"],
  "skills_to_add": ["string"]
}

Resume Text:
${resumeText}

Job Description:
${jobDescription}
`;

    try {
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        
        // Use the new parsing flow
        return parseAIResponse(responseText);
    } catch (error) {
        const isRateLimitOrServiceUnavailable = error instanceof Error && 
            (error.message.includes('503') || error.message.includes('429'));
            
        // Retry logic: Attempt up to 3 retries with exponential backoff
        if (retryCount < 3) {
            // Calculate delay: 1s, 2s, 4s + random jitter to prevent thundering herd
            const waitTime = Math.pow(2, retryCount) * 1000 + Math.random() * 500;
            const errorMessage = error instanceof Error ? error.message : 'Unknown';
            
            console.log(`AI generation failed (Attempt ${retryCount + 1} of 3). Retrying in ${Math.round(waitTime)}ms... Error: ${errorMessage}`);
            
            await delay(waitTime);
            return analyzeResumeWithAI(resumeText, jobDescription, retryCount + 1);
        }
        
        // If all retries fail, propagate a clear error
        throw new Error(error instanceof Error ? error.message : 'AI Resume Analysis failed after retries.');
    }
};