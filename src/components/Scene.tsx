"use client";

import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import GlassObject from './GlassObject';

export default function Scene() {
  return (
    <div className="fixed inset-0 w-full h-full z-20 pointer-events-none">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 8], fov: 45 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <Environment preset="city" />
        <GlassObject />
      </Canvas>
    </div>
  );
}
