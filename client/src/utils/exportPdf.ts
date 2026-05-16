import { jsPDF } from 'jspdf';
import type { ResumeAnalysis } from '../types/resume';

export const exportToPdf = (data: ResumeAnalysis) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = 20;

  const addText = (text: string, size = 12, style = 'normal', color = '#000000') => {
    doc.setFontSize(size);
    doc.setFont('helvetica', style);
    doc.setTextColor(color);
    
    const splitText = doc.splitTextToSize(text, pageWidth - margin * 2);
    
    // Check if we need a new page
    if (y + splitText.length * (size / 2) > 280) {
      doc.addPage();
      y = 20;
    }
    
    doc.text(splitText, margin, y);
    y += splitText.length * (size / 2) + 5;
  };

  addText('AI Resume Analysis Report', 20, 'bold', '#6366f1');
  y += 5;
  addText(`ATS Score: ${data.ats_score}/100`, 16, 'bold', '#020617');
  y += 5;

  addText('Missing Keywords', 14, 'bold', '#4b5563');
  addText(data.missing_keywords.join(', '), 11);
  y += 5;

  addText('Professional Summary', 14, 'bold', '#4b5563');
  addText(data.better_professional_summary, 11);
  y += 5;

  addText('Improved Bullet Points', 14, 'bold', '#4b5563');
  data.improved_bullet_points.forEach(b => {
    addText(`• ${b}`, 11);
    y += 2;
  });
  y += 5;

  addText('Resume Weaknesses', 14, 'bold', '#4b5563');
  data.resume_weaknesses.forEach(w => addText(`• ${w}`, 11));
  y += 5;

  addText('ATS Optimization Tips', 14, 'bold', '#4b5563');
  data.ats_optimization_tips.forEach(t => addText(`• ${t}`, 11));
  y += 5;

  addText('Recruiter Impression', 14, 'bold', '#4b5563');
  addText(data.recruiter_impression, 11);
  y += 5;

  addText('Impact Improvements', 14, 'bold', '#4b5563');
  data.impact_improvements.forEach(i => addText(`• ${i}`, 11));
  y += 5;

  addText('Keyword Density Analysis', 14, 'bold', '#4b5563');
  data.keyword_density_analysis.forEach(k => addText(`• ${k}`, 11));
  y += 5;

  addText('Formatting Issues', 14, 'bold', '#4b5563');
  data.formatting_issues.forEach(f => addText(`• ${f}`, 11));
  y += 5;

  addText('Skills to Add', 14, 'bold', '#4b5563');
  data.skills_to_add.forEach(s => addText(`• ${s}`, 11));

  doc.save(`resume-analysis-${Date.now()}.pdf`);
};
