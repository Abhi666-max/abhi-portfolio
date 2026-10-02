"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PubgPreloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const crateRef = useRef<HTMLDivElement>(null);
  const smokeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Plane sound
    const planeAudio = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_27d7807b58.mp3");
    planeAudio.volume = 0.5;
    planeAudio.play().catch(()=>{});

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, { opacity: 0, duration: 1, ease: "power2.inOut", onComplete });
      }
    });

    // Crate dropping from sky (top) to ground (center)
    tl.fromTo(crateRef.current, 
      { y: -800, scale: 0.5, rotation: 15 },
      { y: 0, scale: 1, rotation: 0, duration: 1.5, ease: "bounce.out" }
    );

    // Impact thud
    tl.add(() => {
      const thudAudio = new Audio("https://cdn.pixabay.com/audio/2022/03/24/audio_34b2eeb793.mp3");
      thudAudio.volume = 1;
      thudAudio.play().catch(()=>{});
    }, "-=1.5");

    // Red smoke emerges after hit
    tl.to(smokeRef.current, { opacity: 1, scale: 2, duration: 1, ease: "power2.out" }, "-=0.5")
      .to({}, { duration: 1.5 }); // Hold

  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] bg-[var(--bg-dark)] flex items-center justify-center overflow-hidden">
      
      {/* The Red Smoke */}
      <div ref={smokeRef} className="absolute red-smoke w-96 h-96 opacity-0" />
      
      {/* The Crate */}
      <div ref={crateRef} className="relative z-10 w-48 h-48 bg-[#a03232] border-4 border-[#5c1c1c] shadow-2xl flex flex-col justify-end p-4">
        <div className="absolute top-0 left-0 w-full h-12 bg-[#2B3326] border-b-8 border-black/30" />
        {/* Parachute strings remaining */}
        <div className="absolute -top-32 left-4 w-1 h-32 bg-white/20 origin-bottom -rotate-12" />
        <div className="absolute -top-32 right-4 w-1 h-32 bg-white/20 origin-bottom rotate-12" />
        
        <h1 className="heading text-5xl text-white drop-shadow-md text-center">
          SUPPLY DROP
        </h1>
      </div>
      
    </div>
  );
}
