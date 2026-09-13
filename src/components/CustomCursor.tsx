"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      // Fast response for the dot
      gsap.to(dotRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      // Smooth lag for the outer ring
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    const onMouseEnter = () => {
      gsap.to([cursorRef.current, dotRef.current], { scale: 1.5, opacity: 1, duration: 0.3 });
    };

    const onMouseLeave = () => {
      gsap.to([cursorRef.current, dotRef.current], { scale: 1, opacity: 0.5, duration: 0.3 });
    };

    window.addEventListener('mousemove', onMouseMove);
    
    // Add hover effects for all interactive elements
    const hoverTargets = document.querySelectorAll('.hover-target, a, button');
    hoverTargets.forEach((target) => {
      target.addEventListener('mouseenter', onMouseEnter);
      target.addEventListener('mouseleave', onMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      hoverTargets.forEach((target) => {
        target.removeEventListener('mouseenter', onMouseEnter);
        target.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 rounded-full pointer-events-none z-[9998]"
        style={{
          border: '1px solid rgba(255, 255, 255, 0.15)',
          background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 70%)',
          backdropFilter: 'blur(1px)'
        }}
        animate={{
          x: mousePosition.x - 32,
          y: mousePosition.y - 32,
          scale: isHovered ? 1.5 : 1,
          opacity: isVisible ? (isHovered ? 0 : 1) : 0
        }}
        transition={{
          type: 'spring',
          stiffness: 80,
          damping: 15,
          mass: 0.8
        }}
      />
    </>
  );
}
