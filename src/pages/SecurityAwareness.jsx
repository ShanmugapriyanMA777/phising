import React, { useState } from 'react';
import { 
  Award, 
  ShieldCheck, 
  Mail, 
  Globe, 
  Clock, 
  Key, 
  Lock, 
  Smartphone, 
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  RotateCcw,
  Sparkles
} from 'lucide-react';

const DEFENSE_PILLARS = [
  {
    num: '01',
    title: 'Check the Sender Address',
    icon: Mail,
    color: 'text-cyan-400',
    border: 'border-cyan-500/30',
    coreRule: 'Look carefully at the actual email address, not just the display name.',
    detail: 'Attackers frequently set the display name to "PayPal Customer Support" while the underlying dispatch address is "billing992@gmail.com". Always expand and check the domain after the @ sign.'
  },
  {
    num: '02',
    title: 'Inspect the URL Before Clicking',
    icon: Globe,
    color: 'text-amber-400',
    border: 'border-amber-500/30',
    coreRule: 'Check the real domain right before the first slash before entering credentials.',
    detail: 'Deceptive links often use lookalike domains (paypa1.com), nested subdomains (paypal.com.verify-login.xyz), or direct IP addresses (192.168.1.1). Hover over links to preview destination targets.'
  },
  {
    num: '03',
    title: "Don't Trust Artificial Urgency",
    icon: Clock,
    color: 'text-rose-400',
    border: 'border-rose-500/30',
    coreRule: 'Attackers manufacture panic to bypass critical reasoning.',
    detail: 'Phrases like "Account suspended in 2 hours", "Immediate verification required", or "Final warning" are designed to create hasty mistakes. Legitimate security issues are not settled by rushed countdowns.'
  },
  {
    num: '04',
    title: 'Never Share One-Time Passwords (OTPs)',
    icon: Key,
    color: 'text-purple-400',
    border: 'border-purple-500/30',
    coreRule: 'Legitimate organizations never ask you to disclose authentication codes.',
    detail: 'OTPs sent to your phone or authenticator app are intended exclusively for you to enter into the official login screen. Any email, phone agent, or form soliciting your OTP is an active attack.'
  },
  {
    num: '05',
    title: "Don't Reuse Passwords Across Accounts",
    icon: Lock,
    color: 'text-blue-400',
    border: 'border-blue-500/30',
    coreRule: 'Use unique passwords for each service to contain credential stuffing.',
    detail: 'If a phishing attack or data breach exposes your password on one platform, attackers automatically test that same password on your email, banking, and social accounts.'
  },
  {
    num: '06',
    title: 'Enable Multi-Factor Authentication (MFA)',
    icon: Smartphone,
    color: 'text-emerald-400',
    border: 'border-emerald-500/30',
    coreRule: 'Multi-factor authentication adds a vital layer of defense.',
    detail: 'Even if an attacker tricks you into surrendering your password, phishing-resistant MFA (such as FIDO2/WebAuthn hardware keys or authenticator push matching) stops unauthorized entry.'
  },
  {
    num: '07',
    title: 'Verify Independently Via Official Channels',
    icon: ShieldCheck,
    color: 'text-teal-400',
    border: 'border-teal-500/30',
    coreRule: 'Use the official website or app instead of clicking suspicious links.',
    detail: 'If you receive an alarming notification regarding your bank or student account, close the message and independently type the institution\'s known URL into your browser or call their official helpline.'
  }
];

const QUIZ_QUESTIONS = [
  {
    question: 'You receive an email from "Bank of America <security@bank-protection-alert.xyz>" saying your account is frozen. What is the biggest red flag?',
    options: [
      'The email was received on a weekday',
      'The sender domain (.xyz) does not match the official bank domain (bankofamerica.com)',
      'The email mentions account security',
      'The font is too modern'
    ],
    correct: 1,
    explanation: 'Legitimate institutions only send correspondence from their own apex domain, never from cheap third-party TLDs like .xyz.'
  },
  {
    question: 'A website URL reads: "https://google.com.account-verification.login-auth.net/signin". Who owns this domain?',
    options: [
      'Google LLC',
      'login-auth.net',
      'account-verification.com',
      'Both Google and login-auth.net'
    ],
    correct: 1,
    explanation: 'The real owner of a domain is determined by the apex domain immediately before the first single slash ("/"), which here is "login-auth.net". The word "google.com" is merely a deceptive subdomain.'
  },
  {
    question: 'Why do phishing attackers emphasize that you must act "within 2 hours" to prevent account deletion?',
    options: [
      'To test how quickly servers respond',
      'Because security certificates expire in 2 hours',
      'To induce panic so you act quickly without verifying the link',
      'To comply with cybersecurity data privacy regulations'
    ],
    correct: 2,
    explanation: 'Artificial urgency is a psychological coercion technique designed to short-circuit the victim\'s rational judgment before they can verify the claim.'
  }
];

export default function SecurityAwareness() {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleSelectOption = (idx) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    setShowExplanation(true);
    if (idx === QUIZ_QUESTIONS[currentQuizIndex].correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowExplanation(false);
    setQuizFinished(false);
  };

  return (
    <div className="space-y-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-2">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>DEFENSIVE PROTOCOLS</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-sans m-0">
            HOW TO IDENTIFY PHISHING
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Master the 7 foundational pillars of email and credential defense to prevent social engineering compromise.
          </p>
        </div>
      </div>

      {/* 7 Defense Pillars Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2 m-0">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>THE 7 CYBERSECURITY DEFENSE PILLARS</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DEFENSE_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={pillar.num}
                className="p-6 rounded-xl glass-panel border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-mono font-black text-slate-500">
                      {pillar.num}
                    </span>
                    <div className={`p-2 rounded-lg bg-cyber-950 border border-slate-800 ${pillar.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white tracking-wide mb-1 font-sans">
                    {pillar.title}
                  </h3>

                  <p className="text-xs font-semibold text-cyan-300 font-mono mb-2">
                    "{pillar.coreRule}"
                  </p>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {pillar.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Phishing IQ Quiz */}
      <div className="p-8 rounded-2xl glass-panel-glow border border-cyan-500/30 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2 m-0">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>INTERACTIVE PHISHING IQ CHALLENGE</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Test your ability to spot real-world social engineering cues and deceptive domains.
            </p>
          </div>

          {!quizFinished && (
            <span className="text-xs font-mono text-cyan-400 px-3 py-1 rounded bg-cyan-950/80 border border-cyan-500/30">
              Question {currentQuizIndex + 1} of {QUIZ_QUESTIONS.length}
            </span>
          )}
        </div>

        {!quizFinished ? (
          <div className="space-y-6 max-w-2xl">
            <h3 className="text-base font-medium text-white leading-relaxed">
              {QUIZ_QUESTIONS[currentQuizIndex].question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {QUIZ_QUESTIONS[currentQuizIndex].options.map((opt, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === QUIZ_QUESTIONS[currentQuizIndex].correct;
                let optionStyle = 'bg-cyber-950/80 border-slate-800 hover:border-cyan-500/40 text-slate-200';

                if (selectedAnswer !== null) {
                  if (isCorrect) {
                    optionStyle = 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200';
                  } else if (isSelected) {
                    optionStyle = 'bg-rose-950/40 border-rose-500/60 text-rose-200';
                  } else {
                    optionStyle = 'bg-cyber-950/40 border-slate-800 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={selectedAnswer !== null}
                    className={`w-full p-4 rounded-xl border text-left text-xs transition-all flex items-center justify-between gap-3 ${optionStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedAnswer !== null && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                    {selectedAnswer !== null && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation & Next */}
            {showExplanation && (
              <div className="p-4 rounded-xl bg-cyber-900 border border-slate-800 space-y-3">
                <div className="text-xs">
                  <span className="font-bold text-cyan-400 font-mono">Explanation: </span>
                  <span className="text-slate-300">{QUIZ_QUESTIONS[currentQuizIndex].explanation}</span>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2 rounded-lg bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 transition-colors shadow-md font-mono"
                  >
                    {currentQuizIndex + 1 < QUIZ_QUESTIONS.length ? 'Next Question →' : 'View Results'}
                  </button>
                </div>
              </div>
            )}

          </div>
        ) : (
          /* Quiz Finished Score Screen */
          <div className="p-8 text-center space-y-4 max-w-md mx-auto">
            <div className="inline-flex p-4 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Award className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-bold text-white font-mono">
              Challenge Complete!
            </h3>

            <p className="text-sm text-slate-300">
              You scored <strong className="text-cyan-400 font-mono text-xl">{score}</strong> out of{' '}
              <strong className="text-white font-mono">{QUIZ_QUESTIONS.length}</strong>.
            </p>

            <p className="text-xs text-slate-400">
              {score === QUIZ_QUESTIONS.length
                ? 'Outstanding! You demonstrated sharp cybersecurity reflexes and domain awareness.'
                : 'Good effort! Review the 7 defense pillars above to sharpen your detection instincts.'}
            </p>

            <button
              onClick={handleResetQuiz}
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-xs tracking-wider uppercase font-mono flex items-center justify-center gap-2 mx-auto"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Challenge</span>
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
