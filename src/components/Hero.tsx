"use client";

import { useRef, useEffect } from 'react';
import { portfolioData } from '@/data/mockData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import SplitType from 'split-type';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero({ isLoaded = true }: { isLoaded?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current || !isLoaded) return;

    // Split text for elegant reveal
    const splitTitle = new SplitType(titleRef.current, { types: 'chars' });
    
    const tl = gsap.timeline();
    
    // 1. Elegant Fade In (The Unveiling)
    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 2.0, ease: "power3.out" }
    ).fromTo(splitTitle.chars, 
      { opacity: 0, y: 50, filter: "blur(12px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.04,
        duration: 2.5,
        ease: "power2.out"
      },
      "-=1.5"
    ).fromTo(scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 0.5, duration: 1.5, ease: "power2.out" },
      "-=1.0"
    );

    // 2. The Story Scroll (Title shrinks and moves up gracefully)
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1.2, // Buttery smooth scrubbing
      animation: gsap.to(titleRef.current, {
        scale: 0.5,
        y: -150,
        opacity: 0,
        ease: "power1.inOut"
      })
    });

    return () => {
      splitTitle.revert();
    };
  }, [isLoaded]);

  return (
    <section ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-center pt-20">
      
      <div className="w-full px-6 flex flex-col items-center text-center z-10">
        
        {/* Subtle, expensive-looking subtitle */}
        <div ref={subtitleRef} className="font-sans text-xs md:text-sm tracking-[0.6em] uppercase mb-16 flex items-center gap-8 opacity-60 text-[#d4af37]">
          <span className="w-24 h-[1px] bg-[#d4af37] block opacity-40" />
          {portfolioData.profile.title}
          <span className="w-24 h-[1px] bg-[#d4af37] block opacity-40" />
        </div>
        
        {/* Massive, elegant serif typography */}
        <h1 
          ref={titleRef}
          className="text-[12vw] font-serif uppercase leading-[0.9] tracking-widest text-white/90 drop-shadow-2xl"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {portfolioData.profile.name}
        </h1>
        
      </div>
      
      {/* Expensive Scroll indicator */}
      <div ref={scrollIndicatorRef} className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 opacity-0">
        <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-[#d4af37]">Begin The Story</span>
        <div className="w-[1px] h-20 bg-white/10 overflow-hidden">
          <div className="w-full h-full bg-[#d4af37] origin-top animate-pulse" />
        </div>
      </div>

    </section>
  );
}
