import React, { useState } from 'react';
import { 
  Mail, 
  Copy, 
  Check, 
  ExternalLink, 
  X, 
  AlertTriangle, 
  ShieldCheck,
  Send
} from 'lucide-react';

export default function ShareDrillModal({ isOpen, onClose, scenario }) {
  const [copied, setCopied] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');

  if (!isOpen || !scenario) return null;

  // Build the shareable educational drill URL
  const baseUrl = window.location.origin + window.location.pathname;
  const drillUrl = `${baseUrl}?mode=drill&scen=${scenario.id}`;

  const emailSubject = `[Educational Security Drill] Phishing Awareness Exercise — PHISHGUARD`;
  const emailBody = `Hello,

You have been invited to participate in a safe, educational Cybersecurity Awareness Drill created for an academic Cryptography & Cybersecurity (CCS) project.

Topic: ${scenario.title}
Difficulty: ${scenario.difficulty || 'Intermediate'}

Click the link below to participate in this controlled training exercise and learn how to identify modern social engineering red flags:
${drillUrl}

IMPORTANT SECURITY NOTICE:
This is an authorized educational exercise. No real credentials or sensitive data are ever collected, stored, or transmitted. Upon interaction, you will be guided through defensive security awareness guidelines.

— Sent via PHISHGUARD Educational Simulation System`;

  const mailtoLink = `mailto:${encodeURIComponent(recipientEmail)}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  const handleCopy = () => {
    const fullText = `Subject: ${emailSubject}\n\n${emailBody}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleOpenMailClient = () => {
    window.location.href = mailtoLink;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl my-6 bg-cyber-900 border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-cyber-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-mono font-bold text-white tracking-wide">
                DISPATCH EDUCATIONAL AWARENESS DRILL
              </h3>
              <p className="text-xs text-slate-400">
                Send a safe training link via email to educate someone on phishing
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 text-xs text-slate-300">
          
          {/* Policy Notice */}
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold font-mono text-[11px] uppercase">
                ACADEMIC SAFE HARBOR COMPLIANCE
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                The generated email is explicitly labeled as an <strong>[Educational Security Drill]</strong>. When the recipient clicks the link, the simulator guides them through spotting the red flags and redirects them to the <strong>Security Awareness Page</strong>.
              </p>
            </div>
          </div>

          {/* Optional Recipient Email Input */}
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
              Recipient Email (Optional):
            </label>
            <input
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="colleague.or.student@university.edu"
              className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-xs font-mono focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          {/* Email Preview Box */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between font-mono text-[11px] text-slate-400">
              <span>Prepared Drill Message:</span>
              <span className="text-cyan-400 font-semibold">{scenario.title}</span>
            </div>
            <div className="p-3.5 rounded-lg bg-cyber-950 border border-slate-800 text-slate-300 font-mono text-[11px] max-h-48 overflow-y-auto whitespace-pre-wrap leading-relaxed">
              <strong className="text-white">Subject: {emailSubject}</strong>
              <div className="mt-2 text-slate-400">{emailBody}</div>
            </div>
          </div>

          {/* Shareable Link Direct Readout */}
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between gap-3">
            <div className="truncate font-mono text-[11px] text-cyan-300">
              {drillUrl}
            </div>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 shrink-0 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
            >
              Cancel
            </button>

            <div className="w-full sm:w-auto flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Full Email</span>
              </button>

              <button
                type="button"
                onClick={handleOpenMailClient}
                className="flex-1 sm:flex-initial px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs font-mono tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send via Mail App</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
