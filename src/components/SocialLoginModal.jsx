import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Lock, 
  Eye, 
  EyeOff, 
  ExternalLink, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle,
  X,
  Radio,
  Globe,
  ChevronLeft,
  Heart,
  Sparkles,
  Camera,
  Share2,
  Users
} from 'lucide-react';

export default function SocialLoginModal({ 
  isOpen, 
  onClose, 
  simulatedUrl = 'https://security-verify.socialconnect-portal.example.com/account/verify',
  scenario,
  onAnalyzeAttack,
  onGoToAwareness
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  if (!isOpen) return null;

  // STRICT CREDENTIAL SAFETY REQUIREMENT:
  // Discard all values immediately from memory without transmitting, saving, logging, or persisting.
  const handleSimulatedSubmit = (e) => {
    e.preventDefault();
    
    // Purge input values instantly
    setUsername('');
    setPassword('');

    // Switch view to Phishing Encountered Reveal screen
    setHasSubmitted(true);
  };

  const handleReset = () => {
    setUsername('');
    setPassword('');
    setHasSubmitted(false);
    onClose();
  };

  const handleAnalyzeClick = () => {
    handleReset();
    if (onAnalyzeAttack && scenario) {
      onAnalyzeAttack(scenario);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className={`relative w-full ${hasSubmitted ? 'max-w-2xl' : 'max-w-4xl'} my-4 bg-[#090d16] border border-cyan-500/30 rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-300`}>
        
        {/* Mock Browser Window Chrome Header */}
        <div className="bg-[#05070c] px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="text-[11px] font-mono text-slate-400 ml-2 hidden sm:inline">
              Simulated Browser Window
            </span>
          </div>

          <button 
            onClick={handleReset}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mock Address Bar */}
        <div className="bg-[#070a12] px-4 py-2 border-b border-slate-800/80 flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 bg-[#0c111d] px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs font-mono">
            <Globe className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="text-rose-300 font-bold truncate">{simulatedUrl}</span>
            <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 shrink-0">
              UNTRUSTED DOMAIN
            </span>
          </div>
        </div>

        {/* Educational Safety Banner */}
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex items-center justify-between text-[11px] text-amber-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-mono font-bold tracking-wider uppercase">
              CYBERSECURITY TRAINING SIMULATION
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            Zero-storage trap active
          </span>
        </div>

        {/* Content Area */}
        <div className="p-0">
          {!hasSubmitted ? (
            /* STEP A: SPLIT SCREEN SOCIAL MEDIA LOGIN (Instagram / Modern Social Pattern) */
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[520px]">
              
              {/* LEFT COLUMN: HERO ILLUSTRATION & CLOSE FRIENDS BRANDING */}
              <div className="md:col-span-6 bg-[#04060b] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-slate-800/80">
                
                {/* Ambient glow */}
                <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-gradient-to-br from-pink-600/10 via-purple-600/10 to-orange-500/10 blur-3xl pointer-events-none" />
                
                {/* Brand Logo & Header */}
                <div className="relative z-10 space-y-6">
                  {/* Sunset Gradient Camera/Radio Logo */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 p-0.5 shadow-xl inline-flex items-center justify-center">
                    <div className="w-full h-full bg-[#050811] rounded-[14px] flex items-center justify-center">
                      <Camera className="w-7 h-7 text-pink-400" />
                    </div>
                  </div>

                  {/* Slogan */}
                  <div className="space-y-1 max-w-sm">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight font-sans">
                      See everyday moments from your{' '}
                      <span className="bg-gradient-to-r from-rose-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">
                        close friends.
                      </span>
                    </h2>
                    <p className="text-xs text-slate-400 leading-relaxed pt-1">
                      Connect with the people who matter most and discover real stories in real time.
                    </p>
                  </div>
                </div>

                {/* Visual Graphic: Overlapping Stories Cards & Reaction Badges */}
                <div className="relative z-10 my-8 flex items-center justify-center">
                  <div className="relative w-64 h-52">
                    
                    {/* Background Story Card (Left tilted) */}
                    <div className="absolute -left-2 top-4 w-36 h-48 rounded-2xl bg-gradient-to-b from-purple-900/60 to-slate-900/90 border border-purple-500/30 shadow-2xl -rotate-6 transform transition-transform hover:rotate-0 duration-300 p-2 flex flex-col justify-between overflow-hidden">
                      <div className="h-28 rounded-xl bg-gradient-to-tr from-purple-800 via-pink-700 to-indigo-900 flex items-center justify-center relative">
                        <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-sm">
                          ✨
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-1">
                        <span className="w-16 h-2 rounded-full bg-slate-700/80 inline-block" />
                        <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
                      </div>
                    </div>

                    {/* Foreground Main Story Card */}
                    <div className="absolute left-14 top-0 w-40 h-52 rounded-2xl bg-[#0e1424] border border-pink-500/40 shadow-2xl p-2.5 flex flex-col justify-between transform transition-transform hover:scale-105 duration-300 z-10">
                      <div className="h-32 rounded-xl bg-gradient-to-br from-rose-500 via-purple-600 to-cyan-600 flex items-center justify-center relative overflow-hidden">
                        {/* Mock photo content */}
                        <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200/20 via-pink-500/30 to-purple-900/90 flex flex-col items-center justify-center text-white">
                          <Users className="w-7 h-7 text-white/80 mb-1" />
                          <span className="text-[10px] font-bold text-white/90">@alex & @sam</span>
                        </div>

                        {/* Top floating reaction pill */}
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-[9px] text-white flex items-center gap-1">
                          <span>😍</span>
                          <span>🤩</span>
                          <span>💖</span>
                        </div>
                      </div>

                      {/* Story Footer with input pill & like */}
                      <div className="flex items-center gap-2 pt-1">
                        <div className="flex-1 h-5 rounded-full bg-slate-800/90 border border-slate-700 px-2 flex items-center text-[8px] text-slate-400">
                          Send reaction...
                        </div>
                        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      </div>
                    </div>

                    {/* Right floating badge */}
                    <div className="absolute right-0 top-12 w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 p-0.5 shadow-lg z-20 flex items-center justify-center">
                      <div className="w-full h-full bg-[#090d16] rounded-full flex items-center justify-center text-xs">
                        ⭐
                      </div>
                    </div>

                    {/* Bottom floating heart badge */}
                    <div className="absolute left-6 bottom-2 w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 p-0.5 shadow-lg z-20 flex items-center justify-center">
                      <div className="w-full h-full bg-[#090d16] rounded-full flex items-center justify-center">
                        <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                      </div>
                    </div>

                  </div>
                </div>

                {/* Footer Brand Label */}
                <div className="relative z-10 text-[11px] text-slate-400 flex items-center gap-2 font-mono">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>SocialConnect Interactive Portal</span>
                </div>
              </div>

              {/* RIGHT COLUMN: MODERN SLEEK LOGIN FORM */}
              <div className="md:col-span-6 p-8 md:p-12 flex flex-col justify-center space-y-6 bg-[#090d16]">
                
                {/* Header with back chevron */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="p-1 -ml-1 text-slate-400 hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Log in to SocialConnect
                  </h3>
                </div>

                {/* The Form */}
                <form onSubmit={handleSimulatedSubmit} className="space-y-4">
                  
                  {/* Username input */}
                  <div>
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Mobile number, username or email address"
                      className="w-full px-4 py-3 rounded-xl bg-[#0f1422] border border-slate-700/80 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                    />
                  </div>

                  {/* Password input */}
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full px-4 py-3 pr-10 rounded-xl bg-[#0f1422] border border-slate-700/80 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-slate-400" />}
                    </button>
                  </div>

                  {/* Primary Log In Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-xl bg-[#0084f4] hover:bg-[#0073d6] text-white font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,132,244,0.3)]"
                    >
                      Log in
                    </button>
                  </div>
                </form>

                {/* Forgotten Password Link */}
                <div className="text-center">
                  <span className="text-xs text-slate-300 hover:text-white cursor-pointer transition-colors font-sans">
                    Forgotten password?
                  </span>
                </div>

                {/* Social Login Divider */}
                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-800" />
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase">
                    <span className="bg-[#090d16] px-3 text-slate-500 font-mono">OR</span>
                  </div>
                </div>

                {/* Secondary Button: Log in with Social ID */}
                <button
                  type="button"
                  onClick={handleSimulatedSubmit}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#111728] hover:bg-[#161e33] border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <span className="w-4 h-4 rounded-full bg-[#1877f2] text-white flex items-center justify-center text-[10px] font-bold">
                    f
                  </span>
                  <span>Log in with Facebook</span>
                </button>

                {/* Create New Account Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleSimulatedSubmit}
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-700 text-cyan-400 hover:text-cyan-300 hover:bg-slate-800/40 text-xs font-bold transition-all text-center"
                  >
                    Create new account
                  </button>
                </div>

                {/* Safety Trap Reminder */}
                <div className="text-center text-[10px] text-slate-400 font-mono pt-1">
                  🔒 Educational trap active. All entered characters are wiped immediately on submit.
                </div>

              </div>

            </div>
          ) : (
            /* STEP B: THE DRAMATIC EDUCATIONAL PHISHING REVEAL SCREEN */
            <div className="p-8 md:p-10 space-y-6">
              
              <div className="p-5 rounded-xl bg-rose-500/10 border border-rose-500/40 text-center space-y-2 shadow-[0_0_30px_rgba(244,63,94,0.15)]">
                <div className="inline-flex p-3.5 rounded-full bg-rose-500/20 text-rose-400 mb-1 border border-rose-500/30">
                  <ShieldAlert className="w-12 h-12 animate-bounce" />
                </div>
                <h3 className="text-2xl font-extrabold text-white tracking-tight">
                  🛡️ YOU JUST ENCOUNTERED A PHISHING SIMULATION
                </h3>
                <p className="text-xs text-rose-200/90 max-w-md mx-auto leading-relaxed">
                  You entered information into a simulated untrusted login page! In a real attack, your credentials would have been captured by threat actors.
                </p>
                <div className="inline-block text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full mt-1">
                  ✓ SENSITIVE DATA DISCARDED SAFELY FROM MEMORY
                </div>
              </div>

              {/* Red Flags Enumeration */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>CRITICAL RED FLAGS YOU ENCOUNTERED</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-[#05070c] border border-rose-500/20 flex items-start gap-2.5">
                    <span className="text-rose-400 font-bold">🔴</span>
                    <div>
                      <span className="font-semibold text-white">Unexpected login request</span>
                      <p className="text-[11px] text-slate-400 mt-0.5">Unsolicited prompt asking to sign in via an external link.</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#05070c] border border-rose-500/20 flex items-start gap-2.5">
                    <span className="text-rose-400 font-bold">🔴</span>
                    <div>
                      <span className="font-semibold text-white">Manufactured Urgency</span>
                      <p className="text-[11px] text-slate-400 mt-0.5">Short deadlines inducing psychological panic.</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#05070c] border border-rose-500/20 flex items-start gap-2.5">
                    <span className="text-rose-400 font-bold">🔴</span>
                    <div>
                      <span className="font-semibold text-white">Suspicious Sender</span>
                      <p className="text-[11px] text-slate-400 mt-0.5">Mismatched or newly registered sender domain.</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#05070c] border border-rose-500/20 flex items-start gap-2.5">
                    <span className="text-rose-400 font-bold">🔴</span>
                    <div>
                      <span className="font-semibold text-white">Untrusted Domain</span>
                      <p className="text-[11px] text-slate-400 mt-0.5">Address bar points to third-party lookalike site.</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#05070c] border border-rose-500/20 flex items-start gap-2.5">
                    <span className="text-rose-400 font-bold">🔴</span>
                    <div>
                      <span className="font-semibold text-white">Credential Request</span>
                      <p className="text-[11px] text-slate-400 mt-0.5">Demanded username & password directly on arrival.</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#05070c] border border-rose-500/20 flex items-start gap-2.5">
                    <span className="text-rose-400 font-bold">🔴</span>
                    <div>
                      <span className="font-semibold text-white">Link-Based Verification</span>
                      <p className="text-[11px] text-slate-400 mt-0.5">Bypassed authentic app navigation via embedded link.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors font-mono"
                >
                  Close Simulation
                </button>

                <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                  {onGoToAwareness && (
                    <button
                      onClick={() => {
                        handleReset();
                        onGoToAwareness();
                      }}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs tracking-wider flex items-center justify-center gap-1.5 transition-all font-mono"
                    >
                      <span>LEARN AWARENESS PILLARS</span>
                    </button>
                  )}

                  <button
                    onClick={handleAnalyzeClick}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,242,254,0.4)] font-mono"
                  >
                    <span>ANALYZE THIS ATTACK</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
