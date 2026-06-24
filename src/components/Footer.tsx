import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border text-muted-foreground font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img
              src="/Logo_Main_1.webp"
              alt="Nakshatr Logo"
              width={46}
              height={40}
              loading="lazy"
              className="h-10 w-auto object-contain"
            />
            <div className="flex flex-col leading-none">
              <span className="text-xl font-bold text-foreground font-display tracking-wider">
                NAKSHATR
              </span>
              <span className="text-[8px] text-primary font-mono uppercase tracking-widest mt-1">
                Technologies
              </span>
            </div>
          </div>
          <p className="text-muted-foreground/80 text-xs mt-5 max-w-sm leading-relaxed">
            Bridging academia and the drone industry from Bhavnagar, Gujarat.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-foreground text-xs font-mono uppercase tracking-widest mb-4">
            Explore
          </h4>
          <ul className="space-y-2 text-xs uppercase tracking-wider font-mono">
            <li>
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/philosophy"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Philosophy
              </Link>
            </li>
            <li>
              <Link
                to="/programs"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Programs
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-foreground text-xs font-mono uppercase tracking-widest mb-4">
            Company
          </h4>
          <ul className="space-y-2 text-xs uppercase tracking-wider font-mono">
            <li>
              <Link
                to="/universities"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Universities
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-foreground text-xs font-mono uppercase tracking-widest mb-4">
            Reach Us
          </h4>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start gap-2.5 text-muted-foreground">
              <MapPin size={16} className="mt-0.5 text-primary shrink-0" />
              <span>Bhavnagar, Gujarat, India</span>
            </li>
            <li className="flex items-start gap-2.5 text-muted-foreground font-mono">
              <Mail size={16} className="mt-0.5 text-primary shrink-0" />
              <a
                href="mailto:hello@nakshatr.tech"
                className="hover:text-primary transition-colors break-all"
              >
                hello@nakshatr.tech
              </a>
            </li>
            <li className="flex items-start gap-2.5 text-muted-foreground font-mono">
              <Phone size={16} className="mt-0.5 text-primary shrink-0" />
              <a href="tel:+918320002768" className="hover:text-primary transition-colors">
                +91 83200 02768
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-primary font-mono text-[9px] tracking-widest uppercase">
            DGCA COMPLIANT &nbsp;|&nbsp; UGC ALIGNED &nbsp;|&nbsp; MKBU CERTIFIED
          </div>
          <div className="text-muted-foreground/60 text-[10px] font-mono">
            © {new Date().getFullYear()} Nakshatr Technologies. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
