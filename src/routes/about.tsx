import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Calendar, MapPin, Award, BookOpen, Shield, ShieldCheck,
  User, Plane, FlaskConical, BarChart3, Landmark, GraduationCap,
  Mail, Phone,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Nakshatr Technologies — Bhavnagar, Gujarat" },
      { name: "description", content: "Founded June 2024 in Bhavnagar. DGCA-compliant drone education partnered with MKBU. Meet the founder and contact us." },
      { property: "og:title", content: "About Nakshatr Technologies LLP" },
    ],
  }),
  component: AboutPage,
});

const timeline = [
  { date: "June 2024", title: "Inaugurated at Bhavnagar", desc: "Centre of Excellence opens its doors." },
  { date: "Patron", title: "Shri Manoj Gohil, MLA", desc: "Patronage from the local representative." },
  { date: "Partner", title: "MKBU First Batch", desc: "First cohort of MKBU students enrolled." },
];

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

function AboutPage() {
  const [form, setForm] = useState({ name: "", email: "", org: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      {/* Story */}
      <section className="bg-white py-20 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-950 text-center uppercase tracking-tight">
              About Nakshatr Technologies
            </h1>
            <p className="text-gray-500 text-center mt-4 max-w-3xl mx-auto text-sm font-mono">
              [ INDIA'S FIRST UNIVERSITY-EMBEDDED DRONE COMPANY · ESTABLISHED JUNE 2024 ]
            </p>
          </Reveal>

          <div className="mt-16 relative">
            <div className="hidden md:block absolute top-5 left-0 right-0 border-t-2 border-dashed border-blue-100" />
            <div className="grid md:grid-cols-3 gap-8">
              {timeline.map((t, i) => (
                <Reveal key={t.title} delay={i * 0.1}>
                  <div className="relative text-center md:text-left bg-white">
                    <div className="w-10 h-10 rounded border-2 border-blue-600 bg-white text-blue-600 flex items-center justify-center font-mono font-bold mx-auto md:mx-0 relative z-10 shadow-sm">
                      0{i + 1}
                    </div>
                    <div className="mt-4 text-blue-600 font-mono text-xs uppercase tracking-wider font-semibold">{t.date}</div>
                    <h3 className="text-lg font-bold text-blue-950 mt-1">{t.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{t.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-white py-20 border-b border-slate-100 bg-dot-grid">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="bg-white border border-blue-100 shadow-sm rounded-lg p-8 md:p-12 grid md:grid-cols-3 gap-10 relative">
              <div className="absolute top-3 right-4 font-mono text-[9px] text-blue-300 select-none uppercase">
                PERSONNEL-LOG-001
              </div>
              <div className="flex justify-center md:justify-start">
                <div className="w-36 h-36 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-inner">
                  <User size={64} />
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="text-blue-600 font-mono text-xs font-bold tracking-widest uppercase">[ FOUNDER PROFILE ]</div>
                <h2 className="text-3xl font-bold text-blue-955 mt-2 tracking-tight">A pilot, a researcher, an educator</h2>
                <p className="text-gray-600 mt-4 leading-relaxed text-sm">
                  After a decade of R&D in the UK and operational experience in India's drone
                  market, our founder returned to Bhavnagar to architect a programme that
                  produces deployment-ready operators — not certificate holders.
                </p>
                <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                  {credentials.map((c) => (
                    <li key={c.text} className="flex items-center gap-3 text-gray-700">
                      <div className="w-6 h-6 rounded bg-blue-50 border border-blue-100/50 flex items-center justify-center text-blue-600 shrink-0">
                        <c.icon size={14} />
                      </div>
                      <span className="text-xs font-semibold text-blue-955 uppercase font-mono tracking-tight">{c.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Facts */}
      <section className="bg-white py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 text-center uppercase tracking-tight">Company Facts</h2>
            <p className="text-gray-500 text-center mt-3 max-w-xl mx-auto text-sm font-mono">
              [ VERIFIED REGULATORY & OPERATIONAL METRICS ]
            </p>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {facts.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.05}>
                <div className="tech-card rounded-md p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 font-mono text-[9px] text-blue-300 select-none">
                    FACT-LNK-0{i + 1}
                  </div>
                  <f.icon className="text-blue-600" size={26} />
                  <div className="mt-3 text-xs uppercase tracking-wider text-blue-500 font-mono font-bold">{f.label}</div>
                  <div className="text-blue-955 font-bold text-lg mt-1">{f.value}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-20 border-b border-slate-100 bg-dot-grid">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-7">
          <Reveal>
            <div className="tech-card rounded-md p-10 h-full relative overflow-hidden bg-white">
              <div className="absolute top-3 right-4 font-mono text-[9px] text-blue-300 select-none">SYS-MISSION</div>
              <div className="text-blue-600 text-xs font-mono font-bold tracking-widest uppercase">[ MISSION ]</div>
              <p className="mt-4 text-2xl font-bold text-blue-950 leading-snug">
                Place a drone in every student's hands before a single lecture is delivered.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="tech-card rounded-md p-10 h-full relative overflow-hidden bg-white">
              <div className="absolute top-3 right-4 font-mono text-[9px] text-blue-300 select-none">SYS-VISION</div>
              <div className="text-blue-600 text-xs font-mono font-bold tracking-widest uppercase">[ VISION ]</div>
              <p className="mt-4 text-2xl font-bold text-blue-950 leading-snug">
                Become the foundational layer of drone talent for India by 2030.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-955 uppercase tracking-tight">Get in Touch</h2>
            <p className="text-gray-500 mt-2 text-sm font-mono">
              [ COMMUNICATIONS CHANNELS & PORTAL ENTRY ]
            </p>
            <p className="text-gray-600 mt-4 leading-relaxed">
              Whether you're a student, a university, or an industry partner — let's talk.
            </p>
            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="font-bold text-blue-950 text-sm font-mono uppercase tracking-tight">Address</div>
                  <div className="text-gray-600 text-sm mt-0.5">Bhavnagar, Gujarat, India</div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="font-bold text-blue-950 text-sm font-mono uppercase tracking-tight">Email</div>
                  <div className="text-gray-600 text-sm mt-0.5">hello@nakshatr.tech</div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="font-bold text-blue-950 text-sm font-mono uppercase tracking-tight">Phone</div>
                  <div className="text-gray-600 text-sm mt-0.5">+91 00000 00000</div>
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
              <div className="absolute top-3 right-4 font-mono text-[9px] text-blue-300 select-none uppercase">
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
                  className="w-full bg-white border border-slate-200 focus:border-blue-600 outline-none rounded px-4 py-2.5 text-gray-900 placeholder:text-gray-400 text-sm font-mono transition-colors"
                />
              ))}
              <textarea
                required
                rows={4}
                placeholder="Message Content"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-white border border-slate-200 focus:border-blue-600 outline-none rounded px-4 py-2.5 text-gray-900 placeholder:text-gray-400 text-sm font-mono transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold font-mono text-xs uppercase tracking-wider py-3.5 rounded transition-colors shadow-sm"
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
