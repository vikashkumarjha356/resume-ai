import { GoogleGenerativeAI } from "@google/generative-ai";
import { parseAIResponse } from "../utils/parser";
import { ResumeAnalysis } from "../utils/validation";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const analyzeResumeWithAI = async (
    resumeText: string,
    jobDescription: string,
    onChunk?: (chunk: string) => void
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
7. BULLET POINTS: Identify every weak, non-quantified, or poorly phrased experience bullet point. Rewrite them using the Google-internal formula ("Accomplished [X] as measured by [Y], by doing [Z]"). Provide a side-by-side comparison containing the exact "original" text from the resume and the "improved" version.
8. KEYWORD DENSITY: Analyze overused terms, missing important keywords, keyword balance, role alignment, and ATS discoverability.
9. FORMATTING: Detect overly long bullets, inconsistent formatting, weak hierarchy, ATS-unfriendly structures, and readability problems.
10. SKILLS TO ADD: Suggest missing tools, frameworks, cloud technologies, or role-specific skills based on the JD.
11. PROFESSIONAL SUMMARY: Provide a side-by-side comparison of the professional summary: the exact "original" text from the resume, and the "improved" version. If no summary exists, use an empty string for "original".

Return ONLY valid JSON in this exact structure:
{
  "ats_score": number,
  "missing_keywords": ["string"],
  "improved_bullet_points": [
    {
      "original": "string",
      "improved": "string"
    }
  ],
  "better_professional_summary": {
    "original": "string",
    "improved": "string"
  },
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
        if (onChunk) {
            const result = await model.generateContentStream(prompt);
            let fullText = "";
            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                fullText += chunkText;
                onChunk(chunkText);
            }
            return parseAIResponse(fullText);
        } else {
            const result = await model.generateContent(prompt);
            const responseText = result.response.text();
            return parseAIResponse(responseText);
        }
    } catch (error) {
        // Propagate a clear and engaging error message immediately; the client will handle retries
        if (error instanceof Error) {
            const msg = error.message;
            if (msg.includes('503') || msg.includes('429') || msg.toLowerCase().includes('high demand') || msg.toLowerCase().includes('service unavailable')) {
                throw new Error("The AI model is currently catching its breath due to extremely high demand. The queue is occupied. Please wait a minute and try again!");
            }
            throw error;
        }
        throw new Error('AI Resume Analysis failed.');
    }
};