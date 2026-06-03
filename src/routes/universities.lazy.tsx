import { createLazyFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Check, ArrowRight, FileSignature, Wrench, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { AgricultureDroneGLB } from "@/components/AgricultureDroneGLB";

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
      {/* 1. HERO SECTION (With levitating 3D Agriculture Drone) */}
      <section className="relative min-h-[90vh] flex items-center justify-center border-b border-[#222328] overflow-hidden pt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center select-none pointer-events-none opacity-40"
          style={{ backgroundImage: `url('/dawn_mountain_landscape.webp')` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050506] via-[#050506]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_0%,#050506_85%)] pointer-events-none" />
        <div className="absolute inset-0 bg-hud-grid opacity-50 pointer-events-none" />

        {/* Tactical crosshair vectors */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-20">
          <div className="w-[80%] aspect-square rounded-full border border-dashed border-[#00F0FF]/15 animate-[spin_65s_linear_infinite]" />
          <div className="absolute w-[92%] h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF]/25 to-transparent" />
          <div className="absolute h-[92%] w-[1px] bg-gradient-to-b from-transparent via-[#00F0FF]/25 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 grid lg:grid-cols-12 gap-8 items-center relative z-10 w-full">
          {/* Hero Left Info */}
          <div className="lg:col-span-7 flex flex-col items-start text-left relative p-6 sm:p-8 rounded-lg bg-[#16171A]/35 border border-[#222328]/45 backdrop-blur-sm hud-brackets">
            <div className="absolute top-2 right-3 font-mono text-[9px] text-[#00F0FF]/50 tracking-[0.2em] select-none">
              SYS-LNK: CO-EXP-2026
            </div>
            
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-[#16171A] border border-[#00F0FF]/30 text-[#00F0FF] px-4 py-1.5 rounded mb-6 shadow-[0_0_15px_rgba(0,240,255,0.08)] select-none">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]"></span>
                </span>
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase">
                  UNIVERSITY PARTNERSHIPS CATALOG
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-white leading-[1.08] tracking-tight uppercase">
                Transform Your <br />
                <span className="text-gradient-hud font-extrabold drop-shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                  University Ecosystem
                </span>
              </h1>
              
              <p className="text-sm sm:text-base text-[#00F0FF] mt-4 font-mono uppercase tracking-[0.15em] font-semibold">
                [ Zero Investment · Center of Excellence · Revenue Share ]
              </p>
              
              <p className="text-[#8A94A6] text-sm sm:text-base mt-6 leading-relaxed max-w-xl font-sans">
                Embed a cutting-edge drone lab inside your campus, fully staffed and equipped with type-certified multirotors, simulation stations, and UGC SEC aligned curriculums at zero operational cost to your administration.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 w-full sm:w-auto">
                <a
                  href="#contact"
                  className="group relative btn-hud-glow w-full sm:w-auto inline-flex items-center justify-center bg-[#00F0FF] hover:bg-[#0077FF] text-[#050506] font-mono text-xs sm:text-sm font-bold uppercase tracking-widest px-8 py-4 rounded shadow-[0_0_25px_rgba(0,240,255,0.2)] hud-pulse-border"
                >
                  Schedule MoU Review
                  <ArrowRight className="ml-2.5 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Hero Right: 3D Agriculture Drone */}
          <div className="lg:col-span-5 relative flex justify-center items-center h-[320px] xs:h-[380px] sm:h-[420px] md:h-[480px] lg:h-[550px] w-full">
            <div className="absolute w-3/4 h-[80px] bg-[#00F0FF]/15 blur-[80px] rounded-full bottom-8 pointer-events-none animate-pulse" />

            {/* Floating Live Telemetry HUD Widget */}
            <div className="absolute top-4 right-0 z-20 border border-[#222328] bg-[#050506]/95 p-4 rounded font-mono text-[9px] text-[#00F0FF] tracking-[0.2em] backdrop-blur-lg shadow-2xl hidden sm:block min-w-[155px]">
              <div className="flex items-center gap-2 font-bold mb-2 uppercase text-[#00F0FF] border-b border-[#222328] pb-1 select-none">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
                AGRI-HUD LOG
              </div>
              <div className="space-y-1 opacity-90 select-none">
                <div className="flex justify-between"><span>PITCH:</span> <span className="font-bold text-white">{telemetry.pitch}°</span></div>
                <div className="flex justify-between"><span>YAW:</span> <span className="font-bold text-white">{telemetry.yaw}°</span></div>
                <div className="flex justify-between"><span>ALTITUDE:</span> <span className="font-bold text-[#00F0FF]">{telemetry.alt} M</span></div>
                <div className="flex justify-between"><span>GYROSCOPE:</span> <span className="font-bold text-emerald-400 font-sans">CALIBRATED</span></div>
              </div>
            </div>

            <div className="w-full h-full relative cursor-grab active:cursor-grabbing z-10 levitate-gpu">
              <AgricultureDroneGLB
                className="w-full h-full"
                scale={1.9}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM & INDUSTRY OPPORTUNITY BLOCK */}
      <section className="bg-[#050506] py-20 border-b border-[#222328] relative">
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
      <section className="bg-[#16171A] py-20 border-b border-[#222328] relative">
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
      <section className="bg-[#050506] py-20 border-b border-[#222328] relative">
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
                Our team handles Mou, hardware lab construction, curriculum licensing, and certification delivery.
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
      <section id="contact" className="bg-[#050506] py-24 sm:py-28 relative overflow-hidden border-t border-[#222328]">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] aspect-square rounded-full bg-[#00F0FF]/5 blur-[100px] pointer-events-none animate-pulse" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] aspect-square rounded-full bg-[#00F0FF]/5 blur-[100px] pointer-events-none animate-pulse" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-[#16171A] border border-[#222328] text-[#00F0FF] px-3.5 py-1.5 rounded mb-6 font-mono text-[10px] sm:text-xs uppercase tracking-widest select-none hud-brackets">
              <span>MoU Submission Port</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white uppercase tracking-tight leading-tight">
              Ready to build a <br />
              <span className="text-gradient-hud font-extrabold drop-shadow-[0_0_20px_rgba(0,240,255,0.15)]">
                Centre of Excellence?
              </span>
            </h2>
            
            <p className="text-[#8A94A6] mt-6 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
              Schedule an operational review with our partnerships team to evaluate MoU structures, university-embedded spacing requirements, and local UGC framework credits.
            </p>
            
            <div className="mt-10 flex justify-center">
              <a
                href="mailto:hello@nakshatr.tech"
                className="group relative btn-hud-glow inline-flex items-center justify-center bg-[#00F0FF] hover:bg-[#0077FF] text-[#050506] font-mono text-xs sm:text-sm font-bold uppercase tracking-widest px-10 py-4 rounded shadow-[0_0_25px_rgba(0,240,255,0.2)] hud-pulse-border"
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
