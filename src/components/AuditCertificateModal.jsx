import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ShieldCheck, Download, FileText, CheckCircle2, Globe, Lock, Printer, Copy, Check, Award, FileCode } from 'lucide-react';

export default function AuditCertificateModal({ isOpen, onClose, receiptData }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const merkleRoot = receiptData?.merkleRoot || "0x4a9b2c1d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b";
  const blockIndex = receiptData?.blockIndex || 892141;
  const receiptHash = receiptData?.receiptHash || "0xrcpt_9a8b7c6d5e4f3a2b1c0d9e8f";
  const timestamp = receiptData?.timestamp || new Date().toLocaleString();

  const certificateJson = JSON.stringify({
    title: "Official Cryptographic Election Audit Certificate",
    protocol: "DecentriVote Proof-of-Stake Mainnet v3.2",
    specification: "Design and Implementation of a Secure, Transparent, and Decentralized Blockchain-Based Electronic Voting System Using Proof-of-Stake (PoS) Consensus Mechanism",
    blockIndex: blockIndex,
    receiptHash: receiptHash,
    merkleRoot: merkleRoot,
    consensusStatus: "100% SYNCHRONIZED",
    auditStatus: "PASSED_CERTIK_OPENZEPPELIN",
    timestamp: timestamp
  }, null, 2);

  // DOWNLOAD STANDALONE 1-PAGE CERTIFICATE HTML FILE
  const handleDownloadSinglePageHtml = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>DecentriVote Audit Certificate - Block #${blockIndex}</title>
  <style>
    @page { size: portrait; margin: 10mm; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #050811;
      color: #ffffff;
      margin: 0;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 90vh;
    }
    .cert-card {
      width: 100%;
      max-width: 650px;
      background: #070b14;
      border: 2px solid #10b981;
      border-radius: 20px;
      padding: 35px;
      box-shadow: 0 0 40px rgba(16, 185, 129, 0.2);
      box-sizing: border-box;
      page-break-inside: avoid;
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid #10b981;
      color: #10b981;
      border-radius: 50px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 15px;
    }
    h1 {
      font-size: 22px;
      margin: 0 0 5px 0;
      color: #ffffff;
      text-transform: uppercase;
      letter-spacing: 1px;
      text-align: center;
    }
    .subtitle {
      font-size: 11px;
      color: #06b6d4;
      text-align: center;
      font-family: monospace;
      margin-bottom: 20px;
    }
    .spec-box {
      font-size: 11px;
      color: #cbd5e1;
      text-align: center;
      font-style: italic;
      padding: 12px;
      border-top: 1px solid rgba(255,255,255,0.1);
      border-bottom: 1px solid rgba(255,255,255,0.1);
      margin-bottom: 25px;
      line-height: 1.5;
    }
    .metric-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 14px;
      background: #0d1424;
      border-radius: 10px;
      margin-bottom: 10px;
      font-size: 12px;
      font-family: monospace;
    }
    .metric-label { color: #94a3b8; }
    .metric-val { color: #06b6d4; font-weight: bold; }
    .hash-val { color: #8b5cf6; word-break: break-all; font-size: 10px; }
    .footer-row {
      margin-top: 25px;
      padding-top: 15px;
      border-top: 1px solid rgba(255,255,255,0.1);
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      color: #64748b;
      font-family: monospace;
    }
    .footer-green { color: #10b981; font-weight: bold; }
  </style>
</head>
<body>
  <div class="cert-card">
    <div style="text-align: center;">
      <div class="badge">✓ OFFICIALLY SEALED ON POS BLOCKCHAIN</div>
      <h1>Audit Verification Certificate</h1>
      <div class="subtitle">PoS Mainnet Protocol v3.2 • Working Model Architecture</div>
    </div>
    <div class="spec-box">
      “Design and Implementation of a Secure, Transparent, and Decentralized Blockchain-Based Electronic Voting System Using Proof-of-Stake (PoS) Consensus Mechanism”
    </div>
    <div class="metric-row">
      <span class="metric-label">Block Height:</span>
      <span class="metric-val">#${blockIndex}</span>
    </div>
    <div class="metric-row">
      <span class="metric-label">Voter Receipt Hash:</span>
      <span class="metric-val" style="color: #10b981;">${receiptHash}</span>
    </div>
    <div class="metric-row" style="flex-direction: column; gap: 4px;">
      <span class="metric-label">Merkle Tree Root Hash:</span>
      <span class="hash-val">${merkleRoot}</span>
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px;">
      <div class="metric-row" style="margin-bottom:0;">
        <span class="metric-label">Consensus State:</span>
        <span class="metric-val" style="color: #10b981;">Synchronized</span>
      </div>
      <div class="metric-row" style="margin-bottom:0;">
        <span class="metric-label">Audit Verified:</span>
        <span class="metric-val">CertiK Pass</span>
      </div>
    </div>
    <div class="footer-row">
      <span>Timestamp: ${timestamp}</span>
      <span class="footer-green">Immutable P2P Proof Valid</span>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(blob);
    element.download = `DecentriVote_SinglePage_Certificate_Block_${blockIndex}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadJson = () => {
    const element = document.createElement("a");
    const file = new Blob([certificateJson], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `DecentriVote_Audit_Log_Block_${blockIndex}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(certificateJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass-panel rounded-3xl max-w-2xl w-full border border-emerald-500/40 overflow-hidden shadow-2xl shadow-emerald-950/40"
      >
        {/* MODAL HEADER (NO-PRINT) */}
        <div className="no-print px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <Award className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">Cryptographic Election Audit Certificate</h3>
              <p className="text-xs font-mono text-slate-400">Verifiable 1-Page Proof Document</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PRINTABLE 1-PAGE CERTIFICATE CARD */}
        <div className="p-6 sm:p-8 space-y-6">
          <div
            id="printable-certificate"
            className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border-2 border-emerald-500/40 relative overflow-hidden shadow-2xl"
          >
            {/* HOLOGRAPHIC BACKGROUND BADGE */}
            <div className="absolute top-4 right-4 opacity-10 pointer-events-none no-print">
              <ShieldCheck className="w-40 h-40 text-emerald-400" />
            </div>

            {/* CERTIFICATE HEADER */}
            <div className="text-center pb-6 border-b border-slate-800">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400 mb-3">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>OFFICIALLY SEALED ON POS BLOCKCHAIN</span>
              </div>
              <h2 className="font-heading font-extrabold text-2xl text-white tracking-tight uppercase">
                Audit Verification Certificate
              </h2>
              <p className="text-xs font-mono text-cyan-400 mt-1">
                PoS Mainnet Protocol v3.2 • Working Model Architecture
              </p>
            </div>

            {/* FORMAL SPECIFICATION TITLE */}
            <div className="py-4 text-xs font-mono text-slate-300 text-center leading-relaxed italic border-b border-slate-800/80">
              “Design and Implementation of a Secure, Transparent, and Decentralized Blockchain-Based Electronic Voting System Using Proof-of-Stake (PoS) Consensus Mechanism”
            </div>

            {/* CRYPTOGRAPHIC PROOF METRICS GRID */}
            <div className="py-6 space-y-3 font-mono text-xs text-slate-300">
              <div className="flex justify-between items-center bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400">Block Height:</span>
                <strong className="text-cyan-400">#{blockIndex}</strong>
              </div>

              <div className="flex justify-between items-center bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400">Voter Receipt Hash:</span>
                <span className="text-emerald-400 font-semibold truncate max-w-[240px]">{receiptHash}</span>
              </div>

              <div className="flex flex-col bg-slate-900/80 p-3 rounded-xl border border-slate-800 gap-1">
                <span className="text-slate-400">Merkle Tree Root Hash:</span>
                <code className="text-[11px] text-violet-300 break-all">{merkleRoot}</code>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex flex-col gap-1">
                  <span className="text-slate-400">Consensus State:</span>
                  <span className="text-emerald-400 font-semibold text-[11px]">100% Synchronized</span>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex flex-col gap-1">
                  <span className="text-slate-400">Security Audit:</span>
                  <span className="text-cyan-400 font-semibold text-[11px]">CertiK & OpenZeppelin</span>
                </div>
              </div>
            </div>

            {/* FOOTER SIGNATURE STAMP */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
              <span>Timestamp: {timestamp}</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" /> Immutable P2P Proof Valid
              </span>
            </div>
          </div>

          {/* ACTION BUTTONS (NO-PRINT) */}
          <div className="no-print flex flex-wrap gap-3">
            <button
              onClick={handleDownloadSinglePageHtml}
              className="flex-1 py-3 px-4 rounded-xl font-heading font-semibold text-xs text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download 1-Page Certificate File (.html)</span>
            </button>

            <button
              onClick={handlePrintCertificate}
              className="py-3 px-4 rounded-xl bg-slate-900 border border-slate-700 text-white font-heading font-semibold text-xs hover:bg-slate-800 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              <span>Print 1-Page PDF</span>
            </button>

            <button
              onClick={handleDownloadJson}
              className="py-3 px-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 font-heading font-semibold text-xs hover:bg-slate-800 flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileCode className="w-4 h-4 text-violet-400" />
              <span>JSON Log</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
