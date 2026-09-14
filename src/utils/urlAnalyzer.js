// Comprehensive URL Phishing & Threat Analyzer Engine
// Evaluates anatomical risk factors, typosquatting, deceptive patterns, and IP-host indicators.

// Known targeted brands for lookalike / typosquatting detection
const TARGET_BRANDS = [
  'paypal', 'microsoft', 'apple', 'google', 'instagram', 'facebook',
  'netflix', 'amazon', 'chase', 'wellsfargo', 'binance', 'coinbase',
  'twitter', 'github', 'linkedin', 'outlook', 'office365', 'dropbox',
  'bankofamerica', 'citibank', 'socialconnect', 'steam', 'adobe'
];

// High-risk or frequently abused Top-Level Domains (TLDs)
const SUSPICIOUS_TLDS = [
  '.xyz', '.top', '.click', '.buzz', '.cfd', '.rest', '.gq', '.tk',
  '.ml', '.ga', '.work', '.icu', '.cam', '.sbs', '.country', '.kim'
];

// Critical credential harvesting / lure keywords
const SUSPICIOUS_KEYWORDS = [
  'login', 'signin', 'sign-in', 'verify', 'verification', 'security',
  'account', 'update', 'auth', 'authentication', 'password', 'banking',
  'secure', 'confirm', 'confirmation', 'wallet', 'token', 'recover',
  'portal', 'billing', 'invoice', 'unlock', 'support', 'validate'
];

// Helper: Levenshtein distance for typosquatting detection
function levenshteinDistance(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

// Check if string is an IPv4 or IPv6 address
function isIpAddress(hostname) {
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  return ipv4Regex.test(hostname) || ipv6Regex.test(hostname);
}

export function analyzeUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string' || !rawUrl.trim()) {
    return { error: 'Please enter a URL to analyze.' };
  }

  let formattedUrl = rawUrl.trim();
  if (!/^https?:\/\//i.test(formattedUrl)) {
    // If protocol missing, assume http for conservative risk assessment
    formattedUrl = 'http://' + formattedUrl;
  }

  let parsed;
  try {
    parsed = new URL(formattedUrl);
  } catch (err) {
    return { error: 'Please enter a valid URL (e.g., https://example.com/login).' };
  }

  const indicators = [];
  let riskScore = 0;

  const protocol = parsed.protocol.replace(':', '');
  const hostname = parsed.hostname.toLowerCase();
  const pathname = parsed.pathname;
  const search = parsed.search;
  const fullUrl = parsed.href;

  // 1. Protocol Inspection
  const isHttps = protocol === 'https';
  if (!isHttps) {
    riskScore += 18;
    indicators.push({
      id: 'proto_http',
      title: 'Insecure HTTP Protocol',
      severity: 'high',
      category: 'Transport Security',
      whyItMatters: 'Unencrypted communication allows adversaries on the same network to intercept transmitted credentials, cookies, and tokens in plaintext.',
      recommendation: 'Legitimate login portals and banking platforms exclusively enforce modern HTTPS/TLS certificates.'
    });
  }

  // 2. Hostname as IP Address Check
  const hasIpHost = isIpAddress(hostname);
  if (hasIpHost) {
    riskScore += 30;
    indicators.push({
      id: 'ip_hostname',
      title: 'IP Address Used as Hostname',
      severity: 'critical',
      category: 'Host Infrastructure',
      whyItMatters: 'Legitimate institutions register branded domain names. Direct IP addresses in URLs are frequently used by attackers to bypass DNS-based domain blocklists.',
      recommendation: 'Never authenticate or provide private credentials on an IP-address hosted website.'
    });
  }

  // 3. Subdomain Depth Analysis
  const hostParts = hostname.split('.').filter(Boolean);
  // Subtract domain + TLD
  const subdomainCount = Math.max(0, hostParts.length - 2);
  if (subdomainCount >= 3) {
    riskScore += 20;
    indicators.push({
      id: 'excessive_subdomains',
      title: `Excessive Subdomains (${subdomainCount} levels detected)`,
      severity: 'high',
      category: 'Domain Obfuscation',
      whyItMatters: 'Attackers create deeply nested subdomains (e.g., paypal.com.account-verify.attacker-domain.xyz) to deceive mobile users whose address bars truncate the true domain.',
      recommendation: 'Inspect the right-most root domain right before the first slash to identify the real owner.'
    });
  } else if (subdomainCount === 2) {
    riskScore += 10;
  }

  // 4. Suspicious TLD Inspection
  const matchedTld = SUSPICIOUS_TLDS.find(tld => hostname.endsWith(tld));
  if (matchedTld) {
    riskScore += 18;
    indicators.push({
      id: 'suspicious_tld',
      title: `Suspicious Top-Level Domain (${matchedTld})`,
      severity: 'medium',
      category: 'Domain Reputation',
      whyItMatters: `Domains ending in ${matchedTld} are statistically over-represented in disposable phishing campaigns due to low acquisition costs and lenient registrar policies.`,
      recommendation: 'Treat non-standard TLDs asking for login credentials with extreme skepticism.'
    });
  }

  // 5. URL Length Analysis
  if (fullUrl.length > 100) {
    riskScore += 15;
    indicators.push({
      id: 'excessive_length',
      title: `Abnormal URL Length (${fullUrl.length} chars)`,
      severity: 'medium',
      category: 'Obfuscation',
      whyItMatters: 'Excessively long URLs are often engineered to push the suspicious domain out of view in narrow browser navigation bars.',
      recommendation: 'Examine the full address bar on desktop before interacting.'
    });
  } else if (fullUrl.length > 70) {
    riskScore += 8;
  }

  // 6. Embedded '@' symbol or credential tricks
  if (parsed.username || parsed.password || fullUrl.includes('@')) {
    riskScore += 30;
    indicators.push({
      id: 'userinfo_spoof',
      title: 'Deceptive Authentication Authority (@ Symbol)',
      severity: 'critical',
      category: 'URL Spoofing',
      whyItMatters: 'The @ character in URLs treats everything before it as credentials and connects strictly to what follows it (e.g. google.com@phishersite.com).',
      recommendation: 'Never visit links containing @ characters in the hostname authority.'
    });
  }

  // 7. Suspicious Keywords in Path & Query
  const detectedKeywords = SUSPICIOUS_KEYWORDS.filter(kw =>
    pathname.toLowerCase().includes(kw) || search.toLowerCase().includes(kw)
  );

  if (detectedKeywords.length >= 2) {
    riskScore += 20;
    indicators.push({
      id: 'credential_path_keywords',
      title: `Credential Harvesting Path Keywords (${detectedKeywords.slice(0, 4).join(', ')})`,
      severity: 'high',
      category: 'Payload Intent',
      whyItMatters: 'Paths containing sensitive action keywords like "verify", "login", or "update" combined with untrusted domains indicate a targeted credential trap.',
      recommendation: 'Navigate to the service directly by typing its known address into your browser rather than following this link.'
    });
  } else if (detectedKeywords.length === 1) {
    riskScore += 10;
  }

  // 8. Brand Impersonation & Typosquatting
  let impersonatedBrand = null;
  let typosquatType = null;

  for (const brand of TARGET_BRANDS) {
    // Check if brand is in subdomains or path but NOT the main apex domain
    const apexDomain = hostParts.length >= 2 ? hostParts.slice(-2).join('.') : hostname;
    const isOfficialBrandDomain = apexDomain === `${brand}.com` || apexDomain === `${brand}.org` || apexDomain === `${brand}.net`;

    // Case A: Brand appears in subdomain while apex is different
    if (!isOfficialBrandDomain && hostname.includes(brand)) {
      impersonatedBrand = brand;
      typosquatType = 'Subdomain / Hyphenated Brand Spoofing';
      riskScore += 25;
      break;
    }

    // Case B: Levenshtein distance 1 (paypa1, goog1e, micros0ft)
    const baseName = hostParts.length >= 2 ? hostParts[hostParts.length - 2] : hostParts[0] || '';
    const dist = levenshteinDistance(baseName, brand);
    if (dist === 1 && baseName !== brand) {
      impersonatedBrand = `${brand} (lookalike: "${baseName}")`;
      typosquatType = 'Typosquatting / Character Substitution';
      riskScore += 30;
      break;
    }
  }

  if (impersonatedBrand) {
    indicators.push({
      id: 'brand_impersonation',
      title: `Brand Impersonation: ${impersonatedBrand}`,
      severity: 'critical',
      category: 'Social Engineering',
      whyItMatters: `Attackers deliberately imitate trusted brand names (${impersonatedBrand}) to trick users into extending trust to an unverified malicious domain.`,
      recommendation: 'Confirm the official company domain via a search engine or your personal bookmarks.'
    });
  }

  // 9. Open Redirect Pattern Detection
  const redirectParams = ['redirect', 'url=', 'next=', 'dest=', 'target=', 'return=', 'goto='];
  const hasRedirectParam = redirectParams.some(p => search.toLowerCase().includes(p));
  if (hasRedirectParam) {
    riskScore += 15;
    indicators.push({
      id: 'open_redirect',
      title: 'Redirect-like Parameter Detected in Query',
      severity: 'medium',
      category: 'Evasion Technique',
      whyItMatters: 'Open redirect parameters can bounce a visitor through a legitimate domain before redirecting them to an arbitrary credential harvester.',
      recommendation: 'Check the destination URL specified in the query parameters.'
    });
  }

  // Normalize final score between 0 and 100
  const finalScore = Math.min(100, Math.max(5, riskScore));

  let riskTier = 'LOW RISK';
  let riskColor = 'emerald';
  if (finalScore >= 60) {
    riskTier = 'HIGH RISK';
    riskColor = 'red';
  } else if (finalScore >= 30) {
    riskTier = 'MEDIUM RISK';
    riskColor = 'amber';
  }

  // Visual anatomy segments for the UI inspector
  const anatomy = {
    protocol: parsed.protocol,
    subdomains: subdomainCount > 0 ? hostParts.slice(0, hostParts.length - 2).join('.') : null,
    apexDomain: hostParts.length >= 2 ? hostParts.slice(-2, -1)[0] : hostname,
    tld: hostParts.length >= 2 ? '.' + hostParts[hostParts.length - 1] : '',
    port: parsed.port ? `:${parsed.port}` : '',
    path: parsed.pathname,
    search: parsed.search,
    isHttps,
    hasIpHost,
    subdomainCount,
    suspiciousKeywordsFound: detectedKeywords,
    hasBrandImpersonation: !!impersonatedBrand
  };

  return {
    rawUrl,
    formattedUrl,
    riskScore: finalScore,
    riskTier,
    riskColor,
    hostname,
    protocol,
    isHttps,
    hasIpHost,
    subdomainCount,
    indicators,
    anatomy,
    timestamp: new Date().toISOString()
  };
}
