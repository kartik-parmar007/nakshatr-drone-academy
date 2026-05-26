import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";

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
    border: "border-t-blue-400",
    title: "Hardware Mastery SEC",
    meta: "60 hrs · 5 Days · ₹15,000 · 1–3 Credits",
    eligibility: "All MKBU students welcome",
    bullets: [
      "Drone assembly & electronics",
      "Component identification & diagnosis",
      "Pre-flight protocol & manoeuvres",
    ],
  },
  {
    border: "border-t-blue-500",
    title: "Software Mastery SEC",
    meta: "50 hrs · 5 Days · ₹15,000 · 1–2 Credits",
    eligibility: "All MKBU students welcome",
    bullets: [
      "Mission planning & simulation",
      "GIS mapping & data processing",
      "Computer vision & AI applications",
    ],
  },
  {
    border: "border-t-blue-600",
    title: "Integrated Combo Pathway",
    meta: "150 hrs · Combined · ₹25,000 · 3–6 Credits",
    eligibility: "All MKBU students welcome",
    bullets: [
      "Complete hardware + software",
      "Maximum credit allocation",
      "DGCA exam preparation",
    ],
  },
  {
    border: "border-t-blue-900",
    title: "Industry Ready Program",
    meta: "40 hrs · 5 Days · ₹22,000 · Professional",
    eligibility: "Open to EVERYONE — zero prerequisites",
    bullets: [
      "DGCA-compliant operations",
      "Real-world deployment scenarios",
      "Joint certification issued",
    ],
  },
];

function ProgramsPage() {
  return (
    <div>
      <section className="bg-white py-20 bg-dot-grid border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-955 uppercase tracking-tight">
              Our Drone Education Programs
            </h1>
            <p className="text-gray-500 mt-2 text-sm font-mono">[ ACADEMIC CURRICULUMS & TECHNICAL MODULES ]</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {["UGC Aligned", "DGCA Compliant", "MKBU Certified"].map((t) => (
                <span key={t} className="bg-blue-50 text-blue-700 border border-blue-200/50 font-mono text-xs uppercase px-4 py-1.5 rounded font-semibold">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-7">
          {programs.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="tech-card rounded-md p-8 h-full relative overflow-hidden bg-white border border-blue-100 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-mono text-[9px] text-blue-400 font-semibold uppercase">SPEC-DOC-0{i + 1}</span>
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-950 tracking-tight">{p.title}</h3>
                  <p className="text-blue-600 font-bold font-mono mt-3 text-xs uppercase tracking-wider">{p.meta}</p>
                  <p className="text-gray-500 mt-2 text-xs font-mono uppercase">[ ELIGIBILITY: {p.eligibility} ]</p>
                  <div className="w-full h-[1px] bg-slate-100 my-5" />
                  <ul className="space-y-3">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-gray-700">
                        <Check size={16} className="text-blue-600 mt-0.5 shrink-0" />
                        <span className="text-sm leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 bg-line-grid border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-955 uppercase tracking-tight">Public Batches Available</h2>
            <p className="mt-3 text-gray-600 text-sm font-mono">[ OPEN ENROLMENT · NO AEROSPACE EXPERIENCE PREREQUISITE ]</p>
            <Link
              to="/about"
              className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white font-mono text-sm uppercase tracking-wider px-8 py-3 rounded-md font-semibold transition-colors shadow-sm"
            >
              Apply Now
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
