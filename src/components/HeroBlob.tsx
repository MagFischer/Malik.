"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

function AnimatedBlob() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.4}>
      <MeshDistortMaterial
        color="#30D158"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.2}
        metalness={0.1}
      />
    </Sphere>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#30D158" />
      <AnimatedBlob />
    </>
  );
}

type HeroBlobProps = {
  className?: string;
};

export function HeroBlob({ className = "" }: HeroBlobProps) {
  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  if (reducedMotion) {
    return (
      <div
        className={`w-full h-full flex items-center justify-center ${className}`}
      >
        <div
          className="w-48 h-48 rounded-full bg-gradient-to-br from-[#30D158] to-[#28b84c] opacity-80"
          style={{ filter: "blur(40px)" }}
        />
      </div>
    );
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
