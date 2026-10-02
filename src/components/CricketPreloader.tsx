"use client";
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function CricketPreloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const crackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 5) + 1;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        
        // The 150kmph Shatter Animation
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.to(containerRef.current, { opacity: 0, duration: 0.5, delay: 0.5, onComplete });
          }
        });

        // Play heavy impact sound
        const hitSound = new Audio("https://cdn.pixabay.com/audio/2022/03/24/audio_34b2eeb793.mp3");
        hitSound.volume = 1;
        
        tl.to(ballRef.current, { 
          scale: 30, 
          rotation: 1080, 
          duration: 0.8, 
          ease: "power4.in",
          onStart: () => hitSound.play().catch(()=>{})
        })
        .to(crackRef.current, { opacity: 1, duration: 0.1 }, "-=0.1")
        .to(ballRef.current, { opacity: 0, duration: 0.1 }, "-=0.1")
        
      }
      setProgress(current);
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] bg-[#050a05] flex items-center justify-center overflow-hidden">
      
      {/* Background Stadium Lights */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50" />
      
      <div className="text-center z-10 relative">
        <h1 style={{ fontFamily: 'var(--font-sports)' }} className="text-7xl md:text-9xl text-white tracking-widest opacity-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
          {progress} MPH
        </h1>
        
        {/* 3D Spinning Leather Ball */}
        <div 
          ref={ballRef}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-[#ff3333] to-[#8b0000] shadow-[inset_-5px_-5px_20px_rgba(0,0,0,0.8),0_10px_20px_rgba(0,0,0,0.5)] relative z-20 flex items-center justify-center"
        >
          {/* Ball Seam */}
          <div className="w-full h-2 bg-white/40 rotate-45 flex items-center justify-evenly">
             {Array.from({length: 6}).map((_, i) => (
               <div key={i} className="w-1 h-3 bg-white/60 rotate-45" />
             ))}
          </div>
        </div>
      </div>

      {/* Glass Crack Overlay */}
      <div ref={crackRef} className="glass-crack opacity-0 z-30" />
    </div>
  );
}
