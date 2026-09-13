"use client";

import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, DepthOfField, Noise, Vignette } from '@react-three/postprocessing';
import { Stars } from '@react-three/drei';
import QuantumSphere from './QuantumSphere';
import FlyingCamera from './FlyingCamera';
import { Suspense } from 'react';

export default function Scene() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-black">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 45 }}
        gl={{ antialias: false, powerPreference: "high-performance", alpha: false }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 10, 40]} />

        <Suspense fallback={null}>
          <QuantumSphere />
          <Stars />
          <FlyingCamera />

          {/* Heavy Cinematic Post-Processing */}
          <EffectComposer multisampling={0}>
            <DepthOfField focusDistance={0.01} focalLength={0.05} bokehScale={5} />
            <Bloom luminanceThreshold={0.1} mipmapBlur intensity={2.5} />
            <Noise opacity={0.05} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
