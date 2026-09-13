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
    if (!containerRef.current || !lineRef.current) return;

    // Animate the vertical line
    gsap.fromTo(lineRef.current, 
      { height: "0%" },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      }
    );

    // Fade in each experience item
    itemsRef.current.forEach((item, index) => {
      if (!item) return;
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
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  return (
    <section id="experience" ref={containerRef} className="relative w-full py-32 px-6 md:px-20 z-10 text-white">
      <div className="max-w-4xl mx-auto relative">
        <h2 className="text-sm font-mono tracking-widest uppercase text-[#88ccff] mb-20 text-center">
          [02] // Operation History
        </h2>

        {/* The Timeline Track */}
        <div className="absolute left-[15px] md:left-1/2 top-32 bottom-0 w-[1px] bg-white/10" />
        {/* The Animated Line */}
        <div ref={lineRef} className="absolute left-[15px] md:left-1/2 top-32 w-[1px] bg-[#88ccff] shadow-[0_0_10px_#88ccff]" />

        <div className="flex flex-col gap-24">
          {portfolioData.experience.map((exp, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={exp.id} 
                ref={el => { itemsRef.current[index] = el; }}
                className={`relative flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline Node */}
                <div className="absolute left-[11px] md:left-1/2 top-2 w-[9px] h-[9px] bg-[#030303] border-2 border-[#88ccff] rounded-full transform md:-translate-x-1/2 z-10" />

                {/* Content */}
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                  <div className="font-mono text-[#88ccff]/70 text-sm mb-2">{exp.period}</div>
                  <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-1" style={{ fontFamily: 'var(--font-syncopate)' }}>
                    {exp.company}
                  </h3>
                  <h4 className="text-xl font-light italic mb-6 text-white/80" style={{ fontFamily: 'var(--font-playfair)' }}>
                    {exp.role}
                  </h4>
                  <p className="text-white/50 leading-relaxed font-light">
                    {exp.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
