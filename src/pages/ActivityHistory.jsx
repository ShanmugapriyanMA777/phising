import React, { useState, useEffect } from 'react';
import { 
  History, 
  Trash2, 
  Download, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle,
  FileText,
  Search
} from 'lucide-react';
import { getHistory, clearHistory } from '../utils/historyStorage';

export default function ActivityHistory() {
  const [historyItems, setHistoryItems] = useState([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    setHistoryItems(getHistory());
  }, []);

  const handleClear = () => {
    if (window.confirm('Clear all local analysis history logs?')) {
      clearHistory();
      setHistoryItems([]);
    }
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(historyItems, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `phishguard_audit_log_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const filtered = historyItems.filter(item => 
    (item.target || '').toLowerCase().includes(filterText.toLowerCase()) ||
    (item.type || '').toLowerCase().includes(filterText.toLowerCase()) ||
    (item.id || '').toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
            <History className="w-3.5 h-3.5 text-cyan-400" />
            <span>LOCAL AUDIT TRAIL</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-sans m-0">
            ACTIVITY HISTORY
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Review sanitized heuristic evaluation logs. Zero passwords or credentials are ever recorded.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportJson}
            disabled={historyItems.length === 0}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors flex items-center gap-1.5 disabled:opacity-40"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={handleClear}
            disabled={historyItems.length === 0}
            className="px-3 py-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/40 text-rose-300 text-xs font-mono transition-colors flex items-center gap-1.5 disabled:opacity-40"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Filter audit logs by ID, target, or type..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-xs font-mono focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="text-xs font-mono text-slate-400">
          Showing {filtered.length} of {historyItems.length} records
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl glass-panel border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-cyber-950/90 text-slate-400 font-mono uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Audit ID & Date</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Target Snippet</th>
                <th className="py-3 px-4">Risk Score</th>
                <th className="py-3 px-4">Threat Classification</th>
                <th className="py-3 px-4 text-right">Indicators</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 font-mono">
                    No activity logs match the current filter.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => {
                  const isHigh = item.riskScore >= 60;
                  const isMed = item.riskScore >= 30 && item.riskScore < 60;

                  return (
                    <tr key={item.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-3 px-4 font-mono">
                        <div className="text-white font-bold text-[11px]">{item.id}</div>
                        <div className="text-[10px] text-slate-500">{item.date}</div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] uppercase">
                          {item.type}
                        </span>
                      </td>

                      <td className="py-3 px-4 max-w-xs truncate text-slate-200">
                        {item.target}
                      </td>

                      <td className="py-3 px-4 font-mono font-bold">
                        <span className={isHigh ? 'text-rose-400' : isMed ? 'text-amber-400' : 'text-emerald-400'}>
                          {item.riskScore}
                        </span>
                        <span className="text-[10px] text-slate-500 font-normal"> / 100</span>
                      </td>

                      <td className="py-3 px-4 font-mono">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                          isHigh 
                            ? 'bg-rose-500/10 text-rose-300 border-rose-500/30' 
                            : isMed 
                            ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' 
                            : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                        }`}>
                          {item.riskTier}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right font-mono text-slate-400">
                        {item.indicatorsCount} found
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
