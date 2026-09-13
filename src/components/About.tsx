"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import SplitType from 'split-type';
import { portfolioData } from '@/data/mockData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    // Split text into words
    const split = new SplitType(textRef.current, { types: 'words' });

    // Initially hide the words
    gsap.set(split.words, { opacity: 0.1 });

    // Create the scroll-linked animation
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 60%",
      end: "bottom 60%",
      scrub: true,
      animation: gsap.to(split.words, {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        color: "#fff",
      })
    });

    return () => {
      split.revert();
      st.kill();
    };
  }, []);

  return (
    <section id="about" ref={containerRef} className="relative min-h-screen w-full flex items-center justify-center px-6 md:px-20 py-32 z-10">
      <div className="max-w-5xl">
        <h2 className="text-sm font-mono tracking-widest uppercase text-[#88ccff] mb-12">
          [01] // Core Directive
        </h2>
        
        <p 
          ref={textRef}
          className="text-3xl md:text-5xl leading-tight md:leading-snug font-light text-white/10"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {portfolioData.profile.bio}
        </p>

        {/* Subtle decorative elements */}
        <div className="mt-20 flex gap-4">
          <div className="w-16 h-[1px] bg-[#88ccff]/50" />
          <div className="w-4 h-[1px] bg-[#88ccff]/50" />
          <div className="w-1 h-[1px] bg-[#88ccff]/50" />
        </div>
      </div>
    </section>
  );
}
