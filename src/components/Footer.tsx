import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t-2 border-blue-600 text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="text-2xl font-bold tracking-tight text-blue-950">NAKSHATR</div>
          <div className="text-blue-600 font-mono text-[10px] uppercase tracking-wider mt-1">
            [ India's First University-Embedded Drone Tech Company ]
          </div>
          <p className="text-gray-500 text-sm mt-4 max-w-sm leading-relaxed">
            Bridging academia and the drone industry from Bhavnagar, Gujarat.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-blue-950 text-xs font-mono uppercase tracking-wider mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Home</Link></li>
            <li><Link to="/philosophy" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Philosophy</Link></li>
            <li><Link to="/programs" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Programs</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-blue-950 text-xs font-mono uppercase tracking-wider mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/universities" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Universities</Link></li>
            <li><Link to="/about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">About</Link></li>
            <li><Link to="/about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-blue-950 text-xs font-mono uppercase tracking-wider mb-4">Reach Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5 text-gray-600">
              <MapPin size={16} className="mt-0.5 text-blue-600 shrink-0" />
              <span>Bhavnagar, Gujarat, India</span>
            </li>
            <li className="flex items-start gap-2.5 text-gray-600">
              <Mail size={16} className="mt-0.5 text-blue-600 shrink-0" />
              <span>hello@nakshatr.tech</span>
            </li>
            <li className="flex items-start gap-2.5 text-gray-600">
              <Phone size={16} className="mt-0.5 text-blue-600 shrink-0" />
              <span>+91 00000 00000</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-blue-600 font-mono text-[10px] tracking-wider uppercase">
            DGCA COMPLIANT &nbsp;|&nbsp; UGC ALIGNED &nbsp;|&nbsp; MKBU CERTIFIED
          </div>
          <div className="text-gray-400 text-xs font-mono">
            © {new Date().getFullYear()} Nakshatr Technologies LLP. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
