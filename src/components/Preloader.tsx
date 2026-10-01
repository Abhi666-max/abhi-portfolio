"use client";
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (containerRef.current) containerRef.current.style.display = 'none';
        onComplete();
      }
    });

    // Animate the Royal Seal stamping down
    tl.fromTo(sealRef.current, 
      { scale: 5, opacity: 0, rotation: -45 },
      { scale: 1, opacity: 1, rotation: 0, duration: 1.5, ease: "bounce.out" }
    )
    .fromTo(textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "-=0.5"
    )
    // Hold
    .to({}, { duration: 1.5 })
    // Burn away / Fade out like old paper
    .to(containerRef.current, {
      opacity: 0,
      filter: 'blur(20px) contrast(2)',
      duration: 1.5,
      ease: "power2.inOut"
    });

  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#d7c4a1]"
      style={{
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/old-paper.png")',
        backgroundBlendMode: 'multiply'
      }}
    >
      {/* The Rajmudra (Royal Seal) Representation */}
      <div 
        ref={sealRef}
        className="w-48 h-48 rounded-full border-[6px] border-[#8b2500] flex items-center justify-center p-2 mb-8 relative"
        style={{
          boxShadow: 'inset 0 0 20px rgba(139,37,0,0.5), 0 0 30px rgba(139,37,0,0.3)',
          background: 'rgba(139,37,0,0.1)'
        }}
      >
        <div className="w-full h-full rounded-full border-2 border-[#8b2500] border-dashed flex flex-col items-center justify-center text-[#8b2500] text-center p-4">
          <span style={{ fontFamily: 'var(--font-yatra)' }} className="text-xl leading-tight">
            प्रतिपच्चंद्रलेखेव
          </span>
          <span style={{ fontFamily: 'var(--font-yatra)' }} className="text-2xl mt-1 font-bold">
            राजमुद्रा
          </span>
        </div>
      </div>
      
      <div ref={textRef} className="flex flex-col items-center text-[#3b2314]">
        <div className="text-3xl md:text-5xl" style={{ fontFamily: 'var(--font-yatra)' }}>
          जय भवानी • जय शिवाजी
        </div>
        <div className="text-sm md:text-lg tracking-[0.5em] uppercase mt-6 opacity-80 border-t border-[#8b2500] pt-4" style={{ fontFamily: 'var(--font-crimson)' }}>
          Unrolling The Maratha Chronicles
        </div>
      </div>
    </div>
  );
}
