import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  X, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle,
  Calendar,
  Hash,
  CheckCircle2
} from 'lucide-react';
import { generatePdfReport } from '../utils/reportGenerator';

export default function SecurityReportModal({ isOpen, onClose, reportData }) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen || !reportData) return null;

  const {
    auditId = `CCS-SEC-${Math.floor(100000 + Math.random() * 900000)}`,
    date = new Date().toLocaleString(),
    inputType = 'Email Analysis',
    riskScore = 0,
    riskTier = 'UNKNOWN',
    indicators = [],
    sender = '',
    subject = '',
    extractedUrl = '',
    messageSnippet = ''
  } = reportData;

  const handleDownload = () => {
    const success = generatePdfReport({
      ...reportData,
      auditId
    });
    if (success) {
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-6 bg-cyber-900 border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Toolbar Header */}
        <div className="bg-cyber-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-mono font-bold text-white tracking-wide">
                CYBERSECURITY AUDIT REPORT
              </h3>
              <p className="text-xs text-slate-400">
                Official CCS Academic Analysis Verification Document
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 transition-colors shadow-[0_0_10px_rgba(0,242,254,0.3)]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloadSuccess ? 'Downloaded!' : 'Download PDF'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs hover:bg-slate-700 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Report Sheet Preview */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-slate-200 bg-cyber-950/60">
          
          {/* Institutional Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="text-xl font-mono font-extrabold text-cyan-400 tracking-wider">
                PHISHGUARD
              </div>
              <p className="text-xs text-slate-400">
                Phishing Attack Simulation & Detection System
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Cryptography & Cybersecurity Academic Project (CCS)
              </p>
            </div>

            <div className="text-right text-xs font-mono space-y-1">
              <div className="text-slate-400 flex items-center sm:justify-end gap-1.5">
                <Hash className="w-3 h-3 text-cyan-400" />
                <span>Audit ID: <strong className="text-white">{auditId}</strong></span>
              </div>
              <div className="text-slate-400 flex items-center sm:justify-end gap-1.5">
                <Calendar className="w-3 h-3 text-cyan-400" />
                <span>Date: {date}</span>
              </div>
              <div className="text-[10px] text-emerald-400">
                STATUS: HEURISTIC AUDIT COMPLETE
              </div>
            </div>
          </div>

          {/* Threat Classification Highlight Card */}
          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Executive Threat Evaluation
              </span>
              <div className="text-sm text-slate-200">
                Target: <strong className="text-white">{subject || extractedUrl || 'Simulated Artifact'}</strong>
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Analysis Module: <span className="text-cyan-300 font-mono">{inputType}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-slate-400 font-mono">CALCULATED RISK</div>
                <div className="text-2xl font-black font-mono text-white">
                  {riskScore} <span className="text-xs text-slate-400">/ 100</span>
                </div>
              </div>

              <div className={`px-3 py-2 rounded-lg font-mono font-bold text-xs uppercase border ${
                riskTier.includes('HIGH') 
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' 
                  : riskTier.includes('MEDIUM')
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              }`}>
                {riskTier}
              </div>
            </div>
          </div>

          {/* Indicators List */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
              Triggered Phishing Risk Indicators ({indicators.length})
            </h4>

            {indicators.length === 0 ? (
              <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>No heuristic phishing indicators detected for this content.</span>
              </div>
            ) : (
              <div className="space-y-3">
                {indicators.map((ind, i) => (
                  <div key={i} className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white tracking-wide">
                        {ind.title}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase">
                        {ind.severity}
                      </span>
                    </div>
                    <p className="text-slate-400 leading-relaxed text-[11px]">
                      {ind.whyItMatters}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recommendations Block */}
          <div className="p-4 rounded-lg bg-cyber-900 border border-slate-800 space-y-2 text-xs">
            <h4 className="font-mono text-cyan-400 font-bold uppercase tracking-wider text-[11px]">
              Institutional Defensive Recommendations
            </h4>
            <ul className="space-y-1 text-slate-300 list-disc pl-5 text-[11px]">
              <li>Never enter credentials or OTP authentication tokens into external links received in emails.</li>
              <li>Always check the domain in the browser address bar rather than trusting the email display name.</li>
              <li>Report suspicious messages to your campus or corporate security operations team.</li>
              <li>Ensure multi-factor authentication (MFA) is enforced on all critical accounts.</li>
            </ul>
          </div>

          {/* Safety Disclaimer */}
          <div className="text-[10px] text-slate-400 border-t border-slate-800/80 pt-4 text-center font-mono">
            PHISHGUARD ACADEMIC PROJECT — Cryptography & Cybersecurity (CCS).
            Educational rule-based simulation. Zero credentials collected, stored, or transmitted.
          </div>

        </div>

      </div>
    </div>
  );
}
