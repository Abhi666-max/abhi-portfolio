"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function SwordCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Force native cursor hide
    document.documentElement.style.cursor = 'none';
    document.body.style.cursor = 'none';
    
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('.hover-target')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.style.cursor = 'auto';
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999] flex items-center justify-center"
      animate={{
        x: mousePosition.x - 2, // Precisely align the SVG tip (0,0) to mouse
        y: mousePosition.y - 2,
        rotate: isHovering ? -50 : 0, // Swings down violently when hovering
        scale: isHovering ? 1.4 : 1
      }}
      style={{ originX: 0, originY: 0 }} // Rotate exactly around the tip
      transition={{
        type: "spring",
        stiffness: 1200,
        damping: 20,
        mass: 0.1
      }}
    >
      <svg 
        width="48" height="48" 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(2px 4px 6px rgba(139,37,0,0.6))' }}
      >
        {/* The Tip is precisely at M 2 2 */}
        {/* Blade */}
        <path d="M2 2 Q 40 10, 65 40 L 75 55 L 60 70 Q 30 45, 10 20 Z" fill="#b0c4de" stroke="#8b2500" strokeWidth="1" />
        <path d="M2 2 Q 40 10, 65 40 L 60 70 Q 30 45, 10 20 Z" fill="rgba(139,37,0,0.5)" />
        {/* Handle Guard */}
        <path d="M55 75 L 85 45 L 90 50 L 60 80 Z" fill="#ffd700" />
        {/* Handle Grip */}
        <rect x="65" y="60" width="12" height="30" transform="rotate(-45 71 75)" fill="#3b2314" />
        {/* Pommel */}
        <circle cx="85" cy="85" r="6" fill="#ffd700" />
      </svg>
    </motion.div>
  );
}
