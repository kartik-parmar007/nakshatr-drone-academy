import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Rocket, HardHat, Globe2, TrendingUp,
  Sprout, Building2, Shield, Package, Map, LifeBuoy,
  GraduationCap, Building, Briefcase,
  ArrowRight, Wrench, Brain, CheckCircle2,
} from "lucide-react";
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
];function HomePage() {
  const [telemetry, setTelemetry] = useState({
    pitch: "0.0",
    yaw: "0.0",
    roll: "0.0",
    alt: "124.80",
    freq: "5.750",
    esc: "98",
  });

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setTelemetry(customEvent.detail);
      }
    };
    window.addEventListener("drone-telemetry-update", handleUpdate);
    return () => window.removeEventListener("drone-telemetry-update", handleUpdate);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="bg-background bg-dot-grid border-b border-border relative overflow-hidden">
        {/* Futuristic glowing ambient background gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.06),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(34,211,238,0.06),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center relative z-10">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-blue-955 border border-blue-900/60 text-blue-400 text-[10px] sm:text-xs font-mono font-semibold px-2.5 sm:px-3 py-1.5 rounded mb-4 sm:mb-5 tracking-widest uppercase shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="hidden xs:inline">SYSTEM ACTIVE · </span>DGCA · UGC ALIGNED
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight font-display"
            >
              India's First University-Embedded Drone Technology Company
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-4 sm:mt-5 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              Bridging Academia and the Drone Industry — Bhavnagar, Gujarat.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4"
            >
              <Link
                to="/programs"
                className="bg-primary hover:bg-blue-700 text-white px-5 sm:px-6 py-2.5 rounded-md font-semibold font-mono text-xs sm:text-sm uppercase tracking-wider shadow-sm transition-all hover:shadow inline-flex items-center gap-2"
              >
                Explore Programs <ArrowRight size={16} />
              </Link>
              <Link
                to="/universities"
                className="border border-blue-500 text-blue-400 hover:bg-blue-955/30 px-5 sm:px-6 py-2.5 rounded-md font-semibold font-mono text-xs sm:text-sm uppercase tracking-wider transition-all"
              >
                Partner With Us
              </Link>
            </motion.div>
          </div>

          <div className="relative flex justify-center items-center order-first lg:order-last min-h-[380px] xs:min-h-[450px] sm:min-h-[520px] md:min-h-[600px] lg:min-h-[700px] w-full">
            <div className="absolute bottom-2 sm:bottom-4 w-3/4 h-6 sm:h-8 bg-blue-500/10 blur-3xl rounded-full" />
            
            {/* Animated High-Tech Scanning Target (Radar Reticle Overlays) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-40">
              <div className="w-80 h-80 rounded-full border border-dashed border-blue-500/20 animate-[spin_40s_linear_infinite]" />
              <div className="absolute w-64 h-64 rounded-full border border-dashed border-cyan-500/15 animate-[spin_20s_linear_infinite_reverse]" />
              <div className="absolute w-[90%] h-[1px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
              <div className="absolute h-[90%] w-[1px] bg-gradient-to-b from-transparent via-blue-500/10 to-transparent" />
            </div>

            {/* Top-Left Telemetry Floating Widget */}
            <div className="absolute top-8 left-0 z-20 border border-blue-500/20 bg-zinc-950/80 p-3 rounded font-mono text-[9px] text-blue-400 tracking-wider backdrop-blur-md shadow-lg hidden sm:block min-w-[130px]">
              <div className="flex items-center gap-1.5 font-bold mb-1 uppercase text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                Telemetry Log
              </div>
              <div className="space-y-0.5 opacity-80 select-none">
                <div>PITCH: {telemetry.pitch}°</div>
                <div>YAW: {telemetry.yaw}°</div>
                <div>ROLL: {telemetry.roll}°</div>
                <div>ALT: {telemetry.alt} M</div>
              </div>
            </div>

            {/* Bottom-Right System Status Widget */}
            <div className="absolute bottom-8 right-0 z-20 border border-emerald-500/20 bg-zinc-950/80 p-3 rounded font-mono text-[9px] text-emerald-400 tracking-wider backdrop-blur-md shadow-lg hidden sm:block min-w-[145px]">
              <div className="flex items-center gap-1.5 font-bold mb-1 uppercase text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Calibration State
              </div>
              <div className="space-y-0.5 opacity-80 select-none">
                <div>ESC SENSOR: {telemetry.esc}%</div>
                <div>GYRO STATE: ACTIVE</div>
                <div>FREQ: {telemetry.freq} GHZ</div>
                <div>SYS ID: NK-DRN-2026</div>
              </div>
            </div>

            <motion.div
              className="w-full max-w-[640px] z-10"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <DroneGLB
                className="h-[380px] xs:h-[450px] sm:h-[520px] md:h-[600px] lg:h-[700px]"
                scale={2.2}
              />
            </motion.div>
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="border-t border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-8 gap-y-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full" /> 4 Active Programs</span>
            <span className="opacity-30 hidden sm:inline">/</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full" /> MKBU Certified</span>
            <span className="opacity-30 hidden sm:inline">/</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full" /> DGCA Compliant</span>
            <span className="opacity-30 hidden sm:inline">/</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full" /> Est. June 2024</span>
          </div>
        </div>
      </section>

      {/* Industry */}
      <section className="bg-background py-14 sm:py-16 lg:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-center uppercase tracking-tight font-display">
              The Drone Industry in India
            </h2>
            <p className="text-muted-foreground text-center mt-3 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed px-2">
              India's Drone Rules 2021 and the PLI scheme have unleashed one of the world's
              fastest-growing UAV ecosystems — spanning agriculture, defence, and logistics.
            </p>
          </Reveal>
          <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="tech-card group rounded-md p-5 sm:p-6 relative overflow-hidden">
                  <div className="cyber-scanline" />
                  <DroneVector className="absolute -bottom-4 -right-4 w-20 h-20 text-primary opacity-[0.03] group-hover:opacity-[0.11] transition-opacity duration-300 pointer-events-none animate-drone-wobble" />
                  <div className="absolute top-0 right-0 p-2 font-mono text-[8px] text-blue-500/50 select-none">
                    SYS-STAT-{i + 1}
                  </div>
                  <s.icon className="text-primary mb-3 sm:mb-4 animate-float-drone" size={28} />
                  <div className="font-semibold text-foreground text-sm sm:text-base leading-snug tracking-tight font-display">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="bg-background py-14 sm:py-16 lg:py-20 bg-dot-grid border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-center uppercase tracking-tight font-display">
              Industrial Applications
            </h2>
            <p className="text-muted-foreground text-center mt-3 max-w-xl mx-auto text-xs sm:text-sm font-mono">
              [ OPERATIONAL DOMAINS & REAL-WORLD DEPLOYMENT ]
            </p>
          </Reveal>
          <div className="mt-10 sm:mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {useCases.map((u, i) => (
              <Reveal key={u.title} delay={i * 0.05}>
                <div className="tech-card group rounded-md p-5 sm:p-7 h-full flex flex-col justify-between relative overflow-hidden">
                  <div className="cyber-scanline" />
                  <DroneVector className="absolute -bottom-4 -right-4 w-20 h-20 text-primary opacity-[0.03] group-hover:opacity-[0.11] transition-opacity duration-300 pointer-events-none animate-drone-wobble" />
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                      <u.icon className="text-primary" size={28} />
                      <span className="font-mono text-[9px] text-blue-400 font-semibold bg-blue-955/40 border border-blue-900/50 px-2 py-0.5 rounded">
                        OP-MOD-0{i + 1}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground font-display">{u.title}</h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{u.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="bg-background py-14 sm:py-16 lg:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-center uppercase tracking-tight font-display">
              What Drones Mean For You
            </h2>
            <p className="text-muted-foreground text-center mt-3 max-w-xl mx-auto text-xs sm:text-sm font-mono">
              [ ACADEMIC EMBEDDED INTEGRATION ]
            </p>
          </Reveal>
          <div className="mt-10 sm:mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {audiences.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.1}>
                <div className="tech-card group rounded-md p-6 sm:p-8 text-center flex flex-col items-center relative overflow-hidden">
                  <div className="cyber-scanline" />
                  <DroneVector className="absolute -bottom-4 -right-4 w-20 h-20 text-primary opacity-[0.03] group-hover:opacity-[0.11] transition-opacity duration-300 pointer-events-none animate-drone-wobble" />
                  <div className="w-12 h-12 rounded-md bg-blue-955/30 border border-blue-900/55 flex items-center justify-center text-primary mb-5 sm:mb-6 shadow-inner">
                    <a.icon size={24} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground font-display relative z-10">{a.title}</h3>
                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed relative z-10">{a.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="bg-background py-14 sm:py-16 lg:py-20 bg-dot-grid border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-center uppercase tracking-tight font-display">
              Drone Industry Updates
            </h2>
            <p className="text-muted-foreground text-center mt-3 max-w-xl mx-auto text-xs sm:text-sm font-mono">
              [ POLICY, TECHNOLOGY & ECOSYSTEM LOGS ]
            </p>
          </Reveal>
          <div className="mt-10 sm:mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {news.map((n, i) => (
              <Reveal key={n.title} delay={i * 0.08}>
                <article className="tech-card group rounded-md p-5 sm:p-6 h-full flex flex-col justify-between relative overflow-hidden">
                  <div className="cyber-scanline" />
                  <DroneVector className="absolute -bottom-4 -right-4 w-20 h-20 text-primary opacity-[0.03] group-hover:opacity-[0.11] transition-opacity duration-300 pointer-events-none animate-drone-wobble" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="bg-blue-955 text-blue-400 border border-blue-900/50 font-semibold px-2 py-0.5 rounded">
                        {n.tag}
                      </span>
                      <span className="text-muted-foreground">{n.date}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground mt-4 leading-snug font-display transition-colors duration-300 group-hover:text-primary">{n.title}</h3>
                    <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{n.desc}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-background py-16 sm:py-20 lg:py-24 bg-line-grid border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-primary text-[10px] sm:text-xs font-bold font-mono tracking-[0.2em] mb-3 sm:mb-4 uppercase text-center">
              [ THE NAKSHATR PHILOSOPHY ]
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight text-center max-w-4xl mx-auto font-display">
              We place a drone in a student's hands before a single lecture is delivered
            </h2>
            <div className="w-full h-[1px] bg-border my-5 sm:my-7" />
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mx-auto text-center max-w-2xl">
              Our reverse-engineering pedagogy builds genuine understanding — not
              procedural memory. Every component examined. Every question owned.
              Every skill demonstrated, not just declared.
            </p>
            <ul className="mt-8 sm:mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {pillars.map((p, i) => (
                <li key={p.text} className="tech-card group flex flex-col items-center text-center p-5 rounded-md shadow-md relative overflow-hidden">
                  <div className="cyber-scanline" />
                  <DroneVector className="absolute -bottom-4 -right-4 w-20 h-20 text-primary opacity-[0.03] group-hover:opacity-[0.11] transition-opacity duration-300 pointer-events-none animate-drone-wobble" />
                  <div className="w-10 h-10 rounded-md bg-blue-955 border border-blue-900/50 flex items-center justify-center text-primary mb-4 shadow-sm relative z-10">
                    <p.icon size={20} />
                  </div>
                  <div className="relative z-10">
                    <span className="font-mono text-[9px] sm:text-[10px] text-primary font-semibold uppercase block mb-1">PILLAR 0{i + 1}</span>
                    <span className="text-foreground font-semibold text-sm sm:text-base leading-snug font-display">{p.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
