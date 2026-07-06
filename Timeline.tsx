import { motion } from "motion/react";
import SectionHeader from "../components/SectionHeader";
import GlassCard from "../components/GlassCard";
import { CheckCircle2, PlayCircle, Hourglass } from "lucide-react";
import { RoadmapMilestone } from "../types";

export default function Timeline() {
  const milestones: RoadmapMilestone[] = [
    {
      id: "stage-1",
      quarter: "STAGE 01 // JULY 10",
      title: "Global Registration Open",
      description: "Nomination gates initialize globally. Developers secure access credentials and set up their team profile on our secure quantum registry dashboard.",
      status: "completed",
      phase: "PHASE_INITIALIZATION",
    },
    {
      id: "stage-2",
      quarter: "STAGE 02 // AUG 24",
      title: "Algorithmic Qualifying Sandbox",
      description: "Qualifying sandboxes activate. Teams submit initial algorithmic prototypes, which are analyzed live by the automated testing cluster.",
      status: "active",
      phase: "PHASE_EVALUATION",
    },
    {
      id: "stage-3",
      quarter: "STAGE 03 // SEPT 15",
      title: "Hybrid Hackathon Sprint",
      description: "A continuous 72-hour virtual and physical sprinting window inside our Aperion Dome. Dedicated supercomputing credits unlock.",
      status: "planned",
      phase: "PHASE_CRUCIBLE",
    },
    {
      id: "stage-4",
      quarter: "STAGE 04 // OCT 02",
      title: "Aperion Grand Finale Gala",
      description: "The top 10 engineering squads present live simulations inside the virtual 3D theater before our executive judging panel.",
      status: "planned",
      phase: "PHASE_CONVERGENCE",
    },
    {
      id: "stage-5",
      quarter: "STAGE 05 // NOV 12",
      title: "Ecosystem Venture Launchpad",
      description: "Winning teams are inducted into the high-velocity startup incubator, receiving legal incorporation, patent protection, and pre-seed investment.",
      status: "planned",
      phase: "PHASE_EXPANSION",
    },
  ];

  const renderStatus = (status: RoadmapMilestone["status"]) => {
    switch (status) {
      case "completed":
        return (
          <span className="flex items-center gap-1.5 font-mono text-[9px] text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            COMPLETED
          </span>
        );
      case "active":
        return (
          <span className="flex items-center gap-1.5 font-mono text-[9px] text-brand-pink bg-brand-pink/10 border border-brand-pink/20 px-2 py-0.5 rounded-full animate-pulse">
            <PlayCircle className="w-3 h-3" />
            LIVE RUNNING
          </span>
        );
      case "planned":
        return (
          <span className="flex items-center gap-1.5 font-mono text-[9px] text-gray-500 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
            <Hourglass className="w-3 h-3" />
            SCHEDULED
          </span>
        );
    }
  };

  return (
    <section id="timeline" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background radial glowing gradients */}
      <div className="absolute top-[20%] left-[5%] w-[350px] h-[350px] bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[300px] h-[300px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          id="timeline-header"
          badge="04 // ROADMAP PROTOCOL"
          title="COMPETITION FLOW AND"
          highlightedText="CHRONOLOGY"
          subtitle="Follow the systematic milestones designed to transition raw coding potential into production-ready startups."
        />

        {/* Timeline representation */}
        <div className="relative mt-16 max-w-4xl mx-auto">
          {/* Central Vertical Connector Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-brand-cyan via-brand-purple to-white/5 -translate-x-[0.75px] md:-translate-x-1/2" />

          {/* Timeline Nodes */}
          <div className="space-y-12 sm:space-y-16">
            {milestones.map((milestone, idx) => {
              const isEven = idx % 2 === 0;
              const isCompleted = milestone.status === "completed";
              const isActive = milestone.status === "active";

              return (
                <div
                  key={milestone.id}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  {/* Glowing Node Marker on central line */}
                  <div
                    className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full -translate-x-[7px] md:-translate-x-2 z-20 transition-all duration-300 ${
                      isCompleted
                        ? "bg-brand-cyan border-2 border-bg-dark scale-110 glow-cyan"
                        : isActive
                        ? "bg-brand-pink border-2 border-bg-dark scale-125 glow-pink animate-pulse"
                        : "bg-gray-700 border-2 border-bg-dark"
                    }`}
                    style={{ top: "24px" }}
                  />

                  {/* Glass Card Container */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40, y: 15 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: idx * 0.1 }}
                    className={`w-full pl-12 md:pl-0 md:w-[45%] ${
                      isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                    }`}
                  >
                    <GlassCard
                      id={milestone.id}
                      glowColor={isActive ? "pink" : isCompleted ? "cyan" : "blue"}
                      className="p-6 sm:p-8"
                    >
                      {/* Quarter and stage badges */}
                      <div
                        className={`flex flex-wrap items-center gap-3 mb-3 ${
                          isEven ? "md:justify-end" : "md:justify-start"
                        }`}
                      >
                        <span className="font-mono text-xs text-brand-purple font-semibold">
                          {milestone.quarter}
                        </span>
                        {renderStatus(milestone.status)}
                      </div>

                      {/* Header text */}
                      <h4 className="font-display text-lg sm:text-xl font-bold text-white mb-2">
                        {milestone.title}
                      </h4>

                      {/* Detail text */}
                      <p className="text-gray-400 font-sans text-xs sm:text-sm leading-relaxed mb-4">
                        {milestone.description}
                      </p>

                      {/* Phase sub-badge */}
                      <div
                        className={`flex ${isEven ? "md:justify-end" : "md:justify-start"}`}
                      >
                        <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded">
                          //{milestone.phase}
                        </span>
                      </div>
                    </GlassCard>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
