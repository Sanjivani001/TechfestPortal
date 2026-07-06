import { Github, Twitter, Linkedin, Terminal, Cpu } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    SANDBOX: ["COMPILER NODES", "QUBIT RUNS", "LEADERBOARD", "PATENT REGISTRY"],
    DOCUMENTS: ["POST-QUANTUM SPEC", "BIO_ACTUATORS_PDF", "LEGAL ACCREDITATION", "SANDBOX SECURITY"],
    PORTAL: ["APERION LIVE", "TITAN CHANNEL", "NOMINATIONS GATE", "MEDIA PROTOCOL"],
  };

  return (
    <footer className="relative bg-[#03050c] border-t border-white/5 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 inset-x-0 h-[100px] bg-brand-purple/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-white/5 pb-12 mb-10">
          
          {/* Logo Brand Panel (occupies 4 columns) */}
          <div className="lg:col-span-4 flex flex-col items-start justify-between">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 bg-gradient-to-tr from-brand-cyan to-brand-purple rounded-xl flex items-center justify-center">
                <Cpu className="w-5 h-5 text-white animate-pulse" />
              </div>
              <div>
                <h4 className="font-display font-black text-white text-base tracking-widest uppercase">
                  QUANTUM NEXUS
                </h4>
                <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest block mt-0.5">
                  THE FUTURISTIC TECHFEST PORTAL
                </span>
              </div>
            </div>

            <p className="text-gray-500 font-sans text-xs sm:text-sm leading-relaxed max-w-sm mb-6 lg:mb-0">
              Forging the ultimate multi-dimensional techfest stage where cryogenic computing nodes, bio-neural networks, and global builders unify inside the virtual Aperion Dome.
            </p>
          </div>

          {/* Links Panels Grid (occupies 8 columns) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 w-full">
            {Object.entries(links).map(([title, list]) => (
              <div key={title} className="flex flex-col">
                <h5 className="font-mono text-[10px] text-gray-400 font-semibold tracking-wider mb-4 uppercase">
                  //{title}
                </h5>
                <ul className="space-y-2.5">
                  {list.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="font-sans text-xs text-gray-500 hover:text-brand-cyan transition-colors tracking-wide hover:underline cursor-none"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Footer Bottom Row: Copyright & Socials */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-[10px] text-gray-500">
          
          {/* Left copyright and terminal text */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-center sm:text-left">
            <span>© {currentYear} QUANTUM_NEXUS_INC. ALL PROTOCOLS RESERVED.</span>
            <span className="hidden sm:inline opacity-30">|</span>
            <span className="flex items-center gap-1.5 text-brand-cyan uppercase">
              <Terminal className="w-3.5 h-3.5" />
              STATION_COMPILER_ONLINE // SECURE_SOCKET_OK
            </span>
          </div>

          {/* Right socials */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="p-2.5 bg-white/[0.02] border border-white/5 rounded-xl text-gray-500 hover:text-white hover:border-white/10 hover:bg-white/[0.05] transition-all cursor-none"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="p-2.5 bg-white/[0.02] border border-white/5 rounded-xl text-gray-500 hover:text-white hover:border-white/10 hover:bg-white/[0.05] transition-all cursor-none"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="p-2.5 bg-white/[0.02] border border-white/5 rounded-xl text-gray-500 hover:text-white hover:border-white/10 hover:bg-white/[0.05] transition-all cursor-none"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
