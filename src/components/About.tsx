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
      { opacity: 0, y: 40, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1.5
        }
      }
    );
  }, []);

  return (
    <section id="about" ref={containerRef} className="relative w-full py-48 text-white px-6 md:px-20 bg-transparent">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-20 relative z-10">
        
        {/* The Chapter Title - sticky so it stays while reading */}
        <div className="w-full md:w-1/4">
          <h2 className="text-xs font-sans tracking-[0.4em] uppercase text-[#d4af37] sticky top-32">
            CHAPTER I &mdash; THE ARCHITECT
          </h2>
        </div>

        {/* The Story Content */}
        <div className="w-full md:w-3/4">
          <div ref={textRef} className="text-3xl md:text-5xl lg:text-6xl font-serif leading-[1.3]" style={{ fontFamily: 'var(--font-playfair)' }}>
            {portfolioData.profile.bio.split('.').map((sentence: string, i: number) => (
              sentence.trim() && (
                <span key={i} className="block mb-8 md:mb-12 text-white/90 drop-shadow-xl">
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
