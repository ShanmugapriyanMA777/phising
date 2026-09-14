import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export default function SimulationNotice({ className = '' }) {
  return (
    <div className={`p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-3 shadow-lg ${className}`}>
      <div className="p-1.5 rounded bg-amber-500/20 text-amber-400 mt-0.5 shrink-0">
        <AlertTriangle className="w-4 h-4" />
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-bold tracking-wide font-mono text-amber-300">
            ⚠️ EDUCATIONAL SIMULATION
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <ShieldCheck className="w-3 h-3" /> ZERO CREDENTIAL STORAGE
          </span>
        </div>
        <p className="text-slate-300 leading-relaxed">
          This module demonstrates phishing techniques in a controlled environment. No real credentials, OTPs, or user data are collected, stored, transmitted, or logged.
        </p>
      </div>
    </div>
  );
}
