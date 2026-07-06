import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Cpu, Sparkles } from "lucide-react";

// Components
import CustomCursor from "./components/CustomCursor";
import BackgroundParticles from "./components/BackgroundParticles";

// Sections
import Hero from "./sections/Hero";
import About from "./sections/About";
import Technologies from "./sections/Technologies";
import Features from "./sections/Features";
import Timeline from "./sections/Timeline";
import Gallery from "./sections/Gallery";
import Statistics from "./sections/Statistics";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll height for header animations & progress bar
  useEffect(() => {
    const handleScroll = () => {
      // Blur header after 50px of scrolling
      setScrolled(window.scrollY > 50);

      // Scroll progress percentage calculation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "ABOUT", href: "#about" },
    { label: "TRACKS", href: "#technologies" },
    { label: "FEATURES", href: "#features" },
    { label: "ROADMAP", href: "#timeline" },
    { label: "SHOWCASE", href: "#gallery" },
    { label: "METRICS", href: "#statistics" },
  ];

  return (
    <div id="techfest-platform" className="relative min-h-screen bg-bg-dark text-white font-sans selection:bg-brand-cyan selection:text-black">
      
      {/* 1. Immersive Custom Tailoring & Background Layer */}
      <CustomCursor />
      <BackgroundParticles />

      {/* 2. Top-edge thin Scroll Progress Indicator */}
      <div
        id="scroll-progress-indicator"
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink z-150 transition-all duration-100 origin-left"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* 3. Global Navbar */}
      <header
        id="app-header"
        className={`fixed top-0 inset-x-0 z-100 transition-all duration-500 ${
          scrolled
            ? "py-4 bg-bg-dark/70 backdrop-blur-md border-b border-white/5 shadow-[0_10px_30px_rgba(3,5,12,0.5)]"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo brand and badge */}
          <a href="#" className="flex items-center gap-2 px-1 relative cursor-none group">
            <Cpu className="w-5.5 h-5.5 text-brand-cyan group-hover:rotate-180 transition-transform duration-700" />
            <div className="flex flex-col">
              <span className="font-display font-black text-sm tracking-widest text-white uppercase group-hover:text-brand-cyan transition-colors">
                QUANTUM NEXUS
              </span>
              <span className="font-mono text-[7px] text-gray-500 tracking-wider">
                PORTAL_EST_2026
              </span>
            </div>
          </a>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-8 font-mono text-xs tracking-wider">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors relative py-1 cursor-none hover:text-glow-cyan"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action button & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 bg-brand-cyan/5 hover:bg-brand-cyan/15 border border-brand-cyan/35 text-brand-cyan px-5 py-2.5 rounded-xl font-mono text-xs font-semibold tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(0,242,254,0.2)] cursor-none"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>NOMINATE NOW</span>
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-white focus:outline-none cursor-none bg-white/5 border border-white/10 rounded-xl"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile menu slideout menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden w-full bg-bg-dark/95 backdrop-blur-lg border-b border-white/5 overflow-hidden font-mono text-sm tracking-wider"
            >
              <div className="px-4 pt-4 pb-6 space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-gray-400 hover:text-white py-2 border-b border-white/5 transition-colors cursor-none"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-cyan to-brand-purple py-3.5 rounded-xl font-bold text-white shadow-lg cursor-none"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>NOMINATE NOW</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 4. Core Immersive Content Panels */}
      <main className="relative z-10 w-full overflow-hidden">
        <Hero />
        <About />
        <Technologies />
        <Features />
        <Timeline />
        <Gallery />
        <Statistics />
        <Testimonials />
        <Contact />
      </main>

      {/* 5. Minimal Elegant Footer */}
      <Footer />
      
    </div>
  );
}
