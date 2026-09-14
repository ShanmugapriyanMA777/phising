import React, { useEffect, useState } from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function RiskScoreGauge({ score = 0, size = 'md' }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const target = Math.min(100, Math.max(0, score));
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 25));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setAnimatedScore(target);
        clearInterval(timer);
      } else {
        setAnimatedScore(current);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [score]);

  // Color mappings
  let tier = 'LOW RISK';
  let color = '#10b981'; // emerald
  let textColor = 'text-emerald-400';
  let badgeBg = 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300';
  let Icon = ShieldCheck;

  if (animatedScore >= 60) {
    tier = 'HIGH RISK';
    color = '#f43f5e'; // red
    textColor = 'text-rose-400';
    badgeBg = 'bg-rose-500/10 border-rose-500/30 text-rose-300';
    Icon = ShieldAlert;
  } else if (animatedScore >= 30) {
    tier = 'MEDIUM RISK';
    color = '#f59e0b'; // amber
    textColor = 'text-amber-400';
    badgeBg = 'bg-amber-500/10 border-amber-500/30 text-amber-300';
    Icon = AlertTriangle;
  }

  // SVG parameters for semi-circular gauge
  const radius = 80;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-xl glass-panel relative overflow-hidden">
      {/* Background glow circle */}
      <div 
        className="absolute w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: color }}
      />

      <div className="text-[11px] uppercase tracking-wider text-slate-400 font-mono mb-2">
        Threat Assessment Score
      </div>

      {/* SVG Semi-Circle Arc */}
      <div className="relative w-52 h-32 flex items-center justify-center">
        <svg className="w-52 h-32 overflow-visible" viewBox="0 0 200 120">
          <defs>
            <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="45%" stopColor="#f59e0b" />
              <stop offset="85%" stopColor="#f43f5e" />
            </linearGradient>
            <filter id="glowEffect">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Background Track */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#1e293b"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Colored Progress Arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke={color}
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            filter="url(#glowEffect)"
            className="transition-all duration-500 ease-out"
          />
        </svg>

        {/* Center Score readout */}
        <div className="absolute top-10 flex flex-col items-center">
          <span className={`text-4xl font-extrabold font-mono tracking-tight ${textColor} transition-colors duration-300`}>
            {animatedScore}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">/ 100</span>
        </div>
      </div>

      {/* Threat Tier Badge */}
      <div className="mt-2 flex flex-col items-center gap-1.5">
        <div className={`px-3 py-1 rounded-full text-xs font-mono font-semibold flex items-center gap-1.5 border shadow-sm ${badgeBg}`}>
          <Icon className="w-3.5 h-3.5" />
          <span>{tier}</span>
        </div>
        <p className="text-[10px] text-slate-400 max-w-[200px] text-center mt-1">
          Probabilistic rule-based heuristic indicator.
        </p>
      </div>
    </div>
  );
}
