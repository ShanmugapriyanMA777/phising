import React from 'react';
import { 
  Info, 
  ShieldCheck, 
  Cpu, 
  Target, 
  Layers, 
  Brain, 
  Compass, 
  Terminal, 
  Code,
  Radio
} from 'lucide-react';

export default function About() {
  const objectives = [
    {
      num: '01',
      title: 'Demonstrate Attack Manipulation',
      desc: 'Showcase how threat actors exploit cognitive biases, urgency, and fear through deceptive social engineering pretexts.'
    },
    {
      num: '02',
      title: 'Recognize Phishing Indicators',
      desc: 'Train users to identify subtle red flags in email headers, sender address domains, and fake authentication portals.'
    },
    {
      num: '03',
      title: 'Analyze Suspicious URLs and Messages',
      desc: 'Provide an anatomical deconstruction engine to inspect domain names, subdomains, IP hosts, and misleading paths.'
    },
    {
      num: '04',
      title: 'Calculate Quantitative Risk Scores',
      desc: 'Formulate an objective 0–100 heuristic scoring matrix that classifies messages into Low, Medium, and High threat tiers.'
    },
    {
      num: '05',
      title: 'Cultivate Defensive Cybersecurity Instincts',
      desc: 'Bridge academic cryptographic principles with practical operational security habits like MFA and URL verification.'
    }
  ];

  const technologies = [
    { name: 'React 19', role: 'Reactive Component Architecture' },
    { name: 'JavaScript (ES2024)', role: 'Core Heuristics & Analysis Logic' },
    { name: 'Tailwind CSS', role: 'Cyber Glassmorphism Design System' },
    { name: 'Lucide React', role: 'Cybersecurity & UI Vector Icons' },
    { name: 'jsPDF', role: 'Academic Security Audit Report Generator' },
    { name: 'Node.js / Express Ready', role: 'Modular Client-Side Engine with REST compatibility' },
    { name: 'Rule-Based Engine', role: 'Multi-vector Pattern Matching Heuristics' },
    { name: 'URL Anatomy Parser', role: 'RFC-compliant Host & Path Dissection' }
  ];

  const futureScope = [
    { title: 'Machine Learning Phishing Detection', desc: 'Integration of pre-trained transformer and ensemble models.' },
    { title: 'NLP-based Email Classification', desc: 'BERT / DistilBERT fine-tuned on known spear-phishing corpora.' },
    { title: 'Real-Time Threat Intelligence APIs', desc: 'Direct lookups via VirusTotal, Google Safe Browsing, and PhishTank.' },
    { title: 'Browser Extension Companion', desc: 'Active scanning of DOM hyperlinks and form submission endpoints.' },
    { title: 'Mobile Cross-Platform Application', desc: 'SMS smishing filtering for iOS and Android.' },
    { title: 'Explainable AI (XAI) Attribution', desc: 'SHAP / LIME visualizations highlighting exact phrase weights.' },
    { title: 'Enterprise Security Dashboard', desc: 'Organization-wide campaign simulations and compliance tracking.' }
  ];

  return (
    <div className="space-y-12">
      
      {/* Header */}
      <div className="pb-6 border-b border-slate-800 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
          <span>CCS COURSEWORK DOCUMENTATION</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans m-0">
          About PHISHGUARD
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          PHISHGUARD is an educational cybersecurity project designed to demonstrate common phishing techniques and provide users with practical tools for identifying suspicious messages and URLs.
        </p>
      </div>

      {/* Project Objectives */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2 m-0">
          <Target className="w-5 h-5 text-cyan-400" />
          <span>PROJECT OBJECTIVES</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {objectives.map((obj) => (
            <div 
              key={obj.num}
              className="p-5 rounded-xl glass-panel border border-slate-800 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xl font-black font-mono text-cyan-400">
                  {obj.num}
                </span>
                <span className="text-[10px] font-mono text-slate-500">OBJECTIVE</span>
              </div>
              <h3 className="text-sm font-bold text-white tracking-wide">
                {obj.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {obj.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack Grid */}
      <div className="p-6 rounded-xl glass-panel border border-slate-800 space-y-4">
        <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2 m-0">
          <Code className="w-5 h-5 text-cyan-400" />
          <span>TECHNOLOGY STACK</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {technologies.map((tech, i) => (
            <div key={i} className="p-3 rounded-lg bg-cyber-950 border border-slate-800 text-xs">
              <div className="font-bold text-cyan-300 font-mono">{tech.name}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{tech.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Machine Learning Ready Design Section */}
      <div className="p-8 rounded-2xl glass-panel-glow border border-cyan-500/30 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/30 mb-2">
              <Brain className="w-3.5 h-3.5" />
              <span>ACADEMIC EXTENSION</span>
            </div>
            <h2 className="text-xl font-bold text-white font-mono m-0">
              MACHINE LEARNING READY ARCHITECTURE
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              PHISHGUARD is engineered with a decoupled feature extraction pipeline. The heuristic rule outputs translate directly into a normalized numerical feature vector, allowing smooth drop-in integration with supervised ML models (e.g. Scikit-learn, PyTorch, or TensorFlow).
            </p>
          </div>

          <div className="hidden md:flex flex-col items-end text-right">
            <span className="text-[11px] font-mono text-slate-400">Sample Probabilistic Output:</span>
            <span className="text-xl font-mono font-bold text-cyan-400">
              PHISHING PROBABILITY: 91.4%
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Probabilistic, not absolute</span>
          </div>
        </div>

        {/* Feature Vector Table */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
          <div className="p-2.5 rounded bg-cyber-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">FEATURE 01</span>
            <span className="text-slate-200">URL Length</span>
          </div>
          <div className="p-2.5 rounded bg-cyber-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">FEATURE 02</span>
            <span className="text-slate-200">Dot Count (.)</span>
          </div>
          <div className="p-2.5 rounded bg-cyber-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">FEATURE 03</span>
            <span className="text-slate-200">Subdomain Depth</span>
          </div>
          <div className="p-2.5 rounded bg-cyber-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">FEATURE 04</span>
            <span className="text-slate-200">Special Chars (@, %)</span>
          </div>
          <div className="p-2.5 rounded bg-cyber-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">FEATURE 05</span>
            <span className="text-slate-200">HTTPS Status (0/1)</span>
          </div>
          <div className="p-2.5 rounded bg-cyber-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">FEATURE 06</span>
            <span className="text-slate-200">Text Urgency Frequency</span>
          </div>
          <div className="p-2.5 rounded bg-cyber-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">FEATURE 07</span>
            <span className="text-slate-200">Credential Intent Score</span>
          </div>
          <div className="p-2.5 rounded bg-cyber-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">FEATURE 08</span>
            <span className="text-slate-200">Brand Distance Metric</span>
          </div>
        </div>
      </div>

      {/* Future Scope */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2 m-0">
          <Compass className="w-5 h-5 text-cyan-400" />
          <span>FUTURE RESEARCH ROADMAP & SCOPE</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {futureScope.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl glass-panel border border-slate-800 space-y-1">
              <h4 className="text-xs font-bold text-cyan-300 font-mono">
                {item.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
