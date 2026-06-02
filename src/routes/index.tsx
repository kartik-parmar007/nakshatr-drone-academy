import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Rocket, HardHat, Globe2, TrendingUp,
  Sprout, Building2, Shield, Package, Map, LifeBuoy,
  GraduationCap, Building, Briefcase,
  ArrowRight, Wrench, Brain, CheckCircle2,
  Cpu, Video, Navigation, Trophy, Star, ShieldCheck, ChevronRight,
  Clock, Award, Coins, BookOpen, Sparkles, UserCheck, Eye, Activity
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { DroneGLB } from "@/components/DroneGLB";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nakshatr Drone Academy — Master the Skies. Engineer the Future." },
      { name: "description", content: "India's elite university-embedded drone flight school. Professional piloting, high-end aerial cinematography, and advanced drone engineering." },
      { property: "og:title", content: "Nakshatr Drone Academy" },
      { property: "og:description", content: "Futuristic flight training, cinematic storytelling, and advanced drone engineering." },
      { property: "og:image", content: "/dawn_mountain_landscape.png" }
    ],
  }),
  component: HomePage,
});

const tacticalTracks = [
  {
    icon: Navigation,
    title: "Commercial Drone Piloting",
    badge: "DGCA PATHWAY",
    accent: "from-[#00F0FF] to-[#0055FF]",
    glowClass: "hover:border-[#00F0FF]/40",
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

function HomePage() {
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
    <div className="bg-[#050506] text-white overflow-hidden">
      {/* 1. HERO SECTION (CINEMATIC AVIATION HUD) */}
      <section className="relative min-h-screen flex items-center justify-center border-b border-[#222328] overflow-hidden pt-20 md:pt-16">
        {/* Cinematic atmospheric high-altitude twilight peak background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center select-none pointer-events-none opacity-45"
          style={{ backgroundImage: `url('/dawn_mountain_landscape.png')` }}
          aria-hidden="true"
        />
        {/* Deep linear black gradient fade covering the bottom half */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050506] via-[#050506]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_0%,#050506_85%)] pointer-events-none" />
        <div className="absolute inset-0 bg-hud-grid opacity-75 pointer-events-none" />
        
        {/* Aviation crosshair vectors */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-20">
          <div className="w-[85%] aspect-square rounded-full border border-dashed border-[#00F0FF]/15 animate-[spin_60s_linear_infinite]" />
          <div className="absolute w-[60%] aspect-square rounded-full border border-dashed border-[#00F0FF]/10 animate-[spin_20s_linear_infinite_reverse]" />
          <div className="absolute w-[95%] h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF]/25 to-transparent" />
          <div className="absolute h-[95%] w-[1px] bg-gradient-to-b from-transparent via-[#00F0FF]/25 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 grid lg:grid-cols-12 gap-8 md:gap-12 items-center relative z-10 w-full">
          {/* Hero Left Content: HUD Brackets, Bold Architecture */}
          <div className="lg:col-span-6 flex flex-col items-start text-left relative p-6 sm:p-8 rounded-lg bg-[#16171A]/30 border border-[#222328]/40 backdrop-blur-sm hud-brackets">
            <div className="absolute top-2 right-3 font-mono text-[9px] text-[#00F0FF]/50 tracking-[0.2em] select-none">
              SYS-LNK: NK-DRN-2026
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#16171A] border border-[#00F0FF]/30 text-[#00F0FF] px-4 py-1.5 rounded mb-6 shadow-[0_0_15px_rgba(0,240,255,0.08)] select-none"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]"></span>
              </span>
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase">
                ELITE FLIGHT SCHOOL · SYSTEM ACTIVE
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-white leading-[1.08] tracking-tight uppercase"
            >
              Nakshatr <br />
              <span className="text-gradient-hud font-extrabold drop-shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                Drone Academy
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-[#8A94A6] leading-relaxed max-w-xl"
            >
              Master the Skies. Engineer the Future. High-precision commercial flight training, high-end creative cinematography, and tactical autonomous robotics.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4 w-full sm:w-auto"
            >
              {/* Heavy high-tech action button with pulsed border */}
              <Link
                to="/programs"
                className="group relative btn-hud-glow w-full sm:w-auto inline-flex items-center justify-center bg-[#00F0FF] hover:bg-[#0077FF] text-[#050506] font-mono text-xs sm:text-sm font-bold uppercase tracking-widest px-8 py-4 rounded shadow-[0_0_25px_rgba(0,240,255,0.2)] hud-pulse-border"
              >
                ENLIST IN FLIGHT PROGRAM
                <ArrowRight className="ml-2.5 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/universities"
                className="w-full sm:w-auto inline-flex items-center justify-center border border-[#222328] bg-[#16171A]/70 hover:bg-[#222328] text-white font-mono text-xs sm:text-sm font-semibold uppercase tracking-widest px-8 py-4 rounded transition-all duration-300"
              >
                Partner With Us
              </Link>
            </motion.div>

            {/* Quick trust metrics */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 pt-6 border-t border-[#222328] flex flex-wrap gap-x-8 gap-y-3 text-[10px] font-mono text-[#8A94A6] uppercase tracking-wider"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00F0FF]" />
                <span>DGCA COMPLIANT SYLLABUS</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#00F0FF] fill-[#00F0FF]/30" />
                <span>UGC CREDIT ALIGNED</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Right: Hyper-Realistic DJI Drone (GPU levitated wrapper) */}
          <div className="lg:col-span-6 relative flex justify-center items-center h-[350px] xs:h-[400px] sm:h-[480px] md:h-[550px] lg:h-[600px] w-full">
            {/* Star-Core Cyan glow beneath the drone */}
            <div className="absolute w-3/4 h-[80px] bg-[#00F0FF]/10 blur-[80px] rounded-full bottom-8 pointer-events-none" />

            {/* Floating Live Telemetry Panel - Desktop/Tablet */}
            <div className="absolute top-4 left-0 z-20 border border-[#222328] bg-[#050506]/95 p-4 rounded font-mono text-[9px] text-[#00F0FF] tracking-[0.2em] backdrop-blur-lg shadow-2xl hidden sm:block min-w-[155px]">
              <div className="flex items-center gap-2 font-bold mb-2 uppercase text-[#00F0FF] border-b border-[#222328] pb-1 select-none">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
                TELEMETRY LOG
              </div>
              <div className="space-y-1 opacity-90 select-none">
                <div className="flex justify-between"><span>PITCH:</span> <span className="font-bold text-white">{telemetry.pitch}°</span></div>
                <div className="flex justify-between"><span>YAW:</span> <span className="font-bold text-white">{telemetry.yaw}°</span></div>
                <div className="flex justify-between"><span>ROLL:</span> <span className="font-bold text-white">{telemetry.roll}°</span></div>
                <div className="flex justify-between"><span>ALT:</span> <span className="font-bold text-[#00F0FF]">{telemetry.alt} M</span></div>
              </div>
            </div>

            {/* Floating System Status Panel - Desktop/Tablet */}
            <div className="absolute bottom-4 right-0 z-20 border border-[#222328] bg-[#050506]/95 p-4 rounded font-mono text-[9px] text-[#00F0FF] tracking-[0.2em] backdrop-blur-lg shadow-2xl hidden sm:block min-w-[165px]">
              <div className="flex items-center gap-2 font-bold mb-2 uppercase text-[#00F0FF] border-b border-[#222328] pb-1 select-none">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
                SYSTEM STATE
              </div>
              <div className="space-y-1 opacity-90 select-none">
                <div className="flex justify-between"><span>ESC SENS:</span> <span className="font-bold text-white">{telemetry.esc}%</span></div>
                <div className="flex justify-between"><span>SYS FREQ:</span> <span className="font-bold text-white">{telemetry.freq} GHz</span></div>
                <div className="flex justify-between"><span>GYROSCOPE:</span> <span className="font-bold text-emerald-400">ACTIVE</span></div>
                <div className="flex justify-between"><span>LINK STATE:</span> <span className="font-bold text-emerald-400">ONLINE</span></div>
              </div>
            </div>

            {/* levitate-gpu wraps the canvas to delegate position hover entirely to the GPU thread! */}
            <div className="w-full h-full relative cursor-grab active:cursor-grabbing z-10 levitate-gpu">
              <DroneGLB
                className="w-full h-full"
                scale={2.2}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. TACTICAL COURSE SHOWCASE (Asymmetric grid layout) */}
      <section className="bg-[#050506] py-20 sm:py-24 lg:py-28 relative border-b border-[#222328]">
        <div className="absolute inset-0 bg-hud-grid opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 select-none">
              <span className="text-xs font-mono font-bold text-[#00F0FF] uppercase tracking-[0.3em]">
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

          {/* Asymmetric grid layout - 0-lag CSS compositor float cards */}
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
                      <h4 className="text-[9px] font-mono font-bold text-[#00F0FF] uppercase tracking-widest mb-3 select-none">
                        OPERATIONAL FOCUS
                      </h4>
                      <ul className="space-y-2">
                        {track.features.map((feat) => (
                          <li key={feat} className="flex items-center gap-2.5 text-xs text-white/90">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] flex-shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Link
                        to="/programs"
                        className="mt-8 group/link inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-[#00F0FF] uppercase tracking-widest hover:text-white transition-colors"
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

      {/* 4. THE NAKSHATR PHILOSOPHY (Military HUD Accents) */}
      <section className="bg-[#16171A] py-20 sm:py-28 relative overflow-hidden border-b border-[#222328]">
        <div className="absolute inset-0 bg-hud-radar opacity-15 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Reveal>
            <span className="text-xs sm:text-sm font-mono font-bold text-[#00F0FF] uppercase tracking-[0.3em] block mb-4 select-none">
              [ THE FLIGHT PEDAGOGY ]
            </span>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white leading-[1.1] uppercase max-w-4xl mx-auto tracking-tight">
              We place a drone in a student's hands{" "}
              <span className="text-gradient-hud font-extrabold block sm:inline drop-shadow-[0_0_15px_rgba(0,240,255,0.1)]">
                before a single lecture
              </span>{" "}
              is delivered
            </h2>

            <div className="w-16 h-1 bg-[#00F0FF] mx-auto my-8 rounded-full" />

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
                      <div className="w-10 h-10 rounded bg-[#16171A] border border-[#222328] flex items-center justify-center text-[#00F0FF] mb-5 shadow-inner select-none">
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

      {/* 5. INDUSTRIAL APPLICATIONS (Operational Domains) */}
      <section className="bg-[#050506] py-20 sm:py-24 relative border-b border-[#222328]">
        <div className="absolute inset-0 bg-hud-grid opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 select-none">
              <span className="text-xs font-mono font-bold text-[#00F0FF] uppercase tracking-[0.3em]">
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
                  <div className="tech-card animate-hud-hover-float group bg-[#16171A] border border-[#222328] rounded p-6 sm:p-7 flex flex-col justify-between h-full hover:border-[#00F0FF]/30 transition-all duration-300 hud-card-corners">
                    <div className="cyber-scanline" />
                    <div>
                      <div className="flex justify-between items-start mb-5 select-none">
                        <div className="p-2.5 rounded bg-[#050506] border border-[#222328] text-[#00F0FF] group-hover:text-[#00F0FF] transition-colors">
                          <UseIcon className="w-5.5 h-5.5" />
                        </div>
                        <span className="font-mono text-[9px] text-[#8A94A6] font-bold bg-[#050506] border border-[#222328] px-2.5 py-0.5 rounded tracking-widest uppercase">
                          SEC-0{idx + 1}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold font-display text-white tracking-tight group-hover:text-[#00F0FF] transition-colors">
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

      {/* 6. ACADEMIC INTEGRATION (Designed for the ecosystem) */}
      <section className="bg-[#16171A] py-20 sm:py-24 relative border-b border-[#222328]">
        <div className="absolute inset-0 bg-hud-radar opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 select-none">
              <span className="text-xs font-mono font-bold text-[#00F0FF] uppercase tracking-[0.3em]">
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
                  <div className="tech-card animate-hud-hover-float group bg-[#050506] border border-[#222328] rounded p-6 sm:p-8 flex flex-col items-center text-center justify-between h-full hover:border-[#00F0FF]/30 transition-all duration-300 hud-card-corners">
                    <div className="cyber-scanline" />
                    <div className="flex flex-col items-center w-full">
                      <div className="w-12 h-12 rounded bg-[#16171A] border border-[#222328] flex items-center justify-center text-[#00F0FF] mb-6 shadow-inner select-none">
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
        {/* Glowing HUD ambient radar sweep highlights */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] aspect-square rounded-full bg-[#00F0FF]/5 blur-[100px] pointer-events-none animate-pulse" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] aspect-square rounded-full bg-[#00F0FF]/5 blur-[100px] pointer-events-none animate-pulse" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-[#16171A] border border-[#222328] text-[#00F0FF] px-3.5 py-1.5 rounded mb-6 font-mono text-[10px] sm:text-xs uppercase tracking-widest select-none hud-brackets">
              <span>Flight Cohorts Now Enrolling</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-white tracking-tight uppercase max-w-4xl mx-auto leading-tight">
              Ready to take control <br className="hidden sm:inline" />
              of the{" "}
              <span className="text-gradient-hud font-extrabold drop-shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                modern airspace?
              </span>
            </h2>

            <p className="text-[#8A94A6] text-sm sm:text-base md:text-lg mt-6 max-w-xl mx-auto leading-relaxed font-sans">
              Enlist in our credit-bearing university drone cohorts or partner to establish a custom Centre of Excellence in your campus.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link
                to="/programs"
                className="group relative btn-hud-glow inline-flex items-center justify-center bg-[#00F0FF] hover:bg-[#0077FF] text-[#050506] font-mono text-xs sm:text-sm font-bold uppercase tracking-widest px-10 py-4 rounded shadow-[0_0_25px_rgba(0,240,255,0.2)] hud-pulse-border"
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
