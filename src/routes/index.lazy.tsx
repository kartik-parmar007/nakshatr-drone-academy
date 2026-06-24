import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import {
  Rocket,
  Sprout,
  Building2,
  Shield,
  Package,
  Map,
  LifeBuoy,
  GraduationCap,
  Building,
  Briefcase,
  ArrowRight,
  Wrench,
  Brain,
  CheckCircle2,
  Cpu,
  Video,
  Navigation,
  Star,
  ShieldCheck,
  ChevronRight,
  Activity,
  Radar,
  Wifi,
  BarChart3,
  TrendingUp,
  Layers,
  Zap,
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
    image: "/course_pilot_track.png",
    accent: "from-blue-400 to-blue-600",
    glowClass: "hover:border-blue-500/40",
    desc: "Elite pilot certifications, multirotor tactical operations, autonomous drone routing, and full DGCA regulatory compliance.",
    features: [
      "BVLOS Operations",
      "Pre-Flight Protocols",
      "Flight Simulator Runs",
      "Multirotor Flight logs",
    ],
  },
  {
    icon: Video,
    title: "Cinematography & Creative Arts",
    badge: "AERIAL CINEMA",
    image: "/course_cinema_track.png",
    accent: "from-purple-500 to-indigo-600",
    glowClass: "hover:border-purple-500/40",
    desc: "Advanced high-speed camera tracking, dynamic drone orbits, professional cinematography rigs, and post-production color-grading.",
    features: [
      "High-Speed Chasing",
      "Storyboarding",
      "Advanced Color Pipelines",
      "3-Axis Gimbal configurations",
    ],
  },
  {
    icon: Cpu,
    title: "UAV Engineering & Mapping",
    badge: "ROBOTICS & GIS",
    image: "/course_engineering_track.png",
    accent: "from-emerald-500 to-teal-600",
    glowClass: "hover:border-emerald-500/40",
    desc: "Disassemble, solder, program, and calibrate autonomous carbon-frame multicopters. Configure advanced ArduPilot parameters.",
    features: [
      "Hardware Assembly",
      "ESC Speed Controllers",
      "GIS Aerial Mapping",
      "Waypoint Navigation coding",
    ],
  },
];

const useCases = [
  {
    icon: Sprout,
    title: "Precision Agriculture",
    image: "/industry_agriculture.png",
    desc: "Thermal crop mapping, precision spraying, and yield diagnostics from altitude.",
  },
  {
    icon: Building2,
    title: "Industrial Infrastructure",
    image: "/industry_infrastructure.png",
    desc: "Structural integrity mapping of bridges, cell towers, and active construction sites.",
  },
  {
    icon: Shield,
    title: "Elite Defence",
    image: "/industry_defense.png",
    desc: "Tactical surveillance, perimeter reconnaissance, and autonomous swarm operations.",
  },
  {
    icon: Package,
    title: "Autonomous Logistics",
    image: "/matte_black_drone_hero.png",
    desc: "Last-mile medical delivery systems and automated cargo transport networks.",
  },
  {
    icon: Map,
    title: "Photogrammetry & GIS",
    image: "/university_drone_mapping.png",
    desc: "High-accuracy terrain modelling, volumetric calculations, and 3D land scans.",
  },
  {
    icon: LifeBuoy,
    title: "Emergency Response",
    image: "/dawn_mountain_landscape.png",
    desc: "Rapid disaster analysis, search and rescue operations, and live feed relay.",
  },
];

const audiences = [
  {
    icon: GraduationCap,
    title: "For Elite Students",
    desc: "UGC credits, hands-on flight hours, and industry-demanded flight logs for high-paying roles.",
  },
  {
    icon: Building,
    title: "For Universities",
    desc: "Embed an advanced Centre of Excellence at zero capital expenditure with shared revenue models.",
  },
  {
    icon: Briefcase,
    title: "For Enterprise Partners",
    desc: "Access verified drone operators, tailored fleet solutions, and certified developers on demand.",
  },
];

const pillars = [
  { icon: Wrench, text: "Learn by building, not by listening" },
  { icon: Brain, text: "Grasp fundamental engineering principles" },
  { icon: CheckCircle2, text: "Validate true competency, not memory" },
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
          style={{ backgroundImage: "url('/industrial_drone_hero.png')" }}
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 sm:py-14 lg:py-16">
            {/* Primary headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="max-w-4xl"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[82px] font-extrabold font-display text-white leading-[0.95] tracking-tight uppercase">
                Nakshatr
                <br />
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
              className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-sans"
            >
              Precision commercial flight training. Autonomous UAV engineering. Industrial-grade
              certification programs built for real-world deployment.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6 flex flex-wrap gap-4"
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
      </section>

      {/* 3. TACTICAL COURSE SHOWCASE */}
      <section className="bg-[#050506] py-12 sm:py-16 lg:py-20 relative border-b border-[#222328]">
        <div className="absolute inset-0 bg-hud-grid opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-8 select-none">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white uppercase tracking-tight leading-tight">
                Tactical Course Showcase
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {tacticalTracks.map((track, idx) => {
              const TrackIcon = track.icon;
              return (
                <Reveal key={track.title} delay={idx * 0.1}>
                  <div
                    className={`tech-card animate-hud-hover-float h-full rounded-lg p-5 sm:p-6 flex flex-col justify-between border border-[#222328] bg-[#16171A] group hud-card-corners ${track.glowClass}`}
                  >
                    <div className="cyber-scanline" />

                    <div>
                      {/* Course Track Visual */}
                      <div className="h-[160px] w-full rounded overflow-hidden relative mb-4 border border-[#222328]/60 bg-[#0c0d0f] shadow-inner">
                        <img
                          src={track.image}
                          alt={track.title}
                          className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-[1.04] select-none pointer-events-none opacity-85"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#16171A] via-transparent to-transparent pointer-events-none" />
                      </div>

                      {/* Top Header Card */}
                      <div className="flex justify-between items-center mb-4 select-none">
                        <div
                          className={`p-3 rounded bg-gradient-to-br ${track.accent} text-[#050506]`}
                        >
                          <TrackIcon className="w-6 h-6" />
                        </div>
                        <span className="text-[9px] font-mono font-bold px-2.5 py-1 rounded bg-[#050506] text-[#8A94A6] border border-[#222328] tracking-widest uppercase">
                          {track.badge}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight transition-colors">
                        {track.title}
                      </h3>

                      <p className="mt-3 text-sm text-[#8A94A6] leading-relaxed">{track.desc}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#222328]">
                      <h4 className="text-[9px] font-mono font-bold text-blue-400 uppercase tracking-widest mb-2 select-none">
                        OPERATIONAL FOCUS
                      </h4>
                      <ul className="space-y-2">
                        {track.features.map((feat) => (
                          <li
                            key={feat}
                            className="flex items-center gap-2.5 text-xs text-white/90"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>

                      <Link
                        to="/programs"
                        className="mt-6 group/link inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-blue-400 uppercase tracking-widest hover:text-white transition-colors"
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
      <section className="bg-[#16171A] py-12 sm:py-16 relative overflow-hidden border-b border-[#222328]">
        <div className="absolute inset-0 bg-hud-radar opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Side: Pedagogy content */}
              <div className="lg:col-span-7 text-left">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white leading-[1.1] uppercase tracking-tight">
                  We place a drone in a student's hands{" "}
                  <span className="text-gradient-blue font-extrabold block sm:inline drop-shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                    before a single lecture
                  </span>{" "}
                  is delivered
                </h2>

                <div className="w-16 h-1 bg-blue-500 my-4 rounded-full" />

                <p className="text-[#8A94A6] text-base leading-relaxed max-w-2xl font-sans">
                  Our reverse-engineering pedagogy ensures absolute mechanical understanding.
                  Disassemble completely, map core wiring telemetry, inspect speed controllers, and
                  calibrate rotors physically.
                </p>

                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                  {pillars.map((p, idx) => {
                    const PillarIcon = p.icon;
                    return (
                      <li
                        key={p.text}
                        className="tech-card animate-hud-hover-float bg-[#050506] border border-[#222328] p-4 rounded flex flex-col justify-between h-full relative group hud-card-corners"
                      >
                        <div className="cyber-scanline" />
                        <div>
                          <div className="w-9 h-9 rounded bg-[#16171A] border border-[#222328] flex items-center justify-center text-blue-400 mb-4 shadow-inner select-none">
                            <PillarIcon className="w-4.5 h-4.5" />
                          </div>
                          <span className="font-mono text-[8px] text-[#8A94A6] font-bold block mb-1 uppercase tracking-widest select-none">
                            PILLAR 0{idx + 1}
                          </span>
                          <span className="text-xs font-semibold text-white font-display leading-tight block">
                            {p.text}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Right Side: High-fidelity image and telemetry HUD visual */}
              <div className="lg:col-span-5 relative group">
                <div className="rounded-xl overflow-hidden border border-[#222328] bg-[#0c0d0f] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-500 hover:border-blue-500/40 relative">
                  <div className="h-[300px] sm:h-[350px] w-full rounded-lg overflow-hidden relative bg-[#07080a]">
                    <img
                      src="/university_drone_mapping.png"
                      alt="Philosophy flight mapping"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 select-none pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0f] via-transparent to-transparent pointer-events-none" />

                    {/* Laser scan line overlay */}
                    <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent opacity-0 group-hover:opacity-100 pointer-events-none animate-scan z-10" />

                    {/* HUD frame highlights */}
                    <div className="absolute top-4 left-4 bg-[#050506]/95 border border-[#222328] text-blue-400 font-mono text-[9px] px-2.5 py-1 rounded-sm uppercase tracking-wider font-bold flex items-center gap-1.5 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                      FLIGHT MAPPING &amp; GIS
                    </div>

                    <div className="absolute bottom-4 right-4 bg-[#050506]/95 border border-[#222328] text-white/70 font-mono text-[9px] px-2.5 py-1 rounded-sm uppercase tracking-wider">
                      COHORT_LABS // BHAVNAGAR
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. INDUSTRIAL APPLICATIONS */}
      <section className="bg-[#050506] py-12 sm:py-16 relative border-b border-[#222328]">
        <div className="absolute inset-0 bg-hud-grid opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-8 select-none">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white uppercase tracking-tight leading-tight">
                Industrial Applications
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((u, idx) => {
              const UseIcon = u.icon;
              return (
                <Reveal key={u.title} delay={idx * 0.05}>
                  <div className="tech-card animate-hud-hover-float group bg-[#16171A] border border-[#222328] rounded-lg flex flex-col h-full hover:border-blue-500/40 transition-all duration-300 hud-card-corners relative overflow-hidden">
                    <div className="cyber-scanline" />

                    {/* Prominent image thumbnail */}
                    <div className="h-[160px] w-full overflow-hidden relative flex-shrink-0">
                      <img
                        src={u.image}
                        alt={u.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06] select-none pointer-events-none opacity-90"
                      />
                      {/* gradient fade into card body */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#16171A] via-[#16171A]/30 to-transparent pointer-events-none" />
                      {/* sector badge top-right */}
                      <span className="absolute top-2.5 right-2.5 font-mono text-[9px] text-[#8A94A6] font-bold bg-[#050506]/90 border border-[#222328] px-2 py-0.5 rounded tracking-widest uppercase">
                        SEC-0{idx + 1}
                      </span>
                    </div>

                    {/* Card body */}
                    <div className="relative z-10 p-4 sm:p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-3 select-none">
                        <div className="p-2 rounded bg-[#050506]/90 border border-[#222328] text-blue-400 group-hover:text-blue-300 transition-colors flex-shrink-0">
                          <UseIcon className="w-5 h-5" />
                        </div>
                        <h3 className="text-sm sm:text-base font-bold font-display text-white tracking-tight group-hover:text-blue-300 transition-colors uppercase leading-tight">
                          {u.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-[#8A94A6] leading-relaxed font-sans group-hover:text-slate-300 transition-colors">
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
      <section className="bg-[#16171A] py-12 sm:py-16 relative border-b border-[#222328]">
        <div className="absolute inset-0 bg-hud-radar opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-8 select-none">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white uppercase tracking-tight leading-tight">
                Ecosystem Architecture
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {audiences.map((aud, idx) => {
              const AudIcon = aud.icon;
              return (
                <Reveal key={aud.title} delay={idx * 0.08}>
                  <div className="tech-card animate-hud-hover-float group bg-[#050506] border border-[#222328] rounded p-5 sm:p-6 flex flex-col items-center text-center justify-between h-full hover:border-[#00F0FF]/30 transition-all duration-300 hud-card-corners relative overflow-hidden">
                    <div className="cyber-scanline" />

                    {/* Faint blueprint grid backdrop */}
                    <div className="absolute inset-0 bg-hud-grid opacity-[0.04] pointer-events-none" />

                    {/* Status LED in top right */}
                    <div className="absolute top-4 right-4 flex items-center gap-1 text-[8px] font-mono text-[#8A94A6] select-none uppercase">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                      </span>
                      SYS_SEC
                    </div>

                    <div className="flex flex-col items-center w-full relative z-10">
                      <div className="w-12 h-12 rounded bg-[#16171A] border border-[#222328] flex items-center justify-center text-blue-400 mb-4 shadow-inner select-none group-hover:border-blue-500/30 transition-colors duration-300">
                        <AudIcon className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight transition-colors group-hover:text-blue-200">
                        {aud.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#8A94A6] mt-4 leading-relaxed max-w-xs font-sans group-hover:text-slate-300 transition-colors">
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
      <section className="bg-[#050506] py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] aspect-square rounded-full bg-blue-500/5 blur-[100px] pointer-events-none animate-pulse" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] aspect-square rounded-full bg-blue-500/5 blur-[100px] pointer-events-none animate-pulse" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-white tracking-tight uppercase max-w-4xl mx-auto leading-tight">
              Ready to take control <br className="hidden sm:inline" />
              of the{" "}
              <span className="text-gradient-blue font-extrabold drop-shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                modern airspace?
              </span>
            </h2>

            <div className="mt-6 flex flex-wrap gap-4 justify-center">
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
