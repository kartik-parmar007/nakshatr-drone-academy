import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";

export function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="https://wa.me/918320002768?text=Hi%20Nakshatr%20Technologies%2C%20I%27d%20like%20to%20know%20more."
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 bg-green-500 hover:bg-green-600 text-white p-3 sm:p-4 rounded-full shadow-lg transition-transform hover:scale-110"
      >
        <MessageCircle size={20} className="sm:hidden" />
        <MessageCircle size={22} className="hidden sm:block" />
      </a>
      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-40 bg-primary hover:bg-blue-700 text-white p-2.5 sm:p-3 rounded-md shadow-md transition-transform hover:scale-110 cursor-pointer"
        >
          <ArrowUp size={18} className="sm:hidden" />
          <ArrowUp size={20} className="hidden sm:block" />
        </button>
      )}
    </>
  );
}
