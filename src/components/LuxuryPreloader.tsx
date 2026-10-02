"use client";
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function LuxuryPreloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 3) + 1;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.to(containerRef.current, { yPercent: -100, duration: 1, ease: "expo.inOut", onComplete });
          }
        });

        tl.to(textRef.current, { y: -20, opacity: 0, duration: 0.6, ease: "power2.inOut" })
          .to(lineRef.current, { scaleX: 0, duration: 0.6, ease: "power2.inOut" }, "-=0.4");
      }
      setProgress(current);
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] bg-[#030303] flex flex-col items-center justify-center">
      <div className="overflow-hidden mb-4">
        <h1 ref={textRef} className="text-serif text-5xl md:text-7xl font-light tracking-widest text-[#f5f5f7]">
          {String(progress).padStart(3, '0')}
        </h1>
      </div>
      <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
        <div ref={lineRef} className="absolute top-0 left-0 h-full bg-[#f5f5f7] origin-left" style={{ width: `${progress}%`, transition: 'width 0.1s linear' }} />
      </div>
    </div>
  );
}
