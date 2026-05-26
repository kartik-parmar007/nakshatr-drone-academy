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
import { DroneGLB } from "@/components/DroneGLB";

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
      <section className="bg-white bg-dot-grid border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-mono font-semibold px-3 py-1.5 rounded mb-5 tracking-wider uppercase"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              SYSTEM ACTIVE · DGCA COMPLIANT · UGC ALIGNED
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-950 leading-tight tracking-tight"
            >
              India's First University-Embedded Drone Technology Company
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-5 text-lg text-gray-600 max-w-xl leading-relaxed"
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
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md font-semibold font-mono text-sm uppercase tracking-wider shadow-sm transition-all hover:shadow inline-flex items-center gap-2"
              >
                Explore Programs <ArrowRight size={16} />
              </Link>
              <Link
                to="/universities"
                className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2.5 rounded-md font-semibold font-mono text-sm uppercase tracking-wider transition-colors"
              >
                Partner With Us
              </Link>
            </motion.div>
          </div>

          <div className="relative flex justify-center items-center">
            <div className="absolute bottom-4 w-3/4 h-8 bg-blue-400/20 blur-2xl rounded-full" />
            <motion.div
              className="animate-float-drone w-full max-w-[460px]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <DroneGLB height={420} />
            </motion.div>
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="border-t border-slate-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-mono uppercase tracking-wider text-blue-800">
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-600 rounded-full" /> 4 Active Programs</span>
            <span className="opacity-30">/</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-600 rounded-full" /> MKBU Certified</span>
            <span className="opacity-30">/</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-600 rounded-full" /> DGCA Compliant</span>
            <span className="opacity-30">/</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-600 rounded-full" /> Est. June 2024</span>
          </div>
        </div>
      </section>

      {/* Industry */}
      <section className="bg-white py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 text-center uppercase tracking-tight">
              The Drone Industry in India
            </h2>
            <p className="text-gray-500 text-center mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
              India's Drone Rules 2021 and the PLI scheme have unleashed one of the world's
              fastest-growing UAV ecosystems — spanning agriculture, defence, and logistics.
            </p>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="tech-card rounded-md p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 font-mono text-[9px] text-blue-300 select-none">
                    SYS-STAT-{i + 1}
                  </div>
                  <s.icon className="text-blue-600 mb-4" size={28} />
                  <div className="font-semibold text-blue-950 text-base leading-snug tracking-tight">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="bg-white py-20 bg-dot-grid border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 text-center uppercase tracking-tight">
              Industrial Applications
            </h2>
            <p className="text-gray-500 text-center mt-3 max-w-xl mx-auto text-sm font-mono">
              [ OPERATIONAL DOMAINS & REAL-WORLD DEPLOYMENT ]
            </p>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((u, i) => (
              <Reveal key={u.title} delay={i * 0.05}>
                <div className="tech-card rounded-md p-7 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <u.icon className="text-blue-600" size={30} />
                      <span className="font-mono text-[10px] text-blue-500 font-semibold bg-blue-50/50 border border-blue-100 px-2 py-0.5 rounded">
                        OP-MOD-0{i + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-blue-950">{u.title}</h3>
                    <p className="text-gray-600 mt-2 text-sm leading-relaxed">{u.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="bg-white py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 text-center uppercase tracking-tight">
              What Drones Mean For You
            </h2>
            <p className="text-gray-500 text-center mt-3 max-w-xl mx-auto text-sm font-mono">
              [ ACADEMIC EMBEDDED INTEGRATION ]
            </p>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {audiences.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.1}>
                <div className="tech-card rounded-md p-8 text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-6 shadow-inner">
                    <a.icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-blue-950">{a.title}</h3>
                  <p className="text-gray-600 mt-3 text-sm leading-relaxed">{a.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="bg-white py-20 bg-dot-grid border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 text-center uppercase tracking-tight">
              Drone Industry Updates
            </h2>
            <p className="text-gray-500 text-center mt-3 max-w-xl mx-auto text-sm font-mono">
              [ POLICY, TECHNOLOGY & ECOSYSTEM LOGS ]
            </p>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {news.map((n, i) => (
              <Reveal key={n.title} delay={i * 0.08}>
                <article className="tech-card rounded-md p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="bg-blue-50 text-blue-600 border border-blue-100/80 font-semibold px-2 py-0.5 rounded">
                        {n.tag}
                      </span>
                      <span className="text-gray-500">{n.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-blue-950 mt-4 leading-snug">{n.title}</h3>
                    <p className="text-gray-600 text-sm mt-2 leading-relaxed">{n.desc}</p>
                  </div>
                  <a className="text-blue-600 font-semibold text-xs font-mono uppercase mt-6 inline-flex items-center gap-1.5 hover:text-blue-800 transition-colors cursor-pointer">
                    Read More <ArrowRight size={12} />
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy + 3D drone */}
      <section className="bg-white py-24 bg-line-grid border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="text-blue-600 text-xs font-bold font-mono tracking-[0.2em] mb-4 uppercase">
              [ THE NAKSHATR PHILOSOPHY ]
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-950 leading-tight tracking-tight">
              We place a drone in a student's hands before a single lecture is delivered
            </h2>
            <div className="w-full h-[1px] bg-blue-100 my-7" />
            <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
              Our reverse-engineering pedagogy builds genuine understanding — not
              procedural memory. Every component examined. Every question owned.
              Every skill demonstrated, not just declared.
            </p>
            <ul className="mt-10 space-y-5">
              {pillars.map((p, i) => (
                <li key={p.text} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                    <p.icon size={20} />
                  </div>
                  <div className="pt-1">
                    <span className="font-mono text-xs text-blue-400 font-semibold uppercase block">PILLAR 0{i + 1}</span>
                    <span className="text-blue-950 font-semibold text-lg">{p.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="border border-blue-100/80 rounded-lg p-4 bg-white/80 backdrop-blur-sm shadow-sm relative">
              <div className="absolute top-3 left-4 font-mono text-[9px] text-blue-400 uppercase select-none flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                INTEGRATED-3D-SIMULATOR
              </div>
              <DroneModel />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
