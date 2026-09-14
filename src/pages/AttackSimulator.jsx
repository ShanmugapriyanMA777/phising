import React, { useState, useEffect } from 'react';
import { 
  Crosshair, 
  Layers, 
  Mail, 
  ExternalLink, 
  ShieldAlert, 
  Info, 
  ArrowRight, 
  RefreshCw,
  Sparkles,
  Send
} from 'lucide-react';
import SimulationNotice from '../components/SimulationNotice';
import EmailPreview from '../components/EmailPreview';
import SocialLoginModal from '../components/SocialLoginModal';
import ShareDrillModal from '../components/ShareDrillModal';
import AttackChainVisualizer from '../components/AttackChainVisualizer';
import { DEFAULT_SCENARIOS } from '../data/defaultScenarios';

export default function AttackSimulator({ 
  scenarios = DEFAULT_SCENARIOS, 
  onAnalyzeAttack,
  onGoToAwareness,
  initialScenarioId
}) {
  const [selectedScenarioId, setSelectedScenarioId] = useState(initialScenarioId || scenarios[0]?.id || 'scen-01');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    if (initialScenarioId) {
      setSelectedScenarioId(initialScenarioId);
    }
  }, [initialScenarioId]);

  const currentScenario = scenarios.find(s => s.id === selectedScenarioId) || scenarios[0];

  const handleSimulatedLinkClick = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <div className="space-y-10">
      
      {/* Educational Safe Simulation Notice */}
      <SimulationNotice />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono mb-2">
            <Crosshair className="w-3.5 h-3.5 animate-pulse text-rose-400" />
            <span>EDUCATIONAL ATTACK LABORATORY</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-sans m-0">
            PHISHING ATTACK SIMULATOR
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            See how social engineering can trick users into visiting fraudulent login pages.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Dispatch Educational Drill Button */}
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs font-mono tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Share Drill via Email</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Target:</span>
            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-500/30 truncate max-w-[200px]">
              {currentScenario.title}
            </span>
          </div>
        </div>
      </div>

      {/* STEP 1: SCENARIO SELECTION */}
      <div className="p-6 rounded-xl glass-panel border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white font-mono flex items-center gap-2 m-0">
            <span className="w-6 h-6 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 text-xs flex items-center justify-center font-bold">
              01
            </span>
            <span>STEP 1 — CHOOSE ATTACK SCENARIO</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            {scenarios.length} Scenarios Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-300 mb-1.5 font-mono">
              Select Attack Pretext:
            </label>
            <select
              value={selectedScenarioId}
              onChange={(e) => setSelectedScenarioId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm font-sans focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            >
              {scenarios.map((scen) => (
                <option key={scen.id} value={scen.id}>
                  [{scen.category}] {scen.title} (Difficulty: {scen.difficulty || 'Medium'})
                </option>
              ))}
            </select>
          </div>

          <div className="p-3 rounded-lg bg-cyber-950 border border-slate-800/80 flex flex-col justify-center text-xs">
            <span className="text-[10px] uppercase font-mono text-slate-400">Estimated Attack Risk:</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-bold font-mono text-rose-400">
                {currentScenario.riskScore || 85}/100
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/30">
                HIGH THREAT
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-400 italic">
          Tip: Notice how the pretext establishes credibility and leverages psychological pressure before presenting the lure.
        </p>
      </div>

      {/* STEP 2: REALISTIC EMAIL PREVIEW */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white font-mono flex items-center gap-2 m-0">
            <span className="w-6 h-6 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 text-xs flex items-center justify-center font-bold">
              02
            </span>
            <span>STEP 2 — SIMULATED EMAIL INBOX PREVIEW</span>
          </h2>
          <span className="text-xs text-cyan-400 font-mono">
            CLICK THE ACTION BUTTON TO TEST THE LURE
          </span>
        </div>

        <EmailPreview 
          scenario={currentScenario} 
          onSimulatedLinkClick={handleSimulatedLinkClick} 
        />
      </div>

      {/* STEP 3 & 4: THE SIMULATED MODAL */}
      <SocialLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        simulatedUrl={currentScenario.simulatedUrl}
        scenario={currentScenario}
        onAnalyzeAttack={onAnalyzeAttack}
        onGoToAwareness={onGoToAwareness}
      />

      {/* SHARE DRILL MODAL */}
      <ShareDrillModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        scenario={currentScenario}
      />

      {/* STEP 5: ATTACK KILL-CHAIN EXPLANATION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white font-mono flex items-center gap-2 m-0">
            <span className="w-6 h-6 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 text-xs flex items-center justify-center font-bold">
              03
            </span>
            <span>STEP 3 — UNDERSTAND THE ATTACK KILL-CHAIN</span>
          </h2>
        </div>

        <AttackChainVisualizer />
      </div>

    </div>
  );
}
