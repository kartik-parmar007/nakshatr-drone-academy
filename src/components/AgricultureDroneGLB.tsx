import { lazy, Suspense, useEffect, useState, useRef } from "react";
import { TelemetrySpinner, TelemetricLoader } from "./DroneGLB";

const LazyAgricultureDroneCanvas = lazy(() => import("./AgricultureDroneCanvas"));

export function AgricultureDroneGLB({
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
        <TelemetrySpinner message="BOOTING TELEMETRY" />
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className={className} style={inlineStyle}>
      <Suspense fallback={<TelemetricLoader message="STREAMING AGRI-MODEL" />}>
        <LazyAgricultureDroneCanvas scale={scale} wrapperRef={wrapperRef} />
      </Suspense>
    </div>
  );
}

export default AgricultureDroneGLB;
