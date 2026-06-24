import { createLazyFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  GraduationCap,
  Users,
  Briefcase,
  Compass,
  User,
  Phone,
  Mail,
  MapPin,
  Zap,
  ChevronDown,
  BookOpen,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

export const Route = createLazyFileRoute("/contact")({
  component: ContactPage,
});

/* ---------- Types ---------- */
type Profile = "student" | "parent" | "professional" | "explorer" | null;

interface FormState {
  name: string;
  whatsapp: string;
  email: string;
  city: string;
  qualification: string;
  goal: string;
}

/* ---------- Profile Cards ---------- */
const PROFILES = [
  {
    id: "student" as Profile,
    icon: GraduationCap,
    title: "Student",
    sub: "I am studying right now",
    code: "CADET",
  },
  {
    id: "parent" as Profile,
    icon: Users,
    title: "Parent",
    sub: "Looking for my child",
    code: "GUARDIAN",
  },
  {
    id: "professional" as Profile,
    icon: Briefcase,
    title: "Professional",
    sub: "I do Job or Business",
    code: "OPERATOR",
  },
  {
    id: "explorer" as Profile,
    icon: Compass,
    title: "Explorer",
    sub: "I want to learn something new",
    code: "PIONEER",
  },
];

const QUALIFICATIONS = [
  { value: "10th_12th", label: "10th Pass / 12th Pass" },
  { value: "graduate", label: "Graduate (College Complete)" },
  { value: "iti_diploma", label: "ITI / Diploma Holder" },
  { value: "other", label: "Other" },
];

const GOALS = [
  { value: "drone_job", label: "I want a new Drone Job" },
  { value: "drone_business", label: "I want to start Drone Business" },
  { value: "farming", label: "I want to use Drones in Farming" },
  { value: "hobby", label: "Just for Flying Hobby" },
];

/* ---------- Dynamic Book Content per Profile ---------- */
const BOOK_CONTENT: Record<
  NonNullable<Profile>,
  { title: string; description: string; bullets: string[] }
> = {
  student: {
    title: "2026 DRONE INDUSTRY CAREER ROADMAP",
    description:
      "Your simple step-by-step guide to passing drone exams, getting licensed, and finding high-paying college placements.",
    bullets: [
      "DGCA Exam Preparation Guide",
      "Drone License Step-by-Step",
      "Top College Placement Pathways",
      "High-Paying Drone Jobs in 2026",
    ],
  },
  parent: {
    title: "FUTURE OF DRONE TECH: A PARENT'S GUIDE",
    description:
      "Learn about government approvals, future job safety, and how drone piloting secures your child's high-growth career.",
    bullets: [
      "DGCA & Government Approvals Explained",
      "Career Safety & Job Stability",
      "High-Growth Industry Overview",
      "University & Certification Partners",
    ],
  },
  professional: {
    title: "UAV COMMERCIAL INDUSTRY DEMAND REPORT",
    description:
      "How to upgrade your current skills and integrate drone intelligence into GIS mapping, cinematography, surveying, and logistics.",
    bullets: [
      "GIS Mapping & Surveying Integration",
      "Aerial Cinematography Pathways",
      "Logistics & Industrial UAV Use",
      "Skill Upgrade Roadmap 2026",
    ],
  },
  explorer: {
    title: "DRONE STARTUP & FREELANCE BLUEPRINT",
    description:
      "A simple guide for fresh graduates and innovators to start a drone business or earn money from drone freelancing with zero experience.",
    bullets: [
      "Start a Drone Business from Zero",
      "Freelance Drone Work Opportunities",
      "Top Platforms to Find Drone Clients",
      "Investment & ROI Planning Guide",
    ],
  },
};

const DEFAULT_BOOK = {
  title: "FREE DRONE PILOT GUIDE 2026",
  description: "Select your profile above to get a personalised drone roadmap built just for you.",
  bullets: [
    "DGCA Certification Roadmap",
    "Career & Business Pathways",
    "Top Drone Jobs in India 2026",
    "Agriculture Drone Opportunities",
  ],
};

/* ---------- Drone SVG Watermark ---------- */
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

/* ---------- Custom Select ---------- */
function CustomSelect({
  label,
  id,
  options,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  id: string;
  options: { value: string; label: string }[];
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="space-y-1.5" ref={ref}>
      <label
        htmlFor={id}
        className="block text-[10px] font-mono font-bold uppercase tracking-widest text-primary"
      >
        {label}
      </label>
      <div className="relative">
        <button
          id={id}
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`w-full flex items-center justify-between bg-zinc-950/80 border rounded px-4 py-3 text-sm font-mono transition-all cursor-pointer ${
            open
              ? "border-primary text-foreground shadow-[0_0_0_1px_rgba(245,158,11,0.3)]"
              : "border-border text-muted-foreground hover:border-primary/50"
          }`}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span className={selected ? "text-foreground" : ""}>
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown
            size={14}
            className={`text-muted-foreground transition-transform duration-200 ${open ? "rotate-180 text-primary" : ""}`}
          />
        </button>
        {open && (
          <ul
            role="listbox"
            className="absolute z-50 w-full mt-1 bg-[#0E0E11] border border-primary/30 rounded shadow-2xl shadow-black/60 overflow-hidden"
          >
            {options.map((o) => (
              <li
                key={o.value}
                role="option"
                aria-selected={value === o.value}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className={`px-4 py-3 text-sm font-mono cursor-pointer transition-all flex items-center gap-2 ${
                  value === o.value
                    ? "bg-primary/10 text-primary border-l-2 border-primary"
                    : "text-muted-foreground hover:bg-zinc-900/60 hover:text-foreground border-l-2 border-transparent"
                }`}
              >
                {value === o.value && <CheckCircle2 size={12} className="text-primary shrink-0" />}
                {o.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ---------- Main Page ---------- */
function ContactPage() {
  const [profile, setProfile] = useState<Profile>(null);
  const [form, setForm] = useState<FormState>({
    name: "",
    whatsapp: "",
    email: "",
    city: "",
    qualification: "",
    goal: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [ticker, setTicker] = useState(0);

  // Animated ticker for the HUD
  useEffect(() => {
    const id = setInterval(() => setTicker((v) => (v + 1) % 100), 80);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSubmitted(true);
  };

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="min-h-screen bg-background">
      {/* ─────────────── HERO HEADER ─────────────── */}
      <section className="relative bg-background border-b border-border overflow-hidden py-14 sm:py-18">
        {/* Background grid */}
        <div className="absolute inset-0 bg-dot-grid opacity-60 pointer-events-none" />
        <div className="absolute inset-0 bg-line-grid pointer-events-none" />

        {/* Gradient glow orbs */}
        <div
          className="absolute top-0 left-1/4 w-[480px] h-[300px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(245,158,11,0.06) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[380px] h-[260px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Watermark drone */}
        <DroneVector className="absolute -right-8 top-1/2 -translate-y-1/2 w-64 h-64 text-primary opacity-[0.025] animate-drone-wobble pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 bg-zinc-900/70 border border-primary/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span className="font-mono text-[10px] text-primary font-bold uppercase tracking-widest">
                ELITE FLIGHT SCHOOL // SYSTEM ACTIVE
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground uppercase tracking-tight font-display leading-none">
              <span className="text-gradient-stellar">DEFY GRAVITY.</span>
              <br />
              <span>JOIN THE SKIES.</span>
            </h1>

            <p className="mt-6 text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Select your profile, fill out the simple form below, and get your{" "}
              <span className="text-primary font-semibold">Free Drone Roadmap</span>. Our team will
              call you back within <span className="text-accent font-semibold">24 hours</span>.
            </p>

            {/* HUD status strip */}
            <div className="mt-8 inline-flex items-center gap-6 font-mono text-[9px] uppercase tracking-widest text-muted-foreground/50 bg-zinc-950/60 border border-border px-5 py-2 rounded">
              <span className="text-emerald-500/70">● INTAKE OPEN</span>
              <span>·</span>
              <span>SYS: CONTACT-FORM-V3</span>
              <span>·</span>
              <span>PKT: {String(ticker).padStart(2, "0")}%</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────────── MAIN FORM GRID ─────────────── */}
      <section className="py-16 sm:py-20 bg-background bg-dot-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 xl:gap-14 items-start">
            {/* ── LEFT PANEL: FREE BONUS BOOK ── */}
            <div className="lg:col-span-2">
              <Reveal>
                <div className="tech-card group rounded-lg p-0 overflow-hidden sticky top-24">
                  <div className="cyber-scanline" />

                  {/* Book top banner */}
                  <div
                    className="relative p-7 pb-0 overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(245,158,11,0.10) 0%, rgba(6,182,212,0.08) 100%)",
                    }}
                  >
                    {/* Grid lines decoration */}
                    <div className="absolute inset-0 bg-line-grid opacity-50 pointer-events-none" />

                    {/* FREE ACCESS badge */}
                    <div className="inline-flex items-center gap-1.5 bg-primary text-black text-[9px] font-mono font-black uppercase tracking-widest px-3 py-1 rounded-full mb-5 shadow-lg shadow-amber-500/20 relative z-10">
                      <Zap size={10} fill="currentColor" />
                      FREE ACCESS
                    </div>

                    {/* Book mock-up */}
                    <div className="relative z-10 flex justify-center mt-2">
                      <div
                        className="relative w-52 rounded-md shadow-2xl shadow-black/60 overflow-hidden"
                        style={{
                          background: "linear-gradient(160deg, #0E1420 0%, #080B14 100%)",
                          border: "1px solid rgba(245,158,11,0.35)",
                        }}
                      >
                        {/* Book spine accent */}
                        <div
                          className="absolute left-0 top-0 bottom-0 w-1.5"
                          style={{
                            background: "linear-gradient(180deg, #F59E0B 0%, #06B6D4 100%)",
                          }}
                        />

                        <div className="px-5 pt-7 pb-6 pl-7">
                          {/* Year badge */}
                          <div className="text-[8px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-400/80 mb-3">
                            2026 EDITION
                          </div>

                          {/* Book icon */}
                          <div className="w-10 h-10 rounded bg-primary/10 border border-primary/30 flex items-center justify-center mb-4">
                            <BookOpen size={20} className="text-primary" />
                          </div>

                          <div
                            className="text-[11px] font-black font-display uppercase leading-tight text-foreground transition-all duration-500"
                            style={{ letterSpacing: "-0.01em" }}
                          >
                            {profile
                              ? BOOK_CONTENT[profile].title.split(" ").slice(0, 3).join(" ")
                              : "FREE DRONE"}
                          </div>
                          <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-primary mt-1 transition-all duration-500">
                            {profile
                              ? BOOK_CONTENT[profile].title.split(" ").slice(3, 6).join(" ")
                              : "PILOT GUIDE"}
                          </div>
                          <div className="text-[9px] font-mono uppercase tracking-widest text-primary/70 transition-all duration-500">
                            {profile
                              ? BOOK_CONTENT[profile].title.split(" ").slice(6).join(" ") || "2026"
                              : "2026"}
                          </div>

                          <div className="mt-4 h-px bg-border/60" />

                          <div className="mt-3 text-[8px] text-muted-foreground/70 font-mono leading-relaxed">
                            NAKSHATR DRONE ACADEMY
                            <br />
                            BHAVNAGAR · GUJARAT
                          </div>
                        </div>

                        {/* Bottom gradient bar */}
                        <div
                          className="h-1 w-full"
                          style={{
                            background: "linear-gradient(90deg, #F59E0B 0%, #06B6D4 100%)",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Book description — dynamic per profile */}
                  <div className="p-7 pt-6">
                    <div className="text-primary font-mono text-[10px] font-bold tracking-widest uppercase mb-2">
                      [ FREE BONUS WITH FORM SUBMISSION ]
                    </div>
                    <h2 className="text-xl font-bold text-foreground font-display uppercase tracking-tight leading-snug group-hover:text-primary transition-colors duration-300">
                      {profile ? BOOK_CONTENT[profile].title : DEFAULT_BOOK.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                      {profile ? BOOK_CONTENT[profile].description : DEFAULT_BOOK.description}
                    </p>

                    {/* Bullet features */}
                    <ul className="mt-5 space-y-2.5">
                      {(profile ? BOOK_CONTENT[profile].bullets : DEFAULT_BOOK.bullets).map(
                        (item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2.5 text-xs text-muted-foreground font-mono"
                          >
                            <ArrowRight size={10} className="text-primary shrink-0" />
                            {item}
                          </li>
                        ),
                      )}
                    </ul>

                    {/* Info bar */}
                    <div className="mt-6 bg-zinc-950/60 border border-border rounded p-3 font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60">
                      <span className="text-primary/70">●</span> Delivered instantly after form
                      submission
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ── RIGHT PANEL: THE FORM ── */}
            <div className="lg:col-span-3">
              {submitted ? (
                <Reveal>
                  <div className="tech-card rounded-lg p-10 text-center relative overflow-hidden min-h-[500px] flex flex-col items-center justify-center">
                    <div className="cyber-scanline" />
                    <DroneVector className="absolute inset-0 m-auto w-48 h-48 text-primary opacity-[0.025] animate-drone-wobble pointer-events-none" />

                    <div
                      className="w-20 h-20 rounded-full border-2 border-primary flex items-center justify-center mb-6 relative z-10"
                      style={{ boxShadow: "0 0 30px rgba(245,158,11,0.25)" }}
                    >
                      <CheckCircle2 size={36} className="text-primary" />
                    </div>
                    <div className="text-primary font-mono text-xs font-bold tracking-widest uppercase mb-3 relative z-10">
                      [ TRANSMISSION RECEIVED ]
                    </div>
                    <h2 className="text-3xl font-bold text-foreground font-display uppercase relative z-10">
                      You're on the Launchpad!
                    </h2>
                    <p className="text-muted-foreground mt-4 text-sm leading-relaxed max-w-md relative z-10">
                      Our team will contact you on WhatsApp within{" "}
                      <span className="text-primary font-semibold">24 hours</span>. Your free{" "}
                      <span className="text-accent font-semibold">
                        {profile ? BOOK_CONTENT[profile].title : DEFAULT_BOOK.title}
                      </span>{" "}
                      is on its way.
                    </p>
                    <div className="mt-6 font-mono text-[9px] uppercase tracking-widest text-muted-foreground/50 relative z-10">
                      FORM-ID: NDA-{Date.now().toString(36).toUpperCase()}
                    </div>
                  </div>
                </Reveal>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                  {/* ── STEP 1: PROFILE ── */}
                  <Reveal>
                    <div className="tech-card rounded-lg p-6 sm:p-8 relative overflow-hidden">
                      <div className="cyber-scanline" />
                      <div className="absolute top-3 right-4 font-mono text-[9px] text-blue-500/50 select-none uppercase">
                        STEP-01 // PROFILE
                      </div>

                      <div className="text-primary font-mono text-[10px] font-bold tracking-widest uppercase mb-1">
                        STEP 1
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-foreground font-display uppercase tracking-tight">
                        Who Are You?
                      </h2>
                      <p className="text-muted-foreground text-xs font-mono mt-1 mb-6">
                        Select your profile to personalise your roadmap
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {PROFILES.map((p) => {
                          const Icon = p.icon;
                          const active = profile === p.id;
                          return (
                            <button
                              key={p.id}
                              type="button"
                              id={`profile-${p.id}`}
                              onClick={() => setProfile(p.id)}
                              className={`relative group flex flex-col items-center gap-2.5 p-4 rounded-md border text-center transition-all duration-300 cursor-pointer overflow-hidden ${
                                active
                                  ? "bg-primary/10 border-primary text-primary shadow-[0_0_20px_rgba(245,158,11,0.15)]"
                                  : "bg-zinc-950/40 border-border text-muted-foreground hover:border-primary/40 hover:text-foreground hover:bg-zinc-950/70"
                              }`}
                            >
                              {/* Sweep light on hover */}
                              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

                              {/* Active indicator */}
                              {active && (
                                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary animate-pulse" />
                              )}

                              <div
                                className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors ${
                                  active
                                    ? "bg-primary/20 text-primary"
                                    : "bg-zinc-900 text-muted-foreground group-hover:text-foreground"
                                }`}
                              >
                                <Icon size={20} />
                              </div>

                              <div>
                                <div
                                  className={`text-xs font-bold font-display uppercase tracking-wider transition-colors ${
                                    active ? "text-primary" : ""
                                  }`}
                                >
                                  {p.title}
                                </div>
                                <div className="text-[9px] font-mono mt-0.5 leading-tight text-muted-foreground">
                                  {p.sub}
                                </div>
                              </div>

                              {/* Code tag */}
                              <div
                                className={`text-[8px] font-mono font-black tracking-widest uppercase ${
                                  active ? "text-primary/60" : "text-muted-foreground/30"
                                }`}
                              >
                                [{p.code}]
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {!profile && (
                        <p className="text-[10px] font-mono text-muted-foreground/50 mt-3 text-center">
                          ↑ Select a profile to continue
                        </p>
                      )}
                    </div>
                  </Reveal>

                  {/* ── STEP 2: YOUR DETAILS ── */}
                  <Reveal delay={0.05}>
                    <div
                      className={`tech-card rounded-lg p-6 sm:p-8 relative overflow-hidden transition-all duration-500 ${
                        !profile ? "opacity-50 pointer-events-none" : "opacity-100"
                      }`}
                    >
                      <div className="cyber-scanline" />
                      <div className="absolute top-3 right-4 font-mono text-[9px] text-blue-500/50 select-none uppercase">
                        STEP-02 // DETAILS
                      </div>

                      <div className="text-primary font-mono text-[10px] font-bold tracking-widest uppercase mb-1">
                        STEP 2
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-foreground font-display uppercase tracking-tight">
                        Your Details
                      </h2>
                      <p className="text-muted-foreground text-xs font-mono mt-1 mb-6">
                        Enter your information — we keep it 100% private
                      </p>

                      <div className="grid sm:grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div className="space-y-1.5">
                          <label
                            htmlFor="contact-name"
                            className="block text-[10px] font-mono font-bold uppercase tracking-widest text-primary"
                          >
                            Full Name *
                          </label>
                          <div className="relative">
                            <User
                              size={13}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/50 pointer-events-none"
                            />
                            <input
                              id="contact-name"
                              type="text"
                              required
                              placeholder="Your full name"
                              value={form.name}
                              onChange={set("name")}
                              className="w-full bg-zinc-950/80 border border-border focus:border-primary outline-none rounded px-4 py-3 pl-9 text-foreground placeholder:text-muted-foreground/50 text-sm font-mono transition-all focus:shadow-[0_0_0_1px_rgba(245,158,11,0.2)]"
                            />
                          </div>
                        </div>

                        {/* WhatsApp */}
                        <div className="space-y-1.5">
                          <label
                            htmlFor="contact-whatsapp"
                            className="block text-[10px] font-mono font-bold uppercase tracking-widest text-primary"
                          >
                            WhatsApp Number *
                          </label>
                          <div className="relative">
                            <Phone
                              size={13}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/50 pointer-events-none"
                            />
                            <input
                              id="contact-whatsapp"
                              type="tel"
                              required
                              placeholder="10-digit number"
                              maxLength={10}
                              value={form.whatsapp}
                              onChange={set("whatsapp")}
                              className="w-full bg-zinc-950/80 border border-border focus:border-primary outline-none rounded px-4 py-3 pl-9 text-foreground placeholder:text-muted-foreground/50 text-sm font-mono transition-all focus:shadow-[0_0_0_1px_rgba(245,158,11,0.2)]"
                            />
                          </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                          <label
                            htmlFor="contact-email"
                            className="block text-[10px] font-mono font-bold uppercase tracking-widest text-primary"
                          >
                            Email Address *
                          </label>
                          <div className="relative">
                            <Mail
                              size={13}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/50 pointer-events-none"
                            />
                            <input
                              id="contact-email"
                              type="email"
                              required
                              placeholder="you@example.com"
                              value={form.email}
                              onChange={set("email")}
                              className="w-full bg-zinc-950/80 border border-border focus:border-primary outline-none rounded px-4 py-3 pl-9 text-foreground placeholder:text-muted-foreground/50 text-sm font-mono transition-all focus:shadow-[0_0_0_1px_rgba(245,158,11,0.2)]"
                            />
                          </div>
                        </div>

                        {/* City */}
                        <div className="space-y-1.5">
                          <label
                            htmlFor="contact-city"
                            className="block text-[10px] font-mono font-bold uppercase tracking-widest text-primary"
                          >
                            City *
                          </label>
                          <div className="relative">
                            <MapPin
                              size={13}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/50 pointer-events-none"
                            />
                            <input
                              id="contact-city"
                              type="text"
                              required
                              placeholder="Your city"
                              value={form.city}
                              onChange={set("city")}
                              className="w-full bg-zinc-950/80 border border-border focus:border-primary outline-none rounded px-4 py-3 pl-9 text-foreground placeholder:text-muted-foreground/50 text-sm font-mono transition-all focus:shadow-[0_0_0_1px_rgba(245,158,11,0.2)]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>

                  {/* ── STEP 3: DROPDOWNS ── */}
                  <Reveal delay={0.1}>
                    <div
                      className={`tech-card rounded-lg p-6 sm:p-8 relative overflow-hidden transition-all duration-500 ${
                        !profile ? "opacity-50 pointer-events-none" : "opacity-100"
                      }`}
                    >
                      <div className="cyber-scanline" />
                      <div className="absolute top-3 right-4 font-mono text-[9px] text-blue-500/50 select-none uppercase">
                        STEP-03 // EXECUTION
                      </div>

                      <div className="text-primary font-mono text-[10px] font-bold tracking-widest uppercase mb-1">
                        STEP 3
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-foreground font-display uppercase tracking-tight">
                        Profile Execution
                      </h2>
                      <p className="text-muted-foreground text-xs font-mono mt-1 mb-6">
                        Help us build the perfect roadmap for you
                      </p>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <CustomSelect
                          label="Highest Qualification *"
                          id="contact-qualification"
                          options={QUALIFICATIONS}
                          placeholder="Select your education"
                          value={form.qualification}
                          onChange={(v) => setForm((f) => ({ ...f, qualification: v }))}
                        />
                        <CustomSelect
                          label="Your Goal with Drones *"
                          id="contact-goal"
                          options={GOALS}
                          placeholder="What is your main goal?"
                          value={form.goal}
                          onChange={(v) => setForm((f) => ({ ...f, goal: v }))}
                        />
                      </div>
                    </div>
                  </Reveal>

                  {/* ── SUBMIT ── */}
                  <Reveal delay={0.15}>
                    <div className="relative">
                      {/* Glow behind button */}
                      <div
                        className="absolute inset-0 rounded-lg blur-xl opacity-30 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(245,158,11,0.4) 0%, rgba(6,182,212,0.2) 100%)",
                        }}
                      />
                      <button
                        id="contact-submit"
                        type="submit"
                        disabled={!profile}
                        className={`relative w-full py-5 rounded-lg font-mono text-sm font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden group ${
                          profile
                            ? "bg-primary text-black hover:bg-amber-500 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 cursor-pointer"
                            : "bg-zinc-900 text-muted-foreground/40 cursor-not-allowed border border-border"
                        }`}
                      >
                        {/* Sweep animation */}
                        {profile && (
                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                        )}
                        <Zap size={16} fill="currentColor" className="shrink-0" />
                        LAUNCH YOUR CAREER // SUBMIT NOW ⚡
                        <Zap size={16} fill="currentColor" className="shrink-0" />
                      </button>

                      {!profile && (
                        <p className="text-center text-[10px] font-mono text-muted-foreground/40 mt-2">
                          Please select a profile in Step 1 to enable submission
                        </p>
                      )}
                    </div>
                  </Reveal>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── BOTTOM CONTACT INFO STRIP ─────────────── */}
      <section className="py-14 bg-background border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <div className="text-primary font-mono text-[10px] font-bold tracking-widest uppercase mb-2">
                [ DIRECT COMMUNICATION CHANNELS ]
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-display uppercase tracking-tight">
                Other Ways to Reach Us
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                icon: MapPin,
                label: "Address",
                value: "Bhavnagar, Gujarat, India",
                code: "LOC-001",
                href: null,
              },
              {
                icon: Mail,
                label: "Email",
                value: "hello@nakshatr.tech",
                code: "MAIL-001",
                href: "mailto:hello@nakshatr.tech",
              },
              {
                icon: Phone,
                label: "WhatsApp",
                value: "+91 83200 02768",
                code: "TEL-001",
                href: "tel:+918320002768",
              },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 0.07}>
                <div className="tech-card group rounded-md p-6 relative overflow-hidden">
                  <div className="cyber-scanline" />
                  <DroneVector className="absolute -bottom-4 -right-4 w-20 h-20 text-primary opacity-[0.03] group-hover:opacity-[0.11] transition-opacity duration-300 pointer-events-none animate-drone-wobble" />
                  <div className="absolute top-3 right-4 font-mono text-[8px] text-blue-500/50 select-none uppercase">
                    {item.code}
                  </div>

                  <div className="w-10 h-10 rounded bg-zinc-900 border border-border flex items-center justify-center text-primary mb-4 group-hover:border-primary/40 transition-colors relative z-10">
                    <item.icon size={18} />
                  </div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary mb-1 relative z-10">
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors relative z-10 block"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-sm font-mono text-muted-foreground relative z-10">
                      {item.value}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
