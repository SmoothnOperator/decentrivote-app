import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Cpu, Activity, Menu, X, ArrowUpRight, Lock } from 'lucide-react';

export default function Navbar({ onOpenVote, onOpenVerify }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050811]/85 backdrop-blur-xl border-b border-slate-800/80 py-3 shadow-2xl shadow-cyan-950/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* BRAND LOGO */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-all duration-300">
            <div className="w-full h-full bg-[#070b14] rounded-[11px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-xl tracking-tight text-white flex items-center gap-1">
              DECENTRI<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400">VOTE</span>
            </span>
            <span className="text-[10px] font-mono font-medium text-slate-400 tracking-wider">
              PoS BLOCKCHAIN PROTOCOL
            </span>
          </div>
        </a>

        {/* DESKTOP NAV LINKS REMOVED */}

        {/* NETWORK STATUS BADGE & CTA */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Live Network Status Indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800/90 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-glow" />
            <span>Network Live</span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-400">PoS Consensus v3.2</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(6, 182, 212, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenVote}
            className="relative px-5 py-2.5 rounded-xl font-heading font-semibold text-sm text-black bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 shadow-lg shadow-cyan-500/25 flex items-center gap-2 cursor-pointer"
          >
            <span>Cast Your Vote</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#070b14]/95 backdrop-blur-2xl border-b border-slate-800 px-4 py-6"
          >
            <div className="flex flex-col gap-4 font-medium text-slate-200">
              <div className="pt-2 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-glow" />
                  <span>Mainnet Live • Block #892,140</span>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenVote();
                  }}
                  className="w-full py-3 rounded-xl font-heading font-semibold text-sm text-black bg-gradient-to-r from-cyan-400 to-emerald-400 flex items-center justify-center gap-2"
                >
                  <span>Cast Your Vote</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
