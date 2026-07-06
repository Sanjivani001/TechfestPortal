import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SectionHeader from "../components/SectionHeader";
import GlassCard from "../components/GlassCard";
import { ExternalLink, Layers, Eye, Code, Zap } from "lucide-react";
import { GalleryProject } from "../types";

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  const categories = ["ALL", "QUANTUM AI", "ROBOTICS", "CYBER NETWORKS"];

  const projects: GalleryProject[] = [
    {
      id: "project-1",
      title: "Holographic Neural Visualizer",
      category: "QUANTUM AI",
      description: "A real-time 3D web-renderer projecting deep-learning parameter connections in a spherical particle canvas.",
      imageSeed: "ai-neuro",
      link: "#",
    },
    {
      id: "project-2",
      title: "Haptic Micro-Actuator Arm",
      category: "ROBOTICS",
      description: "Adaptive biomechanical robotic arm utilizing custom carbon-fiber tendons and fluidic artificial muscles.",
      imageSeed: "robot-arm",
      link: "#",
    },
    {
      id: "project-3",
      title: "Multi-Qubit Cryo-Grid Sim",
      category: "QUANTUM AI",
      description: "Low-latency browser simulation of cryogenic quantum circuits modeling up to 32 virtual qubits.",
      imageSeed: "quantum-cryo",
      link: "#",
    },
    {
      id: "project-4",
      title: "Swarm Drone Flight Engine",
      category: "ROBOTICS",
      description: "Local micro-mesh networking algorithm maintaining precise spatial bounds for hundreds of mini-UAVs.",
      imageSeed: "drone-swarm",
      link: "#",
    },
    {
      id: "project-5",
      title: "Post-Quantum Cryptographic Guard",
      category: "CYBER NETWORKS",
      description: "Lattice-based file encryption tunnel secure against multi-qubit cryptographic decryption attacks.",
      imageSeed: "post-quantum",
      link: "#",
    },
    {
      id: "project-6",
      title: "Synaptic Brain-Interface Link",
      category: "CYBER NETWORKS",
      description: "Wearable non-invasive EEG band syncing real-time alpha wave surges into custom WebGL canvases.",
      imageSeed: "brain-link",
      link: "#",
    },
  ];

  const filteredProjects =
    activeFilter === "ALL"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  // Custom visual abstract procedural backdrops based on project seeds
  const renderProjectBackdrop = (seed: string) => {
    switch (seed) {
      case "ai-neuro":
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/20 to-brand-purple/20 flex items-center justify-center overflow-hidden">
            <div className="w-[120px] h-[120px] rounded-full border border-brand-cyan/30 animate-[spin_10s_linear_infinite] flex items-center justify-center">
              <div className="w-[80px] h-[80px] rounded-full border border-dashed border-brand-purple/40 animate-[spin_6s_linear_infinite_reverse]" />
            </div>
            <Layers className="w-8 h-8 text-white/40 absolute" />
          </div>
        );
      case "robot-arm":
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/20 to-brand-purple/20 flex items-center justify-center overflow-hidden">
            <div className="w-[130px] h-[80px] border border-brand-pink/30 rounded-lg rotate-12 flex items-center justify-center">
              <div className="w-[90px] h-[40px] border border-dashed border-brand-purple/40 rounded-lg -rotate-12" />
            </div>
            <Zap className="w-8 h-8 text-white/40 absolute" />
          </div>
        );
      case "quantum-cryo":
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-brand-cyan/20 flex items-center justify-center overflow-hidden">
            <div className="w-[110px] h-[110px] rounded-full border border-brand-blue/30 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-brand-cyan animate-ping absolute" />
              <div className="w-[60px] h-[60px] rounded-full border border-brand-cyan/40 border-dotted animate-[spin_15s_linear_infinite]" />
            </div>
            <Eye className="w-8 h-8 text-white/40 absolute" />
          </div>
        );
      case "drone-swarm":
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/20 to-brand-pink/20 flex items-center justify-center overflow-hidden">
            <div className="absolute top-4 left-6 w-3 h-3 rounded-full bg-brand-cyan animate-pulse" />
            <div className="absolute bottom-6 right-8 w-4 h-4 rounded-full bg-brand-pink animate-pulse" />
            <div className="absolute top-10 right-10 w-2 h-2 rounded-full bg-brand-purple animate-pulse" />
            <div className="w-[120px] h-[120px] border border-dashed border-white/10 rounded-full flex items-center justify-center" />
            <Code className="w-8 h-8 text-white/40 absolute" />
          </div>
        );
      case "post-quantum":
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 to-brand-blue/20 flex items-center justify-center overflow-hidden">
            <div className="w-[90px] h-[90px] border-2 border-brand-purple/30 rounded-lg rotate-45 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-brand-blue" />
            </div>
            <Layers className="w-8 h-8 text-white/40 absolute" />
          </div>
        );
      case "brain-link":
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/20 to-brand-cyan/20 flex items-center justify-center overflow-hidden">
            <svg className="w-[140px] h-[50px] stroke-brand-pink/40 fill-none" viewBox="0 0 100 30">
              <path d="M0 15 Q25 5, 50 15 T100 15" strokeWidth="1" className="animate-[pulse-glow_4s_ease-in-out_infinite]" />
              <path d="M0 15 Q25 25, 50 15 T100 15" strokeWidth="1" className="animate-[pulse-glow_3s_ease-in-out_infinite_reverse]" />
            </svg>
            <Zap className="w-8 h-8 text-white/40 absolute" />
          </div>
        );
      default:
        return (
          <div className="absolute inset-0 bg-white/[0.02] flex items-center justify-center">
            <Layers className="w-8 h-8 text-white/20" />
          </div>
        );
    }
  };

  return (
    <section id="gallery" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute bottom-[10%] left-[-10%] w-[350px] h-[350px] bg-brand-pink/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          id="gallery-header"
          badge="05 // PROTOTYPE SHOWCASE"
          title="FUTURISTIC SANDBOX"
          highlightedText="PORTFOLIO CREATIONS"
          subtitle="Explore award-winning applications and biomechanical hardware architectures designed and submitted in past sprints."
        />

        {/* Filter badging row */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 sm:mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 rounded-full font-mono text-xs tracking-wider transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-gradient-to-r from-brand-cyan to-brand-purple text-white shadow-[0_0_15px_rgba(0,242,254,0.3)] border-transparent"
                  : "bg-white/[0.03] text-gray-400 hover:text-white border border-white/5 hover:border-white/10 hover:bg-white/[0.06]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Gallery Grid with AnimatePresence */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <GlassCard
                  id={project.id}
                  glowColor={index % 3 === 0 ? "cyan" : index % 3 === 1 ? "purple" : "pink"}
                  className="h-full flex flex-col group overflow-hidden"
                >
                  {/* Aspect-ratio procedural graphic container */}
                  <div className="relative aspect-video w-full overflow-hidden border-b border-white/5">
                    {renderProjectBackdrop(project.imageSeed)}
                    
                    {/* Hover actions panel overlay */}
                    <div className="absolute inset-0 bg-bg-dark/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <a
                        href={project.link}
                        className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:text-brand-cyan hover:border-brand-cyan/40 hover:bg-white/10 transition-all hover:scale-110"
                      >
                        <Eye className="w-5 h-5" />
                      </a>
                      <a
                        href={project.link}
                        className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:text-brand-pink hover:border-brand-pink/40 hover:bg-white/10 transition-all hover:scale-110"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                  {/* Text card content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-[9px] text-brand-purple tracking-wider block mb-2 uppercase">
                        //{project.category}
                      </span>
                      <h4 className="font-display text-lg font-bold text-white mb-2 group-hover:text-brand-cyan transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-gray-400 font-sans text-xs sm:text-sm leading-relaxed mb-4">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-gray-500">
                      <span>STATUS: ARCHIVED</span>
                      <span className="text-gray-400 font-bold group-hover:text-brand-pink transition-colors">
                        VIEW FILES →
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
