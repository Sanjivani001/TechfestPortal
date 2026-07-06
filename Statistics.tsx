import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import SectionHeader from "../components/SectionHeader";
import GlassCard from "../components/GlassCard";
import { StatItem } from "../types";

// Custom high-performance count up hook
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 1500; // milliseconds
    const frameRate = 1000 / 60; // 60 FPS
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quad
      const current = Math.round(end * (progress * (2 - progress)));
      
      setCount(current);

      if (frame >= totalFrames) {
        clearInterval(timer);
        setCount(end);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-display font-extrabold text-white text-3xl sm:text-4xl md:text-5xl text-glow-cyan tracking-tight">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Statistics() {
  const stats: StatItem[] = [
    {
      id: "stat-1",
      value: 14500,
      suffix: "+",
      label: "Nominated Squads",
      subLabel: "Global applicants registered for the sandbox sprints.",
      color: "#00f2fe", // cyan
    },
    {
      id: "stat-2",
      value: 128,
      suffix: " QUBITS",
      label: "Supercomputer Power",
      subLabel: "Real-time cryogenic qubit clusters unlocked for finalists.",
      color: "#7f00ff", // purple
    },
    {
      id: "stat-3",
      value: 250,
      suffix: "K+",
      label: "Venture Prize Pool",
      subLabel: "Direct seed investments, cloud credits, and cash awards.",
      color: "#ff007f", // pink
    },
    {
      id: "stat-4",
      value: 94,
      suffix: "%",
      label: "Placement Rate",
      subLabel: "Competitors contracted by sovereign research agencies.",
      color: "#0072ff", // blue
    },
  ];

  return (
    <section id="statistics" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-[30%] left-[-15%] w-[400px] h-[400px] bg-brand-purple/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <SectionHeader
          id="stats-header"
          badge="05 // TELEMETRY DATA"
          title="METRIC DATA AND RUNTIME"
          highlightedText="RECOGNITION"
          subtitle="Reviewing the massive computational scale, prize valuations, and global placement rates established by the platform."
        />

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, idx) => {
            // Circle calculations for vector SVG dial loader
            const radius = 50;
            const circ = 2 * Math.PI * radius; // 314.15
            const percentage = stat.id === "stat-4" ? 94 : stat.id === "stat-3" ? 85 : stat.id === "stat-2" ? 70 : 90;
            const strokeOffset = circ - (percentage / 100) * circ;

            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
              >
                <GlassCard
                  id={stat.id}
                  glowColor={idx === 0 ? "cyan" : idx === 1 ? "purple" : idx === 2 ? "pink" : "blue"}
                  className="p-6 md:p-8 flex flex-col justify-between h-full relative"
                >
                  {/* Decorative background grid mesh inside each card */}
                  <div className="absolute inset-0 pointer-events-none grid-mesh opacity-10" />

                  {/* Circle SVG Dial and Metric Layout */}
                  <div className="flex justify-between items-start gap-4 mb-6 relative z-10">
                    <div className="flex flex-col">
                      <span className="font-mono text-[9px] text-gray-500 tracking-wider uppercase mb-2">
                        //DIAL_LOADER_ID_{idx + 1}
                      </span>
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>

                    {/* Highly polished dynamic SVG Circular Loader */}
                    <div className="relative w-16 h-16 shrink-0">
                      <svg className="w-full h-full -rotate-90">
                        {/* Background structural track */}
                        <circle
                          cx="32"
                          cy="32"
                          r={24}
                          className="stroke-white/[0.04] fill-none"
                          strokeWidth="3.5"
                        />
                        {/* Glowing progress ring */}
                        <motion.circle
                          cx="32"
                          cy="32"
                          r={24}
                          className="fill-none"
                          strokeWidth="3.5"
                          stroke={stat.color}
                          strokeLinecap="round"
                          initial={{ strokeDashoffset: circ }}
                          whileInView={{ strokeDashoffset: strokeOffset }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: idx * 0.1 }}
                          style={{
                            strokeDasharray: circ,
                          }}
                        />
                      </svg>
                      {/* Percent text center label */}
                      <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] text-gray-400 font-bold">
                        {percentage}%
                      </span>
                    </div>
                  </div>

                  {/* Meta descriptions */}
                  <div className="relative z-10">
                    <h4 className="font-display text-base font-bold text-white mb-2">
                      {stat.label}
                    </h4>
                    <p className="text-gray-400 font-sans text-xs sm:text-sm leading-relaxed">
                      {stat.subLabel}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
