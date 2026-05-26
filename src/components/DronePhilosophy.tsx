import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

/**
 * DronePhilosophy
 * ----------------
 * Self-contained 3D drone disassemble/reassemble animation designed to be
 * embedded as a right-column element inside a Philosophy section.
 *
 * - Auto-triggers when scrolled into viewport (IntersectionObserver, threshold 0.4)
 * - Loops through 4 phases: ASSEMBLED → DISASSEMBLY → FLOATING → REASSEMBLY
 * - Cursor parallax + per-part hover highlight
 * - HTML overlay labels projected from 3D world space
 * - Pauses when not visible to save GPU
 */

type PartName =
  | "Fuselage"
  | "Arm FL" | "Arm FR" | "Arm RL" | "Arm RR"
  | "Motor 1" | "Motor 2" | "Motor 3" | "Motor 4"
  | "Prop 1" | "Prop 2" | "Prop 3" | "Prop 4"
  | "Flight Controller"
  | "GPS"
  | "Battery"
  | "Receiver"
  | "ESC 1" | "ESC 2" | "ESC 3" | "ESC 4"
  | "Landing L" | "Landing R"
  | "Camera";

interface Part {
  name: PartName;
  label: string;
  group: THREE.Group;
  assembledPos: THREE.Vector3;
  explodedPos: THREE.Vector3;
  baseScale: number;
  mat?: THREE.MeshStandardMaterial;
  parallax: number;
  showLabel: boolean;
  isPropeller?: boolean;
}

type Phase = "assembled" | "disassembling" | "floating" | "assembling";

export function DronePhilosophy() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const phasePillRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const overlay = overlayRef.current;
    const trailCanvas = trailCanvasRef.current;
    if (!wrap || !overlay || !trailCanvas) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    /* ---------------- Renderer / Scene / Camera ---------------- */
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a1628, 0.08);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 1.5, 4);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    wrap.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    /* ---------------- Lights ---------------- */
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const pl1 = new THREE.PointLight(0x3b82f6, 1.8, 30);
    pl1.position.set(3, 4, 3);
    scene.add(pl1);
    const pl2 = new THREE.PointLight(0xffffff, 0.6, 20);
    pl2.position.set(-2, -2, 2);
    scene.add(pl2);
    const pl3 = new THREE.PointLight(0x06b6d4, 1.2, 25);
    pl3.position.set(0, 0, -4);
    scene.add(pl3);

    // Dynamic flash light (reused for snap pulses)
    const flash = new THREE.PointLight(0x3b82f6, 0, 6);
    flash.position.set(0, 0, 0);
    scene.add(flash);

    /* ---------------- Drone build ---------------- */
    const droneRoot = new THREE.Group();
    scene.add(droneRoot);

    const parts: Part[] = [];

    const mkStandard = (opts: {
      color: number; metalness?: number; roughness?: number;
      emissive?: number; emissiveIntensity?: number;
      transparent?: boolean; opacity?: number;
    }) =>
      new THREE.MeshStandardMaterial({
        color: opts.color,
        metalness: opts.metalness ?? 0.6,
        roughness: opts.roughness ?? 0.35,
        emissive: opts.emissive ?? 0x000000,
        emissiveIntensity: opts.emissiveIntensity ?? 0,
        transparent: opts.transparent ?? false,
        opacity: opts.opacity ?? 1,
      });

    const addPart = (
      name: PartName,
      label: string,
      group: THREE.Group,
      assembled: [number, number, number],
      exploded: [number, number, number],
      parallax: number,
      mat?: THREE.MeshStandardMaterial,
      opts?: { showLabel?: boolean; isPropeller?: boolean }
    ) => {
      group.position.set(...assembled);
      droneRoot.add(group);
      parts.push({
        name,
        label,
        group,
        assembledPos: new THREE.Vector3(...assembled),
        explodedPos: new THREE.Vector3(...exploded),
        baseScale: 1,
        mat,
        parallax,
        showLabel: opts?.showLabel ?? true,
        isPropeller: opts?.isPropeller ?? false,
      });
    };

    // 1. Fuselage
    {
      const g = new THREE.Group();
      const m = mkStandard({ color: 0xffffff, metalness: 0.9, roughness: 0.1 });
      g.add(new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.2, 0.8), m));
      addPart("Fuselage", "Main Body", g, [0, 0, 0], [0, -0.3, 0], 0.02, m);
    }

    // Arms 2..5
    const armConfigs: Array<{
      name: PartName; pos: [number, number, number]; rotY: number;
      exploded: [number, number, number];
    }> = [
      { name: "Arm FL", pos: [-0.5, 0, -0.5], rotY: Math.PI / 4, exploded: [-2.2, 1.2, -2.2] },
      { name: "Arm FR", pos: [0.5, 0, -0.5], rotY: -Math.PI / 4, exploded: [2.2, 1.2, -2.2] },
      { name: "Arm RL", pos: [-0.5, 0, 0.5], rotY: -Math.PI / 4, exploded: [-2.2, -0.8, 2.2] },
      { name: "Arm RR", pos: [0.5, 0, 0.5], rotY: Math.PI / 4, exploded: [2.2, -0.8, 2.2] },
    ];
    armConfigs.forEach((a) => {
      const g = new THREE.Group();
      const m = mkStandard({ color: 0xe2e8f0, metalness: 0.7, roughness: 0.3 });
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.08, 0.14), m);
      mesh.rotation.y = a.rotY;
      g.add(mesh);
      addPart(a.name, "Carbon Arm", g, a.pos, a.exploded, 0.05, m, { showLabel: a.name === "Arm FL" });
    });

    // Motors 6..9
    const motorPositions: Array<{
      name: PartName; pos: [number, number, number]; exploded: [number, number, number];
    }> = [
      { name: "Motor 1", pos: [-0.85, 0.06, -0.85], exploded: [-2.6, 1.8, -2.6] },
      { name: "Motor 2", pos: [0.85, 0.06, -0.85], exploded: [2.6, 1.8, -2.6] },
      { name: "Motor 3", pos: [-0.85, 0.06, 0.85], exploded: [-2.6, -1.4, 2.6] },
      { name: "Motor 4", pos: [0.85, 0.06, 0.85], exploded: [2.6, -1.4, 2.6] },
    ];
    motorPositions.forEach((mp) => {
      const g = new THREE.Group();
      const m = mkStandard({
        color: 0x1d4ed8, metalness: 0.95, roughness: 0.2,
        emissive: 0x1d4ed8, emissiveIntensity: 0.3,
      });
      g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.12, 24), m));
      addPart(mp.name, "Brushless Motor", g, mp.pos, mp.exploded, 0.07, m, { showLabel: mp.name === "Motor 1" });
    });

    // Propellers 10..13
    const propPositions: Array<{
      name: PartName; pos: [number, number, number]; exploded: [number, number, number];
    }> = [
      { name: "Prop 1", pos: [-0.85, 0.16, -0.85], exploded: [-3, 2.2, -3] },
      { name: "Prop 2", pos: [0.85, 0.16, -0.85], exploded: [3, 2.2, -3] },
      { name: "Prop 3", pos: [-0.85, 0.16, 0.85], exploded: [-3, -1.8, 3] },
      { name: "Prop 4", pos: [0.85, 0.16, 0.85], exploded: [3, -1.8, 3] },
    ];
    propPositions.forEach((pp) => {
      const g = new THREE.Group();
      const m = mkStandard({
        color: 0x93c5fd, metalness: 0.5, roughness: 0.3,
        emissive: 0x3b82f6, emissiveIntensity: 0.5,
        transparent: true, opacity: 0.85,
      });
      const blade1 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.015, 0.06), m);
      const blade2 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.015, 0.06), m);
      blade2.rotation.y = Math.PI / 2;
      g.add(blade1, blade2);
      addPart(pp.name, "Propeller Set", g, pp.pos, pp.exploded, 0.09, m, {
        showLabel: pp.name === "Prop 1",
        isPropeller: true,
      });
    });

    // 14. Flight Controller
    {
      const g = new THREE.Group();
      const m = mkStandard({ color: 0x166534, metalness: 0.4, roughness: 0.5,
        emissive: 0x16a34a, emissiveIntensity: 0.15 });
      g.add(new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.03, 0.35), m));
      addPart("Flight Controller", "Flight Controller", g, [0, 0.12, 0], [0, 2.5, 0], 0.04, m);
    }

    // 15. GPS Module + antenna
    {
      const g = new THREE.Group();
      const m = mkStandard({ color: 0x1e3a8a, metalness: 0.5, roughness: 0.4 });
      g.add(new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.04, 0.18), m));
      const antMat = mkStandard({ color: 0x64748b, metalness: 0.7, roughness: 0.3 });
      const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.12, 12), antMat);
      ant.position.y = 0.08;
      g.add(ant);
      addPart("GPS", "GPS + Compass", g, [0, 0.18, -0.15], [0, 3, -0.8], 0.06, m);
    }

    // 16. Battery
    {
      const g = new THREE.Group();
      const m = mkStandard({ color: 0x111827, metalness: 0.3, roughness: 0.7 });
      g.add(new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.12, 0.28), m));
      addPart("Battery", "LiPo Battery", g, [0, -0.16, 0], [0, -2.5, 0], 0.03, m);
    }

    // 17. Receiver
    {
      const g = new THREE.Group();
      const m = mkStandard({ color: 0x7c3aed, metalness: 0.4, roughness: 0.4,
        emissive: 0x7c3aed, emissiveIntensity: 0.2 });
      g.add(new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.03, 0.12), m));
      addPart("Receiver", "RC Receiver", g, [0.1, 0.1, 0.1], [-1.8, 2, 0], 0.08, m);
    }

    // ESCs 18..21
    const escPositions: Array<{
      name: PartName; pos: [number, number, number]; exploded: [number, number, number];
    }> = [
      { name: "ESC 1", pos: [-0.4, 0.05, -0.4], exploded: [-1.5, 0.8, -1.5] },
      { name: "ESC 2", pos: [0.4, 0.05, -0.4], exploded: [1.5, 0.8, -1.5] },
      { name: "ESC 3", pos: [-0.4, 0.05, 0.4], exploded: [-1.5, -0.4, 1.5] },
      { name: "ESC 4", pos: [0.4, 0.05, 0.4], exploded: [1.5, -0.4, 1.5] },
    ];
    escPositions.forEach((ep) => {
      const g = new THREE.Group();
      const m = mkStandard({ color: 0x0f172a, metalness: 0.6, roughness: 0.4 });
      g.add(new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.025, 0.1), m));
      addPart(ep.name, "Speed Controller", g, ep.pos, ep.exploded, 0.06, m, { showLabel: ep.name === "ESC 1" });
    });

    // 22-23 Landing Gear
    const buildLanding = (name: PartName, sideX: number) => {
      const g = new THREE.Group();
      const m = mkStandard({ color: 0x334155, metalness: 0.6, roughness: 0.4 });
      const cyl1 = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.3, 12), m);
      cyl1.position.set(0, 0, -0.18);
      const cyl2 = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.3, 12), m);
      cyl2.position.set(0, 0, 0.18);
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.5), m);
      bar.position.set(0, -0.15, 0);
      g.add(cyl1, cyl2, bar);
      const ex: [number, number, number] = [sideX * 1.2, -2.2, 0];
      addPart(name, "Landing Gear", g, [sideX * 0.35, -0.32, 0], ex, 0.04, m,
        { showLabel: name === "Landing L" });
    };
    buildLanding("Landing L", -1);
    buildLanding("Landing R", 1);

    // 24. Camera Gimbal
    {
      const g = new THREE.Group();
      const m = mkStandard({ color: 0x0f172a, metalness: 0.5, roughness: 0.4 });
      const housing = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.06), m);
      const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16), m);
      sphere.position.z = 0.04;
      const lensMat = mkStandard({ color: 0x60a5fa, metalness: 0.2, roughness: 0.1,
        emissive: 0x3b82f6, emissiveIntensity: 0.6 });
      const lens = new THREE.Mesh(new THREE.CircleGeometry(0.04, 24), lensMat);
      lens.position.z = 0.1;
      g.add(housing, sphere, lens);
      addPart("Camera", "Camera Gimbal", g, [0, -0.15, -0.3], [0, -2, -1.8], 0.05, m);
    }

    /* ---------------- Labels (HTML overlay) ---------------- */
    const labelEls = new Map<PartName, HTMLDivElement>();
    parts.forEach((p) => {
      if (!p.showLabel) return;
      const el = document.createElement("div");
      el.textContent = p.label;
      el.className = "drone-philosophy-label";
      Object.assign(el.style, {
        position: "absolute",
        background: "rgba(15, 23, 42, 0.85)",
        border: "1px solid #3b82f6",
        borderRadius: "6px",
        padding: "4px 10px",
        color: "#ffffff",
        fontSize: "11px",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        pointerEvents: "none",
        whiteSpace: "nowrap",
        opacity: "0",
        transition: "opacity 0.4s, transform 0.2s",
        transform: "translate(-50%, -50%)",
        backdropFilter: "blur(4px)",
        zIndex: "5",
        userSelect: "none",
      } as CSSStyleDeclaration);
      overlay.appendChild(el);
      labelEls.set(p.name, el);
    });

    /* ---------------- Sizing ---------------- */
    const resize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      trailCanvas.width = w;
      trailCanvas.height = h;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    /* ---------------- Mouse / Touch parallax ---------------- */
    const mouse = { x: 0, y: 0, inside: false };
    let cameraTargetX = 0;
    let cameraTargetY = 1.5;

    const onPointerMove = (clientX: number, clientY: number) => {
      const rect = wrap.getBoundingClientRect();
      const inside =
        clientX >= rect.left && clientX <= rect.right &&
        clientY >= rect.top && clientY <= rect.bottom;
      mouse.inside = inside;
      if (inside) {
        mouse.x = (clientX - rect.left - rect.width / 2) / rect.width;
        mouse.y = (clientY - rect.top - rect.height / 2) / rect.height;
        addTrailPoint(clientX - rect.left, clientY - rect.top);
      }
    };
    const handleMouse = (e: MouseEvent) => onPointerMove(e.clientX, e.clientY);
    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    window.addEventListener("mousemove", handleMouse);
    wrap.addEventListener("touchmove", handleTouch, { passive: true });
    wrap.addEventListener("touchstart", handleTouch, { passive: true });
    wrap.addEventListener("mouseleave", () => { mouse.inside = false; });

    /* ---------------- Cursor trail ---------------- */
    const trailCtx = trailCanvas.getContext("2d");
    type TrailPoint = { x: number; y: number; t: number };
    const trail: TrailPoint[] = [];
    const addTrailPoint = (x: number, y: number) => {
      trail.push({ x, y, t: performance.now() });
      if (trail.length > 20) trail.shift();
    };
    const drawTrail = () => {
      if (!trailCtx) return;
      trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
      const now = performance.now();
      for (const p of trail) {
        const age = now - p.t;
        if (age > 600) continue;
        const a = (1 - age / 600) * 0.5;
        trailCtx.beginPath();
        trailCtx.fillStyle = `rgba(96, 165, 250, ${a})`;
        trailCtx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        trailCtx.fill();
      }
    };

    /* ---------------- Hover detection (raycaster) ---------------- */
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    let hoveredPart: Part | null = null;
    const getHoveredPart = (): Part | null => {
      if (!mouse.inside) return null;
      ndc.set(mouse.x * 2, -mouse.y * 2);
      raycaster.setFromCamera(ndc, camera);
      const meshes: THREE.Object3D[] = [];
      parts.forEach((p) => p.group.traverse((o) => { if ((o as THREE.Mesh).isMesh) meshes.push(o); }));
      const hits = raycaster.intersectObjects(meshes, false);
      if (hits.length === 0) return null;
      const hit = hits[0].object;
      return parts.find((p) => {
        let found = false;
        p.group.traverse((o) => { if (o === hit) found = true; });
        return found;
      }) || null;
    };

    /* ---------------- Phase / animation state ---------------- */
    let phase: Phase = "assembled";
    let running = true;
    let visible = false;
    let started = false;
    const clock = new THREE.Clock();
    const propellerSpin = { v: 0.18 }; // radians per frame baseline

    const setPhase = (p: Phase) => {
      phase = p;
      const pill = phasePillRef.current;
      if (!pill) return;
      const styles: Record<Phase, { dot: string; text: string; color: string; pulse: boolean }> = {
        assembled:     { dot: "●", text: "DRONE READY",    color: "#60a5fa", pulse: false },
        disassembling: { dot: "◎", text: "DISASSEMBLING",  color: "#fb923c", pulse: true  },
        floating:      { dot: "○", text: "EXPLORE PARTS",  color: "#22d3ee", pulse: false },
        assembling:    { dot: "◎", text: "ASSEMBLING",     color: "#34d399", pulse: true  },
      };
      const s = styles[p];
      pill.innerHTML =
        `<span style="color:${s.color};display:inline-block;${s.pulse ? "animation:dpPulse 1s infinite;" : ""}">${s.dot}</span> ${s.text}`;
    };

    /* ---------------- Sequence ---------------- */
    const wait = (ms: number) =>
      new Promise<void>((resolve) => setTimeout(() => resolve(), ms));

    const runDisassemble = (): Promise<void> =>
      new Promise((resolve) => {
        // Red flash
        gsap.fromTo(flash,
          { intensity: 0 },
          { intensity: 3, duration: 0.15, ease: "power2.out", yoyo: true, repeat: 1,
            onStart: () => { flash.color.setHex(0xef4444); }
          }
        );

        const tl = gsap.timeline({ onComplete: () => resolve() });
        const find = (n: PartName) => parts.find((p) => p.name === n)!.group.position;
        const ex = (n: PartName) => parts.find((p) => p.name === n)!.explodedPos;

        // Fuselage
        tl.to(find("Fuselage"), { y: ex("Fuselage").y, duration: 1.5, ease: "power2.out" }, 0);

        // Arms
        const armEases: Array<[PartName, number]> = [
          ["Arm FL", 0], ["Arm FR", 0.08], ["Arm RL", 0.16], ["Arm RR", 0.24],
        ];
        armEases.forEach(([n, t]) => {
          tl.to(find(n), { x: ex(n).x, y: ex(n).y, z: ex(n).z, duration: 1.2, ease: "power3.out" }, t);
        });

        // Motors
        const motorEases: Array<[PartName, number]> = [
          ["Motor 1", 0.1], ["Motor 2", 0.2], ["Motor 3", 0.3], ["Motor 4", 0.35],
        ];
        motorEases.forEach(([n, t]) => {
          tl.to(find(n), { x: ex(n).x, y: ex(n).y, z: ex(n).z, duration: 1, ease: "expo.out" }, t);
        });

        // Propellers
        const propEases: Array<[PartName, number]> = [
          ["Prop 1", 0.15], ["Prop 2", 0.25], ["Prop 3", 0.32], ["Prop 4", 0.38],
        ];
        propEases.forEach(([n, t]) => {
          tl.to(find(n), { x: ex(n).x, y: ex(n).y, z: ex(n).z, duration: 0.9, ease: "expo.out" }, t);
        });

        tl.to(find("Flight Controller"), { y: ex("Flight Controller").y, duration: 1.1, ease: "power3.out" }, 0.4);
        tl.to(find("GPS"), { y: ex("GPS").y, z: ex("GPS").z, duration: 1, ease: "power3.out" }, 0.45);
        tl.to(find("Battery"), { y: ex("Battery").y, duration: 1.2, ease: "power3.out" }, 0.5);
        tl.to(find("Receiver"), { x: ex("Receiver").x, y: ex("Receiver").y, z: ex("Receiver").z, duration: 1, ease: "power3.out" }, 0.55);

        // ESCs
        const escEases: Array<[PartName, number]> = [
          ["ESC 1", 0.6], ["ESC 2", 0.65], ["ESC 3", 0.7], ["ESC 4", 0.72],
        ];
        escEases.forEach(([n, t]) => {
          tl.to(find(n), { x: ex(n).x, y: ex(n).y, z: ex(n).z, duration: 1, ease: "expo.out" }, t);
        });

        tl.to(find("Landing L"), { x: ex("Landing L").x, y: ex("Landing L").y, z: ex("Landing L").z, duration: 1.1, ease: "power3.out" }, 0.75);
        tl.to(find("Landing R"), { x: ex("Landing R").x, y: ex("Landing R").y, z: ex("Landing R").z, duration: 1.1, ease: "power3.out" }, 0.78);
        tl.to(find("Camera"), { y: ex("Camera").y, z: ex("Camera").z, duration: 1, ease: "power3.out" }, 0.8);
      });

    const runAssemble = (): Promise<void> =>
      new Promise((resolve) => {
        const order: PartName[] = [
          "Landing L", "Landing R",
          "ESC 1", "ESC 2", "ESC 3", "ESC 4",
          "Battery",
          "Receiver",
          "Arm FL", "Arm FR", "Arm RL", "Arm RR",
          "Motor 1", "Motor 2", "Motor 3", "Motor 4",
          "Prop 1", "Prop 2", "Prop 3", "Prop 4",
          "GPS",
          "Flight Controller",
          "Camera",
          "Fuselage",
        ];
        const tl = gsap.timeline({ onComplete: () => {
          // Final pulse ring + rise
          spawnPulseRing();
          gsap.to(droneRoot.position, {
            y: 0.2, duration: 0.5, ease: "power2.out", yoyo: true, repeat: 1,
          });
          resolve();
        }});
        order.forEach((n, i) => {
          const part = parts.find((p) => p.name === n)!;
          const at = i * 0.12;
          tl.to(part.group.position, {
            x: part.assembledPos.x,
            y: part.assembledPos.y,
            z: part.assembledPos.z,
            duration: 0.8,
            ease: "elastic.out(1.2, 0.5)",
            onStart: () => {
              // Snap blue light at part position
              const snap = new THREE.PointLight(0x3b82f6, 0, 4);
              snap.position.copy(part.assembledPos);
              scene.add(snap);
              gsap.to(snap, {
                intensity: 4, duration: 0.12, ease: "power2.out",
                yoyo: true, repeat: 1,
                onComplete: () => {
                  scene.remove(snap);
                  snap.dispose();
                },
              });
              // Scale bounce
              gsap.fromTo(part.group.scale,
                { x: 1, y: 1, z: 1 },
                { x: 1.15, y: 1.15, z: 1.15, duration: 0.12, ease: "power2.out",
                  yoyo: true, repeat: 1 }
              );
            },
          }, at);
        });
      });

    // Pulse ring (spawned at completion)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6, transparent: true, opacity: 0, side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.5, 0.55, 48), ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.scale.set(0.001, 0.001, 0.001);
    scene.add(ring);
    const spawnPulseRing = () => {
      ring.scale.set(0.001, 0.001, 0.001);
      ringMat.opacity = 1;
      gsap.to(ring.scale, { x: 6, y: 6, z: 6, duration: 1.2, ease: "power2.out" });
      gsap.to(ringMat, { opacity: 0, duration: 1.2, ease: "power2.out" });
    };

    const playSequence = async () => {
      while (running) {
        setPhase("assembled");
        await wait(3000);
        if (!running) return;

        setPhase("disassembling");
        await runDisassemble();
        if (!running) return;

        setPhase("floating");
        await wait(4000);
        if (!running) return;

        setPhase("assembling");
        await runAssemble();
        if (!running) return;

        await wait(1000);
      }
    };

    /* ---------------- Render loop ---------------- */
    let rafId = 0;
    const tmpVec = new THREE.Vector3();

    const render = () => {
      if (!visible) {
        rafId = requestAnimationFrame(render);
        return;
      }
      const dt = clock.getDelta();
      const t = clock.elapsedTime;

      // Hover detection
      const newHover = getHoveredPart();
      if (newHover !== hoveredPart) {
        hoveredPart = newHover;
      }

      // Per-part updates
      parts.forEach((p, i) => {
        // Propeller spin
        if (p.isPropeller) p.group.rotation.y += propellerSpin.v;

        // Phase-specific behaviors
        if (phase === "assembled") {
          // Drone-wide handled at root
          // Motor pulse
          if (p.name.startsWith("Motor") && p.mat) {
            p.mat.emissiveIntensity = 0.2 + Math.sin(t * 2) * 0.15;
          }
        } else if (phase === "floating") {
          const bobSpeed = 0.6 + i * 0.07;
          const bobAmp = 0.08 + (i % 3) * 0.02;
          const bobOffset = i * 0.4;
          // Bob around exploded base position
          p.group.position.y = p.explodedPos.y + Math.sin(t * bobSpeed + bobOffset) * bobAmp;
          p.group.rotation.y += (0.003 + i * 0.001) * dt * 60;

          // Mouse parallax around exploded base
          if (mouse.inside) {
            const targetX = p.explodedPos.x + mouse.x * (p.parallax * 8);
            const targetZ = p.explodedPos.z + mouse.y * (p.parallax * 4);
            p.group.position.x += (targetX - p.group.position.x) * 0.05;
            p.group.position.z += (targetZ - p.group.position.z) * 0.05;
          } else {
            // ease back
            p.group.position.x += (p.explodedPos.x - p.group.position.x) * 0.04;
            p.group.position.z += (p.explodedPos.z - p.group.position.z) * 0.04;
          }
        }

        // Hover highlight
        if (p.mat) {
          const target = hoveredPart === p ? 0.8 : (p.name.startsWith("Motor") ? 0.3 : (p.mat.emissive.getHex() ? 0.2 : 0));
          // use gentle lerp on emissive intensity (skip during assembled motor pulse)
          if (!(phase === "assembled" && p.name.startsWith("Motor"))) {
            p.mat.emissiveIntensity += (target - p.mat.emissiveIntensity) * 0.1;
          }
        }
        const targetScale = hoveredPart === p ? 1.08 : 1;
        p.group.scale.x += (targetScale - p.group.scale.x) * 0.1;
        p.group.scale.y += (targetScale - p.group.scale.y) * 0.1;
        p.group.scale.z += (targetScale - p.group.scale.z) * 0.1;
      });

      // Drone group behavior in assembled phase
      if (phase === "assembled") {
        droneRoot.rotation.y += 0.004;
        droneRoot.position.y = Math.sin(t * 0.8) * 0.06;

        // Tilt toward cursor when inside
        if (mouse.inside) {
          const tiltMax = (12 * Math.PI) / 180;
          const tx = -mouse.y * tiltMax;
          const tz = mouse.x * tiltMax;
          droneRoot.rotation.x += (tx - droneRoot.rotation.x) * 0.03;
          droneRoot.rotation.z += (tz - droneRoot.rotation.z) * 0.03;
        } else {
          droneRoot.rotation.x += (0 - droneRoot.rotation.x) * 0.03;
          droneRoot.rotation.z += (0 - droneRoot.rotation.z) * 0.03;
        }
      } else {
        droneRoot.rotation.x += (0 - droneRoot.rotation.x) * 0.04;
        droneRoot.rotation.z += (0 - droneRoot.rotation.z) * 0.04;
        if (phase !== "floating") {
          droneRoot.position.y += (0 - droneRoot.position.y) * 0.05;
        } else {
          droneRoot.position.y = Math.sin(t * 0.5) * 0.04;
          droneRoot.rotation.y += 0.001;
        }
      }

      // Camera parallax
      cameraTargetX = mouse.inside ? mouse.x * 0.8 : 0;
      cameraTargetY = (mouse.inside ? -mouse.y * 0.5 : 0) + 1.5;
      camera.position.x += (cameraTargetX - camera.position.x) * 0.04;
      camera.position.y += (cameraTargetY - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // Labels
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      labelEls.forEach((el, name) => {
        const part = parts.find((p) => p.name === name);
        if (!part) return;
        part.group.getWorldPosition(tmpVec);
        tmpVec.project(camera);
        const x = (tmpVec.x + 1) / 2 * w;
        const y = -(tmpVec.y - 1) / 2 * h;
        // Visibility: only in floating phase OR on hover
        const visibleNow =
          (phase === "floating" || hoveredPart === part) &&
          tmpVec.z < 1 &&
          x > -50 && x < w + 50 && y > -50 && y < h + 50;
        el.style.transform = `translate(calc(${x}px - 50%), calc(${y - 28}px - 50%))`;
        el.style.opacity = visibleNow ? (hoveredPart === part ? "1" : "0.85") : "0";
      });

      drawTrail();

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(render);
    };

    /* ---------------- IntersectionObserver auto-trigger ---------------- */
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          visible = e.isIntersecting && e.intersectionRatio >= 0.4;
          if (visible && !started) {
            started = true;
            playSequence();
            // Hide hint after 3s
            setTimeout(() => {
              if (hintRef.current) hintRef.current.style.opacity = "0";
            }, 3000);
          }
        });
      },
      { threshold: [0, 0.4, 1] }
    );
    io.observe(wrap);

    setPhase("assembled");
    rafId = requestAnimationFrame(render);

    /* ---------------- Cleanup ---------------- */
    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("mousemove", handleMouse);
      wrap.removeEventListener("touchmove", handleTouch);
      wrap.removeEventListener("touchstart", handleTouch);

      gsap.killTweensOf("*");

      labelEls.forEach((el) => el.remove());
      labelEls.clear();

      // Dispose Three.js
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.geometry?.dispose();
          const m = mesh.material;
          if (Array.isArray(m)) m.forEach((mm) => mm.dispose());
          else if (m) (m as THREE.Material).dispose();
        }
      });
      ringMat.dispose();
      ring.geometry.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === wrap) {
        wrap.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "400px",
        borderRadius: "16px",
        border: "1px solid #1e3a8a",
        boxShadow: "0 0 40px rgba(59,130,246,0.15)",
        overflow: "hidden",
        position: "relative",
        cursor: "grab",
        background: "transparent",
      }}
    >
      {/* HTML overlay for labels and UI */}
      <div
        ref={overlayRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Cursor trail canvas */}
      <canvas
        ref={trailCanvasRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 3,
        }}
      />

      {/* Instruction hint */}
      <div
        ref={hintRef}
        style={{
          position: "absolute",
          top: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.5)",
          fontSize: "11px",
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
          letterSpacing: "0.05em",
          transition: "opacity 0.6s",
          opacity: 1,
          zIndex: 4,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        Move cursor to interact
      </div>

      {/* Phase indicator pill */}
      <div
        ref={phasePillRef}
        style={{
          position: "absolute",
          bottom: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "20px",
          padding: "6px 14px",
          fontSize: "11px",
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
          color: "white",
          zIndex: 4,
          pointerEvents: "none",
          backdropFilter: "blur(6px)",
          letterSpacing: "0.05em",
          fontWeight: 500,
          userSelect: "none",
        }}
      >
        ● DRONE READY
      </div>

      {/* Pulse keyframes for status dot */}
      <style>{`
        @keyframes dpPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}

export default DronePhilosophy;
