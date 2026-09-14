# PhishGuard — Phishing Attack Simulation & Detection Platform

An educational cybersecurity application and phishing threat intelligence platform designed for Cryptography & Cybersecurity (CCS) research and awareness training.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![React 19](https://img.shields.io/badge/React-19-61dafb.svg)
![Vite](https://img.shields.io/badge/Vite-8.3-646cff.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)

---

## 🚀 Key Features

- **🛡️ Phishing Attack Simulator**: Safe, simulated phishing scenarios (Credential harvesting, Spear phishing, Quishing/QR phishing, Urgency/Smishing) with zero credential storage.
- **🔍 Heuristic & Threat Detection Engine**: Real-time URL and email inspector analyzing domain reputation, homograph spoofing, urgent language markers, and header anomalies.
- **📊 Security Awareness & Reporting**: Interactive vulnerability scoring, educational breakdowns, and exportable forensic PDF reports.
- **⚡ Modern Cyber UI**: Glassmorphism cyber-themed dark mode interface built with Tailwind CSS and Lucide icons.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), PostCSS, Autoprefixer
- **Icons & UI**: [Lucide React](https://lucide.dev/), `clsx`, `tailwind-merge`
- **Forensics & Exports**: [jsPDF](https://github.com/parallax/jsPDF)

---

## 📦 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- npm / pnpm / yarn

### 2. Installation
```bash
git clone https://github.com/ShanmugapriyanMA777/phising.git
cd phising
npm install
```

### 3. Running Locally
```bash
npm run dev
```
Open `http://localhost:5173` in your browser to explore the dashboard.

### 4. Build for Production
```bash
npm run build
```

---

## 🔒 Security & Academic Disclaimer
This project is built strictly for academic demonstration and cybersecurity awareness training. It operates completely in a sandboxed, client-side simulation environment and does not store or transmit credentials or sensitive user data.
