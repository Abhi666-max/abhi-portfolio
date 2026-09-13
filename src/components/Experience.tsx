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
    
  
  return (
    <section id="experience" ref={containerRef} className="relative w-full py-32 px-6 md:px-20 z-10 pointer-events-none">
      <div className="max-w-5xl mx-auto pointer-events-auto">
        <h2 className="text-sm font-mono tracking-widest uppercase text-[var(--accent)] mb-20 glow-text">
          [02] // Experience
        </h2>

        <div className="flex flex-col">
          {portfolioData.experience.map((exp, i) => (
            <div 
              key={exp.id} 
              className="group flex flex-col md:flex-row justify-between items-start md:items-center py-12 border-t border-[var(--accent)]/30 hover:bg-[var(--accent)]/10 transition-colors px-4 glow-box"
            >
              <div className="flex flex-col w-full md:w-1/3">
                <span className="font-mono text-sm text-[var(--accent)] mb-2">
                  {exp.period}
                </span>
                <h3 className="text-3xl font-bold uppercase text-white glow-text" style={{ fontFamily: 'var(--font-syncopate)' }}>
                  {exp.role}
                </h3>
              </div>
              
              <div className="w-full md:w-1/3 flex flex-col mt-4 md:mt-0">
                <span className="text-xl font-bold text-[var(--accent)]">
                  {exp.company}
                </span>
              </div>

              <div className="w-full md:w-1/3 mt-6 md:mt-0 opacity-80 text-sm font-mono text-white/80">
                {exp.description}
              </div>
            </div>
          ))}
          <div className="border-t border-[var(--accent)]/30 w-full" />
        </div>
      </div>
    </section>
  );
}
