"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { portfolioData } from '@/data/mockData';

export default function SpiderEngine() {
  const cityRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Upside-down Parallax City Effect
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 50;
      const y = (e.clientY / window.innerHeight - 0.5) * 50;
      
      gsap.to(cityRef.current, {
        x: x,
        y: y,
        duration: 1,
        ease: "power2.out"
      });

      gsap.to(textContainerRef.current, {
        x: -x * 1.5,
        y: -y * 1.5,
        rotationX: y * 0.5,
        rotationY: x * 0.5,
        duration: 1,
        ease: "power2.out",
        transformPerspective: 1000
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="w-full min-h-screen relative z-10 overflow-hidden flex flex-col justify-center items-center">
      
      {/* UPSIDE DOWN CITY BACKGROUND */}
      <div 
        ref={cityRef}
        className="absolute -inset-[10%] bg-cover bg-bottom opacity-40 z-0 pointer-events-none"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2000&auto=format&fit=crop")',
          transform: 'scaleY(-1) scale(1.1)', // Flips the city upside down!
          filter: 'hue-rotate(180deg) saturate(200%) contrast(150%)'
        }}
      >
        {/* Color Overlay for Comic Book Vibe */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#ff003c]/40 via-transparent to-[#00f0ff]/40 mix-blend-overlay" />
      </div>

      {/* HERO CONTENT */}
      <div ref={textContainerRef} className="relative z-10 flex flex-col items-center text-center p-4">
        
        {/* Graffiti Tag */}
        <div 
          className="absolute -top-12 -left-12 md:-left-24 text-4xl md:text-6xl text-[#fffb00] -rotate-12 z-20"
          style={{ fontFamily: "'Permanent Marker', cursive", textShadow: '2px 2px 0px #000' }}
        >
          Any Anyone Can Wear The Mask
        </div>

        <h1 className="glitch-text text-[15vw] md:text-[12vw] leading-[0.8] text-white">
          {portfolioData.profile.name.split(' ')[0]}
          <br/>
          <span className="text-transparent" style={{ WebkitTextStroke: '3px white' }}>
            {portfolioData.profile.name.split(' ')[1] || 'MORALES'}
          </span>
        </h1>

        <div className="mt-8 comic-panel px-6 py-2 -rotate-3 hover:rotate-3 transition-transform duration-200 cursor-none">
          <h2 className="text-2xl md:text-4xl text-white uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            CREATIVE WEB SLINGER
          </h2>
        </div>

      </div>

      {/* Comic Action Starburst */}
      <div className="absolute bottom-10 right-10 comic-panel p-4 rounded-full w-24 h-24 flex items-center justify-center rotate-12 hover:-rotate-12 transition-transform hover:scale-110 cursor-none">
        <span className="text-[#fffb00] text-3xl font-bold" style={{ fontFamily: "'Bangers', cursive" }}>
          NEW!
        </span>
      </div>

    </div>
  );
}
