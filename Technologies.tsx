import { motion } from "motion/react";
import SectionHeader from "../components/SectionHeader";
import GlassCard from "../components/GlassCard";
import { ShieldAlert, Cpu, Network, Binary, ShieldAlert as CyberShield, Zap, Radio } from "lucide-react";
import { TechItem } from "../types";

export default function Technologies() {
  const techItems: TechItem[] = [
    {
      id: "tech-1",
      name: "Quantum Cryptography",
      category: "SECURITY_PROTOCOL",
      description: "Harnessing entanglement and key distribution algorithms that make digital breaches mathematically impossible under post-quantum systems.",
      iconName: "Shield",
      glowColor: "cyan",
      stats: "99.9% SHIELD INTEGRITY",
    },
    {
      id: "tech-2",
      name: "Autonomous Neural Swarms",
      category: "SWARM_INTELLIGENCE",
      description: "Coordinating hundreds of independent micro-UAVs and robotic nodes using local swarm communication with zero cloud server dependency.",
      iconName: "Network",
      glowColor: "purple",
      stats: "0.2MS EDGE LATENCY",
    },
    {
      id: "tech-3",
      name: "LLM Fusion Reactors",
      category: "ARTIFICIAL_COGNITION",
      description: "Advanced generative models that integrate multimodal reasoning, code synthesis, and deep logic gates with dynamic parameter pruning.",
      iconName: "Cpu",
      glowColor: "pink",
      stats: "820B PARAM MATRIX",
    },
    {
      id: "tech-4",
      name: "Biosymbiotic Compute",
      category: "BIOMECHATRONICS",
      description: "Developing custom carbon-silicon neural nodes that synchronize live organic tissues with micro-circuit motherboard substrates.",
      iconName: "Binary",
      glowColor: "blue",
      stats: "92% ACCURACY MATCH",
    },
    {
      id: "tech-5",
      name: "Hyper-Dimensional Data Vectoring",
      category: "QUANTUM_GRID",
      description: "Storing complex, multi-modal database indices across hundreds of geometric dimensions to support instant cognitive searches.",
      iconName: "Zap",
      glowColor: "purple",
      stats: "15M OPS/SEC RATE",
    },
    {
      id: "tech-6",
      name: "Cryogenic Superconductors",
      category: "CORE_HARDWARE",
      description: "Constructing ultra-low resistance computing layers that function continuously at near absolute-zero temperatures for no-loss conduction.",
      iconName: "Radio",
      glowColor: "cyan",
      stats: "0.003 K TEMP MATRIX",
    },
  ];

  // Helper function to map string icon names to Lucide Icon components
  const renderIcon = (iconName: string, colorClass: string) => {
    const props = { className: `w-7 h-7 ${colorClass}` };
    switch (iconName) {
      case "Shield":
        return <CyberShield {...props} />;
      case "Network":
        return <Network {...props} />;
      case "Cpu":
        return <Cpu {...props} />;
      case "Binary":
        return <Binary {...props} />;
      case "Zap":
        return <Zap {...props} />;
      case "Radio":
        return <Radio {...props} />;
      default:
        return <Cpu {...props} />;
    }
  };

  const colorMap = {
    cyan: "text-brand-cyan",
    purple: "text-brand-purple",
    pink: "text-brand-pink",
    blue: "text-brand-blue",
  };

  const glowBgMap = {
    cyan: "bg-brand-cyan/5 border-brand-cyan/20",
    purple: "bg-brand-purple/5 border-brand-purple/20",
    pink: "bg-brand-pink/5 border-brand-pink/20",
    blue: "bg-brand-blue/5 border-brand-blue/20",
  };

  return (
    <section id="technologies" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background lights */}
      <div className="absolute top-[20%] left-[-10%] w-[300px] h-[300px] bg-brand-cyan/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-brand-purple/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          id="tech-header"
          badge="02 // COMPETITION FIELDS"
          title="CHOOSE YOUR CYBERNETIC"
          highlightedText="COMPETITIVE TRACK"
          subtitle="Compete with top industry specialists across six cutting-edge branches of future engineering and showcase your prototype."
        />

        {/* 3D Glass Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {techItems.map((tech, index) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard
                id={tech.id}
                glowColor={tech.glowColor}
                className="h-full flex flex-col p-6 sm:p-8"
              >
                {/* Header info */}
                <div className="flex justify-between items-start gap-4 mb-6">
                  <div className={`p-3 rounded-xl border ${glowBgMap[tech.glowColor]}`}>
                    {renderIcon(tech.iconName, colorMap[tech.glowColor])}
                  </div>
                  <span className="font-mono text-[9px] text-gray-500 tracking-widest uppercase">
                    //{tech.category}
                  </span>
                </div>

                {/* Body Content */}
                <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-3">
                  {tech.name}
                </h3>
                <p className="text-gray-400 font-sans text-xs sm:text-sm leading-relaxed mb-6 flex-1">
                  {tech.description}
                </p>

                {/* Footer Telemetry Stats Bar */}
                <div className="mt-auto pt-4 border-t border-white/5 flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                    <span>TELEMETRY METRIC</span>
                    <span className={`${colorMap[tech.glowColor]} font-bold`}>{tech.stats}</span>
                  </div>
                  <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "75%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: index * 0.15 }}
                      className={`h-full bg-gradient-to-r ${
                        tech.glowColor === "cyan"
                          ? "from-brand-cyan to-brand-blue"
                          : tech.glowColor === "purple"
                          ? "from-brand-purple to-brand-pink"
                          : tech.glowColor === "pink"
                          ? "from-brand-pink to-brand-purple"
                          : "from-brand-blue to-brand-cyan"
                      }`}
                    />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
