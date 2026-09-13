"use client";

import { useRef, useEffect } from 'react';
import { portfolioData } from '@/data/mockData';
import SplitType from 'split-type';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current) return;

    // Split text into individual characters for massive kinetic typography
    const splitTitle = new SplitType(titleRef.current, { types: 'chars,words' });
    
    const tl = gsap.timeline();
    
    // Initial Load Animation
    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    ).fromTo(splitTitle.chars, 
      { opacity: 0, y: 100, rotationX: -90 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        stagger: 0.02,
        duration: 1.2,
        ease: "expo.out"
      },
      "-=0.5"
    );

    // ScrollTrigger: Explode text as we scroll down
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      animation: gsap.to(splitTitle.chars, {
        y: (i) => (i % 2 === 0 ? -200 : 200),
        opacity: 0,
        rotationZ: (i) => (i % 2 === 0 ? -15 : 15),
        ease: "none"
      })
    });

    return () => {
      splitTitle.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

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
