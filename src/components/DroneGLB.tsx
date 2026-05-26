import { Canvas } from "@react-three/fiber";
import { Environment, useGLTF, Center } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import * as THREE from "three";

/**
 * DroneGLB
 * --------
 * Static 3D drone model rendered from /models/drone.glb.
 * - No mouse interaction, no rotation, no orbit controls.
 * - Subtle idle float animation only (driven by parent CSS).
 * - Used as a decorative right-column element on the hero.
 *
 * NOTE: All Three.js + GLTF code is gated behind a `mounted` flag so it
 * never executes during SSR (which has no XHR, no DOM, and can't load
 * a relative GLB URL).
 */

function DroneMesh() {
  const { scene } = useGLTF("/models/drone.glb");

  useEffect(() => {
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <Center>
      <primitive object={scene} scale={1.2} />
    </Center>
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

export function DroneGLB({ height = 420 }: { height?: number | string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Preload only on the client — module-top-level preload breaks SSR.
    useGLTF.preload("/models/drone.glb");
  }, []);

  if (!mounted) {
    return <div style={{ width: "100%", height }} />;
  }

  return (
    <div
      style={{
        width: "100%",
        height,
        pointerEvents: "none", // not movable / not interactive
      }}
    >
      <Canvas
        shadows
        camera={{ position: [3, 1.2, 3.5], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.45} />
        <directionalLight
          position={[4, 6, 4]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-3, 2, -2]} intensity={0.8} color="#3b82f6" />
        <pointLight position={[2, -1, 3]} intensity={0.5} color="#60a5fa" />

        <Suspense fallback={<Fallback />}>
          <DroneMesh />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default DroneGLB;
