"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function SwordCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Hide default cursor globally
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
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[10000] origin-top-left flex items-center justify-center"
      animate={{
        x: mousePosition.x - 5,
        y: mousePosition.y - 5,
        rotate: isHovering ? -45 : -20, // Sword swings when hovering
        scale: isHovering ? 1.2 : 1
      }}
      transition={{
        type: "spring",
        stiffness: 800,
        damping: 25,
        mass: 0.1
      }}
    >
      {/* A historic sword silhouette (Talwar) */}
      <div 
        className="w-16 h-16 drop-shadow-lg"
        style={{
          backgroundImage: 'url("https://cdn-icons-png.flaticon.com/512/5753/5753457.png")',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          filter: 'invert(16%) sepia(87%) saturate(2371%) hue-rotate(352deg) brightness(85%) contrast(100%)', // Makes it dark crimson #8b2500
          transform: 'rotate(135deg)' // Align the tip to the cursor coordinates
        }}
      />
    </motion.div>
  );
}
