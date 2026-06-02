import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Clock, Award, Coins, BookOpen, Sparkles, UserCheck } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { motion } from "framer-motion";

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

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Drone Programs — Nakshatr Technologies" },
      { name: "description", content: "UGC aligned, DGCA compliant, MKBU certified drone education programs from Hardware Mastery to Industry Ready." },
      { property: "og:title", content: "Our Drone Education Programs" },
      { property: "og:image", content: "/dawn_mountain_landscape.png" }
    ],
  }),
  component: ProgramsPage,
});

const programs = [
  {
    id: "COURSE 01",
    border: "from-amber-500 to-yellow-600",
    title: "Hardware Mastery SEC",
    type: "Skill Enhancement Course (UGC Credit-Bearing)",
    typeShort: "UGC SEC",
    duration: "30 Days (90 Hours)",
    durationDetail: "3 Hours per Session",
    fee: "₹15,000 per student",
    credits: "3 to 4 Credits",
    creditsDetail: "subject to university determination",
    eligibility: "Open to all — any discipline — no prerequisite",
    eligibilityShort: "Open to all (No prereq)",
    covers: "Reverse-engineering pedagogy. Students disassemble, understand, and rebuild a complete drone from component level. Five phases — Wonder, Deconstruction, Understanding, Reconstruction, Confidence. Ends with controlled flight familiarisation.",
    outcome: "Student can independently assemble, troubleshoot, and operate a multirotor drone system.",
    accentClass: "border-t-[#00F0FF]/60 hover:border-t-[#00F0FF] shadow-cyan-500/5"
  },
  {
    id: "COURSE 02",
    border: "from-cyan-500 to-blue-600",
    title: "Software Mastery SEC",
    type: "Skill Enhancement Course (UGC Credit-Bearing)",
    typeShort: "UGC SEC",
    duration: "30 Days (60 Hours)",
    durationDetail: "2 Hours per Session",
    fee: "₹12,000 per student",
    credits: "2 to 3 Credits",
    creditsDetail: "subject to university determination",
    eligibility: "Open to all — any discipline — no prerequisite",
    eligibilityShort: "Open to all (No prereq)",
    covers: "Eight modules — Software Foundations, Mission Planning, Simulation, GIS and Mapping, Data Processing, Computer Vision, Autonomy and AI Applications, Mini Capstone Project. Platforms include Mission Planner, QGroundControl, Agisoft Metashape, QGIS.",
    outcome: "Student can plan autonomous missions, process aerial imagery, and work with GIS and simulation environments.",
    accentClass: "border-t-purple-500 hover:border-t-purple-400 shadow-purple-500/5"
  },
  {
    id: "COURSE 03",
    border: "from-purple-500 to-indigo-600",
    title: "Integrated Combo Pathway",
    type: "Skill Enhancement Course (UGC Credit-Bearing)",
    typeShort: "UGC SEC Combo",
    duration: "150 Hours total",
    durationDetail: "Hardware & Software Combined",
    fee: "₹25,000 per student",
    credits: "5 to 6 Credits",
    creditsDetail: "subject to university determination",
    eligibility: "Open to all — any discipline — no prerequisite",
    eligibilityShort: "Open to all (No prereq)",
    covers: "Complete Hardware Mastery SEC followed by complete Software Mastery SEC. Full hardware and software competency in one pathway.",
    outcome: "Student holds comprehensive drone technology competency across both the physical and software dimensions of the field.",
    accentClass: "border-t-emerald-500 hover:border-t-emerald-400 shadow-emerald-500/5"
  },
  {
    id: "COURSE 04",
    border: "from-emerald-500 to-teal-600",
    title: "Industry Ready Program",
    type: "Professional Certification Program (Non-Credit — DGCA Pathway)",
    typeShort: "DGCA Pathway",
    duration: "30 Days (90 Hours)",
    durationDetail: "3 Hours per Session",
    fee: "₹22,000 per student",
    credits: "Non-credit",
    creditsDetail: "DGCA Certificate Readiness",
    eligibility: "Fully independent program — open to all applicants including external candidates — no prerequisite of any kind — prior completion of any SEC course is not required",
    eligibilityShort: "Open to all (Zero prereq)",
    covers: "Four layers — Ground (regulatory framework, Drone Rules 2021, airspace, operator responsibilities), Hands On (simulator training, pre-flight protocol, transmitter mastery), Operations (real-world flight training on DGCA type-certified drones, risk assessment, professional operational sequences), Professional Readiness (DGCA mock examinations, industry awareness, professional pathways). Leads to DGCA Remote Pilot Certificate examination eligibility.",
    outcome: "Student is prepared to sit for and pass the DGCA Remote Pilot Certificate examination and enter the drone sector workforce.",
    accentClass: "border-t-cyan-500 hover:border-t-cyan-400 shadow-cyan-500/5"
  },
];

function ProgramsPage() {
  return (
    <div className="bg-[#050506] text-white min-h-screen pt-28 pb-20 relative">
      {/* Dynamic aviation HUD constellation grid background */}
      <div className="absolute inset-0 bg-hud-grid opacity-35 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(0,240,255,0.03),transparent_65%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Minimalist center-aligned header (No 3D drone at top) */}
        <div className="text-center max-w-3xl mx-auto mb-16 select-none relative p-6 sm:p-8 rounded bg-[#16171A]/20 border border-[#222328]/30 backdrop-blur-sm hud-brackets">
          <span className="text-xs font-mono font-bold text-[#00F0FF] uppercase tracking-[0.3em] block mb-3">
            [ FORMAL CURRICULUMS ]
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white uppercase tracking-tight">
            Our Drone <span className="text-gradient-hud font-extrabold drop-shadow-[0_0_15px_rgba(0,240,255,0.15)]">Education Programs</span>
          </h1>
          <div className="mt-6 flex flex-wrap gap-2.5 justify-center">
            {["UGC Aligned", "DGCA Compliant", "MKBU Certified"].map((t) => (
              <span key={t} className="bg-[#16171A] text-[#00F0FF] border border-[#222328] font-mono text-[9px] uppercase px-3 py-1.5 rounded-full font-bold shadow-[0_0_12px_rgba(0,240,255,0.05)]">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Direct 4 programs grid - 0-lag CSS compositor float cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {programs.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="h-full">
              <div className={`tech-card animate-hud-hover-float group rounded-lg p-6 sm:p-8 h-full relative overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all duration-500 bg-[#16171A] border-t-4 border-[#222328] hud-card-corners ${p.accentClass}`}>
                <div className="cyber-scanline" />
                <DroneVector className="absolute -bottom-6 -right-6 w-28 h-28 text-[#00F0FF] opacity-[0.03] group-hover:opacity-[0.11] transition-opacity duration-300 pointer-events-none animate-drone-wobble" />
                
                <div className="flex flex-col h-full justify-between relative z-10">
                  <div>
                    {/* ID & Course Tag Header */}
                    <div className="flex justify-between items-center mb-5 gap-2 select-none">
                      <span className="font-mono text-[10px] sm:text-xs text-[#00F0FF] font-bold uppercase tracking-widest">{p.id}</span>
                      <span className="bg-[#050506] text-[#00F0FF] border border-[#222328] font-mono text-[9px] uppercase px-3 py-1 rounded-full font-bold whitespace-nowrap">
                        {p.typeShort}
                      </span>
                    </div>

                    {/* Course Title & Type */}
                    <h3 className="text-2xl font-bold font-display text-white tracking-tight leading-tight transition-colors duration-300 group-hover:text-[#00F0FF]">{p.title}</h3>
                    <p className="text-muted-foreground font-mono mt-1.5 text-[10px] uppercase tracking-wider">{p.type}</p>
                    
                    <div className="w-full h-[1px] bg-[#222328] my-5" />

                    {/* Technical Specifications Grid */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 border border-[#222328] bg-[#050506]/75 rounded p-4 mb-6 font-mono text-xs select-none">
                      <div className="flex flex-col gap-1 xs:border-r border-b xs:border-b-0 border-[#222328] pb-3 xs:pb-0 xs:pr-2">
                        <span className="text-[9px] uppercase tracking-widest text-[#8A94A6]/60 font-bold block">DURATION</span>
                        <span className="text-white font-bold font-sans flex items-center gap-1.5 mt-1">
                          <Clock size={14} className="text-[#00F0FF] shrink-0" />
                          <div className="flex flex-col leading-none">
                            <span className="text-xs">{p.duration}</span>
                            {p.durationDetail && <span className="text-[9px] text-[#8A94A6] font-normal mt-0.5">{p.durationDetail}</span>}
                          </div>
                        </span>
                      </div>
                      
                      <div className="flex flex-col gap-1 border-b xs:border-b-0 border-[#222328] pb-3 xs:pb-0 xs:pl-2">
                        <span className="text-[9px] uppercase tracking-widest text-[#8A94A6]/60 font-bold block">CREDIT VALUE</span>
                        <span className="text-white font-bold font-sans flex items-center gap-1.5 mt-1">
                          <Award size={14} className="text-[#00F0FF] shrink-0" />
                          <div className="flex flex-col leading-none">
                            <span className="text-xs">{p.credits}</span>
                            {p.creditsDetail && <span className="text-[9px] text-[#8A94A6] font-normal mt-0.5">{p.creditsDetail}</span>}
                          </div>
                        </span>
                      </div>

                      <div className="flex flex-col gap-1 xs:border-r border-[#222328] pt-3 xs:pr-2 border-b xs:border-b-0 pb-3 xs:pb-0">
                        <span className="text-[9px] uppercase tracking-widest text-[#8A94A6]/60 font-bold block">EXPECTED FEE</span>
                        <span className="text-white font-bold font-sans flex items-center gap-1.5 mt-1">
                          <Coins size={14} className="text-[#00F0FF] shrink-0" />
                          <span className="text-xs">{p.fee}</span>
                        </span>
                      </div>

                      <div className="flex flex-col gap-1 pt-3 xs:pl-2">
                        <span className="text-[9px] uppercase tracking-widest text-[#8A94A6]/60 font-bold block">ELIGIBILITY</span>
                        <span className="text-white font-bold font-sans flex items-center gap-1.5 mt-1" title={p.eligibility}>
                          <UserCheck size={14} className="text-[#00F0FF] shrink-0" />
                          <span className="text-xs truncate max-w-[120px] sm:max-w-none">{p.eligibilityShort}</span>
                        </span>
                      </div>
                    </div>

                    {/* Scope / What it covers */}
                    <div className="mb-6">
                      <h4 className="text-xs font-bold text-white uppercase tracking-widest font-mono mb-2 flex items-center gap-1.5 select-none">
                        <BookOpen size={15} className="text-[#00F0FF]" /> Program Scope & Pedagogy
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed bg-[#050506]/50 border border-[#222328] p-4 rounded font-sans">
                        {p.covers}
                      </p>
                    </div>

                    {/* Detailed Eligibility Info */}
                    <div className="text-[9px] text-muted-foreground/75 font-mono uppercase bg-[#050506]/30 border border-[#222328] p-3 rounded mb-6 leading-relaxed">
                      <strong>Full Eligibility:</strong> {p.eligibility}
                    </div>
                  </div>

                  {/* Outcome Box */}
                  <div className="bg-[#050506] border border-[#222328] rounded p-4 mt-auto">
                    <h4 className="text-xs font-bold text-white uppercase tracking-widest font-mono mb-1.5 flex items-center gap-1.5 select-none">
                      <Sparkles size={14} className="text-[#00F0FF] shrink-0 animate-pulse" /> Core Competency Outcome
                    </h4>
                    <p className="text-xs text-[#8A94A6] font-medium leading-relaxed font-sans">
                      {p.outcome}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>

      <section className="py-12 sm:py-16 bg-hud-radar opacity-95 border-t border-[#222328] mt-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white uppercase tracking-tight">Public Batches Available</h2>
            <p className="mt-3 text-[#8A94A6] text-xs sm:text-sm font-mono">[ OPEN ENROLMENT · NO AEROSPACE EXPERIENCE PREREQUISITE ]</p>
            <Link
              to="/about"
              className="group relative btn-hud-glow inline-block mt-8 bg-[#00F0FF] hover:bg-[#0077FF] text-[#050506] font-mono text-xs sm:text-sm font-bold uppercase tracking-widest px-10 py-3.5 rounded shadow-[0_0_20px_rgba(0,240,255,0.2)] hud-pulse-border"
            >
              Apply Now
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
