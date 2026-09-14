// Comprehensive Rule-Based Phishing Detection Engine & ML-Ready Feature Extractor
// Evaluates email headers, message intent, psychological coercion triggers, and embedded links.

import { analyzeUrl } from './urlAnalyzer.js';

// Suspicious trigger patterns categorized by psychological & technical vectors
const URGENCY_TRIGGERS = [
  'immediately', 'urgent', 'urgency', 'action required', 'within 24 hours',
  'within 12 hours', 'within 6 hours', 'within 3 hours', 'within 1 hour',
  'time-sensitive', 'deadline', 'expires today', 'final notice', 'asap',
  'prompt attention', 'instant verification', 'critical window'
];

const THREAT_TRIGGERS = [
  'suspend', 'suspension', 'terminated', 'restricted', 'locked',
  'permanent closure', 'legal action', 'law enforcement', 'frozen',
  'unauthorized access', 'flagged for unusual', 'breach', 'compromised',
  'penalty', 'security risk', 'delete all files'
];

const CREDENTIAL_TRIGGERS = [
  'password', 'passcode', 'pin number', 'credentials', 'otp',
  'one-time password', 'authentication code', '2fa token', 'security questions',
  'secret key', 'verify identity', 'confirm identity', 'log in to keep'
];

const FINANCIAL_TRIGGERS = [
  'wire transfer', 'bitcoin', 'crypto', 'unclaimed funds', 'lottery winner',
  'prize', 'giveaway', 'gift card', 'direct deposit', 'banking details',
  'refund', 'overdue invoice', 'debited', 'auto-renewal'
];

const SUSPICIOUS_CTA_TRIGGERS = [
  'click here', 'click below', 'verify now', 'confirm now',
  'claim now', 'update immediately', 'secure your account now',
  'activate upgrade', 'cancel transfer'
];

const FREE_EMAIL_PROVIDERS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com',
  'protonmail.com', 'zoho.com', 'mail.com', 'yandex.com'
];

export function analyzePhishing({ sender = '', subject = '', message = '', link = '', inputType = 'email' }) {
  if (!message.trim() && !subject.trim() && !link.trim() && !sender.trim()) {
    return { error: 'Please provide email content, message text, or a link to analyze.' };
  }

  const indicators = [];
  let riskScore = 0;
  const lowerMessage = (message + ' ' + subject).toLowerCase();
  const lowerSender = sender.toLowerCase();

  // 1. SENDER ANALYSIS (if provided)
  if (sender.trim()) {
    // Extract domain from sender email
    const emailMatch = sender.match(/<([^>]+)>/) || [null, sender];
    const actualEmail = (emailMatch[1] || sender).trim().toLowerCase();
    const domainMatch = actualEmail.match(/@([a-zA-Z0-9.-]+)/);
    const domain = domainMatch ? domainMatch[1] : '';

    // Check display name mismatch (e.g., "PayPal Security <hacker123@gmail.com>")
    const displayName = sender.includes('<') ? sender.split('<')[0].trim().toLowerCase() : '';
    const authoritativeNames = ['paypal', 'microsoft', 'google', 'apple', 'amazon', 'bank', 'security team', 'it support', 'netflix'];

    const matchedBrand = authoritativeNames.find(brand => displayName.includes(brand));
    if (matchedBrand) {
      if (domain && !domain.includes(matchedBrand.replace(/\s+/g, ''))) {
        riskScore += 25;
        indicators.push({
          id: 'sender_display_spoof',
          title: `Display Name & Domain Mismatch: "${displayName}"`,
          severity: 'critical',
          category: 'Identity Spoofing',
          whyItMatters: `The sender claims to represent "${matchedBrand}", but the actual underlying dispatch address is hosted on "@${domain}".`,
          recommendation: 'Verify the true sending address enclosed in angle brackets (<>), not just the friendly display name.'
        });
      }
    }

    // Check if free email provider is sending institutional/banking alerts
    const isFreeProvider = FREE_EMAIL_PROVIDERS.some(p => domain === p || domain.endsWith('.' + p));
    if (isFreeProvider && (lowerMessage.includes('bank') || lowerMessage.includes('security') || lowerMessage.includes('support') || lowerMessage.includes('invoice'))) {
      riskScore += 20;
      indicators.push({
        id: 'free_email_corporate_spoof',
        title: `Public Webmail Provider Used (@${domain})`,
        severity: 'high',
        category: 'Sender Legitimacy',
        whyItMatters: 'Legitimate institutions dispatch official notifications from their own enterprise domain, never from free public webmail services.',
        recommendation: 'Discard any corporate, banking, or administrative alert originating from a free email provider.'
      });
    }

    // Check for suspicious hyphenated sender domains
    if (domain && (domain.split('-').length > 2 || domain.endsWith('.xyz') || domain.endsWith('.top') || domain.endsWith('.click'))) {
      riskScore += 15;
      indicators.push({
        id: 'suspicious_sender_domain',
        title: `Suspicious Sender Domain Pattern (@${domain})`,
        severity: 'medium',
        category: 'Sender Infrastructure',
        whyItMatters: 'Attackers frequently register heavily hyphenated domains or low-reputation TLDs to mimic legitimate organizations.',
        recommendation: 'Check the domain registration whois and official website contact channels.'
      });
    }
  }

  // 2. PSYCHOLOGICAL COERCION & TEXT HEURISTICS

  // A. Urgency
  const foundUrgency = URGENCY_TRIGGERS.filter(term => lowerMessage.includes(term));
  if (foundUrgency.length > 0) {
    riskScore += Math.min(20, 10 + (foundUrgency.length * 4));
    indicators.push({
      id: 'urgency_detected',
      title: `Artificial Urgency / Time-Pressure Detected (${foundUrgency.slice(0, 3).join(', ')})`,
      severity: 'high',
      category: 'Social Engineering',
      whyItMatters: 'Attackers manufacture arbitrary time limits to induce panic, bypassing the victim\'s rational scrutiny before they can consult IT or verify independently.',
      recommendation: 'Pause and take a breath. Legitimate security issues are not resolved by rushed countdowns.'
    });
  }

  // B. Threatening & Coercive Language
  const foundThreats = THREAT_TRIGGERS.filter(term => lowerMessage.includes(term));
  if (foundThreats.length > 0) {
    riskScore += Math.min(25, 12 + (foundThreats.length * 4));
    indicators.push({
      id: 'threat_detected',
      title: `Threatening & Fear-Based Language Detected (${foundThreats.slice(0, 3).join(', ')})`,
      severity: 'high',
      category: 'Psychological Coercion',
      whyItMatters: 'Threatening account termination, legal sanctions, or data deletion is an established intimidation vector to compel compliance.',
      recommendation: 'Never accept claims of account suspension through email alone; check account status directly on the official app.'
    });
  }

  // C. Credential, Password, or OTP Requests
  const foundCredentials = CREDENTIAL_TRIGGERS.filter(term => lowerMessage.includes(term));
  if (foundCredentials.length > 0) {
    riskScore += 25;
    indicators.push({
      id: 'credential_request',
      title: `Direct Credential / Verification Solicitation (${foundCredentials.slice(0, 3).join(', ')})`,
      severity: 'critical',
      category: 'Harvesting Intent',
      whyItMatters: 'Phishing attacks exist primarily to acquire credentials, 2FA OTP tokens, or authentication secrets for unauthorized account takeover.',
      recommendation: 'Legitimate services never ask you to disclose your password or 2FA one-time code via email or external forms.'
    });
  }

  // D. Financial, Prize, or Wire Transfer Lures
  const foundFinancial = FINANCIAL_TRIGGERS.filter(term => lowerMessage.includes(term));
  if (foundFinancial.length > 0) {
    riskScore += Math.min(20, 10 + (foundFinancial.length * 5));
    indicators.push({
      id: 'financial_lure',
      title: `Financial or Reward Pretext (${foundFinancial.slice(0, 3).join(', ')})`,
      severity: 'medium',
      category: 'Lure Vector',
      whyItMatters: 'Unsolicited wire alerts, lottery notifications, or crypto giveaways trick victims with greed or shock.',
      recommendation: 'Be skeptical of unexpected windfall announcements or alarming unauthorized payment notifications.'
    });
  }

  // E. Impersonal Greetings
  const impersonalGreetings = ['dear customer', 'dear user', 'dear account holder', 'attention employee', 'dear member', 'hello candidate'];
  if (impersonalGreetings.some(g => lowerMessage.includes(g))) {
    riskScore += 8;
    indicators.push({
      id: 'generic_greeting',
      title: 'Generic Impersonal Greeting',
      severity: 'low',
      category: 'Mass Phishing Indicator',
      whyItMatters: 'Bulk phishing campaigns are dispatched to millions of random addresses and cannot address victims by their actual full names.',
      recommendation: 'Official organizations that hold your account generally address you by your formal registered name.'
    });
  }

  // F. Suspicious Call-to-Action phrases
  const foundCta = SUSPICIOUS_CTA_TRIGGERS.filter(term => lowerMessage.includes(term));
  if (foundCta.length > 0) {
    riskScore += 10;
    indicators.push({
      id: 'suspicious_cta',
      title: `High-Urgency Call-To-Action Link (${foundCta.slice(0, 2).join(', ')})`,
      severity: 'medium',
      category: 'Call To Action',
      whyItMatters: 'Buttons compelling users to "verify now" or "update immediately" funnel the victim into the attacker\'s controlled credential capture server.',
      recommendation: 'Do not click buttons in suspicious messages. Hover to preview where the hyperlink truly points.'
    });
  }

  // 3. EMBEDDED URL ANALYSIS (if provided or extracted from text)
  let extractedUrl = link.trim();
  if (!extractedUrl) {
    // Attempt to extract first URL in message body
    const urlRegex = /(https?:\/\/[^\s"'<>]+)/i;
    const match = message.match(urlRegex);
    if (match) {
      extractedUrl = match[1];
    }
  }

  let urlAnalysisResult = null;
  if (extractedUrl) {
    urlAnalysisResult = analyzeUrl(extractedUrl);
    if (!urlAnalysisResult.error) {
      // Blend URL indicators and score
      riskScore += Math.round(urlAnalysisResult.riskScore * 0.45);
      // Merge unique indicators
      urlAnalysisResult.indicators.forEach(urlInd => {
        indicators.push({
          ...urlInd,
          title: `[URL] ${urlInd.title}`
        });
      });
    }
  }

  // Normalize final score between 0 and 100
  const finalScore = Math.min(100, Math.max(0, riskScore));

  let riskTier = 'LOW RISK';
  let riskColor = 'emerald';
  if (finalScore >= 60) {
    riskTier = 'HIGH RISK';
    riskColor = 'red';
  } else if (finalScore >= 30) {
    riskTier = 'MEDIUM RISK';
    riskColor = 'amber';
  }

  // 4. ML-READY FEATURE VECTOR FOR ACADEMIC CCS DEMONSTRATION
  // Encodes numerical features that can be fed directly to a Random Forest or SVM classifier
  const mlFeatureVector = {
    urgency_frequency: foundUrgency.length,
    threat_language_score: foundThreats.length,
    credential_request_flag: foundCredentials.length > 0 ? 1 : 0,
    financial_lure_frequency: foundFinancial.length,
    cta_intensity: foundCta.length,
    sender_domain_suspicious: lowerSender.includes('-') || lowerSender.includes('.xyz') ? 1 : 0,
    has_url: extractedUrl ? 1 : 0,
    url_risk_weight: urlAnalysisResult ? urlAnalysisResult.riskScore : 0,
    text_length: (message + subject).length,
    // Heuristic probabilistic classification (0.0 to 1.0)
    probabilistic_prediction: ((finalScore / 100) * 0.94 + 0.03).toFixed(3)
  };

  return {
    inputType,
    sender,
    subject,
    messageSnippet: message.slice(0, 160) + (message.length > 160 ? '...' : ''),
    extractedUrl,
    urlAnalysisResult,
    riskScore: finalScore,
    riskTier,
    riskColor,
    indicators,
    mlFeatureVector,
    timestamp: new Date().toISOString()
  };
}
