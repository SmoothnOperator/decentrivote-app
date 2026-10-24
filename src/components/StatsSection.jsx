import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { motion, useInView } from 'framer-motion';
import { Vote, Server, Blocks, Coins, Activity, TrendingUp } from 'lucide-react';
import * as THREE from 'three';

// BACKGROUND SUBTLE 3D NODE-GRAPH NETWORK VISUALIZER
function BackgroundNodeGraph() {
  const pointsRef = useRef();

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.1;
      pointsRef.current.rotation.x += delta * 0.05;
    }
  });

  const points = React.useMemo(() => {
    const p = [];
    for (let i = 0; i < 60; i++) {
      p.push(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 12
      );
    }
    return new Float32Array(p);
  }, []);

  return (
    <group ref={pointsRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length / 3}
            array={points}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          color="#06b6d4"
          transparent
          opacity={0.7}
          sizeAttenuation
        />
      </points>

      <Sparkles count={40} scale={12} size={2} speed={0.3} color="#8b5cf6" />
    </group>
  );
}

// ANIMATED COUNTER COMPONENT
function Counter({ value, target, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseInt(target, 10);
    const increment = end / (duration * 60);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

const STATS = [
  {
    icon: Vote,
    target: "1482910",
    label: "Total Votes Cast",
    color: "from-cyan-500 to-blue-500",
    textColor: "text-cyan-400",
    suffix: "+"
  },
  {
    icon: Server,
    target: "4096",
    label: "Active Consensus Nodes",
    color: "from-blue-500 to-violet-500",
    textColor: "text-blue-400",
    suffix: ""
  },
  {
    icon: Blocks,
    target: "892140",
    label: "Blocks Sealed & Mined",
    color: "from-violet-500 to-fuchsia-500",
    textColor: "text-violet-400",
    suffix: ""
  },
  {
    icon: Coins,
    target: "12500000",
    label: "Total Staked Tokens",
    color: "from-emerald-400 to-teal-500",
    textColor: "text-emerald-400",
    suffix: " 🪙"
  }
];

export default function StatsSection() {
  return (
    <section id="live-stats" className="py-24 relative overflow-hidden bg-[#050811] border-y border-slate-800/80">
      
      {/* 3D SUBTLE BACKGROUND CANVAS */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <BackgroundNodeGraph />
          </Canvas>
        </Suspense>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono font-semibold text-emerald-400 mb-4"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>REAL-TIME MAINNET TELEMETRY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white"
          >
            Live Decentralized Network Metrics
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg mt-4 font-body"
          >
            Audited live performance metrics powered by our globally distributed Proof-of-Stake consensus engine.
          </motion.p>
        </div>

        {/* 4 STATS CARDS WITH ANIMATED COUNTERS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="glass-card rounded-2xl p-6 relative overflow-hidden group hover:border-slate-700"
              >
                {/* ICON & BADGE */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} p-[1px] shadow-lg`}>
                    <div className="w-full h-full bg-[#0a0f1d] rounded-[11px] flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> Live
                  </span>
                </div>

                {/* ANIMATED COUNTER VALUE */}
                <div className={`font-heading font-extrabold text-3xl sm:text-4xl ${stat.textColor} mb-2 tracking-tight`}>
                  <Counter target={stat.target} />
                  <span>{stat.suffix}</span>
                </div>

                {/* LABEL */}
                <p className="text-slate-400 text-sm font-medium font-body">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* NETWORK AUDIT STATUS PILL */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl glass-panel border border-slate-800 text-xs font-mono text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse-glow" />
            <span>Consensus State: <strong className="text-emerald-400 font-semibold">100% Synchronized</strong></span>
            <span className="text-slate-600">|</span>
            <span>Average Block Time: <strong className="text-cyan-400 font-semibold">1.18s</strong></span>
          </div>
        </div>

      </div>
    </section>
  );
}
