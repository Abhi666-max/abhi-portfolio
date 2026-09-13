"use client";

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';

const noise3D = createNoise3D();

export default function GlassObject() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  // Create a high-res icosahedron
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2, 60);
    // Store original positions for deformation reference
    geo.userData.basePositions = Float32Array.from(geo.attributes.position.array);
    return geo;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Morph vertices using Simplex Noise
    const positions = meshRef.current.geometry.attributes.position;
    const basePositions = meshRef.current.geometry.userData.basePositions;
    
    for (let i = 0; i < positions.count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      const v = new THREE.Vector3(basePositions[ix], basePositions[iy], basePositions[iz]);
      
      // Calculate noise based on vertex position and time
      const noiseValue = noise3D(v.x * 0.5 + time * 0.3, v.y * 0.5 + time * 0.3, v.z * 0.5);
      
      // Push vertex along its normal
      v.normalize().multiplyScalar(2 + noiseValue * 0.6);
      
      positions.array[ix] = v.x;
      positions.array[iy] = v.y;
      positions.array[iz] = v.z;
    }
    
    positions.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();

    // Rotate slowly
    meshRef.current.rotation.x = time * 0.1;
    meshRef.current.rotation.y = time * 0.15;
    
    // Dynamic mouse follow with velocity skew
    const targetX = (state.pointer.x * viewport.width) / 8;
    const targetY = (state.pointer.y * viewport.height) / 8;
    
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <MeshTransmissionMaterial
        backside
        backsideThickness={2}
        thickness={3}
        roughness={0}
        transmission={1}
        ior={1.6}
        chromaticAberration={0.15}
        anisotropy={0.2}
        color="#ffffff"
        distortion={0.5}
        distortionScale={0.5}
      />
    </mesh>
  );
}
