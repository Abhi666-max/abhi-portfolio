"use client";

import { useEffect, useRef } from 'react';
import { portfolioData } from '@/data/mockData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const items = gsap.utils.toArray<HTMLElement>('.exp-item');
    
    items.forEach((item, i) => {
      gsap.fromTo(item, 
        { opacity: 0, x: -50 },
        {
          opacity: 1, 
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          }
        }
      );
    });
  }, []);

  return (
    <section id="experience" ref={containerRef} className="relative w-full py-32 px-6 md:px-20 z-10 pointer-events-none">
      <div className="max-w-4xl mx-auto pointer-events-auto">
        <h2 className="text-sm font-mono tracking-widest uppercase text-[#ff3333] mb-20">
          [02] // Operational History
        </h2>

        <div className="flex flex-col border-t border-[#111111]">
          {portfolioData.experience.map((exp, i) => (
            <div 
              key={i} 
              className="exp-item group flex flex-col md:flex-row justify-between items-start md:items-center py-12 border-b border-[#111111] hover:bg-[#111111] hover:text-[#e6e6e6] transition-colors duration-500 cursor-none"
            >
              <div className="w-full md:w-1/3 mb-6 md:mb-0 px-4">
                <div className="font-mono text-sm opacity-60 mb-2">{exp.period}</div>
                <h3 className="text-2xl font-bold uppercase tracking-tighter" style={{ fontFamily: 'var(--font-syncopate)' }}>
                  {exp.company}
                </h3>
              </div>
              
              <div className="w-full md:w-1/3 mb-6 md:mb-0 px-4">
                <div className="text-lg font-bold">{exp.role}</div>
              </div>
              
              <div className="w-full md:w-1/3 px-4">
                <p className="opacity-70 text-sm font-mono leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
