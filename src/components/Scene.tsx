"use client";

import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import Particles from './Particles';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Inner component to handle camera animations
function CameraRig() {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!groupRef.current) return;

    // Fly through the tunnel on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth scrubbing
      }
    });

    // Move the entire group forward in the Z axis
    tl.to(groupRef.current.position, {
      z: -150,
      ease: "none"
    });
    
    // Add some cinematic rotation
    tl.to(groupRef.current.rotation, {
      z: Math.PI / 4,
      ease: "power1.inOut"
    }, 0);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <group ref={groupRef}>
      <Particles count={8000} />
    </group>
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ powerPreference: "high-performance", antialias: false }}
        dpr={[1, 2]} // Optimize pixel ratio
      >
        <color attach="background" args={['#010101']} />
        <ambientLight intensity={0.5} />
        
        <CameraRig />

        {/* MAXIMUM POWER POST-PROCESSING */}
        <EffectComposer disableNormalPass>
          <Bloom 
            luminanceThreshold={0.2} 
            mipmapBlur 
            intensity={1.5} 
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={new THREE.Vector2(0.002, 0.002)}
          />
          <Noise opacity={0.03} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
