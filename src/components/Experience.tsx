"use client";

import { useRef, useEffect } from 'react';
import { portfolioData } from '@/data/mockData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      gsap.fromTo(item,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          }
        }
      );
    });
  }, []);

  return (
    <section id="experience" ref={containerRef} className="relative w-full py-32 text-white px-6 md:px-20 bg-transparent">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-20 relative z-10">
        
        {/* Chapter Title */}
        <div className="w-full md:w-1/4">
          <h2 className="text-xs font-sans tracking-[0.4em] uppercase text-[#d4af37] sticky top-32">
            CHAPTER II &mdash; THE JOURNEY
          </h2>
        </div>

        {/* The Timeline */}
        <div className="w-full md:w-3/4 flex flex-col">
          {portfolioData.experience.map((exp, i) => (
            <div 
              key={exp.id} 
              ref={el => { itemsRef.current[i] = el; }}
              className="group flex flex-col py-16 border-t border-[#d4af37]/20 hover:border-[#d4af37] transition-colors cursor-none hover-target"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-end mb-8">
                <h3 className="text-4xl md:text-5xl font-serif tracking-widest transition-colors group-hover:text-white text-white/60" style={{ fontFamily: 'var(--font-playfair)' }}>
                  {exp.role}
                </h3>
                <span className="font-sans text-xs opacity-60 mt-6 md:mt-0 uppercase tracking-widest text-[#d4af37]">
                  {exp.period}
                </span>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
