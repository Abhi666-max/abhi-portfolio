"use client";

import { Canvas } from '@react-three/fiber';
import { Environment, Stars } from '@react-three/drei';
import Galaxy from './Galaxy';
import FlyingCamera from './FlyingCamera';

export default function Scene() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-[#030303]">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#030303']} />
        
        {/* Massive starfield background */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Dynamic Flying Camera linked to scroll */}
        <FlyingCamera />
        
        {/* The interactive particle tunnel */}
        <Galaxy />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#88ccff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ff3366" />
      </Canvas>
    </div>
  );
}
