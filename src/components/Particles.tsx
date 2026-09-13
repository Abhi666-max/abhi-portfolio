"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Particles({ count = 5000 }) {
  const points = useRef<THREE.Points>(null);

  // Generate random positions for particles
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Create a long tunnel effect
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 200; // Deep z-axis
      
      // Hollow out the center of the tunnel
      const radius = Math.sqrt(x*x + y*y);
      if (radius < 5) {
        positions[i * 3] = x * 5;
        positions[i * 3 + 1] = y * 5;
      } else {
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
      }
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, [count]);

  // Animate the particles
  useFrame((state) => {
    if (!points.current) return;
    
    // Slight rotation for ambient movement
    points.current.rotation.z += 0.001;
    
    // Wave motion using sine
    const time = state.clock.getElapsedTime();
    points.current.position.y = Math.sin(time * 0.5) * 0.5;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        {/* @ts-ignore - R3F types complain about missing args, but this works perfectly */}
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#88ccff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
