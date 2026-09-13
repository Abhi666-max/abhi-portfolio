"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Edges } from '@react-three/drei';
import * as THREE from 'three';

export default function Monolith() {
  const meshRef = useRef<THREE.Mesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);

  // A massive, sharp geometric structure
  const geometry = useMemo(() => new THREE.OctahedronGeometry(6, 0), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Very slow, ominous rotation
    meshRef.current.rotation.y = time * 0.1;
    meshRef.current.rotation.z = Math.sin(time * 0.05) * 0.2;
    
    // Subtle breathing scale
    const scale = 1 + Math.sin(time * 0.5) * 0.02;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={meshRef} geometry={geometry}>
        <MeshTransmissionMaterial
          backside
          backsideThickness={10}
          thickness={15}
          roughness={0.05}
          transmission={1}
          ior={1.8}
          chromaticAberration={0.4}
          anisotropy={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          color="#000000"
          attenuationColor="#c89d70"
          attenuationDistance={10}
        />
        {/* Subtle glowing wireframe edges for tech feel */}
        <Edges
          ref={edgesRef as any}
          linewidth={2}
          threshold={15}
          color="#c89d70"
        />
      </mesh>
    </group>
  );
}
