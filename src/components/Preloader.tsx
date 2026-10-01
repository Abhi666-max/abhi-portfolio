"use client";

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let current = 0;
    
    // Slow, suspenseful loading
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 3) + 1;
      
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        
        // The Curtain Reveal Animation
        const tl = gsap.timeline({
          onComplete: () => {
            if (containerRef.current) containerRef.current.style.display = 'none';
            onComplete();
          }
        });

        // 1. Text glows and fades out
        tl.to(textRef.current, {
          opacity: 0,
          scale: 1.05,
          filter: "blur(10px)",
          duration: 1.5,
          ease: "power2.inOut"
        })
        // 2. The curtain lifts slowly (very expensive feel)
        .to(curtainRef.current, {
          yPercent: -100,
          duration: 2.0,
          ease: "power4.inOut"
        }, "-=0.5");
      }
      setProgress(current);
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[999] pointer-events-none flex items-center justify-center">
      {/* The solid black curtain */}
      <div ref={curtainRef} className="absolute inset-0 bg-black z-0" />
      
      {/* The Typography */}
      <div ref={textRef} className="relative z-10 flex flex-col items-center gap-8">
        <h1 className="text-xl md:text-3xl text-[#d4af37] tracking-[0.6em] font-serif font-light opacity-90" style={{ fontFamily: 'var(--font-playfair)' }}>
          THE ARCHIVES
        </h1>
        <div className="font-sans text-xs tracking-widest text-white/40">
          VOL. {progress.toString().padStart(3, '0')}
        </div>
      </div>
    </div>
  );
}
