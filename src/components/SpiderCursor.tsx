"use client";
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function SpiderCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [webs, setWebs] = useState<{ id: number, startX: number, startY: number, endX: number, endY: number }[]>([]);
  const webId = useRef(0);

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    
    const handleShoot = (e: MouseEvent) => {
      // Play Thwip sound
      const audio = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_75c6020c6a.mp3"); // Quick zip sound
      audio.volume = 0.4;
      audio.playbackRate = 2.0;
      audio.play().catch(()=>{});

      // Shoot a web from the bottom corners of the screen to the cursor!
      const startX = Math.random() > 0.5 ? 0 : window.innerWidth;
      const startY = window.innerHeight;
      
      const newWeb = {
        id: webId.current++,
        startX,
        startY,
        endX: e.clientX,
        endY: e.clientY
      };
      
      setWebs(prev => [...prev, newWeb]);
      
      // Remove web after 0.5s
      setTimeout(() => {
        setWebs(prev => prev.filter(w => w.id !== newWeb.id));
      }, 500);
    };

    window.addEventListener('mousemove', updateMouse);
    window.addEventListener('mousedown', handleShoot);
    return () => {
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('mousedown', handleShoot);
    };
  }, []);

  return (
    <>
      {/* Target Crosshair Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[10000] border-2 border-white rounded-full flex items-center justify-center mix-blend-difference"
        animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      >
        <div className="w-1 h-1 bg-white rounded-full" />
      </motion.div>

      {/* Render the Webs */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-[9999]" style={{ mixBlendMode: 'screen' }}>
        {webs.map(web => (
          <motion.line
            key={web.id}
            x1={web.startX}
            y1={web.startY}
            x2={web.endX}
            y2={web.endY}
            stroke="#ffffff"
            strokeWidth="4"
            initial={{ pathLength: 0, opacity: 1 }}
            animate={{ pathLength: 1, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        ))}
      </svg>
    </>
  );
}
