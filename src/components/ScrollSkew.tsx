"use client";

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function ScrollSkew({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let requestAnimationFrameId: number;
    let lastScrollY = window.scrollY;
    let velocity = 0;
    let currentSkew = 0;
    
    const updateSkew = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      
      // Calculate velocity
      velocity = delta * 0.1; 
      
      // Interpolate current skew towards velocity
      currentSkew += (velocity - currentSkew) * 0.1;
      
      // Cap the maximum skew to avoid breaking the layout completely
      const clampedSkew = Math.max(-10, Math.min(10, currentSkew));
      
      if (containerRef.current) {
        gsap.set(containerRef.current, { skewY: clampedSkew });
      }
      
      lastScrollY = currentScrollY;
      requestAnimationFrameId = requestAnimationFrame(updateSkew);
    };
    
    updateSkew();
    
    return () => cancelAnimationFrame(requestAnimationFrameId);
  }, []);

  return (
    <div ref={containerRef} className="will-change-transform origin-center">
      {children}
    </div>
  );
}
