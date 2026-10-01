"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Text, ContactShadows } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function Coin() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotate the coin constantly
      meshRef.current.rotation.y += delta * 0.6;
      
      // Interactive tilt based on mouse position
      const targetX = (state.pointer.x * Math.PI) / 6;
      const targetY = (state.pointer.y * Math.PI) / 6;
      meshRef.current.rotation.x += 0.05 * (targetY - meshRef.current.rotation.x);
      meshRef.current.rotation.z += 0.05 * (-targetX - meshRef.current.rotation.z);
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <cylinderGeometry args={[2.2, 2.2, 0.3, 64]} />
        {/* Shiny Gold Material */}
        <meshStandardMaterial 
          color="#ffc107"
          metalness={1}
          roughness={0.15}
          envMapIntensity={2.5}
        />
        
        {/* Outer Ring Detail */}
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[2.1, 0.1, 16, 100]} />
          <meshStandardMaterial color="#b8860b" metalness={1} roughness={0.3} />
        </mesh>
        
        {/* Rajmudra Text Front */}
        <Text
          position={[0, 0, 0.16]}
          fontSize={0.28}
          color="#3b2314"
          anchorX="center"
          anchorY="middle"
          maxWidth={3.5}
          textAlign="center"
          font="https://fonts.gstatic.com/s/tirodevanagarimarathi/v3/XLYmIZb1bjo802VzC38_3_Y7VqI5_T7Jg8q7S17w.woff" // Devanagari Font
        >
          {"प्रतिपच्चंद्रलेखेव\nवर्धिष्णुर्विश्ववंदिता\nशाहसूनोः शिवस्यैषा\nमुद्रा भद्राय राजते"}
        </Text>
        
        {/* Rajmudra Text Back (Mirrored rotation) */}
        <Text
          position={[0, 0, -0.16]}
          rotation={[0, Math.PI, 0]}
          fontSize={0.6}
          color="#3b2314"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/tirodevanagarimarathi/v3/XLYmIZb1bjo802VzC38_3_Y7VqI5_T7Jg8q7S17w.woff"
        >
          राजमुद्रा
        </Text>
      </mesh>
    </group>
  );
}

export default function Rajmudra3D() {
  return (
    <div className="w-full h-[60vh] md:h-[70vh] flex items-center justify-center relative z-10 hover-target">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={2.5} color="#ffeedd" />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#ffaa00" />
        <pointLight position={[0, 0, 2]} intensity={2} color="#ff671f" distance={10} />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Coin />
        </Float>
        
        
        
      </Canvas>
    </div>
  );
}
