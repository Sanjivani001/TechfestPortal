import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const mainCursorRef = useRef<HTMLDivElement>(null);
  const secondaryCursorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Position references
  const mousePos = useRef({ x: 0, y: 0 });
  const mainCursorPos = useRef({ x: 0, y: 0 });
  const secondaryCursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Track hovers
    const setupHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input, select, textarea, [role="button"], .interactive-hover'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovered(true));
        el.addEventListener("mouseleave", () => setIsHovered(false));
      });
    };

    // Run periodically to catch dynamically loaded items
    const hoverInterval = setInterval(setupHoverListeners, 1000);
    setupHoverListeners();

    // Animation Loop for Smooth Trailing Effect
    let animationId: number;
    const animate = () => {
      // Linear Interpolation (lerp) for smooth lag
      // Main cursor is very fast
      mainCursorPos.current.x += (mousePos.current.x - mainCursorPos.current.x) * 0.35;
      mainCursorPos.current.y += (mousePos.current.y - mainCursorPos.current.y) * 0.35;

      // Secondary cursor is slower (more trailing effect)
      secondaryCursorPos.current.x += (mousePos.current.x - secondaryCursorPos.current.x) * 0.12;
      secondaryCursorPos.current.y += (mousePos.current.y - secondaryCursorPos.current.y) * 0.12;

      if (mainCursorRef.current) {
        mainCursorRef.current.style.transform = `translate3d(${mainCursorPos.current.x}px, ${mainCursorPos.current.y}px, 0)`;
      }

      if (secondaryCursorRef.current) {
        secondaryCursorRef.current.style.transform = `translate3d(${secondaryCursorPos.current.x}px, ${secondaryCursorPos.current.y}px, 0)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      clearInterval(hoverInterval);
      cancelAnimationFrame(animationId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Tiny solid dot that snaps closely to actual pointer */}
      <div
        ref={mainCursorRef}
        id="custom-cursor-dot"
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-brand-cyan rounded-full pointer-events-none z-100 transition-transform duration-200 ease-out ${
          isClicked ? "scale-150" : ""
        } ${isHovered ? "bg-brand-pink scale-50" : ""}`}
        style={{ transform: "translate3d(-100px, -100px, 0)", willChange: "transform" }}
      />

      {/* Larger trailing halo */}
      <div
        ref={secondaryCursorRef}
        id="custom-cursor-halo"
        className={`fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 border rounded-full pointer-events-none z-100 transition-all duration-300 ease-out flex items-center justify-center ${
          isHovered
            ? "border-brand-cyan bg-brand-cyan/10 scale-150 glow-cyan"
            : "border-brand-purple/50 bg-transparent"
        } ${isClicked ? "scale-75 border-brand-pink" : ""}`}
        style={{ transform: "translate3d(-100px, -100px, 0)", willChange: "transform" }}
      >
        {isHovered && (
          <span className="text-[6px] uppercase font-bold tracking-wider text-brand-cyan font-mono animate-pulse-glow">
            View
          </span>
        )}
      </div>
    </>
  );
}
