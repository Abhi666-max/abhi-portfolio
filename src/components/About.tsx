"use client";

import { useRef, useEffect } from 'react';
import { portfolioData } from '@/data/mockData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    const lines = textRef.current.children;

    gsap.fromTo(lines, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 80%",
          scrub: 1
        }
      }
    );
  }, []);

  return (
    <section id="about" ref={containerRef} className="relative w-full py-48 bg-black text-white px-6 md:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-20">
        
        <div className="w-full md:w-1/4">
          <h2 className="text-sm font-mono tracking-widest uppercase opacity-50 sticky top-32">
            [01] // About
          </h2>
        </div>

        <div className="w-full md:w-3/4">
          <div ref={textRef} className="text-3xl md:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tighter" style={{ fontFamily: 'var(--font-syncopate)' }}>
            {portfolioData.profile.bio.split('.').map((sentence: string, i: number) => (
              sentence.trim() && (
                <span key={i} className="block mb-6 md:mb-10 text-white/90">
                  {sentence.trim()}.
                </span>
              )
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
