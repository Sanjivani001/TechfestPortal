import { motion } from "motion/react";
import SectionHeader from "../components/SectionHeader";
import GlassCard from "../components/GlassCard";
import { BrainCircuit, Atom, Bot, Sparkles } from "lucide-react";

export default function About() {
  const pillars = [
    {
      icon: <BrainCircuit className="w-6 h-6 text-brand-cyan" />,
      title: "Neural Synergy",
      desc: "Architecting the future of adaptive artificial intelligence where deep network algorithms dynamically sync with human cognition.",
      badge: "AI_NODE",
      color: "cyan" as const,
    },
    {
      icon: <Atom className="w-6 h-6 text-brand-purple" />,
      title: "Quantum Supremacy",
      desc: "Accelerating decryption, computational matrix operations, and complex simulations with true cryogenic multi-qubit systems.",
      badge: "Q_CORE",
      color: "purple" as const,
    },
    {
      icon: <Bot className="w-6 h-6 text-brand-pink" />,
      title: "Haptic Robotics",
      desc: "Forging biomechanical systems with adaptive muscle-wire actuators and tactile sensory gloves offering real-time kinetic feedback.",
      badge: "BIO_MECH",
      color: "pink" as const,
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[30%] right-[10%] w-[350px] h-[350px] bg-brand-pink/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-[250px] h-[250px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <SectionHeader
          id="about-header"
          badge="01 // ARCHITECTURE OVERVIEW"
          title="BRIDGING HUMANITY AND"
          highlightedText="QUANTUM COMPLEXITY"
          subtitle="Explore the paradigm shift where deep artificial neural intelligence meets sub-atomic cryogenic compute structures."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Brand Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-6 leading-snug">
              A Hyper-Collaborative Arena for Global Visionaries
            </h3>
            
            <p className="text-gray-300 font-sans text-sm sm:text-base leading-relaxed mb-6">
              Our futuristic Techfest is not just a standard series of coding competitions—it is a live sandbox of high-velocity breakthroughs. We bring together academic specialists, machine learning developers, and computational physicists inside a unified digital environment.
            </p>

            <p className="text-gray-300 font-sans text-sm sm:text-base leading-relaxed mb-8">
              Through scroll-driven interactive sandboxes, quantum simulation tests, and high-stakes robotics grand-prixs, we provide the ultimate staging ground for the next generation of global builders. Participate in the future, compile the impossible.
            </p>

            {/* Micro stats banner */}
            <div className="grid grid-cols-2 gap-4 bg-white/[0.02] border border-white/5 rounded-2xl p-6 backdrop-blur-md">
              <div className="flex flex-col">
                <span className="font-mono text-xs text-brand-cyan mb-1">STATION CORE</span>
                <span className="font-display text-xl font-bold text-white flex items-center gap-1.5">
                  APERION DOME
                  <Sparkles className="w-4 h-4 text-brand-pink animate-pulse" />
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs text-brand-purple mb-1">EVENT TYPE</span>
                <span className="font-display text-xl font-bold text-white">FULLY HYBRID 3D</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Pillars Bento Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 gap-6">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
              >
                <GlassCard
                  id={`pillar-card-${idx}`}
                  glowColor={pillar.color}
                  className="p-6 sm:p-8 flex items-start gap-5 sm:gap-6"
                >
                  <div className="p-3 bg-white/[0.03] border border-white/10 rounded-xl relative overflow-hidden shrink-0">
                    {pillar.icon}
                    {/* Ring highlight */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h4 className="font-display text-lg sm:text-xl font-bold text-white">
                        {pillar.title}
                      </h4>
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400">
                        {pillar.badge}
                      </span>
                    </div>
                    <p className="text-gray-400 font-sans text-xs sm:text-sm leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
