// Security Audit Report Generator
// Generates professional academic-grade PDF reports using jsPDF

import { jsPDF } from 'jspdf';

export function generatePdfReport(analysisResult) {
  if (!analysisResult) return false;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const auditId = analysisResult.auditId || `CCS-SEC-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateStr = new Date().toLocaleString();
  const score = analysisResult.riskScore || 0;
  const tier = analysisResult.riskTier || (score >= 60 ? 'HIGH RISK' : score >= 30 ? 'MEDIUM RISK' : 'LOW RISK');

  // Background Header
  doc.setFillColor(7, 13, 30); // dark navy
  doc.rect(0, 0, 210, 45, 'F');

  // Header Title
  doc.setTextColor(0, 242, 254); // cyber cyan
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('PHISHGUARD', 14, 20);

  doc.setFontSize(10);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.setFont('helvetica', 'normal');
  doc.text('Phishing Attack Simulation & Detection System | CCS Academic Lab', 14, 28);
  doc.text('Cryptography & Cybersecurity Academic Project', 14, 34);

  // Audit ID & Date in Header right
  doc.setFontSize(9);
  doc.setTextColor(203, 213, 225);
  doc.text(`AUDIT ID: ${auditId}`, 130, 20);
  doc.text(`GENERATED: ${dateStr}`, 130, 26);
  doc.text('CLASSIFICATION: EDUCATIONAL AUDIT', 130, 32);

  // Decorative cyan accent bar
  doc.setDrawColor(0, 242, 254);
  doc.setLineWidth(0.8);
  doc.line(14, 45, 196, 45);

  let y = 55;

  // Executive Summary Box
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(14, y, 182, 38, 3, 3, 'F');

  // Risk Score Banner inside Box
  if (tier.includes('HIGH')) {
    doc.setFillColor(244, 63, 94); // red
  } else if (tier.includes('MEDIUM')) {
    doc.setFillColor(245, 158, 11); // amber
  } else {
    doc.setFillColor(16, 185, 129); // emerald
  }
  doc.roundedRect(20, y + 6, 48, 26, 2, 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('THREAT LEVEL', 44, y + 13, { align: 'center' });
  doc.setFontSize(14);
  doc.text(tier, 44, y + 21, { align: 'center' });
  doc.setFontSize(9);
  doc.text(`SCORE: ${score}/100`, 44, y + 28, { align: 'center' });

  // Summary Text
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Executive Threat Assessment', 76, y + 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);

  const summaryLines = [
    `Input Analyzed: ${analysisResult.inputType || 'Suspect Target'}`,
    `Target: ${analysisResult.subject || analysisResult.rawUrl || analysisResult.sender || 'Sanitized Artifact'}`,
    `Indicators Detected: ${(analysisResult.indicators || []).length} suspicious risk factors identified.`
  ];
  doc.text(summaryLines, 76, y + 19);

  y += 48;

  // Detected Indicators Section
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('Detected Phishing & Social Engineering Indicators', 14, y);
  y += 6;

  const indicators = analysisResult.indicators || [];

  if (indicators.length === 0) {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(22, 101, 52);
    doc.text('No active heuristic phishing indicators triggered for this input.', 14, y + 4);
    y += 12;
  } else {
    indicators.slice(0, 6).forEach((ind, i) => {
      // Indicator Card
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(14, y, 182, 18, 2, 2, 'FD');

      // Severity tag
      const isCrit = ind.severity === 'critical' || ind.severity === 'high';
      doc.setTextColor(isCrit ? 225 : 71, isCrit ? 29 : 85, isCrit ? 72 : 105);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text(`[${(ind.severity || 'ALERT').toUpperCase()}]`, 18, y + 6);

      // Title
      doc.setTextColor(30, 41, 59);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text(ind.title || 'Suspicious Activity Detected', 42, y + 6);

      // Why it matters / detail snippet
      doc.setTextColor(100, 116, 139);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      const rationale = doc.splitTextToSize(ind.whyItMatters || ind.recommendation || '', 170);
      doc.text(rationale.slice(0, 2), 18, y + 12);

      y += 21;
    });
  }

  y = Math.max(y + 4, 210);

  // Recommendations
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Defensive Recommendations & Countermeasures', 14, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);

  const tips = [
    '1. Do not enter credentials, OTPs, or authentication tokens into external links received via email.',
    '2. Check the real domain in the browser address bar rather than trusting the visual display name.',
    '3. Report suspicious correspondence to your institution\'s Information Security / IT Operations team.',
    '4. Never rush based on simulated deadlines; contact the service provider via a known independent channel.'
  ];
  doc.text(tips, 14, y);
  y += 24;

  // Footer Disclaimer
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.4);
  doc.line(14, 275, 196, 275);

  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('PHISHGUARD ACADEMIC PROJECT - Cryptography & Cybersecurity (CCS). This automated analysis is an educational heuristic simulation.', 14, 280);
  doc.text('STRICT POLICY: No credentials or sensitive data are collected or logged. Generated for educational demonstration.', 14, 284);

  // Save PDF
  doc.save(`PhishGuard-Report-${auditId}.pdf`);
  return true;
}
