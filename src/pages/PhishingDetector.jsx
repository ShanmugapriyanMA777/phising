import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Mail, 
  MessageSquare, 
  Globe, 
  AlertTriangle, 
  Sparkles, 
  RefreshCw, 
  FileText, 
  Cpu, 
  CheckCircle2,
  ShieldCheck,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import RiskScoreGauge from '../components/RiskScoreGauge';
import IndicatorCard from '../components/IndicatorCard';
import SecurityReportModal from '../components/SecurityReportModal';
import { analyzePhishing } from '../utils/phishingDetector';
import { saveHistoryItem } from '../utils/historyStorage';

export default function PhishingDetector({ preloadedPayload, onClearPayload }) {
  const [activeTab, setActiveTab] = useState('email'); // 'email' | 'message'
  const [sender, setSender] = useState('security-team@socialconnect-verify.example.com');
  const [subject, setSubject] = useState('Urgent: Verify Your Account To Prevent Restriction');
  const [message, setMessage] = useState(`Dear User,\n\nWe noticed unusual sign-in attempts on your SocialConnect profile from an unrecognized device in Moscow, Russia (IP: 185.220.101.4).\n\nTo secure your identity and prevent permanent suspension within 24 hours, you must confirm your credentials through our dedicated verification portal immediately.\n\nFailure to verify will result in immediate termination of your account privileges.`);
  const [link, setLink] = useState('https://security-verify.socialconnect-portal.example.com/login/auth');

  // Message tab state
  const [msgSender, setMsgSender] = useState('+1 (800) 555-0199 (Postal Service)');
  const [msgText, setMsgText] = useState('USPS ALERT: Your parcel #US-98214 has an invalid street address. Click http://192.168.1.55/update to confirm delivery details within 12 hours.');

  // Detection & UI states
  const [isScanning, setIsScanning] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // If payload passed from Attack Simulator or Scenarios
  useEffect(() => {
    if (preloadedPayload) {
      setActiveTab('email');
      setSender(preloadedPayload.sender || '');
      setSubject(preloadedPayload.subject || '');
      setMessage(preloadedPayload.message || '');
      setLink(preloadedPayload.simulatedUrl || preloadedPayload.link || '');
      
      // Auto run analysis
      const result = analyzePhishing({
        sender: preloadedPayload.sender || '',
        subject: preloadedPayload.subject || '',
        message: preloadedPayload.message || '',
        link: preloadedPayload.simulatedUrl || preloadedPayload.link || '',
        inputType: 'email'
      });
      setAnalysisResult(result);
      if (onClearPayload) onClearPayload();
    }
  }, [preloadedPayload]);

  const handleRunAnalysis = () => {
    setErrorMessage('');
    setIsScanning(true);

    const isEmail = activeTab === 'email';
    const payload = isEmail 
      ? { sender, subject, message, link, inputType: 'email' }
      : { sender: msgSender, subject: 'SMS / Text Message', message: msgText, link: '', inputType: 'message' };

    setTimeout(() => {
      const result = analyzePhishing(payload);
      setIsScanning(false);

      if (result.error) {
        setErrorMessage(result.error);
        setAnalysisResult(null);
        return;
      }

      setAnalysisResult(result);

      // Save sanitized metadata into audit history
      saveHistoryItem({
        type: isEmail ? 'Email' : 'Message',
        target: isEmail ? (subject || sender) : msgText,
        riskScore: result.riskScore,
        riskTier: result.riskTier,
        indicatorsCount: result.indicators.length
      });
    }, 450);
  };

  const handleLoadLegitimateSample = () => {
    setActiveTab('email');
    setSender('support@github.com');
    setSubject('[GitHub] A personal access token has been generated');
    setMessage(`Hi octocat,\n\nA new personal access token (classic) was recently created on your GitHub account.\n\nToken Name: IDE Integration\nCreated: Sep 14, 2026\n\nIf you generated this token, no further action is required.\nIf you did not generate this token, please visit your GitHub account settings to revoke it immediately.`);
    setLink('https://github.com/settings/tokens');
    setAnalysisResult(null);
  };

  const handleLoadPhishingSample = () => {
    setActiveTab('email');
    setSender('security-alert@paypal-account-support.example.xyz');
    setSubject('URGENT: Your account access has been restricted');
    setMessage(`Dear Customer,\n\nWe detected suspicious activity on your account. To prevent unauthorized transactions and permanent account termination, you must verify your identity within 6 hours.\n\nPlease click below to enter your password and confirm your social security number.`);
    setLink('http://192.168.1.100/paypal-verify/login.php');
    setAnalysisResult(null);
  };

  const handleResetForm = () => {
    if (activeTab === 'email') {
      setSender('');
      setSubject('');
      setMessage('');
      setLink('');
    } else {
      setMsgSender('');
      setMsgText('');
    }
    setAnalysisResult(null);
    setErrorMessage('');
  };

  return (
    <div className="space-y-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
            <Search className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>HEURISTIC DETECTION ENGINE</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-sans m-0">
            PHISHING DETECTOR
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Analyze an email, message, or suspicious content for phishing indicators.
          </p>
        </div>

        {/* Quick Sample Loaders */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleLoadPhishingSample}
            className="px-3 py-1.5 rounded-lg bg-rose-950/50 hover:bg-rose-900/60 border border-rose-500/40 text-rose-300 text-xs font-mono transition-all flex items-center gap-1.5"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Load Phishing Sample</span>
          </button>

          <button
            onClick={handleLoadLegitimateSample}
            className="px-3 py-1.5 rounded-lg bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono transition-all flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Load Legitimate Sample</span>
          </button>
        </div>
      </div>

      {/* Tabs: Email Analyzer vs Message Analyzer */}
      <div className="flex items-center gap-3 border-b border-slate-800">
        <button
          onClick={() => { setActiveTab('email'); setAnalysisResult(null); }}
          className={`pb-3 px-4 text-xs font-mono font-bold tracking-wider uppercase border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'email'
              ? 'border-cyan-400 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>EMAIL ANALYZER</span>
        </button>

        <button
          onClick={() => { setActiveTab('message'); setAnalysisResult(null); }}
          className={`pb-3 px-4 text-xs font-mono font-bold tracking-wider uppercase border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'message'
              ? 'border-cyan-400 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>MESSAGE / SMS ANALYZER</span>
        </button>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form Inputs */}
        <div className="lg:col-span-7 space-y-5">
          <div className="p-6 rounded-xl glass-panel border border-slate-800 space-y-4">
            
            {activeTab === 'email' ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1 font-mono">
                      Sender Email (From):
                    </label>
                    <input
                      type="text"
                      value={sender}
                      onChange={(e) => setSender(e.target.value)}
                      placeholder="e.g. security-alert@example.com"
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-xs font-mono focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1 font-mono">
                      Subject Line:
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Urgent: Verify your account"
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-xs font-mono focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1 font-mono">
                    Email Message Body:
                  </label>
                  <textarea
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Paste raw email content here to inspect for urgency, threats, and credential traps..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-xs leading-relaxed font-sans focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1 font-mono">
                    Embedded Link / CTA URL (Optional):
                  </label>
                  <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="e.g. https://security-verify.example.com/login"
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-xs font-mono focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1 font-mono">
                    Sender Info / Phone / Handle:
                  </label>
                  <input
                    type="text"
                    value={msgSender}
                    onChange={(e) => setMsgSender(e.target.value)}
                    placeholder="e.g. +1 (800) 555-0199 or Unknown Telegram ID"
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-xs font-mono focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1 font-mono">
                    SMS / Chat Message Text:
                  </label>
                  <textarea
                    rows={6}
                    value={msgText}
                    onChange={(e) => setMsgText(e.target.value)}
                    placeholder="Paste SMS text, WhatsApp alert, or Discord DM..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-xs leading-relaxed font-sans focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </>
            )}

            {/* Error prompt if empty */}
            {errorMessage && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={handleResetForm}
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-mono transition-colors"
              >
                Clear Fields
              </button>

              <button
                onClick={handleRunAnalysis}
                disabled={isScanning}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(0,242,254,0.3)] flex items-center gap-2 disabled:opacity-50"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>SCANNING HEURISTICS...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>ANALYZE FOR PHISHING</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Right Column: Score Gauge & Scan Status */}
        <div className="lg:col-span-5 space-y-5">
          {analysisResult ? (
            <div className="space-y-4">
              <RiskScoreGauge score={analysisResult.riskScore} />

              <button
                onClick={() => setIsReportModalOpen(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-cyber-900 border border-cyan-500/40 hover:bg-cyan-950/40 text-cyan-300 text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>GENERATE SECURITY REPORT</span>
              </button>

              {/* Machine Learning Ready Feature Vector Panel */}
              {analysisResult.mlFeatureVector && (
                <div className="p-4 rounded-xl bg-cyber-950/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-slate-300 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                      <span>ML CLASSIFIER FEATURE VECTOR</span>
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/20">
                      PROBABILITY: {(analysisResult.mlFeatureVector.probabilistic_prediction * 100).toFixed(1)}%
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400 pt-1">
                    <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                      Urgency Tokens: <strong className="text-white">{analysisResult.mlFeatureVector.urgency_frequency}</strong>
                    </div>
                    <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                      Threat Score: <strong className="text-white">{analysisResult.mlFeatureVector.threat_language_score}</strong>
                    </div>
                    <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                      Credential Solicitation: <strong className={analysisResult.mlFeatureVector.credential_request_flag ? 'text-rose-400' : 'text-emerald-400'}>{analysisResult.mlFeatureVector.credential_request_flag ? 'TRUE' : 'FALSE'}</strong>
                    </div>
                    <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                      URL Risk Weight: <strong className="text-white">{analysisResult.mlFeatureVector.url_risk_weight}/100</strong>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 italic leading-tight pt-1">
                    Academic Note: These numerical features are designed to train supervised classifiers (Random Forest / Naive Bayes).
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 rounded-xl glass-panel border border-slate-800 text-center space-y-3 flex flex-col items-center justify-center min-h-[300px]">
              <div className="p-4 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Awaiting Inspection Target
              </h3>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Enter an email or message on the left and click "Analyze for Phishing" to compute the risk score and threat indicators.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Detection Results Breakdown */}
      {analysisResult && (
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2 m-0">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping inline-block" />
              <span>DETECTED THREAT INDICATORS ({analysisResult.indicators.length})</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              CLASSIFICATION: <strong className="text-white">{analysisResult.riskTier}</strong>
            </span>
          </div>

          {analysisResult.indicators.length === 0 ? (
            <div className="p-6 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold">Clear of High-Risk Indicators:</span> No strong psychological urgency, credential solicitation, or deceptive domains were detected in this message.
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
      )}

      {/* Report Modal */}
      <SecurityReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        reportData={analysisResult}
      />

    </div>
  );
}
