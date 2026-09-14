import React from 'react';
import { Shield, Lock, Terminal, Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-800/80 bg-cyber-950/80 py-10 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Academic Policy Warning Banner */}
        <div className="mb-8 p-4 rounded-lg bg-cyan-950/30 border border-cyan-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-300 font-mono">
                Academic Cryptography & Cybersecurity Project Safe Harbor
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Educational research simulator only. Zero credentials or passwords are ever stored, transmitted, or logged.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>SAFE ENVIRONMENT ACTIVE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-cyan-400" />
              <span className="text-base font-bold text-white tracking-wider font-mono">
                PHISH<span className="text-cyan-400">GUARD</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              An educational cybersecurity platform developed for Cryptography & Cybersecurity (CCS) coursework. 
              Demonstrating social engineering mechanics, URL anatomy vulnerabilities, and rule-based heuristic defense.
            </p>
            <p className="text-[11px] text-slate-400 mt-3 font-mono">
              Tagline: <span className="text-slate-300 italic">"Understand the Attack. Detect the Threat. Stay Secure."</span>
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-mono mb-3">
              Lab Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                <Terminal className="w-3 h-3 text-cyan-400" /> Attack Simulation Journey
              </li>
              <li className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                <Terminal className="w-3 h-3 text-cyan-400" /> Heuristic Phishing Detector
              </li>
              <li className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                <Terminal className="w-3 h-3 text-cyan-400" /> Deep URL Anatomy Inspector
              </li>
              <li className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                <Terminal className="w-3 h-3 text-cyan-400" /> Phishing Kill-Chain Visualizer
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-mono mb-3">
              Project Meta
            </h4>
            <div className="space-y-2 text-xs">
              <div className="text-slate-400">
                Course: <span className="text-slate-300 font-medium">Cryptography & Cybersecurity (CCS)</span>
              </div>
              <div className="text-slate-400">
                Engine: <span className="text-cyan-400 font-mono">Rule-Based + ML-Ready Heuristic</span>
              </div>
              <div className="text-slate-400">
                Stack: <span className="text-slate-300 font-mono">React 19 / Tailwind / Vite</span>
              </div>
              <div className="text-slate-400">
                Date: <span className="text-slate-300 font-mono">Academic Year 2026</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400">
          <p>© 2026 PHISHGUARD | College CCS Academic Cybersecurity Project. For Educational Use Only.</p>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <span className="flex items-center gap-1">
              <Cpu className="w-3 h-3 text-cyan-400" /> Client-Side Sandbox
            </span>
            <span>Reserved Domains: example.com</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
