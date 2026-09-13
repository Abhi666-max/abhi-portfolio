"use client";

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { portfolioData } from '@/data/mockData';
import SplitType from 'split-type';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    if (titleRef.current && subtitleRef.current) {
      const splitTitle = new SplitType(titleRef.current, { types: 'chars' });
      
      const tl = gsap.timeline();
      
      tl.fromTo(splitTitle.chars, 
        { opacity: 0, y: 100, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.05,
          duration: 1.5,
          ease: "power4.out",
          delay: 0.5
        }
      )
      .fromTo(subtitleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: "power2.out" },
        "-=1"
      );

      return () => splitTitle.revert();
    }
  }, []);

  return (
    <motion.section 
      ref={containerRef}
      style={{ opacity }}
      className="relative h-screen w-full flex flex-col items-center justify-center z-10 pointer-events-none"
    >
      {/* Background grid lines for Brutalist architectural feel */}
      <div className="absolute inset-0 grid-lines opacity-50" />

      <motion.div style={{ y }} className="text-center pointer-events-auto flex flex-col items-center z-10">
        <h1 
          ref={titleRef}
          className="text-[12vw] font-bold leading-[0.8] tracking-tighter uppercase text-[#111111]" 
          style={{ fontFamily: 'var(--font-syncopate)' }}
        >
          {portfolioData.profile.name.split(' ')[0]}<br/>
          <span className="text-transparent text-outline-dark">
            {portfolioData.profile.name.split(' ')[1]}
          </span>
        </h1>
        
        <div 
          ref={subtitleRef}
          className="mt-12 flex flex-col items-center gap-4 text-sm font-mono tracking-widest uppercase text-[#111111]"
        >
          <p>{portfolioData.profile.title}</p>
          <div className="w-12 h-[1px] bg-[#111111]" />
        </div>
      </motion.div>
    </motion.section>
  );
}


