import React from 'react';
import { AlertCircle, AlertTriangle, Info, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function IndicatorCard({ indicator }) {
  if (!indicator) return null;

  const { title, severity, category, whyItMatters, recommendation } = indicator;

  let badgeColor = 'bg-slate-800 text-slate-300 border-slate-700';
  let iconColor = 'text-slate-400';
  let borderHighlight = 'border-slate-800 hover:border-slate-700';
  let Icon = Info;

  if (severity === 'critical') {
    badgeColor = 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    iconColor = 'text-rose-400';
    borderHighlight = 'border-rose-500/30 hover:border-rose-500/60 shadow-[0_0_15px_rgba(244,63,94,0.1)]';
    Icon = ShieldAlert;
  } else if (severity === 'high') {
    badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    iconColor = 'text-amber-400';
    borderHighlight = 'border-amber-500/30 hover:border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.1)]';
    Icon = AlertTriangle;
  } else if (severity === 'medium') {
    badgeColor = 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30';
    iconColor = 'text-yellow-400';
    borderHighlight = 'border-yellow-500/20 hover:border-yellow-500/40';
    Icon = AlertCircle;
  } else if (severity === 'low') {
    badgeColor = 'bg-blue-500/15 text-blue-300 border-blue-500/30';
    iconColor = 'text-blue-400';
    borderHighlight = 'border-blue-500/20 hover:border-blue-500/40';
    Icon = Info;
  }

  return (
    <div className={`p-4 rounded-lg bg-cyber-900/80 border transition-all duration-200 ${borderHighlight}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex items-start gap-2.5">
          <div className={`p-1.5 rounded-md bg-cyber-950 border border-slate-800 ${iconColor} shrink-0 mt-0.5`}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide">
              {title}
            </h4>
            {category && (
              <span className="text-[10px] text-slate-400 font-mono">
                Category: {category}
              </span>
            )}
          </div>
        </div>

        <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold border shrink-0 ${badgeColor}`}>
          {severity || 'INFO'}
        </span>
      </div>

      {/* Rationale & Action */}
      <div className="space-y-2 mt-3 text-xs pl-8">
        {whyItMatters && (
          <div className="bg-cyber-950/60 p-2.5 rounded border border-slate-800/80">
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold block mb-0.5">
              Why It Matters:
            </span>
            <p className="text-slate-300 leading-relaxed">
              {whyItMatters}
            </p>
          </div>
        )}

        {recommendation && (
          <div className="bg-emerald-950/20 p-2.5 rounded border border-emerald-500/20">
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-0.5">
              Recommended Action:
            </span>
            <p className="text-slate-300 leading-relaxed">
              {recommendation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
