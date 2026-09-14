import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  ExternalLink,
  Lock,
  Unlock,
  Terminal,
  FileText
} from 'lucide-react';
import RiskScoreGauge from '../components/RiskScoreGauge';
import IndicatorCard from '../components/IndicatorCard';
import SecurityReportModal from '../components/SecurityReportModal';
import { analyzeUrl } from '../utils/urlAnalyzer';
import { saveHistoryItem } from '../utils/historyStorage';

export default function URLAnalyzer() {
  const [urlInput, setUrlInput] = useState('https://security-verify.socialconnect-portal.example.com/login/auth?redirect_to=token89');
  const [isScanning, setIsScanning] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const handleScanUrl = () => {
    setErrorMessage('');
    if (!urlInput.trim()) {
      setErrorMessage('Please enter a URL to analyze.');
      return;
    }

    setIsScanning(true);
    setTimeout(() => {
      const result = analyzeUrl(urlInput);
      setIsScanning(false);

      if (result.error) {
        setErrorMessage(result.error);
        setAnalysisResult(null);
        return;
      }

      setAnalysisResult(result);

      // Save sanitized metadata into audit history
      saveHistoryItem({
        type: 'URL',
        target: result.formattedUrl,
        riskScore: result.riskScore,
        riskTier: result.riskTier,
        indicatorsCount: result.indicators.length
      });
    }, 400);
  };

  const handleSampleSelect = (sampleUrl) => {
    setUrlInput(sampleUrl);
    setErrorMessage('');
    setAnalysisResult(null);
  };

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-2">
            <Globe className="w-3.5 h-3.5 animate-pulse text-amber-400" />
            <span>URL ANATOMY & TYPOSQUATTING RADAR</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-sans m-0">
            URL ANALYZER
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Deeply inspect suspicious links for domain impersonation, IP hosts, subdomains, and credential paths.
          </p>
        </div>

        {/* Quick Test Vectors */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => handleSampleSelect('http://192.168.1.105/paypal-auth/login.php')}
            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-[11px] font-mono text-slate-300 transition-colors"
          >
            IP Host Sample
          </button>
          <button
            onClick={() => handleSampleSelect('https://paypa1-security-verification.example.com/account/signin')}
            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-[11px] font-mono text-slate-300 transition-colors"
          >
            Typosquatting Sample
          </button>
          <button
            onClick={() => handleSampleSelect('https://github.com/security/advisories')}
            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-[11px] font-mono text-slate-300 transition-colors"
          >
            Safe HTTPS Sample
          </button>
        </div>
      </div>

      {/* URL Input Bar */}
      <div className="p-6 rounded-xl glass-panel border border-slate-800 space-y-4">
        <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider font-bold">
          Enter suspicious URL to inspect:
        </label>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Globe className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="e.g. https://paypal.com.verify-account.example.com/login"
              onKeyDown={(e) => e.key === 'Enter' && handleScanUrl()}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
            />
          </div>

          <button
            onClick={handleScanUrl}
            disabled={isScanning}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-rose-600 hover:opacity-90 text-black font-extrabold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
          >
            {isScanning ? (
              <span>SCANNING URL...</span>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>SCAN URL</span>
              </>
            )}
          </button>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Analysis Results Display */}
      {analysisResult && (
        <div className="space-y-8">
          
          {/* Top Row: Score Gauge & Key URL Parameters Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Score Gauge */}
            <div className="lg:col-span-4 space-y-4">
              <RiskScoreGauge score={analysisResult.riskScore} />

              <button
                onClick={() => setIsReportModalOpen(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-cyber-900 border border-amber-500/40 hover:bg-amber-950/40 text-amber-300 text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>GENERATE URL AUDIT REPORT</span>
              </button>
            </div>

            {/* URL Anatomical Metrics Table */}
            <div className="lg:col-span-8 p-6 rounded-xl glass-panel border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2 m-0">
                  <Terminal className="w-4 h-4 text-amber-400" />
                  <span>TECHNICAL URL ATTRIBUTES</span>
                </h3>
                <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase border ${
                  analysisResult.riskTier.includes('HIGH')
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : analysisResult.riskTier.includes('MEDIUM')
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}>
                  {analysisResult.riskTier}
                </span>
              </div>

              {/* Attributes Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                
                {/* Protocol */}
                <div className="p-3 rounded-lg bg-cyber-950 border border-slate-800">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Protocol</span>
                  <div className="flex items-center gap-1.5 font-bold font-mono">
                    {analysisResult.isHttps ? (
                      <>
                        <Lock className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">HTTPS (Encrypted)</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-3.5 h-3.5 text-rose-400" />
                        <span className="text-rose-400">HTTP (Unencrypted)</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Host IP Address */}
                <div className="p-3 rounded-lg bg-cyber-950 border border-slate-800">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">IP As Hostname</span>
                  <div className={`font-mono font-bold ${analysisResult.hasIpHost ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {analysisResult.hasIpHost ? '⚠️ YES (High Risk)' : '✓ NO (Domain Used)'}
                  </div>
                </div>

                {/* Subdomains Count */}
                <div className="p-3 rounded-lg bg-cyber-950 border border-slate-800">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Subdomain Depth</span>
                  <div className={`font-mono font-bold ${analysisResult.subdomainCount >= 3 ? 'text-rose-400' : analysisResult.subdomainCount === 2 ? 'text-amber-400' : 'text-slate-200'}`}>
                    {analysisResult.subdomainCount} Level(s)
                  </div>
                </div>

                {/* Credential Keywords */}
                <div className="p-3 rounded-lg bg-cyber-950 border border-slate-800">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Harvesting Keywords</span>
                  <div className={`font-mono font-bold ${analysisResult.anatomy.suspiciousKeywordsFound.length > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {analysisResult.anatomy.suspiciousKeywordsFound.length > 0 
                      ? `${analysisResult.anatomy.suspiciousKeywordsFound.length} Detected` 
                      : 'None Detected'}
                  </div>
                </div>

                {/* Brand Impersonation */}
                <div className="p-3 rounded-lg bg-cyber-950 border border-slate-800">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Domain Similarity</span>
                  <div className={`font-mono font-bold ${analysisResult.anatomy.hasBrandImpersonation ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {analysisResult.anatomy.hasBrandImpersonation ? '⚠️ Impersonation Pattern' : '✓ Normal'}
                  </div>
                </div>

                {/* URL Length */}
                <div className="p-3 rounded-lg bg-cyber-950 border border-slate-800">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">URL Length</span>
                  <div className={`font-mono font-bold ${analysisResult.formattedUrl.length > 80 ? 'text-amber-400' : 'text-slate-200'}`}>
                    {analysisResult.formattedUrl.length} chars ({analysisResult.formattedUrl.length > 80 ? 'Suspicious' : 'Normal'})
                  </div>
                </div>

              </div>

              {/* Crucial Educational Security Note */}
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span className="font-semibold">
                  Rule of Thumb: Never enter credentials or financial data into an unfamiliar website.
                </span>
              </div>

            </div>

          </div>

          {/* Visual Anatomy Breakdown of the URL */}
          <div className="p-6 rounded-xl glass-panel border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2 m-0">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>VISUAL URL ANATOMY DECONSTRUCTION</span>
            </h3>

            <p className="text-xs text-slate-400">
              Dissecting each component of the address bar to isolate deception tactics:
            </p>

            <div className="p-4 rounded-xl bg-cyber-950 border border-slate-800 flex flex-wrap items-center gap-1.5 font-mono text-sm">
              
              {/* Protocol segment */}
              <span className={`px-2 py-1 rounded border text-xs ${analysisResult.isHttps ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30' : 'bg-rose-950/60 text-rose-300 border-rose-500/30'}`}>
                {analysisResult.anatomy.protocol}//
              </span>

              {/* Subdomains segment */}
              {analysisResult.anatomy.subdomains && (
                <span className="px-2 py-1 rounded bg-amber-950/60 text-amber-300 border border-amber-500/30 text-xs" title="Subdomain Lure">
                  {analysisResult.anatomy.subdomains}.
                </span>
              )}

              {/* Apex Domain segment */}
              <span className="px-2 py-1 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/50 text-xs font-bold" title="True Registered Domain">
                {analysisResult.anatomy.apexDomain}{analysisResult.anatomy.tld}
              </span>

              {/* Port if present */}
              {analysisResult.anatomy.port && (
                <span className="px-1.5 py-1 rounded bg-purple-950/60 text-purple-300 border border-purple-500/30 text-xs">
                  {analysisResult.anatomy.port}
                </span>
              )}

              {/* Path segment */}
              <span className={`px-2 py-1 rounded border text-xs ${analysisResult.anatomy.suspiciousKeywordsFound.length > 0 ? 'bg-rose-950/60 text-rose-300 border-rose-500/30' : 'bg-slate-900 text-slate-300 border-slate-700'}`}>
                {analysisResult.anatomy.path || '/'}
              </span>

              {/* Query search segment */}
              {analysisResult.anatomy.search && (
                <span className="px-2 py-1 rounded bg-slate-900 text-slate-400 border border-slate-800 text-xs truncate max-w-xs">
                  {analysisResult.anatomy.search}
                </span>
              )}

            </div>

            <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500/50 inline-block" /> Protocol
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-amber-500/50 inline-block" /> Subdomains
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-cyan-500/50 inline-block" /> Apex Domain (Real Owner)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-rose-500/50 inline-block" /> Path & Keyword Lure
              </span>
            </div>
          </div>

          {/* Triggered Threat Indicators List */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white font-mono flex items-center gap-2 m-0">
              <span>TRIGGERED URL RISK INDICATORS ({analysisResult.indicators.length})</span>
            </h3>

            {analysisResult.indicators.length === 0 ? (
              <div className="p-6 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <span className="font-bold">Low Structural Risk:</span> Standard HTTPS domain anatomy with no brand spoofing or nested subdomains detected.
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysisResult.indicators.map((indicator, index) => (
                  <IndicatorCard key={indicator.id || index} indicator={indicator} />
                ))}
              </div>
            )}
          </div>

          {/* Report Modal */}
          <SecurityReportModal
            isOpen={isReportModalOpen}
            onClose={() => setIsReportModalOpen(false)}
            reportData={{
              ...analysisResult,
              inputType: 'URL Scan',
              subject: analysisResult.formattedUrl
            }}
          />

        </div>
      )}

    </div>
  );
}
