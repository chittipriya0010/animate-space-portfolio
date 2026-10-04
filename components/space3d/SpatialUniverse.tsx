"use client";

import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { usePortfolio } from "@/components/modern/PortfolioContext";
import { PORTFOLIO_PROFILE, ALL_PROJECTS } from "@/constants/portfolioData";

type SpatialStation = "lobby" | "rotunda" | "techlab" | "transmission";

interface StationConfig {
  id: SpatialStation;
  name: string;
  tag: string;
  cameraPos: [number, number, number];
  targetPos: [number, number, number];
}

const STATIONS: StationConfig[] = [
  {
    id: "lobby",
    name: "01 LOBBY",
    tag: "Spatial Avatar Core",
    cameraPos: [0, 1.2, 5.2],
    targetPos: [0, 0.4, 0],
  },
  {
    id: "rotunda",
    name: "02 ROTUNDA",
    tag: "3D Project Pods",
    cameraPos: [0, 2.5, 7.8],
    targetPos: [0, 0, 0],
  },
  {
    id: "techlab",
    name: "03 TECH LAB",
    tag: "Capability Clusters",
    cameraPos: [4.8, 1.5, 4.2],
    targetPos: [3.2, 0, 0],
  },
  {
    id: "transmission",
    name: "04 TRANSMISSION",
    tag: "Comms & Credentials",
    cameraPos: [-4.5, 1.8, 4.2],
    targetPos: [-3.2, 0, 0],
  },
];

// Web Audio API Synthesizer for spatial ambience hum
class SpatialAudioEngine {
  private ctx: AudioContext | null = null;
  private osc: OscillatorNode | null = null;
  private gain: GainNode | null = null;
  private isPlaying = false;

  start() {
    if (this.isPlaying) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.osc = this.ctx.createOscillator();
      this.gain = this.ctx.createGain();

      // Deep, ethereal sci-fi drone
      this.osc.type = "sine";
      this.osc.frequency.setValueAtTime(58.27, this.ctx.currentTime); // Bb1 deep resonance

      this.gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.gain.gain.exponentialRampToValueAtTime(0.04, this.ctx.currentTime + 2.5);

      this.osc.connect(this.gain);
      this.gain.connect(this.ctx.destination);
      this.osc.start();
      this.isPlaying = true;
    } catch {}
  }

  stop() {
    if (!this.isPlaying || !this.gain || !this.ctx) return;
    try {
      this.gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1);
      setTimeout(() => {
        try {
          this.osc?.stop();
          this.ctx?.close();
        } catch {}
        this.isPlaying = false;
      }, 1000);
    } catch {
      this.isPlaying = false;
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

const audioEngine = new SpatialAudioEngine();

// Dynamic Camera Controller that smoothly animates between stations
function CameraRig({ activeStation }: { activeStation: SpatialStation }) {
  const currentStation = STATIONS.find((s) => s.id === activeStation) || STATIONS[0];
  const targetCam = new THREE.Vector3(...currentStation.cameraPos);
  const targetLook = new THREE.Vector3(...currentStation.targetPos);

  useFrame((state) => {
    // Smooth cinematic camera transition
    state.camera.position.lerp(targetCam, 0.045);
    state.camera.lookAt(targetLook);
  });

  return null;
}

// 3D Avatar Centerpiece with glowing scanlines
function SpatialAvatarMesh({
  onSelectStation,
}: {
  onSelectStation: (st: SpatialStation) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (group.current) {
      group.current.position.y = Math.sin(time * 1.8) * 0.12 + 0.3;
    }
    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        state.pointer.x * 0.7,
        0.08
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        -state.pointer.y * 0.4,
        0.08
      );
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * (hovered ? 1.8 : 0.6);
      ringRef.current.rotation.x += delta * (hovered ? 1.2 : 0.4);
    }
  });

  return (
    <group
      ref={group}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => onSelectStation("rotunda")}
      cursor="pointer"
    >
      {/* Head */}
      <group ref={headRef} position={[0, 1.1, 0]}>
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#121622" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Glowing Visor */}
        <mesh position={[0, 0, 0.32]}>
          <cylinderGeometry args={[0.38, 0.36, 0.3, 32, 1, true, -Math.PI / 2.2, Math.PI * 0.9]} />
          <meshStandardMaterial
            color={hovered ? "#38BDF8" : "#0284C7"}
            emissive={hovered ? "#38BDF8" : "#0EA5E9"}
            emissiveIntensity={hovered ? 3.8 : 2.2}
            roughness={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Torso */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.48, 0.38, 0.8, 6]} />
        <meshStandardMaterial color="#181D2A" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Arc Reactor Core */}
      <mesh position={[0, 0.35, 0.3]}>
        <sphereGeometry args={[0.1, 24, 24]} />
        <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={3.5} />
      </mesh>

      {/* Orbiting Gyro Ring */}
      <mesh ref={ringRef} position={[0, 0.5, 0]}>
        <torusGeometry args={[1.4, 0.015, 16, 64]} />
        <meshStandardMaterial
          color="#E2A03F"
          emissive="#D97706"
          emissiveIntensity={hovered ? 3.0 : 1.6}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Holographic Nameplate in 3D */}
      <Html position={[0, -0.65, 0]} center distanceFactor={6} className="pointer-events-none select-none text-center">
        <div className="font-mono text-sm font-semibold tracking-wider text-white whitespace-nowrap drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          CHITTIPRIYA VERMA
        </div>
        <div className="text-[11px] font-mono text-cyan-400 tracking-wide mt-0.5 whitespace-nowrap">
          [ CLICK TO ENTER ROTUNDA → ]
        </div>
      </Html>
    </group>
  );
}

// 3D Floating Project Pods around the Rotunda
function RotundaProjectPod({
  project,
  angle,
  radius,
  isSelected,
  onSelect,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  project: any;
  angle: number;
  radius: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2 + angle) * 0.1;
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group
      position={[x, 0, z]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      cursor="pointer"
    >
      <group ref={meshRef}>
        {/* Floating 3D Crystal / Kiosk Body */}
        <mesh castShadow>
          <octahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial
            color={isSelected ? "#E2A03F" : hovered ? "#38BDF8" : "#1A202C"}
            emissive={isSelected ? "#D97706" : hovered ? "#0284C7" : "#0D1117"}
            emissiveIntensity={isSelected ? 2.5 : hovered ? 1.8 : 0.4}
            metalness={0.9}
            roughness={0.2}
            wireframe={!hovered && !isSelected}
          />
        </mesh>

        {/* Outer Orbital Energy Ring */}
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[0.85, 0.012, 16, 32]} />
          <meshStandardMaterial
            color={isSelected ? "#E2A03F" : "#38BDF8"}
            emissive={isSelected ? "#E2A03F" : "#38BDF8"}
            emissiveIntensity={isSelected ? 3 : 1.2}
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>

      {/* Floating 3D Label */}
      <Html position={[0, -0.95, 0]} center distanceFactor={7} className="pointer-events-none select-none text-center">
        <div className="font-mono text-sm font-semibold text-white whitespace-nowrap drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          {project.title.split("-")[0].trim()}
        </div>
        <div className={`text-[10px] font-mono tracking-wider uppercase mt-0.5 whitespace-nowrap ${
          isSelected ? "text-amber-400 font-semibold" : "text-neutral-400"
        }`}>
          {project.badge}
        </div>
      </Html>
    </group>
  );
}

// 3D Rotunda Station (All projects in orbit)
function RotundaStation({
  selectedProject,
  onSelectProject,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedProject: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelectProject: (p: any) => void;
}) {
  const showcaseProjects = ALL_PROJECTS.slice(0, 4);
  const radius = 3.4;

  return (
    <group position={[0, 0, 0]}>
      {/* Center Holographic Ground Grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.4, 0]}>
        <ringGeometry args={[1.5, 4.2, 32]} />
        <meshStandardMaterial
          color="#38BDF8"
          emissive="#0284C7"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {showcaseProjects.map((p, idx) => {
        const angle = (idx / showcaseProjects.length) * Math.PI * 2;
        return (
          <RotundaProjectPod
            key={p.id}
            project={p}
            angle={angle}
            radius={radius}
            isSelected={selectedProject?.id === p.id}
            onSelect={() => onSelectProject(p)}
          />
        );
      })}
    </group>
  );
}

// Tech Lab 3D Crystalline Node
function TechLabCluster() {
  const items = [
    { name: "Flutter Mobile", color: "#38BDF8", pos: [2.8, 1.2, 0] },
    { name: "React Native", color: "#61DAFB", pos: [3.8, 0.4, 0.8] },
    { name: "Rust Distributed", color: "#DEA584", pos: [4.4, 1.4, -0.5] },
    { name: "Next.js 14", color: "#FFFFFF", pos: [3.2, -0.4, 0.5] },
    { name: "Applied AI / Vision", color: "#A855F7", pos: [4.0, -0.6, -0.8] },
  ];

  return (
    <group position={[0, 0, 0]}>
      {items.map((tech, idx) => (
        <Float key={idx} speed={2} rotationIntensity={0.6} floatIntensity={0.5}>
          <group position={tech.pos as [number, number, number]}>
            <mesh>
              <icosahedronGeometry args={[0.3, 0]} />
              <meshStandardMaterial
                color={tech.color}
                emissive={tech.color}
                emissiveIntensity={1.8}
                metalness={0.9}
                roughness={0.2}
              />
            </mesh>
            <Html position={[0, -0.45, 0]} center distanceFactor={7} className="pointer-events-none select-none text-center">
              <span className="font-mono text-xs text-neutral-200 whitespace-nowrap px-2 py-0.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-sm">
                {tech.name}
              </span>
            </Html>
          </group>
        </Float>
      ))}
    </group>
  );
}

// Transmission Beacon Node
function TransmissionNode() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.8;
      meshRef.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <group position={[-3.2, 0.2, 0]}>
      <mesh ref={meshRef}>
        <dodecahedronGeometry args={[0.65, 0]} />
        <meshStandardMaterial
          color="#E2A03F"
          emissive="#D97706"
          emissiveIntensity={2.5}
          wireframe
        />
      </mesh>
      <Html position={[0, -0.95, 0]} center distanceFactor={7} className="pointer-events-none select-none text-center">
        <div className="font-mono text-sm font-semibold tracking-wider text-white whitespace-nowrap drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          TRANSMISSION TERMINAL
        </div>
        <div className="text-[10px] font-mono text-amber-400 tracking-widest uppercase mt-0.5 whitespace-nowrap">
          [ CV &amp; ENCRYPTED COMMS ACTIVE ]
        </div>
      </Html>
    </group>
  );
}

// Particle Stars Backdrop
function CosmicDust() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 2500;
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 35;
      pos[i + 1] = (Math.random() - 0.5) * 35;
      pos[i + 2] = (Math.random() - 0.5) * 35;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#A5B4FC" transparent opacity={0.65} />
    </points>
  );
}

// Main Interactive 3D Spatial Universe Component
export default function SpatialUniverse() {
  const { toggleMode, theme, toggleTheme, setIsResumeOpen } = usePortfolio();
  const [activeStation, setActiveStation] = useState<SpatialStation>("lobby");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedProject, setSelectedProject] = useState<any>(ALL_PROJECTS[0]);
  const [isAudioActive, setIsAudioActive] = useState(false);

  const handleAudioToggle = () => {
    const active = audioEngine.toggle();
    setIsAudioActive(active);
  };

  useEffect(() => {
    return () => {
      audioEngine.stop();
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#040508] text-white select-none">
      {/* ─── 3D WEBGL ENGINE CANVAS ─── */}
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 1.2, 5.2], fov: 45 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#040508"]} />

        {/* Dynamic Smooth Camera Rig */}
        <CameraRig activeStation={activeStation} />

        {/* Ambient & Sci-Fi Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[6, 8, 6]} intensity={2.4} color="#FFFFFF" />
        <pointLight position={[0, 0, 0]} intensity={3.5} color="#38BDF8" distance={9} />
        <pointLight position={[-4, 3, 2]} intensity={2.5} color="#E2A03F" distance={8} />

        {/* Background Cosmic Star Dust */}
        <CosmicDust />

        {/* Station 01: Core 3D Avatar */}
        <SpatialAvatarMesh onSelectStation={setActiveStation} />

        {/* Station 02: Rotunda Project Pods */}
        <RotundaStation
          selectedProject={selectedProject}
          onSelectProject={(p) => {
            setSelectedProject(p);
            setActiveStation("rotunda");
          }}
        />

        {/* Station 03: Tech Lab */}
        <TechLabCluster />

        {/* Station 04: Transmission */}
        <TransmissionNode />

        {/* Free Orbit Controls for user exploration */}
        <OrbitControls
          enablePan={false}
          maxDistance={12}
          minDistance={2.5}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 3.5}
          rotateSpeed={0.6}
          dampingFactor={0.06}
        />
      </Canvas>

      {/* ─── TOP FUTURISTIC HUD NAVIGATION (VEA Inspired) ─── */}
      <header className="absolute top-0 inset-x-0 z-50 p-4 sm:p-6 flex items-center justify-between pointer-events-none">
        {/* Brand Monogram */}
        <div className="pointer-events-auto flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/20 flex items-center justify-center font-mono font-medium text-xs text-neutral-100 shadow-lg">
            CP
          </div>
          <div>
            <p className="text-xs font-mono font-medium text-white tracking-wider">
              {PORTFOLIO_PROFILE.name}
            </p>
            <p className="text-[10px] font-mono text-neutral-400">
              Spatial Architecture • 3D Web
            </p>
          </div>
        </div>

        {/* Central Signature VEA Segmented Toggle: [ PAGE ] / [ SPACE ] */}
        <div className="pointer-events-auto flex items-center p-1 rounded-full bg-neutral-950/80 border border-white/15 backdrop-blur-xl shadow-2xl">
          <button
            onClick={toggleMode}
            className="px-4 py-1.5 rounded-full text-xs font-mono text-neutral-400 hover:text-white transition-all hover:bg-white/5 whitespace-nowrap"
            title="Switch to 2D Editorial Page"
          >
            PAGE
          </button>
          <button
            className="px-4 py-1.5 rounded-full text-xs font-mono font-semibold bg-white text-black shadow-md flex items-center gap-1.5 whitespace-nowrap"
            title="Active 3D Real-time Spatial Universe"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="whitespace-nowrap">SPACE</span>
          </button>
        </div>

        {/* Right Action Bar */}
        <div className="pointer-events-auto flex items-center gap-2.5">
          {/* Spatial Sound FX Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`p-2 rounded-lg border text-xs font-mono transition-all flex items-center gap-1.5 whitespace-nowrap ${
              isAudioActive
                ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                : "bg-neutral-900/80 border-white/10 text-neutral-400 hover:text-white"
            }`}
            title="Toggle Spatial Ambient Drone"
          >
            <span>{isAudioActive ? "🔊" : "🔇"}</span>
            <span className="hidden sm:inline text-[10px] whitespace-nowrap">
              {isAudioActive ? "Audio ON" : "Mute"}
            </span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-neutral-900/80 border border-white/10 text-neutral-300 hover:text-white transition-colors whitespace-nowrap"
            title="Toggle Theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {/* Resume Quick Download */}
          <a
            href="/resume.pdf"
            download="Chittipriya_Verma_Resume.pdf"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-white transition-all shadow-md whitespace-nowrap"
            title="Download Chittipriya Verma Resume PDF"
          >
            <span className="whitespace-nowrap">CV ↓</span>
          </a>
        </div>
      </header>

      {/* ─── BOTTOM SPATIAL NAVIGATION HUD ─── */}
      <footer className="absolute bottom-6 inset-x-0 z-50 px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-none">
        {/* Spatial Room Station Pills */}
        <div className="pointer-events-auto flex items-center gap-1.5 p-1 rounded-xl bg-neutral-950/80 border border-white/15 backdrop-blur-xl shadow-2xl overflow-x-auto max-w-full">
          {STATIONS.map((station) => (
            <button
              key={station.id}
              onClick={() => setActiveStation(station.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeStation === station.id
                  ? "bg-white text-black font-semibold shadow-md"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>{station.name}</span>
            </button>
          ))}
        </div>

        {/* Orbit Telemetry Guidance */}
        <div className="pointer-events-auto flex items-center gap-3 text-[11px] font-mono text-neutral-400 bg-neutral-950/70 border border-white/10 px-3.5 py-1.5 rounded-lg backdrop-blur-md">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span>Drag to Orbit • Scroll to Zoom • Click Objects to Navigate</span>
        </div>
      </footer>

      {/* ─── ACTIVE ROTUNDA PROJECT INSPECT CARD (WHEN ROTUNDA IS ACTIVE) ─── */}
      {activeStation === "rotunda" && selectedProject && (
        <div className="absolute top-20 right-6 z-50 w-[320px] sm:w-[380px] p-5 rounded-2xl bg-neutral-950/90 border border-white/15 backdrop-blur-xl shadow-2xl text-left animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
            <span className="text-amber-400 font-semibold">{selectedProject.badge}</span>
            <span className="text-neutral-500">{selectedProject.category.toUpperCase()}</span>
          </div>

          <h3 className="text-lg font-medium text-white mt-3">
            {selectedProject.title}
          </h3>
          <p className="text-xs font-mono text-neutral-400 mt-0.5">
            {selectedProject.tagline}
          </p>

          <p className="text-xs text-neutral-300 font-normal leading-relaxed mt-3">
            {selectedProject.description}
          </p>

          {/* Highlights */}
          {selectedProject.highlights.length > 0 && (
            <div className="mt-3 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-neutral-300">
              <span className="text-cyan-400 font-mono">✦ </span>
              <span>{selectedProject.highlights[0]}</span>
            </div>
          )}

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/10">
            {selectedProject.technologies.slice(0, 5).map((tech: string) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-neutral-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-4 pt-3 border-t border-white/10 text-xs font-mono">
            {selectedProject.githubUrl && (
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 text-center rounded-lg bg-white text-black font-semibold hover:bg-neutral-200 transition-colors whitespace-nowrap"
              >
                <span className="whitespace-nowrap">GitHub Repository ↗</span>
              </a>
            )}
            <button
              onClick={() => setIsResumeOpen(true)}
              className="px-3 py-2 rounded-lg bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white whitespace-nowrap"
            >
              <span className="whitespace-nowrap">Credentials</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
