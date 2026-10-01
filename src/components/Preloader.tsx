"use client";
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

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
          scale: 150, 
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
    }, 35);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[999] flex items-center justify-center bg-[#1a0500] overflow-hidden">
      <div 
        ref={circleRef} 
        className="absolute w-4 h-4 bg-[#ff671f] rounded-full mix-blend-overlay z-0 origin-center"
        style={{ scale: 0 }}
      />
      
      <div ref={textRef} className="relative z-10 flex flex-col items-center text-[#ffd700]">
        <div className="font-serif text-8xl md:text-[12vw] font-bold leading-none" style={{ fontFamily: 'var(--font-playfair)' }}>
          {progress}
        </div>
        <div className="font-sans text-xl md:text-2xl tracking-[0.4em] uppercase mt-6 font-bold text-[#ff671f] drop-shadow-lg">
          जय भवानी • जय शिवाजी
        </div>
        <div className="font-sans text-xs tracking-[0.5em] uppercase mt-4 opacity-70">
          The Maratha Chronicles
        </div>
      </div>
    </div>
  );
}
