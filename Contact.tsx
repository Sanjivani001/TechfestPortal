import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SectionHeader from "../components/SectionHeader";
import GlassCard from "../components/GlassCard";
import { Terminal, Send, CheckCircle2, Ticket, QrCode, Calendar, ArrowLeft } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    track: "QUANTUM AI",
    github: "",
    proposal: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const tracks = [
    "QUANTUM AI",
    "ROBOTICS",
    "CYBER NETWORKS",
    "POST-QUANTUM CRYPTO",
    "BIOMECHATRONICS",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setSubmitting(true);
    // Simulate high-speed compilation server processing
    setTimeout(() => {
      setSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      track: "QUANTUM AI",
      github: "",
      proposal: "",
    });
  };

  return (
    <section id="contact" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Dynamic background lights */}
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-brand-purple/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          id="contact-header"
          badge="08 // GATE REGISTRY"
          title="NOMINATION REGISTRY"
          highlightedText="PORT"
          subtitle="Submit your programmatic project profile or register your engineering squad to unlock your cryogenic supercomputing sandbox."
        />

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              // 1. Nomination Registry Form
              <motion.div
                key="form-container"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                <GlassCard id="contact-form-card" glowColor="cyan" className="p-8 sm:p-10 relative">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Input name and email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[10px] text-gray-400 tracking-wider uppercase">
                          SQUAD_LEADER_NAME *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="e.g. Alyx Vance"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 font-sans text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand-cyan/60 focus:bg-white/[0.04] transition-all"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[10px] text-gray-400 tracking-wider uppercase">
                          QUANTUM_COMM_EMAIL *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="e.g. alyx@blackmesa.org"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 font-sans text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand-cyan/60 focus:bg-white/[0.04] transition-all"
                        />
                      </div>
                    </div>

                    {/* Track selection and repo row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[10px] text-gray-400 tracking-wider uppercase">
                          COMPETITIVE_TRACK *
                        </label>
                        <select
                          name="track"
                          value={formData.track}
                          onChange={handleInputChange}
                          className="bg-[#050816] border border-white/10 rounded-xl px-4 py-3.5 font-mono text-xs text-brand-cyan focus:outline-none focus:border-brand-cyan/60 focus:bg-white/[0.04] transition-all cursor-none"
                        >
                          {tracks.map((track) => (
                            <option key={track} value={track} className="bg-bg-dark text-white font-mono text-xs">
                              {track}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[10px] text-gray-400 tracking-wider uppercase">
                          GIT_REPOSITORY_URI (OPTIONAL)
                        </label>
                        <input
                          type="url"
                          name="github"
                          placeholder="e.g. https://github.com/alyx"
                          value={formData.github}
                          onChange={handleInputChange}
                          className="bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 font-sans text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand-cyan/60 focus:bg-white/[0.04] transition-all"
                        />
                      </div>
                    </div>

                    {/* Proposal Description */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] text-gray-400 tracking-wider uppercase">
                        ALGORITHMIC_PROPOSAL_BRIEF
                      </label>
                      <textarea
                        name="proposal"
                        rows={4}
                        placeholder="Detail your technology stacks, simulated metrics, and project vision..."
                        value={formData.proposal}
                        onChange={handleInputChange}
                        className="bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 font-sans text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand-cyan/60 focus:bg-white/[0.04] transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group relative w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink p-[1px] rounded-xl transition-all hover:scale-[1.02] duration-300 active:scale-95 disabled:opacity-50"
                    >
                      <div className="bg-bg-dark hover:bg-transparent transition-colors duration-300 w-full h-full py-4 rounded-[11px] flex items-center justify-center gap-2 font-display font-medium text-white tracking-wider">
                        {submitting ? (
                          <>
                            <Terminal className="w-4 h-4 text-brand-cyan animate-spin" />
                            <span>COMPILING ENTRY PROTOCOLS...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            <span>COMPILE AND TRANSMIT ENTRY</span>
                          </>
                        )}
                      </div>
                    </button>
                    
                  </form>
                </GlassCard>
              </motion.div>
            ) : (
              // 2. Premium Customized Interactive Access Pass Ticket Overlay!
              <motion.div
                key="ticket-container"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="flex flex-col items-center"
              >
                {/* Visual Glow Ticket */}
                <GlassCard
                  id="nomination-ticket"
                  glowColor="pink"
                  className="w-full max-w-lg p-8 sm:p-10 border-brand-pink/30 shadow-[0_0_50px_rgba(255,0,127,0.2)] overflow-hidden relative"
                >
                  {/* Decorative ticket notch patterns */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-bg-dark border-r border-white/10 -ml-3 z-20" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-bg-dark border-l border-white/10 -mr-3 z-20" />
                  
                  {/* Grid mesh background */}
                  <div className="absolute inset-0 pointer-events-none grid-mesh opacity-15" />

                  <div className="relative z-10 flex flex-col gap-6">
                    
                    {/* Header: Brand Tag */}
                    <div className="flex items-center justify-between border-b border-dashed border-white/15 pb-6">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-brand-pink/10 border border-brand-pink/30 rounded-lg">
                          <Ticket className="w-5 h-5 text-brand-pink animate-pulse" />
                        </div>
                        <div>
                          <h4 className="font-display font-black text-white text-sm tracking-widest">
                            QUANTUM NEXUS
                          </h4>
                          <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest block">
                            OFFICIAL ACCREDITATION
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-[9px] text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/25 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                          VERIFIED ENTRY
                        </span>
                      </div>
                    </div>

                    {/* Central Ticket Information */}
                    <div className="space-y-4">
                      <div>
                        <span className="font-mono text-[8px] text-gray-500 uppercase tracking-wider block">
                          SQUAD_LEADER_IDENTIFICATION
                        </span>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5 uppercase">
                          {formData.name}
                        </h3>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="font-mono text-[8px] text-gray-500 uppercase tracking-wider block">
                            COMMUNICATOR_ENDPOINT
                          </span>
                          <span className="font-mono text-[11px] text-gray-300 block truncate">
                            {formData.email}
                          </span>
                        </div>
                        <div>
                          <span className="font-mono text-[8px] text-gray-500 uppercase tracking-wider block">
                            ALLOCATED_TRACK
                          </span>
                          <span className="font-mono text-[11px] text-brand-cyan font-semibold block uppercase">
                            //{formData.track}
                          </span>
                        </div>
                      </div>

                      {formData.github && (
                        <div>
                          <span className="font-mono text-[8px] text-gray-500 uppercase tracking-wider block">
                            REPOSITORY_BOUNDS
                          </span>
                          <span className="font-mono text-[11px] text-brand-purple block truncate">
                            {formData.github}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Ticket Bottom Footer: QR Code & Simulated Barcode */}
                    <div className="flex items-center justify-between border-t border-dashed border-white/15 pt-6 mt-2">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1.5 text-gray-400 font-mono text-[9px]">
                          <Calendar className="w-3.5 h-3.5 text-brand-pink" />
                          <span>DATE: JULY 10-14, 2026</span>
                        </div>
                        <div className="font-mono text-[8px] text-gray-500 tracking-wider">
                          SERIAL_CODE_ID: QN_2026_824X_A
                        </div>
                        {/* Simulated code bar lines */}
                        <div className="flex gap-[1.5px] h-6 items-end pt-1">
                          {[2, 4, 1, 3, 5, 2, 4, 1, 3, 2, 4, 1, 3, 5, 2, 4, 2, 1, 3].map((val, bIdx) => (
                            <div
                              key={bIdx}
                              className="bg-white/30 rounded-full"
                              style={{
                                width: val % 2 === 0 ? "2.5px" : "1px",
                                height: `${val * 4 + 8}px`,
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Vector QR Graphic */}
                      <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl relative overflow-hidden flex items-center justify-center shrink-0">
                        <QrCode className="w-10 h-10 text-white opacity-90" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-pink/20 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </div>

                  </div>
                </GlassCard>

                {/* Return Form Action */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetForm}
                  className="mt-8 flex items-center gap-2 font-mono text-xs text-gray-400 hover:text-brand-cyan transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>SUBMIT ANOTHER NOMINATION PROFILE</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
