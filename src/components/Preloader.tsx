"use client";
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 4) + 1;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        
        const tl = gsap.timeline({
          onComplete: () => {
            if (containerRef.current) containerRef.current.style.display = 'none';
            onComplete();
          }
        });

        tl.to(textRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.in"
        })
        .to(circleRef.current, {
          scale: 150, // Massive scale to act as an aperture opening
          duration: 1.5,
          ease: "power4.inOut"
        }, "-=0.2")
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out"
        });
      }
      setProgress(current);
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[999] pointer-events-none flex items-center justify-center bg-[#050505] overflow-hidden">
      <div 
        ref={circleRef} 
        className="absolute w-4 h-4 bg-[#f0f0f0] rounded-full mix-blend-difference z-0 origin-center"
        style={{ scale: 0 }}
      />
      
      <div ref={textRef} className="relative z-10 flex flex-col items-center mix-blend-difference text-[#f0f0f0]">
        <div className="font-serif text-8xl md:text-[15vw] font-bold leading-none tracking-tighter" style={{ fontFamily: 'var(--font-playfair)' }}>
          {progress}
        </div>
        <div className="font-sans text-xs tracking-[0.5em] uppercase mt-4">
          Initiating Experience
        </div>
      </div>
    </div>
  );
}
