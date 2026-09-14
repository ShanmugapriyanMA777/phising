// Sanitized Activity History Manager
// STRICT COMPLIANCE: NEVER stores credentials, passwords, OTPs, or raw confidential input.
// Only stores high-level audit metadata (timestamp, type, sanitized snippet, score, tier).

const STORAGE_KEY = 'phishguard_audit_history_v1';

// Initial pre-populated academic demonstration logs
const INITIAL_DEMO_LOGS = [
  {
    id: 'AUDIT-8921-X1',
    date: '14 Sep 2026, 09:15 AM',
    type: 'Email',
    target: 'Urgent: Verify Your Account To Prevent Restriction',
    riskScore: 88,
    riskTier: 'HIGH RISK',
    indicatorsCount: 5
  },
  {
    id: 'AUDIT-8920-X2',
    date: '14 Sep 2026, 08:32 AM',
    type: 'URL',
    target: 'https://security-verify.socialconnect-portal.example.com/login',
    riskScore: 82,
    riskTier: 'HIGH RISK',
    indicatorsCount: 4
  },
  {
    id: 'AUDIT-8919-X3',
    date: '13 Sep 2026, 04:40 PM',
    type: 'Message',
    target: 'Scheduled system maintenance on Sunday at 02:00 UTC.',
    riskScore: 12,
    riskTier: 'LOW RISK',
    indicatorsCount: 0
  },
  {
    id: 'AUDIT-8918-X4',
    date: '13 Sep 2026, 01:20 PM',
    type: 'URL',
    target: 'https://github.com/torvalds/linux',
    riskScore: 5,
    riskTier: 'LOW RISK',
    indicatorsCount: 0
  }
];

export function getHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_LOGS));
      return INITIAL_DEMO_LOGS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load history:', err);
    return INITIAL_DEMO_LOGS;
  }
}

export function saveHistoryItem({ type, target, riskScore, riskTier, indicatorsCount }) {
  try {
    const current = getHistory();
    const newItem = {
      id: `AUDIT-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString(36).toUpperCase().slice(-3)}`,
      date: new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }).format(new Date()),
      type: type || 'Analysis',
      // Store sanitized snippet only (max 60 chars), NEVER passwords
      target: (target || 'Simulated analysis').slice(0, 60),
      riskScore: typeof riskScore === 'number' ? riskScore : 0,
      riskTier: riskTier || 'UNKNOWN',
      indicatorsCount: indicatorsCount || 0
    };

    const updated = [newItem, ...current.slice(0, 49)]; // keep max 50
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newItem;
  } catch (err) {
    console.error('Failed to save history item:', err);
    return null;
  }
}

export function clearHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear history:', err);
  }
}
