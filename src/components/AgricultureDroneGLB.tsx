import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF, ContactShadows } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * AgricultureDroneGLB
 * -------------------
 * Renders /models/agriculture-drone.glb prominently on the page.
 *
 * - Auto-normalizes the model: regardless of how the GLB was exported,
 *   it is recentered and rescaled so the longest edge fills the canvas.
 * - Cursor-driven yaw + tilt with strong, smooth response.
 * - Idle auto-rotation underneath the cursor offset so it never feels static.
 * - Client-only render (SSR-safe).
 */

interface DroneSceneProps {
  /** Multiplies the auto-fit scale. 1 = exactly fits, >1 zooms in. */
  scaleBoost?: number;
  /** Reference back to the wrapper so pointer events scope properly. */
  wrapperRef: React.MutableRefObject<HTMLDivElement | null>;
}

function AgriDroneMesh({ scaleBoost = 1, wrapperRef }: DroneSceneProps) {
  const { scene } = useGLTF("/models/agriculture-drone.glb");
  const groupRef = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const hovered = useRef(false);

  // Auto-normalize: clone, recenter, rescale, polish materials.
  const fitted = useMemo(() => {
    const root = scene.clone(true);
    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    // Target world size of 2.6 fills our 38° FOV camera at z≈3.5 nicely.
    const fitScale = (2.6 / maxDim) * scaleBoost;
    root.position.sub(center).multiplyScalar(fitScale);
    root.scale.setScalar(fitScale);

    root.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        const m = mesh.material as THREE.MeshStandardMaterial;
        if (m && "metalness" in m) {
          m.metalness = Math.min(1, (m.metalness ?? 0.5) + 0.12);
          m.roughness = Math.max(0.18, (m.roughness ?? 0.6) - 0.08);
          m.envMapIntensity = 1.5;
          m.needsUpdate = true;
        }
      }
    });
    return root;
  }, [scene, scaleBoost]);

  // Pointer tracking — scoped to the wrapper so multiple drones don't fight.
  useEffect(() => {
    const wrap = wrapperRef.current;
    if (!wrap) return;

    const update = (clientX: number, clientY: number) => {
      const rect = wrap.getBoundingClientRect();
      const inside =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;
      hovered.current = inside;
      if (!inside) {
        // Ease back to neutral once cursor leaves.
        target.current.x = 0;
        target.current.y = 0;
        return;
      }
      const nx = (clientX - rect.left) / rect.width - 0.5;
      const ny = (clientY - rect.top) / rect.height - 0.5;
      target.current.x = nx;
      target.current.y = ny;
    };

    const onMouse = (e: MouseEvent) => update(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      update(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onLeave = () => {
      hovered.current = false;
      target.current.x = 0;
      target.current.y = 0;
    };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch, { passive: true });
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, [wrapperRef]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Strong but smooth lerp toward cursor target
    current.current.x += (target.current.x - current.current.x) * 0.1;
    current.current.y += (target.current.y - current.current.y) * 0.1;

    // Continuous idle drift on top of cursor offset
    const baseY = (groupRef.current.userData.baseY ?? 0) + 0.004;
    groupRef.current.userData.baseY = baseY;

    // Big rotation range so motion is obvious
    const cursorYaw = current.current.x * Math.PI * 0.45;   // ±~80°
    const cursorPitch = current.current.y * Math.PI * 0.25; // ±~45°
    groupRef.current.rotation.y = baseY + cursorYaw;
    groupRef.current.rotation.x = cursorPitch;

    // Idle bob + cursor-driven horizontal nudge
    groupRef.current.position.y = Math.sin(t * 0.9) * 0.08;
    groupRef.current.position.x = current.current.x * 0.25;
  });

  return (
    <group ref={groupRef}>
      <primitive object={fitted} />
    </group>
  );
}

function Fallback() {
  return (
    <mesh>
      <boxGeometry args={[0.8, 0.2, 0.8]} />
      <meshStandardMaterial color="#1d4ed8" wireframe />
    </mesh>
  );
}

export function AgricultureDroneGLB({
  height = 520,
  scale = 1.15,
}: {
  height?: number | string;
  /** >1 zooms past auto-fit. Auto-fit already maxes the canvas. */
  scale?: number;
}) {
  const [mounted, setMounted] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    useGLTF.preload("/models/agriculture-drone.glb");
  }, []);

  if (!mounted) {
    return <div style={{ width: "100%", height }} />;
  }

  return (
    <div
      ref={wrapperRef}
      style={{
        width: "100%",
        height,
        cursor: "grab",
        position: "relative",
      }}
    >
      <Canvas
        shadows
        camera={{ position: [3.0, 1.2, 3.6], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight
          position={[5, 7, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-3, 2, -2]} intensity={1.0} color="#3b82f6" />
        <pointLight position={[2, -1, 3]} intensity={0.6} color="#60a5fa" />

        <Suspense fallback={<Fallback />}>
          <AgriDroneMesh scaleBoost={scale} wrapperRef={wrapperRef} />
          <Environment preset="city" />
        </Suspense>

        <ContactShadows
          position={[0, -1.4, 0]}
          opacity={0.35}
          scale={8}
          blur={2.5}
          far={2.5}
          color="#0a1628"
        />
      </Canvas>
    </div>
  );
}

export default AgricultureDroneGLB;
