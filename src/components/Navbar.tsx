import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/philosophy", label: "Philosophy" },
  { to: "/programs", label: "Programs" },
  { to: "/universities", label: "Universities" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050506]/80 backdrop-blur-md border-b border-white/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.1)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/Logo_Main_1.webp"
            alt="Nakshatr Logo"
            width={42}
            height={36}
            loading="lazy"
            className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col leading-none">
            <span className="text-base sm:text-lg font-bold text-blue-400 tracking-wider font-display uppercase transition-colors group-hover:text-blue-300">
              NAKSHATR
            </span>
            <span className="text-[8px] text-white/40 uppercase tracking-widest font-mono mt-0.5">
              Technologies
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            if (l.label === "Contact") {
              return (
                <div key={l.to} className="relative group py-2">
                  <Link
                    to={l.to}
                    className="text-xs font-semibold text-white/70 font-display tracking-wider uppercase transition-colors hover:text-white flex items-center gap-1 cursor-pointer"
                    activeProps={{ className: "text-blue-400" }}
                    activeOptions={{ exact: true }}
                  >
                    Contact
                    <ChevronDown
                      size={12}
                      className="text-white/40 group-hover:text-white transition-transform group-hover:rotate-180"
                    />
                  </Link>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />

                  {/* Dropdown Box */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-44 bg-[#0a0a0c]/95 backdrop-blur-md border border-white/[0.06] rounded shadow-2xl p-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex flex-col gap-1">
                    <Link
                      to="/contact"
                      activeOptions={{ exact: true }}
                      className="text-[10px] font-bold font-mono text-white/70 hover:text-white hover:bg-white/[0.04] px-3 py-2 rounded transition-colors text-left uppercase tracking-wider"
                    >
                      General Inquiry
                    </Link>
                    <Link
                      to="/contact"
                      search={{ type: "feedback" }}
                      className="text-[10px] font-bold font-mono text-white/70 hover:text-white hover:bg-white/[0.04] px-3 py-2 rounded transition-colors text-left uppercase tracking-wider"
                    >
                      Submit Feedback
                    </Link>
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={l.to}
                to={l.to}
                className="text-xs font-semibold text-white/70 relative py-2 group font-display tracking-wider uppercase transition-colors hover:text-white"
                activeProps={{ className: "text-blue-400" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
                <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            to="/contact"
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold font-mono tracking-wider px-5 py-2.5 rounded-sm transition-all shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:shadow-[0_0_28px_rgba(59,130,246,0.45)] uppercase"
          >
            Apply Now
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-white/80 p-2 cursor-pointer hover:bg-white/10 rounded transition-colors"
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/[0.06] bg-[#080809]/90 backdrop-blur-xl px-4 py-5 flex flex-col gap-3 shadow-xl">
          {links.map((l) => {
            if (l.label === "Contact") {
              return (
                <div key={l.to} className="flex flex-col gap-1 border-b border-white/[0.07] pb-2">
                  <Link
                    to="/contact"
                    onClick={() => setOpen(false)}
                    activeOptions={{ exact: true }}
                    className="text-white/80 font-medium py-2 font-display text-sm tracking-wider uppercase hover:text-blue-400 transition-colors"
                  >
                    Contact Us
                  </Link>
                  <Link
                    to="/contact"
                    search={{ type: "feedback" }}
                    onClick={() => setOpen(false)}
                    className="text-white/60 pl-3 font-medium py-1.5 font-display text-xs tracking-wider uppercase hover:text-blue-400 transition-colors"
                  >
                    — Feedback Section
                  </Link>
                </div>
              );
            }
            return (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-white/80 font-medium py-2.5 font-display text-sm tracking-wider uppercase border-b border-white/[0.07] hover:text-blue-400 transition-colors"
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="bg-blue-600 hover:bg-blue-500 text-white text-center font-bold font-mono text-xs tracking-wider py-3.5 rounded-sm mt-2 uppercase transition-colors"
          >
            Apply Now
          </Link>
        </div>
      )}
    </header>
  );
}
