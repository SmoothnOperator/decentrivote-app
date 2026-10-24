import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Key, Shield, CheckCircle2, AlertTriangle, Vote, ArrowRight, Lock, Copy, Check, RotateCcw, AlertOctagon, RefreshCw, BookOpen } from 'lucide-react';

const CANDIDATES = [
  { id: "CAN-01", name: "Dr. Ananya Deshmukh", party: "Bharatiya Janata Democratic Alliance (BJDA)", symbol: "🪷" },
  { id: "CAN-02", name: "Rohan Banerjee", party: "National Progressive Congress (NPC)", symbol: "✋" },
  { id: "CAN-03", name: "Aarav Sharma", party: "Aam Swaraj Manch (ASM)", symbol: "🧹" },
  { id: "CAN-04", name: "Meera Iyer", party: "Samata Lok Kranti Front (SLKF)", symbol: "🌾" }
];

export default function VotingModal({
  isOpen,
  onClose,
  onOpenVerify,
  onOpenCertificate,
  onVoteSuccess,
  usedNullifiers = {},
  usedVoterIds = {},
  lastUsedVoterId = ""
}) {
  const [step, setStep] = useState(1);
  const [voterId, setVoterId] = useState("");
  const [passcode, setPasscode] = useState("");
  const [derivedNullifier, setDerivedNullifier] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receiptHash, setReceiptHash] = useState("");
  const [copied, setCopied] = useState(false);
  const [doubleVoteError, setDoubleVoteError] = useState(null);

  // Initialize fresh random voter ID on open
  useEffect(() => {
    if (isOpen && step === 1 && !derivedNullifier) {
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    const randomNum = Math.floor(Math.random() * 9000 + 1000);
    setVoterId(`VOTER-ALPHA-${randomNum}`);
    setPasscode(`CyberPasscode#${randomNum}`);
    setDerivedNullifier("");
    setSelectedCandidate(null);
    setIsSubmitting(false);
    setReceiptHash("");
    setDoubleVoteError(null);
    setStep(1);
  };


  if (!isOpen) return null;

  const handleGenerateCredentials = (e) => {
    e.preventDefault();
    if (!voterId || !passcode) return;

    setDoubleVoteError(null);
    const salt = voterId + passcode;
    const fakeNullifier = "0x" + Array.from(salt).reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) % 1e16, 17).toString(16).padStart(16, '0') + "a9b8c7d6e5f4";
    setDerivedNullifier(fakeNullifier);

    // ANTI-DOUBLE-VOTING CHECK
    const isNullifierUsed = usedNullifiers[fakeNullifier];
    const isVoterIdUsed = usedVoterIds[voterId];

    if (isNullifierUsed || isVoterIdUsed) {
      const record = isNullifierUsed || isVoterIdUsed;
      setDoubleVoteError({
        message: `Voter ID "${voterId}" (or ZK-Nullifier token) has ALREADY been consumed!`,
        blockIndex: record.blockIndex,
        timestamp: record.timestamp
      });
    }
  };

  const handleCastVote = () => {
    if (!selectedCandidate || !derivedNullifier || doubleVoteError) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const fakeReceipt = "0xrcpt_" + Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 12);
      setReceiptHash(fakeReceipt);
      setIsSubmitting(false);
      setStep(3);

      if (onVoteSuccess) {
        onVoteSuccess({
          receiptHash: fakeReceipt,
          candidate: selectedCandidate,
          nullifier: derivedNullifier,
          voterId: voterId
        });
      }
    }, 1000);
  };

  const handleCopyReceipt = () => {
    navigator.clipboard.writeText(receiptHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCastAnotherVote = () => {
    resetForm();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass-panel rounded-3xl max-w-xl w-full border border-cyan-500/30 overflow-hidden shadow-2xl shadow-cyan-950/50"
      >
        {/* HEADER */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
              <Vote className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">DecentriVote Voting Booth</h3>
              <p className="text-xs font-mono text-slate-400">PoS Mainnet • Anti-Double Spend Protection Active</p>
            </div>
          </div>
          <button onClick={handleClose} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP PROGRESS BAR */}
        <div className="px-6 pt-4 flex items-center justify-between text-xs font-mono text-slate-400">
          <span className={step >= 1 ? 'text-cyan-400 font-semibold' : ''}>1. Identity</span>
          <span className="text-slate-700">───</span>
          <span className={step >= 2 ? 'text-cyan-400 font-semibold' : ''}>2. Candidate</span>
          <span className="text-slate-700">───</span>
          <span className={step >= 3 ? 'text-emerald-400 font-semibold' : ''}>3. Receipt</span>
        </div>

        {/* CONTENT PANES */}
        <div className="p-6">
          {step === 1 && (
            <div className="flex flex-col gap-5">
              <div>
                <h4 className="font-heading font-bold text-base text-white">Step 1: Derive Anonymous Voter Credentials</h4>
                <p className="text-xs text-slate-400 font-body mt-1">Enter registration info to generate your asymmetric ECDSA Keypair and Zero-Knowledge Voter Nullifier.</p>
              </div>

              <form onSubmit={handleGenerateCredentials} className="flex flex-col gap-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-mono text-slate-300 block">National Voter ID / Student Reg No</label>
                    <div className="flex gap-4 items-center">
                      {lastUsedVoterId && voterId !== lastUsedVoterId && (
                        <button
                          type="button"
                          onClick={() => {
                            setVoterId(lastUsedVoterId);
                            setPasscode('CyberPasscode#SamePass');
                            setDoubleVoteError(null);
                            setDerivedNullifier('');
                          }}
                          className="text-[11px] font-mono text-rose-400 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <AlertTriangle className="w-3 h-3" /> Insert Used ID
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={resetForm}
                        className="text-[11px] font-mono text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3" /> New ID
                      </button>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={voterId}
                    onChange={(e) => {
                      setVoterId(e.target.value);
                      setDoubleVoteError(null);
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:border-cyan-400 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Secret Passcode</label>
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      setDoubleVoteError(null);
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:border-cyan-400 outline-none"
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl font-heading font-semibold text-sm text-black bg-gradient-to-r from-cyan-400 to-teal-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
                  >
                    <Key className="w-4 h-4" />
                    <span>Derive ZK-Nullifier Token</span>
                  </button>
                </div>
              </form>

              {/* DOUBLE-VOTE SECURITY ALERT REJECTION */}
              {doubleVoteError && (
                <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/50 flex flex-col gap-2 animate-shake">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider">
                    <AlertOctagon className="w-4 h-4" />
                    <span>SECURITY REJECTED: DOUBLE-VOTING DETECTED</span>
                  </div>
                  <p className="text-xs font-mono text-rose-200 leading-relaxed">
                    {doubleVoteError.message}
                  </p>
                  <div className="text-[11px] font-mono text-slate-400 pt-1 border-t border-rose-500/20 flex justify-between">
                    <span>Recorded in Block: <strong className="text-rose-300">#{doubleVoteError.blockIndex}</strong></span>
                    <span>Status: <strong className="text-rose-400">Double-Spend Prohibited</strong></span>
                  </div>
                  <button
                    onClick={resetForm}
                    className="mt-2 w-full py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono text-xs hover:bg-cyan-500/30 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Switch to New Unique Voter Credentials</span>
                  </button>
                </div>
              )}

              {/* SUCCESS CREDENTIALS DERIVED */}
              {derivedNullifier && !doubleVoteError && (
                <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/30 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Nullifier Token Verified Fresh (Unused On-Chain)</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-300 truncate">
                    <span className="text-slate-400">Nullifier Hash:</span> {derivedNullifier}
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="mt-2 w-full py-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-heading font-semibold text-xs hover:bg-emerald-500/30 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Candidate Selection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-5">
              <div>
                <h4 className="font-heading font-bold text-base text-white">Step 2: Select Candidate Option</h4>
                <p className="text-xs text-slate-400 font-body mt-1">Choose your preferred profile to package into the encrypted ballot transaction.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CANDIDATES.map((cand) => (
                  <div
                    key={cand.id}
                    onClick={() => setSelectedCandidate(cand)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      selectedCandidate?.id === cand.id
                        ? 'bg-cyan-500/15 border-cyan-400 shadow-lg shadow-cyan-500/20'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{cand.symbol}</span>
                      <span className="text-[10px] font-mono text-cyan-400">{cand.id}</span>
                    </div>
                    <div>
                      <h5 className="font-heading font-bold text-sm text-white">{cand.name}</h5>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-800 cursor-pointer"
                >
                  Back
                </button>
                <button
                  disabled={!selectedCandidate || isSubmitting || doubleVoteError}
                  onClick={handleCastVote}
                  className="flex-1 py-3 rounded-xl font-heading font-semibold text-sm text-black bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Signing Payload & Forging Block...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Sign & Broadcast Ballot to Chain</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center text-center gap-4 py-2">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-2xl">
                🎉
              </div>

              <div>
                <h4 className="font-heading font-bold text-xl text-white">Ballot Sealed & Broadcast On-Chain!</h4>
                <p className="text-xs text-slate-400 font-body mt-1">Your vote transaction has been recorded and your ZK-Nullifier token is now permanently marked as consumed in the ledger.</p>
              </div>

              <div className="w-full p-4 rounded-2xl bg-slate-900 border border-cyan-500/30 flex flex-col gap-2 text-left">
                <span className="text-[11px] font-mono text-slate-400">Cryptographic Voter Receipt Hash:</span>
                <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-xs text-cyan-400">
                  <span className="truncate">{receiptHash}</span>
                  <button onClick={handleCopyReceipt} className="p-1.5 hover:text-white text-slate-400 cursor-pointer">
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5 w-full pt-2">
                <button
                  onClick={() => {
                    if (onOpenVerify) onOpenVerify(receiptHash);
                  }}
                  className="flex-1 py-3 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-heading font-semibold text-xs hover:bg-slate-800 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Shield className="w-4 h-4 text-violet-400" />
                  <span>Verify Receipt</span>
                </button>

                {onOpenCertificate && (
                  <button
                    onClick={() => {
                      onOpenCertificate({
                        receiptHash: receiptHash,
                        nullifier: derivedNullifier,
                        voterId: voterId,
                        blockIndex: 892141
                      });
                    }}
                    className="py-3 px-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-heading font-semibold text-xs hover:bg-emerald-500/30 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Audit Certificate</span>
                  </button>
                )}

                <button
                  onClick={handleCastAnotherVote}
                  className="py-3 px-3 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-heading font-semibold text-xs hover:bg-cyan-500/30 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Cast Another</span>
                </button>

                <button
                  onClick={handleClose}
                  className="px-4 py-3 rounded-xl bg-slate-800 text-slate-200 font-heading font-semibold text-xs hover:bg-slate-700 cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
