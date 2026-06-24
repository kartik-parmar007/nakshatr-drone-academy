import { createLazyFileRoute } from "@tanstack/react-router";
import {
  Calendar,
  MapPin,
  Award,
  BookOpen,
  Shield,
  ShieldCheck,
  Plane,
  FlaskConical,
  Landmark,
  GraduationCap,
  Quote,
  Compass,
  CheckCircle2,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

export const Route = createLazyFileRoute("/about")({
  component: AboutPage,
});

const credentials = [
  { icon: Plane, label: "DGCA Licensed Pilot", desc: "Certified command remote pilot" },
  { icon: FlaskConical, label: "UK UAV R&D Veteran", desc: "A decade of aerospace research" },
  { icon: Landmark, label: "Ecosystem Builder", desc: "Gujarat Drone Katra Participant" },
  { icon: GraduationCap, label: "Curriculum Architect", desc: "SEC credit framework author" },
];

function AboutPage() {
  return (
    <div className="bg-[#050506] text-white overflow-hidden min-h-screen relative">
      <style>{`
        @keyframes drift {
          from { background-position: 0 0; }
          to { background-position: 40px 40px; }
        }
        @keyframes pulse-blue {
          0% { box-shadow: 0 0 10px rgba(59, 130, 246, 0.1); }
          100% { box-shadow: 0 0 25px rgba(59, 130, 246, 0.35); }
        }
        .animate-grid-drift {
          background-image: radial-gradient(circle, rgba(59, 130, 246, 0.04) 1px, transparent 1px);
          background-size: 30px 30px;
          animation: drift 25s linear infinite;
        }
        .text-gradient-blue-premium {
          background: linear-gradient(135deg, #ffffff 0%, #93c5fd 50%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hud-bracket {
          position: absolute;
          width: 10px;
          height: 10px;
          border-color: rgba(59, 130, 246, 0.4);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .glow-card-blue {
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .glow-card-blue:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.55), 0 0 25px rgba(59, 130, 246, 0.18);
          border-color: rgba(59, 130, 246, 0.45) !important;
        }
        .owner-card-premium {
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .owner-card-premium:hover {
          transform: translateY(-6px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.65), 0 0 30px rgba(59, 130, 246, 0.15);
          border-color: rgba(59, 130, 246, 0.35) !important;
        }
        .timeline-line {
          background: linear-gradient(to bottom, rgba(59, 130, 246, 0.8) 0%, rgba(59, 130, 246, 0.15) 100%);
        }
      `}</style>

      {/* Dynamic background grid drift overlay */}
      <div className="absolute inset-0 animate-grid-drift pointer-events-none" />

      {/* ── 2. Founder Profile (Chief Instructor Briefing) ── */}
      <section className="pt-6 pb-12 sm:pt-28 sm:pb-16 border-b border-[#222328]/60 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="owner-card-premium group rounded-2xl border border-[#222328] bg-[#0c0d0f]/90 p-5 md:p-8 flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-8 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              {/* HUD Brackets for Owner Card */}
              <div className="hud-bracket -top-1 -left-1 border-t-2 border-l-2 group-hover:border-blue-400 group-hover:scale-110" />
              <div className="hud-bracket -top-1 -right-1 border-t-2 border-r-2 group-hover:border-blue-400 group-hover:scale-110" />
              <div className="hud-bracket -bottom-1 -left-1 border-b-2 border-l-2 group-hover:border-blue-400 group-hover:scale-110" />
              <div className="hud-bracket -bottom-1 -right-1 border-b-2 border-r-2 group-hover:border-blue-400 group-hover:scale-110" />

              {/* Profile Image & Metadata Block */}
              <div className="md:col-span-5 flex flex-col items-center md:items-stretch text-center">
                <div className="relative p-1.5 rounded-lg border border-[#222328]/80 bg-[#111216] w-full max-w-[280px] md:max-w-none aspect-[4/5] overflow-hidden group/img shadow-inner">
                  <div
                    className="w-full h-full bg-cover bg-center rounded-md transition-all duration-700 group-hover/img:scale-105 filter group-hover/img:brightness-110"
                    style={{ backgroundImage: `url('/drone_academy_founder.png')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0f] via-transparent to-transparent pointer-events-none" />

                  {/* Telemetry scanning effect on image */}
                  <div className="absolute inset-0 bg-hud-grid opacity-10 pointer-events-none group-hover/img:opacity-20 transition-opacity duration-500" />
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-blue-500 opacity-60 animate-scan pointer-events-none" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                    <div className="w-16 h-16 border border-blue-500/20 rounded-full flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping" />
                    </div>
                  </div>

                  {/* Image HUD Brackets */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-blue-500/50 group-hover/img:border-blue-400 group-hover/img:scale-105 transition-all duration-300 pointer-events-none" />
                  <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-blue-500/50 group-hover/img:border-blue-400 group-hover/img:scale-105 transition-all duration-300 pointer-events-none" />
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-blue-500/50 group-hover/img:border-blue-400 group-hover/img:scale-105 transition-all duration-300 pointer-events-none" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-blue-500/50 group-hover/img:border-blue-400 group-hover/img:scale-105 transition-all duration-300 pointer-events-none" />
                </div>

                <div className="mt-4 font-mono text-[9px] text-center border-t border-[#222328] pt-3 w-full text-[#8A94A6] tracking-widest uppercase flex items-center justify-center gap-1.5 select-none">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                  ROLE: CHIEF INSTRUCTOR &amp; FOUNDER
                </div>
              </div>

              {/* Biography & Credentials Content */}
              <div className="md:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 bg-[#111216] border border-[#222328] text-blue-400 px-3.5 py-1 rounded font-mono text-[9px] tracking-widest uppercase">
                    Personnel Log: 001
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-white mt-4 tracking-tight font-display uppercase group-hover:text-blue-200 transition-colors">
                    A Pilot, Researcher, and Educator
                  </h2>

                  {/* Styled Quote */}
                  <div className="relative mt-5 p-5 rounded-lg border-l-2 border-blue-500 bg-[#111216]/50 overflow-hidden transition-all duration-500 group-hover:bg-[#111216]/80">
                    <div className="absolute inset-0 bg-hud-grid opacity-[0.03] pointer-events-none" />
                    <Quote className="absolute -top-3 right-4 text-blue-500/10 w-12 h-12 transition-transform duration-500 group-hover:scale-110 group-hover:text-blue-500/20" />
                    <p className="text-white text-xs sm:text-sm font-medium italic leading-relaxed relative z-10">
                      "UAV technology in India deserves real operational expertise. Our mission is
                      to produce deployment-ready operators who understand systems, flight
                      configurations, and diagnostics from Day 1 — not certificate holders."
                    </p>
                  </div>

                  <p className="text-[#8A94A6] mt-5 leading-relaxed text-xs sm:text-sm font-sans">
                    After a decade of aerospace R&D in the UK and operational experience in India's drone
                    market, our founder returned to Bhavnagar to architect a program that bridges
                    the gap between raw academic theory and direct commercial cockpit operations.
                  </p>
                </div>

                {/* Structured Credentials Grid */}
                <div className="mt-6 pt-4 border-t border-[#222328]/60 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {credentials.map((c) => (
                    <div key={c.label} className="flex gap-3 items-center group/cred">
                      <div className="w-9 h-9 rounded bg-[#111216] border border-[#222328] flex items-center justify-center text-blue-500 shrink-0 group-hover:bg-[#16171c] group-hover:border-blue-500/40 group-hover/cred:text-blue-400 transition-all duration-300 shadow-inner">
                        <c.icon size={18} className="group-hover/cred:scale-110 transition-transform" />
                      </div>
                      <div>
                        <h4 className="text-[11px] font-mono font-bold text-white uppercase tracking-wider group-hover/cred:text-blue-400 transition-colors">
                          {c.label}
                        </h4>
                        <p className="text-[10px] text-[#8A94A6] mt-0.5">{c.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 3. Asymmetric Blueprint Facts ── */}
      <section className="py-12 sm:py-16 border-b border-[#222328]/60 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.02),transparent_70%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-10 select-none">
              <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-[0.4em]">
                [ SYSTEM SPECIFICATIONS ]
              </span>
              <h2 className="text-3xl font-bold text-white uppercase mt-3 tracking-tight font-display">
                Operational Infrastructure
              </h2>
            </div>
          </Reveal>

          {/* Blueprint Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                idx: "001",
                label: "ESTABLISHED",
                icon: Calendar,
                title: "June 2024",
                desc: "Established in Bhavnagar to build and nurture India's academic and commercial drone ecosystem.",
                footer: "Foundation Date",
              },
              {
                idx: "002",
                label: "ACADEMIC AFFILIATION",
                icon: Award,
                title: "MKBU Affiliation",
                desc: "Affiliated directly with Maharaja Krishnakumarsinhji Bhavnagar University to design credit-bearing student curriculums.",
                footer: "Academic Affiliation",
              },
              {
                idx: "003",
                label: "OPERATIONS BASE",
                icon: MapPin,
                title: "Bhavnagar, Gujarat",
                desc: "Serving as the central operational hub, directly routing resources and type-certified aircraft across regional campuses.",
                footer: "Operations Base",
              },
              {
                idx: "004",
                label: "PORTFOLIO",
                icon: BookOpen,
                title: "4 Pathways",
                desc: "Curriculums mapped to standard credit frameworks, enabling drone pilot licensing and academic credits.",
                footer: "UGC-Aligned Syllabus",
              },
              {
                idx: "005",
                label: "COMPLIANCE",
                icon: ShieldCheck,
                title: "Fully Insured",
                desc: "All student flight operations, training cohorts, and hardware assets are backed by comprehensive liability coverage.",
                footer: "Comprehensive Cover",
              },
              {
                idx: "006",
                label: "AEROSPACE CODES",
                icon: Shield,
                title: "100% DGCA Compliant",
                desc: "Every training component, flight log, operating procedure, and aircraft asset matches active DGCA regulatory requirements.",
                footer: "Aerospace Codes",
              },
            ].map((card) => (
              <Reveal key={card.idx} delay={+card.idx * 0.04}>
                <div className="tech-card glow-card-blue group rounded-xl border border-[#222328] bg-[#0c0d0f]/60 p-6 flex flex-col justify-between h-full min-h-[220px] transition-all duration-300 relative overflow-hidden">
                  <div className="cyber-scanline" />
                  <div className="flex justify-between items-start font-mono text-[9px] text-[#8A94A6] select-none">
                    <span>INDX {card.idx}</span>
                    <span>{card.label}</span>
                  </div>
                  <div className="my-4">
                    <div className="w-10 h-10 rounded bg-[#111216] border border-[#222328]/80 flex items-center justify-center text-blue-500 mb-4 group-hover:bg-[#16171c] group-hover:border-blue-500/40 group-hover:text-blue-400 transition-all duration-300 shadow-inner">
                      <card.icon className="group-hover:scale-110 transition-transform duration-300" size={20} />
                    </div>
                    <div className="text-xl font-bold text-white font-display uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                      {card.title}
                    </div>
                    <p className="text-xs text-[#8A94A6] leading-relaxed mt-2 font-sans">
                      {card.desc}
                    </p>
                  </div>
                  <div className="text-[10px] font-mono text-blue-400/70 uppercase tracking-wider mt-auto select-none pt-2 border-t border-[#222328]/40">
                    {card.footer}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>



      {/* ── 5. Core Manifesto (Mission & Vision) ── */}
      <section className="py-12 sm:py-16 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(59,130,246,0.02),transparent_70%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Section */}
            <Reveal>
              <div className="tech-card glow-card-blue group rounded-2xl border border-[#222328] bg-[#0c0d0f]/90 p-6 md:p-8 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] h-full flex flex-col justify-between">
                <div className="cyber-scanline" />
                <div className="hud-bracket -top-1 -left-1 border-t-2 border-l-2 group-hover:border-blue-400 group-hover:scale-110" />
                <div className="hud-bracket -top-1 -right-1 border-t-2 border-r-2 group-hover:border-blue-400 group-hover:scale-110" />
                <div className="hud-bracket -bottom-1 -left-1 border-b-2 border-l-2 group-hover:border-blue-400 group-hover:scale-110" />
                <div className="hud-bracket -bottom-1 -right-1 border-b-2 border-r-2 group-hover:border-blue-400 group-hover:scale-110" />

                <div>
                  <div className="inline-flex items-center gap-1.5 text-blue-400 font-mono text-[9px] tracking-widest uppercase mb-4">
                    <Compass size={12} className="group-hover:rotate-45 transition-transform duration-500" />
                    Core Mandate
                  </div>
                  <h3 className="text-xl font-bold text-white font-mono tracking-widest uppercase mb-4">
                    MISSION
                  </h3>
                  <p className="text-xl sm:text-2xl font-bold text-white leading-snug font-display text-gradient-blue-premium">
                    Place a drone in every student's hands before a single lecture is delivered.
                  </p>
                </div>
                <p className="text-xs text-[#8A94A6] leading-relaxed mt-6 font-sans">
                  Our curriculum prioritizes kinetic learning: building mechanical expertise from first assembly configurations before flight operations.
                </p>
              </div>
            </Reveal>

            {/* Vision Section */}
            <Reveal delay={0.1}>
              <div className="tech-card glow-card-blue group rounded-2xl border border-[#222328] bg-[#0c0d0f]/90 p-6 md:p-8 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] h-full flex flex-col justify-between">
                <div className="cyber-scanline" />
                <div className="hud-bracket -top-1 -left-1 border-t-2 border-l-2 group-hover:border-blue-400 group-hover:scale-110" />
                <div className="hud-bracket -top-1 -right-1 border-t-2 border-r-2 group-hover:border-blue-400 group-hover:scale-110" />
                <div className="hud-bracket -bottom-1 -left-1 border-b-2 border-l-2 group-hover:border-blue-400 group-hover:scale-110" />
                <div className="hud-bracket -bottom-1 -right-1 border-b-2 border-r-2 group-hover:border-blue-400 group-hover:scale-110" />

                <div>
                  <div className="inline-flex items-center gap-1.5 text-blue-400 font-mono text-[9px] tracking-widest uppercase mb-4">
                    <CheckCircle2 size={12} className="group-hover:scale-110 transition-transform" />
                    Strategic Horizon
                  </div>
                  <h3 className="text-xl font-bold text-white font-mono tracking-widest uppercase mb-4">
                    VISION
                  </h3>
                  <p className="text-xl sm:text-2xl font-bold text-white leading-snug font-display text-gradient-blue-premium">
                    Become the foundational layer of drone talent for India by 2030.
                  </p>
                </div>
                <p className="text-xs text-[#8A94A6] leading-relaxed mt-6 font-sans">
                  Aligning university learning grids directly to commercial aviation pipelines and aerospace certification networks nationwide.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
