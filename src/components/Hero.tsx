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
        { 
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.03,
          duration: 1.5,
          ease: "power4.out",
          delay: 0.2
        }
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" },
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
      <motion.div style={{ y }} className="text-center mix-blend-difference pointer-events-auto flex flex-col items-center">
        <h1 
          ref={titleRef}
          className="text-[12vw] md:text-[9vw] font-bold leading-[0.8] tracking-tighter uppercase text-white" 
          style={{ fontFamily: 'var(--font-syncopate)' }}
        >
          {portfolioData.profile.name.split(' ')[0]}<br/>
          <span className="text-transparent text-outline" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.7)' }}>
            {portfolioData.profile.name.split(' ')[1]}
          </span>
        </h1>
        
        <div 
          ref={subtitleRef}
          className="mt-12 flex flex-col items-center gap-4 text-sm md:text-base font-mono tracking-widest uppercase text-white/80"
        >
          <p>{portfolioData.profile.title}</p>
          <div className="w-12 h-[1px] bg-white/30" />
          <p className="text-white/40 text-xs">Scroll to Explore</p>
        </div>
      </motion.div>
    </motion.section>
  );
}

