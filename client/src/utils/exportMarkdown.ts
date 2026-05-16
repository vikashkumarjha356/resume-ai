import { saveAs } from 'file-saver';
import type { ResumeAnalysis } from '../types/resume';

export const exportToMarkdown = (data: ResumeAnalysis) => {
  const content = `
# AI Resume Analysis Report

## ATS Score: ${data.ats_score}/100

### 🔑 Missing Keywords
${data.missing_keywords.map(k => `- ${k}`).join('\n')}

### 📝 Professional Summary
${data.better_professional_summary}

### 🚀 Improved Bullet Points
${data.improved_bullet_points.map(b => `- ${b}`).join('\n')}

### 📉 Resume Weaknesses
${data.resume_weaknesses.map(w => `- ${w}`).join('\n')}

### 🎯 ATS Optimization Tips
${data.ats_optimization_tips.map(t => `- ${t}`).join('\n')}

### 👁️ Recruiter Impression
${data.recruiter_impression}

### 📈 Impact Improvements
${data.impact_improvements.map(i => `- ${i}`).join('\n')}

### 📊 Keyword Density Analysis
${data.keyword_density_analysis.map(k => `- ${k}`).join('\n')}

### 📋 Formatting Issues
${data.formatting_issues.map(f => `- ${f}`).join('\n')}

### 🛠️ Skills to Add
${data.skills_to_add.map(s => `- ${s}`).join('\n')}
  `;

  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  saveAs(blob, `resume-analysis-${Date.now()}.md`);
};
