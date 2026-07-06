import { motion } from "motion/react";
import SectionHeader from "../components/SectionHeader";
import GlassCard from "../components/GlassCard";
import { Server, Trophy, Users, Award, LineChart } from "lucide-react";
import { FeatureItem } from "../types";

export default function Features() {
  const features: FeatureItem[] = [
    {
      id: "feature-1",
      title: "Supercomputer Host Clusters",
      description: "Direct sandbox connection to state-of-the-art supercomputers running A100/H100 tensor cores for zero-friction model training.",
      iconName: "Server",
      metric: "500 TFLOPS",
      metricLabel: "ALLOCATED COMPUTE",
    },
    {
      id: "feature-2",
      title: "Realtime Evaluating Sandbox",
      description: "Submit code models and instantly monitor your score rank on our high-performance interactive sandbox leaderboard.",
      iconName: "Trophy",
      metric: "0.4 SEC",
      metricLabel: "COMPILER EXECUTION",
    },
    {
      id: "feature-3",
      title: "Titan Panel Mentors",
      description: "Receive direct, live architectural critique from leading scientists, core system maintainers, and executive engineering heads.",
      iconName: "Users",
      metric: "80+",
      metricLabel: "TITAN PANEL GUESTS",
    },
    {
      id: "feature-4",
      title: "Ecosystem Patent Grants",
      description: "Outstanding, novel algorithmic entries receive full legal and patent filing backing alongside funding incubator opportunities.",
      iconName: "Award",
      metric: "$250K",
      metricLabel: "PATENT FUNDING CAP",
    },
  ];

  const renderIcon = (name: string) => {
    const props = { className: "w-6 h-6 text-brand-pink" };
    switch (name) {
      case "Server":
        return <Server {...props} />;
      case "Trophy":
        return <Trophy {...props} />;
      case "Users":
        return <Users {...props} />;
      case "Award":
        return <Award {...props} />;
      default:
        return <LineChart {...props} />;
    }
  };

  return (
    <section id="features" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-[40%] right-[-15%] w-[450px] h-[450px] bg-brand-cyan/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <SectionHeader
          id="features-header"
          badge="03 // INFRASTRUCTURE CORES"
          title="THE FINEST SANDBOX"
          highlightedText="ENGINEERING AMENITIES"
          subtitle="Equipping our competitors with premium industrial resources, high-grade silicon, and real-time computing setups."
        />

        {/* Asymmetric Assembled Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Large Hero Feature Panel - occupying 5 columns */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <GlassCard
              id="feature-hero"
              glowColor="pink"
              className="h-full p-8 md:p-10 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs text-brand-pink tracking-widest uppercase block mb-3">
                  [ WORLD CLASS STANDARDS ]
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
                  High-Throughput Cyber Infrastructure
                </h3>
                <p className="text-gray-400 font-sans text-sm sm:text-base leading-relaxed mb-6">
                  We maintain a dedicated, physical server matrix in our Aperion Dome to guarantee continuous processing speeds and fully immersive, high-frequency render streams for our 3D interactive sandboxes.
                </p>
                <ul className="space-y-3 font-mono text-xs text-gray-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-pink" />
                    Cryogenic-liquid cooling systems
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-pink" />
                    Post-quantum network lines
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-pink" />
                    Dedicated redundant power grid
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-display text-4xl font-extrabold text-white text-glow-purple">
                    99.99%
                  </div>
                  <div className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mt-1">
                    SERVER UPTIME GUARANTEE
                  </div>
                </div>
                <div className="p-4 bg-brand-pink/5 border border-brand-pink/25 rounded-full animate-pulse-glow">
                  <Server className="w-6 h-6 text-brand-pink" />
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Features grid - occupying 7 columns */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {features.map((feat, index) => (
              <motion.div
                key={feat.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <GlassCard
                  id={feat.id}
                  glowColor="cyan"
                  className="p-6 md:p-8 h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 bg-white/[0.03] border border-white/10 rounded-xl">
                        {renderIcon(feat.iconName)}
                      </div>
                      <span className="font-mono text-[9px] text-gray-500">
                        METRIC_STREAMS
                      </span>
                    </div>

                    <h4 className="font-display text-lg font-bold text-white mb-2">
                      {feat.title}
                    </h4>
                    <p className="text-gray-400 font-sans text-xs sm:text-sm leading-relaxed mb-6">
                      {feat.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <div className="font-display text-2xl font-bold text-brand-cyan">
                      {feat.metric}
                    </div>
                    <div className="font-mono text-[8px] text-gray-500 tracking-wider mt-0.5">
                      {feat.metricLabel}
                    </div>
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
