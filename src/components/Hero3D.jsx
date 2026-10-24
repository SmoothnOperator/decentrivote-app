import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, MeshWobbleMaterial, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Lock, CheckCircle2, Key, Database, Sparkles as SparklesIcon, Cpu, Layers, BookOpen, Download } from 'lucide-react';
import * as THREE from 'three';

// 3D INTERLOCKING BLOCKCHAIN / CRYSTAL BALLOT VAULT MESH
function BlockchainNodeNetwork({ onOpenVote }) {
  const outerMeshRef = useRef();
  const innerMeshRef = useRef();
  const coreOctahedronRef = useRef();
  const ringGroupRef = useRef();
  const ringGroup2Ref = useRef();

  useFrame((state, delta) => {
    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.y += delta * 0.35;
      outerMeshRef.current.rotation.x += delta * 0.15;
    }
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.y -= delta * 0.5;
      innerMeshRef.current.rotation.z += delta * 0.25;
    }
    if (coreOctahedronRef.current) {
      coreOctahedronRef.current.rotation.x += delta * 0.7;
      coreOctahedronRef.current.rotation.y += delta * 0.4;
    }
    if (ringGroupRef.current) {
      ringGroupRef.current.rotation.z += delta * 0.3;
    }
    if (ringGroup2Ref.current) {
      ringGroup2Ref.current.rotation.x += delta * 0.35;
      ringGroup2Ref.current.rotation.y -= delta * 0.2;
    }

    const targetX = (state.mouse.x * 0.4);
    const targetY = (state.mouse.y * 0.4);
    state.camera.position.x += (targetX - state.camera.position.x) * 0.05;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group scale={1.25} onClick={onOpenVote} className="cursor-pointer">
      {/* Outer Wireframe Icosahedron (Cyan) */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1.2}>
        <mesh ref={outerMeshRef}>
          <icosahedronGeometry args={[2.3, 1]} />
          <meshStandardMaterial
            wireframe
            color="#06b6d4"
            emissive="#0284c7"
            emissiveIntensity={1.8}
            roughness={0.1}
          />
        </mesh>
      </Float>

      {/* Secondary Counter-Rotating Wireframe (Emerald) */}
      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.4}>
        <mesh ref={innerMeshRef}>
          <dodecahedronGeometry args={[1.7, 0]} />
          <meshStandardMaterial
            wireframe
            color="#10b981"
            emissive="#059669"
            emissiveIntensity={1.4}
            roughness={0.2}
          />
        </mesh>
      </Float>

      {/* Inner Glowing Wireframe Octahedron Core */}
      <Float speed={3.5} rotationIntensity={1.2} floatIntensity={1.6}>
        <mesh ref={coreOctahedronRef}>
          <octahedronGeometry args={[1.1, 0]} />
          <meshStandardMaterial
            wireframe
            color="#c084fc"
            emissive="#a855f7"
            emissiveIntensity={2.5}
            roughness={0.1}
          />
        </mesh>
      </Float>

      {/* Primary Orbital Satellite Ring (Blue) */}
      <group ref={ringGroupRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3.2, 0.03, 16, 100]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.7} />
        </mesh>

        {[0, (Math.PI * 2) / 4, (Math.PI * 4) / 4, (Math.PI * 6) / 4].map((angle, idx) => (
          <mesh
            key={idx}
            position={[
              Math.cos(angle) * 3.2,
              Math.sin(angle) * 3.2,
              0
            ]}
          >
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial
              color="#00ffcc"
              emissive="#00ffcc"
              emissiveIntensity={3}
            />
          </mesh>
        ))}
      </group>

      {/* Secondary Diagonal Orbital Satellite Ring (Violet) */}
      <group ref={ringGroup2Ref}>
        <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[3.6, 0.02, 16, 100]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.6} />
        </mesh>

        {[Math.PI / 6, (Math.PI * 5) / 6, (Math.PI * 9) / 6].map((angle, idx) => (
          <mesh
            key={idx}
            position={[
              Math.cos(angle) * 3.6,
              Math.sin(angle) * 3.6,
              0
            ]}
          >
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial
              color="#f43f5e"
              emissive="#f43f5e"
              emissiveIntensity={3}
            />
          </mesh>
        ))}
      </group>

      <Sparkles
        count={120}
        scale={10}
        size={3.5}
        speed={0.6}
        color="#38bdf8"
      />
    </group>
  );
}

export default function Hero3D({ onOpenVote, onOpenVerify, onOpenExplorer }) {
  const [isMobile, setIsMobile] = useState(false);
  const [showArchModal, setShowArchModal] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-grid-pattern">
      {/* BACKGROUND NEON GLOW BLURS */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/20 via-blue-600/15 to-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* LEFT COLUMN: HERO HEADLINE & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left"
        >
          {/* SYSTEM ARCHITECTURE BADGE CHIP */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-cyan-500/40 text-xs font-mono font-semibold text-cyan-400 w-fit mx-auto lg:mx-0 shadow-lg shadow-cyan-950/40">
            <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>PROOF-OF-STAKE (PoS) WORKING MODEL ARCHITECTURE</span>
          </div>

          {/* FORMAL PROJECT TITLE */}
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-300 text-left leading-relaxed">
            <span className="text-cyan-400 font-semibold block mb-0.5 uppercase tracking-wider">Formal System Specification:</span>
            <span className="text-slate-200">
              “Design and Implementation of a Secure, Transparent, and Decentralized Blockchain-Based Electronic Voting System Using Proof-of-Stake (PoS) Consensus Mechanism”
            </span>
          </div>

          {/* MAIN HERO TITLE */}
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-white">
            Vote Securely.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 text-glow-cyan">
              Verify Instantly.
            </span>{' '}
            Trust Nobody but the Chain.
          </h1>

          {/* SUBTEXT DESCRIPTION */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-body">
            DecentriVote replaces opaque ballot boxes with Zero-Knowledge Voter Nullifiers and cryptographic Proof-of-Stake block validation. Every vote cast is mathematically sealed and publicly auditable forever.
          </p>

          {/* CTA BUTTON GROUP */}
          <div className="flex flex-wrap items-center gap-3 pt-2 justify-center lg:justify-start">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(6, 182, 212, 0.45)" }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenVote}
              className="px-6 py-3.5 rounded-xl font-heading font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Cast Your Vote</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 25px rgba(139, 92, 246, 0.35)" }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenVerify}
              className="px-6 py-3.5 rounded-xl font-heading font-semibold text-sm text-white bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 shadow-lg flex items-center justify-center gap-2 cursor-pointer group"
            >
              <ShieldCheck className="w-4 h-4 text-violet-400 group-hover:rotate-12 transition-transform" />
              <span>Verify Receipt</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 25px rgba(59, 130, 246, 0.35)" }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenExplorer}
              className="px-6 py-3.5 rounded-xl font-heading font-semibold text-sm text-cyan-300 bg-slate-900/90 hover:bg-slate-800/90 border border-cyan-500/40 shadow-lg flex items-center justify-center gap-2 cursor-pointer group"
            >
              <Database className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>Block Explorer</span>
            </motion.button>

          </div>

          {/* METRIC PILLS & TRUST BADGES */}
          <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 max-w-xl mx-auto lg:mx-0">
            <div className="flex flex-col">
              <span className="text-xs font-mono text-slate-400 uppercase">Auditability</span>
              <span className="font-heading font-bold text-lg text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> 100% On-Chain
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-mono text-slate-400 uppercase">Anonymity</span>
              <span className="font-heading font-bold text-lg text-cyan-400 flex items-center gap-1">
                <Key className="w-4 h-4" /> Zero-Knowledge
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-mono text-slate-400 uppercase">Finality Time</span>
              <span className="font-heading font-bold text-lg text-violet-400 flex items-center gap-1">
                <Database className="w-4 h-4" /> &lt; 1.2s Block
              </span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: 3D INTERACTIVE CANVAS / MOBILE FALLBACK */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="lg:col-span-5 h-[420px] sm:h-[500px] w-full relative flex items-center justify-center"
        >
          {!isMobile ? (
            <Suspense fallback={
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 glass-panel rounded-3xl border border-cyan-500/20">
                <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                <span className="font-mono text-xs text-cyan-400 tracking-wider">LOADING 3D NODE CANVAS...</span>
              </div>
            }>
              <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
                <ambientLight intensity={0.8} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ffcc" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#8b5cf6" />
                <BlockchainNodeNetwork onOpenVote={onOpenVote} />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
              </Canvas>
            </Suspense>
          ) : (
            <div className="w-full h-full glass-panel rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="w-48 h-48 rounded-full border-2 border-dashed border-cyan-400/40 animate-spin flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-2 border-violet-500/50 flex items-center justify-center">
                  <ShieldCheck className="w-16 h-16 text-cyan-400 animate-pulse" />
                </div>
              </div>
              <span className="font-mono text-xs text-cyan-400 mt-6 tracking-widest uppercase">
                PoS Working Model Architecture Active
              </span>
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}
