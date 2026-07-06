import React, { useRef, useState } from "react";

interface GlassCardProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  glowColor?: "cyan" | "purple" | "pink" | "blue";
  onClick?: () => void;
}

export default function GlassCard({
  id,
  children,
  className = "",
  glowColor = "cyan",
  onClick,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [sheenX, setSheenX] = useState(50);
  const [sheenY, setSheenY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // mouse x relative to card
    const y = e.clientY - rect.top; // mouse y relative to card

    // Calculate rotation (-10deg to 10deg)
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotY = ((x - midX) / midX) * 10; // Left-Right rotation
    const rotX = -((y - midY) / midY) * 10; // Up-Down rotation

    setRotateX(rotX);
    setRotateY(rotY);

    // Calculate sheen position percentage
    const sX = (x / rect.width) * 100;
    const sY = (y / rect.height) * 100;
    setSheenX(sX);
    setSheenY(sY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Glow color classes mapping
  const glowShadowMap = {
    cyan: "hover:shadow-[0_0_30px_rgba(0,242,254,0.25)] hover:border-brand-cyan/40",
    purple: "hover:shadow-[0_0_30px_rgba(127,0,255,0.25)] hover:border-brand-purple/40",
    pink: "hover:shadow-[0_0_30px_rgba(255,0,127,0.25)] hover:border-brand-pink/40",
    blue: "hover:shadow-[0_0_30px_rgba(0,114,255,0.25)] hover:border-brand-blue/40",
  };

  const textGlowMap = {
    cyan: "border-t-brand-cyan/40",
    purple: "border-t-brand-purple/40",
    pink: "border-t-brand-pink/40",
    blue: "border-t-brand-blue/40",
  };

  const glowClass = glowShadowMap[glowColor];
  const borderTopClass = textGlowMap[glowColor];

  return (
    <div
      ref={cardRef}
      id={id}
      className={`glass-panel rounded-2xl relative overflow-hidden transition-all duration-200 ease-out ${glowClass} ${className} cursor-none`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${
          isHovered ? 1.025 : 1
        }, ${isHovered ? 1.025 : 1}, 1)`,
        transition: isHovered ? "none" : "all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Top micro glowing line */}
      <div className={`absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-right from-transparent via-current to-transparent opacity-40 ${borderTopClass}`} />

      {/* Glossy reflection/sheen overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.15 : 0,
          background: `radial-gradient(circle 120px at ${sheenX}% ${sheenY}%, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 80%)`,
          mixBlendMode: "overlay",
        }}
      />

      {/* Dynamic ambient grid background on hover */}
      <div
        className="absolute inset-0 pointer-events-none grid-mesh opacity-[0.03] transition-opacity duration-500"
        style={{ opacity: isHovered ? 0.08 : 0.03 }}
      />

      {/* Internal Content padding wrapper */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}
