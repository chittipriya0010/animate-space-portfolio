"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

type ChickState = "idle" | "running" | "pecking" | "sleeping" | "chirping";

interface ChickFollowerProps {
  enabled?: boolean;
}

const CHIRP_MESSAGES = [
  "Chirp chirp! 🐣",
  "Looking for bugs... found 0! 🐛",
  "Flutter + Next.js is awesome! 💛",
  "Peck peck! 🌾",
  "Running to catch up! 🏃💨",
  "Check out the mobile apps below! 📱",
  "Chittipriya's code is clean! ✨",
  "Need a coffee break? ☕",
];

export default function ChickFollower({ enabled = true }: ChickFollowerProps) {
  const [isVisible, setIsVisible] = useState(enabled);
  const [chickState, setChickState] = useState<ChickState>("idle");
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [speechBubble, setSpeechBubble] = useState<string | null>(null);
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const [isAsleep, setIsAsleep] = useState(false);

  const targetRef = useRef({ x: 150, y: 150 });
  const delayedTargetRef = useRef({ x: 150, y: 150 });
  const currentRef = useRef({ x: 100, y: 100 });
  const animFrameRef = useRef<number | null>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const speechTimerRef = useRef<NodeJS.Timeout | null>(null);
  const stepFrameRef = useRef(0);
  const [stepToggle, setStepToggle] = useState(false);

  // Trigger speech
  const showChirp = useCallback((customMsg?: string) => {
    const msg = customMsg || CHIRP_MESSAGES[Math.floor(Math.random() * CHIRP_MESSAGES.length)];
    setSpeechBubble(msg);
    setChickState("chirping");
    if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
    speechTimerRef.current = setTimeout(() => {
      setSpeechBubble(null);
      setChickState("idle");
    }, 2800);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Offset slightly so chick trails behind the pointer
      targetRef.current = {
        x: e.clientX + (e.clientX > currentRef.current.x ? -28 : 28),
        y: e.clientY + 18,
      };

      if (isAsleep) {
        setIsAsleep(false);
      }

      // Reset sleep timeout on mouse movement
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        setIsAsleep(true);
        setChickState("sleeping");
      }, 7000);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY + 18,
        };
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [isVisible, isAsleep]);

  // Animation loop with intentional trailing lag & smooth dampening
  useEffect(() => {
    if (!isVisible) return;

    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Intentional trailing lag: delayed target chases the actual mouse coordinates smoothly
      const lagFactor = 0.045; // Smooth trailing delay behind user cursor
      delayedTargetRef.current.x += (targetRef.current.x - delayedTargetRef.current.x) * lagFactor;
      delayedTargetRef.current.y += (targetRef.current.y - delayedTargetRef.current.y) * lagFactor;

      const dx = delayedTargetRef.current.x - currentRef.current.x;
      const dy = delayedTargetRef.current.y - currentRef.current.y;
      const distance = Math.hypot(dx, dy);

      if (distance > 5 && !isAsleep) {
        // Smooth easing speed based on distance
        const speed = Math.min(Math.max((distance - 3) * 3.2, 40), 220);
        const vx = (dx / distance) * speed;
        const vy = (dy / distance) * speed;

        currentRef.current.x += vx * dt;
        currentRef.current.y += vy * dt;

        // Face direction with hysteresis to prevent rapid flickering
        if (Math.abs(dx) > 3) {
          setDirection(dx > 0 ? "right" : "left");
        }

        setChickState("running");

        // Foot stepping toggle (smooth running cadence)
        stepFrameRef.current += dt * 12;
        if (stepFrameRef.current > 1) {
          setStepToggle((prev) => !prev);
          stepFrameRef.current = 0;
        }
      } else {
        if (!isAsleep && chickState !== "chirping") {
          // Idle state - occasionally peck
          if (time % 4500 < 1100) {
            setChickState("pecking");
          } else {
            setChickState("idle");
          }
        }
      }

      setPos({ x: currentRef.current.x, y: currentRef.current.y });
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isVisible, isAsleep, chickState]);

  if (!isVisible) {
    return (
      <button
        onClick={() => {
          setIsVisible(true);
          showChirp("I'm back! 🐥");
        }}
        className="fixed bottom-3 right-3 z-50 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 text-[10px] font-mono border border-white/10 shadow-lg backdrop-blur-sm transition-all"
        title="Summon Chick Companion"
      >
        <span>🐥</span>
        <span>summon chick</span>
      </button>
    );
  }

  return (
    <>
      {/* Floating Chick Entity */}
      <div
        className="fixed pointer-events-auto select-none z-[9999] cursor-pointer"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(-50%, -50%) scaleX(${direction === "left" ? -1 : 1})`,
          transition: "transform 0.14s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
        onClick={() => showChirp()}
        title="Click to interact with Chick!"
      >
        {/* Speech Bubble */}
        {speechBubble && (
          <div
            className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-neutral-900/95 backdrop-blur-sm text-neutral-200 font-mono text-[9px] px-2 py-0.5 rounded shadow-lg border border-white/15 pointer-events-none transition-all"
            style={{
              transform: `scaleX(${direction === "left" ? -1 : 1}) translate(-50%, 0)`,
            }}
          >
            {speechBubble}
          </div>
        )}

        {/* Sleeping Zzz Indicator */}
        {chickState === "sleeping" && (
          <div
            className="absolute -top-4 -right-1 text-[9px] font-mono text-neutral-400 animate-pulse pointer-events-none"
            style={{
              transform: `scaleX(${direction === "left" ? -1 : 1})`,
            }}
          >
            zzz...
          </div>
        )}

        {/* SVG Chick Model (Delicate small scale: 20px) */}
        <div className="relative w-5 h-5 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
          <svg
            viewBox="0 0 48 48"
            className={`w-full h-full transition-transform duration-100 ${
              chickState === "pecking" ? "translate-y-1 rotate-12" : ""
            } ${chickState === "running" ? (stepToggle ? "-translate-y-1 rotate-3" : "translate-y-0.5 -rotate-2") : ""}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Shadow */}
            <ellipse cx="24" cy="44" rx="14" ry="3" fill="rgba(0,0,0,0.2)" />

            {/* Feet */}
            <path
              d={
                stepToggle
                  ? "M18 41L15 44M18 41L21 44M18 36V41"
                  : "M19 40L16 43M19 40L22 43M19 36V40"
              }
              stroke="#EA580C"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d={
                !stepToggle
                  ? "M29 41L26 44M29 41L32 44M29 36V41"
                  : "M30 40L27 43M30 40L33 43M30 36V40"
              }
              stroke="#EA580C"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Chick Body (Fluffy Yellow) */}
            <ellipse cx="24" cy="26" rx="16" ry="14" fill="#FACC15" />
            <ellipse cx="22" cy="24" rx="14" ry="12" fill="#FDE047" />

            {/* Little Chick Wing */}
            <path
              d={
                chickState === "running"
                  ? stepToggle
                    ? "M13 22C11 18 13 14 18 16C19 22 17 26 13 27C11 26 12 24 13 22Z"
                    : "M12 24C9 24 9 20 15 19C17 25 15 28 12 29C10 28 11 26 12 24Z"
                  : "M14 23C11 23 11 19 16 19C18 24 16 27 14 28C12 27 13 25 14 23Z"
              }
              fill="#EAB308"
            />

            {/* Little Feather Crest / Tuft on head */}
            <path
              d="M26 12C26 8 28 6 30 7C30 9 28 11 27 13Z"
              fill="#F59E0B"
            />
            <path
              d="M23 11C23 7 24 5 26 6C26 8 25 10 24 12Z"
              fill="#FBBF24"
            />

            {/* Eyes */}
            {chickState === "sleeping" ? (
              // Sleeping closed eyes
              <path
                d="M28 22C30 24 33 24 35 22"
                stroke="#78350F"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              // Open sparkling eye
              <>
                <circle cx="31" cy="22" r="3" fill="#1E293B" />
                <circle cx="32" cy="21" r="1" fill="#FFFFFF" />
              </>
            )}

            {/* Cute Rosy Cheek */}
            <circle cx="28" cy="27" r="2.5" fill="#FCA5A5" opacity="0.8" />

            {/* Orange Beak */}
            <path
              d={
                chickState === "pecking"
                  ? "M36 24L44 26L36 29Z"
                  : "M36 23L43 25L36 27Z"
              }
              fill="#F97316"
            />

            {/* Tail feathers */}
            <path
              d="M8 25C6 24 6 22 9 21C11 23 10 26 8 25Z"
              fill="#FBBF24"
            />
          </svg>
        </div>
      </div>

      {/* Floating Toggle Controls in Bottom Corner */}
      <div className="fixed bottom-3 right-3 z-40 flex items-center gap-1 p-1 rounded-lg bg-neutral-900/80 backdrop-blur-md border border-white/10 text-neutral-400 text-[10px] font-mono shadow-lg">
        <button
          onClick={() => showChirp()}
          className="px-1.5 py-0.5 rounded hover:bg-neutral-800 hover:text-neutral-200 transition-colors"
          title="Make Chick chirp"
        >
          🐥 chirp
        </button>
        <span className="text-neutral-700">|</span>
        <button
          onClick={() => {
            setIsAsleep(!isAsleep);
            setChickState(!isAsleep ? "sleeping" : "idle");
          }}
          className="px-1.5 py-0.5 rounded hover:bg-neutral-800 hover:text-neutral-200 transition-colors"
          title="Put Chick to sleep or wake up"
        >
          {isAsleep ? "wake" : "sleep"}
        </button>
        <span className="text-neutral-700">|</span>
        <button
          onClick={() => setIsVisible(false)}
          className="px-1.5 py-0.5 rounded hover:bg-neutral-800 hover:text-neutral-200 transition-colors"
          title="Hide Chick follower"
        >
          hide
        </button>
      </div>
    </>
  );
}
