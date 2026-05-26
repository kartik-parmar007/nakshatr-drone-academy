import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight, FileSignature, Wrench, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/Reveal";

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
      <section className="bg-white py-20 bg-dot-grid border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-955 leading-tight uppercase tracking-tight">
              Transform Your University With Drone Technology
            </h1>
            <p className="text-sm md:text-base text-blue-600 mt-6 font-mono uppercase tracking-wider">
              [ Zero Investment · Full Centre of Excellence · Revenue Share Included ]
            </p>
          </Reveal>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-white py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
          <Reveal>
            <div className="tech-card rounded-md p-8 h-full bg-white relative">
              <div className="absolute top-3 right-4 font-mono text-[9px] text-blue-300 select-none uppercase">GAP-ANL-09</div>
              <h3 className="text-2xl font-bold text-blue-950 uppercase tracking-tight">The Gap We Close</h3>
              <p className="text-gray-600 mt-4 leading-relaxed text-sm">
                Drone education in India is dominated by short workshops and theoretical
                certificates. Students graduate without the hands-on confidence required
                to operate in real industrial settings. Universities lack the capex and
                operational know-how to build full drone labs alone.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="tech-card rounded-md p-8 h-full bg-white relative border-blue-200/80 flex flex-col justify-center bg-dot-grid">
              <div className="absolute top-3 right-4 font-mono text-[9px] text-blue-300 select-none uppercase">METRIC-STAT-2026</div>
              <div className="text-5xl md:text-6xl font-extrabold text-blue-600 font-mono">12%</div>
              <p className="mt-4 text-blue-950 font-bold font-mono text-xs uppercase tracking-wider">[ CRITICAL METRIC ]</p>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                of drone graduates in India are deployment-ready on Day 1. We close that gap.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-white py-20 border-b border-slate-100 bg-dot-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-955 text-center uppercase tracking-tight">
              What Your University Gets
            </h2>
            <p className="text-gray-500 text-center mt-3 max-w-xl mx-auto text-sm font-mono">
              [ LAB SETUPS, ACADEMICS & PLACEMENTS CORE PROSPECTUS ]
            </p>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-2 gap-4">
            {benefits.map((b, i) => (
              <Reveal key={b} delay={i * 0.03}>
                <div className="tech-card rounded-md p-5 bg-white flex items-start gap-4 border-blue-100/80">
                  <div className="w-10 h-10 rounded bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                    <Check className="text-blue-600" size={20} />
                  </div>
                  <div className="pt-1.5">
                    <h3 className="font-bold text-blue-955 text-sm uppercase tracking-tight font-mono">{b}</h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3 steps */}
      <section className="bg-white py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-955 text-center uppercase tracking-tight">
              Simple 3-Step Partnership
            </h2>
            <p className="text-gray-500 text-center mt-3 max-w-xl mx-auto text-sm font-mono">
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
                <div className="tech-card rounded-md p-8 text-center bg-white h-full relative">
                  <div className="w-10 h-10 rounded border-2 border-blue-600 bg-white text-blue-600 font-mono font-bold flex items-center justify-center text-sm shadow-sm mx-auto">
                    0{s.n}
                  </div>
                  <s.icon className="mx-auto mt-6 text-blue-600" size={28} />
                  <h3 className="mt-4 text-xl font-bold text-blue-955 tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-gray-650 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 bg-line-grid border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-955 uppercase tracking-tight">Ready to build a Centre of Excellence?</h2>
            <p className="text-gray-600 mt-3 text-sm font-mono">[ CUSTOM INSTITUTIONAL PARTNERSHIP SCHEME ]</p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 mt-8 bg-blue-600 hover:bg-blue-700 text-white font-mono text-sm uppercase tracking-wider px-8 py-3.5 rounded-md font-semibold transition-colors shadow-sm"
            >
              Schedule a Meeting <ArrowRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
