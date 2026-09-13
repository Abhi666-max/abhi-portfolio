"use client";

import { Canvas } from '@react-three/fiber';
import ShaderBackground from './ShaderBackground';

export default function Scene() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-[#030303]">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 5], fov: 75 }}
      >
        <ShaderBackground />
      </Canvas>
    </div>
  );
}
