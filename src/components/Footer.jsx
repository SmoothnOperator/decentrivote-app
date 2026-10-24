import React from 'react';
import { Shield, Code, Share2, Globe, FileText, Terminal, ArrowUpRight, Download } from 'lucide-react';

export default function Footer({ onOpenVote, onOpenVerify }) {
  return (
    <footer className="bg-[#03050b] border-t border-slate-800/80 pt-16 pb-12 text-slate-400 font-body relative overflow-hidden">
      {/* GLOW DECORATION */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-cyan-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* BRAND COLUMN */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <a href="#" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-600 p-[1px]">
                <div className="w-full h-full bg-[#070b14] rounded-[11px] flex items-center justify-center">
                  <Shield className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-white">
                DECENTRI<span className="text-cyan-400">VOTE</span>
              </span>
            </a>

            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              DecentriVote is a working model implementation of a <strong className="text-slate-200">“Secure, Transparent, and Decentralized Blockchain-Based Electronic Voting System Using Proof-of-Stake (PoS) Consensus Mechanism”</strong> designed for 100% auditable, private elections.
            </p>

            {/* NETWORK STATUS BADGE */}
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse-glow" />
                <span>Network Live</span>
                <span className="text-slate-600">•</span>
                <span className="text-cyan-400">Block #892,140</span>
              </div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="font-heading font-bold text-sm text-white tracking-wider uppercase">Protocol</h4>
            <a href="#how-it-works" className="hover:text-cyan-400 text-sm transition-colors">How It Works</a>
            <a href="#live-stats" className="hover:text-cyan-400 text-sm transition-colors">Live Mainnet Telemetry</a>
            <a href="#security" className="hover:text-cyan-400 text-sm transition-colors">Security Architecture</a>
            <button onClick={onOpenVote} className="hover:text-cyan-400 text-sm text-left transition-colors cursor-pointer">
              Launch Voting Booth
            </button>
            <button onClick={onOpenVerify} className="hover:text-cyan-400 text-sm text-left transition-colors cursor-pointer">
              Verify Ballot Receipt
            </button>
          </div>

          {/* RESOURCES & SOCIALS */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="font-heading font-bold text-sm text-white tracking-wider uppercase">Community & Audit</h4>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-cyan-400 hover:text-cyan-400 transition-all"
                title="GitHub Code Repository"
              >
                <Code className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-cyan-400 hover:text-cyan-400 transition-all"
                title="Social Network"
              >
                <Share2 className="w-5 h-5" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-cyan-400 hover:text-cyan-400 transition-all"
                title="Consensus Terminal"
              >
                <Terminal className="w-5 h-5" />
              </a>
              <a
                href="#docs"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-cyan-400 hover:text-cyan-400 transition-all"
                title="Documentation"
              >
                <FileText className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <p>© {new Date().getFullYear()} DecentriVote Protocol. Open-Source Civic Blockchain System.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-200 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-200 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-200 transition-colors">Security Bounty</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
