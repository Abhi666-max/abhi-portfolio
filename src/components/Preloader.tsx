"use client";

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cinematic slow counter
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 5) + 1;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        
        // Slow cinematic fade out
        const tl = gsap.timeline({
          onComplete: () => {
            if (containerRef.current) containerRef.current.style.display = 'none';
            onComplete();
          }
        });

        tl.to(textRef.current, {
          opacity: 0,
          scale: 1.1,
          duration: 2.0,
          ease: "power2.out"
        })
        .to(containerRef.current, {
          opacity: 0,
          duration: 1.5,
          ease: "power2.inOut"
        }, "-=1.0");
      }
      setProgress(current);
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[999] pointer-events-none flex items-center justify-center bg-black">
      <div ref={textRef} className="flex flex-col items-center gap-4">
        <h1 className="text-2xl md:text-4xl text-[#c89d70] tracking-[0.5em] font-serif" style={{ fontFamily: 'var(--font-playfair)' }}>
          DIRECTOR'S CUT
        </h1>
        <div className="w-[1px] h-12 bg-white/20 overflow-hidden relative">
          <div 
            className="absolute bottom-0 w-full bg-white transition-all duration-300" 
            style={{ height: `${progress}%` }} 
          />
        </div>
      </div>
    </div>
  );
}
