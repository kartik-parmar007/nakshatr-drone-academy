import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Rocket, HardHat, Globe2, TrendingUp,
  Sprout, Building2, Shield, Package, Map, LifeBuoy,
  GraduationCap, Building, Briefcase,
  ArrowRight, Wrench, Brain, CheckCircle2,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { DroneModel } from "@/components/DroneModel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nakshatr Technologies LLP — Drone Education in Bhavnagar" },
      { name: "description", content: "India's first university-embedded drone technology company. DGCA compliant, UGC aligned programs." },
      { property: "og:title", content: "Nakshatr Technologies LLP" },
      { property: "og:description", content: "Bridging academia and the drone industry from Bhavnagar, Gujarat." },
    ],
  }),
  component: HomePage,
});

const stats = [
  { icon: Rocket, label: "₹900 Cr+ Market by 2030" },
  { icon: HardHat, label: "1 Lakh+ Jobs by 2025" },
  { icon: Globe2, label: "India: Global Drone Hub 2030" },
  { icon: TrendingUp, label: "30%+ Annual Growth Rate" },
];

const useCases = [
  { icon: Sprout, title: "Agriculture", desc: "Precision crop monitoring, spraying, and yield optimisation across Indian farms." },
  { icon: Building2, title: "Infrastructure", desc: "Inspection of bridges, towers, and large-scale construction sites." },
  { icon: Shield, title: "Defence", desc: "Surveillance, reconnaissance, and tactical operations for national security." },
  { icon: Package, title: "Logistics", desc: "Last-mile delivery and medical supply transport to remote regions." },
  { icon: Map, title: "Surveying", desc: "Photogrammetry, GIS mapping, and high-accuracy terrain modelling." },
  { icon: LifeBuoy, title: "Disaster Management", desc: "Rapid response, search & rescue, and damage assessment after calamities." },
];

const audiences = [
  { icon: GraduationCap, title: "For Students", desc: "Hands-on skills + UGC credits + DGCA-aligned certification for high-demand careers." },
  { icon: Building, title: "For Universities", desc: "A turn-key Centre of Excellence with zero capex and a continuous revenue share." },
  { icon: Briefcase, title: "For Industry", desc: "Deployment-ready talent and certified drone operators on demand." },
];

const news = [
  { tag: "Policy", date: "May 2026", title: "DGCA expands BVLOS trial corridors", desc: "New regulatory framework opens long-range operations for certified operators." },
  { tag: "Market", date: "Apr 2026", title: "Drone manufacturing PLI extended", desc: "Government extends production-linked incentives, boosting domestic OEMs." },
  { tag: "Education", date: "Mar 2026", title: "UGC formalises drone credit framework", desc: "Universities can now offer credit-bearing drone modules under SEC categories." },
];

const pillars = [
  { icon: Wrench, text: "Learn by doing, not by listening" },
  { icon: Brain, text: "Understand the root, master every variant" },
  { icon: CheckCircle2, text: "Demonstrate competence, not memory" },
];

function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 tracking-wide"
            >
              DGCA COMPLIANT · UGC ALIGNED
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight tracking-tight"
            >
              India's First University-Embedded Drone Technology Company
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-5 text-lg text-gray-600 max-w-xl"
            >
              Bridging Academia and the Drone Industry — Bhavnagar, Gujarat.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                to="/programs"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold shadow-md transition-all hover:shadow-lg inline-flex items-center gap-2"
              >
                Explore Programs <ArrowRight size={18} />
              </Link>
              <Link
                to="/universities"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-full font-semibold transition-colors"
              >
                Partner With Us
              </Link>
            </motion.div>
          </div>

          <div className="relative flex justify-center items-center">
            <div className="absolute bottom-4 w-3/4 h-8 bg-blue-500/30 blur-2xl rounded-full" />
            <motion.div
              className="animate-float-drone"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <HeroDroneSvg />
            </motion.div>
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm font-medium">
            <span>4 Programs</span><span className="opacity-50">|</span>
            <span>MKBU Certified</span><span className="opacity-50">|</span>
            <span>DGCA Compliant</span><span className="opacity-50">|</span>
            <span>Est. June 2024</span>
          </div>
        </div>
      </section>

      {/* Industry */}
      <section className="bg-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center">
              The Drone Industry in India
            </h2>
            <p className="text-gray-600 text-center mt-4 max-w-2xl mx-auto">
              India's Drone Rules 2021 and the PLI scheme have unleashed one of the world's
              fastest-growing UAV ecosystems — spanning agriculture, defence, and logistics.
            </p>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                  <s.icon className="text-blue-600 mb-3" size={28} />
                  <div className="font-semibold text-blue-900">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center">
              How Drones Transform Industries
            </h2>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((u, i) => (
              <Reveal key={u.title} delay={i * 0.05}>
                <div className="group bg-white border border-blue-100 hover:border-blue-600 hover:bg-blue-50 hover:-translate-y-1 hover:shadow-lg rounded-xl p-7 transition-all h-full">
                  <u.icon className="text-blue-600 mb-4" size={32} />
                  <h3 className="text-xl font-semibold text-blue-900">{u.title}</h3>
                  <p className="text-gray-600 mt-2 text-sm leading-relaxed">{u.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="bg-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center">
              What Drones Mean For You
            </h2>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {audiences.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.1}>
                <div className="bg-white border border-blue-100 shadow-sm rounded-2xl p-8 text-center hover:shadow-lg transition-all">
                  <div className="w-14 h-14 mx-auto rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <a.icon size={26} />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-blue-900">{a.title}</h3>
                  <p className="text-gray-600 mt-3 text-sm">{a.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center">
              Drone Industry Updates
            </h2>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {news.map((n, i) => (
              <Reveal key={n.title} delay={i * 0.08}>
                <article className="bg-white border border-blue-100 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all h-full flex flex-col">
                  <div className="flex items-center justify-between text-xs">
                    <span className="bg-blue-100 text-blue-700 font-semibold px-2.5 py-1 rounded-full">{n.tag}</span>
                    <span className="text-gray-500">{n.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-blue-900 mt-4">{n.title}</h3>
                  <p className="text-gray-600 text-sm mt-2 flex-1">{n.desc}</p>
                  <a className="text-blue-600 font-semibold text-sm mt-4 inline-flex items-center gap-1 hover:gap-2 transition-all cursor-pointer">
                    Read More <ArrowRight size={14} />
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy + 3D drone */}
      <section className="bg-blue-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="text-white/40 text-xs font-semibold tracking-[0.2em] mb-5">
              THE NAKSHATR PHILOSOPHY
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              We place a drone in a student's hands before a single lecture is delivered
            </h2>
            <div className="w-16 h-1 bg-blue-400 my-7 rounded-full" />
            <p className="text-blue-100 text-lg leading-relaxed max-w-xl">
              Our reverse-engineering pedagogy builds genuine understanding — not
              procedural memory. Every component examined. Every question owned.
              Every skill demonstrated, not just declared.
            </p>
            <ul className="mt-10 space-y-5">
              {pillars.map((p) => (
                <li key={p.text} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center text-blue-300 shrink-0">
                    <p.icon size={20} />
                  </div>
                  <span className="text-white font-medium text-lg pt-1.5">{p.text}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <DroneModel />
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function HeroDroneSvg() {
  return (
    <svg width="380" height="300" viewBox="0 0 380 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* arms */}
      <g stroke="#1d4ed8" strokeWidth="6" strokeLinecap="round">
        <line x1="100" y1="100" x2="190" y2="150" />
        <line x1="280" y1="100" x2="190" y2="150" />
        <line x1="100" y1="200" x2="190" y2="150" />
        <line x1="280" y1="200" x2="190" y2="150" />
      </g>
      {/* body */}
      <rect x="155" y="120" width="70" height="60" rx="10" fill="#1e3a8a" />
      <circle cx="190" cy="150" r="8" fill="#60a5fa" />
      {/* motors */}
      {[
        [100, 100], [280, 100], [100, 200], [280, 200],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="14" fill="#1d4ed8" />
          <ellipse cx={x} cy={y - 5} rx="40" ry="4" fill="#93c5fd" opacity="0.7" />
          <ellipse cx={x} cy={y - 5} rx="4" ry="40" fill="#93c5fd" opacity="0.7" />
        </g>
      ))}
      {/* legs */}
      <line x1="170" y1="180" x2="160" y2="215" stroke="#1e3a5f" strokeWidth="4" strokeLinecap="round" />
      <line x1="210" y1="180" x2="220" y2="215" stroke="#1e3a5f" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
