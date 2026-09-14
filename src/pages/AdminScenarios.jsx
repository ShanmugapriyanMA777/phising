import React, { useState } from 'react';
import { 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  AlertTriangle, 
  Save, 
  RotateCcw,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { DEFAULT_SCENARIOS } from '../data/defaultScenarios';

export default function AdminScenarios({ scenarios, setScenarios }) {
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [notification, setNotification] = useState('');

  // Form states for new / edited scenario
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Social Media');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [sender, setSender] = useState('');
  const [senderName, setSenderName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [actionText, setActionText] = useState('VERIFY ACCOUNT');
  const [simulatedUrl, setSimulatedUrl] = useState('');
  const [riskScore, setRiskScore] = useState(85);
  const [explanation, setExplanation] = useState('');
  const [redFlagsText, setRedFlagsText] = useState('');

  const triggerNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3500);
  };

  const handleOpenAddForm = () => {
    setEditingId(null);
    setTitle('');
    setCategory('Social Media');
    setDifficulty('Intermediate');
    setSender('support@example-login.example.com');
    setSenderName('Customer Support Operations');
    setSubject('Urgent: Please confirm your profile');
    setMessage('Your account has been flagged for abnormal activity. Please verify your details immediately to avoid restriction.');
    setActionText('CONFIRM NOW');
    setSimulatedUrl('https://verify.example-login.example.com/login');
    setRiskScore(85);
    setExplanation('Social engineering attack leveraging authority and fear of restriction.');
    setRedFlagsText('Urgency pressure\nUntrusted domain\nUnsolicited link');
    setShowAddForm(true);
  };

  const handleEditScenario = (scen) => {
    setEditingId(scen.id);
    setTitle(scen.title);
    setCategory(scen.category);
    setDifficulty(scen.difficulty || 'Intermediate');
    setSender(scen.sender);
    setSenderName(scen.senderName || '');
    setSubject(scen.subject);
    setMessage(scen.message);
    setActionText(scen.actionText || 'VERIFY ACCOUNT');
    setSimulatedUrl(scen.simulatedUrl);
    setRiskScore(scen.riskScore || 80);
    setExplanation(scen.explanation || '');
    setRedFlagsText((scen.redFlags || []).join('\n'));
    setShowAddForm(true);
  };

  const handleDeleteScenario = (id) => {
    if (window.confirm('Delete this scenario from the training library?')) {
      const updated = scenarios.filter(s => s.id !== id);
      setScenarios(updated);
      triggerNotification('Scenario removed successfully.');
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset scenarios to default 10 academic templates?')) {
      setScenarios(DEFAULT_SCENARIOS);
      triggerNotification('Scenarios reset to academic defaults.');
    }
  };

  const handleSaveScenario = (e) => {
    e.preventDefault();
    if (!title.trim() || !subject.trim() || !message.trim()) {
      alert('Please fill in all required fields (title, subject, message).');
      return;
    }

    const redFlags = redFlagsText.split('\n').map(s => s.trim()).filter(Boolean);

    if (editingId) {
      // Update
      const updated = scenarios.map(scen => {
        if (scen.id === editingId) {
          return {
            ...scen,
            title,
            category,
            difficulty,
            sender,
            senderName,
            subject,
            message,
            actionText,
            simulatedUrl,
            riskScore: Number(riskScore) || 80,
            explanation,
            redFlags
          };
        }
        return scen;
      });
      setScenarios(updated);
      triggerNotification('Scenario updated successfully.');
    } else {
      // Create new
      const newScen = {
        id: `scen-custom-${Date.now().toString(36)}`,
        title,
        category,
        difficulty,
        sender,
        senderName,
        subject,
        message,
        actionText,
        simulatedUrl: simulatedUrl || 'https://security-portal.example.com/verify',
        riskScore: Number(riskScore) || 80,
        explanation,
        redFlags
      };
      setScenarios([newScen, ...scenarios]);
      triggerNotification('New scenario added to training library.');
    }

    setShowAddForm(false);
    setEditingId(null);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
            <Settings className="w-3.5 h-3.5 text-cyan-400" />
            <span>LAB SCENARIO MANAGER</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-sans m-0">
            ADMIN SCENARIO MANAGEMENT
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Create, calibrate, and edit training scenarios for educational demonstration.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetDefaults}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={handleOpenAddForm}
            className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs font-mono transition-colors flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,242,254,0.3)]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Scenario</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {notification && (
        <div className="p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Add / Edit Form Modal / Box */}
      {showAddForm && (
        <form onSubmit={handleSaveScenario} className="p-6 rounded-xl glass-panel border border-cyan-500/30 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2 m-0">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>{editingId ? 'Edit Scenario' : 'Create New Training Scenario'}</span>
            </h3>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Scenario Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Student Loan Clearance Trap"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              >
                <option value="Social Media">Social Media</option>
                <option value="Security & Auth">Security & Auth</option>
                <option value="Banking & Financial">Banking & Financial</option>
                <option value="Recruitment & HR">Recruitment & HR</option>
                <option value="Rewards & Prizes">Rewards & Prizes</option>
                <option value="Cloud & Infrastructure">Cloud & Infrastructure</option>
                <option value="Logistics & Shipping">Logistics & Shipping</option>
                <option value="Academic & Campus">Academic & Campus</option>
                <option value="Subscription & Billing">Subscription & Billing</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Sender Address (&lt;email&gt;)</label>
              <input
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="security@service-alert.example.com"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Sender Friendly Display Name</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Identity Security Team"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Email Subject Line *</label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Action Required: Confirm Identity"
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Simulated Email Body *</label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="The deceptive email body text..."
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">CTA Button Text</label>
              <input
                type="text"
                value={actionText}
                onChange={(e) => setActionText(e.target.value)}
                placeholder="VERIFY ACCOUNT"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Simulated URL</label>
              <input
                type="text"
                value={simulatedUrl}
                onChange={(e) => setSimulatedUrl(e.target.value)}
                placeholder="https://verify.example.com/login"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Simulated Risk Score (0-100)</label>
              <input
                type="number"
                min="10"
                max="100"
                value={riskScore}
                onChange={(e) => setRiskScore(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Red Flags (1 per line)</label>
              <textarea
                rows={3}
                value={redFlagsText}
                onChange={(e) => setRedFlagsText(e.target.value)}
                placeholder="Urgency pressure&#10;Mismatched sender domain&#10;Credential request link"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Academic Pedagogical Explanation</label>
              <textarea
                rows={3}
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder="Explain why this attack works and what psychological vectors are exploited..."
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-mono hover:bg-slate-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-cyan-500 text-black font-bold text-xs font-mono hover:bg-cyan-400 flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Scenario</span>
            </button>
          </div>
        </form>
      )}

      {/* Scenarios Management Table */}
      <div className="rounded-xl glass-panel border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-cyber-950/90 text-slate-400 font-mono uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Title & Pretext</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Difficulty</th>
                <th className="py-3 px-4">Risk Score</th>
                <th className="py-3 px-4">Simulated Sender</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/60 font-sans">
              {scenarios.map((scen) => (
                <tr key={scen.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white max-w-xs truncate">
                    {scen.title}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                      {scen.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-cyan-400">
                    {scen.difficulty || 'Intermediate'}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">
                    {scen.riskScore}/100
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-400 max-w-xs truncate">
                    {scen.sender}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditScenario(scen)}
                        className="p-1 rounded text-slate-400 hover:text-cyan-400 hover:bg-slate-800"
                        title="Edit Scenario"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteScenario(scen.id)}
                        className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                        title="Delete Scenario"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
