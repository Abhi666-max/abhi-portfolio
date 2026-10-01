"use client";
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function AnimePreloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const slashRef = useRef<HTMLDivElement>(null);
  const topHalfRef = useRef<HTMLDivElement>(null);
  const bottomHalfRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 2;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        
        // Execute Anime Slash Animation
        const tl = gsap.timeline({
          onComplete: () => {
            if (containerRef.current) containerRef.current.style.display = 'none';
            onComplete();
          }
        });

        // 1. Flash white
        tl.to(textRef.current, { scale: 1.5, opacity: 0, duration: 0.2, ease: "expo.in" })
          .to(slashRef.current, { scaleX: 1, duration: 0.1, ease: "power4.in" }) // Sword slash line appears
          .to(topHalfRef.current, { yPercent: -100, xPercent: -10, duration: 0.5, ease: "power4.inOut" }, "+=0.1")
          .to(bottomHalfRef.current, { yPercent: 100, xPercent: 10, duration: 0.5, ease: "power4.inOut" }, "<");
      }
      setProgress(current);
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none">
      {/* The Two Halves that will split */}
      <div ref={topHalfRef} className="absolute top-0 left-0 w-full h-[50%] bg-[#ff003c] origin-bottom border-b-[4px] border-black" />
      <div ref={bottomHalfRef} className="absolute bottom-0 left-0 w-full h-[50%] bg-[#ff003c] origin-top border-t-[4px] border-black" />
      
      {/* The Slash Line */}
      <div ref={slashRef} className="absolute top-1/2 left-0 w-full h-2 bg-white -translate-y-1/2 scale-x-0 origin-left z-10 shadow-[0_0_20px_#fff]" />

      {/* Text Content */}
      <div ref={textRef} className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <h1 style={{ fontFamily: 'var(--font-anton)' }} className="text-8xl md:text-[15vw] text-white tracking-wider leading-none mix-blend-difference">
          {progress}%
        </h1>
        <div className="flex gap-4 mt-4">
          {['覚', '醒', '開', '始'].map((kanji, i) => (
            <span key={i} className="text-black text-2xl md:text-4xl font-bold bg-white px-2 py-1 border-2 border-black" style={{ fontFamily: 'var(--font-anton)' }}>
              {kanji}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
