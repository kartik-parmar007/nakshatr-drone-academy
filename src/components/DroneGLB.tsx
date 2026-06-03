import { lazy, Suspense, useEffect, useState, useRef } from "react";
import { useProgress } from "@react-three/drei";

const LazyDroneCanvas = lazy(() => import("./DroneCanvas"));

export function TelemetricLoader({ message = "INITIALIZING CAD LINK" }: { message?: string }) {
  const { progress } = useProgress();
  const percent = Math.floor(progress || 0);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/20 backdrop-blur-[2px] font-mono text-[10px] tracking-[0.25em] text-cyan-400 select-none">
      <div className="relative w-16 h-16 mb-6">
        {/* Animated HUD outer brackets */}
        <div className="absolute inset-0 border border-cyan-500/20 rounded-full animate-[spin_3s_linear_infinite]" />
        <div className="absolute inset-2 border border-dashed border-cyan-400/40 rounded-full animate-[spin_8s_linear_infinite_reverse]" />
        {/* Glowing progress ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="32"
            cy="32"
            r="28"
            className="stroke-cyan-500/10 fill-none"
            strokeWidth="2"
          />
          <circle
            cx="32"
            cy="32"
            r="28"
            className="stroke-cyan-400 fill-none transition-all duration-300"
            strokeWidth="2"
            strokeDasharray={2 * Math.PI * 28}
            strokeDashoffset={2 * Math.PI * 28 * (1 - percent / 100)}
          />
        </svg>
        {/* Center blinking light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
      </div>
      <div className="flex items-center gap-1.5 font-bold uppercase animate-pulse">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        {message}: {percent}%
      </div>
      <div className="text-[8px] text-muted-foreground/60 mt-1 uppercase tracking-[0.2em] font-semibold">
        SYS-LINK: ACTIVE · SECURE LAYER
      </div>
    </div>
  );
}

export function TelemetrySpinner({ message = "INITIALIZING CAD MODEL" }: { message?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/20 backdrop-blur-[2px] font-mono text-[10px] tracking-[0.25em] text-cyan-400 select-none">
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 border border-cyan-500/20 rounded-full animate-[spin_3s_linear_infinite]" />
        <div className="absolute inset-2 border border-dashed border-cyan-400/40 rounded-full animate-[spin_8s_linear_infinite_reverse]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
      </div>
      <div className="flex items-center gap-1.5 font-bold uppercase animate-pulse">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        {message}...
      </div>
      <div className="text-[8px] text-muted-foreground/60 mt-1 uppercase tracking-[0.2em] font-semibold">
        SYS-LINK: ACTIVE · SECURE LAYER
      </div>
    </div>
  );
}

export function DroneGLB({
  className = "",
  scale = 1.15,
  height,
}: {
  className?: string;
  scale?: number;
  height?: number | string;
}) {
  const [mounted, setMounted] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const inlineStyle: React.CSSProperties = {
    width: "100%",
    height: height ?? "100%",
    cursor: "grab",
    position: "relative",
  };

  if (!mounted) {
    return (
      <div className={className} style={inlineStyle}>
        <TelemetrySpinner message="BOOTING SENSORS" />
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className={className} style={inlineStyle}>
      <Suspense fallback={<TelemetricLoader message="STREAMING CAD MODEL" />}>
        <LazyDroneCanvas scale={scale} wrapperRef={wrapperRef} />
      </Suspense>
    </div>
  );
}

export default DroneGLB;
