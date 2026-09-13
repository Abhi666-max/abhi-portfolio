"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import SplitType from 'split-type';
import { portfolioData } from '@/data/mockData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    // Split text into words
    const split = new SplitType(textRef.current, { types: 'words' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="about" ref={containerRef} className="relative w-full py-32 px-6 md:px-20 z-10 pointer-events-none">
      <motion.div style={{ y }} className="max-w-4xl mx-auto pointer-events-auto">
        <h2 className="text-sm font-mono tracking-widest uppercase text-[var(--accent)] mb-12 glow-text">
          [01] // About
        </h2>
        <div className="text-2xl md:text-5xl font-bold leading-tight uppercase text-white glow-text" style={{ fontFamily: 'var(--font-syncopate)' }}>
          {portfolioData.about.split('.').map((sentence, i) => (
            <span key={i} className="block mb-4">
              {sentence}.
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
