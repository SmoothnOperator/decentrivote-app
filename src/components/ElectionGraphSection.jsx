import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, PieChart, TrendingUp, Activity, Server, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';

const CANDIDATE_DATA = [
  {
    id: "CAN-01",
    name: "Dr. Ananya Deshmukh",
    party: "Bharatiya Janata Democratic Alliance (BJDA)",
    symbol: "🪷",
    votes: 542180,
    percentage: 36.5,
    color: "from-cyan-400 to-blue-500",
    barColor: "bg-gradient-to-r from-cyan-400 to-blue-500",
    textColor: "text-cyan-400"
  },
  {
    id: "CAN-02",
    name: "Rohan Banerjee",
    party: "National Progressive Congress (NPC)",
    symbol: "✋",
    votes: 421900,
    percentage: 28.4,
    color: "from-blue-500 to-violet-500",
    barColor: "bg-gradient-to-r from-blue-500 to-violet-500",
    textColor: "text-blue-400"
  },
  {
    id: "CAN-03",
    name: "Aarav Sharma",
    party: "Aam Swaraj Manch (ASM)",
    symbol: "🧹",
    votes: 310450,
    percentage: 20.9,
    color: "from-violet-500 to-fuchsia-500",
    barColor: "bg-gradient-to-r from-violet-500 to-fuchsia-500",
    textColor: "text-violet-400"
  },
  {
    id: "CAN-04",
    name: "Meera Iyer",
    party: "Samata Lok Kranti Front (SLKF)",
    symbol: "🌾",
    votes: 208380,
    percentage: 14.2,
    color: "from-emerald-400 to-teal-500",
    barColor: "bg-gradient-to-r from-emerald-400 to-teal-500",
    textColor: "text-emerald-400"
  }
];

const BLOCK_LATENCY_DATA = [
  { block: "#892135", time: "1.12s", tps: 1420, validators: 4096 },
  { block: "#892136", time: "1.08s", tps: 1580, validators: 4096 },
  { block: "#892137", time: "1.19s", tps: 1390, validators: 4096 },
  { block: "#892138", time: "1.05s", tps: 1650, validators: 4096 },
  { block: "#892139", time: "1.14s", tps: 1510, validators: 4096 },
  { block: "#892140", time: "1.18s", tps: 1490, validators: 4096 },
];

export default function ElectionGraphSection() {
  const [activeTab, setActiveTab] = useState('tally'); // 'tally' | 'blockchain' | 'validators'

  const totalVotesCast = CANDIDATE_DATA.reduce((acc, c) => acc + c.votes, 0);

  return (
    <section id="analytics-graphs" className="py-24 relative overflow-hidden bg-[#070b14] border-t border-slate-800/80">
      {/* GLOW DECORATIONS */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono font-semibold text-cyan-400 mb-4"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>REAL-TIME AUDITED TELEMETRY DASHBOARD</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white"
          >
            Live Election Analytics & Graph Ledger
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg mt-4 font-body"
          >
            Cryptographically verified ballot tallies and Proof-of-Stake consensus performance metrics updated live every block.
          </motion.p>
        </div>

        {/* TAB NAVIGATION SELECTOR */}
        <div className="flex justify-center mb-10">
          <div className="p-1 rounded-2xl glass-panel border border-slate-800 inline-flex gap-2">
            <button
              onClick={() => setActiveTab('tally')}
              className={`px-5 py-2.5 rounded-xl font-heading font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'tally'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <PieChart className="w-4 h-4" />
              <span>Candidate Vote Tally</span>
            </button>

            <button
              onClick={() => setActiveTab('blockchain')}
              className={`px-5 py-2.5 rounded-xl font-heading font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'blockchain'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Block Finality & TPS</span>
            </button>

            <button
              onClick={() => setActiveTab('validators')}
              className={`px-5 py-2.5 rounded-xl font-heading font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'validators'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Server className="w-4 h-4" />
              <span>PoS Node Mesh</span>
            </button>
          </div>
        </div>

        {/* GRAPH DISPLAY CONTAINER */}
        <AnimatePresence mode="wait">
          {activeTab === 'tally' && (
            <motion.div
              key="tally"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* LEFT: CANDIDATE BAR GRAPH CARDS */}
              <div className="lg:col-span-7 space-y-5">
                {CANDIDATE_DATA.map((candidate, idx) => (
                  <div key={candidate.id} className="glass-card rounded-2xl p-5 border border-slate-800/80">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{candidate.symbol}</span>
                        <div>
                          <h4 className="font-heading font-bold text-base text-white">{candidate.name}</h4>
                          <p className="text-xs text-slate-400 font-body">{candidate.party}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`font-heading font-extrabold text-xl ${candidate.textColor}`}>
                          {candidate.percentage}%
                        </span>
                        <span className="text-xs font-mono text-slate-400 block">
                          {candidate.votes.toLocaleString()} votes
                        </span>
                      </div>
                    </div>

                    {/* ANIMATED PROGRESS BAR */}
                    <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${candidate.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: idx * 0.15, ease: "easeOut" }}
                        className={`h-full rounded-full ${candidate.barColor}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* RIGHT: DONUT SVG CHART & TOTAL VOTES BREAKDOWN */}
              <div className="lg:col-span-5 glass-panel rounded-3xl p-8 border border-slate-800 flex flex-col items-center justify-center text-center">
                <h3 className="font-heading font-bold text-lg text-white mb-2">Vote Distribution Share</h3>
                <p className="text-xs font-mono text-slate-400 mb-6">Total Audited Ballots Sealed: {totalVotesCast.toLocaleString()}</p>

                {/* SVG DONUT CHART */}
                <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    {/* Background Circle */}
                    <path
                      className="text-slate-900 stroke-current"
                      strokeWidth="3.8"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />

                    {/* Segment 1: BJDA (36.5%) */}
                    <path
                      className="text-cyan-400 stroke-current"
                      strokeWidth="3.8"
                      strokeDasharray="36.5, 100"
                      strokeDashoffset="0"
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />

                    {/* Segment 2: NPC (28.4%) */}
                    <path
                      className="text-blue-500 stroke-current"
                      strokeWidth="3.8"
                      strokeDasharray="28.4, 100"
                      strokeDashoffset="-36.5"
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />

                    {/* Segment 3: ASM (20.9%) */}
                    <path
                      className="text-violet-500 stroke-current"
                      strokeWidth="3.8"
                      strokeDasharray="20.9, 100"
                      strokeDashoffset="-64.9"
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />

                    {/* Segment 4: SLKF (14.2%) */}
                    <path
                      className="text-emerald-400 stroke-current"
                      strokeWidth="3.8"
                      strokeDasharray="14.2, 100"
                      strokeDashoffset="-85.8"
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>

                  {/* CENTER METRIC */}
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="font-heading font-extrabold text-2xl text-white">1.48M+</span>
                    <span className="text-[10px] font-mono text-emerald-400">100% Sealed</span>
                  </div>
                </div>

                {/* LEGEND BADGES */}
                <div className="grid grid-cols-2 gap-2 w-full font-mono text-[11px] text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                    <span>BJDA: 36.5%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <span>NPC: 28.4%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-violet-500" />
                    <span>ASM: 20.9%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span>SLKF: 14.2%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'blockchain' && (
            <motion.div
              key="blockchain"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-panel rounded-3xl p-8 border border-slate-800"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="font-heading font-bold text-xl text-white">Block Finality Speed & Transactions Per Second</h3>
                  <p className="text-xs font-mono text-slate-400 mt-1">PoS Slot Leader Lottery Block Forging Performance</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 animate-pulse" /> Avg Finality: 1.18s
                  </span>
                </div>
              </div>

              {/* TIME SERIES GRAPH BARS */}
              <div className="grid grid-cols-6 gap-3 sm:gap-6 h-64 items-end pt-8 pb-4 px-4 bg-slate-900/60 rounded-2xl border border-slate-800/80 relative">
                {/* Horizontal Grid lines */}
                <div className="absolute inset-x-0 top-1/4 border-b border-slate-800/60" />
                <div className="absolute inset-x-0 top-2/4 border-b border-slate-800/60" />
                <div className="absolute inset-x-0 top-3/4 border-b border-slate-800/60" />

                {BLOCK_LATENCY_DATA.map((b, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end relative z-10">
                    <span className="text-[10px] font-mono text-cyan-400">{b.time}</span>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(b.tps / 1800) * 100}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                      className="w-full max-w-[40px] rounded-t-lg bg-gradient-to-t from-blue-600 via-cyan-400 to-teal-300 shadow-lg shadow-cyan-500/20 hover:brightness-125 transition-all"
                    />
                    <span className="text-[11px] font-mono text-slate-400">{b.block}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 pt-4 border-t border-slate-800/80 gap-4">
                <span>Peak Network Capacity: <strong className="text-white">5,000 TPS</strong></span>
                <span>Active Slot Validators: <strong className="text-cyan-400">4,096 Nodes</strong></span>
                <span>Consensus Engine: <strong className="text-emerald-400">Proof-of-Stake v3.2</strong></span>
              </div>
            </motion.div>
          )}

          {activeTab === 'validators' && (
            <motion.div
              key="validators"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-4">
                    <Server className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h4 className="font-heading font-bold text-lg text-white">Election Commission Node</h4>
                  <p className="text-xs text-slate-400 font-body mt-1">Primary Genesis Validator & Authority Watchdog</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/80 font-mono text-xs text-emerald-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> 100% Staked & Active
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center mb-4">
                    <Activity className="w-5 h-5 text-violet-400" />
                  </div>
                  <h4 className="font-heading font-bold text-lg text-white">University Auditor Mesh</h4>
                  <p className="text-xs text-slate-400 font-body mt-1">Distributed Independent Academic Verification Nodes</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/80 font-mono text-xs text-cyan-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> 1,024 Validator Slots
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h4 className="font-heading font-bold text-lg text-white">Civil Watchdog Network</h4>
                  <p className="text-xs text-slate-400 font-body mt-1">Public Observer Nodes with Slashing Penalties</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/80 font-mono text-xs text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> 3,072 Staking Nodes
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
