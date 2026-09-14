import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Crosshair, 
  ShieldAlert, 
  ArrowRight, 
  Filter, 
  Tag, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { DEFAULT_SCENARIOS } from '../data/defaultScenarios';

export default function TrainingScenarios({ scenarios = DEFAULT_SCENARIOS, onSimulateScenario, onAnalyzeScenario }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Extract unique categories
  const categories = ['ALL', ...new Set(scenarios.map(s => s.category))];

  const filteredScenarios = scenarios.filter(scen => {
    const matchesCategory = selectedCategory === 'ALL' || scen.category === selectedCategory;
    const matchesSearch = 
      scen.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scen.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scen.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scen.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>ACADEMIC TRAINING CORPUS</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-sans m-0">
            TRAINING SCENARIOS LIBRARY
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Explore 10 curated phishing attack vectors representing common social engineering pretexts.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400">
          Total Scenarios: <strong className="text-cyan-400 font-bold">{scenarios.length}</strong>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search scenarios by keyword, sender, or subject..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-xs font-mono focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-[0_0_10px_rgba(0,242,254,0.2)]'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredScenarios.map((scen, idx) => (
          <div 
            key={scen.id || idx}
            className="p-6 rounded-xl glass-panel border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all group space-y-4"
          >
            <div>
              {/* Top Meta Header */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                    {scen.category}
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400">
                    Difficulty: {scen.difficulty || 'Intermediate'}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs font-mono text-rose-400 font-bold bg-rose-950/40 px-2 py-0.5 rounded border border-rose-500/30">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Risk: {scen.riskScore}/100</span>
                </div>
              </div>

              {/* Title & Subject */}
              <h3 className="text-base font-bold text-white tracking-wide group-hover:text-cyan-300 transition-colors">
                {scen.title}
              </h3>

              <div className="mt-2 space-y-1 text-xs">
                <div className="text-slate-400">
                  From: <span className="text-slate-200 font-mono text-[11px]">&lt;{scen.sender}&gt;</span>
                </div>
                <div className="text-slate-400">
                  Subject: <span className="text-white font-medium">{scen.subject}</span>
                </div>
              </div>

              {/* Message Snippet */}
              <div className="mt-3 p-3 rounded-lg bg-cyber-950/80 border border-slate-800/80 text-xs text-slate-300 leading-relaxed font-sans line-clamp-3">
                "{scen.message}"
              </div>

              {/* Red Flags List */}
              <div className="mt-3 space-y-1">
                <span className="text-[10px] font-mono uppercase text-rose-400 font-bold tracking-wider block">
                  Identified Red Flags:
                </span>
                <ul className="text-[11px] text-slate-400 space-y-0.5 list-disc pl-4">
                  {(scen.redFlags || []).slice(0, 3).map((flag, fIdx) => (
                    <li key={fIdx}>{flag}</li>
                  ))}
                </ul>
              </div>

              {/* Academic Explanation */}
              <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-400 italic">
                <strong className="text-cyan-400 font-mono font-normal">Pedagogical Analysis:</strong> {scen.explanation}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => onSimulateScenario(scen)}
                className="flex-1 py-2 px-3 rounded-lg bg-rose-950/40 hover:bg-rose-900/50 border border-rose-500/40 text-rose-300 text-xs font-mono font-bold tracking-wider flex items-center justify-center gap-1.5 transition-colors"
              >
                <Crosshair className="w-3.5 h-3.5" />
                <span>Simulate Attack</span>
              </button>

              <button
                onClick={() => onAnalyzeScenario(scen)}
                className="flex-1 py-2 px-3 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold tracking-wider flex items-center justify-center gap-1.5 transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Analyze in Detector</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
