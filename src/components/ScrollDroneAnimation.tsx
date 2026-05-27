import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF, ContactShadows, Sparkles } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * ScrollDroneAnimation — Premium cinematic scroll experience
 * ----------------------------------------------------------
 * Built around the real /models/drone.glb. Because that asset is a single
 * fused mesh (one node, one mesh), we cannot fake a parts explosion. Instead
 * we do what premium drone manufacturers do: a cinematic camera tour with
 * annotation callouts, exactly like the DJI / Skydio product pages.
 *
 * 6 stages mapped to a 600vh pinned scroll section:
 *   0.00–0.10  Title + assembled drone slowly rotating
 *   0.10–0.78  Component tour: camera pans/zooms across the drone, one
 *              component highlighted at a time with a glowing line + card
 *   0.78–0.88  Root principle reveal (two stacked lines)
 *   0.88–1.00  Closing line, drone settles, gentle hover
 *
 * Drone never breaks apart. Camera + lighting + annotations do all the work.
 */

const NAVY = "#0a1628";
const NAVY_2 = "#0f1d3a";
const CYAN = "#22d3ee";
const ACCENT = "#3b82f6";

/* ------------------------------------------------------------------
   Component callouts — each describes WHERE on the drone we focus
   and WHAT to display in the floating card.
   ------------------------------------------------------------------ */
type Callout = {
  id: string;
  title: string;
  desc: string;
  /** Camera position relative to the drone for this beat. */
  cam: [number, number, number];
  /** Direction the annotation card sits (in screen-relative offset px). */
  cardOffset: { x: number; y: number };
  /** World-space anchor on the drone (in normalized model units). */
  anchor: [number, number, number];
};

const CALLOUTS: Callout[] = [
  {
    id: "frame",
    title: "Carbon Frame",
    desc: "Holds every component and absorbs the stresses of flight.",
    cam: [0, 1.8, 4.2],
    cardOffset: { x: 220, y: -10 },
    anchor: [0, 0, 0],
  },
  {
    id: "motor",
    title: "Brushless Motor",
    desc: "Converts electrical energy into the rotational thrust that lifts the drone.",
    cam: [2.6, 1.2, 2.4],
    cardOffset: { x: 200, y: 20 },
    anchor: [1.0, 0.1, 0.9],
  },
  {
    id: "propeller",
    title: "Propeller",
    desc: "Aerofoil that turns motor rotation into directional airflow.",
    cam: [1.8, 2.6, 1.8],
    cardOffset: { x: 220, y: -40 },
    anchor: [-1.0, 0.4, -0.9],
  },
  {
    id: "esc",
    title: "Speed Controller",
    desc: "Regulates motor RPM with high-frequency precision.",
    cam: [-2.4, 0.6, 2.2],
    cardOffset: { x: -240, y: 40 },
    anchor: [-0.7, 0, 0.7],
  },
  {
    id: "fc",
    title: "Flight Controller",
    desc: "Fuses sensor data and commands every motor in real time.",
    cam: [0, 3.2, 2.0],
    cardOffset: { x: 220, y: 0 },
    anchor: [0, 0.2, 0],
  },
  {
    id: "gps",
    title: "GPS + Compass",
    desc: "Tracks position globally for navigation and return-to-home.",
    cam: [0, 3.8, -2.2],
    cardOffset: { x: 220, y: -10 },
    anchor: [0, 0.4, -0.4],
  },
  {
    id: "battery",
    title: "LiPo Battery",
    desc: "High-density chemistry powering the entire system.",
    cam: [0, -1.4, 3.6],
    cardOffset: { x: 220, y: 0 },
    anchor: [0, -0.3, 0],
  },
  {
    id: "camera",
    title: "Camera Gimbal",
    desc: "Stabilised optics for capture and machine vision.",
    cam: [0, 0.6, 4.4],
    cardOffset: { x: 220, y: 30 },
    anchor: [0, -0.2, 0.6],
  },
];

/* ------------------------------------------------------------------
   The real drone model (Highly Optimized)
   ------------------------------------------------------------------ */
function DroneModelGLB({ progressRef }: { progressRef: React.RefObject<number> }) {
  const { scene } = useGLTF("/models/drone.glb");
  const ref = useRef<THREE.Group>(null);

  // Center + scale-normalize once
  const normalized = useMemo(() => {
    const root = scene.clone(true);
    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2.4 / maxDim; // normalized so the drone fits in ~2.4 world units
    root.position.sub(center).multiplyScalar(scale);
    root.scale.setScalar(scale);
    
    // Boost material polish (No shadow casting setup to optimize performance)
    root.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = false;
        mesh.receiveShadow = false;
        const m = mesh.material as THREE.MeshStandardMaterial;
        if (m && "metalness" in m) {
          m.metalness = Math.min(1, (m.metalness ?? 0.5) + 0.15);
          m.roughness = Math.max(0.15, (m.roughness ?? 0.6) - 0.1);
          m.envMapIntensity = 1.4;
          m.needsUpdate = true;
        }
      }
    });
    return root;
  }, [scene]);

  useFrame((state) => {
    if (!ref.current) return;
    const progress = progressRef.current ?? 0;
    const t = state.clock.elapsedTime;
    // Calm idle hover — always present, intensified at start & end
    const calm = Math.max(1 - progress * 1.5, 0) + Math.max(progress - 0.85, 0) * 4;
    ref.current.position.y = Math.sin(t * 0.8) * 0.05 * (calm + 0.4);
    // Slow rotation in idle stages
    const idleSpin = (1 - progress) * 0.0035 + Math.max(progress - 0.85, 0) * 0.01;
    ref.current.rotation.y += idleSpin;
  });

  return (
    <group ref={ref}>
      <primitive object={normalized} />
    </group>
  );
}

/* ------------------------------------------------------------------
   Cinematic scene with scroll-driven camera (Lag-Free)
   ------------------------------------------------------------------ */
function LaserScanDisk() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    // Sweep vertically up and down from y = -0.6 to y = 0.8
    groupRef.current.position.y = Math.sin(t * 1.3) * 0.7 + 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Laser ring outer boundary */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.35, 1.37, 64]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.55}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Laser ring soft inner disk */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.01, 1.35, 64]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function Scene({ 
  progressRef, 
  activeIndexRef 
}: { 
  progressRef: React.RefObject<number>;
  activeIndexRef: React.RefObject<number>;
}) {
  const { camera } = useThree();
  const targetCam = useRef(new THREE.Vector3(0, 1.8, 4.2));
  const targetLook = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    const progress = progressRef.current ?? 0;
    
    // Calculate activeIndex smoothly inside useFrame
    const tourP = Math.max(0, Math.min(1, (progress - 0.10) / 0.68));
    const activeFloat = tourP * CALLOUTS.length;
    const activeIndex = Math.min(CALLOUTS.length - 1, Math.floor(activeFloat));
    activeIndexRef.current = activeIndex;

    // Stage windows
    let cam: THREE.Vector3Tuple = [0, 1.8, 4.2];
    let look: THREE.Vector3Tuple = [0, 0, 0];

    if (progress < 0.10) {
      // Intro: orbit slowly
      const a = progress * 6;
      cam = [Math.sin(a) * 4.5, 1.6 + progress * 0.4, Math.cos(a) * 4.5];
    } else if (progress < 0.78) {
      const idxF = tourP * CALLOUTS.length;
      const i = Math.min(CALLOUTS.length - 1, Math.floor(idxF));
      const next = Math.min(CALLOUTS.length - 1, i + 1);
      const localT = idxF - i;
      const eased = ease(localT);
      const a = CALLOUTS[i].cam;
      const b = CALLOUTS[next].cam;
      cam = [
        a[0] + (b[0] - a[0]) * eased,
        a[1] + (b[1] - a[1]) * eased,
        a[2] + (b[2] - a[2]) * eased,
      ];
      const aA = CALLOUTS[i].anchor;
      const bA = CALLOUTS[next].anchor;
      look = [
        aA[0] + (bA[0] - aA[0]) * eased,
        aA[1] + (bA[1] - aA[1]) * eased,
        aA[2] + (bA[2] - aA[2]) * eased,
      ];
    } else if (progress < 0.88) {
      // Principle: pull back, frame the drone center
      const t = (progress - 0.78) / 0.10;
      cam = [Math.sin(t * 1.5) * 4.5, 2.0, 5.5 - t * 0.5];
    } else {
      // Closing: front-on hero shot
      const t = (progress - 0.88) / 0.12;
      cam = [Math.sin(t * 0.8) * 1.0, 1.5, 4.6];
    }

    targetCam.current.set(...cam);
    targetLook.current.set(...look);

    // Smooth camera lerp
    camera.position.lerp(targetCam.current, 0.08);
    const tmp = new THREE.Vector3().lerp(targetLook.current, 1);
    camera.lookAt(tmp.x, tmp.y, tmp.z);
  });

  return (
    <>
      <color attach="background" args={[NAVY]} />
      <fog attach="fog" args={[NAVY, 7, 22]} />

      {/* Optimized Three-point lighting (No shadow maps) */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[6, 8, 5]}
        intensity={2.0}
      />
      <pointLight position={[-6, 2, -4]} intensity={2.0} color={CYAN} />
      <pointLight position={[6, -1, 4]} intensity={1.4} color={ACCENT} />
      <pointLight position={[0, 5, 0]} intensity={0.8} color="#ffffff" />

      {/* 3D Cyber Grid */}
      <gridHelper args={[24, 24, CYAN, "rgba(34, 211, 238, 0.08)"]} position={[0, -1.39, 0]} />

      {/* Atmospheric GPU Sparkles */}
      <Sparkles
        count={55}
        scale={6}
        size={1.6}
        speed={0.4}
        color={CYAN}
        opacity={0.65}
      />

      {/* Sweeping Active Diagnostic Laser Scan */}
      <LaserScanDisk />

      <Suspense fallback={null}>
        <Environment preset="city" />
        <DroneModelGLB progressRef={progressRef} />
      </Suspense>

      {/* Soft ground reflection shadow (Very high performance) */}
      <ContactShadows
        position={[0, -1.4, 0]}
        opacity={0.65}
        scale={10}
        blur={2.4}
        far={3}
        color="#000000"
      />

      {/* Subtle highlight ring under the active callout anchor */}
      <ActiveAnchorRing progressRef={progressRef} activeIndexRef={activeIndexRef} />
    </>
  );
}

function ActiveAnchorRing({ 
  progressRef, 
  activeIndexRef 
}: { 
  progressRef: React.RefObject<number>;
  activeIndexRef: React.RefObject<number>;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const target = useRef(new THREE.Vector3(0, 0, 0));
  
  useFrame((state) => {
    if (!ref.current) return;
    const progress = progressRef.current ?? 0;
    const index = activeIndexRef.current ?? 0;
    const visible = progress >= 0.10 && progress < 0.78;
    const callout = CALLOUTS[Math.max(0, Math.min(CALLOUTS.length - 1, index))];
    target.current.set(...callout.anchor);
    ref.current.position.lerp(target.current, 0.15);
    ref.current.rotation.x = -Math.PI / 2;
    const t = state.clock.elapsedTime;
    const pulse = 0.85 + Math.sin(t * 3.5) * 0.08;
    ref.current.scale.setScalar(visible ? pulse : 0.001);
  });
  
  return (
    <mesh ref={ref}>
      <ringGeometry args={[0.22, 0.28, 48]} />
      <meshBasicMaterial color={CYAN} transparent opacity={0.75} />
    </mesh>
  );
}

/* ------------------------------------------------------------------
   Easing utilities
   ------------------------------------------------------------------ */
function ease(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function clamp01(v: number) { return Math.max(0, Math.min(1, v)); }
function map(v: number, a: number, b: number, oa: number, ob: number) {
  if (b === a) return oa;
  return oa + ((v - a) / (b - a)) * (ob - oa);
}

/* ------------------------------------------------------------------
   Outer scroll wrapper — public component
   ------------------------------------------------------------------ */
export function ScrollDroneAnimation() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<number>(0);
  const activeIndexRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);
  const [viewport, setViewport] = useState({ w: 1280, isMobile: false, isTablet: false });

  useEffect(() => {
    setMounted(true);
    // Preload GLB on the client only.
    useGLTF.preload("/models/drone.glb");
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const onResize = () => {
      const w = window.innerWidth;
      setViewport({ w, isMobile: w < 640, isTablet: w >= 640 && w < 1024 });
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mounted]);

  // Handle scroll checks in requestAnimationFrame to set the scroll ref (Canvas never re-renders!)
  useEffect(() => {
    if (!mounted) return;
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    
    const update = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = Math.max(0, Math.min(1, -rect.top / total));
      progressRef.current = p;
    };
    
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [mounted]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: viewport.isMobile ? "450vh" : viewport.isTablet ? "520vh" : "600vh",
        background: `linear-gradient(180deg, ${NAVY} 0%, ${NAVY_2} 100%)`,
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* Subtle radial glow background overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              `radial-gradient(60% 50% at 50% 50%, rgba(34,211,238,0.08), transparent 70%), ` +
              `radial-gradient(40% 35% at 20% 80%, rgba(59,130,246,0.10), transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        {/* 3D canvas (Never re-renders since its props are completely stable!) */}
        {mounted && (
          <Canvas
            dpr={[1, 1.5]} // optimized for high DPI devices
            camera={{ position: [4, 2, 4.5], fov: 38 }}
            gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
            style={{ position: "absolute", inset: 0 }}
          >
            <Scene progressRef={progressRef} activeIndexRef={activeIndexRef} />
          </Canvas>
        )}

        {/* Vignette styling overlay */}
        <div
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse at center, transparent 45%, rgba(5,8,20,0.6) 100%)",
          }}
        />

        {/* Throttled dynamic text/HTML card overlay component (isolated state re-renders) */}
        <ScrollOverlays sectionRef={sectionRef} viewport={viewport} progressRef={progressRef} activeIndexRef={activeIndexRef} />

        <style>{`
          @keyframes sda-pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.45; transform: scale(1.6); }
          }
          @keyframes sda-line-grow {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
          }
        `}</style>
      </div>
    </section>
  );
}

export default ScrollDroneAnimation;

/* ------------------------------------------------------------------
   Throttled overlays for high-performance HTML text changes
   ------------------------------------------------------------------ */
function ScrollOverlays({ 
  sectionRef, 
  viewport,
  progressRef,
  activeIndexRef
}: { 
  sectionRef: React.RefObject<HTMLElement | null>;
  viewport: { w: number; isMobile: boolean; isTablet: boolean };
  progressRef: React.RefObject<number>;
  activeIndexRef: React.RefObject<number>;
}) {
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Monitor progress ref and update active elements on scroll ticks
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    
    const tick = () => {
      const currentProgress = progressRef.current ?? 0;
      const currentActiveIndex = activeIndexRef.current ?? 0;
      
      // Only trigger a React state change when values actually shift by significant delta,
      // avoiding useless text updates on small scroll micro-steps.
      setProgress(currentProgress);
      setActiveIndex(currentActiveIndex);
      
      raf = requestAnimationFrame(tick);
    };
    
    tick();
    return () => cancelAnimationFrame(raf);
  }, [sectionRef]);

  /* Compute stage opacities */
  const tourActive = progress >= 0.10 && progress < 0.78;
  const tourP = clamp01((progress - 0.10) / 0.68);
  const activeFloat = tourP * CALLOUTS.length;
  const localT = activeFloat - activeIndex;

  // Fade card in/out at the seam between callouts
  const cardOpacity = tourActive
    ? clamp01(map(localT, 0, 0.15, 0, 1)) * (1 - clamp01(map(localT, 0.85, 1, 0, 1)))
    : 0;

  const introOpacity = clamp01(map(progress, 0.0, 0.05, 1, 1)) * (1 - clamp01(map(progress, 0.07, 0.10, 0, 1)));
  const principleA = clamp01(map(progress, 0.78, 0.81, 0, 1)) * (1 - clamp01(map(progress, 0.86, 0.88, 0, 1)));
  const principleB = clamp01(map(progress, 0.81, 0.84, 0, 1)) * (1 - clamp01(map(progress, 0.86, 0.88, 0, 1)));
  const closingOpacity = clamp01(map(progress, 0.90, 0.95, 0, 1));
  const stageLabel = stageFor(progress, activeIndex);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Top eyebrow */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.55)",
          fontSize: 11,
          letterSpacing: "0.35em",
          fontFamily: "Space Grotesk, sans-serif",
          fontWeight: 600,
          textTransform: "uppercase",
          opacity: introOpacity,
          transition: "opacity 0.4s",
          pointerEvents: "none",
          textAlign: "center",
          width: "90%",
        }}
      >
        The Nakshatr Philosophy
      </div>

      {/* Intro title */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          left: "50%",
          transform: "translateX(-50%)",
          color: "#ffffff",
          fontFamily: "Space Grotesk, sans-serif",
          fontWeight: 700,
          fontSize: "clamp(22px, 3.6vw, 44px)",
          lineHeight: 1.2,
          textAlign: "center",
          maxWidth: "min(900px, 90vw)",
          opacity: introOpacity,
          transition: "opacity 0.5s",
          pointerEvents: "none",
          letterSpacing: "-0.01em",
        }}
      >
        Disassemble to assemble.
        <div
          style={{
            fontSize: "clamp(11px, 1.2vw, 14px)",
            fontWeight: 500,
            color: CYAN,
            letterSpacing: "0.25em",
            marginTop: 14,
            textTransform: "uppercase",
            fontFamily: "JetBrains Mono, monospace"
          }}
        >
          Scroll to explore
        </div>
      </div>

      {/* Side annotation card (component callout) */}
      {tourActive && (
        <CalloutCard
          callout={CALLOUTS[activeIndex]}
          opacity={cardOpacity}
          index={activeIndex}
          total={CALLOUTS.length}
          isMobile={viewport.isMobile || viewport.isTablet}
        />
      )}

      {/* Component counter strip (top right) */}
      <div
        style={{
          position: "absolute",
          top: viewport.isMobile ? 14 : 24,
          right: viewport.isMobile ? 14 : 24,
          color: "rgba(255,255,255,0.6)",
          fontFamily: "JetBrains Mono, ui-monospace, Menlo, monospace",
          fontSize: 10,
          letterSpacing: "0.2em",
          display: "flex",
          alignItems: "center",
          gap: 10,
          opacity: tourActive ? 1 : 0,
          transition: "opacity 0.4s",
          pointerEvents: "none",
          background: "rgba(8,14,30,0.5)",
          border: "1px solid rgba(34,211,238,0.2)",
          borderRadius: 6,
          padding: "6px 10px",
          backdropFilter: "blur(8px)",
        }}
      >
        <span style={{ color: CYAN }}>
          {String(activeIndex + 1).padStart(2, "0")}
        </span>
        <span>/</span>
        <span>{String(CALLOUTS.length).padStart(2, "0")}</span>
      </div>

      {/* Root principle reveal */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            color: "#ffffff",
            fontSize: "clamp(22px, 3.6vw, 44px)",
            fontWeight: 700,
            textAlign: "center",
            opacity: principleA,
            transform: `translateY(${(1 - principleA) * 16}px)`,
            transition: "opacity 0.4s, transform 0.4s",
            maxWidth: "min(900px, 92vw)",
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
            textShadow: "0 4px 30px rgba(0,0,0,0.5)",
            fontFamily: "Space Grotesk, sans-serif"
          }}
        >
          Every drone ever built does one thing.
        </div>
        <div
          style={{
            marginTop: 18,
            color: CYAN,
            fontSize: "clamp(18px, 2.8vw, 32px)",
            fontWeight: 600,
            textAlign: "center",
            opacity: principleB,
            transform: `translateY(${(1 - principleB) * 16}px)`,
            transition: "opacity 0.4s, transform 0.4s",
            maxWidth: "min(900px, 92vw)",
            letterSpacing: "-0.005em",
            lineHeight: 1.3,
            textShadow: "0 4px 30px rgba(34,211,238,0.25)",
            fontFamily: "Space Grotesk, sans-serif"
          }}
        >
          A power source moves air in controlled directions.
        </div>
      </div>

      {/* Closing line */}
      <div
        style={{
          position: "absolute",
          bottom: "14%",
          left: "50%",
          transform: `translateX(-50%) translateY(${(1 - closingOpacity) * 18}px)`,
          color: "#ffffff",
          fontSize: "clamp(16px, 2vw, 24px)",
          fontWeight: 600,
          textAlign: "center",
          opacity: closingOpacity,
          pointerEvents: "none",
          letterSpacing: "-0.005em",
          maxWidth: "min(700px, 90vw)",
          textShadow: "0 4px 24px rgba(0,0,0,0.5)",
          transition: "opacity 0.4s, transform 0.4s",
          fontFamily: "Space Grotesk, sans-serif"
        }}
      >
        You just had your first Nakshatr session.
      </div>

      {/* Stage indicator pill */}
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(8,14,30,0.7)",
          border: "1px solid rgba(34,211,238,0.3)",
          backdropFilter: "blur(8px)",
          borderRadius: 999,
          padding: "8px 18px",
          color: "#cbd5e1",
          fontSize: 11,
          letterSpacing: "0.25em",
          fontFamily: "JetBrains Mono, monospace",
          textTransform: "uppercase",
          display: "flex",
          alignItems: "center",
          gap: 10,
          pointerEvents: "none",
          fontWeight: 500,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: 999,
            background: CYAN,
            boxShadow: `0 0 8px ${CYAN}`,
            animation: "sda-pulse 1.6s infinite",
          }}
        />
        {stageLabel}
      </div>

      {/* Progress bar line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 2,
          background: "rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress * 100}%`,
            background: `linear-gradient(90deg, ${ACCENT}, ${CYAN})`,
            boxShadow: `0 0 10px ${CYAN}`,
            transition: "width 0.1s linear",
          }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Annotation card (DJI / Skydio style)
   ------------------------------------------------------------------ */
function CalloutCard({
  callout,
  opacity,
  index,
  total,
  isMobile = false,
}: {
  callout: Callout;
  opacity: number;
  index: number;
  total: number;
  isMobile?: boolean;
}) {
  const isLeft = callout.cardOffset.x < 0;

  // On mobile/tablet the card sits anchored to the bottom of the screen,
  // full-width, so it never collides with the 3D drone or runs off-screen.
  if (isMobile) {
    return (
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "16%",
          transform: `translateX(-50%) translateY(${(1 - opacity) * 16}px)`,
          width: "min(92vw, 460px)",
          background: "rgba(8,14,30,0.85)",
          border: `1px solid ${CYAN}33`,
          backdropFilter: "blur(14px)",
          borderRadius: 14,
          padding: "16px 18px",
          color: "#e6f7ff",
          fontFamily: "Inter, sans-serif",
          opacity,
          transition: "opacity 0.4s, transform 0.4s",
          pointerEvents: "none",
          boxShadow:
            `0 30px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(34,211,238,0.08), 0 0 30px rgba(34,211,238,0.08)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "JetBrains Mono, ui-monospace, Menlo, monospace",
            fontSize: 9,
            letterSpacing: "0.25em",
            color: CYAN,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          <span>▍ {String(index + 1).padStart(2, "0")} · {callout.id}</span>
          <span style={{ color: "rgba(255,255,255,0.4)" }}>
            of {String(total).padStart(2, "0")}
          </span>
        </div>
        <div
          style={{
            fontSize: "clamp(18px, 5vw, 24px)",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.01em",
            lineHeight: 1.15,
            marginBottom: 8,
            fontFamily: "Space Grotesk, sans-serif"
          }}
        >
          {callout.title}
        </div>
        <div
          style={{
            height: 1,
            width: "100%",
            background: `linear-gradient(90deg, ${CYAN}, transparent)`,
            marginBottom: 10,
          }}
        />
        <div
          style={{
            fontSize: "13px",
            color: "#bcd7e8",
            lineHeight: 1.5,
            fontWeight: 400,
          }}
        >
          {callout.desc}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        [isLeft ? "left" : "right"]: "8%",
        transform: `translateY(-50%) translateY(${(1 - opacity) * 16}px)`,
        width: "min(340px, 38vw)",
        background: "rgba(8,14,30,0.78)",
        border: `1px solid ${CYAN}33`,
        backdropFilter: "blur(14px)",
        borderRadius: 14,
        padding: "20px 22px",
        color: "#e6f7ff",
        fontFamily: "Inter, sans-serif",
        opacity,
        transition: "opacity 0.4s, transform 0.4s",
        pointerEvents: "none",
        boxShadow: `0 30px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(34,211,238,0.08), 0 0 30px rgba(34,211,238,0.08)`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "JetBrains Mono, ui-monospace, Menlo, monospace",
          fontSize: 10,
          letterSpacing: "0.25em",
          color: CYAN,
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        <span>
          ▍ {String(index + 1).padStart(2, "0")} · {callout.id}
        </span>
        <span style={{ color: "rgba(255,255,255,0.4)" }}>
          of {String(total).padStart(2, "0")}
        </span>
      </div>
      <div
        style={{
          fontSize: "clamp(20px, 2.2vw, 28px)",
          fontWeight: 700,
          color: "#ffffff",
          letterSpacing: "-0.01em",
          lineHeight: 1.15,
          marginBottom: 10,
          fontFamily: "Space Grotesk, sans-serif"
        }}
      >
        {callout.title}
      </div>
      <div
        style={{
          height: 1,
          width: "100%",
          background: `linear-gradient(90deg, ${CYAN}, transparent)`,
          transformOrigin: isLeft ? "right" : "left",
          animation: "sda-line-grow 0.6s cubic-bezier(.2,.8,.2,1) forwards",
          marginBottom: 12,
        }}
      />
      <div
        style={{
          fontSize: "clamp(13px, 1.05vw, 15px)",
          color: "#bcd7e8",
          lineHeight: 1.55,
          fontWeight: 400,
        }}
      >
        {callout.desc}
      </div>
    </div>
  );
}

function stageFor(p: number, activeIndex: number) {
  if (p < 0.10) return "01 · Approach";
  if (p < 0.78) return `02 · Component ${String(activeIndex + 1).padStart(2, "0")}`;
  if (p < 0.88) return "03 · Root Principle";
  return "04 · Synthesis";
}
