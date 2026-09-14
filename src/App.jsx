import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import AttackSimulator from './pages/AttackSimulator';
import PhishingDetector from './pages/PhishingDetector';
import URLAnalyzer from './pages/URLAnalyzer';
import TrainingScenarios from './pages/TrainingScenarios';
import SecurityAwareness from './pages/SecurityAwareness';
import ActivityHistory from './pages/ActivityHistory';
import AdminScenarios from './pages/AdminScenarios';
import About from './pages/About';
import { DEFAULT_SCENARIOS } from './data/defaultScenarios';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [scenarios, setScenarios] = useState(DEFAULT_SCENARIOS);
  const [preloadedDetectorPayload, setPreloadedDetectorPayload] = useState(null);
  const [initialDrillScenarioId, setInitialDrillScenarioId] = useState(null);
  const [isDrillModeActive, setIsDrillModeActive] = useState(false);

  // Check URL parameters for direct drill links (e.g. ?mode=drill&scen=scen-01)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const mode = params.get('mode');
      const scen = params.get('scen');
      if (mode === 'drill' && scen) {
        setIsDrillModeActive(true);
        setInitialDrillScenarioId(scen);
        setActiveTab('simulator');
      }
    } catch (err) {
      console.error('Error reading URL parameters:', err);
    }
  }, []);

  // Cross-page navigation handlers
  const handleNavigate = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSimulateScenario = (scenario) => {
    setInitialDrillScenarioId(scenario.id);
    setActiveTab('simulator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalyzeScenario = (scenario) => {
    setPreloadedDetectorPayload(scenario);
    setActiveTab('detector');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-cyber-950 text-slate-100 flex flex-col cyber-grid relative selection:bg-cyan-500 selection:text-black">
      {/* Top Subtle Radar Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-72 radar-glow pointer-events-none z-0" />

      {/* Main Sticky Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={handleNavigate} />

      {/* Primary Page Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 relative z-10">
        
        {/* Active Educational Drill Banner if recipient opened link via email */}
        {isDrillModeActive && (
          <div className="mb-8 p-4 rounded-xl bg-gradient-to-r from-cyan-950/80 via-blue-950/80 to-purple-950/80 border border-cyan-500/40 shadow-[0_0_20px_rgba(0,242,254,0.15)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-lg">
                🎓
              </div>
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                  LIVE EDUCATIONAL AWARENESS DRILL ACTIVE
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  You opened a controlled training scenario. Interact with the email to test your awareness and reveal defensive tips!
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsDrillModeActive(false)}
              className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-slate-300 self-end sm:self-auto transition-colors"
            >
              Dismiss Banner
            </button>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <Dashboard onNavigate={handleNavigate} />
        )}

        {activeTab === 'simulator' && (
          <AttackSimulator 
            scenarios={scenarios} 
            initialScenarioId={initialDrillScenarioId}
            onAnalyzeAttack={handleAnalyzeScenario}
            onGoToAwareness={() => handleNavigate('awareness')}
          />
        )}

        {activeTab === 'detector' && (
          <PhishingDetector 
            preloadedPayload={preloadedDetectorPayload}
            onClearPayload={() => setPreloadedDetectorPayload(null)}
          />
        )}

        {activeTab === 'url-analyzer' && (
          <URLAnalyzer />
        )}

        {activeTab === 'scenarios' && (
          <TrainingScenarios 
            scenarios={scenarios} 
            onSimulateScenario={handleSimulateScenario}
            onAnalyzeScenario={handleAnalyzeScenario}
          />
        )}

        {activeTab === 'awareness' && (
          <SecurityAwareness />
        )}

        {activeTab === 'history' && (
          <ActivityHistory />
        )}

        {activeTab === 'admin' && (
          <AdminScenarios 
            scenarios={scenarios} 
            setScenarios={setScenarios} 
          />
        )}

        {activeTab === 'about' && (
          <About />
        )}
      </main>

      {/* Institutional Footer */}
      <Footer />
    </div>
  );
}
