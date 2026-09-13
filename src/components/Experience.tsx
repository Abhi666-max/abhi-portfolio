"use client";

import { useRef, useEffect } from 'react';
import { portfolioData } from '@/data/mockData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import ScrambleText from './ScrambleText';

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
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          }
        }
      );
    });
  }, []);

  return (
    <section id="experience" ref={containerRef} className="relative w-full py-32 bg-black text-white px-6 md:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-20">
        
        <div className="w-full md:w-1/4">
          <h2 className="text-sm font-mono tracking-widest uppercase opacity-50 sticky top-32">
            <ScrambleText text="[02] // Experience" />
          </h2>
        </div>

        <div className="w-full md:w-3/4 flex flex-col">
          {portfolioData.experience.map((exp, i) => (
            <div 
              key={exp.id} 
              ref={el => { itemsRef.current[i] = el; }}
              className="group flex flex-col py-12 border-t border-white/20 hover:border-white transition-colors cursor-none hover-target"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-end mb-8">
                <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter transition-colors group-hover:text-white text-white/70" style={{ fontFamily: 'var(--font-syncopate)' }}>
                  {exp.role}
                </h3>
                <span className="font-mono text-sm opacity-50 mt-4 md:mt-0">
                  {exp.period}
                </span>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                <span className="text-xl font-mono uppercase tracking-widest text-white/90">
                  {exp.company}
                </span>
                <p className="w-full md:w-1/2 opacity-60 text-sm font-mono leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
          <div className="border-t border-white/20 w-full" />
        </div>

      </div>
    </section>
  );
}
