import { createLazyFileRoute } from "@tanstack/react-router";
import React, { useState, useEffect, useRef } from "react";
import {
  GraduationCap,
  Users,
  Briefcase,
  Compass,
  User,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  CheckCircle2,
  Star,
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
  collegeName: string;
  stream: string;
  yearOfStudy: string;
  primaryInterest: string;
  completedEducation: string;
  experience: string;
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

const STREAMS = [
  { value: "Science", label: "Science" },
  { value: "Commerce", label: "Commerce" },
  { value: "Arts", label: "Arts" },
  { value: "Other", label: "Other" },
];

const YEARS_OF_STUDY = [
  { value: "1st Year", label: "1st Year" },
  { value: "2nd Year", label: "2nd Year" },
  { value: "3rd Year", label: "3rd Year" },
  { value: "4th Year", label: "4th Year" },
  { value: "Other", label: "Other" },
];

const PRIMARY_INTERESTS = [
  { value: "starting_business", label: "Starting a Business" },
  { value: "dgca_certificate", label: "DGCA Certificate" },
  { value: "upskilling", label: "Upskilling" },
  { value: "other", label: "Other" },
];

const COMPLETED_EDUCATIONS = [
  { value: "10th_12th", label: "10th Pass / 12th Pass" },
  { value: "iti_diploma", label: "ITI / Diploma Holder" },
  { value: "graduate", label: "Graduate (College Complete)" },
  { value: "postgraduate", label: "Postgraduate" },
  { value: "other", label: "Other" },
];

const EXPERIENCES = [
  { value: "fresher", label: "Fresher" },
  { value: "1_2_years", label: "1-2 Years" },
  { value: "3_5_years", label: "3-5 Years" },
  { value: "5_plus_years", label: "5+ Years" },
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
  error,
}: {
  label: string;
  id: string;
  options: { value: string; label: string }[];
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const selected = options.find((o) => o.value === value);

  const updateDropPosition = () => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;
    const dropHeight = Math.min(options.length * 48, 240);

    if (spaceBelow < dropHeight && spaceAbove > spaceBelow) {
      setOpenUpward(true);
    } else {
      setOpenUpward(false);
    }
  };

  const handleToggle = () => {
    if (!open) updateDropPosition();
    setOpen((v) => !v);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (ref.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="space-y-1.5" ref={ref}>
      <label
        htmlFor={id}
        className="block text-[10px] font-mono font-bold uppercase tracking-widest text-blue-400"
      >
        {label}
      </label>
      <div className={`relative ${open ? "z-30" : "z-10"}`}>
        <button
          ref={btnRef}
          id={id}
          type="button"
          onClick={handleToggle}
          className={`w-full flex items-center justify-between bg-zinc-950/50 backdrop-blur-md border rounded px-4 py-3 text-sm font-mono transition-all cursor-pointer ${
            open
              ? "border-blue-500 text-foreground shadow-[0_0_10px_rgba(59,130,246,0.15)]"
              : error
                ? "border-rose-500/80 text-muted-foreground"
                : "border-white/10 text-muted-foreground hover:border-blue-500/30"
          }`}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span className={selected ? "text-foreground" : ""}>
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown
            size={14}
            className={`text-muted-foreground transition-transform duration-200 shrink-0 ${open ? "rotate-180 text-blue-400" : ""}`}
          />
        </button>
        {open && (
          <ul
            role="listbox"
            className={`absolute left-0 w-full bg-zinc-950 backdrop-blur-xl border border-white/15 rounded shadow-2xl shadow-black/80 overflow-y-auto z-50 max-h-[240px] ${
              openUpward ? "bottom-full mb-1" : "top-full mt-1"
            }`}
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
                    ? "bg-blue-600/20 text-blue-400 border-l-2 border-blue-500"
                    : "text-muted-foreground hover:bg-zinc-900/60 hover:text-foreground border-l-2 border-transparent"
                }`}
              >
                {value === o.value && <CheckCircle2 size={12} className="text-blue-400 shrink-0" />}
                {o.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && (
        <p className="text-[10px] font-mono text-rose-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

/* ---------- Main Page ---------- */
function ContactPage() {
  const search = Route.useSearch();
  const isFeedback = search.type === "feedback";

  const [profile, setProfile] = useState<Profile>(null);
  const [form, setForm] = useState<FormState>({
    name: "",
    whatsapp: "",
    email: "",
    city: "",
    collegeName: "",
    stream: "",
    yearOfStudy: "",
    primaryInterest: "",
    completedEducation: "",
    experience: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Contact form validation states
  const [contactErrors, setContactErrors] = useState({
    name: "",
    whatsapp: "",
    email: "",
    city: "",
    collegeName: "",
    stream: "",
    yearOfStudy: "",
    primaryInterest: "",
    completedEducation: "",
    experience: "",
  });

  // Feedback form states
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    phone: "",
    email: "",
    description: "",
    rating: 0,
  });
  const [feedbackErrors, setFeedbackErrors] = useState({
    name: "",
    phone: "",
    email: "",
    description: "",
    rating: "",
  });
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);



  const handleContactFieldChange = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = key === "whatsapp" ? e.target.value.replace(/\D/g, "").slice(0, 10) : e.target.value;
    setForm((f) => ({ ...f, [key]: val }));
    if (contactErrors[key]) {
      setContactErrors((errs) => ({ ...errs, [key]: "" }));
    }
  };

  const handleContactSelectChange = (key: keyof FormState) => (val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    if (contactErrors[key]) {
      setContactErrors((errs) => ({ ...errs, [key]: "" }));
    }
  };

  const validateContact = () => {
    const errors = {
      name: "",
      whatsapp: "",
      email: "",
      city: "",
      collegeName: "",
      stream: "",
      yearOfStudy: "",
      primaryInterest: "",
      completedEducation: "",
      experience: "",
    };
    let isValid = true;

    if (!form.name.trim()) {
      errors.name = "Full Name is required";
      isValid = false;
    }

    const cleanWhatsapp = form.whatsapp.replace(/\D/g, "");
    if (!form.whatsapp) {
      errors.whatsapp = "WhatsApp Number is required";
      isValid = false;
    } else if (cleanWhatsapp.length !== 10) {
      errors.whatsapp = "WhatsApp Number must be exactly 10 digits";
      isValid = false;
    }

    if (!form.email.trim()) {
      errors.email = "Email Address is required";
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        errors.email = "Please enter a valid email address";
        isValid = false;
      }
    }

    if (!form.city.trim()) {
      errors.city = "City is required";
      isValid = false;
    }

    // Dynamic fields validation
    if (profile === "student" || profile === "parent") {
      const fieldSubject = profile === "student" ? "College" : "Child's College";
      if (!form.collegeName.trim()) {
        errors.collegeName = `${fieldSubject} Name is required`;
        isValid = false;
      }
      if (!form.stream) {
        errors.stream = "Stream of Education is required";
        isValid = false;
      }
      if (!form.yearOfStudy) {
        errors.yearOfStudy = "Year of Study is required";
        isValid = false;
      }
    } else if (profile === "professional") {
      if (!form.primaryInterest) {
        errors.primaryInterest = "Primary Interest is required";
        isValid = false;
      }
    } else if (profile === "explorer") {
      if (!form.completedEducation) {
        errors.completedEducation = "Completed Education is required";
        isValid = false;
      }
      if (!form.experience) {
        errors.experience = "Experience level is required";
        isValid = false;
      }
    }

    setContactErrors(errors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    if (validateContact()) {
      setSubmitted(true);
    }
  };

  const validateFeedback = () => {
    const errors = { name: "", phone: "", email: "", description: "", rating: "" };
    let valid = true;

    if (!feedbackForm.name.trim()) {
      errors.name = "Full Name is required";
      valid = false;
    }

    const cleanPhone = feedbackForm.phone.replace(/\D/g, "");
    if (!feedbackForm.phone) {
      errors.phone = "Phone Number is required";
      valid = false;
    } else if (cleanPhone.length !== 10) {
      errors.phone = "Phone Number must be exactly 10 digits";
      valid = false;
    }

    if (feedbackForm.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(feedbackForm.email)) {
        errors.email = "Please enter a valid email address";
        valid = false;
      }
    }

    if (!feedbackForm.description.trim()) {
      errors.description = "Full Description is required";
      valid = false;
    }

    if (feedbackForm.rating === 0) {
      errors.rating = "Rating score is required";
      valid = false;
    }

    setFeedbackErrors(errors);
    return valid;
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateFeedback()) {
      setFeedbackSubmitted(true);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFeedbackForm((f) => ({ ...f, name: val }));
    if (feedbackErrors.name && val.trim()) {
      setFeedbackErrors((errs) => ({ ...errs, name: "" }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFeedbackForm((f) => ({ ...f, phone: val }));
    if (feedbackErrors.phone && val.length === 10) {
      setFeedbackErrors((errs) => ({ ...errs, phone: "" }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFeedbackForm((f) => ({ ...f, email: val }));
    if (feedbackErrors.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!val.trim() || emailRegex.test(val)) {
        setFeedbackErrors((errs) => ({ ...errs, email: "" }));
      }
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setFeedbackForm((f) => ({ ...f, description: val }));
    if (feedbackErrors.description && val.trim()) {
      setFeedbackErrors((errs) => ({ ...errs, description: "" }));
    }
  };

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="min-h-screen bg-background">

      {/* ─────────────── MAIN FORM GRID ─────────────── */}
      <section className="pt-20 pb-8 sm:pt-24 sm:pb-14 bg-background bg-dot-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto w-full">
            {isFeedback ? (
              feedbackSubmitted ? (
                <Reveal>
                  <div className="tech-card rounded-lg p-10 text-center relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center border-blue-500/30">
                    <div className="cyber-scanline" />
                    <DroneVector className="absolute inset-0 m-auto w-48 h-48 text-blue-500 opacity-[0.025] animate-drone-wobble pointer-events-none" />

                    <div
                      className="w-20 h-20 rounded-full border-2 border-blue-500 flex items-center justify-center mb-6 relative z-10"
                      style={{ boxShadow: "0 0 30px rgba(59,130,246,0.25)" }}
                    >
                      <CheckCircle2 size={36} className="text-blue-500" />
                    </div>
                    <div className="text-blue-400 font-mono text-xs font-bold tracking-widest uppercase mb-3 relative z-10">
                      [ FEEDBACK TRANSMISSION SUCCESS ]
                    </div>
                    <h2 className="text-3xl font-bold text-foreground font-display uppercase relative z-10">
                      Transmission Logged!
                    </h2>
                    <p className="text-muted-foreground mt-4 text-sm leading-relaxed max-w-md relative z-10">
                      Thank you, <span className="text-white font-bold">{feedbackForm.name}</span>
                      . Your operational rating of{" "}
                      <span className="text-blue-400 font-bold">{feedbackForm.rating} / 5</span>{" "}
                      and detailed comments have been successfully ingested into our system
                      configuration board.
                    </p>
                    <div className="mt-6 font-mono text-[9px] uppercase tracking-widest text-muted-foreground/50 relative z-10">
                      REPORT-ID: NDA-FB-{Date.now().toString(36).toUpperCase()}
                    </div>
                  </div>
                </Reveal>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-6" noValidate>
                  <Reveal>
                    <div className="relative bg-zinc-950/45 backdrop-blur-2xl border border-white/10 rounded-xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-black/90 overflow-hidden space-y-5">
                      {/* Decorative HUD Corner borders */}
                      <div className="absolute top-0 left-0 w-8 h-[2px] bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                      <div className="absolute top-0 left-0 w-[2px] h-8 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                      <div className="absolute bottom-0 right-0 w-8 h-[2px] bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                      <div className="absolute bottom-0 right-0 w-[2px] h-8 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                      <div className="cyber-scanline" />

                      <div className="absolute top-4 right-5 font-mono text-[9px] text-blue-500/50 select-none uppercase">
                        INGESTION - QA_LOG
                      </div>

                      <div className="text-blue-400 font-mono text-[10px] font-bold tracking-widest uppercase mb-1">
                        SECTION 1
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white font-display uppercase tracking-tight">
                        Submit Operational Feedback
                      </h2>
                      <p className="text-muted-foreground text-xs font-mono mt-1 mb-6">
                        Provide your scores and suggestions below to refine the Centre of
                        Excellence
                      </p>

                      <div className="space-y-4">
                        {/* Full Name */}
                        <div className="space-y-1.5">
                          <label
                            htmlFor="fb-name"
                            className="block text-[10px] font-mono font-bold uppercase tracking-widest text-blue-400"
                          >
                            Full Name *
                          </label>
                          <div className="relative">
                            <User
                              size={13}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/50 pointer-events-none"
                            />
                            <input
                              id="fb-name"
                              type="text"
                              required
                              placeholder="Your full name"
                              value={feedbackForm.name}
                              onChange={handleNameChange}
                              className={`w-full bg-zinc-950/50 backdrop-blur-md border outline-none rounded px-4 py-3 pl-9 text-foreground placeholder:text-muted-foreground/40 text-sm font-mono transition-all ${
                                feedbackErrors.name
                                  ? "border-rose-500/80 focus:shadow-[0_0_0_1px_rgba(244,63,94,0.2)]"
                                  : "border-white/10 hover:border-blue-500/30 focus:border-blue-500 focus:bg-zinc-950/80 focus:shadow-[0_0_10px_rgba(59,130,246,0.15)]"
                              }`}
                            />
                          </div>
                          {feedbackErrors.name && (
                            <p className="text-[10px] font-mono text-rose-500 mt-1">
                              {feedbackErrors.name}
                            </p>
                          )}
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-1.5">
                          <label
                            htmlFor="fb-phone"
                            className="block text-[10px] font-mono font-bold uppercase tracking-widest text-blue-400"
                          >
                            Phone Number *
                          </label>
                          <div className="relative">
                            <Phone
                              size={13}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/50 pointer-events-none"
                            />
                            <input
                              id="fb-phone"
                              type="tel"
                              required
                              placeholder="10-digit number"
                              maxLength={10}
                              value={feedbackForm.phone}
                              onChange={handlePhoneChange}
                              className={`w-full bg-zinc-950/50 backdrop-blur-md border outline-none rounded px-4 py-3 pl-9 text-foreground placeholder:text-muted-foreground/40 text-sm font-mono transition-all ${
                                feedbackErrors.phone
                                  ? "border-rose-500/80 focus:shadow-[0_0_0_1px_rgba(244,63,94,0.2)]"
                                  : "border-white/10 hover:border-blue-500/30 focus:border-blue-500 focus:bg-zinc-950/80 focus:shadow-[0_0_10px_rgba(59,130,246,0.15)]"
                              }`}
                            />
                          </div>
                          {feedbackErrors.phone && (
                            <p className="text-[10px] font-mono text-rose-500 mt-1">
                              {feedbackErrors.phone}
                            </p>
                          )}
                        </div>

                        {/* Email Address */}
                        <div className="space-y-1.5">
                          <label
                            htmlFor="fb-email"
                            className="block text-[10px] font-mono font-bold uppercase tracking-widest text-blue-400"
                          >
                            Email ID (Optional)
                          </label>
                          <div className="relative">
                            <Mail
                              size={13}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/50 pointer-events-none"
                            />
                            <input
                              id="fb-email"
                              type="email"
                              placeholder="you@example.com"
                              value={feedbackForm.email}
                              onChange={handleEmailChange}
                              className={`w-full bg-zinc-950/50 backdrop-blur-md border outline-none rounded px-4 py-3 pl-9 text-foreground placeholder:text-muted-foreground/40 text-sm font-mono transition-all ${
                                feedbackErrors.email
                                  ? "border-rose-500/80 focus:shadow-[0_0_0_1px_rgba(244,63,94,0.2)]"
                                  : "border-white/10 hover:border-blue-500/30 focus:border-blue-500 focus:bg-zinc-950/80 focus:shadow-[0_0_10px_rgba(59,130,246,0.15)]"
                              }`}
                            />
                          </div>
                          {feedbackErrors.email && (
                            <p className="text-[10px] font-mono text-rose-500 mt-1">
                              {feedbackErrors.email}
                            </p>
                          )}
                        </div>

                        {/* Ratings */}
                        <div className="space-y-1.5 pt-2">
                          <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-blue-400">
                            Ratings *
                          </label>
                          <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => {
                              const active =
                                hoveredRating !== null
                                  ? star <= hoveredRating
                                  : star <= feedbackForm.rating;
                              return (
                                <button
                                  key={star}
                                  type="button"
                                  onMouseEnter={() => setHoveredRating(star)}
                                  onMouseLeave={() => setHoveredRating(null)}
                                  onClick={() => {
                                    setFeedbackForm((f) => ({ ...f, rating: star }));
                                    if (feedbackErrors.rating) {
                                      setFeedbackErrors((errs) => ({ ...errs, rating: "" }));
                                    }
                                  }}
                                  className="p-1 rounded cursor-pointer transition-all duration-200 hover:scale-110 focus:outline-none"
                                  aria-label={`Rate ${star} Stars`}
                                >
                                  <Star
                                    size={24}
                                    className={`transition-all duration-200 ${
                                      active
                                        ? "fill-blue-500 text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                                        : "text-muted-foreground/30 hover:text-blue-400"
                                    }`}
                                  />
                                </button>
                              );
                            })}
                            {feedbackForm.rating > 0 && (
                              <span className="ml-3 font-mono text-xs text-blue-400 font-bold">
                                {feedbackForm.rating} / 5 Stars
                              </span>
                            )}
                          </div>
                          {feedbackErrors.rating && (
                            <p className="text-[10px] font-mono text-rose-500 mt-1">
                              {feedbackErrors.rating}
                            </p>
                          )}
                        </div>

                        {/* Full Description */}
                        <div className="space-y-1.5">
                          <label
                            htmlFor="fb-desc"
                            className="block text-[10px] font-mono font-bold uppercase tracking-widest text-blue-400"
                          >
                            Full Description *
                          </label>
                          <div className="relative">
                            <textarea
                              id="fb-desc"
                              required
                              rows={4}
                              placeholder="Please enter details of your suggestion, operational audit, or experience..."
                              value={feedbackForm.description}
                              onChange={handleDescriptionChange}
                              className={`w-full bg-zinc-950/50 backdrop-blur-md border outline-none rounded p-4 text-foreground placeholder:text-muted-foreground/40 text-sm font-mono transition-all ${
                                feedbackErrors.description
                                  ? "border-rose-500/80 focus:shadow-[0_0_0_1px_rgba(244,63,94,0.2)]"
                                  : "border-white/10 hover:border-blue-500/30 focus:border-blue-500 focus:bg-zinc-950/80 focus:shadow-[0_0_10px_rgba(59,130,246,0.15)]"
                              }`}
                            />
                          </div>
                          {feedbackErrors.description && (
                            <p className="text-[10px] font-mono text-rose-500 mt-1">
                              {feedbackErrors.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Reveal>

                  {/* Submit Button */}
                  <Reveal delay={0.05}>
                    <div className="relative">
                      <div
                        className="absolute inset-0 rounded-lg blur-xl opacity-30 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(59,130,246,0.4) 0%, rgba(29,78,216,0.2) 100%)",
                        }}
                      />
                      <button
                        id="fb-submit"
                        type="submit"
                        className="relative w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-mono text-sm font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center overflow-hidden group shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 cursor-pointer rounded-lg border border-blue-500/30"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                        SUBMIT
                      </button>
                    </div>
                  </Reveal>
                </form>
              )
            ) : submitted ? (
              <Reveal>
                <div className="tech-card rounded-lg p-10 text-center relative overflow-hidden min-h-[500px] flex flex-col items-center justify-center border-blue-500/30">
                  <div className="cyber-scanline" />
                  <DroneVector className="absolute inset-0 m-auto w-48 h-48 text-blue-500 opacity-[0.025] animate-drone-wobble pointer-events-none" />

                  <div
                    className="w-20 h-20 rounded-full border-2 border-blue-500 flex items-center justify-center mb-6 relative z-10"
                    style={{ boxShadow: "0 0 30px rgba(59,130,246,0.25)" }}
                  >
                    <CheckCircle2 size={36} className="text-blue-500" />
                  </div>
                  <div className="text-blue-400 font-mono text-xs font-bold tracking-widest uppercase mb-3 relative z-10">
                    [ TRANSMISSION RECEIVED ]
                  </div>
                  <h2 className="text-3xl font-bold text-foreground font-display uppercase relative z-10">
                    Transmission Received!
                  </h2>
                  <p className="text-muted-foreground mt-4 text-sm leading-relaxed max-w-md relative z-10">
                    Our team will contact you on WhatsApp within{" "}
                    <span className="text-blue-400 font-semibold">24 hours</span>. Your free drone roadmap is on its way.
                  </p>
                  <div className="mt-6 font-mono text-[9px] uppercase tracking-widest text-muted-foreground/50 relative z-10">
                    FORM-ID: NDA-{Date.now().toString(36).toUpperCase()}
                  </div>
                </div>
              </Reveal>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* ── STEP 1: PROFILE ── */}
                <Reveal>
                  <div className="relative bg-zinc-950/45 backdrop-blur-2xl border border-white/10 rounded-xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-black/90 overflow-hidden space-y-5">
                    {/* Decorative HUD Corner borders */}
                    <div className="absolute top-0 left-0 w-8 h-[2px] bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                    <div className="absolute top-0 left-0 w-[2px] h-8 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                    <div className="absolute bottom-0 right-0 w-8 h-[2px] bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                    <div className="absolute bottom-0 right-0 w-[2px] h-8 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                    <div className="cyber-scanline" />

                   

                    <div className="text-blue-400 font-mono text-[10px] font-bold tracking-widest uppercase mb-1">
                      STEP 1
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white font-display uppercase tracking-tight">
                      Who Are You?
                    </h2>
                    <p className="text-muted-foreground text-xs font-mono mt-1 mb-6">
                      Select your profile to customise your submission
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
                                ? "bg-blue-600/10 border-blue-500 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                                : "bg-zinc-950/40 border-white/10 text-muted-foreground hover:border-blue-500/40 hover:text-foreground hover:bg-zinc-950/70"
                            }`}
                          >
                            {/* Sweep light on hover */}
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

                            {/* Active indicator */}
                            {active && (
                              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            )}

                            <div
                              className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors ${
                                active
                                  ? "bg-blue-600/20 text-blue-400"
                                  : "bg-zinc-900 text-muted-foreground group-hover:text-foreground"
                              }`}
                            >
                              <Icon size={20} />
                            </div>

                            <div>
                              <div
                                className={`text-xs font-bold font-display uppercase tracking-wider transition-colors ${
                                  active ? "text-blue-400" : ""
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
                                active ? "text-blue-400/60" : "text-muted-foreground/30"
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
                    className={`relative bg-zinc-950/45 backdrop-blur-2xl border border-white/10 rounded-xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-black/90 overflow-hidden space-y-4 transition-all duration-500 ${
                      !profile ? "opacity-50 pointer-events-none" : "opacity-100"
                    }`}
                  >
                    {/* Decorative HUD Corner borders */}
                    <div className="absolute top-0 left-0 w-8 h-[2px] bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                    <div className="absolute top-0 left-0 w-[2px] h-8 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                    <div className="absolute bottom-0 right-0 w-8 h-[2px] bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                    <div className="absolute bottom-0 right-0 w-[2px] h-8 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                    <div className="cyber-scanline" />

                  

                    <div className="text-blue-400 font-mono text-[10px] font-bold tracking-widest uppercase mb-1">
                      STEP 2
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white font-display uppercase tracking-tight">
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
                          className="block text-[10px] font-mono font-bold uppercase tracking-widest text-blue-400"
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
                            onChange={handleContactFieldChange("name")}
                            className={`w-full bg-zinc-950/50 backdrop-blur-md border outline-none rounded px-4 py-3 pl-9 text-foreground placeholder:text-muted-foreground/40 text-sm font-mono transition-all ${
                              contactErrors.name
                                ? "border-rose-500/80 focus:shadow-[0_0_0_1px_rgba(244,63,94,0.2)]"
                                : "border-white/10 hover:border-blue-500/30 focus:border-blue-500 focus:bg-zinc-950/80 focus:shadow-[0_0_10px_rgba(59,130,246,0.15)]"
                            }`}
                          />
                        </div>
                        {contactErrors.name && (
                          <p className="text-[10px] font-mono text-rose-500 mt-1">
                            {contactErrors.name}
                          </p>
                        )}
                      </div>

                      {/* WhatsApp */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-whatsapp"
                          className="block text-[10px] font-mono font-bold uppercase tracking-widest text-blue-400"
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
                            onChange={handleContactFieldChange("whatsapp")}
                            className={`w-full bg-zinc-950/50 backdrop-blur-md border outline-none rounded px-4 py-3 pl-9 text-foreground placeholder:text-muted-foreground/40 text-sm font-mono transition-all ${
                              contactErrors.whatsapp
                                ? "border-rose-500/80 focus:shadow-[0_0_0_1px_rgba(244,63,94,0.2)]"
                                : "border-white/10 hover:border-blue-500/30 focus:border-blue-500 focus:bg-zinc-950/80 focus:shadow-[0_0_10px_rgba(59,130,246,0.15)]"
                            }`}
                          />
                        </div>
                        {contactErrors.whatsapp && (
                          <p className="text-[10px] font-mono text-rose-500 mt-1">
                            {contactErrors.whatsapp}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-email"
                          className="block text-[10px] font-mono font-bold uppercase tracking-widest text-blue-400"
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
                            onChange={handleContactFieldChange("email")}
                            className={`w-full bg-zinc-950/50 backdrop-blur-md border outline-none rounded px-4 py-3 pl-9 text-foreground placeholder:text-muted-foreground/40 text-sm font-mono transition-all ${
                              contactErrors.email
                                ? "border-rose-500/80 focus:shadow-[0_0_0_1px_rgba(244,63,94,0.2)]"
                                : "border-white/10 hover:border-blue-500/30 focus:border-blue-500 focus:bg-zinc-950/80 focus:shadow-[0_0_10px_rgba(59,130,246,0.15)]"
                            }`}
                          />
                        </div>
                        {contactErrors.email && (
                          <p className="text-[10px] font-mono text-rose-500 mt-1">
                            {contactErrors.email}
                          </p>
                        )}
                      </div>

                      {/* City */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-city"
                          className="block text-[10px] font-mono font-bold uppercase tracking-widest text-blue-400"
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
                            onChange={handleContactFieldChange("city")}
                            className={`w-full bg-zinc-950/50 backdrop-blur-md border outline-none rounded px-4 py-3 pl-9 text-foreground placeholder:text-muted-foreground/40 text-sm font-mono transition-all ${
                              contactErrors.city
                                ? "border-rose-500/80 focus:shadow-[0_0_0_1px_rgba(244,63,94,0.2)]"
                                : "border-white/10 hover:border-blue-500/30 focus:border-blue-500 focus:bg-zinc-950/80 focus:shadow-[0_0_10px_rgba(59,130,246,0.15)]"
                            }`}
                          />
                        </div>
                        {contactErrors.city && (
                          <p className="text-[10px] font-mono text-rose-500 mt-1">
                            {contactErrors.city}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>

                {/* ── STEP 3: DYNAMIC PROFILE FIELDS ── */}
                {profile && (
                  <Reveal delay={0.1} className="relative z-20">
                    <div className="relative bg-zinc-950/45 backdrop-blur-2xl border border-white/10 rounded-xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-black/90 !overflow-visible space-y-5">
                      {/* Decorative HUD Corner borders */}
                      <div className="absolute top-0 left-0 w-8 h-[2px] bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                      <div className="absolute top-0 left-0 w-[2px] h-8 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                      <div className="absolute bottom-0 right-0 w-8 h-[2px] bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                      <div className="absolute bottom-0 right-0 w-[2px] h-8 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                      <div className="cyber-scanline" />


                      {profile === "student" && (
                        <>
                          <div className="text-blue-400 font-mono text-[10px] font-bold tracking-widest uppercase mb-1">
                            COLLEGE INFO
                          </div>
                          <h2 className="text-xl sm:text-2xl font-bold text-white font-display uppercase tracking-tight">
                            College Info
                          </h2>
                          <p className="text-muted-foreground text-xs font-mono mt-1 mb-6">
                            Provide details about your current academic institution
                          </p>

                          <div className="space-y-4">
                            {/* College Name */}
                            <div className="space-y-1.5">
                              <label
                                htmlFor="contact-collegeName"
                                className="block text-[10px] font-mono font-bold uppercase tracking-widest text-blue-400"
                              >
                                College Name *
                              </label>
                              <input
                                id="contact-collegeName"
                                type="text"
                                placeholder="Your college / institution"
                                value={form.collegeName}
                                onChange={handleContactFieldChange("collegeName")}
                                className={`w-full bg-zinc-950/50 backdrop-blur-md border outline-none rounded px-4 py-3 text-foreground placeholder:text-muted-foreground/40 text-sm font-mono transition-all ${
                                  contactErrors.collegeName
                                    ? "border-rose-500/80 focus:shadow-[0_0_0_1px_rgba(244,63,94,0.2)]"
                                    : "border-white/10 hover:border-blue-500/30 focus:border-blue-500 focus:bg-zinc-950/80 focus:shadow-[0_0_10px_rgba(59,130,246,0.15)]"
                                }`}
                              />
                              {contactErrors.collegeName && (
                                <p className="text-[10px] font-mono text-rose-500 mt-1">
                                  {contactErrors.collegeName}
                                </p>
                              )}
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                              <CustomSelect
                                label="Stream of Education *"
                                id="contact-stream"
                                options={STREAMS}
                                placeholder="Select stream"
                                value={form.stream}
                                onChange={handleContactSelectChange("stream")}
                                error={contactErrors.stream}
                              />
                              <CustomSelect
                                label="Year of Study *"
                                id="contact-yearOfStudy"
                                options={YEARS_OF_STUDY}
                                placeholder="Select year"
                                value={form.yearOfStudy}
                                onChange={handleContactSelectChange("yearOfStudy")}
                                error={contactErrors.yearOfStudy}
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {profile === "parent" && (
                        <>
                          <div className="text-blue-400 font-mono text-[10px] font-bold tracking-widest uppercase mb-1">
                            CHILD COLLEGE INFO
                          </div>
                          <h2 className="text-xl sm:text-2xl font-bold text-white font-display uppercase tracking-tight">
                            Child's College Info
                          </h2>
                          <p className="text-muted-foreground text-xs font-mono mt-1 mb-6">
                            Provide details about your child's academic institution
                          </p>

                          <div className="space-y-4">
                            {/* College Name */}
                            <div className="space-y-1.5">
                              <label
                                htmlFor="contact-collegeName"
                                className="block text-[10px] font-mono font-bold uppercase tracking-widest text-blue-400"
                              >
                                Child's College Name *
                              </label>
                              <input
                                id="contact-collegeName"
                                type="text"
                                placeholder="Child's college / institution"
                                value={form.collegeName}
                                onChange={handleContactFieldChange("collegeName")}
                                className={`w-full bg-zinc-950/50 backdrop-blur-md border outline-none rounded px-4 py-3 text-foreground placeholder:text-muted-foreground/40 text-sm font-mono transition-all ${
                                  contactErrors.collegeName
                                    ? "border-rose-500/80 focus:shadow-[0_0_0_1px_rgba(244,63,94,0.2)]"
                                    : "border-white/10 hover:border-blue-500/30 focus:border-blue-500 focus:bg-zinc-950/80 focus:shadow-[0_0_10px_rgba(59,130,246,0.15)]"
                                }`}
                              />
                              {contactErrors.collegeName && (
                                <p className="text-[10px] font-mono text-rose-500 mt-1">
                                  {contactErrors.collegeName}
                                </p>
                              )}
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                              <CustomSelect
                                label="Child's Stream of Education *"
                                id="contact-stream"
                                options={STREAMS}
                                placeholder="Select stream"
                                value={form.stream}
                                onChange={handleContactSelectChange("stream")}
                                error={contactErrors.stream}
                              />
                              <CustomSelect
                                label="Child's Year of Study *"
                                id="contact-yearOfStudy"
                                options={YEARS_OF_STUDY}
                                placeholder="Select year"
                                value={form.yearOfStudy}
                                onChange={handleContactSelectChange("yearOfStudy")}
                                error={contactErrors.yearOfStudy}
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {profile === "professional" && (
                        <>
                          <div className="text-blue-400 font-mono text-[10px] font-bold tracking-widest uppercase mb-1">
                            YOUR GOAL
                          </div>
                          <h2 className="text-xl sm:text-2xl font-bold text-white font-display uppercase tracking-tight">
                            Your Goal
                          </h2>
                          <p className="text-muted-foreground text-xs font-mono mt-1 mb-6">
                            Tell us what brings you here to align our flight structures
                          </p>

                          <div className="space-y-4">
                            <CustomSelect
                              label="Primary Interest *"
                              id="contact-primaryInterest"
                              options={PRIMARY_INTERESTS}
                              placeholder="What brings you here? like starting a business, DGCA Certificate or Upskilling"
                              value={form.primaryInterest}
                              onChange={handleContactSelectChange("primaryInterest")}
                              error={contactErrors.primaryInterest}
                            />
                          </div>
                        </>
                      )}

                      {profile === "explorer" && (
                        <>
                          <div className="text-blue-400 font-mono text-[10px] font-bold tracking-widest uppercase mb-1">
                            EDUCATION & EXPERIENCE
                          </div>
                          <h2 className="text-xl sm:text-2xl font-bold text-white font-display uppercase tracking-tight">
                            Education & Experience
                          </h2>
                          <p className="text-muted-foreground text-xs font-mono mt-1 mb-6">
                            Provide details about your completed background
                          </p>

                          <div className="grid sm:grid-cols-2 gap-4">
                            <CustomSelect
                              label="Completed Education *"
                              id="contact-completedEducation"
                              options={COMPLETED_EDUCATIONS}
                              placeholder="Select qualification"
                              value={form.completedEducation}
                              onChange={handleContactSelectChange("completedEducation")}
                              error={contactErrors.completedEducation}
                            />
                            <CustomSelect
                              label="Experience Level *"
                              id="contact-experience"
                              options={EXPERIENCES}
                              placeholder="Select experience"
                              value={form.experience}
                              onChange={handleContactSelectChange("experience")}
                              error={contactErrors.experience}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </Reveal>
                )}

                {/* ── SUBMIT ── */}
                  <Reveal delay={0.15} className="relative z-10">
                  <div className="relative">
                    {/* Glow behind button */}
                    <div
                      className="absolute inset-0 rounded-lg blur-xl opacity-30 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(59,130,246,0.4) 0%, rgba(29,78,216,0.2) 100%)",
                      }}
                    />
                    <button
                      id="contact-submit"
                      type="submit"
                      disabled={!profile}
                      className={`relative w-full py-4 rounded-lg font-mono text-sm font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden group border ${
                        profile
                          ? "bg-blue-600 border-blue-500/30 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 cursor-pointer"
                          : "bg-zinc-900/50 border-white/5 text-muted-foreground/40 cursor-not-allowed"
                      }`}
                    >
                      {/* Sweep animation */}
                      {profile && (
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                      )}
                      SUBMIT
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
      </section>

      {/* ─────────────── BOTTOM CONTACT INFO STRIP ─────────────── */}
      <section className="py-8 sm:py-12 bg-background border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-6 sm:mb-10">
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
                href: null,
              },
              {
                icon: Mail,
                label: "Email",
                value: "support@nakshatrtech.in",
                href: "mailto:support@nakshatrtech.in",
              },
              {
                icon: Phone,
                label: "Phone",
                value: "+91 83200 02768",
                href: "tel:+918320002768",
              },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 0.07}>
                <div className="tech-card group rounded-md p-6 relative overflow-hidden">
                  <div className="cyber-scanline" />
                  <DroneVector className="absolute -bottom-4 -right-4 w-20 h-20 text-primary opacity-[0.03] group-hover:opacity-[0.11] transition-opacity duration-300 pointer-events-none animate-drone-wobble" />

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
