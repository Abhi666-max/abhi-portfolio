"use client";

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { portfolioData } from '@/data/mockData';
import SplitType from 'split-type';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    if (titleRef.current) {
      const split = new SplitType(titleRef.current, { types: 'chars,words' });
      
      gsap.fromTo(split.chars, 
        { 
          opacity: 0,
          y: 100,
          rotateX: -90
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.02,
          duration: 1.5,
          ease: "expo.out",
          delay: 0.5
        }
      );

      return () => split.revert();
    }
  }, []);

  return (
    <motion.section 
      ref={containerRef}
      style={{ opacity }}
      className="relative h-screen w-full flex flex-col items-center justify-center z-10 pointer-events-none"
    >
      <motion.div style={{ y }} className="text-center mix-blend-difference pointer-events-auto">
        <h1 
          ref={titleRef}
          className="text-[10vw] md:text-[8vw] font-bold leading-[0.85] tracking-tighter uppercase text-white" 
          style={{ fontFamily: 'var(--font-syncopate)', perspective: '1000px' }}
        >
          {portfolioData.profile.name.split(' ')[0]}<br/>
          <span className="text-transparent text-outline">{portfolioData.profile.name.split(' ')[1]}</span>
        </h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 2 }}
          className="mt-12 text-sm md:text-xl font-mono tracking-widest uppercase text-[#88ccff]"
        >
          <span className="text-white/50">{'> '}</span>
          <Typewriter
            words={[portfolioData.profile.title, 'Creative Developer', 'WebGL Enthusiast', 'Scroll to dive deeper.']}
            loop={0}
            cursor
            cursorStyle='_'
            typeSpeed={50}
            deleteSpeed={30}
            delaySpeed={2000}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
