"use client";

import { useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Physics-based spring for the trailing effect
  const springX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 28 });
  
  const scale = useMotionValue(1);
  const opacity = useMotionValue(0);

  useEffect(() => {
    const manageMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      opacity.set(1);
    };

    const manageMouseLeave = () => {
      opacity.set(0);
    };

    const manageHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.hover-target')) {
        scale.set(3);
      } else {
        scale.set(1);
      }
    };

    window.addEventListener("mousemove", manageMouseMove);
    window.addEventListener("mouseleave", manageMouseLeave);
    window.addEventListener("mouseover", manageHover);

    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
      window.removeEventListener("mouseleave", manageMouseLeave);
      window.removeEventListener("mouseover", manageHover);
    };
  }, [mouseX, mouseY, scale, opacity]);

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        scale,
        opacity
      }}
    />
  );
}
