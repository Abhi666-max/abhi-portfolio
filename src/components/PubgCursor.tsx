"use client";
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function PubgCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const breathAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    breathAudioRef.current = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_51c6c039ab.mp3"); // Heavy breathing loop
    breathAudioRef.current.loop = true;
    breathAudioRef.current.volume = 0.4;

    const updateMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    
    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('.target-lock')) {
        setIsHovering(true);
        breathAudioRef.current?.play().catch(()=>{});
      } else {
        setIsHovering(false);
        if(breathAudioRef.current) {
          breathAudioRef.current.pause();
          breathAudioRef.current.currentTime = 0;
        }
      }
    };
    
    const handleClick = () => {
      if(isHovering) {
        const shot = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_75c6020c6a.mp3"); // sharp click/shot
        shot.volume = 1;
        shot.play().catch(()=>{});
      }
    };

    window.addEventListener('mousemove', updateMouse);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('click', handleClick);
      if(breathAudioRef.current) breathAudioRef.current.pause();
    };
  }, [isHovering]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[10000] flex items-center justify-center"
      animate={{ x: mousePos.x - 40, y: mousePos.y - 40 }}
      transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      style={{ width: 80, height: 80 }}
    >
      {/* Scope Outline */}
      <div className="absolute inset-0 rounded-full border-2 border-white/50" />
      {/* Horizontal & Vertical Crosshairs */}
      <div className="absolute w-full h-[1px] bg-white/50" />
      <div className="absolute h-full w-[1px] bg-white/50" />
      
      {/* Range Finding Markings */}
      <div className="absolute h-1/2 w-[2px] bg-white/30 top-1/2" />
      <div className="absolute w-2 h-[1px] bg-white/50 mt-4" />
      <div className="absolute w-4 h-[1px] bg-white/50 mt-8" />
      <div className="absolute w-6 h-[1px] bg-white/50 mt-12" />

      {/* Red Dot (Target Locked) */}
      <motion.div 
        className="w-2 h-2 rounded-full bg-[var(--pubg-red)] absolute"
        animate={{ scale: isHovering ? 2 : 0, opacity: isHovering ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 20 }}
      />
    </motion.div>
  );
}
