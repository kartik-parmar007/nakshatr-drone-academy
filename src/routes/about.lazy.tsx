import { createLazyFileRoute } from "@tanstack/react-router";
import {
  Calendar, MapPin, Award, BookOpen, Shield, ShieldCheck,
  Plane, FlaskConical, Landmark, GraduationCap, Quote, Compass, CheckCircle2
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

export const Route = createLazyFileRoute("/about")({
  component: AboutPage,
});

const credentials = [
  { icon: Plane, label: "DGCA Licensed Pilot", desc: "Certified command remote pilot" },
  { icon: FlaskConical, label: "UK UAV R&D Veteran", desc: "A decade of aerospace research" },
  { icon: Landmark, label: "Ecosystem Builder", desc: "Gujarat Drone Katra Participant" },
  { icon: GraduationCap, label: "Curriculum Architect", desc: "SEC credit framework author" },
];

function AboutPage() {
  return (
    <div className="bg-[#050506] text-white overflow-hidden min-h-screen">
      
      {/* ── 1. Page Header ── */}
      <section className="relative pt-32 pb-20 border-b border-[#222328]/60 overflow-hidden">
        <div className="absolute inset-0 bg-hud-grid opacity-[0.08] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <span className="text-[10px] font-mono font-bold text-[#00F0FF] uppercase tracking-[0.4em] drop-shadow-[0_0_10px_rgba(0,240,255,0.25)]">
              [ NAKSHATR ENTERPRISE IDENTITY ]
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center uppercase tracking-tight font-display mt-4">
              Building the Future of Flight
            </h1>
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent mx-auto mt-6" />
            <p className="text-[#8A94A6] text-center mt-4 max-w-3xl mx-auto text-xs sm:text-sm font-mono uppercase tracking-[0.1em]">
              India's First University-Embedded Drone Ecosystem · Established June 2024
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 2. Founder Profile ── */}
      <section className="py-24 border-b border-[#222328]/60 bg-dot-grid relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="rounded-2xl border border-[#222328] bg-[#0c0d0f]/90 p-8 md:p-12 flex flex-col md:grid md:grid-cols-12 gap-10 md:gap-12 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              
              {/* Profile Image & Metadata Block (4 Cols) */}
              <div className="md:col-span-5 flex flex-col items-center md:items-stretch text-center">
                <div className="relative p-1.5 rounded-lg border border-[#222328]/80 bg-[#111216] w-full max-w-[280px] md:max-w-none aspect-[4/5] overflow-hidden group shadow-inner">
                  <div 
                    className="w-full h-full bg-cover bg-center rounded-md transition-all duration-500 group-hover:scale-[1.02]"
                    style={{ backgroundImage: `url('/drone_academy_founder.png')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0f] via-transparent to-transparent pointer-events-none" />
                </div>
                
                <div className="mt-4 font-mono text-[9px] text-center border-t border-[#222328] pt-3 w-full text-[#8A94A6] tracking-widest uppercase">
                  ROLE // CHIEF INSTRUCTOR &amp; FOUNDER
                </div>
              </div>

              {/* Biography & Credentials Content (7 Cols) */}
              <div className="md:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 bg-[#111216] border border-[#222328] text-[#00F0FF] px-3.5 py-1 rounded font-mono text-[9px] tracking-widest uppercase">
                    Personnel Log // 001
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mt-4 tracking-tight font-display">
                    A Pilot, Researcher, and Educator
                  </h2>
                  
                  {/* Styled Quote */}
                  <div className="relative mt-5 p-5 rounded-lg border-l-2 border-[#00F0FF] bg-[#111216]/50">
                    <Quote className="absolute -top-3 right-4 text-[#00F0FF]/10 w-12 h-12" />
                    <p className="text-white text-xs sm:text-sm font-medium italic leading-relaxed relative z-10">
                      "UAV technology in India deserves real operational expertise. Our mission is to produce deployment-ready operators who understand systems, flight configurations, and diagnostics from Day 1 — not certificate holders."
                    </p>
                  </div>

                  <p className="text-[#8A94A6] mt-5 leading-relaxed text-xs sm:text-sm font-sans">
                    After a decade of R&D in the UK and operational experience in India's drone market, our founder returned to Bhavnagar to architect a program that bridges the gap between raw academic theory and direct commercial cockpit operations.
                  </p>
                </div>

                {/* Structured Credentials Grid */}
                <div className="mt-8 pt-6 border-t border-[#222328]/60 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {credentials.map((c) => (
                    <div key={c.label} className="flex gap-3">
                      <div className="w-8 h-8 rounded bg-[#111216] border border-[#222328] flex items-center justify-center text-[#00F0FF] shrink-0">
                        <c.icon size={16} />
                      </div>
                      <div>
                        <h4 className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">{c.label}</h4>
                        <p className="text-[10px] text-[#8A94A6] mt-0.5">{c.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 3. Asymmetric Blueprint Facts ── */}
      <section className="py-24 border-b border-[#222328]/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-[10px] font-mono font-bold text-[#00F0FF] uppercase tracking-[0.4em]">
                [ SYSTEM SPECIFICATIONS ]
              </span>
              <h2 className="text-3xl font-bold text-white uppercase mt-3 tracking-tight font-display">
                Operational Infrastructure
              </h2>
            </div>
          </Reveal>

          {/* Blueprint Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Founded */}
            <Reveal delay={0.05}>
              <div className="group rounded-xl border border-[#222328] bg-[#0c0d0f]/60 hover:border-[#00F0FF]/30 p-6 flex flex-col justify-between min-h-[180px] transition-all duration-300">
                <div className="flex justify-between items-start font-mono text-[9px] text-[#8A94A6]">
                  <span>INDX // 001</span>
                  <span>ESTABLISHED</span>
                </div>
                <div>
                  <Calendar className="text-[#00F0FF] mb-2" size={24} />
                  <div className="text-2xl font-bold text-white font-display">June 2024</div>
                  <div className="text-[10px] font-mono text-[#8A94A6] uppercase tracking-wider mt-1">Foundation Date</div>
                </div>
              </div>
            </Reveal>

            {/* Card 2: Partnerships (Double Width on Desktop) */}
            <Reveal delay={0.1}>
              <div className="group rounded-xl border border-[#222328] bg-[#0c0d0f]/60 hover:border-[#00F0FF]/30 p-6 flex flex-col justify-between min-h-[180px] transition-all duration-300 md:col-span-2">
                <div className="flex justify-between items-start font-mono text-[9px] text-[#8A94A6]">
                  <span>INDX // 002</span>
                  <span>ACADEMIC AFFILIATION</span>
                </div>
                <div>
                  <Award className="text-[#00F0FF] mb-2" size={24} />
                  <div className="text-xl sm:text-2xl font-bold text-white font-display uppercase tracking-tight">University Partner: MKBU</div>
                  <div className="text-xs text-[#8A94A6] leading-relaxed mt-1 font-sans">
                    Affiliated directly with Maharaja Krishnakumarsinhji Bhavnagar University to design credit-bearing student curriculums.
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Card 3: Location (Double Width on Desktop) */}
            <Reveal delay={0.15}>
              <div className="group rounded-xl border border-[#222328] bg-[#0c0d0f]/60 hover:border-[#00F0FF]/30 p-6 flex flex-col justify-between min-h-[180px] transition-all duration-300 md:col-span-2">
                <div className="flex justify-between items-start font-mono text-[9px] text-[#8A94A6]">
                  <span>INDX // 003</span>
                  <span>OPERATIONS BASE</span>
                </div>
                <div>
                  <MapPin className="text-[#00F0FF] mb-2" size={24} />
                  <div className="text-xl sm:text-2xl font-bold text-white font-display uppercase tracking-tight">Bhavnagar, Gujarat</div>
                  <div className="text-xs text-[#8A94A6] leading-relaxed mt-1 font-sans">
                    Serving as the central operational hub, directly routing resources and type-certified aircraft across regional campuses.
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Card 4: Programs */}
            <Reveal delay={0.2}>
              <div className="group rounded-xl border border-[#222328] bg-[#0c0d0f]/60 hover:border-[#00F0FF]/30 p-6 flex flex-col justify-between min-h-[180px] transition-all duration-300">
                <div className="flex justify-between items-start font-mono text-[9px] text-[#8A94A6]">
                  <span>INDX // 004</span>
                  <span>PORTFOLIO</span>
                </div>
                <div>
                  <BookOpen className="text-[#00F0FF] mb-2" size={24} />
                  <div className="text-2xl font-bold text-white font-display">4 Pathways</div>
                  <div className="text-[10px] font-mono text-[#8A94A6] uppercase tracking-wider mt-1">UGC-Aligned Syllabus</div>
                </div>
              </div>
            </Reveal>

            {/* Card 5: Insurance */}
            <Reveal delay={0.25}>
              <div className="group rounded-xl border border-[#222328] bg-[#0c0d0f]/60 hover:border-[#00F0FF]/30 p-6 flex flex-col justify-between min-h-[180px] transition-all duration-300">
                <div className="flex justify-between items-start font-mono text-[9px] text-[#8A94A6]">
                  <span>INDX // 005</span>
                  <span>COMPLIANCE</span>
                </div>
                <div>
                  <ShieldCheck className="text-[#00F0FF] mb-2" size={24} />
                  <div className="text-2xl font-bold text-white font-display">Fully Insured</div>
                  <div className="text-[10px] font-mono text-[#8A94A6] uppercase tracking-wider mt-1">Comprehensive Cover</div>
                </div>
              </div>
            </Reveal>

            {/* Card 6: Regulatory Standards (Double Width on Desktop) */}
            <Reveal delay={0.3}>
              <div className="group rounded-xl border border-[#222328] bg-[#0c0d0f]/60 hover:border-[#00F0FF]/30 p-6 flex flex-col justify-between min-h-[180px] transition-all duration-300 md:col-span-2">
                <div className="flex justify-between items-start font-mono text-[9px] text-[#8A94A6]">
                  <span>INDX // 006</span>
                  <span>AEROSPACE CODES</span>
                </div>
                <div>
                  <Shield className="text-[#00F0FF] mb-2" size={24} />
                  <div className="text-xl sm:text-2xl font-bold text-white font-display uppercase tracking-tight">100% DGCA Compliant</div>
                  <div className="text-xs text-[#8A94A6] leading-relaxed mt-1 font-sans">
                    Every training component, flight log, operating procedure, and aircraft asset matches active DGCA regulatory requirements.
                  </div>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── 4. Core Manifesto (Mission & Vision) ── */}
      <section className="py-24 bg-dot-grid relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="rounded-2xl border border-[#222328] bg-[#0c0d0f]/90 p-8 md:p-12 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 md:divide-x divide-[#222328]/80">
                
                {/* Mission Section */}
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-[#00F0FF] font-mono text-[9px] tracking-widest uppercase">
                      <Compass size={10} />
                      Core Mandate
                    </div>
                    <h3 className="text-lg font-bold text-white font-mono tracking-widest mt-2 uppercase">
                      // MISSION
                    </h3>
                  </div>
                  <p className="mt-6 text-xl sm:text-2xl font-bold text-white leading-snug font-display text-gradient-hud">
                    Place a drone in every student's hands before a single lecture is delivered.
                  </p>
                </div>

                {/* Vision Section */}
                <div className="flex flex-col justify-between md:pl-12">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-[#00F0FF] font-mono text-[9px] tracking-widest uppercase">
                      <CheckCircle2 size={10} />
                      Strategic Horizon
                    </div>
                    <h3 className="text-lg font-bold text-white font-mono tracking-widest mt-2 uppercase">
                      // VISION
                    </h3>
                  </div>
                  <p className="mt-6 text-xl sm:text-2xl font-bold text-white leading-snug font-display text-gradient-hud">
                    Become the foundational layer of drone talent for India by 2030.
                  </p>
                </div>

              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
