import { motion } from "motion/react";
import SectionHeader from "../components/SectionHeader";
import GlassCard from "../components/GlassCard";
import { Star, Quote, ShieldCheck } from "lucide-react";
import { TestimonialItem } from "../types";

export default function Testimonials() {
  const reviews: TestimonialItem[] = [
    {
      id: "rev-1",
      name: "Dr. Evelyn Vance",
      role: "Sovereign AI Research Director",
      organization: "Neuralis Labs",
      avatarSeed: "evelyn",
      comment: "Quantum Techfest stands completely unique in the absolute caliber of algorithmic submissions. The core micro-mesh swarm intelligence architecture prototyped by last year's winners is already integrated directly into our deep aerospace networks.",
      rating: 5,
    },
    {
      id: "rev-2",
      name: "Marcus Thorne",
      role: "Founding General Partner",
      organization: "Aether Capital",
      avatarSeed: "marcus",
      comment: "We secured direct seed funding investments into three spectacular student startups during the Stage 05 incubator. The sandbox evaluations are so robust that we treat the leaderboard ranks as a highly reliable signal of raw execution talent.",
      rating: 5,
    },
    {
      id: "rev-3",
      name: "Kiara Patel",
      role: "Sprints Winner & Lead Designer",
      organization: "CryoLogic Systems",
      avatarSeed: "kiara",
      comment: "Compete in the Aperture hackathon entirely shifted my technical trajectory. Accessing true, physical supercomputing nodes and getting direct, raw architectural criticisms from executive tech leaders was a life-changing experience.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] bg-brand-cyan/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <SectionHeader
          id="testimonials-header"
          badge="07 // ALUMNI EVALUATION"
          title="VOICES FROM THE"
          highlightedText="CYBERNETIC CORES"
          subtitle="Discover what leading enterprise directors, capital founders, and past competitive winners have to say about our interactive portal."
        />

        {/* Bento Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {reviews.map((rev, index) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="flex"
            >
              <GlassCard
                id={rev.id}
                glowColor={index === 0 ? "cyan" : index === 1 ? "purple" : "pink"}
                className="p-6 sm:p-8 flex flex-col justify-between h-full relative"
              >
                {/* Accent Quotes overlay */}
                <Quote className="absolute right-6 top-6 w-12 h-12 text-white/[0.02] pointer-events-none" />

                <div>
                  {/* Stars block */}
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(rev.rating)].map((_, starIdx) => (
                      <Star key={starIdx} className="w-4 h-4 fill-brand-pink stroke-brand-pink glow-pink" />
                    ))}
                    <span className="font-mono text-[9px] text-gray-500 ml-2 uppercase">
                      //AUTHENTIC_VERDICT
                    </span>
                  </div>

                  {/* Comment block */}
                  <p className="text-gray-300 font-sans text-sm sm:text-base leading-relaxed mb-8 italic">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Profile panel */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                  <div className="relative">
                    {/* Procedural glowing avatar block */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-cyan via-brand-purple to-brand-pink p-[1px] shadow-md flex items-center justify-center font-display font-bold text-white text-base">
                      <div className="w-full h-full rounded-[11px] bg-bg-dark flex items-center justify-center uppercase">
                        {rev.name.charAt(0)}
                        {rev.name.split(" ")[1]?.charAt(0)}
                      </div>
                    </div>
                    {/* Security verification check */}
                    <div className="absolute -bottom-1 -right-1 bg-brand-cyan p-0.5 rounded-full border border-bg-dark">
                      <ShieldCheck className="w-3 h-3 text-bg-dark" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-sm sm:text-base font-bold text-white truncate">
                      {rev.name}
                    </h4>
                    <p className="text-gray-400 font-sans text-xs truncate">
                      {rev.role}
                    </p>
                    <p className="text-brand-cyan font-mono text-[10px] uppercase mt-0.5">
                      {rev.organization}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
