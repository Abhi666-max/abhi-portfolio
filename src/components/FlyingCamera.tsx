"use client";

import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';

export default function FlyingCamera() {
  const scrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    const scrollFactor = scrollYRef.current * 0.001; 
    
    // Parallax sway rather than full orbit
    const targetX = Math.sin(scrollFactor) * 5 + (state.pointer.x * 2);
    const targetY = (Math.cos(scrollFactor * 2) * 2) + (state.pointer.y * 2);
    
    // Smoothly interpolate camera position
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    
    // Stay at a fixed Z distance to watch the liquid metal
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 25, 0.05);
    
    // Always look at the center of the Sphere
    state.camera.lookAt(0, 0, 0);
  });

  return null; 
}
