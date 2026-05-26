import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="text-2xl font-bold tracking-tight">NAKSHATR</div>
          <div className="text-blue-300 text-sm mt-1">
            India's First University-Embedded Drone Technology Company
          </div>
          <p className="text-blue-100 text-sm mt-4 max-w-sm">
            Bridging academia and the drone industry from Bhavnagar, Gujarat.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-white/90">
            <li><Link to="/" className="hover:text-blue-300">Home</Link></li>
            <li><Link to="/drone" className="hover:text-blue-300">Drone</Link></li>
            <li><Link to="/programs" className="hover:text-blue-300">Programs</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-white/90">
            <li><Link to="/universities" className="hover:text-blue-300">Universities</Link></li>
            <li><Link to="/about" className="hover:text-blue-300">About</Link></li>
            <li><Link to="/about" className="hover:text-blue-300">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Reach Us</h4>
          <ul className="space-y-2 text-sm text-blue-100">
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 text-blue-300" /> Bhavnagar, Gujarat, India</li>
            <li className="flex items-start gap-2"><Mail size={16} className="mt-0.5 text-blue-300" /> hello@nakshatr.tech</li>
            <li className="flex items-start gap-2"><Phone size={16} className="mt-0.5 text-blue-300" /> +91 00000 00000</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-blue-400 text-xs tracking-wider">
            DGCA COMPLIANT &nbsp;|&nbsp; UGC ALIGNED &nbsp;|&nbsp; MKBU CERTIFIED
          </div>
          <div className="text-white/80 text-xs">
            © {new Date().getFullYear()} Nakshatr Technologies LLP. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
