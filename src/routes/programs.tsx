import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Clock, Award, Coins, BookOpen, Sparkles, UserCheck } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { DroneGLB } from "@/components/DroneGLB";

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
    ],
  }),
  component: ProgramsPage,
});

const programs = [
  {
    id: "SPEC-DOC-01",
    border: "from-blue-400 to-indigo-500",
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
  },
  {
    id: "SPEC-DOC-02",
    border: "from-blue-500 to-indigo-600",
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
  },
  {
    id: "SPEC-DOC-03",
    border: "from-blue-600 to-indigo-700",
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
  },
  {
    id: "SPEC-DOC-04",
    border: "from-indigo-600 to-violet-800",
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
  },
];

function ProgramsPage() {
  return (
    <div>
      <section className="bg-background bg-dot-grid border-b border-border relative overflow-hidden">
        {/* Futuristic glowing backdrop */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_30%,rgba(59,130,246,0.06),transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 grid lg:grid-cols-2 gap-8 items-center relative z-10">
          <div className="text-left">
            <Reveal>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground uppercase tracking-tight font-display">
                Our Drone Education Programs
              </h1>
              <p className="text-muted-foreground mt-2 text-xs sm:text-sm font-mono">[ ACADEMIC CURRICULUMS & TECHNICAL MODULES ]</p>
              <div className="mt-5 sm:mt-6 flex flex-wrap gap-2">
                {["UGC Aligned", "DGCA Compliant", "MKBU Certified"].map((t) => (
                  <span key={t} className="bg-blue-955 text-blue-400 border border-blue-900/50 font-mono text-[10px] sm:text-xs uppercase px-3 py-1 rounded font-semibold">
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Interactive 3D Specs Drone Viewer */}
          <div className="relative flex justify-center items-center min-h-[300px] xs:min-h-[360px] sm:min-h-[400px]">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-40">
              <div className="w-72 h-72 rounded-full border border-dashed border-blue-500/15 animate-[spin_50s_linear_infinite]" />
              <div className="absolute w-[85%] h-[1px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
            </div>

            <motion.div
              className="w-full max-w-[420px] z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <DroneGLB className="h-[280px] xs:h-[320px] sm:h-[360px]" scale={1.8} />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-background py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {programs.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="h-full">
              <div className="tech-card group rounded-lg p-5 sm:p-8 h-full relative overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300">
                <div className="cyber-scanline" />
                <DroneVector className="absolute -bottom-6 -right-6 w-28 h-28 text-primary opacity-[0.03] group-hover:opacity-[0.11] transition-opacity duration-300 pointer-events-none animate-drone-wobble" />
                {/* Top Highlight Gradient Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${p.border}`} />
                
                <div className="flex flex-col h-full justify-between relative z-10">
                  <div>
                    {/* ID & Course Tag Header */}
                    <div className="flex justify-between items-center mb-4 sm:mb-5 gap-2">
                      <span className="font-mono text-[9px] sm:text-[10px] text-primary font-semibold uppercase tracking-widest">{p.id}</span>
                      <span className="bg-blue-955 text-blue-400 border border-blue-900/50 font-mono text-[9px] uppercase px-2 sm:px-2.5 py-1 rounded font-bold whitespace-nowrap">
                        {p.typeShort}
                      </span>
                    </div>

                    {/* Course Title & Type */}
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight leading-tight font-display transition-colors duration-300 group-hover:text-primary">{p.title}</h3>
                    <p className="text-muted-foreground font-mono mt-1 text-[10px] uppercase tracking-wider">{p.type}</p>
                    
                    <div className="w-full h-[1px] bg-border my-4 sm:my-5" />

                    {/* Technical Specifications Grid */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 border border-border bg-zinc-950/40 rounded-md p-3 sm:p-4 mb-5 sm:mb-6 font-mono text-xs">
                      <div className="flex flex-col gap-1 xs:border-r border-b xs:border-b-0 border-border pb-2.5 xs:pb-0 xs:pr-2">
                        <span className="text-[9px] uppercase tracking-widest text-muted-foreground/70 font-bold block">DURATION</span>
                        <span className="text-foreground font-bold font-sans flex items-center gap-1.5">
                          <Clock size={13} className="text-primary shrink-0" />
                          <div className="flex flex-col leading-none">
                            <span className="text-xs">{p.duration}</span>
                            {p.durationDetail && <span className="text-[9px] text-muted-foreground font-normal mt-0.5">{p.durationDetail}</span>}
                          </div>
                        </span>
                      </div>
                      
                      <div className="flex flex-col gap-1 border-b xs:border-b-0 border-border pb-2.5 xs:pb-0 xs:pl-2">
                        <span className="text-[9px] uppercase tracking-widest text-muted-foreground/70 font-bold block">CREDIT VALUE</span>
                        <span className="text-foreground font-bold font-sans flex items-center gap-1.5">
                          <Award size={13} className="text-primary shrink-0" />
                          <div className="flex flex-col leading-none">
                            <span className="text-xs">{p.credits}</span>
                            {p.creditsDetail && <span className="text-[9px] text-muted-foreground font-normal mt-0.5">{p.creditsDetail}</span>}
                          </div>
                        </span>
                      </div>

                      <div className="flex flex-col gap-1 xs:border-r border-border pt-2.5 xs:pr-2 border-b xs:border-b-0 pb-2.5 xs:pb-0">
                        <span className="text-[9px] uppercase tracking-widest text-muted-foreground/70 font-bold block">EXPECTED FEE</span>
                        <span className="text-foreground font-bold font-sans flex items-center gap-1.5">
                          <Coins size={13} className="text-primary shrink-0" />
                          <span className="text-xs">{p.fee}</span>
                        </span>
                      </div>

                      <div className="flex flex-col gap-1 pt-2.5 xs:pl-2">
                        <span className="text-[9px] uppercase tracking-widest text-muted-foreground/70 font-bold block">ELIGIBILITY</span>
                        <span className="text-foreground font-bold font-sans flex items-center gap-1.5" title={p.eligibility}>
                          <UserCheck size={13} className="text-primary shrink-0" />
                          <span className="text-xs truncate">{p.eligibilityShort}</span>
                        </span>
                      </div>
                    </div>

                    {/* Scope / What it covers */}
                    <div className="mb-5 sm:mb-6">
                      <h4 className="text-xs font-bold text-foreground uppercase tracking-widest font-mono mb-2 flex items-center gap-1.5">
                        <BookOpen size={14} className="text-primary" /> Program Scope & Pedagogy
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed bg-zinc-950/20 border border-border p-3 sm:p-4 rounded-md shadow-sm font-sans">
                        {p.covers}
                      </p>
                    </div>

                    {/* Detailed Eligibility Info */}
                    <div className="text-[10px] text-muted-foreground/80 font-mono uppercase bg-zinc-950/30 border border-border p-3 rounded mb-5 sm:mb-6 leading-relaxed">
                      <strong>Full Eligibility:</strong> {p.eligibility}
                    </div>
                  </div>

                  {/* Outcome Box */}
                  <div className="bg-blue-955/30 border border-blue-900/50 rounded-md p-3 sm:p-4 mt-auto">
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-widest font-mono mb-1.5 flex items-center gap-1.5">
                      <Sparkles size={14} className="text-primary shrink-0 animate-pulse" /> Core Competency Outcome
                    </h4>
                    <p className="text-xs text-muted-foreground font-medium leading-relaxed font-sans">
                      {p.outcome}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16 bg-line-grid border-t border-border">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground uppercase tracking-tight font-display">Public Batches Available</h2>
            <p className="mt-3 text-muted-foreground text-xs sm:text-sm font-mono">[ OPEN ENROLMENT · NO AEROSPACE EXPERIENCE PREREQUISITE ]</p>
            <Link
              to="/about"
              className="inline-block mt-6 sm:mt-8 bg-primary hover:bg-blue-700 text-white font-mono text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-8 py-3 rounded-md font-semibold transition-colors shadow-sm"
            >
              Apply Now
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
