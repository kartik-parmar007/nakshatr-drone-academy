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
      <section className="bg-blue-50 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight">
              Transform Your University With Drone Technology
            </h1>
            <p className="text-lg md:text-xl text-blue-600 mt-6 font-medium">
              Zero Investment. Full Centre of Excellence. Revenue Share Included.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
          <Reveal>
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 h-full">
              <h3 className="text-2xl font-bold text-blue-900">The Gap We Close</h3>
              <p className="text-gray-600 mt-4 leading-relaxed">
                Drone education in India is dominated by short workshops and theoretical
                certificates. Students graduate without the hands-on confidence required
                to operate in real industrial settings. Universities lack the capex and
                operational know-how to build full drone labs alone.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="bg-blue-600 text-white rounded-2xl p-8 h-full flex flex-col justify-center">
              <div className="text-5xl md:text-6xl font-bold">12%</div>
              <p className="mt-3 text-blue-100 text-lg">
                of drone graduates in India are deployment-ready on Day 1. We close that gap.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center">
              What Your University Gets
            </h2>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-2 gap-4">
            {benefits.map((b, i) => (
              <Reveal key={b} delay={i * 0.03}>
                <div className="bg-white border border-blue-100 rounded-xl p-5 flex items-start gap-4 hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Check className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900">{b}</h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3 steps */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center">
              Simple 3-Step Partnership
            </h2>
          </Reveal>
          <div className="mt-14 grid md:grid-cols-3 gap-6 items-stretch relative">
            {[
              { n: 1, icon: FileSignature, title: "Sign MoU", desc: "Mutually beneficial agreement, fully transparent terms." },
              { n: 2, icon: Wrench, title: "We Set Up Everything", desc: "Lab, curriculum, instructors, equipment — all included." },
              { n: 3, icon: TrendingUp, title: "You Earn, We Deliver", desc: "Continuous revenue share as students complete cohorts." },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className="bg-white border border-blue-100 rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition-all h-full relative">
                  <div className="w-14 h-14 mx-auto rounded-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center">
                    {s.n}
                  </div>
                  <s.icon className="mx-auto mt-5 text-blue-600" size={28} />
                  <h3 className="mt-3 text-xl font-semibold text-blue-900">{s.title}</h3>
                  <p className="mt-2 text-gray-600 text-sm">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-900 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold">Ready to build a Centre of Excellence?</h2>
            <p className="text-blue-400 mt-3 text-lg">Let's design the partnership that works for your institution.</p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 mt-8 bg-white text-blue-900 font-semibold px-8 py-4 rounded-full hover:bg-blue-50 transition-all shadow-xl text-lg"
            >
              Schedule a Meeting <ArrowRight size={20} />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
