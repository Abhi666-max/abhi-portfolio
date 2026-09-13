"use client";

import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import ShaderBackground from './ShaderBackground';

export default function Scene() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-[#010103]">
      <Canvas
        dpr={[1, 1.5]} // Limit pixel ratio for ultra-fast performance
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <OrthographicCamera makeDefault position={[0, 0, 1]} zoom={1} />
        <ShaderBackground />
      </Canvas>
    </div>
  );
}
