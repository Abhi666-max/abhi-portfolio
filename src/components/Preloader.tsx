"use client";

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const topHalfRef = useRef<HTMLDivElement>(null);
  const bottomHalfRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Aggressive counter
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 15) + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        
        // The split animation
        const tl = gsap.timeline({
          onComplete: () => {
            if (containerRef.current) containerRef.current.style.display = 'none';
            onComplete();
          }
        });

        tl.to(textRef.current, {
          opacity: 0,
          scale: 1.5,
          duration: 0.5,
          ease: "expo.in"
        })
        .to(topHalfRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "expo.inOut"
        }, "-=0.2")
        .to(bottomHalfRef.current, {
          yPercent: 100,
          duration: 1.2,
          ease: "expo.inOut"
        }, "-=1.2");
      }
      setProgress(current);
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[999] pointer-events-none flex flex-col">
      <div ref={topHalfRef} className="w-full h-1/2 bg-white origin-top" />
      <div ref={bottomHalfRef} className="w-full h-1/2 bg-white origin-bottom" />
      
      <div ref={textRef} className="absolute inset-0 flex items-center justify-center mix-blend-difference">
        <h1 className="text-[15vw] font-bold text-white tracking-tighter" style={{ fontFamily: 'var(--font-syncopate)' }}>
          {progress}%
        </h1>
      </div>
    </div>
  );
}
