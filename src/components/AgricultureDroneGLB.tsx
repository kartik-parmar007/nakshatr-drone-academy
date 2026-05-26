import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF, Center, ContactShadows } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * AgricultureDroneGLB
 * -------------------
 * Renders /models/agriculture-drone.glb in a card-friendly canvas.
 * Cursor-aware: the drone gently tilts and yaws toward the cursor and slowly
 * auto-rotates when idle. Designed to feel premium without overpowering the
 * surrounding philosophy text.
 */

function AgriDroneMesh({ scale = 1.5 }: { scale?: number }) {
  const { scene } = useGLTF("/models/agriculture-drone.glb");
  const groupRef = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        const m = mesh.material as THREE.MeshStandardMaterial;
        if (m && "metalness" in m) {
          m.metalness = Math.min(1, (m.metalness ?? 0.5) + 0.12);
          m.roughness = Math.max(0.18, (m.roughness ?? 0.6) - 0.08);
          m.envMapIntensity = 1.4;
          m.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  useEffect(() => {
    const handlePointer = (e: PointerEvent) => {
      const canvas = document.querySelector<HTMLCanvasElement>(
        "[data-agri-drone] canvas",
      );
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!inside) {
        target.current.x = 0;
        target.current.y = 0;
        return;
      }
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      target.current.x = nx;
      target.current.y = ny;
    };
    window.addEventListener("pointermove", handlePointer);
    return () => window.removeEventListener("pointermove", handlePointer);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Smooth lerp toward cursor
    current.current.x += (target.current.x - current.current.x) * 0.06;
    current.current.y += (target.current.y - current.current.y) * 0.06;

    // Idle auto-rotation underneath the cursor offset
    const baseY = (groupRef.current.userData.baseY ?? 0) + 0.0035;
    groupRef.current.userData.baseY = baseY;

    groupRef.current.rotation.y = baseY + current.current.x * Math.PI * 0.25;
    groupRef.current.rotation.x = current.current.y * Math.PI * 0.18;
    groupRef.current.position.y = Math.sin(t * 0.9) * 0.06;
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

export function AgricultureDroneGLB({
  height = 400,
  scale = 1.5,
}: {
  height?: number | string;
  scale?: number;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    useGLTF.preload("/models/agriculture-drone.glb");
  }, []);

  if (!mounted) {
    return <div style={{ width: "100%", height }} />;
  }

  return (
    <div
      data-agri-drone
      style={{
        width: "100%",
        height,
        cursor: "grab",
        position: "relative",
      }}
    >
      <Canvas
        shadows
        camera={{ position: [3.0, 1.4, 3.5], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 7, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-3, 2, -2]} intensity={0.9} color="#3b82f6" />
        <pointLight position={[2, -1, 3]} intensity={0.6} color="#60a5fa" />

        <Suspense fallback={<Fallback />}>
          <AgriDroneMesh scale={scale} />
          <Environment preset="city" />
        </Suspense>

        <ContactShadows
          position={[0, -1.0, 0]}
          opacity={0.3}
          scale={6}
          blur={2.4}
          far={2}
          color="#0a1628"
        />
      </Canvas>
    </div>
  );
}

export default AgricultureDroneGLB;
