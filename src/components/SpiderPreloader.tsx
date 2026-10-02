"use client";
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function SpiderPreloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Play spray paint & hip hop beat
    const sprayAudio = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_73229bbf93.mp3"); // Noise
    sprayAudio.volume = 0.5;
    sprayAudio.play().catch(()=>{});

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, { 
          scale: 5, 
          opacity: 0, 
          duration: 0.6, 
          ease: "expo.in", 
          onComplete 
        });
      }
    });

    // Animate the text like a comic popup
    tl.fromTo(textRef.current, 
      { scale: 0, rotation: -20 },
      { scale: 1, rotation: 5, duration: 0.8, ease: "elastic.out(1, 0.3)" }
    )
    .to(textRef.current, { scale: 1.1, duration: 0.2, yoyo: true, repeat: 3 })
    .to(textRef.current, { opacity: 0, duration: 0.2 }, "+=0.5");

  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] bg-[#00f0ff] flex items-center justify-center action-lines overflow-hidden">
      <h1 
        ref={textRef} 
        className="text-[15vw] text-white font-bold leading-none tracking-tighter"
        style={{ fontFamily: 'var(--font-bangers)', textShadow: '10px 10px 0px #ff003c, -5px -5px 0px #fffb00' }}
      >
        THWIP!
      </h1>
    </div>
  );
}
