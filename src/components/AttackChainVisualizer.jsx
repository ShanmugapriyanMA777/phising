import React, { useState } from 'react';
import { 
  Skull, 
  Mail, 
  BrainCircuit, 
  Link2, 
  LogIn, 
  KeyRound, 
  AlertOctagon, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

const ATTACK_STAGES = [
  {
    id: 'attacker',
    label: 'ATTACKER',
    sub: 'Threat Actor',
    icon: Skull,
    color: 'text-rose-400',
    border: 'border-rose-500/40',
    bg: 'bg-rose-950/30',
    description: 'An adversary identifies targets, registers disposable or lookalike domains, sets up cloned infrastructure, and crafts deceptive email templates.',
    mitigation: 'Threat intelligence feeds, domain blocklists, and perimeter spam gateways.'
  },
  {
    id: 'email',
    label: 'FAKE EMAIL',
    sub: 'Initial Delivery',
    icon: Mail,
    color: 'text-amber-400',
    border: 'border-amber-500/40',
    bg: 'bg-amber-950/30',
    description: 'The attacker dispatches deceptive correspondence disguised as an authoritative entity (bank, social network, IT support) with spoofed headers.',
    mitigation: 'Strict SPF (Sender Policy Framework), DKIM, and DMARC enforcement on incoming mail servers.'
  },
  {
    id: 'social',
    label: 'SOCIAL ENGINEERING',
    sub: 'Psychological Hook',
    icon: BrainCircuit,
    color: 'text-purple-400',
    border: 'border-purple-500/40',
    bg: 'bg-purple-950/30',
    description: 'The message weaponizes psychological coercion—manufacturing urgent deadlines, fear of account suspension, or financial greed—to bypass critical scrutiny.',
    mitigation: 'Security awareness training and recognizing urgency triggers before reacting.'
  },
  {
    id: 'link',
    label: 'SUSPICIOUS LINK',
    sub: 'Deceptive Transport',
    icon: Link2,
    color: 'text-cyan-400',
    border: 'border-cyan-500/40',
    bg: 'bg-cyan-950/30',
    description: 'A hyperlink in the message redirects the victim to an attacker-controlled server using typosquatting (paypa1.com) or nested subdomains.',
    mitigation: 'Inspect true domain in browser URL bar, avoid clicking unsolicited links, and use DNS URL reputation filtering.'
  },
  {
    id: 'fake_login',
    label: 'FAKE LOGIN PAGE',
    sub: 'Cloned Interface',
    icon: LogIn,
    color: 'text-orange-400',
    border: 'border-orange-500/40',
    bg: 'bg-orange-950/30',
    description: 'The victim is presented with a convincing lookalike login portal (e.g. SocialConnect) mimicking the authentic brand.',
    mitigation: 'Password managers (which refuse to autofill on mismatched domains) and WebAuthn / FIDO2 security keys.'
  },
  {
    id: 'credential_request',
    label: 'CREDENTIAL HARVEST',
    sub: 'Data Exfiltration',
    icon: KeyRound,
    color: 'text-pink-400',
    border: 'border-pink-500/40',
    bg: 'bg-pink-950/30',
    description: 'The fake form prompts for usernames, passwords, OTPs, or credit cards, sending entered plaintext directly to the adversary\'s database.',
    mitigation: 'Multi-Factor Authentication (MFA) with number-matching or hardware tokens to invalidate static stolen passwords.'
  },
  {
    id: 'victim',
    label: 'USER DATA AT RISK',
    sub: 'Account Takeover',
    icon: AlertOctagon,
    color: 'text-red-500',
    border: 'border-red-500/60',
    bg: 'bg-red-950/40',
    description: 'The attacker conducts unauthorized account takeover, steals sensitive files, drains funds, or moves laterally across corporate networks.',
    mitigation: 'Rapid incident response, immediate credential revocation, active session invalidation, and privileged access monitoring.'
  }
];

export default function AttackChainVisualizer() {
  const [selectedStage, setSelectedStage] = useState(ATTACK_STAGES[0]);

  return (
    <div className="p-6 rounded-xl glass-panel relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h3 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
            <Skull className="w-4 h-4 text-rose-400" />
            <span>Phishing Attack Kill-Chain Anatomy</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Click or hover any stage in the sequence to inspect the attack mechanics and defensive controls.
          </p>
        </div>
        <span className="text-[10px] font-mono text-cyan-400 px-2 py-1 rounded bg-cyan-950/40 border border-cyan-500/30 self-start sm:self-auto">
          INTERACTIVE KILL CHAIN
        </span>
      </div>

      {/* Chain Progression Nodes */}
      <div className="flex items-center justify-between overflow-x-auto pb-4 pt-2 gap-2 scrollbar-thin">
        {ATTACK_STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isSelected = selectedStage.id === stage.id;
          return (
            <React.Fragment key={stage.id}>
              <button
                onClick={() => setSelectedStage(stage)}
                onMouseEnter={() => setSelectedStage(stage)}
                className={`flex flex-col items-center min-w-[110px] p-3 rounded-lg border transition-all duration-200 text-center ${
                  isSelected
                    ? `${stage.bg} ${stage.border} shadow-[0_0_15px_rgba(0,242,254,0.2)] scale-105`
                    : 'bg-cyber-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className={`p-2 rounded-full mb-1.5 ${stage.bg} ${stage.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-white font-mono tracking-tight leading-tight">
                  {stage.label}
                </span>
                <span className="text-[9px] text-slate-400 mt-0.5">
                  {stage.sub}
                </span>
              </button>

              {idx < ATTACK_STAGES.length - 1 && (
                <ChevronRight className="w-4 h-4 text-slate-600 shrink-0 hidden sm:block" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Detailed Selected Stage Breakdown */}
      <div className="mt-4 p-4 rounded-lg bg-cyber-950/90 border border-slate-800 transition-all">
        <div className="flex items-start gap-3">
          <div className={`p-2.5 rounded-lg ${selectedStage.bg} ${selectedStage.color} border ${selectedStage.border} shrink-0`}>
            <selectedStage.icon className="w-5 h-5" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-400">STAGE OBJECTIVE:</span>
                <span className="text-sm font-bold text-white tracking-wide font-mono">
                  {selectedStage.label} ({selectedStage.sub})
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedStage.description}
            </p>

            <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-semibold text-emerald-400 font-mono text-[11px]">
                  DEFENSIVE MITIGATION:
                </span>{' '}
                <span className="text-slate-300">{selectedStage.mitigation}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
