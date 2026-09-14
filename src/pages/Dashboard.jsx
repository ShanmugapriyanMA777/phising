import React from 'react';
import { 
  Shield, 
  Crosshair, 
  Search, 
  Globe, 
  BookOpen, 
  Award, 
  AlertTriangle, 
  ArrowRight, 
  Terminal, 
  Lock, 
  Eye, 
  Zap, 
  Radio, 
  Cpu, 
  CheckCircle2,
  FileText
} from 'lucide-react';
import AttackChainVisualizer from '../components/AttackChainVisualizer';
import SimulationNotice from '../components/SimulationNotice';

export default function Dashboard({ onNavigate }) {
  const statCards = [
    {
      num: '01',
      title: 'ATTACK SIMULATOR',
      subtitle: 'Simulate Social Engineering & Cloned Pages',
      icon: Crosshair,
      color: 'from-rose-500/20 to-rose-950/40',
      border: 'border-rose-500/30 hover:border-rose-500/60',
      iconColor: 'text-rose-400',
      badge: 'SAFE ENVIRONMENT',
      desc: 'Experience realistic multi-stage phishing emails and simulated social logins in a zero-storage sandbox.',
      action: () => onNavigate('simulator')
    },
    {
      num: '02',
      title: 'PHISHING DETECTOR',
      subtitle: 'Analyze Emails & Suspect Messages',
      icon: Search,
      color: 'from-cyan-500/20 to-cyan-950/40',
      border: 'border-cyan-500/30 hover:border-cyan-500/60',
      iconColor: 'text-cyan-400',
      badge: 'HEURISTIC ENGINE',
      desc: 'Scan emails, SMS text, and messages for urgency pressure, threats, and credential solicitation patterns.',
      action: () => onNavigate('detector')
    },
    {
      num: '03',
      title: 'URL ANALYZER',
      subtitle: 'Deep Anatomical URL Inspector',
      icon: Globe,
      color: 'from-amber-500/20 to-amber-950/40',
      border: 'border-amber-500/30 hover:border-amber-500/60',
      iconColor: 'text-amber-400',
      badge: 'ANATOMY SCANNER',
      desc: 'Dissect hostnames, detect typosquatting (paypa1), IP hosts, excessive subdomains, and deceptive parameters.',
      action: () => onNavigate('url-analyzer')
    },
    {
      num: '04',
      title: 'SECURITY AWARENESS',
      subtitle: '7 Defense Pillars & Knowledge Quiz',
      icon: Award,
      color: 'from-emerald-500/20 to-emerald-950/40',
      border: 'border-emerald-500/30 hover:border-emerald-500/60',
      iconColor: 'text-emerald-400',
      badge: 'DEFENSIVE TRAINING',
      desc: 'Master the 7 core cybersecurity defense pillars and test your phishing detection reflexes with interactive labs.',
      action: () => onNavigate('awareness')
    }
  ];

  return (
    <div className="space-y-12">
      
      {/* Educational Safe Simulation Notice */}
      <SimulationNotice />

      {/* Hero Section */}
      <div className="relative rounded-2xl p-8 md:p-12 glass-panel border border-cyan-500/20 overflow-hidden">
        {/* Ambient cyber lights */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>CRYPTOGRAPHY & CYBERSECURITY (CCS) ACADEMIC PROJECT</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-sans m-0">
              PHISH<span className="text-cyan-400">GUARD</span>
            </h1>
            <p className="text-lg sm:text-xl text-cyan-300 font-mono font-semibold">
              Phishing Attack Simulation & Detection System
            </p>
            <p className="text-sm font-mono text-slate-400 italic">
              "Understand the Attack. Detect the Threat. Stay Secure."
            </p>
          </div>

          <div className="border-l-2 border-cyan-500/40 pl-4 py-1">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide m-0 mb-1">
              PHISHING ATTACK & DETECTION
            </h2>
            <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-2">
              SIMULATE. ANALYZE. DETECT. PROTECT.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              An educational cybersecurity platform that demonstrates common phishing techniques and analyzes suspicious messages and URLs. Explore the attack kill chain, test your vigilance against deceptive login pages, and inspect threat indicators using a rule-based detection engine.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('simulator')}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,242,254,0.4)] flex items-center gap-2 group"
            >
              <span>🎣 TRY ATTACK SIMULATION</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('detector')}
              className="px-6 py-3 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2"
            >
              <span>🛡️ ANALYZE A MESSAGE</span>
            </button>

            <button
              onClick={() => onNavigate('url-analyzer')}
              className="px-6 py-3 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2"
            >
              <span>🔗 SCAN A URL</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Main Dashboard Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white tracking-wide font-mono flex items-center gap-2 m-0">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span>CORE DEFENSE & SIMULATION MODULES</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            SELECT A MODULE TO BEGIN
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.num}
                onClick={card.action}
                className={`p-6 rounded-xl bg-gradient-to-b ${card.color} border ${card.border} glass-panel cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-mono text-slate-500 group-hover:text-cyan-400 transition-colors">
                      {card.num}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-950/80 border border-slate-700 text-slate-300">
                      {card.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2.5 rounded-lg bg-cyber-950 border border-slate-800 ${card.iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white tracking-wide font-mono leading-tight">
                        {card.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {card.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-400 group-hover:text-white transition-colors">
                  <span>Launch Module</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live System Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-xl bg-cyber-900/60 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold font-mono text-white">38+</div>
            <div className="text-[11px] text-slate-400">Heuristic Rules Active</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold font-mono text-white">10 Labs</div>
            <div className="text-[11px] text-slate-400">Pre-built Scenarios</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold font-mono text-white">0.05s</div>
            <div className="text-[11px] text-slate-400">Instant Scan Latency</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold font-mono text-emerald-400">100% Zero</div>
            <div className="text-[11px] text-slate-400">Credential Storage</div>
          </div>
        </div>
      </div>

      {/* Interactive Kill-Chain Diagram */}
      <div>
        <AttackChainVisualizer />
      </div>

    </div>
  );
}
