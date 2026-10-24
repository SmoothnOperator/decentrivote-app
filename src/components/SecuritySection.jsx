import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshWobbleMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Shield, Lock, Key, CheckCircle, AlertTriangle, EyeOff, Layers } from 'lucide-react';
import * as THREE from 'three';

// 3D SHIELD / HOLOGRAPHIC VAULT CANVAS
function SecurityShield3D() {
  const outerMeshRef = useRef();
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.y += delta * 0.5;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.3;
      ringRef.current.rotation.z -= delta * 0.2;
    }
  });

  return (
    <group scale={1.1}>
      {/* 3D Holographic Vault Sphere / Shield Core */}
      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1}>
        <mesh ref={outerMeshRef}>
          <octahedronGeometry args={[2, 0]} />
          <MeshWobbleMaterial
            factor={0.2}
            speed={2}
            color="#06b6d4"
            emissive="#0284c7"
            emissiveIntensity={2}
            roughness={0.1}
            wireframe
          />
        </mesh>
      </Float>

      {/* Orbiting Security Shield Ring */}
      <group ref={ringRef}>
        <mesh>
          <torusGeometry args={[2.8, 0.04, 16, 100]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#7c3aed" emissiveIntensity={2} />
        </mesh>
      </group>
    </group>
  );
}

const FEATURES = [
  {
    icon: Lock,
    title: "Proof-of-Stake Consensus",
    description: "Validators stake digital assets to propose blocks. Malicious double-signing triggers an automated 50% stake-slashing penalty.",
    tag: "Financial Slashing Guarantee"
  },
  {
    icon: EyeOff,
    title: "Zero-Knowledge Anonymity",
    description: "Voter identity is decoupled from candidate selection using cryptographic nullifiers. Your vote cannot be linked back to you.",
    tag: "ECDSA + HMAC SHA-256"
  },
  {
    icon: Layers,
    title: "Merkle Tree Auditability",
    description: "Every block builds a cryptographic Merkle root. Voters receive receipts to independently verify vote inclusion on-chain.",
    tag: "Receipt Proof Hash"
  },
  {
    icon: Shield,
    title: "Immutable P2P Topology",
    description: "Distributed across election authorities, university auditors, and civil watchdog nodes. Zero single point of failure.",
    tag: "Multi-Node Mesh"
  }
];

export default function SecuritySection({ onOpenVerify }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="security" className="py-24 relative overflow-hidden bg-[#070b14]">
      {/* BACKGROUND ACCENT LIGHTING */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: 3D SHIELD CANVAS OR MOBILE FALLBACK */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 h-[400px] w-full relative flex items-center justify-center"
          >
            {!isMobile ? (
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center glass-panel rounded-3xl">
                  <span className="font-mono text-xs text-cyan-400">LOADING SECURITY VAULT...</span>
                </div>
              }>
                <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
                  <ambientLight intensity={0.8} />
                  <pointLight position={[10, 10, 10]} intensity={2} color="#00ffcc" />
                  <SecurityShield3D />
                </Canvas>
              </Suspense>
            ) : (
              <div className="w-full h-full glass-panel rounded-3xl p-8 flex flex-col items-center justify-center">
                <Shield className="w-24 h-24 text-cyan-400 animate-pulse mb-4" />
                <span className="font-mono text-xs text-cyan-400">PoS Vault Active</span>
              </div>
            )}
          </motion.div>

          {/* RIGHT COLUMN: SECURITY FEATURES */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono font-semibold text-violet-400 mb-4"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>CRYPTOGRAPHIC TRUST FRAMEWORK</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white"
              >
                Engineered for Absolute <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400">
                  Civic & Cryptographic Trust
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-slate-400 text-base sm:text-lg mt-4 font-body"
              >
                Traditional voting systems rely on human trust. DecentriVote replaces centralized authorities with mathematical guarantees.
              </motion.p>
            </div>

            {/* 4 FEATURE CARDS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FEATURES.map((feat, idx) => {
                const IconComp = feat.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                          <IconComp className="w-5 h-5 text-cyan-400" />
                        </div>
                        <h3 className="font-heading font-bold text-base text-white">{feat.title}</h3>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed font-body mb-4">
                        {feat.description}
                      </p>
                    </div>

                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20 w-fit">
                      {feat.tag}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* VERIFY BUTTON */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="pt-2"
            >
              <button
                onClick={onOpenVerify}
                className="px-6 py-3.5 rounded-xl font-heading font-semibold text-sm text-white bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 flex items-center gap-3 cursor-pointer shadow-lg shadow-cyan-950/30 group"
              >
                <Shield className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
                <span>Test Receipt Auditor on Chain</span>
              </button>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
