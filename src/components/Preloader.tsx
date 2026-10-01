"use client";
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 4) + 1;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        
        // Show Seal
        gsap.fromTo(sealRef.current, 
          { scale: 5, opacity: 0, rotation: -45 },
          { scale: 1, opacity: 1, rotation: 0, duration: 1.5, ease: "bounce.out" }
        );
        
        setTimeout(() => setIsReady(true), 1500);
      }
      setProgress(current);
    }, 35);
    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    // Play heavy wooden door creak sound
    const audio = new Audio("https://cdn.pixabay.com/audio/2022/03/24/audio_34b2eeb793.mp3");
    audio.volume = 0.8;
    audio.play().catch(() => {});

    // Fade out text and button
    gsap.to(contentRef.current, { opacity: 0, duration: 0.5 });

    // Open Mahadwar (Doors)
    gsap.to(leftDoorRef.current, {
      rotationY: 100, // Swing open like a real door
      duration: 3,
      ease: "power2.inOut"
    });
    
    gsap.to(rightDoorRef.current, {
      rotationY: -100, 
      duration: 3,
      ease: "power2.inOut",
      onComplete: () => {
        if (containerRef.current) containerRef.current.style.display = 'none';
        onComplete();
      }
    });
  };

  // Helper to generate Iron Studs (Khile) on the doors
  const renderStuds = (isLeft: boolean) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <div 
        key={i} 
        className={`absolute w-6 h-6 rounded-full bg-gradient-to-br from-[#5a5a5a] to-[#1a1a1a] shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_5px_10px_rgba(0,0,0,0.8)] border border-[#000]`}
        style={{ top: `${15 + i * 18}%`, [isLeft ? 'right' : 'left']: '10%' }}
      />
    ));
  };

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[999] flex" 
      style={{ perspective: '1500px', backgroundColor: '#000' }}
    >
      
      {/* Left Door */}
      <div 
        ref={leftDoorRef} 
        className="w-1/2 h-full bg-[#3b2314] relative origin-left z-10"
        style={{ 
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")',
          boxShadow: 'inset -20px 0 50px rgba(0,0,0,0.8), 20px 0 50px rgba(0,0,0,0.9)'
        }}
      >
        {/* Door Frame/Border */}
        <div className="absolute inset-y-0 right-0 w-8 bg-[#2a160b] border-l-2 border-[#5c3a21] shadow-[inset_5px_0_15px_rgba(0,0,0,0.8)]" />
        {renderStuds(true)}
      </div>

      {/* Right Door */}
      <div 
        ref={rightDoorRef} 
        className="w-1/2 h-full bg-[#3b2314] relative origin-right z-10"
        style={{ 
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")',
          boxShadow: 'inset 20px 0 50px rgba(0,0,0,0.8), -20px 0 50px rgba(0,0,0,0.9)'
        }}
      >
        {/* Door Frame/Border */}
        <div className="absolute inset-y-0 left-0 w-8 bg-[#2a160b] border-r-2 border-[#5c3a21] shadow-[inset_-5px_0_15px_rgba(0,0,0,0.8)]" />
        {renderStuds(false)}
      </div>


      {/* Center Content (Rajmudra and Button) */}
      <div ref={contentRef} className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
        
        {/* The Rajmudra Seal bridging the two doors */}
        <div 
          ref={sealRef}
          className="w-56 h-56 rounded-full border-[8px] border-[#ffd700] flex items-center justify-center p-2 mb-12 relative opacity-0 bg-[#8b2500] shadow-[0_10px_50px_rgba(0,0,0,0.9),inset_0_0_30px_rgba(0,0,0,0.5)]"
        >
          <div className="w-full h-full rounded-full border-4 border-[#ffd700] border-dashed flex flex-col items-center justify-center text-[#ffd700] text-center p-4">
            <span style={{ fontFamily: 'var(--font-yatra)' }} className="text-2xl leading-tight">
              प्रतिपच्चंद्रलेखेव
            </span>
            <span style={{ fontFamily: 'var(--font-yatra)' }} className="text-4xl mt-2 font-bold drop-shadow-md">
              राजमुद्रा
            </span>
          </div>
        </div>
        
        {!isReady ? (
          <div className="flex flex-col items-center text-[#ffd700] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            <div className="text-4xl md:text-6xl" style={{ fontFamily: 'var(--font-yatra)' }}>
              {progress}%
            </div>
            <div className="text-xs md:text-sm tracking-[0.5em] uppercase mt-6 opacity-80" style={{ fontFamily: 'var(--font-crimson)' }}>
              Approaching the Gates
            </div>
          </div>
        ) : (
          <button 
            onClick={handleEnter}
            className="pointer-events-auto px-10 py-4 border-2 border-[#ffd700] text-[#ffd700] bg-black/50 backdrop-blur-sm font-bold text-lg tracking-[0.4em] uppercase hover:bg-[#ffd700] hover:text-[#8b2500] transition-colors duration-500 hover-target cursor-none shadow-[0_0_30px_rgba(255,215,0,0.2)]"
            style={{ fontFamily: 'var(--font-crimson)' }}
          >
            Open Mahadwar
          </button>
        )}
      </div>

    </div>
  );
}
