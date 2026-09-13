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
      { opacity: 1, y: 0, duration: 2.0, ease: "power2.out" }
    ).fromTo(splitTitle.chars, 
      { opacity: 0, y: 30, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.05,
        duration: 2.0,
        ease: "power2.out"
      },
      "-=1.5"
    );

    // ScrollTrigger: Elegant slow parallax push
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      animation: gsap.to(splitTitle.chars, {
        y: (i) => (i * 20) - 200,
        opacity: 0,
        filter: "blur(20px)",
        stagger: 0.02,
        ease: "none"
      })
    });

    return () => {
      splitTitle.revert();
    };
  }, [isLoaded]);

  return (
    <section ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-center">
      
      <div className="w-full px-6 flex flex-col items-center text-center z-10">
        
        <div ref={subtitleRef} className="font-sans text-xs md:text-sm tracking-[0.5em] uppercase mb-12 flex items-center gap-6 opacity-60 text-[#c89d70]">
          <span className="w-16 h-[1px] bg-[#c89d70] block opacity-50" />
          {portfolioData.profile.title}
          <span className="w-16 h-[1px] bg-[#c89d70] block opacity-50" />
        </div>
        
        <h1 
          ref={titleRef}
          className="text-[10vw] font-serif uppercase leading-[1.0] tracking-widest text-white/90 drop-shadow-2xl"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {portfolioData.profile.name}
        </h1>
        
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#c89d70]">Scroll to Explore</span>
        <div className="w-[1px] h-16 bg-white/20 overflow-hidden">
          <div className="w-full h-full bg-[#c89d70] origin-top animate-pulse" />
        </div>
      </div>

    </section>
  );
}
