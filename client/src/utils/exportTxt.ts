import { saveAs } from 'file-saver';
import type { ResumeAnalysis } from '../types/resume';

export const exportToTxt = (data: ResumeAnalysis) => {
  const content = `
AI RESUME ANALYSIS REPORT
-------------------------
ATS SCORE: ${data.ats_score}/100

MISSING KEYWORDS:
${data.missing_keywords.join(', ')}

PROFESSIONAL SUMMARY:
${data.better_professional_summary}

IMPROVED BULLET POINTS:
${data.improved_bullet_points.map(b => `- ${b}`).join('\n')}

RESUME WEAKNESSES:
${data.resume_weaknesses.map(w => `- ${w}`).join('\n')}

ATS OPTIMIZATION TIPS:
${data.ats_optimization_tips.map(t => `- ${t}`).join('\n')}

RECRUITER IMPRESSION:
${data.recruiter_impression}

IMPACT IMPROVEMENTS:
${data.impact_improvements.map(i => `- ${i}`).join('\n')}

KEYWORD DENSITY ANALYSIS:
${data.keyword_density_analysis.map(k => `- ${k}`).join('\n')}

FORMATTING ISSUES:
${data.formatting_issues.map(f => `- ${f}`).join('\n')}

SKILLS TO ADD:
${data.skills_to_add.map(s => `- ${s}`).join('\n')}
  `;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, `resume-analysis-${Date.now()}.txt`);
};
