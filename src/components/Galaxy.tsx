"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Galaxy() {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate 10,000 particles spread out in a massive cylinder/tunnel
  const particlesCount = 15000;
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    const colorInside = new THREE.Color('#ff3366'); // Neon Pink
    const colorOutside = new THREE.Color('#88ccff'); // Electric Blue
    
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      
      // Cylindrical spread for a "tunnel" effect
      const radius = Math.random() * 20 + 2; // Hollow center
      const spinAngle = radius * 5;
      const branchAngle = ((i % 3) * Math.PI * 2) / 3;
      
      const x = Math.cos(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * 5;
      const y = Math.sin(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * 5;
      const z = (Math.random() - 0.5) * 150; // Deep tunnel depth
      
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      
      // Color mixing based on radius
      const mixedColor = colorInside.clone().lerp(colorOutside, radius / 22);
      
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }
    
    return [positions, colors];
  }, [particlesCount]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.elapsedTime;
    
    // Slowly rotate the entire galaxy
    pointsRef.current.rotation.z = time * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors={true}
        transparent={true}
        opacity={0.8}
      />
    </points>
  );
}
