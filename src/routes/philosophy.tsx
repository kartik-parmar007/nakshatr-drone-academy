import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plane, Wind, Combine, Helicopter, PlaneLanding,
  Box, Cog, Cpu, Gamepad2, Satellite, Radio, Battery, Fan,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ScrollDroneAnimation } from "@/components/ScrollDroneAnimation";

export const Route = createFileRoute("/philosophy")({
  head: () => ({
    meta: [
      { title: "Our Philosophy — Nakshatr Technologies" },
      { name: "description", content: "Disassemble to assemble. Learn drone components, types, and the root principle of flight." },
      { property: "og:title", content: "Our Philosophy — Nakshatr" },
    ],
  }),
  component: PhilosophyPage,
});

const types = [
  { icon: Plane, name: "Multirotor", desc: "Four or more rotors. Hover, agile, easy to control." },
  { icon: Wind, name: "Fixed Wing", desc: "Aeroplane-style. Long range, high efficiency." },
  { icon: Combine, name: "Hybrid VTOL", desc: "Vertical takeoff + fixed-wing cruise." },
  { icon: Helicopter, name: "Single Rotor", desc: "Heavy-lift, longer endurance helicopters." },
  { icon: PlaneLanding, name: "Fixed Wing Hybrid", desc: "Combines lift rotors with fixed-wing flight." },
];

const components = [
  { icon: Box, name: "Frame", fn: "Carries every other part and absorbs the stresses of flight." },
  { icon: Cog, name: "Motors", fn: "Convert electrical energy into the rotational thrust that lifts the drone." },
  { icon: Cpu, name: "ESC", fn: "Electronic Speed Controllers regulate motor RPM with precision." },
  { icon: Gamepad2, name: "Flight Controller", fn: "The brain — fuses sensor data and commands every motor." },
  { icon: Satellite, name: "GPS Module", fn: "Tracks position globally for navigation and return-to-home." },
  { icon: Radio, name: "Receiver", fn: "Receives pilot commands from the transmitter wirelessly." },
  { icon: Battery, name: "LiPo Battery", fn: "High-density chemistry that powers the entire system." },
  { icon: Fan, name: "Propellers", fn: "Aerofoils that turn motor rotation into directional airflow." },
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
      <ScrollDroneAnimation />

      {/* What is a drone */}
      <section className="bg-white py-14 sm:py-16 lg:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-955 text-center uppercase tracking-tight">What is a Drone?</h1>
            <p className="text-gray-500 text-center mt-3 max-w-2xl mx-auto text-xs sm:text-sm font-mono">
              [ AERIAL KINEMATICS & WING CONFIGURATIONS ]
            </p>
            <p className="text-gray-600 text-center mt-4 sm:mt-5 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed px-2">
              A drone is an unmanned aerial vehicle that moves air to achieve controlled flight.
              Different drones move air in different ways — but the principle is universal.
            </p>
          </Reveal>
          <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {types.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.05}>
                <div className="tech-card rounded-md p-5 h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 font-mono text-[8px] text-blue-300 select-none">
                    CFG-0{i + 1}
                  </div>
                  <t.icon className="text-blue-600 mb-3" size={28} />
                  <h3 className="font-bold text-blue-950">{t.name}</h3>
                  <p className="text-gray-600 text-sm mt-1.5 leading-relaxed">{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Components flip cards */}
      <section className="bg-white py-14 sm:py-16 lg:py-20 border-b border-slate-100 bg-dot-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-955 text-center uppercase tracking-tight">Disassemble to Assemble</h2>
            <p className="text-gray-500 text-center mt-3 max-w-xl mx-auto text-xs sm:text-sm font-mono">
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
      <section className="bg-white py-14 sm:py-16 lg:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-955 text-center uppercase tracking-tight">Assembly Sequence</h2>
            <p className="text-gray-500 text-center mt-3 max-w-xl mx-auto text-xs sm:text-sm font-mono">
              [ COMPLIANCE CHECKLIST & HARDWARE INTEGRATION FLOW ]
            </p>
          </Reveal>
          <div className="mt-10 sm:mt-12 overflow-x-auto pb-4 -mx-4 sm:mx-0 px-4 sm:px-0">
            <div className="flex items-start gap-6 min-w-max">
              {steps.map((s, i) => (
                <div key={s} className="flex items-start gap-6">
                  <div className="w-44 sm:w-56">
                    <div className="w-10 h-10 rounded border-2 border-blue-600 bg-white text-blue-600 font-mono font-bold flex items-center justify-center text-sm shadow-sm">
                      0{i + 1}
                    </div>
                    <h3 className="mt-4 font-bold text-blue-950">{s}</h3>
                    <p className="text-gray-600 text-sm mt-1">Standard procedure executed and verified before next step.</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-8 sm:w-12 border-t-2 border-dashed border-blue-200 mt-5" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Root principle */}
      <section className="bg-white py-14 sm:py-16 lg:py-20 bg-line-grid border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Reveal>
            <p className="text-blue-950 text-lg sm:text-xl md:text-3xl italic font-bold leading-relaxed">
              "Every drone ever built moves air to achieve controlled flight.
              Understand this — understand all drones."
            </p>
            <p className="text-blue-600 font-mono text-[10px] sm:text-xs uppercase tracking-wider mt-4">
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
          className="absolute inset-0 bg-white border border-blue-100 rounded-md p-6 flex flex-col items-center justify-center shadow-sm hover:border-blue-600 transition-colors"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="absolute top-2 right-3 font-mono text-[8px] text-blue-300 select-none">
            PART-0{index + 1}
          </div>
          <c.icon className="text-blue-600 mb-3" size={32} />
          <h3 className="font-bold text-blue-950">{c.name}</h3>
          <p className="text-[10px] font-mono text-blue-400 uppercase mt-1 tracking-wider">[ TAP TO SPEC ]</p>
        </div>
        
        {/* Back Side */}
        <div
          className="absolute inset-0 bg-blue-50/50 border border-blue-300 rounded-md p-6 flex flex-col items-center justify-center text-blue-955 text-center text-sm shadow-sm"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="absolute top-2 left-3 font-mono text-[8px] text-blue-400 select-none">
            SPECIFICATION
          </div>
          <p className="font-medium text-gray-700 leading-relaxed">{c.fn}</p>
        </div>
      </motion.div>
    </div>
  );
}
