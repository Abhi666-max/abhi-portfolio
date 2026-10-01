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
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          }
        }
      );
    });
  }, []);

  return (
    <section id="experience" ref={containerRef} className="relative w-full py-40 px-6 md:px-20 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-20">
        
        <div className="w-full md:w-1/3">
          <h2 className="text-xs font-sans tracking-[0.3em] uppercase text-[#d4af37]">
            02 / Experience
          </h2>
        </div>

        <div className="w-full md:w-2/3 flex flex-col">
          {portfolioData.experience.map((exp, i) => (
            <div 
              key={exp.id} 
              ref={el => { itemsRef.current[i] = el; }}
              className="group flex flex-col py-12 border-t border-[#333] hover:border-[#d4af37] transition-colors duration-500"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-end mb-6">
                <h3 className="text-3xl md:text-4xl font-serif text-[#f5f5f7] transition-colors duration-500" style={{ fontFamily: 'var(--font-playfair)' }}>
                  {exp.role}
                </h3>
                <span className="font-sans text-xs opacity-60 mt-4 md:mt-0 uppercase tracking-widest text-[#d4af37]">
                  {exp.period}
                </span>
              </div>
              <p className="font-sans text-sm text-[#888] tracking-wide uppercase">
                {exp.company}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
