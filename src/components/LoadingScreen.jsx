import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 bg-[#050811] flex flex-col items-center justify-center gap-6 select-none">
      {/* 3D ROTATING POLYGON SPINNER */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Outer Rotating Glowing Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 border-b-violet-500 animate-spin" />
        
        {/* Inner Counter-Rotating Hexagon/Diamond Icon */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-2 border-dashed border-emerald-400/80 rounded-xl"
        />

        {/* Center Glowing Shield Core */}
        <div className="w-5 h-5 rounded-full bg-cyan-400 box-glow-cyan animate-pulse" />
      </div>

      {/* PROTOCOL INITIALIZING TEXT */}
      <div className="flex flex-col items-center gap-2">
        <span className="font-heading font-extrabold text-xl tracking-wider text-white">
          DECENTRI<span className="text-cyan-400">VOTE</span>
        </span>
        <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>INITIALIZING CONSENSUS LEDGER...</span>
        </div>
      </div>
    </div>
  );
}
