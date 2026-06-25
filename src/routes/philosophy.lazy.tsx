import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plane,
  Wind,
  Combine,
  Helicopter,
  PlaneLanding,
  Box,
  Cog,
  Cpu,
  Gamepad2,
  Satellite,
  Radio,
  Battery,
  Fan,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { PhilosophyHero } from "@/components/PhilosophyHero";

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

export const Route = createLazyFileRoute("/philosophy")({
  component: PhilosophyPage,
});

const types = [
  { icon: Plane, name: "Multirotor", desc: "Four or more rotors. Hover, agile, easy to control." },
  { icon: Wind, name: "Fixed Wing", desc: "Aeroplane-style. Long range, high efficiency." },
  { icon: Combine, name: "Hybrid VTOL", desc: "Vertical takeoff + fixed-wing cruise." },
  { icon: Helicopter, name: "Single Rotor", desc: "Heavy-lift, longer endurance helicopters." },
  {
    icon: PlaneLanding,
    name: "Fixed Wing Hybrid",
    desc: "Combines lift rotors with fixed-wing flight.",
  },
];

const components = [
  { icon: Box, name: "Frame", fn: "Carries every other part and absorbs the stresses of flight." },
  {
    icon: Cog,
    name: "Motors",
    fn: "Convert electrical energy into the rotational thrust that lifts the drone.",
  },
  { icon: Cpu, name: "ESC", fn: "Electronic Speed Controllers regulate motor RPM with precision." },
  {
    icon: Gamepad2,
    name: "Flight Controller",
    fn: "The brain — fuses sensor data and commands every motor.",
  },
  {
    icon: Satellite,
    name: "GPS Module",
    fn: "Tracks position globally for navigation and return-to-home.",
  },
  { icon: Radio, name: "Receiver", fn: "Receives pilot commands from the transmitter wirelessly." },
  {
    icon: Battery,
    name: "LiPo Battery",
    fn: "High-density chemistry that powers the entire system.",
  },
  {
    icon: Fan,
    name: "Propellers",
    fn: "Aerofoils that turn motor rotation into directional airflow.",
  },
];

const steps = [
  "Inspect Frame",
  "Mount Motors",
  "Wire ESCs",
  "Install Flight Controller",
  "Add GPS & Receiver",
  "Connect Battery",
  "Mount Propellers",
  "Pre-flight Check",
];

function PhilosophyPage() {
  return (
    <div>
      <PhilosophyHero />

      {/* What is a drone */}
      <section id="what-is-a-drone" className="bg-background py-16 sm:py-20 lg:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-center uppercase tracking-tight font-display">
              What is a Drone?
            </h1>
            <p className="text-muted-foreground text-center mt-3 max-w-2xl mx-auto text-xs sm:text-sm font-mono">
              [ AERIAL KINEMATICS & WING CONFIGURATIONS ]
            </p>
            <p className="text-muted-foreground text-center mt-4 sm:mt-5 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed px-2">
              A drone is an unmanned aerial vehicle that moves air to achieve controlled flight.
              Different drones move air in different ways — but the principle is universal.
            </p>
          </Reveal>
          <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {types.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.05}>
                <div className="tech-card group rounded-md p-5 h-full relative overflow-hidden">
                  <div className="cyber-scanline" />
                  <DroneVector className="absolute -bottom-4 -right-4 w-20 h-20 text-primary opacity-[0.03] group-hover:opacity-[0.11] transition-opacity duration-300 pointer-events-none animate-drone-wobble" />
                  <div className="absolute top-0 right-0 p-2 font-mono text-[8px] text-blue-500/50 select-none">
                    CFG-0{i + 1}
                  </div>
                  <t.icon className="text-primary mb-3" size={28} />
                  <h3 className="font-bold text-foreground font-display transition-colors duration-300 group-hover:text-primary">
                    {t.name}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-1.5 leading-relaxed">
                    {t.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Components flip cards */}
      <section className="bg-background py-16 sm:py-20 lg:py-24 border-b border-border bg-dot-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-center uppercase tracking-tight font-display">
              Disassemble to Assemble
            </h2>
            <p className="text-muted-foreground text-center mt-3 max-w-xl mx-auto text-xs sm:text-sm font-mono">
              [ SYSTEM SCHEMATICS & COMPONENT IDENTIFICATION ]
            </p>
          </Reveal>
          <div className="mt-10 sm:mt-12 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {components.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.04}>
                <FlipCard component={c} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Assembly steps */}
      <section className="bg-background py-16 sm:py-20 lg:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-center uppercase tracking-tight font-display">
              Assembly Sequence
            </h2>
            <p className="text-muted-foreground text-center mt-3 max-w-xl mx-auto text-xs sm:text-sm font-mono">
              [ COMPLIANCE CHECKLIST & HARDWARE INTEGRATION FLOW ]
            </p>
          </Reveal>
          <div className="mt-10 sm:mt-12 overflow-x-auto pb-4 -mx-4 sm:mx-0 px-4 sm:px-0">
            <div className="flex items-start gap-6 min-w-max pb-2">
              {steps.map((s, i) => (
                <div key={s} className="flex items-start gap-6">
                  <div className="tech-card group w-44 sm:w-56 p-5 rounded-md relative overflow-hidden transition-all duration-300">
                    <div className="cyber-scanline" />
                    <DroneVector className="absolute -bottom-4 -right-4 w-20 h-20 text-primary opacity-[0.03] group-hover:opacity-[0.11] transition-opacity duration-300 pointer-events-none animate-drone-wobble" />
                    <div className="w-10 h-10 rounded border border-primary bg-zinc-955 text-primary font-mono font-bold flex items-center justify-center text-sm shadow-sm relative z-10">
                      0{i + 1}
                    </div>
                    <h3 className="mt-4 font-bold text-foreground font-display transition-colors duration-300 group-hover:text-primary text-sm sm:text-base relative z-10">
                      {s}
                    </h3>
                    <p className="text-muted-foreground text-[11px] sm:text-xs mt-1.5 leading-relaxed relative z-10">
                      Standard procedure executed and verified before next step.
                    </p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-8 sm:w-12 border-t border-dashed border-border mt-16 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Root principle */}
      <section className="bg-background py-20 sm:py-28 lg:py-32 bg-line-grid border-b border-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Reveal>
            <p className="text-foreground text-lg sm:text-xl md:text-3xl italic font-bold leading-relaxed font-display">
              "Every drone ever built moves air to achieve controlled flight. Understand this —
              understand all drones."
            </p>
            <p className="text-primary font-mono text-[10px] sm:text-xs uppercase tracking-widest mt-4">
              [ FUNDAMENTAL RULE OF UAV KINEMATICS ]
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

type Component = { icon: typeof Box; name: string; fn: string };

function FlipCard({ component: c, index }: { component: Component; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative h-44 cursor-pointer"
      style={{ perspective: 1000 }}
      onClick={() => setFlipped((v) => !v)}
    >
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Front Side */}
        <div
          className="tech-card group absolute inset-0 rounded-md p-6 flex flex-col items-center justify-center shadow-md overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="cyber-scanline" />
          <DroneVector className="absolute -bottom-4 -right-4 w-20 h-20 text-primary opacity-[0.03] group-hover:opacity-[0.11] transition-opacity duration-300 pointer-events-none animate-drone-wobble" />
          <div className="absolute top-2 right-3 font-mono text-[8px] text-blue-500/50 select-none">
            PART-0{index + 1}
          </div>
          <c.icon className="text-primary mb-3" size={32} />
          <h3 className="font-bold text-foreground font-display transition-colors duration-300 group-hover:text-primary">
            {c.name}
          </h3>
          <p className="text-[9px] font-mono text-primary uppercase mt-1 tracking-widest relative z-10">
            [ TAP TO SPEC ]
          </p>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 bg-blue-955/20 border border-blue-900/60 rounded-md p-6 flex flex-col items-center justify-center text-foreground text-center text-sm shadow-md"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="absolute top-2 left-3 font-mono text-[8px] text-primary select-none uppercase tracking-wider">
            SPECIFICATION
          </div>
          <p className="font-medium text-muted-foreground leading-relaxed text-xs sm:text-sm">
            {c.fn}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
