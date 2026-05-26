import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState, Suspense, useEffect } from "react";
import type { Group } from "three";


function Propeller({ position }: { position: [number, number, number] }) {
  const ref = useRef<Group>(null);
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.5;
  });
  return (
    <group ref={ref} position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.5, 0.02, 0.06]} />
        <meshStandardMaterial
          color="#93c5fd"
          emissive="#3b82f6"
          emissiveIntensity={0.5}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      <mesh castShadow rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.5, 0.02, 0.06]} />
        <meshStandardMaterial
          color="#93c5fd"
          emissive="#3b82f6"
          emissiveIntensity={0.5}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

function Drone({ hovered }: { hovered: boolean }) {
  const group = useRef<Group>(null);
  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.y += hovered ? 0.02 : 0.005;
    group.current.position.y = Math.sin(Date.now() * 0.001) * 0.15;
  });

  const arms: [number, number, number][] = [
    [0.45, 0, 0.45],
    [-0.45, 0, 0.45],
    [0.45, 0, -0.45],
    [-0.45, 0, -0.45],
  ];

  return (
    <group ref={group}>
      {/* Fuselage */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.15, 0.8]} />
        <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Arms */}
      {arms.map((p, i) => {
        const angle = Math.atan2(p[2], p[0]);
        return (
          <mesh
            key={`arm-${i}`}
            position={[p[0] / 2, 0, p[2] / 2]}
            rotation={[0, -angle, 0]}
            castShadow
          >
            <boxGeometry args={[0.8, 0.08, 0.12]} />
            <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
          </mesh>
        );
      })}

      {/* Motors */}
      {arms.map((p, i) => (
        <mesh key={`motor-${i}`} position={[p[0], 0.05, p[2]]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.1, 24]} />
          <meshStandardMaterial color="#1d4ed8" metalness={0.9} roughness={0.25} />
        </mesh>
      ))}

      {/* Propellers */}
      {arms.map((p, i) => (
        <Propeller key={`prop-${i}`} position={[p[0], 0.13, p[2]]} />
      ))}

      {/* Landing gear */}
      {arms.map((p, i) => (
        <mesh key={`gear-${i}`} position={[p[0] * 0.7, -0.2, p[2] * 0.7]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
          <meshStandardMaterial color="#1e3a5f" metalness={0.5} roughness={0.5} />
        </mesh>
      ))}

      {/* Center status light */}
      <mesh position={[0, 0.09, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#3b82f6"
          emissiveIntensity={1.2}
        />
      </mesh>
    </group>
  );
}

export function DroneModel() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      style={{ width: "100%", height: 400, cursor: "grab" }}
    >
      <Canvas shadows camera={{ position: [3, 2, 3], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[2, 2, 2]} intensity={1} color="#3b82f6" />
        <pointLight position={[-2, -1, -2]} intensity={0.5} color="#ffffff" />
        <pointLight position={[0, -2, 0]} intensity={0.8} color="#60a5fa" />
        <Suspense fallback={null}>
          <Drone hovered={hovered} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}
