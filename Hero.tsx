import { motion } from "motion/react";
import Core3D from "../components/Core3D";
import { Terminal, Cpu, ArrowRight } from "lucide-react";

export default function Hero() {
  const localTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 pb-12 overflow-hidden"
    >
      {/* Decorative backdrop glows */}
      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-brand-cyan/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[5%] w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-mesh opacity-20 pointer-events-none z-0" />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left text column */}
        <div className="lg:col-span-7 flex flex-col justify-center items-start text-left">
          
          {/* Cyber status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-cyan/5 border border-brand-cyan/30 mb-6 font-mono text-xs text-brand-cyan tracking-wider"
          >
            <Cpu className="w-3.5 h-3.5 animate-spin-slow" />
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-ping" />
            <span>NEXUS CENTRAL STAGE IS LIVE</span>
            <span className="opacity-40">|</span>
            <span className="text-gray-400">{localTime}</span>
          </motion.div>

          {/* Animated Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-none mb-6"
          >
            THE QUANTUM
            <span className="block mt-1 bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink bg-clip-text text-transparent text-glow-cyan">
              TECHFEST PORTAL
            </span>
          </motion.h1>

          {/* Elegant short description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-300 font-sans text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-8"
          >
            Step into an immersive 3D digital ecosystem of breakthrough algorithms, interactive neural networks, and high-performance robotics. Join over 25,000+ top tech developers shaping human-AI collaboration.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#contact"
              className="group relative flex items-center justify-center gap-2 bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink p-[1px] rounded-xl transition-transform hover:scale-105 duration-300 active:scale-95"
            >
              <div className="bg-bg-dark hover:bg-transparent transition-colors duration-300 w-full h-full px-8 py-4 rounded-[11px] flex items-center justify-center gap-2 font-display font-medium text-white tracking-wide">
                <span>SECURE NOMINATION</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </a>

            <a
              href="#about"
              className="flex items-center justify-center gap-2 border border-white/15 hover:border-brand-cyan/40 hover:bg-brand-cyan/5 backdrop-blur-md px-8 py-4 rounded-xl font-display font-medium text-gray-300 hover:text-white tracking-wide transition-all duration-300 hover:scale-105"
            >
              <Terminal className="w-4 h-4 text-brand-cyan" />
              <span>EXPLORE LOGS</span>
            </a>
          </motion.div>

          {/* Core telemetry details */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-white/5 pt-8 w-full font-mono text-[10px] text-gray-400"
          >
            <div>
              <div className="text-gray-500 uppercase tracking-wider mb-1">COMPILATION ENGINE</div>
              <div className="text-brand-cyan font-semibold">WEBGL_3D_CORE_v2.8</div>
            </div>
            <div>
              <div className="text-gray-500 uppercase tracking-wider mb-1">LATENCY BANDWIDTH</div>
              <div className="text-brand-purple font-semibold">60 FPS // 1.2MS JITTER</div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="text-gray-500 uppercase tracking-wider mb-1">LOCATION TARGET</div>
              <div className="text-brand-pink font-semibold">VIRTUAL APERION DOME</div>
            </div>
          </motion.div>
          
        </div>

        {/* Right 3D reactor column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center items-center relative min-h-[380px] sm:min-h-[460px] lg:min-h-auto w-full"
        >
          <Core3D />
        </motion.div>
        
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 font-mono text-[9px] text-gray-500 tracking-[0.3em] cursor-none"
      >
        <span>SCROLL DOWN</span>
        <div className="w-[1.5px] h-6 bg-gradient-to-b from-brand-cyan to-transparent" />
      </motion.div>
    </section>
  );
}
