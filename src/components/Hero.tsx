"use client";
import { useRef, useEffect } from 'react';
import { portfolioData } from '@/data/mockData';
import gsap from 'gsap';

export default function Hero({ isLoaded }: { isLoaded: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded || !contentRef.current || !bgRef.current) return;

    const tl = gsap.timeline();
    
    // Background elegantly zooms out and fades in
    tl.fromTo(bgRef.current,
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 0.5, duration: 2.5, ease: "power3.out" }
    );

    // Text gracefully fades up
    tl.fromTo(contentRef.current.children,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: "power3.out" },
      "-=1.5"
    );
  }, [isLoaded]);

  return (
    <section ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      
      {/* Elegant Atmospheric Background */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 bg-cover bg-center grayscale opacity-0"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop)' }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0a0a]/50 via-[#0a0a0a]/80 to-[#0a0a0a]" />

      <div ref={contentRef} className="relative z-10 w-full px-6 flex flex-col items-center text-center mt-20">
        
        <div className="font-sans text-xs tracking-[0.4em] uppercase text-[#d4af37] mb-8">
          {portfolioData.profile.title}
        </div>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif leading-none tracking-wide text-[#f5f5f7]" style={{ fontFamily: 'var(--font-playfair)' }}>
          {portfolioData.profile.name}
        </h1>
        
      </div>
      
    </section>
  );
}
