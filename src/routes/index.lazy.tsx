import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Rocket, Sprout, Building2, Shield, Package, Map, LifeBuoy,
  GraduationCap, Building, Briefcase,
  ArrowRight, Wrench, Brain, CheckCircle2,
  Cpu, Video, Navigation, Star, ShieldCheck, ChevronRight,
  Activity, Radar, Wifi, BarChart3, TrendingUp, Layers, Zap
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

export const Route = createLazyFileRoute("/")({
  component: HomePage,
});

const tacticalTracks = [
  {
    icon: Navigation,
    title: "Commercial Drone Piloting",
    badge: "DGCA PATHWAY",
    accent: "from-blue-400 to-blue-600",
    glowClass: "hover:border-blue-500/40",
    desc: "Elite pilot certifications, multirotor tactical operations, autonomous drone routing, and full DGCA regulatory compliance.",
    features: ["BVLOS Operations", "Pre-Flight Protocols", "Flight Simulator Runs", "Multirotor Flight logs"]
  },
  {
    icon: Video,
    title: "Cinematography & Creative Arts",
    badge: "AERIAL CINEMA",
    accent: "from-purple-500 to-indigo-600",
    glowClass: "hover:border-purple-500/40",
    desc: "Advanced high-speed camera tracking, dynamic drone orbits, professional cinematography rigs, and post-production color-grading.",
    features: ["High-Speed Chasing", "Storyboarding", "Advanced Color Pipelines", "3-Axis Gimbal configurations"]
  },
  {
    icon: Cpu,
    title: "UAV Engineering & Mapping",
    badge: "ROBOTICS & GIS",
    accent: "from-emerald-500 to-teal-600",
    glowClass: "hover:border-emerald-500/40",
    desc: "Disassemble, solder, program, and calibrate autonomous carbon-frame multicopters. Configure advanced ArduPilot parameters.",
    features: ["Hardware Assembly", "ESC Speed Controllers", "GIS Aerial Mapping", "Waypoint Navigation coding"]
  }
];

const useCases = [
  { icon: Sprout, title: "Precision Agriculture", desc: "Thermal crop mapping, target spraying, and precision yield diagnostics." },
  { icon: Building2, title: "Industrial Infrastructure", desc: "Structural integrity mapping of bridges, massive cell towers, and active construction sites." },
  { icon: Shield, title: "Elite Defence", desc: "Tactical surveillance, real-time perimeter reconnaissance, and autonomous swarm flight." },
  { icon: Package, title: "Autonomous Logistics", desc: "Last-mile medical delivery systems and automated cargo transport." },
  { icon: Map, title: "Photogrammetry & GIS", desc: "Highly accurate terrain modelling, volumetric calculations, and 3D land scans." },
  { icon: LifeBuoy, title: "Emergency Response", desc: "Rapid disaster analysis, search and rescue operations, and live feed updates." }
];

const audiences = [
  { icon: GraduationCap, title: "For Elite Students", desc: "UGC credits, hands-on flight hours, and industry-demanded flight logs for high-paying roles." },
  { icon: Building, title: "For Universities", desc: "Embed an advanced Centre of Excellence at zero capital expenditure with shared revenue models." },
  { icon: Briefcase, title: "For Enterprise Partners", desc: "Access verified drone operators, tailored fleet solutions, and certified developers on demand." }
];

const pillars = [
  { icon: Wrench, text: "Learn by building, not by listening" },
  { icon: Brain, text: "Grasp fundamental engineering principles" },
  { icon: CheckCircle2, text: "Validate true competency, not memory" }
];



const heroSectors = [
  {
    icon: Navigation,
    label: "COMMERCIAL FLIGHT",
    tag: "DGCA PATHWAY",
    stat: "500+ hrs",
    statLabel: "Simulation hours",
    bar: 78,
    desc: "BVLOS ops, pre-flight protocols, multi-rotor certifications & airspace compliance.",
  },
  {
    icon: Cpu,
    label: "UAV ENGINEERING",
    tag: "ROBOTICS & GIS",
    stat: "12 builds",
    statLabel: "Per cohort",
    bar: 91,
    desc: "Carbon-frame assembly, ArduPilot, ESC calibration, autonomous waypoint systems.",
  },
  {
    icon: Video,
    label: "AERIAL CINEMA",
    tag: "CREATIVE OPS",
    stat: "4K / 120fps",
    statLabel: "Camera rig spec",
    bar: 64,
    desc: "High-speed chasing, 3-axis gimbals, color pipelines & cinematic orbit tracking.",
  },
];

function HomePage() {

  return (
    <div className="bg-[#050506] text-white overflow-hidden">

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* 1. HERO SECTION — INDUSTRIAL FULL-BLEED GRID LAYOUT */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative min-h-screen flex flex-col border-b border-[#1E2028] overflow-hidden pt-16">

        {/* ── Full-bleed background ── */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none select-none"
          style={{ backgroundImage: `url('/industrial_drone_hero.png')` }}
          aria-hidden="true"
        />
        {/* dark overlays: deep base + radial vignette */}
        <div className="absolute inset-0 bg-[#050506]/35 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050506]/30 via-transparent to-[#050506]/85 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050506]/65 via-transparent to-[#050506]/20 pointer-events-none" />

        {/* ── Subtle blueprint vertical dividers ── */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          <div className="absolute top-0 bottom-0 left-[33.33%] border-l border-white/[0.03]" />
          <div className="absolute top-0 bottom-0 left-[66.66%] border-l border-white/[0.03]" />
          <div className="absolute left-0 right-0 top-[50%] border-t border-white/[0.03]" />
        </div>



        {/* ── Main hero content ── */}
        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-20 lg:py-24">

            {/* Academy badge */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <div className="flex items-center gap-2 border border-blue-500/25 bg-blue-950/30 backdrop-blur-sm px-4 py-2 rounded-sm">
                <Activity className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[10px] font-mono font-bold text-blue-300/90 uppercase tracking-[0.25em]">India's Industrial UAV Academy</span>
              </div>
              <div className="h-px w-12 bg-gradient-to-r from-blue-500/40 to-transparent hidden sm:block" />
            </motion.div>

            {/* Primary headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="max-w-4xl"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[82px] font-extrabold font-display text-white leading-[0.95] tracking-tight uppercase">
                Nakshatr<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-blue-300">
                  Drone
                </span>
                <br />
                <span className="text-[#3B82F6] drop-shadow-[0_0_40px_rgba(59,130,246,0.35)]">
                  Academy
                </span>
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-7 text-base sm:text-lg text-[#7A8499] leading-relaxed max-w-xl font-sans"
            >
              Precision commercial flight training. Autonomous UAV engineering. Industrial-grade certification programs built for real-world deployment.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                to="/programs"
                className="group inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-mono text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-sm shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300 hover:shadow-[0_0_45px_rgba(59,130,246,0.5)] hover:-translate-y-0.5"
              >
                ENLIST IN FLIGHT PROGRAM
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/universities"
                className="group inline-flex items-center gap-2 border border-[#2A2F3D] hover:border-[#3B4460] bg-[#0D1018]/70 hover:bg-[#131824]/90 text-[#A0AAC0] hover:text-white font-mono text-xs font-semibold uppercase tracking-widest px-8 py-4 rounded-sm transition-all duration-300 backdrop-blur-sm"
              >
                Partner With Us
                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>


          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* Bottom sector cards — pinned to the foot of the hero */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="relative z-20 mt-auto border-t border-white/[0.07] bg-[#080A0F]/75 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.06]">
              {heroSectors.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.55 + i * 0.1 }}
                    className="group flex flex-col gap-4 px-6 py-7 hover:bg-white/[0.02] transition-colors duration-300 cursor-default"
                  >
                    {/* card header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-sm bg-blue-950/60 border border-blue-800/30 flex items-center justify-center group-hover:border-blue-500/40 transition-colors duration-300">
                          <Icon className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="text-[9px] font-mono font-bold text-[#5A6472] uppercase tracking-[0.2em]">{s.tag}</span>
                      </div>
                      <span className="text-[9px] font-mono text-blue-400/60 uppercase tracking-widest">0{i + 1}</span>
                    </div>

                    {/* label */}
                    <div>
                      <h3 className="text-sm font-bold font-display text-white uppercase tracking-tight group-hover:text-blue-200 transition-colors duration-300">{s.label}</h3>
                      <p className="mt-1.5 text-[11px] text-[#5A6472] leading-relaxed font-sans">{s.desc}</p>
                    </div>

                    {/* stat + progress bar */}
                    <div className="mt-auto">
                      <div className="flex justify-between items-baseline mb-1.5">
                        <span className="text-xs font-mono font-semibold text-white">{s.stat}</span>
                        <span className="text-[9px] font-mono text-[#5A6472] uppercase">{s.statLabel}</span>
                      </div>
                      <div className="h-[2px] w-full bg-white/[0.06] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${s.bar}%` }}
                          transition={{ duration: 1.2, delay: 0.8 + i * 0.15, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    <Link
                      to="/programs"
                      className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest hover:text-white transition-colors mt-1"
                    >
                      EXPLORE TRACK <ChevronRight className="w-3 h-3" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. TACTICAL COURSE SHOWCASE */}
      <section className="bg-[#050506] py-20 sm:py-24 lg:py-28 relative border-b border-[#222328]">
        <div className="absolute inset-0 bg-hud-grid opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 select-none">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-[0.3em]">
                [ MISSION CLASSIFICATION ]
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white uppercase mt-4 tracking-tight leading-tight">
                Tactical Course Showcase
              </h2>
              <p className="mt-4 text-[#8A94A6] text-sm sm:text-base leading-relaxed">
                Choose your field of operations. Our curriculum bridges military-grade pilot deconstruction with elite commercial mapping and cinematic execution.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {tacticalTracks.map((track, idx) => {
              const TrackIcon = track.icon;
              return (
                <Reveal key={track.title} delay={idx * 0.1}>
                  <div className={`tech-card animate-hud-hover-float h-full rounded-lg p-6 sm:p-8 flex flex-col justify-between border border-[#222328] bg-[#16171A] hud-card-corners ${track.glowClass}`}>
                    <div className="cyber-scanline" />
                    
                    <div>
                      {/* Top Header Card */}
                      <div className="flex justify-between items-center mb-6 select-none">
                        <div className={`p-3 rounded bg-gradient-to-br ${track.accent} text-[#050506]`}>
                          <TrackIcon className="w-6 h-6" />
                        </div>
                        <span className="text-[9px] font-mono font-bold px-2.5 py-1 rounded bg-[#050506] text-[#8A94A6] border border-[#222328] tracking-widest uppercase">
                          {track.badge}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight transition-colors">
                        {track.title}
                      </h3>
                      
                      <p className="mt-4 text-sm text-[#8A94A6] leading-relaxed">
                        {track.desc}
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-[#222328]">
                      <h4 className="text-[9px] font-mono font-bold text-blue-400 uppercase tracking-widest mb-3 select-none">
                        OPERATIONAL FOCUS
                      </h4>
                      <ul className="space-y-2">
                        {track.features.map((feat) => (
                          <li key={feat} className="flex items-center gap-2.5 text-xs text-white/90">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Link
                        to="/programs"
                        className="mt-8 group/link inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-blue-400 uppercase tracking-widest hover:text-white transition-colors"
                      >
                        ENROLL TODAY
                        <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. THE NAKSHATR PHILOSOPHY */}
      <section className="bg-[#16171A] py-20 sm:py-28 relative overflow-hidden border-b border-[#222328]">
        <div className="absolute inset-0 bg-hud-radar opacity-15 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Reveal>
            <span className="text-xs sm:text-sm font-mono font-bold text-blue-400 uppercase tracking-[0.3em] block mb-4 select-none">
              [ THE FLIGHT PEDAGOGY ]
            </span>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white leading-[1.1] uppercase max-w-4xl mx-auto tracking-tight">
              We place a drone in a student's hands{" "}
              <span className="text-gradient-blue font-extrabold block sm:inline drop-shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                before a single lecture
              </span>{" "}
              is delivered
            </h2>

            <div className="w-16 h-1 bg-blue-500 mx-auto my-8 rounded-full" />

            <p className="text-[#8A94A6] text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              Our reverse-engineering pedagogy ensures absolute mechanical understanding. Disassemble completely, map core wiring telemetry, inspect speed controllers, and calibrate rotors physically.
            </p>

            <ul className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
              {pillars.map((p, idx) => {
                const PillarIcon = p.icon;
                return (
                  <li key={p.text} className="tech-card animate-hud-hover-float bg-[#050506] border border-[#222328] p-6 rounded flex flex-col justify-between h-full relative group hud-card-corners">
                    <div className="cyber-scanline" />
                    <div>
                      <div className="w-10 h-10 rounded bg-[#16171A] border border-[#222328] flex items-center justify-center text-blue-400 mb-5 shadow-inner select-none">
                        <PillarIcon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-[9px] text-[#8A94A6] font-bold block mb-1 uppercase tracking-widest select-none">
                        TACTICAL PILLAR 0{idx + 1}
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-white font-display">
                        {p.text}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 5. INDUSTRIAL APPLICATIONS */}
      <section className="bg-[#050506] py-20 sm:py-24 relative border-b border-[#222328]">
        <div className="absolute inset-0 bg-hud-grid opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 select-none">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-[0.3em]">
                [ MISSION ECOSYSTEMS ]
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white uppercase mt-4 tracking-tight leading-tight">
                Industrial Applications
              </h2>
              <p className="mt-4 text-[#8A94A6] text-sm sm:text-base leading-relaxed">
                UAV technology is disrupting classical sectors. We prepare operators and builders specifically for deployment-ready commercial tracks.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((u, idx) => {
              const UseIcon = u.icon;
              return (
                <Reveal key={u.title} delay={idx * 0.05}>
                  <div className="tech-card animate-hud-hover-float group bg-[#16171A] border border-[#222328] rounded p-6 sm:p-7 flex flex-col justify-between h-full hover:border-blue-500/30 transition-all duration-300 hud-card-corners">
                    <div className="cyber-scanline" />
                    <div>
                      <div className="flex justify-between items-start mb-5 select-none">
                        <div className="p-2.5 rounded bg-[#050506] border border-[#222328] text-blue-400 group-hover:text-blue-400 transition-colors">
                           <UseIcon className="w-5.5 h-5.5" />
                        </div>
                        <span className="font-mono text-[9px] text-[#8A94A6] font-bold bg-[#050506] border border-[#222328] px-2.5 py-0.5 rounded tracking-widest uppercase">
                          SEC-0{idx + 1}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold font-display text-white tracking-tight group-hover:text-blue-400 transition-colors">
                        {u.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#8A94A6] mt-3.5 leading-relaxed font-sans">
                        {u.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. ACADEMIC INTEGRATION */}
      <section className="bg-[#16171A] py-20 sm:py-24 relative border-b border-[#222328]">
        <div className="absolute inset-0 bg-hud-radar opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 select-none">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-[0.3em]">
                [ ACADEMIC EMBEDDED INTEGRATION ]
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white uppercase mt-4 tracking-tight leading-tight">
                Ecosystem Architecture
              </h2>
              <p className="mt-4 text-[#8A94A6] text-sm sm:text-base leading-relaxed">
                Bridging classical engineering academia and deployment-ready industrial flight needs with structured university partners.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {audiences.map((aud, idx) => {
              const AudIcon = aud.icon;
              return (
                <Reveal key={aud.title} delay={idx * 0.08}>
                  <div className="tech-card animate-hud-hover-float group bg-[#050506] border border-[#222328] rounded p-6 sm:p-8 flex flex-col items-center text-center justify-between h-full hover:border-blue-500/30 transition-all duration-300 hud-card-corners">
                    <div className="cyber-scanline" />
                    <div className="flex flex-col items-center w-full">
                      <div className="w-12 h-12 rounded bg-[#16171A] border border-[#222328] flex items-center justify-center text-blue-400 mb-6 shadow-inner select-none">
                        <AudIcon className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight transition-colors">
                        {aud.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#8A94A6] mt-4 leading-relaxed max-w-xs font-sans">
                        {aud.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. PREMIUM TACTICAL CTA BANNER */}
      <section className="bg-[#050506] py-24 sm:py-28 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] aspect-square rounded-full bg-blue-500/5 blur-[100px] pointer-events-none animate-pulse" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] aspect-square rounded-full bg-blue-500/5 blur-[100px] pointer-events-none animate-pulse" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-[#16171A] border border-[#222328] text-blue-400 px-3.5 py-1.5 rounded mb-6 font-mono text-[10px] sm:text-xs uppercase tracking-widest select-none hud-brackets">
              <span>Flight Cohorts Now Enrolling</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-white tracking-tight uppercase max-w-4xl mx-auto leading-tight">
              Ready to take control <br className="hidden sm:inline" />
              of the{" "}
              <span className="text-gradient-blue font-extrabold drop-shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                modern airspace?
              </span>
            </h2>

            <p className="text-[#8A94A6] text-sm sm:text-base md:text-lg mt-6 max-w-xl mx-auto leading-relaxed font-sans">
              Enlist in our credit-bearing university drone cohorts or partner to establish a custom Centre of Excellence in your campus.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link
                to="/programs"
                className="group relative btn-hud-glow inline-flex items-center justify-center bg-[#3B82F6] hover:bg-blue-600 text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-widest px-10 py-4 rounded shadow-[0_0_25px_rgba(59,130,246,0.25)]"
              >
                ENLIST IN FLIGHT PROGRAM
                <ArrowRight className="ml-2.5 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
