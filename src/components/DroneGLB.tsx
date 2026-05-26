import { Canvas, useLoader } from "@react-three/fiber";
import { Environment, useGLTF, Center, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useState, useMemo } from "react";
import * as THREE from "three";

/**
 * DroneGLB
 * --------
 * Static 3D drone model rendered from /models/drone.glb.
 * - No mouse interaction, no rotation, no orbit controls.
 * - Subtle idle float animation only.
 * - Used as a decorative right-column element.
 */

if (typeof window !== "undefined") {
  useGLTF.preload("/models/drone.glb");
}

function DroneMesh() {
  const { scene } = useGLTF("/models/drone.glb");

  // Clone the scene so that each render/mount has a unique 3D hierarchy instance
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // Make sure all meshes look reasonable on first paint:
  // shadows on, sensible material defaults if the GLB ships without them.
  useEffect(() => {
    clonedScene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [clonedScene]);

  return (
    <Center>
      <primitive object={clonedScene} scale={1.8} />
    </Center>
  );
}

function Fallback() {
  // Simple wireframe placeholder while the GLB loads.
  return (
    <mesh>
      <boxGeometry args={[0.8, 0.2, 0.8]} />
      <meshStandardMaterial color="#1d4ed8" wireframe />
    </mesh>
  );
}

export function DroneGLB({ height = 420 }: { height?: number | string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div style={{ width: "100%", height }} />;
  }

  return (
    <div
      style={{
        width: "100%",
        height,
        cursor: "grab",
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
          <OrbitControls enableZoom={false} enablePan={false} autoRotate={true} autoRotateSpeed={0.8} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default DroneGLB;
