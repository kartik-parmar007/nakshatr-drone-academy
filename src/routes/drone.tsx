import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plane, Wind, Combine, Helicopter, PlaneLanding,
  Box, Cog, Cpu, Gamepad2, Satellite, Radio, Battery, Fan,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/drone")({
  head: () => ({
    meta: [
      { title: "What is a Drone — Nakshatr Technologies" },
      { name: "description", content: "Disassemble to assemble. Learn drone components, types, and the root principle of flight." },
      { property: "og:title", content: "Drone Fundamentals — Nakshatr" },
    ],
  }),
  component: DronePage,
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

function DronePage() {
  return (
    <div>
      {/* What is a drone */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 text-center">What is a Drone?</h1>
            <p className="text-gray-600 text-center mt-5 max-w-3xl mx-auto text-lg">
              A drone is an unmanned aerial vehicle that moves air to achieve controlled flight.
              Different drones move air in different ways — but the principle is universal.
            </p>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {types.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.05}>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 h-full hover:border-blue-600 transition-all">
                  <t.icon className="text-blue-600 mb-3" size={28} />
                  <h3 className="font-semibold text-blue-900">{t.name}</h3>
                  <p className="text-gray-600 text-sm mt-1.5">{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Components flip cards */}
      <section className="bg-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center">Disassemble to Assemble</h2>
            <p className="text-gray-600 text-center mt-3">Click each component to learn what it does.</p>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {components.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.04}>
                <FlipCard component={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Assembly steps */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center">Assembly Sequence</h2>
          </Reveal>
          <div className="mt-12 overflow-x-auto pb-4">
            <div className="flex items-start gap-6 min-w-max px-2">
              {steps.map((s, i) => (
                <div key={s} className="flex items-start gap-6">
                  <div className="w-56">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-lg">
                      {i + 1}
                    </div>
                    <h3 className="mt-4 font-semibold text-blue-900">{s}</h3>
                    <p className="text-gray-600 text-sm mt-1">Standard procedure executed and verified before next step.</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-12 border-t-2 border-dashed border-blue-400 mt-6" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Root principle */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Reveal>
            <p className="text-white text-xl md:text-3xl italic font-medium leading-relaxed">
              "Every drone ever built moves air to achieve controlled flight.
              Understand this — understand all drones."
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function FlipCard({ component }: { component: (typeof import("./drone"))[never] | { icon: any; name: string; fn: string } }) {
  const [flipped, setFlipped] = useState(false);
  const c = component as { icon: any; name: string; fn: string };
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
        <div
          className="absolute inset-0 bg-white border border-blue-100 rounded-xl p-6 flex flex-col items-center justify-center shadow-sm"
          style={{ backfaceVisibility: "hidden" }}
        >
          <c.icon className="text-blue-600 mb-3" size={32} />
          <h3 className="font-semibold text-blue-900">{c.name}</h3>
          <p className="text-xs text-gray-500 mt-1">Tap to flip</p>
        </div>
        <div
          className="absolute inset-0 bg-blue-600 rounded-xl p-6 flex items-center justify-center text-white text-center text-sm shadow-md"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {c.fn}
        </div>
      </motion.div>
    </div>
  );
}
