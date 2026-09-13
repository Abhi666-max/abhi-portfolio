"use client";

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { portfolioData } from '@/data/mockData';
import SplitType from 'split-type';
import gsap from 'gsap';

const chars = '!<>-_\\/[]{}—=+*^?#________';

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
      
      // Text Scrambler Effect
      splitTitle.chars?.forEach((char, index) => {
        const originalChar = char.innerText;
        const scrambler = { val: 0 };
        
        gsap.to(scrambler, {
          val: 1,
          duration: 1 + Math.random() * 1.5,
          delay: 0.5 + index * 0.05,
          ease: "power2.inOut",
          onUpdate: () => {
            if (scrambler.val < 0.95) {
              char.innerText = chars[Math.floor(Math.random() * chars.length)];
            } else {
              char.innerText = originalChar;
            }
          }
        });
      });

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
    <section ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-center pointer-events-none">
      
      {/* HUD Crosshairs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-8 h-[1px] bg-[var(--accent)]/50" />
        <div className="absolute top-1/2 right-0 w-8 h-[1px] bg-[var(--accent)]/50" />
        <div className="absolute top-0 left-1/2 w-[1px] h-8 bg-[var(--accent)]/50" />
        <div className="absolute bottom-0 left-1/2 w-[1px] h-8 bg-[var(--accent)]/50" />
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="w-full px-6 flex flex-col items-center text-center z-10"
      >
        <div ref={subtitleRef} className="text-[var(--accent)] font-mono text-sm md:text-base tracking-[0.3em] uppercase mb-6 flex items-center gap-4 glow-text">
          <span className="w-8 h-[1px] bg-[var(--accent)] block" />
          {portfolioData.profile.role}
          <span className="w-8 h-[1px] bg-[var(--accent)] block" />
        </div>
        
        <h1 
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-[12vw] font-bold uppercase leading-none tracking-tighter text-white glow-text mix-blend-screen"
          style={{ fontFamily: 'var(--font-syncopate)' }}
        >
          {portfolioData.profile.name.split(' ')[0]}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 2 }}
          className="mt-12 text-sm md:text-lg text-[var(--accent)]/80 max-w-lg mx-auto font-mono text-center leading-relaxed"
        >
          {portfolioData.profile.bio}
        </motion.p>
      </motion.div>
    </section>
  );
}
