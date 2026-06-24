import { createLazyFileRoute, Link } from "@tanstack/react-router";
import {
  Clock,
  Award,
  Coins,
  BookOpen,
  Sparkles,
  UserCheck,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

const DroneVector = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="2" />
    <path d="M12 10V2M12 22v-8M10 12H2M22 12h-8" />
    <path d="M8.5 8.5l-5-5M15.5 8.5l5-5M8.5 15.5l-5 5M15.5 15.5l5 5" />
    <circle cx="3.5" cy="3.5" r="1" />
    <circle cx="20.5" cy="3.5" r="1" />
    <circle cx="3.5" cy="20.5" r="1" />
    <circle cx="20.5" cy="20.5" r="1" />
    <path d="M2 3.5h3M19 3.5h3M2 20.5h3M19 20.5h3" />
  </svg>
);

export const Route = createLazyFileRoute("/programs")({
  component: ProgramsPage,
});

const programs = [
  {
    id: "PROGRAM 01",
    badge: "IMMEDIATE",
    title: "Hardware Mastery SEC",
    type: "Skill Enhancement Course (UGC Credit-Bearing)",
    typeShort: "UGC SEC",
    duration: "90 Hours • 30 Days",
    durationDetail: "3 Hours per Session",
    fee: "₹15,000",
    margin: "~60% margin",
    bullets: [
      "Reverse-engineering pedagogy",
      "All disciplines welcome",
      "University credit-linked",
      "Nakshatr provides everything",
    ],
    credits: "3 to 4 Credits",
    eligibility: "Open to all disciplines — zero aerospace background required.",
    covers:
      "Disassemble, inspect, wire, calibrate, and rebuild physical multirotor drone frames. Learn ESC velocity parameters, speed controller telemetry, and receiver mapping. Ends with controlled flight logging sessions.",
    outcome: "Students independently build, configure, and troubleshoot structural drone systems.",
    theme: {
      accentClass: "border-t-blue-500 hover:border-t-blue-400 shadow-blue-500/5 hover:border-blue-500/30",
      badgeClass: "text-blue-400 bg-blue-950/40 border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.15)]",
      feeMarginClass: "text-blue-400 bg-blue-950/40 border-blue-500/20",
      checkClass: "text-blue-400",
    },
  },
  {
    id: "PROGRAM 02",
    badge: "IMMEDIATE",
    title: "Software Mastery SEC",
    type: "Skill Enhancement Course (UGC Credit-Bearing)",
    typeShort: "UGC SEC",
    duration: "60 Hours • 30 Days",
    durationDetail: "2 Hours per Session",
    fee: "₹12,000",
    margin: "~75% margin",
    bullets: [
      "Mission planning to AI autonomy",
      "Software-first interaction",
      "University credit-linked",
      "Highest margin program",
    ],
    credits: "2 to 3 Credits",
    eligibility: "Open to all disciplines — basic computer literacy required.",
    covers:
      "Configure autonomous navigation parameters, build 3D GIS mapping orthomosaics, simulate complex flight failures, and interface AI computer vision tracking systems. Includes QGroundControl and Mission Planner workflows.",
    outcome:
      "Students design automated waypoints, extract geospatial mapping products, and run synthetic flights.",
    theme: {
      accentClass: "border-t-blue-500 hover:border-t-blue-400 shadow-blue-500/5 hover:border-blue-500/30",
      badgeClass: "text-blue-400 bg-blue-950/40 border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.15)]",
      feeMarginClass: "text-blue-400 bg-blue-950/40 border-blue-500/20",
      checkClass: "text-blue-400",
    },
  },
  {
    id: "PROGRAM 03",
    badge: "MONTH 4+",
    title: "Industry Ready Program",
    type: "Professional Certification Program (Non-Credit — DGCA Pathway)",
    typeShort: "DGCA Pathway",
    duration: "Post-RPTO Approval",
    durationDetail: "Tailored Flight Cohort",
    fee: "₹22,000",
    margin: "~70% margin",
    bullets: [
      "Hardware + Software + DGCA RPC",
      "Govt-recognized pilot license",
      "Direct job eligibility",
      "RPTO in 2-3 months",
    ],
    credits: "Non-credit",
    eligibility: "Class 10 minimum — medical fitness standard required.",
    covers:
      "Ground school training (airspace regulations, drone law 2021) followed by intensive multi-rotor flight training on type-certified UAV platforms. Prep for DGCA remote pilot license examinations.",
    outcome:
      "Students graduate ready to obtain their government pilot certificate and fly commercial missions.",
    theme: {
      accentClass: "border-t-blue-500 hover:border-t-blue-400 shadow-blue-500/5 hover:border-blue-500/30",
      badgeClass: "text-blue-400 bg-blue-950/40 border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.15)]",
      feeMarginClass: "text-blue-400 bg-blue-950/40 border-blue-500/20",
      checkClass: "text-blue-400",
    },
  },
];

function ProgramsPage() {
  return (
    <div className="bg-[#050506] text-white min-h-screen pt-24 pb-14 relative">
      {/* Dynamic aviation HUD constellation grid background */}
      <div className="absolute inset-0 bg-hud-grid opacity-35 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(59,130,246,0.03),transparent_65%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Minimalist center-aligned header */}
        <div className="text-center max-w-3xl mx-auto mb-10 select-none relative p-4 sm:p-6 rounded bg-[#16171A]/20 border border-[#222328]/30 backdrop-blur-sm hud-brackets">
          <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-[0.3em] block mb-3">
            [ FORMAL CURRICULUMS ]
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white uppercase tracking-tight">
            Our Drone{" "}
            <span className="text-gradient-blue font-extrabold drop-shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              Education Programs
            </span>
          </h1>
          <div className="mt-6 flex flex-wrap gap-2.5 justify-center">
            {["UGC Aligned", "DGCA Compliant", "MKBU Certified"].map((t) => (
              <span
                key={t}
                className="bg-[#16171A] text-blue-400 border border-[#222328] font-mono text-[9px] uppercase px-3 py-1.5 rounded-full font-bold shadow-[0_0_12px_rgba(59,130,246,0.08)]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Direct 3 programs grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {programs.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="h-full">
              <div
                className={`tech-card animate-hud-hover-float group rounded-lg p-5 sm:p-6 h-full relative overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all duration-500 bg-[#16171A] border-t-4 border-[#222328] hud-card-corners ${p.theme.accentClass}`}
              >
                <DroneVector className="absolute -bottom-6 -right-6 w-28 h-28 text-blue-500 opacity-[0.03] group-hover:opacity-[0.11] transition-opacity duration-300 pointer-events-none animate-drone-wobble" />

                <div className="flex flex-col h-full justify-between relative z-10">
                  <div>
                    {/* Header: ID + Status Badge */}
                    <div className="flex justify-between items-center mb-5 gap-2 select-none">
                      <span className="font-mono text-[10px] sm:text-xs text-[#8A94A6] font-bold uppercase tracking-widest">
                        {p.id}
                      </span>
                      <span
                        className={`border font-mono text-[9px] uppercase px-3 py-1 rounded font-bold whitespace-nowrap tracking-wider ${p.theme.badgeClass}`}
                      >
                        {p.badge}
                      </span>
                    </div>

                    {/* Course Title & Duration */}
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight leading-tight transition-colors duration-300 group-hover:text-blue-400">
                      {p.title}
                    </h3>
                    <p className="text-[#8A94A6] font-mono mt-1.5 text-[10px] uppercase tracking-wider">
                      {p.duration}
                    </p>

                    <div className="w-full h-[1px] bg-[#222328] my-4" />

                    {/* Cost & Margin Section */}
                    <div className="flex flex-col mb-6 bg-[#050506]/55 border border-[#222328] p-4 rounded select-none">
                      <span className="text-[9px] font-mono text-[#8A94A6] uppercase tracking-widest">
                        EXPECTED COURSE FEE
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl font-extrabold text-white tracking-tight font-display">
                          {p.fee}
                        </span>
                        <span
                          className={`text-[10px] font-semibold font-mono border px-2 py-0.5 rounded ${p.theme.feeMarginClass}`}
                        >
                          {p.margin}
                        </span>
                      </div>
                    </div>

                    {/* Feature Bullets (Checkmarks) */}
                    <div className="mb-6">
                      <ul className="space-y-3">
                        {p.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-2.5 text-xs text-white/90"
                          >
                            <CheckCircle2
                              className={`w-4.5 h-4.5 shrink-0 mt-0.5 ${p.theme.checkClass}`}
                            />
                            <span className="font-sans leading-tight">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technical details accordion / scope */}
                    <div className="w-full h-[1px] bg-[#222328] my-4" />

                    <div className="mb-4">
                      <h4 className="text-[10px] font-bold text-white uppercase tracking-widest font-mono mb-1.5 flex items-center gap-1.5 select-none">
                        <BookOpen size={13} className="text-blue-400" /> Course Overview
                      </h4>
                      <p className="text-[11px] text-[#8A94A6] leading-relaxed font-sans">
                        {p.covers}
                      </p>
                    </div>
                  </div>

                  {/* Outcome Box */}
                  <div className="bg-[#050506] border border-[#222328] rounded p-3 mt-auto">
                    <h4 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest font-mono mb-1 flex items-center gap-1 select-none">
                      <Sparkles size={12} className="text-blue-400 shrink-0" /> Target Competency
                    </h4>
                    <p className="text-[10px] text-[#8A94A6] leading-relaxed font-sans">
                      {p.outcome}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Partnership status banner at bottom */}
        <div className="mt-12 border border-[#222328] bg-[#16171A]/40 backdrop-blur-sm p-4 sm:p-5 rounded-lg flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4 font-mono text-xs max-w-7xl mx-auto shadow-2xl relative select-none">
          <div className="absolute top-0 left-4 -translate-y-1/2 bg-[#050506] px-2 text-blue-400 text-[9px] uppercase tracking-widest font-bold">
            [ PARTNERSHIP PIPELINE MODEL ]
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center md:justify-start w-full md:w-auto">
            <div>
              <span className="text-[#8A94A6] uppercase tracking-wider block text-[10px]">
                University Contributes
              </span>
              <span className="text-white font-bold uppercase mt-1 block">Space only</span>
            </div>
            <div className="h-px sm:h-8 w-full sm:w-px bg-white/[0.08]" />
            <div>
              <span className="text-[#8A94A6] uppercase tracking-wider block text-[10px]">
                Nakshatr Contributes
              </span>
              <span className="text-blue-400 font-bold uppercase mt-1 block">Everything else</span>
            </div>
          </div>
          <div className="h-px md:h-8 w-full md:w-px bg-white/[0.08]" />
          <div className="bg-blue-500/10 border border-blue-500/30 px-5 py-3 rounded text-center w-full md:w-auto">
            <span className="text-[#8A94A6] uppercase tracking-wider text-[10px] block">
              University Earnings
            </span>
            <span className="text-blue-400 font-extrabold text-sm uppercase mt-0.5 block tracking-wide">
              10% of ALL revenues
            </span>
          </div>
        </div>
      </div>

      <section className="py-12 sm:py-16 bg-hud-radar opacity-95 border-t border-[#222328] mt-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white uppercase tracking-tight">
              Public Batches Available
            </h2>
            <p className="mt-3 text-[#8A94A6] text-xs sm:text-sm font-mono">
              [ OPEN ENROLMENT · NO AEROSPACE EXPERIENCE PREREQUISITE ]
            </p>
            <Link
              to="/contact"
              className="group relative btn-hud-glow inline-block mt-8 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-widest px-10 py-3.5 rounded shadow-[0_0_20px_rgba(59,130,246,0.25)] border border-blue-600"
            >
              Apply Now
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
export default ProgramsPage;
