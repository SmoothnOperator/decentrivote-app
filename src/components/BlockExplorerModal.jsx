import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Blocks, Activity, CheckCircle2, Shield, ArrowUpRight, Database, Server, RefreshCw, Cpu, Key, FileText } from 'lucide-react';

const INITIAL_BLOCKS = [
  {
    index: 892141,
    hash: "0x8f3b2a9c1e4f7d6e5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a",
    txCount: 42,
    validator: "Node Alpha (Election Commission)",
    merkleRoot: "0x4a9b2c1d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b",
    timestamp: "1.2s ago"
  },
  {
    index: 892140,
    hash: "0x7e2a1b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c",
    txCount: 38,
    validator: "Node Beta (University Auditor)",
    merkleRoot: "0x3b8a7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b",
    timestamp: "2.4s ago"
  },
  {
    index: 892139,
    hash: "0x6d1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d",
    txCount: 51,
    validator: "Node Gamma (Civil Watchdog)",
    merkleRoot: "0x2a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b",
    timestamp: "3.6s ago"
  },
  {
    index: 892138,
    hash: "0x5c0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c",
    txCount: 47,
    validator: "Node Delta (University Auditor)",
    merkleRoot: "0x1a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b",
    timestamp: "4.8s ago"
  }
];

const INITIAL_TRANSACTIONS = [
  {
    txHash: "0xtx_9a8b7c6d5e4f3a2b1c0d",
    type: "VOTE_CAST",
    nullifier: "0xnullifier_7f8e9d0c1b2a3f4e",
    candidateId: "CAN-01 (Dr. Ananya Deshmukh)",
    blockIndex: 892141,
    status: "Sealed",
    fee: "0.0000 POS",
    timestamp: "1.2s ago"
  },
  {
    txHash: "0xtx_8b7c6d5e4f3a2b1c0d9e",
    type: "VOTE_CAST",
    nullifier: "0xnullifier_6e5d4c3b2a1f0e9d",
    candidateId: "CAN-02 (Rohan Banerjee)",
    blockIndex: 892141,
    status: "Sealed",
    fee: "0.0000 POS",
    timestamp: "1.4s ago"
  },
  {
    txHash: "0xtx_7c6d5e4f3a2b1c0d9e8f",
    type: "VOTE_CAST",
    nullifier: "0xnullifier_5d4c3b2a1f0e9d8c",
    candidateId: "CAN-03 (Aarav Sharma)",
    blockIndex: 892140,
    status: "Sealed",
    fee: "0.0000 POS",
    timestamp: "2.4s ago"
  },
  {
    txHash: "0xtx_6d5e4f3a2b1c0d9e8f7a",
    type: "VOTE_CAST",
    nullifier: "0xnullifier_4c3b2a1f0e9d8c7b",
    candidateId: "CAN-04 (Meera Iyer)",
    blockIndex: 892139,
    status: "Sealed",
    fee: "0.0000 POS",
    timestamp: "3.6s ago"
  }
];

export default function BlockExplorerModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('blocks'); // 'blocks' | 'txs'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  if (!isOpen) return null;

  const filteredBlocks = INITIAL_BLOCKS.filter(b =>
    b.index.toString().includes(searchQuery) ||
    b.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.validator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTxs = INITIAL_TRANSACTIONS.filter(t =>
    t.txHash.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.nullifier.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.candidateId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass-panel rounded-3xl max-w-4xl w-full border border-cyan-500/30 overflow-hidden shadow-2xl shadow-cyan-950/50 flex flex-col max-h-[90vh]"
      >
        {/* MODAL HEADER */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
              <Database className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">DecentriVote Mainnet Block Explorer</h3>
              <p className="text-xs font-mono text-slate-400">Real-Time Proof-of-Stake Block Ledger & Mempool Stream</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* METRICS STRIP */}
        <div className="px-6 py-3 bg-slate-900/40 border-b border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">Height:</span>
            <strong className="text-cyan-400">#892,141</strong>
          </div>
          <div className="flex items-center gap-2">
            <Server className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-slate-400">Nodes:</span>
            <strong className="text-white">4,096</strong>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-slate-400">Finality:</span>
            <strong className="text-emerald-400">&lt; 1.18s</strong>
          </div>
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">Tx Fee:</span>
            <strong className="text-cyan-400">0.0000 POS</strong>
          </div>
        </div>

        {/* SEARCH & TAB TOOLBAR */}
        <div className="p-6 pb-3 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('blocks')}
              className={`px-4 py-2 rounded-xl font-heading font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'blocks'
                  ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-400'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Blocks className="w-4 h-4" />
              <span>Forged Blocks ({INITIAL_BLOCKS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('txs')}
              className={`px-4 py-2 rounded-xl font-heading font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'txs'
                  ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-400'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Mempool Txs ({INITIAL_TRANSACTIONS.length})</span>
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by block #, tx hash, or nullifier..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-xs focus:border-cyan-400 outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* EXPLORER TABLE CONTENT */}
        <div className="p-6 pt-0 overflow-y-auto flex-1">
          {activeTab === 'blocks' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[11px]">
                    <th className="py-3 px-3">Block #</th>
                    <th className="py-3 px-3">Block Hash</th>
                    <th className="py-3 px-3">Validator Node</th>
                    <th className="py-3 px-3 text-center">Txs</th>
                    <th className="py-3 px-3 text-right">Age</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredBlocks.map((b) => (
                    <tr
                      key={b.index}
                      onClick={() => setSelectedItem(b)}
                      className="hover:bg-slate-900/80 cursor-pointer transition-colors"
                    >
                      <td className="py-3.5 px-3 text-cyan-400 font-bold">#{b.index}</td>
                      <td className="py-3.5 px-3 text-slate-300 truncate max-w-[160px]">{b.hash}</td>
                      <td className="py-3.5 px-3 text-slate-200">{b.validator}</td>
                      <td className="py-3.5 px-3 text-center text-emerald-400">{b.txCount} txs</td>
                      <td className="py-3.5 px-3 text-right text-slate-400">{b.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'txs' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[11px]">
                    <th className="py-3 px-3">Tx Hash</th>
                    <th className="py-3 px-3">Candidate Package</th>
                    <th className="py-3 px-3">ZK-Nullifier Token</th>
                    <th className="py-3 px-3 text-center">Status</th>
                    <th className="py-3 px-3 text-right">Block</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredTxs.map((t, idx) => (
                    <tr
                      key={idx}
                      onClick={() => setSelectedItem(t)}
                      className="hover:bg-slate-900/80 cursor-pointer transition-colors"
                    >
                      <td className="py-3.5 px-3 text-violet-400 font-bold truncate max-w-[140px]">{t.txHash}</td>
                      <td className="py-3.5 px-3 text-slate-200">{t.candidateId}</td>
                      <td className="py-3.5 px-3 text-cyan-400 truncate max-w-[150px]">{t.nullifier}</td>
                      <td className="py-3.5 px-3 text-center">
                        <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded-full text-[10px]">
                          {t.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right text-cyan-400">#{t.blockIndex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* INSPECTOR DETAILS DRAWER */}
          {selectedItem && (
            <div className="mt-4 p-4 rounded-2xl bg-slate-900 border border-cyan-500/40 flex flex-col gap-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-cyan-400 font-bold flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Payload Inspection Inspector
                </span>
                <button onClick={() => setSelectedItem(null)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                {Object.entries(selectedItem).map(([k, v]) => (
                  <div key={k} className="flex justify-between bg-slate-950 p-2 rounded-lg border border-slate-800/80">
                    <span className="text-slate-400 capitalize">{k}:</span>
                    <span className="text-cyan-300 truncate max-w-[200px]">{v.toString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
