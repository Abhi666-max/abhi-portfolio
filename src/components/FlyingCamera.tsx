"use client";

import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';

export default function FlyingCamera() {
  const { camera } = useThree();
  const scrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    // Determine how deep the camera flies based on scroll
    // Multiply by a factor to increase/decrease flying speed
    const targetZ = 30 - scrollYRef.current * 0.02;
    
    // Smoothly interpolate camera position
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    
    // Slight sway based on mouse pointer for a dynamic cinematic feel
    const targetX = (state.pointer.x * 2);
    const targetY = (state.pointer.y * 2);
    
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    
    // Look at center to give a panning effect
    camera.lookAt(0, 0, targetZ - 10);
  });

  return null; // Logic only component
}
