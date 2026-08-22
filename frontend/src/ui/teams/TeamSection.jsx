import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { FiArrowUpRight, } from "react-icons/fi";
import { Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Elena Rostova",
    role: "Lead Product Designer",
    department: "Design",
    bio: "Obsessed with micro-interactions, warm design systems, and human-centered digital experiences.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
    socials: { twitter: "#", linkedin: "#", github: "#" },
  },
  {
    id: 2,
    name: "Marcus Vance",
    role: "Principal Engineer",
    department: "Engineering",
    bio: "Architecting high-performance web systems and crafting buttery smooth 60fps animations.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    socials: { twitter: "#", linkedin: "#", github: "#" },
  },
  {
    id: 3,
    name: "Aria Montgomery",
    role: "Head of Brand",
    department: "Marketing",
    bio: "Building emotional connections through cohesive visual storytelling and intentional editorial design.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800",
    socials: { twitter: "#", linkedin: "#" },
  },
  {
    id: 4,
    name: "Julian Thorne",
    role: "Design Technologist",
    department: "Design",
    bio: "Bridging the gap between Figma mockups and production React code with creative flair.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800",
    socials: { twitter: "#", github: "#" },
  },
  {
    id: 5,
    name: "Sarah Lin",
    role: "Engineering Manager",
    department: "Engineering",
    bio: "Fostering inclusive engineering cultures and scaling distributed frontend architectures.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    socials: { linkedin: "#", github: "#" },
  },
  {
    id: 6,
    name: "David Kim",
    role: "Growth Strategist",
    department: "Marketing",
    bio: "Uncovering user insights and growing modern digital products through empathetic design.",
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=800",
    socials: { twitter: "#", linkedin: "#" },
  },
];

const DEPARTMENTS = ["All", "Design", "Engineering", "Marketing"];

export default function TeamSection() {
  const [activeTab, setActiveTab] = useState("All");
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".team-card",
        { opacity: 0, y: 36, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filteredMembers =
    activeTab === "All"
      ? TEAM_MEMBERS
      : TEAM_MEMBERS.filter((m) => m.department === activeTab);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#FAF7F2] text-[#2C221E] py-24 px-6 lg:px-12 antialiased"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-200/20 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-orange-100/40 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={headerRef} className="text-center max-w-2xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE8DC] border border-[#E2D6C5] text-xs font-semibold tracking-wider uppercase text-[#8C5E32]">
            <Sparkles size={13} className="text-[#C86D3B]" />
            <span>The Minds Behind The Craft</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#2C221E] font-serif leading-tight">
            Meet our collective of creators & thinkers
          </h2>

          <p className="text-base sm:text-lg text-[#6E5D53] leading-relaxed">
            We are a multi-disciplinary team passionate about thoughtful design, elegant engineering, and warm digital experiences.
          </p>
        </div>

        <div className="flex justify-center items-center gap-2 mb-12 flex-wrap">
          {DEPARTMENTS.map((dept) => {
            const isActive = activeTab === dept;
            return (
              <button
                key={dept}
                onClick={() => setActiveTab(dept)}
                className={`relative px-5 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                  isActive
                    ? "text-[#2C221E]"
                    : "text-[#8A776A] hover:text-[#2C221E] hover:bg-[#F0E8DD]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabBadge"
                    className="absolute inset-0 bg-[#EFE4D6] border border-[#E0D2C0] rounded-full -z-10 shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {dept}
              </button>
            );
          })}
        </div>

        <motion.div
          ref={gridRef}
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredMembers.map((member) => (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="team-card group relative bg-[#F5EFE6] border border-[#E8DEC8]/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#D6C4AD] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E2D6C5]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C221E]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <span className="absolute top-4 left-4 px-3 py-1 bg-[#FAF7F2]/90 backdrop-blur-md text-[11px] font-semibold text-[#8C5E32] rounded-full border border-[#E2D6C5] shadow-sm">
                    {member.department}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-[#2C221E] tracking-tight group-hover:text-[#C86D3B] transition-colors">
                        {member.name}
                      </h3>
                      <FiArrowUpRight
                        size={18}
                        className="text-[#A38F80] group-hover:text-[#C86D3B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                      />
                    </div>
                    <p className="text-xs font-semibold text-[#C86D3B] uppercase tracking-wider mt-1">
                      {member.role}
                    </p>
                    <p className="text-sm text-[#6E5D53] mt-3 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E8DEC8]/60 flex items-center gap-3 text-[#A38F80]">
                    {member.socials.twitter && (
                      <a href={member.socials.twitter} className="hover:text-[#2C221E] transition-colors">
                        <FaTwitter size={15} />
                      </a>
                    )}
                    {member.socials.linkedin && (
                      <a href={member.socials.linkedin} className="hover:text-[#2C221E] transition-colors">
                        <FaLinkedin size={15} />
                      </a>
                    )}
                    {member.socials.github && (
                      <a href={member.socials.github} className="hover:text-[#2C221E] transition-colors">
                        <FaGithub size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}