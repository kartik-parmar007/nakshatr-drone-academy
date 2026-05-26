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
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 text-center">
              About Nakshatr Technologies
            </h1>
            <p className="text-gray-600 text-center mt-5 max-w-3xl mx-auto">
              India's first university-embedded drone technology company — built in Bhavnagar
              to transform how the next generation learns and deploys drones.
            </p>
          </Reveal>

          <div className="mt-14 relative">
            <div className="hidden md:block absolute top-7 left-0 right-0 h-0.5 bg-blue-200" />
            <div className="grid md:grid-cols-3 gap-8">
              {timeline.map((t, i) => (
                <Reveal key={t.title} delay={i * 0.1}>
                  <div className="relative text-center md:text-left">
                    <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mx-auto md:mx-0 relative z-10">
                      {i + 1}
                    </div>
                    <div className="mt-4 text-blue-600 font-semibold text-sm">{t.date}</div>
                    <h3 className="text-lg font-semibold text-blue-900 mt-1">{t.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{t.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-blue-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="bg-white shadow-xl rounded-3xl p-8 md:p-12 grid md:grid-cols-3 gap-10">
              <div className="flex justify-center md:justify-start">
                <div className="w-44 h-44 rounded-full bg-blue-200 flex items-center justify-center text-blue-600">
                  <User size={80} />
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="text-blue-600 text-xs font-semibold tracking-widest">FOUNDER</div>
                <h2 className="text-3xl font-bold text-blue-900 mt-2">A pilot, a researcher, an educator</h2>
                <p className="text-gray-600 mt-4">
                  After a decade of R&D in the UK and operational experience in India's drone
                  market, our founder returned to Bhavnagar to architect a programme that
                  produces deployment-ready operators — not certificate holders.
                </p>
                <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                  {credentials.map((c) => (
                    <li key={c.text} className="flex items-center gap-3 text-gray-700">
                      <c.icon className="text-blue-600 shrink-0" size={20} />
                      <span className="text-sm font-medium">{c.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Facts */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center">Company Facts</h2>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {facts.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.05}>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 hover:shadow-md transition-all">
                  <f.icon className="text-blue-600" size={26} />
                  <div className="mt-3 text-xs uppercase tracking-wider text-blue-900 font-semibold">{f.label}</div>
                  <div className="text-gray-700 text-lg mt-1">{f.value}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-blue-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-7">
          <Reveal>
            <div className="bg-blue-600 text-white rounded-2xl p-10 h-full">
              <div className="text-white/60 text-xs tracking-widest font-semibold">MISSION</div>
              <p className="mt-4 text-2xl font-semibold leading-snug">
                Place a drone in every student's hands before a single lecture is delivered.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="bg-blue-900 text-white rounded-2xl p-10 h-full">
              <div className="text-white/60 text-xs tracking-widest font-semibold">VISION</div>
              <p className="mt-4 text-2xl font-semibold leading-snug">
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
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900">Get in Touch</h2>
            <p className="text-gray-600 mt-4">
              Whether you're a student, a university, or an industry partner — let's talk.
            </p>
            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">Address</div>
                  <div className="text-gray-600 text-sm">Bhavnagar, Gujarat, India</div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">Email</div>
                  <div className="text-gray-600 text-sm">hello@nakshatr.tech</div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">Phone</div>
                  <div className="text-gray-600 text-sm">+91 00000 00000</div>
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
              className="bg-blue-50 border border-blue-100 rounded-2xl p-8 space-y-4"
            >
              {(["name", "email", "org"] as const).map((k) => (
                <input
                  key={k}
                  required={k !== "org"}
                  type={k === "email" ? "email" : "text"}
                  placeholder={k === "org" ? "Organization (optional)" : k === "email" ? "Email" : "Full name"}
                  value={form[k]}
                  onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                  className="w-full bg-white border-2 border-blue-100 focus:border-blue-600 outline-none rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 transition-colors"
                />
              ))}
              <textarea
                required
                rows={4}
                placeholder="Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-white border-2 border-blue-100 focus:border-blue-600 outline-none rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full transition-colors shadow-md"
              >
                {submitted ? "Thank you — we'll be in touch" : "Send Message"}
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
