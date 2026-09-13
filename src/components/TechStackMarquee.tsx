"use client";

import { useEffect, useRef } from 'react';
import { portfolioData } from '@/data/mockData';
import gsap from 'gsap';

export default function TechStackMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!innerRef.current) return;

    // Clone the content for seamless infinite scrolling
    const content = innerRef.current.innerHTML;
    innerRef.current.innerHTML = content + content;

    const totalWidth = innerRef.current.scrollWidth / 2;
    
    // Create the infinite animation
    gsap.to(innerRef.current, {
      x: -totalWidth,
      duration: 30,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <section className="relative w-full py-20 bg-[#88ccff] overflow-hidden z-10 selection:bg-black selection:text-white">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-10 mix-blend-overlay pointer-events-none" />
      
      <div className="w-full flex overflow-hidden whitespace-nowrap" ref={marqueeRef}>
        <div ref={innerRef} className="flex items-center gap-12 px-6">
          {portfolioData.techStack.map((tech, i) => (
            <div key={`${tech}-${i}`} className="flex items-center gap-12 text-[#030303]">
              <span className="text-4xl md:text-7xl font-bold uppercase tracking-tighter" style={{ fontFamily: 'var(--font-syncopate)' }}>
                {tech}
              </span>
              <span className="text-2xl opacity-50">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
