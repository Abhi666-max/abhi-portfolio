"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function BatCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    const handleDown = () => {
      setIsClicking(true);
      const audio = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_73229bbf93.mp3"); // placeholder hit
      audio.volume = 0.5;
      audio.play().catch(()=>{});
    };
    const handleUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999]"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        rotate: isClicking ? -45 : 0,
        scale: isClicking ? 0.8 : 1
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      style={{ originX: 0.2, originY: 0.8 }}
    >
      {/* Red Leather Ball Cursor */}
      <div className="w-5 h-5 rounded-full bg-[#cc2229] border-2 border-white/20 shadow-[0_0_10px_rgba(204,34,41,0.8)] relative">
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/50 -translate-y-1/2 rotate-45" /> {/* Seam */}
      </div>
    </motion.div>
  );
}
