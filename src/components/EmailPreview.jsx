import React, { useState } from 'react';
import { 
  Mail, 
  AlertCircle, 
  ExternalLink, 
  ShieldAlert, 
  Clock, 
  User, 
  Eye, 
  CheckCircle2 
} from 'lucide-react';

export default function EmailPreview({ scenario, onSimulatedLinkClick }) {
  const [highlightRedFlags, setHighlightRedFlags] = useState(false);

  if (!scenario) return null;

  return (
    <div className="rounded-xl glass-panel overflow-hidden border border-slate-700/60 shadow-2xl">
      {/* Email Client Header Chrome */}
      <div className="bg-cyber-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold text-white tracking-wide">
              MOCK INBOX CLIENT — EMAIL PREVIEW
            </h3>
            <p className="text-[10px] text-slate-400">
              Interactive simulated phishing email presentation
            </p>
          </div>
        </div>

        {/* Highlight Red Flags Toggle */}
        <button
          onClick={() => setHighlightRedFlags(!highlightRedFlags)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono transition-all border ${
            highlightRedFlags
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-[0_0_10px_rgba(244,63,94,0.3)]'
              : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{highlightRedFlags ? 'Hide Red Flags' : 'X-Ray Red Flags'}</span>
        </button>
      </div>

      {/* Educational Banner inside email */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-1.5 flex items-center justify-between text-[11px]">
        <span className="font-mono text-amber-300 font-semibold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
          SIMULATED TRAINING EMAIL
        </span>
        <span className="text-[10px] text-slate-400 font-mono">
          Domain: {scenario.simulatedUrl ? 'External Link Embedded' : 'Internal Demo'}
        </span>
      </div>

      {/* Email Metadata Headers */}
      <div className="p-5 bg-cyber-900/60 border-b border-slate-800/80 space-y-2 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-slate-400 w-16 shrink-0">From:</span>
            <div className={`font-medium ${highlightRedFlags ? 'bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded border border-rose-500/30' : 'text-slate-200'}`}>
              <span className="text-white font-semibold">{scenario.senderName || 'Security Operations'}</span>{' '}
              <span className="text-slate-400 font-mono text-[11px]">&lt;{scenario.sender}&gt;</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
            <Clock className="w-3 h-3" /> {scenario.date || 'Today at 10:14 AM'}
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="font-mono text-slate-400 w-16 shrink-0">To:</span>
          <span className="text-slate-300 font-mono text-[11px]">
            {scenario.recipient || 'student.researcher@campus.edu'}
          </span>
        </div>

        <div className="flex items-baseline gap-2 pt-1 border-t border-slate-800/40">
          <span className="font-mono text-slate-400 w-16 shrink-0">Subject:</span>
          <span className={`font-semibold text-sm tracking-tight ${highlightRedFlags ? 'bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded border border-rose-500/30' : 'text-white'}`}>
            {scenario.subject}
          </span>
        </div>
      </div>

      {/* Email Body Content */}
      <div className="p-6 md:p-8 bg-cyber-950/90 min-h-[220px] flex flex-col justify-between">
        <div className="text-slate-200 text-sm whitespace-pre-line leading-relaxed font-sans max-w-2xl">
          {scenario.message}
        </div>

        {/* Simulated Action Button */}
        <div className="mt-8 pt-6 border-t border-slate-800/80">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={onSimulatedLinkClick}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-rose-500 via-rose-600 to-amber-600 hover:opacity-90 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(244,63,94,0.3)] flex items-center gap-2 group"
            >
              <span>{scenario.actionText || 'VERIFY ACCOUNT'}</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <div className="text-[11px] text-slate-400 font-mono">
              Link destination:{' '}
              <span className="text-rose-400 underline break-all">
                {scenario.simulatedUrl}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Red Flags Highlight Drawer when toggled */}
      {highlightRedFlags && (
        <div className="p-4 bg-rose-950/40 border-t border-rose-500/30 transition-all">
          <h4 className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold mb-2 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4" />
            <span>Phishing Red Flags Present in this Email:</span>
          </h4>
          <ul className="space-y-1.5 text-xs text-rose-200/90 pl-5 list-disc">
            {(scenario.redFlags || []).map((flag, idx) => (
              <li key={idx} className="leading-snug">
                {flag}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
