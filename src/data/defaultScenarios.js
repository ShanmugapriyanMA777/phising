// Default Pre-built Training Scenarios for Academic CCS Demonstration
// All domains use reserved example domains (example.com, example.org) or obvious test vectors.
// Zero real credentials are ever harvested or stored.

export const DEFAULT_SCENARIOS = [
  {
    id: 'scen-01',
    category: 'Social Media',
    title: 'Social Media Account Verification',
    difficulty: 'Beginner',
    sender: 'support@socialconnect-verify.example.com',
    senderName: 'SocialConnect Security Team',
    subject: 'Urgent: Verify Your Account To Prevent Restriction',
    date: 'Today at 09:42 AM',
    recipient: 'student.researcher@campus.edu',
    message: `Dear User,

We noticed unusual sign-in attempts on your SocialConnect profile from an unrecognized device in Moscow, Russia (IP: 185.220.101.4).

To secure your identity and prevent permanent suspension within 24 hours, you must confirm your credentials through our dedicated verification portal immediately.

Failure to verify will result in immediate termination of your account privileges.`,
    actionText: 'VERIFY ACCOUNT NOW',
    simulatedUrl: 'https://security-verify.socialconnect-portal.example.com/login/auth',
    targetService: 'SocialConnect',
    redFlags: [
      'Artificial urgency ("within 24 hours" / "immediate termination")',
      'Mismatched sender domain (socialconnect-verify.example.com vs official domain)',
      'Fear-based psychological coercion regarding unauthorized foreign login',
      'Direct link in email to submit account credentials',
      'Threat of account suspension'
    ],
    riskScore: 88,
    explanation: 'A classic social engineering attack combining fear (foreign hacker alert) with severe urgency (account suspension). Attackers direct the victim to a lookalike login interface to intercept login credentials.'
  },
  {
    id: 'scen-02',
    category: 'Security & Auth',
    title: 'Fake Urgent Password Reset',
    difficulty: 'Intermediate',
    sender: 'security-alert@service-accounts-update.example.net',
    senderName: 'Identity & Access Management',
    subject: 'Action Required: Your Single Sign-On Password Expires Today',
    date: 'Yesterday at 04:15 PM',
    recipient: 'user@university.edu',
    message: `Attention Employee / Student,

Your corporate SSO directory password is scheduled to expire in 3 hours per security compliance policy standard ISO-27001.

If your password expires, your network access, cloud drives, and email inbox will be frozen. Maintain your current password by clicking the authorization portal below.`,
    actionText: 'KEEP CURRENT PASSWORD',
    simulatedUrl: 'https://sso-directory-auth.example.com/reset?token=93f18a',
    targetService: 'SSO Corporate Portal',
    redFlags: [
      'Compliance buzzwords (ISO-27001) used to build fake authority',
      'Countdown pressure ("expires in 3 hours")',
      'Promise of shortcut ("Keep current password" - real systems force a new password)',
      'Subdomain masking on third-party domain',
      'Credential harvesting landing page'
    ],
    riskScore: 92,
    explanation: 'Exploits workplace compliance routine. Notice the deceptive promise to "keep your current password" by entering it on an external portal—standard systems never offer this shortcut.'
  },
  {
    id: 'scen-03',
    category: 'Banking & Financial',
    title: 'Unauthorized Wire Transfer Alert',
    difficulty: 'Beginner',
    sender: 'fraud-prevention@apex-national-security.example.org',
    senderName: 'Apex Trust Bank Fraud Division',
    subject: 'FRAUD ALERT: Wire transfer of $2,850.00 pending approval',
    date: '10 mins ago',
    recipient: 'client@financial-member.net',
    message: `Apex Trust Bank Customer Protection Notice:

A wire debit of $2,850.00 USD to 'Global Digital Assets Ltd' is currently pending your verification.

If you DID NOT authorize this transaction, click CANCEL TRANSFER immediately and provide your online banking PIN and secondary OTP to reverse the transaction.`,
    actionText: 'CANCEL TRANSFER NOW',
    simulatedUrl: 'https://apex-security-cancel.example.com/dispute/resolve',
    targetService: 'Apex Online Banking',
    redFlags: [
      'High financial shock value ($2,850 wire transfer)',
      'Demands sensitive PIN and OTP authentication codes',
      'High urgency to "cancel immediately"',
      'Generic customer greeting without official account last-4 digits',
      'Unofficial domain disguised with hyphenated bank name'
    ],
    riskScore: 95,
    explanation: 'High-stress financial panic triggers victims to act without thinking. Banks never ask for PINs or OTPs via an unsolicited verification link.'
  },
  {
    id: 'scen-04',
    category: 'Recruitment & HR',
    title: 'High-Salary Remote Job Offer',
    difficulty: 'Intermediate',
    sender: 'hr-talent@global-ventures-tech.example.com',
    senderName: 'Executive Talent Acquisition',
    subject: 'Offer Letter: Remote Cybersecurity Analyst ($85/hr)',
    date: 'Sep 12, 2026',
    recipient: 'student.jobseeker@campus.edu',
    message: `Hello Candidate,

Following a review of your resume and GitHub profile, our executive board is pleased to extend an offer for the position of Remote Security Operations Analyst.

Compensation: $85.00/hr + benefits.
To accept this offer and arrange equipment delivery, download your onboarding packet and submit your direct deposit banking details.`,
    actionText: 'SUBMIT ONBOARDING DETAILS',
    simulatedUrl: 'https://portal-onboarding.global-ventures-tech.example.com/deposit',
    targetService: 'HR Onboarding Portal',
    redFlags: [
      'Too good to be true compensation without a formal synchronous interview',
      'Premature request for direct deposit and banking credentials',
      'Vague references to qualifications without specific project discussions',
      'Unsolicited employment offer from unknown domain'
    ],
    riskScore: 82,
    explanation: 'Employment phishing targets students and job seekers using lucrative offers. The objective is identity theft and collecting bank account numbers under the guise of direct deposit setup.'
  },
  {
    id: 'scen-05',
    category: 'Rewards & Prizes',
    title: 'Tech Gadget & Crypto Giveaway Winner',
    difficulty: 'Beginner',
    sender: 'rewards@promotions-congratulations.example.xyz',
    senderName: 'Global Tech Rewards Foundation',
    subject: 'You have been selected: Claim your Apple MacBook Pro or 0.15 BTC',
    date: 'Sep 11, 2026',
    recipient: 'winner@random-inbox.com',
    message: `CONGRATULATIONS!

Your email was randomly chosen in our annual International Digital Innovation Sweepstakes. You have won first prize: a brand new Apple MacBook Pro M4 or 0.15 Bitcoin.

Claim prize code: #WIN-99214 within 6 hours. A nominal shipping & insurance fee of $4.95 is required to release the shipment.`,
    actionText: 'CLAIM PRIZE CODE',
    simulatedUrl: 'https://reward-release-delivery.example.xyz/claim',
    targetService: 'Prize Claim Center',
    redFlags: [
      'Unsolicited sweepstakes that the user never entered',
      'Unusual top-level domain (.xyz)',
      'Advance-fee fraud: Asking for $4.95 shipping fee to obtain credit card details',
      'Unrealistic high-value reward'
    ],
    riskScore: 90,
    explanation: 'Advance-fee fraud combined with lottery scam. The attacker collects credit card details and personal identity info while delivering nothing.'
  },
  {
    id: 'scen-06',
    category: 'Cloud & Infrastructure',
    title: 'Cloud Storage Quota Exceeded & Deletion',
    difficulty: 'Intermediate',
    sender: 'admin@cloud-drive-notifications.example.org',
    senderName: 'CloudDrive Storage System',
    subject: 'CRITICAL: 98% Storage Limit Reached - Files Pending Deletion',
    date: 'Sep 10, 2026',
    recipient: 'researcher@academic.org',
    message: `Warning: Your CloudDrive account has exceeded 15.8 GB of 16 GB allocated capacity.

Incoming shared documents, academic datasets, and pending uploads will be permanently discarded starting at 23:59 UTC tonight.

Click below to upgrade your enterprise storage tier for free as an educational affiliate.`,
    actionText: 'ACTIVATE FREE STORAGE UPGRADE',
    simulatedUrl: 'https://clouddrive-quota-resolve.example.org/upgrade',
    targetService: 'CloudDrive Storage',
    redFlags: [
      'Threat of irreversible data deletion',
      'Artificial deadline ("tonight at 23:59 UTC")',
      'Too-good-to-be-true free upgrade lure',
      'Third-party domain mimicking official cloud provider'
    ],
    riskScore: 78,
    explanation: 'Data loss anxiety induces hasty action, especially among researchers and students afraid of losing critical files.'
  },
  {
    id: 'scen-07',
    category: 'Logistics & Shipping',
    title: 'Express Parcel Delivery Failure',
    difficulty: 'Beginner',
    sender: 'tracking@express-courier-updates.example.com',
    senderName: 'Global Parcel Logistics',
    subject: 'Delivery Exception: Package #US-849102 withheld at customs depot',
    date: 'Sep 09, 2026',
    recipient: 'resident@home-address.net',
    message: `Delivery Notice:

Your parcel containing international tracking code #US-849102 could not be delivered due to an incomplete street address on file.

The package is stored at our regional hub. Please update your residential address and pay $1.50 re-routing clearance within 48 hours to prevent return to sender.`,
    actionText: 'UPDATE DELIVERY ADDRESS',
    simulatedUrl: 'https://parcel-tracking-dispatch.example.com/reschedule',
    targetService: 'Courier Dispatch',
    redFlags: [
      'Ambiguous package description capitalizing on frequent online shopping habits',
      'Small fee requested ($1.50) to steal credit card data and CVV',
      'Short time limit before package is supposedly returned'
    ],
    riskScore: 84,
    explanation: 'Smishing/phishing delivery scams exploit modern e-commerce habits. Victims overlook red flags because small fees ($1-2) seem harmless.'
  },
  {
    id: 'scen-08',
    category: 'Academic & Campus',
    title: 'University Library & Portal Session Expiry',
    difficulty: 'Advanced',
    sender: 'it-helpdesk@campus-edu-services.example.org',
    senderName: 'University IT Services Desk',
    subject: 'Campus Portal Migration: Synchronize Your Student ID',
    date: 'Sep 08, 2026',
    recipient: 'student@university.edu',
    message: `Dear University Community,

In accordance with our Fall semester cyber-infrastructure upgrade, all students and faculty must synchronize their institutional credentials with our updated Active Directory portal.

Unsynchronized accounts will lose library database access, VPN credentials, and grade records next Monday.`,
    actionText: 'SYNCHRONIZE CAMPUS ID',
    simulatedUrl: 'https://campus-edu-services.example.org/ad/sync',
    targetService: 'Campus Active Directory',
    redFlags: [
      'Targeted spear-phishing tailored specifically to academic environments',
      'Lookalike domain (campus-edu-services.example.org instead of legitimate university .edu)',
      'Severe academic penalties (loss of library, VPN, grades)',
      'Request for institutional Single Sign-On credentials'
    ],
    riskScore: 86,
    explanation: 'Spear-phishing designed to steal university credentials, which can be leveraged for campus proxy abuse, research data theft, and ransomware attacks.'
  },
  {
    id: 'scen-09',
    category: 'IT & Infrastructure',
    title: 'Enterprise VPN Security Patch Re-Authentication',
    difficulty: 'Advanced',
    sender: 'global-security-ops@corporate-gateway-vpn.example.net',
    senderName: 'Corporate Information Security Team',
    subject: 'Emergency Zero-Day Patch: Re-authenticate VPN Client Certificate',
    date: 'Sep 07, 2026',
    recipient: 'engineer@organization.org',
    message: `Security Bulletin #SEC-2026-0914:

An emergency firmware patch has been applied to our primary Cisco AnyConnect / GlobalProtect VPN gateways to address an actively exploited remote code execution vulnerability (CVE-2026-9912).

All remote personnel must sign in to the validation portal below to refresh their cryptographic user certificate.`,
    actionText: 'UPDATE VPN CERTIFICATE',
    simulatedUrl: 'https://vpn-auth-gateway.example.net/cert-renewal',
    targetService: 'Corporate VPN Gateway',
    redFlags: [
      'Sophisticated technical jargon (CVE, AnyConnect, certificate renewal) meant to silence skepticism',
      'Emergency patch pretext',
      'Hyphenated lookalike domain',
      'Harvesting VPN credentials which grant full internal network lateral movement'
    ],
    riskScore: 94,
    explanation: 'Advanced technical spear-phishing aimed at technical staff. Attackers use authentic-sounding CVE references to convince IT personnel to surrender gateway access.'
  },
  {
    id: 'scen-10',
    category: 'Subscription & Billing',
    title: 'Streaming Service Renewal & Auto-Billing Scam',
    difficulty: 'Beginner',
    sender: 'billing-support@media-stream-invoices.example.com',
    senderName: 'Streaming Plus Billing Department',
    subject: 'Invoice #INV-58190: Your Annual Premium Subscription ($389.99) Has Renewed',
    date: 'Sep 06, 2026',
    recipient: 'subscriber@consumer-mail.com',
    message: `Receipt from Streaming Plus Entertainment:

Thank you for your annual renewal. We have automatically debited $389.99 from your registered payment method for 12 months of Ultra-HD Family Membership.

If you did not authorize this auto-renewal or wish to cancel and request a 100% refund, contact our dispute department immediately at the cancellation portal below.`,
    actionText: 'CANCEL SUBSCRIPTION & REFUND',
    simulatedUrl: 'https://dispute-refunds-stream.example.com/cancel',
    targetService: 'Streaming Plus Billing',
    redFlags: [
      'Unexpected high-dollar charge ($389.99) creating urgency to cancel',
      'Pretext of offering an immediate full refund to lure victim into logging in',
      'Unofficial domain name not matching the legitimate streaming platform',
      'Call to action designed to capture credit card numbers and account credentials'
    ],
    riskScore: 85,
    explanation: 'Invoice/refund phishing tricking consumers into entering credentials and credit cards into a fake cancellation portal to reverse a fake charge.'
  }
];
