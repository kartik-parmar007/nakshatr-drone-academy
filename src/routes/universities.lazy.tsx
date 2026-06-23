import { createLazyFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Check, ArrowRight, FileSignature, Wrench, TrendingUp, Cpu, ShieldCheck, Activity, Compass, Wifi, Radio } from "lucide-react";
import { Reveal } from "@/components/Reveal";

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

export const Route = createLazyFileRoute("/universities")({
  component: UniversitiesPage,
});

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
  const [liveTelemetry, setLiveTelemetry] = useState({
    pitch: "0.20",
    yaw: "180.45",
    roll: "-0.10",
    alt: "124.80",
    freq: "5.750",
    esc: "42",
    battery: "98",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTelemetry((prev) => {
        const altNum = parseFloat(prev.alt) + (Math.random() - 0.5) * 0.3;
        const escNum = Math.min(95, Math.max(35, parseInt(prev.esc) + (Math.random() > 0.5 ? 1 : -1)));
        const batteryNum = Math.max(5, parseInt(prev.battery) - (Math.random() > 0.98 ? 1 : 0));
        return {
          pitch: (parseFloat(prev.pitch) + (Math.random() - 0.5) * 0.08).toFixed(2),
          yaw: (parseFloat(prev.yaw) + (Math.random() - 0.5) * 0.4).toFixed(2),
          roll: (parseFloat(prev.roll) + (Math.random() - 0.5) * 0.08).toFixed(2),
          alt: altNum.toFixed(2),
          freq: prev.freq,
          esc: escNum.toString(),
          battery: batteryNum.toString(),
        };
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#050506] text-white overflow-hidden min-h-screen">
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          5% { opacity: 0.8; }
          95% { opacity: 0.8; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
        .text-gradient-hud-premium {
          background: linear-gradient(135deg, #ffffff 0%, #a5f3fc 40%, #00F0FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hud-glow-btn {
          box-shadow: 0 0 20px rgba(0, 240, 255, 0.2);
          transition: all 0.3s ease;
        }
        .hud-glow-btn:hover {
          box-shadow: 0 0 35px rgba(0, 240, 255, 0.4);
          transform: translateY(-2px);
        }
      `}</style>

      {/* 1. HERO SECTION (Academic & Enterprise Landing Core) */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center border-b border-[#222328]/60 overflow-hidden pt-32 pb-16 px-4">
        {/* Soft background grid overlay */}
        <div className="absolute inset-0 bg-hud-grid opacity-[0.12] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,240,255,0.06),transparent_60%)] pointer-events-none" />

        {/* Clean Centered Hero Typography */}
        <div className="max-w-4xl mx-auto text-center relative z-10 mb-16 select-none">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-[#16171A] border border-[#222328] text-[#00F0FF] px-4 py-1.5 rounded-full mb-6 font-mono text-[10px] tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(0,240,255,0.05)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]"></span>
              </span>
              University Partnerships Catalog
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display text-white leading-[1.1] tracking-tight uppercase">
              Transform Your <br />
              <span className="text-gradient-hud-premium font-extrabold drop-shadow-[0_0_35px_rgba(0,240,255,0.2)]">
                University Ecosystem
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-[#8A94A6] mt-6 max-w-2xl mx-auto leading-relaxed font-sans">
              Establish a state-of-the-art Drone Centre of Excellence on your campus. Fully equipped, credit-mapped, and staffed by industry professionals at zero capital investment.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center bg-[#00F0FF] hover:bg-[#0077FF] text-[#050506] font-mono text-xs sm:text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-md transition-all duration-300 border border-[#00F0FF] hud-glow-btn"
              >
                Schedule MoU Review
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#benefits"
                className="group relative inline-flex items-center justify-center bg-transparent hover:bg-[#16171A] text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-md border border-[#222328] transition-all duration-300"
              >
                View Lab Specs
              </a>
            </div>
          </Reveal>
        </div>

        {/* Symmetric 2-Card Showcase (Facility vs Hardware) */}
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 px-2 sm:px-6">
          
          {/* Card 1: The Lab Facility */}
          <Reveal delay={0.1}>
            <div className="group rounded-xl overflow-hidden border border-[#222328] bg-[#0c0d0f] transition-all duration-300 hover:border-[#00F0FF]/40 flex flex-col h-full shadow-2xl relative">
              <div className="h-[260px] sm:h-[320px] w-full relative overflow-hidden bg-[#0a0b0d]/50">
                <div 
                  className="absolute inset-0 bg-cover bg-center select-none pointer-events-none transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('/university_drone_lab_hero.png')` }}
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0f] via-[#0c0d0f]/20 to-transparent" />
                
                <div className="absolute top-4 left-4 bg-[#050506]/85 border border-[#222328]/80 text-[#00F0FF] font-mono text-[9px] px-3 py-1.5 rounded tracking-wider uppercase font-bold flex items-center gap-1.5 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                  Centre of Excellence
                </div>
              </div>
              
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white uppercase tracking-tight group-hover:text-[#00F0FF] transition-colors duration-300">
                    Physical Campus Lab
                  </h3>
                  <p className="text-sm text-[#8A94A6] mt-3 leading-relaxed font-sans">
                    Turn campus space into a fully functional training facility containing simulator stations, component workbench setups, and indoor flight grids.
                  </p>
                </div>
                
                <div className="mt-6 pt-5 border-t border-[#222328]/60 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] font-mono text-[#8A94A6] uppercase tracking-wider">UGC Credits</div>
                    <div className="text-sm font-bold text-white mt-1">SEC-Aligned Mapping</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#8A94A6] uppercase tracking-wider">Setup Period</div>
                    <div className="text-sm font-bold text-white mt-1">21 Working Days</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Card 2: Flight Hardware (Premium Schematic Image + Telemetry Interface) */}
          <Reveal delay={0.2}>
            <div className="group rounded-xl overflow-hidden border border-[#222328] bg-[#0c0d0f] transition-all duration-300 hover:border-[#00F0FF]/40 flex flex-col h-full shadow-2xl relative">
              <div className="h-[260px] sm:h-[320px] w-full relative overflow-hidden bg-[#07080a] flex items-center justify-center">
                
                {/* Drone Background Schematic */}
                <div className="absolute inset-0 bg-[#050506]/40 mix-blend-multiply pointer-events-none z-1" />
                <img 
                  src="/drone_hardware_blueprint.png"
                  alt="Industrial Flight Hardware"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none opacity-85"
                />

                {/* Laser scan line effect */}
                <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent opacity-0 group-hover:opacity-100 pointer-events-none animate-scan z-10" />
                
                {/* HUD Overlay */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between font-mono text-[9px] text-[#00F0FF]/85 select-none z-10">
                  {/* Top Row */}
                  <div className="flex justify-between items-center w-full">
                    <div className="bg-[#050506]/95 border border-[#222328] px-2 py-1 rounded flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>SYS // ONLINE</span>
                    </div>
                    
                    {/* Nakshatr Logo & Brand Overlay */}
                    <div className="bg-[#050506]/95 border border-[#222328] px-2.5 py-1 rounded flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,240,255,0.05)]">
                      <img 
                        src="/Logo_Main_1.webp" 
                        alt="Nakshatr Logo" 
                        className="h-3.5 w-auto object-contain" 
                      />
                      <span className="font-bold tracking-wider text-[8px] text-white uppercase">NAKSHATR</span>
                    </div>

                    <div className="bg-[#050506]/95 border border-[#222328] px-2 py-1 rounded flex items-center gap-1">
                      <Radio className="w-3 h-3 text-[#00F0FF]/70 animate-pulse" />
                      <span>FREQ // {liveTelemetry.freq} GHz</span>
                    </div>
                  </div>

                  {/* Center Crosshair / Target box */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-300">
                    <div className="relative w-16 h-16 border border-[#00F0FF]/30 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full" />
                      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#00F0FF]/30 -translate-x-1/2" />
                      <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-[#00F0FF]/30 -translate-y-1/2" />
                      
                      {/* Corners */}
                      <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00F0FF]" />
                      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#00F0FF]" />
                      <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#00F0FF]" />
                      <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00F0FF]" />
                    </div>
                  </div>

                  {/* Bottom Row */}
                  <div className="flex justify-between items-end gap-2">
                    <div className="bg-[#050506]/95 border border-[#222328] px-2.5 py-1.5 rounded grid grid-cols-2 gap-x-3 gap-y-0.5 text-left max-w-[150px] sm:max-w-none">
                      <div>PITCH: <span className="text-white font-bold">{liveTelemetry.pitch}°</span></div>
                      <div>YAW: <span className="text-white font-bold">{liveTelemetry.yaw}°</span></div>
                      <div>ROLL: <span className="text-white font-bold">{liveTelemetry.roll}°</span></div>
                      <div>ALT: <span className="text-white font-bold">{liveTelemetry.alt}m</span></div>
                    </div>
                    <div className="bg-[#050506]/95 border border-[#222328] px-2.5 py-1.5 rounded text-right whitespace-nowrap">
                      <div>ESC TEMP: <span className="text-white font-bold">{liveTelemetry.esc}°C</span></div>
                      <div>BATTERY: <span className="text-white font-bold">{liveTelemetry.battery}%</span></div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 bg-[#050506]/85 border border-[#222328] text-white/90 font-mono text-[9px] px-3 py-1 rounded tracking-wider uppercase flex items-center gap-1.5 select-none pointer-events-none z-20">
                  <Activity className="w-3.5 h-3.5 text-[#00F0FF]" />
                  Telemetry Dashboard
                </div>
              </div>
              
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white uppercase tracking-tight group-hover:text-[#00F0FF] transition-colors duration-300">
                    Industrial Hardware
                  </h3>
                  <p className="text-sm text-[#8A94A6] mt-3 leading-relaxed font-sans">
                    Equip your students with type-certified multirotors, active flight transmitters, field ground stations, and battery diagnostics safety gear.
                  </p>
                </div>
                
                <div className="mt-6 pt-5 border-t border-[#222328]/60 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] font-mono text-[#8A94A6] uppercase tracking-wider">Drone Safety</div>
                    <div className="text-sm font-bold text-white mt-1">DGCA Operating Standard</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#8A94A6] uppercase tracking-wider">Lab Equipment</div>
                    <div className="text-sm font-bold text-white mt-1">Type-Certified Drone</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          
        </div>
      </section>

      {/* 2. PROBLEM & INDUSTRY OPPORTUNITY BLOCK */}
      <section className="bg-[#050506] py-20 border-b border-[#222328]/60 relative">
        <div className="absolute inset-0 bg-hud-grid opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-stretch">
          
          <Reveal>
            <div className="tech-card animate-hud-hover-float group rounded-lg p-8 h-full relative overflow-hidden bg-[#16171A] border border-[#222328] hud-card-corners">
              <div className="cyber-scanline" />
              <DroneVector className="absolute -bottom-4 -right-4 w-20 h-20 text-[#00F0FF] opacity-[0.03] group-hover:opacity-[0.11] transition-opacity duration-300 pointer-events-none animate-drone-wobble" />
              <div className="absolute top-3 right-4 font-mono text-[9px] text-[#00F0FF]/50 select-none uppercase">GAP-ANL-09</div>
              
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight font-display transition-colors duration-300 group-hover:text-[#00F0FF] relative z-10">
                The Academic Gap We Close
              </h3>
              <p className="text-[#8A94A6] mt-4 leading-relaxed text-sm relative z-10 font-sans">
                UAV technology education in India is heavily fragmented, consisting primarily of brief seminars and passive video presentations. Students lack true flight diagnostics, controller programming skills, and operational hours. Our university-embedded labs provide direct physical assembly configurations, flight logging systems, and DGCA exam mock paths to produce deployable flight assets.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="tech-card animate-hud-hover-float group rounded-lg p-8 h-full relative border-t-4 border-[#222328] bg-[#16171A] hover:border-t-[#00F0FF] flex flex-col justify-center overflow-hidden hud-card-corners">
              <div className="cyber-scanline" />
              <DroneVector className="absolute -bottom-4 -right-4 w-20 h-20 text-[#00F0FF] opacity-[0.03] group-hover:opacity-[0.11] transition-opacity duration-300 pointer-events-none animate-drone-wobble" />
              <div className="absolute top-3 right-4 font-mono text-[9px] text-[#00F0FF]/50 select-none uppercase">CRIT-GAP-METRIC</div>
              
              <div className="text-6xl sm:text-7xl font-extrabold text-[#00F0FF] font-display relative z-10 drop-shadow-[0_0_20px_rgba(0,240,255,0.15)]">
                <Counter end={12} suffix="%" />
              </div>
              <p className="mt-4 text-[#00F0FF] font-bold font-mono text-xs uppercase tracking-widest relative z-10">[ DEPLOYMENT READY STATE ]</p>
              <p className="mt-2 text-[#8A94A6] text-sm leading-relaxed font-sans relative z-10">
                of drone academy graduates in India are prepared for real industrial workflows on Day 1. Our Centre of Excellence bridges this operational readiness gap.
              </p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* 3. PROSPECTUS BENEFITS */}
      <section id="benefits" className="bg-[#16171A] py-20 border-b border-[#222328]/60 relative">
        <div className="absolute inset-0 bg-hud-radar opacity-25 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16 select-none">
              <span className="text-xs font-mono font-bold text-[#00F0FF] uppercase tracking-[0.3em]">
                [ INFRASTRUCTURE CORE ]
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-white uppercase mt-4 tracking-tight leading-tight">
                What Your University Gets
              </h2>
              <p className="mt-4 text-[#8A94A6] text-sm sm:text-base leading-relaxed">
                Complete hardware labs, credit mappings, joint branding certification, and continuous student revenue share schemes.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((b, i) => (
              <Reveal key={b} delay={i * 0.04}>
                <div className="tech-card animate-hud-hover-float group rounded-lg p-5 flex items-start gap-4 overflow-hidden bg-[#050506] border border-[#222328] hud-card-corners">
                  <div className="cyber-scanline" />
                  <DroneVector className="absolute -bottom-4 -right-4 w-20 h-20 text-[#00F0FF] opacity-[0.03] group-hover:opacity-[0.11] transition-opacity duration-300 pointer-events-none animate-drone-wobble" />
                  
                  <div className="w-10 h-10 rounded bg-[#16171A] border border-[#222328] flex items-center justify-center shrink-0 relative z-10 text-[#00F0FF]">
                    <Check size={20} />
                  </div>
                  
                  <div className="pt-2 relative z-10 select-none">
                    <h3 className="font-bold text-[#E2E8F0] text-xs sm:text-sm uppercase tracking-wider font-display transition-colors duration-300 group-hover:text-[#00F0FF]">
                      {b}
                    </h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SIMPLE 3-STEP PARTNERSHIP */}
      <section className="bg-[#050506] py-20 border-b border-[#222328]/60 relative">
        <div className="absolute inset-0 bg-hud-grid opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16 select-none">
              <span className="text-xs font-mono font-bold text-[#00F0FF] uppercase tracking-[0.3em]">
                [ DEPLOYMENT INGESTION ]
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-white uppercase mt-4 tracking-tight leading-tight">
                Simple 3-Step Partnership
              </h2>
              <p className="mt-4 text-[#8A94A6] text-sm sm:text-base leading-relaxed">
                Our team handles MoU execution, hardware lab construction, curriculum licensing, and certification delivery.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch relative">
            {[
              { n: 1, icon: FileSignature, title: "MoU Alignment", desc: "Mutually structured partnership terms, credit values, and revenue share models." },
              { n: 2, icon: Wrench, title: "Lab Setup Operations", desc: "We deploy standard simulators, calibration tools, flight transmitters, and carbon-frame training drones." },
              { n: 3, icon: TrendingUp, title: "Deploy & Joint Certify", desc: "Deliver high-fidelity credit-bearing cohorts, issue certifications, and route to sector jobs." },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className="tech-card animate-hud-hover-float group rounded-lg p-8 text-center h-full relative overflow-hidden bg-[#16171A] border border-[#222328] hud-card-corners">
                  <div className="cyber-scanline" />
                  <DroneVector className="absolute -bottom-4 -right-4 w-20 h-20 text-[#00F0FF] opacity-[0.03] group-hover:opacity-[0.11] transition-opacity duration-300 pointer-events-none animate-drone-wobble" />
                  
                  <div className="w-10 h-10 rounded border border-[#00F0FF]/35 bg-[#050506] text-[#00F0FF] font-mono font-bold flex items-center justify-center text-sm shadow-sm mx-auto relative z-10 select-none">
                    0{s.n}
                  </div>
                  
                  <s.icon className="mx-auto mt-6 text-[#00F0FF] relative z-10" size={28} />
                  
                  <h3 className="mt-4 text-xl font-bold text-white tracking-tight font-display transition-colors duration-300 group-hover:text-[#00F0FF] relative z-10 uppercase">
                    {s.title}
                  </h3>
                  
                  <p className="mt-2 text-[#8A94A6] text-sm leading-relaxed relative z-10 font-sans">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TACTICAL CTA BANNER */}
      <section id="contact" className="bg-[#050506] py-24 sm:py-28 relative overflow-hidden border-t border-[#222328]/60">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] aspect-square rounded-full bg-[#00F0FF]/5 blur-[100px] pointer-events-none animate-pulse" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] aspect-square rounded-full bg-[#00F0FF]/5 blur-[100px] pointer-events-none animate-pulse" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-[#16171A] border border-[#222328] text-[#00F0FF] px-3.5 py-1.5 rounded mb-6 font-mono text-[10px] sm:text-xs uppercase tracking-widest select-none hud-brackets">
              <span>MoU Submission Port</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white uppercase tracking-tight leading-tight">
              Ready to build a <br />
              <span className="text-gradient-hud-premium font-extrabold drop-shadow-[0_0_20px_rgba(0,240,255,0.15)]">
                Centre of Excellence?
              </span>
            </h2>
            
            <p className="text-[#8A94A6] mt-6 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
              Schedule an operational review with our partnerships team to evaluate MoU structures, university-embedded spacing requirements, and local UGC framework credits.
            </p>
            
            <div className="mt-10 flex justify-center">
              <a
                href="mailto:hello@nakshatr.tech"
                className="group relative inline-flex items-center justify-center bg-[#00F0FF] hover:bg-[#0077FF] text-[#050506] font-mono text-xs sm:text-sm font-bold uppercase tracking-widest px-10 py-4 rounded shadow-[0_0_25px_rgba(0,240,255,0.2)] border border-[#00F0FF] hud-glow-btn"
              >
                Schedule Partnerships Meeting
                <ArrowRight className="ml-2.5 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
