import { motion } from "motion/react";

interface SectionHeaderProps {
  id: string;
  badge: string;
  title: string;
  highlightedText: string;
  subtitle: string;
  alignment?: "left" | "center";
}

export default function SectionHeader({
  id,
  badge,
  title,
  highlightedText,
  subtitle,
  alignment = "center",
}: SectionHeaderProps) {
  const isCenter = alignment === "center";

  return (
    <div
      id={id}
      className={`flex flex-col mb-12 sm:mb-16 md:mb-20 ${
        isCenter ? "items-center text-center max-w-2xl mx-auto" : "items-start text-left max-w-xl"
      }`}
    >
      {/* Small futuristic badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2 mb-3 font-mono text-xs tracking-[0.25em] text-brand-cyan uppercase"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse glow-cyan" />
        <span>[ {badge} ]</span>
      </motion.div>

      {/* Primary display heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight"
      >
        {title}{" "}
        <span className="bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink bg-clip-text text-transparent text-glow-cyan">
          {highlightedText}
        </span>
      </motion.h2>

      {/* Futuristic decorative separator line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`h-[1px] w-24 bg-gradient-to-r from-brand-cyan to-brand-purple mb-4 origin-left`}
        style={{ originX: isCenter ? 0.5 : 0 }}
      />

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-gray-400 font-sans text-sm sm:text-base leading-relaxed"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}
