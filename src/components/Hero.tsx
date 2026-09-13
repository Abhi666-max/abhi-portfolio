"use client";

import { useRef, useEffect } from 'react';
import { portfolioData } from '@/data/mockData';
import SplitType from 'split-type';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero({ isLoaded = true }: { isLoaded?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current || !isLoaded) return;

    // Split text into individual characters for massive kinetic typography
    const splitTitle = new SplitType(titleRef.current, { types: 'chars,words' });
    
    const tl = gsap.timeline();
    
    // Initial Load Animation (Fires only after preloader finishes)
    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" }
    ).fromTo(splitTitle.chars, 
      { opacity: 0, y: 150, rotationX: -90, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        stagger: 0.03,
        duration: 1.5,
        ease: "expo.out"
      },
      "-=1.0"
    );

    // ScrollTrigger: Explode text as we scroll down
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      animation: gsap.to(splitTitle.chars, {
        y: (i) => (i % 2 === 0 ? -400 : 400),
        x: (i) => (i % 2 === 0 ? -200 : 200),
        opacity: 0,
        rotationZ: (i) => (i % 2 === 0 ? -45 : 45),
        scale: 0.5,
        ease: "none"
      })
    });

    return () => {
      splitTitle.revert();
    };
  }, [isLoaded]);

  return (
    <section ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-center bg-black">
      
      <div className="w-full px-6 flex flex-col items-center text-center z-10">
        
        <div ref={subtitleRef} className="font-mono text-xs md:text-sm tracking-[0.4em] uppercase mb-12 flex items-center gap-6 opacity-60">
          <span className="w-12 h-[1px] bg-white block" />
          {portfolioData.profile.title}
          <span className="w-12 h-[1px] bg-white block" />
        </div>
        
        <h1 
          ref={titleRef}
          className="text-[12vw] font-bold uppercase leading-[0.8] tracking-tighter text-white"
          style={{ fontFamily: 'var(--font-syncopate)', WebkitTextStroke: '1px rgba(255,255,255,1)' }}
        >
          {portfolioData.profile.name}
        </h1>
        
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
        <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-white/30 overflow-hidden">
          <div className="w-full h-full bg-white origin-top animate-pulse" />
        </div>
      </div>

    </section>
  );
}
