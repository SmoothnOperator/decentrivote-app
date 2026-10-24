import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCheck, KeyRound, Vote, Search, ArrowRight, ShieldAlert, Cpu, Database } from 'lucide-react';

const STEPS = [
  {
    step: "01",
    title: "Cryptographic Registration",
    icon: UserCheck,
    color: "from-cyan-500 to-blue-600",
    badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    description: "Generates an asymmetric ECDSA 256-bit keypair on your device. The protocol derives a deterministic Zero-Knowledge Voter Nullifier to verify your voter eligibility.",
    techDetails: "SHA256(Voter_ID : Secret_Passcode : Election_ID)"
  },
  {
    step: "02",
    title: "Zero-Knowledge Authentication",
    icon: KeyRound,
    color: "from-blue-500 to-violet-600",
    badgeColor: "text-violet-400 border-violet-500/30 bg-violet-500/10",
    description: "Your true civic identity is completely decoupled from your ballot choice. The smart contract validates that you hold a valid voter key without ever storing your name on-chain.",
    techDetails: "ECDSA Digital Signature & ZK-Nullifier Matching"
  },
  {
    step: "03",
    title: "Anonymous Ballot Casting",
    icon: Vote,
    color: "from-violet-500 to-fuchsia-600",
    badgeColor: "text-fuchsia-400 border-fuchsia-500/30 bg-fuchsia-500/10",
    description: "Your vote selection is packaged into an encrypted payload, signed with your private key, and broadcast across peer-to-peer mempools for PoS slot leader block inclusion.",
    techDetails: "P2P Gossip Network Mempool Broadcast"
  },
  {
    step: "04",
    title: "Immutable Merkle Verification",
    icon: Search,
    color: "from-emerald-400 to-teal-500",
    badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    description: "Receive a unique cryptographic receipt hash. Use it anytime to verify that your exact vote was included in a forged block without revealing your candidate selection.",
    techDetails: "Merkle Tree Root Hash & Block Ledger Audit"
  }
];

export default function HowItWorks({ onOpenVote }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-[#070b14]">
      {/* BACKGROUND ACCENT GLOWS */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION TITLE & SUBTITLE */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono font-semibold text-cyan-400 mb-4"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>4-STEP CRYPTOGRAPHIC LIFECYCLE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white"
          >
            How DecentriVote Guarantees <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400">
              100% Tamper-Proof Integrity
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg mt-4 font-body"
          >
            Combining Zero-Knowledge Cryptography, Proof-of-Stake Consensus, and Merkle DAG Trees to create an unbreakable democratic protocol.
          </motion.p>
        </div>

        {/* 4 STEP CARDS GRID WITH SCROLL-TRIGGERED ANIMATIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                onClick={() => setActiveStep(index)}
                className={`glass-card rounded-2xl p-6 relative flex flex-col justify-between cursor-pointer group ${
                  activeStep === index ? 'border-cyan-500/60 shadow-lg shadow-cyan-950/40' : ''
                }`}
              >
                {/* STEP NUMBER & BADGE */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className={`font-mono font-bold text-xs px-3 py-1 rounded-lg border ${step.badgeColor}`}>
                      STEP {step.step}
                    </span>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} p-[1px] shadow-lg`}>
                      <div className="w-full h-full bg-[#0a0f1d] rounded-[11px] flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* STEP TITLE */}
                  <h3 className="font-heading font-bold text-xl text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {step.title}
                  </h3>

                  {/* STEP DESCRIPTION */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 font-body">
                    {step.description}
                  </p>
                </div>

                {/* TECH SPECIFICATION CHIP */}
                <div className="pt-4 border-t border-slate-800/80">
                  <span className="text-[11px] font-mono text-slate-400 block truncate">
                    ⚡ {step.techDetails}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* BOTTOM ACTION BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 glass-panel rounded-3xl p-8 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <Database className="w-7 h-7 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-lg text-white">Ready to Experience Decentralized Democracy?</h4>
              <p className="text-slate-400 text-sm font-body">Cast a test ballot on the mainnet sandbox or inspect the live block explorer.</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(6, 182, 212, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenVote}
            className="px-6 py-3.5 rounded-xl font-heading font-semibold text-sm text-black bg-gradient-to-r from-cyan-400 to-emerald-400 shrink-0 flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
          >
            <span>Launch Voting Booth</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}
