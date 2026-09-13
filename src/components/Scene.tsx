"use client";

import { Canvas } from '@react-three/fiber';
import { Environment, Lightformer, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField, Noise, Vignette } from '@react-three/postprocessing';
import Monolith from './Monolith';
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
          {/* Cinematic Studio Lighting */}
          <ambientLight intensity={0.2} />
          <spotLight position={[20, 20, 10]} penumbra={1} castShadow angle={0.2} intensity={2} color="#c89d70" />
          <spotLight position={[-20, -20, -10]} penumbra={1} castShadow angle={0.2} intensity={1} color="#ffffff" />
          
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 4, -0.3, 0]}>
              <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} color="#ffffff" />
              <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} color="#c89d70" />
              <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[5, 1, -1]} scale={[20, 0.1, 1]} color="#ffffff" />
              <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} color="#c89d70" />
            </group>
          </Environment>

          <Monolith />
          <Stars />
          <FlyingCamera />

          {/* Heavy Cinematic Post-Processing */}
          <EffectComposer disableNormalPass multisampling={0}>
            <DepthOfField focusDistance={0.01} focalLength={0.05} bokehScale={5} />
            <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
            <Noise opacity={0.05} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
