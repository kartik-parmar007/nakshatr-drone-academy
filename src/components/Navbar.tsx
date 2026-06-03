import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/philosophy", label: "Philosophy" },
  { to: "/programs", label: "Programs" },
  { to: "/universities", label: "Universities" },
  { to: "/about", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/80 transition-all duration-300 ${scrolled ? "shadow-lg shadow-black/30 border-primary/20" : ""
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
            <span className="text-base sm:text-lg font-bold text-primary tracking-wider font-display uppercase transition-colors group-hover:text-cyan-400">NAKSHATR</span>
            <span className="text-[8px] text-muted-foreground uppercase tracking-widest font-mono mt-0.5">
              Technologies LLP
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-xs font-semibold text-foreground/80 relative py-2 group font-display tracking-wider uppercase transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
              <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            to="/programs"
            className="bg-primary hover:bg-amber-600 text-black text-xs font-bold font-mono tracking-wider px-5 py-2.5 rounded transition-all shadow-sm shadow-amber-500/10 hover:shadow-amber-500/30 uppercase"
          >
            Apply Now
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-primary p-2 cursor-pointer hover:bg-zinc-900/60 rounded"
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-md px-4 py-5 flex flex-col gap-3 shadow-xl">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-foreground/90 font-medium py-2.5 font-display text-sm tracking-wider uppercase border-b border-border/40 hover:text-primary transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/programs"
            onClick={() => setOpen(false)}
            className="bg-primary text-black text-center font-bold font-mono text-xs tracking-wider py-3.5 rounded mt-2 uppercase"
          >
            Apply Now
          </Link>
        </div>
      )}
    </header>
  );
}
