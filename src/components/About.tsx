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
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );
  }, []);

  return (
    <section id="about" ref={containerRef} className="relative w-full py-40 px-6 md:px-20 bg-transparent">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-20">
        
        <div className="w-full md:w-1/3">
          <h2 className="text-xs font-sans tracking-[0.3em] uppercase text-[#d4af37]">
            01 / Introduction
          </h2>
        </div>

        <div className="w-full md:w-2/3">
          <div ref={textRef} className="text-2xl md:text-4xl lg:text-5xl font-serif leading-[1.4] text-[#f5f5f7]" style={{ fontFamily: 'var(--font-playfair)' }}>
            {portfolioData.profile.bio.split('.').map((sentence: string, i: number) => (
              sentence.trim() && (
                <span key={i} className="block mb-8">
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
