"use client";
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 5) + 1;
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
          opacity: 0,
          y: -20,
          duration: 0.8,
          ease: "power2.inOut"
        })
        .to(containerRef.current, {
          yPercent: -100, // Slides up elegantly
          duration: 1.2,
          ease: "power4.inOut"
        }, "-=0.2");
      }
      setProgress(current);
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0a0a0a]">
      <div ref={textRef} className="flex flex-col items-center">
        <span className="font-sans text-sm tracking-[0.5em] text-[#d4af37] mb-4">LOADING</span>
        <div className="font-serif text-5xl text-[#f5f5f7]" style={{ fontFamily: 'var(--font-playfair)' }}>
          {progress}%
        </div>
      </div>
    </div>
  );
}
