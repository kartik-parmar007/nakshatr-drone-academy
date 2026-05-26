import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF, Center, ContactShadows } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * DroneGLB
 * --------
 * Hero 3D drone rendered from /models/drone.glb.
 *
 * - Cursor interactive: drone gently tilts and rotates to follow the cursor
 *   (premium feel — smooth lerps, no orbit controls jank).
 * - Scaled prominently for the hero section.
 * - Subtle idle float and slow auto-rotation when the cursor isn't engaged.
 * - Client-only rendering (preload + Three.js gated behind `mounted` so SSR
 *   never tries to fetch the GLB).
 */

function DroneMesh({ scale = 1.6 }: { scale?: number }) {
  const { scene } = useGLTF("/models/drone.glb");
  const groupRef = useRef<THREE.Group>(null);
  const { size } = useThree();
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  // Polish materials so real GLB metals pick up reflections
  useEffect(() => {
    scene.traverse((obj) => {
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
  }, [scene]);

  // Track pointer relative to the canvas
  useEffect(() => {
    const handlePointer = (e: PointerEvent) => {
      // Find the canvas inside the wrapper to anchor coordinates
      const canvas = document.querySelector<HTMLCanvasElement>(
        "[data-drone-glb] canvas",
      );
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!inside) {
        // Pull back toward neutral so it returns to idle when the cursor leaves.
        target.current.x = 0;
        target.current.y = 0;
        return;
      }
      const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      target.current.x = nx;
      target.current.y = ny;
    };
    window.addEventListener("pointermove", handlePointer);
    return () => window.removeEventListener("pointermove", handlePointer);
  }, [size.width, size.height]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Smoothly track cursor target
    current.current.x += (target.current.x - current.current.x) * 0.06;
    current.current.y += (target.current.y - current.current.y) * 0.06;

    // Idle: slow auto-rotate when cursor is at rest
    const idleSpin = 0.0035;
    const cursorBoost = Math.abs(current.current.x) * 0.6;
    const baseY = (groupRef.current.userData.baseY ?? 0) + idleSpin;
    groupRef.current.userData.baseY = baseY;

    // Final rotation = idle drift + cursor offset (max ~25 deg horizontal, 15 vert)
    groupRef.current.rotation.y =
      baseY + current.current.x * Math.PI * 0.25 - cursorBoost * 0.05;
    groupRef.current.rotation.x = current.current.y * Math.PI * 0.18;

    // Subtle float
    groupRef.current.position.y = Math.sin(t * 0.9) * 0.06;
    // Slight side drift toward cursor
    groupRef.current.position.x = current.current.x * 0.15;
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={scene} scale={scale} />
      </Center>
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
  height = 560,
  scale = 1.6,
}: {
  height?: number | string;
  scale?: number;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    useGLTF.preload("/models/drone.glb");
  }, []);

  if (!mounted) {
    return <div style={{ width: "100%", height }} />;
  }

  return (
    <div
      data-drone-glb
      style={{
        width: "100%",
        height,
        cursor: "grab",
        position: "relative",
      }}
    >
      <Canvas
        shadows
        camera={{ position: [3.2, 1.4, 3.6], fov: 36 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 7, 5]}
          intensity={1.6}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-3, 2, -2]} intensity={1.0} color="#3b82f6" />
        <pointLight position={[2, -1, 3]} intensity={0.6} color="#60a5fa" />

        <Suspense fallback={<Fallback />}>
          <DroneMesh scale={scale} />
          <Environment preset="city" />
        </Suspense>

        <ContactShadows
          position={[0, -1.0, 0]}
          opacity={0.35}
          scale={6}
          blur={2.5}
          far={2}
          color="#0a1628"
        />
      </Canvas>
    </div>
  );
}

export default DroneGLB;
