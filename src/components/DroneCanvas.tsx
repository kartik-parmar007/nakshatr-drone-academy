import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF, ContactShadows } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

interface DroneSceneProps {
  scaleBoost?: number;
  wrapperRef: React.MutableRefObject<HTMLDivElement | null>;
}

function CameraRig() {
  const { camera, size } = useThree();

  useEffect(() => {
    const aspect = size.width / size.height;
    
    // Adjust distance and FOV dynamically to allow a huge scale boost
    // while strictly preventing any top/bottom/left/right cropping.
    let dist = 4.4;
    let fov = 38;
    
    if (aspect < 1) {
      // Narrow screens: pull back further so the horizontal span of the large drone fits
      dist = 5.6 / aspect;
      fov = 42;
    } else if (aspect < 1.4) {
      dist = 4.8;
      fov = 38;
    } else {
      // Wide screens: keep the drone massive but vertically safe
      dist = 4.2;
      fov = 36;
    }

    camera.position.set(dist * 0.85, dist * 0.36, dist);
    if ("fov" in camera) {
      (camera as THREE.PerspectiveCamera).fov = fov;
      (camera as THREE.PerspectiveCamera).aspect = aspect;
      (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
    }
    camera.lookAt(0, 0, 0);
  }, [camera, size.width, size.height]);

  // Window resize event handler to force projection matrix updates on camera
  useEffect(() => {
    const handleResize = () => {
      if (camera && "updateProjectionMatrix" in camera) {
        (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [camera]);

  return null;
}

function DroneMesh({ scaleBoost = 1, wrapperRef }: DroneSceneProps) {
  // Load the Draco-compressed version with local Draco loader path
  const { scene } = useGLTF("/models/drone_draco.glb", "/draco/");
  const { gl, camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  // Auto-normalize the model: clone, recenter, rescale so longest edge fills
  // a known world size regardless of how the GLB was authored.
  const fitted = useMemo(() => {
    const root = scene.clone(true);
    const box = new THREE.Box3().setFromObject(root);
    const sizeVec = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(sizeVec.x, sizeVec.y, sizeVec.z) || 1;
    
    // Scale slightly down from the original (2.6 -> 2.3) to prevent blades clipping on mobile
    const fitScale = (2.3 / maxDim) * scaleBoost;
    root.position.sub(center).multiplyScalar(fitScale);
    root.scale.setScalar(fitScale);

    root.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.frustumCulled = true; // Enable frustum culling to skip rendering hidden parts
        
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

  // Pre-warm WebGL: Compile shaders and upload textures immediately to GPU during file ingestion
  useEffect(() => {
    if (fitted) {
      fitted.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.isMesh) {
          // Pre-compile geometry / shader program
          gl.compile(mesh, camera);
          
          // Pre-warm texture uploads
          const mat = mesh.material as THREE.MeshStandardMaterial;
          if (mat) {
            if (mat.map) gl.initTexture(mat.map);
            if (mat.normalMap) gl.initTexture(mat.normalMap);
            if (mat.roughnessMap) gl.initTexture(mat.roughnessMap);
            if (mat.metalnessMap) gl.initTexture(mat.metalnessMap);
          }
        }
      });
    }
  }, [fitted, gl, camera]);

  // Wrapper-scoped pointer tracking (mouse + touch) with requestAnimationFrame throttling
  useEffect(() => {
    const wrap = wrapperRef.current;
    if (!wrap) return;

    let activeFrameId: number | null = null;
    let pendingX = 0;
    let pendingY = 0;

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

    const handleMove = (clientX: number, clientY: number) => {
      pendingX = clientX;
      pendingY = clientY;
      if (activeFrameId === null) {
        activeFrameId = requestAnimationFrame(() => {
          update(pendingX, pendingY);
          activeFrameId = null;
        });
      }
    };

    const onMouse = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onLeave = () => {
      if (activeFrameId !== null) {
        cancelAnimationFrame(activeFrameId);
        activeFrameId = null;
      }
      target.current.x = 0;
      target.current.y = 0;
    };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch, { passive: true });
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      if (activeFrameId !== null) {
        cancelAnimationFrame(activeFrameId);
      }
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

    // Dispatch telemetry values to sync widgets in real-time
    const event = new CustomEvent("drone-telemetry-update", {
      detail: {
        pitch: (groupRef.current.rotation.x * (180 / Math.PI)).toFixed(1),
        yaw: ((groupRef.current.rotation.y * (180 / Math.PI)) % 360).toFixed(1),
        roll: (current.current.x * -18).toFixed(1),
        alt: (124.8 + groupRef.current.position.y * 10).toFixed(2),
        freq: (5.75 + Math.abs(current.current.x) * 0.1).toFixed(3),
        esc: Math.floor(98 + Math.abs(current.current.y) * 2),
      }
    });
    window.dispatchEvent(event);
  });

  return (
    <group ref={groupRef}>
      <primitive object={fitted} />
    </group>
  );
}

export function DroneCanvas({
  scale = 1.15,
  wrapperRef,
}: {
  scale?: number;
  wrapperRef: React.MutableRefObject<HTMLDivElement | null>;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
    >
      <CameraRig />

      <ambientLight intensity={0.55} />
      <directionalLight
        position={[5, 7, 5]}
        intensity={1.5}
      />
      <pointLight position={[-3, 2, -2]} intensity={2.0} color="#06B6D4" />
      <pointLight position={[3, -1, 3]} intensity={1.8} color="#F59E0B" />

      <DroneMesh scaleBoost={scale} wrapperRef={wrapperRef} />
      <Environment preset="city" />

      <ContactShadows
        position={[0, -1.3, 0]}
        opacity={0.5}
        scale={7}
        blur={2.4}
        far={2.4}
        color="#030712"
      />
    </Canvas>
  );
}

// Preload the model using the local Draco decoder path
useGLTF.preload("/models/drone_draco.glb", "/draco/");

export default DroneCanvas;
