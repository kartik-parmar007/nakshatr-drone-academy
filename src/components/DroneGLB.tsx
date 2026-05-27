import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF, ContactShadows } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * DroneGLB
 * --------
 * Responsive 3D drone hero. Fills its parent container (use Tailwind classes
 * on the wrapper to control responsive sizing).
 *
 * - Auto-fits the GLB regardless of native scale.
 * - Camera position adapts to canvas aspect ratio so the drone never gets
 *   cut off on narrow / tall mobile screens.
 * - Smooth cursor + touch tracking with strong rotation range.
 * - Client-only render (SSR-safe).
 */

interface DroneSceneProps {
  scaleBoost?: number;
  wrapperRef: React.MutableRefObject<HTMLDivElement | null>;
}

function CameraRig() {
  const { camera, size } = useThree();

  useEffect(() => {
    const aspect = size.width / size.height;
    // Pull the camera back when the canvas is narrow (mobile portrait) so the
    // drone always fits horizontally. Push in slightly when wide.
    const dist = aspect < 1 ? 5.4 : aspect < 1.4 ? 4.4 : 3.7;
    const fov = aspect < 1 ? 42 : aspect < 1.4 ? 38 : 36;

    camera.position.set(dist * 0.85, dist * 0.36, dist);
    if ("fov" in camera) {
      (camera as THREE.PerspectiveCamera).fov = fov;
      (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
    }
    camera.lookAt(0, 0, 0);
  }, [camera, size.width, size.height]);

  return null;
}

function DroneMesh({ scaleBoost = 1, wrapperRef }: DroneSceneProps) {
  const { scene } = useGLTF("/models/drone.glb");
  const groupRef = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  // Auto-normalize the model: clone, recenter, rescale so longest edge fills
  // a known world size regardless of how the GLB was authored.
  const fitted = useMemo(() => {
    const root = scene.clone(true);
    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
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
          m.metalness = Math.min(1, (m.metalness ?? 0.5) + 0.15);
          m.roughness = Math.max(0.15, (m.roughness ?? 0.6) - 0.1);
          m.envMapIntensity = 1.5;
          m.needsUpdate = true;
        }
      }
    });
    return root;
  }, [scene, scaleBoost]);

  // Wrapper-scoped pointer tracking (mouse + touch)
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
      if (!inside) {
        target.current.x = 0;
        target.current.y = 0;
        return;
      }
      target.current.x = (clientX - rect.left) / rect.width - 0.5;
      target.current.y = (clientY - rect.top) / rect.height - 0.5;
    };

    const onMouse = (e: MouseEvent) => update(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      update(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onLeave = () => {
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

    // Smooth cursor follow
    current.current.x += (target.current.x - current.current.x) * 0.1;
    current.current.y += (target.current.y - current.current.y) * 0.1;

    // Idle yaw drift
    const baseY = (groupRef.current.userData.baseY ?? 0) + 0.0035;
    groupRef.current.userData.baseY = baseY;

    groupRef.current.rotation.y = baseY + current.current.x * Math.PI * 0.45;
    groupRef.current.rotation.x = current.current.y * Math.PI * 0.25;
    groupRef.current.position.y = Math.sin(t * 0.9) * 0.07;
    groupRef.current.position.x = current.current.x * 0.2;
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

export function DroneGLB({
  className = "",
  scale = 1.15,
  height,
}: {
  className?: string;
  scale?: number;
  /** Optional fixed height. Prefer using Tailwind classes via `className`. */
  height?: number | string;
}) {
  const [mounted, setMounted] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    useGLTF.preload("/models/drone.glb");
  }, []);

  const inlineStyle: React.CSSProperties = {
    width: "100%",
    height: height ?? "100%",
    cursor: "grab",
    position: "relative",
  };

  if (!mounted) {
    return <div className={className} style={inlineStyle} />;
  }

  return (
    <div ref={wrapperRef} className={className} style={inlineStyle}>
      <Canvas
        dpr={[1, 1.5]} // optimized DPR for retina displays to reduce GPU pixel fill rate stutters
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <CameraRig />

        <ambientLight intensity={0.65} />
        <directionalLight
          position={[5, 7, 5]}
          intensity={1.8}
        />
        <pointLight position={[-3, 2, -2]} intensity={1.2} color="#3b82f6" />
        <pointLight position={[2, -1, 3]} intensity={0.8} color="#60a5fa" />

        <Suspense fallback={<Fallback />}>
          <DroneMesh scaleBoost={scale} wrapperRef={wrapperRef} />
          <Environment preset="city" />
        </Suspense>

        <ContactShadows
          position={[0, -1.3, 0]}
          opacity={0.5} // slightly enhanced soft shadow depth
          scale={7}
          blur={2.4}
          far={2.4}
          color="#030712"
        />
      </Canvas>
    </div>
  );
}

export default DroneGLB;
