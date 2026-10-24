import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import HowItWorks from './components/HowItWorks';
import StatsSection from './components/StatsSection';
import ElectionGraphSection from './components/ElectionGraphSection';
import SecuritySection from './components/SecuritySection';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import VotingModal from './components/VotingModal';
import VerificationModal from './components/VerificationModal';
import BlockExplorerModal from './components/BlockExplorerModal';
import AuditCertificateModal from './components/AuditCertificateModal';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [certificateData, setCertificateData] = useState(null);
  const [receiptToVerify, setReceiptToVerify] = useState("");
  const [receiptLedger, setReceiptLedger] = useState({});
  const [usedNullifiers, setUsedNullifiers] = useState({});
  const [usedVoterIds, setUsedVoterIds] = useState({});
  const [currentBlockIndex, setCurrentBlockIndex] = useState(892140);
  const [lastUsedVoterId, setLastUsedVoterId] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  const handleVoteSuccess = (voteData) => {
    const nextBlockIndex = currentBlockIndex + 1;
    setCurrentBlockIndex(nextBlockIndex);

    const newLedgerEntry = {
      receiptHash: voteData.receiptHash,
      candidate: voteData.candidate,
      voterId: voteData.voterId,
      nullifier: voteData.nullifier,
      blockIndex: nextBlockIndex,
      blockHash: "0x" + Array.from(voteData.receiptHash).reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) % 1e16, 19).toString(16) + "e4d3c2b1a",
      merkleRoot: "0x4a9b2c1d" + Math.random().toString(36).substring(2, 10),
      timestamp: new Date().toLocaleTimeString()
    };

    setReceiptLedger(prev => ({
      ...prev,
      [voteData.receiptHash]: newLedgerEntry
    }));

    setUsedNullifiers(prev => ({
      ...prev,
      [voteData.nullifier]: { blockIndex: nextBlockIndex, timestamp: newLedgerEntry.timestamp, voterId: voteData.voterId }
    }));

    setUsedVoterIds(prev => ({
      ...prev,
      [voteData.voterId]: { blockIndex: nextBlockIndex, timestamp: newLedgerEntry.timestamp }
    }));

    setLastUsedVoterId(voteData.voterId);
  };

  const handleOpenVerifyWithReceipt = (receiptHash) => {
    setReceiptToVerify(receiptHash || "");
    setIsVerifyModalOpen(true);
  };

  const handleOpenVerifyBlank = () => {
    setReceiptToVerify("");
    setIsVerifyModalOpen(true);
  };

  const handleOpenCertificate = (data) => {
    setCertificateData(data || {
      blockIndex: currentBlockIndex,
      receiptHash: "0xrcpt_9a8b7c6d5e4f3a2b1c0d9e8f",
      merkleRoot: "0x4a9b2c1d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b",
      timestamp: new Date().toLocaleString()
    });
    setIsCertificateOpen(true);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* NAVIGATION BAR */}
      <Navbar
        onOpenVote={() => setIsVoteModalOpen(true)}
        onOpenVerify={handleOpenVerifyBlank}
        onOpenExplorer={() => setIsExplorerOpen(true)}
      />

      {/* MAIN CONTENT SECTIONS */}
      <main>
        <Hero3D
          onOpenVote={() => setIsVoteModalOpen(true)}
          onOpenVerify={handleOpenVerifyBlank}
          onOpenExplorer={() => setIsExplorerOpen(true)}
        />
        <HowItWorks
          onOpenVote={() => setIsVoteModalOpen(true)}
        />
        <StatsSection />
        <ElectionGraphSection />
        <SecuritySection
          onOpenVerify={handleOpenVerifyBlank}
        />
      </main>

      {/* FOOTER */}
      <Footer
        onOpenVote={() => setIsVoteModalOpen(true)}
        onOpenVerify={handleOpenVerifyBlank}
        onOpenExplorer={() => setIsExplorerOpen(true)}
      />

      {/* INTERACTIVE MODALS */}
      <VotingModal
        isOpen={isVoteModalOpen}
        onClose={() => setIsVoteModalOpen(false)}
        onOpenVerify={handleOpenVerifyWithReceipt}
        onOpenCertificate={handleOpenCertificate}
        onVoteSuccess={handleVoteSuccess}
        usedNullifiers={usedNullifiers}
        usedVoterIds={usedVoterIds}
        lastUsedVoterId={lastUsedVoterId}
      />
      
      <VerificationModal
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
        initialReceipt={receiptToVerify}
        receiptLedger={receiptLedger}
      />

      <BlockExplorerModal
        isOpen={isExplorerOpen}
        onClose={() => setIsExplorerOpen(false)}
      />

      <AuditCertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        receiptData={certificateData}
      />
    </div>
  );
}
