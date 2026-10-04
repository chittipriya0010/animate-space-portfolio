"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Interactive Cybernetic 3D Avatar Mesh
function CyberAvatarMesh({ isHovered, setIsHovered }: { isHovered: boolean; setIsHovered: (v: boolean) => void }) {
  const avatarGroup = useRef<THREE.Group>(null);
  const headGroup = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const baseRingRef = useRef<THREE.Mesh>(null);

  // Animated continuous motion and mouse tracking
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Smooth head tracking mouse cursor
    if (headGroup.current) {
      const targetRotationY = state.pointer.x * 0.6;
      const targetRotationX = -state.pointer.y * 0.4;
      headGroup.current.rotation.y = THREE.MathUtils.lerp(headGroup.current.rotation.y, targetRotationY, 0.08);
      headGroup.current.rotation.x = THREE.MathUtils.lerp(headGroup.current.rotation.x, targetRotationX, 0.08);
    }

    // Subtle torso sway
    if (avatarGroup.current) {
      avatarGroup.current.position.y = Math.sin(time * 2) * 0.08;
      avatarGroup.current.rotation.y = THREE.MathUtils.lerp(
        avatarGroup.current.rotation.y,
        state.pointer.x * 0.25,
        0.05
      );
    }

    // Pulsing energy arc core
    if (coreRef.current) {
      const scale = 1 + Math.sin(time * 4) * 0.12 + (isHovered ? 0.25 : 0);
      coreRef.current.scale.set(scale, scale, scale);
    }

    // Holographic Gyro rings rotation
    const speedMultiplier = isHovered ? 2.5 : 1;
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.8 * speedMultiplier;
      ring1Ref.current.rotation.x += delta * 0.3 * speedMultiplier;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.6 * speedMultiplier;
      ring2Ref.current.rotation.z -= delta * 0.4 * speedMultiplier;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x += delta * 0.5 * speedMultiplier;
      ring3Ref.current.rotation.y += delta * 0.7 * speedMultiplier;
    }
    if (baseRingRef.current) {
      baseRingRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group
      ref={avatarGroup}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      position={[0, 0, 0]}
    >
      {/* ─── HEAD & HELMET GROUP ─── */}
      <group ref={headGroup} position={[0, 0.75, 0]}>
        {/* Main Sleek Helmet Shell */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshStandardMaterial
            color="#12151D"
            metalness={0.9}
            roughness={0.18}
            envMapIntensity={1.2}
          />
        </mesh>

        {/* Outer Titanium Crown Ridge */}
        <mesh position={[0, 0.15, -0.05]}>
          <boxGeometry args={[0.3, 0.55, 0.75]} />
          <meshStandardMaterial color="#1C212D" metalness={0.85} roughness={0.25} />
        </mesh>

        {/* Luminous Curved Visor (Face Shield) */}
        <mesh position={[0, -0.02, 0.32]} rotation={[0.08, 0, 0]}>
          <cylinderGeometry args={[0.42, 0.38, 0.32, 32, 1, true, -Math.PI / 2.2, Math.PI * 0.91]} />
          <meshStandardMaterial
            color={isHovered ? "#38BDF8" : "#0284C7"}
            emissive={isHovered ? "#38BDF8" : "#0EA5E9"}
            emissiveIntensity={isHovered ? 3.5 : 2.0}
            roughness={0.1}
            metalness={0.2}
            transparent
            opacity={0.92}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Visor Cyber Scanline Beam */}
        <mesh position={[0, -0.02, 0.44]}>
          <boxGeometry args={[0.48, 0.035, 0.02]} />
          <meshStandardMaterial
            color="#E0F2FE"
            emissive="#38BDF8"
            emissiveIntensity={isHovered ? 4.5 : 3.0}
          />
        </mesh>

        {/* Audio Comms Nodes (Left & Right) */}
        <mesh position={[-0.58, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.12, 0.12, 0.12, 16]} />
          <meshStandardMaterial color="#252A38" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0.58, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.12, 0.12, 0.12, 16]} />
          <meshStandardMaterial color="#252A38" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Amber status LED on earpiece */}
        <mesh position={[0.64, 0, 0.05]}>
          <sphereGeometry args={[0.03, 12, 12]} />
          <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={3} />
        </mesh>
        <mesh position={[-0.64, 0, 0.05]}>
          <sphereGeometry args={[0.03, 12, 12]} />
          <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={3} />
        </mesh>
      </group>

      {/* ─── NECK / ARTICULATED COLLAR ─── */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.22, 0.28, 0.2, 16]} />
        <meshStandardMaterial color="#0A0C11" roughness={0.5} metalness={0.7} />
      </mesh>

      {/* ─── TORSO & ARMOR PLATING ─── */}
      <group position={[0, -0.15, 0]}>
        {/* Main Chest Chassis */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.55, 0.42, 0.8, 6]} />
          <meshStandardMaterial
            color="#141822"
            metalness={0.92}
            roughness={0.22}
          />
        </mesh>

        {/* Back Thruster Backpack / Spatial Battery */}
        <mesh position={[0, 0.05, -0.32]}>
          <boxGeometry args={[0.45, 0.65, 0.2]} />
          <meshStandardMaterial color="#0E1118" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Quantum Arc Reactor - Outer Ring */}
        <mesh position={[0, 0.08, 0.32]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.16, 0.03, 16, 32]} />
          <meshStandardMaterial
            color="#E2A03F"
            emissive="#D97706"
            emissiveIntensity={isHovered ? 2.5 : 1.5}
            metalness={0.9}
          />
        </mesh>

        {/* Quantum Arc Reactor - Pulsing Inner Core */}
        <mesh ref={coreRef} position={[0, 0.08, 0.33]}>
          <sphereGeometry args={[0.09, 24, 24]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive={isHovered ? "#38BDF8" : "#0284C7"}
            emissiveIntensity={isHovered ? 4.5 : 2.8}
            roughness={0.1}
          />
        </mesh>

        {/* Diagonal Chest Armor Plates */}
        <mesh position={[-0.22, 0.16, 0.24]} rotation={[0, 0.2, -0.2]}>
          <boxGeometry args={[0.26, 0.18, 0.08]} />
          <meshStandardMaterial color="#202534" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[0.22, 0.16, 0.24]} rotation={[0, -0.2, 0.2]}>
          <boxGeometry args={[0.26, 0.18, 0.08]} />
          <meshStandardMaterial color="#202534" metalness={0.85} roughness={0.25} />
        </mesh>

        {/* Shoulder Pauldrons */}
        <mesh position={[-0.65, 0.25, 0]} rotation={[0, 0, 0.35]}>
          <boxGeometry args={[0.28, 0.18, 0.35]} />
          <meshStandardMaterial color="#1E2330" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0.65, 0.25, 0]} rotation={[0, 0, -0.35]}>
          <boxGeometry args={[0.28, 0.18, 0.35]} />
          <meshStandardMaterial color="#1E2330" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Cybernetic Arms (Floating Meditative Stance) */}
        <mesh position={[-0.68, -0.1, 0.1]} rotation={[0.2, 0.3, -0.1]}>
          <capsuleGeometry args={[0.09, 0.45, 8, 16]} />
          <meshStandardMaterial color="#141822" metalness={0.85} roughness={0.3} />
        </mesh>
        <mesh position={[0.68, -0.1, 0.1]} rotation={[0.2, -0.3, 0.1]}>
          <capsuleGeometry args={[0.09, 0.45, 8, 16]} />
          <meshStandardMaterial color="#141822" metalness={0.85} roughness={0.3} />
        </mesh>

        {/* Cyber Hands / Energy Emitters */}
        <mesh position={[-0.55, -0.45, 0.25]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#38BDF8" emissive="#0284C7" emissiveIntensity={isHovered ? 2.8 : 1.4} />
        </mesh>
        <mesh position={[0.55, -0.45, 0.25]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#38BDF8" emissive="#0284C7" emissiveIntensity={isHovered ? 2.8 : 1.4} />
        </mesh>

        {/* Lower Spine / Gyro Waist Joint */}
        <mesh position={[0, -0.55, 0]}>
          <cylinderGeometry args={[0.24, 0.18, 0.25, 16]} />
          <meshStandardMaterial color="#0A0C11" roughness={0.4} metalness={0.8} />
        </mesh>
      </group>

      {/* ─── HOLOGRAPHIC GYROSCOPIC ORBIT RINGS ─── */}
      <mesh ref={ring1Ref} position={[0, 0.15, 0]}>
        <torusGeometry args={[1.35, 0.012, 16, 64]} />
        <meshStandardMaterial
          color="#38BDF8"
          emissive="#38BDF8"
          emissiveIntensity={isHovered ? 3.0 : 1.8}
          transparent
          opacity={0.85}
        />
      </mesh>

      <mesh ref={ring2Ref} position={[0, 0.15, 0]} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.55, 0.01, 16, 64]} />
        <meshStandardMaterial
          color="#E2A03F"
          emissive="#D97706"
          emissiveIntensity={isHovered ? 2.8 : 1.6}
          transparent
          opacity={0.75}
        />
      </mesh>

      <mesh ref={ring3Ref} position={[0, 0.15, 0]} rotation={[0, Math.PI / 4, Math.PI / 6]}>
        <torusGeometry args={[1.75, 0.008, 16, 64]} />
        <meshStandardMaterial
          color="#A855F7"
          emissive="#9333EA"
          emissiveIntensity={isHovered ? 2.5 : 1.2}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* ─── PEDESTAL HOLOGRAPHIC ENERGY BASE ─── */}
      <group position={[0, -1.2, 0]}>
        <mesh ref={baseRingRef} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.7, 1.2, 32]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#0284C7"
            emissiveIntensity={isHovered ? 2.2 : 1.2}
            side={THREE.DoubleSide}
            transparent
            opacity={0.45}
            wireframe
          />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.9, 1.1, 0.1, 32]} />
          <meshStandardMaterial color="#0A0C11" roughness={0.3} metalness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

// Full Self-Contained Avatar Canvas Component
interface Avatar3DProps {
  className?: string;
  enableControls?: boolean;
  autoRotate?: boolean;
  scale?: number;
}

export default function Avatar3D({
  className = "w-full h-full min-h-[380px]",
  enableControls = true,
  scale = 1.35,
}: Avatar3DProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`relative ${className} select-none`}>
      <Canvas
        camera={{ position: [0, 0.2, 3.8], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        {/* Cinematic Multi-Point Lighting */}
        <ambientLight intensity={0.65} />
        <directionalLight position={[4, 5, 4]} intensity={2.2} color="#FFFFFF" castShadow />
        <directionalLight position={[-4, 2, -3]} intensity={1.8} color="#38BDF8" />
        <pointLight position={[0, -1, 1]} intensity={2.5} color="#0284C7" distance={4} />
        <pointLight position={[0, 2, -1]} intensity={1.5} color="#E2A03F" distance={5} />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
          <group scale={scale}>
            <CyberAvatarMesh isHovered={isHovered} setIsHovered={setIsHovered} />
          </group>
        </Float>

        {enableControls && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 2.5}
            maxAzimuthAngle={Math.PI / 3}
            minAzimuthAngle={-Math.PI / 3}
            rotateSpeed={0.5}
            dampingFactor={0.05}
          />
        )}
      </Canvas>

      {/* Subtle Interactive Prompt Overlay */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none text-center">
        <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-neutral-400">
          ✦ Interactive 3D Avatar • Drag to Orbit
        </span>
      </div>
    </div>
  );
}
