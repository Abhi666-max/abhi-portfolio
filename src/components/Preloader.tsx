"use client";
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

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
        gsap.to(textRef.current, { opacity: 0, y: -20, duration: 0.5 });
        
        setTimeout(() => setIsReady(true), 1500);
      }
      setProgress(current);
    }, 35);
    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      filter: 'blur(20px) contrast(2)',
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: () => {
        if (containerRef.current) containerRef.current.style.display = 'none';
        onComplete();
      }
    });
  };

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#d7c4a1]"
      style={{
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/old-paper.png")',
        backgroundBlendMode: 'multiply'
      }}
    >
      <div 
        ref={sealRef}
        className="w-48 h-48 rounded-full border-[6px] border-[#8b2500] flex items-center justify-center p-2 mb-8 relative opacity-0"
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
      
      {!isReady ? (
        <div ref={textRef} className="flex flex-col items-center text-[#3b2314]">
          <div className="text-3xl md:text-5xl" style={{ fontFamily: 'var(--font-yatra)' }}>
            {progress}%
          </div>
          <div className="text-sm md:text-lg tracking-[0.5em] uppercase mt-6 opacity-80" style={{ fontFamily: 'var(--font-crimson)' }}>
            Preparing the Chronicles
          </div>
        </div>
      ) : (
        <button 
          onClick={handleEnter}
          className="mt-8 px-8 py-3 border-2 border-[#8b2500] text-[#8b2500] font-bold tracking-[0.3em] uppercase hover:bg-[#8b2500] hover:text-[#d7c4a1] transition-colors duration-500 hover-target cursor-none"
          style={{ fontFamily: 'var(--font-crimson)' }}
        >
          Enter Darbar
        </button>
      )}
    </div>
  );
}
