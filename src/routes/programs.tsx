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
      <section className="bg-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900">
              Our Drone Education Programs
            </h1>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {["UGC Aligned", "DGCA Compliant", "MKBU Certified"].map((t) => (
                <span key={t} className="bg-blue-100 text-blue-700 font-semibold text-xs px-4 py-1.5 rounded-full">
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
              <div className={`bg-white border-t-4 ${p.border} shadow-lg rounded-2xl p-8 h-full hover:-translate-y-2 hover:shadow-2xl transition-all`}>
                <h3 className="text-2xl font-bold text-blue-900">{p.title}</h3>
                <p className="text-blue-600 font-medium mt-2 text-sm">{p.meta}</p>
                <p className="text-gray-500 mt-2 text-sm">{p.eligibility}</p>
                <ul className="mt-6 space-y-3">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-gray-700">
                      <Check size={18} className="text-blue-600 mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-blue-600 py-16">
        <div className="max-w-5xl mx-auto px-4 text-center text-white">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold">Public Batches Available</h2>
            <p className="mt-3 text-blue-100 text-lg">Open to all — no experience needed.</p>
            <Link
              to="/about"
              className="inline-block mt-7 bg-white text-blue-600 font-semibold px-7 py-3 rounded-full hover:bg-blue-50 transition-colors shadow-lg"
            >
              Apply Now
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
