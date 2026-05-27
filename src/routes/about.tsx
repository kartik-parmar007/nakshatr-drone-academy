import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Calendar, MapPin, Award, BookOpen, Shield, ShieldCheck,
  User, Plane, FlaskConical, BarChart3, Landmark, GraduationCap,
  Mail, Phone,
} from "lucide-react";
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
      <section className="bg-background py-20 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-center uppercase tracking-tight font-display">
              About Nakshatr Technologies
            </h1>
            <p className="text-muted-foreground text-center mt-4 max-w-3xl mx-auto text-sm font-mono">
              [ INDIA'S FIRST UNIVERSITY-EMBEDDED DRONE COMPANY · ESTABLISHED JUNE 2024 ]
            </p>
          </Reveal>

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
                    href="tel:+919737112440"
                    className="text-muted-foreground text-sm mt-0.5 hover:text-primary transition-colors block font-mono"
                  >
                    +91 97371 12440
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
