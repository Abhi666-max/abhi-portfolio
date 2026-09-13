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
    // Scroll progress drives the camera angle
    // Maximum scroll height assumed around 5000-8000px depending on content
    // We want a full 180 or 360 degree orbit over the entire scroll
    const scrollFactor = scrollYRef.current * 0.001; 
    
    // Orbit Mathematics (Radius around the monolith)
    const radius = 25;
    const targetX = Math.sin(scrollFactor) * radius;
    const targetZ = Math.cos(scrollFactor) * radius;
    // Camera moves up/down slightly on scroll
    const targetY = (Math.sin(scrollFactor * 2) * 5) + (state.pointer.y * 2);
    
    // Smoothly interpolate camera position
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX + (state.pointer.x * 2), 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
    
    // Always look at the center of the Monolith
    state.camera.lookAt(0, 0, 0);
  });

  return null; 
}
