import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Rocket, HardHat, Globe2, TrendingUp,
  Sprout, Building2, Shield, Package, Map, LifeBuoy,
  GraduationCap, Building, Briefcase,
  ArrowRight, Wrench, Brain, CheckCircle2,
  Cpu, Video, Navigation, Trophy, Star, ShieldCheck, ChevronRight,
  Clock, Award, Coins, BookOpen, Sparkles, UserCheck
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

// Lag-free numerical increment counter powered by requestAnimationFrame
function Counter({ end, duration = 1.2, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let active = true;
    const startTime = performance.now();
    let frameId: number;

    const animate = (now: number) => {
      if (!active) return;
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out cubic curve
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(ease * end);
      
      setCount(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => {
      active = false;
      cancelAnimationFrame(frameId);
    };
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

const trainingTracks = [
  {
    icon: Navigation,
    title: "Professional Piloting",
    badge: "DGCA COMPLIANT",
    accent: "from-amber-500 to-yellow-600",
    glowClass: "group-hover:border-amber-500/40",
    desc: "Rigorous commercial pilot certification, advanced flight simulator runs, micro-credentials, and multirotor operations.",
    features: ["BVLOS Mission Operations", "Flight Simulator Drills", "UAV Logbooks & Checklist mastery", "Multirotor Flight Training"]
  },
  {
    icon: Video,
    title: "Cinematography Masterclass",
    badge: "CREATIVE & PRODUCTION",
    accent: "from-cyan-500 to-blue-600",
    glowClass: "group-hover:border-cyan-500/40",
    desc: "Master aerial storytelling, high-speed tracking, dynamic camera motions, 3-axis gimbal programming, and professional color-grading.",
    features: ["Dynamic Pursuit Tactics", "Aerial Storyboarding", "Color Correction pipelines", "Camera Gimbal programming"]
  },
  {
    icon: Cpu,
    title: "Drone Engineering & Building",
    badge: "HARDWARE & AUTONOMY",
    accent: "from-purple-500 to-indigo-600",
    glowClass: "group-hover:border-purple-500/40",
    desc: "Solder, assemble, configure, and calibrate elite carbon-fiber drones from scratch. Program ArduPilot and calibrate advanced ESC boards.",
    features: ["Flight Controller Assembly", "ESC Programming", "Custom Carbon Frame layout", "Autonomous Waypoint coding"]
  }
];

const formalPrograms = [
  {
    id: "COURSE 1",
    title: "Hardware Mastery SEC",
    type: "Skill Enhancement Course (UGC Credit-Bearing)",
    duration: "30 Days — 90 Hours",
    session: "3 Hours per Session",
    fee: "₹15,000 per student",
    credits: "3 to 4 Credits",
    creditsDetail: "subject to university determination",
    eligibility: "Open to all — any discipline — no prerequisite",
    covers: "Reverse-engineering pedagogy. Students disassemble, understand, and rebuild a complete drone from component level. Five phases — Wonder, Deconstruction, Understanding, Reconstruction, Confidence. Ends with controlled flight familiarisation.",
    outcome: "Student can independently assemble, troubleshoot, and operate a multirotor drone system.",
    tag: "UGC SEC",
    accentClass: "border-t-amber-500 shadow-amber-500/5"
  },
  {
    id: "COURSE 2",
    title: "Software Mastery SEC",
    type: "Skill Enhancement Course (UGC Credit-Bearing)",
    duration: "30 Days — 60 Hours",
    session: "2 Hours per Session",
    fee: "₹12,000 per student",
    credits: "2 to 3 Credits",
    creditsDetail: "subject to university determination",
    eligibility: "Open to all — any discipline — no prerequisite",
    covers: "Eight modules — Software Foundations, Mission Planning, Simulation, GIS and Mapping, Data Processing, Computer Vision, Autonomy and AI Applications, Mini Capstone Project. Platforms include Mission Planner, QGroundControl, Agisoft Metashape, QGIS.",
    outcome: "Student can plan autonomous missions, process aerial imagery, and work with GIS and simulation environments.",
    tag: "UGC SEC",
    accentClass: "border-t-cyan-500 shadow-cyan-500/5"
  },
  {
    id: "COURSE 3",
    title: "Integrated Combo Pathway",
    type: "Skill Enhancement Course (UGC Credit-Bearing)",
    duration: "150 Hours total",
    session: "Hardware + Software Combined",
    fee: "₹25,000 per student",
    credits: "5 to 6 Credits",
    creditsDetail: "subject to university determination",
    eligibility: "Open to all — any discipline — no prerequisite",
    covers: "Complete Hardware Mastery SEC followed by complete Software Mastery SEC. Full hardware and software competency in one pathway.",
    outcome: "Student holds comprehensive drone technology competency across both the physical and software dimensions of the field.",
    tag: "UGC SEC Combo",
    accentClass: "border-t-purple-500 shadow-purple-500/5"
  },
  {
    id: "COURSE 4",
    title: "Industry Ready Program",
    type: "Professional Certification Program (Non-Credit — DGCA Pathway)",
    duration: "30 Days — 90 Hours",
    session: "3 Hours per Session",
    fee: "₹22,000 per student",
    credits: "Non-credit",
    creditsDetail: "DGCA Pilot License readiness",
    eligibility: "Fully independent program — open to all applicants including external candidates — no prerequisite of any kind — prior completion of any SEC course is not required",
    covers: "Four layers — Ground (regulatory framework, Drone Rules 2021, airspace, operator responsibilities), Hands On (simulator training, pre-flight protocol, transmitter mastery), Operations (real-world flight training on DGCA type-certified drones, risk assessment, professional operational sequences), Professional Readiness (DGCA mock examinations, industry awareness, professional pathways). Leads to DGCA Remote Pilot Certificate examination eligibility.",
    outcome: "Student is prepared to sit for and pass the DGCA Remote Pilot Certificate examination and enter the drone sector workforce.",
    tag: "DGCA Pathway",
    accentClass: "border-t-emerald-500 shadow-emerald-500/5"
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
    <div className="bg-[#080809] overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center border-b border-[#1C1D24] overflow-hidden pt-20 md:pt-12">
        {/* Compressed high-altitude landscape background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center select-none pointer-events-none opacity-45"
          style={{ backgroundImage: `url('/dawn_mountain_landscape.png')` }}
          aria-hidden="true"
        />
        {/* Seamless dark linear and radial fades to absolute solid black (#080809) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080809] via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_10%,#080809_90%)] pointer-events-none" />
        <div className="absolute inset-0 bg-dot-grid opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 grid lg:grid-cols-12 gap-8 md:gap-12 items-center relative z-10 w-full">
          {/* Hero Left Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#0E0E11]/90 border border-[#272731] text-[#E2E8F0] px-3.5 py-1.5 rounded-full mb-6 shadow-lg backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-mono font-semibold tracking-widest uppercase">
                India's First Embedded UAV Academy
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-[#E2E8F0] leading-[1.08] tracking-tight uppercase"
            >
              Nakshatr <br className="hidden sm:inline" />
              <span className="text-gradient-stellar drop-shadow-[0_0_25px_rgba(245,158,11,0.15)] font-extrabold">
                Drone Academy
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg md:text-xl text-[#94A3B8] leading-relaxed max-w-xl"
            >
              Master the Skies. Engineer the Future. High-caliber flight operations, professional cinematography, and elite autonomous engineering.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4 w-full sm:w-auto"
            >
              <Link
                to="/programs"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center bg-gradient-stellar text-[#080809] font-mono text-xs sm:text-sm font-bold uppercase tracking-widest px-8 py-4 rounded shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:shadow-[0_0_35px_rgba(6,182,212,0.4)] transition-all duration-300"
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded" />
                Enlist in the Flight Program
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/universities"
                className="w-full sm:w-auto inline-flex items-center justify-center border border-[#1C1D24] bg-[#0E0E11]/80 hover:bg-[#1C1D24] text-[#E2E8F0] hover:text-white font-mono text-xs sm:text-sm font-semibold uppercase tracking-widest px-8 py-4 rounded transition-all duration-300 backdrop-blur-md"
              >
                Partner With Us
              </Link>
            </motion.div>

            {/* Quick trust metrics */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 pt-6 border-t border-[#1C1D24] flex flex-wrap gap-x-8 gap-y-3 text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>DGCA Compliant Syllabus</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>UGC Credit Aligned</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Right: 3D Drone & Telemetry widgets */}
          <div className="lg:col-span-6 relative flex justify-center items-center h-[350px] xs:h-[400px] sm:h-[480px] md:h-[550px] lg:h-[600px] w-full">
            {/* Soft Ambient Gloom beneath the drone */}
            <div className="absolute w-3/4 h-[80px] bg-cyan-500/10 blur-[80px] rounded-full bottom-8 pointer-events-none" />

            {/* Futuristic reticle backdrop overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-30">
              <div className="w-[85%] aspect-square rounded-full border border-dashed border-[#F59E0B]/20 animate-[spin_55s_linear_infinite]" />
              <div className="absolute w-[68%] aspect-square rounded-full border border-dashed border-[#06B6D4]/15 animate-[spin_25s_linear_infinite_reverse]" />
              <div className="absolute w-[95%] h-[1px] bg-gradient-to-r from-transparent via-[#06B6D4]/15 to-transparent" />
              <div className="absolute h-[95%] w-[1px] bg-gradient-to-b from-transparent via-[#06B6D4]/15 to-transparent" />
            </div>

            {/* Floating Live Telemetry Panel - Desktop/Tablet */}
            <div className="absolute top-4 left-0 z-20 border border-[#1C1D24] bg-[#080809]/90 p-4 rounded font-mono text-[10px] text-cyan-400 tracking-widest backdrop-blur-lg shadow-2xl hidden sm:block min-w-[155px]">
              <div className="flex items-center gap-2 font-bold mb-2 uppercase text-cyan-300 border-b border-[#1C1D24] pb-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                HUD Telemetry
              </div>
              <div className="space-y-1 opacity-90 select-none">
                <div className="flex justify-between"><span>PITCH:</span> <span className="font-bold text-[#E2E8F0]">{telemetry.pitch}°</span></div>
                <div className="flex justify-between"><span>YAW:</span> <span className="font-bold text-[#E2E8F0]">{telemetry.yaw}°</span></div>
                <div className="flex justify-between"><span>ROLL:</span> <span className="font-bold text-[#E2E8F0]">{telemetry.roll}°</span></div>
                <div className="flex justify-between"><span>ALTITUDE:</span> <span className="font-bold text-amber-400">{telemetry.alt} m</span></div>
              </div>
            </div>

            {/* Floating Gyro Calibration Panel - Desktop/Tablet */}
            <div className="absolute bottom-4 right-0 z-20 border border-[#1C1D24] bg-[#080809]/90 p-4 rounded font-mono text-[10px] text-amber-500 tracking-widest backdrop-blur-lg shadow-2xl hidden sm:block min-w-[170px]">
              <div className="flex items-center gap-2 font-bold mb-2 uppercase text-amber-400 border-b border-[#1C1D24] pb-1">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                UAV Diagnostics
              </div>
              <div className="space-y-1 opacity-90 select-none">
                <div className="flex justify-between"><span>ESC SENS:</span> <span className="font-bold text-[#E2E8F0]">{telemetry.esc}%</span></div>
                <div className="flex justify-between"><span>SYS FREQ:</span> <span className="font-bold text-[#E2E8F0]">{telemetry.freq} GHz</span></div>
                <div className="flex justify-between"><span>GYROSCOPE:</span> <span className="font-bold text-emerald-400">NOMINAL</span></div>
                <div className="flex justify-between"><span>LINK STATE:</span> <span className="font-bold text-emerald-400">ACTIVE</span></div>
              </div>
            </div>

            {/* Core Three.js Canvas with explicit aspect ratios & defensive touch overlays */}
            <div className="w-full h-full relative cursor-grab active:cursor-grabbing z-10">
              <DroneGLB
                className="w-full h-full"
                scale={2.15}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. MINIMALIST STATS BANNER */}
      <section className="bg-[#0E0E11] border-b border-[#1C1D24] relative py-8 sm:py-12">
        <div className="absolute inset-0 bg-line-grid opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 justify-center text-center">
            <div className="flex flex-col items-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#E2E8F0]">
                <Counter end={1000} suffix="+" />
              </div>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-mono text-[#94A3B8] uppercase tracking-widest">
                Certified Pilots
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-gradient-stellar drop-shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                <Counter end={99} suffix="%" />
              </div>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-mono text-[#94A3B8] uppercase tracking-widest">
                Success Rate
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#E2E8F0]">
                <Counter end={30} suffix="%+" />
              </div>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-mono text-[#94A3B8] uppercase tracking-widest">
                Market Growth
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#E2E8F0]">
                <span>4.9</span>
              </div>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-mono text-[#94A3B8] uppercase tracking-widest">
                Student Rating
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ASYMMETRIC TRAINING FEATURES GRID */}
      <section className="bg-[#080809] py-20 sm:py-24 lg:py-28 relative border-b border-[#1C1D24]">
        <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
              <span className="text-xs sm:text-sm font-mono font-bold text-amber-500 uppercase tracking-[0.25em]">
                [ ACADEMY FLIGHT PROGRAMS ]
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#E2E8F0] uppercase mt-4 tracking-tight leading-tight">
                Elite Training Tracks
              </h2>
              <p className="mt-4 text-[#94A3B8] text-sm sm:text-base leading-relaxed">
                Choose your tactical specialty. From commercial DGCA drone piloting and advanced cinematography routines to raw robotic building blocks.
              </p>
            </div>
          </Reveal>

          {/* Asymmetric fluid grid - adjusts layout elegantly by screen size */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {trainingTracks.map((track, idx) => {
              const TrackIcon = track.icon;
              return (
                <Reveal key={track.title} delay={idx * 0.1}>
                  <div className={`tech-card group h-full rounded-xl p-6 sm:p-8 flex flex-col justify-between border border-[#1C1D24] transition-all duration-500 bg-[#0E0E11] ${track.glowClass}`}>
                    <div className="cyber-scanline" />
                    
                    <div>
                      {/* Top Header Card */}
                      <div className="flex justify-between items-center mb-6">
                        <div className={`p-3 rounded bg-gradient-to-br ${track.accent} text-[#080809]`}>
                          <TrackIcon className="w-6 h-6" />
                        </div>
                        <span className="text-[9px] font-mono font-bold px-2.5 py-1 rounded bg-[#131418] text-[#94A3B8] border border-[#1C1D24] tracking-widest uppercase">
                          {track.badge}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold font-display text-[#E2E8F0] tracking-tight group-hover:text-white transition-colors">
                        {track.title}
                      </h3>
                      
                      <p className="mt-4 text-sm text-[#94A3B8] leading-relaxed">
                        {track.desc}
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-[#1C1D24]">
                      <h4 className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest mb-3">
                        SYLLABUS FOCUS
                      </h4>
                      <ul className="space-y-2">
                        {track.features.map((feat) => (
                          <li key={feat} className="flex items-center gap-2.5 text-xs text-[#E2E8F0]/90">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Link
                        to="/programs"
                        className="mt-8 group/link inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-cyan-400 uppercase tracking-widest hover:text-cyan-300 transition-colors"
                      >
                        Enroll Now
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
      <section className="bg-[#0E0E11] py-20 sm:py-28 relative overflow-hidden border-b border-[#1C1D24]">
        <div className="absolute inset-0 bg-line-grid opacity-15 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Reveal>
            <span className="text-xs sm:text-sm font-mono font-bold text-cyan-400 uppercase tracking-[0.2em] block mb-4">
              [ THE NAKSHATR PEDAGOGY ]
            </span>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display text-[#E2E8F0] leading-[1.1] uppercase max-w-4xl mx-auto tracking-tight">
              We place a drone in a student's hands{" "}
              <span className="text-gradient-stellar drop-shadow-[0_0_20px_rgba(245,158,11,0.1)] font-extrabold block sm:inline">
                before a single lecture
              </span>{" "}
              is delivered
            </h2>

            <div className="w-16 h-1 bg-gradient-stellar mx-auto my-8 rounded-full" />

            <p className="text-[#94A3B8] text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              Our reverse-engineering curriculum prioritizes genuine operational understanding over repetitive memorization. Every component is disassembled, every wiring route is trace-mapped, and every flight hour is verified.
            </p>

            <ul className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
              {pillars.map((p, idx) => {
                const PillarIcon = p.icon;
                return (
                  <li key={p.text} className="tech-card bg-[#080809] border border-[#1C1D24] p-6 rounded-lg flex flex-col justify-between h-full relative group">
                    <div className="cyber-scanline" />
                    <div>
                      <div className="w-10 h-10 rounded bg-[#131418] border border-[#272731] flex items-center justify-center text-amber-500 mb-5 shadow-inner">
                        <PillarIcon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-[9px] text-[#94A3B8] font-bold block mb-1 uppercase tracking-widest">
                        PILLAR 0{idx + 1}
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-[#E2E8F0] font-display">
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

      {/* 4.5 DETAILED UNIVERSITY & PROFESSIONAL PROGRAMS CATALOG */}
      <section className="bg-[#080809] py-20 sm:py-24 lg:py-28 relative border-b border-[#1C1D24]">
        <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
              <span className="text-xs sm:text-sm font-mono font-bold text-cyan-400 uppercase tracking-[0.25em]">
                [ UGC ALIGNED & CERTIFIED PATHWAYS ]
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#E2E8F0] uppercase mt-4 tracking-tight leading-tight">
                Academic & Professional Programs
              </h2>
              <p className="mt-4 text-[#94A3B8] text-sm sm:text-base leading-relaxed">
                Explore formal, credit-bearing curriculums embedded inside university partnerships and certified professional paths designed for rapid sector placement.
              </p>
            </div>
          </Reveal>

          {/* 4-Column/2-Column dynamic grid that handles laptop, tablet, and mobile beautifully */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-stretch">
            {formalPrograms.map((prog, idx) => {
              return (
                <Reveal key={prog.title} delay={idx * 0.08}>
                  <div className={`tech-card h-full rounded-xl p-6 sm:p-8 flex flex-col justify-between border-t-4 border-[#1C1D24] transition-all duration-500 bg-[#0E0E11] ${prog.accentClass}`}>
                    <div className="cyber-scanline" />
                    
                    <div>
                      {/* Header containing ID, Category tag, and Badge */}
                      <div className="flex justify-between items-center mb-6">
                        <span className="font-mono text-[10px] sm:text-xs text-primary font-bold tracking-widest uppercase">
                          {prog.id}
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-mono font-bold bg-[#131418] border border-[#1C1D24] text-cyan-400 px-3 py-1 rounded-full uppercase tracking-wider">
                          {prog.tag}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold font-display text-[#E2E8F0] tracking-tight hover:text-white transition-colors">
                        {prog.title}
                      </h3>
                      <p className="text-[10px] font-mono font-semibold uppercase text-[#94A3B8] mt-1.5 tracking-wider">
                        {prog.type}
                      </p>

                      <div className="w-full h-[1px] bg-[#1C1D24] my-5" />

                      {/* Course Technical Grid Specs */}
                      <div className="grid grid-cols-2 gap-4 border border-[#1C1D24] bg-[#080809]/60 rounded-lg p-4 font-mono text-xs mb-6 select-none">
                        <div className="flex flex-col gap-1 border-r border-[#1C1D24]">
                          <span className="text-[8px] uppercase tracking-widest text-[#94A3B8]/60 font-bold">DURATION</span>
                          <span className="text-[#E2E8F0] font-sans font-bold flex items-center gap-1.5 mt-1">
                            <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                            <div className="flex flex-col leading-none">
                              <span className="text-xs">{prog.duration}</span>
                              <span className="text-[8px] text-[#94A3B8] font-normal mt-0.5">{prog.session}</span>
                            </div>
                          </span>
                        </div>

                        <div className="flex flex-col gap-1 pl-2">
                          <span className="text-[8px] uppercase tracking-widest text-[#94A3B8]/60 font-bold">CREDITS</span>
                          <span className="text-[#E2E8F0] font-sans font-bold flex items-center gap-1.5 mt-1">
                            <Award className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <div className="flex flex-col leading-none">
                              <span className="text-xs">{prog.credits}</span>
                              <span className="text-[8px] text-[#94A3B8] font-normal mt-0.5">{prog.creditsDetail}</span>
                            </div>
                          </span>
                        </div>

                        <div className="flex flex-col gap-1 border-r border-[#1C1D24] border-t pt-3 mt-1">
                          <span className="text-[8px] uppercase tracking-widest text-[#94A3B8]/60 font-bold">EXPECTED FEE</span>
                          <span className="text-[#E2E8F0] font-sans font-bold flex items-center gap-1.5 mt-1">
                            <Coins className="w-3.5 h-3.5 text-primary shrink-0" />
                            <span className="text-xs">{prog.fee}</span>
                          </span>
                        </div>

                        <div className="flex flex-col gap-1 pl-2 border-t pt-3 mt-1">
                          <span className="text-[8px] uppercase tracking-widest text-[#94A3B8]/60 font-bold">ELIGIBILITY</span>
                          <span className="text-[#E2E8F0] font-sans font-bold flex items-center gap-1.5 mt-1" title={prog.eligibility}>
                            <UserCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span className="text-xs truncate max-w-[100px] sm:max-w-none">Open to all</span>
                          </span>
                        </div>
                      </div>

                      {/* Program Scope */}
                      <div className="mb-6">
                        <h4 className="text-[10px] font-mono font-bold text-[#E2E8F0] uppercase tracking-widest mb-2 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-primary shrink-0" /> 
                          Program Scope
                        </h4>
                        <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed bg-[#080809]/40 border border-[#1C1D24] p-3 sm:p-4 rounded-lg font-sans">
                          {prog.covers}
                        </p>
                      </div>

                      {/* Full Eligibility */}
                      <div className="text-[9px] font-mono text-[#94A3B8]/70 border border-[#1c1d24] p-2.5 rounded bg-[#080809]/20 leading-relaxed mb-6">
                        <strong>Eligibility detail:</strong> {prog.eligibility}
                      </div>
                    </div>

                    {/* Outcome Box */}
                    <div className="bg-[#080809] border border-[#1C1D24] rounded-lg p-4 mt-auto">
                      <h4 className="text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-primary shrink-0 animate-pulse" /> 
                        Core Competency Outcome
                      </h4>
                      <p className="text-xs text-[#94A3B8] leading-relaxed font-sans font-medium">
                        {prog.outcome}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. INDUSTRIAL APPLICATIONS */}
      <section className="bg-[#080809] py-20 sm:py-24 relative border-b border-[#1C1D24]">
        <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
              <span className="text-xs sm:text-sm font-mono font-bold text-cyan-400 uppercase tracking-[0.25em]">
                [ OPERATIONAL SECTORS ]
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#E2E8F0] uppercase mt-4 tracking-tight leading-tight">
                Industrial Applications
              </h2>
              <p className="mt-4 text-[#94A3B8] text-sm sm:text-base leading-relaxed">
                UAV technology is disrupting classical sectors. We prepare operators and builders specifically for deployment-ready commercial tracks.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((u, idx) => {
              const UseIcon = u.icon;
              return (
                <Reveal key={u.title} delay={idx * 0.05}>
                  <div className="tech-card group bg-[#0E0E11] border border-[#1C1D24] rounded-lg p-6 sm:p-7 flex flex-col justify-between h-full hover:border-cyan-500/30 transition-all duration-300">
                    <div className="cyber-scanline" />
                    <div>
                      <div className="flex justify-between items-start mb-5">
                        <div className="p-2.5 rounded bg-[#131418] border border-[#272731] text-cyan-400 group-hover:text-amber-500 transition-colors">
                          <UseIcon className="w-5.5 h-5.5" />
                        </div>
                        <span className="font-mono text-[9px] text-[#94A3B8] font-bold bg-[#131418] border border-[#1C1D24] px-2.5 py-0.5 rounded tracking-widest uppercase">
                          SEC-0{idx + 1}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold font-display text-[#E2E8F0] tracking-tight group-hover:text-white transition-colors">
                        {u.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#94A3B8] mt-3.5 leading-relaxed">
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

      {/* 6. ACADEMIC INTEGRATION & AUDIENCE */}
      <section className="bg-[#0E0E11] py-20 sm:py-24 relative border-b border-[#1C1D24]">
        <div className="absolute inset-0 bg-line-grid opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
              <span className="text-xs sm:text-sm font-mono font-bold text-amber-500 uppercase tracking-[0.25em]">
                [ ACADEMIC EMBEDDED INTEGRATION ]
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#E2E8F0] uppercase mt-4 tracking-tight leading-tight">
                Designed For the Ecosystem
              </h2>
              <p className="mt-4 text-[#94A3B8] text-sm sm:text-base leading-relaxed">
                Bridging classical engineering academia and deployment-ready industrial flight needs with structured university partners.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {audiences.map((aud, idx) => {
              const AudIcon = aud.icon;
              return (
                <Reveal key={aud.title} delay={idx * 0.08}>
                  <div className="tech-card group bg-[#080809] border border-[#1C1D24] rounded-lg p-6 sm:p-8 flex flex-col items-center text-center justify-between h-full hover:border-[#F59E0B]/30 transition-all duration-300">
                    <div className="cyber-scanline" />
                    <div className="flex flex-col items-center w-full">
                      <div className="w-12 h-12 rounded bg-[#0E0E11] border border-[#1C1D24] flex items-center justify-center text-cyan-400 group-hover:text-amber-500 transition-colors mb-6 shadow-inner">
                        <AudIcon className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold font-display text-[#E2E8F0] tracking-tight group-hover:text-white transition-colors">
                        {aud.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#94A3B8] mt-4 leading-relaxed max-w-xs">
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

      {/* 7. PREMIUM CTA BANNER */}
      <section className="bg-[#080809] py-24 sm:py-28 relative overflow-hidden">
        {/* Glowing stellar ambient orbs */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] aspect-square rounded-full bg-cyan-500/5 blur-[90px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] aspect-square rounded-full bg-amber-500/5 blur-[90px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-[#0E0E11]/85 border border-[#1C1D24] text-amber-500 px-3.5 py-1.5 rounded-full mb-6 font-mono text-[10px] sm:text-xs uppercase tracking-widest">
              <span>Flight Cohorts Now Enrolling</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-[#E2E8F0] tracking-tight uppercase max-w-4xl mx-auto leading-tight">
              Ready to take control <br className="hidden sm:inline" />
              of the{" "}
              <span className="text-gradient-stellar drop-shadow-[0_0_20px_rgba(245,158,11,0.15)] font-extrabold">
                modern airspace?
              </span>
            </h2>

            <p className="text-[#94A3B8] text-sm sm:text-base md:text-lg mt-6 max-w-xl mx-auto leading-relaxed">
              Enlist in our credit-bearing university drone cohorts or partner to establish a custom Centre of Excellence in your campus.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link
                to="/programs"
                className="group relative inline-flex items-center bg-gradient-stellar text-[#080809] font-mono text-xs sm:text-sm font-bold uppercase tracking-widest px-10 py-4 rounded shadow-[0_0_25px_rgba(245,158,11,0.25)] hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all duration-300"
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded" />
                Enlist in the Flight Program
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
