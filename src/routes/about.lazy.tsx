import { createLazyFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Calendar, MapPin, Award, BookOpen, Shield, ShieldCheck,
  User, Plane, FlaskConical, BarChart3, Landmark, GraduationCap,
  Mail, Phone,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { DroneGLB } from "@/components/DroneGLB";
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

export const Route = createLazyFileRoute("/about")({
  component: AboutPage,
});

const credentials = [
  { icon: Plane, text: "DGCA Approved Remote Pilot" },
  { icon: FlaskConical, text: "Former UK R&D Professional" },
  { icon: BarChart3, text: "Drone Market Operations Expert" },
  { icon: Landmark, text: "Gujarat Drone Katra Participant" },
  { icon: GraduationCap, text: "Curriculum Architect" },
];

const facts = [
  { icon: Calendar, label: "Founded", value: "June 2024" },
  { icon: MapPin, label: "Location", value: "Bhavnagar, Gujarat" },
  { icon: Award, label: "Partner", value: "MKBU" },
  { icon: BookOpen, label: "Programs", value: "4 Pathways" },
  { icon: Shield, label: "Regulatory", value: "DGCA Compliant" },
  { icon: ShieldCheck, label: "Insurance", value: "Fully Covered" },
];

const FLEET_DRONES = [
  {
    id: "NK-1",
    name: "NK-1 Academy Trainer",
    type: "Quadcopter Trainer",
    desc: "Designed for high-stability piloting, hands-on mechanical assembly training, and regulatory type-certified license flights.",
    specs: [
      { label: "Empty Weight", value: "1.4 kg" },
      { label: "Max Takeoff Weight", value: "2.2 kg" },
      { label: "Max Endurance", value: "22 mins" },
      { label: "Flight Controller", value: "Pixhawk 6C" },
      { label: "Max Wind Resistance", value: "10 m/s" },
      { label: "Signal Frequency", value: "2.4 GHz / 5.8 GHz" },
    ],
  },
  {
    id: "AG-1",
    name: "AG-1 Precision Sprayer",
    type: "Heavy-Lift Hexacopter",
    desc: "Heavy-payload industrial UAV designed for automated waypoint spraying, multispectral crop health mapping, and agronomy surveys.",
    specs: [
      { label: "Empty Weight", value: "14.5 kg" },
      { label: "Max Takeoff Weight", value: "28.5 kg" },
      { label: "Payload Capacity", value: "10 Litres" },
      { label: "Max Endurance", value: "18 mins (Full Load)" },
      { label: "Positioning Accuracy", value: "RTK Centimeter-Level" },
      { label: "Signal Frequency", value: "5.8 GHz" },
    ],
  }
];

function AboutPage() {
  const [form, setForm] = useState({ name: "", email: "", org: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [selectedDrone, setSelectedDrone] = useState(0);
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
      {/* Story & Interactive 3D Fleet Dashboard */}
      <section className="bg-background py-16 sm:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-center uppercase tracking-tight font-display">
              About Nakshatr Technologies
            </h1>
            <p className="text-muted-foreground text-center mt-3 max-w-3xl mx-auto text-sm font-mono uppercase">
              [ INDIA'S FIRST UNIVERSITY-EMBEDDED DRONE COMPANY · ESTABLISHED JUNE 2024 ]
            </p>
          </Reveal>

          {/* Interactive Fleet Dashboard Grid */}
          <div className="mt-14 sm:mt-16 grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Specs / Controls column */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <Reveal>
                <div className="text-primary font-mono text-xs font-bold tracking-widest uppercase mb-2">
                  [ ACTIVE TRAINING FLEET ]
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-display tracking-tight uppercase leading-none">
                  DGCA-Compliant Training Fleet
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mt-3">
                  Nakshatr Drone Academy deploys industrial-grade hardware for all educational pathways. Students get hands-on experience with multirotor trainers and heavy-lift agricultural spraying assets.
                </p>
              </Reveal>

              {/* Selector Tabs */}
              <div className="flex gap-2">
                {FLEET_DRONES.map((d, idx) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDrone(idx)}
                    className={`flex-1 font-mono text-[10px] sm:text-xs uppercase tracking-wider py-3.5 px-4 rounded border transition-all cursor-pointer font-bold ${
                      selectedDrone === idx
                        ? "bg-primary border-primary text-white shadow-lg shadow-blue-500/10"
                        : "bg-zinc-950/60 border-border text-muted-foreground hover:text-foreground hover:bg-zinc-950/90"
                    }`}
                  >
                    {d.id} · {d.name.split(" ")[0]}
                  </button>
                ))}
              </div>

              {/* Specs and Description Panel */}
              <div className="tech-card rounded-md p-6 bg-zinc-950/20 relative overflow-hidden flex-1 flex flex-col justify-between">
                <div className="cyber-scanline" />
                <div className="absolute top-3 right-4 font-mono text-[8px] text-blue-500/50 select-none uppercase">
                  FLEET-SPEC-V2
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground font-display">{FLEET_DRONES[selectedDrone].name}</h3>
                  <div className="text-[10px] uppercase font-mono tracking-wider text-primary font-semibold mt-1">
                    {FLEET_DRONES[selectedDrone].type}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-3.5 bg-zinc-950/40 border border-border p-3.5 rounded-md font-sans">
                    {FLEET_DRONES[selectedDrone].desc}
                  </p>
                </div>

                <div className="w-full h-[1px] bg-border my-5" />

                {/* Technical Parameters List */}
                <div className="grid grid-cols-2 gap-3.5 font-mono text-xs">
                  {FLEET_DRONES[selectedDrone].specs.map((s) => (
                     <div key={s.label} className="border-b border-border/60 pb-2">
                      <span className="text-[8px] uppercase tracking-widest text-muted-foreground/70 font-bold block mb-0.5">{s.label}</span>
                      <span className="text-foreground font-bold font-sans text-xs">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3D Viewer Container */}
            <div className="lg:col-span-7 tech-card rounded-lg bg-zinc-950/10 min-h-[380px] xs:min-h-[440px] sm:min-h-[480px] relative overflow-hidden border border-border flex items-center justify-center p-4">
              <div className="cyber-scanline" />
              
              {/* Telemetry CAD HUD Overlay */}
              <div className="absolute top-4 left-4 z-20 font-mono text-[8px] sm:text-[9px] text-cyan-400 tracking-wider bg-zinc-950/80 p-3 rounded-md border border-cyan-500/25 backdrop-blur-md shadow-md select-none pointer-events-none">
                <div className="flex items-center gap-1.5 font-bold mb-1 uppercase text-[10px] text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
                  CAD INSTRUMENTATION
                </div>
                <div className="space-y-0.5 opacity-85">
                  <div>UNIT ID: {FLEET_DRONES[selectedDrone].id}-DRN</div>
                  <div>PITCH: {telemetry.pitch}°</div>
                  <div>YAW: {telemetry.yaw}°</div>
                  <div>ROLL: {telemetry.roll}°</div>
                  <div>ALT STATUS: {telemetry.alt} M</div>
                </div>
              </div>

              {/* Status HUD Overlay (Top Right) */}
              <div className="absolute top-4 right-4 z-20 font-mono text-[8px] sm:text-[9px] text-emerald-400 tracking-wider bg-zinc-950/80 p-3 rounded-md border border-emerald-500/25 backdrop-blur-md shadow-md select-none pointer-events-none">
                <div className="flex items-center gap-1.5 font-bold mb-1 uppercase text-[10px] text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  3D RENDER CALIBRATION
                </div>
                <div className="space-y-0.5 opacity-85">
                  <div>ESC REQ: {telemetry.esc}%</div>
                  <div>LINK STAT: 100%</div>
                  <div>FREQ RES: {telemetry.freq} GHZ</div>
                  <div>ENGINE: WEBGL-GPU</div>
                </div>
              </div>

              {/* Background scanning circles */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-20">
                <div className="w-[320px] h-[320px] rounded-full border border-dashed border-blue-500/15 animate-[spin_60s_linear_infinite]" />
                <div className="absolute w-[240px] h-[240px] rounded-full border border-dashed border-cyan-500/10 animate-[spin_30s_linear_infinite_reverse]" />
                <div className="absolute w-[90%] h-[1px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
                <div className="absolute h-[90%] w-[1px] bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent" />
              </div>

              {/* Dynamic 3D model loaders */}
              <div className="w-full h-[320px] xs:h-[380px] sm:h-[420px] flex justify-center items-center">
                {selectedDrone === 0 ? (
                  <DroneGLB className="h-full" scale={1.9} />
                ) : (
                  <AgricultureDroneGLB className="h-full" scale={1.9} />
                )}
              </div>
              
              {/* Interactive Help Hint */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60 select-none pointer-events-none bg-zinc-950/60 border border-border/80 px-3 py-1 rounded">
                [ Click + Drag to rotate 3D model ]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-background py-20 border-b border-border bg-dot-grid">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="tech-card group rounded-lg p-8 md:p-12 grid md:grid-cols-3 gap-10 relative overflow-hidden">
              <div className="cyber-scanline" />
              <DroneVector className="absolute -bottom-6 -right-6 w-32 h-32 text-primary opacity-[0.03] group-hover:opacity-[0.11] transition-opacity duration-300 pointer-events-none animate-drone-wobble" />
              <div className="absolute top-3 right-4 font-mono text-[9px] text-blue-500/50 select-none uppercase z-10">
                PERSONNEL-LOG-001
              </div>
              <div className="flex justify-center md:justify-start z-10">
                <div className="w-36 h-36 rounded-md bg-blue-955 border border-blue-900/55 flex items-center justify-center text-primary shadow-inner">
                  <User size={64} />
                </div>
              </div>
              <div className="md:col-span-2 z-10">
                <div className="text-primary font-mono text-xs font-bold tracking-widest uppercase">[ FOUNDER PROFILE ]</div>
                <h2 className="text-3xl font-bold text-foreground mt-2 tracking-tight font-display transition-colors duration-300 group-hover:text-primary">A pilot, a researcher, an educator</h2>
                <p className="text-muted-foreground mt-4 leading-relaxed text-sm">
                  After a decade of R&D in the UK and operational experience in India's drone
                  market, our founder returned to Bhavnagar to architect a programme that
                  produces deployment-ready operators — not certificate holders.
                </p>
                <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                  {credentials.map((c) => (
                    <li key={c.text} className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-6 h-6 rounded bg-blue-955 border border-blue-900/40 flex items-center justify-center text-primary shrink-0">
                        <c.icon size={14} />
                      </div>
                      <span className="text-xs font-semibold text-foreground uppercase font-mono tracking-tight transition-colors duration-300 group-hover:text-primary">{c.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Facts */}
      <section className="bg-background py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center uppercase tracking-tight font-display">Company Facts</h2>
            <p className="text-muted-foreground text-center mt-3 max-w-xl mx-auto text-sm font-mono">
              [ VERIFIED REGULATORY & OPERATIONAL METRICS ]
            </p>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {facts.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.05}>
                <div className="tech-card group rounded-md p-6 relative overflow-hidden">
                  <div className="cyber-scanline" />
                  <DroneVector className="absolute -bottom-4 -right-4 w-20 h-20 text-primary opacity-[0.03] group-hover:opacity-[0.11] transition-opacity duration-300 pointer-events-none animate-drone-wobble" />
                  <div className="absolute top-0 right-0 p-2 font-mono text-[9px] text-blue-500/50 select-none">
                    FACT-LNK-0{i + 1}
                  </div>
                  <f.icon className="text-primary animate-pulse relative z-10" size={26} />
                  <div className="mt-3 text-xs uppercase tracking-wider text-primary font-mono font-bold relative z-10">{f.label}</div>
                  <div className="text-foreground font-bold text-lg mt-1 font-display transition-colors duration-300 group-hover:text-primary relative z-10">{f.value}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-background py-20 border-b border-border bg-dot-grid">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-7">
          <Reveal>
            <div className="tech-card group rounded-md p-10 h-full relative overflow-hidden">
              <div className="cyber-scanline" />
              <DroneVector className="absolute -bottom-4 -right-4 w-20 h-20 text-primary opacity-[0.03] group-hover:opacity-[0.11] transition-opacity duration-300 pointer-events-none animate-drone-wobble" />
              <div className="absolute top-3 right-4 font-mono text-[9px] text-blue-500/50 select-none uppercase">SYS-MISSION</div>
              <div className="text-primary text-xs font-mono font-bold tracking-widest uppercase relative z-10">[ MISSION ]</div>
              <p className="mt-4 text-2xl font-bold text-foreground leading-snug font-display transition-colors duration-300 group-hover:text-primary relative z-10">
                Place a drone in every student's hands before a single lecture is delivered.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="tech-card group rounded-md p-10 h-full relative overflow-hidden">
              <div className="cyber-scanline" />
              <DroneVector className="absolute -bottom-4 -right-4 w-20 h-20 text-primary opacity-[0.03] group-hover:opacity-[0.11] transition-opacity duration-300 pointer-events-none animate-drone-wobble" />
              <div className="absolute top-3 right-4 font-mono text-[9px] text-blue-500/50 select-none uppercase">SYS-VISION</div>
              <div className="text-primary text-xs font-mono font-bold tracking-widest uppercase relative z-10">[ VISION ]</div>
              <p className="mt-4 text-2xl font-bold text-foreground leading-snug font-display transition-colors duration-300 group-hover:text-primary relative z-10">
                Become the foundational layer of drone talent for India by 2030.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-background py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground uppercase tracking-tight font-display">Get in Touch</h2>
            <p className="text-muted-foreground mt-2 text-sm font-mono">
              [ COMMUNICATIONS CHANNELS & PORTAL ENTRY ]
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Whether you're a student, a university, or an industry partner — let's talk.
            </p>
            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-blue-955 border border-blue-900/50 flex items-center justify-center text-primary shrink-0 font-mono">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="font-bold text-foreground text-sm font-mono uppercase tracking-widest">Address</div>
                  <div className="text-muted-foreground text-sm mt-0.5">Bhavnagar, Gujarat, India</div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-blue-955 border border-blue-900/50 flex items-center justify-center text-primary shrink-0 font-mono">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="font-bold text-foreground text-sm font-mono uppercase tracking-widest">Email</div>
                  <a
                    href="mailto:hello@nakshatr.tech"
                    className="text-muted-foreground text-sm mt-0.5 hover:text-primary transition-colors block font-mono"
                  >
                    hello@nakshatr.tech
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-blue-955 border border-blue-900/50 flex items-center justify-center text-primary shrink-0 font-mono">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="font-bold text-foreground text-sm font-mono uppercase tracking-widest">Phone</div>
                  <a
                    href="tel:+918320002768"
                    className="text-muted-foreground text-sm mt-0.5 hover:text-primary transition-colors block font-mono"
                  >
                    +91 83200 02768
                  </a>
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="tech-card rounded-md p-8 space-y-4 bg-dot-grid relative"
            >
              <div className="absolute top-3 right-4 font-mono text-[9px] text-blue-500/50 select-none uppercase">
                COMMS-FORM-V1
              </div>
              {(["name", "email", "org"] as const).map((k) => (
                <input
                  key={k}
                  required={k !== "org"}
                  type={k === "email" ? "email" : "text"}
                  placeholder={k === "org" ? "Organization (optional)" : k === "email" ? "Email Address" : "Full Name"}
                  value={form[k]}
                  onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                  className="w-full bg-zinc-950/80 border border-border focus:border-primary outline-none rounded px-4 py-2.5 text-foreground placeholder:text-muted-foreground/60 text-sm font-mono transition-colors"
                />
              ))}
              <textarea
                required
                rows={4}
                placeholder="Message Content"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-zinc-950/80 border border-border focus:border-primary outline-none rounded px-4 py-2.5 text-foreground placeholder:text-muted-foreground/60 text-sm font-mono transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full bg-primary hover:bg-blue-700 text-white font-bold font-mono text-xs uppercase tracking-widest py-3.5 rounded transition-all shadow-sm cursor-pointer shadow-blue-500/10 hover:shadow-blue-500/20"
              >
                {submitted ? "[ TRANSMISSION RECEIVED — THANK YOU ]" : "[ TRANSMIT MESSAGE ]"}
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
