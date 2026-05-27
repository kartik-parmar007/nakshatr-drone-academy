import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight, FileSignature, Wrench, TrendingUp } from "lucide-react";
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

export const Route = createFileRoute("/universities")({
  head: () => ({
    meta: [
      { title: "University Partnerships — Nakshatr Technologies" },
      { name: "description", content: "Zero investment Centre of Excellence with revenue share. Transform your university with drone technology." },
      { property: "og:title", content: "Transform Your University With Drones" },
    ],
  }),
  component: UniversitiesPage,
});

const benefits = [
  "Fully equipped drone lab on your campus",
  "Curriculum aligned to UGC SEC framework",
  "DGCA-compliant operating procedures",
  "Continuous revenue share from every batch",
  "Joint branded certification for your students",
  "Industry-ready placements pipeline",
  "Faculty enablement workshops",
  "Annual upgrade of equipment and curriculum",
  "Marketing & admissions support",
  "Public batch operations on your campus",
];
function UniversitiesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-background py-20 bg-dot-grid border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight uppercase tracking-tight font-display">
              Transform Your University With Drone Technology
            </h1>
            <p className="text-sm md:text-base text-primary mt-6 font-mono uppercase tracking-widest">
              [ Zero Investment · Full Centre of Excellence · Revenue Share Included ]
            </p>
          </Reveal>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-background py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
          <Reveal>
            <div className="tech-card group rounded-md p-8 h-full relative overflow-hidden">
              <div className="cyber-scanline" />
              <DroneVector className="absolute -bottom-4 -right-4 w-20 h-20 text-primary opacity-[0.03] group-hover:opacity-[0.11] transition-opacity duration-300 pointer-events-none animate-drone-wobble" />
              <div className="absolute top-3 right-4 font-mono text-[9px] text-blue-500/50 select-none uppercase">GAP-ANL-09</div>
              <h3 className="text-2xl font-bold text-foreground uppercase tracking-tight font-display transition-colors duration-300 group-hover:text-primary relative z-10">The Gap We Close</h3>
              <p className="text-muted-foreground mt-4 leading-relaxed text-sm relative z-10">
                Drone education in India is dominated by short workshops and theoretical
                certificates. Students graduate without the hands-on confidence required
                to operate in real industrial settings. Universities lack the capex and
                operational know-how to build full drone labs alone.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="tech-card group rounded-md p-8 h-full relative border-primary/20 flex flex-col justify-center bg-dot-grid overflow-hidden">
              <div className="cyber-scanline" />
              <DroneVector className="absolute -bottom-4 -right-4 w-20 h-20 text-primary opacity-[0.03] group-hover:opacity-[0.11] transition-opacity duration-300 pointer-events-none animate-drone-wobble" />
              <div className="absolute top-3 right-4 font-mono text-[9px] text-blue-500/50 select-none uppercase">METRIC-STAT-2026</div>
              <div className="text-5xl md:text-6xl font-extrabold text-primary font-mono relative z-10">12%</div>
              <p className="mt-4 text-primary font-bold font-mono text-xs uppercase tracking-widest relative z-10">[ CRITICAL METRIC ]</p>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed font-sans relative z-10">
                of drone graduates in India are deployment-ready on Day 1. We close that gap.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-background py-20 border-b border-border bg-dot-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center uppercase tracking-tight font-display">
              What Your University Gets
            </h2>
            <p className="text-muted-foreground text-center mt-3 max-w-xl mx-auto text-sm font-mono">
              [ LAB SETUPS, ACADEMICS & PLACEMENTS CORE PROSPECTUS ]
            </p>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-2 gap-4">
            {benefits.map((b, i) => (
              <Reveal key={b} delay={i * 0.03}>
                <div className="tech-card group rounded-md p-5 flex items-start gap-4 overflow-hidden">
                  <div className="cyber-scanline" />
                  <DroneVector className="absolute -bottom-4 -right-4 w-20 h-20 text-primary opacity-[0.03] group-hover:opacity-[0.11] transition-opacity duration-300 pointer-events-none animate-drone-wobble" />
                  <div className="w-10 h-10 rounded bg-blue-955 border border-blue-900/50 flex items-center justify-center shrink-0 relative z-10">
                    <Check className="text-primary" size={20} />
                  </div>
                  <div className="pt-1.5 relative z-10">
                    <h3 className="font-bold text-foreground text-sm uppercase tracking-wider font-display transition-colors duration-300 group-hover:text-primary">{b}</h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3 steps */}
      <section className="bg-background py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center uppercase tracking-tight font-display">
              Simple 3-Step Partnership
            </h2>
            <p className="text-muted-foreground text-center mt-3 max-w-xl mx-auto text-sm font-mono">
              [ MOU SIGNING & DEPLOYMENT INGESTION SEQUENCE ]
            </p>
          </Reveal>
          <div className="mt-14 grid md:grid-cols-3 gap-6 items-stretch relative">
            {[
              { n: 1, icon: FileSignature, title: "Sign MoU", desc: "Mutually beneficial agreement, fully transparent terms." },
              { n: 2, icon: Wrench, title: "We Set Up Everything", desc: "Lab, curriculum, instructors, equipment — all included." },
              { n: 3, icon: TrendingUp, title: "You Earn, We Deliver", desc: "Continuous revenue share as students complete cohorts." },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className="tech-card group rounded-md p-8 text-center h-full relative overflow-hidden">
                  <div className="cyber-scanline" />
                  <DroneVector className="absolute -bottom-4 -right-4 w-20 h-20 text-primary opacity-[0.03] group-hover:opacity-[0.11] transition-opacity duration-300 pointer-events-none animate-drone-wobble" />
                  <div className="w-10 h-10 rounded border border-primary bg-zinc-955 text-primary font-mono font-bold flex items-center justify-center text-sm shadow-sm mx-auto relative z-10">
                    0{s.n}
                  </div>
                  <s.icon className="mx-auto mt-6 text-primary relative z-10" size={28} />
                  <h3 className="mt-4 text-xl font-bold text-foreground tracking-tight font-display transition-colors duration-300 group-hover:text-primary relative z-10">{s.title}</h3>
                  <p className="mt-2 text-muted-foreground text-sm leading-relaxed relative z-10">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background py-20 bg-line-grid border-t border-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground uppercase tracking-tight font-display">Ready to build a Centre of Excellence?</h2>
            <p className="text-muted-foreground mt-3 text-sm font-mono">[ CUSTOM INSTITUTIONAL PARTNERSHIP SCHEME ]</p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 mt-8 bg-primary hover:bg-blue-700 text-white font-mono text-sm uppercase tracking-wider px-8 py-3.5 rounded-md font-semibold transition-all shadow-sm"
            >
              Schedule a Meeting <ArrowRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
